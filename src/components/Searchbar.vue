<template>
  <aside v-if="mobile" class="mobile-search-panel">
    <label class="filter-field">
      Search vehicles
      <input
        v-model="filters.search"
        type="text"
        placeholder="Search by name or brand..."
        @input="searchVehicles"
      />
    </label>
  </aside>

  <aside v-else class="filter-panel">
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
      <label v-for="category in props.categories" :key="category.name">
        <input
          v-model="filters.category"
          type="radio"
          name="category"
          :value="category.name"
          @change="searchVehicles"
        />
        {{ category.name }}
      </label>
    </div>

    <div class="filter-group">
      <h3>Brand</h3>
      <label
        v-for="brand in props.brands"
        :key="brand.name || brand.brand_name"
      >
        <input
          v-model="filters.brand"
          type="radio"
          name="brand"
          :value="brand.name || brand.brand_name"
          @change="searchVehicles"
        />
        <img
          v-if="brand.logo"
          class="brand-logo"
          :src="brand.logo"
          :alt="`${brand.name || brand.brand_name} logo`"
        />
        {{ brand.name || brand.brand_name }}
      </label>
    </div>
  </aside>
</template>

<script setup>
import { reactive } from 'vue'
import { SlidersHorizontal } from '@lucide/vue'

const props = defineProps({
  mobile: {
    type: Boolean,
    default: false
  },
  brands: {
    type: Array,
    default: () => []
  },
  categories: {
    type: Array,
    default: () => [{ name: 'All' }]
  }
})

const emit = defineEmits(['search'])

const filters = reactive({
  search: '',
  category: 'All',
  brand: 'All'
})

function searchVehicles() {
  emit('search', { ...filters })
}
</script>
