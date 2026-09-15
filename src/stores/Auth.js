import { defineStore } from 'pinia'
import {
  login as loginApi,
  register as registerApi,
  verifyOtp as verifyOtpApi,
  forgotPassword as forgotPasswordApi,
  resetPassword as resetPasswordApi,
  googleLogin as googleLoginApi
} from '../api/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('token') || null,
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

        const loginData = response.data

        this.token = loginData.token

        localStorage.setItem('token', loginData.token)

        if (loginData.user) {
          this.user = loginData.user

          localStorage.setItem(
            'user',
            JSON.stringify(loginData.user)
          )
        }

        return response

      } catch (error) {
        this.error =
          error.response?.data?.message ||
          'Login failed. Please check your email and password.'

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
        this.error =
          error.response?.data?.message ||
          'Registration failed.'

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
      // Clear Pinia state
      this.user = null
      this.token = null
      this.error = null
      this.loading = false

      // Clear authentication data
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }
})