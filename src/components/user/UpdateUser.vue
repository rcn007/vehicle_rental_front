<template>
  <main class="p-6 md:p-8 min-h-[calc(100vh-64px)] bg-gray-50/50">
    
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
      <div>
        <div class="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <button @click="handleBack" class="hover:text-gray-900 flex items-center gap-1 transition-colors cursor-pointer">
            <i class="fa-solid fa-arrow-left text-[10px]"></i>
            <span>Back to Users</span>
          </button>
          <span>/</span>
          <span class="text-gray-900 font-semibold">Edit #{{ activeId }}</span>
        </div>
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Update User Profile</h1>
        <p class="text-gray-500 text-sm mt-1">Modify user information and role access</p>
      </div>

      <div class="flex items-center gap-3">
        <button type="button" @click="handleBack" class="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-all shadow-xs cursor-pointer active:scale-95">
          <span>Cancel</span>
        </button>
        <button type="button" @click="handleSave" :disabled="submitting || loading" class="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-all shadow-xs cursor-pointer active:scale-95">
          <i v-if="submitting" class="fa-solid fa-circle-notch fa-spin text-xs"></i>
          <i v-else class="fa-solid fa-floppy-disk text-xs"></i>
          <span>{{ submitting ? 'Saving...' : 'Save Changes' }}</span>
        </button>
      </div>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="loading" class="max-w-5xl bg-white border border-gray-200/80 rounded-xl p-8 shadow-xs animate-pulse space-y-6">
      <div class="h-6 bg-gray-200 rounded w-1/4"></div>
      <div class="h-10 bg-gray-200 rounded"></div>
      <div class="h-24 bg-gray-200 rounded"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="fetchError" class="max-w-5xl p-8 bg-white border border-gray-200/80 rounded-xl text-center">
      <i class="fa-solid fa-triangle-exclamation text-rose-500 text-2xl mb-2"></i>
      <p class="text-gray-900 font-semibold mb-1">Failed to load user profile</p>
      <p class="text-gray-500 text-xs mb-4">{{ fetchError }}</p>
      <button @click="fetchUserDetails" class="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 cursor-pointer">Retry</button>
    </div>

    <!-- Form -->
    <form v-else @submit.prevent="handleSave" class="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl">
      
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs space-y-5">
          <h2 class="text-base font-bold text-gray-900 border-b border-gray-100 pb-4 flex items-center gap-2">
            <i class="fa-solid fa-user-pen text-blue-600 text-sm"></i>
            <span>Account Details</span>
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Full Name <span class="text-rose-500">*</span></label>
              <input type="text" v-model="form.name" required class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600">
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Email Address <span class="text-rose-500">*</span></label>
              <input type="email" v-model="form.email" required class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Phone Number</label>
              <input type="text" v-model="form.phone" class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600">
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Gender</label>
              <select v-model="form.gender" class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-900 focus:outline-none">
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
               
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Photo & Settings -->
      <div class="space-y-6">
        <div class="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs space-y-5">
          <h2 class="text-base font-bold text-gray-900 border-b border-gray-100 pb-4">Profile Photo</h2>

          <div class="flex flex-col items-center justify-center p-4 bg-gray-50 border border-dashed border-gray-300 rounded-xl">
            <div class="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mb-3 flex items-center justify-center">
              <img v-if="imagePreview" :src="imagePreview" class="w-full h-full object-cover" />
              <i v-else class="fa-solid fa-user text-gray-400 text-3xl"></i>
            </div>
            
            <label class="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 shadow-xs hover:bg-gray-50 cursor-pointer">
              <span>Change Photo</span>
              <input type="file" @change="handleFileSelect" accept="image/*" class="hidden">
            </label>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Role</label>
            <select v-model="form.role" class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-900 focus:outline-none">
              <option value="CUSTOMER">Customer</option>
              <option value="STAFF">Staff</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Status</label>
            <select v-model="form.status" class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-900 focus:outline-none">
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          <button type="submit" :disabled="submitting" class="w-full h-10 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-xs cursor-pointer disabled:opacity-50">
            Save Updates
          </button>
        </div>
      </div>

    </form>

  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getUserById, updateUser } from '../../api/user'

const props = defineProps({ id: { type: [String, Number], default: null } })
const route = useRoute()
const router = useRouter()

const activeId = computed(() => props.id || route.params.id)

const loading = ref(true)
const submitting = ref(false)
const fetchError = ref(null)

const selectedFile = ref(null)
const imagePreview = ref(null)

const form = ref({
  name: '',
  email: '',
  phone: '',
  gender: 'MALE',
  role: 'CUSTOMER',
  status: 'ACTIVE'
})

const handleBack = () => router.push('/admin/users')

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

const unwrapResponseData = (res) => {
  if (!res) return {}
  if (res.data) return res.data
  return res
}

const fetchUserDetails = async () => {
  if (!activeId.value) return
  try {
    loading.value = true
    fetchError.value = null
    const res = await getUserById(activeId.value)
    const data = unwrapResponseData(res)

    form.value = {
      name: data.name || `${data.firstName || ''} ${data.lastName || ''}`.trim() || '',
      email: data.email || '',
      phone: data.phone || data.phoneNumber || '',
      gender: data.gender || 'MALE',
      role: String(data.role || 'CUSTOMER').toUpperCase(),
      status: String(data.status || 'ACTIVE').toUpperCase()
    }

    imagePreview.value = data.avatar || data.avatarUrl || data.image || null
  } catch (err) {
    console.error('Failed to load user:', err)
    fetchError.value = err.response?.data?.message || err.response?.data?.msg || 'Failed to retrieve user profile.'
  } finally {
    loading.value = false
  }
}

const handleSave = async () => {
  try {
    submitting.value = true
    await updateUser(activeId.value, form.value, selectedFile.value)
    router.push('/admin/users')
  } catch (err) {
    console.error('Failed to update user:', err)
    alert(err.response?.data?.message || err.response?.data?.msg || 'Failed to update user.')
  } finally {
    submitting.value = false
  }
}

onMounted(fetchUserDetails)
</script>