<template>
  <main class="p-6  min-h-[calc(100vh-64px)]">
    
    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6 gap-4">
      <div>
        <h1 class="text-4xl font-bold tracking-tight text-[#111827]">Bookings</h1>
        <p class="text-[#43474E] text-xl mt-1">Manage and monitor all vehicle rental bookings</p>
      </div>
      <div class="flex items-center gap-3">
        <button @click="$emit('export')" class="inline-flex items-center justify-center gap-2 min-h-[40px] px-4 rounded-lg text-sm font-medium text-[#111827] bg-[#F1F3FF] border border-[#D3DAEF] hover:bg-[#E1E8FD] transition-all shadow-sm">
          <i class="fa-solid fa-download text-xs"></i> Export
        </button>
        <button @click="$emit('new-booking')" class="inline-flex items-center justify-center gap-2 min-h-[40px] px-4 rounded-lg text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-all shadow-sm">
          <i class="fa-solid fa-plus text-xs"></i> New Booking
        </button>
      </div>
    </div>

    <!-- 6 KPI Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
      
      <div class="p-5 bg-[#F1F3FF] border border-[#D3DAEF] rounded-xl shadow-sm flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <span class="text-[#7A8190] text-xs font-semibold tracking-wide">Total Bookings</span>
          <i class="fa-solid fa-calendar-days text-[#7A8190]"></i>
        </div>
        <div class="mt-2 text-3xl font-bold text-[#111827]">1,248</div>
        <div class="mt-2 text-xs font-medium text-[#15803D] flex items-center gap-1">
          <i class="fa-solid fa-arrow-trend-up"></i> +12% this month
        </div>
      </div>

      <div class="p-5 bg-[#F1F3FF] border border-[#D3DAEF] rounded-xl shadow-sm flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <span class="text-[#7A8190] text-xs font-semibold tracking-wide">Pending</span>
          <i class="fa-regular fa-clock text-[#F59E0B]"></i>
        </div>
        <div class="mt-2 text-3xl font-bold text-[#111827]">42</div>
      </div>

      <div class="p-5 bg-[#F1F3FF] border border-[#D3DAEF] rounded-xl shadow-sm flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <span class="text-[#7A8190] text-xs font-semibold tracking-wide">Confirmed</span>
          <i class="fa-regular fa-circle-check text-[#2563EB]"></i>
        </div>
        <div class="mt-2 text-3xl font-bold text-[#111827]">156</div>
      </div>

      <div class="p-5 bg-[#F1F3FF] border border-[#D3DAEF] rounded-xl shadow-sm flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <span class="text-[#7A8190] text-xs font-semibold tracking-wide">Active</span>
          <i class="fa-solid fa-car text-[#2563EB]"></i>
        </div>
        <div class="mt-2 text-3xl font-bold text-[#111827]">89</div>
      </div>

      <div class="p-5 bg-[#F1F3FF] border border-[#D3DAEF] rounded-xl shadow-sm flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <span class="text-[#7A8190] text-xs font-semibold tracking-wide">Completed</span>
          <i class="fa-solid fa-circle-check text-[#16A34A]"></i>
        </div>
        <div class="mt-2 text-3xl font-bold text-[#111827]">945</div>
      </div>

      <div class="p-5 bg-[#F1F3FF] border border-[#D3DAEF] rounded-xl shadow-sm flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <span class="text-[#7A8190] text-xs font-semibold tracking-wide">Cancelled</span>
          <i class="fa-regular fa-circle-xmark text-[#DC2626]"></i>
        </div>
        <div class="mt-2 text-3xl font-bold text-[#111827]">16</div>
      </div>

    </div>

    <!-- Filtering & Management Bar -->
    <div class="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      <div class="relative w-full md:w-96">
        <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-[#7A8190]"></i>
        <input 
          type="text" 
          v-model="searchQuery"
          placeholder="Search by booking ID or customer..." 
          class="w-full h-10 pl-10 pr-4 bg-[#F1F3FF] border border-[#D3DAEF] rounded-lg text-sm text-[#111827] placeholder:text-[#7A8190] focus:outline-none focus:border-[#2563EB]"
        >
      </div>

      <div class="flex items-center gap-3 w-full md:w-auto justify-end">
        <select class="h-10 px-3 bg-[#F1F3FF] border border-[#D3DAEF] rounded-lg text-sm font-medium text-[#111827] focus:outline-none focus:border-[#2563EB]">
          <option>All Statuses</option>
          <option>Pending</option>
          <option>Confirmed</option>
          <option>Active</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>

        <button class="h-10 px-3 bg-[#F1F3FF] border border-[#D3DAEF] rounded-lg text-[#43474E] hover:bg-[#E1E8FD] transition-colors">
          <i class="fa-solid fa-filter text-xs"></i>
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