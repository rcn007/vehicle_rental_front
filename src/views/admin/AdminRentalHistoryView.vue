<template>
  <div class="admin-page">
    <section class="admin-stat-grid">
      <article><small>Total Completed</small><strong>6</strong></article>
      <article><small>Revenue</small><strong class="text-success">$1,600</strong></article>
      <article><small>Avg. Rating</small><strong class="text-orange">4.3</strong></article>
      <article><small>Total Days Rented</small><strong class="text-blue">18</strong></article>
    </section>

    <div class="admin-toolbar compact">
      <label class="admin-search large"><Search :size="18" /><input placeholder="Search history..." /></label>
      <input class="admin-date" type="date" />
      <button class="btn btn-outline"><Download :size="18" />Export</button>
    </div>

    <section class="admin-panel admin-table-panel">
      <table>
        <thead>
          <tr><th>ID</th><th>Customer</th><th>Vehicle</th><th>Start Date</th><th>End Date</th><th>Days</th><th>Amount</th><th>Payment</th><th>Returned</th><th>Condition</th><th>Rating</th></tr>
        </thead>
        <tbody>
          <tr v-for="item in history" :key="item.id">
            <td>{{ item.id }}</td>
            <td><strong>{{ item.customer }}</strong></td>
            <td>{{ item.vehicle }}</td>
            <td>{{ item.start }}</td>
            <td>{{ item.end }}</td>
            <td><strong>{{ item.days }}</strong></td>
            <td><strong>${{ item.amount }}</strong></td>
            <td>{{ item.payment }}</td>
            <td>{{ item.returned }}</td>
            <td><span class="admin-badge" :class="item.condition.toLowerCase()">{{ item.condition }}</span></td>
            <td class="stars">{{ item.rating }}</td>
          </tr>
        </tbody>
      </table>
      <p class="table-caption">Showing 6 of 6 records</p>
    </section>
  </div>
</template>

<script setup>
import { Download, Search } from '@lucide/vue'

const history = [
  { id: '#RH-1041', customer: 'Sarah Chen', vehicle: 'BMW 5 Series', start: 'May 28, 2025', end: 'Jun 1, 2025', days: '4d', amount: 480, payment: 'Credit Card', returned: 'Jun 1, 2025', condition: 'Excellent', rating: '★★★★★' },
  { id: '#RH-1040', customer: 'Michael Torres', vehicle: 'Toyota RAV4', start: 'May 22, 2025', end: 'May 26, 2025', days: '4d', amount: 340, payment: 'ABA KHQR', returned: 'May 26, 2025', condition: 'Good', rating: '★★★★☆' },
  { id: '#RH-1039', customer: 'Emily Johnson', vehicle: 'Harley-Davidson', start: 'May 18, 2025', end: 'May 20, 2025', days: '2d', amount: 150, payment: 'Cash', returned: 'May 20, 2025', condition: 'Good', rating: '★★★★★' },
  { id: '#RH-1038', customer: 'David Kim', vehicle: 'Audi A4', start: 'May 14, 2025', end: 'May 17, 2025', days: '3d', amount: 285, payment: 'Bakong', returned: 'May 17, 2025', condition: 'Fair', rating: '★★★☆☆' },
  { id: '#RH-1037', customer: 'Lisa Park', vehicle: 'Honda CBR650R', start: 'May 10, 2025', end: 'May 12, 2025', days: '2d', amount: 90, payment: 'Credit Card', returned: 'May 12, 2025', condition: 'Good', rating: '★★★★☆' },
  { id: '#RH-1036', customer: 'James Wilson', vehicle: 'Toyota RAV4', start: 'May 5, 2025', end: 'May 8, 2025', days: '3d', amount: 255, payment: 'ABA KHQR', returned: 'May 8, 2025', condition: 'Excellent', rating: '★★★★★' },
]
</script>
