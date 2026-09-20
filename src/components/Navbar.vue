<template>
  <header class="navbar ">
    <div class="container nav-content">

      <!-- Logo / Website Name -->
<RouterLink
  to="/"
  class="group flex items-center gap-3 no-underline"
  @click="closeMenu"
>
  <span
    class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white p-1.5 shadow-sm ring-1 ring-slate-200 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md group-hover:ring-slate-300"
  >
    <img
      v-if="logoUrl"
      :src="logoUrl"
      :alt="websiteName"
      class="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
      @error="handleLogoError"
    />
    <CarFront
      v-else
      :size="21"
      :stroke-width="2"
      class="text-slate-800"
    />
  </span>

  <span class="text-lg font-extrabold tracking-tight text-slate-900">
    {{ websiteName }}
  </span>
</RouterLink>


      <!-- Desktop Navigation -->
      <nav class="nav-links">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/vehicles">Vehicles</RouterLink>
        <RouterLink to="/my-bookings">My Bookings</RouterLink>
        <!-- <RouterLink to="/rental-history">Rental History</RouterLink> -->
        <RouterLink to="/locations">Locations</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
        <RouterLink
  to="/favorites"
  class="flex items-center gap-2"
>
  <Heart :size="18" />
  My Favorites
</RouterLink>
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


          </RouterLink>


          <button
            class="btn  bg-slate-900 text-white "
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

      <!-- <RouterLink
        to="/rental-history"
        @click="closeMenu"
      >
        Rental History
      </RouterLink> -->

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
  onMounted,
   onUnmounted
} from 'vue'

import {
  CarFront,
  Menu,
  UserRound,
  X, Heart 
} from '@lucide/vue'

import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/Auth'
import { getCustomizerSettings } from '../api/customizer'


const auth = useAuthStore()
const router = useRouter()

const menuOpen = ref(false)
let authCheckInterval = null


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
// CHECK AUTHENTICATION
// =========================================================

function checkAuthentication() {
  auth.checkToken()
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

  // Load website settings
  fetchCustomizer()

  // Check authentication immediately
  checkAuthentication()

  // Check authentication every 30 seconds
  authCheckInterval = setInterval(() => {
    checkAuthentication()
  }, 30000)
})

onUnmounted(() => {

  if (authCheckInterval) {

    clearInterval(authCheckInterval)

    authCheckInterval = null
  }
})
</script>

<style>
/* =========================================================
   PROFILE LINK
========================================================= */

.profile-link {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  text-decoration: none;
  color: inherit;
  padding: 4px 8px 4px 4px;
  border-radius: 999px;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
}

.profile-link:hover {
  background: #f1f5f9;
  transform: translateY(-1px);
}


/* =========================================================
   DESKTOP PROFILE AVATAR
========================================================= */

.profile-avatar {
  width: 38px;
  height: 38px;
  min-width: 38px;

  border-radius: 50%;

  object-fit: cover;
  object-position: center;

  display: block;

  background: #e2e8f0;

  border: 2px solid #ffffff;

  box-shadow:
    0 2px 6px rgba(15, 23, 42, 0.12),
    0 0 0 1px rgba(148, 163, 184, 0.25);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.profile-link:hover .profile-avatar {
  transform: scale(1.06);

  box-shadow:
    0 4px 10px rgba(15, 23, 42, 0.16),
    0 0 0 1px rgba(148, 163, 184, 0.35);
}


/* =========================================================
   PROFILE FALLBACK
========================================================= */

.profile-avatar-fallback {
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 14px;
  font-weight: 700;

  color: #ffffff;

  background: linear-gradient(
    135deg,
    #0f172a,
    #334155
  );

  text-transform: uppercase;
}


/* =========================================================
   PROFILE NAME
========================================================= */

.profile-name {
  max-width: 120px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  font-size: 14px;
  font-weight: 600;

  color: #0f172a;

  line-height: 1;
}


/* =========================================================
   MOBILE PROFILE
========================================================= */

.mobile-profile-link {
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 8px 10px;

  border-radius: 12px;

  text-decoration: none;
  color: inherit;

  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
}

.mobile-profile-link:hover {
  background: #f1f5f9;
}

.mobile-profile-avatar {
  width: 40px;
  height: 40px;
  min-width: 40px;

  border-radius: 50%;

  object-fit: cover;
  object-position: center;

  display: block;

  background: #e2e8f0;

  border: 2px solid #ffffff;

  box-shadow:
    0 2px 7px rgba(15, 23, 42, 0.14),
    0 0 0 1px rgba(148, 163, 184, 0.25);
}


/* =========================================================
   MOBILE FALLBACK
========================================================= */

.mobile-profile-avatar-fallback {
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 14px;
  font-weight: 700;

  color: #ffffff;

  background: linear-gradient(
    135deg,
    #0f172a,
    #334155
  );
}


/* =========================================================
   MOBILE RESPONSIVE
========================================================= */

@media (max-width: 768px) {

  .profile-avatar {
    width: 36px;
    height: 36px;
    min-width: 36px;
  }

  .profile-name {
    max-width: 100px;
  }

}
</style>