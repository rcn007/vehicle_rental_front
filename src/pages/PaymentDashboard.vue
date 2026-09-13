<template>
  <main class="min-h-[calc(100vh-64px)] bg-[#F8FAFC] p-4 sm:p-6">

    <!-- PAGE HEADER -->
    <section class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div class="mb-1 flex items-center gap-2">
          <h1 class="text-3xl font-bold tracking-tight text-slate-900">
            Payments
          </h1>
        </div>
        <p class="text-xl text-gray-900">
          Monitor rental payments and transaction activity.
        </p>
      </div>

      <button
        @click="exportReport"
        class="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-gray-900 px-4 text-sm font-semibold text-white shadow-sm transition hover:border-slate-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 active:scale-95 cursor-pointer"
      >
        <i class="fa-solid fa-download text-xs text-slate-400"></i>
        Export Report
      </button>
    </section>

    <!-- KPI CARDS -->
    <section class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

      <!-- Total Revenue -->
      <div class="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div class="mb-4 flex items-start justify-between">
          <div>
            <span class="text-[#0f172a] text-[15px] font-bold uppercase tracking-wider"
            style="font-family: var(--font-heading);">
              Total Revenue
          </span>
            <h2 class="mt-2 text-2xl font-bold tracking-tight text-slate-900">
              ${{ stats.totalRevenue.toLocaleString() }}
            </h2>
          </div>
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <i class="fa-solid fa-dollar-sign text-sm"></i>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700">
            <i class="fa-solid fa-arrow-up text-[9px]"></i>
            Live
          </span>
          <span class="text-xs text-slate-400">{{ payments.length }} transactions</span>
        </div>
      </div>

      <!-- Paid -->
      <div class="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div class="mb-4 flex items-start justify-between">
          <div>
             <span class="text-[#0f172a] text-[15px] font-bold uppercase tracking-wider"
            style="font-family: var(--font-heading);">
              Paid
            </span>
            <h2 class="mt-2 text-2xl font-bold tracking-tight text-slate-900">
              ${{ stats.paidTotal.toLocaleString() }}
            </h2>
          </div>
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <i class="fa-solid fa-circle-check text-sm"></i>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs font-medium text-emerald-600">{{ stats.paidPct }}%</span>
          <span class="text-xs text-slate-400">of total revenue</span>
        </div>
      </div>

      <!-- Pending -->
      <div class="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div class="mb-4 flex items-start justify-between">
          <div>
            <span class="text-[#0f172a] text-[15px] font-bold uppercase tracking-wider"
            style="font-family: var(--font-heading);">
              Pending
            </span>
            <h2 class="mt-2 text-2xl font-bold tracking-tight text-slate-900">
              ${{ stats.pendingTotal.toLocaleString() }}
            </h2>
          </div>
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
            <i class="fa-solid fa-clock text-sm"></i>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs font-medium text-amber-600">{{ stats.pendingPct }}%</span>
          <span class="text-xs text-slate-400">awaiting payment</span>
        </div>
      </div>

      <!-- Failed -->
      <div class="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div class="mb-4 flex items-start justify-between">
          <div>
           <span class="text-[#0f172a] text-[15px] font-bold uppercase tracking-wider"
            style="font-family: var(--font-heading);">
              Failed
            </span>
            <h2 class="mt-2 text-2xl font-bold tracking-tight text-slate-900">
              ${{ stats.failedTotal.toLocaleString() }}
            </h2>
          </div>
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
            <i class="fa-solid fa-circle-xmark text-sm"></i>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs font-medium text-red-600">{{ stats.failedPct }}%</span>
          <span class="text-xs text-slate-400">of total revenue</span>
        </div>
      </div>

      <!-- Refunded -->
      <div class="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div class="mb-4 flex items-start justify-between">
          <div>
           <span class="text-[#0f172a] text-[15px] font-bold uppercase tracking-wider"
            style="font-family: var(--font-heading);">
              Refunded
            </span>
            <h2 class="mt-2 text-2xl font-bold tracking-tight text-slate-900">
              ${{ stats.refundedTotal.toLocaleString() }}
            </h2>
          </div>
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
            <i class="fa-solid fa-rotate-left text-sm"></i>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs font-medium text-slate-600">{{ stats.refundedPct }}%</span>
          <span class="text-xs text-slate-400">of total revenue</span>
        </div>
      </div>

    </section>

    <!-- ANALYTICS -->
    <section class="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3">

      <!-- DYNAMIC REVENUE GRAPH -->
      <div class="xl:col-span-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        
        <!-- Chart Header -->
        <div class="flex flex-col gap-4 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 class="text-base font-bold text-slate-900">Revenue Overview</h2>
            <div class="mt-1 flex items-center gap-2">
              <span class="text-xl font-bold text-slate-900">${{ stats.totalRevenue.toLocaleString() }}</span>
              <span class="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700">
                <i class="fa-solid fa-arrow-up text-[8px]"></i>
                Realtime
              </span>
            </div>
          </div>

          <!-- Time Period Selectors -->
          <div class="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1">
            <button 
              @click="selectedPeriod = '7D'" 
              :class="selectedPeriod === '7D' ? 'bg-white text-slate-900 font-semibold shadow-sm' : 'text-slate-500 font-medium hover:text-slate-700'"
              class="rounded-md px-3 py-1.5 text-xs transition cursor-pointer"
            >
              7D
            </button>
            <button 
              @click="selectedPeriod = '30D'" 
              :class="selectedPeriod === '30D' ? 'bg-white text-slate-900 font-semibold shadow-sm' : 'text-slate-500 font-medium hover:text-slate-700'"
              class="rounded-md px-3 py-1.5 text-xs transition cursor-pointer"
            >
              30D
            </button>
            <button 
              @click="selectedPeriod = '12M'" 
              :class="selectedPeriod === '12M' ? 'bg-white text-slate-900 font-semibold shadow-sm' : 'text-slate-500 font-medium hover:text-slate-700'"
              class="rounded-md px-3 py-1.5 text-xs transition cursor-pointer"
            >
              12M
            </button>
          </div>
        </div>

        <!-- Dynamic SVG Chart -->
        <div class="p-5">
          <div class="relative h-[280px] overflow-hidden rounded-lg bg-slate-50">
            <!-- Dashed Grid lines -->
            <div class="absolute inset-0 flex flex-col justify-between py-6">
              <div class="border-t border-dashed border-slate-200"></div>
              <div class="border-t border-dashed border-slate-200"></div>
              <div class="border-t border-dashed border-slate-200"></div>
              <div class="border-t border-dashed border-slate-200"></div>
              <div class="border-t border-dashed border-slate-200"></div>
            </div>

            <!-- Y-Axis Labels -->
            <div class="absolute bottom-8 left-2 top-5 flex flex-col justify-between text-[10px] text-slate-400 font-medium">
              <span>${{ chartYMax >= 1000 ? (chartYMax / 1000).toFixed(0) + 'k' : chartYMax }}</span>
              <span>${{ (chartYMax * 0.75) >= 1000 ? ((chartYMax * 0.75) / 1000).toFixed(0) + 'k' : Math.round(chartYMax * 0.75) }}</span>
              <span>${{ (chartYMax * 0.5) >= 1000 ? ((chartYMax * 0.5) / 1000).toFixed(0) + 'k' : Math.round(chartYMax * 0.5) }}</span>
              <span>${{ (chartYMax * 0.25) >= 1000 ? ((chartYMax * 0.25) / 1000).toFixed(0) + 'k' : Math.round(chartYMax * 0.25) }}</span>
              <span>$0</span>
            </div>

            <!-- Reactive SVG Path & Circles -->
            <svg viewBox="0 0 900 260" preserveAspectRatio="none" class="absolute inset-x-12 bottom-8 top-5 h-[230px] w-[calc(100%-64px)]">
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#2563EB" stop-opacity="0.25" />
                  <stop offset="100%" stop-color="#2563EB" stop-opacity="0" />
                </linearGradient>
              </defs>
              
              <!-- Area Fill -->
              <path :d="chartPaths.area" fill="url(#revenueGradient)" />
              
              <!-- Line -->
              <path :d="chartPaths.line" fill="none" stroke="#2563EB" stroke-width="3" stroke-linecap="round" vector-effect="non-scaling-stroke" />
              
              <!-- Dynamic Plot Points -->
              <circle 
                v-for="(pt, idx) in chartPoints" 
                :key="idx" 
                :cx="pt.x" 
                :cy="pt.y" 
                r="4.5" 
                fill="#2563EB" 
                stroke="#FFFFFF" 
                stroke-width="1.5"
              />
            </svg>

            <!-- X-Axis Date Labels -->
            <div class="absolute bottom-2 left-12 right-4 flex justify-between text-[10px] text-slate-400 font-medium">
              <span v-for="(lbl, i) in chartXLabels" :key="i">{{ lbl }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- DYNAMIC PAYMENT METHODS DONUT -->
      <div class="rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
        <div class="border-b border-slate-100 px-5 py-4">
          <h2 class="text-base font-bold text-slate-900">Payment Methods</h2>
          <p class="mt-1 text-xs text-slate-500">Revenue distribution by payment method</p>
        </div>

        <div class="p-5 flex-1 flex flex-col justify-center">
          
          <!-- Dynamic Donut Chart -->
          <div class="flex justify-center">
            <div class="relative h-44 w-44">
              <svg viewBox="0 0 120 120" class="h-full w-full -rotate-90">
                <!-- Base Gray Circle -->
                <circle cx="60" cy="60" r="45" fill="none" stroke="#F1F5F9" stroke-width="14" />
                
                <!-- Dynamic Slices -->
                <circle
                  v-for="(method, idx) in dynamicPaymentMethods"
                  :key="idx"
                  cx="60"
                  cy="60"
                  r="45"
                  fill="none"
                  :stroke="method.color"
                  stroke-width="14"
                  :stroke-dasharray="`${method.dashLength} 283`"
                  :stroke-dashoffset="method.dashOffset"
                  stroke-linecap="round"
                  class="transition-all duration-500"
                />
              </svg>

              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-[11px] text-slate-400 font-medium">Total</span>
                <span class="mt-0.5 text-lg font-bold text-slate-900">
                  ${{ stats.totalRevenue >= 1000 ? (stats.totalRevenue / 1000).toFixed(1) + 'K' : stats.totalRevenue }}
                </span>
              </div>
            </div>
          </div>

          <!-- Dynamic Legend -->
          <div class="mt-6 space-y-2.5">
            <div 
              v-for="(method, idx) in dynamicPaymentMethods" 
              :key="idx" 
              class="flex items-center justify-between text-xs"
            >
              <div class="flex items-center gap-2">
                <span class="h-2.5 w-2.5 rounded-full" :style="{ backgroundColor: method.color }"></span>
                <span class="font-medium text-slate-700">{{ method.name }}</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-slate-400 font-medium">${{ method.amount.toLocaleString() }}</span>
                <span class="font-bold text-slate-900 w-10 text-right">{{ method.percentage }}%</span>
              </div>
            </div>

            <!-- Empty State if no methods -->
            <div v-if="dynamicPaymentMethods.length === 0" class="text-center py-2 text-xs text-slate-400">
              No transactions recorded
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- TRANSACTIONS TABLE SECTION -->
    <section class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      
      <!-- Header & Filters -->
      <div class="flex flex-col gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div class="flex items-center gap-2">
            <h2 class="text-base font-bold text-slate-900">Recent Transactions</h2>
            <span class="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
              {{ filteredPayments.length }} transactions
            </span>
          </div>
          <p class="mt-1 text-xs text-slate-500">Latest payment activity from rental bookings</p>

          
        </div>
         <!-- Search -->
          <div class="relative">
             <input
              type="text"
              v-model="searchQuery"
              placeholder="Search payment or customer..."
              class="h-9 w-full rounded-lg border border-slate-200 mx-20 bg-white pl-9 pr-3 text-xs text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 sm:w-44"
            />
          </div>

        <!-- Filters -->
        <div class="flex flex-col gap-2 sm:flex-row ">
         

          <!-- Status Filter -->
          <select v-model="selectedStatus" class="h-9 rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 cursor-pointer">
            <option value="All">All Status</option>
            <option value="PAID">Paid</option>
            <option value="PENDING">Pending</option>
            <option value="FAILED">Failed</option>
            <option value="REFUNDED">Refunded</option>
          </select>

          <!-- Method Filter -->
          <select v-model="selectedMethod" class="h-9 rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 cursor-pointer">
            <option value="All">All Methods</option>
            <option value="ABA">ABA</option>
            <option value="CASH">Cash</option>
            <option value="ACLEDA">ACLEDA</option>
            <option value="BAKONG">Bakong</option>
          </select>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full min-w-250 text-left">
          
          <!-- Head -->
          <thead>
            <tr class="border-b border-slate-100 bg-slate-50/70 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <th class="px-5 py-3.5">Payment</th>
              <th class="px-4 py-3.5">Booking</th>
              <th class="px-4 py-3.5">Customer</th>
              <th class="px-4 py-3.5">Amount</th>
              <th class="px-4 py-3.5">Method</th>
              <th class="px-4 py-3.5">Transaction</th>
              <th class="px-4 py-3.5">Date</th>
              <th class="px-4 py-3.5">Status</th>
              <th class="px-5 py-3.5 text-right">Action</th>
            </tr>
          </thead>

          <!-- Body -->
          <tbody class="divide-y divide-slate-100">

            <!-- Loading -->
            <tr v-if="loading" v-for="n in 3" :key="n" class="animate-pulse">
              <td colspan="9" class="py-6 px-5 text-center text-xs text-slate-400">
                Loading payment transactions...
              </td>
            </tr>

            <!-- Error -->
            <tr v-else-if="error">
              <td colspan="9" class="py-8 px-5 text-center text-rose-600">
                <p class="font-medium text-xs mb-2">{{ error }}</p>
                <button @click="fetchPayments" class="text-xs text-blue-600 underline font-semibold cursor-pointer">Try Again</button>
              </td>
            </tr>

            <!-- Empty -->
            <tr v-else-if="paginatedPayments.length === 0">
              <td colspan="9" class="py-8 px-5 text-center text-xs text-slate-500">
                No payment transactions found.
              </td>
            </tr>

            <!-- Payment Rows -->
            <tr v-else v-for="payment in paginatedPayments" :key="payment.id" class="group transition hover:bg-slate-50/70">
              
              <td class="px-5 py-4">
                <div>
                  <p class="text-sm font-semibold text-slate-900">PAY-{{ payment.id }}</p>
                  <p class="mt-0.5 text-[11px] text-slate-400">Payment</p>
                </div>
              </td>

              <td class="px-4 py-4">
                <span class="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                  {{ payment.bookingCode || payment.booking_id || ('BK-' + (payment.bookingId || '000')) }}
                </span>
              </td>

              <td class="px-4 py-4">
                <div class="flex items-center gap-3">
                  <div class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600">
                    {{ getInitials(payment.customerName || payment.user?.name || 'Customer') }}
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-slate-800">{{ payment.customerName || payment.user?.name || 'Customer' }}</p>
                    <p class="text-[11px] text-slate-400">{{ payment.customerEmail || payment.user?.email || 'Registered User' }}</p>
                  </div>
                </div>
              </td>

              <td class="px-4 py-4">
                <span class="text-sm font-bold text-slate-900">${{ Number(payment.amount || payment.totalAmount || 0).toFixed(2) }}</span>
              </td>

              <td class="px-4 py-4">
                <div class="flex items-center gap-2">
                  <span :class="getMethodIconBadgeClass(payment.paymentMethod || payment.method)">
                    {{ getMethodLetter(payment.paymentMethod || payment.method) }}
                  </span>
                  <span class="text-sm font-medium text-slate-700">{{ getMethodName(payment.paymentMethod || payment.method) }}</span>
                </div>
              </td>

              <td class="px-4 py-4">
                <span class="font-mono text-xs text-slate-500">{{ payment.transactionNo || payment.transactionId || 'TRX-' + payment.id }}</span>
              </td>

              <td class="px-4 py-4">
                <div>
                  <p class="text-sm font-medium text-slate-700">{{ formatDate(payment.paymentDate || payment.createdAt) }}</p>
                  <p class="text-[11px] text-slate-400">{{ formatTime(payment.paymentDate || payment.createdAt) }}</p>
                </div>
              </td>

              <td class="px-4 py-4">
                <span :class="getStatusBadgeClass(payment.status)">
                  <span class="h-1.5 w-1.5 rounded-full" :class="getStatusDotClass(payment.status)"></span>
                  {{ getStatusText(payment.status) }}
                </span>
              </td>

              <td class="px-5 py-4 text-right">
                <div class="flex items-center justify-end gap-1">
                  <button 
                    @click="navigateToDetail(payment.id)" 
                    class="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer" 
                    title="View Payment"
                  >
                    <i class="fa-regular fa-eye text-xs"></i>
                  </button>

                  <button 
                    @click="navigateToEdit(payment.id)" 
                    class="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-all cursor-pointer" 
                    title="Edit Payment"
                  >
                    <i class="fa-regular fa-pen-to-square text-xs"></i>
                  </button>

                  <button 
                    @click="handleDelete(payment)" 
                    :disabled="deletingId === payment.id" 
                    class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer disabled:opacity-50" 
                    title="Delete Payment"
                  >
                    <i v-if="deletingId === payment.id" class="fa-solid fa-circle-notch fa-spin text-xs text-rose-600"></i>
                    <i v-else class="fa-regular fa-trash-can text-xs"></i>
                  </button>
                </div>
              </td>

            </tr>

          </tbody>
        </table>
      </div>

      <!-- Pagination Footer -->
      <div v-if="!loading && filteredPayments.length > 0" class="flex flex-col sm:flex-row items-center justify-between p-4 px-6 border-t border-slate-100 text-xs text-slate-500 gap-3">
        <div>
          Showing <span class="font-bold text-slate-900">{{ startItemIndex }}–{{ endItemIndex }}</span> of <span class="font-bold text-slate-900">{{ filteredPayments.length }}</span> entries
        </div>

        <div class="flex items-center gap-1">
          <button 
            @click="currentPage--" 
            :disabled="currentPage === 1" 
            class="w-7 h-7 rounded-md border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <i class="fa-solid fa-chevron-left text-[10px]"></i>
          </button>

          <button 
            v-for="page in totalPages" 
            :key="page"
            @click="currentPage = page"
            :class="[
              'w-7 h-7 rounded-md font-bold flex items-center justify-center text-xs transition-colors cursor-pointer',
              currentPage === page 
                ? 'bg-blue-600 text-white shadow-xs' 
                : 'border border-slate-200 text-slate-700 hover:bg-slate-100'
            ]"
          >
            {{ page }}
          </button>

          <button 
            @click="currentPage++" 
            :disabled="currentPage === totalPages || totalPages === 0" 
            class="w-7 h-7 rounded-md border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <i class="fa-solid fa-chevron-right text-[10px]"></i>
          </button>
        </div>
      </div>

    </section>

  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getPayments, deletePayment } from '../api/payment'

const router = useRouter()

const payments = ref([])
const loading = ref(true)
const error = ref(null)
const deletingId = ref(null)

/* Filters */
const searchQuery = ref('')
const selectedStatus = ref('All')
const selectedMethod = ref('All')
const selectedPeriod = ref('30D') // '7D', '30D', '12M'

/* Pagination */
const currentPage = ref(1)
const itemsPerPage = ref(10)

/* Navigation Handlers */
const navigateToDetail = (id) => router.push(`/admin/payments/${id}`)
const navigateToEdit = (id) => router.push(`/admin/payments/update/${id}`)

/* Unwraps response envelopes */
const unwrapData = (res) => {
  if (!res) return []
  if (Array.isArray(res)) return res
  if (res.data && Array.isArray(res.data)) return res.data
  return []
}

/* Fetch All Payments */
const fetchPayments = async () => {
  try {
    loading.value = true
    error.value = null
    const res = await getPayments()
    payments.value = unwrapData(res)
  } catch (err) {
    console.error('Failed to load payments:', err)
    error.value = err.response?.data?.message || err.response?.data?.msg || 'Failed to retrieve payment records.'
  } finally {
    loading.value = false
  }
}

/* Delete Payment Action */
const handleDelete = async (payment) => {
  const isConfirmed = window.confirm(`Are you sure you want to delete payment PAY-${payment.id}?`)
  if (!isConfirmed) return

  try {
    deletingId.value = payment.id
    await deletePayment(payment.id)
    payments.value = payments.value.filter(p => p.id !== payment.id)
  } catch (err) {
    console.error('Failed to delete payment:', err)
    alert(err.response?.data?.message || err.response?.data?.msg || 'Failed to delete payment.')
  } finally {
    deletingId.value = null
  }
}

/* Export Functionality */
const exportReport = () => {
  const jsonStr = JSON.stringify(filteredPayments.value, null, 2)
  const blob = new Blob([jsonStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `payments_report_${new Date().toISOString().slice(0, 10)}.json`
  link.click()
  URL.revokeObjectURL(url)
}

/* Helper Functions */
const getInitials = (name) => {
  if (!name) return 'CU'
  const parts = String(name).trim().split(' ').filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return name.substring(0, 2).toUpperCase()
}

const getMethodName = (m) => {
  if (!m) return 'Cash'
  if (typeof m === 'object') return m.name || m.methodName || 'Cash'
  return String(m)
}

const getMethodLetter = (m) => {
  const name = getMethodName(m).toUpperCase()
  if (name.includes('ABA')) return 'A'
  if (name.includes('CASH')) return '$'
  if (name.includes('ACLEDA')) return 'AC'
  if (name.includes('BAKONG')) return 'B'
  return name[0] || 'P'
}

const getMethodIconBadgeClass = (m) => {
  const name = getMethodName(m).toUpperCase()
  if (name.includes('ABA')) return 'flex h-7 w-7 items-center justify-center rounded-md bg-blue-50 text-[10px] font-bold text-blue-600'
  if (name.includes('CASH')) return 'flex h-7 w-7 items-center justify-center rounded-md bg-emerald-50 text-[10px] font-bold text-emerald-600'
  if (name.includes('ACLEDA')) return 'flex h-7 w-7 items-center justify-center rounded-md bg-amber-50 text-[10px] font-bold text-amber-600'
  return 'flex h-7 w-7 items-center justify-center rounded-md bg-violet-50 text-[10px] font-bold text-violet-600'
}

const getStatusText = (status) => {
  if (!status) return 'Paid'
  const s = String(status).toUpperCase()
  if (s === 'SUCCESS' || s === 'COMPLETED') return 'Paid'
  return s
}

const getStatusBadgeClass = (status) => {
  const s = getStatusText(status).toUpperCase()
  switch (s) {
    case 'PAID':
      return 'inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700'
    case 'PENDING':
      return 'inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700'
    case 'FAILED':
      return 'inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-700'
    default:
      return 'inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700'
  }
}

const getStatusDotClass = (status) => {
  const s = getStatusText(status).toUpperCase()
  switch (s) {
    case 'PAID': return 'bg-emerald-500'
    case 'PENDING': return 'bg-amber-500'
    case 'FAILED': return 'bg-red-500'
    default: return 'bg-slate-400'
  }
}

const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A'
  const date = new Date(dateStr)
  return isNaN(date.getTime()) ? dateStr : date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
}

const formatTime = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return isNaN(date.getTime()) ? '' : date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

/* ============================================================================
   DYNAMIC COMPUTED DATA: KPI STATS
   ============================================================================ */
const stats = computed(() => {
  let totalRevenue = 0, paidTotal = 0, pendingTotal = 0, failedTotal = 0, refundedTotal = 0

  payments.value.forEach(p => {
    const amt = Number(p.amount || p.totalAmount || 0)
    const st = getStatusText(p.status).toUpperCase()

    totalRevenue += amt
    if (st === 'PAID') paidTotal += amt
    else if (st === 'PENDING') pendingTotal += amt
    else if (st === 'FAILED') failedTotal += amt
    else if (st === 'REFUNDED') refundedTotal += amt
  })

  const calcPct = (val) => totalRevenue > 0 ? (val / totalRevenue * 100).toFixed(1) : '0.0'

  return {
    totalRevenue,
    paidTotal,
    paidPct: calcPct(paidTotal),
    pendingTotal,
    pendingPct: calcPct(pendingTotal),
    failedTotal,
    failedPct: calcPct(failedTotal),
    refundedTotal,
    refundedPct: calcPct(refundedTotal)
  }
})

/* ============================================================================
   DYNAMIC COMPUTED DATA: REVENUE OVERVIEW GRAPH (SVG)
   ============================================================================ */
const chartDataPoints = computed(() => {
  const buckets = []
  const count = selectedPeriod.value === '7D' ? 7 : selectedPeriod.value === '30D' ? 5 : 12

  // Initialize buckets
  for (let i = 0; i < count; i++) {
    buckets.push({ label: '', revenue: 0 })
  }

  const now = new Date()

  if (selectedPeriod.value === '7D') {
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(now.getDate() - i)
      const key = d.toISOString().slice(0, 10)
      const label = d.toLocaleDateString('en-US', { weekday: 'short' })
      const index = 6 - i
      
      const dayRev = payments.value.reduce((sum, p) => {
        const pDate = new Date(p.paymentDate || p.createdAt || Date.now()).toISOString().slice(0, 10)
        return pDate === key ? sum + Number(p.amount || p.totalAmount || 0) : sum
      }, 0)

      buckets[index] = { label, revenue: dayRev }
    }
  } else if (selectedPeriod.value === '30D') {
    // 5 weekly buckets over 30 days
    for (let i = 4; i >= 0; i--) {
      const start = new Date()
      start.setDate(now.getDate() - (i + 1) * 6)
      const end = new Date()
      end.setDate(now.getDate() - i * 6)
      
      const label = `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
      const index = 4 - i

      const weekRev = payments.value.reduce((sum, p) => {
        const pTime = new Date(p.paymentDate || p.createdAt || Date.now()).getTime()
        return (pTime >= start.getTime() && pTime <= end.getTime()) ? sum + Number(p.amount || p.totalAmount || 0) : sum
      }, 0)

      buckets[index] = { label, revenue: weekRev }
    }
  } else {
    // 12 Months
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const monthYear = d.toLocaleDateString('en-US', { month: 'short' })
      const index = 11 - i

      const monthRev = payments.value.reduce((sum, p) => {
        const pDate = new Date(p.paymentDate || p.createdAt || Date.now())
        return (pDate.getMonth() === d.getMonth() && pDate.getFullYear() === d.getFullYear())
          ? sum + Number(p.amount || p.totalAmount || 0)
          : sum
      }, 0)

      buckets[index] = { label: monthYear, revenue: monthRev }
    }
  }

  return buckets
})

const chartXLabels = computed(() => chartDataPoints.value.map(b => b.label))

const chartYMax = computed(() => {
  const max = Math.max(...chartDataPoints.value.map(b => b.revenue), 100)
  return Math.ceil(max / 100) * 100
})

const chartPoints = computed(() => {
  const data = chartDataPoints.value
  if (data.length === 0) return []

  const svgWidth = 900
  const svgHeight = 230
  const paddingY = 20

  return data.map((item, index) => {
    const x = (index / (data.length - 1 || 1)) * svgWidth
    const ratio = item.revenue / chartYMax.value
    const y = svgHeight - paddingY - ratio * (svgHeight - paddingY * 2)
    return { x: Math.round(x), y: Math.round(y), revenue: item.revenue }
  })
})

const chartPaths = computed(() => {
  const pts = chartPoints.value
  if (pts.length === 0) return { line: '', area: '' }

  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 1; i < pts.length; i++) {
    // Smooth Catmull-Rom style curve rendering
    const prev = pts[i - 1]
    const curr = pts[i]
    const cx = (prev.x + curr.x) / 2
    d += ` C ${cx} ${prev.y}, ${cx} ${curr.y}, ${curr.x} ${curr.y}`
  }

  const line = d
  const area = `${d} L ${pts[pts.length - 1].x} 230 L ${pts[0].x} 230 Z`

  return { line, area }
})

/* ============================================================================
   DYNAMIC COMPUTED DATA: PAYMENT METHODS DONUT CHART
   ============================================================================ */
const COLOR_PALETTE = {
  ABA: '#2563EB',      // Blue
  CASH: '#10B981',     // Emerald
  ACLEDA: '#F59E0B',   // Amber
  BAKONG: '#8B5CF6',   // Purple
  CARD: '#EC4899',     // Pink
  OTHER: '#64748B'     // Slate
}

const dynamicPaymentMethods = computed(() => {
  const totals = {}
  let grandTotal = 0

  payments.value.forEach(p => {
    const name = getMethodName(p.paymentMethod || p.method).toUpperCase()
    let key = 'OTHER'
    if (name.includes('ABA')) key = 'ABA'
    else if (name.includes('CASH')) key = 'CASH'
    else if (name.includes('ACLEDA')) key = 'ACLEDA'
    else if (name.includes('BAKONG')) key = 'BAKONG'
    else if (name.includes('CARD') || name.includes('CREDIT')) key = 'CARD'

    const amt = Number(p.amount || p.totalAmount || 0)
    totals[key] = (totals[key] || 0) + amt
    grandTotal += amt
  })

  const CIRCUMFERENCE = 283 // 2 * PI * 45 (SVG radius)
  let accumulatedOffset = 0

  return Object.keys(totals).map(key => {
    const amount = totals[key]
    const percentage = grandTotal > 0 ? ((amount / grandTotal) * 100).toFixed(1) : '0.0'
    const dashLength = grandTotal > 0 ? (amount / grandTotal) * CIRCUMFERENCE : 0
    const dashOffset = -accumulatedOffset
    accumulatedOffset += dashLength

    return {
      name: key,
      amount,
      percentage,
      dashLength: dashLength.toFixed(1),
      dashOffset: dashOffset.toFixed(1),
      color: COLOR_PALETTE[key] || COLOR_PALETTE.OTHER
    }
  })
})

/* ============================================================================
   FILTER & PAGINATION LOGIC
   ============================================================================ */
const filteredPayments = computed(() => {
  return payments.value.filter(p => {
    const q = searchQuery.value.toLowerCase().trim()
    const payIdMatches = !q || String(p.id || '').includes(q)
    const custMatches = !q || String(p.customerName || p.user?.name || '').toLowerCase().includes(q)
    const bookingMatches = !q || String(p.bookingCode || p.bookingId || '').toLowerCase().includes(q)

    const searchMatches = payIdMatches || custMatches || bookingMatches

    const st = getStatusText(p.status).toUpperCase()
    const statusMatches = selectedStatus.value === 'All' || st === selectedStatus.value.toUpperCase()

    const m = getMethodName(p.paymentMethod || p.method).toUpperCase()
    const methodMatches = selectedMethod.value === 'All' || m.includes(selectedMethod.value.toUpperCase())

    return searchMatches && statusMatches && methodMatches
  })
})

watch([searchQuery, selectedStatus, selectedMethod], () => {
  currentPage.value = 1
})

const totalPages = computed(() => Math.ceil(filteredPayments.value.length / itemsPerPage.value) || 1)

const paginatedPayments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredPayments.value.slice(start, start + itemsPerPage.value)
})

const startItemIndex = computed(() => {
  if (filteredPayments.value.length === 0) return 0
  return (currentPage.value - 1) * itemsPerPage.value + 1
})

const endItemIndex = computed(() => {
  const max = currentPage.value * itemsPerPage.value
  return max > filteredPayments.value.length ? filteredPayments.value.length : max
})

onMounted(fetchPayments)
</script>