<template>
  <header class="h-16 bg-gray-200 shadow-gray-400 border-b border-[#D3DAEF] flex items-center justify-between px-6 sticky top-0 z-10">
    <div class="relative w-80">
      <input 
        type="text" 
        v-model="searchQuery"
        @input="$emit('search', searchQuery)"
        placeholder="Search..." 
        class="w-full h-10 pl-10 pr-4 bg-[#F1F3FF] border border-[#D3DAEF] rounded-lg text-sm text-[#111827] placeholder:text-[#7A8190] focus:outline-none focus:border-gray-500 focus:ring-4 focus:ring-[#2563EB]/10 transition-all"
      >
    </div>

    <div class="flex items-center gap-4">
      <button 
        @click="$emit('notification-click')"
        class="w-10 h-10 rounded-lg bg-[#F1F3FF] border border-[#D3DAEF] flex items-center justify-center text-[#43474E] hover:bg-[#E1E8FD] transition-colors relative"
      >
        <i class="fa-regular fa-bell"></i>
        <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>

      <!-- Profile Section Link -->
      <router-link to="/admin/profile_user" class="flex items-center gap-3 font-medium text-sm text-[#111827] bg-white px-3 py-1.5 rounded-lg border border-[#D3DAEF] shadow-sm hover:border-gray-500 transition-colors cursor-pointer">
        <img 
          :src="userProfile?.profileImage || defaultAvatar" 
          alt="Avatar" 
          class="w-7 h-7 rounded-full object-cover"
        >
        <span>{{ userProfile?.name || 'Admin' }}</span>
      </router-link>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getUser } from '../../api/user' // path to your API file

defineEmits(['search', 'notification-click'])
const searchQuery = ref('')
const userProfile = ref(null)
const defaultAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'

onMounted(async () => {
  try {
    const data = await getUser()
    // If endpoint returns an array or object, map it accordingly
    userProfile.value = Array.isArray(data) ? data[0] : data
  } catch (error) {
    console.error('Failed to load user profile:', error)
  }
})
</script>