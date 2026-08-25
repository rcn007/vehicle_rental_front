<template>
  <main class="p-6  min-h-[calc(100vh-64px)]">
    
    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6 gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-[#111827]">Brands</h1>
        <p class="text-[#43474E] text-sm mt-1">Manage vehicle brands</p>
      </div>
      <div>
        <button @click="$emit('add-brand')" class="inline-flex items-center justify-center gap-2 min-h-[40px] px-4 rounded-lg text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-all shadow-sm">
          <i class="fa-solid fa-plus text-xs"></i> Add Brand
        </button>
      </div>
    </div>

    <!-- 3 KPI Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      
      <div class="p-5 bg-[#F1F3FF] border border-[#D3DAEF] rounded-xl shadow-sm flex items-center justify-between">
        <div>
          <span class="text-[#7A8190] text-xs font-semibold tracking-wide">TOTAL BRANDS</span>
          <div class="mt-2 text-2xl font-bold text-[#111827]">12</div>
        </div>
        <div class="w-10 h-10 rounded-full bg-[#E1E8FD] text-[#2563EB] flex items-center justify-center">
          <i class="fa-solid fa-shield-halved text-sm"></i>
        </div>
      </div>

      <div class="p-5 bg-[#F1F3FF] border border-[#D3DAEF] rounded-xl shadow-sm flex items-center justify-between">
        <div>
          <span class="text-[#7A8190] text-xs font-semibold tracking-wide">ACTIVE BRANDS</span>
          <div class="mt-2 text-2xl font-bold text-[#111827]">10</div>
        </div>
        <div class="w-10 h-10 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center">
          <i class="fa-solid fa-circle-check text-sm"></i>
        </div>
      </div>

      <div class="p-5 bg-[#F1F3FF] border border-[#D3DAEF] rounded-xl shadow-sm flex items-center justify-between sm:col-span-2 lg:col-span-1">
        <div>
          <span class="text-[#7A8190] text-xs font-semibold tracking-wide">TOP BRAND</span>
          <div class="mt-2 text-2xl font-bold text-[#111827]">Toyota <span class="text-sm font-normal text-[#7A8190]">(45)</span></div>
        </div>
        <div class="w-10 h-10 rounded-full bg-[#E1E8FD] text-[#2563EB] flex items-center justify-center">
          <i class="fa-solid fa-car text-sm"></i>
        </div>
      </div>

    </div>

    <!-- Brand Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      <!-- Toyota Brand Card -->
      <div class="bg-[#F1F3FF] border border-[#D3DAEF] rounded-xl shadow-sm p-5 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-lg bg-white border border-[#D3DAEF] flex items-center justify-center shadow-sm">
                <i class="fa-solid fa-car text-[#111827] text-base"></i>
              </div>
              <div>
                <h3 class="font-bold text-[#111827] text-base">Toyota</h3>
                <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-[#DCFCE7] text-[#15803D] mt-0.5">Active</span>
              </div>
            </div>
            <button class="text-[#7A8190] hover:text-[#111827] p-1"><i class="fa-solid fa-ellipsis-vertical"></i></button>
          </div>

          <div class="grid grid-cols-2 gap-4 py-3 border-y border-[#D3DAEF] my-3">
            <div>
              <div class="text-xs text-[#7A8190]">Vehicles</div>
              <div class="text-lg font-bold text-[#111827] mt-0.5">45</div>
            </div>
            <div>
              <div class="text-xs text-[#7A8190]">Categories</div>
              <div class="text-sm font-semibold text-[#111827] mt-0.5 truncate">SUV, Sedan, Truck</div>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-end gap-3 pt-2">
          <button class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#43474E] bg-white border border-[#D3DAEF] hover:bg-[#E1E8FD] transition-colors shadow-sm">
            <i class="fa-regular fa-eye text-xs"></i> View
          </button>
          <button class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#43474E] bg-white border border-[#D3DAEF] hover:bg-[#E1E8FD] transition-colors shadow-sm">
            <i class="fa-solid fa-pen text-xs"></i> Edit
          </button>
        </div>
      </div>

      <!-- Honda Brand Card -->
      <div class="bg-[#F1F3FF] border border-[#D3DAEF] rounded-xl shadow-sm p-5 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-lg bg-white border border-[#D3DAEF] flex items-center justify-center shadow-sm">
                <i class="fa-solid fa-h text-[#111827] font-bold text-base"></i>
              </div>
              <div>
                <h3 class="font-bold text-[#111827] text-base">Honda</h3>
                <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-[#DCFCE7] text-[#15803D] mt-0.5">Active</span>
              </div>
            </div>
            <button class="text-[#7A8190] hover:text-[#111827] p-1"><i class="fa-solid fa-ellipsis-vertical"></i></button>
          </div>

          <div class="grid grid-cols-2 gap-4 py-3 border-y border-[#D3DAEF] my-3">
            <div>
              <div class="text-xs text-[#7A8190]">Vehicles</div>
              <div class="text-lg font-bold text-[#111827] mt-0.5">32</div>
            </div>
            <div>
              <div class="text-xs text-[#7A8190]">Categories</div>
              <div class="text-sm font-semibold text-[#111827] mt-0.5 truncate">Sedan, SUV, Van</div>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-end gap-3 pt-2">
          <button class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#43474E] bg-white border border-[#D3DAEF] hover:bg-[#E1E8FD] transition-colors shadow-sm">
            <i class="fa-regular fa-eye text-xs"></i> View
          </button>
          <button class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#43474E] bg-white border border-[#D3DAEF] hover:bg-[#E1E8FD] transition-colors shadow-sm">
            <i class="fa-solid fa-pen text-xs"></i> Edit
          </button>
        </div>
      </div>

      <!-- Ford Brand Card -->
      <div class="bg-[#F1F3FF] border border-[#D3DAEF] rounded-xl shadow-sm p-5 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-lg bg-white border border-[#D3DAEF] flex items-center justify-center shadow-sm">
                <i class="fa-solid fa-truck-pickup text-[#111827] text-base"></i>
              </div>
              <div>
                <h3 class="font-bold text-[#111827] text-base">Ford</h3>
                <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-[#FEE2E2] text-[#B91C1C] mt-0.5">Inactive</span>
              </div>
            </div>
            <button class="text-[#7A8190] hover:text-[#111827] p-1"><i class="fa-solid fa-ellipsis-vertical"></i></button>
          </div>

          <div class="grid grid-cols-2 gap-4 py-3 border-y border-[#D3DAEF] my-3">
            <div>
              <div class="text-xs text-[#7A8190]">Vehicles</div>
              <div class="text-lg font-bold text-[#111827] mt-0.5">28</div>
            </div>
            <div>
              <div class="text-xs text-[#7A8190]">Categories</div>
              <div class="text-sm font-semibold text-[#111827] mt-0.5 truncate">Truck, SUV, Van</div>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-end gap-3 pt-2">
          <button class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#43474E] bg-white border border-[#D3DAEF] hover:bg-[#E1E8FD] transition-colors shadow-sm">
            <i class="fa-regular fa-eye text-xs"></i> View
          </button>
          <button class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#43474E] bg-white border border-[#D3DAEF] hover:bg-[#E1E8FD] transition-colors shadow-sm">
            <i class="fa-solid fa-pen text-xs"></i> Edit
          </button>
        </div>
      </div>

    </div>

  </main>
</template>

<script setup>
defineEmits(['add-brand'])
</script>