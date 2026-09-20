<template>
  <section
    :class="[
      'min-h-screen py-8 sm:py-12 transition-colors duration-500 font-sans antialiased',
      isLambo
        ? 'bg-[#090A0F] text-slate-100 selection:bg-amber-500 selection:text-black'
        : 'bg-slate-50/80 text-slate-900'
    ]"
  >
    <!-- LUXURY BACKGROUND AMBIENCE (LAMBORGHINI MODE) -->
    <div
      v-if="isLambo"
      class="fixed inset-0 pointer-events-none overflow-hidden"
    >
      <div class="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]"></div>
      <div class="absolute top-1/3 -right-32 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px]"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
    style="font-family: var(--font-heading);">
      <!-- CLEAN INTEGRATED HEADER BAR -->
      <div class="mb-8 space-y-6">
        <div class="flex items-center justify-between">
          <button
            @click="router.back()"
            :class="[
              'group inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer',
              isLambo ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
            ]"
          >
            <span
              :class="[
                'w-8 h-8 rounded-full border flex items-center justify-center transition-transform group-hover:-translate-x-1',
                isLambo
                  ? 'border-slate-800 bg-slate-900/80 text-slate-300'
                  : 'border-slate-200 bg-white text-slate-600 shadow-xs'
              ]"
            >
              <i class="fa-solid fa-arrow-left text-xs"></i>
            </span>
            <span>Back to Fleet</span>
          </button>
        </div>

        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
          <div>
            <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Reserve Your Vehicle
            </h1>
            <p
              :class="[
                'mt-1.5 text-xl sm:text-xl font-medium max-w-full',
                isLambo ? 'text-slate-900' : 'text-slate-900'
              ]"
            >
              Select your rental period and confirm booking details before proceeding to checkout.
            </p>
          </div>


        </div>
      </div>

      <!-- LOADING STATE -->
      <div
        v-if="vehicleStore.loading"
        class="flex flex-col items-center justify-center py-32 rounded-3xl border border-dashed border-slate-200"
      >
        <div
          :class="[
            'w-14 h-14 rounded-2xl flex items-center justify-center mb-4',
            isLambo ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-50 text-blue-600'
          ]"
        >
          <i class="fa-solid fa-circle-notch animate-spin text-2xl"></i>
        </div>
        <h3 class="font-bold text-base">Preparing Vehicle Details</h3>
        <p class="text-xs text-slate-400 mt-1">Please wait a moment...</p>
      </div>

      <!-- MAIN CONTENT GRID -->
      <div
        v-else-if="vehicleStore.vehicle"
        class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start"
      >
        <!-- LEFT: VEHICLE DISPLAY & SPECIFICATIONS -->
        <div
          :class="[
            'lg:col-span-7 rounded-3xl border overflow-hidden transition-all',
            isLambo
              ? 'bg-slate-900/60 border-slate-800 backdrop-blur-xl shadow-2xl'
              : 'bg-white border-slate-200/80 shadow-xs'
          ]"
        >
          <div class="relative group bg-slate-950/40">
            <div class="aspect-[16/10] sm:aspect-[16/9] overflow-hidden flex items-center justify-center p-6">
              <img
                :src="vehicleImage"
                :alt="vehicleStore.vehicle.name"
                class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                @error="handleImageError"
              />
            </div>

            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none"></div>

            <div class="absolute bottom-5 left-6 right-6 text-white">
              <p class="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-0.5">
                Selected Vehicle
              </p>
              <h2 class="text-2xl sm:text-3xl font-black tracking-tight">
                {{ vehicleStore.vehicle.name }}
              </h2>
            </div>
          </div>

          <div class="p-6 sm:p-7 space-y-6">
            <div class="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800/80">
              <div>
                <p class="text-xl uppercase tracking-tight font-bold text-slate-900" 
                style="font-family: var(--font-heading);">
                  Daily Rate
                </p>
                <div class="flex items-baseline gap-1 mt-5">
                  <span
                    :class="[
                      'text-5xl font-extrabold tracking-tight',
                      isLambo ? 'text-slate-900' : 'text-slate-900'
                    ]"
                  style="font-family: var(--font-heading);">
                    ${{ vehicleStore.vehicle.pricePerDay || vehicleStore.vehicle.price || 0 }}
                  </span>
                  <span class="text-2xl text-slate-900 font-medium">/ day</span>
                </div>
              </div>

            
            </div>

            <div>
              <p class="text-3xl uppercase tracking-wider font-bold text-slate-900 mb-3"
              style="font-family: var(--font-heading);">
                Key Features
              </p>

              <div class="grid grid-cols-3 gap-3" style="font-family: var(--font-heading);">
                <div
                  :class="[
                    'p-3.5 rounded-2xl border flex flex-col justify-between',
                    isLambo ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50/70 border-slate-200/50'
                  ]"
                >
                  <i :class="['fa-solid fa-users text-sm mb-2', isLambo ? 'text-amber-400' : 'text-blue-600']"></i>
                  <div>
                    <span class="text-[10px] uppercase tracking-wider font-bold text-slate-400 block">Seats</span>
                    <span class="text-xs font-extrabold mt-0.5 block">
                      {{ vehicleStore.vehicle.seats || 2 }} Capacity
                    </span>
                  </div>
                </div>

                <div
                  :class="[
                    'p-3.5 rounded-2xl border flex flex-col justify-between',
                    isLambo ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50/70 border-slate-200/50'
                  ]"
                >
                  <i :class="['fa-solid fa-gears text-sm mb-2', isLambo ? 'text-amber-400' : 'text-blue-600']"></i>
                  <div>
                    <span class="text-[10px] uppercase tracking-wider font-bold text-slate-400 block">Gearbox</span>
                    <span class="text-xs font-extrabold mt-0.5 block truncate">
                      {{ vehicleStore.vehicle.transmission || 'Automatic' }}
                    </span>
                  </div>
                </div>

                <div
                  :class="[
                    'p-3.5 rounded-2xl border flex flex-col justify-between',
                    isLambo ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50/70 border-slate-200/50'
                  ]"
                >
                  <i :class="['fa-solid fa-gas-pump text-sm mb-2', isLambo ? 'text-amber-400' : 'text-blue-600']"></i>
                  <div>
                    <span class="text-[10px] uppercase tracking-wider font-bold text-slate-400 block">Fuel Engine</span>
                    <span class="text-xs font-extrabold mt-0.5 block truncate">
                      {{ vehicleStore.vehicle.fuelType || 'Gasoline' }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500"
            style="font-family: var(--font-heading);">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-check text-emerald-500"></i>
                <span>Free Cancellation</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-check text-emerald-500"></i>
                <span>Unlimited Mileage</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-check text-emerald-500"></i>
                <span>Basic Coverage Included</span>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT: RESERVATION FORM CONTAINER -->
        <div
          :class="[
            'lg:col-span-5 rounded-3xl border p-6 sm:p-7 lg:sticky lg:top-8 transition-all',
            isLambo
              ? 'bg-slate-900/80 border-slate-800 backdrop-blur-xl shadow-2xl'
              : 'bg-white border-slate-200/80 shadow-xs'
          ]"
        style="font-family: var(--font-heading);">
          <div class="flex items-center justify-between gap-4 pb-5 mb-6 border-b border-slate-100 dark:border-slate-800">
            <div class="flex items-center gap-3">
              <div
                :class="[
                  'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
                  isLambo ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-50 text-blue-600'
                ]"
              >
                <i class="fa-regular fa-calendar-check text-base"></i>
              </div>
              <div>
                <h3 class="font-extrabold text-2xl">Rental Dates</h3>
                <p class="text-xs text-slate-800">Select pickup & return schedules</p>
              </div>
            </div>
          </div>

          <!-- EMBEDDED BOOKING FORM -->
          <form
            :class="['form-card', { 'lambo-form': isLambo }]"
            @submit.prevent="submitBooking"
          >
          

            <div class="form-group">
              <h3>Pickup Date</h3>
              <input
                v-model="form.pickupDate"
                type="date"
                required
              />
            </div>

            <div class="form-group">
              <h3>Return Date</h3>
              <input
                v-model="form.returnDate"
                type="date"
                required
              />
            </div>

            <div class="booking-summary">
              <h3>Total Days</h3>
              <strong>{{ totalDays }}</strong>
            </div>

            <div class="booking-summary">
              <h3>Total Price</h3>
              <strong>${{ totalPrice }}</strong>
            </div>

            <button
              type="submit"
              class=" bg-slate-900 rounded-3xl h-13 text-white hover:bg-slate-700"
              :disabled="bookingLoading"
            style="font-family: var(--font-heading);">
              {{ bookingLoading ? 'Booking...' : 'Confirm Booking' }}
            </button>
          </form>


        </div>
      </div>

      <!-- NOT FOUND STATE -->
      <div
        v-else
        class="flex flex-col items-center justify-center py-28 text-center bg-white rounded-3xl border border-slate-200/80"
      >
        <div class="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-slate-400">
          <i class="fa-solid fa-car-side text-xl"></i>
        </div>
        <h2 class="text-lg font-extrabold text-slate-800">Vehicle Not Found</h2>
        <p class="text-xs text-slate-400 mt-1 max-w-sm">We couldn't retrieve the selected car. Please return to the fleet overview.</p>
        <button
          @click="router.back()"
          class="mt-6 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer"
        >
          Return to Fleet
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Stores
import { useVehicleStore } from '../stores/Vehicle'
import { useAuthStore } from '../stores/Auth'

// Services & Assets
import { createBooking as createBookingApi } from '../api/booking.js'
import { getVehiclesImage } from '../api/vehicle.js'
import heroImage from '../assets/hero.png'

const route = useRoute()
const router = useRouter()

const vehicleStore = useVehicleStore()
const authStore = useAuthStore()

const vehicleImages = ref([])
const bookingLoading = ref(false)

const form = reactive({
  pickupDate: '',
  returnDate: ''
})

const vehicleId = computed(() => Number(route.params.vehicleId))

const isLambo = computed(() => {
  return vehicleStore.vehicle?.name === 'Lamborghini Aventador'
})

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

function extractRawImagePath(img) {
  if (!img) return null
  if (typeof img === 'string') return img
  return img.mainImage || img.image || img.imageUrl || img.url || img.path || img.imagePath || null
}

const vehicleImage = computed(() => {
  const vehicle = vehicleStore.vehicle
  if (!vehicle) return heroImage

  const directPath = extractRawImagePath(vehicle)
  if (directPath) {
    const formatted = formatImageUrl(directPath)
    if (formatted) return formatted
  }

  if (Array.isArray(vehicle.vehicleImages) && vehicle.vehicleImages.length > 0) {
    const raw = extractRawImagePath(vehicle.vehicleImages[0])
    const formatted = formatImageUrl(raw)
    if (formatted) return formatted
  }

  if (Array.isArray(vehicleImages.value) && vehicleImages.value.length > 0) {
    const matchById = vehicleImages.value.find((img) => {
      const imgVehicleId = Number(
        img.vehicle_id ?? img.vehicleId ?? img.vehicle?.id ?? img.vehicle?.vehicleId
      )
      return imgVehicleId && imgVehicleId === vehicleId.value
    })

    if (matchById) {
      const formatted = formatImageUrl(extractRawImagePath(matchById))
      if (formatted) return formatted
    }
  }

  return heroImage
})

function handleImageError(event) {
  if (event.target.dataset.fallback === 'true') return
  event.target.dataset.fallback = 'true'
  event.target.src = heroImage
}

const totalDays = computed(() => {
  if (!form.pickupDate || !form.returnDate) return 0

  const pickup = new Date(form.pickupDate)
  const returnDate = new Date(form.returnDate)

  const diff = (returnDate - pickup) / (1000 * 60 * 60 * 24)
  return diff > 0 ? diff : 0
})

const totalPrice = computed(() => {
  const price = vehicleStore.vehicle?.pricePerDay || vehicleStore.vehicle?.price || 0
  return totalDays.value * price
})

// Reliable User ID extraction across Pinia & localStorage
function getLoggedInUserId() {
  let id = authStore.user?.id || authStore.user?.userId || authStore.user?._id
  if (id && !isNaN(Number(id))) return Number(id)

  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    try {
      const parsed = JSON.parse(storedUser)
      id = parsed?.id || parsed?.userId || parsed?._id || parsed?.user?.id
      if (id && !isNaN(Number(id))) return Number(id)
    } catch (e) {
      console.error('Error reading localStorage user:', e)
    }
  }
  return null
}

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

async function submitBooking() {
  if (totalDays.value <= 0) {
    alert('Return date must be after pickup date.')
    return
  }

  const userId = getLoggedInUserId()
  const currentVehicleId = Number(
    vehicleStore.vehicle?.id ?? vehicleStore.vehicle?.vehicleId ?? vehicleId.value
  )

  if (!Number.isInteger(userId) || userId <= 0) {
    alert('User information is missing. Please login again.')
    router.push('/login')
    return
  }

  if (!Number.isInteger(currentVehicleId) || currentVehicleId <= 0) {
    alert('Vehicle information is invalid.')
    return
  }

  bookingLoading.value = true

  try {
    // Calling createBooking directly from ../api/booking.js
    const response = await createBookingApi({
      userId,
      vehicleId: currentVehicleId,
      pickupDate: form.pickupDate,
      returnDate: form.returnDate
    })

    const booking = response?.data ?? response
    const bookingId = booking?.id ?? booking?.bookingId

    if (!bookingId) {
      throw new Error('Booking was created, but booking ID was not returned.')
    }

    router.push(`/payment/${bookingId}`)
  } catch (error) {
  console.error('Create booking error:', error)

  console.error('Backend response:', error.response?.data)

  alert(
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
    'Failed to create booking.'
  )
} finally {
  bookingLoading.value = false
}
}

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
    console.error('Failed to load vehicle details:', error)
  }
})
</script>

<style scoped>
.form-card {
  display: flex;
  flex-direction: column;
  gap: 18px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 24px;
  padding: 28px;
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.06);
}

.form-card h2 {
  margin: 0 0 6px;
  font-size: 2rem;
  color: #111827;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 0.88rem;
  font-weight: 600;
  color: #374151;
}

.form-group input {
  border: 1px solid #d1d5db;
  border-radius: 14px;
  background: #f9fafb;
  padding: 13px 14px;
  font-size: 1rem;
  color: #111827;
}

.booking-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f5f5f5;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 14px 16px;
  font-size: 1rem;
  color: #374151;
}

.booking-summary strong {
  color: #111827;
  font-size: 1.2rem;
}

.btn-primary {
  background: linear-gradient(135deg, #111827 0%, #1f2937 100%);
  color: #fff;
  border: none;
  border-radius: 14px;
  padding: 14px 18px;
  font-weight: 700;
  cursor: pointer;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.lambo-form {
  background: linear-gradient(
    180deg,
    rgba(33, 18, 9, 0.97),
    rgba(17, 17, 17, 0.98)
  );
  border: 1px solid rgba(255, 147, 63, 0.35);
  box-shadow: 0 24px 48px rgba(255, 120, 25, 0.2);
}

.lambo-form h2 {
  color: #fff;
}

.lambo-form .form-group label {
  color: #f4d7b8;
}

.lambo-form .form-group input {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 170, 90, 0.38);
  color: #fff;
}

.lambo-form .booking-summary {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 170, 90, 0.22);
  color: #f4d7b8;
}

.lambo-form .booking-summary strong {
  color: #fff;
}

.lambo-form .btn-primary {
  background: linear-gradient(
    135deg,
    #ff9f43 0%,
    #ff6b00 100%
  );
  color: #1b120d;
  box-shadow: 0 12px 24px rgba(255, 112, 44, 0.35);
}

@media (max-width: 768px) {
  .form-card {
    padding: 20px 16px;
  }
}
</style>