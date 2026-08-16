<template>
  <aside class="filter-panel">
    <h2>
      <SlidersHorizontal :size="22" />
      Filters
    </h2>

    <label class="filter-field">
      Search
      <input
        v-model="filters.search"
        type="text"
        placeholder="Name or brand..."
        @input="searchVehicles"
      />
    </label>

    <div class="filter-group">
      <h3>Category</h3>
      <label v-for="category in categories" :key="category">
        <input
          v-model="filters.category"
          type="radio"
          name="category"
          :value="category"
          @change="searchVehicles"
        />
        {{ category }}
      </label>
    </div>

    <div class="filter-group">
      <h3>Brand</h3>
      <label v-for="brand in brands" :key="brand">
        <input
          v-model="filters.brand"
          type="radio"
          name="brand"
          :value="brand"
          @change="searchVehicles"
        />
        {{ brand }}
      </label>
    </div>
  </aside>
</template>

<script setup>
import { reactive } from 'vue'
import { SlidersHorizontal } from '@lucide/vue'

const emit = defineEmits(['search'])

const categories = ['All', 'Sedan', 'SUV', 'Motorcycle', 'Luxury']
const brands = ['All', 'BMW', 'Toyota', 'Honda', 'Audi']

const filters = reactive({
  search: '',
  category: 'All',
  brand: 'All',
})

function searchVehicles() {
  emit('search', { ...filters })
}
</script>
