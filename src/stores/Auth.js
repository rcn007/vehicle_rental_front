import { defineStore } from 'pinia'
import {
  login as loginApi,
  register as registerApi,
  verifyOtp as verifyOtpApi,
  forgotPassword as forgotPasswordApi,
  resetPassword as resetPasswordApi,
  googleLogin as googleLoginApi
} from '../api/auth'

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
    token: (() => {
      const storedToken = localStorage.getItem('token')
      return storedToken && !['undefined', 'null'].includes(storedToken)
        ? storedToken
        : null
    })(),
    loading: false,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token
  },

  actions: {

    // ================================
    // Login
    // ================================
    async login(form) {
      this.loading = true
      this.error = null

      try {
        const response = await loginApi(form)

        // Support both `{ token, user }` and `{ data: { token, user } }`
        // responses. Without this, a nested token is stored as `undefined`,
        // leaving protected endpoints such as /bookings unauthenticated.
        const loginData = response?.data?.data || response?.data || response
        const token = loginData?.token || loginData?.accessToken || loginData?.jwt

        if (!token) {
          throw new Error('The login response did not contain an access token.')
        }

        this.token = token
        localStorage.setItem('token', token)

        if (loginData.user) {
          this.user = loginData.user
          localStorage.setItem(
            'user',
            JSON.stringify(loginData.user)
          )
        }

        return response

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

    // ================================
    // Register
    // ================================
    async register(form) {
      this.loading = true
      this.error = null

      try {
        return await registerApi(form)

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

    // ================================
    // Verify OTP
    // ================================
    async verifyOtp(form) {
      this.loading = true
      this.error = null

      try {
        return await verifyOtpApi(form)

      } catch (error) {
        this.error =
          error.response?.data?.message ||
          'OTP verification failed.'

        throw error

      } finally {
        this.loading = false
      }
    },

    // ================================
    // Forgot Password
    // ================================
    async forgotPassword(form) {
      this.loading = true
      this.error = null

      try {
        return await forgotPasswordApi(form)

      } catch (error) {
        this.error =
          error.response?.data?.message ||
          'Failed to send password reset link.'

        throw error
      } finally {
        this.loading = false
      }
    },

    // ================================
    // Reset Password
    // ================================
    async resetPassword(form) {
      this.loading = true
      this.error = null

      try {
        return await resetPasswordApi(form)

      } catch (error) {
        this.error =
          error.response?.data?.message ||
          'Failed to reset password.'

        throw error

      } finally {
        this.loading = false
      }
    },

    // ================================
    // Google Login
    // ================================
    googleLogin() {
      googleLoginApi()
    },

    // ================================
    // Logout
    // ================================
    logout() {
      this.user = null
      this.token = null

      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }
})
