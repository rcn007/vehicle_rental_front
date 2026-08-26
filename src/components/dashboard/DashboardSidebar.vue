<template>
  <aside
    class="w-64 h-screen bg-slate-900 text-slate-300 flex flex-col justify-between select-none fixed left-0 top-0 z-20 border-r border-slate-800 transition-all duration-300"
  >
    <!-- Top Branding -->
    <div class="flex items-center gap-3 px-6 py-6 border-b border-slate-800/60">
      <div class="bg-blue-600 p-1.5 rounded-lg shrink-0">
        <img
          class="w-7 h-7 object-contain filter brightness-0 invert"
          src="https://static.vecteezy.com/system/resources/thumbnails/027/385/442/small/car-stainless-logo-png.png"
          alt="FleetAdmin Logo"
        />
      </div>
      <span class="text-lg font-bold tracking-wide text-white">FleetAdmin</span>
    </div>

    <!-- Menu List -->
    <nav class="flex-1 px-4 py-6 overflow-y-auto custom-scrollbar">
      <ul class="flex flex-col gap-1.5 font-medium">
        <li v-for="item in menuItems" :key="item.name">
          <router-link
            :to="{ name: item.routeName }"
            v-slot="{ isActive, navigate }"
            custom
          >
            <button
              @click="navigate"
              :class="[
                'w-full flex items-center gap-3.5 px-4 py-3 rounded-lg font-medium transition-all duration-200 text-sm text-left group',
                isActive
                  ? 'bg-blue-600/10 text-blue-500'
                  : 'text-white hover:bg-slate-800 hover:text-white'
              ]"
            >
              <!-- Icon Container -->
              <div class="relative flex items-center justify-center w-5">
                <i
                  :class="[
                    item.icon,
                    'text-lg transition-colors duration-200',
                    isActive
                      ? 'text-blue-500'
                      : 'text-slate-500 group-hover:text-slate-300'
                  ]"
                ></i>
              </div>

              <span class="tracking-wide">{{ item.name }}</span>

              <!-- Active Indicator -->
              <div
                v-if="isActive"
                class="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
              ></div>
            </button>
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Footer / Logout -->
    <div class="p-4 border-t border-slate-800/60">
      <button
        @click="$emit('logout')"
        class="w-full flex items-center gap-3.5 px-4 py-3 rounded-lg font-medium text-sm text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 group"
      >
        <div class="relative flex items-center justify-center w-5">
          <i
            class="fa-solid fa-arrow-right-from-bracket text-lg text-slate-500 group-hover:text-red-400 transition-colors duration-200"
          ></i>
        </div>
        <span class="tracking-wide">Logout</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
defineEmits(['logout'])

const menuItems = [
  {
    name: 'Dashboard',
    routeName: 'admin-dashboard',
    icon: 'fa-solid fa-chart-pie'
  },
  {
    name: 'Bookings',
    routeName: 'admin-bookings',
    icon: 'fa-solid fa-calendar-check'
  },
  { name: 'Vehicles', routeName: 'admin-vehicles', icon: 'fa-solid fa-car' },
  {
    name: 'Categories',
    routeName: 'admin-categories',
    icon: 'fa-solid fa-layer-group'
  },
  { name: 'Brands', routeName: 'admin-brands', icon: 'fa-solid fa-tags' },
  { name: 'Customers', routeName: 'admin-users', icon: 'fa-solid fa-users' },
  { name: 'Payments', routeName: 'admin-payments', icon: 'fa-solid fa-wallet' },
  {
    name: 'Reports',
    routeName: 'admin-reports',
    icon: 'fa-solid fa-chart-line'
  },
  { name: 'Settings', routeName: 'admin-settings', icon: 'fa-solid fa-gear' },
  {
    name: 'History',
    routeName: 'admin-history',
    icon: 'fa-solid fa-clock-rotate-left'
  }
]
</script>
