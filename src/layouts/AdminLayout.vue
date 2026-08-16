<template>
  <div class="admin-shell">
    <aside class="admin-sidebar">
      <RouterLink to="/admin/dashboard" class="admin-brand">
        <span class="logo-mark">
          <CarFront :size="18" />
        </span>
        <span>
          <strong>DriveEase</strong>
          <small>Admin Panel</small>
        </span>
      </RouterLink>

      <nav class="admin-nav">
        <p>Overview</p>
        <RouterLink to="/admin/dashboard">
          <LayoutDashboard :size="20" />
          Dashboard
        </RouterLink>

        <p>Management</p>
        <RouterLink to="/admin/users">
          <Users :size="20" />
          Users
        </RouterLink>
        <RouterLink to="/admin/vehicles">
          <CarFront :size="20" />
          Vehicles
        </RouterLink>
        <RouterLink to="/admin/categories">
          <Star :size="20" />
          Categories
        </RouterLink>
        <RouterLink to="/admin/brands">
          <BadgeCheck :size="20" />
          Brands
        </RouterLink>

        <p>Transactions</p>
        <RouterLink to="/admin/bookings">
          <FileText :size="20" />
          Bookings
          <span class="admin-count">8</span>
        </RouterLink>
        <RouterLink to="/admin/payments">
          <CreditCard :size="20" />
          Payments
        </RouterLink>
        <RouterLink to="/admin/rental-history">
          <History :size="20" />
          Rental History
        </RouterLink>

        <p>Insights</p>
        <RouterLink to="/admin/reports">
          <BarChart3 :size="20" />
          Reports
        </RouterLink>
        <RouterLink to="/admin/settings">
          <Settings :size="20" />
          Settings
        </RouterLink>
      </nav>

      <div class="admin-user-card">
        <div class="admin-avatar">SA</div>
        <div>
          <strong>Super Admin</strong>
          <small>admin@driveease.com</small>
        </div>
      </div>
    </aside>

    <div class="admin-main">
      <header class="admin-topbar">
        <h1>{{ route.meta.title || 'Dashboard' }}</h1>
        <div class="admin-top-actions">
          <label class="admin-search">
            <Search :size="18" />
            <input type="search" placeholder="Search..." />
          </label>
          <button class="admin-icon-button" type="button" aria-label="Notifications">
            <Bell :size="19" />
            <span>4</span>
          </button>
          <div class="admin-profile">
            <span>SA</span>
            <div>
              <strong>Super Admin</strong>
              <small>Administrator</small>
            </div>
          </div>
        </div>
      </header>

      <main class="admin-content">
        <RouterView />
      </main>
    </div>

    <RouterLink to="/" class="admin-switch">
      <RefreshCcw :size="15" />
      Switch to Customer
    </RouterLink>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import {
  BadgeCheck,
  BarChart3,
  Bell,
  CarFront,
  CreditCard,
  FileText,
  History,
  LayoutDashboard,
  RefreshCcw,
  Search,
  Settings,
  Star,
  Users,
} from '@lucide/vue'

const route = useRoute()
</script>
