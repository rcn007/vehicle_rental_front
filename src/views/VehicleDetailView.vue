<template>
  <section class="min-h-screen bg-[#F4F6F9] py-8 px-4 sm:px-6 lg:px-8 text-slate-800 font-sans">
    <div class="max-w-6xl mx-auto space-y-6">
      
      <!-- =====================================================
           TOP NAVIGATION BAR
      ====================================================== -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white px-6 py-4 rounded-2xl shadow-xs border border-slate-100">
        <div class="flex items-center gap-4">
          <button 
            type="button" 
            @click="goBack" 
            class="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer flex items-center gap-2 text-sm font-medium"
          >
            <i class="fa-solid fa-arrow-left text-base"></i>
            <span>Back</span>
          </button>
          
          <span class="text-xl font-bold text-slate-900">Car Details</span>

          <!-- Status Badge -->
          <span 
            :class="[
              'text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider',
              vehicleStatusClass
            ]"
          >
            {{ vehicleStatusText }}
          </span>
        </div>

        <!-- Navigation Pills -->
        <div class="flex items-center gap-2 sm:gap-3 text-sm font-semibold">
          <button class="px-5 py-2 rounded-full bg-[#1E3A8A] text-white shadow-xs cursor-pointer">
            Info and price
          </button>
          <button class="px-5 py-2 rounded-full text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer">
            Guest Ratings
          </button>
          <button class="px-5 py-2 rounded-full text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer">
            Location
          </button>
        </div>
      </div>

      <!-- =====================================================
           LOADING STATE
      ====================================================== -->
      <div v-if="vehicleStore.loading" class="flex flex-col items-center justify-center py-24 text-slate-400 bg-white rounded-3xl border border-slate-100 shadow-xs">
        <i class="fa-solid fa-circle-notch animate-spin text-4xl text-blue-600 mb-3"></i>
        <p class="text-sm font-medium">Loading vehicle details...</p>
      </div>

      <!-- =====================================================
           NOT FOUND STATE
      ====================================================== -->
      <div v-else-if="!vehicleStore.vehicle" class="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-slate-100 text-center">
        <div class="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <i class="fa-solid fa-car text-2xl text-slate-400"></i>
        </div>
        <h2 class="text-xl font-bold text-slate-800">Vehicle Not Found</h2>
        <p class="text-sm text-slate-500 mt-2">The vehicle you are looking for does not exist or has been removed.</p>
        <button
          type="button"
          @click="goBack"
          class="mt-6 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition cursor-pointer"
        >
          <i class="fa-solid fa-arrow-left mr-2"></i>
          Back to Vehicles
        </button>
      </div>

      <!-- =====================================================
           MAIN VEHICLE DETAILS CARD
      ====================================================== -->
      <div v-else class="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-100">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <!-- Vehicle Image Display -->
          <div class="lg:col-span-5 flex flex-col items-center">
            <div class="relative w-full aspect-[4/3] flex items-center justify-center bg-slate-50/50 rounded-2xl p-4 overflow-hidden">
              <img
                :src="vehicleImage"
                :alt="vehicleName"
                class="w-full h-full object-contain max-h-[300px] hover:scale-105 transition-transform duration-300"
                @error="handleImageError"
              />
            </div>
          </div>

          <!-- Info & Actions Panel -->
          <div class="lg:col-span-7 space-y-6">
            
            <!-- Header Title & Redesigned Pricing/Action Card -->
            <div class="flex flex-col sm:flex-row sm:items-stretch justify-between gap-6 border-b border-slate-100 pb-6">
              
              <!-- Vehicle Header Details -->
              <div class="flex-1">
                <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  {{ vehicleName }}
                </h1>
                <p class="text-sm text-slate-500 mt-1 flex items-center gap-1.5 font-medium">
                  <i class="fa-solid fa-location-dot text-blue-600"></i>
                  {{ vehicleBrand }} • {{ vehicleCategory }}
                </p>

                <!-- Rating Badge -->
                <div class="flex items-center gap-3 mt-4">
                  <div class="flex items-center gap-1.5 bg-[#1E3A8A] text-white px-3 py-1 rounded-lg font-bold text-sm shadow-xs">
                    <span>4.9</span>
                    <i class="fa-solid fa-star text-amber-300 text-xs"></i>
                  </div>
                  <div>
                    <span class="font-bold text-slate-800 text-sm block leading-none">Excellent</span>
                    <span class="text-xs text-slate-400">275 Reviews</span>
                  </div>
                  <div class="flex text-amber-400 text-xs gap-0.5 ml-1">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                  </div>
                </div>
              </div>

              <!-- Redesigned Interactive Booking Card -->
              <div class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-5 rounded-2xl shadow-xl flex flex-col justify-between shrink-0 min-w-[240px] border border-slate-700/50 relative overflow-hidden group">
                <!-- Background Accent Glow -->
                <div class="absolute -right-8 -top-8 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all duration-500"></div>

                <div>
                  <div class="flex items-center justify-between mb-2">
                    <span class="bg-gradient-to-r from-amber-400 to-rose-400 text-slate-950 font-black text-[10px] uppercase px-2 py-0.5 rounded-full tracking-wider shadow-xs">
                      20% OFF
                    </span>
                    <span class="text-xs text-slate-400 line-through font-medium">Save $129</span>
                  </div>

                  <div class="flex items-baseline gap-1.5 my-1">
                    <span class="text-3xl font-black text-white tracking-tight">${{ vehiclePrice }}</span>
                    <span class="text-xs text-slate-400 font-medium">/ day</span>
                  </div>
                </div>

                <div class="mt-4">
                              <!-- Active Booking Button -->
            <div class="vehicle-actions">



                    <RouterLink
                      :to="`/booking/${vehicle.id}`"
                      class="btn btn-primary"
                    >
                      Book Now
                    </RouterLink>

                  </div>

                  <p class="text-[11px] text-slate-400 text-center mt-2 font-medium flex items-center justify-center gap-1">
                    <i class="fa-solid fa-shield-halved text-emerald-400 text-[10px]"></i>
                    Free cancellation up to 24h
                  </p>
                </div>
              </div>

            </div>

            <!-- Popular Service Specifications Bar -->
            <div>
              <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Popular Service</h3>
              <div class="flex flex-wrap items-center gap-6 text-sm text-slate-600 font-medium">
                <div class="flex items-center gap-2">
                  <i class="fa-solid fa-square-parking text-slate-400 text-base"></i>
                  <span>Parking</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="fa-solid fa-chair text-slate-400 text-base"></i>
                  <span>{{ seats }} Seats</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="fa-solid fa-fan text-slate-400 text-base"></i>
                  <span>{{ transmission }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="fa-solid fa-gas-pump text-slate-400 text-base"></i>
                  <span>{{ fuelType }}</span>
                </div>
              </div>
            </div>

            <!-- Included Coverage Checkboxes -->
            <div class="pt-4 border-t border-slate-100">
              <div class="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-700">
                <div class="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200/60">
                  <i class="fa-solid fa-square-check text-blue-600 text-sm"></i>
                  <span>Amendments</span>
                </div>
                <div class="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200/60">
                  <i class="fa-solid fa-square-check text-blue-600 text-sm"></i>
                  <span>Theft Protection</span>
                </div>
                <div class="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200/60">
                  <i class="fa-solid fa-square-check text-blue-600 text-sm"></i>
                  <span>Collision Damage Waiver</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- =====================================================
           SUPPLIER LOCATION CARD
      ====================================================== -->
      <div v-if="vehicleStore.vehicle" class="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-100">
        <h2 class="text-xl font-extrabold text-slate-900 mb-6">Supplier Location</h2>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <!-- Location Info Column -->
          <div class="lg:col-span-7 space-y-6">
            <!-- Pick Up & Drop Off -->
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500">
                <i class="fa-solid fa-car text-sm"></i>
              </div>
              <div>
                <h4 class="font-bold text-slate-900 text-sm">Pick Up & Drop Off</h4>
                <p class="text-xs font-semibold text-slate-600 mt-0.5">Alamo - Main Branch</p>
                <p class="text-xs text-slate-400 mt-0.5">Rental Lounge Vertical Circle, Ground Floor, Central Terminal</p>
              </div>
            </div>

            <!-- Opening Hours -->
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500">
                <i class="fa-regular fa-clock text-sm"></i>
              </div>
              <div>
                <h4 class="font-bold text-slate-900 text-sm">Opening hours</h4>
                <p class="text-xs text-slate-500 mt-0.5">Monday - Friday</p>
                <p class="text-xs font-semibold text-slate-700">6:00 AM - 12:00 PM</p>
              </div>
            </div>
          </div>

          <!-- Map Preview Column -->
          <div class="lg:col-span-5">
            <div class="relative w-full h-48 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200/80 flex flex-col justify-end p-4 group">
              <!-- Grid Background Pattern Mockup -->
              <div class="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-70"></div>

              <!-- Pin Marker -->
              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div class="w-9 h-9 rounded-full bg-[#0066FF] text-white flex items-center justify-center shadow-lg border-2 border-white">
                  <i class="fa-solid fa-car text-xs"></i>
                </div>
              </div>

              <!-- Map Overlay Button -->
              <button class="relative z-10 w-full py-2.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl shadow-md border border-slate-200 transition-colors uppercase tracking-wider text-center cursor-pointer">
                SHOW ON MAP
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Stores
import { useVehicleStore } from '../stores/Vehicle'
import { useBookingStore } from '../stores/Booking'
import { useAuthStore } from '../stores/Auth'

// Assets & API
import BookingForm from '../components/BookingForm.vue'
import heroImage from '../assets/hero.png'
import { getVehiclesImage } from '../api/vehicle.js'

// =========================================================
// ROUTER & STORES
// =========================================================
const route = useRoute()
const router = useRouter()

const vehicleStore = useVehicleStore()
const bookingStore = useBookingStore()
const authStore = useAuthStore()

// =========================================================
// REACTIVE STATE
// =========================================================
const vehicleImages = ref([])

// =========================================================
// BASIC VEHICLE COMPUTEDS
// =========================================================
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

// =========================================================
// VEHICLE STATUS COMPUTEDS
// =========================================================
const vehicleStatus = computed(() => {
  return String(vehicle.value?.status || '').toUpperCase()
})

const vehicleStatusText = computed(() => {
  switch (vehicleStatus.value) {
    case 'AVAILABLE': return 'Available'
    case 'RENTED': return 'Rented'
    case 'MAINTENANCE': return 'Maintenance'
    case 'RESERVED': return 'Reserved'
    default: return 'Unknown'
  }
})

const vehicleStatusClass = computed(() => {
  switch (vehicleStatus.value) {
    case 'AVAILABLE': return 'bg-emerald-100 text-emerald-700'
    case 'RENTED': return 'bg-red-100 text-red-700'
    case 'MAINTENANCE': return 'bg-amber-100 text-amber-700'
    case 'RESERVED': return 'bg-blue-100 text-blue-700'
    default: return 'bg-slate-100 text-slate-700'
  }
})

const isLambo = computed(() => {
  return vehicleName.value.toLowerCase() === 'lamborghini aventador'
})

// =========================================================
// IMAGE RESOLUTION & HELPERS
// =========================================================
function formatImageUrl(rawPath) {
  if (!rawPath || typeof rawPath !== 'string') return null
  const path = rawPath.trim()
  if (!path) return null

  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:')
  ) {
    return path
  }

  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `http://localhost:8080${cleanPath}`
}

const vehicleImage = computed(() => {
  const currentVehicle = vehicle.value
  if (!currentVehicle) return heroImage

  // 1. Check vehicle.vehicleImages array
  if (Array.isArray(currentVehicle.vehicleImages) && currentVehicle.vehicleImages.length > 0) {
    const imgObj = currentVehicle.vehicleImages[0]
    const raw = typeof imgObj === 'string'
      ? imgObj
      : (imgObj?.image || imgObj?.imageUrl || imgObj?.url || imgObj?.path || imgObj?.imagePath)

    const formatted = formatImageUrl(raw)
    if (formatted) return formatted
  }

  // 2. Check direct image properties
  const directPath = currentVehicle.image || currentVehicle.imageUrl || currentVehicle.imagePath
  if (typeof directPath === 'string' && directPath.trim()) {
    const formatted = formatImageUrl(directPath)
    if (formatted) return formatted
  }

  // 3. Search fetched vehicleImages list by vehicle ID
  if (Array.isArray(vehicleImages.value) && vehicleImages.value.length > 0) {
    const currentVehicleId = Number(currentVehicle.id)
    const matchById = vehicleImages.value.find((img) => {
      const imgVehicleId = Number(
        img.vehicle_id ?? img.vehicleId ?? img.vehicle?.id ?? img.vehicle?.vehicleId
      )
      return imgVehicleId && imgVehicleId === currentVehicleId
    })

    if (matchById) {
      const raw = matchById.image || matchById.imageUrl || matchById.url || matchById.path || matchById.imagePath
      const formatted = formatImageUrl(raw)
      if (formatted) return formatted
    }

    // 4. Search fetched vehicleImages list by vehicle Name
    const currentVehicleName = (
      currentVehicle.name || `${currentVehicle.brandName || ''} ${currentVehicle.model || ''}`
    ).trim().toLowerCase()

    const matchByName = vehicleImages.value.find((img) => {
      const imgVehicleName = String(img.vehicle_name ?? img.vehicleName ?? img.name ?? '').trim().toLowerCase()
      return imgVehicleName && imgVehicleName === currentVehicleName
    })

    if (matchByName) {
      const raw = matchByName.image || matchByName.imageUrl || matchByName.url || matchByName.path || matchByName.imagePath
      const formatted = formatImageUrl(raw)
      if (formatted) return formatted
    }
  }

  // 5. Default Fallback
  return heroImage
})

function handleImageError(event) {
  console.error('Vehicle detail image failed to load:', event.target.src)
  if (event.target.dataset.fallback === 'true') return
  event.target.dataset.fallback = 'true'
  event.target.src = heroImage
}

// =========================================================
// API ACTIONS
// =========================================================
async function fetchVehicleImages() {
  try {
    const response = await getVehiclesImage()
    const data = response?.data ?? response
    vehicleImages.value = Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
        ? data.data
        : []
  } catch (error) {
    console.error('Failed to fetch vehicle images:', error)
    vehicleImages.value = []
  }
}

async function createBooking(data = {}) {
  try {
    // Get logged-in user from Pinia
    let userId = Number(authStore.user?.id)

    // Fallback: restore user from localStorage
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

    // Check login
    if (!Number.isInteger(userId) || userId <= 0) {
      alert('Please login before booking a vehicle.')
      router.push('/login')
      return
    }

    // Get vehicle ID
    const id = vehicleId.value

    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('Invalid vehicle.')
    }

    console.log('Creating booking with:', {
      userId,
      vehicleId: id
    })

    // Create booking
    const booking = await bookingStore.createBooking({
      userId,
      vehicleId: id,
      pickupDate:
        data.pickupDate ||
        new Date().toISOString().split('T')[0],
      returnDate:
        data.returnDate ||
        new Date(Date.now() + 86400000)
          .toISOString()
          .split('T')[0]
    })

    console.log('Booking response:', booking)

    // Get booking ID
    const bookingId = booking?.id || booking?.bookingId

    if (!bookingId) {
      throw new Error('Booking was created without an id.')
    }

    // Go to payment page
    router.push(`/payment/${bookingId}`)

  } catch (error) {
    console.error('Create booking error:', error)

    alert(
      error.response?.data?.message ||
      error.message ||
      'Failed to create booking'
    )
  }
}

function goBack() {
  router.back()
}

// =========================================================
// LIFECYCLE HOOKS
// =========================================================
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