import { defineStore } from 'pinia'
import api from '../api/axios'

export const useBookingStore = defineStore('booking', {
  state: () => ({
    bookings: [],
    booking: null,
    loading: false,
    error: null,
  }),

  actions: {
    async createBooking(data) {
      this.loading = true

      try {
        const response = await api.post('/bookings', data)

        this.booking = response.data?.data || response.data

        return this.booking
      } finally {
        this.loading = false
      }
    },

    async fetchBookings() {
      this.loading = true

      try {
        const response = await api.get('/bookings')

        this.bookings = response.data?.data || response.data || []

        return this.bookings
      } finally {
        this.loading = false
      }
    },

    async fetchBooking(id) {
      const response = await api.get(`/bookings/${id}`)

      this.booking = response.data?.data || response.data

      return this.booking
    },

    async cancelBooking(id) {
      const response = await api.put(`/bookings/${id}/cancel`)
      return response.data
    },
  },
})