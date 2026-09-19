<template>
  <main class="p-6 md:p-8 min-h-[calc(100vh-64px)] bg-gray-50/50 relative">

    <!-- Toast Notification (Top-Right near Navbar) -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform -translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-2 opacity-0"
    >
      <div
        v-if="toast.show"
        :class="[
          'fixed top-4 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-xs font-semibold max-w-md',
          toast.type === 'success'
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
            : 'bg-rose-50 border-rose-200 text-rose-800'
        ]"
      >
        <i :class="[
          'text-sm',
          toast.type === 'success' ? 'fa-solid fa-circle-check text-emerald-600' : 'fa-solid fa-triangle-exclamation text-rose-600'
        ]"></i>
        <span class="flex-1">{{ toast.message }}</span>
        <button @click="toast.show = false" type="button" class="text-gray-400 hover:text-gray-600 cursor-pointer">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </Transition>

    <!-- Page Header & Navigation -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
      <div>
        <div class="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <button
            type="button"
            @click="handleBack"
            class="hover:text-gray-900 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <i class="fa-solid fa-arrow-left text-[10px]"></i>
            <span>Back to Bookings</span>
          </button>

          <span>/</span>

          <span class="text-gray-900 font-semibold">
            New Reservation
          </span>
        </div>

        <h1 class="text-3xl font-bold tracking-tight text-gray-900">
          Create Booking
        </h1>

        <p class="text-gray-500 text-sm mt-1">
          Add a new vehicle rental reservation to the system
        </p>
      </div>

      <div class="flex items-center gap-3">
        <!-- Reset -->
        <button
          type="button"
          @click="resetForm"
          class="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-xs active:scale-95 cursor-pointer"
        >
          <i class="fa-solid fa-rotate-left text-xs text-gray-400"></i>
          <span>Reset Form</span>
        </button>

        <!-- Cancel -->
        <button
          type="button"
          @click="emit('cancel')"
          class="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-xs active:scale-95 cursor-pointer"
        >
          <span>Cancel</span>
        </button>

        <!-- Create -->
        <button
          type="button"
          @click="handleCreate"
          :disabled="submitting || !isFormValid"
          class="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xs shadow-blue-500/10 active:scale-95 cursor-pointer"
        >
          <i
            v-if="submitting"
            class="fa-solid fa-circle-notch fa-spin text-xs"
          ></i>

          <i
            v-else
            class="fa-solid fa-check text-xs"
          ></i>

          <span>
            {{ submitting ? 'Creating...' : 'Save Booking' }}
          </span>
        </button>
      </div>
    </div>

    <!-- Main Form -->
    <form
      @submit.prevent="handleCreate"
      class="grid grid-cols-1 lg:grid-cols-3 gap-8"
    >

      <!-- LEFT COLUMN -->
      <div class="lg:col-span-2 space-y-6">

        <!-- 1. Customer Selection -->
        <div class="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs space-y-5">

          <div class="flex items-center justify-between border-b border-gray-100 pb-4">
            <h2 class="text-base font-bold text-gray-900 flex items-center gap-2">
              <i class="fa-solid fa-user text-blue-600 text-sm"></i>
              <span>1. Customer Details</span>
            </h2>

            <span
              v-if="form.userId"
              class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider"
            >
              Selected
            </span>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
              Select Existing Customer
              <span class="text-rose-500">*</span>
            </label>

            <select
              v-model="form.userId"
              required
              class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer"
            >
              <option value="" disabled>
                Choose a customer...
              </option>

              <option
                v-for="user in customers"
                :key="user.id"
                :value="user.id"
              >
                {{ user.name }} ({{ user.email }})
              </option>
            </select>
          </div>

          <!-- Customer Info -->
          <div
            v-if="selectedCustomerObj"
            class="p-3 bg-blue-50/50 border border-blue-100 rounded-lg flex items-center gap-3"
          >
            <div class="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
              {{ getInitials(selectedCustomerObj.name) }}
            </div>

            <div class="text-xs">
              <p class="font-bold text-gray-900">
                {{ selectedCustomerObj.name }}
              </p>

              <p class="text-gray-500 text-[11px]">
                {{ selectedCustomerObj.email }}
                •
                {{ selectedCustomerObj.phone || selectedCustomerObj.tell || 'No Phone' }}
              </p>
            </div>
          </div>
        </div>

        <!-- 2. Vehicle & Schedule -->
        <div class="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs space-y-5">

          <div class="flex items-center justify-between border-b border-gray-100 pb-4">
            <h2 class="text-base font-bold text-gray-900 flex items-center gap-2">
              <i class="fa-solid fa-car text-blue-600 text-sm"></i>
              <span>2. Vehicle & Schedule</span>
            </h2>

            <span
              v-if="form.vehicleId && calculatedDays > 0"
              class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider"
            >
              Ready
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <!-- Vehicle -->
            <div class="sm:col-span-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                Select Vehicle
                <span class="text-rose-500">*</span>
              </label>

              <select
                v-model="form.vehicleId"
                @change="updatePricing"
                required
                class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer"
              >
                <option value="" disabled>
                  Choose an available vehicle...
                </option>

                <option
                  v-for="vehicle in vehicles"
                  :key="vehicle.id"
                  :value="vehicle.id"
                >
                  {{ vehicle.name }} —
                  ${{ getVehicleRate(vehicle) }}/day
                  ({{ vehicle.category || 'Standard' }})
                </option>
              </select>
            </div>

            <!-- Vehicle Preview -->
            <div
              v-if="selectedVehicleObj"
              class="sm:col-span-2 p-4 bg-gray-50 border border-gray-200/70 rounded-lg flex items-center gap-4"
            >
              <div class="w-20 h-14 bg-gray-200 rounded-md overflow-hidden shrink-0 border border-gray-200 flex items-center justify-center">
                <img
                  v-if="selectedVehicleObj.image"
                  :src="selectedVehicleObj.image"
                  :alt="selectedVehicleObj.name"
                  class="w-full h-full object-cover"
                />

                <i
                  v-else
                  class="fa-solid fa-car text-gray-400 text-lg"
                ></i>
              </div>

              <div class="flex-1 text-xs">
                <div class="font-bold text-gray-900 text-sm">
                  {{ selectedVehicleObj.name }}
                </div>

                <div class="text-gray-500 mt-0.5">
                  Plate:
                  {{ selectedVehicleObj.licensePlate || 'N/A' }}

                  •

                  Transmission:
                  {{ selectedVehicleObj.transmission || 'Automatic' }}
                </div>
              </div>

              <div class="text-right">
                <div class="text-xs text-gray-400">
                  Rate
                </div>

                <div class="font-bold text-blue-600 text-sm">
                  ${{ selectedVehicleRate }}/day
                </div>
              </div>
            </div>

            <!-- Start Date -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                Start Date
                <span class="text-rose-500">*</span>
              </label>

              <input
                type="date"
                v-model="form.pickupDate"
                @change="updatePricing"
                :min="todayDate"
                required
                class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
              >
            </div>

            <!-- End Date -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                End Date
                <span class="text-rose-500">*</span>
              </label>

              <input
                type="date"
                v-model="form.returnDate"
                @change="updatePricing"
                :min="form.pickupDate || todayDate"
                required
                class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
              >
            </div>

          </div>
        </div>

        <!-- 3. Configuration & Pricing -->
        <div class="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs space-y-5">

          <h2 class="text-base font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-4">
            <i class="fa-solid fa-sliders text-blue-600 text-sm"></i>
            <span>3. Options & Pricing</span>
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <!-- Status -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                Initial Status
              </label>

              <select
                v-model="form.status"
                class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer"
              >
                <option value="PENDING">
                  Pending
                </option>

                <option value="CONFIRMED">
                  Confirmed
                </option>

                <option value="ACTIVE">
                  Active
                </option>
              </select>
            </div>

            <!-- Total Price -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                Total Price ($)
              </label>

              <div class="relative">
                <span class="absolute right-5.5 top-1/2 -translate-y-1/2 text-xl font-semibold text-gray-400">
                  $
                </span>

                <input
                  type="number"
                  step="0.01"
                  :value="form.totalPrice"
                  readonly
                  class="w-full h-10 pl-8 pr-3.5 bg-gray-100 border border-gray-200 rounded-lg text-xs font-bold text-gray-900 cursor-not-allowed"
                />
              </div>

              <p class="text-[10px] text-gray-400 mt-1">
                Automatically calculated from the vehicle daily rate.
              </p>
            </div>

            <!-- Notes -->
            <div class="sm:col-span-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                Special Notes / Requests
              </label>

              <textarea
                v-model="form.notes"
                rows="3"
                placeholder="Optional customer requirements, pickup details, or special requests..."
                class="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
              ></textarea>
            </div>

          </div>
        </div>

      </div>

      <!-- RIGHT SIDEBAR -->
      <div class="space-y-6">

        <div class="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs sticky top-6 space-y-6">

          <h3 class="text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-3">
            Reservation Summary
          </h3>

          <div class="space-y-3.5 text-xs">

            <!-- Customer -->
            <div class="flex justify-between items-center text-gray-600">
              <span>Customer:</span>

              <span class="font-bold text-gray-900 truncate max-w-[160px]">
                {{ selectedCustomerName }}
              </span>
            </div>

            <!-- Vehicle -->
            <div class="flex justify-between items-center text-gray-600">
              <span>Vehicle:</span>

              <span class="font-bold text-gray-900 truncate max-w-[160px]">
                {{ selectedVehicleName }}
              </span>
            </div>

            <!-- Daily Rate -->
            <div class="flex justify-between items-center text-gray-600">
              <span>Daily Rate:</span>

              <span class="font-semibold text-gray-900">
                ${{ formatAmount(selectedVehicleRate) }}
              </span>
            </div>

            <!-- Duration -->
            <div class="flex justify-between items-center text-gray-600">
              <span>Duration:</span>

              <span class="font-semibold text-gray-900">
                {{ calculatedDays }}
                {{ calculatedDays === 1 ? 'Day' : 'Days' }}
              </span>
            </div>

            <!-- Total -->
            <div class="pt-3 border-t border-gray-100 flex justify-between items-center text-sm">
              <span class="font-bold text-gray-900">
                Total Price:
              </span>

              <span class="font-extrabold text-blue-600 text-lg">
                ${{ formatAmount(form.totalPrice) }}
              </span>
            </div>

          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="submitting || !isFormValid"
            class="w-full h-11 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-blue-500/20 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
          >
            <i
              v-if="submitting"
              class="fa-solid fa-circle-notch fa-spin text-xs"
            ></i>

            <i
              v-else
              class="fa-solid fa-check text-xs"
            ></i>

            <span>
              {{ submitting ? 'Processing...' : 'Confirm & Create' }}
            </span>
          </button>

        </div>
      </div>

    </form>

  </main>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import {
  createBooking,
  getCustomers,
  getVehicles
} from '../../api/booking'

// Declare Emits
const emit = defineEmits(['created', 'cancel'])

const router = useRouter()
const handleBack = () => {
  router.push('/admin/bookings')
}

const loading = ref(false)
const submitting = ref(false)

const customers = ref([])
const vehicles = ref([])

// Toast State (Replaces Browser Alert)
const toast = ref({
  show: false,
  message: '',
  type: 'success'
})

const showToast = (message, type = 'success') => {
  toast.value = { show: true, message, type }
  setTimeout(() => {
    toast.value.show = false
  }, 4000)
}

const initialFormState = {
  userId: '',
  vehicleId: '',
  pickupDate: '',
  returnDate: '',
  status: 'PENDING',
  totalPrice: 0,
  notes: ''
}

const form = ref({
  ...initialFormState
})

const todayDate = computed(() => {
  return new Date().toISOString().split('T')[0]
})

const fetchDropdownData = async () => {
  try {
    loading.value = true

    const [custRes, vehRes] = await Promise.all([
      getCustomers(),
      getVehicles()
    ])

    customers.value = Array.isArray(custRes) ? custRes : (custRes?.data || [])
    vehicles.value = Array.isArray(vehRes) ? vehRes : (vehRes?.data || [])
  } catch (err) {
    console.error('Failed to fetch options:', err)
  } finally {
    loading.value = false
  }
}

const getVehicleRate = (vehicle) => {
  if (!vehicle) return 0
  const rate = vehicle.pricePerDay ?? vehicle.dailyRate ?? 0
  return Number(rate) || 0
}

const calculatedDays = computed(() => {
  if (!form.value.pickupDate || !form.value.returnDate) return 0
  const start = new Date(form.value.pickupDate)
  const end = new Date(form.value.returnDate)
  const diffTime = end - start
  const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return days > 0 ? days : 0
})

const selectedCustomerObj = computed(() => {
  return customers.value.find(
    customer => String(customer.id) === String(form.value.userId)
  )
})

const selectedCustomerName = computed(() => {
  return selectedCustomerObj.value ? selectedCustomerObj.value.name : '—'
})

const selectedVehicleObj = computed(() => {
  return vehicles.value.find(
    vehicle => String(vehicle.id) === String(form.value.vehicleId)
  )
})

const selectedVehicleName = computed(() => {
  return selectedVehicleObj.value ? selectedVehicleObj.value.name : '—'
})

const selectedVehicleRate = computed(() => {
  return getVehicleRate(selectedVehicleObj.value)
})

const updatePricing = () => {
  if (selectedVehicleObj.value && calculatedDays.value > 0) {
    form.value.totalPrice = calculatedDays.value * selectedVehicleRate.value
  } else {
    form.value.totalPrice = 0
  }
}

watch(
  [
    () => form.value.vehicleId,
    () => form.value.pickupDate,
    () => form.value.returnDate
  ],
  () => {
    updatePricing()
  }
)

const isFormValid = computed(() => {
  return (
    Boolean(form.value.userId) &&
    Boolean(form.value.vehicleId) &&
    Boolean(form.value.pickupDate) &&
    Boolean(form.value.returnDate) &&
    calculatedDays.value > 0 &&
    selectedVehicleRate.value > 0
  )
})

const resetForm = () => {
  form.value = { ...initialFormState }
}

const handleCreate = async () => {
  if (!isFormValid.value || submitting.value) return

  try {
    submitting.value = true

    const payload = {
      userId: Number(form.value.userId),
      vehicleId: Number(form.value.vehicleId),
      pickupDate: form.value.pickupDate,
      returnDate: form.value.returnDate,
      status: form.value.status
    }

    const responseData = await createBooking(payload)

    showToast('Booking created successfully!', 'success')
    emit('created', responseData)

    setTimeout(() => {
      router.push('/admin/bookings')
    }, 1200)

  } catch (err) {
    console.error('Create booking failed:', err)
    showToast(
      err.response?.data?.msg ||
      err.response?.data?.message ||
      'Failed to create booking reservation.',
      'error'
    )
  } finally {
    submitting.value = false
  }
}

const getInitials = (name) => {
  if (!name) return '?'
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
}

const formatAmount = (val) => {
  const num = Number(val || 0)
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

onMounted(() => {
  fetchDropdownData()
})
</script>