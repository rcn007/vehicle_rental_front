<template>
  <section class="section">
    <div class="container narrow">
      <div class="page-header">
        <p class="section-label">PAYMENT</p>
        <h1>Complete Payment</h1>
      </div>

      <div class="payment-layout">
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

        <aside class="bakong-card">
          <div class="bakong-header">
            <span>Bakong</span>
            <strong>KHQR</strong>
          </div>

          <div class="bakong-amount">
            <span>DriveEase Rental</span>
            <strong>USD {{ formattedAmount }}</strong>
          </div>

          <div class="bakong-qr" aria-label="Bakong QR code preview">
            <span
              v-for="index in qrBlocks"
              :key="index"
              :class="{ active: activeQrBlocks.includes(index) }"
            ></span>
          </div>

          <div class="bakong-reference">
            <span>Booking</span>
            <strong>#BK-{{ route.params.bookingId }}</strong>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePaymentStore } from '../stores/Payment'

const route = useRoute()
const router = useRouter()

const paymentStore = usePaymentStore()

const paymentMethodId = ref('')
const amount = ref(0)
const qrBlocks = Array.from({ length: 121 }, (_, index) => index)
const activeQrBlocks = [
  0, 1, 2, 3, 4, 5, 6, 11, 12, 17, 19, 20, 22, 23, 27, 28, 33, 34, 38, 39,
  44, 45, 49, 50, 55, 56, 57, 58, 59, 60, 61, 66, 68, 69, 71, 73, 76, 78, 82,
  84, 86, 88, 90, 94, 95, 98, 100, 102, 104, 105, 110, 111, 112, 113, 114,
  115, 116, 120,
]

const formattedAmount = computed(() => Number(amount.value || 0).toFixed(2))

onMounted(async () => {
  const methods = await paymentStore.fetchPaymentMethods()
  const bakongMethod = methods.find((method) =>
    String(method.methodName || '').toLowerCase().includes('bakong')
  )

  paymentMethodId.value = bakongMethod?.id || methods[0]?.id || ''
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
