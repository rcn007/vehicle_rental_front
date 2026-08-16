<template>
  <div class="admin-page">
    <div class="admin-toolbar">
      <label class="admin-search large"><Search :size="18" /><input placeholder="Search brands..." /></label>
      <button class="btn btn-primary"><Plus :size="18" />Add Brand</button>
    </div>

    <section class="admin-panel admin-table-panel">
      <table>
        <thead>
          <tr><th>Brand</th><th>Country</th><th>Founded</th><th>Vehicles</th><th>Categories</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          <tr v-for="brand in brands" :key="brand.name">
            <td><span class="brand-code">{{ brand.code }}</span><strong>{{ brand.name }}</strong></td>
            <td>{{ brand.country }}</td>
            <td>{{ brand.founded }}</td>
            <td><strong class="text-blue">{{ brand.vehicles }}</strong></td>
            <td><span v-for="tag in brand.tags" :key="tag" class="tag">{{ tag }}</span></td>
            <td><label class="switch"><input type="checkbox" :checked="brand.active" /><span></span></label></td>
            <td class="icon-actions"><Edit3 :size="17" /><Trash2 :size="17" /></td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup>
import { Edit3, Plus, Search, Trash2 } from '@lucide/vue'

const brands = [
  { code: 'DE', name: 'BMW', country: 'Germany', founded: 1916, vehicles: 48, tags: ['Sedan', 'SUV', 'Luxury'], active: true },
  { code: 'JP', name: 'Toyota', country: 'Japan', founded: 1937, vehicles: 86, tags: ['Sedan', 'SUV', 'Van'], active: true },
  { code: 'JP', name: 'Honda', country: 'Japan', founded: 1948, vehicles: 54, tags: ['Sedan', 'Motorcycle'], active: true },
  { code: 'GB', name: 'Rolls-Royce', country: 'United Kingdom', founded: 1906, vehicles: 12, tags: ['Luxury'], active: true },
  { code: 'DE', name: 'Audi', country: 'Germany', founded: 1909, vehicles: 38, tags: ['Sedan', 'SUV'], active: true },
  { code: 'US', name: 'Harley-Davidson', country: 'USA', founded: 1903, vehicles: 24, tags: ['Motorcycle'], active: true },
  { code: 'DE', name: 'Mercedes-Benz', country: 'Germany', founded: 1926, vehicles: 42, tags: ['Sedan', 'SUV', 'Luxury'], active: false },
]
</script>
