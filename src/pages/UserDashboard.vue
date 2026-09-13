<template>
  <main class="p-6 md:p-8 min-h-[calc(100vh-64px)] bg-gray-50/50">
    
    <!-- Page Header & Main Actions -->
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Users</h1>
        <p class="text-xl text-gray-900 mt-1">Manage administrators, operational staff, and registered customers</p>
      </div>
      
      <div class="flex items-center gap-3 shrink-0">
       
        <button 
          @click="navigateToAdd" 
          class="inline-flex items-center justify-center gap-2 h-12 px-4 rounded-[11px] text-xs font-semibold text-white bg-gray-900 hover:bg-gray-800 transition-all shadow-xs cursor-pointer active:scale-95"
        >
          <i class="fa-solid fa-plus text-[10px]"></i>
          <span>Add User</span>
        </button>
      </div>
    </div>

    <!-- 5 KPI Summary Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      
      <!-- KPI 1: Total Users -->
      <div class="p-4 bg-white border border-gray-200/80 rounded-xl shadow-xs hover:border-gray-300 transition-all flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <span class="text-[#0f172a] text-[15px] font-bold uppercase tracking-wider"
            style="font-family: var(--font-heading);">Total Users</span>
          <div class="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs">
            <i class="fa-solid fa-users"></i>
          </div>
        </div>
        <div class="mt-3">
          <div class="text-2xl font-extrabold text-gray-900">{{ stats.total }}</div>
          <p class="text-[10px] text-gray-400 mt-0.5 font-medium">All user types</p>
        </div>
      </div>

      <!-- KPI 2: Active Users -->
      <div class="p-4 bg-white border border-gray-200/80 rounded-xl shadow-xs hover:border-gray-300 transition-all flex flex-col justify-between">
        <div class="flex items-center justify-between">
           <span class="text-[#0f172a] text-[15px] font-bold uppercase tracking-wider"
            style="font-family: var(--font-heading);">Active</span>
          <div class="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
            <i class="fa-solid fa-circle-check"></i>
          </div>
        </div>
        <div class="mt-3">
          <div class="text-2xl font-extrabold text-gray-900">{{ stats.active }}</div>
          <p class="text-[10px] text-emerald-600 font-bold mt-0.5">{{ stats.activeRate }}% active rate</p>
        </div>
      </div>

      <!-- KPI 3: Customers -->
      <div class="p-4 bg-white border border-gray-200/80 rounded-xl shadow-xs hover:border-gray-300 transition-all flex flex-col justify-between">
        <div class="flex items-center justify-between">
           <span class="text-[#0f172a] text-[15px] font-bold uppercase tracking-wider"
            style="font-family: var(--font-heading);">Customers</span>
          <div class="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs">
            <i class="fa-solid fa-user-tag"></i>
          </div>
        </div>
        <div class="mt-3">
          <div class="text-2xl font-extrabold text-gray-900">{{ stats.customers }}</div>
          <p class="text-[10px] text-gray-400 mt-0.5 font-medium">End consumers</p>
        </div>
      </div>

      <!-- KPI 4: Administrators -->
      <div class="p-4 bg-white border border-gray-200/80 rounded-xl shadow-xs hover:border-gray-300 transition-all flex flex-col justify-between">
        <div class="flex items-center justify-between">
           <span class="text-[#0f172a] text-[15px] font-bold uppercase tracking-wider"
            style="font-family: var(--font-heading);">Admins</span>
          <div class="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-xs">
            <i class="fa-solid fa-shield-halved"></i>
          </div>
        </div>
        <div class="mt-3">
          <div class="text-2xl font-extrabold text-gray-900">{{ stats.admins }}</div>
          <p class="text-[10px] text-gray-400 mt-0.5 font-medium">System access</p>
        </div>
      </div>

      <!-- KPI 5: Inactive Users -->
      <div class="p-4 bg-white border border-gray-200/80 rounded-xl shadow-xs hover:border-gray-300 transition-all flex flex-col justify-between sm:col-span-2 lg:col-span-1">
        <div class="flex items-center justify-between">
           <span class="text-[#0f172a] text-[15px] font-bold uppercase tracking-wider"
            style="font-family: var(--font-heading);">Inactive</span>
          <div class="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center text-xs">
            <i class="fa-solid fa-user-xmark"></i>
          </div>
        </div>
        <div class="mt-3">
          <div class="text-2xl font-extrabold text-gray-900">{{ stats.inactive }}</div>
          <p class="text-[10px] text-rose-600 font-bold mt-0.5">Suspended or inactive</p>
        </div>
      </div>

    </div>

    <!-- Users Table Container -->
    <div class="bg-white border border-gray-200/80 rounded-xl shadow-xs overflow-hidden mb-6">
      
      <!-- Table Search & Filters Control Bar -->
      <div class="p-4 px-6 border-b border-gray-200/80 bg-white flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        <!-- Search Input -->
        <div class="relative flex-1 max-w-md">
             <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Search by user name, email, or phone..." 
            class="w-full h-9 pl-9 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-xs"
          >
        </div>

        <!-- Filter Selects -->
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2">
            <label class="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Role:</label>
            <select v-model="selectedRole" class="h-9 px-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer">
              <option value="All">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="STAFF">Staff</option>
              <option value="CUSTOMER">Customer</option>
            </select>
          </div>

          <div class="flex items-center gap-2">
            <label class="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status:</label>
            <select v-model="selectedStatus" class="h-9 px-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer">
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

      </div>

      <!-- Data Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-gray-700">
          <thead>
            <tr class="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider text-[10px] border-b border-gray-200">
              <th class="py-3 px-6">User</th>
              <th class="py-3 px-5">Phone</th>
              <th class="py-3 px-5">Gender</th>
              <th class="py-3 px-5">Role</th>
              <th class="py-3 px-5">Status</th>
              <th class="py-3 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            
            <!-- Loading -->
            <tr v-if="loading" v-for="n in 3" :key="n" class="animate-pulse">
              <td colspan="7" class="py-4 px-6 text-center text-gray-400">Loading user accounts...</td>
            </tr>

            <!-- Error -->
            <tr v-else-if="error" class="text-rose-600">
              <td colspan="7" class="py-8 px-6 text-center">
                <p class="font-medium mb-2">{{ error }}</p>
                <button @click="fetchUsers" class="text-xs text-blue-600 underline font-semibold cursor-pointer">Try Again</button>
              </td>
            </tr>

            <!-- Empty -->
            <tr v-else-if="paginatedUsers.length === 0">
              <td colspan="7" class="py-8 px-6 text-center text-gray-500">No users found matching criteria.</td>
            </tr>

            <!-- User Row -->
            <tr v-else v-for="user in paginatedUsers" :key="user.id" class="hover:bg-gray-50/80 transition-colors">
              <td class="py-3.5 px-6">
                <div class="flex items-center gap-3">
                  <!-- Avatar Image / Initials -->
                  <img 
                    v-if="getUserAvatar(user)" 
                    :src="getUserAvatar(user)" 
                    :alt="getUserName(user)" 
                    @error="handleImageError"
                    class="w-8 h-8 rounded-full object-cover ring-1 ring-gray-200 shrink-0"
                  >
                  <div v-else class="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                    {{ getUserInitials(user) }}
                  </div>

                  <div>
                    <div class="font-bold text-gray-900 text-xs">{{ getUserName(user) }}</div>
                    <div class="text-[11px] text-gray-400 font-medium">{{ user.email || 'N/A' }}</div>
                  </div>
                </div>
              </td>
              <td class="py-3.5 px-5 text-gray-600 font-medium">{{ user.phone || user.phoneNumber || 'N/A' }}</td>
              <td class="py-3.5 px-5 text-gray-500 capitalize">{{ user.gender || 'N/A' }}</td>
              <td class="py-3.5 px-5">
                <span :class="getRoleBadgeClass(user.role)">
                  {{ getRoleText(user.role) }}
                </span>
              </td>
              <td class="py-3.5 px-5">
                <span :class="getStatusBadgeClass(user.status)">
                  <span class="w-1.5 h-1.5 rounded-full" :class="getStatusDotClass(user.status)"></span>
                  {{ getStatusText(user.status) }}
                </span>
              </td>
              <td class="py-3.5 px-6 text-right ">
                <div class="flex items-center gap-1">
                  <!-- View -->
                  <button @click="navigateToDetail(user.id)" class="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer" title="View Profile">
                    <i class="fa-regular fa-eye text-xs"></i>
                  </button>

                  <!-- Edit -->
                  <button @click="navigateToEdit(user.id)" class="p-1.5 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-all cursor-pointer" title="Edit User">
                    <i class="fa-regular fa-pen-to-square text-xs"></i>
                  </button>

                  <!-- Delete -->
                  <button @click="handleDelete(user)" :disabled="deletingId === user.id" class="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer disabled:opacity-50" title="Delete User">
                    <i v-if="deletingId === user.id" class="fa-solid fa-circle-notch fa-spin text-xs text-rose-600"></i>
                    <i v-else class="fa-regular fa-trash-can text-xs"></i>
                  </button>
                </div>
              </td>
            </tr>

          </tbody>
        </table>
      </div>

      <!-- Pagination Footer (10 per page) -->
      <div v-if="!loading && filteredUsers.length > 0" class="flex flex-col sm:flex-row items-center justify-between p-4 px-6 border-t border-gray-100 text-xs text-gray-500 gap-3">
        <div>
          Showing 
          <span class="font-bold text-gray-900">{{ startItemIndex }}–{{ endItemIndex }}</span> 
          of 
          <span class="font-bold text-gray-900">{{ filteredUsers.length }}</span> 
          entries
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
import { getUser, deleteUser } from '../api/user'

const router = useRouter()

const users = ref([])
const loading = ref(true)
const error = ref(null)
const deletingId = ref(null)

/* Filters */
const searchQuery = ref('')
const selectedRole = ref('All')
const selectedStatus = ref('All')

/* Pagination */
const currentPage = ref(1)
const itemsPerPage = ref(10)

/* Navigation */
const navigateToAdd = () => router.push('/admin/users/post')
const navigateToDetail = (id) => router.push(`/admin/users/${id}`)
const navigateToEdit = (id) => router.push(`/admin/users/update/${id}`)

/* Unwraps API responses with ApiResponse envelope { message, status, data } or direct arrays */
const unwrapResponseData = (res) => {
  if (!res) return []
  if (Array.isArray(res)) return res
  if (res.data && Array.isArray(res.data)) return res.data
  return []
}

/* Fetch Users */
const fetchUsers = async () => {
  try {
    loading.value = true
    error.value = null
    const res = await getUser()
    users.value = unwrapResponseData(res)
  } catch (err) {
    console.error('Failed to load users:', err)
    error.value = err.response?.data?.message || err.response?.data?.msg || 'Failed to load user directory.'
  } finally {
    loading.value = false
  }
}

/* Delete User */
const handleDelete = async (user) => {
  const userName = getUserName(user)
  const isConfirmed = window.confirm(`Are you sure you want to delete user "${userName}" (#${user.id})?`)
  if (!isConfirmed) return

  try {
    deletingId.value = user.id
    await deleteUser(user.id)
    users.value = users.value.filter(u => u.id !== user.id)
  } catch (err) {
    console.error('Failed to delete user:', err)
    alert(err.response?.data?.message || err.response?.data?.msg || 'Failed to delete user.')
  } finally {
    deletingId.value = null
  }
}

/* Helper: Display Name */
const getUserName = (u) => {
  if (!u) return 'N/A'
  if (u.name) return u.name
  if (u.firstName || u.lastName) return `${u.firstName || ''} ${u.lastName || ''}`.trim()
  if (u.username) return u.username
  return 'User #' + u.id
}

/* Helper: User Avatar */
const getUserAvatar = (u) => u?.avatar || u?.avatarUrl || u?.image || u?.imageUrl || null

const handleImageError = (e) => {
  e.target.style.display = 'none'
}

/* Helper: User Initials */
const getUserInitials = (u) => {
  const name = getUserName(u)
  const parts = name.split(' ').filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return name.substring(0, 2).toUpperCase()
}

/* Helper: Role */
const getRoleText = (role) => {
  if (!role) return 'Customer'
  const r = String(role).toUpperCase()
  if (r.includes('ADMIN')) return 'Admin'
  if (r.includes('STAFF')) return 'Staff'
  return 'Customer'
}

/* Helper: Status */
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

/* Export JSON functionality */
const exportData = () => {
  const jsonStr = JSON.stringify(filteredUsers.value, null, 2)
  const blob = new Blob([jsonStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `users_export_${new Date().toISOString().slice(0,10)}.json`
  link.click()
  URL.revokeObjectURL(url)
}

/* Dynamic KPI Statistics */
const stats = computed(() => {
  const total = users.value.length
  let active = 0, customers = 0, admins = 0, inactive = 0

  users.value.forEach(u => {
    const statusText = getStatusText(u.status)
    const roleText = getRoleText(u.role)

    if (statusText === 'Active') active++
    else inactive++

    if (roleText === 'Admin') admins++
    else if (roleText === 'Customer') customers++
  })

  const activeRate = total > 0 ? Math.round((active / total) * 100) : 0

  return { total, active, activeRate, customers, admins, inactive }
})

/* Search & Filters */
const filteredUsers = computed(() => {
  return users.value.filter(u => {
    const q = searchQuery.value.toLowerCase().trim()
    const nameMatches = !q || getUserName(u).toLowerCase().includes(q)
    const emailMatches = !q || String(u.email || '').toLowerCase().includes(q)
    const phoneMatches = !q || String(u.phone || u.phoneNumber || '').toLowerCase().includes(q)

    const roleText = getRoleText(u.role).toUpperCase()
    const roleMatches = selectedRole.value === 'All' || roleText === selectedRole.value.toUpperCase()

    const statusText = getStatusText(u.status)
    const statusMatches = selectedStatus.value === 'All' || statusText.toLowerCase() === selectedStatus.value.toLowerCase()

    return (nameMatches || emailMatches || phoneMatches) && roleMatches && statusMatches
  })
})

watch([searchQuery, selectedRole, selectedStatus], () => {
  currentPage.value = 1
})

/* Pagination Calculations */
const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage.value) || 1)

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredUsers.value.slice(start, start + itemsPerPage.value)
})

const startItemIndex = computed(() => {
  if (filteredUsers.value.length === 0) return 0
  return (currentPage.value - 1) * itemsPerPage.value + 1
})

const endItemIndex = computed(() => {
  const max = currentPage.value * itemsPerPage.value
  return max > filteredUsers.value.length ? filteredUsers.value.length : max
})

/* Badges Styling */
const getRoleBadgeClass = (role) => {
  const r = getRoleText(role)
  if (r === 'Admin') return 'px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200/60'
  if (r === 'Staff') return 'px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200/60'
  return 'px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60'
}

const getStatusBadgeClass = (status) => {
  return getStatusText(status) === 'Active'
    ? 'px-2.5 py-1 text-[10px] font-bold inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 rounded-full'
    : 'px-2.5 py-1 text-[10px] font-bold inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 rounded-full'
}

const getStatusDotClass = (status) => {
  return getStatusText(status) === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'
}

onMounted(fetchUsers)
</script>