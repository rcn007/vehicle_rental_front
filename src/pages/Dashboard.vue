<template>
  <main 
    class="p-6 md:p-8 min-h-screen"
    style="background-color: var(--background); font-family: var(--font-body); color: var(--text);"
  >
    <!-- Page Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 
          class="text-2xl font-bold tracking-tight"
          style="font-family: var(--font-heading); color: var(--text);"
        >
          Dashboard Overview
        </h1>
        <p class="text-xs mt-1" style="color: var(--muted);">
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

    <!-- 4 KPI Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      
      <!-- Card 1: Total Users -->
      <div 
        class="p-5 border flex flex-col justify-between"
        style="background-color: var(--surface); border-color: var(--border); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm);"
      >
        <div class="flex items-center justify-between">
          <span 
            class="text-[11px] font-bold tracking-wider uppercase"
            style="font-family: var(--font-heading); color: var(--muted);"
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
            1.25K
          </div>
          <div class="mt-2 text-xs font-semibold flex items-center gap-1" style="color: var(--success);">
            <i class="fa-solid fa-arrow-trend-up text-[10px]"></i>
            <span>+12.5% <span class="font-normal" style="color: var(--muted);">vs last month</span></span>
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
            class="text-[11px] font-bold tracking-wider uppercase"
            style="font-family: var(--font-heading); color: var(--muted);"
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
            86
          </div>
          <div class="mt-2 text-xs font-medium" style="color: var(--muted);">
            <span class="font-bold" style="color: var(--text);">72</span> available now
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
            class="text-[11px] font-bold tracking-wider uppercase"
            style="font-family: var(--font-heading); color: var(--muted);"
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
            34
          </div>
          <div class="mt-2 text-xs font-medium" style="color: var(--muted);">
            <span class="font-bold" style="color: var(--warning);">8</span> pending approval
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
            class="text-[11px] font-bold tracking-wider uppercase"
            style="font-family: var(--font-heading); color: var(--muted);"
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
            $24.5k
          </div>
          <div class="mt-2 text-xs font-semibold flex items-center gap-1" style="color: var(--success);">
            <i class="fa-solid fa-arrow-trend-up text-[10px]"></i>
            <span>+8.4% <span class="font-normal" style="color: var(--muted);">vs last month</span></span>
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
        <div class="flex items-center justify-between mb-6">
          <h2 
            class="text-base font-bold"
            style="font-family: var(--font-heading); color: var(--text);"
          >
            Revenue Overview
          </h2>
          <select 
            class="text-xs font-semibold px-3 py-1.5 border outline-none cursor-pointer"
            style="background-color: var(--background); border-color: var(--border); border-radius: var(--radius-sm); color: var(--text);"
          >
            <option>Last 6 Months</option>
            <option>This Year</option>
          </select>
        </div>

        <!-- SVG Chart -->
        <div class="relative w-full h-56 mt-auto">
          <svg viewBox="0 0 800 220" class="w-full h-full overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stop-color="var(--primary)" stop-opacity="0.15" />
                <stop offset="95%" stop-color="var(--primary)" stop-opacity="0" />
              </linearGradient>
            </defs>

            <!-- Grid Lines -->
            <line x1="0" y1="20" x2="800" y2="20" stroke="var(--border)" stroke-width="1" stroke-dasharray="4" />
            <line x1="0" y1="80" x2="800" y2="80" stroke="var(--border)" stroke-width="1" stroke-dasharray="4" />
            <line x1="0" y1="140" x2="800" y2="140" stroke="var(--border)" stroke-width="1" stroke-dasharray="4" />
            <line x1="0" y1="200" x2="800" y2="200" stroke="var(--border)" stroke-width="1" />

            <!-- Y-Axis Labels -->
            <text x="-5" y="24" fill="var(--muted)" font-size="11" text-anchor="end" class="font-medium">$30k</text>
            <text x="-5" y="84" fill="var(--muted)" font-size="11" text-anchor="end" class="font-medium">$20k</text>
            <text x="-5" y="144" fill="var(--muted)" font-size="11" text-anchor="end" class="font-medium">$10k</text>
            <text x="-5" y="204" fill="var(--muted)" font-size="11" text-anchor="end" class="font-medium">$0</text>

            <!-- Area Fill & Main Line -->
            <path d="M 50 160 C 120 160, 150 110, 190 125 C 260 160, 300 70, 330 60 C 400 40, 440 110, 470 95 C 540 60, 580 35, 610 25 C 680 10, 720 45, 750 35 L 750 200 L 50 200 Z" fill="url(#colorRevenue)" />
            <path d="M 50 160 C 120 160, 150 110, 190 125 C 260 160, 300 70, 330 60 C 400 40, 440 110, 470 95 C 540 60, 580 35, 610 25 C 680 10, 720 45, 750 35" fill="none" stroke="var(--primary)" stroke-width="2.5" stroke-linecap="round" />

            <!-- Data Points -->
            <circle cx="50" cy="160" r="3.5" fill="var(--surface)" stroke="var(--primary)" stroke-width="2" />
            <circle cx="190" cy="125" r="3.5" fill="var(--surface)" stroke="var(--primary)" stroke-width="2" />
            <circle cx="330" cy="60" r="3.5" fill="var(--surface)" stroke="var(--primary)" stroke-width="2" />
            <circle cx="470" cy="95" r="3.5" fill="var(--surface)" stroke="var(--primary)" stroke-width="2" />
            <circle cx="610" cy="25" r="3.5" fill="var(--surface)" stroke="var(--primary)" stroke-width="2" />
            <circle cx="750" cy="35" r="5" fill="var(--primary)" stroke="var(--surface)" stroke-width="2" />
          </svg>
        </div>

        <!-- X-Axis Labels -->
        <div class="flex justify-between text-xs font-medium mt-3 px-2" style="color: var(--muted);">
          <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span class="font-bold" style="color: var(--text);">Oct</span>
        </div>
      </div>

      <!-- Booking Status Donut Card -->
      <div 
        class="p-6 border flex flex-col justify-between"
        style="background-color: var(--surface); border-color: var(--border); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm);"
      >
        <div>
          <h2 
            class="text-base font-bold"
            style="font-family: var(--font-heading); color: var(--text);"
          >
            Booking Status
          </h2>
          <p class="text-xs mt-0.5" style="color: var(--muted);">
            Current active cycle
          </p>
        </div>
        
        <div class="flex justify-center my-6">
          <div 
            class="w-36 h-36 rounded-full flex items-center justify-center relative"
            style="background: conic-gradient(var(--primary) 0% 42%, var(--success) 42% 76%, var(--warning) 76% 100%);"
          >
            <div 
              class="w-28 h-28 rounded-full flex flex-col items-center justify-center text-center"
              style="background-color: var(--surface);"
            >
              <span 
                class="text-2xl font-extrabold"
                style="font-family: var(--font-heading); color: var(--text);"
              >
                124
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

        <div class="space-y-2 text-xs font-medium" style="color: var(--text);">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full" style="background-color: var(--primary);"></span>
              <span style="color: var(--muted);">Confirmed</span>
            </div>
            <span class="font-bold">42%</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full" style="background-color: var(--success);"></span>
              <span style="color: var(--muted);">Active</span>
            </div>
            <span class="font-bold">34%</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full" style="background-color: var(--warning);"></span>
              <span style="color: var(--muted);">Pending</span>
            </div>
            <span class="font-bold">24%</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Recent Bookings Table -->
    <div 
      class="border overflow-hidden"
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

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs font-medium" style="color: var(--text);">
          <thead 
            class="font-bold uppercase tracking-wider text-[10px] border-b"
            style="background-color: var(--background); border-color: var(--border); color: var(--muted);"
          >
            <tr>
              <th class="py-3.5 px-5">Booking ID</th>
              <th class="py-3.5 px-5">Customer</th>
              <th class="py-3.5 px-5">Vehicle</th>
              <th class="py-3.5 px-5">Dates</th>
              <th class="py-3.5 px-5">Status</th>
              <th class="py-3.5 px-5 text-right">Total</th>
            </tr>
          </thead>
          <tbody class="divide-y" style="border-color: var(--border);">
            <!-- Row 1 -->
            <tr class="hover:opacity-80 transition-opacity">
              <td class="py-3.5 px-5 font-bold" style="font-family: var(--font-heading);">#BK-1024</td>
              <td class="py-3.5 px-5">
                <div class="flex items-center gap-2.5">
                  <div 
                    class="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style="background-color: var(--background); color: var(--muted);"
                  >
                    JD
                  </div>
                  <span class="font-medium">John Doe</span>
                </div>
              </td>
              <td class="py-3.5 px-5" style="color: var(--muted);">Toyota Camry</td>
              <td class="py-3.5 px-5" style="color: var(--muted);">Oct 12 - Oct 15</td>
              <td class="py-3.5 px-5">
                <span 
                  class="px-2.5 py-1 text-[10px] font-bold inline-flex items-center gap-1.5"
                  style="background-color: #fffbebfb; color: var(--warning); border-radius: var(--radius-pill);"
                >
                  <span class="w-1.5 h-1.5 rounded-full" style="background-color: var(--warning);"></span>
                  Pending
                </span>
              </td>
              <td class="py-3.5 px-5 text-right font-bold" style="font-family: var(--font-heading);">$240.00</td>
            </tr>

            <!-- Row 2 -->
            <tr class="hover:opacity-80 transition-opacity">
              <td class="py-3.5 px-5 font-bold" style="font-family: var(--font-heading);">#BK-1023</td>
              <td class="py-3.5 px-5">
                <div class="flex items-center gap-2.5">
                  <div 
                    class="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style="background-color: var(--background); color: var(--muted);"
                  >
                    SS
                  </div>
                  <span class="font-medium">Sarah Smith</span>
                </div>
              </td>
              <td class="py-3.5 px-5" style="color: var(--muted);">Ford Explorer</td>
              <td class="py-3.5 px-5" style="color: var(--muted);">Oct 10 - Oct 14</td>
              <td class="py-3.5 px-5">
                <span 
                  class="px-2.5 py-1 text-[10px] font-bold inline-flex items-center gap-1.5"
                  style="background-color: #f0f9ff; color: var(--primary); border-radius: var(--radius-pill);"
                >
                  <span class="w-1.5 h-1.5 rounded-full" style="background-color: var(--primary);"></span>
                  Confirmed
                </span>
              </td>
              <td class="py-3.5 px-5 text-right font-bold" style="font-family: var(--font-heading);">$450.00</td>
            </tr>

            <!-- Row 3 -->
            <tr class="hover:opacity-80 transition-opacity">
              <td class="py-3.5 px-5 font-bold" style="font-family: var(--font-heading);">#BK-1022</td>
              <td class="py-3.5 px-5">
                <div class="flex items-center gap-2.5">
                  <div 
                    class="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style="background-color: var(--background); color: var(--muted);"
                  >
                    MJ
                  </div>
                  <span class="font-medium">Michael Johnson</span>
                </div>
              </td>
              <td class="py-3.5 px-5" style="color: var(--muted);">Honda Civic</td>
              <td class="py-3.5 px-5" style="color: var(--muted);">Oct 05 - Oct 12</td>
              <td class="py-3.5 px-5">
                <span 
                  class="px-2.5 py-1 text-[10px] font-bold inline-flex items-center gap-1.5"
                  style="background-color: #ecfdf5; color: var(--success); border-radius: var(--radius-pill);"
                >
                  <span class="w-1.5 h-1.5 rounded-full" style="background-color: var(--success);"></span>
                  Active
                </span>
              </td>
              <td class="py-3.5 px-5 text-right font-bold" style="font-family: var(--font-heading);">$315.00</td>
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