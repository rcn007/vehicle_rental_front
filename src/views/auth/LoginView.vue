<template>
  <div class="auth-split-page auth-login-page">
    <section class="auth-visual">
      <div class="visual-content">
        <div class="auth-hero-icon">
          <CarFront :size="42" />
        </div>
        <h1>Your Journey Starts Here</h1>
        <p>
          Access 500+ premium vehicles. Seamless booking, transparent pricing,
          zero hidden fees.
        </p>

        <div class="auth-stats">
          <div class="stat-item">
            <strong>10k+</strong>
            <span>Customers</span>
          </div>
          <div class="stat-item">
            <strong>500+</strong>
            <span>Vehicles</span>
          </div>
          <div class="stat-item">
            <strong>4.9</strong>
            <span>Rating</span>
          </div>
        </div>
      </div>
    </section>

    <section class="auth-panel">
      <div class="panel-header">
        <RouterLink to="/" class="back-link">
          <ArrowLeft :size="16" />
          Back to home
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
          <h1>Welcome back</h1>
          <p>Sign in to your account to continue</p>
        </div>

        <!-- Google OAuth Button -->
        <button
          type="button"
          class="btn btn-google btn-full"
          @click="auth.loginWithGoogle()"
        >
          <svg class="google-icon" viewBox="0 0 24 24" width="18" height="18">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          Continue with Google
        </button>

        <div class="divider">
          <span>or sign in with email</span>
        </div>

        <form @submit.prevent="login">
          <div class="form-group">
            <label>Email Address</label>
            <div class="input-wrapper">
              <Mail class="input-icon" :size="18" />
              <input
                v-model="form.email"
                type="email"
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <div class="label-row">
              <label>Password</label>
              <RouterLink to="/auth/forgot-password" class="forgot-link">
                Forgot password?
              </RouterLink>
            </div>
            <div class="input-wrapper">
              <Lock class="input-icon" :size="18" />
              <input
                v-model="form.pwd"
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

          <div v-if="auth.error" class="error-message">
            {{ auth.error }}
          </div>

          <button class="btn btn-primary btn-full" :disabled="auth.loading">
            {{ auth.loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <p class="auth-bottom">
          Don't have an account?
          <RouterLink to="/auth/register"> Create one </RouterLink>
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { ArrowLeft, CarFront, Eye, EyeOff, Mail, Lock } from '@lucide/vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/Auth'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const form = reactive({
  email: '',
  pwd: ''
})

const showPassword = ref(false)

// Intercept OAuth callback parameter if redirected back from Google authentication
onMounted(async () => {
  const code = route.query.code
  if (code) {
    try {
      await auth.handleGoogleCallback(code)
      const redirect = route.query.redirect || '/'
      router.push(redirect)
    } catch {
      // Handled in store
    }
  }
})

async function login() {
  try {
    await auth.login(form)
    const redirect = route.query.redirect || '/'
    router.push(redirect)
  } catch {
    // Error state is maintained in auth.error
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
}

.btn-google {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  color: #1e293b;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-google:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1.5rem 0;
  color: #94a3b8;
  font-size: 0.75rem;
}

.divider::before, .divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #e2e8f0;
}

.divider span {
  padding: 0 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
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

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.forgot-link {
  font-size: 0.875rem;
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
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

.error-message {
  color: #dc2626;
  background: #fef2f2;
  border: 1px solid #fee2e2;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.875rem;
  margin-bottom: 1rem;
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