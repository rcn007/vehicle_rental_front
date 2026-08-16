 <template>
  <div class="auth-page">
    <div class="auth-card">
      <RouterLink to="/" class="auth-logo">
        DriveEase
      </RouterLink>

      <h1>Verify Email</h1>

      <p>
        Enter the OTP sent to your email.
      </p>

      <form @submit.prevent="verify">
        <div class="form-group">
          <label>Email</label>
          <input
            v-model="form.email"
            type="email"
            required
          />
        </div>

        <div class="form-group">
          <label>OTP</label>
          <input
            v-model="form.otp"
            type="text"
            maxlength="6"
            required
          />
        </div>

        <button
          class="btn btn-primary btn-full"
          :disabled="loading"
        >
          {{ loading ? 'Verifying...' : 'Verify OTP' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/Auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const loading = ref(false)

const form = reactive({
  email: route.query.email || '',
  otp: '',
})

async function verify() {
  loading.value = true

  try {
    await auth.verifyOtp(form)

    alert('Email verified successfully!')
    router.push('/auth/login')
  } catch (error) {
    alert(error.response?.data?.message || 'Invalid OTP')
  } finally {
    loading.value = false
  }
}
</script>
