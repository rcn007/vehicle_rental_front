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

        const response = await api.post('/auth/login', {
          email: data.email?.trim().toLowerCase(),
          pwd: data.password || data.pwd,
        })
        const payload = response.data?.data || response.data

        this.token = payload.token || payload.accessToken
        this.user = payload.user || payload

        if (this.token) {
          localStorage.setItem('token', this.token)
        }

        localStorage.setItem('user', JSON.stringify(this.user))

        return payload
      } catch (error) {
        const errorBody = error.response?.data
        this.error =
          errorBody?.message ||
          errorBody?.error ||
          (typeof errorBody === 'string' ? errorBody : '') ||
          'Login failed'
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
        const errorBody = error.response?.data
        this.error =
          errorBody?.message ||
          errorBody?.error ||
          (typeof errorBody === 'string' ? errorBody : '') ||
          'Registration failed'
        throw error
      } finally {
        this.loading = false
      }
    },

    async verifyOtp(data) {
      const response = await api.post('/auth/verifyOtp', data)
      return response.data?.data || response.data
    },

    async startGoogleLogin() {
      this.loading = true
      this.error = null

      try {
        const response = await api.get('/auth/google')
        const googleUrl = response.data?.data || response.data

        window.location.href = googleUrl
      } catch (error) {
        this.error = error.response?.data?.message || 'Google login failed'
        throw error
      } finally {
        this.loading = false
      }
    },

    finishGoogleLogin(payload) {
      this.token = payload.token
      this.user = {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        role: payload.role,
      }

      localStorage.setItem('token', this.token)
      localStorage.setItem('user', JSON.stringify(this.user))
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
})
