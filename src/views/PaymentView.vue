<template>
  <section class="section">
    <div class="container narrow">
      <div class="page-header">
        <p class="section-label">PAYMENT</p>
        <h1>Complete Payment</h1>
      </div>

      <form class="form-card" @submit.prevent="pay">
        <div class="form-group">
          <label>Payment Method</label>

          <select v-model="paymentMethodId" required>
            <option value="">Select payment method</option>

            <option
              v-for="method in paymentStore.paymentMethods"
              :key="method.id"
              :value="method.id"
            >
              {{ method.methodName }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Amount</label>
          <input
            v-model.number="amount"
            type="number"
            min="0"
            required
          />
        </div>

        <button
          class="btn btn-primary btn-full"
          :disabled="paymentStore.loading"
        >
          {{ paymentStore.loading ? 'Processing...' : 'Pay Now' }}
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePaymentStore } from '../stores/Payment'

const route = useRoute()
const router = useRouter()

const paymentStore = usePaymentStore()

const paymentMethodId = ref('')
const amount = ref(0)

onMounted(() => {
  paymentStore.fetchPaymentMethods()
})

async function pay() {
  try {
    await paymentStore.createPayment({
      bookingId: Number(route.params.bookingId),
      paymentMethodId: Number(paymentMethodId.value),
      amount: amount.value,
    })

    alert('Payment created successfully!')
    router.push('/my-bookings')
  } catch (error) {
    alert(
      error.response?.data?.message ||
        'Payment failed',
    )
  }
}
</script>