<template>
  <main class="p-6 md:p-8 min-h-[calc(100vh-64px)] bg-[var(--background)] text-[var(--text)]">
    
    <!-- Page Header & Top Search/Action Bar -->
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-[var(--text)]">Brands</h1>
        <p class="text-xl text-[--text)] mt-1">Manage manufacturer profiles and brand distribution</p>
      </div>
      
      <div class="flex items-center gap-3 w-full md:w-auto">
        <div class="relative flex-1 md:w-64">
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Search brand or category..." 
            class="w-full h-9 pl-9 pr-4 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-xs font-medium text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] transition-all shadow-[var(--shadow-sm)]"
          >
        </div>
        <button 
          @click="navigateToAdd" 
          class="inline-flex items-center justify-center gap-2 h-12 px-4 rounded-[11px] text-xs font-semibold text-[var(--background)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-all shadow-[var(--shadow-sm)] shrink-0 active:scale-95 cursor-pointer"
        >
          <i class="fa-solid fa-plus text-[10px]"></i> 
          <span>Add Brand</span>
        </button>
      </div>
    </div>

    <!-- 3 KPI Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      
      <!-- Card 1: Total Brands -->
      <div class="p-5 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-[var(--shadow-sm)] hover:border-[var(--muted)] transition-all flex items-center justify-between">
        <div>
          <span class="text-[var(--text)] text-[15px] font-bold uppercase tracking-wider">Total Brands</span>
          <div class="mt-2 text-2xl font-extrabold text-[var(--text)]">{{ brands.length }}</div>
          <p class="text-[11px] text-[var(--muted)] mt-0.5 font-medium">Registered manufacturers</p>
        </div>
        <div class="w-10 h-10 rounded-lg bg-[var(--background)] text-[var(--accent)] flex items-center justify-center text-sm border border-[var(--border)]">
          <i class="fa-solid fa-shield-halved"></i>
        </div>
      </div>

      <!-- Card 2: Active Brands -->
      <div class="p-5 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-[var(--shadow-sm)] hover:border-[var(--muted)] transition-all flex items-center justify-between">
        <div>
          <span class="text-[var(--text)] text-[15px] font-bold uppercase tracking-wider">Active Brands</span>
          <div class="mt-2 text-2xl font-extrabold text-[var(--text)]">{{ activeBrandsCount }}</div>
          <p class="text-[11px] text-(--success) font-bold mt-0.5 inline-flex items-center gap-1">
            <i class="fa-solid fa-circle-check text-[10px]"></i> {{ activeRatio }}% Operational ratio
          </p>
        </div>
        <div class="w-10 h-10 rounded-lg bg-[var(--background)] text-[var(--accent)] flex items-center justify-center text-sm border border-[var(--border)]">
          <i class="fa-solid fa-circle-check"></i>
        </div>
      </div>

      <!-- Card 3: Top Brand -->
      <div class="p-5 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-[var(--shadow-sm)] hover:border-[var(--muted)] transition-all flex items-center justify-between sm:col-span-2 lg:col-span-1">
        <div>
          <span class="text-[var(--text)] text-[15px] font-bold uppercase tracking-wider">Largest Share</span>
          <div class="mt-2 text-2xl font-extrabold text-[var(--text)]">{{ topBrand.name }}</div>
          <p class="text-[11px] text-(--success) mt-0.5 font-medium">{{ topBrand.count }} Fleet Vehicles ({{ topBrand.percentage }}%)</p>
        </div>
        <div class="w-10 h-10 rounded-lg bg-[var(--background)] text-[var(--accent)] flex items-center justify-center text-sm border border-[var(--border)]">
          <i class="fa-solid fa-car"></i>
        </div>
      </div>

    </div>

    <!-- Filter Control Bar -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-2">
        <h2 class="font-bold text-sm text-[var(--text)]">All Brand Cards</h2>
        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[var(--background)] text-[var(--muted)] border border-[var(--border)]">{{ filteredBrands.length }} Brands</span>
      </div>

      <div class="flex items-center gap-2">
        <select v-model="selectedStatus" class="h-8 px-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-xs font-semibold text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] transition-all cursor-pointer shadow-[var(--shadow-sm)]">
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div v-for="n in 6" :key="n" class="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 shadow-[var(--shadow-sm)] animate-pulse space-y-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-[var(--border)]"></div>
          <div class="h-4 bg-[var(--border)] rounded w-1/2"></div>
        </div>
        <div class="h-10 bg-[var(--border)] rounded"></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="p-8 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-center my-6">
      <i class="fa-solid fa-triangle-exclamation text-[var(--danger)] text-2xl mb-2"></i>
      <p class="text-[var(--text)] font-semibold mb-1">Failed to load brand data</p>
      <p class="text-[var(--muted)] text-xs mb-4">{{ error }}</p>
      <button @click="fetchBrands" class="px-4 py-2 bg-[var(--accent)] text-[var(--background)] text-xs font-semibold rounded-lg hover:bg-[var(--accent-hover)] cursor-pointer">Retry</button>
    </div>

    <!-- Empty State -->
    <div v-else-if="paginatedBrands.length === 0" class="p-12 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-center my-6">
      <i class="fa-solid fa-shield-halved text-[var(--muted)] text-3xl mb-2"></i>
      <p class="text-[var(--text)] font-semibold text-sm">No brands found matching criteria</p>
    </div>

    <!-- Brand Cards Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
      
      <div 
        v-for="brand in paginatedBrands" 
        :key="brand.id"
        class="bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-[var(--shadow-sm)] p-5 hover:border-[var(--muted)] transition-all flex flex-col justify-between group"
      >
        <div>
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-3">
              <!-- Brand Logo Container -->
              <div class="w-10 h-10 rounded-lg bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--text)] shrink-0 font-bold text-sm group-hover:border-[var(--accent)]/50 transition-colors overflow-hidden">
                <img 
                  v-if="getBrandLogo(brand)" 
                  :src="getBrandLogo(brand)" 
                  :alt="getBrandName(brand)"
                  @error="handleImageError"
                  class="w-full h-full object-contain p-1"
                />
                <i v-else class="fa-solid fa-car text-[var(--muted)]"></i>
              </div>
              <div>
                <h3 class="font-bold text-[var(--text)] text-sm">{{ getBrandName(brand) }}</h3>
                <span :class="getStatusBadgeClass(brand.status)" class="mt-1">
                  <span class="w-1.5 h-1.5 rounded-full" :class="getStatusDotClass(brand.status)"></span>
                  {{ getStatusText(brand.status) }}
                </span>
              </div>
            </div>
            
            <!-- Delete Action Button -->
            <button 
              @click="handleDelete(brand)" 
              :disabled="deletingId === brand.id"
              class="w-7 h-7 rounded-lg hover:bg-[var(--danger)]/10 text-[var(--muted)] hover:text-[var(--danger)] transition-colors inline-flex items-center justify-center cursor-pointer disabled:opacity-50"
              title="Delete Brand"
            >
              <i v-if="deletingId === brand.id" class="fa-solid fa-circle-notch fa-spin text-xs text-[var(--danger)]"></i>
              <i v-else class="fa-regular fa-trash-can text-xs"></i>
            </button>
          </div>

          <div class="grid grid-cols-2 gap-3 py-3 border-y border-[var(--border)] my-3 text-xs">
            <div>
              <span class="text-[11px] text-[var(--muted)] font-medium">Fleet Size</span>
              <div class="text-base font-extrabold text-[var(--text)] mt-0.5">
                {{ getFleetCount(brand) }} <span class="text-[10px] font-normal text-[var(--muted)]">units</span>
              </div>
            </div>
            <div>
              <span class="text-[11px] text-[var(--muted)] font-medium">Categories</span>
              <div class="text-xs font-bold text-[var(--muted)] mt-1 truncate" :title="getCategoriesList(brand)">
                {{ getCategoriesList(brand) }}
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-end gap-2 pt-1">
          <button 
            @click="navigateToDetail(brand.id)"
            class="h-8 px-3 rounded-lg text-xs font-semibold text-[var(--text)] bg-[var(--background)] border border-[var(--border)] hover:bg-[var(--border)] transition-all inline-flex items-center gap-1.5 cursor-pointer"
          >
            <i class="fa-regular fa-eye text-[11px] text-[var(--muted)]"></i>
            <span>View</span>
          </button>
          <button 
            @click="navigateToEdit(brand.id)"
            class="h-8 px-3 rounded-lg text-xs font-semibold text-[var(--text)] bg-[var(--background)] border border-[var(--border)] hover:bg-[var(--border)] transition-all inline-flex items-center gap-1.5 cursor-pointer"
          >
            <i class="fa-solid fa-pen text-[11px] text-[var(--muted)]"></i>
            <span>Edit</span>
          </button>
        </div>
      </div>

    </div>

    <!-- Pagination Footer -->
    <div v-if="!loading && filteredBrands.length > 0" class="flex flex-col sm:flex-row items-center justify-between p-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-[var(--shadow-sm)] text-xs text-[var(--muted)] gap-3">
      <div>
        Showing 
        <span class="font-bold text-[var(--text)]">{{ startItemIndex }}–{{ endItemIndex }}</span> 
        of 
        <span class="font-bold text-[var(--text)]">{{ filteredBrands.length }}</span> 
        brands
      </div>

      <div class="flex items-center gap-1">
        <button 
          @click="currentPage--" 
          :disabled="currentPage === 1" 
          class="w-7 h-7 rounded-md border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:bg-[var(--background)] hover:text-[var(--text)] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
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
              ? 'bg-[var(--accent)] text-[var(--background)] shadow-[var(--shadow-sm)]' 
              : 'border border-[var(--border)] text-[var(--text)] hover:bg-[var(--background)]'
          ]"
        >
          {{ page }}
        </button>

        <button 
          @click="currentPage++" 
          :disabled="currentPage === totalPages || totalPages === 0" 
          class="w-7 h-7 rounded-md border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:bg-[var(--text)] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <i class="fa-solid fa-chevron-right text-[10px]"></i>
        </button>
      </div>
    </div>

  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getBrands, deleteBrand } from '../api/brands'


const router = useRouter()

const brands = ref([])
const loading = ref(true)
const error = ref(null)
const deletingId = ref(null)

/* Search & Filters */
const searchQuery = ref('')
const selectedStatus = ref('All')

/* Pagination (10 per page) */
const currentPage = ref(1)
const itemsPerPage = ref(10)

/* Navigation */
const navigateToAdd = () => router.push('/admin/brands/create')
const navigateToDetail = (id) => router.push(`/admin/brands/${id}`)
const navigateToEdit = (id) => router.push(`/admin/brands/update/${id}`)

/* Fetch Data */
const fetchBrands = async () => {
  try {
    loading.value = true
    error.value = null
    const res = await getBrands()
    brands.value = Array.isArray(res) ? res : (res?.data || [])
  } catch (err) {
    console.error('Failed to load brands:', err)
    error.value = err.response?.data?.message || err.response?.data?.msg || 'Failed to load brand inventory.'
  } finally {
    loading.value = false
  }
}

/* Delete Brand */
const handleDelete = async (brand) => {
  const brandName = getBrandName(brand)
  const isConfirmed = window.confirm(`Are you sure you want to delete brand "${brandName}" (#${brand.id})?`)
  if (!isConfirmed) return

  try {
    deletingId.value = brand.id
    await deleteBrand(brand.id)
    brands.value = brands.value.filter(b => b.id !== brand.id)
  } catch (err) {
    console.error('Failed to delete brand:', err)
    alert(err.response?.data?.message || err.response?.data?.msg || 'Failed to delete brand.')
  } finally {
    deletingId.value = null
  }
}

/* Helper: Brand Name */
const getBrandName = (brand) => {
  if (!brand) return 'N/A'
  return brand.name || brand.brandName || brand.brand_name || 'N/A'
}

/* Helper: Brand Logo */
const getBrandLogo = (brand) => {
  if (!brand) return null
  return brand.logo || brand.logoUrl || brand.image || brand.brandLogo || null
}

const handleImageError = (e) => {
  e.target.style.display = 'none'
}

/* Helper: Fleet Count */
const getFleetCount = (brand) => {
  if (typeof brand.vehicleCount === 'number') return brand.vehicleCount
  if (typeof brand.fleetSize === 'number') return brand.fleetSize
  if (Array.isArray(brand.vehicles)) return brand.vehicles.length
  return 0
}

/* Helper: Categories List */
const getCategoriesList = (brand) => {
  if (typeof brand.categories === 'string' && brand.categories.trim() !== '') {
    return brand.categories
  }
  if (Array.isArray(brand.categories) && brand.categories.length > 0) {
    return brand.categories
      .map(c => (typeof c === 'object' ? (c.name || c.categoryName || c.category_name) : c))
      .filter(Boolean)
      .join(', ')
  }
  return 'General'
}

/* Helper: Status Text */
const getStatusText = (status) => {
  if (typeof status === 'boolean') return status ? 'Active' : 'Inactive'
  if (typeof status === 'string') return status.toUpperCase() === 'INACTIVE' ? 'Inactive' : 'Active'
  return 'Active'
}

/* KPI Calculations */
const activeBrandsCount = computed(() => {
  return brands.value.filter(b => getStatusText(b.status) === 'Active').length
})

const activeRatio = computed(() => {
  if (brands.value.length === 0) return 0
  return Math.round((activeBrandsCount.value / brands.value.length) * 100)
})

const topBrand = computed(() => {
  if (brands.value.length === 0) return { name: 'N/A', count: 0, percentage: 0 }
  
  let top = brands.value[0]
  let maxCount = getFleetCount(top)

  brands.value.forEach(b => {
    const count = getFleetCount(b)
    if (count > maxCount) {
      maxCount = count
      top = b
    }
  })

  const total = brands.value.reduce((acc, b) => acc + getFleetCount(b), 0) || 1
  const pct = Math.round((maxCount / total) * 100)

  return {
    name: getBrandName(top),
    count: maxCount,
    percentage: pct
  }
})

/* Filters */
const filteredBrands = computed(() => {
  return brands.value.filter(b => {
    const q = searchQuery.value.toLowerCase().trim()
    const nameMatches = !q || getBrandName(b).toLowerCase().includes(q)
    const descMatches = !q || String(b.description || '').toLowerCase().includes(q)
    const categoryMatches = !q || getCategoriesList(b).toLowerCase().includes(q)

    const statusText = getStatusText(b.status)
    const statusMatches = selectedStatus.value === 'All' || statusText.toLowerCase() === selectedStatus.value.toLowerCase()

    return (nameMatches || descMatches || categoryMatches) && statusMatches
  })
})

watch([searchQuery, selectedStatus], () => {
  currentPage.value = 1
})

/* Pagination Calculations */
const totalPages = computed(() => Math.ceil(filteredBrands.value.length / itemsPerPage.value) || 1)

const paginatedBrands = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredBrands.value.slice(start, start + itemsPerPage.value)
})

const startItemIndex = computed(() => {
  if (filteredBrands.value.length === 0) return 0
  return (currentPage.value - 1) * itemsPerPage.value + 1
})

const endItemIndex = computed(() => {
  const max = currentPage.value * itemsPerPage.value
  return max > filteredBrands.value.length ? filteredBrands.value.length : max
})

/* Status Badge Styling */
const getStatusBadgeClass = (status) => {
  return getStatusText(status) === 'Active'
    ? 'px-2 py-0.5 text-[10px] font-bold inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 rounded-full'
    : 'px-2 py-0.5 text-[10px] font-bold inline-flex items-center gap-1 bg-rose-50 text-rose-700 rounded-full'
}

const getStatusDotClass = (status) => {
  return getStatusText(status) === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'
}

onMounted(fetchBrands)
</script>