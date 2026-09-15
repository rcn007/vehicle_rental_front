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
            <div class="history-card-media">
              <img
                :src="booking.image || '/src/assets/hero.png'"
                :alt="booking.vehicleName"
                class="history-image"
              />
              <span class="status" :class="statusClass(booking.status)">
                {{ booking.status }}
              </span>
            </div>

            <div class="history-card-header">
              <div class="history-vehicle-row">
                <div>
                  <h2>{{ booking.vehicleName }}</h2>
                  <p>{{ booking.brand }} · #BK-{{ booking.id }}</p>
                </div>
              </div>
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

<style scoped>
.history-page {
  min-height: 100vh;
  padding: clamp(32px, 5vw, 72px) 0 96px;
  background:
    radial-gradient(circle at 8% 0%, rgba(214, 232, 255, 0.7), transparent 30%),
    #f5f7fa;
}

.history-container {
  width: min(1040px, calc(100% - 40px));
}

.history-title {
  margin-bottom: 28px;
}

.history-title h1 {
  margin-bottom: 8px;
  color: #172033;
  font-size: clamp(30px, 4vw, 44px);
  letter-spacing: -0.03em;
}

.history-title p {
  color: #718096;
}

.history-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-bottom: 36px;
}

.history-summary article {
  min-height: 104px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 24px;
  text-align: left;
  background: rgba(255, 255, 255, 0.84);
  border: 1px solid #e4eaf1;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(31, 49, 74, 0.06);
}

.history-summary strong {
  color: #15243b;
  font-size: 27px;
  line-height: 1;
}

.history-summary span {
  margin-top: 9px;
  color: #758197;
  font-size: 13px;
  font-weight: 700;
}

.timeline {
  display: grid;
  gap: 24px;
}

.history-card {
  position: relative;
  padding-left: 52px;
}

.history-card::before {
  left: 17px;
  top: 28px;
  bottom: -24px;
  width: 2px;
  background: #dce5ef;
}

.history-card:last-child::before {
  display: none;
}

.timeline-dot {
  z-index: 1;
  left: 6px;
  top: 28px;
  width: 24px;
  height: 24px;
  border: 5px solid #f5f7fa;
  box-shadow: 0 0 0 1px #cbd8e6;
}

.history-card-body {
  overflow: hidden;
  padding: 0;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  box-shadow: 0 12px 30px rgba(31, 49, 74, 0.08);
}

.history-card-media {
  position: relative;
  height: clamp(180px, 25vw, 250px);
  background: #eaf0f5;
}

.history-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.history-card-media .status {
  position: absolute;
  top: 18px;
  right: 18px;
  margin: 0;
  padding: 8px 13px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 999px;
  box-shadow: 0 5px 14px rgba(15, 23, 42, 0.1);
  font-size: 12px;
}

.history-card-header {
  margin: 0;
  padding: 22px 26px 18px;
  border-bottom: 1px solid #edf1f5;
}

.history-vehicle-row {
  display: block;
}

.history-card-header h2 {
  margin-bottom: 5px;
  color: #172033;
  font-size: clamp(20px, 2.5vw, 25px);
  letter-spacing: -0.02em;
}

.history-card-header p {
  color: #8490a3;
  font-size: 14px;
  font-weight: 600;
}

.history-details {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 21px 26px 25px;
}

.history-details span {
  display: block;
  margin-bottom: 7px;
  color: #8a96a8;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.history-details strong {
  color: #26344a;
  font-size: 15px;
}

.history-details .amount {
  color: #0f6b4d;
  font-size: 20px;
}

@media (max-width: 700px) {
  .history-container {
    width: min(100% - 28px, 520px);
  }

  .history-summary {
    gap: 8px;
  }

  .history-summary article {
    min-height: 88px;
    padding: 14px 10px;
    text-align: center;
  }

  .history-summary strong {
    font-size: 21px;
  }

  .history-summary span {
    margin-top: 7px;
    font-size: 11px;
  }

  .history-card {
    padding-left: 0;
  }

  .history-card::before,
  .timeline-dot {
    display: none;
  }

  .history-card-media {
    height: clamp(170px, 52vw, 230px);
  }

  .history-card-header {
    padding: 18px 18px 15px;
  }

  .history-details {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 19px 12px;
    padding: 18px;
  }
}

@media (max-width: 390px) {
  .history-page {
    padding-top: 26px;
  }

  .history-title h1 {
    font-size: 30px;
  }

  .history-card-media .status {
    top: 12px;
    right: 12px;
  }
}
</style>
