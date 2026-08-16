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

      <div class="active-rental-card">
        <div class="active-rental-info">
          <img
            :src="activeBooking.image || '/src/assets/hero.png'"
            :alt="activeBooking.vehicleName"
          />
          <div>
            <span class="status available">Currently Active</span>
            <h2>{{ activeBooking.vehicleName }}</h2>
            <p>{{ activeBooking.pickupDate }} - {{ activeBooking.returnDate }} · Returns in 4 days</p>
          </div>
        </div>

        <RouterLink to="/rental-history" class="btn btn-soft-success">
          View Details
        </RouterLink>
      </div>

      <section class="bookings-panel">
        <div class="bookings-header">
          <h2>My Bookings</h2>
          <RouterLink to="/rental-history" class="view-link">
            View history →
          </RouterLink>
        </div>

        <div v-if="bookingStore.loading" class="loading">
          Loading bookings...
        </div>

        <div v-else class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Vehicle</th>
                <th>Date</th>
                <th>Duration</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="booking in displayBookings" :key="booking.id">
                <td>#BK-{{ booking.id }}</td>
                <td>
                  <div class="booking-vehicle-cell">
                    <img
                      :src="booking.image || '/src/assets/hero.png'"
                      :alt="booking.vehicleName"
                    />
                    <strong>{{ booking.vehicleName }}</strong>
                  </div>
                </td>
                <td>{{ booking.dateRange }}</td>
                <td>{{ booking.totalDays }} days</td>
                <td><strong>${{ booking.totalPrice }}</strong></td>
                <td>
                  <span class="status confirmed">
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
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { CalendarDays, CarFront, Check, DollarSign } from '@lucide/vue'
import { useBookingStore } from '../stores/Booking'

const bookingStore = useBookingStore()

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
    image:
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=200&q=80',
  },
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
    image: booking.vehicleImage || booking.image || '/src/assets/hero.png',
  })),
)

const displayBookings = computed(() =>
  apiBookings.value.length ? apiBookings.value : fallbackBookings,
)

const activeBooking = computed(() => ({
  vehicleName: 'Toyota RAV4 Hybrid',
  pickupDate: 'Jun 1',
  returnDate: 'Jun 5, 2025',
  image:
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=200&q=80',
}))

const statCards = computed(() => [
  {
    icon: CalendarDays,
    value: dashboardStats.value.upcoming,
    label: 'Upcoming Rental',
    note: 'Next: Jun 15',
  },
  {
    icon: CarFront,
    value: dashboardStats.value.active,
    label: 'Active Rental',
    note: 'BMW 5 Series',
  },
  {
    icon: Check,
    value: dashboardStats.value.completed,
    label: 'Completed',
    note: 'All time',
  },
  {
    icon: DollarSign,
    value: `$${dashboardStats.value.spending}`,
    label: 'Total Spending',
    note: 'This year',
  },
])

const dashboardStats = computed(() => {
  if (!apiBookings.value.length) {
    return {
      upcoming: 2,
      active: 1,
      completed: 14,
      spending: '2,840',
    }
  }

  const active = apiBookings.value.filter((booking) =>
    String(booking.status).toLowerCase().includes('active'),
  ).length
  const completed = apiBookings.value.filter((booking) =>
    String(booking.status).toLowerCase().includes('complete'),
  ).length
  const upcoming = apiBookings.value.filter((booking) =>
    String(booking.status).toLowerCase().includes('confirm'),
  ).length
  const spending = apiBookings.value.reduce(
    (sum, booking) => sum + Number(booking.totalPrice || 0),
    0,
  )

  return {
    upcoming,
    active,
    completed,
    spending: spending.toLocaleString(),
  }
})

onMounted(() => {
  bookingStore.fetchBookings()
})
</script>
