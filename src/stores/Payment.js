import { defineStore } from 'pinia'
import api from '../api/axios'

export const usePaymentStore = defineStore('payment', {
  state: () => ({
    payments: [],
    paymentMethods: [],
    loading: false,
  }),

  actions: {
    async fetchPaymentMethods() {
      const response = await api.get('/payment-methods')

      this.paymentMethods =
        response.data?.data || response.data || []

      return this.paymentMethods
    },

    async createPayment(data) {
      this.loading = true

      try {
        const response = await api.post('/payments', data)

        return response.data?.data || response.data
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