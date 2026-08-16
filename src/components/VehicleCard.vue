<template>
  <article class="vehicle-card">
    <div class="vehicle-media">
      <img
        :src="vehicle.image || vehicle.imageUrl || '/src/assets/hero.png'"
        :alt="vehicle.name"
      />

      <span
        class="status"
        :class="availabilityClass"
      >
        {{ availabilityText }}
      </span>

      <span class="price-badge">
        ${{ vehicle.pricePerDay || vehicle.price || 0 }}/day
      </span>
    </div>

    <div class="vehicle-content">
      <div class="vehicle-meta">
        {{ vehicle.brand || vehicle.make || 'Vehicle' }} - {{ vehicle.type || vehicle.category || 'Rental' }}
      </div>

      <div class="vehicle-title-row">
        <h3>{{ vehicle.name || vehicle.model || 'Premium Vehicle' }}</h3>
        <span class="rating">★ {{ vehicle.rating || '4.8' }}</span>
      </div>

      <div class="vehicle-specs">
        <span><Settings :size="15" /> {{ vehicle.transmission || 'Automatic' }}</span>
        <span><Fuel :size="15" /> {{ vehicle.fuelType || vehicle.fuel || 'Gasoline' }}</span>
        <span><User :size="15" /> {{ vehicle.seats || 4 }}</span>
      </div>

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
import { Fuel, Settings, User } from '@lucide/vue'

const props = defineProps({
  vehicle: {
    type: Object,
    required: true,
  },
})

const status = computed(() =>
  String(props.vehicle.status || 'available').toLowerCase(),
)

const availabilityClass = computed(() =>
  status.value.includes('unavailable') ? 'unavailable' : 'available',
)

const availabilityText = computed(() =>
  availabilityClass.value === 'available' ? 'Available' : 'Unavailable',
)
</script>


