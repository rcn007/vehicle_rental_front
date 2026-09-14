<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 text-[--text]">
    
    <!-- Admin Notification Toggles -->
    <div class="lg:col-span-2 bg-[--background] border border-[#334155] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col justify-between">
      <div class="p-6 border-b border-[#334155]">
        <h2 class="text-base font-bold text-[--text] mb-1">Admin Notifications</h2>
        <p class="text-xs text-[--text]">Manage which events generate alerts for system administrators.</p>
      </div>

      <div class="divide-y divide-[#334155] p-6 space-y-4">
        
        <!-- Toggle Item: New Booking -->
        <div class="flex items-center justify-between pt-2">
          <div>
            <div class="font-bold text-[--text] text-sm">New Booking</div>
            <div class="text-xs text-[--text]">Notify administrators when a new vehicle booking is created.</div>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked class="sr-only peer">
            <div class="w-11 h-6 bg-[--background] border border-[#334155] peer-focus:outline-none rounded-full peer peer-checked:bg-[#10b981] peer-checked:border-[#10b981] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#f8fafc] after:border-[#334155] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
        </div>

        <!-- Toggle Item: Payment Received -->
        <div class="flex items-center justify-between pt-4">
          <div>
            <div class="font-bold text-[--text] text-sm">Payment Received</div>
            <div class="text-xs text-[--text]">Notify administrators when a payment is successfully received.</div>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked class="sr-only peer">
            <div class="w-11 h-6 bg-[--background] border border-[#334155] peer-focus:outline-none rounded-full peer peer-checked:bg-[#10b981] peer-checked:border-[#10b981] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#f8fafc] after:border-[#334155] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
        </div>

        <!-- Toggle Item: Booking Cancellation -->
        <div class="flex items-center justify-between pt-4">
          <div>
            <div class="font-bold text-[--text] text-sm">Booking Cancellation</div>
            <div class="text-xs text-[--text]">Notify administrators when a booking is cancelled.</div>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked class="sr-only peer">
            <div class="w-11 h-6 bg-[--background] border border-[#334155] peer-focus:outline-none rounded-full peer peer-checked:bg-[#10b981] peer-checked:border-[#10b981] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#f8fafc] after:border-[#334155] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
        </div>

        <!-- Toggle Item: Daily Summary Report -->
        <div class="flex items-center justify-between pt-4">
          <div>
            <div class="font-bold text-[--text] text-sm">Daily Summary Report</div>
            <div class="text-xs text-[--text]">Send a daily summary notification containing important rental activity.</div>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" class="sr-only peer">
            <div class="w-11 h-6 bg-[--background] border border-[#334155] peer-focus:outline-none rounded-full peer peer-checked:bg-[#10b981] peer-checked:border-[#10b981] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#f8fafc] after:border-[#334155] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
        </div>

      </div>

      <!-- Action Footer -->
      <div class="flex items-center justify-end gap-3 p-4 px-6 bg-[--background] border-t border-[#334155]">
        <button class="px-4 py-2 border border-[#334155] rounded-lg text-sm font-medium text-[--text] hover:bg-[--background] hover:text-[--text] transition cursor-pointer">
          Cancel
        </button>
        <button class="px-4 py-2 bg-[#10b981] text-[#0f172a] rounded-lg text-sm font-semibold hover:bg-[#34d399] transition shadow-[0_1px_3px_rgba(0,0,0,0.2)] active:scale-95 cursor-pointer">
          Save Changes
        </button>
      </div>
    </div>

    <!-- Notification Preview Sidebar -->
    <div>
      <div class="bg-[--background] border border-[#334155] rounded-xl p-5 shadow-[0_4px_12px_rgba(0,0,0,0.25)] space-y-4">
        <div class="flex items-center gap-2 text-sm font-bold text-[#f8fafc]">
          <i class="fa-regular fa-bell text-[#10b981]"></i> Notification Preview
        </div>

        <div class="p-3 bg-[--background] border border-[#334155] rounded-lg">
          <div class="flex items-center gap-1.5 text-xs font-bold text-[#10b981] mb-1">
            <i class="fa-solid fa-plus text-[10px]"></i> New Booking
          </div>
          <div class="text-xs text-[#f8fafc]">Booking #1024 was created by John Doe.</div>
          <div class="text-[10px] text-[#94a3b8] mt-1">Just now</div>
        </div>

        <div class="p-3 bg-[--background] border border-[#334155] rounded-lg">
          <div class="flex items-center gap-1.5 text-xs font-bold text-[#34d399] mb-1">
            <i class="fa-solid fa-circle-check text-[10px]"></i> Payment Received
          </div>
          <div class="text-xs text-[#f8fafc]">Payment #568 has been received.</div>
          <div class="text-[10px] text-[#94a3b8] mt-1">10 mins ago</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  getNotificationSettings,
  updateNotificationSettings
} from '../../api/notification'

const notificationSettings = ref({
  newBooking: true,
  paymentReceived: true,
  bookingCancellation: true,
  newUserRegistration: true,
  lowAvailabilityAlert: true,
  dailySummaryReport: true
})

const loadingNotifications = ref(false)
const savingNotifications = ref(false)

const fetchNotificationSettings = async () => {
  loadingNotifications.value = true

  try {
    const data = await getNotificationSettings()

    if (data) {
      notificationSettings.value = {
        newBooking: data.newBooking,
        paymentReceived: data.paymentReceived,
        bookingCancellation: data.bookingCancellation,
        newUserRegistration: data.newUserRegistration,
        lowAvailabilityAlert: data.lowAvailabilityAlert,
        dailySummaryReport: data.dailySummaryReport
      }
    }

    console.log(
      'Notification settings:',
      notificationSettings.value
    )
  } catch (error) {
    console.error(
      'Failed to fetch notification settings:',
      error
    )

    console.error(
      'Status:',
      error.response?.status
    )

    console.error(
      'Response:',
      error.response?.data
    )
  } finally {
    loadingNotifications.value = false
  }
}

const saveNotificationSettings = async () => {
  if (savingNotifications.value) {
    return
  }

  savingNotifications.value = true

  try {
    const data = await updateNotificationSettings(
      notificationSettings.value
    )

    if (data) {
      notificationSettings.value = {
        newBooking: data.newBooking,
        paymentReceived: data.paymentReceived,
        bookingCancellation: data.bookingCancellation,
        newUserRegistration: data.newUserRegistration,
        lowAvailabilityAlert: data.lowAvailabilityAlert,
        dailySummaryReport: data.dailySummaryReport
      }
    }

    console.log(
      'Notification settings updated:',
      data
    )
  } catch (error) {
    console.error(
      'Failed to update notification settings:',
      error
    )

    console.error(
      'Status:',
      error.response?.status
    )

    console.error(
      'Response:',
      error.response?.data
    )
  } finally {
    savingNotifications.value = false
  }
}

onMounted(() => {
  fetchNotificationSettings()
})
</script>