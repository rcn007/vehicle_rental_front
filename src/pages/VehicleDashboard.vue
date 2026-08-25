<template>
  <main class="p-6 min-h-[calc(100vh-64px)]">
    
    <!-- Page Header with Top Search & Add Button -->
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
      <div>
        <h1 class="text-4xl font-bold tracking-tight text-[#111827]">Vehicles</h1>
        <p class="text-[#43474E] text-sm mt-1">Manage your rental fleet</p>
      </div>
      
      <div class="flex items-center gap-3 w-full md:w-auto">
        <div class="relative flex-1 md:w-72">
          <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-[#7A8190]"></i>
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Search vehicles..." 
            class="w-full h-10 pl-10 pr-4 bg-[#F1F3FF] border border-[#D3DAEF] rounded-lg text-sm text-[#111827] placeholder:text-[#7A8190] focus:outline-none focus:border-[#2563EB]"
          >
        </div>
        <button @click="$emit('add-vehicle')" class="inline-flex items-center justify-center gap-2 min-h-10 px-4 rounded-lg text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-all shadow-sm shrink-0">
          <i class="fa-solid fa-plus text-xs"></i> Add Vehicle
        </button>
      </div>
    </div>

    <!-- 5 KPI Cards Grid with Left Border Indicators -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      
      <div class="p-5 bg-[#F1F3FF] border border-[#D3DAEF] rounded-xl shadow-sm flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <span class="text-[#7A8190] text-xs font-semibold tracking-wide">TOTAL VEHICLES</span>
          <i class="fa-solid fa-car text-[#7A8190]"></i>
        </div>
        <div class="mt-2 text-2xl font-bold text-[#111827]">248</div>
      </div>

      <div class="p-5 bg-[#F1F3FF] border-l-4 border-l-[#16A34A] border border-[#D3DAEF] rounded-xl shadow-sm flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <span class="text-[#7A8190] text-xs font-semibold tracking-wide">AVAILABLE</span>
          <i class="fa-solid fa-circle-check text-[#16A34A]"></i>
        </div>
        <div class="mt-2 text-2xl font-bold text-[#16A34A]">112</div>
      </div>

      <div class="p-5 bg-[#F1F3FF] border-l-4 border-l-[#2563EB] border border-[#D3DAEF] rounded-xl shadow-sm flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <span class="text-[#7A8190] text-xs font-semibold tracking-wide">RENTED</span>
          <i class="fa-solid fa-car-side text-[#2563EB]"></i>
        </div>
        <div class="mt-2 text-2xl font-bold text-[#2563EB]">105</div>
      </div>

      <div class="p-5 bg-[#F1F3FF] border-l-4 border-l-[#D97706] border border-[#D3DAEF] rounded-xl shadow-sm flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <span class="text-[#7A8190] text-xs font-semibold tracking-wide">MAINTENANCE</span>
          <i class="fa-solid fa-wrench text-[#D97706]"></i>
        </div>
        <div class="mt-2 text-2xl font-bold text-[#D97706]">24</div>
      </div>

      <div class="p-5 bg-[#F1F3FF] border-l-4 border-l-[#DC2626] border border-[#D3DAEF] rounded-xl shadow-sm flex flex-col justify-between sm:col-span-2 lg:col-span-1">
        <div class="flex items-center justify-between">
          <span class="text-[#7A8190] text-xs font-semibold tracking-wide">UNAVAILABLE</span>
          <i class="fa-solid fa-ban text-[#DC2626]"></i>
        </div>
        <div class="mt-2 text-2xl font-bold text-[#DC2626]">7</div>
      </div>

    </div>

    <!-- Multi-Filter Bar -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
      <select class="h-10 px-3 bg-[#F1F3FF] border border-[#D3DAEF] rounded-lg text-sm font-medium text-[#111827] focus:outline-none focus:border-[#2563EB]">
        <option>All Brands</option>
        <option>Toyota</option>
        <option>Ford</option>
        <option>Tesla</option>
        <option>BMW</option>
      </select>

      <select class="h-10 px-3 bg-[#F1F3FF] border border-[#D3DAEF] rounded-lg text-sm font-medium text-[#111827] focus:outline-none focus:border-[#2563EB]">
        <option>All Categories</option>
        <option>SUV</option>
        <option>Electric SUV</option>
        <option>Sedan</option>
        <option>Luxury</option>
      </select>

      <select class="h-10 px-3 bg-[#F1F3FF] border border-[#D3DAEF] rounded-lg text-sm font-medium text-[#111827] focus:outline-none focus:border-[#2563EB]">
        <option>Any Status</option>
        <option>Available</option>
        <option>Rented</option>
        <option>Maintenance</option>
        <option>Unavailable</option>
      </select>

      <select class="h-10 px-3 bg-[#F1F3FF] border border-[#D3DAEF] rounded-lg text-sm font-medium text-[#111827] focus:outline-none focus:border-[#2563EB]">
        <option>Price Range</option>
        <option>Under $50 / day</option>
        <option>$50 - $100 / day</option>
        <option>Above $100 / day</option>
      </select>

      <button class="col-span-2 sm:col-span-1 h-10 px-4 bg-[#F1F3FF] border border-[#D3DAEF] rounded-lg text-sm font-medium text-[#43474E] hover:bg-[#E1E8FD] transition-colors flex items-center justify-center gap-2">
        <i class="fa-solid fa-filter text-xs"></i> More Filters
      </button>
    </div>

    <!-- Vehicles Table Card -->
    <div class="bg-[#F1F3FF] border border-[#D3DAEF] rounded-xl shadow-sm overflow-hidden mb-6">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-[#E1E8FD] text-[#43474E] text-xs font-semibold border-y border-[#D3DAEF]">
              <th class="p-3.5 pl-6">VEHICLE</th>
              <th class="p-3.5">CATEGORY / BRAND</th>
              <th class="p-3.5">SPECS</th>
              <th class="p-3.5">PLATE / YEAR</th>
              <th class="p-3.5">PRICE / DAY</th>
              <th class="p-3.5">STATUS</th>
              <th class="p-3.5 pr-6 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#E1E6F5]">
            
            <tr class="hover:bg-[#E1E8FD]/40 transition-colors">
              <td class="p-4 pl-6">
                <div class="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1590362891991-f776e747a588?w=120" alt="Toyota RAV4" class="w-14 h-9 rounded object-cover border border-[#D3DAEF]">
                  <div>
                    <div class="font-semibold text-[#111827] text-sm">Toyota RAV4 Hybrid</div>
                    <div class="text-xs text-[#7A8190]">XLE Premium</div>
                  </div>
                </div>
              </td>
              <td class="p-4">
                <div class="text-sm font-medium text-[#111827]">SUV</div>
                <div class="text-xs text-[#7A8190]">Toyota</div>
              </td>
              <td class="p-4">
                <div class="flex items-center gap-2 text-[#7A8190] text-sm">
                  <i class="fa-solid fa-bolt text-xs" title="Electric/Hybrid"></i>
                  <i class="fa-solid fa-gauge-high text-xs" title="Performance"></i>
                  <i class="fa-solid fa-user-group text-xs" title="Seating Capacity"></i>
                </div>
              </td>
              <td class="p-4">
                <div class="text-sm font-medium text-[#111827]">ABC-1234</div>
                <div class="text-xs text-[#7A8190]">2023</div>
              </td>
              <td class="p-4 text-sm font-bold text-[#111827]">$75.00</td>
              <td class="p-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#DCFCE7] text-[#15803D]">Available</span>
              </td>
              <td class="p-4 pr-6 text-right">
                <button class="text-[#7A8190] hover:text-[#111827]"><i class="fa-solid fa-ellipsis-vertical"></i></button>
              </td>
            </tr>

            <tr class="hover:bg-[#E1E8FD]/40 transition-colors">
              <td class="p-4 pl-6">
                <div class="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1617788138017-80ad40651399?w=120" alt="Ford Mustang Mach-E" class="w-14 h-9 rounded object-cover border border-[#D3DAEF]">
                  <div>
                    <div class="font-semibold text-[#111827] text-sm">Ford Mustang Mach-E</div>
                    <div class="text-xs text-[#7A8190]">Select RWD</div>
                  </div>
                </div>
              </td>
              <td class="p-4">
                <div class="text-sm font-medium text-[#111827]">Electric SUV</div>
                <div class="text-xs text-[#7A8190]">Ford</div>
              </td>
              <td class="p-4">
                <div class="flex items-center gap-2 text-[#7A8190] text-sm">
                  <i class="fa-solid fa-bolt text-xs" title="Electric"></i>
                  <i class="fa-solid fa-car text-xs" title="Body Style"></i>
                  <i class="fa-solid fa-user-group text-xs" title="Seating Capacity"></i>
                </div>
              </td>
              <td class="p-4">
                <div class="text-sm font-medium text-[#111827]">XYZ-9876</div>
                <div class="text-xs text-[#7A8190]">2024</div>
              </td>
              <td class="p-4 text-sm font-bold text-[#111827]">$110.00</td>
              <td class="p-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#DBEAFE] text-[#1D4ED8]">Rented</span>
              </td>
              <td class="p-4 pr-6 text-right">
                <button class="text-[#7A8190] hover:text-[#111827]"><i class="fa-solid fa-ellipsis-vertical"></i></button>
              </td>
            </tr>

          </tbody>
        </table>
      </div>

      <!-- Pagination Footer -->
      <div class="flex items-center justify-between p-4 px-6 border-t border-[#D3DAEF] text-sm text-[#43474E]">
        <div>Showing <span class="font-semibold text-[#111827]">1 to 2</span> of <span class="font-semibold text-[#111827]">248</span> entries</div>
        <div class="flex items-center gap-1">
          <button class="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#E1E8FD] text-[#7A8190]"><i class="fa-solid fa-chevron-left text-xs"></i></button>
          <button class="w-8 h-8 rounded-lg flex items-center justify-center font-semibold bg-[#2563EB] text-white shadow-sm">1</button>
          <button class="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#E1E8FD] font-medium text-[#111827]">2</button>
          <button class="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#E1E8FD] font-medium text-[#111827]">3</button>
          <span class="px-2 text-[#7A8190]">...</span>
          <button class="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#E1E8FD] font-medium text-[#111827]">25</button>
          <button class="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#E1E8FD] text-[#111827]"><i class="fa-solid fa-chevron-right text-xs"></i></button>
        </div>
      </div>
    </div>

  </main>
</template>

<script setup>
import { ref } from 'vue'
const searchQuery = ref('')
defineEmits(['add-vehicle'])
</script>