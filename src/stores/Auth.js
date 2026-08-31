import { defineStore } from 'pinia'
import api from '../api/axios'

const demoCredentials = {
  email: 'customer.demo@driveease.com',
  password: 'DriveEase@2026',
}

const demoUser = {
  id: 101,
  name: 'Demo Customer',
  username: 'demo_customer',
  email: demoCredentials.email,
  role: 'USER',
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => Boolean(state.token),
  },

  actions: {
    async login(data) {
      this.loading = true
      this.error = null

      try {
        if (
          data.email === demoCredentials.email &&
          data.password === demoCredentials.password
        ) {
          const payload = {
            token: 'frontend-demo-token',
            user: demoUser,
          }

          this.token = payload.token
          this.user = payload.user
          localStorage.setItem('token', this.token)
          localStorage.setItem('user', JSON.stringify(this.user))

          return payload
        }

        const response = await api.post('/auth/login', data)
        const payload = response.data?.data || response.data

        this.token = payload.token || payload.accessToken
        this.user = payload.user || payload

        if (this.token) {
          localStorage.setItem('token', this.token)
        }

        localStorage.setItem('user', JSON.stringify(this.user))

        return payload
      } catch (error) {
        this.error = error.response?.data?.message || 'Login failed'
        throw error
      } finally {
        this.loading = false
      }
    },

    async register(data) {
      this.loading = true
      this.error = null

      try {
        const response = await api.post('/auth/register', data)
        return response.data?.data || response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Registration failed'
        throw error
      } finally {
        this.loading = false
      }
    },

    async verifyOtp(data) {
      const response = await api.post('/auth/verify-otp', data)
      return response.data?.data || response.data
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
})
