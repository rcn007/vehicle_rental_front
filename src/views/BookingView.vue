<template>
<<<<<<< HEAD
  <section class="section booking-page">
    <div class="container booking-container">
=======
  <section class="section" :class="{ 'lambo-booking': isLambo }">
    <div class="container narrow" :class="{ 'lambo-container': isLambo }">
>>>>>>> origin/vehicle_rental_front
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

<<<<<<< HEAD
          <div class="booking-vehicle-details">
=======
          <div class="vehicle-meta">
>>>>>>> origin/vehicle_rental_front
            <h2>{{ vehicleStore.vehicle.name }}</h2>

            <div class="booking-vehicle-specs">
              <span>
                <Users :size="18" />
                {{ vehicleStore.vehicle.seats || 5 }} Seats
              </span>
              <span>
                <BriefcaseBusiness :size="18" />
                {{ vehicleStore.vehicle.bags || 3 }} Bags
              </span>
              <span>
                <Fuel :size="18" />
                {{ vehicleStore.vehicle.fuelType || 'Petrol' }}
              </span>
              <span>
                <SlidersHorizontal :size="18" />
                {{ vehicleStore.vehicle.transmission || 'Automatic' }}
              </span>
            </div>

            <p class="booking-vehicle-price">
              <strong>${{ dailyPrice }}</strong> / day
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
<<<<<<< HEAD
import {
  BriefcaseBusiness,
  Fuel,
  SlidersHorizontal,
  Users,
} from '@lucide/vue'
=======
>>>>>>> origin/vehicle_rental_front
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

<<<<<<< HEAD
const dailyPrice = computed(
  () =>
    vehicleStore.vehicle?.pricePerDay ||
    vehicleStore.vehicle?.price ||
    0
=======
const isLambo = computed(
  () => vehicleStore.vehicle?.name === 'Lamborghini Aventador'
>>>>>>> origin/vehicle_rental_front
)

onMounted(() => {
  vehicleStore.fetchVehicle(route.params.vehicleId)
})

async function createBooking(data) {
  try {
    const vehicleId = Number(route.params.vehicleId)

    if (!authStore.isAuthenticated || !Number.isInteger(vehicleId)) {
      throw new Error('Please sign in before booking this vehicle.')
    }

    const booking = await bookingStore.createBooking({
      vehicleId,
      vehicleName: vehicleStore.vehicle.name,
      vehicleImage: vehicleStore.vehicle.image,
      pickupDate: data.pickupDate,
      returnDate: data.returnDate,
      pickupLocation: data.pickupLocation,
      returnLocation: data.returnLocation,
      pickupTime: data.pickupTime,
      returnTime: data.returnTime,
      totalDays: data.totalDays,
      totalPrice: data.totalPrice
    })

    const bookingId = booking?.id || booking?.bookingId

    if (!bookingId) {
      throw new Error('Booking was created without an id.')
    }

    router.push({
      path: `/payment/${bookingId}`,
      query: { amount: booking?.totalPrice || data.totalPrice },
    })
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
