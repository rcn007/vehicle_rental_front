<template>
  <div class="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
    
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Account Settings</h1>
        <p class="text-sm text-slate-500 mt-1">Manage your public profile, contact details, and account preferences.</p>
      </div>

      <!-- Account Status Badge -->
      <div v-if="!loading" class="flex items-center gap-2.5 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm w-fit">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-500">Status</span>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="form.isActive" class="sr-only peer">
          <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
          <span class="ml-2 text-xs font-medium" :class="form.isActive ? 'text-emerald-700' : 'text-slate-500'">
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
          'p-4 rounded-xl border flex items-center justify-between shadow-sm transition-all',
          toast.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-red-50 border-red-200 text-red-900'
        ]"
      >
        <div class="flex items-center gap-3 text-sm font-medium">
          <i :class="toast.type === 'success' ? 'fa-solid fa-circle-check text-emerald-600 text-lg' : 'fa-solid fa-circle-exclamation text-red-600 text-lg'"></i>
          <span>{{ toast.message }}</span>
        </div>
        <button type="button" @click="toast.show = false" class="text-slate-400 hover:text-slate-600">
          <i class="fa-solid fa-xmark text-lg"></i>
        </button>
      </div>
    </transition>

    <!-- Main Card Container -->
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
      
      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-24 text-slate-400">
        <i class="fa-solid fa-circle-notch animate-spin text-4xl text-blue-600 mb-3"></i>
        <span class="text-sm font-medium">Loading profile details...</span>
      </div>

      <!-- Main Form -->
      <form v-else @submit.prevent="handleUpdate">
        
        <!-- Hero Header Card Banner -->
        <div class="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 h-32 sm:h-40">
          <div class="absolute -bottom-12 left-6 sm:left-8 flex items-end gap-5">
            
            <!-- Hidden File Input -->
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
              class="relative group shrink-0 cursor-pointer rounded-full"
              title="Click to update avatar"
            >
              <img 
                :src="previewImage || form.profileImage || defaultAvatar" 
                @error="(e) => e.target.src = defaultAvatar"
                alt="Profile Avatar" 
                class="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-lg transition-transform duration-200 group-hover:scale-[1.02]"
              />
              
              <!-- Hover Camera Overlay -->
              <div class="absolute inset-0 bg-slate-900/50 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <i class="fa-solid fa-camera text-white text-lg"></i>
                <span class="text-[10px] text-white font-semibold mt-0.5">Change</span>
              </div>
            </div>
          </div>
        </div>

        <!-- User Quick Info Header Bar -->
        <div class="pt-14 px-6 sm:px-8 pb-6 bg-slate-50/50 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 class="text-xl font-bold text-slate-900">{{ form.name || 'Unnamed User' }}</h2>
            <p class="text-xs text-slate-500 font-mono mt-0.5">{{ form.email || 'No email provided' }}</p>
          </div>

          <div class="flex items-center gap-2">
            <span class="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold rounded-lg uppercase tracking-wider">
              {{ form.role || 'ROLE_USER' }}
            </span>
            <span v-if="form.createAt" class="text-xs text-slate-500">
              • Joined {{ formatDate(form.createAt) }}
            </span>
          </div>
        </div>

        <!-- Form Body Sections -->
        <div class="p-6 sm:p-8 space-y-8">
          
          <!-- Section 1: Personal Details -->
          <div class="space-y-4">
            <div class="border-b border-slate-100 pb-2">
              <h3 class="text-base font-semibold text-slate-900 flex items-center gap-2">
                <i class="fa-regular fa-id-card text-blue-600"></i> Personal Information
              </h3>
              <p class="text-xs text-slate-500">Update your basic profile identifiers.</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              <!-- Full Name -->
              <div class="space-y-1.5">
                <label class="block text-xs font-semibold uppercase tracking-wider text-slate-600">Full Name</label>
                <div class="relative">
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

          <!-- Section 2: Integrations & Extras -->
          <div class="space-y-4">
            <div class="border-b border-slate-100 pb-2">
              <h3 class="text-base font-semibold text-slate-900 flex items-center gap-2">
                <i class="fa-brands fa-telegram text-blue-500"></i> Integrations 
              </h3>
              <p class="text-xs text-slate-500">Configure third-party notification channels.</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              <!-- Telegram Chat ID -->
              <div class="space-y-1.5">
                <label class="block text-xs font-semibold uppercase tracking-wider text-slate-600">Telegram Chat ID</label>
                <div class="relative">
                  <input 
                    v-model="form.telegramChatId" 
                    type="text" 
                    placeholder="e.g. 123456789"
                    class="w-full h-11 pl-10 pr-4 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all outline-none"
                  />
                </div>
                <p class="text-[11px] text-slate-400">Used for system notification alerts via Telegram bot.</p>
              </div>

             

            </div>
          </div>

        </div>

        <!-- Sticky Form Action Footer -->
        <div class="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-200/80 flex items-center justify-end gap-3">
          <button 
            type="button" 
            @click="resetForm" 
            :disabled="saving"
            class="px-5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-100 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          
          <button 
            type="submit" 
            :disabled="saving"
            class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm disabled:opacity-50"
          >
            <i v-if="saving" class="fa-solid fa-spinner animate-spin"></i>
            <i v-else class="fa-solid fa-floppy-disk"></i>
            <span>{{ saving ? 'Saving Changes...' : 'Save Profile Changes' }}</span>
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getUser, updateUser } from '../api/user'

const loading = ref(true)
const saving = ref(false)
const userId = ref(null)
const defaultAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'

// File Upload State
const fileInputRef = ref(null)
const selectedFile = ref(null)
const previewImage = ref(null)

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

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
    previewImage.value = URL.createObjectURL(file)
  }
}

const showToast = (message, type = 'success') => {
  toast.value = { show: true, message, type }
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

onMounted(async () => {
  try {
    const data = await getUser()
    const currentUser = Array.isArray(data) ? data[0] : data
    
    if (currentUser) {
      userId.value = currentUser.id
      form.value = {
        name: currentUser.name || '',
        email: currentUser.email || '',
        role: currentUser.role || 'ADMIN',
        gender: currentUser.gender || '',
        tell: currentUser.tell || '',
        profileImage: currentUser.profileImage || '',
        telegramChatId: currentUser.telegramChatId || '',
        isActive: currentUser.isActive ?? true,
        createAt: currentUser.createAt || null
      }
    }
  } catch (error) {
    console.error('Failed to fetch user:', error)
    showToast('Failed to load user profile.', 'error')
  } finally {
    loading.value = false
  }
})

const handleUpdate = async () => {
  if (!userId.value) return
  saving.value = true
  try {
    let imageUrl = form.value.profileImage

    // Example upload logic if sending file via Multipart/FormData
    if (selectedFile.value) {
      const formData = new FormData()
      formData.append('file', selectedFile.value)
      
      // If your backend accepts FormData directly in updateUser, pass formData.
      // Otherwise, upload file to your file endpoint first to get the URL string:
      // const uploadRes = await uploadFileApi(formData)
      // imageUrl = uploadRes.fileUrl
    }

    const payload = {
      name: form.value.name,
      email: form.value.email,
      gender: form.value.gender,
      tell: form.value.tell,
      profileImage: imageUrl,
      telegramChatId: form.value.telegramChatId
    }

    await updateUser(userId.value, payload)
    showToast('Profile updated successfully!', 'success')
  } catch (error) {
    console.error('Failed to update profile:', error)
    showToast('Failed to update profile details.', 'error')
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>