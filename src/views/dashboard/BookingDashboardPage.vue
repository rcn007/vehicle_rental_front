<script setup>
import { ref } from 'vue'
import BookingDashboard from '../../pages/BookingDashboard.vue'
import Create from '../../components/booking/Create.vue'


const currentPage = ref('bookings')

const handleBookingCreated = (booking) => {
  console.log('Booking created:', booking)

  // Go back to booking dashboard
  currentPage.value = 'bookings'
}
</script>

<template>
  <!-- Booking Dashboard -->
  <BookingDashboard
    v-if="currentPage === 'bookings'"
    @new-booking="currentPage = 'create-booking'"
  />

  <!-- Create Booking -->
  <Create
    v-else-if="currentPage === 'create-booking'"
    @back="currentPage = 'bookings'"
    @cancel="currentPage = 'bookings'"
    @created="handleBookingCreated"
  />
</template>