<template>
  <main class="p-6 md:p-8 min-h-[calc(100vh-64px)] bg-gray-50/50">
    
    <!-- Page Header & Top Search/Action Bar -->
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Brands</h1>
        <p class="text-xs text-gray-500 mt-1">Manage manufacturer profiles and brand distribution</p>
      </div>
      
      <div class="flex items-center gap-3 w-full md:w-auto">
        <div class="relative flex-1 md:w-64">
          <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Search brands..." 
            class="w-full h-9 pl-9 pr-4 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-xs"
          >
        </div>
        <button 
          @click="$emit('add-brand')" 
          class="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-xs shrink-0 active:scale-95 cursor-pointer"
        >
          <i class="fa-solid fa-plus text-[10px]"></i> 
          <span>Add Brand</span>
        </button>
      </div>
    </div>

    <!-- 3 KPI Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      
      <!-- Card 1: Total Brands -->
      <div class="p-5 bg-white border border-gray-200/80 rounded-xl shadow-xs hover:border-gray-300 transition-all flex items-center justify-between">
        <div>
          <span class="text-gray-500 text-[11px] font-bold uppercase tracking-wider">Total Brands</span>
          <div class="mt-2 text-2xl font-extrabold text-gray-900">12</div>
          <p class="text-[11px] text-gray-400 mt-0.5 font-medium">Registered manufacturers</p>
        </div>
        <div class="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm">
          <i class="fa-solid fa-shield-halved"></i>
        </div>
      </div>

      <!-- Card 2: Active Brands -->
      <div class="p-5 bg-white border border-gray-200/80 rounded-xl shadow-xs hover:border-gray-300 transition-all flex items-center justify-between">
        <div>
          <span class="text-gray-500 text-[11px] font-bold uppercase tracking-wider">Active Brands</span>
          <div class="mt-2 text-2xl font-extrabold text-gray-900">10</div>
          <p class="text-[11px] text-emerald-600 font-bold mt-0.5 inline-flex items-center gap-1">
            <i class="fa-solid fa-circle-check text-[10px]"></i> 83% Operational ratio
          </p>
        </div>
        <div class="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm">
          <i class="fa-solid fa-circle-check"></i>
        </div>
      </div>

      <!-- Card 3: Top Brand -->
      <div class="p-5 bg-white border border-gray-200/80 rounded-xl shadow-xs hover:border-gray-300 transition-all flex items-center justify-between sm:col-span-2 lg:col-span-1">
        <div>
          <span class="text-gray-500 text-[11px] font-bold uppercase tracking-wider">Largest Share</span>
          <div class="mt-2 text-2xl font-extrabold text-gray-900">Toyota</div>
          <p class="text-[11px] text-gray-400 mt-0.5 font-medium">45 Fleet Vehicles (18%)</p>
        </div>
        <div class="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">
          <i class="fa-solid fa-car"></i>
        </div>
      </div>

    </div>

    <!-- Filter Control Bar -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-2">
        <h2 class="font-bold text-sm text-gray-900">All Brand Cards</h2>
        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-600">12 Brands</span>
      </div>

      <div class="flex items-center gap-2">
        <select class="h-8 px-3 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer shadow-xs">
          <option>All Statuses</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>
    </div>

    <!-- Brand Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      
      <!-- Card: Toyota -->
      <div class="bg-white border border-gray-200/80 rounded-xl shadow-xs p-5 hover:border-gray-300 transition-all flex flex-col justify-between group">
        <div>
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-900 shrink-0 font-bold text-sm group-hover:border-blue-500/30 transition-colors">
                <i class="fa-solid fa-car text-gray-700"></i>
              </div>
              <div>
                <h3 class="font-bold text-gray-900 text-sm">Toyota</h3>
                <span class="px-2 py-0.5 text-[10px] font-bold inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 rounded-full mt-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Active
                </span>
              </div>
            </div>
            
            <button class="w-7 h-7 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors inline-flex items-center justify-center cursor-pointer">
              <i class="fa-solid fa-ellipsis-vertical text-xs"></i>
            </button>
          </div>

          <div class="grid grid-cols-2 gap-3 py-3 border-y border-gray-100 my-3 text-xs">
            <div>
              <span class="text-[11px] text-gray-400 font-medium">Fleet Size</span>
              <div class="text-base font-extrabold text-gray-900 mt-0.5">45 <span class="text-[10px] font-normal text-gray-400">units</span></div>
            </div>
            <div>
              <span class="text-[11px] text-gray-400 font-medium">Categories</span>
              <div class="text-xs font-bold text-gray-700 mt-1 truncate">SUV, Sedan, Truck</div>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-end gap-2 pt-1">
          <button class="h-8 px-3 rounded-lg text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-all inline-flex items-center gap-1.5 cursor-pointer">
            <i class="fa-regular fa-eye text-[11px] text-gray-400"></i>
            <span>View</span>
          </button>
          <button class="h-8 px-3 rounded-lg text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-all inline-flex items-center gap-1.5 cursor-pointer">
            <i class="fa-solid fa-pen text-[11px] text-gray-400"></i>
            <span>Edit</span>
          </button>
        </div>
      </div>

      <!-- Card: Honda -->
      <div class="bg-white border border-gray-200/80 rounded-xl shadow-xs p-5 hover:border-gray-300 transition-all flex flex-col justify-between group">
        <div>
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-900 shrink-0 font-bold text-sm group-hover:border-blue-500/30 transition-colors">
                <i class="fa-solid fa-h text-gray-700"></i>
              </div>
              <div>
                <h3 class="font-bold text-gray-900 text-sm">Honda</h3>
                <span class="px-2 py-0.5 text-[10px] font-bold inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 rounded-full mt-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Active
                </span>
              </div>
            </div>
            
            <button class="w-7 h-7 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors inline-flex items-center justify-center cursor-pointer">
              <i class="fa-solid fa-ellipsis-vertical text-xs"></i>
            </button>
          </div>

          <div class="grid grid-cols-2 gap-3 py-3 border-y border-gray-100 my-3 text-xs">
            <div>
              <span class="text-[11px] text-gray-400 font-medium">Fleet Size</span>
              <div class="text-base font-extrabold text-gray-900 mt-0.5">32 <span class="text-[10px] font-normal text-gray-400">units</span></div>
            </div>
            <div>
              <span class="text-[11px] text-gray-400 font-medium">Categories</span>
              <div class="text-xs font-bold text-gray-700 mt-1 truncate">Sedan, SUV, Van</div>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-end gap-2 pt-1">
          <button class="h-8 px-3 rounded-lg text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-all inline-flex items-center gap-1.5 cursor-pointer">
            <i class="fa-regular fa-eye text-[11px] text-gray-400"></i>
            <span>View</span>
          </button>
          <button class="h-8 px-3 rounded-lg text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-all inline-flex items-center gap-1.5 cursor-pointer">
            <i class="fa-solid fa-pen text-[11px] text-gray-400"></i>
            <span>Edit</span>
          </button>
        </div>
      </div>

      <!-- Card: Ford -->
      <div class="bg-white border border-gray-200/80 rounded-xl shadow-xs p-5 hover:border-gray-300 transition-all flex flex-col justify-between group">
        <div>
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-900 shrink-0 font-bold text-sm group-hover:border-blue-500/30 transition-colors">
                <i class="fa-solid fa-truck-pickup text-gray-700"></i>
              </div>
              <div>
                <h3 class="font-bold text-gray-900 text-sm">Ford</h3>
                <span class="px-2 py-0.5 text-[10px] font-bold inline-flex items-center gap-1 bg-rose-50 text-rose-700 rounded-full mt-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                  Inactive
                </span>
              </div>
            </div>
            
            <button class="w-7 h-7 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors inline-flex items-center justify-center cursor-pointer">
              <i class="fa-solid fa-ellipsis-vertical text-xs"></i>
            </button>
          </div>

          <div class="grid grid-cols-2 gap-3 py-3 border-y border-gray-100 my-3 text-xs">
            <div>
              <span class="text-[11px] text-gray-400 font-medium">Fleet Size</span>
              <div class="text-base font-extrabold text-gray-900 mt-0.5">28 <span class="text-[10px] font-normal text-gray-400">units</span></div>
            </div>
            <div>
              <span class="text-[11px] text-gray-400 font-medium">Categories</span>
              <div class="text-xs font-bold text-gray-700 mt-1 truncate">Truck, SUV, Van</div>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-end gap-2 pt-1">
          <button class="h-8 px-3 rounded-lg text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-all inline-flex items-center gap-1.5 cursor-pointer">
            <i class="fa-regular fa-eye text-[11px] text-gray-400"></i>
            <span>View</span>
          </button>
          <button class="h-8 px-3 rounded-lg text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-all inline-flex items-center gap-1.5 cursor-pointer">
            <i class="fa-solid fa-pen text-[11px] text-gray-400"></i>
            <span>Edit</span>
          </button>
        </div>
      </div>

    </div>

  </main>
</template>

<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
defineEmits(['add-brand'])
</script>