<template>
  <div class="min-h-screen bg-slate-50">

    <!-- Fixed Sidebar -->
    <DashboardSidebar @logout="logout"/>

    <!-- Main Area -->
    <div class="ml-60 min-h-screen">

      <!-- Navbar -->
      <DashboardNavbar />
        <NotificationPopup />

      <!-- Page Content -->
      <main >
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
import NotificationPopup from '../components/dashboard/NotificationPopup.vue';
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/Auth'

const auth = useAuthStore()
const router = useRouter()

function logout() {
  auth.logout()
  router.push('/')
}
</script>