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
          <span class="text-gray-900 font-semibold">New User</span>
        </div>
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Add User Account</h1>
        <p class="text-gray-500 text-sm mt-1">Register a new system user or customer profile</p>
      </div>

      <div class="flex items-center gap-3">
        <button 
          type="button" 
          @click="handleBack" 
          class="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-all shadow-xs cursor-pointer active:scale-95"
        >
          <span>Cancel</span>
        </button>
        <button 
          type="button" 
          @click="handleSave" 
          :disabled="submitting || !form.name || !form.email" 
          class="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-all shadow-xs cursor-pointer active:scale-95"
        >
          <i v-if="submitting" class="fa-solid fa-circle-notch fa-spin text-xs"></i>
          <i v-else class="fa-solid fa-check text-xs"></i>
          <span>{{ submitting ? 'Saving...' : 'Save User' }}</span>
        </button>
      </div>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSave" class="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl">
      
      <!-- Left Column Details -->
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs space-y-5">
          <h2 class="text-base font-bold text-gray-900 border-b border-gray-100 pb-4 flex items-center gap-2">
            <i class="fa-solid fa-user text-blue-600 text-sm"></i>
            <span>Account Details</span>
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Full Name <span class="text-rose-500">*</span></label>
              <input type="text" v-model="form.name" required placeholder="John Doe" class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600">
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Email Address <span class="text-rose-500">*</span></label>
              <input type="email" v-model="form.email" required placeholder="john@example.com" class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Phone Number</label>
              <input type="text" v-model="form.phone" placeholder="+1 (555) 000-0000" class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600">
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Gender</label>
              <select v-model="form.gender" class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-900 focus:outline-none">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Password</label>
            <input type="password" v-model="form.password" placeholder="••••••••" class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600">
          </div>
        </div>
      </div>

      <!-- Right Column Settings & Photo Upload -->
      <div class="space-y-6">
        <div class="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs space-y-5">
          <h2 class="text-base font-bold text-gray-900 border-b border-gray-100 pb-4">Profile Photo</h2>

          <div class="flex flex-col items-center justify-center p-4 bg-gray-50 border border-dashed border-gray-300 rounded-xl">
            <div class="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mb-3 flex items-center justify-center relative">
              <img v-if="imagePreview" :src="imagePreview" class="w-full h-full object-cover" />
              <i v-else class="fa-solid fa-user text-gray-400 text-3xl"></i>
            </div>
            
            <label class="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 shadow-xs hover:bg-gray-50 cursor-pointer">
              <span>Choose Photo</span>
              <input type="file" @change="handleFileSelect" accept="image/*" class="hidden">
            </label>
            <p class="text-[10px] text-gray-400 mt-2">JPG, PNG, GIF up to 5MB</p>
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

          <button 
            type="submit" 
            :disabled="submitting || !form.name || !form.email" 
            class="w-full h-10 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-xs cursor-pointer disabled:opacity-50"
          >
            {{ submitting ? 'Processing...' : 'Confirm & Save' }}
          </button>
        </div>
      </div>

    </form>

  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createUser } from '../../api/user'

const router = useRouter()
const submitting = ref(false)
const selectedFile = ref(null)
const imagePreview = ref(null)

const form = ref({
  name: '',
  email: '',
  phone: '',
  gender: 'Male',
  password: '',
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

const handleSave = async () => {
  if (!form.value.name || !form.value.email) return

  try {
    submitting.value = true
    await createUser(form.value, selectedFile.value)
    router.push('/admin/users')
  } catch (err) {
    console.error('Failed to create user:', err)
    alert(err.response?.data?.message || err.response?.data?.msg || 'Failed to create user account.')
  } finally {
    submitting.value = false
  }
}
</script>