<template>
  <NotificationPopup ref="notificationPopup" />
  <header
    class="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b border-[#D3DAEF] bg-gray-200 px-6 shadow-gray-400 transition-colors duration-300 dark:border-slate-700 dark:bg-[#0F172A] dark:shadow-slate-900"
  >
    <!-- Search Bar -->
    <div class="relative w-80">
      <input
        type="text"
        v-model="searchQuery"
        @input="onSearchInput"
        placeholder="Search..."
        class="h-10 w-full rounded-lg border border-[#D3DAEF] bg-[#F1F3FF] pl-10 pr-4 text-sm text-[#111827] placeholder:text-[#7A8190] focus:border-gray-500 focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10 transition-all dark:border-slate-600 dark:bg-[#1E293B] dark:text-white dark:placeholder:text-slate-400"
      />
      </div>

    <!-- Right Controls -->
    <div class="flex items-center gap-4">
      
      <!-- Theme Toggle -->
      <button
        type="button"
        @click="toggleTheme"
        :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        class="flex h-10 w-10 items-center justify-center rounded-lg border border-[#D3DAEF] bg-[#F1F3FF] text-[#43474E] hover:bg-[#E1E8FD] transition-all duration-200 dark:border-slate-600 dark:bg-[#1E293B] dark:text-yellow-300 dark:hover:bg-slate-700"
      >
        <i :class="isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"></i>
      </button>

      <!-- Notification Dropdown Container -->
      <div class="relative" ref="notificationDropdownRef">
        
        <!-- Bell Button -->
        <button
          type="button"
          @click="toggleNotifications"
          class="relative flex h-10 w-10 items-center justify-center rounded-lg border border-[#D3DAEF] bg-[#F1F3FF] text-[#43474E] hover:bg-[#E1E8FD] transition-colors dark:border-slate-600 dark:bg-[#1E293B] dark:text-slate-300 dark:hover:bg-slate-700"
        >
          <i class="fa-regular fa-bell"></i>

          <!-- Unread Badge -->
          <span
            v-if="unreadCount > 0"
            class="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-gray-200 bg-red-500 px-1 text-[10px] font-bold text-white dark:border-[#0F172A]"
          >
            {{ unreadCount > 99 ? '99+' : unreadCount }}
          </span>
        </button>

        <!-- Notification Popup -->
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 translate-y-2 scale-95"
          enter-to-class="opacity-100 translate-y-0 scale-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0 scale-100"
          leave-to-class="opacity-0 translate-y-2 scale-95"
        >
          <div
            v-if="showNotifications"
            class="absolute right-0 top-12 z-[100] w-[380px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-[#D3DAEF] bg-white shadow-2xl dark:border-slate-700 dark:bg-[#1E293B]"
          >
            <!-- Popup Header -->
            <div class="flex items-center justify-between border-b border-[#E5E7EB] px-5 py-4 dark:border-slate-700">
              <div>
                <h3 class="text-sm font-bold text-gray-900 dark:text-white">Notifications</h3>
                <p class="mt-1 text-xs text-gray-500 dark:text-slate-400">{{ unreadCount }} unread</p>
              </div>

              <button
                type="button"
                @click="showNotifications = false"
                class="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition dark:hover:bg-slate-700 dark:hover:text-white"
              >
                <i class="fa-solid fa-xmark text-sm"></i>
              </button>

              
            </div>

            <!-- List Body -->
            <div class="max-h-[420px] overflow-y-auto">
              
              <!-- Empty State -->
              <div v-if="notifications.length === 0" class="px-6 py-12 text-center">
                <div class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-slate-700">
                  <i class="fa-regular fa-bell text-lg text-gray-400 dark:text-slate-400"></i>
                </div>
                <p class="text-sm font-medium text-gray-700 dark:text-slate-300">No notifications</p>
                <p class="mt-1 text-xs text-gray-400 dark:text-slate-500">You're all caught up.</p>
              </div>

              <!-- Notification Items -->
              <div
                v-for="item in notifications"
                :key="item.id"
                @click="$emit('notification-click', item)"
                :class="[
                  'cursor-pointer border-b border-gray-100 px-5 py-4 transition hover:bg-gray-50 dark:border-slate-700/70 dark:hover:bg-slate-800/60',
                  { 'bg-blue-50/50 dark:bg-slate-800/40': !item.isRead }
                ]"
              >
                <div class="flex gap-3">
                  <!-- Type Icon -->
                  <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-500/10">
                    <i :class="[getNotificationIcon(item.type), 'text-sm text-emerald-600 dark:text-emerald-400']"></i>
                  </div>

                  <!-- Content Details -->
                  <div class="min-w-0 flex-1">
                    <div class="flex items-start justify-between gap-2">
                      <h4 class="text-sm font-semibold text-gray-900 dark:text-white">{{ item.title }}</h4>
                      <span v-if="!item.isRead" class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500"></span>
                    </div>

                    <p class="mt-1 text-xs leading-relaxed text-gray-500 dark:text-slate-400">{{ item.message }}</p>
                    <p class="mt-2 text-[10px] text-gray-400 dark:text-slate-500">{{ formatNotificationDate(item.createdAt) }}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </Transition>
      </div>

      <!-- Profile Section -->
      <router-link
        to="/admin/profile_user"
        class="flex cursor-pointer items-center gap-3 rounded-lg border border-[#D3DAEF] bg-white px-3 py-1.5 text-sm font-medium text-[#111827] shadow-sm hover:border-gray-500 transition-colors dark:border-slate-600 dark:bg-[#1E293B] dark:text-white dark:hover:border-slate-500"
      >
        <img
          v-if="userProfile?.profileImage"
          :src="userProfile.profileImage"
          alt="Profile"
          class="h-7 w-7 rounded-full object-cover"
        />

        <div
          v-else
          :class="['flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white', avatarColor]"
        >
          {{ userInitial }}
        </div>
      </router-link>

    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { getLoggedInAdminProfile } from '../../api/user'
import { getNotifications, getUnreadCount } from '../../api/notification'
import { useTheme } from '../../composables/useTheme'
import NotificationPopup from './NotificationPopup.vue'

const emit = defineEmits(['search', 'notification-click'])

// State Variables
const searchQuery = ref('')
const userProfile = ref(null)
const notifications = ref([])
const unreadCount = ref(0)
const showNotifications = ref(false)

const notificationDropdownRef = ref(null)
const notificationPopup = ref(null)
const notificationsInitialized = ref(false)

let notificationInterval = null
let searchDebounceTimeout = null

const { isDark, initTheme, toggleTheme } = useTheme()

// Computed Avatar Properties
const userInitial = computed(() => {
  const name = userProfile.value?.name
  return name ? name.trim().charAt(0).toUpperCase() : 'A'
})

const avatarColor = computed(() => {
  const name = userProfile.value?.name
  const colors = [
    'bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500',
    'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-red-500'
  ]
  if (!name) return 'bg-slate-500'

  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
})

// Debounced Search Emitter
function onSearchInput() {
  clearTimeout(searchDebounceTimeout)
  searchDebounceTimeout = setTimeout(() => {
    emit('search', searchQuery.value)
  }, 300)
}

// API Calls
async function loadLoggedInAdmin() {
  try {
    const userData = await getLoggedInAdminProfile()
    userProfile.value = userData
    await loadNotifications()
  } catch (error) {
    console.error('Failed to load logged-in admin:', error)
    userProfile.value = null
  }
}

async function loadNotifications() {
  const adminId = userProfile.value?.id

  if (!adminId) return

  try {
    const newNotifications = await getNotifications(adminId)
    const newUnreadCount = await getUnreadCount(adminId)

    unreadCount.value = newUnreadCount

    // First API request
    if (!notificationsInitialized.value) {
      notifications.value = newNotifications
      notificationsInitialized.value = true

      console.log(' Notification watcher started')
      console.log('Existing notifications:', newNotifications)

      return
    }

    // IDs we already know about
    const oldIds = new Set(
      notifications.value.map(item => item.id)
    )

    // Find newly created notifications
    const newlyAdded = newNotifications.filter(
      item => !oldIds.has(item.id)
    )

    // Update list
    notifications.value = newNotifications

    // Show banner when a new notification is detected
    if (newlyAdded.length > 0) {

      const newestNotification = [...newlyAdded].sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      )[0]

      console.log('New notification detected:')
      console.log(newestNotification)

      notificationPopup.value?.showNotification(
        newestNotification
      )
    }

  } catch (error) {
    console.error(
      'Failed to load notifications:',
      error
    )
  }
}

// UI Helpers
function toggleNotifications() {
  showNotifications.value = !showNotifications.value
}

function getNotificationIcon(type) {
  switch (type) {
    case 'NEW_BOOKING':
      return 'fa-solid fa-calendar-check'
    case 'PAYMENT_RECEIVED':
      return 'fa-solid fa-money-bill-wave'
    default:
      return 'fa-regular fa-bell'
  }
}

function formatNotificationDate(date) {
  if (!date) return ''
  return new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })
}

// Close Dropdown On Click Outside
function handleClickOutside(event) {
  if (
    notificationDropdownRef.value &&
    !notificationDropdownRef.value.contains(event.target)
  ) {
    showNotifications.value = false
  }
}

function handleAdminProfileUpdated() {
  loadLoggedInAdmin()
}

// Lifecycle Hooks
onMounted(async () => {
  initTheme()
  await loadLoggedInAdmin()

  window.addEventListener('admin-profile-updated', handleAdminProfileUpdated)
  document.addEventListener('click', handleClickOutside)

  notificationInterval = setInterval(loadNotifications, 10000)
})

onUnmounted(() => {
  window.removeEventListener('admin-profile-updated', handleAdminProfileUpdated)
  document.removeEventListener('click', handleClickOutside)

  if (notificationInterval) {
    clearInterval(notificationInterval)
    notificationInterval = null
  }
  if (searchDebounceTimeout) {
    clearTimeout(searchDebounceTimeout)
  }
})
</script>