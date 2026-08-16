<template>
  <div class="auth-split-page">
    <section class="auth-visual">
      <div>
        <div class="auth-hero-icon">
          <CarFront :size="42" />
        </div>
        <h1>Your Journey Starts Here</h1>
        <p>
          Create your account and book premium vehicles with transparent pricing
          and a simple rental experience.
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

      <h1>Create account</h1>
      <p>Register to start booking your vehicle</p>

      <form @submit.prevent="register">
        <div class="form-group">
          <label>Name</label>
          <input
            v-model="form.name"
            type="text"
            placeholder="Your name"
            required
          />
        </div>

        <div class="form-group">
          <label>Email Address</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="you@email.com"
            required
          />
        </div>

        <div class="form-group">
          <label>Password</label>
          <div class="password-field">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Password"
              required
            />
            <button type="button" @click="showPassword = !showPassword">
              <EyeOff v-if="showPassword" :size="18" />
              <Eye v-else :size="18" />
            </button>
          </div>
        </div>

        <div class="form-group">
          <label>Phone Number</label>
          <input
            v-model="form.phoneNumber"
            type="text"
            placeholder="Phone number"
          />
        </div>

        <div v-if="auth.error" class="error-message">
          {{ auth.error }}
        </div>

        <button
          class="btn btn-primary btn-full"
          :disabled="auth.loading"
        >
          {{ auth.loading ? 'Creating...' : 'Create Account' }}
        </button>
      </form>

      <div class="auth-divider">
        <span>or continue with</span>
      </div>

      <div class="social-actions">
        <button type="button" class="btn btn-outline">
          <img
            class="brand-icon"
            src="/src/assets/google-icon.svg"
            alt=""
          />
          Google
        </button>
        <button type="button" class="btn btn-outline">
          <img
            class="brand-icon"
            src="/src/assets/facebook-icon.svg"
            alt=""
          />
          Facebook
        </button>
      </div>

      <p class="auth-bottom">
        Already have an account?
        <RouterLink to="/auth/login">
          Sign In
        </RouterLink>
      </p>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import {
  ArrowLeft,
  CarFront,
  Eye,
  EyeOff,
} from '@lucide/vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/Auth'

const auth = useAuthStore()
const router = useRouter()

const form = reactive({
  name: '',
  email: '',
  password: '',
  phoneNumber: '',
})

const showPassword = ref(false)

async function register() {
  try {
    await auth.register(form)

    router.push({
      name: 'verify-otp',
      query: { email: form.email },
    })
  } catch {
    // Error is stored in auth store.
  }
}
</script>
