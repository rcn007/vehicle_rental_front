<template>
  <main class="p-6 md:p-8 min-h-[calc(100vh-64px)] bg-gray-50/50">
    
    <!-- Page Header & Back Navigation -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
      <div>
        <div class="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <button @click="handleBack" class="hover:text-gray-900 flex items-center gap-1 cursor-pointer transition-colors">
            <i class="fa-solid fa-arrow-left text-[10px]"></i>
            <span>Back to Bookings</span>
          </button>
          <span>/</span>
          <span class="text-gray-900 font-semibold">Edit #{{ bookingId }}</span>
        </div>
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Update Booking</h1>
        <p class="text-gray-500 text-sm mt-1">Modify reservation details, dates, or booking status</p>
      </div>

      <div class="flex items-center gap-3">
        <button 
          type="button"
          @click="$emit('cancel')" 
          class="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          <span>Cancel</span>
        </button>
        <button 
          type="button"
          @click="handleSave"
          :disabled="submitting || loading"
          class="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-all shadow-sm shadow-blue-500/10 active:scale-95 cursor-pointer"
        >
          <i v-if="submitting" class="fa-solid fa-circle-notch fa-spin text-xs"></i>
          <i v-else class="fa-solid fa-floppy-disk text-xs"></i>
          <span>{{ submitting ? 'Saving Changes...' : 'Save Changes' }}</span>
        </button>
      </div>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="loading" class="bg-white border border-gray-200/80 rounded-xl p-8 shadow-xs animate-pulse space-y-6">
      <div class="h-6 bg-gray-200 rounded w-1/4"></div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="h-10 bg-gray-200 rounded"></div>
        <div class="h-10 bg-gray-200 rounded"></div>
        <div class="h-10 bg-gray-200 rounded"></div>
        <div class="h-10 bg-gray-200 rounded"></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="fetchError" class="p-8 bg-white border border-gray-200/80 rounded-xl text-center">
      <i class="fa-solid fa-triangle-exclamation text-rose-500 text-2xl mb-2"></i>
      <p class="text-gray-900 font-semibold mb-1">Failed to load booking details</p>
      <p class="text-gray-500 text-xs mb-4">{{ fetchError }}</p>
      <button @click="fetchBookingDetails" class="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700">
        Retry
      </button>
    </div>

    <!-- Main Content Form Layout -->
    <form v-else @submit.prevent="handleSave" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <!-- Form Section (2 Columns) -->
      <div class="lg:col-span-2 space-y-6">
        
        <!-- Reservation Info -->
        <div class="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs space-y-6">
          <h2 class="text-base font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-4">
            <i class="fa-solid fa-calendar-days text-blue-600 text-sm"></i>
            <span>Schedule & Rental Details</span>
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Start Date</label>
              <input 
                type="date" 
                v-model="form.startDate" 
                class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                required
              >
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">End Date</label>
              <input 
                type="date" 
                v-model="form.endDate" 
                class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                required
              >
            </div>

            <div class="sm:col-span-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Assigned Vehicle</label>
              <select 
                v-model="form.vehicleId" 
                class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer"
              >
                <option v-for="vehicle in availableVehicles" :key="vehicle.id" :value="vehicle.id">
                  {{ vehicle.name }} — ${{ vehicle.dailyRate }}/day
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Status & Notes -->
        <div class="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs space-y-6">
          <h2 class="text-base font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-4">
            <i class="fa-solid fa-sliders text-blue-600 text-sm"></i>
            <span>Status & Pricing</span>
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Booking Status</label>
              <select 
                v-model="form.status" 
                class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer"
              >
                <option value="PENDING">Pending</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="ACTIVE">Active</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Total Amount ($)</label>
              <input 
                type="number" 
                step="0.01" 
                v-model.number="form.totalPrice" 
                class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                required
              >
            </div>

            <div class="sm:col-span-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Notes / Special Instructions</label>
              <textarea 
                v-model="form.notes" 
                rows="4" 
                placeholder="Add internal notes or customer requests..." 
                class="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
              ></textarea>
            </div>
          </div>
        </div>

      </div>

      <!-- Side Overview / Summary Sidebar -->
      <div class="space-y-6">
        
        <!-- Customer Details Card -->
        <div class="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs">
          <h3 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Customer Info</h3>
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
              {{ getInitials(customer.name) }}
            </div>
            <div>
              <div class="font-bold text-sm text-gray-900">{{ customer.name || 'Unassigned' }}</div>
              <div class="text-xs text-gray-500">{{ customer.email || 'No email provided' }}</div>
            </div>
          </div>
          <div class="text-xs text-gray-500 space-y-1.5 border-t border-gray-100 pt-3">
            <div class="flex justify-between">
              <span>Phone:</span>
              <span class="font-medium text-gray-900">{{ customer.phone || 'N/A' }}</span>
            </div>
            <div class="flex justify-between">
              <span>User ID:</span>
              <span class="font-medium text-gray-900">#{{ customer.id || 'N/A' }}</span>
            </div>
          </div>
        </div>

        <!-- Summary & Actions -->
        <div class="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs">
          <h3 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Booking Summary</h3>
          
          <div class="space-y-3 text-xs mb-6">
            <div class="flex justify-between text-gray-600">
              <span>Current Status:</span>
              <span class="font-bold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded-full" :class="getStatusBadgeClass(form.status)">
                {{ form.status }}
              </span>
            </div>
            <div class="flex justify-between text-gray-600">
              <span>Duration:</span>
              <span class="font-semibold text-gray-900">{{ calculatedDays }} Days</span>
            </div>
            <div class="flex justify-between text-gray-600">
              <span>Total Price:</span>
              <span class="font-bold text-gray-900 text-sm">${{ formatAmount(form.totalPrice) }}</span>
            </div>
          </div>

          <div class="pt-4 border-t border-gray-100 space-y-2">
            <button 
              type="submit" 
              :disabled="submitting"
              class="w-full h-10 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              Update Reservation
            </button>
          </div>
        </div>

      </div>

    </form>

  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getBookingById, updateBooking, getVehicles } from '../../api/booking'

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
const submitting = ref(false)
const fetchError = ref(null)

const customer = ref({})
const availableVehicles = ref([])

const form = ref({
  startDate: '',
  endDate: '',
  vehicleId: '',
  status: 'PENDING',
  totalPrice: 0,
  notes: ''
})

/*
|--------------------------------------------------------------------------
| Fetch Initial Data & Booking Details
|--------------------------------------------------------------------------
*/
const fetchBookingDetails = async () => {
  if (!activeBookingId.value) {
    fetchError.value = 'Invalid or missing booking ID.'
    loading.value = false
    return
  }

  try {
    loading.value = true
    fetchError.value = null

    // Fetch booking details and vehicle dropdown options in parallel
    const [bookingRes, vehiclesRes] = await Promise.all([
      getBookingById(activeBookingId.value),
      getVehicles()
    ])

    // API service returns response.data directly
    const data = bookingRes?.data || bookingRes || {}
    
    // Set vehicles dropdown list
    const vehList = Array.isArray(vehiclesRes) ? vehiclesRes : (vehiclesRes?.data || [])
    availableVehicles.value = vehList.map(v => ({
      id: v.id,
      name: v.name,
      dailyRate: v.dailyRate ?? v.pricePerDay ?? 0
    }))

    // Customer info
    customer.value = data.user || {}

    // Safely parse ISO date strings to YYYY-MM-DD for <input type="date">
    const rawStart = data.pickupDate || data.startDate
    const rawEnd = data.returnDate || data.endDate

    form.value = {
      startDate: rawStart ? new Date(rawStart).toISOString().split('T')[0] : '',
      endDate: rawEnd ? new Date(rawEnd).toISOString().split('T')[0] : '',
      vehicleId: data.vehicleId || data.vehicle?.id || '',
      status: data.status || 'PENDING',
      totalPrice: Number(data.totalPrice || data.amount || 0),
      notes: data.notes || ''
    }

  } catch (err) {
    console.error('Failed to load booking details:', err)
    fetchError.value = err.response?.data?.message || err.response?.data?.msg || 'Unable to retrieve booking information.'
  } finally {
    loading.value = false
  }
}

/*
|--------------------------------------------------------------------------
| Update / Save Booking
|--------------------------------------------------------------------------
*/
const handleSave = async () => {
  try {
    submitting.value = true

    const payload = {
      userId: customer.value.id ? Number(customer.value.id) : undefined,
      vehicleId: Number(form.value.vehicleId),
      pickupDate: form.value.startDate,
      returnDate: form.value.endDate,
      status: form.value.status,
      totalPrice: Number(form.value.totalPrice),
      notes: form.value.notes
    }

    await updateBooking(activeBookingId.value, payload)

    // Return to the admin bookings table after successful save
    router.push('/admin/bookings')
  } catch (err) {
    console.error('Failed to update booking:', err)
    alert(err.response?.data?.message || err.response?.data?.msg || 'Failed to save booking updates.')
  } finally {
    submitting.value = false
  }
}

/*
|--------------------------------------------------------------------------
| Calculations & Formatters
|--------------------------------------------------------------------------
*/
const calculatedDays = computed(() => {
  if (!form.value.startDate || !form.value.endDate) return 0
  const start = new Date(form.value.startDate)
  const end = new Date(form.value.endDate)
  const diffTime = Math.abs(end - start)
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 0
})

const getInitials = (name) => {
  if (!name) return '?'
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
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