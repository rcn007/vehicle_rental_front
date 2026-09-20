<template>
  <div class="auth-split-page auth-reset-password-page">
    <section class="auth-visual">
      <div class="visual-content">
        <div class="auth-hero-icon">
          <ShieldAlert :size="42" />
        </div>
        <h1>Create New Password</h1>
        <p>
          Ensure your account stays safe by choosing a strong password with letters, numbers, and special characters.
        </p>

        <div class="auth-stats">
          <div class="stat-item">
            <strong>Strong</strong>
            <span>Security</span>
          </div>
          <div class="stat-item">
            <strong>Instant</strong>
            <span>Update</span>
          </div>
          <div class="stat-item">
            <strong>256-bit</strong>
            <span>Encryption</span>
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
        <!-- Success State -->
        <div v-if="submitted" class="success-state">
          <div class="success-icon-wrapper">
            <CheckCircle2 :size="48" class="success-icon" />
          </div>
          <h2>Password Reset Complete</h2>
          <p>Your password has been successfully updated. You can now sign in with your new credentials.</p>
          <RouterLink to="/auth/login" class="btn btn-primary btn-full mt-4">
            Proceed to Sign In
          </RouterLink>
        </div>

        <!-- Form State -->
        <template v-else>
          <div class="form-header">
            <h1>Reset Password</h1>
            <p>Set a new password for your account.</p>
          </div>

          <form @submit.prevent="handleReset">
            <!-- Hidden Token Input (or manual input if missing in URL) -->
            <div v-if="!hasTokenInUrl" class="form-group">
              <label>Reset Token</label>
              <div class="input-wrapper">
                <KeyRound class="input-icon" :size="18" />
                <input
                  v-model="form.token"
                  type="text"
                  placeholder="Enter token from email"
                  required
                />
              </div>
            </div>

            <!-- New Password -->
            <div class="form-group">
              <label>New Password</label>
              <div class="input-wrapper">
                <Lock class="input-icon" :size="18" />
                <input
                  v-model="form.newPassword"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  class="toggle-password"
                  @click="showPassword = !showPassword"
                >
                  <EyeOff v-if="showPassword" :size="18" />
                  <Eye v-else :size="18" />
                </button>
              </div>
            </div>

            <!-- Confirm Password -->
            <div class="form-group">
              <label>Confirm New Password</label>
              <div class="input-wrapper">
                <Lock class="input-icon" :size="18" />
                <input
                  v-model="confirmPassword"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <!-- Alerts -->
            <div v-if="errorMessage" class="alert alert-error">
              <AlertCircle :size="18" />
              <span>{{ errorMessage }}</span>
            </div>

            <button
              type="submit"
              class="btn btn-primary btn-full"
              :disabled="loading"
            >
              {{ loading ? 'Updating...' : 'Reset Password' }}
            </button>
          </form>
        </template>

        <p class="auth-bottom">
          Remembered your password?
          <RouterLink to="/auth/login"> Sign In </RouterLink>
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft, CarFront, Lock, Eye, EyeOff, KeyRound, ShieldAlert, CheckCircle2, AlertCircle } from '@lucide/vue'
import { resetPassword } from '../../api/auth' // Service import matching your file path

const route = useRoute()

const form = reactive({
  token: '',
  newPassword: ''
})

const confirmPassword = ref('')
const showPassword = ref(false)
const loading = ref(false)
const submitted = ref(false)
const errorMessage = ref('')

const hasTokenInUrl = computed(() => !!route.query.token)

onMounted(() => {
  if (route.query.token) {
    form.token = route.query.token
  }
})

async function handleReset() {
  errorMessage.value = ''

  if (!form.token) {
    errorMessage.value = 'Reset token is required.'
    return
  }

  if (form.newPassword !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  if (form.newPassword.length < 6) {
    errorMessage.value = 'Password must be at least 6 characters long.'
    return
  }

  loading.value = true

  try {
    const response = await resetPassword({
      token: form.token,
      password: form.newPassword,
      confirmPassword: confirmPassword.value
    })

    console.log('Reset password response:', response)

    submitted.value = true

  } catch (error) {
    console.error('Reset password error:', error)

    errorMessage.value =
      error.response?.data?.message ||
      'Failed to reset password. The link or token may be expired.'

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
  padding: 0.75rem 2.75rem 0.75rem 2.75rem;
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

.toggle-password {
  position: absolute;
  right: 0.875rem;
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  display: flex;
  align-items: center;
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
  display: inline-block;
  text-align: center;
  text-decoration: none;
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

.mt-4 {
  margin-top: 1rem;
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

.alert-error {
  background: #fef2f2;
  color: #991b1b;
  border: 1px solid #fee2e2;
}

.success-state {
  text-align: center;
  padding: 1rem 0;
}

.success-icon-wrapper {
  margin-bottom: 1rem;
}

.success-icon {
  color: #16a34a;
}

.success-state h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.5rem;
}

.success-state p {
  color: #64748b;
  font-size: 0.875rem;
  line-height: 1.5;
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