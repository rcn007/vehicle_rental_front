<template>
  <main class="p-6 md:p-8 min-h-[calc(100vh-64px)] bg-[var(--background)] text-[var(--text)]">
    
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-[var(--primary)]">Categories</h1>
        <p class="text-xl text-[--text] mt-1">Manage vehicle classifications and fleet distribution</p>
      </div>
      
      <div class="flex items-center gap-3 w-full md:w-auto">
        <div class="relative flex-1 md:w-64">
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Search categories..." 
            class="w-full h-9 pl-9 pr-4 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-xs font-medium text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] transition-all shadow-[var(--shadow-sm)]"
          >
        </div>
        <button 
          @click="navigateToAdd" 
          class="inline-flex items-center justify-center gap-2 h-12 px-4 rounded-[8px] text-xs font-semibold text-[var(--background)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-all shadow-[var(--shadow-sm)] shrink-0 active:scale-95 cursor-pointer"
        >
          <i class="fa-solid fa-plus text-[10px]"></i> 
          <span>Add Category</span>
        </button>
      </div>
    </div>

    <!-- 3 KPI Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      
      <!-- Card 1: Total Categories -->
      <div class="p-5 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-[var(--shadow-sm)] hover:border-[var(--primary-soft)] transition-all flex items-center justify-between">
        <div>
          <span class="text-[var(--primary)] text-[15px] font-bold uppercase tracking-wider"
            style="font-family: var(--font-heading);">Total Categories</span>
          <div class="mt-2 text-2xl font-extrabold text-[var(--primary)]">{{ categories.length }}</div>
          <p class="text-[11px] text-[var(--muted)] mt-0.5 font-medium">Active fleet groups</p>
        </div>
        <div class="w-10 h-10 rounded-lg bg-[var(--background)] text-[var(--accent)] flex items-center justify-center text-sm border border-[var(--border)]">
          <i class="fa-solid fa-shapes"></i>
        </div>
      </div>

      <!-- Card 2: Total Fleet Size -->
      <div class="p-5 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-[var(--shadow-sm)] hover:border-[var(--primary-soft)] transition-all flex items-center justify-between">
        <div>
           <span class="text-[var(--primary)] text-[15px] font-bold uppercase tracking-wider"
            style="font-family: var(--font-heading);">Total Fleet Size</span>
          <div class="mt-2 text-2xl font-extrabold text-[var(--primary)]">{{ totalFleetCount }}</div>
          <p class="text-[11px] text-[var(--muted)] mt-0.5 font-medium">Vehicles assigned</p>
        </div>
        <div class="w-10 h-10 rounded-lg bg-[var(--background)] text-[var(--accent)] flex items-center justify-center text-sm border border-[var(--border)]">
          <i class="fa-solid fa-car"></i>
        </div>
      </div>

      <!-- Card 3: Top Category -->
      <div class="p-5 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-[var(--shadow-sm)] hover:border-[var(--primary-soft)] transition-all flex items-center justify-between sm:col-span-2 lg:col-span-1">
        <div>
           <span class="text-[var(--primary)] text-[15px] font-bold uppercase tracking-wider"
            style="font-family: var(--font-heading);">Top Demand Category</span>
          <div class="mt-2 text-2xl font-extrabold text-[var(--primary)]">{{ topCategory.name }}</div>
          <p class="text-[11px] text-[var(--success)] font-bold mt-0.5 inline-flex items-center gap-1">
            <i class="fa-solid fa-arrow-trend-up text-[10px]"></i> 
            {{ topCategory.count }} Vehicles ({{ topCategory.percentage }}%)
          </p>
        </div>
        <div class="w-10 h-10 rounded-lg bg-[var(--background)] text-[var(--success)] flex items-center justify-center text-sm border border-[var(--border)]">
          <i class="fa-solid fa-chart-pie"></i>
        </div>
      </div>

    </div>

    <!-- Category Directory Table Card -->
    <div class="bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-[var(--shadow-md)] overflow-hidden mb-6">
      
      <!-- Table Filter Header -->
      <div class="flex items-center justify-between p-4 px-6 border-b border-[var(--border)] bg-[var(--surface)]">
        <div class="flex items-center gap-2">
          <h2 class="font-bold text-sm text-[var(--primary)]">Category Directory</h2>
          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[var(--background)] text-[var(--secondary)] border border-[var(--border)]">
            {{ filteredCategories.length }} Items
          </span>
        </div>
        
        <div class="flex items-center gap-2">
          <select v-model="selectedStatus" class="h-8 px-3 bg-[var(--background)] border border-[var(--border)] rounded-lg text-xs font-semibold text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] transition-all cursor-pointer">
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-[var(--text)]">
          <thead>
            <tr class="bg-[var(--background)] text-[var(--muted)] font-bold uppercase tracking-wider text-[10px] border-b border-[var(--border)]">
              <th class="py-3 px-6">Category</th>
              <th class="py-3 px-5">Description</th>
              <th class="py-3 px-5">Fleet Count</th>
              <th class="py-3 px-5">Associated Brands</th>
              <th class="py-3 px-5">Created Date</th>
              <th class="py-3 px-5">Status</th>
              <th class="py-3 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--border)]">
            
            <!-- Loading -->
            <tr v-if="loading" v-for="n in 3" :key="n" class="animate-pulse">
              <td colspan="7" class="py-4 px-6 text-center text-[var(--muted)]">Loading categories...</td>
            </tr>

            <!-- Error -->
            <tr v-else-if="error" class="text-[var(--danger)]">
              <td colspan="7" class="py-8 px-6 text-center">
                <p class="font-medium mb-2">{{ error }}</p>
                <button @click="fetchCategories" class="text-xs text-[var(--accent)] underline font-semibold">Try Again</button>
              </td>
            </tr>

            <!-- Empty -->
            <tr v-else-if="paginatedCategories.length === 0">
              <td colspan="7" class="py-8 px-6 text-center text-[var(--muted)]">No categories found matching criteria.</td>
            </tr>

            <!-- Rows -->
            <tr v-else v-for="cat in paginatedCategories" :key="cat.id" class="hover:bg-[var(--background)]/50 transition-colors">
              <td class="py-3.5 px-6">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] shrink-0">
                    <i :class="getCategoryIcon(cat.name)"></i>
                  </div>
                  <span class="font-bold text-[var(--primary)] text-xs">{{ cat.name }}</span>
                </div>
              </td>
              <td class="py-3.5 px-5 text-[var(--muted)] max-w-xs truncate">{{ cat.description || 'N/A' }}</td>
              <td class="py-3.5 px-5 font-bold text-[var(--primary)]">{{ getFleetCount(cat) }}</td>
              <td class="py-3.5 px-5 text-[var(--secondary)] font-medium">{{ getAssociatedBrands(cat) }}</td>
              <td class="py-3.5 px-5 text-[var(--muted)]">{{ formatDate(cat.created_at || cat.createdAt) }}</td>
              <td class="py-3.5 px-5">
                <span :class="getStatusBadgeClass(cat.status)">
                  <span class="w-1.5 h-1.5 rounded-full" :class="getStatusDotClass(cat.status)"></span>
                  {{ getStatusText(cat.status) }}
                </span>
              </td>
              <td class="py-3.5 px-6 text-right">
                <div class="flex items-center justify-end gap-1">
                  <!-- View -->
                  <button @click="navigateToDetail(cat.id)" class="p-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--accent)] hover:bg-[var(--background)] transition-all cursor-pointer" title="View Details">
                    <i class="fa-regular fa-eye text-xs"></i>
                  </button>

                  <!-- Edit -->
                  <button @click="navigateToEdit(cat.id)" class="p-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--warning)] hover:bg-[var(--background)] transition-all cursor-pointer" title="Edit Category">
                    <i class="fa-regular fa-pen-to-square text-xs"></i>
                  </button>

                  <!-- Delete -->
                  <button @click="handleDelete(cat)" :disabled="deletingId === cat.id" class="p-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--danger)] hover:bg-[var(--background)] transition-all cursor-pointer disabled:opacity-50" title="Delete Category">
                    <i v-if="deletingId === cat.id" class="fa-solid fa-circle-notch fa-spin text-xs text-[var(--danger)]"></i>
                    <i v-else class="fa-regular fa-trash-can text-xs"></i>
                  </button>
                </div>
              </td>
            </tr>

          </tbody>
        </table>
      </div>

      <!-- Pagination Footer (10 items per page) -->
      <div v-if="!loading && filteredCategories.length > 0" class="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-[var(--border)] text-xs text-[var(--muted)] gap-3">
        <div>
          Showing 
          <span class="font-bold text-[var(--primary)]">{{ startItemIndex }}–{{ endItemIndex }}</span> 
          of 
          <span class="font-bold text-[var(--primary)]">{{ filteredCategories.length }}</span> 
          categories
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
            class="w-7 h-7 rounded-md border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:bg-[var(--background)] hover:text-[var(--text)] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
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