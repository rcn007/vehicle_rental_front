<template>
  <footer class="footer bg-gray-900">
    <div class="container footer-grid">

      <!-- Brand -->
      <div>
        <RouterLink to="/" class="footer-logo">
          <span class="logo-mark">
            <img
              v-if="logoUrl"
              :src="logoUrl"
              :alt="websiteName"
              class="footer-logo-image"
              @error="handleLogoError"
            />

            <CarFront
              v-else
              :size="18"
            />
          </span>

          {{ websiteName }}
        </RouterLink>

        <p>
          {{ description }}
        </p>
      </div>


      <!-- Company -->
      <div>
        <h3>Company</h3>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/locations">Location</RouterLink>
        <RouterLink to="/">Blog</RouterLink>
      </div>


      <!-- Services -->
      <div>
        <h3>Services</h3>
        <RouterLink to="/vehicles">Car Rental</RouterLink>
        <RouterLink to="/vehicles">SUV Rental</RouterLink>
        <RouterLink to="/vehicles">Motorcycles</RouterLink>
        <RouterLink to="/vehicles">Luxury Fleet</RouterLink>
      </div>


      <!-- Support -->
      <div>
        <h3>Support</h3>
        <RouterLink to="/">Help Center</RouterLink>
        <RouterLink to="/contact">Contact Us</RouterLink>
        <RouterLink to="/">Privacy Policy</RouterLink>
      </div>

    </div>


    <!-- Bottom -->
    <div class="footer-bottom">
      &copy; {{ new Date().getFullYear() }}
      {{ websiteName }}. All rights reserved.
    </div>
  </footer>
</template>


<script setup>
import {
  ref,
  onMounted
} from 'vue'

import {
  CarFront
} from '@lucide/vue'

import {
  getCustomizerSettings
} from '../api/customizer'


// =========================================================
// CUSTOMIZER
// =========================================================

const websiteName = ref('DriveEase')

const logoUrl = ref(null)

const description = ref(
  'Premium vehicle rentals for every journey. Fast, affordable, reliable.'
)


// =========================================================
// FORMAT IMAGE URL
// Same logic as Navbar
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
// FETCH CUSTOMIZER
// =========================================================

async function fetchCustomizer() {

  try {

    const response =
      await getCustomizerSettings()


    // Handle possible response wrapping
    let data = response?.data ?? response

    // Handle ApiResponse wrapping
    if (data?.data) {
      data = data.data
    }


    // Website name
    websiteName.value =
      data?.websiteName ||
      'DriveEase'


    // Logo
    logoUrl.value =
      formatImageUrl(data?.logo)


    // Description
    description.value =
      data?.description ||
      'Premium vehicle rentals for every journey. Fast, affordable, reliable.'


  } catch (error) {

    console.error(
      'Failed to fetch customizer settings:',
      error
    )

    // Fallback values
    websiteName.value = 'DriveEase'

    logoUrl.value = null

    description.value =
      'Premium vehicle rentals for every journey. Fast, affordable, reliable.'
  }
}


// =========================================================
// LOGO ERROR
// =========================================================

function handleLogoError(event) {

  console.error(
    'Footer logo failed:',
    event.target.src
  )

  logoUrl.value = null
}


// =========================================================
// LOAD
// =========================================================

onMounted(() => {
  fetchCustomizer()
})
</script>