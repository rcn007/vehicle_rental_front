<template>
  <main class="p-6   min-h-[calc(100vh-64px)]">
    
    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6 gap-4">
      <div>
        <h1 class="text-4xl font-bold tracking-tight text-[#111827]">Categories</h1>
        <p class="text-[#43474E] text-sm mt-1">Manage vehicle categories</p>
      </div>
      <div>
        <button @click="$emit('add-category')" class="inline-flex items-center justify-center gap-2 min-h-10 px-4 rounded-lg text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-all shadow-sm">
          <i class="fa-solid fa-plus text-xs"></i> Add Category
        </button>
      </div>
    </div>

    <!-- 3 KPI Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      
      <div class="p-5 bg-[#F1F3FF] border border-[#D3DAEF] rounded-xl shadow-sm flex items-center justify-between">
        <div>
          <span class="text-[#7A8190] text-xs font-semibold tracking-wide">Total Categories</span>
          <div class="mt-2 text-2xl font-bold text-[#111827]">6</div>
        </div>
        <div class="w-10 h-10 rounded-lg bg-[#E1E8FD] text-[#2563EB] flex items-center justify-center border border-[#D3DAEF]">
          <i class="fa-solid fa-shapes text-sm"></i>
        </div>
      </div>

      <div class="p-5 bg-[#F1F3FF] border border-[#D3DAEF] rounded-xl shadow-sm flex items-center justify-between">
        <div>
          <span class="text-[#7A8190] text-xs font-semibold tracking-wide">Total Vehicles</span>
          <div class="mt-2 text-2xl font-bold text-[#111827]">248</div>
        </div>
        <div class="w-10 h-10 rounded-lg bg-[#E1E8FD] text-[#2563EB] flex items-center justify-center border border-[#D3DAEF]">
          <i class="fa-solid fa-car text-sm"></i>
        </div>
      </div>

      <div class="p-5 bg-[#F1F3FF] border border-[#D3DAEF] rounded-xl shadow-sm flex items-center justify-between sm:col-span-2 lg:col-span-1">
        <div>
          <span class="text-[#7A8190] text-xs font-semibold tracking-wide">Most Popular Category</span>
          <div class="mt-2 text-2xl font-bold text-[#111827]">SUV</div>
        </div>
        <div class="w-10 h-10 rounded-lg bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center border border-[#BBF7D0]">
          <i class="fa-solid fa-arrow-trend-up text-sm"></i>
        </div>
      </div>

    </div>

    <!-- Category Directory Card Table -->
    <div class="bg-[#F1F3FF] border border-[#D3DAEF] rounded-xl shadow-sm overflow-hidden mb-6">
      
      <!-- Table Header Bar -->
      <div class="flex items-center justify-between p-4 px-6 border-b border-[#D3DAEF] bg-[#F1F3FF]">
        <h2 class="font-bold text-base text-[#111827]">Category Directory</h2>
        <button class="h-9 px-3 bg-[#E1E8FD] border border-[#D3DAEF] rounded-lg text-[#43474E] hover:bg-[#d4e0fd] transition-colors flex items-center justify-center">
          <i class="fa-solid fa-filter text-xs"></i>
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-[#E1E8FD] text-[#43474E] text-xs font-semibold border-y border-[#D3DAEF]">
              <th class="p-3.5 pl-6">CATEGORY</th>
              <th class="p-3.5">DESCRIPTION</th>
              <th class="p-3.5">VEHICLES</th>
              <th class="p-3.5">BRANDS</th>
              <th class="p-3.5">CREATED</th>
              <th class="p-3.5 pr-6 text-right">STATUS</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#E1E6F5]">
            
            <tr class="hover:bg-[#E1E8FD]/40 transition-colors">
              <td class="p-4 pl-6">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-lg bg-white border border-[#D3DAEF] flex items-center justify-center shadow-sm text-[#111827]">
                    <i class="fa-solid fa-van-shuttle text-sm"></i>
                  </div>
                  <span class="font-semibold text-[#111827] text-sm">SUV</span>
                </div>
              </td>
              <td class="p-4 text-[#43474E] text-sm max-w-xs truncate">Sport Utility Vehicles for families and o...</td>
              <td class="p-4 text-[#111827] text-sm font-semibold">102</td>
              <td class="p-4 text-[#43474E] text-sm">Toyota, Ford, Honda</td>
              <td class="p-4 text-[#43474E] text-sm">Oct 12, 2023</td>
              <td class="p-4 pr-6 text-right">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#DCFCE7] text-[#15803D]">Active</span>
              </td>
            </tr>

            <tr class="hover:bg-[#E1E8FD]/40 transition-colors">
              <td class="p-4 pl-6">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-lg bg-white border border-[#D3DAEF] flex items-center justify-center shadow-sm text-[#111827]">
                    <i class="fa-solid fa-car-side text-sm"></i>
                  </div>
                  <span class="font-semibold text-[#111827] text-sm">Sedan</span>
                </div>
              </td>
              <td class="p-4 text-[#43474E] text-sm max-w-xs truncate">Standard 4-door passenger cars for cit...</td>
              <td class="p-4 text-[#111827] text-sm font-semibold">85</td>
              <td class="p-4 text-[#43474E] text-sm">Nissan, Hyundai, Kia</td>
              <td class="p-4 text-[#43474E] text-sm">Oct 14, 2023</td>
              <td class="p-4 pr-6 text-right">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#DCFCE7] text-[#15803D]">Active</span>
              </td>
            </tr>

            <tr class="hover:bg-[#E1E8FD]/40 transition-colors">
              <td class="p-4 pl-6">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-lg bg-white border border-[#D3DAEF] flex items-center justify-center shadow-sm text-[#111827]">
                    <i class="fa-solid fa-car text-sm"></i>
                  </div>
                  <span class="font-semibold text-[#111827] text-sm">Hatchback</span>
                </div>
              </td>
              <td class="p-4 text-[#43474E] text-sm max-w-xs truncate">Compact cars with a rear door that swi...</td>
              <td class="p-4 text-[#111827] text-sm font-semibold">34</td>
              <td class="p-4 text-[#43474E] text-sm">Volkswagen, Mazda</td>
              <td class="p-4 text-[#43474E] text-sm">Nov 02, 2023</td>
              <td class="p-4 pr-6 text-right">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#DCFCE7] text-[#15803D]">Active</span>
              </td>
            </tr>

            <tr class="hover:bg-[#E1E8FD]/40 transition-colors">
              <td class="p-4 pl-6">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-lg bg-white border border-[#D3DAEF] flex items-center justify-center shadow-sm text-[#111827]">
                    <i class="fa-solid fa-truck-pickup text-sm"></i>
                  </div>
                  <span class="font-semibold text-[#111827] text-sm">Pickup</span>
                </div>
              </td>
              <td class="p-4 text-[#43474E] text-sm max-w-xs truncate">Light-duty trucks with an enclosed cab...</td>
              <td class="p-4 text-[#111827] text-sm font-semibold">15</td>
              <td class="p-4 text-[#43474E] text-sm">Ford, Chevrolet, Ram</td>
              <td class="p-4 text-[#43474E] text-sm">Nov 15, 2023</td>
              <td class="p-4 pr-6 text-right">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#DCFCE7] text-[#15803D]">Active</span>
              </td>
            </tr>

            <tr class="hover:bg-[#E1E8FD]/40 transition-colors">
              <td class="p-4 pl-6">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-lg bg-white border border-[#D3DAEF] flex items-center justify-center shadow-sm text-[#111827]">
                    <i class="fa-solid fa-bus text-sm"></i>
                  </div>
                  <span class="font-semibold text-[#111827] text-sm">Van</span>
                </div>
              </td>
              <td class="p-4 text-[#43474E] text-sm max-w-xs truncate">Passenger and cargo vans for group tr...</td>
              <td class="p-4 text-[#111827] text-sm font-semibold">8</td>
              <td class="p-4 text-[#43474E] text-sm">Mercedes-Benz, Ford</td>
              <td class="p-4 text-[#43474E] text-sm">Dec 01, 2023</td>
              <td class="p-4 pr-6 text-right">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FEE2E2] text-[#B91C1C]">Inactive</span>
              </td>
            </tr>

            <tr class="hover:bg-[#E1E8FD]/40 transition-colors">
              <td class="p-4 pl-6">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-lg bg-white border border-[#D3DAEF] flex items-center justify-center shadow-sm text-[#111827]">
                    <i class="fa-solid fa-gem text-sm"></i>
                  </div>
                  <span class="font-semibold text-[#111827] text-sm">Luxury</span>
                </div>
              </td>
              <td class="p-4 text-[#43474E] text-sm max-w-xs truncate">High-end vehicles with premium featur...</td>
              <td class="p-4 text-[#111827] text-sm font-semibold">4</td>
              <td class="p-4 text-[#43474E] text-sm">BMW, Audi, Porsche</td>
              <td class="p-4 text-[#43474E] text-sm">Jan 10, 2024</td>
              <td class="p-4 pr-6 text-right">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#DCFCE7] text-[#15803D]">Active</span>
              </td>
            </tr>

          </tbody>
        </table>
      </div>

    </div>

  </main>
</template>

<script setup>
defineEmits(['add-category'])
</script>