<template>
  <main class="p-6 md:p-8 min-h-[calc(100vh-64px)] bg-gray-50/50">
    
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Categories</h1>
        <p class="text-xl text-gray-900 mt-1">Manage vehicle classifications and fleet distribution</p>
      </div>
      
      <div class="flex items-center gap-3 w-full md:w-auto">
        <div class="relative flex-1 md:w-64">
               <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Search categories..." 
            class="w-full h-9 pl-9 pr-4 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-xs"
          >
        </div>
        <button 
          @click="navigateToAdd" 
          class="inline-flex items-center justify-center gap-2 h-12 px-4 rounded-[8px] text-xs font-semibold text-white bg-gray-900 hover:bg-gray-800 transition-all shadow-xs shrink-0 active:scale-95 cursor-pointer"
        >
          <i class="fa-solid fa-plus text-[10px]"></i> 
          <span>Add Category</span>
        </button>
      </div>
    </div>

    <!-- 3 KPI Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      
      <!-- Card 1: Total Categories -->
      <div class="p-5 bg-white border border-gray-200/80 rounded-xl shadow-xs hover:border-gray-300 transition-all flex items-center justify-between">
        <div>
          <span class="text-[#0f172a] text-[15px] font-bold uppercase tracking-wider"
            style="font-family: var(--font-heading);">Total Categories</span>
          <div class="mt-2 text-2xl font-extrabold text-gray-900">{{ categories.length }}</div>
          <p class="text-[11px] text-gray-400 mt-0.5 font-medium">Active fleet groups</p>
        </div>
        <div class="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm">
          <i class="fa-solid fa-shapes"></i>
        </div>
      </div>

      <!-- Card 2: Total Fleet Size -->
      <div class="p-5 bg-white border border-gray-200/80 rounded-xl shadow-xs hover:border-gray-300 transition-all flex items-center justify-between">
        <div>
           <span class="text-[#0f172a] text-[15px] font-bold uppercase tracking-wider"
            style="font-family: var(--font-heading);">Total Fleet Size</span>
          <div class="mt-2 text-2xl font-extrabold text-gray-900">{{ totalFleetCount }}</div>
          <p class="text-[11px] text-gray-400 mt-0.5 font-medium">Vehicles assigned</p>
        </div>
        <div class="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">
          <i class="fa-solid fa-car"></i>
        </div>
      </div>

      <!-- Card 3: Top Category -->
      <div class="p-5 bg-white border border-gray-200/80 rounded-xl shadow-xs hover:border-gray-300 transition-all flex items-center justify-between sm:col-span-2 lg:col-span-1">
        <div>
           <span class="text-[#0f172a] text-[15px] font-bold uppercase tracking-wider"
            style="font-family: var(--font-heading);">Top Demand Category</span>
          <div class="mt-2 text-2xl font-extrabold text-gray-900">{{ topCategory.name }}</div>
          <p class="text-[11px] text-emerald-600 font-bold mt-0.5 inline-flex items-center gap-1">
            <i class="fa-solid fa-arrow-trend-up text-[10px]"></i> 
            {{ topCategory.count }} Vehicles ({{ topCategory.percentage }}%)
          </p>
        </div>
        <div class="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm">
          <i class="fa-solid fa-chart-pie"></i>
        </div>
      </div>

    </div>

    <!-- Category Directory Table Card -->
    <div class="bg-white border border-gray-200/80 rounded-xl shadow-xs overflow-hidden mb-6">
      
      <!-- Table Filter Header -->
      <div class="flex items-center justify-between p-4 px-6 border-b border-gray-200/80 bg-white">
        <div class="flex items-center gap-2">
          <h2 class="font-bold text-sm text-gray-900">Category Directory</h2>
          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-600">
            {{ filteredCategories.length }} Items
          </span>
        </div>
        
        <div class="flex items-center gap-2">
          <select v-model="selectedStatus" class="h-8 px-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer">
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-gray-700">
          <thead>
            <tr class="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider text-[10px] border-b border-gray-200">
              <th class="py-3 px-6">Category</th>
              <th class="py-3 px-5">Description</th>
              <th class="py-3 px-5">Fleet Count</th>
              <th class="py-3 px-5">Associated Brands</th>
              <th class="py-3 px-5">Created Date</th>
              <th class="py-3 px-5">Status</th>
              <th class="py-3 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            
            <!-- Loading -->
            <tr v-if="loading" v-for="n in 3" :key="n" class="animate-pulse">
              <td colspan="7" class="py-4 px-6 text-center text-gray-400">Loading categories...</td>
            </tr>

            <!-- Error -->
            <tr v-else-if="error" class="text-rose-600">
              <td colspan="7" class="py-8 px-6 text-center">
                <p class="font-medium mb-2">{{ error }}</p>
                <button @click="fetchCategories" class="text-xs text-blue-600 underline font-semibold">Try Again</button>
              </td>
            </tr>

            <!-- Empty -->
            <tr v-else-if="paginatedCategories.length === 0">
              <td colspan="7" class="py-8 px-6 text-center text-gray-500">No categories found matching criteria.</td>
            </tr>

            <!-- Rows -->
            <tr v-else v-for="cat in paginatedCategories" :key="cat.id" class="hover:bg-gray-50/80 transition-colors">
              <td class="py-3.5 px-6">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <i :class="getCategoryIcon(cat.name)"></i>
                  </div>
                  <span class="font-bold text-gray-900 text-xs">{{ cat.name }}</span>
                </div>
              </td>
              <td class="py-3.5 px-5 text-gray-500 max-w-xs truncate">{{ cat.description || 'N/A' }}</td>
              <td class="py-3.5 px-5 font-bold text-gray-900">{{ getFleetCount(cat) }}</td>
              <td class="py-3.5 px-5 text-gray-600 font-medium">{{ getAssociatedBrands(cat) }}</td>
              <td class="py-3.5 px-5 text-gray-400">{{ formatDate(cat.created_at || cat.createdAt) }}</td>
              <td class="py-3.5 px-5">
                <span :class="getStatusBadgeClass(cat.status)">
                  <span class="w-1.5 h-1.5 rounded-full" :class="getStatusDotClass(cat.status)"></span>
                  {{ getStatusText(cat.status) }}
                </span>
              </td>
              <td class="py-3.5 px-6 text-right">
                <div class="flex items-center justify-end gap-1">
                  <!-- View -->
                  <button @click="navigateToDetail(cat.id)" class="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer" title="View Details">
                    <i class="fa-regular fa-eye text-xs"></i>
                  </button>

                  <!-- Edit -->
                  <button @click="navigateToEdit(cat.id)" class="p-1.5 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-all cursor-pointer" title="Edit Category">
                    <i class="fa-regular fa-pen-to-square text-xs"></i>
                  </button>

                  <!-- Delete -->
                  <button @click="handleDelete(cat)" :disabled="deletingId === cat.id" class="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer disabled:opacity-50" title="Delete Category">
                    <i v-if="deletingId === cat.id" class="fa-solid fa-circle-notch fa-spin text-xs text-rose-600"></i>
                    <i v-else class="fa-regular fa-trash-can text-xs"></i>
                  </button>
                </div>
              </td>
            </tr>

          </tbody>
        </table>
      </div>

      <!-- Pagination Footer (10 items per page) -->
      <div v-if="!loading && filteredCategories.length > 0" class="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-gray-100 text-xs text-gray-500 gap-3">
        <div>
          Showing 
          <span class="font-bold text-gray-900">{{ startItemIndex }}–{{ endItemIndex }}</span> 
          of 
          <span class="font-bold text-gray-900">{{ filteredCategories.length }}</span> 
          categories
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
import { getCategories, deleteCategory } from '../api/category'

const router = useRouter()

const categories = ref([])
const loading = ref(true)
const error = ref(null)
const deletingId = ref(null)

/* Search & Filters */
const searchQuery = ref('')
const selectedStatus = ref('All')

/* Pagination */
const currentPage = ref(1)
const itemsPerPage = ref(10)

/* Navigation */
const navigateToAdd = () => router.push('/admin/categories/create')
const navigateToDetail = (id) => router.push(`/admin/categories/${id}`)
const navigateToEdit = (id) => router.push(`/admin/categories/update/${id}`)

/* Fetch Data */
const fetchCategories = async () => {
  try {
    loading.value = true
    error.value = null
    const res = await getCategories()
    categories.value = Array.isArray(res) ? res : (res?.data || [])
  } catch (err) {
    console.error('Failed to load categories:', err)
    error.value = err.response?.data?.message || err.response?.data?.msg || 'Failed to load category directory.'
  } finally {
    loading.value = false
  }
}

/* Delete Handler */
const handleDelete = async (cat) => {
  const isConfirmed = window.confirm(`Are you sure you want to delete category "${cat.name}" (#${cat.id})?`)
  if (!isConfirmed) return

  try {
    deletingId.value = cat.id
    await deleteCategory(cat.id)
    categories.value = categories.value.filter(c => c.id !== cat.id)
  } catch (err) {
    console.error('Failed to delete category:', err)
    alert(err.response?.data?.message || err.response?.data?.msg || 'Failed to delete category.')
  } finally {
    deletingId.value = null
  }
}

/* Stats Calculations */
const totalFleetCount = computed(() => {
  return categories.value.reduce((acc, cat) => acc + getFleetCount(cat), 0)
})

const topCategory = computed(() => {
  if (categories.value.length === 0) return { name: 'N/A', count: 0, percentage: 0 }
  
  let top = categories.value[0]
  let maxCount = getFleetCount(top)

  categories.value.forEach(cat => {
    const count = getFleetCount(cat)
    if (count > maxCount) {
      maxCount = count
      top = cat
    }
  })

  const total = totalFleetCount.value || 1
  const pct = Math.round((maxCount / total) * 100)

  return {
    name: top.name || 'N/A',
    count: maxCount,
    percentage: pct
  }
})

/* Filter Logic */
const filteredCategories = computed(() => {
  return categories.value.filter(cat => {
    const q = searchQuery.value.toLowerCase().trim()
    const nameMatches = !q || String(cat.name || '').toLowerCase().includes(q)
    const descMatches = !q || String(cat.description || '').toLowerCase().includes(q)

    const statusText = getStatusText(cat.status)
    const statusMatches = selectedStatus.value === 'All' || statusText.toLowerCase() === selectedStatus.value.toLowerCase()

    return (nameMatches || descMatches) && statusMatches
  })
})

/* Watchers & Pagination */
watch([searchQuery, selectedStatus], () => {
  currentPage.value = 1
})

const totalPages = computed(() => Math.ceil(filteredCategories.value.length / itemsPerPage.value) || 1)

const paginatedCategories = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredCategories.value.slice(start, start + itemsPerPage.value)
})

const startItemIndex = computed(() => {
  if (filteredCategories.value.length === 0) return 0
  return (currentPage.value - 1) * itemsPerPage.value + 1
})

const endItemIndex = computed(() => {
  const max = currentPage.value * itemsPerPage.value
  return max > filteredCategories.value.length ? filteredCategories.value.length : max
})

/* Data Helpers */
const getFleetCount = (cat) => {
  if (typeof cat.vehicleCount === 'number') return cat.vehicleCount
  if (typeof cat.fleetCount === 'number') return cat.fleetCount
  if (Array.isArray(cat.vehicles)) return cat.vehicles.length
  return 0
}

const getAssociatedBrands = (cat) => {
  if (typeof cat.associatedBrands === 'string') return cat.associatedBrands
  if (Array.isArray(cat.brands)) return cat.brands.map(b => b.name || b).join(', ')
  return 'Multiple Brands'
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

const getCategoryIcon = (name) => {
  const n = String(name || '').toLowerCase()
  if (n.includes('suv')) return 'fa-solid fa-van-shuttle text-xs'
  if (n.includes('sedan')) return 'fa-solid fa-car-side text-xs'
  if (n.includes('hatchback')) return 'fa-solid fa-car text-xs'
  if (n.includes('pickup')) return 'fa-solid fa-truck-pickup text-xs'
  if (n.includes('van')) return 'fa-solid fa-bus text-xs'
  if (n.includes('luxury')) return 'fa-solid fa-gem text-xs'
  return 'fa-solid fa-shapes text-xs'
}

/* Badge Styles */
const getStatusBadgeClass = (status) => {
  return getStatusText(status) === 'Active'
    ? 'px-2.5 py-1 text-[10px] font-bold inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 rounded-full'
    : 'px-2.5 py-1 text-[10px] font-bold inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 rounded-full'
}

const getStatusDotClass = (status) => {
  return getStatusText(status) === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'
}

onMounted(fetchCategories)
</script>