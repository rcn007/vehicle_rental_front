<template>
  <div class="admin-page">
    <section class="admin-stat-grid">
      <article><small>Confirmed Revenue</small><strong class="text-success">$1,150</strong></article>
      <article><small>Pending</small><strong class="text-orange">1</strong></article>
      <article><small>Total Transactions</small><strong class="text-blue">6</strong></article>
      <article><small>Refunded</small><strong class="text-purple">$95</strong></article>
    </section>

    <div class="admin-toolbar compact">
      <label class="admin-search large"><Search :size="18" /><input placeholder="Search payments..." /></label>
      <button class="btn btn-outline"><Download :size="18" />Export</button>
    </div>

    <section class="admin-panel admin-table-panel">
      <table>
        <thead>
          <tr><th>Payment ID</th><th>Customer</th><th>Booking</th><th>Amount</th><th>Method</th><th>Transaction ID</th><th>Date</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          <tr v-for="payment in payments" :key="payment.id">
            <td>{{ payment.id }}</td>
            <td><strong>{{ payment.customer }}</strong></td>
            <td class="text-blue">{{ payment.booking }}</td>
            <td><strong>${{ payment.amount }}</strong></td>
            <td>{{ payment.method }}</td>
            <td><small>{{ payment.txn }}</small></td>
            <td>{{ payment.date }}</td>
            <td><span class="admin-badge" :class="payment.status.toLowerCase()">{{ payment.status }}</span></td>
            <td class="action-buttons">
              <button v-for="action in payment.actions" :key="action" type="button" :class="action.toLowerCase()">{{ action }}</button>
              <span v-if="!payment.actions.length">—</span>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="table-caption">Showing 6 of 6 payments</p>
    </section>
  </div>
</template>

<script setup>
import { Download, Search } from '@lucide/vue'

const payments = [
  { id: '#PAY-4521', customer: 'Sarah Chen', booking: '#BK-0891', amount: 365, method: 'Credit Card', txn: 'TXN-9841023', date: 'Jun 15, 2026', status: 'Confirmed', actions: ['Refund'] },
  { id: '#PAY-4520', customer: 'Michael Torres', booking: '#BK-0890', amount: 345, method: 'ABA KHQR', txn: 'TXN-9840987', date: 'Jun 12, 2026', status: 'Confirmed', actions: ['Refund'] },
  { id: '#PAY-4519', customer: 'David Kim', booking: '#BK-0888', amount: 355, method: 'Bakong', txn: 'TXN-9840754', date: 'Jun 8, 2026', status: 'Pending', actions: ['Confirm', 'Reject'] },
  { id: '#PAY-4518', customer: 'Emily Johnson', booking: '#BK-0889', amount: 150, method: 'Cash', txn: '-', date: 'Jun 10, 2026', status: 'Confirmed', actions: ['Refund'] },
  { id: '#PAY-4517', customer: 'James Wilson', booking: '#BK-0886', amount: 95, method: 'Credit Card', txn: 'TXN-9840512', date: 'Jun 3, 2026', status: 'Refunded', actions: [] },
  { id: '#PAY-4516', customer: 'Lisa Park', booking: '#BK-0887', amount: 290, method: 'ABA KHQR', txn: 'TXN-9840401', date: 'Jun 5, 2026', status: 'Confirmed', actions: ['Refund'] },
]
</script>
