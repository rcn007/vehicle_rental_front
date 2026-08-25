<template>
  <main class="min-h-[calc(100vh-64px)] bg-[#F8FAFC] p-4 sm:p-6">

    <!-- =========================================================
         PAGE HEADER
    ========================================================== -->
    <section class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div class="mb-1 flex items-center gap-2">
          
          <h1 class="text-4xl font-bold tracking-tight text-slate-900">
            Payments
          </h1>
        </div>
        <p class="text-xl text-slate-500">
          Monitor rental payments and transaction activity.
        </p>
      </div>

      <button
        @click="$emit('export')"
        class="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        <i class="fa-solid fa-download text-xs"></i>
        Export Report
      </button>
    </section>

    <!-- =========================================================
         KPI CARDS
    ========================================================== -->
    <section class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

      <!-- Total Revenue -->
      <div class="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div class="mb-4 flex items-start justify-between">
          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Total Revenue
            </p>
            <h2 class="mt-2 text-2xl font-bold tracking-tight text-slate-900">
              $124,500
            </h2>
          </div>
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <i class="fa-solid fa-dollar-sign text-sm"></i>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700">
            <i class="fa-solid fa-arrow-up text-[9px]"></i>
            12.5%
          </span>
          <span class="text-xs text-slate-400">vs previous period</span>
        </div>
      </div>

      <!-- Paid -->
      <div class="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div class="mb-4 flex items-start justify-between">
          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Paid
            </p>
            <h2 class="mt-2 text-2xl font-bold tracking-tight text-slate-900">
              $98,200
            </h2>
          </div>
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <i class="fa-solid fa-circle-check text-sm"></i>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs font-medium text-emerald-600">78.9%</span>
          <span class="text-xs text-slate-400">of total revenue</span>
        </div>
      </div>

      <!-- Pending -->
      <div class="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div class="mb-4 flex items-start justify-between">
          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Pending
            </p>
            <h2 class="mt-2 text-2xl font-bold tracking-tight text-slate-900">
              $24,100
            </h2>
          </div>
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
            <i class="fa-solid fa-clock text-sm"></i>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs font-medium text-amber-600">19.4%</span>
          <span class="text-xs text-slate-400">awaiting payment</span>
        </div>
      </div>

      <!-- Failed -->
      <div class="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div class="mb-4 flex items-start justify-between">
          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Failed
            </p>
            <h2 class="mt-2 text-2xl font-bold tracking-tight text-slate-900">
              $1,200
            </h2>
          </div>
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
            <i class="fa-solid fa-circle-xmark text-sm"></i>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs font-medium text-red-600">0.96%</span>
          <span class="text-xs text-slate-400">of total revenue</span>
        </div>
      </div>

      <!-- Refunded -->
      <div class="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div class="mb-4 flex items-start justify-between">
          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Refunded
            </p>
            <h2 class="mt-2 text-2xl font-bold tracking-tight text-slate-900">
              $1,000
            </h2>
          </div>
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
            <i class="fa-solid fa-rotate-left text-sm"></i>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs font-medium text-slate-600">0.8%</span>
          <span class="text-xs text-slate-400">of total revenue</span>
        </div>
      </div>

    </section>

    <!-- =========================================================
         ANALYTICS
    ========================================================== -->
    <section class="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3">

      <!-- Revenue Chart -->
      <div class="xl:col-span-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        
        <!-- Chart Header -->
        <div class="flex flex-col gap-4 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 class="text-base font-bold text-slate-900">Revenue Overview</h2>
            <div class="mt-1 flex items-center gap-2">
              <span class="text-xl font-bold text-slate-900">$124,500</span>
              <span class="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700">
                <i class="fa-solid fa-arrow-up text-[8px]"></i>
                12.5%
              </span>
            </div>
          </div>

          <!-- Period -->
          <div class="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1">
            <button class="rounded-md px-3 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-white hover:text-slate-700">
              7D
            </button>
            <button class="rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-sm">
              30D
            </button>
            <button class="rounded-md px-3 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-white hover:text-slate-700">
              12M
            </button>
          </div>
        </div>

        <!-- Chart -->
        <div class="p-5">
          <div class="relative h-[280px] overflow-hidden rounded-lg bg-slate-50">
            <!-- Grid -->
            <div class="absolute inset-0 flex flex-col justify-between py-6">
              <div class="border-t border-dashed border-slate-200"></div>
              <div class="border-t border-dashed border-slate-200"></div>
              <div class="border-t border-dashed border-slate-200"></div>
              <div class="border-t border-dashed border-slate-200"></div>
              <div class="border-t border-dashed border-slate-200"></div>
            </div>

            <!-- Y Axis -->
            <div class="absolute bottom-8 left-2 top-5 flex flex-col justify-between text-[10px] text-slate-400">
              <span>$40k</span>
              <span>$30k</span>
              <span>$20k</span>
              <span>$10k</span>
              <span>$0</span>
            </div>

            <!-- Fake SVG Chart -->
            <svg viewBox="0 0 900 260" preserveAspectRatio="none" class="absolute inset-x-10 bottom-8 top-5 h-[230px] w-[calc(100%-60px)]">
              <!-- Area -->
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#2563EB" stop-opacity="0.16" />
                  <stop offset="100%" stop-color="#2563EB" stop-opacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 210 C55 190 75 185 120 195 S185 145 230 160 S295 115 340 130 S405 100 450 115 S515 70 560 95 S625 55 670 80 S735 40 780 62 S850 20 900 30 L900 230 L0 230 Z"
                fill="url(#revenueGradient)"
              />
              <!-- Line -->
              <path
                d="M0 210 C55 190 75 185 120 195 S185 145 230 160 S295 115 340 130 S405 100 450 115 S515 70 560 95 S625 55 670 80 S735 40 780 62 S850 20 900 30"
                fill="none"
                stroke="#2563EB"
                stroke-width="3"
                vector-effect="non-scaling-stroke"
              />
              <!-- Points -->
              <circle cx="230" cy="160" r="4" fill="#2563EB" />
              <circle cx="450" cy="115" r="4" fill="#2563EB" />
              <circle cx="670" cy="80" r="4" fill="#2563EB" />
              <circle cx="900" cy="30" r="5" fill="#2563EB" />
            </svg>

            <!-- X Axis -->
            <div class="absolute bottom-2 left-10 right-4 flex justify-between text-[10px] text-slate-400">
              <span>Oct 01</span>
              <span>Oct 07</span>
              <span>Oct 14</span>
              <span>Oct 21</span>
              <span>Oct 30</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Payment Methods -->
      <div class="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div class="border-b border-slate-100 px-5 py-4">
          <h2 class="text-base font-bold text-slate-900">Payment Methods</h2>
          <p class="mt-1 text-xs text-slate-500">Revenue distribution by payment method</p>
        </div>

        <div class="p-5">
          <!-- Donut -->
          <div class="flex justify-center">
            <div class="relative h-44 w-44">
              <svg viewBox="0 0 120 120" class="h-full w-full -rotate-90">
                <!-- Background -->
                <circle cx="60" cy="60" r="45" fill="none" stroke="#F1F5F9" stroke-width="14" />
                <!-- ABA -->
                <circle cx="60" cy="60" r="45" fill="none" stroke="#2563EB" stroke-width="14" stroke-dasharray="118 283" stroke-linecap="round" />
                <!-- Cash -->
                <circle cx="60" cy="60" r="45" fill="none" stroke="#10B981" stroke-width="14" stroke-dasharray="79 283" stroke-dashoffset="-122" stroke-linecap="round" />
                <!-- ACLEDA -->
                <circle cx="60" cy="60" r="45" fill="none" stroke="#F59E0B" stroke-width="14" stroke-dasharray="51 283" stroke-dashoffset="-205" stroke-linecap="round" />
                <!-- Bakong -->
                <circle cx="60" cy="60" r="45" fill="none" stroke="#8B5CF6" stroke-width="14" stroke-dasharray="34 283" stroke-dashoffset="-260" stroke-linecap="round" />
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-xs text-slate-400">Total</span>
                <span class="mt-1 text-xl font-bold text-slate-900">$124.5K</span>
              </div>
            </div>
          </div>

          <!-- Legend -->
          <div class="mt-5 space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="h-2.5 w-2.5 rounded-full bg-blue-600"></span>
                <span class="text-sm font-medium text-slate-700">ABA</span>
              </div>
              <span class="text-sm font-semibold text-slate-900">42%</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                <span class="text-sm font-medium text-slate-700">Cash</span>
              </div>
              <span class="text-sm font-semibold text-slate-900">28%</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
                <span class="text-sm font-medium text-slate-700">ACLEDA</span>
              </div>
              <span class="text-sm font-semibold text-slate-900">18%</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="h-2.5 w-2.5 rounded-full bg-violet-500"></span>
                <span class="text-sm font-medium text-slate-700">Bakong</span>
              </div>
              <span class="text-sm font-semibold text-slate-900">12%</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================
         TRANSACTIONS
    ========================================================== -->
    <section class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      
      <!-- Header -->
      <div class="flex flex-col gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div class="flex items-center gap-2">
            <h2 class="text-base font-bold text-slate-900">Recent Transactions</h2>
            <span class="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">4 transactions</span>
          </div>
          <p class="mt-1 text-xs text-slate-500">Latest payment activity from rental bookings</p>
        </div>

        <!-- Filters -->
        <div class="flex flex-col gap-2 sm:flex-row">
          <!-- Search -->
          <div class="relative">
            <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400"></i>
            <input
              type="text"
              placeholder="Search payment..."
              class="h-9 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-xs text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 sm:w-44"
            />
          </div>

          <!-- Status -->
          <select class="h-9 rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10">
            <option>All Status</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Failed</option>
            <option>Refunded</option>
          </select>

          <!-- Method -->
          <select class="h-9 rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10">
            <option>All Methods</option>
            <option>ABA</option>
            <option>Cash</option>
            <option>ACLEDA</option>
            <option>Bakong</option>
          </select>

          <!-- Date -->
          <button class="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 hover:bg-slate-50">
            <i class="fa-regular fa-calendar text-xs"></i>
            Date
          </button>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full min-w-[1000px] text-left">
          
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

            <!-- Row 1 -->
            <tr class="group transition hover:bg-slate-50/70">
              <td class="px-5 py-4">
                <div>
                  <p class="text-sm font-semibold text-slate-900">PAY-9012</p>
                  <p class="mt-0.5 text-[11px] text-slate-400">Payment</p>
                </div>
              </td>
              <td class="px-4 py-4">
                <span class="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">BK-7741</span>
              </td>
              <td class="px-4 py-4">
                <div class="flex items-center gap-3">
                  <div class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600">SC</div>
                  <div>
                    <p class="text-sm font-semibold text-slate-800">Sokha Chen</p>
                    <p class="text-[11px] text-slate-400">Customer</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-4">
                <span class="text-sm font-bold text-slate-900">$450.00</span>
              </td>
              <td class="px-4 py-4">
                <div class="flex items-center gap-2">
                  <span class="flex h-7 w-7 items-center justify-center rounded-md bg-blue-50 text-[10px] font-bold text-blue-600">A</span>
                  <span class="text-sm font-medium text-slate-700">ABA</span>
                </div>
              </td>
              <td class="px-4 py-4">
                <span class="font-mono text-xs text-slate-500">TRX-88A92B</span>
              </td>
              <td class="px-4 py-4">
                <div>
                  <p class="text-sm font-medium text-slate-700">Oct 24, 2023</p>
                  <p class="text-[11px] text-slate-400">10:42 AM</p>
                </div>
              </td>
              <td class="px-4 py-4">
                <span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                  <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  Paid
                </span>
              </td>
              <td class="px-5 py-4 text-right">
                <button class="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
                  <i class="fa-solid fa-ellipsis text-xs"></i>
                </button>
              </td>
            </tr>

            <!-- Row 2 -->
            <tr class="group transition hover:bg-slate-50/70">
              <td class="px-5 py-4">
                <div>
                  <p class="text-sm font-semibold text-slate-900">PAY-9011</p>
                  <p class="mt-0.5 text-[11px] text-slate-400">Payment</p>
                </div>
              </td>
              <td class="px-4 py-4">
                <span class="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">BK-7740</span>
              </td>
              <td class="px-4 py-4">
                <div class="flex items-center gap-3">
                  <div class="flex h-8 w-8 items-center justify-center rounded-full bg-violet-50 text-xs font-bold text-violet-600">DS</div>
                  <div>
                    <p class="text-sm font-semibold text-slate-800">David Smith</p>
                    <p class="text-[11px] text-slate-400">Customer</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-4">
                <span class="text-sm font-bold text-slate-900">$1,200.00</span>
              </td>
              <td class="px-4 py-4">
                <div class="flex items-center gap-2">
                  <span class="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-50 text-[10px] font-bold text-emerald-600">$</span>
                  <span class="text-sm font-medium text-slate-700">Cash</span>
                </div>
              </td>
              <td class="px-4 py-4">
                <span class="font-mono text-xs text-slate-400">—</span>
              </td>
              <td class="px-4 py-4">
                <div>
                  <p class="text-sm font-medium text-slate-700">Oct 24, 2023</p>
                  <p class="text-[11px] text-slate-400">09:18 AM</p>
                </div>
              </td>
              <td class="px-4 py-4">
                <span class="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
                  <span class="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                  Pending
                </span>
              </td>
              <td class="px-5 py-4 text-right">
                <button class="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
                  <i class="fa-solid fa-ellipsis text-xs"></i>
                </button>
              </td>
            </tr>

            <!-- Row 3 -->
            <tr class="group transition hover:bg-slate-50/70">
              <td class="px-5 py-4">
                <div>
                  <p class="text-sm font-semibold text-slate-900">PAY-9010</p>
                  <p class="mt-0.5 text-[11px] text-slate-400">Payment</p>
                </div>
              </td>
              <td class="px-4 py-4">
                <span class="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">BK-7738</span>
              </td>
              <td class="px-4 py-4">
                <div class="flex items-center gap-3">
                  <div class="flex h-8 w-8 items-center justify-center rounded-full bg-orange-50 text-xs font-bold text-orange-600">BN</div>
                  <div>
                    <p class="text-sm font-semibold text-slate-800">Bopha Nguon</p>
                    <p class="text-[11px] text-slate-400">Customer</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-4">
                <span class="text-sm font-bold text-slate-900">$320.00</span>
              </td>
              <td class="px-4 py-4">
                <div class="flex items-center gap-2">
                  <span class="flex h-7 w-7 items-center justify-center rounded-md bg-violet-50 text-[10px] font-bold text-violet-600">B</span>
                  <span class="text-sm font-medium text-slate-700">Bakong</span>
                </div>
              </td>
              <td class="px-4 py-4">
                <span class="font-mono text-xs text-slate-500">TRX-77C12F</span>
              </td>
              <td class="px-4 py-4">
                <div>
                  <p class="text-sm font-medium text-slate-700">Oct 23, 2023</p>
                  <p class="text-[11px] text-slate-400">04:32 PM</p>
                </div>
              </td>
              <td class="px-4 py-4">
                <span class="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-700">
                  <span class="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                  Failed
                </span>
              </td>
              <td class="px-5 py-4 text-right">
                <button class="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
                  <i class="fa-solid fa-ellipsis text-xs"></i>
                </button>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </section>

  </main>
</template>