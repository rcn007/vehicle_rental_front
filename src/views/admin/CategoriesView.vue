<template>
  <div class="admin-page">
    <div class="admin-toolbar align-end">
      <section class="admin-mini-stats">
        <article><strong>7</strong><small>Total</small></article>
        <article><strong class="text-success">6</strong><small>Active</small></article>
        <article><strong class="text-blue">394</strong><small>Vehicles</small></article>
      </section>
      <button class="btn btn-primary"><Plus :size="18" />Add Category</button>
    </div>

    <section class="category-admin-grid">
      <article v-for="category in categories" :key="category.name" class="category-admin-card" :class="{ muted: !category.active }">
        <component :is="category.icon" :size="28" />
        <label class="switch"><input type="checkbox" :checked="category.active" /><span></span></label>
        <h2>{{ category.name }}</h2>
        <p>{{ category.copy }}</p>
        <strong>{{ category.count }} vehicles</strong>
        <div class="icon-actions"><Edit3 :size="17" /><Trash2 :size="17" /></div>
      </article>
      <article class="category-admin-card add-card">
        <Plus :size="24" />
        <span>Add Category</span>
      </article>
    </section>
  </div>
</template>

<script setup>
import { Bolt, Car, Edit3, Gem, Plus, Truck, Trash2, Zap } from '@lucide/vue'

const categories = [
  { name: 'Sedan', copy: 'Comfortable 4-door passenger cars', count: 142, icon: Car, active: true },
  { name: 'SUV', copy: 'Sport utility vehicles for all terrain', count: 98, icon: Truck, active: true },
  { name: 'Motorcycle', copy: 'Two-wheeled motor vehicles', count: 64, icon: Zap, active: true },
  { name: 'Luxury', copy: 'Premium high-end vehicles', count: 31, icon: Gem, active: true },
  { name: 'Van', copy: 'Large capacity passenger vans', count: 28, icon: Truck, active: true },
  { name: 'Pickup Truck', copy: 'Light-duty commercial trucks', count: 19, icon: Truck, active: false },
  { name: 'Electric', copy: 'Zero-emission electric vehicles', count: 12, icon: Bolt, active: true },
]
</script>
