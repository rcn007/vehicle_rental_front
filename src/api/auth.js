import api from './axios'

// ================================
// Login
// ================================
export const login = async (data) => {
  const response = await api.post('/auth/login', data)
  return response.data
}

// ================================
// Register
// ================================
export const register = async (data) => {
  const response = await api.post('/auth/register', data)
  return response.data
}

// ================================
// Verify OTP
// ================================
export const verifyOtp = async (data) => {
  const response = await api.post('/auth/verifyOtp', data)
  return response.data
}

// ================================
// Forgot Password
// ================================
export const forgotPassword = async (data) => {
  const response = await api.post('/auth/forgot-password', data)
  return response.data
}

// ================================
// Reset Password
// ================================
export const resetPassword = async (data) => {
  const response = await api.post('/auth/reset-password', data)
  return response.data
}
// ================================
// Google Login
// ================================
export const googleLogin = () => {
  window.location.href = `${api.defaults.baseURL}/auth/google`
}