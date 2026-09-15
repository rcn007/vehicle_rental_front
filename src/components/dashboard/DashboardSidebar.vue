<template>
  <aside
    class="w-64 h-screen fixed left-0 top-0 z-20 flex flex-col justify-between border-r border-gray-800 bg-gray-900 text-white select-none transition-all duration-200"
  >
    
    <!-- Branding Header -->
    <div
      class="flex items-center gap-3 px-6 h-16 border-b border-gray-800 shrink-0"
    >
      <div
        class="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center text-white shrink-0"
      >
        <i class="fa-solid fa-car-side text-sm"></i>
      </div>

      <span
        class="text-base font-extrabold tracking-tight  text-white"
      >
        ChoulTv
      </span>
    </div>

    <!-- Navigation List -->
    <nav class="flex-1 px-3 py-4 overflow-y-auto custom-scrollbar">
      <ul class="flex flex-col gap-1">

        <li
          v-for="item in menuItems"
          :key="item.routeName"
        >
          <router-link
            :to="{ name: item.routeName }"
            v-slot="{ isActive, navigate }"
            custom
          >
            <button
              @click="navigate"
              :class="[
                'w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-md transition-colors duration-150 text-left cursor-pointer group',
                isActive
                  ? 'bg-gray-600 text-white shadow-sm'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              ]"
            >
              <div
                class="w-4 h-4 flex items-center justify-center shrink-0"
              >
                <i
                  :class="[
                    item.icon,
                    'text-sm transition-colors duration-150',
                    isActive
                      ? 'text-white'
                      : 'text-gray-400 group-hover:text-white'
                  ]"
                ></i>
              </div>

              <span
                class="truncate font-medium"
                style="font-family: var(--font-body);"
              >
                {{ item.name }}
              </span>
            </button>
          </router-link>
        </li>

      </ul>
    </nav>

    <!-- Logout Action -->
    <div class="p-3 border-t border-gray-800 shrink-0">
      <button
        @click="$emit('logout')"
        class="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-md transition-colors duration-150 text-left cursor-pointer text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 group"
      >
        <div
          class="w-4 h-4 flex items-center justify-center shrink-0"
        >
          <i
            class="fa-solid fa-arrow-right-from-bracket text-sm text-rose-400 group-hover:text-rose-300"
          ></i>
        </div>

        <span
          class="truncate font-medium"
          style="font-family: var(--font-body);"
        >
          Logout
        </span>
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
  {
    name: 'Vehicles',
    routeName: 'admin-vehicles',
    icon: 'fa-solid fa-car'
  },
  {
    name: 'Categories',
    routeName: 'admin-categories',
    icon: 'fa-solid fa-layer-group'
  },
  {
    name: 'Brands',
    routeName: 'admin-brands',
    icon: 'fa-solid fa-tags'
  },
  {
    name: 'Customers',
    routeName: 'admin-users',
    icon: 'fa-solid fa-users'
  },
  {
    name: 'Payments',
    routeName: 'admin-payments',
    icon: 'fa-solid fa-wallet'
  },
  {
    name: 'Reports',
    routeName: 'admin-reports',
    icon: 'fa-solid fa-chart-line'
  },
  {
    name: 'History',
    routeName: 'admin-history',
    icon: 'fa-solid fa-clock-rotate-left'
  },
  {
    name: 'Settings',
    routeName: 'admin-settings',
    icon: 'fa-solid fa-gear'
  }
]
</script>