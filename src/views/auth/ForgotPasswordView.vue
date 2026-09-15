<template>
  <div class="auth-split-page auth-forgot-password-page">
    <section class="auth-visual">
      <div class="visual-content">
        <div class="auth-hero-icon">
          <KeyRound :size="42" />
        </div>
        <h1>Account Recovery</h1>
        <p>
          Don't worry! It happens. Enter your registered email address and we will send you a reset link right away.
        </p>

        <div class="auth-stats">
          <div class="stat-item">
            <strong>Fast</strong>
            <span>Email Recovery</span>
          </div>
          <div class="stat-item">
            <strong>Secure</strong>
            <span>Encrypted Link</span>
          </div>
          <div class="stat-item">
            <strong>24/7</strong>
            <span>Automated</span>
          </div>
        </div>
      </div>
    </section>

    <section class="auth-panel">
      <div class="panel-header">
        <RouterLink to="/auth/login" class="back-link">
          <ArrowLeft :size="16" />
          Back to login
        </RouterLink>

        <RouterLink to="/" class="auth-logo">
          <span class="logo-mark">
            <CarFront :size="18" />
          </span>
          DriveEase
        </RouterLink>
      </div>

      <div class="auth-form-container">
        <div class="form-header">
          <h1>Forgot password?</h1>
          <p>Enter your email address and we'll help you reset your password.</p>
        </div>

        <form @submit.prevent="submit">
          <div class="form-group">
            <label>Email Address</label>
            <div class="input-wrapper">
              <Mail class="input-icon" :size="18" />
              <input
                v-model="email"
                type="email"
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          <!-- Alert Notifications -->
          <div v-if="successMessage" class="alert alert-success">
            <CheckCircle2 :size="18" />
            <span>{{ successMessage }}</span>
          </div>

          <div v-if="errorMessage" class="alert alert-error">
            <AlertCircle :size="18" />
            <span>{{ errorMessage }}</span>
          </div>

          <button
            type="submit"
            class="btn btn-primary btn-full"
            :disabled="loading"
          >
            {{ loading ? 'Sending...' : 'Send Reset Request' }}
          </button>
        </form>

        <p class="auth-bottom">
          Remembered your password?
          <RouterLink to="/auth/login"> Sign In </RouterLink>
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ArrowLeft, CarFront, KeyRound, Mail, AlertCircle, CheckCircle2 } from '@lucide/vue'
import { forgotPassword } from '../../api/auth'

const email = ref('')
const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

async function submit() {
  successMessage.value = ''
  errorMessage.value = ''
  loading.value = true

  try {
    const response = await forgotPassword({
      email: email.value
    })

    successMessage.value =
      response.message || 'Password reset link has been sent to your email.'
    email.value = ''
  } catch (error) {
    console.error('Forgot password error:', error)
    errorMessage.value =
      error.response?.data?.message ||
      'Unable to send password reset request. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-split-page {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

.auth-visual {
  flex: 1;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
}

.visual-content {
  max-width: 440px;
}

.auth-hero-icon {
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.auth-visual h1 {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.auth-visual p {
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 2.5rem;
}

.auth-stats {
  display: flex;
  gap: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
}

.stat-item strong {
  display: block;
  font-size: 1.25rem;
  color: #ffffff;
}

.stat-item span {
  font-size: 0.875rem;
  color: #94a3b8;
}

.auth-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2.5rem;
  background: #ffffff;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back-link, .auth-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
}

.auth-logo {
  font-size: 1.125rem;
  font-weight: 700;
  color: #0f172a;
}

.logo-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2563eb;
}

.auth-form-container {
  max-width: 380px;
  width: 100%;
  margin: auto;
}

.form-header {
  margin-bottom: 2rem;
}

.form-header h1 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.5rem;
}

.form-header p {
  color: #64748b;
  font-size: 0.875rem;
  line-height: 1.5;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 0.5rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 0.875rem;
  color: #94a3b8;
  pointer-events: none;
}

.input-wrapper input {
  width: 100%;
  padding: 0.75rem 0.875rem 0.75rem 2.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #0f172a;
  transition: all 0.2s;
}

.input-wrapper input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.btn-primary {
  background: #2563eb;
  color: #ffffff;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 0.5rem;
}

.btn-primary:hover {
  background: #1d4ed8;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-full {
  width: 100%;
}

.alert {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.875rem;
  margin-bottom: 1.25rem;
}

.alert-success {
  background: #f0fdf4;
  color: #166534;
  border: 1px solid #bbf7d0;
}

.alert-error {
  background: #fef2f2;
  color: #991b1b;
  border: 1px solid #fee2e2;
}

.auth-bottom {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: #64748b;
}

.auth-bottom a {
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;
}
</style>