<template>
  <main class="p-6 md:p-8 min-h-[calc(100vh-64px)] bg-gray-50/50">
    
    <!-- Page Header with Top Search & Add Button -->
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Vehicles</h1>
        <p class="text-xs text-gray-500 mt-1">Manage and monitor your rental fleet inventory</p>
      </div>
      
      <div class="flex items-center gap-3 w-full md:w-auto">
        <div class="relative flex-1 md:w-72">
          <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Search make, model, or plate..." 
            class="w-full h-9 pl-9 pr-4 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-xs"
          >
        </div>
        <button 
          @click="$emit('add-vehicle')" 
          class="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-xs shrink-0 active:scale-95 cursor-pointer"
        >
          <i class="fa-solid fa-plus text-[10px]"></i> 
          <span>Add Vehicle</span>
        </button>
      </div>
    </div>

    <!-- 5 KPI Cards Grid with Left Accent Borders -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      
      <!-- Total -->
      <div class="p-4 bg-white border border-gray-200/80 rounded-xl shadow-xs hover:border-gray-300 transition-all flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <span class="text-gray-500 text-[11px] font-bold uppercase tracking-wider">Total Fleet</span>
          <div class="w-7 h-7 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center text-xs">
            <i class="fa-solid fa-car"></i>
          </div>
        </div>
        <div class="mt-3">
          <div class="text-2xl font-extrabold text-gray-900">248</div>
          <p class="text-[11px] text-gray-400 mt-0.5 font-medium">All registered vehicles</p>
        </div>
      </div>

      <!-- Available -->
      <div class="p-4 bg-white border border-gray-200/80 border-l-4 border-l-emerald-500 rounded-xl shadow-xs hover:border-gray-300 transition-all flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <span class="text-gray-500 text-[11px] font-bold uppercase tracking-wider">Available</span>
          <div class="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
            <i class="fa-solid fa-circle-check"></i>
          </div>
        </div>
        <div class="mt-3">
          <div class="text-2xl font-extrabold text-emerald-600">112</div>
          <p class="text-[11px] text-gray-400 mt-0.5 font-medium">Ready for dispatch</p>
        </div>
      </div>

      <!-- Rented -->
      <div class="p-4 bg-white border border-gray-200/80 border-l-4 border-l-blue-600 rounded-xl shadow-xs hover:border-gray-300 transition-all flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <span class="text-gray-500 text-[11px] font-bold uppercase tracking-wider">On Rent</span>
          <div class="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs">
            <i class="fa-solid fa-key"></i>
          </div>
        </div>
        <div class="mt-3">
          <div class="text-2xl font-extrabold text-blue-600">105</div>
          <p class="text-[11px] text-gray-400 mt-0.5 font-medium">Currently active</p>
        </div>
      </div>

      <!-- Maintenance -->
      <div class="p-4 bg-white border border-gray-200/80 border-l-4 border-l-amber-500 rounded-xl shadow-xs hover:border-gray-300 transition-all flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <span class="text-gray-500 text-[11px] font-bold uppercase tracking-wider">Maintenance</span>
          <div class="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xs">
            <i class="fa-solid fa-wrench"></i>
          </div>
        </div>
        <div class="mt-3">
          <div class="text-2xl font-extrabold text-amber-600">24</div>
          <p class="text-[11px] text-gray-400 mt-0.5 font-medium">In service bay</p>
        </div>
      </div>

      <!-- Unavailable -->
      <div class="p-4 bg-white border border-gray-200/80 border-l-4 border-l-rose-500 rounded-xl shadow-xs hover:border-gray-300 transition-all flex flex-col justify-between sm:col-span-2 lg:col-span-1">
        <div class="flex items-center justify-between">
          <span class="text-gray-500 text-[11px] font-bold uppercase tracking-wider">Unavailable</span>
          <div class="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center text-xs">
            <i class="fa-solid fa-ban"></i>
          </div>
        </div>
        <div class="mt-3">
          <div class="text-2xl font-extrabold text-rose-600">7</div>
          <p class="text-[11px] text-gray-400 mt-0.5 font-medium">Out of service</p>
        </div>
      </div>

    </div>

    <!-- Multi-Filter Bar -->
    <div class="p-3 bg-white border border-gray-200/80 rounded-xl shadow-xs mb-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
      <select class="h-9 px-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer">
        <option>All Brands</option>
        <option>Toyota</option>
        <option>Ford</option>
        <option>Tesla</option>
        <option>BMW</option>
      </select>

      <select class="h-9 px-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer">
        <option>All Categories</option>
        <option>SUV</option>
        <option>Electric SUV</option>
        <option>Sedan</option>
        <option>Luxury</option>
      </select>

      <select class="h-9 px-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer">
        <option>Any Status</option>
        <option>Available</option>
        <option>Rented</option>
        <option>Maintenance</option>
        <option>Unavailable</option>
      </select>

      <select class="h-9 px-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer">
        <option>Price Range</option>
        <option>Under $50 / day</option>
        <option>$50 - $100 / day</option>
        <option>Above $100 / day</option>
      </select>

      <button class="col-span-2 sm:col-span-1 h-9 px-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-all flex items-center justify-center gap-2 cursor-pointer">
        <i class="fa-solid fa-sliders text-[10px] text-gray-500"></i>
        <span>More Filters</span>
      </button>
    </div>

    <!-- Vehicles Table Card -->
    <div class="bg-white border border-gray-200/80 rounded-xl shadow-xs overflow-hidden mb-6">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-gray-700">
          <thead>
            <tr class="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider text-[10px] border-b border-gray-200">
              <th class="py-3 px-5">Vehicle</th>
              <th class="py-3 px-5">Category & Make</th>
              <th class="py-3 px-5">Features</th>
              <th class="py-3 px-5">Plate & Year</th>
              <th class="py-3 px-5">Rate</th>
              <th class="py-3 px-5">Status</th>
              <th class="py-3 px-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            
            <!-- Row 1 -->
            <tr class="hover:bg-gray-50/80 transition-colors">
              <td class="py-3.5 px-5">
                <div class="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1590362891991-f776e747a588?w=120" alt="Toyota RAV4" class="w-12 h-9 rounded-md object-cover border border-gray-200 bg-gray-100">
                  <div>
                    <div class="font-bold text-gray-900 text-xs">Toyota RAV4 Hybrid</div>
                    <div class="text-[11px] text-gray-400 font-medium">XLE Premium Trim</div>
                  </div>
                </div>
              </td>
              <td class="py-3.5 px-5">
                <div class="font-semibold text-gray-900">SUV</div>
                <div class="text-[11px] text-gray-400">Toyota</div>
              </td>
              <td class="py-3.5 px-5">
                <div class="flex items-center gap-1.5 text-gray-400">
                  <span class="w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center text-[10px]" title="Hybrid/Electric"><i class="fa-solid fa-bolt"></i></span>
                  <span class="w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center text-[10px]" title="Automatic"><i class="fa-solid fa-gauge-high"></i></span>
                  <span class="w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center text-[10px]" title="5 Seats"><i class="fa-solid fa-user-group"></i></span>
                </div>
              </td>
              <td class="py-3.5 px-5">
                <div class="font-mono font-bold text-gray-900 text-[11px]">ABC-1234</div>
                <div class="text-[11px] text-gray-400">2023 Model</div>
              </td>
              <td class="py-3.5 px-5">
                <span class="font-extrabold text-gray-900 text-sm">$75</span>
                <span class="text-[10px] text-gray-400 font-normal"> / day</span>
              </td>
              <td class="py-3.5 px-5">
                <span class="px-2.5 py-1 text-[10px] font-bold inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 rounded-full">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Available
                </span>
              </td>
              <td class="py-3.5 px-5 text-right">
                <button class="w-7 h-7 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors inline-flex items-center justify-center cursor-pointer">
                  <i class="fa-solid fa-ellipsis-vertical text-xs"></i>
                </button>
              </td>
            </tr>

            <!-- Row 2 -->
            <tr class="hover:bg-gray-50/80 transition-colors">
              <td class="py-3.5 px-5">
                <div class="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1617788138017-80ad40651399?w=120" alt="Ford Mustang Mach-E" class="w-12 h-9 rounded-md object-cover border border-gray-200 bg-gray-100">
                  <div>
                    <div class="font-bold text-gray-900 text-xs">Ford Mustang Mach-E</div>
                    <div class="text-[11px] text-gray-400 font-medium">Select RWD</div>
                  </div>
                </div>
              </td>
              <td class="py-3.5 px-5">
                <div class="font-semibold text-gray-900">Electric SUV</div>
                <div class="text-[11px] text-gray-400">Ford</div>
              </td>
              <td class="py-3.5 px-5">
                <div class="flex items-center gap-1.5 text-gray-400">
                  <span class="w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center text-[10px]" title="Fully Electric"><i class="fa-solid fa-bolt"></i></span>
                  <span class="w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center text-[10px]" title="Automatic"><i class="fa-solid fa-gauge-high"></i></span>
                  <span class="w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center text-[10px]" title="5 Seats"><i class="fa-solid fa-user-group"></i></span>
                </div>
              </td>
              <td class="py-3.5 px-5">
                <div class="font-mono font-bold text-gray-900 text-[11px]">XYZ-9876</div>
                <div class="text-[11px] text-gray-400">2024 Model</div>
              </td>
              <td class="py-3.5 px-5">
                <span class="font-extrabold text-gray-900 text-sm">$110</span>
                <span class="text-[10px] text-gray-400 font-normal"> / day</span>
              </td>
              <td class="py-3.5 px-5">
                <span class="px-2.5 py-1 text-[10px] font-bold inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 rounded-full">
                  <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  Rented
                </span>
              </td>
              <td class="py-3.5 px-5 text-right">
                <button class="w-7 h-7 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors inline-flex items-center justify-center cursor-pointer">
                  <i class="fa-solid fa-ellipsis-vertical text-xs"></i>
                </button>
              </td>
            </tr>

          </tbody>
        </table>
      </div>

      <!-- Pagination Footer -->
      <div class="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-gray-100 text-xs text-gray-500 gap-3">
        <div>Showing <span class="font-bold text-gray-900">1–2</span> of <span class="font-bold text-gray-900">248</span> vehicles</div>
        <div class="flex items-center gap-1">
          <button class="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center hover:bg-gray-100 text-gray-500 cursor-pointer transition-colors disabled:opacity-50"><i class="fa-solid fa-chevron-left text-[10px]"></i></button>
          <button class="w-7 h-7 rounded-md font-bold bg-blue-600 text-white flex items-center justify-center shadow-xs">1</button>
          <button class="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center hover:bg-gray-100 font-medium text-gray-700 cursor-pointer transition-colors">2</button>
          <button class="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center hover:bg-gray-100 font-medium text-gray-700 cursor-pointer transition-colors">3</button>
          <span class="px-1 text-gray-400">...</span>
          <button class="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center hover:bg-gray-100 font-medium text-gray-700 cursor-pointer transition-colors">25</button>
          <button class="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center hover:bg-gray-100 text-gray-500 cursor-pointer transition-colors"><i class="fa-solid fa-chevron-right text-[10px]"></i></button>
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