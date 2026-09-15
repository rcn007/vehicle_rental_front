<template>
  <section class="dashboard-page">
    <div class="container">
      <div class="page-header">
        <h1>My Dashboard</h1>
        <p>{{ greeting }}, {{ customerName }}! Here's your rental overview.</p>
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
                  :src="activeBooking.image"
                  :alt="activeBooking.vehicleName"
                />
                <span class="status available">{{ activeBooking.statusLabel }}</span>
              </div>
              <div class="active-rental-details">
                <h2>{{ activeBooking.vehicleName }}</h2>
                <p>{{ activeBooking.returnSummary }}</p>
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
                <tr v-for="booking in pagedBookings" :key="booking.id">
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
<<<<<<< HEAD
                    <RouterLink
                      to="/rental-history"
                      class="btn btn-primary"
                    >
                      View
=======
                    <RouterLink to="/rental-history" class="view-link">
                      View Details
>>>>>>> origin/vehicle_rental_front
                    </RouterLink>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="booking-cards">
              <article
                v-for="booking in displayBookings"
                :key="`mobile-${booking.id}`"
                class="booking-card"
              >
                <div class="booking-card-main">
                  <img :src="booking.image" :alt="booking.vehicleName" />
                  <div class="booking-card-vehicle">
                    <h3>{{ booking.vehicleName }}</h3>
                    <span>#BK-{{ booking.id }}</span>
                  </div>
                  <span
                    class="status"
                    :class="
                      booking.status === 'Confirmed' ? 'confirmed' : 'completed'
                    "
                  >
                    {{ booking.status }}
                  </span>
                </div>

                <div class="booking-card-details">
                  <div>
                    <span>Dates</span>
                    <strong>{{ booking.dateRange }}</strong>
                    <small>{{ booking.totalDays }} days</small>
                  </div>
                  <div>
                    <span>Amount</span>
                    <strong>${{ booking.totalPrice }}</strong>
                  </div>
                </div>

                <RouterLink to="/rental-history" class="booking-card-action">
                  View Details
                </RouterLink>
              </article>
            </div>
          </div>

          <div class="booking-pagination" aria-label="Booking pages">
            <span>Bookings page {{ currentBookingPage }} of {{ totalBookingPages }}</span>
            <div class="booking-page-tabs">
              <template v-for="page in bookingPageButtons" :key="page.key">
                <button
                  v-if="page.type === 'page'"
                  type="button"
                  :aria-label="`Show booking page ${page.value}`"
                  :class="{ active: page.value === currentBookingPage }"
                  @click="currentBookingPage = page.value"
                >
                  {{ page.value }}
                </button>
                <button
                  v-else
                  type="button"
                  class="booking-page-ellipsis"
                  :aria-label="page.direction === 'next' ? 'Show next booking page' : 'Show previous booking page'"
                  @click="changeBookingPage(page.direction)"
                >
                  {{ page.direction === 'next' ? '>>' : '<<' }}
                </button>
              </template>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { CalendarDays, CarFront, Check, DollarSign } from '@lucide/vue'
import { useBookingStore } from '../stores/Booking'
import { useAuthStore } from '../stores/Auth'
import finishedVehicleImage from '../assets/fa2f74c945e7a5848d48ea787650a361.jpg'

const bookingStore = useBookingStore()
const authStore = useAuthStore()
const bookingsPerPage = 3
const currentBookingPage = ref(1)

const customerName = computed(
  () => authStore.user?.name || authStore.user?.username || 'Customer'
)

const greeting = computed(() => {
  const hour = new Date().getHours()

  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
})

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

const totalBookingPages = computed(() =>
  Math.max(1, Math.ceil(displayBookings.value.length / bookingsPerPage))
)

const bookingPageButtons = computed(() => {
  const pageButton = (page) => ({
    key: `page-${page}`,
    type: 'page',
    value: page
  })
  const navButton = (direction) => ({
    key: `nav-${direction}`,
    type: 'nav',
    direction
  })

  if (totalBookingPages.value <= 4) {
    return Array.from({ length: totalBookingPages.value }, (_, index) => pageButton(index + 1))
  }

  if (currentBookingPage.value <= 3) {
    return [pageButton(1), pageButton(2), pageButton(3), navButton('next'), pageButton(totalBookingPages.value)]
  }

  if (currentBookingPage.value >= totalBookingPages.value - 2) {
    return [
      pageButton(1),
      navButton('prev'),
      pageButton(totalBookingPages.value - 2),
      pageButton(totalBookingPages.value - 1),
      pageButton(totalBookingPages.value)
    ]
  }

  return [
    pageButton(1),
    navButton('prev'),
    pageButton(currentBookingPage.value - 1),
    pageButton(currentBookingPage.value),
    pageButton(currentBookingPage.value + 1),
    navButton('next'),
    pageButton(totalBookingPages.value)
  ]
})

function changeBookingPage(direction) {
  const step = direction === 'next' ? 1 : -1
  const nextPage = currentBookingPage.value + step

  currentBookingPage.value = Math.min(Math.max(nextPage, 1), totalBookingPages.value)
}

const pagedBookings = computed(() => {
  const start = (currentBookingPage.value - 1) * bookingsPerPage

  return displayBookings.value.slice(start, start + bookingsPerPage)
})

watch(totalBookingPages, (totalPages) => {
  if (currentBookingPage.value > totalPages) {
    currentBookingPage.value = totalPages
  }
})

const activeBooking = computed(() => ({
  ...(apiBookings.value.find((booking) =>
    ['confirmed', 'active'].includes(String(booking.status).toLowerCase())
  ) || fallbackBookings[0]),
  statusLabel: 'Paid',
  returnSummary: `Returns in ${
    (apiBookings.value.find((booking) =>
      ['confirmed', 'active'].includes(String(booking.status).toLowerCase())
    ) || fallbackBookings[0]).totalDays || 1
  } days (${(
    apiBookings.value.find((booking) =>
      ['confirmed', 'active'].includes(String(booking.status).toLowerCase())
    ) || fallbackBookings[0]
  ).returnDate})`
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
  height: 420px;
  gap: 28px;
  align-items: stretch;
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
  flex: 1;
  min-height: 0;
  overflow: hidden;
  padding: 0 0 14px;
  margin: 0;
  border: 1px solid var(--border);
  border-radius: 10px;
  border-left: 1px solid var(--border);
  box-shadow: none;
}

.active-rental-section {
  display: flex;
  flex-direction: column;
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
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  background: transparent;
  border: 0;
  border-radius: 0;
  box-shadow: none;
}

.bookings-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;

  min-height: 30px;
  padding: 0 0 20px;
}

.bookings-header h2 {
  margin: 0;
  color: var(--primary);
  font-size: 22px;
  font-weight: 700;
}

.booking-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 58px;
  padding-top: 14px;
  color: var(--secondary);
  font-size: 13px;
}

.booking-page-tabs {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.booking-page-tabs button {
  width: 34px;
  height: 34px;
  display: inline-grid;
  place-items: center;
  color: var(--secondary);
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  transition:
    background 0.18s ease,
    border-color 0.18s ease,
    color 0.18s ease;
}

.booking-page-tabs button:hover,
.booking-page-tabs button.active {
  color: #ffffff;
  background: var(--primary);
  border-color: var(--primary);
}

.bookings-panel .table-wrapper {
  width: 100%;
<<<<<<< HEAD
  max-width: 100%;
  flex: 1;
  min-height: 0;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
=======
  min-height: 0;
  overflow-x: auto;
>>>>>>> origin/vehicle_rental_front
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(20, 40, 80, 0.04);
}

.bookings-panel table {
  width: max-content;
  min-width: 100%;
  table-layout: auto;
  border-collapse: separate;
  border-spacing: 0;
}

.bookings-panel th,
.bookings-panel td {
  overflow: hidden;
  white-space: nowrap;
}

.bookings-panel th {
  position: sticky;
  top: 0;
  z-index: 1;
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

.bookings-panel th:nth-child(1),
.bookings-panel td:nth-child(1) {
  width: 25%;
}

.bookings-panel th:nth-child(2),
.bookings-panel td:nth-child(2) {
  width: 24%;
}

.bookings-panel th:nth-child(3),
.bookings-panel td:nth-child(3) {
  width: 22%;
}

.bookings-panel th:nth-child(4),
.bookings-panel td:nth-child(4) {
  width: 11%;
}

.bookings-panel th:nth-child(5),
.bookings-panel td:nth-child(5) {
  width: 10%;
}

.bookings-panel th:nth-child(6),
.bookings-panel td:nth-child(6) {
  width: 8%;
}

.booking-vehicle-cell {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
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
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bookings-panel td:nth-child(2) {
  color: var(--secondary);
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bookings-panel td:nth-child(3) span {
  display: block;
  color: var(--primary);
  font-size: 16px;
  line-height: 1.35;
  overflow: hidden;
  text-overflow: ellipsis;
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

.bookings-panel td:last-child .btn {
  min-height: 34px;
  padding: 7px 12px;
  border-radius: 6px;
  font-size: 13px;
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
<<<<<<< HEAD
  flex: 1;
  min-height: 0;
=======
  min-height: 160px;
>>>>>>> origin/vehicle_rental_front
  display: flex;
  align-items: center;
  justify-content: center;
  color: #60708f;
}

.booking-cards {
  display: none;
}

@media (max-width: 750px) {
  .dashboard-page {
    padding-bottom: 48px;
  }

  .customer-stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    margin-bottom: 28px;
  }

  .customer-stats article {
    min-height: 116px;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 8px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(15, 23, 42, 0.05);
  }

  .customer-stats .stat-icon {
    width: 26px;
    height: 26px;
    margin: 0;
  }

  .customer-stats .stat-icon svg {
    width: 26px;
    height: 26px;
  }

  .customer-stats article > div {
    min-width: 0;
  }

  .customer-stats strong {
    margin-bottom: 4px;
    font-size: 22px;
  }

  .customer-stats span {
    margin: 0;
    font-size: 13px;
    line-height: 1.25;
  }

  .customer-stats small {
    display: none;
  }

  .dashboard-content-grid {
    grid-template-columns: 1fr;
<<<<<<< HEAD
    height: auto;
  }

  .active-rental-section {
    display: block;
  }

  .bookings-panel .table-wrapper {
    flex: none;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .booking-pagination {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
  }

  .booking-page-tabs {
    justify-content: flex-start;
=======
    gap: 28px;
  }

  .bookings-panel {
    width: 100%;
  }

  .bookings-header {
    min-height: 0;
    padding: 0 0 14px;
  }

  .bookings-header h2 {
    font-size: 20px;
  }

  .bookings-header .view-link {
    font-size: 14px;
  }

  .bookings-panel .table-wrapper {
    overflow: visible;
    border: 0;
    background: transparent;
    box-shadow: none;
  }

  .bookings-panel table {
    display: none;
  }

  .booking-cards {
    display: grid;
    gap: 12px;
  }

  .booking-card {
    display: grid;
    gap: 14px;
    padding: 14px;
    background: #ffffff;
    border: 1px solid var(--border);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(20, 40, 80, 0.04);
  }

  .booking-card-main {
    display: grid;
    grid-template-columns: 60px minmax(0, 1fr) auto;
    align-items: center;
    gap: 10px;
  }

  .booking-card-main img {
    width: 60px;
    height: 48px;
    object-fit: cover;
    border-radius: 6px;
    background: #eef2f7;
  }

  .booking-card-vehicle {
    min-width: 0;
  }

  .booking-card-vehicle h3 {
    margin: 0 0 4px;
    color: var(--primary);
    font-size: 15px;
    font-weight: 700;
    line-height: 1.25;
    overflow-wrap: anywhere;
  }

  .booking-card-vehicle span,
  .booking-card-details span,
  .booking-card-details small {
    color: var(--secondary);
    font-size: 12px;
  }

  .booking-card-main .status {
    align-self: start;
    padding: 6px 8px;
    font-size: 11px;
    white-space: nowrap;
  }

  .booking-card-details {
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(80px, 0.8fr);
    gap: 12px;
    padding-top: 12px;
    border-top: 1px solid #eef2f7;
  }

  .booking-card-details div {
    display: grid;
    gap: 3px;
    min-width: 0;
  }

  .booking-card-details strong {
    color: var(--primary);
    font-size: 13px;
    line-height: 1.35;
    overflow-wrap: anywhere;
  }

  .booking-card-details small {
    font-size: 11px;
  }

  .booking-card-action {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    padding: 10px 14px;
    color: #ffffff;
    background: var(--primary);
    border-radius: 6px;
    font-size: 14px;
    font-weight: 700;
  }
}

@media (min-width: 751px) and (max-width: 1100px) {
  .dashboard-content-grid {
    grid-template-columns: minmax(260px, 0.75fr) minmax(0, 1.25fr);
    gap: 18px;
  }

  .bookings-panel th,
  .bookings-panel td {
    padding-right: 14px;
    padding-left: 14px;
  }

  .booking-vehicle-cell {
    min-width: 150px;
    gap: 10px;
  }

  .bookings-panel th {
    font-size: 13px;
  }

  .bookings-panel td,
  .bookings-panel td:nth-child(2),
  .bookings-panel td:nth-child(3) span {
    font-size: 13px;
>>>>>>> origin/vehicle_rental_front
  }
}
</style>
