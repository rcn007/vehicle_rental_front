<template>
  <main class="p-6 md:p-8 min-h-[calc(100vh-64px)] bg-gray-50/50"
  style="background-color: var(--background); font-family: var(--font-body); color: var(--text);">
    
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-(--text)">Vehicles</h1>
        <p class="text-xl text-(--text) mt-1">Manage and monitor your rental fleet inventory</p>
      </div>
      
      <div class="flex items-center gap-3 w-full md:w-auto">
        <div class="relative flex-1 md:w-92">
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Search make, model, category, brand..." 
            class="w-full h-9 pl-9 pr-4 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-xs"
          >
        </div>
        <button 
          @click="navigateToAdd" 
          class="inline-flex items-center justify-center gap-2 h-12 px-4 rounded-[8px] text-xs font-semibold text-white bg-[#0f172a] hover:bg-gray-800 transition-all shadow-xs shrink-0 active:scale-95 cursor-pointer"
        >
          <i class="fa-solid fa-plus text-[10px]"></i> 
          <span>Add Vehicle</span>
        </button>
      </div>
    </div>

    <!-- KPI Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      <div class="p-4 bg-(--background) border border-gray-200/80 rounded-xl shadow-xs hover:border-gray-300 transition-all flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <span class="text-(--text) text-[15px] font-bold uppercase tracking-wider" style="font-family: var(--font-heading);">Total Fleet</span>
          <div class="w-7 h-7 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center text-xs">
            <i class="fa-solid fa-car"></i>
          </div>
        </div>
        <div class="mt-3">
          <div class="text-2xl font-extrabold text-(--text)">{{ stats.total }}</div>
          <p class="text-[11px] text-gray-400 mt-0.5 font-medium">All registered vehicles</p>
        </div>
      </div>

      <div class="p-4  bg-(--background)  border border-gray-200/80 border-l-4 border-l-emerald-500 rounded-xl shadow-xs hover:border-gray-300 transition-all flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <span class="text-(--text) text-[15px] font-bold uppercase tracking-wider" style="font-family: var(--font-heading);">Available</span>
          <div class="w-7 h-7 rounded-lg bg-emerald-50 text-(--text) flex items-center justify-center text-xs">
            <i class="fa-solid fa-circle-check"></i>
          </div>
        </div>
        <div class="mt-3">
          <div class="text-2xl font-extrabold text-(--text)">{{ stats.available }}</div>
          <p class="text-[11px] text-gray-400 mt-0.5 font-medium">Ready for dispatch</p>
        </div>
      </div>

      <div class="p-4  bg-(--background)  border border-gray-200/80 border-l-4 border-l-blue-600 rounded-xl shadow-xs hover:border-gray-300 transition-all flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <span class="text-(--text) text-[15px] font-bold uppercase tracking-wider" style="font-family: var(--font-heading);">On Rent</span>
          <div class="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs">
            <i class="fa-solid fa-key"></i>
          </div>
        </div>
        <div class="mt-3">
          <div class="text-2xl font-extrabold text-(--text)">{{ stats.rented }}</div>
          <p class="text-[11px] text-gray-400 mt-0.5 font-medium">Currently active</p>
        </div>
      </div>

      <div class="p-4  bg-(--background)  border border-gray-200/80 border-l-4 border-l-amber-500 rounded-xl shadow-xs hover:border-gray-300 transition-all flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <span class="text-(--text) text-[15px] font-bold uppercase tracking-wider" style="font-family: var(--font-heading);">Maintenance</span>
          <div class="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xs">
            <i class="fa-solid fa-wrench"></i>
          </div>
        </div>
        <div class="mt-3">
          <div class="text-2xl font-extrabold text-(--text)">{{ stats.maintenance }}</div>
          <p class="text-[11px] text-gray-400 mt-0.5 font-medium">In service bay</p>
        </div>  
      </div>

      <div class="p-4 bg-(--background)  border border-gray-200/80 border-l-4 border-l-rose-500 rounded-xl shadow-xs hover:border-gray-300 transition-all flex flex-col justify-between sm:col-span-2 lg:col-span-1">
        <div class="flex items-center justify-between">
          <span class="text-(--text) text-[15px] font-bold uppercase tracking-wider" style="font-family: var(--font-heading);">Unavailable</span>
          <div class="w-7 h-7 rounded-lg bg-rose-50 text-(--text) flex items-center justify-center text-xs">
            <i class="fa-solid fa-ban"></i>
          </div>
        </div>
        <div class="mt-3">
          <div class="text-2xl font-extrabold text-(--text)">{{ stats.unavailable }}</div>
          <p class="text-[11px] text-gray-400 mt-0.5 font-medium">Out of service</p>
        </div>
      </div>
    </div>

    <!-- Multi-Filter Bar -->
    <div class="p-3 bg-(--background) border border-gray-200/80 rounded-xl shadow-xs mb-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
      <select v-model="selectedBrand" class="h-9 px-3 bg-(--background) border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer">
        <option value="All Brands">All Brands</option>
        <option v-for="brand in brandOptions" :key="brand.id || brand" :value="extractName(brand)">
          {{ extractName(brand) }}
        </option>
      </select>

      <select v-model="selectedCategory" class="h-9 px-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer">
        <option value="All Categories">All Categories</option>
        <option v-for="cat in categoryOptions" :key="cat.id || cat" :value="extractName(cat)">
          {{ extractName(cat) }}
        </option>
      </select>

      <select v-model="selectedStatus" class="h-9 px-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer">
        <option value="Any Status">Any Status</option>
        <option value="AVAILABLE">Available</option>
        <option value="RENTED">Rented</option>
        <option value="MAINTENANCE">Maintenance</option>
        <option value="UNAVAILABLE">Unavailable</option>
      </select>

      <select v-model="selectedPriceRange" class="h-9 px-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer">
        <option value="Price Range">Price Range</option>
        <option value="under50">Under $50 / day</option>
        <option value="50-100">$50 - $100 / day</option>
        <option value="above100">Above $100 / day</option>
      </select>

      <button @click="resetFilters" class="col-span-2 sm:col-span-1 h-9 px-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-all flex items-center justify-center gap-2 cursor-pointer">
        <i class="fa-solid fa-rotate-left text-[10px] text-gray-500"></i>
        <span>Reset Filters</span>
      </button>
    </div>

    <!-- Vehicles Table Card -->
    <div class="bg-(--background) border border-gray-200/80 rounded-xl shadow-xs overflow-hidden mb-6">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-gray-700 border-collapse">
          <thead>
            <tr class="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider text-[10px] border-b border-gray-200">
              <th class="py-3 px-5">Vehicle Image</th>
              <th class="py-3 px-5">Category</th>
              <th class="py-3 px-5">Fuel Type</th>
              <th class="py-3 px-5">Model</th>
              <th class="py-3 px-5">Plate & Year</th>
              <th class="py-3 px-5">Rate</th>
              <th class="py-3 px-5">Status</th>
              <th class="py-3 px-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-if="loading" v-for="n in 3" :key="n" class="animate-pulse">
              <td colspan="8" class="py-4 px-5 text-center text-gray-400">Loading vehicle data & images...</td>
            </tr>

            <tr v-else-if="error" class="text-rose-600">
              <td colspan="8" class="py-8 px-5 text-center">
                <p class="font-medium mb-2">{{ error }}</p>
                <button @click="fetchInitialData" class="text-xs text-blue-600 underline font-semibold cursor-pointer">Try Again</button>
              </td>
            </tr>

            <tr v-else-if="paginatedVehicles.length === 0">
              <td colspan="8" class="py-8 px-5 text-center text-gray-500">No vehicles found matching criteria.</td>
            </tr>

            <tr v-else v-for="vehicle in paginatedVehicles" :key="vehicle.id" class="hover:bg-gray-50/80 transition-colors">
              <td class="py-3.5 px-5">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-9 rounded-md overflow-hidden border border-gray-200 bg-gray-100 shrink-0 flex items-center justify-center relative group">
                    <img 
                      v-if="getVehicleImage(vehicle) && !imageErrorTracker[vehicle.id]"
                      :src="getVehicleImage(vehicle)" 
                      :alt="vehicle.name || 'Vehicle Image'"
                      @error="handleImageError(vehicle.id)"
                      class="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <i v-else class="fa-solid fa-car text-gray-400 text-sm"></i>
                  </div>

                  <div>
                    <div class="font-bold text-gray-900 text-xs">{{ vehicle.name || `${getBrandName(vehicle)} ${vehicle.model || ''}` }}</div>
                    <div class="text-[11px] text-gray-400 font-medium">{{ getBrandName(vehicle) }}</div>
                  </div>
                </div>
              </td>

              <td class="py-3.5 px-5">
                <span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-blue-50 text-blue-700">
                  {{ getCategoryName(vehicle) }}
                </span>
              </td>

              <td class="py-3.5 px-5">
                <div class="inline-flex items-center gap-1.5 font-medium text-gray-700">
                  <i class="fa-solid fa-gas-pump text-gray-400 text-[10px]"></i>
                  <span>{{ vehicle.fuel_type || vehicle.fuelType || 'Gasoline' }}</span>
                </div>
              </td>

              <td class="py-3.5 px-5 font-semibold text-gray-800">
                {{ vehicle.model || 'N/A' }}
              </td>

              <td class="py-3.5 px-5">
                <div class="font-mono font-bold text-gray-900 text-[11px]">{{ vehicle.plate_number || vehicle.plateNumber || 'N/A' }}</div>
                <div class="text-[11px] text-gray-400">{{ vehicle.year || '2023' }}</div>
              </td>

              <td class="py-3.5 px-5">
                <span class="font-extrabold text-gray-900 text-sm">${{ getVehicleRate(vehicle) }}</span>
                <span class="text-[10px] text-gray-400 font-normal"> / day</span>
              </td>

              <td class="py-3.5 px-5">
                <span :class="getStatusBadgeClass(vehicle.status)">
                  <span class="w-1.5 h-1.5 rounded-full" :class="getStatusDotClass(vehicle.status)"></span>
                  {{ vehicle.status || 'AVAILABLE' }}
                </span>
              </td>

              <td class="py-3.5 px-5 text-right">
                <div class="flex items-center justify-end gap-1">
                  <button @click="navigateToDetail(vehicle.id)" class="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer" title="View Details">
                    <i class="fa-regular fa-eye text-xs"></i>
                  </button>

                  <button @click="navigateToEdit(vehicle.id)" class="p-1.5 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-all cursor-pointer" title="Edit Vehicle">
                    <i class="fa-regular fa-pen-to-square text-xs"></i>
                  </button>

                  <button @click="handleDelete(vehicle)" :disabled="deletingId === vehicle.id" class="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer disabled:opacity-50" title="Delete Vehicle">
                    <i v-if="deletingId === vehicle.id" class="fa-solid fa-circle-notch fa-spin text-xs text-rose-600"></i>
                    <i v-else class="fa-regular fa-trash-can text-xs"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="!loading && filteredVehicles.length > 0" class="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-gray-100 text-xs text-gray-500 gap-3">
        <div>
          Showing 
          <span class="font-bold text-gray-900">{{ startItemIndex }}–{{ endItemIndex }}</span> 
          of 
          <span class="font-bold text-gray-900">{{ filteredVehicles.length }}</span> 
          vehicles
        </div>

        <div class="flex items-center gap-1">
          <button 
            @click="currentPage--" 
            :disabled="currentPage === 1" 
            class="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <i class="fa-solid fa-chevron-left text-[10px]"></i>
          </button>

          <button 
            v-for="page in totalPages" 
            :key="page"
            @click="currentPage = page"
            :class="[
              'w-7 h-7 rounded-md font-bold flex items-center justify-center text-xs transition-colors cursor-pointer',
              currentPage === page 
                ? 'bg-blue-600 text-white shadow-xs' 
                : 'border border-gray-200 text-gray-700 hover:bg-gray-100'
            ]"
          >
            {{ page }}
          </button>

          <button 
            @click="currentPage++" 
            :disabled="currentPage === totalPages || totalPages === 0" 
            class="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <i class="fa-solid fa-chevron-right text-[10px]"></i>
          </button>
        </div>
      </div>
    </div>

  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { 
  getVehicles, 
  getVehicleById,
  deleteVehicle, 
  getBrand, 
  getCategory,
  getVehiclesImage,
  deleteVehicleImage 
} from '../api/vehicle'

const router = useRouter()
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

const vehicles = ref([])
const vehicleImages = ref([])
const brandOptions = ref([])
const categoryOptions = ref([])
const imageErrorTracker = ref({})

const loading = ref(true)
const error = ref(null)
const deletingId = ref(null)

const currentPage = ref(1)
const itemsPerPage = ref(10)

const searchQuery = ref('')
const selectedBrand = ref('All Brands')
const selectedCategory = ref('All Categories')
const selectedStatus = ref('Any Status')
const selectedPriceRange = ref('Price Range')

const navigateToAdd = () => router.push('/admin/vehicles/create')
const navigateToDetail = (id) => router.push(`/admin/vehicles/${id}`)
const navigateToEdit = (id) => router.push(`/admin/vehicles/update/${id}`)

const unwrapResponse = (res) => {
  if (!res) return []
  if (Array.isArray(res)) return res
  if (Array.isArray(res.data)) return res.data
  if (Array.isArray(res.content)) return res.content
  if (Array.isArray(res.data?.content)) return res.data.content
  return []
}

const extractName = (item) => {
  if (typeof item === 'string') return item
  return item?.name || item?.brandName || item?.categoryName || item?.brand_name || item?.category_name || 'N/A'
}

const getBrandName = (v) => {
  if (typeof v?.brand === 'object' && v.brand) return extractName(v.brand)
  return v?.brandName || v?.brand_name || (typeof v?.brand === 'string' ? v.brand : 'N/A')
}

const getCategoryName = (v) => {
  if (typeof v?.category === 'object' && v.category) return extractName(v.category)
  return v?.categoryName || v?.category_name || (typeof v?.category === 'string' ? v.category : 'N/A')
}

const formatImageUrl = (rawPath) => {
  if (!rawPath) return null
  if (rawPath.startsWith('http://') || rawPath.startsWith('https://') || rawPath.startsWith('data:')) {
    return rawPath
  }
  const cleanPath = rawPath.startsWith('/') ? rawPath : `/${rawPath}`
  return `${API_BASE_URL}${cleanPath}`
}

const getVehicleImage = (v) => {
  if (!v) return null

  // 1. Direct Vehicle Object Image Array / Props (if present)
  if (Array.isArray(v.vehicleImages) && v.vehicleImages.length > 0) {
    const imgObj = v.vehicleImages[0]
    const raw = typeof imgObj === 'string' ? imgObj : imgObj?.image || imgObj?.imageUrl || imgObj?.url
    if (raw) return formatImageUrl(raw)
  }
  if (typeof v.image === 'string' && v.image) return formatImageUrl(v.image)
  if (typeof v.imageUrl === 'string' && v.imageUrl) return formatImageUrl(v.imageUrl)

  // 2. Match with standalone vehicleImages payload by vehicle_name / name
  if (Array.isArray(vehicleImages.value) && vehicleImages.value.length > 0) {
    const vehicleName = (v.name || `${getBrandName(v)} ${v.model || ''}`).trim().toLowerCase()
    
    const match = vehicleImages.value.find(img => {
      // Match by exact vehicle_name or name property
      const imgVehicleName = String(img.vehicle_name || img.vehicleName || img.name || '').trim().toLowerCase()
      if (imgVehicleName && imgVehicleName === vehicleName) return true

      // Fallback: match by ID if backend supports it
      const imgVehicleId = Number(img.vehicle_id ?? img.vehicleId ?? img.id)
      return imgVehicleId === Number(v.id)
    })

    if (match) {
      const raw = match.image || match.imageUrl || match.url || match.path
      if (raw) return formatImageUrl(raw)
    }
  }

  return null
}

const handleImageError = (vehicleId) => {
  imageErrorTracker.value[vehicleId] = true
}

const fetchInitialData = async () => {
  try {
    loading.value = true
    error.value = null
    imageErrorTracker.value = {}

    const [vehiclesRes, imagesRes, brandsRes, categoriesRes] = await Promise.all([
      getVehicles(),
      getVehiclesImage().catch(() => []),
      getBrand(),
      getCategory()
    ])

    const rawList = unwrapResponse(vehiclesRes)
    vehicleImages.value = unwrapResponse(imagesRes)
    brandOptions.value = unwrapResponse(brandsRes)
    categoryOptions.value = unwrapResponse(categoriesRes)

    // Deep resolution via getVehicleById if essential fields are omitted in list endpoint
    if (rawList.length > 0) {
      const detailedVehicles = await Promise.all(
        rawList.map(async (v) => {
          const hasDetails = v?.brand || v?.category || v?.image || v?.vehicleImages
          if (v?.id && !hasDetails) {
            try {
              const detailRes = await getVehicleById(v.id)
              const detail = detailRes?.data || detailRes
              return { ...v, ...detail }
            } catch (e) {
              return v
            }
          }
          return v
        })
      )
      vehicles.value = detailedVehicles
    } else {
      vehicles.value = []
    }

  } catch (err) {
    console.error('Failed to load vehicle data:', err)
    error.value = err.response?.data?.message || err.response?.data?.msg || err.message || 'Failed to load vehicle fleet data'
  } finally {
    loading.value = false
  }
}

const handleDelete = async (vehicle) => {
  const isConfirmed = window.confirm(`Are you sure you want to delete ${vehicle.name || 'this vehicle'} (#${vehicle.id})?`)
  if (!isConfirmed) return

  try {
    deletingId.value = vehicle.id
    
    const targetImgId = vehicle.imageId || vehicle.image_id || vehicleImages.value.find(img => Number(img.vehicleId ?? img.vehicle_id) === Number(vehicle.id))?.id
    if (targetImgId) {
      await deleteVehicleImage(targetImgId).catch(() => {})
    }

    await deleteVehicle(vehicle.id)
    vehicles.value = vehicles.value.filter(v => v.id !== vehicle.id)
  } catch (err) {
    console.error('Failed to delete vehicle:', err)
    alert(err.response?.data?.message || err.response?.data?.msg || 'Failed to delete vehicle.')
  } finally {
    deletingId.value = null
  }
}

const getVehicleRate = (v) => Number(v.pricePerDay ?? v.price_per_day ?? v.dailyRate ?? 0)

const stats = computed(() => {
  const total = vehicles.value.length
  let available = 0, rented = 0, maintenance = 0, unavailable = 0

  vehicles.value.forEach(v => {
    const s = String(v.status || '').toUpperCase()
    if (s === 'AVAILABLE') available++
    else if (s === 'RENTED' || s === 'ACTIVE') rented++
    else if (s === 'MAINTENANCE') maintenance++
    else unavailable++
  })

  return { total, available, rented, maintenance, unavailable }
})

const filteredVehicles = computed(() => {
  return vehicles.value.filter(v => {
    const q = searchQuery.value.toLowerCase().trim()
    
    const nameMatches = !q || String(v.name || '').toLowerCase().includes(q)
    const modelMatches = !q || String(v.model || '').toLowerCase().includes(q)
    const plateMatches = !q || String(v.plate_number || v.plateNumber || '').toLowerCase().includes(q)
    const brandMatchesSearch = !q || getBrandName(v).toLowerCase().includes(q)
    const categoryMatchesSearch = !q || getCategoryName(v).toLowerCase().includes(q)

    const searchMatches = nameMatches || modelMatches || plateMatches || brandMatchesSearch || categoryMatchesSearch
    
    const vehicleBrand = getBrandName(v)
    const brandMatches = selectedBrand.value === 'All Brands' || vehicleBrand === selectedBrand.value

    const vehicleCategory = getCategoryName(v)
    const categoryMatches = selectedCategory.value === 'All Categories' || vehicleCategory === selectedCategory.value

    const statusStr = String(v.status || '').toUpperCase()
    const statusMatches = selectedStatus.value === 'Any Status' || statusStr === selectedStatus.value.toUpperCase()

    const rate = getVehicleRate(v)
    let priceMatches = true
    if (selectedPriceRange.value === 'under50') priceMatches = rate < 50
    else if (selectedPriceRange.value === '50-100') priceMatches = rate >= 50 && rate <= 100
    else if (selectedPriceRange.value === 'above100') priceMatches = rate > 100

    return searchMatches && brandMatches && categoryMatches && statusMatches && priceMatches
  })
})

watch([searchQuery, selectedBrand, selectedCategory, selectedStatus, selectedPriceRange], () => {
  currentPage.value = 1
})

const totalPages = computed(() => Math.ceil(filteredVehicles.value.length / itemsPerPage.value) || 1)

const paginatedVehicles = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredVehicles.value.slice(start, end)
})

const startItemIndex = computed(() => {
  if (filteredVehicles.value.length === 0) return 0
  return (currentPage.value - 1) * itemsPerPage.value + 1
})

const endItemIndex = computed(() => {
  const max = currentPage.value * itemsPerPage.value
  return max > filteredVehicles.value.length ? filteredVehicles.value.length : max
})

const resetFilters = () => {
  searchQuery.value = ''
  selectedBrand.value = 'All Brands'
  selectedCategory.value = 'All Categories'
  selectedStatus.value = 'Any Status'
  selectedPriceRange.value = 'Price Range'
  currentPage.value = 1
}

const getStatusBadgeClass = (status) => {
  const s = String(status || '').toUpperCase()
  switch (s) {
    case 'AVAILABLE': return 'px-2.5 py-1 text-[10px] font-bold inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 rounded-full'
    case 'RENTED':
    case 'ACTIVE': return 'px-2.5 py-1 text-[10px] font-bold inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 rounded-full'
    case 'MAINTENANCE': return 'px-2.5 py-1 text-[10px] font-bold inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 rounded-full'
    default: return 'px-2.5 py-1 text-[10px] font-bold inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 rounded-full'
  }
}

const getStatusDotClass = (status) => {
  const s = String(status || '').toUpperCase()
  switch (s) {
    case 'AVAILABLE': return 'bg-emerald-500'
    case 'RENTED':
    case 'ACTIVE': return 'bg-blue-600'
    case 'MAINTENANCE': return 'bg-amber-500'
    default: return 'bg-rose-500'
  }
}

onMounted(fetchInitialData)
</script>