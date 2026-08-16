<template>
  <div class="admin-page">
    <div class="admin-toolbar">
      <label class="admin-search large"><Search :size="18" /><input placeholder="Search vehicles..." /></label>
      <button class="btn btn-primary"><Plus :size="18" />Add Vehicle</button>
    </div>

    <section class="admin-stat-grid">
      <article><strong>6</strong><small>Total</small></article>
      <article><strong class="text-success">3</strong><small>Available</small></article>
      <article><strong class="text-blue">2</strong><small>Rented</small></article>
      <article><strong class="text-orange">1</strong><small>Maintenance</small></article>
    </section>

    <section class="admin-panel admin-table-panel">
      <table>
        <thead>
          <tr><th>Image</th><th>Vehicle Name</th><th>Category</th><th>Brand</th><th>Price/Day</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          <tr v-for="vehicle in vehicles" :key="vehicle.id">
            <td><img class="admin-thumb" :src="vehicle.image" :alt="vehicle.name" /></td>
            <td><strong>{{ vehicle.name }}</strong><small>ID: {{ vehicle.id }}</small></td>
            <td>{{ vehicle.category }}</td>
            <td>{{ vehicle.brand }}</td>
            <td><strong>${{ vehicle.price }}</strong></td>
            <td><span class="admin-badge" :class="vehicle.status.toLowerCase()">{{ vehicle.status }}</span></td>
            <td class="icon-actions"><Eye :size="17" /><Edit3 :size="17" /><Trash2 :size="17" /></td>
          </tr>
        </tbody>
      </table>
      <p class="table-caption">Showing 6 of 6 vehicles</p>
    </section>
  </div>
</template>

<script setup>
import { Edit3, Eye, Plus, Search, Trash2 } from '@lucide/vue'

const vehicles = [
  { id: 'VH-0001', name: 'BMW 5 Series 530i', category: 'Sedan', brand: 'BMW', price: 120, status: 'Available', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=160&q=80' },
  { id: 'VH-0002', name: 'Toyota RAV4 XLE', category: 'SUV', brand: 'Toyota', price: 85, status: 'Available', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=160&q=80' },
  { id: 'VH-0003', name: 'Honda CBR650R', category: 'Motorcycle', brand: 'Honda', price: 45, status: 'Rented', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=160&q=80' },
  { id: 'VH-0004', name: 'Rolls-Royce Ghost', category: 'Luxury', brand: 'Rolls-Royce', price: 350, status: 'Maintenance', image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=160&q=80' },
  { id: 'VH-0005', name: 'Audi A4 Premium Plus', category: 'Sedan', brand: 'Audi', price: 95, status: 'Available', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=160&q=80' },
  { id: 'VH-0006', name: 'Harley-Davidson Road King', category: 'Motorcycle', brand: 'Harley-Davidson', price: 75, status: 'Rented', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=160&q=80' },
]
</script>
