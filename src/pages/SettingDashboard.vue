<template>
  <main class="p-6 min-h-[calc(100vh-64px)]">
    
    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-4xl font-bold tracking-tight text-[#111827]">Settings</h1>
      <p class="text-[#43474E] text-xl mt-1">Manage your vehicle rental website and system preferences.</p>
    </div>

    <!-- Sub-Tab Navigation Bar -->
    <div class="flex items-center gap-6 border-b border-[#D3DAEF] mb-6">
      <button 
        v-for="tab in ['Customizer', 'Notification', 'Payment', 'Security']" 
        :key="tab"
        @click="activeSubTab = tab"
        :class="[
          'pb-3 text-sm font-medium  transition-colors relative',
          activeSubTab === tab ? 'text-[#2563EB] border-b-2 border-[#2563EB]' : 'text-[#7A8190] hover:text-[#111827]'
        ]"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Dynamic Sub-Tab View Switcher -->
    <component :is="currentSubView" />

  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import GeneralSetting from '../components/dashboard/GeneralSetting.vue'
import NotificationSetting from '../components/dashboard/NotificationSetting.vue'
import PaymentSetting from '../components/dashboard/PaymentSetting.vue'
import SecuritySetting from '../components/dashboard/SecuritySetting.vue'



const activeSubTab = ref('General')

const currentSubView = computed(() => {
  switch (activeSubTab.value) {
    case 'General': return GeneralSetting
    case 'Notification': return NotificationSetting
    case 'Payment': return PaymentSetting
    case 'Security': return SecuritySetting
    default: return GeneralSetting
  }
})
</script>