import { defineStore } from 'pinia'
import api from '../api/axios'

const demoBookingsKey = 'frontendDemoBookings'

function getDemoBookings() {
  return JSON.parse(localStorage.getItem(demoBookingsKey) || '[]')
}

function saveDemoBookings(bookings) {
  localStorage.setItem(demoBookingsKey, JSON.stringify(bookings))
}

function createLocalBooking(data) {
  const bookings = getDemoBookings()
  const booking = {
    id: Date.now(),
    ...data,
    status: 'Pending',
  }

  bookings.unshift(booking)
  saveDemoBookings(bookings)

  return { booking, bookings }
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

        const { booking, bookings } = createLocalBooking(data)

        this.booking = booking
        this.bookings = bookings

        return booking
      } finally {
        this.loading = false
      }
    },

    async fetchBookings() {
      this.loading = true
      this.error = null

      try {
        const response = await api.get('/bookings')
        const apiBookings = response.data?.data || response.data || []
        const localBookings = getDemoBookings()

        this.bookings = [...apiBookings, ...localBookings].filter(
          (booking, index, bookings) =>
            bookings.findIndex((item) => String(item.id) === String(booking.id)) === index
        )

        return this.bookings
      } catch (error) {
        this.error =
          error.response?.data?.message ||
          error.response?.data?.error ||
          (typeof error.response?.data === 'string' ? error.response.data : '') ||
          'Could not load bookings'
        this.bookings = getDemoBookings()

        return this.bookings
      } finally {
        this.loading = false
      }
    },

    async fetchBooking(id) {
      try {
        const response = await api.get(`/bookings/${id}`)

        this.booking = response.data?.data || response.data

        return this.booking
      } catch (error) {
        if (localStorage.getItem('token') !== 'frontend-demo-token') {
          throw error
        }

        this.booking =
          getDemoBookings().find((booking) => String(booking.id) === String(id)) ||
          null

        return this.booking
      }
    },

    async cancelBooking(id) {
      const response = await api.put(`/bookings/${id}/cancel`)
      return response.data
    },
  },
})
