<template>
  <section class="min-h-screen bg-[var(--background)] py-6 px-4 sm:px-6 lg:px-8 text-[var(--text)] antialiased font-sans">
    <div class="max-w-[1200px] mx-auto space-y-6">

      <!-- =====================================================
            TOP NAVIGATION / BREADCRUMB
      ====================================================== -->
      <nav class="flex items-center justify-between gap-4 py-2" aria-label="Booking progress">
        <button
          type="button"
          @click="goBack"
          class="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--text)] font-medium transition-colors cursor-pointer"
        >
          <i class="fa-solid fa-arrow-left text-xs"></i>
          Back to fleet
        </button>

        <div class="hidden sm:flex items-center gap-3 text-xs tracking-widest text-[var(--muted)] uppercase font-semibold">
          <span>SELECT VEHICLE</span>
          <span class="w-6 h-[1px] bg-[var(--border)]"></span>
          <b class="text-[var(--text)]">RESERVATION</b>
          <span class="w-6 h-[1px] bg-[var(--border)]"></span>
          <span>PAYMENT</span>
        </div>
      </nav>

      <!-- =====================================================
            LOADING STATE
      ====================================================== -->
      <div
        v-if="vehicleStore.loading"
        class="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-16 text-center shadow-sm"
        role="status"
      >
        <i class="fa-solid fa-circle-notch fa-spin text-4xl text-[var(--accent)]"></i>
        <h1 class="text-xl font-bold mt-4 text-[var(--text)]">Loading your vehicle...</h1>
        <p class="text-sm text-[var(--secondary)] mt-1">Please wait while we load the vehicle details.</p>
      </div>

      <!-- =====================================================
            VEHICLE NOT FOUND
      ====================================================== -->
      <div
        v-else-if="
          !vehicle ||
          vehicleStore.error ||
          !Number.isInteger(vehicleId) ||
          vehicleId <= 0
        "
        class="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-16 text-center shadow-sm space-y-4"
      >
        <div class="w-16 h-16 bg-[var(--background)] rounded-full flex items-center justify-center mx-auto text-[var(--muted)] text-2xl">
          <i class="fa-solid fa-car"></i>
        </div>

        <h1 class="text-2xl font-black text-[var(--text)]">Vehicle unavailable</h1>

        <p class="text-sm text-[var(--secondary)] max-w-md mx-auto">
          We could not load this vehicle. Please return to the fleet and try again.
        </p>

        <button
          type="button"
          @click="goBack"
          class="inline-flex items-center gap-2 px-5 py-2.5 bg-[#141226] hover:bg-[#1E1B3A] text-white text-xs font-bold rounded-lg transition-all shadow-sm cursor-pointer"
        >
          <i class="fa-solid fa-arrow-left"></i>
          Back to vehicles
        </button>
      </div>

      <!-- =====================================================
            MAIN CONTENT
      ====================================================== -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        <!-- ===================================================
              LEFT MAIN SECTION
        ==================================================== -->
        <div class="lg:col-span-8 space-y-6">

          <!-- VEHICLE OVERVIEW CARD -->
          <article class="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-12">
            
            <!-- Image Panel -->
            <div class="md:col-span-5 bg-[var(--background)] relative min-h-[220px] flex items-center justify-center p-6">


              <img
                :key="mainImage"
                :src="mainImage"
                :alt="vehicleName"
                @error="handleImageError"
                class="w-full h-44 object-contain mix-blend-multiply hover:scale-105 transition-transform duration-300"
              />
            </div>

            <!-- Vehicle Info -->
            <div class="md:col-span-7 p-6 flex flex-col justify-between">
              <div>
                <div class="flex justify-between items-center gap-2 text-xs font-extrabold tracking-wider uppercase text-[var(--muted)]">
                  <span>{{ vehicleBrand }} COLLECTION</span>
                  <span class="bg-[var(--background)] text-[var(--text)] px-2 py-1 rounded text-[10px] font-bold">
                    {{ vehicleCategory }}
                  </span>
                </div>

                <h1 class="text-2xl font-black text-[var(--text)] mt-2">
                  {{ vehicleName }}
                </h1>

                <p class="text-xs text-[var(--secondary)] mt-2 leading-relaxed">
                  {{
                    vehicle.description ||
                    'Your next journey, thoughtfully arranged. Choose your rental dates and make this vehicle part of your plans.'
                  }}
                </p>
              </div>

              <!-- Specifications Grid -->
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 mt-4 border-t border-[var(--border)]">
                <div class="bg-[var(--background)] p-2 rounded-lg text-center flex flex-col items-center justify-center gap-1">
                  <i class="fa-solid fa-gears text-sm text-[var(--muted)]"></i>
                  <strong class="text-[11px] font-bold text-[var(--text)] truncate max-w-full">{{ transmission }}</strong>
                </div>

                <div class="bg-[var(--background)] p-2 rounded-lg text-center flex flex-col items-center justify-center gap-1">
                  <i class="fa-solid fa-gas-pump text-sm text-[var(--muted)]"></i>
                  <strong class="text-[11px] font-bold text-[var(--text)] truncate max-w-full">{{ fuelType }}</strong>
                </div>

                <div class="bg-[var(--background)] p-2 rounded-lg text-center flex flex-col items-center justify-center gap-1">
                  <i class="fa-solid fa-users text-sm text-[var(--muted)]"></i>
                  <strong class="text-[11px] font-bold text-[var(--text)] truncate max-w-full">{{ seats }} seats</strong>
                </div>

                <div class="bg-[var(--background)] p-2 rounded-lg text-center flex flex-col items-center justify-center gap-1">
                  <i class="fa-solid fa-shield-halved text-sm text-[var(--muted)]"></i>
                  <strong class="text-[11px] font-bold text-[var(--text)] truncate max-w-full">{{ vehicleCategory }}</strong>
                </div>
              </div>
            </div>
          </article>


          <!-- RENTAL SCHEDULE PANEL -->
          <section class="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 shadow-sm space-y-5">
            <div class="flex items-center justify-between flex-wrap gap-2">
              <h2 class="text-lg font-bold text-[var(--text)] flex items-center gap-2">
                <i class="fa-regular fa-calendar text-[var(--muted)]"></i>
                Rental Schedule & Routing
              </h2>

              <span class="px-3 py-1 bg-blue-500/10 text-blue-600 text-xs font-bold rounded-full">
                {{ rentalDays }} days selected
              </span>
            </div>

            <!-- Date Pickers Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Pickup -->
              <div class="bg-[var(--background)] p-4 rounded-xl border border-[var(--border)] space-y-2">
                <h3 class="text-xs font-bold text-[var(--text)] flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-[#10B981]"></span>
                  Pick-up timeline
                </h3>

                <label for="pickup-date" class="block text-xs font-semibold text-[var(--muted)]">
                  Pick-up date
                </label>

                <input
                  id="pickup-date"
                  v-model="form.pickupDate"
                  type="date"
                  :min="today"
                  required
                  class="w-full p-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-xs font-bold text-[var(--text)] focus:outline-none focus:border-[var(--accent)] transition-all"
                  :aria-invalid="!!scheduleError"
                />
              </div>

              <!-- Return -->
              <div class="bg-[var(--background)] p-4 rounded-xl border border-[var(--border)] space-y-2">
                <h3 class="text-xs font-bold text-[var(--text)] flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-gray-900"></span>
                  Return timeline
                </h3>

                <label for="return-date" class="block text-xs font-semibold text-[var(--muted)]">
                  Return date
                </label>

                <input
                  id="return-date"
                  v-model="form.returnDate"
                  type="date"
                  :min="form.pickupDate || today"
                  required
                  class="w-full p-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-xs font-bold text-[var(--text)] focus:outline-none focus:border-[var(--accent)] transition-all"
                  :aria-invalid="!!scheduleError"
                />
              </div>
            </div>

            <!-- Alerts -->
            <p v-if="scheduleError" class="text-xs font-bold text-[var(--danger)] flex items-center gap-1.5" role="alert">
              <i class="fa-solid fa-circle-exclamation"></i>
              {{ scheduleError }}
            </p>

            <p v-else class="text-xs font-bold text-[#10B981] flex items-center gap-1.5">
              <i class="fa-solid fa-check"></i>
              {{ rentalDays }} days to make the most of your journey
            </p>

            <!-- Station Info -->
            <div class="space-y-1.5">
              <span class="block text-xs font-semibold text-[var(--muted)]">
                Pick-up station & branch
              </span>

              <div class="bg-[var(--background)] p-3.5 rounded-lg border border-[var(--border)] text-xs font-bold text-[var(--text)] flex items-center gap-2.5">
                <i class="fa-solid fa-location-dot text-[#10B981]"></i>
                {{ pickupStation }}
              </div>
            </div>

            <p class="text-xs text-[var(--secondary)] flex items-start gap-2 leading-relaxed">
              <i class="fa-solid fa-circle-info mt-0.5 text-[var(--muted)]"></i>
              Confirm handover times and return arrangements with our rental team.
            </p>
          </section>


          <!-- DRIVER DETAILS PANEL -->
          <section class="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 shadow-sm space-y-5">
            <div class="flex items-center justify-between flex-wrap gap-2">
              <h2 class="text-lg font-bold text-[var(--text)] flex items-center gap-2">
                <i class="fa-regular fa-user text-[var(--muted)]"></i>
                Driver Details
              </h2>

              <span class="px-3 py-1 bg-emerald-500/10 text-[#10B981] text-xs font-bold rounded-full">
                {{ authStore.isAuthenticated ? 'Customer profile' : 'Guest profile' }}
              </span>
            </div>

            <div class="bg-[var(--background)] p-4 rounded-xl border border-[var(--border)] flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
              <div class="flex items-center gap-3">
                <span class="w-10 h-10 rounded-full bg-black text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {{ initials }}
                </span>

                <div class="space-y-0.5">
                  <h3 class="text-xs font-bold text-[var(--text)]">
                    {{ customerName }}
                  </h3>

                  <p class="text-xs text-[var(--muted)] truncate">
                    {{ authStore.user?.email || 'Sign in to complete your reservation' }}
                  </p>
                </div>
              </div>

              <RouterLink
                :to="
                  authStore.isAuthenticated
                    ? '/profile'
                    : { name: 'login', query: { redirect: route.fullPath } }
                "
                class="px-3 py-1.5 bg-[var(--surface)] hover:bg-[var(--border)] text-[var(--text)] text-xs font-bold rounded-md border border-[var(--border)] transition-all whitespace-nowrap"
              >
                {{ authStore.isAuthenticated ? 'Edit details' : 'Sign in' }}
              </RouterLink>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div class="flex items-center gap-3">
                <i class="fa-solid fa-shield-halved text-xl text-[#10B981] shrink-0"></i>
                <p class="text-xs leading-tight">
                  <strong class="block font-bold text-[var(--text)]">Bring your driving license</strong>
                  <span class="text-[var(--muted)]">A valid license is required at pickup.</span>
                </p>
              </div>

              <div class="flex items-center gap-3">
                <i class="fa-solid fa-check text-xl text-[#10B981] shrink-0"></i>
                <p class="text-xs leading-tight">
                  <strong class="block font-bold text-[var(--text)]">Ready for the road</strong>
                  <span class="text-[var(--muted)]">Review your details before continuing.</span>
                </p>
              </div>
            </div>
          </section>

        </div>


        <!-- ===================================================
              RIGHT SIDEBAR
        ==================================================== -->
        <aside class="lg:col-span-4 space-y-4 lg:sticky lg:top-6">

          <section class="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden shadow-sm">
            
            <!-- Header -->
            <header class="bg-[#141226] text-white p-5 flex items-center justify-between gap-3">
              <div class="flex items-center gap-3">
                <i class="fa-solid fa-receipt text-xl"></i>
                <h2 class="text-base font-extrabold leading-tight">
                  Reservation<br />Summary
                </h2>
              </div>

              <span class="text-right text-xs font-extrabold tracking-wider text-gray-400">
                <b class="block text-white text-sm">2 / 4</b> STEPS
              </span>
            </header>

            <!-- Vehicle Mini Banner -->
            <div class="p-4 bg-[var(--background)] border-b border-[var(--border)] flex items-center gap-3">
          <img
            :key="mainImage"
            :src="mainImage"
            :alt="vehicleName"
            @error="handleImageError"
            class="w-full h-44 object-contain mix-blend-multiply hover:scale-105 transition-transform duration-300"
          />

              <div>
                <h3 class="text-xs font-bold text-[var(--text)]">
                  {{ vehicleName }}
                </h3>
                <p class="text-[11px] text-[var(--muted)]">
                  {{ vehicleCategory }} &bull; {{ rentalDays }} days
                </p>
              </div>
            </div>

            <!-- Price Breakdown Body -->
            <div class="p-5 space-y-4">
              <dl class="space-y-3 text-xs">
                <div class="flex justify-between gap-2">
                  <dt class="text-[var(--muted)]">Daily rate</dt>
                  <dd class="font-bold text-[var(--text)]">{{ money(vehiclePrice) }}</dd>
                </div>

                <div class="flex justify-between gap-2">
                  <dt class="text-[var(--muted)]">Rental duration</dt>
                  <dd class="font-bold text-[var(--text)]">{{ rentalDays }} days</dd>
                </div>

                <div class="flex justify-between gap-2">
                  <dt class="text-[var(--muted)]">Vehicle status</dt>
                  <dd class="font-bold" :class="vehicleStatus === 'AVAILABLE' ? 'text-[#10B981]' : 'text-[var(--muted)]'">
                    {{ vehicleStatusText }}
                  </dd>
                </div>
              </dl>

              <!-- Total Box -->
              <div class="pt-4 border-t border-[var(--border)] flex items-center justify-between gap-2">
                <div>
                  <h3 class="text-xs font-bold text-[var(--text)]">Rental total</h3>
                  <p class="text-[11px] text-[var(--muted)]">
                    {{ money(vehiclePrice) }} &times; {{ rentalDays }} days
                  </p>
                </div>

                <div class="text-right">
                  <strong class="text-2xl font-black text-[var(--text)] block leading-none">
                    {{ money(total) }}
                  </strong>
                  <span class="text-[10px] font-bold text-[var(--muted)] tracking-wider uppercase">USD CURRENCY</span>
                </div>
              </div>

              <!-- Note -->
              <div class="bg-[var(--background)] p-2.5 rounded-md text-center text-xs font-medium text-[var(--secondary)] flex items-center justify-center gap-1.5 border border-[var(--border)]">
                <i class="fa-solid fa-shield-halved text-[#10B981]"></i>
                Review your booking before payment
              </div>

              <!-- Action Button -->
              <button
                type="button"
                class="w-full py-3.5 px-4 bg-[#141226] hover:bg-[#1E1B3A] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                :disabled="!canBook || bookingStore.loading"
                @click="createBooking()"
              >
                {{ bookingStore.loading ? 'Creating reservation...' : 'Continue to Payment' }}
                <i class="fa-solid fa-arrow-right text-[10px]"></i>
              </button>

              <!-- Error Messages -->
              <p v-if="vehicleStatus !== 'AVAILABLE'" class="text-xs font-bold text-[var(--danger)] text-center">
                This vehicle is currently unavailable for booking.
              </p>

              <p v-else-if="Number(vehiclePrice) <= 0" class="text-xs font-bold text-[var(--danger)] text-center">
                Contact our team to confirm the rental rate.
              </p>

              <button
                type="button"
                class="w-full pt-2 text-center text-xs font-bold text-[var(--muted)] hover:text-[var(--text)] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                @click="goBack"
              >
                <i class="fa-solid fa-arrow-left text-[10px]"></i>
                Back to vehicle selection
              </button>
            </div>

            <!-- Footer -->
            <div class="p-4 bg-[var(--background)] border-t border-[var(--border)] flex items-start gap-2.5 text-xs text-[var(--secondary)]">
              <i class="fa-solid fa-circle-info text-[#10B981] mt-0.5 shrink-0"></i>
              <p class="leading-relaxed">
                <strong class="font-bold text-[var(--text)] block">A little planning, a better journey.</strong>
                Confirm rental terms and any additional charges with the team before payment.
              </p>
            </div>
          </section>

          <!-- Support Banner -->
          <RouterLink
            to="/contact"
            class="bg-[var(--surface)] hover:bg-[var(--background)] border border-[var(--border)] p-4 rounded-xl flex items-center gap-3 transition-colors text-[var(--text)] shadow-sm"
          >
            <i class="fa-solid fa-headphones text-xl text-[var(--muted)]"></i>

            <div class="flex-1">
              <strong class="block text-xs font-bold text-[var(--text)]">Need a hand with your booking?</strong>
              <small class="text-xs text-[var(--muted)]">Our team is here to help</small>
            </div>

            <i class="fa-solid fa-arrow-right text-xs text-[var(--muted)]"></i>
          </RouterLink>

        </aside>

      </div>

    </div>
  </section>
</template>

<script setup>
import {
  computed,
  onMounted,
  reactive,
  ref
} from 'vue'

import {
  useRoute,
  useRouter
} from 'vue-router'

// Stores
import { useVehicleStore } from '../stores/Vehicle'
import { useBookingStore } from '../stores/Booking'
import { useAuthStore } from '../stores/Auth'

// Assets & API
import heroImage from '../assets/hero.png'
import { getVehiclesImage } from '../api/vehicle.js'

const route = useRoute()
const router = useRouter()

const vehicleStore = useVehicleStore()
const bookingStore = useBookingStore()
const authStore = useAuthStore()

const vehicleImages = ref([])

const mainImage = computed(() => {
  const image = vehicle.value?.mainImage

  if (!image) {
    return heroImage
  }

  if (
    image.startsWith('http://') ||
    image.startsWith('https://') ||
    image.startsWith('data:')
  ) {
    return image
  }

  return `http://localhost:8080${
    image.startsWith('/') ? image : `/${image}`
  }`
})
/* =========================================================
   DATE HELPERS
========================================================= */
function localDate(offset = 0) {
  const date = new Date()
  date.setDate(date.getDate() + offset)

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0')
  ].join('-')
}

const today = localDate()

const form = reactive({
  pickupDate: localDate(1),
  returnDate: localDate(4)
})

/* =========================================================
   COMPUTED VEHICLE VALUES
========================================================= */
const vehicleId = computed(() => Number(route.params.vehicleId))

const vehicle = computed(() => vehicleStore.vehicle)

const vehicleName = computed(() => {
  const v = vehicle.value
  return v?.name || v?.vehicleName || v?.model || 'Premium Vehicle'
})

const vehicleBrand = computed(() => {
  const v = vehicle.value
  if (!v) return 'Vehicle'
  const brand = v.brand
  if (typeof brand === 'string') return brand
  if (brand && typeof brand === 'object') {
    return brand.brandName || brand.name || brand.brand_name || brand.make || 'Vehicle'
  }
  return v.brandName || v.brand_name || v.make || 'Vehicle'
})

const vehicleCategory = computed(() => {
  const v = vehicle.value
  if (!v) return 'Rental'
  const category = v.category
  if (typeof category === 'string') return category
  if (category && typeof category === 'object') {
    return category.categoryName || category.name || category.category_name || category.type || 'Rental'
  }
  return v.categoryName || v.category_name || v.type || 'Rental'
})

const vehiclePrice = computed(() => {
  const v = vehicle.value
  return v?.pricePerDay ?? v?.price_per_day ?? v?.price ?? v?.rentalPrice ?? 0
})

const fuelType = computed(() => {
  const v = vehicle.value
  return v?.fuelType || v?.fuel_type || v?.fuel || 'Gasoline'
})

const transmission = computed(() => {
  const v = vehicle.value
  return v?.transmission || v?.transmissionType || v?.transmission_type || 'Automatic'
})

const seats = computed(() => {
  const v = vehicle.value
  return v?.seats ?? v?.seat ?? v?.numberOfSeats ?? 4
})

const vehicleStatus = computed(() => String(vehicle.value?.status || '').toUpperCase())

const vehicleStatusText = computed(() => {
  switch (vehicleStatus.value) {
    case 'AVAILABLE': return 'Available'
    case 'RENTED': return 'Rented'
    case 'MAINTENANCE': return 'Maintenance'
    case 'RESERVED': return 'Reserved'
    default: return 'Unknown'
  }
})

const rentalDays = computed(() => {
  if (!form.pickupDate || !form.returnDate) return 0
  const pickup = Date.parse(form.pickupDate)
  const returnDate = Date.parse(form.returnDate)
  const days = (returnDate - pickup) / 86400000
  return Number.isFinite(days) ? Math.max(0, Math.ceil(days)) : 0
})

const scheduleError = computed(() => {
  if (!form.pickupDate || !form.returnDate) return 'Choose both rental dates.'
  if (form.pickupDate < today) return 'Pickup date cannot be in the past.'
  if (rentalDays.value < 1) return 'Return date must be after pickup date.'
  return ''
})

const total = computed(() => Math.max(0, Number(vehiclePrice.value) || 0) * rentalDays.value)

const canBook = computed(() => {
  return !scheduleError.value && vehicleStatus.value === 'AVAILABLE' && Number(vehiclePrice.value) > 0
})

const money = (value) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value) || 0)
}

const customerName = computed(() => {
  return authStore.user?.name || authStore.user?.fullName || authStore.user?.username || 'Guest driver'
})

const initials = computed(() => {
  return customerName.value.split(/\s+/).slice(0, 2).map(part => part[0]).join('').toUpperCase()
})

const pickupStation = computed(() => {
  const location = vehicle.value?.location
  if (typeof location === 'string') return location
  return location?.name || location?.address || 'Contact our team to arrange your pickup'
})

/* =========================================================
   IMAGE FORMATTERS
========================================================= */
function formatImageUrl(rawPath) {
  if (!rawPath || typeof rawPath !== 'string') return null
  const path = rawPath.trim()
  if (!path) return null
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) return path
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `http://localhost:8080${cleanPath}`
}

const vehicleImage = computed(() => {
  const currentVehicle = vehicle.value
  if (!currentVehicle) return heroImage

  if (Array.isArray(currentVehicle.vehicleImages) && currentVehicle.vehicleImages.length > 0) {
    const imageObject = currentVehicle.vehicleImages[0]
    const raw = typeof imageObject === 'string' ? imageObject : (imageObject?.image || imageObject?.imageUrl || imageObject?.url || imageObject?.path || imageObject?.imagePath)
    const formatted = formatImageUrl(raw)
    if (formatted) return formatted
  }

  const directPath = currentVehicle.image || currentVehicle.imageUrl || currentVehicle.imagePath
  if (typeof directPath === 'string' && directPath.trim()) {
    const formatted = formatImageUrl(directPath)
    if (formatted) return formatted
  }

  if (Array.isArray(vehicleImages.value) && vehicleImages.value.length > 0) {
    const currentVehicleId = Number(currentVehicle.id)
    const matchById = vehicleImages.value.find(image => {
      const imageVehicleId = Number(image.vehicle_id ?? image.vehicleId ?? image.vehicle?.id ?? image.vehicle?.vehicleId)
      return imageVehicleId && imageVehicleId === currentVehicleId
    })

    if (matchById) {
      const raw = matchById.image || matchById.imageUrl || matchById.url || matchById.path || matchById.imagePath
      const formatted = formatImageUrl(raw)
      if (formatted) return formatted
    }
  }

  return heroImage
})

function handleImageError(event) {
  if (!event?.target || event.target.dataset.fallback === 'true') return
  event.target.dataset.fallback = 'true'
  event.target.src = heroImage
}

async function fetchVehicleImages() {
  try {
    const response = await getVehiclesImage()
    const data = response?.data ?? response
    vehicleImages.value = Array.isArray(data) ? data : (Array.isArray(data?.data) ? data.data : [])
  } catch (error) {
    console.error('Failed to fetch vehicle images:', error)
    vehicleImages.value = []
  }
}

/* =========================================================
   CREATE BOOKING
========================================================= */
async function createBooking() {
  if (!canBook.value || bookingStore.loading) return

  try {
    let userId = Number(authStore.user?.id)

    if (!userId) {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser)
          userId = Number(parsedUser?.id)
        } catch (error) {
          console.error('Invalid stored user:', error)
        }
      }
    }

    if (!Number.isInteger(userId) || userId <= 0) {
      alert('Please login before booking a vehicle.')
      router.push({ name: 'login', query: { redirect: route.fullPath } })
      return
    }

    const id = vehicleId.value
    if (!Number.isInteger(id) || id <= 0) throw new Error('Invalid vehicle.')

    const booking = await bookingStore.createBooking({
      userId,
      vehicleId: id,
      pickupDate: form.pickupDate,
      returnDate: form.returnDate
    })

    const bookingId = booking?.id || booking?.bookingId
    if (!bookingId) throw new Error('Booking was created without an id.')

    router.push(`/payment/${bookingId}`)
  } catch (error) {
    console.error('Create booking error:', error)
    alert(error?.response?.data?.message || error?.message || 'Failed to create booking')
  }
}

function goBack() {
  router.back()
}

/* =========================================================
   ON MOUNT
========================================================= */
onMounted(async () => {
  if (!Number.isInteger(vehicleId.value) || vehicleId.value <= 0) {
    console.error('Invalid vehicle ID:', route.params.vehicleId)
    return
  }

  try {
    await Promise.all([
      vehicleStore.fetchVehicle(vehicleId.value),
      fetchVehicleImages()
    ])
  } catch (error) {
    console.error('Failed to fetch vehicle detail:', error)
  }
})
</script>