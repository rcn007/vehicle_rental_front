<template>
  <section class="vehicles-page">
    <div class="container">
      <div class="page-header">
        <h1>Browse Vehicles</h1>
        <p>{{ filteredVehicles.length }} vehicles found</p>
      </div>

      <div class="mobile-search">
        <SearchBar
          mobile
          :brands="brands"
          :categories="categories"
          @search="handleSearch"
        />
      </div>

      <div class="vehicles-layout">
        <SearchBar
          :brands="brands"
          :categories="categories"
          @search="handleSearch"
        />

        <div class="vehicles-results">
          <div class="hero-search vehicle-search">
            <label>
              Pickup Date
              <input v-model="filters.pickupDate" type="date" />
            </label>

            <label>
              Return Date
              <input v-model="filters.returnDate" type="date" />
            </label>
          </div>

          <div class="results-toolbar">
            <div class="mobile-filter-actions">
              <button type="button" @click="openFilterDrawer">Filter</button>

              <label>
                Sort
                <select v-model="sortBy">
                  <option value="default">Default</option>
                  <option value="priceLow">Price low to high</option>
                  <option value="priceHigh">Price high to low</option>
                </select>
              </label>
            </div>

            <span class="vehicle-count"
              >{{ filteredVehicles.length }} vehicles</span
            >

            <label class="desktop-sort">
              Sort:
              <select v-model="sortBy">
                <option value="default">Default</option>
                <option value="priceLow">Price low to high</option>
                <option value="priceHigh">Price high to low</option>
              </select>
            </label>
          </div>

          <div v-if="vehicleStore.loading" class="loading">
            Loading vehicles...
          </div>

          <div v-else-if="filteredVehicles.length" class="vehicle-grid">
            <VehicleCard
              v-for="vehicle in filteredVehicles"
              :key="vehicle.id"
              :vehicle="vehicle"
            />
          </div>

          <div v-else class="empty-state">
            <h3>No vehicles found</h3>
            <p>Try changing your search.</p>
          </div>
        </div>
      </div>

      <div
        v-if="filterDrawerOpen"
        class="filter-drawer-backdrop"
        @click.self="filterDrawerOpen = false"
      >
        <aside class="filter-drawer" aria-label="Vehicle filters">
          <div class="filter-drawer-header">
            <h2>Filters</h2>
            <button
              type="button"
              aria-label="Close filters"
              @click="filterDrawerOpen = false"
            >
              &times;
            </button>
          </div>

          <div class="filter-group">
            <h3>Category</h3>
            <label v-for="category in categories" :key="category">
              <input
                v-model="draftFilters.category"
                type="radio"
                :value="category"
              />
              {{ category }}
            </label>
          </div>

          <div class="filter-group">
            <h3>Brand</h3>
            <label v-for="brand in brands" :key="brand.name">
              <input
                v-model="draftFilters.brand"
                type="radio"
                :value="brand.name"
              />
              <img
                v-if="brand.logo"
                class="brand-logo"
                :src="brand.logo"
                :alt="`${brand.name} logo`"
              />
              {{ brand.name }}
            </label>
          </div>

          <div class="filter-drawer-actions">
            <button type="button" class="btn btn-outline" @click="resetFilters">
              Reset
            </button>
            <button type="button" class="btn btn-primary" @click="applyFilters">
              Apply Filters
            </button>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useVehicleStore } from '../stores/Vehicle'
import { useBrandStore } from '../stores/Brand'
import { useCategoryStore } from '../stores/Category'
import VehicleCard from '../components/VehicleCard.vue'
import SearchBar from '../components/Searchbar.vue'

const vehicleStore = useVehicleStore()
const brandStore = useBrandStore()
const categoryStore = useCategoryStore()
const sortBy = ref('default')
const filterDrawerOpen = ref(false)

const brands = computed(() => [{ name: 'All', logo: '' }, ...brandStore.brands])
const categories = computed(() => [
  { name: 'All' },
  ...categoryStore.categories
])

const filters = reactive({
  search: '',
  category: 'All',
  brand: 'All',
  pickupDate: '',
  returnDate: ''
})

const draftFilters = reactive({
  category: 'All',
  brand: 'All'
})

const filteredVehicles = computed(() => {
  const search = filters.search.trim().toLowerCase()

  const results = vehicleStore.vehicles.filter((vehicle) => {
    const name = String(vehicle.name || vehicle.model || '').toLowerCase()
    const brand = String(vehicle.brand || vehicle.make || '')
      .toLowerCase()
      .replace(/[-\s]+/g, '')
    const type = String(vehicle.type || vehicle.category || '').toLowerCase()

    const matchesSearch =
      !search || name.includes(search) || brand.includes(search)
    const matchesCategory =
      filters.category === 'All' || type === filters.category.toLowerCase()
    const matchesBrand =
      filters.brand === 'All' ||
      brand === filters.brand.toLowerCase().replace(/[-\s]+/g, '')
    return matchesSearch && matchesCategory && matchesBrand
  })

  return [...results].sort((a, b) => {
    const aPrice = Number(a.pricePerDay || a.price || 0)
    const bPrice = Number(b.pricePerDay || b.price || 0)

    if (sortBy.value === 'priceLow') return aPrice - bPrice
    if (sortBy.value === 'priceHigh') return bPrice - aPrice
    return 0
  })
})

function handleSearch(data) {
  filters.search = data.search || ''
  filters.category = data.category || 'All'
  filters.brand = data.brand || 'All'
  filters.pickupDate = data.pickupDate || filters.pickupDate
  filters.returnDate = data.returnDate || filters.returnDate
}

function openFilterDrawer() {
  Object.assign(draftFilters, {
    category: filters.category,
    brand: filters.brand
  })
  filterDrawerOpen.value = true
}

function applyFilters() {
  filters.category = draftFilters.category
  filters.brand = draftFilters.brand
  filterDrawerOpen.value = false
}

function resetFilters() {
  Object.assign(draftFilters, {
    category: 'All',
    brand: 'All'
  })
  Object.assign(filters, {
    category: 'All',
    brand: 'All'
  })
}

onMounted(() => {
  vehicleStore.fetchVehicles()
  brandStore.fetchBrands()
  categoryStore.fetchCategories()
})
</script>
