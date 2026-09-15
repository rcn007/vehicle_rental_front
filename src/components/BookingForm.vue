<template>
  <form class="booking-form-card" @submit.prevent="submitForm">
    <h2>Book Vehicle</h2>

    <div class="booking-form-grid">
      <div class="booking-field-stack">
        <label>
          <MapPin :size="18" />
          Pickup Location
        </label>
        <select v-model="form.pickupLocation" required>
          <option
            v-for="location in locations"
            :key="location.name"
            :value="location.name"
          >
            {{ location.name }}
          </option>
        </select>

        <div class="booking-location-card">
          <span>
            <MapPin :size="18" />
          </span>
          <div>
            <strong>{{ pickupLocation.name }}</strong>
            <small>{{ pickupLocation.coordinates }}</small>
          </div>
          <button type="button" @click="openGoogleMap(pickupLocation)">
            Change location
          </button>
        </div>
      </div>

      <div class="booking-field-stack">
        <label>
          <CalendarDays :size="18" />
          Pickup Date
        </label>
        <input v-model="form.pickupDate" type="date" required />
        <small>{{ pickupDateLabel }}</small>

        <label>
          <Clock3 :size="18" />
          Pickup Time
        </label>
        <select v-model="form.pickupTime" required>
          <option v-for="time in times" :key="time" :value="time">
            {{ time }}
          </option>
        </select>
      </div>

      <div class="booking-field-stack">
        <label>
          <MapPin :size="18" />
          Return Location
        </label>
        <select v-model="form.returnLocation" required>
          <option
            v-for="location in locations"
            :key="location.name"
            :value="location.name"
          >
            {{ location.name }}
          </option>
        </select>

        <div class="booking-location-card">
          <span>
            <MapPin :size="18" />
          </span>
          <div>
            <strong>{{ returnLocation.name }}</strong>
            <small>{{ returnLocation.coordinates }}</small>
          </div>
          <button type="button" @click="openGoogleMap(returnLocation)">
            Change location
          </button>
        </div>
      </div>

      <div class="booking-field-stack">
        <label>
          <CalendarDays :size="18" />
          Return Date
        </label>
        <input v-model="form.returnDate" type="date" required />
        <small>{{ returnDateLabel }}</small>

        <label>
          <Clock3 :size="18" />
          Return Time
        </label>
        <select v-model="form.returnTime" required>
          <option v-for="time in times" :key="time" :value="time">
            {{ time }}
          </option>
        </select>
      </div>
    </div>

    <div class="booking-total-panel">
      <div>
        <CalendarCheck :size="22" />
        <span>Total Days</span>
        <strong>{{ totalDays }} {{ totalDays === 1 ? 'Day' : 'Days' }}</strong>
      </div>
      <div>
        <BadgeDollarSign :size="22" />
        <span>Total Price</span>
        <strong>${{ totalPrice }}</strong>
      </div>
      <div>
        <Info :size="22" />
        <span>Price Details</span>
        <button type="button">View breakdown</button>
      </div>
    </div>

    <button
      type="submit"
      class="btn btn-primary btn-full booking-submit-button"
      :disabled="loading"
    >
      {{ loading ? 'Booking...' : 'Confirm Booking' }}
    </button>
  </form>
</template>

<script setup>
import { computed, reactive } from 'vue'
import {
  BadgeDollarSign,
  CalendarCheck,
  CalendarDays,
  Clock3,
  Info,
  MapPin,
} from '@lucide/vue'

const props = defineProps({
  vehicle: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['submit'])

const locations = [
  {
    name: 'DriveEase Central',
    coordinates: '11.6022541, 103.2627481',
  },
  {
    name: 'Airport Pickup Station',
    coordinates: '11.546556, 104.844139',
  },
  {
    name: 'Riverside Branch',
    coordinates: '11.568271, 104.922442',
  },
]

const times = [
  '08:00 AM',
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
]

function addDays(date, days) {
  const nextDate = new Date(date)
  nextDate.setDate(nextDate.getDate() + days)
  return nextDate
}

function toDateInputValue(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const today = new Date()

const form = reactive({
  pickupLocation: locations[0].name,
  returnLocation: locations[0].name,
  pickupDate: toDateInputValue(addDays(today, 1)),
  returnDate: toDateInputValue(addDays(today, 5)),
  pickupTime: '10:00 AM',
  returnTime: '10:00 AM',
})

const pickupLocation = computed(() =>
  locations.find((location) => location.name === form.pickupLocation)
)

const returnLocation = computed(() =>
  locations.find((location) => location.name === form.returnLocation)
)

function formatDate(dateValue) {
  if (!dateValue) return ''

  const date = new Date(`${dateValue}T00:00:00`)

  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
}

const pickupDateLabel = computed(() => formatDate(form.pickupDate))
const returnDateLabel = computed(() => formatDate(form.returnDate))

function openGoogleMap(location) {
  if (!location) return

  const query = encodeURIComponent(
    `${location.name} ${location.coordinates}`
  )

  window.open(
    `https://www.google.com/maps/search/?api=1&query=${query}`,
    '_blank',
    'noopener,noreferrer'
  )
}

const totalDays = computed(() => {
  if (!form.pickupDate || !form.returnDate) return 0

  const pickup = new Date(form.pickupDate)
  const returnDate = new Date(form.returnDate)

  const diff =
    (returnDate - pickup) / (1000 * 60 * 60 * 24)

  return diff > 0 ? diff : 0
})

const totalPrice = computed(() => {
  const price =
    props.vehicle.pricePerDay ||
    props.vehicle.price ||
    0

  return totalDays.value * price
})

function submitForm() {
  if (totalDays.value <= 0) {
    alert('Return date must be after pickup date.')
    return
  }

  emit('submit', {
    pickupDate: form.pickupDate,
    returnDate: form.returnDate,
    pickupLocation: form.pickupLocation,
    returnLocation: form.returnLocation,
    pickupTime: form.pickupTime,
    returnTime: form.returnTime,
    totalDays: totalDays.value,
    totalPrice: totalPrice.value,
  })
}
</script>
