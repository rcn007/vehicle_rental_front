<template>
  <section class="section booking-page">
    <div class="container booking-container">
      <div class="page-header">
        <p class="section-label">BOOKING</p>
        <h1>Book Your Vehicle</h1>
      </div>

      <div v-if="vehicleStore.loading" class="loading">Loading...</div>

      <div v-else-if="vehicleStore.vehicle">
        <div class="booking-vehicle">
          <img
            :src="vehicleStore.vehicle.image || heroImage"
            :alt="vehicleStore.vehicle.name"
          />

          <div class="booking-vehicle-details">
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
import {
  BriefcaseBusiness,
  Fuel,
  SlidersHorizontal,
  Users,
} from '@lucide/vue'
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

const dailyPrice = computed(
  () =>
    vehicleStore.vehicle?.pricePerDay ||
    vehicleStore.vehicle?.price ||
    0
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
