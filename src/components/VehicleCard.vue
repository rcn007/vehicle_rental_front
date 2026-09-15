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

      <!-- Availability -->
      <span
        class="status"
        :class="availabilityClass"
      >
        {{ availabilityText }}
      </span>

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

        <span class="rating">
          ★ {{ rating }}
        </span>

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
          :to="`/vehicles/${vehicle.id}`"
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

import { computed } from 'vue'

import {
  Fuel,
  Settings,
  User
} from '@lucide/vue'


// ============================================================
// PROPS
// ============================================================

const props = defineProps({

  vehicle: {
    type: Object,
    required: true
  },

  image: {
    type: String,
    default: null
  }

})


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

  // Prevent infinite error loop
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

</script>