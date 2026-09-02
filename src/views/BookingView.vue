<template>
  <section class="section" :class="{ 'lambo-booking': isLambo }">
    <div class="container narrow" :class="{ 'lambo-container': isLambo }">
      <div class="page-header">
        <p class="section-label">BOOKING</p>
        <h1>Book Your Vehicle</h1>
      </div>

      <div v-if="vehicleStore.loading" class="loading">Loading...</div>

      <div
        v-else-if="vehicleStore.vehicle"
        :class="['booking-shell', { 'lambo-shell': isLambo }]"
      >
        <div :class="['booking-vehicle', { 'lambo-vehicle': isLambo }]">
          <img
            :src="vehicleStore.vehicle.image || heroImage"
            :alt="vehicleStore.vehicle.name"
          />

          <div class="vehicle-meta">
            <h2>{{ vehicleStore.vehicle.name }}</h2>
            <p>
              ${{
                vehicleStore.vehicle.pricePerDay ||
                vehicleStore.vehicle.price ||
                0
              }}
              / day
            </p>
          </div>
        </div>

        <BookingForm
          :vehicle="vehicleStore.vehicle"
          :loading="bookingStore.loading"
          @submit="createBooking"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useVehicleStore } from '../stores/Vehicle'
import { useBookingStore } from '../stores/Booking'
import { useAuthStore } from '../stores/Auth'
import BookingForm from '../components/BookingForm.vue'
import heroImage from '../assets/hero.png'

const route = useRoute()
const router = useRouter()

const vehicleStore = useVehicleStore()
const bookingStore = useBookingStore()
const authStore = useAuthStore()

const isLambo = computed(
  () => vehicleStore.vehicle?.name === 'Lamborghini Aventador'
)

onMounted(() => {
  vehicleStore.fetchVehicle(route.params.vehicleId)
})

async function createBooking(data) {
  try {
    const userId = authStore.user?.id
    const vehicleId = Number(route.params.vehicleId)

    if (!userId || !Number.isInteger(vehicleId)) {
      throw new Error('A valid user and vehicle are required to book.')
    }

    const booking = await bookingStore.createBooking({
      userId,
      vehicleId,
      pickupDate: data.pickupDate,
      returnDate: data.returnDate
    })

    const bookingId = booking?.id || booking?.bookingId

    if (!bookingId) {
      throw new Error('Booking was created without an id.')
    }

    router.push(`/payment/${bookingId}`)
  } catch (error) {
    alert(
      error.response?.data?.message ||
        error.message ||
        'Failed to create booking'
    )
  }
}
</script>

<style scoped>
.lambo-booking {
  background:
    radial-gradient(
      circle at top left,
      rgba(255, 145, 32, 0.2),
      transparent 32%
    ),
    linear-gradient(135deg, #120d0a 0%, #1f1a17 100%);
}

.lambo-container {
  max-width: 1200px;
}

.booking-shell {
  display: grid;
  gap: 24px;
}

.lambo-shell {
  grid-template-columns: 1.2fr 0.9fr;
  align-items: stretch;
}

.booking-vehicle {
  display: flex;
  align-items: center;
  gap: 18px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 26px;
  padding: 18px;
}

.lambo-vehicle {
  background: linear-gradient(
    180deg,
    rgba(255, 123, 0, 0.18),
    rgba(0, 0, 0, 0.1)
  );
  border-color: rgba(255, 162, 76, 0.45);
  box-shadow: 0 18px 40px rgba(255, 125, 32, 0.18);
}

.booking-vehicle img {
  width: 200px;
  height: 120px;
  object-fit: cover;
  border-radius: 18px;
}

.vehicle-meta h2 {
  margin: 0;
  font-size: clamp(1.5rem, 2vw, 2.2rem);
  color: #fff;
}

.vehicle-meta p {
  margin: 8px 0 0;
  color: #ffbf7a;
  font-size: 1.15rem;
  font-weight: 700;
}

@media (max-width: 768px) {
  .lambo-shell {
    grid-template-columns: 1fr;
  }

  .booking-vehicle {
    flex-direction: column;
    text-align: center;
  }
}
</style>
