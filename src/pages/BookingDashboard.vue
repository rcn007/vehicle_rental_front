<template>
  <main class="p-6 md:p-8 min-h-[calc(100vh-64px)] bg-gray-50/50">
    
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Bookings</h1>
        <p class="text-gray-500 text-sm mt-1">Manage and monitor all vehicle rental bookings</p>
      </div>
      <div class="flex items-center gap-3">
        <button 
          @click="$emit('export')" 
          class="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          <i class="fa-solid fa-download text-xs text-gray-500"></i>
          <span>Export</span>
        </button>
        <button 
          @click="$emit('new-booking')" 
          class="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm shadow-blue-500/10 active:scale-95 cursor-pointer"
        >
          <i class="fa-solid fa-plus text-xs"></i>
          <span>New Booking</span>
        </button>
      </div>
    </div>

    <!-- 6 KPI Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
      
      <!-- Card: Total Bookings -->
      <div class="p-5 bg-white border border-gray-200/80 rounded-xl shadow-xs hover:shadow-md hover:border-gray-300 transition-all flex flex-col justify-between group">
        <div class="flex items-center justify-between">
          <span class="text-gray-500 text-[11px] font-bold uppercase tracking-wider">Total</span>
          <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center transition-transform group-hover:scale-110">
            <i class="fa-solid fa-calendar-days text-xs"></i>
          </div>
        </div>
        <div class="mt-4">
          <div class="text-2xl font-extrabold text-gray-900">1,248</div>
          <div class="mt-1 text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
            <i class="fa-solid fa-arrow-trend-up text-[9px]"></i>
            <span>+12% <span class="font-normal text-gray-400">vs last month</span></span>
          </div>
        </div>
      </div>

      <!-- Card: Pending -->
      <div class="p-5 bg-white border border-gray-200/80 rounded-xl shadow-xs hover:shadow-md hover:border-gray-300 transition-all flex flex-col justify-between group">
        <div class="flex items-center justify-between">
          <span class="text-gray-500 text-[11px] font-bold uppercase tracking-wider">Pending</span>
          <div class="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center transition-transform group-hover:scale-110">
            <i class="fa-regular fa-clock text-xs"></i>
          </div>
        </div>
        <div class="mt-4">
          <div class="text-2xl font-extrabold text-gray-900">42</div>
          <div class="mt-1 text-[11px] text-gray-400 font-medium">Awaiting action</div>
        </div>
      </div>

      <!-- Card: Confirmed -->
      <div class="p-5 bg-white border border-gray-200/80 rounded-xl shadow-xs hover:shadow-md hover:border-gray-300 transition-all flex flex-col justify-between group">
        <div class="flex items-center justify-between">
          <span class="text-gray-500 text-[11px] font-bold uppercase tracking-wider">Confirmed</span>
          <div class="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center transition-transform group-hover:scale-110">
            <i class="fa-regular fa-circle-check text-xs"></i>
          </div>
        </div>
        <div class="mt-4">
          <div class="text-2xl font-extrabold text-gray-900">156</div>
          <div class="mt-1 text-[11px] text-gray-400 font-medium">Upcoming departures</div>
        </div>
      </div>

      <!-- Card: Active -->
      <div class="p-5 bg-white border border-gray-200/80 rounded-xl shadow-xs hover:shadow-md hover:border-gray-300 transition-all flex flex-col justify-between group">
        <div class="flex items-center justify-between">
          <span class="text-gray-500 text-[11px] font-bold uppercase tracking-wider">Active</span>
          <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center transition-transform group-hover:scale-110">
            <i class="fa-solid fa-car text-xs"></i>
          </div>
        </div>
        <div class="mt-4">
          <div class="text-2xl font-extrabold text-gray-900">89</div>
          <div class="mt-1 text-[11px] text-gray-400 font-medium">Currently on road</div>
        </div>
      </div>

      <!-- Card: Completed -->
      <div class="p-5 bg-white border border-gray-200/80 rounded-xl shadow-xs hover:shadow-md hover:border-gray-300 transition-all flex flex-col justify-between group">
        <div class="flex items-center justify-between">
          <span class="text-gray-500 text-[11px] font-bold uppercase tracking-wider">Completed</span>
          <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center transition-transform group-hover:scale-110">
            <i class="fa-solid fa-circle-check text-xs"></i>
          </div>
        </div>
        <div class="mt-4">
          <div class="text-2xl font-extrabold text-gray-900">945</div>
          <div class="mt-1 text-[11px] text-gray-400 font-medium">Successfully returned</div>
        </div>
      </div>

      <!-- Card: Cancelled -->
      <div class="p-5 bg-white border border-gray-200/80 rounded-xl shadow-xs hover:shadow-md hover:border-gray-300 transition-all flex flex-col justify-between group">
        <div class="flex items-center justify-between">
          <span class="text-gray-500 text-[11px] font-bold uppercase tracking-wider">Cancelled</span>
          <div class="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center transition-transform group-hover:scale-110">
            <i class="fa-regular fa-circle-xmark text-xs"></i>
          </div>
        </div>
        <div class="mt-4">
          <div class="text-2xl font-extrabold text-gray-900">16</div>
          <div class="mt-1 text-[11px] text-gray-400 font-medium">1.2% rate</div>
        </div>
      </div>

    </div>

    <!-- Filtering & Management Bar -->
    <div class="p-4 bg-white border border-gray-200/80 rounded-xl shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="relative w-full md:w-80">
        <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
        <input 
          type="text" 
          v-model="searchQuery"
          placeholder="Search booking ID or customer..." 
          class="w-full h-9 pl-9 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
        >
      </div>

      <div class="flex items-center gap-3 w-full md:w-auto justify-end">
        <select class="h-9 px-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer">
          <option>All Statuses</option>
          <option>Pending</option>
          <option>Confirmed</option>
          <option>Active</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>

        <button class="h-9 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-all flex items-center gap-2 cursor-pointer">
          <i class="fa-solid fa-filter text-[10px] text-gray-500"></i>
          <span>More Filters</span>
        </button>
      </div>
    </div>

  </main>
</template>

<script setup>
import { ref } from 'vue'
const searchQuery = ref('')
defineEmits(['export', 'new-booking'])
</script>