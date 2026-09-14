<template>
  <main class="min-h-[calc(100vh-64px)] bg-(--background) p-4 sm:p-6 lg:p-8 text-(--text)">

    <!-- =========================================================
         PAGE HEADER
    ========================================================== -->
    <div class="max-w-[1600px] mx-auto mb-7">
      <div class="flex flex-col gap-1">
        <h1 class="text-3xl sm:text-3xl font-bold tracking-tight text-(--text)">
          Rental History
        </h1>
        <p class="text-xl text-(--muted)">
          View completed rental transactions and rental performance.
        </p>
      </div>
    </div>


    <!-- =========================================================
         LOADING STATE
    ========================================================== -->
    <div
      v-if="loading"
      class="max-w-[1600px] mx-auto bg-(--surface) border border-(--border) rounded-2xl"
    >
      <div class="flex flex-col items-center justify-center py-24">
        <div class="w-10 h-10 rounded-full bg-(--background) border border-(--border) flex items-center justify-center mb-4">
          <i class="fa-solid fa-circle-notch fa-spin text-(--accent)"></i>
        </div>
        <p class="text-sm font-semibold text-(--text)">
          Loading rental history
        </p>
        <p class="text-xs text-(--muted) mt-1">
          Please wait while we retrieve the records.
        </p>
      </div>
    </div>


    <!-- =========================================================
         ERROR STATE
    ========================================================== -->
    <div
      v-else-if="error"
      class="max-w-[1600px] mx-auto bg-(--surface) border border-(--danger)/30 rounded-2xl shadow-sm"
    >
      <div class="flex flex-col items-center justify-center py-20 px-6 text-center">
        <div class="w-12 h-12 rounded-full bg-(--background) border border-(--border) flex items-center justify-center mb-4">
          <i class="fa-solid fa-triangle-exclamation text-(--danger)"></i>
        </div>
        <h3 class="text-base font-bold text-(--text)">
          Unable to load rental history
        </h3>
        <p class="text-sm text-(--muted) mt-1 max-w-md">
          {{ error }}
        </p>
        <button
          @click="fetchHistoryData"
          class="mt-5 inline-flex items-center gap-2 px-4 py-2.5 bg-(--accent) text-(--background) text-sm font-semibold rounded-lg hover:bg-(--accent-hover) transition cursor-pointer"
        >
          <i class="fa-solid fa-rotate-right text-xs"></i>
          Retry
        </button>
      </div>
    </div>


    <!-- =========================================================
         MAIN CONTENT
    ========================================================== -->
    <template v-else>
      <div class="max-w-[1600px] mx-auto">

        <!-- =====================================================
             KPI CARDS
        ====================================================== -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <!-- Total Rentals -->
          <div class="bg-(--surface) border border-(--border) rounded-2xl p-5 hover:border-(--muted) transition shadow-sm">
            <div class="flex items-start justify-between">
              <div>
                <span class="text-(--muted) text-[15px] font-bold uppercase tracking-wider">
                  Total Rentals
                </span>
                <h2 class="text-2xl font-bold text-(--text) mt-2">
                  {{ kpis.totalRentals.toLocaleString() }}
                </h2>
                <p class="text-xs text-(--muted) mt-1">
                  Completed rentals
                </p>
              </div>
              <div class="w-10 h-10 rounded-xl bg-(--background) border border-(--border) flex items-center justify-center">
                <i class="fa-solid fa-car text-(--accent)"></i>
              </div>
            </div>
          </div>

          <!-- Revenue -->
          <div class="bg-(--surface) border border-(--border) rounded-2xl p-5 hover:border-(--muted) transition shadow-sm">
            <div class="flex items-start justify-between">
              <div>
                <span class="text-(--muted) text-[15px] font-bold uppercase tracking-wider">
                  Total Revenue
                </span>
                <h2 class="text-2xl font-bold text-(--text) mt-2">
                  ${{ Number(kpis.totalRevenue).toLocaleString() }}
                </h2>
                <p class="text-xs text-(--muted) mt-1">
                  From completed rentals
                </p>
              </div>
              <div class="w-10 h-10 rounded-xl bg-(--background) border border-(--border) flex items-center justify-center">
                <i class="fa-solid fa-dollar-sign text-(--accent)"></i>
              </div>
            </div>
          </div>

          <!-- Average Duration -->
          <div class="bg-(--surface) border border-(--border) rounded-2xl p-5 hover:border-(--muted) transition shadow-sm">
            <div class="flex items-start justify-between">
              <div>
                <span class="text-(--muted) text-[15px] font-bold uppercase tracking-wider">
                  Average Duration
                </span>
                <h2 class="text-2xl font-bold text-(--text) mt-2">
                  {{ kpis.avgDuration }}
                  <span class="text-base font-semibold text-(--muted)">
                    days
                  </span>
                </h2>
                <p class="text-xs text-(--muted) mt-1">
                  Average rental length
                </p>
              </div>
              <div class="w-10 h-10 rounded-xl bg-(--background) border border-(--border) flex items-center justify-center">
                <i class="fa-solid fa-clock text-(--accent)"></i>
              </div>
            </div>
          </div>
        </div>


        <!-- =====================================================
             RENTAL HISTORY PANEL
        ====================================================== -->
        <section class="bg-(--surface) border border-(--border) rounded-2xl overflow-hidden shadow-md">

          <!-- ===================================================
                PANEL HEADER & FILTERS
          ==================================================== -->
          <div class="px-5 sm:px-6 pt-5 pb-4">
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 class="text-base font-bold text-(--text)">
                  Completed Rentals
                </h2>
                <p class="text-xs text-(--muted) mt-1">
                  Historical records of completed vehicle rentals.
                </p>
              </div>
              <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-(--accent)/10 border border-(--accent)/20 text-(--accent) text-xs font-semibold w-fit">
                <span class="w-1.5 h-1.5 rounded-full bg-(--accent)"></span>
                {{ filteredRentals.length }} records
              </div>
            </div>

            <!-- Filter Toolbar -->
            <div class="mt-5 flex flex-col lg:flex-row gap-3">
              <!-- Search -->
              <div class="relative flex-1">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search booking ID, customer or vehicle..."
                  class="w-full h-10 pl-9 pr-4 bg-(--background) border border-(--border) rounded-lg text-sm text-(--text) placeholder:text-(--muted) outline-none focus:bg-(--background) focus:border-(--accent) focus:ring-2 focus:ring-(--accent)/20 transition shadow-sm"
                />
              </div>

              <!-- Date Filter -->
              <div class="relative">
                <select
                  v-model="selectedDateRange"
                  class="w-full lg:w-40 h-10 px-3 pr-8 bg-(--background) border border-(--border) rounded-lg text-sm text-(--text) outline-none focus:border-(--accent) cursor-pointer"
                >
                  <option value="" class="bg-(--background) text-(--text)">All Dates</option>
                  <option value="last-7" class="bg-(--background) text-(--text)">Last 7 Days</option>
                  <option value="last-30" class="bg-(--background) text-(--text)">Last 30 Days</option>
                  <option value="aug-2026" class="bg-(--background) text-(--text)">August 2026</option>
                </select>
              </div>

              <!-- Dynamic Vehicle Filter -->
              <div class="relative">
                <select
                  v-model="selectedVehicle"
                  class="w-full lg:w-48 h-10 px-3 pr-8 bg-(--background) border border-(--border) rounded-lg text-sm text-(--text) outline-none focus:border-(--accent) cursor-pointer"
                >
                  <option value="" class="bg-(--background) text-(--text)">All Vehicles</option>
                  <option
                    v-for="vehicle in vehicleOptions"
                    :key="vehicle"
                    :value="vehicle"
                    class="bg-(--background) text-(--text)"
                  >
                    {{ vehicle }}
                  </option>
                </select>
              </div>
            </div>
          </div>


          <!-- ===================================================
                TABLE
          ==================================================== -->
          <div class="overflow-x-auto border-t border-(--border)">
            <table class="w-full min-w-[850px] text-xs text-(--text)">
              <thead>
                <tr class="bg-(--background) border-b border-(--border)">
                  <th class="text-left px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-(--muted)">
                    Booking
                  </th>
                  <th class="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-(--muted)">
                    Customer
                  </th>
                  <th class="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-(--muted)">
                    Vehicle
                  </th>
                  <th class="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-(--muted)">
                    Rental Period
                  </th>
                  <th class="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-(--muted)">
                    Duration
                  </th>
                  <th class="text-right px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-(--muted)">
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody class="divide-y divide-(--border)">
                <!-- Empty State -->
                <tr v-if="paginatedRentals.length === 0">
                  <td colspan="6" class="px-6 py-16 text-center">
                    <div class="flex flex-col items-center">
                      <div class="w-12 h-12 rounded-full bg-(--background) border border-(--border) flex items-center justify-center mb-3">
                        <i class="fa-solid fa-folder-open text-(--muted)"></i>
                      </div>
                      <p class="text-sm font-semibold text-(--text)">No rental records found</p>
                      <p class="text-xs text-(--muted) mt-1">Try changing your search or filters.</p>
                    </div>
                  </td>
                </tr>

                <!-- Paginated Rental Rows -->
                <tr
                  v-for="rental in paginatedRentals"
                  :key="rental.id"
                  @click="openDetails(rental)"
                  class="group hover:bg-(--background)/50 cursor-pointer transition"
                >
                  <!-- Booking ID -->
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 rounded-lg bg-(--background) border border-(--border) flex items-center justify-center group-hover:border-(--accent)/50 transition">
                        <i class="fa-solid fa-receipt text-xs text-(--muted) group-hover:text-(--accent)"></i>
                      </div>
                      <div>
                        <div class="text-sm font-bold text-(--text) group-hover:text-(--accent) transition">
                          #BK-{{ rental.id }}
                        </div>
                        <div class="text-[11px] text-(--muted) mt-0.5">
                          {{ rental.status }}
                        </div>
                      </div>
                    </div>
                  </td>

                  <!-- Customer -->
                  <td class="px-4 py-4">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-full bg-(--background) border border-(--border) text-(--text) flex items-center justify-center text-[10px] font-bold">
                        {{ rental.customerInitials }}
                      </div>
                      <div class="min-w-0">
                        <div class="text-sm font-semibold text-(--text) truncate">
                          {{ rental.customerName }}
                        </div>
                        <div class="text-[11px] text-(--muted) truncate max-w-[180px]">
                          {{ rental.customerEmail }}
                        </div>
                      </div>
                    </div>
                  </td>

                  <!-- Vehicle -->
                  <td class="px-4 py-4">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 rounded-lg bg-(--background) border border-(--border) flex items-center justify-center">
                        <i class="fa-solid fa-car text-xs text-(--muted)"></i>
                      </div>
                      <div>
                        <div class="text-sm font-semibold text-(--text)">
                          {{ rental.vehicleName }}
                        </div>
                        <div class="text-[11px] text-(--muted)">
                          {{ rental.plateNumber }}
                        </div>
                      </div>
                    </div>
                  </td>

                  <!-- Period -->
                  <td class="px-4 py-4">
                    <div class="text-sm font-medium text-(--text)">
                      {{ rental.dateRange }}
                    </div>
                    <div class="text-[11px] text-(--muted) mt-0.5">
                      Rental period
                    </div>
                  </td>

                  <!-- Duration -->
                  <td class="px-4 py-4">
                    <span class="inline-flex items-center px-2.5 py-1 rounded-md bg-(--background) border border-(--border) text-(--muted) text-xs font-semibold">
                      {{ rental.durationDays }} days
                    </span>
                  </td>

                  <!-- Amount -->
                  <td class="px-6 py-4 text-right">
                    <div class="text-sm font-bold text-(--text)">
                      ${{ Number(rental.totalAmount).toLocaleString() }}
                    </div>
                    <div class="text-[11px] text-(--success) font-medium mt-0.5">
                      {{ rental.paymentStatus }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>


          <!-- ===================================================
                TABLE FOOTER WITH PAGINATION CONTROLS
          ==================================================== -->
          <div class="px-6 py-3.5 border-t border-(--border) bg-(--background)/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p class="text-xs text-(--muted)">
              Showing 
              <span class="font-semibold text-(--text)">{{ showingStart }}</span>
              to 
              <span class="font-semibold text-(--text)">{{ showingEnd }}</span>
              of 
              <span class="font-semibold text-(--text)">{{ filteredRentals.length }}</span>
              results
            </p>

            <!-- Pagination Buttons -->
            <div v-if="totalPages > 1" class="flex items-center gap-1">
              <button
                @click="currentPage--"
                :disabled="currentPage === 1"
                class="px-3 py-1 text-xs font-medium rounded-md border border-(--border) bg-(--background) text-(--muted) hover:bg-(--surface) hover:text-(--text) disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
              >
                Previous
              </button>

              <button
                v-for="page in totalPages"
                :key="page"
                @click="currentPage = page"
                :class="[
                  'px-3 py-1 text-xs font-semibold rounded-md transition cursor-pointer',
                  currentPage === page 
                    ? 'bg-(--accent) text-(--background) shadow-sm' 
                    : 'bg-(--background) border border-(--border) text-(--text) hover:bg-(--surface)'
                ]"
              >
                {{ page }}
              </button>

              <button
                @click="currentPage++"
                :disabled="currentPage === totalPages"
                class="px-3 py-1 text-xs font-medium rounded-md border border-(--border) bg-(--background) text-(--muted) hover:bg-(--surface) hover:text-(--text) disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>

        </section>
      </div>


      <!-- =======================================================
            BACKDROP & DETAILS DRAWER
      ======================================================== -->
      <div
        v-if="selectedRental"
        @click="selectedRental = null"
        class="fixed inset-0 bg-(--background)/80 backdrop-blur-[2px] z-40"
      ></div>

      <aside
        class="fixed top-0 right-0 bottom-0 w-full sm:w-[460px] bg-(--surface) z-50 shadow-2xl border-l border-(--border) flex flex-col transition-transform duration-300 text-(--text)"
        :class="selectedRental ? 'translate-x-0' : 'translate-x-full'"
      >
        <template v-if="selectedRental">
          <!-- Drawer Header -->
          <div class="px-6 py-5 border-b border-(--border) flex items-center justify-between">
            <div>
              <p class="text-[11px] uppercase tracking-wider font-bold text-(--muted)">
                Rental Record
              </p>
              <h2 class="text-lg font-bold text-(--text) mt-0.5">
                #BK-{{ selectedRental.id }}
              </h2>
            </div>
            <button
              @click="selectedRental = null"
              class="w-9 h-9 rounded-lg bg-(--background) text-(--muted) border border-(--border) hover:bg-(--border) hover:text-(--text) flex items-center justify-center transition cursor-pointer"
            >
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <!-- Drawer Content -->
          <div class="flex-1 overflow-y-auto px-6 py-6">
            <!-- Status -->
            <div class="flex items-center justify-between p-4 bg-(--accent)/10 border border-(--accent)/20 rounded-xl">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-(--background) border border-(--border) flex items-center justify-center">
                  <i class="fa-solid fa-check text-(--accent)"></i>
                </div>
                <div>
                  <p class="text-xs text-(--accent) font-medium">Rental Status</p>
                  <p class="text-sm font-bold text-(--accent) mt-0.5">{{ selectedRental.status }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-[11px] text-(--accent)">Duration</p>
                <p class="text-sm font-bold text-(--accent)">{{ selectedRental.durationDays }} days</p>
              </div>
            </div>

            <!-- Customer Details -->
            <div class="mt-7">
              <h3 class="text-xs font-bold uppercase tracking-wider text-(--muted) mb-3">Customer</h3>
              <div class="flex items-center gap-3">
                <div class="w-11 h-11 rounded-full bg-(--background) border border-(--border) text-(--text) flex items-center justify-center text-xs font-bold">
                  {{ selectedRental.customerInitials }}
                </div>
                <div>
                  <p class="text-sm font-bold text-(--text)">{{ selectedRental.customerName }}</p>
                  <p class="text-xs text-(--muted) mt-0.5">{{ selectedRental.customerEmail }}</p>
                </div>
              </div>
            </div>

            <!-- Vehicle Details -->
            <div class="mt-7">
              <h3 class="text-xs font-bold uppercase tracking-wider text-(--muted) mb-3">Vehicle</h3>
              <div class="flex items-center gap-3 p-4 border border-(--border) bg-(--background)/50 rounded-xl">
                <div class="w-12 h-12 rounded-lg bg-(--background) border border-(--border) flex items-center justify-center">
                  <i class="fa-solid fa-car text-(--accent)"></i>
                </div>
                <div>
                  <p class="text-sm font-bold text-(--text)">{{ selectedRental.vehicleName }}</p>
                  <p class="text-xs text-(--muted) mt-1">
                    Plate: <span class="font-medium text-(--text)">{{ selectedRental.plateNumber }}</span>
                  </p>
                </div>
              </div>
            </div>

            <!-- Rental Period -->
            <div class="mt-7">
              <h3 class="text-xs font-bold uppercase tracking-wider text-(--muted) mb-3">Rental Period</h3>
              <div class="grid grid-cols-2 gap-3">
                <div class="p-3.5 border border-(--border) bg-(--background)/50 rounded-xl">
                  <p class="text-[11px] text-(--muted)">Start Date</p>
                  <p class="text-sm font-semibold text-(--text) mt-1">{{ formatDate(selectedRental.startDate) }}</p>
                </div>
                <div class="p-3.5 border border-(--border) bg-(--background)/50 rounded-xl">
                  <p class="text-[11px] text-(--muted)">End Date</p>
                  <p class="text-sm font-semibold text-(--text) mt-1">{{ formatDate(selectedRental.endDate) }}</p>
                </div>
              </div>
            </div>

            <!-- Payment -->
            <div class="mt-7">
              <h3 class="text-xs font-bold uppercase tracking-wider text-(--muted) mb-3">Payment</h3>
              <div class="border border-(--border) rounded-xl overflow-hidden">
                <div class="px-4 py-3 bg-(--background) flex items-center justify-between">
                  <span class="text-xs text-(--muted)">Rental total</span>
                  <span class="text-lg font-bold text-(--text)">${{ Number(selectedRental.totalAmount).toLocaleString() }}</span>
                </div>
                <div class="px-4 py-3 flex items-center justify-between border-t border-(--border)">
                  <span class="text-xs text-(--muted)">Payment status</span>
                  <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-(--success)">
                    <span class="w-1.5 h-1.5 rounded-full bg-(--success)"></span>
                    {{ selectedRental.paymentStatus }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Timeline -->
            <div class="mt-7">
              <h3 class="text-xs font-bold uppercase tracking-wider text-(--muted) mb-4">Timeline</h3>
              <div class="relative pl-6">
                <div class="absolute left-[5px] top-2 bottom-2 w-px bg-(--border)"></div>
                <div class="relative mb-6">
                  <div class="absolute -left-[25px] top-0.5 w-3 h-3 rounded-full bg-(--accent) ring-4 ring-(--accent)/20"></div>
                  <p class="text-sm font-semibold text-(--text)">Booking Created</p>
                  <p class="text-xs text-(--muted) mt-1">{{ formatDate(selectedRental.createdAt) }}</p>
                </div>
                <div class="relative">
                  <div class="absolute -left-[25px] top-0.5 w-3 h-3 rounded-full bg-(--accent) ring-4 ring-(--accent)/20"></div>
                  <p class="text-sm font-semibold text-(--text)">Rental Status</p>
                  <p class="text-xs text-(--muted) mt-1">{{ formatDate(selectedRental.endDate) }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Drawer Footer -->
          <div class="p-4 border-t border-(--border) bg-(--surface) flex gap-3">
            <button
              @click="handleAction('print')"
              class="flex-1 h-10 border border-(--border) rounded-lg text-sm font-semibold text-(--text) hover:bg-(--background) transition cursor-pointer"
            >
              <i class="fa-solid fa-print mr-1.5 text-xs text-(--muted)"></i> Print
            </button>
            <button
              @click="handleAction('invoice')"
              class="flex-1 h-10 bg-(--accent) text-(--background) rounded-lg text-sm font-semibold hover:bg-(--accent-hover) transition cursor-pointer"
            >
              <i class="fa-solid fa-file-invoice mr-1.5 text-xs"></i> Invoice
            </button>
          </div>
        </template>
      </aside>
    </template>
  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { getRentalHistory, getBookings, getVehicles } from '../api/history'

// Page State
const loading = ref(true)
const error = ref(null)

// Raw API Data Stores
const rentalStatistics = ref(null)
const rawHistoryData = ref([])
const rawVehiclesData = ref([])

// Filters and Selections
const searchQuery = ref('')
const selectedDateRange = ref('')
const selectedVehicle = ref('')
const selectedRental = ref(null)

// Pagination State
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Helper: Response Data Unwrapper
const unwrapData = (response) => {
  if (!response) return null
  if (Array.isArray(response)) return response
  if (response.data !== undefined) return response.data
  if (Array.isArray(response.content)) return response.content
  return response
}

// Helper: Extract Initials from Name
const getInitials = (name) => {
  if (!name) return 'CU'
  const parts = String(name).trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

// Helper: Format Date
const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A'
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  })
}

// Main Fetcher: Fetches History, Bookings, and Vehicles in Parallel
const fetchHistoryData = async () => {
  try {
    loading.value = true
    error.value = null

    const [historyRes, bookingRes, vehicleRes] = await Promise.all([
      getRentalHistory(),
      getBookings(),
      getVehicles()
    ])

    // 1. Process Dashboard Statistics
    const statisticsData = unwrapData(historyRes)
    rentalStatistics.value = statisticsData || {
      total: 0,
      completed: 0,
      revenue: 0,
      averageRating: 0,
      totalDaysRented: 0
    }

    // 2. Process All Vehicles
    const vehicleList = unwrapData(vehicleRes)
    rawVehiclesData.value = Array.isArray(vehicleList)
      ? vehicleList
      : vehicleList?.content || []

    // 3. Process History Table Records
    if (Array.isArray(statisticsData?.history) && statisticsData.history.length > 0) {
      rawHistoryData.value = statisticsData.history
    } else {
      const bookingData = unwrapData(bookingRes)
      const bookings = Array.isArray(bookingData)
        ? bookingData
        : bookingData?.content || []

      const completedOnly = bookings.filter(
        booking => String(booking.status || '').toUpperCase() === 'COMPLETED'
      )
      rawHistoryData.value = completedOnly.length > 0 ? completedOnly : bookings
    }
  } catch (err) {
    console.error('Failed to load rental history:', err)
    error.value =
      err.response?.data?.message ||
      err.response?.data?.msg ||
      'Failed to retrieve rental history records.'
  } finally {
    loading.value = false
  }
}

// Normalizer: Standardizes backend properties for Vue rendering
const normalizedRentals = computed(() => {
  if (!Array.isArray(rawHistoryData.value)) return []

  return rawHistoryData.value.map(item => {
    const id = item.bookingId || item.id || 'N/A'
    const customerName = item.customerName || item.user?.name || item.userName || item.customer?.name || 'Customer'
    const customerEmail = item.customerEmail || item.user?.email || item.customer?.email || 'customer@example.com'
    const vehicleName = item.vehicleName || item.vehicle?.model || item.vehicle?.name || `${item.vehicle?.brand?.brandName || ''} ${item.vehicle?.model || ''}`.trim() || 'Standard Vehicle'
    const plateNumber = item.plateNumber || item.vehicle?.licensePlate || item.vehicle?.plateNumber || 'N/A'
    const startDateValue = item.startDate || item.pickupDate || item.createdAt
    const endDateValue = item.endDate || item.returnDate

    const startDate = startDateValue ? new Date(startDateValue) : null
    const endDate = endDateValue ? new Date(endDateValue) : null

    let durationDays = Number(item.totalDays || item.durationDays || 0)
    if (durationDays <= 0 && startDate && endDate && !isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
      const diffTime = Math.abs(endDate - startDate)
      durationDays = Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 1)
    }

    const dateRange = startDate && endDate && !isNaN(startDate.getTime()) && !isNaN(endDate.getTime())
      ? `${startDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}`
      : 'N/A'

    const totalAmount = Number(item.totalPrice || item.totalAmount || item.amount || 0)

    return {
      id,
      customerName,
      customerEmail,
      customerInitials: getInitials(customerName),
      vehicleName,
      plateNumber,
      startDate: startDateValue,
      endDate: endDateValue,
      createdAt: item.createdAt || startDateValue,
      dateRange,
      durationDays,
      status: item.status || 'COMPLETED',
      paymentStatus: item.paymentStatus || item.payment?.status || 'Paid',
      totalAmount
    }
  })
})

// KPI Aggregation Computations
const kpis = computed(() => {
  const statistics = rentalStatistics.value
  if (!statistics) {
    return { totalRentals: 0, totalRevenue: 0, avgDuration: '0.0' }
  }

  const completed = Number(statistics.completed || 0)
  const revenue = Number(statistics.revenue || 0)
  const totalDays = Number(statistics.totalDaysRented || 0)

  const avgDuration = completed > 0 ? (totalDays / completed).toFixed(1) : '0.0'

  return {
    totalRentals: completed || normalizedRentals.value.length,
    totalRevenue: revenue,
    avgDuration
  }
})

// Dynamic Vehicle Dropdown Filter Options
const vehicleOptions = computed(() => {
  if (rawVehiclesData.value.length > 0) {
    const namesFromApi = rawVehiclesData.value
      .map(v => v.name || v.model || `${v.brand?.brandName || ''} ${v.model || ''}`.trim())
      .filter(Boolean)
    return [...new Set(namesFromApi)]
  }

  const namesFromHistory = normalizedRentals.value
    .map(rental => rental.vehicleName)
    .filter(Boolean)
  return [...new Set(namesFromHistory)]
})

// Filter Handler for Search and Vehicle Selection
const filteredRentals = computed(() => {
  return normalizedRentals.value.filter(rental => {
    const q = searchQuery.value.toLowerCase().trim()
    const matchesSearch = !q ||
      String(rental.id).toLowerCase().includes(q) ||
      rental.customerName.toLowerCase().includes(q) ||
      rental.vehicleName.toLowerCase().includes(q)

    const matchesVehicle = !selectedVehicle.value || rental.vehicleName === selectedVehicle.value
    return matchesSearch && matchesVehicle
  })
})

// Reset to page 1 when filtering
watch([searchQuery, selectedVehicle, selectedDateRange], () => {
  currentPage.value = 1
})

// PAGINATION COMPUTATIONS
const totalPages = computed(() => {
  return Math.ceil(filteredRentals.value.length / itemsPerPage.value) || 1
})

const paginatedRentals = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredRentals.value.slice(start, end)
})

const showingStart = computed(() => {
  if (filteredRentals.value.length === 0) return 0
  return (currentPage.value - 1) * itemsPerPage.value + 1
})

const showingEnd = computed(() => {
  return Math.min(currentPage.value * itemsPerPage.value, filteredRentals.value.length)
})

const openDetails = (rental) => {
  selectedRental.value = rental
}

const handleAction = (actionType) => {
  if (!selectedRental.value) return
  switch (actionType) {
    case 'invoice':
      alert(`Downloading invoice for #BK-${selectedRental.value.id}...`)
      break
    case 'print':
      window.print()
      break
  }
}

onMounted(fetchHistoryData)
</script>