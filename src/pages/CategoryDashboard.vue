<template>
  <main class="p-6 md:p-8 min-h-[calc(100vh-64px)] bg-gray-50/50">
    
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Categories</h1>
        <p class="text-xs text-gray-500 mt-1">Manage vehicle classifications and fleet distribution</p>
      </div>
      
      <div class="flex items-center gap-3 w-full md:w-auto">
        <div class="relative flex-1 md:w-64">
          <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Search categories..." 
            class="w-full h-9 pl-9 pr-4 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-xs"
          >
        </div>
        <button 
          @click="$emit('add-category')" 
          class="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-xs shrink-0 active:scale-95 cursor-pointer"
        >
          <i class="fa-solid fa-plus text-[10px]"></i> 
          <span>Add Category</span>
        </button>
      </div>
    </div>

    <!-- 3 KPI Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      
      <!-- Card 1: Total Categories -->
      <div class="p-5 bg-white border border-gray-200/80 rounded-xl shadow-xs hover:border-gray-300 transition-all flex items-center justify-between">
        <div>
          <span class="text-gray-500 text-[11px] font-bold uppercase tracking-wider">Total Categories</span>
          <div class="mt-2 text-2xl font-extrabold text-gray-900">6</div>
          <p class="text-[11px] text-gray-400 mt-0.5 font-medium">Active fleet groups</p>
        </div>
        <div class="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm">
          <i class="fa-solid fa-shapes"></i>
        </div>
      </div>

      <!-- Card 2: Total Vehicles -->
      <div class="p-5 bg-white border border-gray-200/80 rounded-xl shadow-xs hover:border-gray-300 transition-all flex items-center justify-between">
        <div>
          <span class="text-gray-500 text-[11px] font-bold uppercase tracking-wider">Total Fleet Size</span>
          <div class="mt-2 text-2xl font-extrabold text-gray-900">248</div>
          <p class="text-[11px] text-gray-400 mt-0.5 font-medium">Vehicles assigned</p>
        </div>
        <div class="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">
          <i class="fa-solid fa-car"></i>
        </div>
      </div>

      <!-- Card 3: Top Category -->
      <div class="p-5 bg-white border border-gray-200/80 rounded-xl shadow-xs hover:border-gray-300 transition-all flex items-center justify-between sm:col-span-2 lg:col-span-1">
        <div>
          <span class="text-gray-500 text-[11px] font-bold uppercase tracking-wider">Top Demand Category</span>
          <div class="mt-2 text-2xl font-extrabold text-gray-900">SUV</div>
          <p class="text-[11px] text-emerald-600 font-bold mt-0.5 inline-flex items-center gap-1">
            <i class="fa-solid fa-arrow-trend-up text-[10px]"></i> 102 Vehicles (41%)
          </p>
        </div>
        <div class="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm">
          <i class="fa-solid fa-chart-pie"></i>
        </div>
      </div>

    </div>

    <!-- Category Directory Card Table -->
    <div class="bg-white border border-gray-200/80 rounded-xl shadow-xs overflow-hidden mb-6">
      
      <!-- Table Filter Header -->
      <div class="flex items-center justify-between p-4 px-6 border-b border-gray-200/80 bg-white">
        <div class="flex items-center gap-2">
          <h2 class="font-bold text-sm text-gray-900">Category Directory</h2>
          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-600">6 Items</span>
        </div>
        
        <div class="flex items-center gap-2">
          <select class="h-8 px-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer">
            <option>All Statuses</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-gray-700">
          <thead>
            <tr class="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider text-[10px] border-b border-gray-200">
              <th class="py-3 px-6">Category</th>
              <th class="py-3 px-5">Description</th>
              <th class="py-3 px-5">Fleet Count</th>
              <th class="py-3 px-5">Associated Brands</th>
              <th class="py-3 px-5">Created Date</th>
              <th class="py-3 px-5">Status</th>
              <th class="py-3 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            
            <!-- Row 1 -->
            <tr class="hover:bg-gray-50/80 transition-colors">
              <td class="py-3.5 px-6">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <i class="fa-solid fa-van-shuttle text-xs"></i>
                  </div>
                  <span class="font-bold text-gray-900 text-xs">SUV</span>
                </div>
              </td>
              <td class="py-3.5 px-5 text-gray-500 max-w-xs truncate">Sport Utility Vehicles for families and off-road trips</td>
              <td class="py-3.5 px-5 font-bold text-gray-900">102</td>
              <td class="py-3.5 px-5 text-gray-600 font-medium">Toyota, Ford, Honda</td>
              <td class="py-3.5 px-5 text-gray-400">Oct 12, 2023</td>
              <td class="py-3.5 px-5">
                <span class="px-2.5 py-1 text-[10px] font-bold inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 rounded-full">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Active
                </span>
              </td>
              <td class="py-3.5 px-6 text-right">
                <button class="w-7 h-7 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors inline-flex items-center justify-center cursor-pointer">
                  <i class="fa-solid fa-ellipsis-vertical text-xs"></i>
                </button>
              </td>
            </tr>

            <!-- Row 2 -->
            <tr class="hover:bg-gray-50/80 transition-colors">
              <td class="py-3.5 px-6">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <i class="fa-solid fa-car-side text-xs"></i>
                  </div>
                  <span class="font-bold text-gray-900 text-xs">Sedan</span>
                </div>
              </td>
              <td class="py-3.5 px-5 text-gray-500 max-w-xs truncate">Standard 4-door passenger cars for city commuting</td>
              <td class="py-3.5 px-5 font-bold text-gray-900">85</td>
              <td class="py-3.5 px-5 text-gray-600 font-medium">Nissan, Hyundai, Kia</td>
              <td class="py-3.5 px-5 text-gray-400">Oct 14, 2023</td>
              <td class="py-3.5 px-5">
                <span class="px-2.5 py-1 text-[10px] font-bold inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 rounded-full">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Active
                </span>
              </td>
              <td class="py-3.5 px-6 text-right">
                <button class="w-7 h-7 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors inline-flex items-center justify-center cursor-pointer">
                  <i class="fa-solid fa-ellipsis-vertical text-xs"></i>
                </button>
              </td>
            </tr>

            <!-- Row 3 -->
            <tr class="hover:bg-gray-50/80 transition-colors">
              <td class="py-3.5 px-6">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <i class="fa-solid fa-car text-xs"></i>
                  </div>
                  <span class="font-bold text-gray-900 text-xs">Hatchback</span>
                </div>
              </td>
              <td class="py-3.5 px-5 text-gray-500 max-w-xs truncate">Compact cars with a rear door that swings upward</td>
              <td class="py-3.5 px-5 font-bold text-gray-900">34</td>
              <td class="py-3.5 px-5 text-gray-600 font-medium">Volkswagen, Mazda</td>
              <td class="py-3.5 px-5 text-gray-400">Nov 02, 2023</td>
              <td class="py-3.5 px-5">
                <span class="px-2.5 py-1 text-[10px] font-bold inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 rounded-full">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Active
                </span>
              </td>
              <td class="py-3.5 px-6 text-right">
                <button class="w-7 h-7 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors inline-flex items-center justify-center cursor-pointer">
                  <i class="fa-solid fa-ellipsis-vertical text-xs"></i>
                </button>
              </td>
            </tr>

            <!-- Row 4 -->
            <tr class="hover:bg-gray-50/80 transition-colors">
              <td class="py-3.5 px-6">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <i class="fa-solid fa-truck-pickup text-xs"></i>
                  </div>
                  <span class="font-bold text-gray-900 text-xs">Pickup</span>
                </div>
              </td>
              <td class="py-3.5 px-5 text-gray-500 max-w-xs truncate">Light-duty trucks with an enclosed cab and open cargo bed</td>
              <td class="py-3.5 px-5 font-bold text-gray-900">15</td>
              <td class="py-3.5 px-5 text-gray-600 font-medium">Ford, Chevrolet, Ram</td>
              <td class="py-3.5 px-5 text-gray-400">Nov 15, 2023</td>
              <td class="py-3.5 px-5">
                <span class="px-2.5 py-1 text-[10px] font-bold inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 rounded-full">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Active
                </span>
              </td>
              <td class="py-3.5 px-6 text-right">
                <button class="w-7 h-7 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors inline-flex items-center justify-center cursor-pointer">
                  <i class="fa-solid fa-ellipsis-vertical text-xs"></i>
                </button>
              </td>
            </tr>

            <!-- Row 5 -->
            <tr class="hover:bg-gray-50/80 transition-colors">
              <td class="py-3.5 px-6">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 shrink-0">
                    <i class="fa-solid fa-bus text-xs"></i>
                  </div>
                  <span class="font-bold text-gray-900 text-xs">Van</span>
                </div>
              </td>
              <td class="py-3.5 px-5 text-gray-500 max-w-xs truncate">Passenger and cargo vans for group transportation</td>
              <td class="py-3.5 px-5 font-bold text-gray-900">8</td>
              <td class="py-3.5 px-5 text-gray-600 font-medium">Mercedes-Benz, Ford</td>
              <td class="py-3.5 px-5 text-gray-400">Dec 01, 2023</td>
              <td class="py-3.5 px-5">
                <span class="px-2.5 py-1 text-[10px] font-bold inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 rounded-full">
                  <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                  Inactive
                </span>
              </td>
              <td class="py-3.5 px-6 text-right">
                <button class="w-7 h-7 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors inline-flex items-center justify-center cursor-pointer">
                  <i class="fa-solid fa-ellipsis-vertical text-xs"></i>
                </button>
              </td>
            </tr>

            <!-- Row 6 -->
            <tr class="hover:bg-gray-50/80 transition-colors">
              <td class="py-3.5 px-6">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <i class="fa-solid fa-gem text-xs"></i>
                  </div>
                  <span class="font-bold text-gray-900 text-xs">Luxury</span>
                </div>
              </td>
              <td class="py-3.5 px-5 text-gray-500 max-w-xs truncate">High-end vehicles with premium features and performance</td>
              <td class="py-3.5 px-5 font-bold text-gray-900">4</td>
              <td class="py-3.5 px-5 text-gray-600 font-medium">BMW, Audi, Porsche</td>
              <td class="py-3.5 px-5 text-gray-400">Jan 10, 2024</td>
              <td class="py-3.5 px-5">
                <span class="px-2.5 py-1 text-[10px] font-bold inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 rounded-full">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Active
                </span>
              </td>
              <td class="py-3.5 px-6 text-right">
                <button class="w-7 h-7 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors inline-flex items-center justify-center cursor-pointer">
                  <i class="fa-solid fa-ellipsis-vertical text-xs"></i>
                </button>
              </td>
            </tr>

          </tbody>
        </table>
      </div>

    </div>

  </main>
</template>

<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
defineEmits(['add-category'])
</script>