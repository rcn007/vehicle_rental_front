<template>
  <section class="vehicles-page">
    <div class="container">
      <div class="page-header">
        <h1>Browse Vehicles</h1>
        <p>{{ filteredVehicles.length }} vehicles found</p>
      </div>

      <div class="vehicles-layout">
        <SearchBar @search="handleSearch" />

        <div class="vehicles-results">
          <div class="results-toolbar">
            <span>{{ filteredVehicles.length }} vehicles</span>

            <label>
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
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useVehicleStore } from '../stores/Vehicle'
import VehicleCard from '../components/VehicleCard.vue'
import SearchBar from '../components/Searchbar.vue'

const vehicleStore = useVehicleStore()
const sortBy = ref('default')

const filters = reactive({
  search: '',
  category: 'All',
  brand: 'All',
})

const filteredVehicles = computed(() => {
  const search = filters.search.trim().toLowerCase()

  const results = vehicleStore.vehicles.filter((vehicle) => {
    const name = String(vehicle.name || vehicle.model || '').toLowerCase()
    const brand = String(vehicle.brand || vehicle.make || '').toLowerCase()
    const type = String(vehicle.type || vehicle.category || '').toLowerCase()

    const matchesSearch = !search || name.includes(search) || brand.includes(search)
    const matchesCategory =
      filters.category === 'All' ||
      type === filters.category.toLowerCase()
    const matchesBrand =
      filters.brand === 'All' ||
      brand === filters.brand.toLowerCase()

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
}

onMounted(() => {
  vehicleStore.fetchVehicles()
})
</script>
