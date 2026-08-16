<template>
  <form class="form-card" @submit.prevent="submitForm">
    <h2>Book Vehicle</h2>

    <div class="form-group">
      <label>Pickup Date</label>
      <input
        v-model="form.pickupDate"
        type="date"
        required
      />
    </div>

    <div class="form-group">
      <label>Return Date</label>
      <input
        v-model="form.returnDate"
        type="date"
        required
      />
    </div>

    <div class="booking-summary">
      <span>Total Days</span>
      <strong>{{ totalDays }}</strong>
    </div>

    <div class="booking-summary">
      <span>Total Price</span>
      <strong>${{ totalPrice }}</strong>
    </div>

    <button
      type="submit"
      class="btn btn-primary btn-full"
      :disabled="loading"
    >
      {{ loading ? 'Booking...' : 'Confirm Booking' }}
    </button>
  </form>
</template>

<script setup>
import { computed, reactive } from 'vue'

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

const form = reactive({
  pickupDate: '',
  returnDate: '',
})

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
    totalDays: totalDays.value,
    totalPrice: totalPrice.value,
  })
}
</script>