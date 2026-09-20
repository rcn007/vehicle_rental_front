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
  isAuthenticated: (state) => {

    if (!state.token) {
      return false
    }

    try {

      const payload = JSON.parse(
        atob(state.token.split('.')[1])
      )

      // JWT exp is in seconds
      if (
        !payload.exp ||
        payload.exp * 1000 <= Date.now()
      ) {
        return false
      }

      return true

    } catch (error) {

      return false
    }
  }
},

  actions: {
     // ================================
  // Check Token
  // ================================
  checkToken() {

    if (!this.token) {
      return false
    }

    try {

      const payload = JSON.parse(
        atob(this.token.split('.')[1])
      )

      const expired =
        !payload.exp ||
        payload.exp * 1000 <= Date.now()

      if (expired) {

        console.log('JWT token expired.')

        this.logout()

        return false
      }

      return true

    } catch (error) {

      console.log('Invalid JWT token.')

      this.logout()

      return false
    }
  },

    // ================================
    // Login
    // ================================
    async login(form) {
      this.loading = true
      this.error = null

      try {
        const response = await loginApi(form)
        // Extract data payload (handling Axios response wrapper)
        const loginData = response?.data ?? response

        console.log('Login response:', response)
        console.log('Login data:', loginData)

        // Extract token
        const token = loginData.token || loginData.accessToken
        if (token) {
          this.token = token
          localStorage.setItem('token', token)
        }

        // Extract user object with multiple fallback structures
        const userData = loginData.user || loginData.userData || (loginData.id ? loginData : null)

        if (userData) {
          this.user = userData
          localStorage.setItem('user', JSON.stringify(userData))
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
// ================================
// Google Login
// ================================
loginWithGoogle() {
  googleLoginApi()
},

// ================================
// Handle Google Callback
// ================================
handleGoogleCallback() {
  const params = new URLSearchParams(window.location.search)

  const token = params.get('token')
  const error = params.get('error')

  if (error) {
    this.error = 'Google login failed. Please try again.'
    return false
  }

  if (!token) {
    this.error = 'Google login token not found.'
    return false
  }

  const user = {
    id: params.get('id') ? Number(params.get('id')) : null,
    name: params.get('name'),
    email: params.get('email'),
    role: params.get('role')
  }

  // Save token
  this.token = token
  localStorage.setItem('token', token)

  // Save user
  this.user = user
  localStorage.setItem('user', JSON.stringify(user))

  console.log('Google user:', user)

  return true
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