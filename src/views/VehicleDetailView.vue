<template>
  <section class="section">
    <div class="container">
      <div v-if="vehicleStore.loading" class="loading">Loading vehicle...</div>

      <div v-else-if="vehicleStore.vehicle" class="vehicle-detail">
        <div>
          <img
            :src="vehicleStore.vehicle.image || '/src/assets/hero.png'"
            :alt="vehicleStore.vehicle.name"
            class="detail-image"
          />
        </div>

        <div class="detail-info">
          <span class="status available">
            {{ vehicleStore.vehicle.status || 'AVAILABLE' }}
          </span>

          <h1>{{ vehicleStore.vehicle.name }}</h1>

          <p>
            {{
              vehicleStore.vehicle.description ||
              'Comfortable and reliable vehicle for your journey.'
            }}
          </p>

          <div class="detail-specs">
            <div>
              <strong>Type</strong>
              <span>{{ vehicleStore.vehicle.type || '-' }}</span>
            </div>

            <div>
              <strong>Seats</strong>
              <span>{{ vehicleStore.vehicle.seats || 4 }}</span>
            </div>

            <div>
              <strong>Transmission</strong>
              <span>
                {{ vehicleStore.vehicle.transmission || 'Automatic' }}
              </span>
            </div>
          </div>

          <div class="price-large">
            ${{
              vehicleStore.vehicle.pricePerDay ||
              vehicleStore.vehicle.price ||
              0
            }}
            <small>/ day</small>
          </div>

          <RouterLink
            :to="`/booking/${vehicleStore.vehicle.id}`"
            class="btn btn-primary btn-full"
          >
            Book This Vehicle
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useVehicleStore } from '../stores/Vehicle'

const route = useRoute()
const vehicleStore = useVehicleStore()

onMounted(() => {
  vehicleStore.fetchVehicle(route.params.id)
})
</script>
