<template>
  <main class="p-6 md:p-8 bg-slate-50 min-h-screen text-slate-900">
    
    <!-- Page Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-4xl text-slate-900 ">Dashboard Overview</h1>
        <p class="text-xl text-slate-500 mt-1">Welcome back! Here is your fleet's current status.</p>
      </div>
      <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm flex items-center gap-2">
        <i class="fa-solid fa-download"></i> Export Report
      </button>
    </div>

    <!-- 5 KPI Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
      
      <!-- Card 1 -->
      <div class="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group ">
        <div class="flex items-center justify-between">
          <span class="text-slate-500 text-[13px] font-bold tracking-wider uppercase">Total Users</span>
          <div class="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
            <i class="fa-solid fa-users text-sm text-gray-700"></i>
          </div>
        </div>
        <div class="mt-4">
          <div class="text-3xl font-bold text-slate-900">1,248</div>
          <div class="mt-2 text-xs font-medium text-emerald-600 flex items-center gap-1.5">
            <i class="fa-solid fa-arrow-trend-up "></i> 
            <span>+12.5% <span class="text-slate-400 font-normal">vs last month</span></span>
          </div>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
        <div class="flex items-center justify-between">
          <span class="text-slate-500 text-[13px] font-bold tracking-wider uppercase">Total Vehicles</span>
          <div class="w-8 h-8 rounded-full bg-indigo-50  flex items-center justify-center group-hover:scale-110 transition-transform">
            <i class="fa-solid fa-car text-sm text-gray-700"></i>
          </div>
        </div>
        <div class="mt-4">
          <div class="text-3xl font-bold text-slate-900">86</div>
          <div class="mt-2 text-xs font-medium text-slate-500 flex items-center gap-1.5">
            <span class=" rounded-full text-black">72</span>  available now
          </div>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
        <div class="flex items-center justify-between">
          <span class="text-slate-500 text-[13px] font-bold tracking-wider uppercase">Active Bookings</span>
          <div class="w-8 h-8 rounded-full bg-indigo-50  flex items-center justify-center group-hover:scale-110 transition-transform">
            <i class="fa-solid fa-calendar-days text-sm text-gray-700"></i>
          </div>
        </div>
        <div class="mt-4">
          <div class="text-3xl font-bold text-slate-900">34</div>
          <div class="mt-2 text-xs font-medium text-slate-500 flex items-center gap-1.5">
            <span class=" text-amber-600">8</span>  pending approval
          </div>
        </div>
      </div>

      <!-- Card 4 -->
      <div class="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
        <div class="flex items-center justify-between">
          <span class="text-slate-500 text-[13px] font-bold tracking-wider uppercase">Monthly Revenue</span>
          <div class="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center group-hover:scale-110 transition-transform">
            <i class="fa-solid fa-wallet text-sm text-gray-700"></i>
          </div>
        </div>
        <div class="mt-4">
          <div class="text-3xl font-bold text-slate-900">$24.5k</div>
          <div class="mt-2 text-xs font-medium text-emerald-600 flex items-center gap-1.5">
            <i class="fa-solid fa-arrow-trend-up"></i>
            <span>+8.4% <span class="text-slate-400 font-normal">vs last month</span></span>
          </div>
        </div>
      </div>

      <!-- Card 5 (Utilization) -->
      <div class="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between sm:col-span-2 lg:col-span-1 group">
        <div class="flex items-center justify-between">
          <span class="text-slate-500 text-[13px] font-bold tracking-wider uppercase">Fleet Utilization</span>
          <div class="w-8 h-8 rounded-full bg-indigo-50 0 flex items-center justify-center group-hover:scale-110 transition-transform">
            <i class="fa-solid fa-gauge-high text-sm text-gray-700"></i>
          </div>
        </div>
        <div class="mt-4">
          <div class="flex items-baseline justify-between mb-2">
            <span class="text-3xl font-bold text-slate-900">83.7%</span>
            <span class="text-xs font-medium text-slate-500">Target: 80%</span>
          </div>
          <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div class="bg-violet-600 h-full w-[83.7%] rounded-full shadow-[0_0_10px_rgba(124,58,237,0.5)]"></div>
          </div>
        </div>
      </div>

    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      
      <!-- Beautiful SVG Revenue Overview Chart Card -->
      <div class="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm lg:col-span-2 flex flex-col">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-3xl font-bold text-slate-900">Revenue Overview</h3>
          </div>
          <select class="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-3 py-1.5 outline-none cursor-pointer">
            <option>Last 6 Months</option>
            <option>This Year</option>
          </select>
        </div>

        <!-- Custom SVG Chart (Replaces the blocky divs) -->
        <div class="relative w-full h-62.5 mt-auto">
          <svg viewBox="0 0 800 250" class="w-full h-full overflow-visible" preserveAspectRatio="none">
            <!-- Defs for Gradients -->
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stop-color="#3B82F6" stop-opacity="0.3" />
                <stop offset="95%" stop-color="#3B82F6" stop-opacity="0" />
              </linearGradient>
            </defs>

            <!-- Horizontal Grid Lines -->
            <line x1="0" y1="20" x2="800" y2="20" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4" />
            <line x1="0" y1="90" x2="800" y2="90" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4" />
            <line x1="0" y1="160" x2="800" y2="160" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4" />
            <line x1="0" y1="230" x2="800" y2="230" stroke="#e2e8f0" stroke-width="1" />

            <!-- Y-Axis Labels -->
            <text x="-1" y="24" fill="#64748b" font-size="12" text-anchor="end" class=" font-medium">$30k</text>
            <text x="-1" y="94" fill="#64748b" font-size="12" text-anchor="end" class="font-medium">$20k</text>
            <text x="-1" y="164" fill="#64748b" font-size="12" text-anchor="end" class="font-medium">$10k</text>
            <text x="-1" y="234" fill="#64748b" font-size="12" text-anchor="end" class="font-medium">$0</text>

            <!-- X-Axis Labels -->
            <text x="50" y="250" fill="#64748b" font-size="12" text-anchor="middle" class="font-meduim">May</text>
            <text x="190" y="250" fill="#64748b" font-size="12" text-anchor="middle" class="font-meduim">Jun</text>
            <text x="330" y="250" fill="#64748b" font-size="12" text-anchor="middle" class="font-meduim">Jul</text>
            <text x="470" y="250" fill="#64748b" font-size="12" text-anchor="middle" class="font-meduim">Aug</text>
            <text x="610" y="250" fill="#64748b" font-size="12" text-anchor="middle" class="font-meduim">Sep</text>
            <text x="750" y="250" fill="#64748b" font-size="12" text-anchor="middle" class="font-sans font-bold">Oct</text>

            <!-- Smooth Area Fill -->
            <path d="M 50 180 C 120 180, 150 120, 190 140 C 260 180, 300 80, 330 70 C 400 50, 440 130, 470 110 C 540 70, 580 40, 610 30 C 680 10, 720 50, 750 40 L 750 230 L 50 230 Z" fill="url(#colorRevenue)" />
            
            <!-- Smooth Line -->
            <path d="M 50 180 C 120 180, 150 120, 190 140 C 260 180, 300 80, 330 70 C 400 50, 440 130, 470 110 C 540 70, 580 40, 610 30 C 680 10, 720 50, 750 40" fill="none" stroke="#3B82F6" stroke-width="3.5" stroke-linecap="round" class="drop-shadow-md" />

            <!-- Data Points -->
            <circle cx="50" cy="180" r="4" fill="white" stroke="#3B82F6" stroke-width="2" />
            <circle cx="190" cy="140" r="4" fill="white" stroke="#3B82F6" stroke-width="2" />
            <circle cx="330" cy="70" r="4" fill="white" stroke="#3B82F6" stroke-width="2" />
            <circle cx="470" cy="110" r="4" fill="white" stroke="#3B82F6" stroke-width="2" />
            <circle cx="610" cy="30" r="4" fill="white" stroke="#3B82F6" stroke-width="2" />
            
            <!-- Active Data Point (Hover simulation) -->
            <circle cx="750" cy="40" r="6" fill="#3B82F6" stroke="white" stroke-width="3" class="shadow-lg" />
          </svg>
        </div>
      </div>

      <!-- Booking Status Donut Card -->
      <div class="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col justify-between ">
        <div>
          <h3 class="text-2xl font-bold text-slate-900">Booking Status</h3>
          <p class="text-[13px] text-slate-500">Current active cycle</p>
        </div>
        
        <div class="flex justify-center my-6">
          <div class="w-40 h-40 rounded-full bg-[conic-gradient(#10b981_0%_34%,#3b82f6_34%_76%,#f59e0b_76%_100%)] flex items-center justify-center relative shadow-sm">
            <div class="w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center text-center shadow-inner">
              <span class="text-3xl font-bold text-slate-900">124</span>
              <span class="text-[10px] tracking-wider text-slate-400 font-bold uppercase mt-1">Total Bookings</span>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
            <div class="flex items-center gap-3">
              <div class="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.5)]"></div>
              <span class="text-slate-600 font-medium text-[15px]">Confirmed</span>
            </div>
            <span class="font-bold text-slate-900">42%</span>
          </div>
          <div class="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
            <div class="flex items-center gap-3">
              <div class="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]"></div>
              <span class="text-slate-600 font-medium text-[15px]">Active</span>
            </div>
            <span class="font-bold text-slate-900">34%</span>
          </div>
          <div class="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
            <div class="flex items-center gap-3">
              <div class="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_5px_rgba(245,158,11,0.5)]"></div>
              <span class="text-slate-600 font-medium text-[15px]">Pending</span>
            </div>
            <span class="font-bold text-slate-900">15%</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Recent Bookings Table -->
    <div class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div class="flex items-center justify-between p-6 border-b border-slate-100">
        <div>
          <h3 class="text-2xl font-bold text-slate-900">Recent Bookings</h3>
          <p class="text-sm text-slate-500 mt-1">Latest transactions from your customers</p>
        </div>
        <button @click="$emit('view-all-bookings')" class="text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors">
          View All
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 text-slate-500 text-[15px] font-bold uppercase tracking-wider">
              <th class="p-4 pl-6 font-medium">Booking ID</th>
              <th class="p-4 font-medium">Customer</th>
              <th class="p-4 font-medium">Vehicle</th>
              <th class="p-4 font-medium">Dates</th>
              <th class="p-4 font-medium">Status</th>
              <th class="p-4 pr-6 text-right font-medium">Total</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <!-- Row 1 -->
            <tr class="hover:bg-slate-50/50 transition-colors group">
              <td class="p-4 pl-6 font-semibold text-slate-900 text-sm">#BK-1024</td>
              <td class="p-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">JD</div>
                  <span class="text-slate-700 font-medium text-sm">John Doe</span>
                </div>
              </td>
              <td class="p-4 text-slate-600 text-sm">Toyota Camry</td>
              <td class="p-4 text-slate-500 text-sm">Oct 12 - Oct 15</td>
              <td class="p-4">
                <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-200">
                  <span class="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span> Pending
                </span>
              </td>
              <td class="p-4 pr-6 text-right font-bold text-slate-900 text-sm">$240.00</td>
            </tr>
            
            <!-- Row 2 -->
            <tr class="hover:bg-slate-50/50 transition-colors group">
              <td class="p-4 pl-6 font-semibold text-slate-900 text-sm">#BK-1023</td>
              <td class="p-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">SS</div>
                  <span class="text-slate-700 font-medium text-sm">Sarah Smith</span>
                </div>
              </td>
              <td class="p-4 text-slate-600 text-sm">Ford Explorer</td>
              <td class="p-4 text-slate-500 text-sm">Oct 10 - Oct 14</td>
              <td class="p-4">
                <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200">
                  <span class="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5"></span> Confirmed
                </span>
              </td>
              <td class="p-4 pr-6 text-right font-bold text-slate-900 text-sm">$450.00</td>
            </tr>

            <!-- Row 3 -->
            <tr class="hover:bg-slate-50/50 transition-colors group">
              <td class="p-4 pl-6 font-semibold text-slate-900 text-sm">#BK-1022</td>
              <td class="p-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">MJ</div>
                  <span class="text-slate-700 font-medium text-sm">Michael Johnson</span>
                </div>
              </td>
              <td class="p-4 text-slate-600 text-sm">Honda Civic</td>
              <td class="p-4 text-slate-500 text-sm">Oct 05 - Oct 12</td>
              <td class="p-4">
                <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span> Active
                </span>
              </td>
              <td class="p-4 pr-6 text-right font-bold text-slate-900 text-sm">$315.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </main>
</template>

<script setup>
defineEmits(['export', 'view-all-bookings'])
</script>