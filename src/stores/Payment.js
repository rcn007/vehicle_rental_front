import { defineStore } from 'pinia'
import api from '../api/axios'

const demoPaymentMethods = [
  { id: 1, methodName: 'ABA Pay' },
  { id: 2, methodName: 'Bakong KHQR' },
  { id: 3, methodName: 'ACLEDA' },
]

function isNotFound(error) {
  return error.response?.status === 404
}

function isDemoMode() {
  return localStorage.getItem('token') === 'frontend-demo-token'
}

function readLastScanPayment() {
  try {
    return JSON.parse(
      localStorage.getItem('lastBakongScanPayment') || '{}'
    )
  } catch {
    return {}
  }
}

export const usePaymentStore = defineStore('payment', {
  state: () => ({
    payments: [],
    paymentMethods: [],
    loading: false,
  }),

  actions: {
    // =========================
    // Payment Methods
    // =========================
    async fetchPaymentMethods() {
      try {
        const response = await api.get('/paymentMethods')

        const methods =
          response.data?.data ||
          response.data ||
          []

        this.paymentMethods = methods.length
          ? methods
          : demoPaymentMethods

        return this.paymentMethods
      } catch {
        this.paymentMethods = demoPaymentMethods

        return this.paymentMethods
      }
    },

    // =========================
    // Normal Payment
    // =========================
    async createPayment(data) {
      this.loading = true

      try {
        const response = await api.post('/payments', data)

        return response.data?.data || response.data
      } catch (error) {
        if (!isDemoMode()) {
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

    // =========================
    // Create Bakong QR
    // =========================
    async createBakongQr(data) {
      const payload = {
        bookingId: data.bookingId,
        paymentMethodId: data.paymentMethodId,
        amount: data.amount,
        currency: data.currency || 'USD',
      }

      const result = await this.createBakongScanQr(payload)

      const paymentId =
        result?.paymentId ||
        result?.id ||
        null

      localStorage.setItem(
        'lastBakongScanPayment',
        JSON.stringify({
          bookingId: payload.bookingId,
          paymentId,
          paymentMethodId: payload.paymentMethodId,
          amount: payload.amount,
          currency: payload.currency,
        })
      )

      return result
    },

    // =========================
    // Create Bakong Scan QR
    // =========================
    async createBakongScanQr(data) {
      try {
        const response = await api.post(
          '/payments/bakong/scan-qr',
          data
        )

        return response.data?.data || response.data
      } catch (error) {
        if (!isDemoMode() || !isNotFound(error)) {
          throw error
        }

        return this.createBakongLinkedQr(data)
      }
    },

    // =========================
    // Bakong Linked QR
    // =========================
    async createBakongLinkedQr(data) {
      try {
        const response = await api.post(
          '/payments/bakong/qr',
          data
        )

        return response.data?.data || response.data
      } catch (error) {
        if (!isDemoMode() || !isNotFound(error)) {
          throw error
        }

        return this.createBakongTestQr({
          amount: data.amount,
          currency: data.currency || 'USD',
        })
      }
    },

    // =========================
    // Bakong Test QR
    // =========================
    async createBakongTestQr(data) {
      const response = await api.post(
        '/payments/bakong/test-qr',
        data
      )

      return response.data?.data || response.data
    },

    // =========================
    // Check Bakong Payment Status
    // =========================
    async checkBakongPaymentStatus(paymentId) {
      const lastScanPayment = readLastScanPayment()

      const id =
        paymentId ||
        lastScanPayment.paymentId

      if (!id) {
        if (isDemoMode()) {
          return this.checkBakongTestPaymentStatus()
        }

        throw new Error('Payment ID is missing')
      }

      try {
        const response = await api.get(
          `/payments/bakong/${id}/status`
        )

        return response.data?.data || response.data
      } catch (error) {
        if (!isDemoMode() || !isNotFound(error)) {
          throw error
        }

        return this.checkBakongTestPaymentStatus(id)
      }
    },

    // =========================
    // Scan Payment Status
    // =========================
    async checkBakongScanPaymentStatus(paymentId) {
      return this.checkBakongPaymentStatus(paymentId)
    },

    // =========================
    // Test Payment Status
    // =========================
    async checkBakongTestPaymentStatus(reference) {
      const lastScanPayment = readLastScanPayment()

      const response = await api.get(
        '/payments/bakong/test-status',
        {
          params: {
            reference,
            amount: lastScanPayment.amount || 0,
            paymentMethodId:
              lastScanPayment.paymentMethodId,
            currency:
              lastScanPayment.currency || 'USD',
          },
        }
      )

      return response.data?.data || response.data
    },

    // =========================
    // Get Payments
    // =========================
    async fetchPayments() {
      const response = await api.get('/payments')

      this.payments =
        response.data?.data ||
        response.data ||
        []

      return this.payments
    },
  },
})