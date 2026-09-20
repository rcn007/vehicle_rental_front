<template>
  <article class="vehicle-card">

    <!-- =====================================================
         IMAGE
    ====================================================== -->

    <div class="vehicle-media">

      <img
        :src="image || '/images/vehicle-placeholder.jpg'"
        :alt="vehicleName"
        @error="handleImageError"
      />

      <!-- Favorite Button -->
      <button
        type="button"
        class="absolute top-3 left-3 z-20
               flex items-center justify-center
               w-10 h-10
               rounded-full
               bg-white/90 backdrop-blur-sm
               shadow-md
               active:scale-95
               transition-all duration-200 ease-out 
               hover:scale-105"
        :class="localIsFavorite ? 'text-red-500 hover:bg-red-50' : 'text-gray-500 hover:text-red-500 hover:bg-white'"
        :disabled="favoriteLoading"
        @click.stop="toggleFavorite"
      >
        <Heart
          :size="20"
          :class="localIsFavorite ? 'text-red-500 fill-current' : 'text-gray-500 hover:text-red-500'"
          :fill="localIsFavorite ? 'currentColor' : 'none'"
          :stroke-width="2.5"
        />
      </button>

      <!-- Price -->
      <span class="price-badge">
        ${{ price }}/day
      </span>

    </div>


    <!-- =====================================================
         CONTENT
    ====================================================== -->

    <div class="vehicle-content">

      <!-- Brand / Category -->
      <div class="vehicle-meta">
        {{ brandName }}
        -
        {{ categoryName }}
      </div>


      <!-- Vehicle Name / Rating -->
      <div class="vehicle-title-row">

        <h3>
          {{ vehicleName }}
        </h3>

      </div>


      <!-- Vehicle Specs -->
      <div class="vehicle-specs">

        <span>
          <Settings :size="15" />
          {{ transmission }}
        </span>

        <span>
          <Fuel :size="15" />
          {{ fuelType }}
        </span>

        <span>
          <User :size="15" />
          {{ seats }}
        </span>

      </div>


      <!-- Actions -->
      <div class="vehicle-actions">

      <RouterLink
          :to="{
            name: 'vehicle-detail',
            params: {
              vehicleId: vehicle.id
            }
          }"
          class="btn btn-outline"
        >
          Details
        </RouterLink>

        <RouterLink
          :to="`/booking/${vehicle.id}`"
          class="btn btn-primary"
        >
          Book Now
        </RouterLink>

      </div>

    </div>

  </article>
</template>


<script setup>

import { computed, ref, watch } from 'vue'

import {
  Fuel,
  Settings,
  User,
  Heart
} from '@lucide/vue'

import {
  addFavorite,
  removeFavorite
} from '../api/favorite'


// ============================================================
// PROPS & EMITS
// ============================================================

const props = defineProps({

  vehicle: {
    type: Object,
    required: true
  },

  image: {
    type: String,
    default: null
  },

  isFavorite: {
    type: Boolean,
    default: false
  }

})

const emit = defineEmits(['favorite-changed'])


// ============================================================
// LOCAL FAVORITE STATE MANAGEMENT
// ============================================================

// Reactive local state controlling the red fill
const localIsFavorite = ref(Boolean(props.isFavorite))
const favoriteLoading = ref(false)

// Keep local state synced if parent changes or re-fetches from DB
watch(
  () => props.isFavorite,
  (newVal) => {
    localIsFavorite.value = Boolean(newVal)
  },
  { immediate: true }
)

const toggleFavorite = async () => {
  if (favoriteLoading.value) return

  const vehicleId = props.vehicle?.id
  if (!vehicleId) {
    console.error('Vehicle ID not found')
    return
  }

  // Preserve initial state in case API call fails
  const previousState = localIsFavorite.value
  const targetState = !previousState

  // 1. Immediately toggle red fill locally (Optimistic update)
  localIsFavorite.value = targetState
  favoriteLoading.value = true

  try {
    if (previousState) {
      // Unfavorite -> DELETE from database table
      await removeFavorite(vehicleId)
    } else {
      // Favorite -> INSERT into database table
      await addFavorite(vehicleId)
    }

    // 2. Notify parent so state persists across component updates
    emit('favorite-changed', {
      vehicleId,
      isFavorite: targetState
    })
  } catch (error) {
    // 3. Rollback UI color if backend/DB operation failed
    localIsFavorite.value = previousState
    console.error('Database favorite sync failed:', error)
  } finally {
    favoriteLoading.value = false
  }
}

// ============================================================
// VEHICLE NAME
// ============================================================

const vehicleName = computed(() => {

  return (
    props.vehicle?.name ||
    props.vehicle?.vehicleName ||
    props.vehicle?.model ||
    'Premium Vehicle'
  )

})


// ============================================================
// BRAND
// ============================================================

const brandName = computed(() => {

  const vehicle = props.vehicle

  if (
    typeof vehicle?.brand === 'object' &&
    vehicle.brand
  ) {

    return (
      vehicle.brand.name ||
      vehicle.brand.brandName ||
      'Vehicle'
    )

  }

  return (
    vehicle?.brandName ||
    vehicle?.brand_name ||
    vehicle?.brand ||
    'Vehicle'
  )

})


// ============================================================
// CATEGORY
// ============================================================

const categoryName = computed(() => {

  const vehicle = props.vehicle

  if (
    typeof vehicle?.category === 'object' &&
    vehicle.category
  ) {

    return (
      vehicle.category.name ||
      vehicle.category.categoryName ||
      'Rental'
    )

  }

  return (
    vehicle?.categoryName ||
    vehicle?.category_name ||
    vehicle?.category ||
    vehicle?.type ||
    'Rental'
  )

})


// ============================================================
// PRICE
// ============================================================

const price = computed(() => {

  return (
    props.vehicle?.pricePerDay ??
    props.vehicle?.price_per_day ??
    props.vehicle?.price ??
    0
  )

})


// ============================================================
// RATING
// ============================================================

const rating = computed(() => {

  return (
    props.vehicle?.rating ??
    '4.8'
  )

})


// ============================================================
// TRANSMISSION
// ============================================================

const transmission = computed(() => {

  return (
    props.vehicle?.transmission ||
    props.vehicle?.transmissionType ||
    'Automatic'
  )

})


// ============================================================
// FUEL
// ============================================================

const fuelType = computed(() => {

  return (
    props.vehicle?.fuelType ||
    props.vehicle?.fuel_type ||
    props.vehicle?.fuel ||
    'Gasoline'
  )

})


// ============================================================
// SEATS
// ============================================================

const seats = computed(() => {

  return (
    props.vehicle?.seats ??
    props.vehicle?.seat ??
    props.vehicle?.numberOfSeats ??
    4
  )

})


// ============================================================
// STATUS
// ============================================================

const status = computed(() => {

  return String(
    props.vehicle?.status ||
    'AVAILABLE'
  ).toLowerCase()

})


const availabilityClass = computed(() => {

  if (
    status.value.includes('available')
  ) {

    return 'available'

  }

  return 'unavailable'

})


const availabilityText = computed(() => {

  return availabilityClass.value === 'available'
    ? 'Available'
    : 'Unavailable'

})


// ============================================================
// IMAGE ERROR
// ============================================================

const handleImageError = (event) => {

  console.error(
    'Vehicle image failed:',
    event.target.src
  )

  if (
    event.target.src.includes(
      '/images/vehicle-placeholder.jpg'
    )
  ) {
    return
  }

  event.target.src =
    '/images/vehicle-placeholder.jpg'

}
// Reactive local state controlling the red fill


</script>