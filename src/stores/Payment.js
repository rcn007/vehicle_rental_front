import { defineStore } from 'pinia'
import api from '../api/axios'

const demoPaymentMethods = [
  { id: 1, methodName: 'Bakong KHQR' },
  { id: 2, methodName: 'Cash' },
]

export const usePaymentStore = defineStore('payment', {
  state: () => ({
    payments: [],
    paymentMethods: [],
    loading: false,
  }),

  actions: {
    async fetchPaymentMethods() {
      try {
        const response = await api.get('/payment-methods')

        this.paymentMethods =
          response.data?.data || response.data || demoPaymentMethods

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

    async fetchPayments() {
      const response = await api.get('/payments')

      this.payments = response.data?.data || response.data || []

      return this.payments
    },
  },
})
