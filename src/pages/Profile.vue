<template>
  <div class="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
    
    <!-- Page Header & Account Status Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Account Settings</h1>
        <p class="text-sm text-slate-500 mt-1">Manage your public profile, contact details, and system preferences.</p>
      </div>

      <!-- Account Status Toggle -->
      <div v-if="!loading" class="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-200/80 shadow-xs w-fit">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-500">Account Status</span>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="form.isActive" class="sr-only peer">
          <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
          <span class="ml-2.5 text-xs font-medium" :class="form.isActive ? 'text-emerald-700 font-semibold' : 'text-slate-500'">
            {{ form.isActive ? 'Active' : 'Inactive' }}
          </span>
        </label>
      </div>
    </div>

    <!-- Alert Toast Feedback -->
    <transition name="fade">
      <div 
        v-if="toast.show" 
        :class="[
          'p-4 rounded-xl border flex items-center justify-between shadow-xs transition-all',
          toast.type === 'success' ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900' : 'bg-rose-50/80 border-rose-200 text-rose-900'
        ]"
      >
        <div class="flex items-center gap-3 text-sm font-medium">
          <i :class="toast.type === 'success' ? 'fa-solid fa-circle-check text-emerald-600 text-lg' : 'fa-solid fa-circle-exclamation text-rose-600 text-lg'"></i>
          <span>{{ toast.message }}</span>
        </div>
        <button type="button" @click="toast.show = false" class="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
          <i class="fa-solid fa-xmark text-lg"></i>
        </button>
      </div>
    </transition>

    <!-- Main Card Container -->
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      
      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-24 text-slate-400">
        <i class="fa-solid fa-circle-notch animate-spin text-4xl text-blue-600 mb-3"></i>
        <span class="text-sm font-medium">Loading profile details...</span>
      </div>

      <!-- Main Form -->
      <form v-else @submit.prevent="handleUpdate">
        
        <!-- Hero Header Card Banner -->
        <div class="relative bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-600 h-36 sm:h-44">
          <div class="absolute -bottom-12 left-6 sm:left-8 flex items-end gap-5">
            
            <!-- Hidden File Input for Avatar Selection -->
            <input 
              type="file" 
              ref="fileInputRef" 
              @change="handleFileChange" 
              accept="image/*" 
              class="hidden" 
            />

            <!-- Interactive Profile Avatar -->
            <div 
              @click="triggerFileInput"
              class="relative group shrink-0 cursor-pointer rounded-2xl"
              title="Click to select a new avatar"
            >
              <!-- Profile Image (Base64 or URL) -->
              <img
                v-if="form.profileImage"
                :src="form.profileImage"
                @error="handleImageError"
                alt="Profile Avatar"
                class="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-white shadow-md transition-transform duration-200 group-hover:scale-[1.02]"
              />

              <!-- Initial Avatar Fallback -->
              <div
                v-else
                :class="[
                  'w-24 h-24 sm:w-28 sm:h-28 rounded-2xl ring-4 ring-white shadow-md flex items-center justify-center text-white text-3xl sm:text-4xl font-bold transition-transform duration-200 group-hover:scale-[1.02]',
                  getAvatarColor(form.name)
                ]"
              >
                {{ getInitial(form.name) }}
              </div>
              
              <!-- Hover Camera Overlay -->
              <div class="absolute inset-0 bg-slate-900/50 rounded-2xl flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[1px]">
                <i class="fa-solid fa-camera text-white text-xl"></i>
                <span class="text-[10px] text-white font-semibold mt-1 uppercase tracking-wider">Change</span>
              </div>

              <!-- Action Edit Badge -->
              <button 
                type="button" 
                class="absolute -bottom-1 -right-1 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center border-2 border-white shadow-xs group-hover:bg-blue-700 transition-colors"
              >
                <i class="fa-solid fa-pen text-[10px]"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- User Quick Info Header Bar -->
        <div class="pt-14 px-6 sm:px-8 pb-6 bg-slate-50/60 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 class="text-xl font-bold text-slate-900 leading-snug">{{ form.name || 'Unnamed User' }}</h2>
            <p class="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
              <i class="fa-regular fa-envelope text-slate-400"></i>
              {{ form.email || 'No email provided' }}
            </p>
          </div>

          <div class="flex items-center gap-3">
            <span class="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold rounded-lg uppercase tracking-wider">
              {{ form.role || 'ROLE_USER' }}
            </span>
            <span v-if="form.createAt" class="text-xs text-slate-400">
              Joined {{ formatDate(form.createAt) }}
            </span>
          </div>
        </div>

        <!-- Form Body Sections -->
        <div class="p-6 sm:p-8 space-y-8">
          
          <!-- Section 1: Personal Details -->
          <div class="space-y-4">
            <div class="border-b border-slate-100 pb-3">
              <h3 class="text-base font-semibold text-slate-900 flex items-center gap-2">
                <i class="fa-solid fa-user-gear text-blue-600"></i> Personal Details
              </h3>
              <p class="text-xs text-slate-500 mt-0.5">Manage your identity and primary contact details.</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              <!-- Full Name -->
              <div class="space-y-1.5">
                <label class="block text-xs font-semibold uppercase tracking-wider text-slate-600">Full Name</label>
                <div class="relative">
                  <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                   
                  </span>
                  <input 
                    v-model="form.name" 
                    type="text" 
                    required 
                    placeholder="John Doe"
                    class="w-full h-11 pl-10 pr-4 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all outline-none"
                  />
                </div>
              </div>

              <!-- Email Address -->
              <div class="space-y-1.5">
                <label class="block text-xs font-semibold uppercase tracking-wider text-slate-600">Email Address</label>
                <div class="relative">
                  <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    
                  </span>
                  <input 
                    v-model="form.email" 
                    type="email" 
                    required 
                    placeholder="john@example.com"
                    class="w-full h-11 pl-10 pr-4 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all outline-none"
                  />
                </div>
              </div>

              <!-- Gender -->
              <div class="space-y-1.5">
                <label class="block text-xs font-semibold uppercase tracking-wider text-slate-600">Gender</label>
                <div class="relative">
                  <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                   
                  </span>
                  <select 
                    v-model="form.gender" 
                    class="w-full h-11 pl-10 pr-10 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all outline-none appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                  <i class="fa-solid fa-chevron-down absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
                </div>
              </div>

              <!-- Phone Number -->
              <div class="space-y-1.5">
                <label class="block text-xs font-semibold uppercase tracking-wider text-slate-600">Phone Number</label>
                <div class="relative">
                  <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                   
                  </span>
                  <input 
                    v-model="form.tell" 
                    type="tel" 
                    placeholder="+855 12 345 678"
                    class="w-full h-11 pl-10 pr-4 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all outline-none"
                  />
                </div>
              </div>

            </div>
          </div>

          <!-- Section 2: Integrations -->
          <div class="space-y-4">
            <div class="border-b border-slate-100 pb-3">
              <h3 class="text-base font-semibold text-slate-900 flex items-center gap-2">
                <i class="fa-brands fa-telegram text-sky-500"></i> Connected Services
              </h3>
              <p class="text-xs text-slate-500 mt-0.5">Link third-party tools for system events and alerts.</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              <!-- Telegram Chat ID -->
              <div class="space-y-1.5">
                <label class="block text-xs font-semibold uppercase tracking-wider text-slate-600">Telegram Chat ID</label>
                <div class="relative">
                  <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                   
                  </span>
                  <input 
                    v-model="form.telegramChatId" 
                    type="text" 
                    placeholder="e.g. 123456789"
                    class="w-full h-11 pl-10 pr-4 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all outline-none"
                  />
                </div>
                <p class="text-[11px] text-slate-400 mt-1">Receive automated updates and security notifications via Telegram.</p>
              </div>

            </div>
          </div>

        </div>

        <!-- Sticky Form Action Footer -->
        <div class="px-6 sm:px-8 py-4 bg-slate-50/80 border-t border-slate-200/80 flex items-center justify-end gap-3">
          <button 
            type="button" 
            @click="resetForm" 
            :disabled="saving"
            class="px-5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 active:bg-slate-100 transition-colors disabled:opacity-50 cursor-pointer"
          >
            Reset
          </button>
          
          <button 
            type="submit" 
            :disabled="saving"
            class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
          >
            <i v-if="saving" class="fa-solid fa-spinner animate-spin"></i>
            <i v-else class="fa-solid fa-floppy-disk"></i>
            <span>{{ saving ? 'Saving Profile...' : 'Save Profile Changes' }}</span>
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {  updateUser, getLoggedInAdminProfile } from '../api/user'

const loading = ref(true)
const saving = ref(false)
const userId = ref(null)

const fileInputRef = ref(null)

const toast = ref({
  show: false,
  message: '',
  type: 'success'
})

const form = ref({
  name: '',
  email: '',
  role: 'ADMIN',
  gender: '',
  tell: '',
  profileImage: '',
  telegramChatId: '',
  isActive: false,
  createAt: null
})

const triggerFileInput = () => {
  fileInputRef.value?.click()
}

// Convert image file directly to Base64 String
const handleFileChange = (event) => {
  const file = event.target.files[0]

  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      showToast('Image size should be less than 2MB', 'error')
      return
    }

    const reader = new FileReader()

    reader.onload = (e) => {
      form.value.profileImage = e.target.result
    }

    reader.readAsDataURL(file)
  }
}

const showToast = (message, type = 'success') => {
  toast.value = {
    show: true,
    message,
    type
  }

  setTimeout(() => {
    toast.value.show = false
  }, 4000)
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''

  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}


// =========================================================
// FETCH LOGGED-IN ADMIN
// =========================================================
const fetchUserProfile = async () => {
  loading.value = true

  try {
    const userData = await getLoggedInAdminProfile()

    console.log('Logged-in Admin Profile:', userData)

    if (!userData) {
      showToast('Admin profile not found.', 'error')
      return
    }

    userId.value = userData.id

    form.value = {
      name: userData.name || '',
      email: userData.email || '',
      role: userData.role || 'ADMIN',
      gender: userData.gender || '',
      tell: userData.tell || '',
      profileImage: userData.profileImage || '',
      telegramChatId: userData.telegramChatId || '',
      isActive: userData.isActive ?? true,
      createAt: userData.createAt || null
    }

  } catch (error) {
    console.error('Failed to fetch admin profile:', error)

    showToast(
      error?.response?.data?.message ||
      error?.message ||
      'Failed to load user profile.',
      'error'
    )
  } finally {
    loading.value = false
  }
}


// =========================================================
// RESET
// =========================================================
const resetForm = () => {
  fetchUserProfile()
}


// =========================================================
// UPDATE PROFILE
// =========================================================
const handleUpdate = async () => {
  if (!userId.value) {
    showToast('User ID not found.', 'error')
    return
  }

  saving.value = true

  try {
    const payload = {
      name: form.value.name,
      email: form.value.email,
      gender: form.value.gender,
      tell: form.value.tell,
      profileImage: form.value.profileImage,
      telegramChatId: form.value.telegramChatId
    }

    console.log('Updating user:', userId.value)
    console.log('Update payload:', payload)

    await updateUser(userId.value, payload)

    showToast('Profile updated successfully!', 'success')

  } catch (error) {
    console.error('Failed to update profile:', error)

    showToast(
      error?.response?.data?.message || 'Failed to save profile changes.',
      'error'
    )
  } finally {
    saving.value = false
  }
}


// =========================================================
// AVATAR
// =========================================================
function getInitial(name) {
  if (!name) return 'A'

  return name.trim().charAt(0).toUpperCase()
}

function getAvatarColor(name) {
  const colors = [
    'bg-gradient-to-tr from-blue-600 to-indigo-500',
    'bg-gradient-to-tr from-purple-600 to-pink-500',
    'bg-gradient-to-tr from-emerald-600 to-teal-500',
    'bg-gradient-to-tr from-amber-600 to-orange-500',
    'bg-gradient-to-tr from-rose-600 to-pink-600'
  ]

  if (!name) return 'bg-slate-500'

  let hash = 0

  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }

  return colors[Math.abs(hash) % colors.length]
}

function handleImageError() {
  form.value.profileImage = ''
}


// =========================================================
// PAGE LOAD
// =========================================================
onMounted(() => {
  fetchUserProfile()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>