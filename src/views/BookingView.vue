<template>
  <section class="section">
    <div class="container narrow">
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

          <div>
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
import { onMounted } from 'vue'
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
