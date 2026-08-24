<template>
  <div class="auth-page">
    <div class="auth-card">
      <RouterLink to="/" class="auth-logo">
        DriveEase
      </RouterLink>

      <h1>Forgot Password?</h1>

      <p>
        Enter your email and we'll help you reset your password.
      </p>

      <form @submit.prevent="submit">
        <div class="form-group">
          <label>Email</label>
          <input
            v-model="email"
            type="email"
            required
          />
        </div>
        <button class="btn btn-primary btn-full">
          Send Reset Request
        </button>
      </form>
      <RouterLink to="/auth/login" class="back-link">
        Back to Sign In
      </RouterLink>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const email = ref('')
function submit() {
  alert(`Password reset request sent to ${email.value}`)
}
</script>
