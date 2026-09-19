<template>
  <main class="p-6 md:p-8 min-h-[calc(100vh-64px)] bg-gray-50/50">
    
    <!-- Header & Navigation -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 print:hidden">
      <div>
        <div class="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <button @click="handleBack" class="hover:text-gray-900 flex items-center gap-1 cursor-pointer transition-colors">
            <i class="fa-solid fa-arrow-left text-[10px]"></i>
            <span>Back to Bookings</span>
          </button>
          <span>/</span>
          <span class="text-gray-900 font-semibold">Booking Details</span>
        </div>
        <div class="flex items-center gap-3">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">#{{ bookingId }}</h1>
          <span 
            class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
            :class="getStatusBadgeClass(booking.status)"
          >
            {{ booking.status }}
          </span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-3">
        <button 
          @click="window.print()" 
          class="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-xs active:scale-95 cursor-pointer"
        >
          <i class="fa-solid fa-print text-xs text-gray-500"></i>
          <span>Print Details</span>
        </button>
        <button 
          @click="$emit('edit', bookingId)" 
          class="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-xs shadow-blue-500/10 active:scale-95 cursor-pointer"
        >
          <i class="fa-solid fa-pen-to-square text-xs"></i>
          <span>Edit Booking</span>
        </button>
      </div>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="loading" class="bg-white border border-gray-200/80 rounded-xl p-8 shadow-xs animate-pulse space-y-6">
      <div class="h-6 bg-gray-200 rounded w-1/4"></div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="h-32 bg-gray-200 rounded"></div>
        <div class="h-32 bg-gray-200 rounded"></div>
        <div class="h-32 bg-gray-200 rounded"></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="p-8 bg-white border border-gray-200/80 rounded-xl text-center">
      <i class="fa-solid fa-triangle-exclamation text-rose-500 text-2xl mb-2"></i>
      <p class="text-gray-900 font-semibold mb-1">Failed to load booking details</p>
      <p class="text-gray-500 text-xs mb-4">{{ error }}</p>
      <button @click="fetchBookingDetails" class="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700">
        Retry
      </button>
    </div>

    <!-- Details View Layout -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <!-- Main Content Area (2 Cols) -->
      <div class="lg:col-span-2 space-y-6">
        
        <!-- 1. Rental Schedule Overview Card -->
        <div class="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs space-y-6">
          <h2 class="text-base font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-4">
            <i class="fa-regular fa-calendar-check text-blue-600 text-sm"></i>
            <span>Rental Schedule</span>
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-gray-50/80 rounded-xl border border-gray-100">
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Pick-up Date</span>
              <div class="font-extrabold text-gray-900 text-sm">{{ formatDate(booking.startDate) }}</div>
              <div class="text-[11px] text-gray-500 mt-0.5">09:00 AM</div>
            </div>

            <div class="sm:border-l sm:border-gray-200 sm:pl-4">
              <span class="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Return Date</span>
              <div class="font-extrabold text-gray-900 text-sm">{{ formatDate(booking.endDate) }}</div>
              <div class="text-[11px] text-gray-500 mt-0.5">06:00 PM</div>
            </div>

            <div class="sm:border-l sm:border-gray-200 sm:pl-4">
              <span class="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Total Duration</span>
              <div class="font-extrabold text-blue-600 text-sm">{{ calculatedDays }} Days</div>
              <div class="text-[11px] text-gray-500 mt-0.5">Standard Rental</div>
            </div>
          </div>

          <!-- Notes Section -->
          <div v-if="booking.notes" class="pt-2">
            <span class="text-xs font-bold text-gray-700 block mb-1">Special Notes / Requests:</span>
            <p class="text-xs text-gray-600 p-3 bg-gray-50 rounded-lg border border-gray-100 leading-relaxed">
              {{ booking.notes }}
            </p>
          </div>
        </div>

        <!-- 2. Vehicle Details Card -->
        <div class="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs space-y-4">
          <h2 class="text-base font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-4">
            <i class="fa-solid fa-car text-blue-600 text-sm"></i>
            <span>Vehicle Information</span>
          </h2>

          <div class="flex flex-col sm:flex-row items-center gap-6 pt-2">
            <div class="w-full sm:w-44 h-28 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden shrink-0 border border-gray-100">
              <img v-if="booking.vehicle?.image" :src="booking.vehicle.image" :alt="booking.vehicle?.name" class="w-full h-full object-cover" />
              <i v-else class="fa-solid fa-car text-3xl text-gray-300"></i>
            </div>

            <div class="flex-1 space-y-2 w-full">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-lg font-bold text-gray-900">{{ booking.vehicle?.name || '—' }}</h3>
                  <p class="text-xs text-gray-500 font-mono mt-0.5">Plate: {{ booking.vehicle?.licensePlate || 'N/A' }}</p>
                </div>
                <span class="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                  ${{ booking.vehicle?.dailyRate }}/day
                </span>
              </div>

              <div class="grid grid-cols-2 gap-3 pt-2 text-xs text-gray-600 border-t border-gray-100">
                <div><span class="text-gray-400">Category:</span> {{ booking.vehicle?.category || 'Standard' }}</div>
                <div><span class="text-gray-400">Transmission:</span> {{ booking.vehicle?.transmission || 'Automatic' }}</div>
                <div><span class="text-gray-400">Fuel Type:</span> {{ booking.vehicle?.fuelType || 'Gasoline' }}</div>
                <div><span class="text-gray-400">Seats:</span> {{ booking.vehicle?.seats || 5 }} Seats</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Billing & Payment Breakdown Card -->
        <div class="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs space-y-4">
          <h2 class="text-base font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-4">
            <i class="fa-solid fa-file-invoice-dollar text-blue-600 text-sm"></i>
            <span>Payment Summary</span>
          </h2>

          <div class="space-y-2 text-xs">
            <div class="flex justify-between text-gray-600">
              <span>Daily Rate (${{ booking.vehicle?.dailyRate || 0 }} × {{ calculatedDays }} days)</span>
              <span class="font-medium text-gray-900">${{ formatAmount((booking.vehicle?.dailyRate || 0) * calculatedDays) }}</span>
            </div>
            <div class="flex justify-between text-gray-600">
              <span>Insurance & Fees</span>
              <span class="font-medium text-gray-900">${{ formatAmount(booking.fees || 0) }}</span>
            </div>
            <div class="flex justify-between text-gray-600">
              <span>Tax / VAT</span>
              <span class="font-medium text-gray-900">${{ formatAmount(booking.tax || 0) }}</span>
            </div>
            <div class="flex justify-between  pt-2 border-t border-gray-100 font-bold text-sm text-gray-900">
              <span>Total Amount Paid</span>
              <span class="text-blue-600">${{ formatAmount(booking.totalPrice) }}</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Right Column Sidebar -->
      <div class="space-y-6">
        
        <!-- Customer Info Card -->
        <div class="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs">
          <h3 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Customer Details</h3>
          
          <div class="flex items-center gap-3.5 mb-5 pb-4 border-b border-gray-100">
            <div class="w-11 h-11 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center shrink-0">
              {{ getInitials(booking.user?.name) }}
            </div>
            <div class="overflow-hidden">
              <div class="font-bold text-sm text-gray-900 truncate">{{ booking.user?.name || 'Guest User' }}</div>
              <div class="text-xs text-gray-500 truncate">{{ booking.user?.email || 'No email' }}</div>
            </div>
          </div>

          <div class="space-y-3 text-xs text-gray-600">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-phone text-gray-400 w-4"></i>
              <span class="font-medium text-gray-900">{{ booking.user?.phone || 'N/A' }}</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-id-card text-gray-400 w-4"></i>
              <span class="font-medium text-gray-900">Driver License: {{ booking.user?.licenseNumber || 'Verified' }}</span>
            </div>
          </div>
        </div>

        <!-- Quick Status Actions Card -->
        <div class="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs space-y-3 print:hidden">
          <h3 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Manage Status</h3>
          
          <button 
            v-if="booking.status === 'PENDING'"
            @click="updateStatus('CONFIRMED')"
            class="w-full h-9 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-all cursor-pointer"
          >
            Confirm Reservation
          </button>

          <button 
            v-if="booking.status === 'CONFIRMED'"
            @click="updateStatus('ACTIVE')"
            class="w-full h-9 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all cursor-pointer"
          >
            Mark as Handed Over (Active)
          </button>

          <button 
            v-if="booking.status === 'ACTIVE'"
            @click="updateStatus('COMPLETED')"
            class="w-full h-9 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-all cursor-pointer"
          >
            Complete Booking (Returned)
          </button>

          <button 
            v-if="booking.status !== 'CANCELLED' && booking.status !== 'COMPLETED'"
            @click="updateStatus('CANCELLED')"
            class="w-full h-9 rounded-lg text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-all cursor-pointer"
          >
            Cancel Reservation
          </button>
        </div>

      </div>

    </div>

  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getBookingById, updateBooking } from '../../api/booking'

const props = defineProps({
  bookingId: {
    type: [String, Number],
    default: null
  }
})

const route = useRoute()
const router = useRouter()

// Fallback to route param if prop isn't directly passed
const activeBookingId = computed(() => props.bookingId || route.params.id)

const handleBack = () => {
  router.push('/admin/bookings')
}

const loading = ref(true)
const error = ref(null)
const booking = ref({})

/*
|--------------------------------------------------------------------------
| Fetch Details
|--------------------------------------------------------------------------
*/
const fetchBookingDetails = async () => {
  if (!activeBookingId.value) {
    error.value = 'Invalid or missing booking ID.'
    loading.value = false
    return
  }

  try {
    loading.value = true
    error.value = null

    // API service returns response.data directly
    const res = await getBookingById(activeBookingId.value)
    
    // Normalize data structure for UI flexibility
    const rawData = res?.data || res || {}
    booking.value = {
      ...rawData,
      startDate: rawData.pickupDate || rawData.startDate,
      endDate: rawData.returnDate || rawData.endDate,
      totalPrice: rawData.totalPrice || rawData.amount || 0
    }
  } catch (err) {
    console.error('Failed to load booking details:', err)
    error.value = err.response?.data?.message || err.response?.data?.msg || 'Unable to load booking details.'
  } finally {
    loading.value = false
  }
}

/*
|--------------------------------------------------------------------------
| Update Status
|--------------------------------------------------------------------------
*/
const updateStatus = async (newStatus) => {
  try {
    await updateBooking(activeBookingId.value, { status: newStatus })
    booking.value.status = newStatus
  } catch (err) {
    console.error('Failed to update status:', err)
    alert(err.response?.data?.message || err.response?.data?.msg || 'Failed to update status')
  }
}

/*
|--------------------------------------------------------------------------
| Calculations & Formatters
|--------------------------------------------------------------------------
*/
const calculatedDays = computed(() => {
  const startStr = booking.value.startDate
  const endStr = booking.value.endDate
  if (!startStr || !endStr) return 1

  const start = new Date(startStr)
  const end = new Date(endStr)
  const diffTime = Math.abs(end - start)
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1
})

const getInitials = (name) => {
  if (!name) return '?'
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
}

const formatDate = (dateString) => {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const formatAmount = (val) => {
  const num = Number(val || 0)
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const getStatusBadgeClass = (status) => {
  const s = String(status || '').toUpperCase()
  switch (s) {
    case 'PENDING':
      return 'bg-amber-50 text-amber-700 border border-amber-200/60'
    case 'CONFIRMED':
      return 'bg-indigo-50 text-indigo-700 border border-indigo-200/60'
    case 'ACTIVE':
      return 'bg-blue-50 text-blue-700 border border-blue-200/60'
    case 'COMPLETED':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
    case 'CANCELLED':
      return 'bg-rose-50 text-rose-700 border border-rose-200/60'
    default:
      return 'bg-gray-50 text-gray-700 border border-gray-200/60'
  }
}

onMounted(() => {
  fetchBookingDetails()
})
</script>