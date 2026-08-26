<template>
  <div class="auth-split-page auth-login-page">
    <section class="auth-visual">
      <div>
        <div class="auth-hero-icon">
          <CarFront :size="42" />
        </div>
        <h1>Your Journey Starts Here</h1>
        <p>
          Access 500+ premium vehicles. Seamless booking, transparent pricing,
          zero hidden fees.
        </p>

        <div class="auth-stats">
          <span><strong>10k+</strong>Customers</span>
          <span><strong>500+</strong>Vehicles</span>
          <span><strong>4.9</strong>Rating</span>
        </div>
      </div>
    </section>

    <section class="auth-panel">
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

      <h1>Welcome back</h1>
      <p>Sign in to your account to continue</p>

      <form @submit.prevent="login">
        <div class="form-group">
          <label>Email Address</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="Enter Your Email"
            required
          />
        </div>

        <div class="form-group">
          <div class="label-row">
            <label>Password</label>
            <RouterLink to="/auth/forgot-password">
              Forgot password?
            </RouterLink>
          </div>
          <div class="password-field">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter Your Password"
              required
            />
            <button type="button" @click="showPassword = !showPassword">
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
    </section>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ArrowLeft, CarFront, Eye, EyeOff } from '@lucide/vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/Auth'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const form = reactive({
  email: '',
  password: ''
})

const showPassword = ref(false)

async function login() {
  try {
    await auth.login(form)

    const redirect = route.query.redirect || '/'

    router.push(redirect)
  } catch {
    // Error is stored in auth store.
  }
}
</script>
