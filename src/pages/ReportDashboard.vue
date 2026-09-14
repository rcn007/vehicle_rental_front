<template>
  <main ref="reportContainer" class="p-4 sm:p-6 md:p-8 bg-slate-50/50 min-h-screen text-slate-800">
    <!-- Header & Action Controls -->
    <header class="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4 pb-6 border-b border-slate-200/80 print:hidden">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Rental Analytics Report</h1>
        <p class="text-sm text-slate-500 mt-1">Overview of fleet performance, booking metrics, and revenue trends</p>
      </div>

      <div class="flex flex-wrap items-center gap-2.5">
        <!-- Date Filter Dropdown -->
        <div class="relative min-w-[150px]">
<select
  v-model="selectedPeriod"
  class="w-full h-10 pl-3 pr-8 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm appearance-none cursor-pointer transition-all"
>
  <option value="weekly">Weekly</option>
  <option value="monthly">Monthly</option>
  <option value="yearly">Yearly</option>
</select>
          <i class="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none"></i>
        </div>

        <!-- PDF Export Button -->
        <button 
          @click="exportPdf" 
          :disabled="exportingPdf"
          class="inline-flex items-center gap-2 h-10 px-3.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition-all shadow-sm active:scale-95 cursor-pointer disabled:opacity-50"
        >
          <i v-if="exportingPdf" class="fa-solid fa-circle-notch fa-spin text-rose-500 text-xs"></i>
          <i v-else class="fa-solid fa-file-pdf text-rose-500 text-xs"></i> 
          <span>{{ exportingPdf ? 'Generating...' : 'PDF' }}</span>
        </button>

        <!-- Excel Export Button -->
        <button 
          @click="exportExcel" 
          class="inline-flex items-center gap-2 h-10 px-3.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          <i class="fa-solid fa-file-excel text-emerald-600 text-xs"></i> 
          <span>Excel</span>
        </button>

        <!-- Print Button -->
        <button 
          @click="printReport" 
          class="w-10 h-10 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-600 transition-all shadow-sm flex items-center justify-center active:scale-95 cursor-pointer"
          title="Print Report"
        >
          <i class="fa-solid fa-print text-xs"></i>
        </button>
      </div>
    </header>

    <!-- Printable Title Header (Only visible on Print/PDF) -->
    <div class="hidden print:block mb-6 border-b border-slate-300 pb-4">
      <h1 class="text-2xl font-bold text-slate-900">Rental Analytics Report</h1>
      <p class="text-xs text-slate-500">Generated on {{ new Date().toLocaleDateString() }} | Period: {{ selectedPeriod }}</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="py-24 text-center print:hidden">
      <i class="fa-solid fa-circle-notch fa-spin text-3xl text-indigo-600 mb-3"></i>
      <p class="text-slate-500 text-sm font-medium">Fetching report and fleet analytics...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="p-8 bg-white border border-rose-200 rounded-2xl text-center max-w-xl mx-auto shadow-sm print:hidden">
      <i class="fa-solid fa-triangle-exclamation text-rose-500 text-3xl mb-3"></i>
      <h3 class="text-slate-900 font-bold mb-1">Failed to load analytics</h3>
      <p class="text-slate-500 text-xs mb-4">{{ error }}</p>
      <button @click="fetchAnalyticsData" class="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer">
        Retry
      </button>
    </div>

    <!-- Dashboard Content -->
    <template v-else>
      <!-- KPI Summary Cards -->
      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        
        <!-- Total Revenue -->
        <div class="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-sm relative overflow-hidden">
          <div class="flex items-center justify-between mb-3">
              <span class="text-[#0f172a] text-[15px] font-bold uppercase tracking-wider"
            style="font-family: var(--font-heading);">Total Revenue</span>
            <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
              <i class="fa-solid fa-dollar-sign"></i>
            </div>
          </div>
          <div class="flex items-baseline justify-between">
            <div class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              ${{ computedKPIs.totalRevenue.toLocaleString() }}
            </div>
            <span class="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Live
            </span>
          </div>
          <p class="text-xs text-slate-400 mt-2 font-medium">Across {{ computedKPIs.totalBookings }} bookings</p>
        </div>

        <!-- Bookings -->
        <div class="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-sm relative overflow-hidden">
          <div class="flex items-center justify-between mb-3">
              <span class="text-[#0f172a] text-[15px] font-bold uppercase tracking-wider"
            style="font-family: var(--font-heading);">Total Bookings</span>
            <div class="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs">
              <i class="fa-regular fa-calendar-check"></i>
            </div>
          </div>
          <div class="flex items-baseline justify-between">
            <div class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {{ computedKPIs.totalBookings.toLocaleString() }}
            </div>
            <span class="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
              {{ computedKPIs.avgDailyRentals }} avg / day
            </span>
          </div>
          <p class="text-xs text-slate-400 mt-2 font-medium">Rental transactions volume</p>
        </div>

        <!-- Completion Rate -->
        <div class="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-sm relative overflow-hidden">
          <div class="flex items-center justify-between mb-3">
              <span class="text-[#0f172a] text-[15px] font-bold uppercase tracking-wider"
            style="font-family: var(--font-heading);">Completed Trips</span>
            <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs">
              <i class="fa-solid fa-circle-check"></i>
            </div>
          </div>
          <div class="flex items-baseline justify-between">
            <div class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {{ computedKPIs.completedTrips.toLocaleString() }}
            </div>
            <span class="text-xs font-semibold text-slate-500">{{ computedKPIs.completionRate }}% Rate</span>
          </div>
          <div class="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
            <div class="bg-blue-600 h-full rounded-full transition-all duration-500" :style="{ width: `${computedKPIs.completionRate}%` }"></div>
          </div>
        </div>

        <!-- Cancellations -->
        <div class="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-sm relative overflow-hidden">
          <div class="flex items-center justify-between mb-3">
              <span class="text-[#0f172a] text-[15px] font-bold uppercase tracking-wider"
            style="font-family: var(--font-heading);">Cancelled</span>
            <div class="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center text-xs">
              <i class="fa-solid fa-circle-xmark"></i>
            </div>
          </div>
          <div class="flex items-baseline justify-between">
            <div class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {{ computedKPIs.cancelledTrips.toLocaleString() }}
            </div>
            <span class="inline-flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
              {{ computedKPIs.cancellationRate }}% Total
            </span>
          </div>
          <p class="text-xs text-rose-500 mt-2 font-medium">
            {{ computedKPIs.pendingTrips }} active/pending trips
          </p>
        </div>

      </section>

      <!-- SVG Charts Section -->
      <section class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        <!-- Revenue Trend SVG Area Chart -->
        <div class="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-6 flex flex-col justify-between relative overflow-hidden">
          
          <!-- Chart Header & Granularity Toggle Buttons -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-base font-bold text-slate-900">Revenue Trend</h2>
                
              </div>
              <p class="text-xs text-slate-400 font-medium mt-0.5">Aggregated performance view</p>
            </div>

            <!-- Granularity Pill Switcher -->
            <div class="flex items-center p-1 bg-slate-100 rounded-xl">
              <button
                v-for="mode in ['weekly', 'monthly', 'yearly']"
                :key="mode"
                @click="trendGranularity = mode"
                :class="[
                  'px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer',
                  trendGranularity === mode
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                ]"
              >
                {{ mode }}
              </button>
            </div>
          </div>

          <!-- Chart Canvas Container -->
          <div class="relative w-full">
            <svg
              viewBox="0 0 500 200"
              class="w-full h-[230px] overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#4F46E5" stop-opacity="0.25" />
                  <stop offset="60%" stop-color="#4F46E5" stop-opacity="0.05" />
                  <stop offset="100%" stop-color="#4F46E5" stop-opacity="0" />
                </linearGradient>

                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#4F46E5" flood-opacity="0.25" />
                </filter>
              </defs>

              <!-- Grid Lines -->
              <line x1="0" y1="30" x2="500" y2="30" stroke="#F1F5F9" stroke-width="1.5" stroke-dasharray="4" />
              <line x1="0" y1="75" x2="500" y2="75" stroke="#F1F5F9" stroke-width="1.5" stroke-dasharray="4" />
              <line x1="0" y1="120" x2="500" y2="120" stroke="#F1F5F9" stroke-width="1.5" stroke-dasharray="4" />
              <line x1="0" y1="165" x2="500" y2="165" stroke="#E2E8F0" stroke-width="1.5" />

              <!-- Hover Vertical Guide Line -->
              <line
                v-if="hoveredRevenueIndex !== null && dynamicRevenueTrend[hoveredRevenueIndex]"
                :x1="dynamicRevenueTrend[hoveredRevenueIndex].x"
                y1="20"
                :x2="dynamicRevenueTrend[hoveredRevenueIndex].x"
                y2="165"
                stroke="#818CF8"
                stroke-width="1.5"
                stroke-dasharray="3 3"
                class="transition-all duration-150"
              />

              <!-- Area Fill -->
              <path
                v-if="dynamicRevenueTrend.length"
                :d="revenueAreaPath"
                fill="url(#revenueGradient)"
              />

              <!-- Trend Line -->
              <path
                v-if="dynamicRevenueTrend.length"
                :d="revenueLinePath"
                fill="none"
                stroke="#4F46E5"
                stroke-width="3"
                stroke-linecap="round"
                filter="url(#glow)"
              />

              <!-- Interactive Data Points -->
              <g v-for="(point, index) in dynamicRevenueTrend" :key="index">
                <circle
                  :cx="point.x"
                  :cy="point.y"
                  r="12"
                  fill="transparent"
                  class="cursor-pointer"
                  @mouseenter="hoveredRevenueIndex = index"
                  @mouseleave="hoveredRevenueIndex = null"
                />

                <circle
                  v-if="hoveredRevenueIndex === index"
                  :cx="point.x"
                  :cy="point.y"
                  r="8"
                  class="fill-indigo-500/20 stroke-indigo-500 stroke-1 animate-ping"
                />

                <circle
                  :cx="point.x"
                  :cy="point.y"
                  :r="hoveredRevenueIndex === index ? '6' : '4'"
                  class="fill-white stroke-indigo-600 stroke-[3] transition-all duration-200 pointer-events-none"
                />
              </g>
            </svg>

            <!-- Tooltip -->
            <transition
              enter-active-class="transition duration-150 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <div
                v-if="hoveredRevenueIndex !== null && dynamicRevenueTrend[hoveredRevenueIndex]"
                class="absolute pointer-events-none bg-slate-900/95 backdrop-blur-md text-white py-2 px-3 rounded-xl shadow-2xl border border-slate-700/60 -translate-x-1/2 -translate-y-full z-20 min-w-[120px]"
                :style="{
                  left: `${(dynamicRevenueTrend[hoveredRevenueIndex].x / 500) * 100}%`,
                  top: `${(dynamicRevenueTrend[hoveredRevenueIndex].y / 200) * 100 - 4}%`,
                }"
              >
                <div class="flex items-center justify-between gap-2 border-b border-slate-800 pb-1 mb-1">
                  <span class="text-[11px] font-medium text-slate-400">
                    {{ dynamicRevenueTrend[hoveredRevenueIndex].label }}
                  </span>
                  <span class="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                </div>

                <div class="text-xs font-bold text-white flex items-baseline gap-1">
                  <span class="text-indigo-400 font-medium">$</span>
                  {{ Number(dynamicRevenueTrend[hoveredRevenueIndex].val).toLocaleString() }}
                </div>

                <div class="text-[10px] text-slate-400 mt-1 flex items-center justify-between">
                  <span>Bookings:</span>
                  <span class="font-bold text-slate-200 bg-slate-800 px-1.5 py-0.5 rounded">
                    {{ dynamicRevenueTrend[hoveredRevenueIndex].bookings }}
                  </span>
                </div>
              </div>
            </transition>

            <!-- Labels -->
            <div class="flex justify-between text-[11px] font-semibold text-slate-400 mt-3 px-1">
              <span v-for="(point, index) in dynamicRevenueTrend" :key="index" class="hover:text-slate-600 transition-colors">
                {{ point.label }}
              </span>
            </div>
          </div>
        </div>

        <!-- Booking Volume SVG Bar Chart -->
        <div class="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-6 flex flex-col justify-between">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h2 class="text-base font-bold text-slate-900">Booking Volume</h2>
              <p class="text-xs text-slate-400 font-medium">Rental transactions breakdown</p>
            </div>
          </div>

          <div class="relative w-full h-[240px] pt-4">
            <svg class="w-full h-full overflow-visible" viewBox="0 0 500 200" preserveAspectRatio="none">
              <line x1="0" y1="50" x2="500" y2="50" stroke="#F1F5F9" stroke-dasharray="4" />
              <line x1="0" y1="110" x2="500" y2="110" stroke="#F1F5F9" stroke-dasharray="4" />
              <line x1="0" y1="170" x2="500" y2="170" stroke="#E2E8F0" />

              <g v-for="(item, idx) in dynamicBookingVolume" :key="idx">
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
                
                <rect
                  :x="item.x - 14"
                  :y="170 - item.height"
                  width="28"
                  :height="Math.max(item.height, 4)"
                  rx="4"
                  :class="hoveredBookingIndex === idx ? 'fill-indigo-600' : 'fill-slate-800'"
                  class="transition-colors duration-200 cursor-pointer"
                  @mouseenter="hoveredBookingIndex = idx"
                  @mouseleave="hoveredBookingIndex = null"
                />
              </g>
            </svg>

            <div 
              v-if="hoveredBookingIndex !== null && dynamicBookingVolume[hoveredBookingIndex]"
              class="absolute pointer-events-none bg-slate-900 text-white text-xs py-1.5 px-3 rounded-lg shadow-xl -translate-x-1/2 -translate-y-full transition-all duration-150 z-10 print:hidden"
              :style="{ 
                left: `${(dynamicBookingVolume[hoveredBookingIndex].x / 500) * 100}%`, 
                top: `${((170 - dynamicBookingVolume[hoveredBookingIndex].height) / 200) * 100}%` 
              }"
            >
              <div class="font-semibold">{{ dynamicBookingVolume[hoveredBookingIndex].label }}</div>
              <div class="text-emerald-400 font-bold">{{ dynamicBookingVolume[hoveredBookingIndex].val }} Rentals</div>
            </div>
          </div>

          <div class="flex justify-between text-[11px] font-semibold text-slate-400 mt-2 px-3">
            <span v-for="(item, idx) in dynamicBookingVolume" :key="idx">{{ item.label }}</span>
          </div>
        </div>

      </section>

      <!-- Bottom Tables & Categories -->
      <section class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Top Vehicles Table -->
        <div class="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div class="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 class="text-base font-bold text-slate-900">Top Performing Vehicles</h2>
                <p class="text-xs text-slate-400 font-medium">Most requested models in fleet service</p>
              </div>
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
                  <tr v-if="dynamicTopVehicles.length === 0">
                    <td colspan="4" class="py-8 text-center text-xs text-slate-400">No vehicles retrieved.</td>
                  </tr>
                  <tr 
                    v-else
                    v-for="v in dynamicTopVehicles" 
                    :key="v.id || v.name"
                    class="hover:bg-slate-50/80 transition-colors"
                  >
                    <td class="py-3.5 px-6">
                      <div class="flex items-center gap-3">
                        <div class="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200/60 flex items-center justify-center text-slate-600 shrink-0">
                          <i :class="v.icon" class="text-xs"></i>
                        </div>
                        <div>
                          <span class="font-semibold text-slate-900 block leading-snug">{{ v.name }}</span>
                          <span class="text-xs text-slate-400 font-medium">{{ v.category }}</span>
                        </div>
                      </div>
                    </td>
                    <td class="py-3.5 px-4 font-semibold text-slate-700">{{ v.rentals }}</td>
                    <td class="py-3.5 px-4 font-bold text-slate-900">${{ Number(v.revenue).toLocaleString() }}</td>
                    <td class="py-3.5 px-6">
                      <span 
                        class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                        :class="statusStyles[v.status] || 'bg-slate-100 text-slate-700'"
                      >
                        <span class="w-1.5 h-1.5 rounded-full fill-current bg-current"></span>
                        {{ v.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Category Fleet Share -->
        <div class="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-5">
              <div>
                <h2 class="text-base font-bold text-slate-900">Fleet Share</h2>
                <p class="text-xs text-slate-400 font-medium">Demand distribution by category</p>
              </div>
              <i class="fa-solid fa-chart-pie text-slate-300 text-sm"></i>
            </div>
            
            <div class="space-y-4">
              <div v-for="cat in dynamicFleetCategories" :key="cat.name" class="space-y-1.5">
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

              <div v-if="dynamicFleetCategories.length === 0" class="text-center py-6 text-xs text-slate-400">
                No category data available
              </div>
            </div>
          </div>

          <div class="mt-6 pt-4 border-t border-slate-100 bg-slate-50/50 -mx-6 -mb-6 p-4 rounded-b-2xl flex items-center justify-between">
            <span class="text-xs text-slate-500 font-medium">Most Popular:</span>
            <span class="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
              {{ topCategoryLabel }}
            </span>
          </div>
        </div>

      </section>
    </template>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { getReport, getVehicles, getBookings } from "../api/report";
import * as XLSX from "xlsx";
import html2pdf from "html2pdf.js";

/* =========================================================
   STATE & CONSTANTS
========================================================= */
const reportContainer = ref(null);
const selectedPeriod = ref("monthly");
const trendGranularity = ref("monthly"); // Controls Weekly / Monthly / Yearly button state
const loading = ref(true);
const error = ref(null);
const exportingPdf = ref(false);

const rawReportData = ref({});
const rawVehicles = ref([]);
const rawBookings = ref([]);

const hoveredRevenueIndex = ref(null);
const hoveredBookingIndex = ref(null);

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
  Maintenance: "bg-amber-50 text-amber-700 border border-amber-200/60",
  "Out of Service": "bg-rose-50 text-rose-700 border border-rose-200/60",
};

const CATEGORY_COLORS = [
  "bg-indigo-600",
  "bg-blue-500",
  "bg-slate-700",
  "bg-emerald-500",
  "bg-amber-500",
];

/* =========================================================
   DATA NORMALIZATION HELPERS
========================================================= */
const unwrapData = (res) => {
  if (!res) return [];
  if (Array.isArray(res)) return res;
  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res.data?.content)) return res.data.content;
  if (Array.isArray(res.content)) return res.content;
  if (Array.isArray(res.bookings)) return res.bookings;
  if (Array.isArray(res.vehicles)) return res.vehicles;
  if (Array.isArray(res.data?.bookings)) return res.data.bookings;
  if (Array.isArray(res.data?.vehicles)) return res.data.vehicles;
  if (res.data && typeof res.data === "object") return res.data;
  return res;
};

const getBookingAmount = (b) =>
  Number(b?.totalPrice ?? b?.totalAmount ?? b?.amount ?? b?.price ?? b?.rentalPrice ?? 0);

const getBookingStatus = (b) =>
  String(b?.status || b?.bookingStatus || b?.paymentStatus || "").toUpperCase();

const getBookingDate = (b) =>
  b?.createdAt || b?.bookingDate || b?.startDate || b?.date || b?.createdDate || null;

const normalizeVehicleStatus = (vehicle) => {
  const rawStatus = String(vehicle?.status || vehicle?.vehicleStatus || "").toUpperCase();
  if (rawStatus === "MAINTENANCE") return "Maintenance";
  if (rawStatus === "OUT_OF_SERVICE" || rawStatus === "OUT OF SERVICE") return "Out of Service";
  return "Active";
};

/* =========================================================
   API FETCHING
========================================================= */
const fetchAnalyticsData = async () => {
  try {
    loading.value = true;
    error.value = null;

    const [reportRes, vehiclesRes, bookingsRes] = await Promise.all([
      getReport(),
      getVehicles(),
      getBookings(),
    ]);

    rawReportData.value = unwrapData(reportRes) || {};
    const vehicles = unwrapData(vehiclesRes);
    const bookings = unwrapData(bookingsRes);

    rawVehicles.value = Array.isArray(vehicles) ? vehicles : [];
    rawBookings.value = Array.isArray(bookings) ? bookings : [];
  } catch (err) {
    console.error("Failed to fetch analytics:", err);
    error.value =
      err.response?.data?.message ||
      err.response?.data?.msg ||
      err.message ||
      "Failed to retrieve analytics report data.";
  } finally {
    loading.value = false;
  }
};

/* =========================================================
   COMPUTED ANALYTICS & KPIs
========================================================= */
const computedKPIs = computed(() => {
  const report = rawReportData.value && typeof rawReportData.value === "object" ? rawReportData.value : {};
  const bookings = Array.isArray(rawBookings.value) ? rawBookings.value : [];

  let totalRevenue = Number(report.totalRevenue ?? 0);
  let totalBookings = Number(report.totalBookings ?? report.bookingCount ?? bookings.length ?? 0);
  let completedTrips = Number(report.completedTrips ?? report.completedBookings ?? report.completedCount ?? 0);
  let cancelledTrips = Number(report.cancelledTrips ?? report.cancelledBookings ?? report.cancelledCount ?? 0);
  let pendingTrips = Number(report.pendingTrips ?? report.pendingBookings ?? report.pendingCount ?? 0);

  if (bookings.length > 0) {
    if (report.totalRevenue == null) {
      totalRevenue = bookings.reduce((sum, b) => sum + getBookingAmount(b), 0);
    }

    const missingCompleted = report.completedTrips == null && report.completedBookings == null;
    const missingCancelled = report.cancelledTrips == null && report.cancelledBookings == null;
    const missingPending = report.pendingTrips == null && report.pendingBookings == null;

    if (missingCompleted || missingCancelled || missingPending) {
      let cTrips = 0, canTrips = 0, pTrips = 0;
      bookings.forEach((b) => {
        const status = getBookingStatus(b);
        if (["COMPLETED", "COMPLETE", "RETURNED"].includes(status)) cTrips++;
        else if (["CANCELLED", "CANCELED", "REJECTED", "FAILED"].includes(status)) canTrips++;
        else if (["PENDING", "WAITING", "PROCESSING"].includes(status)) pTrips++;
      });

      if (missingCompleted) completedTrips = cTrips;
      if (missingCancelled) cancelledTrips = canTrips;
      if (missingPending) pendingTrips = pTrips;
    }
  }

  const completionRate = totalBookings > 0 ? ((completedTrips / totalBookings) * 100).toFixed(1) : "0.0";
  const cancellationRate = totalBookings > 0 ? ((cancelledTrips / totalBookings) * 100).toFixed(1) : "0.0";

  let periodDays = 30;
  if (selectedPeriod.value === "7D") periodDays = 7;
  else if (["12M", "ALL"].includes(selectedPeriod.value)) periodDays = 365;

  const avgDailyRentals = totalBookings > 0 ? Math.round(totalBookings / periodDays) : 0;

  return {
    totalRevenue,
    totalBookings,
    completedTrips,
    cancelledTrips,
    pendingTrips,
    completionRate,
    cancellationRate,
    avgDailyRentals,
  };
});

/* =========================================================
   DYNAMIC REVENUE & BOOKING CHARTS
========================================================= */
const revenueTrend = computed(() => {
  const report = rawReportData.value || {};

  // 1. Check if backend directly provides weekly, monthly, or yearly arrays
  if (trendGranularity.value === "weekly" && Array.isArray(report.weeklyData)) {
    return report.weeklyData.map(item => ({ label: item.label, revenue: Number(item.revenue) || 0, bookings: Number(item.bookings) || 0 }));
  }
  if (trendGranularity.value === "yearly" && Array.isArray(report.yearlyData)) {
    return report.yearlyData.map(item => ({ label: String(item.year || item.label), revenue: Number(item.revenue) || 0, bookings: Number(item.bookings) || 0 }));
  }
  if (trendGranularity.value === "monthly" && Array.isArray(report.monthlyData)) {
    return report.monthlyData.map(item => ({ label: item.month || item.label, revenue: Number(item.revenue) || 0, bookings: Number(item.bookings) || 0 }));
  }

  // 2. Otherwise calculate dynamically from raw bookings array
  const bookings = Array.isArray(rawBookings.value) ? rawBookings.value : [];
  if (bookings.length === 0) return [];

  const grouped = {};

  bookings.forEach((b) => {
    const dVal = getBookingDate(b);
    if (!dVal) return;
    const date = new Date(dVal);
    if (Number.isNaN(date.getTime())) return;

    let key = "";
    if (trendGranularity.value === "weekly") {
      const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
      const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
      const weekNum = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
      key = `W${weekNum}`;
    } else if (trendGranularity.value === "yearly") {
      key = `${date.getFullYear()}`;
    } else {
      key = date.toLocaleDateString(undefined, { month: "short" });
    }

    if (!grouped[key]) grouped[key] = { revenue: 0, count: 0 };
    grouped[key].revenue += getBookingAmount(b);
    grouped[key].count += 1;
  });

  return Object.entries(grouped).map(([label, data]) => ({
    label,
    revenue: data.revenue,
    bookings: data.count,
  }));
});
const getShortMonthLabel = (month) => {
  if (!month) return "";

  const monthMap = {
    January: "Jan",
    February: "Feb",
    March: "Mar",
    April: "Apr",
    May: "May",
    June: "Jun",
    July: "Jul",
    August: "Aug",
    September: "Sep",
    October: "Oct",
    November: "Nov",
    December: "Dec",
  };

  return monthMap[String(month).trim()] || String(month).slice(0, 3);
};

const dynamicRevenueTrend = computed(() => {
  const data = revenueTrend.value;
  if (!data.length) return [];

  const width = 500;
  const chartBottom = 190;
  const chartTop = 20;

  const maxRevenue = Math.max(...data.map((item) => item.revenue), 1);

  return data.map((item, index) => {
    const x = data.length === 1 ? width / 2 : (index / (data.length - 1)) * width;
    const y = chartBottom - (item.revenue / maxRevenue) * (chartBottom - chartTop);

    return {
      x,
      y,
      val: item.revenue,
label:
  trendGranularity.value === "monthly"
    ? getShortMonthLabel(item.label)
    : item.label,
      bookings: item.bookings,
    };
  });
});

const revenueLinePath = computed(() => {
  const points = dynamicRevenueTrend.value;
  if (!points || points.length === 0) return "";

  return (
    `M ${points[0].x} ${points[0].y} ` +
    points
      .slice(1)
      .map((point, index) => {
        const previous = points[index];
        const cx = previous.x + (point.x - previous.x) / 2;
        return `C ${cx} ${previous.y}, ${cx} ${point.y}, ${point.x} ${point.y}`;
      })
      .join(" ")
  );
});

const revenueAreaPath = computed(() => {
  const points = dynamicRevenueTrend.value;
  if (!points || points.length === 0) return "";

  const firstX = points[0].x;
  const lastX = points[points.length - 1].x;
  return `${revenueLinePath.value} L ${lastX} 190 L ${firstX} 190 Z`;
});

const dynamicBookingVolume = computed(() => {
  const report = rawReportData.value || {};

  if (Array.isArray(report.bookingVolume) && report.bookingVolume.length > 0) {
    const backendData = report.bookingVolume;
    const maxVal = Math.max(...backendData.map((i) => Number(i.val ?? i.value ?? i.count ?? i.bookings ?? 0)), 1);

    return backendData.map((item, index) => {
      const val = Number(item.val ?? item.value ?? item.count ?? item.bookings ?? 0);
      const x = item.x ?? (backendData.length === 1 ? 250 : (index / (backendData.length - 1)) * 400 + 50);
      const height = item.height ?? Math.round((val / maxVal) * 140);
      return { label: item.label || item.name || `W${index + 1}`, val, x, height };
    });
  }

  const list = Array.isArray(rawBookings.value) ? rawBookings.value : [];
  const buckets = [
    { label: "W1", val: 0, x: 50 },
    { label: "W2", val: 0, x: 150 },
    { label: "W3", val: 0, x: 250 },
    { label: "W4", val: 0, x: 350 },
    { label: "W5", val: 0, x: 450 },
  ];

  if (list.length > 0) {
    const chunkSize = Math.ceil(list.length / 5);
    buckets.forEach((bucket, index) => {
      bucket.val = list.slice(index * chunkSize, (index + 1) * chunkSize).length;
    });
  } else {
    const total = computedKPIs.value.totalBookings;
    buckets[0].val = Math.round(total * 0.18);
    buckets[1].val = Math.round(total * 0.24);
    buckets[2].val = Math.round(total * 0.20);
    buckets[3].val = Math.round(total * 0.26);
    buckets[4].val = Math.round(total * 0.12);
  }

  const maxVal = Math.max(...buckets.map((b) => b.val), 1);
  return buckets.map((bucket) => ({
    ...bucket,
    height: Math.round((bucket.val / maxVal) * 140),
  }));
});

/* =========================================================
   VEHICLES & CATEGORIES
========================================================= */
const dynamicTopVehicles = computed(() => {
  const vehicles = Array.isArray(rawVehicles.value) ? rawVehicles.value : [];
  const bookings = Array.isArray(rawBookings.value) ? rawBookings.value : [];

  return vehicles
    .map((vehicle) => {
      const vehicleId = vehicle?.id ?? vehicle?.vehicleId;
      const brandName = vehicle?.brand?.brandName || vehicle?.brand?.name || vehicle?.brandName || vehicle?.brand || "";
      const model = vehicle?.model || vehicle?.vehicleModel || "";
      const name = vehicle?.name || vehicle?.vehicleName || `${brandName} ${model}`.trim() || `Vehicle #${vehicleId}`;
      const category = vehicle?.categoryName || vehicle?.category?.name || vehicle?.category?.categoryName || vehicle?.category || "Standard";

      const vehicleBookings = bookings.filter((b) => {
        return (
          b?.vehicleId === vehicleId ||
          b?.vehicle?.id === vehicleId ||
          b?.vehicle?.vehicleId === vehicleId ||
          b?.vehicle?.vehicleId?.id === vehicleId
        );
      });

      let rentals = Number(vehicle?.rentalCount ?? vehicle?.totalRentals ?? vehicle?.rentals ?? 0);
      if (vehicleBookings.length > 0) rentals = vehicleBookings.length;

      let revenue = Number(vehicle?.totalRevenue ?? vehicle?.revenue ?? 0);
      if (vehicleBookings.length > 0) {
        revenue = vehicleBookings.reduce((sum, b) => sum + getBookingAmount(b), 0);
      }

      const status = normalizeVehicleStatus(vehicle);
      const icon = vehicle?.icon || vehicle?.vehicleTypeIcon || "fa-solid fa-car";

      return { id: vehicleId, name, category, rentals, revenue, status, icon };
    })
    .sort((a, b) => b.rentals - a.rentals || b.revenue - a.revenue)
    .slice(0, 5);
});

const dynamicFleetCategories = computed(() => {
  const report = rawReportData.value || {};

  if (Array.isArray(report.categories) && report.categories.length > 0) {
    return report.categories.map((category, index) => ({
      name: category.name || category.categoryName || "Unknown",
      percentage: Number(category.percentage ?? category.percent ?? category.share ?? 0),
      color: category.color || CATEGORY_COLORS[index % CATEGORY_COLORS.length],
    }));
  }

  const vehicles = Array.isArray(rawVehicles.value) ? rawVehicles.value : [];
  const categoryMap = {};
  let totalCount = 0;

  vehicles.forEach((vehicle) => {
    const category = vehicle?.categoryName || vehicle?.category?.name || vehicle?.category?.categoryName || vehicle?.category || "Standard Fleet";
    categoryMap[category] = (categoryMap[category] || 0) + 1;
    totalCount++;
  });

  const keys = Object.keys(categoryMap);
  if (keys.length === 0) return [];

  return keys
    .map((key, index) => ({
      name: key,
      percentage: totalCount > 0 ? Math.round((categoryMap[key] / totalCount) * 100) : 0,
      color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
    }))
    .sort((a, b) => b.percentage - a.percentage);
});

const topCategoryLabel = computed(() => {
  const list = dynamicFleetCategories.value;
  if (!list || list.length === 0) return "N/A";
  return `${list[0].name} (${list[0].percentage}%)`;
});

/* =========================================================
   EXPORT & PRINT ACTIONS
========================================================= */
const printReport = () => {
  window.print();
};

const exportPdf = async () => {
  if (!reportContainer.value) return;

  try {
    exportingPdf.value = true;
    const options = {
      margin: 0.3,
      filename: `rental_analytics_report_${new Date().toISOString().slice(0, 10)}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "landscape" },
    };

    await html2pdf().set(options).from(reportContainer.value).save();
  } catch (err) {
    console.error("PDF export failed:", err);
    alert("Failed to generate PDF file.");
  } finally {
    exportingPdf.value = false;
  }
};

const exportExcel = () => {
  try {
    const summaryData = [
      { Metric: "Total Revenue ($)", Value: computedKPIs.value.totalRevenue },
      { Metric: "Total Bookings", Value: computedKPIs.value.totalBookings },
      { Metric: "Completed Trips", Value: computedKPIs.value.completedTrips },
      { Metric: "Completion Rate (%)", Value: computedKPIs.value.completionRate },
      { Metric: "Cancelled Trips", Value: computedKPIs.value.cancelledTrips },
      { Metric: "Cancellation Rate (%)", Value: computedKPIs.value.cancellationRate },
      { Metric: "Pending Trips", Value: computedKPIs.value.pendingTrips },
      { Metric: "Average Daily Rentals", Value: computedKPIs.value.avgDailyRentals },
    ];

    const vehicleData = dynamicTopVehicles.value.map((v) => ({
      "Vehicle Name": v.name,
      Category: v.category,
      "Total Rentals": v.rentals,
      "Revenue Generated ($)": v.revenue,
      Status: v.status,
    }));

    const categoryData = dynamicFleetCategories.value.map((c) => ({
      "Category Name": c.name,
      "Fleet Share (%)": c.percentage,
    }));

    const revenueData = revenueTrend.value.map((r) => ({
      Period: r.label,
      "Revenue ($)": r.revenue,
    }));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(summaryData), "Executive Summary");
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(vehicleData), "Top Vehicles");
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(categoryData), "Fleet Share");
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(revenueData), "Revenue Trend");

    XLSX.writeFile(workbook, `rental_analytics_${new Date().toISOString().slice(0, 10)}.xlsx`);
  } catch (err) {
    console.error("Excel export failed:", err);
    alert("Failed to generate Excel sheet.");
  }
};

/* =========================================================
   LIFECYCLE HOOKS
========================================================= */
onMounted(() => {
  fetchAnalyticsData();
});
</script>