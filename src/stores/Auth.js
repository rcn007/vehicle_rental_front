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
<<<<<<< HEAD
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
=======
        const response = await loginApi(form)
>>>>>>> origin/vehicle_rental_front

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
<<<<<<< HEAD
        const errorBody = error.response?.data
        this.error =
          errorBody?.message ||
          errorBody?.error ||
          (typeof errorBody === 'string' ? errorBody : '') ||
          'Login failed'
=======
        this.error =
          error.response?.data?.message ||
          'Login failed. Please check your email and password.'

>>>>>>> origin/vehicle_rental_front
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
<<<<<<< HEAD
        const errorBody = error.response?.data
        this.error =
          errorBody?.message ||
          errorBody?.error ||
          (typeof errorBody === 'string' ? errorBody : '') ||
          'Registration failed'
=======
        this.error =
          error.response?.data?.message ||
          'Registration failed.'

>>>>>>> origin/vehicle_rental_front
        throw error

      } finally {
        this.loading = false
      }
    },

<<<<<<< HEAD
    async verifyOtp(data) {
      const response = await api.post('/auth/verifyOtp', data)
      return response.data?.data || response.data
    },

    async startGoogleLogin() {
=======
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
>>>>>>> origin/vehicle_rental_front
      this.loading = true
      this.error = null

      try {
<<<<<<< HEAD
        const response = await api.get('/auth/google')
        const googleUrl = response.data?.data || response.data

        window.location.href = googleUrl
      } catch (error) {
        this.error = error.response?.data?.message || 'Google login failed'
        throw error
=======
        return await forgotPasswordApi(form)

      } catch (error) {
        this.error =
          error.response?.data?.message ||
          'Failed to send password reset link.'

        throw error

>>>>>>> origin/vehicle_rental_front
      } finally {
        this.loading = false
      }
    },

<<<<<<< HEAD
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

=======
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
>>>>>>> origin/vehicle_rental_front
    logout() {
      this.user = null
      this.token = null

      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }
})