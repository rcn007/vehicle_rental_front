<template>
  <main class="p-6 md:p-8 min-h-[calc(100vh-64px)] bg-[var(--background)] text-[var(--text)]">
    
    <!-- Page Header & Main Actions -->
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-[var(--text)]">Users</h1>
        <p class="text-xl text-[var(--muted)] mt-1">Manage administrators, operational staff, and registered customers</p>
      </div>
      
      <div class="flex items-center gap-3 shrink-0">
        <button 
          @click="navigateToAdd" 
          class="inline-flex items-center justify-center gap-2 h-12 px-4 rounded-[11px] text-xs font-semibold text-[var(--background)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-all shadow-[var(--shadow-sm)] cursor-pointer active:scale-95"
        >
          <i class="fa-solid fa-plus text-[10px]"></i>
          <span>Add User</span>
        </button>
      </div>
    </div>

    <!-- 5 KPI Summary Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      
      <!-- KPI 1: Total Users -->
      <div class="p-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-[var(--shadow-sm)] hover:border-[var(--muted)] transition-all flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <span class="text-[var(--text)] text-[15px] font-bold uppercase tracking-wider">Total Users</span>
          <div class="w-7 h-7 rounded-lg bg-[var(--background)] text-[var(--accent)] flex items-center justify-center text-xs border border-[var(--border)]">
            <i class="fa-solid fa-users"></i>
          </div>
        </div>
        <div class="mt-3">
          <div class="text-2xl font-extrabold text-[var(--text)]">{{ stats.total }}</div>
          <p class="text-[10px] text-[var(--muted)] mt-0.5 font-medium">All user types</p>
        </div>
      </div>

      <!-- KPI 2: Active Users -->
      <div class="p-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-[var(--shadow-sm)] hover:border-[var(--muted)] transition-all flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <span class="text-[var(--text)] text-[15px] font-bold uppercase tracking-wider">Active</span>
          <div class="w-7 h-7 rounded-lg bg-[var(--background)] text-[var(--accent)] flex items-center justify-center text-xs border border-[var(--border)]">
            <i class="fa-solid fa-circle-check"></i>
          </div>
        </div>
        <div class="mt-3">
          <div class="text-2xl font-extrabold text-[var(--text)]">{{ stats.active }}</div>
          <p class="text-[10px] text-[var(--accent)] font-bold mt-0.5">{{ stats.activeRate }}% active rate</p>
        </div>
      </div>

      <!-- KPI 3: Customers -->
      <div class="p-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-[var(--shadow-sm)] hover:border-[var(--muted)] transition-all flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <span class="text-[var(--text)] text-[15px] font-bold uppercase tracking-wider">Customers</span>
          <div class="w-7 h-7 rounded-lg bg-[var(--background)] text-[var(--accent)] flex items-center justify-center text-xs border border-[var(--border)]">
            <i class="fa-solid fa-user-tag"></i>
          </div>
        </div>
        <div class="mt-3">
          <div class="text-2xl font-extrabold text-[var(--text)]">{{ stats.customers }}</div>
          <p class="text-[10px] text-[var(--muted)] mt-0.5 font-medium">End consumers</p>
        </div>
      </div>

      <!-- KPI 4: Administrators -->
      <div class="p-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-[var(--shadow-sm)] hover:border-[var(--muted)] transition-all flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <span class="text-[var(--text)] text-[15px] font-bold uppercase tracking-wider">Admins</span>
          <div class="w-7 h-7 rounded-lg bg-[var(--background)] text-[var(--accent)] flex items-center justify-center text-xs border border-[var(--border)]">
            <i class="fa-solid fa-shield-halved"></i>
          </div>
        </div>
        <div class="mt-3">
          <div class="text-2xl font-extrabold text-[var(--text)]">{{ stats.admins }}</div>
          <p class="text-[10px] text-[var(--muted)] mt-0.5 font-medium">System access</p>
        </div>
      </div>

      <!-- KPI 5: Inactive Users -->
      <div class="p-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-[var(--shadow-sm)] hover:border-[var(--muted)] transition-all flex flex-col justify-between sm:col-span-2 lg:col-span-1">
        <div class="flex items-center justify-between">
          <span class="text-[var(--text)] text-[15px] font-bold uppercase tracking-wider">Inactive</span>
          <div class="w-7 h-7 rounded-lg bg-[var(--background)] text-[var(--danger)] flex items-center justify-center text-xs border border-[var(--border)]">
            <i class="fa-solid fa-user-xmark"></i>
          </div>
        </div>
        <div class="mt-3">
          <div class="text-2xl font-extrabold text-[var(--text)]">{{ stats.inactive }}</div>
          <p class="text-[10px] text-[var(--danger)] font-bold mt-0.5">Suspended or inactive</p>
        </div>
      </div>

    </div>

    <!-- Users Table Container -->
    <div class="bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-[var(--shadow-md)] overflow-hidden mb-6">
      
      <!-- Table Search & Filters Control Bar -->
      <div class="p-4 px-6 border-b border-[var(--border)] bg-[var(--surface)] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        <!-- Search Input -->
        <div class="relative flex-1 max-w-md">
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Search by user name, email, or phone..." 
            class="w-full h-9 pl-9 pr-4 bg-[var(--background)] border border-[var(--border)] rounded-lg text-xs font-medium text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:bg-[var(--background)] focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] transition-all shadow-[var(--shadow-sm)]"
          />
        </div>

        <!-- Filter Selects -->
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2">
            <label class="text-[11px] font-bold text-[var(--muted)] uppercase tracking-wider">Role:</label>
            <select v-model="selectedRole" class="h-9 px-3 bg-[var(--background)] border border-[var(--border)] rounded-lg text-xs font-semibold text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] transition-all cursor-pointer">
              <option value="All">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="STAFF">Staff</option>
              <option value="CUSTOMER">Customer</option>
            </select>
          </div>

          <div class="flex items-center gap-2">
            <label class="text-[11px] font-bold text-[var(--muted)] uppercase tracking-wider">Status:</label>
            <select v-model="selectedStatus" class="h-9 px-3 bg-[var(--background)] border border-[var(--border)] rounded-lg text-xs font-semibold text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] transition-all cursor-pointer">
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

      </div>

      <!-- Data Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-[var(--text)]">
          <thead>
            <tr class="bg-[var(--background)] text-[var(--muted)] font-bold uppercase tracking-wider text-[10px] border-b border-[var(--border)]">
              <th class="py-3 px-6">User</th>
              <th class="py-3 px-5">Phone</th>
              <th class="py-3 px-5">Gender</th>
              <th class="py-3 px-5">Role</th>
              <th class="py-3 px-5">Status</th>
              <th class="py-3 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--border)]">
            
            <!-- Loading -->
            <tr v-if="loading" v-for="n in 3" :key="n" class="animate-pulse">
              <td colspan="6" class="py-4 px-6 text-center text-[var(--muted)]">Loading user accounts...</td>
            </tr>

            <!-- Error -->
            <tr v-else-if="error" class="text-[var(--danger)]">
              <td colspan="6" class="py-8 px-6 text-center">
                <p class="font-medium mb-2">{{ error }}</p>
                <button @click="fetchUsers" class="text-xs text-[var(--accent)] underline font-semibold cursor-pointer">Try Again</button>
              </td>
            </tr>

            <!-- Empty -->
            <tr v-else-if="paginatedUsers.length === 0">
              <td colspan="6" class="py-8 px-6 text-center text-[var(--muted)]">No users found matching criteria.</td>
            </tr>

            <!-- User Row -->
            <tr v-else v-for="user in paginatedUsers" :key="user.id" class="hover:bg-[var(--background)]/50 transition-colors">
              <td class="py-3.5 px-6">
                <div class="flex items-center gap-3">
                  <!-- Avatar Image / Initials -->
                  <img 
                    v-if="getUserAvatar(user)" 
                    :src="getUserAvatar(user)" 
                    :alt="getUserName(user)" 
                    @error="handleImageError"
                    class="w-8 h-8 rounded-full object-cover ring-1 ring-[var(--border)] shrink-0"
                  />
                  <div v-else class="w-8 h-8 rounded-full bg-[var(--background)] text-[var(--text)] border border-[var(--border)] flex items-center justify-center font-bold text-[10px] shrink-0">
                    {{ getUserInitials(user) }}
                  </div>

                  <div>
                    <div class="font-bold text-[var(--text)] text-xs">{{ getUserName(user) }}</div>
                    <div class="text-[11px] text-[var(--muted)] font-medium">{{ user.email || 'N/A' }}</div>
                  </div>
                </div>
              </td>
              <td class="py-3.5 px-5 text-[var(--muted)] font-medium">{{ user.phone || user.phoneNumber || 'N/A' }}</td>
              <td class="py-3.5 px-5 text-[var(--muted)] capitalize">{{ user.gender || 'N/A' }}</td>
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
              <td class="py-3.5 px-6 text-right">
                <div class="flex items-center justify-end gap-1">
                  <!-- View -->
                  <button @click="navigateToDetail(user.id)" class="p-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--accent)] hover:bg-[var(--background)] transition-all cursor-pointer" title="View Profile">
                    <i class="fa-regular fa-eye text-xs"></i>
                  </button>

                  <!-- Edit -->
                  <button @click="navigateToEdit(user.id)" class="p-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--warning)] hover:bg-[var(--background)] transition-all cursor-pointer" title="Edit User">
                    <i class="fa-regular fa-pen-to-square text-xs"></i>
                  </button>

                  <!-- Delete -->
                  <button @click="handleDelete(user)" :disabled="deletingId === user.id" class="p-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--danger)] hover:bg-[var(--background)] transition-all cursor-pointer disabled:opacity-50" title="Delete User">
                    <i v-if="deletingId === user.id" class="fa-solid fa-circle-notch fa-spin text-xs text-[var(--danger)]"></i>
                    <i v-else class="fa-regular fa-trash-can text-xs"></i>
                  </button>
                </div>
              </td>
            </tr>

          </tbody>
        </table>
      </div>

      <!-- Pagination Footer (10 per page) -->
      <div v-if="!loading && filteredUsers.length > 0" class="flex flex-col sm:flex-row items-center justify-between p-4 px-6 border-t border-[var(--border)] text-xs text-[var(--muted)] gap-3">
        <div>
          Showing 
          <span class="font-bold text-[var(--text)]">{{ startItemIndex }}–{{ endItemIndex }}</span> 
          of 
          <span class="font-bold text-[var(--text)]">{{ filteredUsers.length }}</span> 
          entries
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