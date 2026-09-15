<template>
  <header class="navbar">
    <div class="container nav-content">

      <!-- Logo / Website Name -->
      <RouterLink to="/" class="logo" @click="closeMenu">

        <span class="logo-mark">
          <img
            v-if="logoUrl"
            :src="logoUrl"
            :alt="websiteName"
            class="website-logo"
            @error="handleLogoError"
          />

          <CarFront
            v-else
            :size="18"
          />
        </span>

        {{ websiteName }}
      </RouterLink>


      <!-- Desktop Navigation -->
      <nav class="nav-links">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/vehicles">Vehicles</RouterLink>
        <RouterLink to="/my-bookings">My Bookings</RouterLink>
        <RouterLink to="/rental-history">Rental History</RouterLink>
        <RouterLink to="/locations">Locations</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
      </nav>


      <!-- Mobile Menu Button -->
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


      <!-- Desktop Auth -->
      <div class="nav-actions">

        <!-- Not Logged In -->
        <RouterLink
          v-if="!auth.isAuthenticated"
          to="/auth/login"
          class="btn btn-primary"
        >
          Login
        </RouterLink>


        <!-- Logged In -->
        <template v-else>

          <RouterLink
            to="/profile"
            class="profile-link"
          >

            <!-- Profile Image -->
            <img
              v-if="profileImage"
              :src="profileImage"
              :alt="auth.user?.name || 'Profile'"
              class="profile-avatar"
              @error="handleProfileImageError"
            />

            <!-- Fallback -->
            <span
              v-else
              class="profile-avatar profile-avatar-fallback"
            >
              {{ getInitial() }}
            </span>

            <span class="profile-name">
              {{ auth.user?.name || auth.user?.username || 'Profile' }}
            </span>

          </RouterLink>


          <button
            class="btn btn-outline"
            type="button"
            @click="logout"
          >
            Logout
          </button>

        </template>

      </div>
    </div>


    <!-- Mobile Navigation -->
    <nav
      class="mobile-nav"
      :class="{ open: menuOpen }"
    >

      <!-- Mobile Brand -->
      <RouterLink
        to="/"
        class="mobile-nav-brand"
        @click="closeMenu"
      >
        <span class="mobile-nav-brand-mark">

          <img
            v-if="logoUrl"
            :src="logoUrl"
            :alt="websiteName"
            class="mobile-website-logo"
            @error="handleLogoError"
          />

          <CarFront
            v-else
            :size="18"
          />

        </span>

        <span>{{ websiteName }}</span>
      </RouterLink>


      <!-- Links -->
      <RouterLink
        to="/"
        @click="closeMenu"
      >
        Home
      </RouterLink>

      <RouterLink
        to="/vehicles"
        @click="closeMenu"
      >
        Vehicles
      </RouterLink>

      <RouterLink
        to="/my-bookings"
        @click="closeMenu"
      >
        My Bookings
      </RouterLink>

      <RouterLink
        to="/rental-history"
        @click="closeMenu"
      >
        Rental History
      </RouterLink>

      <RouterLink
        to="/locations"
        @click="closeMenu"
      >
        Locations
      </RouterLink>

      <RouterLink
        to="/contact"
        @click="closeMenu"
      >
        Contact
      </RouterLink>


      <!-- Mobile Auth -->
      <div class="mobile-auth-links">

        <!-- Not Logged In -->
        <template v-if="!auth.isAuthenticated">

          <RouterLink
            to="/auth/login"
            class="mobile-login-link"
            @click="closeMenu"
          >
            <UserRound :size="17" />
            Sign In
          </RouterLink>

          <span>/</span>

          <RouterLink
            to="/auth/register"
            @click="closeMenu"
          >
            Register
          </RouterLink>

        </template>


        <!-- Logged In -->
        <template v-else>

          <RouterLink
            to="/profile"
            class="mobile-profile-link"
            @click="closeMenu"
          >

            <img
              v-if="profileImage"
              :src="profileImage"
              :alt="auth.user?.name || 'Profile'"
              class="mobile-profile-avatar"
              @error="handleProfileImageError"
            />

            <span
              v-else
              class="mobile-profile-avatar mobile-profile-avatar-fallback"
            >
              {{ getInitial() }}
            </span>

            <span>
              {{ auth.user?.name || auth.user?.username || 'Profile' }}
            </span>

          </RouterLink>


          <button
            type="button"
            @click="mobileLogout"
          >
            Logout
          </button>

        </template>

      </div>

    </nav>
  </header>
</template>


<script setup>
import {
  ref,
  computed,
  onMounted
} from 'vue'

import {
  CarFront,
  Menu,
  UserRound,
  X
} from '@lucide/vue'

import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/Auth'
import { getCustomizerSettings } from '../api/customizer'


const auth = useAuthStore()
const router = useRouter()

const menuOpen = ref(false)


// =========================================================
// CUSTOMIZER
// =========================================================

const websiteName = ref('DriveEase')
const logoUrl = ref(null)


// =========================================================
// PROFILE IMAGE
// =========================================================

const profileImage = computed(() => {

  const user = auth.user

  if (!user) {
    return null
  }

  const rawImage =
    user.profileImage ||
    user.profile_image ||
    user.image ||
    user.avatar ||
    null

  return formatImageUrl(rawImage)
})


// =========================================================
// FORMAT IMAGE URL
// =========================================================

function formatImageUrl(rawPath) {

  if (!rawPath || typeof rawPath !== 'string') {
    return null
  }

  const path = rawPath.trim()

  if (!path) {
    return null
  }

  // Cloudinary / external URL
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:')
  ) {
    return path
  }

  // Backend local image
  const cleanPath = path.startsWith('/')
    ? path
    : `/${path}`

  return `http://localhost:8080${cleanPath}`
}


// =========================================================
// GET INITIAL
// =========================================================

function getInitial() {

  const name =
    auth.user?.name ||
    auth.user?.username ||
    'U'

  return name
    .charAt(0)
    .toUpperCase()
}


// =========================================================
// FETCH CUSTOMIZER
// =========================================================

async function fetchCustomizer() {

  try {

    const response =
      await getCustomizerSettings()

    /*
     * Supports:
     *
     * {
     *   data: {
     *      websiteName: "...",
     *      logo: "..."
     *   }
     * }
     *
     * or:
     *
     * {
     *   websiteName: "...",
     *   logo: "..."
     * }
     */

    let data = response?.data ?? response

    // Handle ApiResponse wrapping
    if (data?.data) {
      data = data.data
    }

    websiteName.value =
      data?.websiteName ||
      'DriveEase'

    logoUrl.value =
      formatImageUrl(data?.logo)

    document.title =
      websiteName.value

  } catch (error) {

    console.error(
      'Failed to fetch customizer settings:',
      error
    )

    websiteName.value = 'DriveEase'
    logoUrl.value = null

  }
}


// =========================================================
// IMAGE ERROR
// =========================================================

function handleLogoError(event) {

  console.error(
    'Website logo failed:',
    event.target.src
  )

  logoUrl.value = null
}


function handleProfileImageError(event) {

  console.error(
    'Profile image failed:',
    event.target.src
  )

  event.target.style.display = 'none'
}


// =========================================================
// MENU
// =========================================================

function closeMenu() {
  menuOpen.value = false
}


// =========================================================
// LOGOUT
// =========================================================

function logout() {

  auth.logout()

  menuOpen.value = false

  router.push('/')
}


function mobileLogout() {

  closeMenu()

  logout()
}


// =========================================================
// LOAD
// =========================================================

onMounted(() => {
  fetchCustomizer()
})
</script>