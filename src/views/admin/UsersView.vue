<template>
  <div class="admin-page">
    <section class="admin-stat-grid">
      <article><strong>6</strong><small>Total Users</small></article>
      <article><strong class="text-success">5</strong><small>Active</small></article>
      <article><strong class="text-danger">1</strong><small>Suspended</small></article>
      <article><strong class="text-purple">1</strong><small>Admins</small></article>
    </section>

    <div class="admin-toolbar">
      <label class="admin-search large"><Search :size="18" /><input placeholder="Search users..." /></label>
      <div>
        <button class="btn btn-outline"><Download :size="18" />Export CSV</button>
        <button class="btn btn-primary"><Plus :size="18" />Add User</button>
      </div>
    </div>

    <section class="admin-panel admin-table-panel">
      <table>
        <thead>
          <tr><th>User</th><th>Email</th><th>Phone</th><th>Role</th><th>Rentals</th><th>Joined</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.email">
            <td><span class="mini-avatar" :class="user.color">{{ user.initials }}</span><strong>{{ user.name }}</strong></td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td><span class="admin-badge info">{{ user.role }}</span></td>
            <td><strong>{{ user.rentals }}</strong></td>
            <td>{{ user.joined }}</td>
            <td><span class="admin-badge" :class="user.status.toLowerCase()">{{ user.status }}</span></td>
            <td class="icon-actions"><Edit3 :size="17" /><Trash2 :size="17" /></td>
          </tr>
        </tbody>
      </table>
      <p class="table-caption">Showing 6 of 6 users</p>
    </section>
  </div>
</template>

<script setup>
import { Download, Edit3, Plus, Search, Trash2 } from '@lucide/vue'

const users = [
  { initials: 'SC', name: 'Sarah Chen', email: 'sarah.chen@email.com', phone: '+855 12 111 222', role: 'Customer', rentals: 14, joined: 'Jan 12, 2024', status: 'Active', color: 'purple' },
  { initials: 'MT', name: 'Michael Torres', email: 'michael.t@email.com', phone: '+855 17 333 444', role: 'Customer', rentals: 8, joined: 'Feb 3, 2024', status: 'Active', color: 'blue' },
  { initials: 'EJ', name: 'Emily Johnson', email: 'emily.j@email.com', phone: '+855 99 555 666', role: 'Customer', rentals: 22, joined: 'Mar 15, 2024', status: 'Active', color: 'pink' },
  { initials: 'DK', name: 'David Kim', email: 'david.k@email.com', phone: '+855 11 777 888', role: 'Customer', rentals: 3, joined: 'Apr 22, 2024', status: 'Suspended', color: 'slate' },
  { initials: 'LP', name: 'Lisa Park', email: 'lisa.park@email.com', phone: '+855 16 999 000', role: 'Customer', rentals: 6, joined: 'May 8, 2024', status: 'Active', color: 'green' },
  { initials: 'AU', name: 'Admin User', email: 'admin@driveease.com', phone: '+855 23 123 456', role: 'Admin', rentals: 0, joined: 'Jan 1, 2024', status: 'Active', color: 'blue' },
]
</script>
