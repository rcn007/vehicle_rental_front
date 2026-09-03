<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    
    <!-- Admin Notification Toggles -->
    <div class="lg:col-span-2 bg-white border border-[#D3DAEF] rounded-xl shadow-sm overflow-hidden flex flex-col justify-between">
      <div class="p-6 border-b border-[#D3DAEF]">
        <h2 class="text-base font-bold text-[#111827] mb-1">Admin Notifications</h2>
        <p class="text-xs text-[#7A8190]">Manage which events generate alerts for system administrators.</p>
      </div>

      <div class="divide-y divide-[#E1E6F5] p-6 space-y-4">
        
        <div class="flex items-center justify-between pt-2">
          <div>
            <div class="font-bold text-[#111827] text-sm">New Booking</div>
            <div class="text-xs text-[#7A8190]">Notify administrators when a new vehicle booking is created.</div>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked class="sr-only peer">
            <div class="w-11 h-6 bg-[#D3DAEF] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#D3DAEF] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]"></div>
          </label>
        </div>

        <div class="flex items-center justify-between pt-4">
          <div>
            <div class="font-bold text-[#111827] text-sm">Payment Received</div>
            <div class="text-xs text-[#7A8190]">Notify administrators when a payment is successfully received.</div>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked class="sr-only peer">
            <div class="w-11 h-6 bg-[#D3DAEF] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#D3DAEF] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]"></div>
          </label>
        </div>

        <div class="flex items-center justify-between pt-4">
          <div>
            <div class="font-bold text-[#111827] text-sm">Booking Cancellation</div>
            <div class="text-xs text-[#7A8190]">Notify administrators when a booking is cancelled.</div>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked class="sr-only peer">
            <div class="w-11 h-6 bg-[#D3DAEF] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#D3DAEF] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]"></div>
          </label>
        </div>

        <div class="flex items-center justify-between pt-4">
          <div>
            <div class="font-bold text-[#111827] text-sm">Daily Summary Report</div>
            <div class="text-xs text-[#7A8190]">Send a daily summary notification containing important rental activity.</div>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" class="sr-only peer">
            <div class="w-11 h-6 bg-[#D3DAEF] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#D3DAEF] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]"></div>
          </label>
        </div>

      </div>

      <!-- Action Footer -->
      <div class="flex items-center justify-end gap-3 p-4 px-6 bg-[#F8FAFC] border-t border-[#D3DAEF]">
        <button class="px-4 py-2 border border-[#D3DAEF] rounded-lg text-sm font-medium text-[#43474E] hover:bg-[#E1E8FD]">Cancel</button>
        <button class="px-4 py-2 bg-[#2563EB] text-white rounded-lg text-sm font-medium hover:bg-[#1D4ED8] shadow-sm">Save Changes</button>
      </div>
    </div>

    <!-- Notification Preview Sidebar -->
    <div>
      <div class="bg-white border border-[#D3DAEF] rounded-xl p-5 shadow-sm space-y-4">
        <div class="flex items-center gap-2 text-sm font-bold text-[#111827]">
          <i class="fa-regular fa-bell text-[#2563EB]"></i> Notification Preview
        </div>

        <div class="p-3 bg-[#F1F3FF] border border-[#D3DAEF] rounded-lg">
          <div class="flex items-center gap-1.5 text-xs font-bold text-[#2563EB] mb-1">
            <i class="fa-solid fa-plus text-[10px]"></i> New Booking
          </div>
          <div class="text-xs text-[#111827]">Booking #1024 was created by John Doe.</div>
          <div class="text-[10px] text-[#7A8190] mt-1">Just now</div>
        </div>

        <div class="p-3 bg-[#F1F3FF] border border-[#D3DAEF] rounded-lg">
          <div class="flex items-center gap-1.5 text-xs font-bold text-[#16A34A] mb-1">
            <i class="fa-solid fa-circle-check text-[10px]"></i> Payment Received
          </div>
          <div class="text-xs text-[#111827]">Payment #568 has been received.</div>
          <div class="text-[10px] text-[#7A8190] mt-1">10 mins ago</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
</script>