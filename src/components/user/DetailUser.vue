<template>
  <main class="p-6 md:p-8 min-h-[calc(100vh-64px)] bg-gray-50/50">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
      <div>
        <div class="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <button @click="handleBack" class="hover:text-gray-900 flex items-center gap-1 cursor-pointer transition-colors">
            <i class="fa-solid fa-arrow-left text-[10px]"></i>
            <span>Back to Users</span>
          </button>
          <span>/</span>
          <span class="text-gray-900 font-semibold">User Profile</span>
        </div>

        <div class="flex items-center gap-3">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">
            {{ getUserName(user) }}
          </h1>
          <span :class="getStatusBadgeClass(user.status)">
            {{ getStatusText(user.status) }}
          </span>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button
          @click="navigateToEdit"
          class="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-xs cursor-pointer"
        >
          <i class="fa-solid fa-user-pen text-xs"></i>
          <span>Edit User</span>
        </button>
      </div>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="loading" class="bg-white border border-gray-200/80 rounded-xl p-8 shadow-xs animate-pulse space-y-6">
      <div class="h-6 bg-gray-200 rounded w-1/4"></div>
      <div class="h-20 bg-gray-200 rounded"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="p-8 bg-white border border-gray-200/80 rounded-xl text-center">
      <i class="fa-solid fa-triangle-exclamation text-rose-500 text-2xl mb-2"></i>
      <p class="text-gray-900 font-semibold mb-1">Failed to load user details</p>
      <p class="text-gray-500 text-xs mb-4">{{ error }}</p>
      <button
        @click="fetchDetails"
        class="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 cursor-pointer"
      >
        Retry
      </button>
    </div>

    <!-- Content -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Info -->
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs space-y-5">
          <!-- User Header -->
          <div class="flex items-center gap-4 border-b border-gray-100 pb-5">
            <div class="w-16 h-16 rounded-full bg-slate-800 text-white font-bold text-lg flex items-center justify-center shrink-0 overflow-hidden ring-2 ring-gray-100">
              <img
                v-if="getUserAvatar(user)"
                :src="getUserAvatar(user)"
                :alt="getUserName(user)"
                class="w-full h-full object-cover"
              />
              <span v-else>{{ getUserInitials(user) }}</span>
            </div>

            <div>
              <h2 class="text-xl font-bold text-gray-900">{{ getUserName(user) }}</h2>
              <p class="text-xs text-gray-500">{{ user.email }}</p>
              <div class="mt-2">
                <span :class="getRoleBadgeClass(user.role)">
                  {{ getRoleText(user.role) }}
                </span>
              </div>
            </div>
          </div>

          <!-- User Details Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div class="p-3 bg-gray-50 rounded-lg">
              <span class="text-gray-400 font-bold uppercase text-[10px]">Phone Number</span>
              <p class="text-gray-900 font-semibold mt-1">
                {{ user.phone || user.phoneNumber || 'N/A' }}
              </p>
            </div>

            <div class="p-3 bg-gray-50 rounded-lg">
              <span class="text-gray-400 font-bold uppercase text-[10px]">Gender</span>
              <p class="text-gray-900 font-semibold mt-1 capitalize">
                {{ user.gender || 'N/A' }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="space-y-6">
        <!-- System Metadata -->
        <div class="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs space-y-4">
          <h3 class="text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-3">
            System Metadata
          </h3>

          <div class="flex justify-between items-center text-xs">
            <span class="text-gray-600">User ID:</span>
            <span class="font-mono font-bold text-gray-900">#{{ user.id }}</span>
          </div>

          <div class="flex justify-between items-center text-xs pt-2 border-t border-gray-100">
            <span class="text-gray-600">Registered Date:</span>
            <span class="font-medium text-gray-800">
              {{ formatDate(user.createdAt || user.created_at) }}
            </span>
          </div>

          <div class="flex justify-between items-center text-xs pt-2 border-t border-gray-100">
            <span class="text-gray-600">Account Status:</span>
            <span :class="getStatusBadgeClass(user.status)">
              {{ getStatusText(user.status) }}
            </span>
          </div>
        </div>

        <!-- Telegram -->
        <div class="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs">
          <div class="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 class="text-xs font-bold uppercase tracking-wider text-gray-400">Telegram</h3>
            <i class="fa-brands fa-telegram text-sky-500 text-lg"></i>
          </div>

          <div class="mt-4">
            <div v-if="user.telegramChatId" class="flex items-center gap-2 text-xs text-emerald-600 font-semibold mb-4">
              <i class="fa-solid fa-circle-check"></i>
              <span>Telegram Connected</span>
            </div>
            <div v-else class="flex items-center gap-2 text-xs text-gray-500 mb-4">
              <i class="fa-solid fa-circle-xmark"></i>
              <span>Telegram Not Connected</span>
            </div>

            <button
              v-if="user.telegramChatId"
              @click="openTelegramModal"
              class="w-full h-10 px-4 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <i class="fa-brands fa-telegram"></i>
              Contact Telegram
            </button>

            <p v-else class="text-[11px] text-gray-400 leading-relaxed">
              This client has not connected their Telegram account yet.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Telegram Message Modal -->
    <div
      v-if="showTelegramModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      @click.self="closeTelegramModal"
    >
      <div class="w-full max-w-md bg-white rounded-xl shadow-xl p-6">
        <div class="flex items-center justify-between mb-5">
          <div>
            <h2 class="text-lg font-bold text-gray-900">Contact Telegram</h2>
            <p class="text-xs text-gray-500 mt-1">Send a message to {{ getUserName(user) }}</p>
          </div>
          <button
            @click="closeTelegramModal"
            :disabled="sendingTelegram"
            class="w-8 h-8 rounded-lg hover:bg-gray-100 text-gray-500 cursor-pointer disabled:cursor-not-allowed"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div>
          <label class="block text-xs font-semibold text-gray-700 mb-2">Message</label>
          <textarea
            v-model="telegramMessage"
            rows="5"
            maxlength="1000"
            placeholder="Write your message..."
            class="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 resize-none"
          ></textarea>

          <div class="flex justify-between items-center mt-1">
            <p v-if="telegramError" class="text-xs text-red-500">{{ telegramError }}</p>
            <span class="text-[10px] text-gray-400 ml-auto">{{ telegramMessage.length }}/1000</span>
          </div>
        </div>

        <div class="flex justify-end gap-3 mt-5">
          <button
            @click="closeTelegramModal"
            :disabled="sendingTelegram"
            class="h-10 px-4 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            @click="sendTelegramMessage"
            :disabled="sendingTelegram || !telegramMessage.trim()"
            class="h-10 px-5 rounded-lg bg-sky-500 hover:bg-sky-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xs font-semibold flex items-center gap-2 cursor-pointer"
          >
            <i v-if="sendingTelegram" class="fa-solid fa-spinner fa-spin"></i>
            <i v-else class="fa-brands fa-telegram"></i>
            {{ sendingTelegram ? 'Sending...' : 'Send Message' }}
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getUserById, sendTelegramMessageToClient } from '../../api/user'

const props = defineProps({
  id: {
    type: [String, Number],
    default: null
  }
})

const route = useRoute()
const router = useRouter()

const activeId = computed(() => props.id || route.params.id)

// Page State
const loading = ref(true)
const error = ref(null)
const user = ref({})

// Telegram State
const showTelegramModal = ref(false)
const telegramMessage = ref('')
const telegramError = ref('')
const sendingTelegram = ref(false)

// Navigation
const handleBack = () => router.push('/admin/users')
const navigateToEdit = () => router.push(`/admin/users/update/${activeId.value}`)

// Response Helper
const unwrapResponseData = (res) => (res?.data ? res.data : res)

// Fetch User
const fetchDetails = async () => {
  if (!activeId.value) return

  try {
    loading.value = true
    error.value = null
    const res = await getUserById(activeId.value)
    user.value = unwrapResponseData(res)
  } catch (err) {
    console.error('Failed to load user details:', err)
    error.value = err.response?.data?.message || err.response?.data?.msg || 'Unable to retrieve user details.'
  } finally {
    loading.value = false
  }
}

// User Helpers
const getUserName = (u) => u?.name || `${u?.firstName || ''} ${u?.lastName || ''}`.trim() || 'User'
const getUserAvatar = (u) => u?.avatar || u?.avatarUrl || u?.image || null

const getUserInitials = (u) => {
  const name = getUserName(u)
  const parts = name.split(' ').filter(Boolean)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

const getRoleText = (role) => {
  if (!role) return 'Customer'
  const r = String(role).toUpperCase()
  if (r.includes('ADMIN')) return 'Admin'
  if (r.includes('STAFF')) return 'Staff'
  return 'Customer'
}

const getStatusText = (status) => {
  if (typeof status === 'boolean') return status ? 'Active' : 'Inactive'
  if (typeof status === 'string') return status.toUpperCase() === 'INACTIVE' ? 'Inactive' : 'Active'
  return 'Active'
}

const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A'
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return dateStr
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const getRoleBadgeClass = (role) => {
  const r = getRoleText(role)
  if (r === 'Admin') return 'px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200/60'
  if (r === 'Staff') return 'px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200/60'
  return 'px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60'
}

const getStatusBadgeClass = (status) => {
  return getStatusText(status) === 'Active'
    ? 'px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/60 rounded-full'
    : 'px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200/60 rounded-full'
}

// Telegram Modal Actions
const openTelegramModal = () => {
  telegramMessage.value = ''
  telegramError.value = ''
  showTelegramModal.value = true
}

const closeTelegramModal = () => {
  if (sendingTelegram.value) return
  showTelegramModal.value = false
  telegramMessage.value = ''
  telegramError.value = ''
}

const sendTelegramMessage = async () => {
  const message = telegramMessage.value.trim()
  if (!message) {
    telegramError.value = 'Please enter a message.'
    return
  }

  try {
    sendingTelegram.value = true
    telegramError.value = ''
    await sendTelegramMessageToClient(activeId.value, message)
    alert('Telegram message sent successfully.')
    closeTelegramModal()
  } catch (err) {
    console.error('Failed to send Telegram message:', err)
    telegramError.value = err.response?.data?.message || err.response?.data?.msg || 'Failed to send Telegram message.'
  } finally {
    sendingTelegram.value = false
  }
}

onMounted(fetchDetails)
</script>