<template>
  <main class="p-6 md:p-8 min-h-[calc(100vh-64px)]  " 
  style="background-color: var(--background); font-family: var(--font-body); color: var(--text);">

    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-[#0f172a]" 
        style="color: var(--text);">
          Bookings
        </h1>
        <p class="text-xl mt-1 text-[#0f172a]" 
        style="color: var(--text);">
          Manage and monitor all vehicle rental bookings
        </p>
      </div>

      <div class="flex items-center gap-3">
      
        <!-- New Booking -->
        <router-link
          to="bookings/create"
          class="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-[11px] text-sm font-semibold text-white bg-[#0f172a] hover:text-gray-100 transition-all shadow-sm shadow-blue-500/10 active:scale-95 cursor-pointer"
        >
          <i class="fa-solid fa-plus text-xs text-white"></i>
          <span class="text-white hover:text-gray-200 "
         ">New Booking</span>
        </router-link>
      </div>
    </div>

    <!-- =========================================================
         KPI CARDS
    ========================================================== -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      <!-- Total -->
      <div
        class="p-5 border border-gray-200/80  rounded-xl shadow-xs hover:shadow-md hover:border-gray-300 transition-all flex flex-col justify-between group"
        style="color: var(--text);"
      >
        <div class="flex items-center justify-between tracking-wider uppercase " >
          <span class="text-[#0f172a] text-[15px] font-bold uppercase tracking-wider "
           style="font-family: var(--font-heading);color: var(--text);"
          >
            Total
          </span>
          <div
            class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center transition-transform group-hover:scale-110"
          >
            <i class="fa-solid fa-calendar-days text-xs"></i>
          </div>
        </div>

        <div class="mt-4">
          <div class="text-2xl font-extrabold text-gray-900"
          style="color: var(--text);">
            {{ totalBookings }}
          </div>

          <div
            class="mt-1 text-[11px] font-semibold flex items-center gap-1"
            :class="bookingGrowthPercentage >= 0 ? 'text-emerald-600' : 'text-rose-600'"
          >
            <i
              :class="bookingGrowthPercentage >= 0 ? 'fa-solid fa-arrow-trend-up' : 'fa-solid fa-arrow-trend-down'"
              class="text-[9px]"
            ></i>
            <span>
              {{ bookingGrowthPercentage >= 0 ? '+' : '' }}{{ bookingGrowthPercentage }}%
              <span class="font-normal text-gray-400">vs last month</span>
            </span>
          </div>
        </div>
      </div>

      <!-- Pending -->
      <div
        class="p-5  border border-gray-200/80 rounded-xl shadow-xs hover:shadow-md hover:border-gray-300 transition-all flex flex-col justify-between group"
      >
        <div class="flex items-center justify-between">
          <span class="text-[#0f172a] text-[15px] font-bold uppercase tracking-wider"
            style="font-family: var(--font-heading);color: var(--text);">
            
            Pending
          </span>
          <div
            class="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center transition-transform group-hover:scale-110"
          >
            <i class="fa-regular fa-clock text-xs"></i>
          </div>
        </div>

        <div class="mt-4">
          <div class="text-2xl font-extrabold text-gray-900"
          style="color: var(--text);">
            {{ pendingBookings }}
          </div>
          <div class="mt-1 text-[11px] text-gray-400 font-medium">
            Awaiting action
          </div>
        </div>
      </div>

      <!-- Confirmed -->
      <div
        class="p-5  border border-gray-200/80 rounded-xl shadow-xs hover:shadow-md hover:border-gray-300 transition-all flex flex-col justify-between group"
      >
        <div class="flex items-center justify-between">
          <span class="text-[#0f172a] text-[15px] font-bold uppercase tracking-wider"
            style="font-family: var(--font-heading);color: var(--text);">
            Confirmed
          </span>
          <div
            class="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center transition-transform group-hover:scale-110"
          >
            <i class="fa-regular fa-circle-check text-xs"></i>
          </div>
        </div>

        <div class="mt-4">
          <div class="text-2xl font-extrabold text-gray-900"
          style="color: var(--text);">
            {{ confirmedBookings }}
          </div>
          <div class="mt-1 text-[11px] text-gray-400 font-medium">
            Upcoming departures
          </div>
        </div>
      </div>

      <!-- Completed -->
      <div
        class="p-5 border border-gray-200/80 rounded-xl shadow-xs hover:shadow-md hover:border-gray-300 transition-all flex flex-col justify-between group"
      >
        <div class="flex items-center justify-between">
          <span class="text-[#0f172a] text-[15px] font-bold uppercase tracking-wider"
            style="font-family: var(--font-heading);color: var(--text);">
            Completed
          </span>
          <div
            class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center transition-transform group-hover:scale-110"
          >
            <i class="fa-solid fa-circle-check text-xs"></i>
          </div>
        </div>

        <div class="mt-4">
          <div class="text-2xl font-extrabold text-gray-900"
          style="color: var(--text);">
            {{ completedBookings }}
          </div>
          <div class="mt-1 text-[11px] text-gray-400 font-medium">
            Successfully returned
          </div>
        </div>
      </div>

      <!-- Cancelled -->
      <div
        class="p-5  border border-gray-200/80 rounded-xl shadow-xs hover:shadow-md hover:border-gray-300 transition-all flex flex-col justify-between group"
      >
        <div class="flex items-center justify-between">
          <span class="text-[#0f172a] text-[15px] font-bold uppercase tracking-wider"
            style="font-family: var(--font-heading);color: var(--text);">
            Cancelled
          </span>
          <div
            class="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center transition-transform group-hover:scale-110"
          >
            <i class="fa-regular fa-circle-xmark text-xs"></i>
          </div>
        </div>

        <div class="mt-4">
          <div class="text-2xl font-extrabold text-gray-900"
          style="color: var(--text);">
            {{ cancelledBookings }}
          </div>
          <div class="mt-1 text-[11px] text-gray-400 font-medium">
            {{ cancelledRate }}% cancellation rate
          </div>
        </div>
      </div>
    </div>

    <!-- =========================================================
         FILTER BAR
    ========================================================== -->
    <div
      class="p-4  border border-gray-200/80 rounded-t-xl shadow-xs flex flex-col md:flex-row items-center justify-between gap-4"
    style="color: var(--text);">
      <!-- Search -->
      <div class="relative w-full md:w-80">
        <input
          type="text"
          v-model="searchQuery"
          @input="currentPage = 1"
          placeholder="Search booking ID or customer..."
          class="w-full h-9 pl-9 pr-4 border border-gray-200 rounded-lg text-xs font-medium  placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
        style="color: var(--text);font-family: var(--font-heading);"/>
      </div>

      <!-- Filters -->
      <div class="flex items-center gap-3 w-full md:w-auto justify-end">
        <select
          v-model="selectedStatus"
          @change="currentPage = 1"
          class="h-9 px-3  border border(--border) rounded-lg text-xs font-semibold t focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer"
        style="color: var(--text);font-family: var(--font-heading);">
          <option value="All Statuses">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="ACTIVE">Active</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>
    </div>

    <!-- =========================================================
         BOOKINGS TABLE
    ========================================================== -->
    <div
      class=" border-x border-b border-gray-200/80 rounded-b-xl shadow-xs overflow-hidden"
    >
      <div class="overflow-x-auto" 
      style="color: var(--text);">
        <table class="w-full text-left border-collapse">
          <!-- Header -->
          <thead>
            <tr
              class="border-b  border-(--border) text-[11px] font-bold text-(--text) uppercase tracking-wider"
           >
              <th class="py-3.5 px-4 ">Booking ID</th>
              <th class="py-3.5 px-4">Customer</th>
              <th class="py-3.5 px-4">Vehicle</th>
              <th class="py-3.5 px-4">Rental Dates</th>
              <th class="py-3.5 px-4">Amount</th>
              <th class="py-3.5 px-4">Status</th>
              <th class="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>

          <!-- Body -->
          <tbody class="divide-y divide-gray-100 text-xs">
            <!-- Loading -->
            <template v-if="loading">
              <tr v-for="n in itemsPerPage" :key="n" class="animate-pulse">
                <td class="py-4 px-4"><div class="h-4 bg-gray-200 rounded w-16"></div></td>
                <td class="py-4 px-4">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-gray-200"></div>
                    <div class="space-y-1">
                      <div class="h-3 bg-gray-200 rounded w-24"></div>
                      <div class="h-2.5 bg-gray-200 rounded w-32"></div>
                    </div>
                  </div>
                </td>
                <td class="py-4 px-4"><div class="h-4 bg-gray-200 rounded w-28"></div></td>
                <td class="py-4 px-4"><div class="h-4 bg-gray-200 rounded w-32"></div></td>
                <td class="py-4 px-4"><div class="h-4 bg-gray-200 rounded w-16"></div></td>
                <td class="py-4 px-4"><div class="h-5 bg-gray-200 rounded-full w-20"></div></td>
                <td class="py-4 px-4 text-right"><div class="h-4 bg-gray-200 rounded w-8 ml-auto"></div></td>
              </tr>
            </template>

            <!-- Error -->
            <tr v-else-if="error">
              <td colspan="7" class="py-12 text-center text-rose-600">
                <i class="fa-solid fa-triangle-exclamation text-xl mb-2"></i>
                <p class="font-medium">{{ error }}</p>
                <button
                  @click="fetchBookings"
                  class="mt-3 text-xs text-blue-600 underline font-semibold hover:text-blue-800"
                >
                  Try Again
                </button>
              </td>
            </tr>

            <!-- Empty -->
            <tr v-else-if="paginatedBookings.length === 0">
              <td colspan="7" class="py-12 text-center text-gray-500">
                <i class="fa-regular fa-folder-open text-2xl mb-2 text-gray-400"></i>
                <p class="font-medium">No bookings found</p>
                <p class="text-[11px] text-gray-400 mt-0.5">
                  Try adjusting your filters or search terms.
                </p>
              </td>
            </tr>

            <!-- Booking Rows -->
            <tr
              v-else
              v-for="booking in paginatedBookings"
              :key="booking.id"
              class="hover:bg-gray-50/80 transition-colors group"
            >
              <!-- Booking ID -->
              <td class="py-3.5 px-4 font-bold text-gray-900">
                #{{ booking.id }}
              </td>

              <!-- Customer -->
              <td class="py-3.5 px-4">
                <div class="flex items-center gap-2.5">
                  <div
                    class="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center shrink-0"
                  >
                    {{ getInitials(booking.user?.name || booking.userName) }}
                  </div>
                  <div>
                    <div class="font-semibold text-gray-900">
                      {{ booking.user?.name || booking.userName || 'N/A' }}
                    </div>
                    <div class="text-[11px] text-gray-400">
                      {{ booking.user?.email || booking.userEmail || 'N/A' }}
                    </div>
                  </div>
                </div>
              </td>

              <!-- Vehicle -->
              <td class="py-3.5 px-4 font-medium text-gray-700">
                {{ booking.vehicle?.name || booking.vehicleName || '—' }}
              </td>

              <!-- Dates -->
              <td class="py-3.5 px-4 text-gray-600">
                <div>
                  {{ formatDate(booking.pickupDate || booking.startDate) }}
                </div>
                <div class="text-[10px] text-gray-400">
                  to {{ formatDate(booking.returnDate || booking.endDate) }}
                </div>
              </td>

              <!-- Amount -->
              <td class="py-3.5 px-4 font-bold text-gray-900">
                ${{ formatAmount(booking.totalPrice || booking.amount) }}
              </td>

              <!-- Status -->
              <td class="py-3.5 px-4">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  :class="getStatusBadgeClass(booking.status)"
                >
                  {{ booking.status }}
                </span>
              </td>

              <!-- Actions -->
              <td class="py-3.5 px-4 text-right">
                <div class="flex items-center gap-1.5">
                  <!-- View -->
                  <router-link
                    :to="`/admin/bookings/${booking.id}`"
                    class="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer"
                    title="View Details"
                  >
                    <i class="fa-regular fa-eye text-sm"></i>
                  </router-link>

                  <!-- Edit -->
                  <router-link
                    :to="`/admin/bookings/update/${booking.id}`"
                    class="p-1.5 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-all cursor-pointer"
                    title="Edit Booking"
                  >
                    <i class="fa-regular fa-pen-to-square text-sm"></i>
                  </router-link>

                  <!-- Delete -->
                  <button
                    @click="confirmAndDelete(booking)"
                    :disabled="deletingId === booking.id"
                    class="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer disabled:opacity-50"
                    title="Delete Booking"
                  >
                    <i v-if="deletingId === booking.id" class="fa-solid fa-spinner fa-spin text-sm text-rose-600"></i>
                    <i v-else class="fa-regular fa-trash-can text-sm"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- =========================================================
           PAGINATION
      ========================================================== -->
      <div
        v-if="!loading && filteredBookings.length > 0"
        class="px-4 py-3 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500"
      >
        <div>
          Showing
          <span class="font-bold text-gray-900">{{ startIndex + 1 }}</span>
          to
          <span class="font-bold text-gray-900">{{ endIndex }}</span>
          of
          <span class="font-bold text-gray-900">{{ filteredBookings.length }}</span>
          bookings
        </div>

        <div class="flex items-center gap-1.5">
          <!-- Previous Button -->
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-2.5 py-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Previous
          </button>

          <!-- Page Numbers -->
          <div class="flex items-center gap-1 px-1">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="goToPage(page)"
              class="w-7 h-7 rounded text-xs font-semibold transition-colors cursor-pointer"
              :class="
                currentPage === page
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              "
            >
              {{ page }}
            </button>
          </div>

          <!-- Next Button -->
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-2.5 py-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { getBookings, deleteBooking } from '../api/booking'
import { useRouter } from 'vue-router'

defineEmits(['export', 'new-booking', 'view'])

const router = useRouter()
const handleNewBooking = () => {
  router.push('bookings/create')
}

const customers = ref([])
const vehicles = ref([])

const searchQuery = ref('')
const selectedStatus = ref('All Statuses')

const bookings = ref([])

const bookingStats = ref({
  totalBookings: 0,
  pendingBookings: 0,
  confirmedBookings: 0,
  activeBookings: 0,
  completedBookings: 0,
  cancelledBookings: 0,
  bookingGrowthPercentage: 0,
  cancelledRate: 0
})

const loading = ref(true)
const error = ref(null)

/*
|--------------------------------------------------------------------------
| Pagination State & Computeds
|--------------------------------------------------------------------------
*/
const currentPage = ref(1)
const itemsPerPage = ref(8)

const totalPages = computed(() => {
  return Math.ceil(filteredBookings.value.length / itemsPerPage.value) || 1
})

const startIndex = computed(() => {
  return (currentPage.value - 1) * itemsPerPage.value
})

const endIndex = computed(() => {
  return Math.min(
    startIndex.value + itemsPerPage.value,
    filteredBookings.value.length
  )
})

const paginatedBookings = computed(() => {
  return filteredBookings.value.slice(startIndex.value, endIndex.value)
})

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page) => {
  currentPage.value = page
}

/*
|--------------------------------------------------------------------------
| Fetch Bookings
|--------------------------------------------------------------------------
*/

const fetchBookings = async () => {
  try {
    loading.value = true
    error.value = null

    const response = await getBookings()
    const data = response?.data

    if (Array.isArray(data)) {
      bookings.value = data
      const total = data.length
      const cancelled = data.filter(
        b => String(b.status).toUpperCase() === 'CANCELLED'
      ).length

      bookingStats.value = {
        totalBookings: total,
        pendingBookings: data.filter(
          b => String(b.status).toUpperCase() === 'PENDING'
        ).length,

        confirmedBookings: data.filter(
          b => String(b.status).toUpperCase() === 'CONFIRMED'
        ).length,

        activeBookings: data.filter(
          b => String(b.status).toUpperCase() === 'ACTIVE'
        ).length,

        completedBookings: data.filter(
          b => String(b.status).toUpperCase() === 'COMPLETED'
        ).length,

        cancelledBookings: cancelled,
        bookingGrowthPercentage: 0,
        cancelledRate: total > 0 ? (cancelled / total) * 100 : 0
      }
    } else {
      bookingStats.value = {
        totalBookings: data?.totalBookings ?? 0,
        pendingBookings: data?.pendingBookings ?? 0,
        confirmedBookings: data?.confirmedBookings ?? 0,
        activeBookings: data?.activeBookings ?? 0,
        completedBookings: data?.completedBookings ?? 0,
        cancelledBookings: data?.cancelledBookings ?? 0,
        bookingGrowthPercentage: data?.bookingGrowthPercentage ?? 0,
        cancelledRate: data?.cancelledRate ?? 0
      }

      bookings.value = data?.bookings ?? []
    }
  } catch (err) {
    console.error('Failed to fetch bookings:', err)
    error.value =
      err.response?.data?.message ||
      err.response?.data?.msg ||
      'Failed to load bookings'
  } finally {
    loading.value = false
  }
}

/*
|--------------------------------------------------------------------------
| Fetch Customers & Vehicles
|--------------------------------------------------------------------------
*/

const fetchBookingOptions = async () => {
  customers.value = []
  vehicles.value = []
}

/*
|--------------------------------------------------------------------------
| Lifecycle
|--------------------------------------------------------------------------
*/

onMounted(async () => {
  await Promise.all([
    fetchBookings(),
    fetchBookingOptions()
  ])
})

/*
|--------------------------------------------------------------------------
| KPI Values
|--------------------------------------------------------------------------
*/

const totalBookings = computed(() => bookingStats.value.totalBookings)
const pendingBookings = computed(() => bookingStats.value.pendingBookings)
const confirmedBookings = computed(() => bookingStats.value.confirmedBookings)
const completedBookings = computed(() => bookingStats.value.completedBookings)
const cancelledBookings = computed(() => bookingStats.value.cancelledBookings)

const bookingGrowthPercentage = computed(() =>
  Number(bookingStats.value.bookingGrowthPercentage || 0)
)

const cancelledRate = computed(() =>
  Number(bookingStats.value.cancelledRate || 0).toFixed(1)
)

/*
|--------------------------------------------------------------------------
| Search + Status Filter
|--------------------------------------------------------------------------
*/

const filteredBookings = computed(() => {
  let result = [...bookings.value]

  if (searchQuery.value.trim()) {
    const search = searchQuery.value.toLowerCase().trim()

    result = result.filter(booking => {
      const bookingId = String(booking.id || '').toLowerCase()

      const customerName = String(
        booking.user?.name || booking.userName || ''
      ).toLowerCase()

      const customerEmail = String(
        booking.user?.email || booking.userEmail || ''
      ).toLowerCase()

      const vehicleName = String(
        booking.vehicle?.name || booking.vehicleName || ''
      ).toLowerCase()

      return (
        bookingId.includes(search) ||
        customerName.includes(search) ||
        customerEmail.includes(search) ||
        vehicleName.includes(search)
      )
    })
  }

  if (selectedStatus.value !== 'All Statuses') {
    result = result.filter(
      booking =>
        String(booking.status || '').toUpperCase() ===
        selectedStatus.value.toUpperCase()
    )
  }

  // Newest booking first
  result.sort((a, b) => Number(b.id) - Number(a.id))

  return result
})
/*
|--------------------------------------------------------------------------
| Helper Functions
|--------------------------------------------------------------------------
*/

const getInitials = (name) => {
  if (!name) return '?'
  return name
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()
}

const formatDate = (dateString) => {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const formatAmount = (val) => {
  const num = Number(val || 0)
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

const getStatusBadgeClass = (status) => {
  const s = String(status || '').toUpperCase()

  switch (s) {
    case 'PENDING':
      return 'bg-amber-50 text-amber-700 border border-amber-200/60'
    case 'CONFIRMED':
      return 'bg-indigo-50 text-indigo-700 border border-indigo-200/60'
    case 'ACTIVE':
      return 'bg-blue-50 text-blue-700 border border-blue-200/60'
    case 'COMPLETED':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
    case 'CANCELLED':
      return 'bg-rose-50 text-rose-700 border border-rose-200/60'
    default:
      return 'bg-gray-50 text-gray-700 border border-gray-200/60'
  }
}

// Delete
const deletingId = ref(null)

const confirmAndDelete = async (booking) => {
  const isConfirmed = window.confirm(
    `Are you sure you want to delete Booking #${booking.id}?`
  )

  if (!isConfirmed) return

  try {
    deletingId.value = booking.id

    await deleteBooking(booking.id)

    // Remove deleted booking from local array
    bookings.value = bookings.value.filter(b => b.id !== booking.id)

    // Re-fetch bookings & recalculate KPI stats
    await fetchBookings()
  } catch (err) {
    console.error('Failed to delete booking:', err)
    alert(
      err.response?.data?.message ||
      err.response?.data?.msg ||
      'Failed to delete booking.'
    )
  } finally {
    deletingId.value = null
  }
}
</script>