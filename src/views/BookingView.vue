<template>
  <section class="section">
    <div class="container narrow">
      <div class="page-header">
        <p class="section-label">BOOKING</p>
        <h1>Book Your Vehicle</h1>
      </div>

      <div v-if="vehicleStore.loading" class="loading">
        Loading...
      </div>

      <div v-else-if="vehicleStore.vehicle">
        <div class="booking-vehicle">
          <img
            :src="
              vehicleStore.vehicle.image ||
              '/src/assets/hero.png'
            "
            :alt="vehicleStore.vehicle.name"
          />

          <div>
            <h2>{{ vehicleStore.vehicle.name }}</h2>
            <p>
              ${{ vehicleStore.vehicle.pricePerDay ||
                vehicleStore.vehicle.price || 0 }}
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
import { useVehicleStore } from '../stores/vehicle'
import { useBookingStore } from '../stores/booking'
import BookingForm from '../components/BookingForm.vue'

const route = useRoute()
const router = useRouter()

const vehicleStore = useVehicleStore()
const bookingStore = useBookingStore()

onMounted(() => {
  vehicleStore.fetchVehicle(route.params.vehicleId)
})

async function createBooking(data) {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}')

    const booking = await bookingStore.createBooking({
      userId: user.id,
      vehicleId: Number(route.params.vehicleId),
      pickupDate: data.pickupDate,
      returnDate: data.returnDate,
    })

    router.push(`/payment/${booking.id}`)
  } catch (error) {
    alert(
      error.response?.data?.message ||
        'Failed to create booking',
    )
  }
}
</script>