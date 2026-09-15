<template>
  <!-- Mobile Search -->
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

  <!-- Desktop Filters -->
  <aside v-else class="filter-panel">
    <h2>
      <SlidersHorizontal :size="22" />
      Filters
    </h2>

    <!-- Search -->
    <label class="filter-field">
      Search

      <input
        v-model="filters.search"
        type="text"
        placeholder="Name or brand..."
        @input="searchVehicles"
      />
    </label>

    <!-- Category -->
    <div class="filter-group">
      <h3>Category</h3>

      <label
        v-for="category in categoryList"
        :key="category"
      >
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

    <!-- Brand -->
    <div class="filter-group">
      <h3>Brand</h3>

      <label
        v-for="brand in brandList"
        :key="brand"
      >
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
import { reactive, computed } from 'vue'
import { SlidersHorizontal } from '@lucide/vue'

const props = defineProps({
  mobile: {
    type: Boolean,
    default: false
  },

  categories: {
    type: Array,
    default: () => ['All']
  },

  brands: {
    type: Array,
    default: () => ['All']
  }
})

const emit = defineEmits(['search'])

const filters = reactive({
  search: '',
  category: 'All',
  brand: 'All'
})

// Renamed computed properties to avoid naming collision with props
const categoryList = computed(() => props.categories)
const brandList = computed(() => props.brands)

function searchVehicles() {
  emit('search', {
    ...filters
  })
}
</script>