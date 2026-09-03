<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    
    <!-- Left Column: Methods & Fee Setup -->
    <div class="lg:col-span-2 space-y-6">
      
      <!-- Payment Methods Card -->
      <div class="bg-white border border-[#D3DAEF] rounded-xl p-6 shadow-sm">
        <h2 class="text-base font-bold text-[#111827] mb-1">Payment Methods</h2>
        <p class="text-xs text-[#7A8190] mb-4">Enable or disable checkout gateways.</p>

        <div class="space-y-4">
          <div class="flex items-center justify-between p-3 bg-[#F1F3FF] border border-[#D3DAEF] rounded-lg">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 bg-white rounded-lg border border-[#D3DAEF] flex items-center justify-center text-[#111827]">
                <i class="fa-solid fa-wallet text-sm"></i>
              </div>
              <div>
                <div class="text-sm font-bold text-[#111827]">Cash</div>
                <div class="text-xs text-[#7A8190]">Allow customers to pay with cash on delivery.</div>
              </div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked class="sr-only peer">
              <div class="w-11 h-6 bg-[#D3DAEF] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#D3DAEF] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]"></div>
            </label>
          </div>

          <div class="flex items-center justify-between p-3 bg-[#F1F3FF] border border-[#D3DAEF] rounded-lg">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 bg-white rounded-lg border border-[#D3DAEF] flex items-center justify-center text-[#111827]">
                <i class="fa-solid fa-qrcode text-sm"></i>
              </div>
              <div>
                <div class="text-sm font-bold text-[#111827]">ABA KHQR</div>
                <div class="text-xs text-[#7A8190]">Accept instant scan-and-pay transactions.</div>
              </div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked class="sr-only peer">
              <div class="w-11 h-6 bg-[#D3DAEF] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#D3DAEF] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]"></div>
            </label>
          </div>
        </div>
      </div>

      <!-- Payment Fee Configuration Card -->
      <div class="bg-white border border-[#D3DAEF] rounded-xl p-6 shadow-sm">
        <h2 class="text-base font-bold text-[#111827] mb-1">Payment Fee Configuration</h2>
        <p class="text-xs text-[#7A8190] mb-4">Set additional transaction surcharge fees.</p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-[#43474E] mb-1">Fee Type</label>
            <select class="w-full h-10 px-3 bg-[#F1F3FF] border border-[#D3DAEF] rounded-lg text-sm text-[#111827] focus:outline-none">
              <option>Percentage</option>
              <option>Flat Fee</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-[#43474E] mb-1">Fee Amount</label>
            <div class="relative">
              <input type="text" value="2" class="w-full h-10 px-3 pr-8 bg-[#F1F3FF] border border-[#D3DAEF] rounded-lg text-sm text-[#111827] focus:outline-none">
              <span class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#7A8190] font-bold">%</span>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Right Summary Sidebar -->
    <div>
      <div class="bg-white border border-[#D3DAEF] rounded-xl p-5 shadow-sm space-y-4">
        <h2 class="text-sm font-bold text-[#111827]">Payment Summary</h2>
        <div class="space-y-3 text-sm">
          <div class="flex justify-between py-2 border-b border-[#D3DAEF]">
            <span class="text-[#7A8190]">Enabled Methods</span>
            <span class="font-bold text-[#111827]">3</span>
          </div>
          <div class="flex justify-between py-2 border-b border-[#D3DAEF]">
            <span class="text-[#7A8190]">Disabled Methods</span>
            <span class="font-bold text-[#111827]">1</span>
          </div>
        </div>
        <button class="w-full h-10 bg-[#2563EB] text-white rounded-lg text-sm font-medium hover:bg-[#1D4ED8] shadow-sm">Save Changes</button>
      </div>
    </div>

  </div>
</template>

<script setup>
</script>