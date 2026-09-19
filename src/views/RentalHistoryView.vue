<template>
  <div class="history-page min-h-screen bg-[#F4F6F9] text-[#1E293B] font-sans p-4 sm:p-6 lg:p-8 antialiased">
    <div class="max-w-[1240px] mx-auto space-y-6">

      <!-- BREADCRUMB & HEADER -->
      <header>
        <nav class="text-[11px] font-semibold text-[#94A3B8] mb-1 flex items-center gap-1.5">
          <span>Aurum VIP Concierge</span>
          <span>/</span>
          <span class="text-[#475569]">Rental History</span>
        </nav>

        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 class="text-2xl sm:text-3xl font-black tracking-tight text-[#0F172A]">
              Rental History
            </h1>
            <p class="text-xs text-[#64748B] mt-1 max-w-2xl leading-relaxed">
              View your completed and previous vehicle rentals with verified digital telemetry statements, audit-ready receipts, and fleet dispatch logs.
            </p>
          </div>

          <div class="flex items-center gap-2">
            <button type="button" class="px-3 py-2 rounded-lg bg-white border border-[#E2E8F0] text-[#334155] text-xs font-semibold shadow-sm flex items-center gap-2 hover:bg-[#F8FAFC] transition">
              <i class="fa-regular fa-calendar text-[#64748B]"></i>
              Tax Year {{ selectedYear === 'all' ? '2026' : selectedYear }}
            </button>
            <button type="button" @click="downloadAnnualStatement" class="px-3.5 py-2 rounded-lg bg-[#0F172A] text-white text-xs font-bold shadow-sm flex items-center gap-2 hover:bg-[#1E293B] transition">
              <i class="fa-solid fa-print text-[11px]"></i>
              Download Annual Statement
            </button>
          </div>
        </div>
      </header>

      <!-- METRICS DASHBOARD -->
      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- TOTAL RENTALS -->
        <div class="bg-white rounded-xl p-4 border border-[#E2E8F0] shadow-sm flex flex-col justify-between h-[108px] relative overflow-hidden">
          <div class="flex justify-between items-start">
            <span class="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">TOTAL RENTALS</span>
            <div class="w-7 h-7 rounded-lg bg-[#F1F5F9] flex items-center justify-center text-[#64748B]">
              <i class="fa-solid fa-car-side text-xs"></i>
            </div>
          </div>
          <div>
            <div class="text-2xl font-black text-[#0F172A] leading-none">{{ summary.totalRentals }} trips</div>
            <div class="text-[10px] font-semibold text-[#10B981] mt-1 flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span> 100% telemetry verified
            </div>
          </div>
        </div>

        <!-- COMPLETED -->
        <div class="bg-white rounded-xl p-4 border border-[#E2E8F0] shadow-sm flex flex-col justify-between h-[108px]">
          <div class="flex justify-between items-start">
            <span class="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">COMPLETED</span>
            <div class="w-7 h-7 rounded-lg bg-[#ECFDF5] flex items-center justify-center text-[#10B981]">
              <i class="fa-solid fa-circle-check text-xs"></i>
            </div>
          </div>
          <div>
            <div class="flex items-baseline justify-between">
              <span class="text-2xl font-black text-[#0F172A] leading-none">{{ completedCount }}</span>
              <span class="text-[10px] font-bold text-[#10B981]">{{ completedPercentage }}% SUCCESS</span>
            </div>
            <div class="w-full bg-[#E2E8F0] h-1.5 rounded-full mt-2 overflow-hidden">
              <div class="bg-[#10B981] h-full rounded-full transition-all duration-300" :style="{ width: `${completedPercentage}%` }"></div>
            </div>
          </div>
        </div>

        <!-- DAYS RENTED -->
        <div class="bg-white rounded-xl p-4 border border-[#E2E8F0] shadow-sm flex flex-col justify-between h-[108px]">
          <div class="flex justify-between items-start">
            <span class="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">DAYS RENTED</span>
            <div class="w-7 h-7 rounded-lg bg-[#F1F5F9] flex items-center justify-center text-[#64748B]">
              <i class="fa-regular fa-clock text-xs"></i>
            </div>
          </div>
          <div>
            <div class="text-2xl font-black text-[#0F172A] leading-none">{{ summary.totalDays }} Days</div>
            <div class="text-[10px] text-[#64748B] mt-1 font-medium">Avg. {{ averageDays }} days per booking</div>
          </div>
        </div>

        <!-- TOTAL SPENT -->
        <div class="bg-white rounded-xl p-4 border border-[#E2E8F0] shadow-sm flex flex-col justify-between h-[108px]">
          <div class="flex justify-between items-start">
            <span class="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">TOTAL SPENT</span>
            <div class="w-7 h-7 rounded-lg bg-[#0F172A] flex items-center justify-center text-white">
              <i class="fa-solid fa-wallet text-xs"></i>
            </div>
          </div>
          <div>
            <div class="text-2xl font-black text-[#0F172A] leading-none">${{ summary.totalSpent }}</div>
            <div class="mt-1">
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[#475569] text-[9px] font-bold">
                <i class="fa-solid fa-ribbon text-[8px] text-[#2563EB]"></i> Platinum Tier Member
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- FILTERS AND SEARCH -->
      <section class="bg-white border border-[#E2E8F0] rounded-xl p-3 shadow-sm flex flex-col md:flex-row gap-3 justify-between items-center">
        <!-- SEARCH -->
        <div class="relative w-full md:w-96">
          <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] text-xs"></i>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search rental by car model or booking ID..."
            class="w-full pl-9 pr-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#0F172A]"
          />
        </div>

        <div class="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          <!-- STATUS TABS -->
          <div class="flex items-center bg-[#F1F5F9] p-1 rounded-lg gap-1">
            <button
              v-for="tab in ['All', 'Completed', 'Cancelled']"
              :key="tab"
              @click="activeTab = tab"
              :class="[
                activeTab === tab ? 'bg-[#0F172A] text-white shadow-sm' : 'text-[#64748B] hover:text-[#0F172A]',
                'px-3 py-1 rounded-md text-[11px] font-bold transition cursor-pointer'
              ]"
            >
              {{ tab }} <span class="opacity-70">({{ getTabCount(tab) }})</span>
            </button>
          </div>

          <!-- YEAR SELECT -->
          <select v-model="selectedYear" class="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-1.5 text-xs font-semibold text-[#334155] focus:outline-none cursor-pointer">
            <option value="all">All Years</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
          </select>

          <!-- SORT -->
          <select v-model="sortBy" class="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-1.5 text-xs font-semibold text-[#334155] focus:outline-none cursor-pointer">
            <option value="recent">Most Recent</option>
            <option value="price">Price: High to Low</option>
          </select>
        </div>
      </section>

      <!-- RENTAL HISTORY CARDS LIST -->
      <section v-if="bookingStore.loading" class="bg-white rounded-xl p-12 border border-[#E2E8F0] text-center text-[#64748B]">
        <i class="fa-solid fa-circle-notch animate-spin text-xl text-[#0F172A] mb-2"></i>
        <p class="text-xs font-medium">Loading rental history...</p>
      </section>

      <section v-else-if="filteredBookings.length === 0" class="bg-white rounded-xl p-12 border border-[#E2E8F0] text-center text-[#64748B]">
        <p class="text-sm font-semibold">No rental history records found.</p>
      </section>

      <section v-else class="space-y-4">
        <article
          v-for="booking in paginatedBookings"
          :key="booking.id"
          class="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden"
        >
          <!-- CARD HEADER BAR -->
          <div class="bg-[#F8FAFC] px-4 py-2.5 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-2 text-[11px]">
            <div class="flex items-center gap-2">
              <span class="font-bold text-[#64748B] uppercase tracking-wider text-[10px]">BOOKING REF</span>
              <span class="font-black text-[#0F172A]">#VR-{{ String(booking.id).padStart(5, '0') }}</span>

              <!-- STATUS BADGE -->
              <span
                class="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wide border flex items-center gap-1"
                :class="isCancelled(booking.status) 
                  ? 'bg-red-50 text-red-600 border-red-200' 
                  : 'bg-emerald-50 text-emerald-600 border-emerald-200'"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
                {{ booking.status }}
              </span>

              <span class="text-[#64748B] font-semibold">
                • {{ isCancelled(booking.status) ? 'Refunded to Source' : `Paid - ${booking.paymentMethod}` }}
              </span>
            </div>

            <div class="text-[#94A3B8] font-medium text-[10px] flex items-center gap-1">
              <i class="fa-solid fa-shield-halved text-[9px]"></i>
              <span>{{ isCancelled(booking.status) ? 'Cancelled 48h prior • Zero penalty' : 'Telemetry Log: Closed Verified' }}</span>
            </div>
          </div>

          <!-- CARD CONTENT CONTAINER -->
          <div class="p-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            <!-- VEHICLE IMAGE & SPECS -->
            <div class="flex flex-col sm:flex-row items-center gap-4 flex-1">
              <div class="w-full sm:w-48 h-28 bg-[#F1F5F9] rounded-lg border border-[#E2E8F0] flex items-center justify-center p-2 relative shrink-0 overflow-hidden">
                <img
                  :src="getVehicleImageUrl(booking.image)"
                  :alt="booking.vehicleName"
                  @error="handleImageError"
                  class="max-h-full max-w-full object-contain drop-shadow-sm"
                />
                <span class="absolute bottom-1.5 left-1.5 text-[8px] font-extrabold uppercase bg-white/90 backdrop-blur-sm text-[#475569] px-1.5 py-0.5 rounded border border-[#E2E8F0]">
                  {{ isCancelled(booking.status) ? 'Voided Schedule' : (booking.fuelType || 'Executive') }}
                </span>
              </div>

              <div class="space-y-2 flex-1 w-full">
                <div>
                  <span class="text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider">
                    {{ booking.brand }} • {{ booking.transmission }}
                  </span>
                  <h2 class="text-base font-black text-[#0F172A] leading-tight">
                    {{ booking.vehicleName }}
                  </h2>
                </div>

                <!-- SPEC ATTRIBUTES -->
                <div v-if="!isCancelled(booking.status)" class="flex flex-wrap items-center gap-3 text-[10px] text-[#64748B] font-medium">
                  <span class="flex items-center gap-1"><i class="fa-solid fa-gears text-[#94A3B8]"></i> {{ booking.transmission }}</span>
                  <span class="flex items-center gap-1"><i class="fa-solid fa-user-group text-[#94A3B8]"></i> {{ booking.seats }} Seats</span>
                  <span v-if="booking.fuelType" class="flex items-center gap-1 text-[#10B981] font-semibold"><i class="fa-solid fa-leaf text-[#10B981]"></i> {{ booking.fuelType }}</span>
                </div>

                <!-- CANCELLED NOTE -->
                <div v-else class="text-[10px] text-[#64748B] bg-[#F8FAFC] p-2 rounded-lg border border-[#E2E8F0]">
                  <p class="font-semibold text-[#334155]">Full refund of ${{ Number(booking.totalPrice).toFixed(2) }} processed</p>
                  <p class="text-[9px] text-[#94A3B8] mt-0.5">Standard cancellation waiver honored under Platinum VIP mobility privileges.</p>
                </div>

                <!-- LOCATION & DATE INFORMATION -->
                <div v-if="!isCancelled(booking.status)" class="bg-[#F8FAFC] rounded-lg p-2.5 border border-[#E2E8F0] grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px]">
                  <div class="flex items-center gap-2">
                    <i class="fa-regular fa-calendar-check text-[#0F172A]"></i>
                    <div>
                      <span class="font-bold text-[#0F172A] block">{{ formatDate(booking.pickupDate) }} → {{ formatDate(booking.returnDate) }}</span>
                      <span class="text-[#94A3B8] text-[9px]">{{ booking.totalDays || 1 }} consecutive days</span>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <i class="fa-solid fa-location-dot text-[#0F172A]"></i>
                    <div>
                      <span class="font-bold text-[#0F172A] block">Main Concierge Hub</span>
                      <span class="text-[#94A3B8] text-[9px]">Keycard Terminal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- PRICE & ACTION BUTTONS -->
            <div class="flex flex-row lg:flex-col justify-between items-end gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#E2E8F0]">
              <div class="text-left lg:text-right">
                <span class="text-[9px] font-bold uppercase text-[#94A3B8] block">
                  {{ isCancelled(booking.status) ? 'ADJUSTED BALANCE' : 'TOTAL NET AMOUNT' }}
                </span>
                <div class="text-xl font-black text-[#0F172A] leading-tight">
                  ${{ Number(booking.totalPrice).toFixed(2) }}
                </div>
                <span class="text-[9px] font-medium text-[#94A3B8] block">
                  {{ isCancelled(booking.status) ? '$0.00 Net Outstanding' : 'incl. taxes & Full CDW' }}
                </span>
              </div>

              <!-- ACTION BUTTONS -->
              <div class="flex items-center gap-2">
                <button
                  v-if="!isCancelled(booking.status)"
                  type="button"
                  @click="downloadReceipt(booking.id)"
                  class="p-2 rounded-lg border border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC] text-xs transition cursor-pointer"
                  title="Download Statement"
                >
                  <i class="fa-solid fa-receipt"></i>
                </button>

                <button
                  v-if="!isCancelled(booking.status)"
                  type="button"
                  @click="rebookVehicle(booking)"
                  class="px-3 py-1.5 rounded-lg bg-[#F1F5F9] text-[#334155] text-xs font-bold hover:bg-[#E2E8F0] transition cursor-pointer"
                >
                  Book Again
                </button>

                <button
                  type="button"
                  @click="viewDetails(booking.id)"
                  :class="isCancelled(booking.status) ? 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]' : 'bg-[#0F172A] text-white hover:bg-[#1E293B]'"
                  class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  <span>{{ isCancelled(booking.status) ? 'Refund Receipt' : 'Details' }}</span>
                  <i class="fa-solid fa-chevron-right text-[9px]"></i>
                </button>
              </div>
            </div>
          </div>
        </article>

        <!-- PAGINATION CONTROLS -->
        <div v-if="filteredBookings.length > 0" class="bg-white border border-[#E2E8F0] rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-sm">
          <div class="text-[#64748B] text-[11px] font-medium">
            Showing <span class="font-bold text-[#0F172A]">{{ startIndex + 1 }}</span>
            to <span class="font-bold text-[#0F172A]">{{ endIndex }}</span>
            of <span class="font-bold text-[#0F172A]">{{ filteredBookings.length }}</span> rentals
          </div>

          <div class="flex items-center gap-3">
            <div class="flex items-center gap-1">
              <span class="text-[11px] text-[#64748B] font-medium">Per page:</span>
              <select v-model="itemsPerPage" class="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-2 py-1 text-xs font-bold text-[#0F172A] focus:outline-none cursor-pointer">
                <option :value="3">3</option>
                <option :value="5">5</option>
                <option :value="10">10</option>
              </select>
            </div>

            <div class="flex items-center gap-1">
              <button
                @click="currentPage--"
                :disabled="currentPage === 1"
                class="p-1.5 rounded-lg border border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC] disabled:opacity-40 disabled:hover:bg-transparent transition cursor-pointer"
              >
                <i class="fa-solid fa-chevron-left text-[10px]"></i>
              </button>

              <button
                v-for="page in totalPages"
                :key="page"
                @click="currentPage = page"
                :class="[
                  currentPage === page ? 'bg-[#0F172A] text-white shadow-sm' : 'text-[#64748B] hover:bg-[#F8FAFC]',
                  'w-7 h-7 rounded-lg text-xs font-bold transition flex items-center justify-center cursor-pointer'
                ]"
              >
                {{ page }}
              </button>

              <button
                @click="currentPage++"
                :disabled="currentPage === totalPages || totalPages === 0"
                class="p-1.5 rounded-lg border border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC] disabled:opacity-40 disabled:hover:bg-transparent transition cursor-pointer"
              >
                <i class="fa-solid fa-chevron-right text-[10px]"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBookingStore } from '../stores/Booking'

const router = useRouter()
const bookingStore = useBookingStore()

const activeTab = ref('All')
const searchQuery = ref('')
const selectedYear = ref('all')
const sortBy = ref('recent')

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(3)

const placeholderImage = 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&q=80'

const normalizeStatus = (status) => String(status || '').trim().toUpperCase()
const isCancelled = (status) => normalizeStatus(status) === 'CANCELLED'
const isCompleted = (status) => ['COMPLETED', 'FINISHED', 'RETURNED'].includes(normalizeStatus(status))

const formatDate = (date) => {
  if (!date) return '-'
  const parsedDate = new Date(date)
  if (Number.isNaN(parsedDate.getTime())) return date
  return parsedDate.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  })
}

const getBookingYear = (booking) => {
  const date = booking.pickupDate || booking.createdAt
  if (!date) return null
  const parsedDate = new Date(date)
  if (Number.isNaN(parsedDate.getTime())) return null
  return String(parsedDate.getFullYear())
}

const getVehicleImageUrl = (rawPath) => {
  if (!rawPath || typeof rawPath !== 'string') return placeholderImage
  const path = rawPath.trim()
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) return path
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `http://localhost:8080${cleanPath}`
}

const handleImageError = (event) => {
  if (event.target.dataset.fallback === 'true') return
  event.target.dataset.fallback = 'true'
  event.target.src = placeholderImage
}

const apiBookings = computed(() => {
  return (bookingStore.bookings || []).map((booking) => {
    const totalPrice = Number(booking.totalPrice ?? booking.total_price ?? 0)
    const totalDays = Number(booking.totalDays ?? booking.total_days ?? 0)
    const vehicleId = booking.vehicleId || booking.vehicle?.id

    return {
      id: booking.id,
      vehicleId,
      vehicleName: booking.vehicleName || booking.vehicle?.name || 'Vehicle Rental',
      brand: booking.brand || booking.vehicleBrand || booking.vehicle?.brand?.brandName || 'Executive Fleet',
      pickupDate: booking.pickupDate || booking.pickup_date || null,
      returnDate: booking.returnDate || booking.return_date || null,
      paymentMethod: booking.paymentMethod || booking.payment?.paymentMethod || booking.payment?.method || 'Card',
      totalPrice,
      totalDays,
      status: booking.status || 'UNKNOWN',
      image: booking.vehicleImage || booking.image || booking.vehicle?.mainImage || null,
      transmission: booking.transmission || booking.vehicle?.transmission || 'Automatic',
      seats: booking.seat || booking.seats || booking.vehicle?.seat || 4,
      fuelType: booking.fuelType || booking.fuel_type || booking.vehicle?.fuel_type || '',
      createdAt: booking.createdAt || booking.created_at || null
    }
  })
})

const displayBookings = computed(() => apiBookings.value)

const completedCount = computed(() => displayBookings.value.filter(b => isCompleted(b.status)).length)
const cancelledCount = computed(() => displayBookings.value.filter(b => isCancelled(b.status)).length)

const filteredBookings = computed(() => {
  let list = [...displayBookings.value]

  if (activeTab.value === 'Completed') list = list.filter(b => isCompleted(b.status))
  if (activeTab.value === 'Cancelled') list = list.filter(b => isCancelled(b.status))

  if (selectedYear.value !== 'all') {
    list = list.filter(b => getBookingYear(b) === String(selectedYear.value))
  }

  const query = searchQuery.value.trim().toLowerCase()
  if (query) {
    list = list.filter(b =>
      String(b.id || '').toLowerCase().includes(query) ||
      String(b.vehicleName || '').toLowerCase().includes(query) ||
      String(b.brand || '').toLowerCase().includes(query)
    )
  }

  if (sortBy.value === 'price') {
    list.sort((a, b) => Number(b.totalPrice) - Number(a.totalPrice))
  } else {
    list.sort((a, b) => Number(b.id || 0) - Number(a.id || 0))
  }

  return list
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredBookings.value.length / itemsPerPage.value)))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage.value, filteredBookings.value.length))
const paginatedBookings = computed(() => filteredBookings.value.slice(startIndex.value, endIndex.value))

const getTabCount = (tab) => {
  if (tab === 'Completed') return completedCount.value
  if (tab === 'Cancelled') return cancelledCount.value
  return displayBookings.value.length
}

const summary = computed(() => {
  const totalRentals = displayBookings.value.length
  const totalDays = displayBookings.value.reduce((sum, b) => sum + Number(b.totalDays || 0), 0)
  const totalSpent = displayBookings.value.reduce((sum, b) => isCancelled(b.status) ? sum : sum + Number(b.totalPrice || 0), 0)

  return {
    totalRentals,
    totalDays,
    totalSpent: totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }
})

const completedPercentage = computed(() => {
  const total = displayBookings.value.length
  if (!total) return 0
  return Math.round((completedCount.value / total) * 100)
})

const averageDays = computed(() => {
  const total = displayBookings.value.length
  if (!total) return '0.0'
  return (summary.value.totalDays / total).toFixed(1)
})

// Navigation Actions
const viewDetails = (bookingId) => {
  if (bookingId) router.push(`/booking/detail/${bookingId}`)
}

const rebookVehicle = (booking) => {
  if (booking?.vehicleId) router.push(`/booking/${booking.vehicleId}`)
}

const downloadReceipt = (bookingId) => {
  alert(`Downloading statement for Booking #VR-${String(bookingId).padStart(5, '0')}`)
}

const downloadAnnualStatement = () => {
  alert('Downloading annual tax and rental statement...')
}

watch([activeTab, searchQuery, selectedYear, sortBy, itemsPerPage], () => {
  currentPage.value = 1
})

onMounted(async () => {
  try {
    if (typeof bookingStore.fetchBookings === 'function') {
      await bookingStore.fetchBookings()
    } else if (typeof bookingStore.getMyBookings === 'function') {
      await bookingStore.getMyBookings()
    }
  } catch (error) {
    console.error('Failed to fetch rental history:', error)
  }
})
</script>