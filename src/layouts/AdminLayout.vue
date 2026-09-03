<template>
  <div class="min-h-screen bg-slate-50">

    <!-- Fixed Sidebar -->
    <DashboardSidebar />

    <!-- Main Area -->
    <div class="ml-60 min-h-screen">

      <!-- Navbar -->
      <DashboardNavbar />

      <!-- Page Content -->
      <main class="p-4 sm:p-6">
        <div class="mx-auto max-w-[1440px]">
          <RouterView />
        </div>
      </main>

    </div>

  </div>
</template>

<script setup>
import DashboardSidebar from '../components/dashboard/DashboardSidebar.vue'
import DashboardNavbar from '../components/dashboard/DashboardNavbar.vue'
</script>