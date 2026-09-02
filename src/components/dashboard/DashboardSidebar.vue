<template>
  <aside class="w-64 h-screen fixed left-0 top-0 z-20 flex flex-col justify-between border-r select-none transition-all duration-200" style="background-color: var(--surface); border-color: var(--border);">
    
    <!-- Branding Header -->
    <div class="flex items-center gap-3 px-6 h-16 border-b shrink-0" style="border-color: var(--border);">
      <div class="w-8 h-8 rounded-md flex items-center justify-center text-white shrink-0" style="background-color: var(--primary); border-radius: var(--radius-sm);">
        <i class="fa-solid fa-car-side text-sm"></i>
      </div>
      <span class="text-base font-extrabold tracking-tight uppercase" style="font-family: var(--font-heading); color: var(--text);">
        FleetAdmin
      </span>
    </div>

    <!-- Navigation List -->
    <nav class="flex-1 px-3 py-4 overflow-y-auto custom-scrollbar">
      <ul class="flex flex-col gap-1">
        <li v-for="item in menuItems" :key="item.routeName">
          <router-link :to="{ name: item.routeName }" v-slot="{ isActive, navigate }" custom>
            <button
              @click="navigate"
              :class="[
                'w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold transition-colors duration-150 text-left cursor-pointer group',
                isActive ? 'shadow-sm' : 'hover:bg-slate-100'
              ]"
              :style="isActive ? {
                backgroundColor: 'var(--primary)',
                color: '#ffffff',
                borderRadius: 'var(--radius-md)'
              } : {
                color: 'var(--text)',
                borderRadius: 'var(--radius-md)'
              }"
            >
              <div class="w-4 h-4 flex items-center justify-center shrink-0">
                <i
                  :class="[item.icon, 'text-sm transition-colors duration-150']"
                  :style="{ color: isActive ? '#ffffff' : 'var(--muted)' }"
                ></i>
              </div>
              <span class="truncate font-medium" style="font-family: var(--font-body);">{{ item.name }}</span>
            </button>
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Logout Action -->
    <div class="p-3 border-t shrink-0" style="border-color: var(--border);">
      <button
        @click="$emit('logout')"
        class="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold transition-colors duration-150 text-left cursor-pointer hover:bg-red-50"
        style="color: var(--danger); border-radius: var(--radius-md);"
      >
        <div class="w-4 h-4 flex items-center justify-center shrink-0">
          <i class="fa-solid fa-arrow-right-from-bracket text-sm" style="color: var(--danger);"></i>
        </div>
        <span class="truncate font-medium" style="font-family: var(--font-body);">Logout</span>
      </button>
    </div>

  </aside>
</template>

<script setup>
defineEmits(['logout'])

const menuItems = [
  { name: 'Dashboard', routeName: 'admin-dashboard', icon: 'fa-solid fa-chart-pie' },
  { name: 'Bookings', routeName: 'admin-bookings', icon: 'fa-solid fa-calendar-check' },
  { name: 'Vehicles', routeName: 'admin-vehicles', icon: 'fa-solid fa-car' },
  { name: 'Categories', routeName: 'admin-categories', icon: 'fa-solid fa-layer-group' },
  { name: 'Brands', routeName: 'admin-brands', icon: 'fa-solid fa-tags' },
  { name: 'Customers', routeName: 'admin-users', icon: 'fa-solid fa-users' },
  { name: 'Payments', routeName: 'admin-payments', icon: 'fa-solid fa-wallet' },
  { name: 'Reports', routeName: 'admin-reports', icon: 'fa-solid fa-chart-line' },
  { name: 'Settings', routeName: 'admin-settings', icon: 'fa-solid fa-gear' },
  { name: 'History', routeName: 'admin-history', icon: 'fa-solid fa-clock-rotate-left' }
]
</script>