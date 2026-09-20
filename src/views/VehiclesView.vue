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
          :categories="categories"
          :brands="brands"
          @search="handleSearch"
        />
      </div>

      <div class="vehicles-layout">
        <SearchBar
          :categories="categories"
          :brands="brands"
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

          <div v-else-if="paginatedVehicles.length" class="vehicle-grid">
            <VehicleCard
              v-for="vehicle in paginatedVehicles"
              :key="vehicle.id"
              :vehicle="vehicle"
              :image="getVehicleImage(vehicle)"
            />
          </div>

          <div v-else class="empty-state">
            <h3>No vehicles found</h3>
            <p>Try changing your search.</p>
          </div>

          <!-- Pagination Controls -->
          <div v-if="totalPages > 1" class="pagination">
            <button
              type="button"
              class="pagination-btn"
              :disabled="currentPage === 1"
              @click="goToPage(currentPage - 1)"
            >
              Previous
            </button>

            <button
              v-for="page in totalPages"
              :key="page"
              type="button"
              class="pagination-num"
              :class="{ active: page === currentPage }"
              @click="goToPage(page)"
            >
              {{ page }}
            </button>

            <button
              type="button"
              class="pagination-btn"
              :disabled="currentPage === totalPages"
              @click="goToPage(currentPage + 1)"
            >
              Next
            </button>
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
            <label v-for="brand in brands" :key="brand">
              <input v-model="draftFilters.brand" type="radio" :value="brand" />
              {{ brand }}
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
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useVehicleStore } from '../stores/Vehicle'
import { useBookingStore } from '../stores/Booking'
import {
  getBrand,
  getCategory,
} from '../api/vehicle.js'
import VehicleCard from '../components/VehicleCard.vue'
import SearchBar from '../components/Searchbar.vue'

const vehicleStore = useVehicleStore()
const bookingStore = useBookingStore()

const sortBy = ref('default')
const filterDrawerOpen = ref(false)

const categories = ref(['All'])
const brands = ref(['All'])

const loadingMeta = ref(false)

// Pagination state
const currentPage = ref(1)
const pageSize = ref(6)

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

/*
|--------------------------------------------------------------------------
| Normalize API response
|--------------------------------------------------------------------------
*/
function getResponseData(response) {
  const data = response?.data ?? response

  if (Array.isArray(data)) {
    return data
  }

  if (Array.isArray(data?.data)) {
    return data.data
  }

  return []
}

async function fetchMetaData() {
  try {
    const [brandResponse, categoryResponse] = await Promise.all([
      getBrand(),
      getCategory()
    ])

    const brandData = getResponseData(brandResponse)
    const categoryData = getResponseData(categoryResponse)

    brands.value = [
      'All',
      ...brandData
        .map((brand) => brand.brandName || brand.name || brand)
        .filter(Boolean)
    ]

    categories.value = [
      'All',
      ...categoryData
        .map(
          (category) =>
            category.categoryName ||
            category.name ||
            category.category ||
            category
        )
        .filter(Boolean)
    ]
  } catch (error) {
    console.error('Failed to fetch vehicle metadata:', error)

    categories.value = ['All']
    brands.value = ['All']
  }
}

function formatImageUrl(rawPath) {
  if (!rawPath || typeof rawPath !== 'string') {
    return null
  }

  const path = rawPath.trim()

  if (!path) {
    return null
  }

  // External image URL
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:')
  ) {
    return path
  }

  // Local backend image
  const cleanPath = path.startsWith('/')
    ? path
    : `/${path}`

  return `http://localhost:8080${cleanPath}`
}

function getVehicleImage(vehicle) {
  if (!vehicle) {
    return null
  }

  // Backend returns mainImage
  if (
    typeof vehicle.mainImage === 'string' &&
    vehicle.mainImage.trim()
  ) {
    return vehicle.mainImage.trim()
  }

  // Other possible image fields
  if (
    typeof vehicle.image === 'string' &&
    vehicle.image.trim()
  ) {
    return vehicle.image.trim()
  }

  if (
    typeof vehicle.imageUrl === 'string' &&
    vehicle.imageUrl.trim()
  ) {
    return vehicle.imageUrl.trim()
  }

  // Optional vehicleImages support
  if (
    Array.isArray(vehicle.vehicleImages) &&
    vehicle.vehicleImages.length > 0
  ) {
    const image = vehicle.vehicleImages[0]

    const raw =
      typeof image === 'string'
        ? image
        : image?.image ||
          image?.imageUrl ||
          image?.url ||
          image?.path

    if (raw) {
      return formatImageUrl(raw)
    }
  }

  return null
}

function getVehicleBrand(vehicle) {
  if (
    vehicle?.brand &&
    typeof vehicle.brand === 'object'
  ) {
    return (
      vehicle.brand.brandName ||
      vehicle.brand.name ||
      ''
    )
  }

  return (
    vehicle?.brandName ||
    vehicle?.brand_name ||
    (typeof vehicle?.brand === 'string'
      ? vehicle.brand
      : '') ||
    vehicle?.make ||
    ''
  )
}


function getVehicleCategory(vehicle) {
  if (
    vehicle?.category &&
    typeof vehicle.category === 'object'
  ) {
    return (
      vehicle.category.categoryName ||
      vehicle.category.name ||
      vehicle.category.category_name ||
      ''
    )
  }

  return (
    vehicle?.categoryName ||
    vehicle?.category_name ||
    (typeof vehicle?.category === 'string'
      ? vehicle.category
      : '') ||
    vehicle?.type ||
    ''
  )
}

/*
|--------------------------------------------------------------------------
| Filter + Sort
|--------------------------------------------------------------------------
*/
const filteredVehicles = computed(() => {

  const search = String(filters.search || '')
    .trim()
    .toLowerCase()

  const selectedCategory = String(
    filters.category || 'All'
  )
    .trim()
    .toLowerCase()

  const selectedBrand = String(
    filters.brand || 'All'
  )
    .trim()
    .toLowerCase()


  // ==========================================================
  // BOOKING DATE
  // ==========================================================

  const pickupDate = filters.pickupDate
    ? new Date(`${filters.pickupDate}T00:00:00`)
    : null

  const returnDate = filters.returnDate
    ? new Date(`${filters.returnDate}T00:00:00`)
    : null

  const hasValidDateRange =
    pickupDate &&
    returnDate &&
    !Number.isNaN(pickupDate.getTime()) &&
    !Number.isNaN(returnDate.getTime()) &&
    returnDate >= pickupDate


  // ==========================================================
  // FILTER VEHICLES
  // ==========================================================

  const results = vehicleStore.vehicles.filter((vehicle) => {

    // --------------------------------------------------------
    // Vehicle name
    // --------------------------------------------------------

    const name = String(
      vehicle?.name ||
      vehicle?.model ||
      vehicle?.vehicleName ||
      ''
    )
      .trim()
      .toLowerCase()


    // --------------------------------------------------------
    // Brand
    // --------------------------------------------------------

    const brand = String(
      getVehicleBrand(vehicle) || ''
    )
      .trim()
      .toLowerCase()


    // --------------------------------------------------------
    // Category
    // --------------------------------------------------------

    const category = String(
      getVehicleCategory(vehicle) || ''
    )
      .trim()
      .toLowerCase()


    // ========================================================
    // SEARCH
    // ========================================================

    const matchesSearch =
      !search ||
      name.includes(search) ||
      brand.includes(search) ||
      category.includes(search)


    // ========================================================
    // CATEGORY
    // ========================================================

    const matchesCategory =
      selectedCategory === 'all' ||
      category === selectedCategory


    // ========================================================
    // BRAND
    // ========================================================

    const matchesBrand =
      selectedBrand === 'all' ||
      brand === selectedBrand


    // ========================================================
    // VEHICLE STATUS
    // ========================================================

    const vehicleStatus = String(
      vehicle?.status || ''
    )
      .trim()
      .toLowerCase()

    const isUnavailable =
      vehicleStatus === 'rented' ||
      vehicleStatus === 'maintenance' ||
      vehicleStatus === 'reserved'


    // ========================================================
    // BOOKING DATE AVAILABILITY
    // ========================================================

    let hasOverlappingBooking = false

    if (hasValidDateRange) {

      hasOverlappingBooking =
        bookingStore.bookings.some((booking) => {

          // --------------------------------------------------
          // Booking vehicle ID
          // --------------------------------------------------

          const bookingVehicleId =
            booking?.vehicleId ??
            booking?.vehicle_id ??
            booking?.vehicle?.id


          // --------------------------------------------------
          // Booking dates
          // --------------------------------------------------

          const bookingPickup =
            booking?.pickupDate ??
            booking?.pickup_date ??
            booking?.startDate

          const bookingReturn =
            booking?.returnDate ??
            booking?.return_date ??
            booking?.endDate


          if (
            !bookingPickup ||
            !bookingReturn ||
            bookingVehicleId == null
          ) {
            return false
          }


          const bookingStart =
            new Date(`${bookingPickup}T00:00:00`)

          const bookingEnd =
            new Date(`${bookingReturn}T00:00:00`)


          if (
            Number.isNaN(bookingStart.getTime()) ||
            Number.isNaN(bookingEnd.getTime())
          ) {
            return false
          }


          // --------------------------------------------------
          // Booking status
          // --------------------------------------------------

          const bookingStatus = String(
            booking?.status || ''
          )
            .trim()
            .toLowerCase()


          const isBlocking = [
            'pending',
            'confirmed',
            'active'
          ].includes(bookingStatus)


          // --------------------------------------------------
          // Same vehicle + overlapping dates
          // --------------------------------------------------

          return (
            isBlocking &&
            String(bookingVehicleId) ===
              String(vehicle?.id) &&
            bookingStart < returnDate &&
            bookingEnd > pickupDate
          )
        })
    }


    // ========================================================
    // FINAL RESULT
    // ========================================================

    return (
      matchesSearch &&
      matchesCategory &&
      matchesBrand &&
      !isUnavailable &&
      !hasOverlappingBooking
    )
  })


  // ==========================================================
  // SORT
  // ==========================================================

  return [...results].sort((a, b) => {

    const aPrice = Number(
      a?.pricePerDay ??
      a?.price_per_day ??
      a?.price ??
      a?.rentalPrice ??
      0
    )

    const bPrice = Number(
      b?.pricePerDay ??
      b?.price_per_day ??
      b?.price ??
      b?.rentalPrice ??
      0
    )


    // Low → High
    if (sortBy.value === 'priceLow') {
      return aPrice - bPrice
    }


    // High → Low
    if (sortBy.value === 'priceHigh') {
      return bPrice - aPrice
    }


    // Default order
    return 0
  })
})

/*
|--------------------------------------------------------------------------
| Pagination Logic
|--------------------------------------------------------------------------
*/
const totalPages = computed(() => {
  return Math.ceil(filteredVehicles.value.length / pageSize.value) || 1
})

const paginatedVehicles = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredVehicles.value.slice(start, end)
})

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// Reset pagination to Page 1 when any filter or sort option changes
watch(
  [filters, sortBy],
  () => {
    currentPage.value = 1
  },
  { deep: true }
)

/*
|--------------------------------------------------------------------------
| Search
|--------------------------------------------------------------------------
*/
function handleSearch(data) {
  filters.search = data.search ?? ''
  filters.category = data.category ?? 'All'
  filters.brand = data.brand ?? 'All'
}

/*
|--------------------------------------------------------------------------
| Filter drawer
|--------------------------------------------------------------------------
*/
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

/*
|--------------------------------------------------------------------------
| Load data
|--------------------------------------------------------------------------
*/
onMounted(async () => {
  await Promise.all([
    vehicleStore.fetchVehicles(),
    bookingStore.fetchBookings(),
    fetchMetaData()
  ])
})
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 32px;
}

.pagination-btn,
.pagination-num {
  padding: 8px 14px;
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.pagination-num.active {
  background-color: #007bff;
  color: #fff;
  border-color: #007bff;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>