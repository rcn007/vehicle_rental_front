<template>
  <main class="min-h-[calc(100vh-64px)] bg-slate-50 p-4 sm:p-6 lg:p-8">

    <!-- =========================================================
         PAGE HEADER
    ========================================================== -->
    <div class="max-w-[1600px] mx-auto mb-7">
      <div class="flex flex-col gap-1">

        <h1 class="text-3xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Rental History
        </h1>

        <p class="text-xl text-slate-900">
          View completed rental transactions and rental performance.
        </p>
      </div>
    </div>


    <!-- =========================================================
         LOADING STATE
    ========================================================== -->
    <div
      v-if="loading"
      class="max-w-[1600px] mx-auto bg-white border border-slate-200 rounded-2xl"
    >
      <div class="flex flex-col items-center justify-center py-24">
        <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <i class="fa-solid fa-circle-notch fa-spin text-slate-600"></i>
        </div>

        <p class="text-sm font-semibold text-slate-700">
          Loading rental history
        </p>

        <p class="text-xs text-slate-400 mt-1">
          Please wait while we retrieve the records.
        </p>
      </div>
    </div>


    <!-- =========================================================
         ERROR STATE
    ========================================================== -->
    <div
      v-else-if="error"
      class="max-w-[1600px] mx-auto bg-white border border-red-200 rounded-2xl"
    >
      <div class="flex flex-col items-center justify-center py-20 px-6 text-center">

        <div class="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <i class="fa-solid fa-triangle-exclamation text-red-500"></i>
        </div>

        <h3 class="text-base font-bold text-slate-900">
          Unable to load rental history
        </h3>

        <p class="text-sm text-slate-500 mt-1 max-w-md">
          {{ error }}
        </p>

        <button
          @click="fetchHistoryData"
          class="mt-5 inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition cursor-pointer"
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
          <div
            class="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition"
          >
            <div class="flex items-start justify-between">

              <div>
                 <span class="text-[#0f172a] text-[15px] font-bold uppercase tracking-wider"
            style="font-family: var(--font-heading);">
                  Total Rentals
                </span>

                <h2 class="text-2xl font-bold text-slate-900 mt-2">
                  {{ kpis.totalRentals.toLocaleString() }}
                </h2>

                <p class="text-xs text-slate-400 mt-1">
                  Completed rentals
                </p>
              </div>

              <div
                class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center"
              >
                <i class="fa-solid fa-car text-blue-600"></i>
              </div>

            </div>
          </div>


          <!-- Revenue -->
          <div
            class="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition"
          >
            <div class="flex items-start justify-between">

              <div>
                <span class="text-[#0f172a] text-[15px] font-bold uppercase tracking-wider"
            style="font-family: var(--font-heading);">
                  Total Revenue
                </span>

                <h2 class="text-2xl font-bold text-slate-900 mt-2">
                  ${{ Number(kpis.totalRevenue).toLocaleString() }}
                </h2>

                <p class="text-xs text-slate-400 mt-1">
                  From completed rentals
                </p>
              </div>

              <div
                class="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center"
              >
                <i class="fa-solid fa-dollar-sign text-emerald-600"></i>
              </div>

            </div>
          </div>


          <!-- Average Duration -->
          <div
            class="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition"
          >
            <div class="flex items-start justify-between">

              <div>
                <span class="text-[#0f172a] text-[15px] font-bold uppercase tracking-wider"
            style="font-family: var(--font-heading);">
                  Average Duration
                </span>

                <h2 class="text-2xl font-bold text-slate-900 mt-2">
                  {{ kpis.avgDuration }}
                  <span class="text-base font-semibold text-slate-500">
                    days
                  </span>
                </h2>

                <p class="text-xs text-slate-400 mt-1">
                  Average rental length
                </p>
              </div>

              <div
                class="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center"
              >
                <i class="fa-solid fa-clock text-violet-600"></i>
              </div>

            </div>
          </div>

        </div>


        <!-- =====================================================
             RENTAL HISTORY PANEL
        ====================================================== -->
        <section
          class="bg-white border border-slate-200 rounded-2xl overflow-hidden"
        >

          <!-- ===================================================
               PANEL HEADER & FILTERS
          ==================================================== -->
          <div class="px-5 sm:px-6 pt-5 pb-4">

            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

              <div>
                <h2 class="text-base font-bold text-slate-900">
                  Completed Rentals
                </h2>

                <p class="text-xs text-slate-500 mt-1">
                  Historical records of completed vehicle rentals.
                </p>
              </div>

              <div
                class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold w-fit"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
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
                  class="w-full h-10 pl-9 pr-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition"
                />
              </div>

              <!-- Date Filter -->
              <div class="relative">
                <select
                  v-model="selectedDateRange"
                  class="w-full lg:w-40 h-10 px-3 pr-8 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:bg-white focus:border-slate-400 cursor-pointer"
                >
                  <option value="">All Dates</option>
                  <option value="last-7">Last 7 Days</option>
                  <option value="last-30">Last 30 Days</option>
                  <option value="aug-2026">August 2026</option>
                </select>
              </div>

              <!-- Dynamic Vehicle Filter (Populated from getVehicles) -->
              <div class="relative">
                <select
                  v-model="selectedVehicle"
                  class="w-full lg:w-48 h-10 px-3 pr-8 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:bg-white focus:border-slate-400 cursor-pointer"
                >
                  <option value="">All Vehicles</option>
                  <option
                    v-for="vehicle in vehicleOptions"
                    :key="vehicle"
                    :value="vehicle"
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
          <div class="overflow-x-auto border-t border-slate-100">

            <table class="w-full min-w-[850px]">

              <!-- Table Head -->
              <thead>
                <tr class="bg-slate-50/70 border-b border-slate-200">
                  <th class="text-left px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Booking
                  </th>
                  <th class="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Customer
                  </th>
                  <th class="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Vehicle
                  </th>
                  <th class="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Rental Period
                  </th>
                  <th class="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Duration
                  </th>
                  <th class="text-right px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Amount
                  </th>
                </tr>
              </thead>


              <!-- Table Body -->
              <tbody class="divide-y divide-slate-100">

                <!-- Empty State -->
                <tr v-if="filteredRentals.length === 0">
                  <td colspan="6" class="px-6 py-16 text-center">
                    <div class="flex flex-col items-center">
                      <div class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                        <i class="fa-solid fa-folder-open text-slate-400"></i>
                      </div>
                      <p class="text-sm font-semibold text-slate-700">No rental records found</p>
                      <p class="text-xs text-slate-400 mt-1">Try changing your search or filters.</p>
                    </div>
                  </td>
                </tr>

                <!-- Rental Rows -->
                <tr
                  v-for="rental in filteredRentals"
                  :key="rental.id"
                  @click="openDetails(rental)"
                  class="group hover:bg-slate-50/80 cursor-pointer transition"
                >

                  <!-- Booking ID -->
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-blue-50 transition">
                        <i class="fa-solid fa-receipt text-xs text-slate-500 group-hover:text-blue-600"></i>
                      </div>
                      <div>
                        <div class="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition">
                          #BK-{{ rental.id }}
                        </div>
                        <div class="text-[11px] text-slate-400 mt-0.5">
                          {{ rental.status }}
                        </div>
                      </div>
                    </div>
                  </td>

                  <!-- Customer -->
                  <td class="px-4 py-4">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">
                        {{ rental.customerInitials }}
                      </div>
                      <div class="min-w-0">
                        <div class="text-sm font-semibold text-slate-800 truncate">
                          {{ rental.customerName }}
                        </div>
                        <div class="text-[11px] text-slate-400 truncate max-w-[180px]">
                          {{ rental.customerEmail }}
                        </div>
                      </div>
                    </div>
                  </td>

                  <!-- Vehicle -->
                  <td class="px-4 py-4">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
                        <i class="fa-solid fa-car text-xs text-slate-500"></i>
                      </div>
                      <div>
                        <div class="text-sm font-semibold text-slate-800">
                          {{ rental.vehicleName }}
                        </div>
                        <div class="text-[11px] text-slate-400">
                          {{ rental.plateNumber }}
                        </div>
                      </div>
                    </div>
                  </td>

                  <!-- Period -->
                  <td class="px-4 py-4">
                    <div class="text-sm font-medium text-slate-800">
                      {{ rental.dateRange }}
                    </div>
                    <div class="text-[11px] text-slate-400 mt-0.5">
                      Rental period
                    </div>
                  </td>

                  <!-- Duration -->
                  <td class="px-4 py-4">
                    <span class="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                      {{ rental.durationDays }} days
                    </span>
                  </td>

                  <!-- Amount -->
                  <td class="px-6 py-4 text-right">
                    <div class="text-sm font-bold text-slate-900">
                      ${{ Number(rental.totalAmount).toLocaleString() }}
                    </div>
                    <div class="text-[11px] text-emerald-600 font-medium mt-0.5">
                      {{ rental.paymentStatus }}
                    </div>
                  </td>

                </tr>

              </tbody>

            </table>

          </div>


          <!-- ===================================================
               TABLE FOOTER
          ==================================================== -->
          <div class="px-6 py-3.5 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p class="text-xs text-slate-500">
              Showing <span class="font-semibold text-slate-700">{{ filteredRentals.length }}</span>
              of <span class="font-semibold text-slate-700">{{ rawHistoryData.length }}</span>
              rental records
            </p>
            <div class="text-[11px] text-slate-400">
              Click a record to view details
            </div>
          </div>

        </section>

      </div>


      <!-- =======================================================
           BACKDROP
      ======================================================== -->
      <div
        v-if="selectedRental"
        @click="selectedRental = null"
        class="fixed inset-0 bg-slate-950/30 backdrop-blur-[2px] z-40"
      ></div>


      <!-- =======================================================
           DETAILS DRAWER
      ======================================================== -->
      <aside
        class="fixed top-0 right-0 bottom-0 w-full sm:w-[460px] bg-white z-50 shadow-2xl border-l border-slate-200 flex flex-col transition-transform duration-300"
        :class="selectedRental ? 'translate-x-0' : 'translate-x-full'"
      >
        <template v-if="selectedRental">

          <!-- Drawer Header -->
          <div class="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
            <div>
              <p class="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                Rental Record
              </p>
              <h2 class="text-lg font-bold text-slate-900 mt-0.5">
                #BK-{{ selectedRental.id }}
              </h2>
            </div>
            <button
              @click="selectedRental = null"
              class="w-9 h-9 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 flex items-center justify-center transition cursor-pointer"
            >
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <!-- Drawer Content -->
          <div class="flex-1 overflow-y-auto px-6 py-6">

            <!-- Status -->
            <div class="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-white flex items-center justify-center">
                  <i class="fa-solid fa-check text-emerald-600"></i>
                </div>
                <div>
                  <p class="text-xs text-emerald-700 font-medium">Rental Status</p>
                  <p class="text-sm font-bold text-emerald-800 mt-0.5">{{ selectedRental.status }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-[11px] text-emerald-600">Duration</p>
                <p class="text-sm font-bold text-emerald-800">{{ selectedRental.durationDays }} days</p>
              </div>
            </div>

            <!-- Customer Details -->
            <div class="mt-7">
              <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Customer</h3>
              <div class="flex items-center gap-3">
                <div class="w-11 h-11 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                  {{ selectedRental.customerInitials }}
                </div>
                <div>
                  <p class="text-sm font-bold text-slate-900">{{ selectedRental.customerName }}</p>
                  <p class="text-xs text-slate-500 mt-0.5">{{ selectedRental.customerEmail }}</p>
                </div>
              </div>
            </div>

            <!-- Vehicle Details -->
            <div class="mt-7">
              <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Vehicle</h3>
              <div class="flex items-center gap-3 p-4 border border-slate-200 rounded-xl">
                <div class="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
                  <i class="fa-solid fa-car text-slate-600"></i>
                </div>
                <div>
                  <p class="text-sm font-bold text-slate-900">{{ selectedRental.vehicleName }}</p>
                  <p class="text-xs text-slate-500 mt-1">
                    Plate: <span class="font-medium text-slate-700">{{ selectedRental.plateNumber }}</span>
                  </p>
                </div>
              </div>
            </div>

            <!-- Rental Period -->
            <div class="mt-7">
              <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Rental Period</h3>
              <div class="grid grid-cols-2 gap-3">
                <div class="p-3.5 border border-slate-200 rounded-xl">
                  <p class="text-[11px] text-slate-400">Start Date</p>
                  <p class="text-sm font-semibold text-slate-800 mt-1">{{ formatDate(selectedRental.startDate) }}</p>
                </div>
                <div class="p-3.5 border border-slate-200 rounded-xl">
                  <p class="text-[11px] text-slate-400">End Date</p>
                  <p class="text-sm font-semibold text-slate-800 mt-1">{{ formatDate(selectedRental.endDate) }}</p>
                </div>
              </div>
            </div>

            <!-- Payment -->
            <div class="mt-7">
              <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Payment</h3>
              <div class="border border-slate-200 rounded-xl overflow-hidden">
                <div class="px-4 py-3 bg-slate-50 flex items-center justify-between">
                  <span class="text-xs text-slate-500">Rental total</span>
                  <span class="text-lg font-bold text-slate-900">${{ Number(selectedRental.totalAmount).toLocaleString() }}</span>
                </div>
                <div class="px-4 py-3 flex items-center justify-between border-t border-slate-100">
                  <span class="text-xs text-slate-500">Payment status</span>
                  <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    {{ selectedRental.paymentStatus }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Timeline -->
            <div class="mt-7">
              <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Timeline</h3>
              <div class="relative pl-6">
                <div class="absolute left-[5px] top-2 bottom-2 w-px bg-slate-200"></div>
                <div class="relative mb-6">
                  <div class="absolute -left-[25px] top-0.5 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-blue-50"></div>
                  <p class="text-sm font-semibold text-slate-800">Booking Created</p>
                  <p class="text-xs text-slate-400 mt-1">{{ formatDate(selectedRental.createdAt) }}</p>
                </div>
                <div class="relative">
                  <div class="absolute -left-[25px] top-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-50"></div>
                  <p class="text-sm font-semibold text-slate-800">Rental Status</p>
                  <p class="text-xs text-slate-400 mt-1">{{ formatDate(selectedRental.endDate) }}</p>
                </div>
              </div>
            </div>

          </div>

          <!-- Drawer Footer -->
          <div class="p-4 border-t border-slate-200 bg-white flex gap-3">
            <button
              @click="handleAction('print')"
              class="flex-1 h-10 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            >
              <i class="fa-solid fa-print mr-1.5 text-xs"></i> Print
            </button>
            <button
              @click="handleAction('invoice')"
              class="flex-1 h-10 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition cursor-pointer"
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
import { ref, computed, onMounted } from 'vue'
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

// Helper: Response Data Unwrapper
const unwrapData = (response) => {
  if (!response) return null

  if (Array.isArray(response)) {
    return response
  }

  if (response.data !== undefined) {
    return response.data
  }

  if (Array.isArray(response.content)) {
    return response.content
  }

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
  if (isNaN(d.getTime())) {
    return dateStr
  }
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

    // Fetch history, bookings, and vehicle registry in 1 parallel request
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

    // 2. Process All Vehicles (from /vehicle/getAll)
    const vehicleList = unwrapData(vehicleRes)
    rawVehiclesData.value = Array.isArray(vehicleList)
      ? vehicleList
      : vehicleList?.content || []

    // 3. Process History Table Records
    if (Array.isArray(statisticsData?.history) && statisticsData.history.length > 0) {
      rawHistoryData.value = statisticsData.history
    } else {
      // Fallback: Use getBookings() response if statistics history array is empty
      const bookingData = unwrapData(bookingRes)
      const bookings = Array.isArray(bookingData)
        ? bookingData
        : bookingData?.content || []

      const completedOnly = bookings.filter(
        booking => String(booking.status || '').toUpperCase() === 'COMPLETED'
      )

      // Fallback to all bookings if no completed ones exist yet
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

// Normalizer: Standardizes backend properties for consistent Vue rendering
const normalizedRentals = computed(() => {
  if (!Array.isArray(rawHistoryData.value)) {
    return []
  }

  return rawHistoryData.value.map(item => {
    const id = item.bookingId || item.id || 'N/A'

    const customerName =
      item.customerName ||
      item.user?.name ||
      item.userName ||
      item.customer?.name ||
      'Customer'

    const customerEmail =
      item.customerEmail ||
      item.user?.email ||
      item.customer?.email ||
      'customer@example.com'

    const vehicleName =
      item.vehicleName ||
      item.vehicle?.model ||
      item.vehicle?.name ||
      `${item.vehicle?.brand?.brandName || ''} ${item.vehicle?.model || ''}`.trim() ||
      'Standard Vehicle'

    const plateNumber =
      item.plateNumber ||
      item.vehicle?.licensePlate ||
      item.vehicle?.plateNumber ||
      'N/A'

    const startDateValue =
      item.startDate ||
      item.pickupDate ||
      item.createdAt

    const endDateValue =
      item.endDate ||
      item.returnDate

    const startDate = startDateValue ? new Date(startDateValue) : null
    const endDate = endDateValue ? new Date(endDateValue) : null

    let durationDays = Number(
      item.totalDays ||
      item.durationDays ||
      0
    )

    if (
      durationDays <= 0 &&
      startDate &&
      endDate &&
      !isNaN(startDate.getTime()) &&
      !isNaN(endDate.getTime())
    ) {
      const diffTime = Math.abs(endDate - startDate)
      durationDays = Math.max(
        Math.ceil(diffTime / (1000 * 60 * 60 * 24)),
        1
      )
    }

    const dateRange =
      startDate && endDate && !isNaN(startDate.getTime()) && !isNaN(endDate.getTime())
        ? `${startDate.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit'
          })} - ${endDate.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit'
          })}`
        : 'N/A'

    const totalAmount = Number(
      item.totalPrice ||
      item.totalAmount ||
      item.amount ||
      0
    )

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
      paymentStatus:
        item.paymentStatus ||
        item.payment?.status ||
        'Paid',
      totalAmount
    }
  })
})

// KPI Aggregation Computations
const kpis = computed(() => {
  const statistics = rentalStatistics.value

  if (!statistics) {
    return {
      totalRentals: 0,
      totalRevenue: 0,
      avgDuration: '0.0'
    }
  }

  const completed = Number(statistics.completed || 0)
  const revenue = Number(statistics.revenue || 0)
  const totalDays = Number(statistics.totalDaysRented || 0)

  const avgDuration =
    completed > 0
      ? (totalDays / completed).toFixed(1)
      : '0.0'

  return {
    totalRentals: completed || normalizedRentals.value.length,
    totalRevenue: revenue,
    avgDuration
  }
})

// Dynamic Vehicle Dropdown Filter Options (Primary: getVehicles API, Fallback: History List)
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

    const matchesSearch =
      !q ||
      String(rental.id).toLowerCase().includes(q) ||
      rental.customerName.toLowerCase().includes(q) ||
      rental.vehicleName.toLowerCase().includes(q)

    const matchesVehicle =
      !selectedVehicle.value ||
      rental.vehicleName === selectedVehicle.value

    return matchesSearch && matchesVehicle
  })
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