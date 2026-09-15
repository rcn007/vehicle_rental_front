<template>
  <div class="auth-page">
    <div class="auth-card">
      <RouterLink to="/" class="auth-logo">
        <span class="logo-mark">
          <CarFront :size="18" />
        </span>
        DriveEase
      </RouterLink>

      <h1>Signing you in</h1>
      <p>{{ statusMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { CarFront } from '@lucide/vue'
import { useAuthStore } from '../../stores/Auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const statusMessage = ref('Checking your Google account...')

onMounted(() => {
  const token = route.query.token

  if (!token) {
    statusMessage.value = 'Google login failed. Please try again.'
    router.replace('/auth/login')
    return
  }

  auth.finishGoogleLogin({
    token,
    id: route.query.id,
    name: route.query.name,
    email: route.query.email,
    role: route.query.role,
  })

  statusMessage.value = `Signed in as ${route.query.email}`
  router.replace(route.query.redirect || '/')
})
</script>
