<template>
  <section class="section">
    <div class="container narrow">
      <div class="page-header">
        <p class="section-label">ACCOUNT</p>
        <h1>My Profile</h1>
      </div>

      <div class="profile-card">
        <div class="avatar">
          {{ initials }}
        </div>

        <h2>
          {{ auth.user?.name || auth.user?.username || 'User' }}
        </h2>

        <p>{{ auth.user?.email || '' }}</p>

        <div class="profile-details">
          <div>
            <span>Role</span>
            <strong>{{ auth.user?.role || 'USER' }}</strong>
          </div>

          <div>
            <span>Email</span>
            <strong>{{ auth.user?.email || '-' }}</strong>
          </div>

          <div>
            <span>Phone</span>
            <strong>{{ auth.user?.phoneNumber || '-' }}</strong>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/Auth'

const auth = useAuthStore()

const initials = computed(() => {
  const name =
    auth.user?.name ||
    auth.user?.username ||
    'U'

  return name.charAt(0).toUpperCase()
})
</script>