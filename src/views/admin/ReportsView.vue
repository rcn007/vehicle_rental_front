<template>
  <div class="admin-page">
    <section class="admin-stat-grid">
      <article><small>Total Revenue YTD</small><strong class="text-success">$171,500</strong><b class="text-success">+23.4% vs last year</b></article>
      <article><small>Total Bookings YTD</small><strong class="text-blue">675</strong><b class="text-success">+18.2% vs last year</b></article>
      <article><small>Avg. Booking Value</small><strong class="text-purple">$254</strong><b class="text-success">+4.1% vs last year</b></article>
      <article><small>Customer Retention</small><strong class="text-orange">68%</strong><b class="text-danger">-2.3% vs last year</b></article>
    </section>

    <article class="admin-panel line-panel">
      <div class="admin-panel-header">
        <div><h2>Revenue Report</h2><p>Actual vs Target · 2025</p></div>
        <select><option>2025</option></select>
      </div>
      <div class="line-chart"></div>
    </article>

    <section class="admin-dashboard-grid">
      <article class="admin-panel">
        <h2>Booking Statistics</h2>
        <p>Total vs Completed</p>
        <div class="mini-bars">
          <span v-for="value in bars" :key="value" :style="{ height: `${value}%` }"></span>
        </div>
      </article>
      <article class="admin-panel">
        <h2>Most Popular Vehicles</h2>
        <div class="popular-list">
          <div v-for="vehicle in popular" :key="vehicle.name">
            <span>{{ vehicle.rank }}</span>
            <strong>{{ vehicle.name }}</strong>
            <small>{{ vehicle.trips }} trips</small>
            <div><i :style="{ width: `${vehicle.width}%` }"></i></div>
            <b>{{ vehicle.revenue }}</b>
          </div>
        </div>
      </article>
    </section>

    <article class="admin-panel">
      <h2>Customer Statistics</h2>
      <section class="admin-stat-grid">
        <article><b class="text-blue">+22%</b><strong>184</strong><small>New Customers (Jun)</small></article>
        <article><b class="text-success">+8%</b><strong>1,248</strong><small>Returning Customers</small></article>
        <article><b class="text-orange">+0.2</b><strong>4.7 ★</strong><small>Avg. Rating Given</small></article>
        <article><b class="text-purple">-15%</b><strong>23</strong><small>Support Tickets</small></article>
      </section>
    </article>
  </div>
</template>

<script setup>
const bars = [35, 48, 58, 52, 70, 86, 95, 74]
const popular = [
  { rank: 1, name: 'Toyota RAV4', trips: 184, revenue: '$15,640', width: 100 },
  { rank: 2, name: 'BMW 5 Series', trips: 142, revenue: '$17,040', width: 78 },
  { rank: 3, name: 'Audi A4', trips: 118, revenue: '$11,210', width: 65 },
  { rank: 4, name: 'Honda CBR650R', trips: 96, revenue: '$4,320', width: 53 },
  { rank: 5, name: 'Harley-Davidson', trips: 72, revenue: '$5,400', width: 39 },
]
</script>
