<template>
  <header class="navbar">
    <div class="container nav-content">
      <RouterLink to="/" class="logo">
        <span class="logo-mark">
          <CarFront :size="18" />
        </span>
        DriveEase
      </RouterLink>

      <nav class="nav-links">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/vehicles">Vehicles</RouterLink>
        <RouterLink to="/my-bookings">My Bookings</RouterLink>
        <RouterLink to="/rental-history">Rental History</RouterLink>
        <RouterLink to="/locations">Locations</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
      </nav>

      <button
        class="mobile-menu-button"
        :class="{ open: menuOpen }"
        type="button"
        :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
        @click="menuOpen = !menuOpen"
      >
        <X v-if="menuOpen" :size="22" />
        <Menu v-else :size="22" />
      </button>

      <div class="nav-actions">
        <RouterLink
          v-if="!auth.isAuthenticated"
          to="/auth/login"
          class="nav-login"
        >
          Sign In
        </RouterLink>

        <RouterLink
          v-if="!auth.isAuthenticated"
          to="/auth/register"
          class="btn btn-primary"
        >
          Register
        </RouterLink>

        <template v-if="auth.isAuthenticated">
          <RouterLink to="/profile" class="profile-link">
            {{ auth.user?.name || auth.user?.username || 'Profile' }}
          </RouterLink>

          <button class="btn btn-outline" @click="logout">Logout</button>
        </template>
      </div>
    </div>

    <nav class="mobile-nav" :class="{ open: menuOpen }">
      <RouterLink to="/" @click="closeMenu"> Home </RouterLink>
      <RouterLink to="/vehicles" @click="closeMenu"> Vehicles </RouterLink>
      <RouterLink to="/my-bookings" @click="closeMenu">
        My Bookings
      </RouterLink>
      <RouterLink to="/rental-history" @click="closeMenu">
        Rental History
      </RouterLink>
      <RouterLink to="/locations" @click="closeMenu"> Locations </RouterLink>
      <RouterLink to="/contact" @click="closeMenu"> Contact </RouterLink>

      <div class="mobile-auth-links">
        <template v-if="!auth.isAuthenticated">
          <RouterLink to="/auth/login" @click="closeMenu"> Sign In </RouterLink>
          <span>/</span>
          <RouterLink to="/auth/register" @click="closeMenu">
            Register
          </RouterLink>
        </template>

        <template v-else>
          <RouterLink to="/profile" @click="closeMenu">
            {{ auth.user?.name || auth.user?.username || 'Profile' }}
          </RouterLink>
          <button type="button" @click="mobileLogout">Logout</button>
        </template>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { CarFront, Menu, X } from '@lucide/vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/Auth'

const auth = useAuthStore()
const router = useRouter()
const menuOpen = ref(false)

function closeMenu() {
  menuOpen.value = false
}

function logout() {
  auth.logout()
  router.push('/')
}

function mobileLogout() {
  closeMenu()
  logout()
}
</script>
