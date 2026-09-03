<template>
  <main class="p-4 sm:p-6 md:p-8 bg-slate-50/50 min-h-screen text-slate-800">
    <!-- Header & Action Controls -->
    <header class="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4 pb-6 border-b border-slate-200/80">
      <div>
        <h1 class="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">Rental Analytics Report</h1>
        <p class="text-slate-500 text-xl mt-1 font-medium">Overview of fleet performance, booking metrics, and revenue trends</p>
      </div>

      <div class="flex flex-wrap items-center gap-2.5">
        <!-- Date Filter Dropdown -->
        <div class="relative min-w-40">
          <select 
            v-model="selectedPeriod"
            class="w-full h-10 pl-9 pr-8 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm appearance-none cursor-pointer transition-all"
          >
            <option value="Jan 2026">January 2026</option>
            <option value="Feb 2026">February 2026</option>
            <option value="Mar 2026">March 2026</option>
          </select>
          <i class="fa-regular fa-calendar absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
          <i class="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none"></i>
        </div>

        <!-- Action Buttons -->
        <button 
          @click="$emit('export-pdf')" 
          class="inline-flex items-center gap-2 h-10 px-3.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition-all shadow-sm active:scale-95"
        >
          <i class="fa-solid fa-file-pdf text-rose-500 text-xs"></i> 
          <span>PDF</span>
        </button>

        <button 
          @click="$emit('export-excel')" 
          class="inline-flex items-center gap-2 h-10 px-3.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition-all shadow-sm active:scale-95"
        >
          <i class="fa-solid fa-file-excel text-emerald-600 text-xs"></i> 
          <span>Excel</span>
        </button>

        <button 
          @click="$emit('print')" 
          class="w-10 h-10 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-600 transition-all shadow-sm flex items-center justify-center active:scale-95"
          title="Print Report"
        >
          <i class="fa-solid fa-print text-xs"></i>
        </button>
      </div>
    </header>

    <!-- KPI Summary Cards -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      
      <!-- Total Revenue -->
      <div class="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
        <div class="flex items-center justify-between mb-3">
          <span class="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total Revenue</span>
          <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
            <i class="fa-solid fa-dollar-sign"></i>
          </div>
        </div>
        <div class="flex items-baseline justify-between">
          <div class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">$124,500</div>
          <span class="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            <i class="fa-solid fa-arrow-trend-up text-[10px]"></i> +12.5%
          </span>
        </div>
        <p class="text-xs text-slate-400 mt-2 font-medium">vs. previous period ($110,600)</p>
      </div>

      <!-- Bookings -->
      <div class="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
        <div class="flex items-center justify-between mb-3">
          <span class="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total Bookings</span>
          <div class="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs">
            <i class="fa-regular fa-calendar-check"></i>
          </div>
        </div>
        <div class="flex items-baseline justify-between">
          <div class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">1,420</div>
          <span class="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
            <i class="fa-solid fa-arrow-trend-up text-[10px]"></i> +8.2%
          </span>
        </div>
        <p class="text-xs text-slate-400 mt-2 font-medium">104 avg. rentals / day</p>
      </div>

      <!-- Completion Rate -->
      <div class="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
        <div class="flex items-center justify-between mb-3">
          <span class="text-slate-500 text-xs font-semibold uppercase tracking-wider">Completed Trips</span>
          <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs">
            <i class="fa-solid fa-circle-check"></i>
          </div>
        </div>
        <div class="flex items-baseline justify-between">
          <div class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">1,280</div>
          <span class="text-xs font-semibold text-slate-500">90.1% Rate</span>
        </div>
        <div class="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
          <div class="bg-blue-600 h-full rounded-full transition-all duration-500" style="width: 90.1%"></div>
        </div>
      </div>

      <!-- Cancellations -->
      <div class="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
        <div class="flex items-center justify-between mb-3">
          <span class="text-slate-500 text-xs font-semibold uppercase tracking-wider">Cancelled</span>
          <div class="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center text-xs">
            <i class="fa-solid fa-circle-xmark"></i>
          </div>
        </div>
        <div class="flex items-baseline justify-between">
          <div class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">140</div>
          <span class="inline-flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
            9.9% Total
          </span>
        </div>
        <p class="text-xs text-rose-500 mt-2 font-semibold flex items-center gap-1">
          <i class="fa-solid fa-triangle-exclamation text-[10px]"></i> 12 pending review
        </p>
      </div>

    </section>

    <!-- Dynamic Charts Section -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      
      <!-- Interactive Revenue Area Chart -->
      <div class="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-6 flex flex-col justify-between">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-base font-bold text-slate-900">Revenue Trend</h2>
            <p class="text-xs text-slate-400 font-medium">Daily income over selected period</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center gap-1.5 text-xs text-slate-600 font-medium">
              <span class="w-2.5 h-2.5 rounded-full bg-indigo-600"></span> Revenue ($)
            </span>
          </div>
        </div>

        <!-- SVG Line/Area Chart -->
        <div class="relative w-full h-[240px] pt-4">
          <svg class="w-full h-full overflow-visible" viewBox="0 0 500 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#4F46E5" stop-opacity="0.25" />
                <stop offset="100%" stop-color="#4F46E5" stop-opacity="0.0" />
              </linearGradient>
            </defs>

            <!-- Grid Lines -->
            <line x1="0" y1="40" x2="500" y2="40" stroke="#F1F5F9" stroke-dasharray="4" />
            <line x1="0" y1="90" x2="500" y2="90" stroke="#F1F5F9" stroke-dasharray="4" />
            <line x1="0" y1="140" x2="500" y2="140" stroke="#F1F5F9" stroke-dasharray="4" />
            <line x1="0" y1="190" x2="500" y2="190" stroke="#E2E8F0" />

            <!-- Smooth Area Fill -->
            <path 
              :d="revenueAreaPath" 
              fill="url(#revenueGradient)" 
            />

            <!-- Smooth Trend Line -->
            <path 
              :d="revenueLinePath" 
              fill="none" 
              stroke="#4F46E5" 
              stroke-width="3" 
              stroke-linecap="round"
            />

            <!-- Interactive Data Points -->
            <g v-for="(point, idx) in revenueData" :key="idx">
              <circle
                :cx="point.x"
                :cy="point.y"
                r="4"
                class="fill-white stroke-indigo-600 stroke-[3] transition-all duration-200 cursor-pointer hover:r-6"
                @mouseenter="hoveredRevenueIndex = idx"
                @mouseleave="hoveredRevenueIndex = null"
              />
            </g>
          </svg>

          <!-- Floating Tooltip -->
          <div 
            v-if="hoveredRevenueIndex !== null"
            class="absolute pointer-events-none bg-slate-900 text-white text-xs py-1.5 px-3 rounded-lg shadow-xl -translate-x-1/2 -translate-y-full transition-all duration-150 z-10"
            :style="{ 
              left: `${(revenueData[hoveredRevenueIndex].x / 500) * 100}%`, 
              top: `${(revenueData[hoveredRevenueIndex].y / 200) * 100}%` 
            }"
          >
            <div class="font-semibold">{{ revenueData[hoveredRevenueIndex].label }}</div>
            <div class="text-indigo-300 font-bold">${{ revenueData[hoveredRevenueIndex].val.toLocaleString() }}</div>
          </div>
        </div>

        <!-- X-Axis Labels -->
        <div class="flex justify-between text-[11px] font-semibold text-slate-400 mt-2 px-1">
          <span v-for="(pt, i) in revenueData" :key="i">{{ pt.label }}</span>
        </div>
      </div>

      <!-- Interactive Booking Bar Chart -->
      <div class="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-6 flex flex-col justify-between">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-base font-bold text-slate-900">Booking Volume</h2>
            <p class="text-xs text-slate-400 font-medium">Rental transactions breakdown</p>
          </div>
          <span class="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
            Weekly Breakdown
          </span>
        </div>

        <!-- SVG Bar Chart -->
        <div class="relative w-full h-[240px] pt-4">
          <svg class="w-full h-full overflow-visible" viewBox="0 0 500 200" preserveAspectRatio="none">
            <!-- Grid Lines -->
            <line x1="0" y1="50" x2="500" y2="50" stroke="#F1F5F9" stroke-dasharray="4" />
            <line x1="0" y1="110" x2="500" y2="110" stroke="#F1F5F9" stroke-dasharray="4" />
            <line x1="0" y1="170" x2="500" y2="170" stroke="#E2E8F0" />

            <!-- Bars -->
            <g v-for="(item, idx) in bookingData" :key="idx">
              <!-- Background Hover Glow -->
              <rect
                :x="item.x - 18"
                y="10"
                width="36"
                height="160"
                fill="transparent"
                class="cursor-pointer"
                @mouseenter="hoveredBookingIndex = idx"
                @mouseleave="hoveredBookingIndex = null"
              />
              
              <!-- Active Bar -->
              <rect
                :x="item.x - 14"
                :y="170 - item.height"
                width="28"
                :height="item.height"
                rx="6"
                :class="hoveredBookingIndex === idx ? 'fill-indigo-600' : 'fill-slate-800'"
                class="transition-colors duration-200 cursor-pointer"
                @mouseenter="hoveredBookingIndex = idx"
                @mouseleave="hoveredBookingIndex = null"
              />
            </g>
          </svg>

          <!-- Floating Tooltip -->
          <div 
            v-if="hoveredBookingIndex !== null"
            class="absolute pointer-events-none bg-slate-900 text-white text-xs py-1.5 px-3 rounded-lg shadow-xl -translate-x-1/2 -translate-y-full transition-all duration-150 z-10"
            :style="{ 
              left: `${(bookingData[hoveredBookingIndex].x / 500) * 100}%`, 
              top: `${((170 - bookingData[hoveredBookingIndex].height) / 200) * 100}%` 
            }"
          >
            <div class="font-semibold">{{ bookingData[hoveredBookingIndex].label }}</div>
            <div class="text-emerald-400 font-bold">{{ bookingData[hoveredBookingIndex].val }} Rentals</div>
          </div>
        </div>

        <!-- X-Axis Labels -->
        <div class="flex justify-between text-[11px] font-semibold text-slate-400 mt-2 px-3">
          <span v-for="(item, idx) in bookingData" :key="idx">{{ item.label }}</span>
        </div>
      </div>

    </section>

    <!-- Bottom Section: Top Rented Vehicles Table & Category Performance -->
    <section class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Top Rented Vehicles Table (2 Columns) -->
      <div class="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between">
        <div>
          <div class="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 class="text-base font-bold text-slate-900">Top Performing Vehicles</h2>
              <p class="text-xs text-slate-400 font-medium">Most requested models this period</p>
            </div>
            <button class="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
              View All Fleet
            </button>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-slate-50/70 text-slate-400 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
                  <th class="py-3 px-6">Vehicle Details</th>
                  <th class="py-3 px-4">Rentals</th>
                  <th class="py-3 px-4">Revenue</th>
                  <th class="py-3 px-6">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-sm">
                <tr 
                  v-for="vehicle in vehicles" 
                  :key="vehicle.name"
                  class="hover:bg-slate-50/80 transition-colors group"
                >
                  <td class="py-3.5 px-6">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200/60 flex items-center justify-center text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-colors">
                        <i :class="vehicle.icon" class="text-xs"></i>
                      </div>
                      <div>
                        <span class="font-semibold text-slate-900 block leading-snug">{{ vehicle.name }}</span>
                        <span class="text-xs text-slate-400 font-medium">{{ vehicle.category }}</span>
                      </div>
                    </div>
                  </td>
                  <td class="py-3.5 px-4 font-semibold text-slate-700">{{ vehicle.rentals }}</td>
                  <td class="py-3.5 px-4 font-bold text-slate-900">${{ vehicle.revenue.toLocaleString() }}</td>
                  <td class="py-3.5 px-6">
                    <span 
                      class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                      :class="statusStyles[vehicle.status]"
                    >
                      <span class="w-1.5 h-1.5 rounded-full fill-current"></span>
                      {{ vehicle.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Category Performance Card (1 Column) -->
      <div class="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-6 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-5">
            <div>
              <h2 class="text-base font-bold text-slate-900">Fleet Share</h2>
              <p class="text-xs text-slate-400 font-medium">Demand by vehicle category</p>
            </div>
            <i class="fa-solid fa-chart-pie text-slate-300 text-sm"></i>
          </div>
          
          <div class="space-y-4">
            <div v-for="cat in categories" :key="cat.name" class="space-y-1.5">
              <div class="flex justify-between text-xs font-semibold">
                <span class="text-slate-700">{{ cat.name }}</span>
                <span class="text-slate-900 font-bold">{{ cat.percentage }}%</span>
              </div>
              <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  class="h-full rounded-full transition-all duration-500" 
                  :class="cat.color"
                  :style="{ width: `${cat.percentage}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 pt-4 border-t border-slate-100 bg-slate-50/50 -mx-6 -mb-6 p-4 rounded-b-2xl flex items-center justify-between">
          <span class="text-xs text-slate-500 font-medium">Most Popular:</span>
          <span class="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">Compact Cars (45%)</span>
        </div>
      </div>

    </section>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'

defineEmits(['export-pdf', 'export-excel', 'print'])

const selectedPeriod = ref('Jan 2026')

// Chart Hover States
const hoveredRevenueIndex = ref(null)
const hoveredBookingIndex = ref(null)

// Revenue Curve Data Points
const revenueData = ref([
  { label: 'Week 1', val: 24000, x: 20, y: 140 },
  { label: 'Week 2', val: 32500, x: 130, y: 95 },
  { label: 'Week 3', val: 28000, x: 240, y: 115 },
  { label: 'Week 4', val: 40000, x: 360, y: 45 },
  { label: 'Week 5', val: 46000, x: 480, y: 20 }
])

// SVG Path Generator for Smooth Curved Revenue Area
const revenueLinePath = computed(() => {
  const pts = revenueData.value
  return `M ${pts[0].x} ${pts[0].y} ` + 
    pts.slice(1).map((p, i) => {
      const prev = pts[i]
      const cx1 = prev.x + (p.x - prev.x) / 2
      const cy1 = prev.y
      const cx2 = prev.x + (p.x - prev.x) / 2
      const cy2 = p.y
      return `C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p.x} ${p.y}`
    }).join(' ')
})

const revenueAreaPath = computed(() => {
  const lastX = revenueData.value[revenueData.value.length - 1].x
  const firstX = revenueData.value[0].x
  return `${revenueLinePath.value} L ${lastX} 190 L ${firstX} 190 Z`
})

// Booking Volume Bar Chart Data
const bookingData = ref([
  { label: 'W1', val: 280, x: 50, height: 75 },
  { label: 'W2', val: 340, x: 150, height: 110 },
  { label: 'W3', val: 310, x: 250, height: 95 },
  { label: 'W4', val: 420, x: 350, height: 145 },
  { label: 'W5', val: 390, x: 450, height: 130 }
])

// Top Rented Vehicles List
const vehicles = ref([
  { name: 'Toyota Camry 2023', category: 'Sedan • Compact', rentals: 145, revenue: 8450, status: 'Active', icon: 'fa-solid fa-car' },
  { name: 'Ford Transit Van', category: 'Commercial • Cargo', rentals: 112, revenue: 12100, status: 'Active', icon: 'fa-solid fa-truck-ramp-box' },
  { name: 'Honda Civic 2022', category: 'Sedan • Compact', rentals: 98, revenue: 5200, status: 'Maintenance', icon: 'fa-solid fa-car-side' },
  { name: 'Tesla Model Y', category: 'Electric • SUV', rentals: 84, revenue: 9800, status: 'Active', icon: 'fa-solid fa-[#2563EB] fa-bolt' },
  { name: 'BMW 4 Series', category: 'Luxury • Convertible', rentals: 42, revenue: 6300, status: 'Out of Service', icon: 'fa-solid fa-car-rear' }
])

// Status Styling Lookup
const statusStyles = {
  'Active': 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
  'Maintenance': 'bg-amber-50 text-amber-700 border border-amber-200/60',
  'Out of Service': 'bg-rose-50 text-rose-700 border border-rose-200/60'
}

// Fleet Category Distribution
const categories = ref([
  { name: 'Compact Cars', percentage: 45, color: 'bg-indigo-600' },
  { name: 'SUVs & Crossovers', percentage: 30, color: 'bg-blue-500' },
  { name: 'Cargo Vans', percentage: 15, color: 'bg-slate-700' },
  { name: 'Luxury & Sports', percentage: 10, color: 'bg-emerald-500' }
])
</script>