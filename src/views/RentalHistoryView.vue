<template>
  <section class="history-page">
    <div class="container history-container">
      <div class="page-header history-title">
        <h1>Rental History</h1>
        <p>A complete record of all your past rentals.</p>
      </div>

      <div class="history-summary">
        <article>
          <strong>{{ summary.totalRentals }}</strong>
          <span>Total Rentals</span>
        </article>
        <article>
          <strong>${{ summary.totalSpent }}</strong>
          <span>Total Spent</span>
        </article>
        <article>
          <strong>{{ summary.totalDays }}</strong>
          <span>Total Days</span>
        </article>
      </div>

      <div v-if="bookingStore.loading" class="loading">
        Loading rental history...
      </div>

      <div v-else class="timeline">
        <article
          v-for="booking in displayBookings"
          :key="booking.id"
          class="history-card"
        >
          <div class="timeline-dot" :class="statusClass(booking.status)"></div>

          <div class="history-card-body">
            <div class="history-card-header">
              <div class="history-vehicle-row">
                <img
                  :src="booking.image || '/src/assets/hero.png'"
                  :alt="booking.vehicleName"
                  class="history-thumb"
                />

                <div>
                  <h2>{{ booking.vehicleName }}</h2>
                  <p>{{ booking.brand }} · #BK-{{ booking.id }}</p>
                </div>
              </div>

              <span class="status" :class="statusClass(booking.status)">
                {{ booking.status }}
              </span>
            </div>

            <div class="history-details">
              <div>
                <span>Rental Date</span>
                <strong>{{ booking.pickupDate }}</strong>
              </div>
              <div>
                <span>Return Date</span>
                <strong>{{ booking.returnDate }}</strong>
              </div>
              <div>
                <span>Payment</span>
                <strong>{{ booking.paymentMethod }}</strong>
              </div>
              <div>
                <span>Total Amount</span>
                <strong class="amount">${{ booking.totalPrice }}</strong>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useBookingStore } from '../stores/Booking'
import audiA4Image from '../assets/Audi A4 Premium.jpg'
import toyotaRav4Image from '../assets/Toyota RAV4 Hybrid.jpg'

const bookingStore = useBookingStore()

const fallbackBookings = [
  {
    id: '0845',
    vehicleName: 'Toyota RAV4 Hybrid',
    brand: 'Toyota',
    pickupDate: 'Jun 1, 2025',
    returnDate: 'Jun 5, 2025',
    paymentMethod: 'Credit Card',
    totalPrice: 345,
    totalDays: 5,
    status: 'Active',
    image: toyotaRav4Image
  },
  {
    id: '0812',
    vehicleName: 'Audi A4 Premium',
    brand: 'Audi',
    pickupDate: 'May 20, 2025',
    returnDate: 'May 23, 2025',
    paymentMethod: 'ABA KHQR',
    totalPrice: 290,
    totalDays: 3,
    status: 'Completed',
    image: audiA4Image
  }
]

const apiBookings = computed(() =>
  bookingStore.bookings.map((booking) => ({
    id: booking.id,
    vehicleName: booking.vehicleName || 'Vehicle Rental',
    brand: booking.brand || booking.vehicleBrand || 'Vehicle',
    pickupDate: booking.pickupDate || '-',
    returnDate: booking.returnDate || '-',
    paymentMethod: booking.paymentMethod || 'Card',
    totalPrice: booking.totalPrice || 0,
    totalDays: booking.totalDays || 0,
    status: booking.status || 'Completed',
    image: booking.vehicleImage || booking.image || '/src/assets/hero.png'
  }))
)

const displayBookings = computed(() =>
  apiBookings.value.length ? apiBookings.value : fallbackBookings
)

const summary = computed(() => {
  if (!apiBookings.value.length) {
    return {
      totalRentals: 14,
      totalSpent: '2,840',
      totalDays: 38
    }
  }

  const totalSpent = apiBookings.value.reduce(
    (sum, booking) => sum + Number(booking.totalPrice || 0),
    0
  )

  const totalDays = apiBookings.value.reduce(
    (sum, booking) => sum + Number(booking.totalDays || 0),
    0
  )

  return {
    totalRentals: apiBookings.value.length,
    totalSpent: totalSpent.toLocaleString(),
    totalDays
  }
})

function statusClass(status) {
  return String(status).toLowerCase().includes('active')
    ? 'active'
    : 'completed'
}

onMounted(() => {
  bookingStore.fetchBookings()
})
</script>
