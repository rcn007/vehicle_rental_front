<template>
  <section class="dashboard-page">
    <div class="container">
      <div class="page-header">
        <h1>My Dashboard</h1>
        <p>Good evening, John! Here's your rental overview.</p>
      </div>

      <div class="customer-stats">
        <article v-for="stat in statCards" :key="stat.label">
          <span class="stat-icon">
            <component :is="stat.icon" :size="30" />
          </span>
          <div>
            <strong>{{ stat.value }}</strong>
            <span>{{ stat.label }}</span>
            <small>{{ stat.note }}</small>
          </div>
        </article>
      </div>

      <div class="dashboard-content-grid">
        <section class="active-rental-section">
          <div class="dashboard-section-header">
            <h2>Currently Active</h2>
          </div>

          <div class="active-rental-card">
            <div class="active-rental-info">
              <div class="active-rental-media">
                <img
                  :src="activeBooking.image || '/src/assets/hero.png'"
                  :alt="activeBooking.vehicleName"
                />
                <span class="status available">Rented</span>
              </div>
              <div class="active-rental-details">
                <h2>{{ activeBooking.vehicleName }}</h2>
                <p>Returns in 4 days (Jul 2, 2025)</p>
              </div>
            </div>

            <RouterLink to="/rental-history" class="btn btn-primary">
              View Details
            </RouterLink>
          </div>
        </section>

        <section class="bookings-panel">
          <div class="bookings-header">
            <h2>My Bookings</h2>
            <RouterLink to="/rental-history" class="view-link">
              View All
            </RouterLink>
          </div>

          <div v-if="bookingStore.loading" class="loading">
            Loading bookings...
          </div>

          <div v-else class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Vehicle</th>
                  <th>Booking ID</th>
                  <th>Dates</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="booking in displayBookings" :key="booking.id">
                  <td>
                    <div class="booking-vehicle-cell">
                      <img :src="booking.image" :alt="booking.vehicleName" />
                      <strong>{{ booking.vehicleName }}</strong>
                    </div>
                  </td>
                  <td>#BK-{{ booking.id }}</td>
                  <td>
                    <span>{{ booking.dateRange }}</span>
                    <small>{{ booking.totalDays }} days</small>
                  </td>
                  <td>
                    <strong>${{ booking.totalPrice }}</strong>
                  </td>
                  <td>
                    <span
                      class="status"
                      :class="
                        booking.status === 'Confirmed'
                          ? 'confirmed'
                          : 'completed'
                      "
                    >
                      {{ booking.status }}
                    </span>
                  </td>
                  <td>
                    <RouterLink to="/rental-history" class="view-link">
                      View
                    </RouterLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { CalendarDays, CarFront, Check, DollarSign } from '@lucide/vue'
import { useBookingStore } from '../stores/Booking'
import finishedVehicleImage from '../assets/fa2f74c945e7a5848d48ea787650a361.jpg'

const bookingStore = useBookingStore()

const vehicleImages = {
  'BMW 5 Series':
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80',
  'Rolls Royce Ghost':
    'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=80',
  'Ford F-150':
    'https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=900&q=80'
}

const fallbackBookings = [
  {
    id: '0891',
    vehicleName: 'BMW 5 Series',
    pickupDate: 'Jun 15',
    returnDate: 'Jun 18, 2025',
    dateRange: 'Jun 15-18, 2025',
    totalDays: 3,
    totalPrice: 365,
    status: 'Confirmed',
    image: vehicleImages['BMW 5 Series']
  },
  {
    id: '0842',
    vehicleName: 'Rolls Royce Ghost',
    pickupDate: 'May 10',
    returnDate: 'May 12, 2025',
    dateRange: 'May 10 - 12, 2025',
    totalDays: 2,
    totalPrice: 240,
    status: 'Completed',
    image: vehicleImages['Rolls Royce Ghost']
  },
  {
    id: '0799',
    vehicleName: 'Ford F-150',
    pickupDate: 'Apr 02',
    returnDate: 'Apr 05, 2025',
    dateRange: 'Apr 02 - 05, 2025',
    totalDays: 3,
    totalPrice: 410,
    status: 'Completed',
    image: vehicleImages['Ford F-150']
  }
]

const apiBookings = computed(() =>
  bookingStore.bookings.map((booking) => ({
    id: booking.id,
    vehicleName: booking.vehicleName || 'Vehicle',
    pickupDate: booking.pickupDate || '-',
    returnDate: booking.returnDate || '-',
    dateRange: `${booking.pickupDate || '-'} - ${booking.returnDate || '-'}`,
    totalDays: booking.totalDays || 1,
    totalPrice: booking.totalPrice || 0,
    status: booking.status || 'Confirmed',
    image:
      booking.vehicleImage ||
      booking.image ||
      vehicleImages[booking.vehicleName] ||
      finishedVehicleImage
  }))
)

const displayBookings = computed(() =>
  apiBookings.value.length ? apiBookings.value : fallbackBookings
)

const activeBooking = computed(() => ({
  vehicleName: 'Toyota RAV4 Hybrid',
  pickupDate: 'Jun 1',
  returnDate: 'Jun 5, 2025',
  image: finishedVehicleImage
}))

const statCards = computed(() => [
  {
    icon: CalendarDays,
    value: dashboardStats.value.upcoming,
    label: 'Upcoming Rental',
    note: 'Next: Jun 15'
  },
  {
    icon: CarFront,
    value: dashboardStats.value.active,
    label: 'Active Rental',
    note: 'BMW 5 Series'
  },
  {
    icon: Check,
    value: dashboardStats.value.completed,
    label: 'Completed',
    note: 'All time'
  },
  {
    icon: DollarSign,
    value: `$${dashboardStats.value.spending}`,
    label: 'Total Spending',
    note: 'This year'
  }
])

const dashboardStats = computed(() => {
  if (!apiBookings.value.length) {
    return {
      upcoming: 2,
      active: 1,
      completed: 14,
      spending: '2,840'
    }
  }

  const active = apiBookings.value.filter((booking) =>
    String(booking.status).toLowerCase().includes('active')
  ).length
  const completed = apiBookings.value.filter((booking) =>
    String(booking.status).toLowerCase().includes('complete')
  ).length
  const upcoming = apiBookings.value.filter((booking) =>
    String(booking.status).toLowerCase().includes('confirm')
  ).length
  const spending = apiBookings.value.reduce(
    (sum, booking) => sum + Number(booking.totalPrice || 0),
    0
  )

  return {
    upcoming,
    active,
    completed,
    spending: spending.toLocaleString()
  }
})

onMounted(() => {
  bookingStore.fetchBookings()
})
</script>

<style scoped>
.dashboard-content-grid {
  display: grid;
  grid-template-columns: minmax(360px, 0.8fr) minmax(0, 1.7fr);
  gap: 28px;
  align-items: start;
}

.dashboard-section-header {
  min-height: 30px;
  margin-bottom: 16px;
}

.dashboard-section-header h2 {
  font-size: 22px;
  line-height: 1.2;
}

.active-rental-card {
  display: block;
  overflow: hidden;
  padding: 0 0 14px;
  margin: 0;
  border: 1px solid var(--border);
  border-radius: 10px;
  border-left: 1px solid var(--border);
  box-shadow: none;
}

.active-rental-info {
  display: block;
}

.active-rental-media {
  position: relative;
}

.active-rental-media img {
  width: 100%;
  height: 233px;
  object-fit: cover;
  border-radius: 0;
}

.active-rental-media .status {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 3px 8px;
  color: var(--primary);
  background: #e2e8f0;
  border-radius: 999px;
  font-size: 10px;
  line-height: 1;
}

.active-rental-details {
  padding: 28px 30px 26px;
}

.active-rental-card h2 {
  margin: 0 0 8px;
  font-size: 28px;
}

.active-rental-card p {
  font-size: 16px;
}

.active-rental-card > .btn {
  width: calc(100% - 60px);
  min-height: 58px;
  margin: 0 30px;
  padding: 12px;
  font-size: 18px;
}

.bookings-panel {
  min-width: 0;
  background: transparent;
  border: 0;
  border-radius: 0;
  box-shadow: none;
}

.bookings-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  min-height: 30px;
  padding: 0 0 20px;
}

.bookings-header h2 {
  margin: 0;
  color: var(--primary);
  font-size: 22px;
  font-weight: 700;
}

.bookings-header .view-link {
  color: var(--primary);
  font-size: 16px;
  font-weight: 500;
}

.bookings-panel .table-wrapper {
  width: 100%;
  min-height: 452px;
  overflow-x: auto;
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(20, 40, 80, 0.04);
}

.bookings-panel table {
  width: 100%;
  min-width: 700px;
  border-collapse: separate;
  border-spacing: 0;
}

.bookings-panel th {
  height: 88px;
  padding: 0 28px;
  color: var(--secondary);
  background: #ffffff;
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  border-bottom: 1px solid var(--border);
}

.bookings-panel td {
  height: 84px;
  padding: 14px 28px;
  color: var(--primary);
  font-size: 15px;
  font-weight: 400;
  vertical-align: middle;
  border-bottom: 1px solid var(--border);
}

.bookings-panel tbody tr:last-child td {
  border-bottom: none;
}

.booking-vehicle-cell {
  display: flex;
  align-items: center;
  gap: 18px;
  min-width: 210px;
}

.booking-vehicle-cell img {
  flex-shrink: 0;
  width: 56px;
  height: 38px;
  object-fit: cover;
  border-radius: 4px;
}

.booking-vehicle-cell strong {
  color: var(--primary);
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;
}

.bookings-panel td:nth-child(2) {
  color: var(--secondary);
  font-size: 16px;
}

.bookings-panel td:nth-child(3) span {
  display: block;
  color: var(--primary);
  font-size: 16px;
  line-height: 1.35;
}

.bookings-panel td:nth-child(3) small {
  display: block;
  margin-top: 4px;
  color: #71819b;
  font-size: 14px;
}

.bookings-panel td:nth-child(4) strong {
  color: var(--primary);
  font-size: 16px;
  font-weight: 600;
}

.bookings-panel .status {
  display: inline-flex;
  align-items: center;
  padding: 7px 12px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
}

.bookings-panel .status.confirmed {
  color: #047857;
  background: #d1fae5;
}

.bookings-panel .status.completed {
  color: var(--secondary);
  background: #f1f5f9;
}

.bookings-panel td:last-child {
  text-align: center;
}

.bookings-panel td:last-child .view-link {
  color: var(--primary);
  font-size: 15px;
  font-weight: 500;
}

.bookings-panel tbody tr {
  transition: background 0.15s ease;
}

.bookings-panel tbody tr:hover {
  background: #fafcff;
}

.bookings-panel .loading {
  min-height: 452px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #60708f;
}

@media (max-width: 750px) {
  .dashboard-content-grid {
    grid-template-columns: 1fr;
  }
}
</style>
