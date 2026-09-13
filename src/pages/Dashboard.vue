<template>
  <main 
    class="p-6 md:p-8 min-h-screen"
    style="background-color: var(--background); font-family: var(--font-body); color: var(--text);"
  >
    <!-- Page Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 
          class="text-3xl font-bold tracking-tight"
          style="font-family: var(--font-heading); color: var(--text);"
        >
          Dashboard Overview
        </h1>
        <p class="text-xl text-[#0f172a] mt-1" ">
          Welcome back! Here is your fleet's current status.
        </p>
      </div>
      <button 
        @click="$emit('export')"
        class="px-3.5 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90 flex items-center gap-2 cursor-pointer"
        style="background-color: var(--primary); border-radius: var(--radius-md); box-shadow: var(--shadow-sm);"
      >
        <i class="fa-solid fa-download text-xs"></i>
        <span>Export Report</span>
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="p-8 text-center text-sm font-semibold" style="color: var(--muted);">
      Loading dashboard...
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="p-4 mb-8 text-sm font-semibold rounded-md" style="background-color: #fef2f2; color: #dc2626;">
      {{ error }}
    </div>

    <!-- Dashboard Content -->
    <template v-else-if="dashboard">
      <!-- 4 KPI Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        
        <!-- Card 1: Total Users -->
        <div 
          class="p-5 border flex flex-col justify-between"
          style="background-color: var(--surface); border-color: var(--border); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm);"
        >
          <div class="flex items-center justify-between">
            <span 
              class="text-[15px] font-bold tracking-wider uppercase text-[#0f172a]" 
              style="font-family: var(--font-heading); "
            >
              Total Users
            </span>
            <div 
              class="w-7 h-7 flex items-center justify-center rounded-full"
              style="background-color: var(--background);"
            >
              <i class="fa-solid fa-users text-xs" style="color: var(--muted);"></i>
            </div>
          </div>
          <div class="mt-3">
            <div 
              class="text-2xl font-extrabold"
              style="font-family: var(--font-heading); color: var(--text);"
            >
              {{ dashboard.totalUser }}
            </div>
            <div
              class="mt-2 text-xs font-semibold flex items-center gap-1"
              :style="{
                color: dashboard.userGrowthPercentage >= 0
                  ? 'var(--success)'
                  : 'var(--danger)'
              }"
            >
              <i
                class="fa-solid text-[10px]"
                :class="
                  dashboard.userGrowthPercentage >= 0
                    ? 'fa-arrow-trend-up'
                    : 'fa-arrow-trend-down'
                "
              ></i>
              <span>
                {{ dashboard.userGrowthPercentage >= 0 ? '+' : '' }}
                {{ dashboard.userGrowthPercentage }}%
                <span class="font-normal" style="color: var(--muted);">
                  vs last month
                </span>
              </span>
            </div>
          </div>
        </div>

        <!-- Card 2: Total Vehicles -->
        <div 
          class="p-5 border flex flex-col justify-between"
          style="background-color: var(--surface); border-color: var(--border); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm);"
        >
          <div class="flex items-center justify-between">
            <span 
              class="text-[15px] font-bold tracking-wider uppercase text-[#0f172a]"
              style="font-family: var(--font-heading); "
            >
              Total Vehicles
            </span>
            <div 
              class="w-7 h-7 flex items-center justify-center rounded-full"
              style="background-color: var(--background);"
            >
              <i class="fa-solid fa-car text-xs" style="color: var(--muted);"></i>
            </div>
          </div>
          <div class="mt-3">
            <div 
              class="text-2xl font-extrabold"
              style="font-family: var(--font-heading); color: var(--text);"
            >
              {{ dashboard.totalVehicle }}
            </div>
            <div class="mt-2 text-xs font-medium" style="color: var(--muted);">
              <span class="font-bold" style="color: var(--text);">{{ dashboard.availableVehicle }}</span> available now
            </div>
          </div>
        </div>

        <!-- Card 3: Active Bookings -->
        <div 
          class="p-5 border flex flex-col justify-between"
          style="background-color: var(--surface); border-color: var(--border); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm);"
        >
          <div class="flex items-center justify-between">
            <span 
              class="text-[15px] font-bold tracking-wider uppercase text-[#0f172a]"
              style="font-family: var(--font-heading); "
            >
              Active Bookings
            </span>
            <div 
              class="w-7 h-7 flex items-center justify-center rounded-full"
              style="background-color: var(--background);"
            >
              <i class="fa-regular fa-calendar-check text-xs" style="color: var(--muted);"></i>
            </div>
          </div>
          <div class="mt-3">
            <div 
              class="text-2xl font-extrabold"
              style="font-family: var(--font-heading); color: var(--text);"
            >
              {{ dashboard.availableVehicle }}
            </div>
            <div class="mt-2 text-xs font-medium" style="color: var(--muted);">
              <span class="font-bold" style="color: var(--warning);">{{ dashboard.pendingBooking ?? 0 }}</span> pending approval
            </div>
          </div>
        </div>

        <!-- Card 4: Monthly Revenue -->
        <div 
          class="p-5 border flex flex-col justify-between"
          style="background-color: var(--surface); border-color: var(--border); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm);"
        >
          <div class="flex items-center justify-between">
            <span 
              class="text-[15px] font-bold tracking-wider uppercase text-[#0f172a]"
              style="font-family: var(--font-heading);"
            >
              Monthly Revenue
            </span>
            <div 
              class="w-7 h-7 flex items-center justify-center rounded-full"
              style="background-color: var(--background);"
            >
              <i class="fa-regular fa-money-bill-1 text-xs" style="color: var(--muted);"></i>
            </div>
          </div>
          <div class="mt-3">
            <div 
              class="text-2xl font-extrabold"
              style="font-family: var(--font-heading); color: var(--text);"
            >
              ${{ dashboard.monthlyRevenue }}
            </div>
            <div class="mt-2 text-xs font-semibold flex items-center gap-1" style="color: var(--success);">
              <i class="fa-solid fa-arrow-trend-up text-[10px]"></i>
              <span>
                {{ dashboard.revenueGrowthPercentage >= 0 ? '+' : '' }}{{ dashboard.revenueGrowthPercentage }}%
                <span class="font-normal" style="color: var(--muted);">
                  vs last month
                </span>
              </span>
            </div>
          </div>
        </div>

      </div>

      <!-- Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        <!-- SVG Revenue Overview Chart Card -->
        <div 
          class="p-6 border lg:col-span-2 flex flex-col justify-between"
          style="background-color: var(--surface); border-color: var(--border); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm);"
        >
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <h2 
              class="text-base font-bold text-[#0f172a]"
              style="font-family: var(--font-heading); "
            >
              Revenue Overview
            </h2>

            <!-- Timeframe Toggle Buttons -->
            <div 
              class="inline-flex items-center p-1 self-start sm:self-auto"
              style="background-color: var(--background); border: 1px solid var(--border); border-radius: var(--radius-md);"
            >
              <button
                type="button"
                @click="revenueTimeframe = 'week'"
                class="px-3 py-1.5 text-xs font-bold transition-all duration-200 cursor-pointer"
                :style="{
                  backgroundColor: revenueTimeframe === 'week' ? 'var(--surface)' : 'transparent',
                  color: revenueTimeframe === 'week' ? 'var(--primary)' : 'var(--muted)',
                  borderRadius: 'var(--radius-sm)',
                  boxShadow: revenueTimeframe === 'week' ? 'var(--shadow-sm)' : 'none'
                }"
              >
                Week
              </button>

              <button
                type="button"
                @click="revenueTimeframe = 'month'"
                class="px-3 py-1.5 text-xs font-bold transition-all duration-200 cursor-pointer"
                :style="{
                  backgroundColor: revenueTimeframe === 'month' ? 'var(--surface)' : 'transparent',
                  color: revenueTimeframe === 'month' ? 'var(--primary)' : 'var(--muted)',
                  borderRadius: 'var(--radius-sm)',
                  boxShadow: revenueTimeframe === 'month' ? 'var(--shadow-sm)' : 'none'
                }"
              >
                Month
              </button>

              <button
                type="button"
                @click="revenueTimeframe = 'year'"
                class="px-3 py-1.5 text-xs font-bold transition-all duration-200 cursor-pointer"
                :style="{
                  backgroundColor: revenueTimeframe === 'year' ? 'var(--surface)' : 'transparent',
                  color: revenueTimeframe === 'year' ? 'var(--primary)' : 'var(--muted)',
                  borderRadius: 'var(--radius-sm)',
                  boxShadow: revenueTimeframe === 'year' ? 'var(--shadow-sm)' : 'none'
                }"
              >
                Year
              </button>
            </div>
          </div>

          <!-- SVG Chart -->
          <div class="relative w-full h-56 mt-auto">
            <svg
              viewBox="0 0 800 220"
              class="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stop-color="var(--primary)" stop-opacity="0.15" />
                  <stop offset="95%" stop-color="var(--primary)" stop-opacity="0" />
                </linearGradient>
              </defs>

              <!-- Grid Lines -->
              <g stroke="var(--border, #e5e7eb)" stroke-width="1">
                <line x1="0" y1="20" x2="800" y2="20" stroke-dasharray="4" />
                <line x1="0" y1="80" x2="800" y2="80" stroke-dasharray="4" />
                <line x1="0" y1="140" x2="800" y2="140" stroke-dasharray="4" />
                <line x1="0" y1="200" x2="800" y2="200" />
              </g>

              <!-- Y-Axis Labels -->
              <g fill="var(--muted, #6b7280)" font-size="11" text-anchor="end">
                <text x="-5" y="24">{{ formatYAxisLabel(maxRevenueValue * 0.75) }}</text>
                <text x="-5" y="84">{{ formatYAxisLabel(maxRevenueValue * 0.5) }}</text>
                <text x="-5" y="144">{{ formatYAxisLabel(maxRevenueValue * 0.25) }}</text>
                <text x="-5" y="204">$0</text>
              </g>

              <!-- Dynamic Chart Paths -->
              <template v-if="currentRevenueData.length">
                <!-- Gradient Fill Area -->
                <path :d="revenueChartAreaPath" fill="url(#colorRevenue)" />

                <!-- Main Line -->
                <path
                  :d="revenueChartPath"
                  fill="none"
                  stroke="var(--primary)"
                  stroke-width="2.5"
                  stroke-linecap="round"
                />

                <!-- Data Points -->
                <g stroke="var(--primary)" stroke-width="2" fill="var(--surface, #ffffff)">
                  <circle
                    v-for="(point, index) in revenueChartPoints"
                    :key="index"
                    :cx="point.x"
                    :cy="point.y"
                    :r="index === revenueChartPoints.length - 1 ? 5 : 3.5"
                  />
                </g>
              </template>
            </svg>
          </div>

          <!-- Dynamic X-Axis Labels -->
          <div class="flex justify-between text-xs font-medium mt-3 px-2" style="color: var(--muted);">
            <span
              v-for="(item, index) in currentRevenueData"
              :key="index"
              :class="{
                'font-bold': index === currentRevenueData.length - 1
              }"
              :style="{ color: index === currentRevenueData.length - 1 ? 'var(--text)' : 'var(--muted)' }"
            >
              {{ item.label }}
            </span>
          </div>
        </div>

        <!-- Booking Status Donut Card -->
        <div
          class="p-6 border flex flex-col justify-between"
          style="
            background-color: var(--surface);
            border-color: var(--border);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-sm);
          "
        >
          <div>
            <h2
              class="text-base font-bold"
              style="
                font-family: var(--font-heading);
                color: var(--text);
              "
            >
              Booking Status
            </h2>

            <p
              class="text-xs mt-0.5"
              style="color: var(--muted);"
            >
              Current active cycle
            </p>
          </div>

          <!-- Donut -->
          <div class="flex justify-center my-6">
            <div
              class="w-36 h-36 rounded-full flex items-center justify-center relative"
              :style="{ background: bookingDonutGradient }"
            >
              <div
                class="w-28 h-28 rounded-full flex flex-col items-center justify-center text-center"
                style="background-color: var(--surface);"
              >
                <span
                  class="text-2xl font-extrabold"
                  style="
                    font-family: var(--font-heading);
                    color: var(--text);
                  "
                >
                  {{ totalBookings }}
                </span>

                <span
                  class="text-[9px] tracking-wider uppercase font-bold mt-0.5"
                  style="color: var(--muted);"
                >
                  Total Bookings
                </span>
              </div>
            </div>
          </div>

          <!-- Status percentages -->
          <div
            class="space-y-2 text-xs font-medium"
            style="color: var(--text);"
          >
            <!-- Confirmed -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span
                  class="w-2.5 h-2.5 rounded-full"
                  style="background-color: var(--primary);"
                ></span>

                <span style="color: var(--muted);">
                  Confirmed
                </span>
              </div>

              <span class="font-bold">
                {{ getBookingPercentage('CONFIRMED') }}%
              </span>
            </div>

            <!-- Active -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span
                  class="w-2.5 h-2.5 rounded-full"
                  style="background-color: var(--success);"
                ></span>

                <span style="color: var(--muted);">
                  Active
                </span>
              </div>

              <span class="font-bold">
                {{ getBookingPercentage('ACTIVE') }}%
              </span>
            </div>

            <!-- Pending -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span
                  class="w-2.5 h-2.5 rounded-full"
                  style="background-color: var(--warning);"
                ></span>

                <span style="color: var(--muted);">
                  Pending
                </span>
              </div>

              <span class="font-bold">
                {{ getBookingPercentage('PENDING') }}%
              </span>
            </div>
          </div>
        </div>

      </div>

      <!-- Recent Bookings Table -->
      <div 
        class="border overflow-hidden "
        style="background-color: var(--surface); border-color: var(--border); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm);"
      >
        <div 
          class="p-5 flex items-center justify-between border-b"
          style="border-color: var(--border);"
        >
          <div>
            <h2 
              class="text-base font-bold"
              style="font-family: var(--font-heading); color: var(--text);"
            >
              Recent Bookings
            </h2>
            <p class="text-xs mt-0.5" style="color: var(--muted);">
              Latest transactions from your customers
            </p>
          </div>
          <button 
            @click="$emit('view-all-bookings')" 
            class="text-xs font-bold hover:underline cursor-pointer"
            style="color: var(--accent);"
          >
            View All
          </button>
        </div>

        <div class="overflow-x-auto text-[#0f172a]">
          <table class="w-full text-left text-xs font-medium text-[#0f172a]">
            <thead 
              class="font-bold uppercase tracking-wider text-[10px] border-b "
              style="background-color: var(--background); border-color: var(--border); "
            >
              <tr>
                <th class="py-3.5 px-5 ">Booking ID</th>
                <th class="py-3.5 px-5">Customer</th>
                <th class="py-3.5 px-5">Vehicle</th>
                <th class="py-3.5 px-5">Dates</th>
                <th class="py-3.5 px-5">Status</th>
                <th class="py-3.5 px-5 text-right">Total</th>
              </tr>
            </thead>
            <tbody
              class="divide-y"
              style="border-color: var(--border);"
            >
              <!-- Dynamic Rows fetched from getBookings -->
              <tr
                v-for="booking in recentBookings"
                :key="booking.id"
                class="hover:opacity-80 transition-opacity"
              >
                <!-- Booking ID -->
                <td
                  class="py-3.5 px-5 font-bold"
                  style="font-family: var(--font-heading);"
                >
                  #BK-{{ booking.id }}
                </td>

                <!-- Customer -->
                <td class="py-3.5 px-5">
                  <div class="flex items-center gap-2.5">
                    <div
                      class="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold"
                      style="
                        background-color: var(--background);
                        color: var(--muted);
                      "
                    >
                      {{ getInitials(getCustomerName(booking)) }}
                    </div>

                    <span class="font-medium">
                      {{ getCustomerName(booking) }}
                    </span>
                  </div>
                </td>

                <!-- Vehicle -->
                <td
                  class="py-3.5 px-5"
                  style="color: var(--muted);"
                >
                  {{ getVehicleModel(booking) }}
                </td>

                <!-- Dates -->
                <td
                  class="py-3.5 px-5"
                  style="color: var(--muted);"
                >
                  {{ formatDateRange(booking.pickupDate || booking.startDate, booking.returnDate || booking.endDate) }}
                </td>

                <!-- Status -->
                <td class="py-3.5 px-5">
                  <span
                    class="px-2.5 py-1 text-[10px] font-bold inline-flex items-center gap-1.5"
                    :style="{
                      ...getStatusStyle(booking.status),
                      borderRadius: 'var(--radius-pill)'
                    }"
                  >
                    <span
                      class="w-1.5 h-1.5 rounded-full"
                      :style="{
                        backgroundColor: getStatusStyle(booking.status).color
                      }"
                    ></span>

                    {{ booking.status }}
                  </span>
                </td>

                <!-- Total -->
                <td
                  class="py-3.5 px-5 text-right font-bold"
                  style="font-family: var(--font-heading);"
                >
                  {{ formatCurrency(booking.totalPrice || booking.totalAmount || booking.total) }}
                </td>
              </tr>

              <!-- No bookings -->
              <tr v-if="!recentBookings.length">
                <td
                  colspan="6"
                  class="py-8 text-center"
                  style="color: var(--muted);"
                >
                  No recent bookings found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </main>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { getDashboard, getBookings } from '../api/dashboard';

defineEmits(['export', 'view-all-bookings']);

const dashboard = ref(null);
const bookingsList = ref([]);
const loading = ref(true);
const error = ref(null);
const revenueTimeframe = ref('month'); // 'week' | 'month' | 'year'

const fetchDashboardData = async () => {
  try {
    loading.value = true;
    error.value = null;

    // Fetch dashboard stats and full booking list simultaneously
    const [dashboardRes, bookingsRes] = await Promise.all([
      getDashboard(),
      getBookings()
    ]);

    dashboard.value = dashboardRes.data || dashboardRes;
    
    // Unwrap bookings payload
    const rawBookings = bookingsRes.data || bookingsRes;
    bookingsList.value = Array.isArray(rawBookings) ? rawBookings : (rawBookings.data || []);
  } catch (err) {
    console.error('Failed to fetch dashboard content:', err);
    error.value =
      err.response?.data?.message ||
      'Failed to load dashboard data';
  } stroke: {
    loading.value = false;
  }
};

onMounted(() => {
  fetchDashboardData();
});

// Computed recent bookings sorted by newest ID or creation, limited to 5-10 entries
const recentBookings = computed(() => {
  if (bookingsList.value.length) {
    return [...bookingsList.value]
      .sort((a, b) => (b.id || 0) - (a.id || 0))
      .slice(0, 5);
  }
  return dashboard.value?.recentBookingResponses || [];
});

// Helpers to extract nested or flat properties securely
const getCustomerName = (booking) => {
  return booking.customerName || booking.user?.fullName || booking.userName || booking.user?.name || 'Guest User';
};

const getVehicleModel = (booking) => {
  return booking.vehicleModel || booking.vehicle?.model || booking.vehicleName || 'Standard Fleet';
};

const currentRevenueData = computed(() => {
  const apiData = dashboard.value?.revenueResponses || [];
  
  if (revenueTimeframe.value === 'week') {
    return [
      { label: 'Mon', value: 1200 },
      { label: 'Tue', value: 1800 },
      { label: 'Wed', value: 1500 },
      { label: 'Thu', value: 2400 },
      { label: 'Fri', value: 3100 },
      { label: 'Sat', value: 4200 },
      { label: 'Sun', value: 3800 }
    ];
  } else if (revenueTimeframe.value === 'year') {
    return [
      { label: 'Jan', value: 18000 },
      { label: 'Feb', value: 22000 },
      { label: 'Mar', value: 25000 },
      { label: 'Apr', value: 21000 },
      { label: 'May', value: 28000 },
      { label: 'Jun', value: 32000 },
      { label: 'Jul', value: 35000 },
      { label: 'Aug', value: 30000 },
      { label: 'Sep', value: 29000 },
      { label: 'Oct', value: 34000 },
      { label: 'Nov', value: 38000 },
      { label: 'Dec', value: 42000 }
    ];
  } else {
    if (apiData.length) {
      return apiData.map(item => ({
        label: getMonthName(item.month),
        value: Number(item.revenue || item.total || 0)
      }));
    }
    return [
      { label: 'May', value: 12000 },
      { label: 'Jun', value: 15000 },
      { label: 'Jul', value: 14000 },
      { label: 'Aug', value: 19000 },
      { label: 'Sep', value: 22000 },
      { label: 'Oct', value: 25000 }
    ];
  }
});

const maxRevenueValue = computed(() => {
  const values = currentRevenueData.value.map(d => d.value);
  const max = Math.max(...values, 1000);
  return Math.ceil(max / 10000) * 10000 || 30000;
});

const formatYAxisLabel = (val) => {
  if (val >= 1000) {
    return `$${(val / 1000).toFixed(0)}k`;
  }
  return `$${val}`;
};

const revenueChartPoints = computed(() => {
  const data = currentRevenueData.value;
  if (!data.length) return [];

  const svgWidth = 800;
  const svgHeight = 200;
  const paddingX = 10;
  const usableWidth = svgWidth - paddingX * 2;
  const maxVal = maxRevenueValue.value;

  return data.map((item, index) => {
    const x = paddingX + (index / (data.length - 1 || 1)) * usableWidth;
    const y = svgHeight - (item.value / maxVal) * svgHeight;
    return { x, y, value: item.value };
  });
});

const revenueChartPath = computed(() => {
  const points = revenueChartPoints.value;
  if (!points.length) return '';

  return points.reduce((acc, point, index) => {
    return index === 0 ? `M ${point.x},${point.y}` : `${acc} L ${point.x},${point.y}`;
  }, '');
});

const revenueChartAreaPath = computed(() => {
  const points = revenueChartPoints.value;
  if (!points.length) return '';

  const first = points[0];
  const last = points[points.length - 1];
  const linePath = revenueChartPath.value;

  return `${linePath} L ${last.x},220 L ${first.x},220 Z`;
});

const getMonthName = (monthNum) => {
  const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[Number(monthNum)] || monthNum || '';
};

const bookingData = computed(() => {
  return dashboard.value?.bookingStatisticResponses || [];
});

const totalBookings = computed(() => {
  return bookingData.value.reduce(
    (total, item) => total + Number(item.count || 0),
    0
  );
});

const getBookingCount = (status) => {
  const item = bookingData.value.find(
    item => String(item.status).toUpperCase() === status
  );
  return Number(item?.count || 0);
};

const getBookingPercentage = (status) => {
  if (!totalBookings.value) return 0;
  return Math.round(
    (getBookingCount(status) / totalBookings.value) * 100
  );
};

const bookingDonutGradient = computed(() => {
  const confirmed = getBookingPercentage('CONFIRMED');
  const active = getBookingPercentage('ACTIVE');

  const confirmedEnd = confirmed;
  const activeEnd = confirmed + active;

  return `
    conic-gradient(
      var(--primary) 0% ${confirmedEnd}%,
      var(--success) ${confirmedEnd}% ${activeEnd}%,
      var(--warning) ${activeEnd}% 100%
    )
  `;
});

const getInitials = (name) => {
  if (!name) return '--';
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .substring(0, 2)
    .toUpperCase();
};

const formatDate = (date) => {
  if (!date) return '-';
  const parsedDate = new Date(date);
  return parsedDate.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit'
  });
};

const formatDateRange = (pickupDate, returnDate) => {
  return `${formatDate(pickupDate)} - ${formatDate(returnDate)}`;
};

const formatCurrency = (amount) => {
  return `$${Number(amount || 0).toFixed(2)}`;
};

const getStatusStyle = (status) => {
  switch (String(status).toUpperCase()) {
    case 'PENDING':
      return {
        backgroundColor: '#fffbeb',
        color: 'var(--warning)'
      };
    case 'CONFIRMED':
      return {
        backgroundColor: '#f0f9ff',
        color: 'var(--primary)'
      };
    case 'ACTIVE':
      return {
        backgroundColor: '#ecfdf5',
        color: 'var(--success)'
      };
    case 'COMPLETED':
      return {
        backgroundColor: '#f0fdf4',
        color: 'var(--success)'
      };
    case 'CANCELLED':
      return {
        backgroundColor: '#fef2f2',
        color: 'var(--danger)'
      };
    default:
      return {
        backgroundColor: 'var(--background)',
        color: 'var(--muted)'
      };
  }
};
</script>