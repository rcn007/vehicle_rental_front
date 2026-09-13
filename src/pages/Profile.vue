<template>
  <div class="p-4 md:p-8 max-w-full mx-auto space-y-6">
    
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-[#111827]">Account Settings</h1>
        <p class="text-sm text-[#7A8190] mt-0.5">Manage your user profile details and platform information.</p>
      </div>

      <!-- Account Status Badge -->
      <div v-if="!loading" class="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-[#D3DAEF] w-fit">
        <span class="text-xs font-medium text-[#7A8190]">Account Status:</span>
        <span 
          :class="[
            'text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1.5',
            form.isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
          ]"
        >
          <span :class="['w-1.5 h-1.5 rounded-full', form.isActive ? 'bg-emerald-500' : 'bg-amber-500']"></span>
          {{ form.isActive ? 'Active' : 'Inactive' }}
        </span>
      </div>
    </div>

    <!-- Alert Toast Feedback -->
    <transition name="fade">
      <div 
        v-if="toast.show" 
        :class="[
          'p-4 rounded-xl border flex items-center justify-between shadow-sm',
          toast.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'
        ]"
      >
        <div class="flex items-center gap-3 text-sm font-medium">
          <i :class="toast.type === 'success' ? 'fa-solid fa-circle-check text-emerald-600' : 'fa-solid fa-circle-exclamation text-red-600'"></i>
          <span>{{ toast.message }}</span>
        </div>
        <button @click="toast.show = false" class="text-xs opacity-70 hover:opacity-100">
          <i class="fa-solid fa-xmark text-base"></i>
        </button>
      </div>
    </transition>

    <!-- Main Card -->
    <div class="bg-white rounded-2xl border border-[#D3DAEF] shadow-sm overflow-hidden">
      
      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-20 text-[#7A8190]">
        <i class="fa-solid fa-spinner animate-spin text-3xl text-[#2563EB] mb-3"></i>
        <span class="text-sm font-medium">Fetching profile details...</span>
      </div>

      <!-- Main Form -->
      <form v-else @submit.prevent="handleUpdate" class="divide-y divide-[#D3DAEF]">
        
        <!-- Header Banner Section with Clickable Profile Avatar -->
        <div class="p-6 md:p-8 bg-[#F1F3FF]/50 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          
          <!-- Hidden Native File Input -->
          <input 
            type="file" 
            ref="fileInputRef" 
            @change="handleFileChange" 
            accept="image/*" 
            class="hidden" 
          />

          <!-- Clickable Avatar Preview Container -->
          <div 
            @click="triggerFileInput"
            class="relative group shrink-0 cursor-pointer"
            title="Click to select new image"
          >
            <img 
              :src="previewImage || form.profileImage || defaultAvatar" 
              @error="(e) => e.target.src = defaultAvatar"
              alt="Profile Avatar" 
              class="w-24 h-24 rounded-full object-cover border-2 border-white shadow-md ring-4 ring-[#2563EB]/10 transition-transform group-hover:scale-105"
            />
            
            <!-- Hover Overlay Indicator -->
            <div class="absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <i class="fa-solid fa-camera text-white text-xl"></i>
              <span class="text-[10px] text-white font-medium mt-1">Change</span>
            </div>
          </div>

          <!-- User Quick Info -->
          <div class="flex-1 space-y-3 w-full text-center sm:text-left">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 class="text-lg font-bold text-[#111827]">{{ form.name || 'N/A' }}</h2>
                <p class="text-xs text-[#7A8190]">{{ form.email || 'N/A' }}</p>
              </div>

              <!-- Read-only Role Badge & Joined Date -->
              <div class="flex items-center gap-2 justify-center sm:justify-start text-xs text-[#7A8190]">
                <span class="px-2.5 py-1 bg-[#2563EB]/10 text-[#2563EB] font-semibold rounded-md border border-[#2563EB]/20">
                  {{ form.role || 'ROLE_USER' }}
                </span>
                <span v-if="form.createAt">• Joined {{ formatDate(form.createAt) }}</span>
              </div>
            </div>

            <!-- Upload Info Banner -->
            <div class="flex items-center justify-center sm:justify-start gap-2 text-xs text-[#7A8190]">
              <i class="fa-solid fa-circle-info text-[#2563EB]"></i>
              <span>Click on the profile picture above to choose an image file from your computer.</span>
            </div>
          </div>
        </div>

        <!-- Personal Details Section -->
        <div class="p-6 md:p-8 space-y-6">
          <h3 class="text-base font-semibold text-[#111827] flex items-center gap-2">
            <i class="fa-regular fa-user text-[#2563EB]"></i> Personal Details
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Full Name -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-[#111827]">Full Name</label>
              <div class="relative">
                  <input 
                  v-model="form.name" 
                  type="text" 
                  required 
                  placeholder="John Doe"
                  class="w-full h-10 pl-10 pr-4 bg-white border border-[#D3DAEF] rounded-lg text-sm text-[#111827] placeholder:text-[#7A8190] focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 transition-all"
                />
              </div>
            </div>

            <!-- Email Address -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-[#111827]">Email Address</label>
              <div class="relative">
                 <input 
                  v-model="form.email" 
                  type="email" 
                  required 
                  placeholder="john@example.com"
                  class="w-full h-10 pl-10 pr-4 bg-white border border-[#D3DAEF] rounded-lg text-sm text-[#111827] placeholder:text-[#7A8190] focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 transition-all"
                />
              </div>
            </div>

            <!-- Gender Enum Selection -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-[#111827]">Gender</label>
              <div class="relative">
                   <select 
                  v-model="form.gender" 
                  class="w-full h-10 pl-10 pr-4 bg-white border border-[#D3DAEF] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
                <i class="fa-solid fa-chevron-down absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7A8190] text-xs pointer-events-none"></i>
              </div>
            </div>

            <!-- Phone Number (tell) -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-[#111827]">Phone Number</label>
              <div class="relative">
                <input 
                  v-model="form.tell" 
                  type="tel" 
                  placeholder="+855 12 345 678"
                  class="w-full h-10 pl-10 pr-4 bg-white border border-[#D3DAEF] rounded-lg text-sm text-[#111827] placeholder:text-[#7A8190] focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Integration Details Section -->
       

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