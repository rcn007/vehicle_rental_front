<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    
    <!-- Left Column: Security Settings -->
    <div class="lg:col-span-2 space-y-6">
      
      <!-- Authentication Card -->
      <div class="bg-white border border-[#D3DAEF] rounded-xl p-6 shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-base font-bold text-[#111827] mb-1">Two-Factor Authentication</h2>
            <p class="text-xs text-[#7A8190]">Require secondary verification code upon administrative sign-in.</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" class="sr-only peer">
            <div class="w-11 h-6 bg-[#D3DAEF] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#D3DAEF] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]"></div>
          </label>
        </div>
      </div>

      <!-- Session Security Card -->
      <div class="bg-white border border-[#D3DAEF] rounded-xl p-6 shadow-sm">
        <h2 class="text-base font-bold text-[#111827] mb-1">Session Timeout</h2>
        <p class="text-xs text-[#7A8190] mb-4">Automatically sign out idle administrators.</p>
        <select class="w-full sm:w-64 h-10 px-3 bg-[#F1F3FF] border border-[#D3DAEF] rounded-lg text-sm text-[#111827] focus:outline-none">
          <option>30 minutes</option>
          <option>1 hour</option>
          <option>4 hours</option>
        </select>
      </div>

      <!-- Change Password Card -->
      <div class="bg-white border border-[#D3DAEF] rounded-xl p-6 shadow-sm">
        <h2 class="text-base font-bold text-[#111827] mb-4">Change Password</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-[#43474E] mb-1">Current Password</label>
            <input type="password" placeholder="••••••••" class="w-full h-10 px-3 bg-[#F1F3FF] border border-[#D3DAEF] rounded-lg text-sm text-[#111827] focus:outline-none">
          </div>
          <div>
            <label class="block text-xs font-semibold text-[#43474E] mb-1">New Password</label>
            <input type="password" placeholder="••••••••" class="w-full h-10 px-3 bg-[#F1F3FF] border border-[#D3DAEF] rounded-lg text-sm text-[#111827] focus:outline-none">
          </div>
        </div>
      </div>

    </div>

    <!-- Right Sidebar Info -->
    <div>
      <div class="bg-white border border-[#D3DAEF] rounded-xl p-5 shadow-sm space-y-4">
        <h2 class="text-sm font-bold text-[#111827]">Security Information</h2>
        <div class="text-xs text-[#7A8190]">
          Last updated by Admin on <span class="text-[#111827] font-semibold">August 23, 2026</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
</script>