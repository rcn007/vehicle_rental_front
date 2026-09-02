<template>
  <section class="vehicle-page">
    <div class="container">
      <div v-if="vehicleStore.loading" class="loading-state">
        Loading vehicle...
      </div>

      <div v-else-if="vehicleStore.vehicle" class="vehicle-detail-shell">
        <div class="vehicle-main">
          <div class="image-panel">
            <img
              :src="primaryImage"
              :alt="vehicleStore.vehicle.name"
              class="detail-image"
            />
          </div>

          <div class="detail-panel">
            <span class="status-badge" :class="{ unavailable: !isAvailable }">
              {{ statusText }}
            </span>

            <h1>{{ vehicleStore.vehicle.name }}</h1>

            <p class="vehicle-description">
              {{
                vehicleStore.vehicle.description ||
                'Comfortable and reliable vehicle for your journey.'
              }}
            </p>

            <div class="spec-grid">
              <div class="spec-item">
                <span class="spec-label">Type</span>
                <span class="spec-value">{{
                  vehicleStore.vehicle.type || '-'
                }}</span>
              </div>

              <div class="spec-item">
                <span class="spec-label">Seats</span>
                <span class="spec-value">{{
                  vehicleStore.vehicle.seats || 4
                }}</span>
              </div>

              <div class="spec-item">
                <span class="spec-label">Transmission</span>
                <span class="spec-value">
                  {{ vehicleStore.vehicle.transmission || 'Automatic' }}
                </span>
              </div>
            </div>

            <div class="price-block">
              ${{
                vehicleStore.vehicle.pricePerDay ||
                vehicleStore.vehicle.price ||
                0
              }}
              <small>/ day</small>
            </div>

            <RouterLink
              :to="`/booking/${vehicleStore.vehicle.id}`"
              class="book-button"
            >
              Book This Vehicle
            </RouterLink>
          </div>
        </div>

        <div class="gallery-section">
          <h2>Gallery</h2>

          <div class="gallery-grid">
            <img
              v-for="(image, index) in galleryImages"
              :key="`${vehicleStore.vehicle.id}-${index}`"
              :src="image"
              :alt="`${vehicleStore.vehicle.name} gallery ${index + 1}`"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useVehicleStore } from '../stores/Vehicle'

import carFront from '../assets/5DEs0fChnhYElPSXglQ4.png'
import carSide from '../assets/669bi_5778.jpg'
import carWheel from '../assets/2023ddc5d87bcaa58030db770d2cddee.jpg'
import carInterior from '../assets/images.jpg'
import carDetail from '../assets/b3fe6b67ab8e4d408ca7c7094849be8f.jpg'
import toyotaTailLight from '../assets/taillight_of_toyotaRAV4.jpg'
import toyotaFrontUpper from '../assets/FrontUpper_of_toyotaRAV4.jpg'
import toyotaCabin from '../assets/cabin_of_toyotaRAV4.jpg'
import toyotaWheel from '../assets/car_wheel_of_toyotaRAV4.jpg'
import seatToyotaCross from '../assets/seat_toyotacross.webp'
import plusToyotaCross from '../assets/plus_toyotacross.jpg'
import backToyotaCross from '../assets/back_toyotacross.jpg'
import cabinToyotaCross from '../assets/cabin_toyotacross.jpg'
import seatMotorhaley from '../assets/seat_motorhaley.jpg'
import digitalRiserMotorhaley from '../assets/Digital_Riser_motorhaley.jpg'
import airCleanerMotorhaley from '../assets/Air_Cleaner_motorhaley.jpg'
import harleyDavidson from '../assets/Harley_Davidson.jpg'
import carDoorLambo from '../assets/carbondoor_lambo.webp'
import wheelLambo from '../assets/wheel_lambo.jpg'
import novitecLambo from '../assets/novitec_lambo.jpg'
import fibreLambo from '../assets/fibre_lambo.webp'
import audiA4Image from '../assets/audiA4.jpg'
import plusAudi from '../assets/plus_audi.jpg'
import wheelAudi from '../assets/wheel_audi.webp'
import frontAudi from '../assets/cabin_audi.jpg'
import backAudi from '../assets/back_audi.webp'

const route = useRoute()
const vehicleStore = useVehicleStore()

const primaryImage = computed(() => {
  if (vehicleStore.vehicle?.name === 'Audi A4 Premium') {
    return audiA4Image
  }

  return vehicleStore.vehicle?.image || carFront
})

const isAvailable = computed(
  () =>
    String(vehicleStore.vehicle?.status || 'Available').toLowerCase() !==
    'unavailable'
)

const statusText = computed(() =>
  vehicleStore.vehicle?.status ? vehicleStore.vehicle.status : 'Available'
)

const galleryImages = computed(() => {
  if (vehicleStore.vehicle?.name === 'Toyota RAV4 Hybrid') {
    return [toyotaTailLight, toyotaFrontUpper, toyotaCabin, toyotaWheel]
  }

  if (vehicleStore.vehicle?.name === 'Toyota Corolla Cross') {
    return [seatToyotaCross, plusToyotaCross, backToyotaCross, cabinToyotaCross]
  }

  if (vehicleStore.vehicle?.name === 'Honda CBR650R') {
    return [
      seatMotorhaley,
      digitalRiserMotorhaley,
      airCleanerMotorhaley,
      harleyDavidson
    ]
  }

  if (vehicleStore.vehicle?.name === 'Lamborghini Aventador') {
    return [carDoorLambo, wheelLambo, novitecLambo, fibreLambo]
  }

  if (vehicleStore.vehicle?.name === 'Audi A4 Premium') {
    return [plusAudi, wheelAudi, frontAudi, backAudi]
  }

  return [carSide, carFront, carInterior, carDetail]
})

onMounted(() => {
  vehicleStore.fetchVehicle(route.params.id)
})
</script>

<style scoped>
.vehicle-page {
  padding: 28px 0 68px;
  background: #f1f1f1;
}

.container {
  width: min(1280px, 92%);
  margin: 0 auto;
}

.loading-state {
  padding: 40px 20px;
  text-align: center;
  color: #4b5563;
  font-size: 1.1rem;
}

.vehicle-detail-shell {
  background: rgba(255, 255, 255, 0.42);
  border: 1px solid #dfe3e8;
  border-radius: 18px;
  padding: 14px;
  box-shadow: 0 8px 16px rgba(15, 23, 42, 0.04);
}

.vehicle-main {
  display: grid;
  grid-template-columns: 1.75fr 1fr;
  gap: 20px;
  background: #f5f5f5;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.image-panel {
  min-height: 440px;
  background: #dde5ee;
}

.detail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.detail-panel {
  background: #f5f5f5;
  padding: 26px 26px 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.status-badge {
  display: inline-flex;
  align-self: flex-start;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  background: #d7f7ea;
  color: #166534;
  margin-bottom: 18px;
}

.status-badge.unavailable {
  background: #fef3c7;
  color: #92400e;
}

.detail-panel h1 {
  margin: 0;
  font-size: clamp(2.2rem, 3vw, 3rem);
  line-height: 1.08;
  letter-spacing: -0.04em;
  color: #151b28;
}

.vehicle-description {
  margin: 16px 0 18px;
  color: #6a7280;
  font-size: 1.05rem;
  line-height: 1.4;
}

.spec-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin: 8px 0 22px;
}

.spec-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: rgba(148, 163, 184, 0.08);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 10px;
  padding: 12px 12px 10px;
  min-height: 80px;
}

.spec-label {
  display: block;
  color: #6b7280;
  font-size: 0.72rem;
  font-weight: 600;
}

.spec-value {
  color: #111827;
  font-size: 1.1rem;
  font-weight: 600;
}

.price-block {
  display: flex;
  align-items: baseline;
  gap: 4px;
  color: #131c2c;
  font-size: clamp(2.1rem, 2vw, 2.7rem);
  font-weight: 800;
  margin-bottom: 18px;
  letter-spacing: -0.04em;
}

.price-block small {
  font-size: 1rem;
  font-weight: 600;
  color: #4b5563;
}

.book-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 52px;
  background: #101b2b;
  color: #ffffff;
  font-weight: 700;
  border-radius: 8px;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.book-button:hover {
  opacity: 0.96;
}

.gallery-section {
  padding: 26px 8px 8px;
}

.gallery-section h2 {
  margin: 0 0 18px;
  font-size: clamp(2.1rem, 2.8vw, 3.4rem);
  line-height: 1;
  color: #111827;
  letter-spacing: -0.04em;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
}

.gallery-grid img {
  display: block;
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
}

@media (max-width: 900px) {
  .vehicle-main {
    grid-template-columns: 1fr;
  }

  .detail-panel {
    padding-top: 18px;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
  }
}
</style>
