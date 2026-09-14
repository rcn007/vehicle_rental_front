<template>
  <header
    class="h-16
    bg-gray-200 dark:bg-[#0F172A]
    shadow-gray-400 dark:shadow-slate-900
    border-b border-[#D3DAEF] dark:border-slate-700
    flex items-center justify-between
    px-6
    sticky top-0 z-10
    transition-colors duration-300"
  >

    <!-- Search -->
    <div class="relative w-80">
      <input
        type="text"
        v-model="searchQuery"
        @input="$emit('search', searchQuery)"
        placeholder="Search..."
        class="w-full h-10
        pl-10 pr-4
        bg-[#F1F3FF] dark:bg-[#1E293B]
        border border-[#D3DAEF] dark:border-slate-600
        rounded-lg
        text-sm
        text-[#111827] dark:text-white
        placeholder:text-[#7A8190] dark:placeholder:text-slate-400
        focus:outline-none
        focus:border-gray-500
        focus:ring-4
        focus:ring-[#2563EB]/10
        transition-all"
      >
    </div>


    <!-- Right Side -->
    <div class="flex items-center gap-4">

      <!-- Dark / Light Mode Toggle -->
      <button
        type="button"
        @click="toggleTheme"
        :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        class="w-10 h-10
        rounded-lg
        bg-[#F1F3FF] dark:bg-[#1E293B]
        border border-[#D3DAEF] dark:border-slate-600
        flex items-center justify-center
        text-[#43474E] dark:text-yellow-300
        hover:bg-[#E1E8FD] dark:hover:bg-slate-700
        transition-all duration-200"
      >
        <!-- Dark Mode: show sun -->
        <i
          v-if="isDark"
          class="fa-solid fa-sun"
        ></i>

        <!-- Light Mode: show moon -->
        <i
          v-else
          class="fa-solid fa-moon"
        ></i>
      </button>


      <!-- Notification -->
      <button
        @click="$emit('notification-click')"
        class="w-10 h-10
        rounded-lg
        bg-[#F1F3FF] dark:bg-[#1E293B]
        border border-[#D3DAEF] dark:border-slate-600
        flex items-center justify-center
        text-[#43474E] dark:text-slate-300
        hover:bg-[#E1E8FD] dark:hover:bg-slate-700
        transition-colors
        relative"
      >
        <i class="fa-regular fa-bell"></i>

        <span
          class="absolute
          top-2 right-2
          w-2 h-2
          bg-red-500
          rounded-full"
        ></span>
      </button>


      <!-- Profile Section Link -->
      <router-link
        to="/admin/profile_user"
        class="flex items-center gap-3
        font-medium text-sm
        text-[#111827] dark:text-white
        bg-white dark:bg-[#1E293B]
        px-3 py-1.5
        rounded-lg
        border border-[#D3DAEF] dark:border-slate-600
        shadow-sm
        hover:border-gray-500 dark:hover:border-slate-500
        transition-colors
        cursor-pointer"
      >

        <img
          :src="userProfile?.profileImage || defaultAvatar"
          alt="Avatar"
          class="w-7 h-7 rounded-full object-cover"
        >

        <span>
          {{ userProfile?.name || 'Admin' }}
        </span>

      </router-link>

    </div>
  </header>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { getUser } from '../../api/user'
import { useTheme } from '../../composables/useTheme'

defineEmits(['search', 'notification-click'])

const searchQuery = ref('')
const userProfile = ref(null)

const defaultAvatar =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'


// Dark / Light Mode
const {
  isDark,
  initTheme,
  toggleTheme
} = useTheme()


onMounted(async () => {

  // Load saved theme
  initTheme()

  // Load user profile
  try {
    const data = await getUser()

    // If endpoint returns an array or object
    userProfile.value = Array.isArray(data)
      ? data[0]
      : data

  } catch (error) {
    console.error('Failed to load user profile:', error)
  }
})
</script>