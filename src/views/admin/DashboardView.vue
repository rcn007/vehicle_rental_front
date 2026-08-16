<template>
  <div class="admin-page">
    <section class="admin-stat-grid five">
      <article v-for="stat in stats" :key="stat.label" :class="stat.class">
        <component :is="stat.icon" :size="28" />
        <span>{{ stat.change }}</span>
        <strong>{{ stat.value }}</strong>
        <small>{{ stat.label }}</small>
      </article>
    </section>

    <section class="admin-dashboard-grid">
      <article class="admin-panel performance-panel">
        <div class="admin-panel-header">
          <div>
            <h2>Performance Overview</h2>
            <p>Jan - Aug 2026</p>
          </div>
          <div class="admin-tabs">
            <button type="button" class="active">Revenue</button>
            <button type="button">Bookings</button>
          </div>
        </div>
        <div class="bar-chart">
          <div class="chart-scale">
            <span>$32k</span>
            <span>$24k</span>
            <span>$16k</span>
            <span>$8k</span>
            <span>$0k</span>
          </div>
          <div class="bar-track">
            <div v-for="item in revenue" :key="item.month">
              <span :style="{ height: `${item.value}%` }"></span>
              <small>{{ item.month }}</small>
            </div>
          </div>
        </div>
      </article>

      <article class="admin-panel">
        <h2>Category Distribution</h2>
        <p>By booking count</p>
        <div class="donut-chart"></div>
        <div class="legend-list">
          <div v-for="category in categories" :key="category.name">
            <span :style="{ background: category.color }"></span>
            {{ category.name }}
            <strong>{{ category.value }}%</strong>
          </div>
        </div>
      </article>
    </section>

    <section class="admin-panel admin-table-panel">
      <div class="admin-panel-header">
        <h2>Recent Bookings</h2>
        <RouterLink to="/admin/bookings" class="view-link">View all →</RouterLink>
      </div>
      <table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Customer</th>
            <th>Vehicle</th>
            <th>Pickup</th>
            <th>Return</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="booking in bookings" :key="booking.id">
            <td>{{ booking.id }}</td>
            <td>
              <span class="mini-avatar">{{ booking.initials }}</span>
              <strong>{{ booking.customer }}</strong>
            </td>
            <td>{{ booking.vehicle }}</td>
            <td>{{ booking.pickup }}</td>
            <td>{{ booking.return }}</td>
            <td><strong>${{ booking.amount }}</strong></td>
            <td><span class="admin-badge" :class="booking.status.toLowerCase()">{{ booking.status }}</span></td>
            <td><button class="text-danger" type="button">Cancel</button></td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup>
import { CalendarCheck, CarFront, ClipboardList, DollarSign, Users } from '@lucide/vue'

const stats = [
  { label: 'Total Users', value: '2,841', change: '+12.5%', icon: Users, class: 'blue' },
  { label: 'Total Vehicles', value: '524', change: '+3.2%', icon: CarFront, class: 'dark' },
  { label: 'Available Now', value: '386', change: '-2.1%', icon: CalendarCheck, class: 'green' },
  { label: 'Active Bookings', value: '148', change: '+8.7%', icon: ClipboardList, class: 'purple' },
  { label: 'Monthly Revenue', value: '$28,400', change: '+15.3%', icon: DollarSign, class: 'orange' },
]

const revenue = [
  { month: 'Jan', value: 38 },
  { month: 'Feb', value: 46 },
  { month: 'Mar', value: 58 },
  { month: 'Apr', value: 50 },
  { month: 'May', value: 68 },
  { month: 'Jun', value: 86 },
  { month: 'Jul', value: 95 },
  { month: 'Aug', value: 81 },
]

const categories = [
  { name: 'Sedan', value: 38, color: '#2563eb' },
  { name: 'SUV', value: 28, color: '#22c55e' },
  { name: 'Motorcycle', value: 18, color: '#f59e0b' },
  { name: 'Luxury', value: 10, color: '#8b5cf6' },
  { name: 'Other', value: 6, color: '#64748b' },
]

const bookings = [
  { id: '#BK-0891', initials: 'SC', customer: 'Sarah Chen', vehicle: 'BMW 5 Series', pickup: 'Jun 15', return: 'Jun 18', amount: 365, status: 'Confirmed' },
  { id: '#BK-0890', initials: 'MT', customer: 'Michael Torres', vehicle: 'Toyota RAV4', pickup: 'Jun 12', return: 'Jun 16', amount: 345, status: 'Active' },
  { id: '#BK-0889', initials: 'EJ', customer: 'Emily Johnson', vehicle: 'Harley-Davidson', pickup: 'Jun 10', return: 'Jun 12', amount: 150, status: 'Completed' },
  { id: '#BK-0888', initials: 'DK', customer: 'David Kim', vehicle: 'Rolls-Royce Ghost', pickup: 'Jun 8', return: 'Jun 9', amount: 355, status: 'Pending' },
  { id: '#BK-0887', initials: 'LP', customer: 'Lisa Park', vehicle: 'Audi A4', pickup: 'Jun 5', return: 'Jun 8', amount: 290, status: 'Completed' },
]
</script>
