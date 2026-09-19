<template>
  <div class="auth-split-page auth-verify-page">
    <section class="auth-visual">
      <div>
        <div class="auth-hero-icon">
          <ShieldCheck :size="42" />
        </div>
        <h1>Secure Access</h1>
        <p>
          We take security seriously. Verify your verification code to complete your registration.
        </p>

        <div class="auth-stats">
          <span><strong>2FA</strong>Protection</span>
          <span><strong>Instant</strong>Verification</span>
          <span><strong>24/7</strong>Support</span>
        </div>
      </div>
    </section>

    <section class="auth-panel">
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

      <h1>Verify Code</h1>
      <p>Enter the 6-digit code sent to your email address.</p>

      <form @submit.prevent="verify">
        <div class="otp-container">
          <input
            v-for="(digit, index) in 6"
            :key="index"
            :ref="el => otpInputs[index] = el"
            v-model="digits[index]"
            type="text"
            inputmode="numeric"
            maxlength="1"
            class="otp-box"
            @input="handleInput(index, $event)"
            @keydown="handleKeyDown(index, $event)"
            @paste="handlePaste"
          />
        </div>

        <div v-if="auth.error" class="error-message">
          {{ auth.error }}
        </div>

        <button class="btn btn-primary btn-full" :disabled="loading || isSubmitDisabled">
          {{ loading ? 'Verifying...' : 'Verify OTP' }}
        </button>
      </form>

      <div class="resend-wrapper">
        <p v-if="resendTimer > 0">
          Resend code in <strong>{{ resendTimer }}s</strong>
        </p>
        <button
          v-else
          type="button"
          class="btn-link"
          :disabled="isResending"
          @click="handleResend"
        >
          {{ isResending ? 'Sending...' : 'Resend Code' }}
        </button>
      </div>

      <p class="auth-bottom">
        Need help?
        <RouterLink to="/contact"> Contact Support </RouterLink>
      </p>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted, onUnmounted } from 'vue'
import { ArrowLeft, CarFront, ShieldCheck } from '@lucide/vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/Auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const loading = ref(false)
const isResending = ref(false)
const resendTimer = ref(60)
let timerInterval = null

// Hidden email state passed via route query or stored session
const email = ref(route.query.email || auth.userEmail || '')

// 6 distinct input elements
const digits = reactive(['', '', '', '', '', ''])
const otpInputs = ref([])

const isSubmitDisabled = computed(() => digits.some(d => d === ''))

onMounted(() => {
  startResendTimer()
  if (otpInputs.value[0]) {
    otpInputs.value[0].focus()
  }
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})

function startResendTimer() {
  resendTimer.value = 60
  if (timerInterval) clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    if (resendTimer.value > 0) {
      resendTimer.value--
    } else {
      clearInterval(timerInterval)
    }
  }, 1000)
}

function handleInput(index, event) {
  const value = event.target.value.replace(/\D/g, '')
  digits[index] = value

  if (value && index < 5) {
    otpInputs.value[index + 1]?.focus()
  }
}

function handleKeyDown(index, event) {
  if (event.key === 'Backspace' && !digits[index] && index > 0) {
    otpInputs.value[index - 1]?.focus()
  }
}

function handlePaste(event) {
  event.preventDefault()
  const pastedData = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
  
  pastedData.split('').forEach((char, i) => {
    digits[i] = char
  })

  const focusIndex = Math.min(pastedData.length, 5)
  otpInputs.value[focusIndex]?.focus()
}

async function verify() {
  const otpCode = digits.join('')
  loading.value = true

  try {
    await auth.verifyOtp({
      email: email.value,
      otp: otpCode
    })

    router.push('/auth/login')
  } catch (error) {
    // Handled in auth store or caught here
  } finally {
    loading.value = false
  }
}

async function handleResend() {
  isResending.value = true
  try {
    // Optional resend OTP service endpoint trigger
    // await auth.resendOtp({ email: email.value })
    startResendTimer()
  } finally {
    isResending.value = false
  }
}
</script>

<style scoped>
.otp-container {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 24px 0;
}

.otp-box {
  width: 48px;
  height: 56px;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: #f9fafb;
  transition: all 0.2s ease;
}

.otp-box:focus {
  outline: none;
  border-color: #2563eb;
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

.resend-wrapper {
  margin-top: 20px;
  text-align: center;
  font-size: 0.9rem;
  color: #6b7280;
}

.btn-link {
  background: none;
  border: none;
  color: #2563eb;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
}

.btn-link:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>