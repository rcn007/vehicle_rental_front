import { defineStore } from 'pinia'
import api from '../api/axios'

const demoPaymentMethods = [
  { id: 1, methodName: 'Bakong KHQR' },
  { id: 2, methodName: 'Cash' },
]

function rememberScanPayment(data) {
  localStorage.setItem(
    'lastBakongScanPayment',
    JSON.stringify({
      bookingId: data.bookingId,
      amount: data.amount,
      currency: data.currency || 'USD',
    })
  )
}

function isNotFound(error) {
  return error.response?.status === 404
}

export const usePaymentStore = defineStore('payment', {
  state: () => ({
    payments: [],
    paymentMethods: [],
    loading: false,
  }),

  actions: {
    async fetchPaymentMethods() {
      try {
        const response = await api.get('/paymentMethods')
        const methods = response.data?.data || response.data || []

        this.paymentMethods = methods.length ? methods : demoPaymentMethods

        return this.paymentMethods
      } catch {
        this.paymentMethods = demoPaymentMethods

        return this.paymentMethods
      }
    },

    async createPayment(data) {
      this.loading = true

      try {
        const response = await api.post('/payments', data)

        return response.data?.data || response.data
      } catch (error) {
        if (localStorage.getItem('token') !== 'frontend-demo-token') {
          throw error
        }

        return {
          id: Date.now(),
          status: 'Paid',
          ...data,
        }
      } finally {
        this.loading = false
      }
    },

    async createBakongQr(data) {
      rememberScanPayment(data)

      return this.createBakongScanQr({
        bookingId: data.bookingId,
        amount: data.amount,
        currency: data.currency || 'USD',
      })
    },

    async createBakongScanQr(data) {
      try {
        const response = await api.post('/payments/bakong/scan-qr', data)

        return response.data?.data || response.data
      } catch (error) {
        if (!isNotFound(error)) {
          throw error
        }

        return this.createBakongLinkedQr(data)
      }
    },

    async createBakongLinkedQr(data) {
      try {
        const response = await api.post('/payments/bakong/qr', data)

        return response.data?.data || response.data
      } catch (error) {
        if (!isNotFound(error)) {
          throw error
        }

        return this.createBakongTestQr({
          amount: data.amount,
          currency: data.currency || 'USD',
        })
      }
    },

    async createBakongTestQr(data) {
      const response = await api.post('/payments/bakong/test-qr', data)

      return response.data?.data || response.data
    },

    async checkBakongPaymentStatus(bookingId, reference) {
      return this.checkBakongScanPaymentStatus(reference)
    },

    async checkBakongScanPaymentStatus(reference) {
      const lastScanPayment = JSON.parse(localStorage.getItem('lastBakongScanPayment') || '{}')

      try {
        const response = await api.get('/payments/bakong/scan-status', {
          params: {
            reference,
            amount: lastScanPayment.amount || 0,
            currency: lastScanPayment.currency || 'USD',
          },
        })

        return response.data?.data || response.data
      } catch (error) {
        if (!isNotFound(error)) {
          throw error
        }

        return this.checkBakongLinkedPaymentStatus(reference)
      }
    },

    async checkBakongLinkedPaymentStatus(reference) {
      const lastScanPayment = JSON.parse(localStorage.getItem('lastBakongScanPayment') || '{}')

      if (!lastScanPayment.bookingId) {
        return this.checkBakongTestPaymentStatus(reference)
      }

      try {
        const response = await api.get(`/payments/bakong/status/${lastScanPayment.bookingId}`, {
          params: reference ? { reference } : {},
        })

        return response.data?.data || response.data
      } catch (error) {
        if (!isNotFound(error)) {
          throw error
        }

        return this.checkBakongTestPaymentStatus(reference)
      }
    },

    async checkBakongTestPaymentStatus(reference) {
      const lastScanPayment = JSON.parse(localStorage.getItem('lastBakongScanPayment') || '{}')

      const response = await api.get('/payments/bakong/test-status', {
        params: {
          reference,
          amount: lastScanPayment.amount || 0,
          currency: lastScanPayment.currency || 'USD',
        },
      })

      return response.data?.data || response.data
    },

    async fetchPayments() {
      const response = await api.get('/payments')

      this.payments = response.data?.data || response.data || []

      return this.payments
    },
  },
})
