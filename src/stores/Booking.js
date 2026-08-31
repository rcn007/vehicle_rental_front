import { defineStore } from 'pinia'
import api from '../api/axios'

const demoBookingsKey = 'frontendDemoBookings'

function getDemoBookings() {
  return JSON.parse(localStorage.getItem(demoBookingsKey) || '[]')
}

function saveDemoBookings(bookings) {
  localStorage.setItem(demoBookingsKey, JSON.stringify(bookings))
}

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
      } catch (error) {
        if (localStorage.getItem('token') !== 'frontend-demo-token') {
          throw error
        }

        const bookings = getDemoBookings()
        const booking = {
          id: Date.now(),
          ...data,
          status: 'Confirmed',
        }

        bookings.unshift(booking)
        saveDemoBookings(bookings)

        this.booking = booking
        this.bookings = bookings

        return booking
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
      } catch (error) {
        if (localStorage.getItem('token') !== 'frontend-demo-token') {
          throw error
        }

        this.bookings = getDemoBookings()

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
