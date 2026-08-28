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
import { useBookingStore } from '../stores/Booking'
import VehicleCard from '../components/VehicleCard.vue'
import SearchBar from '../components/Searchbar.vue'

const vehicleStore = useVehicleStore()
const bookingStore = useBookingStore()
const sortBy = ref('default')

const filters = reactive({
  search: '',
  category: 'All',
  brand: 'All',
  pickupDate: '',
  returnDate: ''
})

const filteredVehicles = computed(() => {
  const search = filters.search.trim().toLowerCase()
  const pickupDate = filters.pickupDate
    ? new Date(`${filters.pickupDate}T00:00:00`)
    : null
  const returnDate = filters.returnDate
    ? new Date(`${filters.returnDate}T00:00:00`)
    : null

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
    const hasOverlappingBooking =
      pickupDate && returnDate
        ? bookingStore.bookings.some((booking) => {
            const bookingStart = new Date(`${booking.pickupDate}T00:00:00`)
            const bookingEnd = new Date(`${booking.returnDate}T00:00:00`)
            const status = String(booking.status || '').toLowerCase()
            const isBlocking = ['pending', 'confirmed', 'active'].includes(
              status
            )

            return (
              isBlocking &&
              String(booking.vehicleId) === String(vehicle.id) &&
              bookingStart < returnDate &&
              bookingEnd > pickupDate
            )
          })
        : false

    return (
      matchesSearch && matchesCategory && matchesBrand && !hasOverlappingBooking
    )
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

onMounted(() => {
  vehicleStore.fetchVehicles()
  bookingStore.fetchBookings()
})
</script>
