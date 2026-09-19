<template>
  <main class="p-6 md:p-8 min-h-[calc(100vh-64px)] bg-gray-50/50">
    
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
      <div>
        <div class="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <button @click="handleBack" class="hover:text-gray-900 flex items-center gap-1 cursor-pointer transition-colors">
            <i class="fa-solid fa-arrow-left text-[10px]"></i>
            <span>Back to Brands</span>
          </button>
          <span>/</span>
          <span class="text-gray-900 font-semibold">Brand Details</span>
        </div>
        <div class="flex items-center gap-3">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">{{ brand.name || 'Brand' }}</h1>
          <span :class="getStatusBadgeClass(brand.status)">
            {{ getStatusText(brand.status) }}
          </span>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button @click="navigateToEdit" class="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-xs cursor-pointer">
          <i class="fa-solid fa-pen-to-square text-xs"></i>
          <span>Edit Brand</span>
        </button>
      </div>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="loading" class="bg-white border border-gray-200/80 rounded-xl p-8 shadow-xs animate-pulse space-y-6">
      <div class="h-6 bg-gray-200 rounded w-1/4"></div>
      <div class="h-20 bg-gray-200 rounded"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="p-8 bg-white border border-gray-200/80 rounded-xl text-center">
      <i class="fa-solid fa-triangle-exclamation text-rose-500 text-2xl mb-2"></i>
      <p class="text-gray-900 font-semibold mb-1">Failed to load brand details</p>
      <p class="text-gray-500 text-xs mb-4">{{ error }}</p>
      <button @click="fetchDetails" class="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700">Retry</button>
    </div>

    <!-- Content -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <!-- Main Info -->
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs space-y-5">
          <div class="flex items-center gap-4 border-b border-gray-100 pb-5">
            <!-- Brand Logo -->
            <div class="w-16 h-16 rounded-xl bg-gray-50 border border-gray-200 p-2 flex items-center justify-center shrink-0">
              <img v-if="getBrandLogo(brand)" :src="getBrandLogo(brand)" :alt="brand.name" class="max-h-full max-w-full object-contain" />
              <i v-else class="fa-solid fa-car text-2xl text-gray-400"></i>
            </div>
            <div>
              <h2 class="text-xl font-bold text-gray-900">{{ brand.name }}</h2>
              <p class="text-xs text-gray-400 mt-0.5">Created: {{ formatDate(brand.created_at || brand.createdAt) }}</p>
            </div>
          </div>

          <div>
            <h3 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Company Description</h3>
            <p class="text-xs text-gray-700 leading-relaxed">{{ brand.description || 'No description available for this manufacturer.' }}</p>
          </div>
        </div>
      </div>

      <!-- Right Column Stats -->
      <div class="space-y-6">
        <div class="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs space-y-4">
          <h3 class="text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-3">Fleet Information</h3>
          
          <div class="flex justify-between items-center text-xs">
            <span class="text-gray-600">Assigned Fleet Vehicles:</span>
            <span class="font-bold text-gray-900 text-sm">{{ getFleetCount(brand) }} Units</span>
          </div>

          <div class="flex justify-between items-center text-xs pt-2 border-t border-gray-100">
            <span class="text-gray-600">Status:</span>
            <span :class="getStatusBadgeClass(brand.status)">
              {{ getStatusText(brand.status) }}
            </span>
          </div>
        </div>
      </div>

    </div>

  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getBrandById } from '../../api/brands'

const props = defineProps({ id: { type: [String, Number], default: null } })
const route = useRoute()
const router = useRouter()

const activeId = computed(() => props.id || route.params.id)

const loading = ref(true)
const error = ref(null)
const brand = ref({})

const handleBack = () => router.push('/admin/brands')
const navigateToEdit = () => router.push(`/admin/brands/edit/${activeId.value}`)

const fetchDetails = async () => {
  if (!activeId.value) return
  try {
    loading.value = true
    error.value = null
    const res = await getBrandById(activeId.value)
    brand.value = res?.data || res || {}
  } catch (err) {
    console.error('Failed to load brand details:', err)
    error.value = err.response?.data?.message || err.response?.data?.msg || 'Unable to retrieve brand details.'
  } finally {
    loading.value = false
  }
}

const getBrandLogo = (b) => b?.logo || b?.logoUrl || b?.image || null

const getFleetCount = (b) => {
  if (typeof b?.vehicleCount === 'number') return b.vehicleCount
  if (Array.isArray(b?.vehicles)) return b.vehicles.length
  return 0
}

const getStatusText = (status) => {
  if (typeof status === 'boolean') return status ? 'Active' : 'Inactive'
  if (typeof status === 'string') return status.toUpperCase() === 'INACTIVE' ? 'Inactive' : 'Active'
  return 'Active'
}

const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A'
  const date = new Date(dateStr)
  return isNaN(date.getTime()) ? dateStr : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const getStatusBadgeClass = (status) => {
  return getStatusText(status) === 'Active'
    ? 'px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/60 rounded-full'
    : 'px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200/60 rounded-full'
}

onMounted(fetchDetails)
</script>