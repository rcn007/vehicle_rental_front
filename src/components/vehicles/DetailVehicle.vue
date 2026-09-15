<template>
  <main class="p-6 md:p-8 min-h-[calc(100vh-64px)] bg-gray-50/50">
    
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 print:hidden">
      <div>
        <div class="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <button @click="handleBack" class="hover:text-gray-900 flex items-center gap-1 cursor-pointer transition-colors">
            <i class="fa-solid fa-arrow-left text-[10px]"></i>
            <span>Back to Vehicles</span>
          </button>
          <span>/</span>
          <span class="text-gray-900 font-semibold">Vehicle Details</span>
        </div>
        <div class="flex items-center gap-3">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">{{ vehicle.name || 'Vehicle' }}</h1>
          <span :class="getStatusBadgeClass(vehicle.status)">
            {{ vehicle.status }}
          </span>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button @click="window.print()" class="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-all shadow-xs cursor-pointer">
          <i class="fa-solid fa-print text-xs text-gray-500"></i>
          <span>Print Specs</span>
        </button>
        <button @click="navigateToEdit" class="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-xs cursor-pointer">
          <i class="fa-solid fa-pen-to-square text-xs"></i>
          <span>Edit Vehicle</span>
        </button>
      </div>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="loading" class="bg-white border border-gray-200/80 rounded-xl p-8 shadow-xs animate-pulse space-y-6">
      <div class="h-6 bg-gray-200 rounded w-1/4"></div>
      <div class="h-32 bg-gray-200 rounded"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="p-8 bg-white border border-gray-200/80 rounded-xl text-center">
      <i class="fa-solid fa-triangle-exclamation text-rose-500 text-2xl mb-2"></i>
      <p class="text-gray-900 font-semibold mb-1">Failed to load vehicle details</p>
      <p class="text-gray-500 text-xs mb-4">{{ error }}</p>
      <button @click="fetchDetails" class="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700">Retry</button>
    </div>

    <!-- Details Grid -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <!-- Main Info (2 Cols) -->
      <div class="lg:col-span-2 space-y-6">
        
        <div class="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs space-y-6">
          <div class="flex flex-col sm:flex-row items-center gap-6">
            <div class="w-full sm:w-56 h-36 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden shrink-0 border border-gray-200">
              <img v-if="vehicle.image" :src="vehicle.image" :alt="vehicle.name" class="w-full h-full object-cover" />
              <i v-else class="fa-solid fa-car text-4xl text-gray-300"></i>
            </div>

            <div class="flex-1 space-y-3 w-full">
              <div class="flex justify-between items-start">
                <div>
                  <h2 class="text-xl font-bold text-gray-900">{{ vehicle.name }}</h2>
                  <p class="text-xs text-gray-500 font-mono mt-0.5">Plate: {{ vehicle.licensePlate || 'N/A' }}</p>
                </div>
                <span class="text-sm font-extrabold text-blue-600 bg-blue-50 px-3 py-1 rounded-md">
                  ${{ vehicle.dailyRate }}/day
                </span>
              </div>

              <div class="grid grid-cols-2 gap-3 pt-3 text-xs text-gray-600 border-t border-gray-100">
                <div><span class="text-gray-400">Brand:</span> {{ vehicle.brand }}</div>
                <div><span class="text-gray-400">Category:</span> {{ vehicle.category }}</div>
                <div><span class="text-gray-400">Transmission:</span> {{ vehicle.transmission }}</div>
                <div><span class="text-gray-400">Fuel Type:</span> {{ vehicle.fuelType }}</div>
                <div><span class="text-gray-400">Seats:</span> {{ vehicle.seats }} Seats</div>
                <div><span class="text-gray-400">Year:</span> {{ vehicle.year }}</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Right Column -->
      <div class="space-y-6">
        <div class="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs space-y-4">
          <h3 class="text-xs font-bold uppercase tracking-wider text-gray-400">Status Summary</h3>
          <div class="flex justify-between items-center text-xs">
            <span class="text-gray-600">Current Status:</span>
            <span :class="getStatusBadgeClass(vehicle.status)">{{ vehicle.status }}</span>
          </div>
          <div class="flex justify-between items-center text-xs pt-2 border-t border-gray-100">
            <span class="text-gray-600">Daily Rate:</span>
            <span class="font-bold text-gray-900">${{ vehicle.dailyRate }} / day</span>
          </div>
        </div>
      </div>

    </div>

  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getVehicleById } from '../../api/vehicle'

const props = defineProps({ id: { type: [String, Number], default: null } })
const route = useRoute()
const router = useRouter()

const activeId = computed(() => props.id || route.params.id)

const loading = ref(true)
const error = ref(null)
const vehicle = ref({})

const handleBack = () => router.push('/admin/vehicles')
const navigateToEdit = () => router.push(`/admin/vehicles/edit/${activeId.value}`)

const fetchDetails = async () => {
  if (!activeId.value) return
  try {
    loading.value = true
    error.value = null
    const res = await getVehicleById(activeId.value)
    const data = res?.data || res || {}

    vehicle.value = {
      ...data,
      brand: data.brand?.name || data.brand || 'N/A',
      category: data.category?.name || data.category || 'N/A',
      dailyRate: data.dailyRate ?? data.pricePerDay ?? 0,
      seats: data.seats || 5,
      year: data.year || 2023,
      transmission: data.transmission || 'Automatic',
      fuelType: data.fuelType || 'Gasoline',
      status: data.status || 'AVAILABLE'
    }
  } catch (err) {
    console.error('Failed to load vehicle details:', err)
    error.value = err.response?.data?.message || err.response?.data?.msg || 'Unable to retrieve vehicle information.'
  } finally {
    loading.value = false
  }
}

const getStatusBadgeClass = (status) => {
  const s = String(status || '').toUpperCase()
  switch (s) {
    case 'AVAILABLE': return 'px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/60 rounded-full'
    case 'RENTED':
    case 'ACTIVE': return 'px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/60 rounded-full'
    case 'MAINTENANCE': return 'px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200/60 rounded-full'
    default: return 'px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200/60 rounded-full'
  }
}

onMounted(fetchDetails)
</script>