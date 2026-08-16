<template>
  <div class="admin-page">
    <div class="admin-filter-tabs">
      <button v-for="tab in tabs" :key="tab.name" :class="{ active: tab.name === 'All' }">
        {{ tab.name }} <span>{{ tab.count }}</span>
      </button>
    </div>

    <div class="admin-toolbar compact">
      <label class="admin-search large"><Search :size="18" /><input placeholder="Search by customer, vehicle, ID..." /></label>
      <button class="btn btn-outline"><Download :size="18" />Export</button>
    </div>

    <section class="admin-panel admin-table-panel">
      <table>
        <thead>
          <tr><th>Booking ID</th><th>Customer</th><th>Vehicle</th><th>Pickup</th><th>Return</th><th>Total</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          <tr v-for="booking in bookings" :key="booking.id">
            <td>{{ booking.id }}</td>
            <td><strong>{{ booking.customer }}</strong></td>
            <td>{{ booking.vehicle }}</td>
            <td>{{ booking.pickup }}</td>
            <td>{{ booking.return }}</td>
            <td><strong>${{ booking.total }}</strong></td>
            <td><span class="admin-badge" :class="booking.status.toLowerCase()">{{ booking.status }}</span></td>
            <td class="action-buttons">
              <button v-for="action in booking.actions" :key="action" type="button" :class="action.toLowerCase()">{{ action }}</button>
              <span v-if="!booking.actions.length">—</span>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="table-caption">Showing 7 of 7 bookings</p>
    </section>
  </div>
</template>

<script setup>
import { Download, Search } from '@lucide/vue'

const tabs = [
  { name: 'All', count: 7 },
  { name: 'Pending', count: 2 },
  { name: 'Confirmed', count: 1 },
  { name: 'Active', count: 1 },
  { name: 'Completed', count: 2 },
  { name: 'Cancelled', count: 1 },
]

const bookings = [
  { id: '#BK-0891', customer: 'Sarah Chen', vehicle: 'BMW 5 Series', pickup: 'Jun 15, 2026', return: 'Jun 18, 2026', total: 365, status: 'Confirmed', actions: ['Activate', 'Cancel'] },
  { id: '#BK-0890', customer: 'Michael Torres', vehicle: 'Toyota RAV4', pickup: 'Jun 12, 2026', return: 'Jun 16, 2026', total: 345, status: 'Active', actions: ['Complete'] },
  { id: '#BK-0889', customer: 'Emily Johnson', vehicle: 'Harley-Davidson', pickup: 'Jun 10, 2026', return: 'Jun 12, 2026', total: 150, status: 'Completed', actions: [] },
  { id: '#BK-0888', customer: 'David Kim', vehicle: 'Rolls-Royce Ghost', pickup: 'Jun 8, 2026', return: 'Jun 9, 2026', total: 355, status: 'Pending', actions: ['Approve', 'Reject'] },
  { id: '#BK-0887', customer: 'Lisa Park', vehicle: 'Audi A4', pickup: 'Jun 5, 2026', return: 'Jun 8, 2026', total: 290, status: 'Completed', actions: [] },
  { id: '#BK-0886', customer: 'James Wilson', vehicle: 'Honda CBR650R', pickup: 'Jun 3, 2026', return: 'Jun 5, 2026', total: 95, status: 'Cancelled', actions: [] },
  { id: '#BK-0885', customer: 'Anna Smith', vehicle: 'BMW 5 Series', pickup: 'Jun 1, 2026', return: 'Jun 4, 2026', total: 365, status: 'Pending', actions: ['Approve', 'Reject'] },
]
</script>
