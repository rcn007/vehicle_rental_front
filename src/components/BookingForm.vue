<template>
  <form
    :class="['form-card', { 'lambo-form': isLambo }]"
    @submit.prevent="submitForm"
  >
    <h2>Book Vehicle</h2>

    <div class="form-group">
      <label>Pickup Date</label>
      <input v-model="form.pickupDate" type="date" required />
    </div>

    <div class="form-group">
      <label>Return Date</label>
      <input v-model="form.returnDate" type="date" required />
    </div>

    <div class="booking-summary">
      <span>Total Days</span>
      <strong>{{ totalDays }}</strong>
    </div>

    <div class="booking-summary">
      <span>Total Price</span>
      <strong>${{ totalPrice }}</strong>
    </div>

    <button type="submit" class="btn btn-primary btn-full" :disabled="loading">
      {{ loading ? 'Booking...' : 'Confirm Booking' }}
    </button>
  </form>
</template>

<script setup>
import { computed, reactive } from 'vue'

const props = defineProps({
  vehicle: {
    type: Object,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit'])

const isLambo = computed(() => props.vehicle?.name === 'Lamborghini Aventador')

const form = reactive({
  pickupDate: '',
  returnDate: ''
})

const totalDays = computed(() => {
  if (!form.pickupDate || !form.returnDate) return 0

  const pickup = new Date(form.pickupDate)
  const returnDate = new Date(form.returnDate)

  const diff = (returnDate - pickup) / (1000 * 60 * 60 * 24)

  return diff > 0 ? diff : 0
})

const totalPrice = computed(() => {
  const price = props.vehicle.pricePerDay || props.vehicle.price || 0

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
    totalPrice: totalPrice.value
  })
}
</script>

<style scoped>
.form-card {
  display: flex;
  flex-direction: column;
  gap: 18px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 24px;
  padding: 28px;
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.06);
}

.form-card h2 {
  margin: 0 0 6px;
  font-size: 2rem;
  color: #111827;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 0.88rem;
  font-weight: 600;
  color: #374151;
}

.form-group input {
  border: 1px solid #d1d5db;
  border-radius: 14px;
  background: #f9fafb;
  padding: 13px 14px;
  font-size: 1rem;
  color: #111827;
}

.booking-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f5f5f5;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 14px 16px;
  font-size: 1rem;
  color: #374151;
}

.booking-summary strong {
  color: #111827;
  font-size: 1.2rem;
}

.btn-primary {
  background: linear-gradient(135deg, #111827 0%, #1f2937 100%);
  color: #fff;
  border: none;
  border-radius: 14px;
  padding: 14px 18px;
  font-weight: 700;
  cursor: pointer;
}

.lambo-form {
  background: linear-gradient(
    180deg,
    rgba(33, 18, 9, 0.97),
    rgba(17, 17, 17, 0.98)
  );
  border: 1px solid rgba(255, 147, 63, 0.35);
  box-shadow: 0 24px 48px rgba(255, 120, 25, 0.2);
}

.lambo-form h2 {
  color: #fff;
}

.lambo-form .form-group label {
  color: #f4d7b8;
}

.lambo-form .form-group input {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 170, 90, 0.38);
  color: #fff;
}

.lambo-form .booking-summary {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 170, 90, 0.22);
  color: #f4d7b8;
}

.lambo-form .booking-summary strong {
  color: #fff;
}

.lambo-form .btn-primary {
  background: linear-gradient(135deg, #ff9f43 0%, #ff6b00 100%);
  color: #1b120d;
  box-shadow: 0 12px 24px rgba(255, 112, 44, 0.35);
}

@media (max-width: 768px) {
  .form-card {
    padding: 20px 16px;
  }
}
</style>
