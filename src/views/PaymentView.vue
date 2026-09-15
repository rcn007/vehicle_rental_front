<template>
  <section class="section payment-page">
    <div class="container payment-container">
      <div class="page-header">
        <p class="section-label">BOOKING</p>
        <h1>Complete Your Payment</h1>
        <p>Please complete the payment to confirm your booking</p>
      </div>

      <!-- <div class="payment-booking-card">
        <img :src="bookingSummary.image" :alt="bookingSummary.vehicleName" />

        <div class="payment-booking-main">
          <h2>{{ bookingSummary.vehicleName }}</h2>
          <div class="payment-trip-row">
            <div>
              <CalendarDays :size="18" />
              <span>Pickup</span>
              <strong>{{ bookingSummary.pickupDate }}</strong>
              <small>{{ bookingSummary.pickupTime }}</small>
            </div>

            <ArrowRight :size="20" class="payment-trip-arrow" />

            <div>
              <CalendarDays :size="18" />
              <span>Return</span>
              <strong>{{ bookingSummary.returnDate }}</strong>
              <small>{{ bookingSummary.returnTime }}</small>
            </div>

            <div class="payment-location">
              <span>Pickup & Return Location</span>
              <strong>
                <MapPin :size="18" />
                {{ bookingSummary.location }}
              </strong>
            </div>
          </div>
        </div>
      </div> -->

      <section class="payment-method-card">
        <h2>Choose Payment Method</h2>
        <p>Select your preferred payment method to proceed</p>

        <div class="payment-method-options">
          <button
            type="button"
            :class="{ active: selectedMethod === 'qr' }"
            :disabled="paymentCompleted"
            @click="selectPaymentMethod('qr')"
          >
            <span class="method-icon qr">
              <QrCode :size="26" />
            </span>
            <span>
              <strong>Bakong KHQR</strong>
              <small>Scan and pay with Bakong</small>
            </span>
            <CircleCheck :size="23" class="method-check" />
          </button>

          <button
            type="button"
            :class="{ active: selectedMethod === 'cash' }"
            :disabled="paymentCompleted"
            @click="selectPaymentMethod('cash')"
          >
            <span class="method-icon cash" aria-hidden="true">
              <span class="cash-logo-mark">
                <span class="cash-logo-note"></span>
                <span class="cash-logo-coin"></span>
              </span>
            </span>
            <span>
              <strong>Cash Payment</strong>
              <small>Pay at our office</small>
            </span>
            <CircleCheck :size="23" class="method-check" />
          </button>
        </div>
      </section>

      <section v-if="selectedMethod === 'qr'" class="scan-pay-card">
        <div class="bank-panel">
          <div class="payment-panel-heading">
            <span class="payment-panel-icon bank">
              <Landmark :size="26" />
            </span>
            <div>
              <h2>Select Your Bank</h2>
              <p>Choose the banking app you will use to scan KHQR</p>
            </div>
          </div>

          <div class="bank-list">
            <button
              v-for="bank in banks"
              :key="bank.name"
              type="button"
              :class="{ active: selectedBankKey === bank.key }"
              :disabled="paymentCompleted"
              @click="selectBank(bank.key)"
            >
              <span class="bank-logo">
                <img :src="bank.logo" :alt="`${bank.name} logo`" />
              </span>
              <strong>{{ bank.name }}</strong>
              <ChevronRight :size="20" />
            </button>
          </div>

          <div class="how-pay-card">
            <div class="quick-steps-title">
              <Info :size="18" />
              <strong>Quick Steps</strong>
            </div>

            <div class="quick-steps-list">
              <div>
                <Smartphone :size="20" />
                <span>Open your banking app</span>
              </div>
              <div>
                <ScanLine :size="20" />
                <span>Scan the Bakong KHQR code</span>
              </div>
              <div>
                <CircleCheck :size="20" />
                <span>Confirm the payment in your app</span>
              </div>
            </div>
          </div>
        </div>

        <div class="scan-pay-panel">
          <div class="payment-panel-heading">
            <span class="payment-panel-icon scan">
              <ScanQrCode :size="25" />
            </span>
            <div>
              <h2>Bakong KHQR Payment</h2>
              <p>Scan the KHQR code using Bakong or any supported banking app</p>
            </div>
          </div>

          <div class="qr-payment-box">
            <div class="qr-total-amount">
              <span>Total Amount</span>
              <strong>{{ formattedAmount }} <small>USD</small></strong>
            </div>

            <div class="qr-display-card bakong">
              <img
                v-if="activeQrImage"
                class="bank-qr-image"
                :src="activeQrImage"
                :alt="`Bakong KHQR code for ${selectedBank.name}`"
              />
              <div v-else class="qr-generating-state">
                {{ loadingPaymentDetails ? 'Loading payment details...' : 'Generating Bakong KHQR...' }}
              </div>
            </div>

            <div class="payment-booking-id">
              <FileText :size="17" />
              <span>Booking ID:</span>
              <strong>{{ bookingCode }}</strong>
              <button type="button" aria-label="Copy booking ID" @click="copyBookingId">
                <Copy :size="18" />
              </button>
              <small v-if="bookingIdCopied">Copied</small>
            </div>

            <div class="qr-status-row">
              <div class="payment-expire" :class="{ expired: isQrExpired }">
                <Clock3 :size="18" />
                {{ isQrExpired ? 'QR Code expired' : `QR Code expires in ${qrTimeLeft}` }}
              </div>
            </div>

            <button
              v-if="isQrExpired"
              class="qr-refresh-button"
              type="button"
              @click="initializeBakongPayment"
            >
              Generate New QR
            </button>

            <div v-if="paymentError" class="payment-error-card">
              {{ paymentError }}
            </div>
          </div>
        </div>
      </section>

      <section v-else class="cash-payment-card">
        <Banknote :size="34" />
        <div>
          <h2>Cash Payment Selected</h2>
          <p>Please pay USD {{ formattedAmount }} at our office when you pick up the vehicle.</p>
        </div>
      </section>

      <!-- <section class="secure-payment-card">
        <ShieldCheck :size="32" />
        <div>
          <strong>Secure Payment</strong>
          <p>Your payment information is safe and encrypted. We never store your bank details.</p>
        </div>
      </section> -->

      <p class="payment-terms">
        <LockKeyhole :size="17" />
        By completing this payment, you agree to our
        <a href="#">Terms & Conditions</a>
        and
        <a href="#">Cancellation Policy</a>
      </p>

      <div v-if="selectedMethod === 'cash' && !paymentCompleted" class="payment-actions">
        <!-- <RouterLink :to="backToBookingLink">
          <ArrowLeft :size="18" />
          Back to Booking
        </RouterLink> -->

        <button class="btn btn-primary" :disabled="paymentStore.loading" @click="pay">
          {{ paymentStore.loading ? 'Processing...' : 'Confirm Payment' }}
        </button>
      </div>
    </div>

    <div v-if="showSuccessModal" class="payment-success-overlay" role="dialog" aria-modal="true">
      <div class="payment-success-modal">
        <div class="payment-success-visual" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <div class="payment-success-icon">
            <Check :size="44" />
          </div>
        </div>

        <h2>Payment Successful!</h2>
        <p>Your payment has been received and your booking is confirmed.</p>

        <div class="payment-success-details">
          <div>
            <span>
              <FileText :size="15" />
              Booking ID
            </span>
            <strong>{{ bookingCode }}</strong>
          </div>
          <div>
            <span>
              <CircleDollarSign :size="15" />
              Amount Paid
            </span>
            <strong>${{ formattedAmount }}</strong>
          </div>
          <div>
            <span>
              <CreditCard :size="15" />
              Payment Method
            </span>
            <strong class="payment-success-method">
              <img
                v-if="selectedMethod === 'qr'"
                :src="successBank.logo"
                :alt="`${successBank.name} logo`"
              />
              <span v-else class="payment-success-cash-logo" aria-hidden="true">
                <span class="cash-logo-mark small">
                  <span class="cash-logo-note"></span>
                  <span class="cash-logo-coin"></span>
                </span>
              </span>
              {{ paymentMethodLabel }}
            </strong>
          </div>
        </div>

        <small>A confirmation email has been sent to your email.</small>

        <button class="btn btn-primary btn-full" type="button" @click="router.push('/my-bookings')">
          View My Booking
        </button>
        <button class="payment-success-link" type="button" @click="router.push('/')">
          Back to Home
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import QRCode from 'qrcode'
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  CalendarDays,
  Check,
  ChevronRight,
  CircleDollarSign,
  CircleCheck,
  Clock3,
  Copy,
  CreditCard,
  FileText,
  Info,
  Landmark,
  LockKeyhole,
  MapPin,
  QrCode,
  ScanQrCode,
  ScanLine,
  Smartphone,
} from '@lucide/vue'
import { useBookingStore } from '../stores/Booking'
import { usePaymentStore } from '../stores/Payment'
import heroImage from '../assets/hero.png'
import abaLogo from '../assets/ABA.webp'
import acledaLogo from '../assets/ACELEDA.jpg'
import bakongLogo from '../assets/Bakong.png'

const route = useRoute()
const router = useRouter()

const bookingStore = useBookingStore()
const paymentStore = usePaymentStore()

const amount = ref(0)
const paymentMethodId = ref('')
const selectedMethod = ref('qr')
const showSuccessModal = ref(false)
const paymentCompleted = ref(false)
const bookingIdCopied = ref(false)
const qrSecondsLeft = ref(585)
const bakongQrImage = ref('')
const bakongReference = ref('')
const paymentStatus = ref('waiting')
const paymentError = ref('')
const completedBankKey = ref('')
const loadingPaymentDetails = ref(true)
let qrTimer = null
let copiedTimer = null
let paymentPoller = null
let paymentAudioContext = null

const selectedBankKey = ref('bakong')

const banks = [
  {
    key: 'bakong',
    name: 'Bakong',
    className: 'bakong',
    logo: bakongLogo,
  },
  {
    key: 'aba',
    name: 'ABA Bank',
    className: 'aba',
    logo: abaLogo,
  },
  {
    key: 'acleda',
    name: 'ACLEDA Bank',
    className: 'acleda',
    logo: acledaLogo,
  },
]

const selectedBank = computed(
  () => banks.find((bank) => bank.key === selectedBankKey.value) || banks[0]
)
const successBank = computed(
  () => banks.find((bank) => bank.key === completedBankKey.value) || selectedBank.value
)

function formatDate(dateValue) {
  if (!dateValue) return '-'

  const date = new Date(`${dateValue}T00:00:00`)

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
}

const bookingSummary = computed(() => {
  const booking = bookingStore.booking || {}

  return {
    vehicleName: booking.vehicleName || 'BMW 5 Series',
    image: booking.vehicleImage || booking.image || heroImage,
    pickupDate: formatDate(booking.pickupDate),
    pickupTime: booking.pickupTime || '10:00 AM',
    returnDate: formatDate(booking.returnDate),
    returnTime: booking.returnTime || '10:00 AM',
    location: booking.pickupLocation || booking.returnLocation || 'DriveEase Central',
  }
})

const bookingCode = computed(() => `#DEBKG${route.params.bookingId}`)
const formattedAmount = computed(() => Number(amount.value || 0).toFixed(2))
const activeQrImage = computed(() => bakongQrImage.value)
const isQrExpired = computed(() => qrSecondsLeft.value <= 0 && !paymentCompleted.value)
const qrTimeLeft = computed(() => {
  const minutes = Math.floor(qrSecondsLeft.value / 60)
  const seconds = qrSecondsLeft.value % 60

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})
const paymentStatusText = computed(() => {
  if (paymentCompleted.value) return 'Payment confirmed'
  if (paymentStatus.value === 'checking') return 'Checking Bakong payment...'
  if (isQrExpired.value) return 'Generate a new QR to continue'

  return `Waiting for ${selectedBank.value.name} payment...`
})
const paymentMethodLabel = computed(() => {
  if (selectedMethod.value === 'cash') return 'Cash Payment'
  if (successBank.value.key === 'aba') return 'ABA Bank'
  if (successBank.value.key === 'acleda') return 'ACLEDA Bank'

  return 'Bakong KHQR'
})
const backToBookingLink = computed(() => {
  const vehicleId = bookingStore.booking?.vehicleId

  return vehicleId ? `/booking/${vehicleId}` : '/vehicles'
})

function startQrTimer() {
  if (qrTimer) clearInterval(qrTimer)

  qrTimer = setInterval(() => {
    if (qrSecondsLeft.value <= 0) {
      clearInterval(qrTimer)
      qrTimer = null
      stopPaymentPolling()
      return
    }

    qrSecondsLeft.value -= 1
  }, 1000)
}

function resetQrTimer() {
  if (paymentCompleted.value) {
    expireQrCode()
    return
  }

  qrSecondsLeft.value = 585
  startQrTimer()
}

function stopPaymentPolling() {
  if (paymentPoller) {
    clearInterval(paymentPoller)
    paymentPoller = null
  }
}

function selectPaymentMethod(method) {
  unlockPaymentAudio()
  selectedMethod.value = method

  if (paymentCompleted.value) {
    expireQrCode()
    return
  }

  if (method === 'qr') {
    initializeBakongPayment()
  } else {
    stopPaymentPolling()
  }
}

function selectBank(bankKey) {
  unlockPaymentAudio()
  selectedBankKey.value = bankKey

  if (paymentCompleted.value) {
    expireQrCode()
    return
  }

  initializeBakongPayment()
}

function expireQrCode() {
  if (qrTimer) {
    clearInterval(qrTimer)
    qrTimer = null
  }

  qrSecondsLeft.value = 0
}

function normalizePaymentStatus(status) {
  return String(status?.status || status?.paymentStatus || status || '').toLowerCase()
}

function isTransientBakongMessage(message) {
  return /transaction\s+could\s+not\s+be\s+found|transaction\s+not\s+found|not\s+available\s+yet|bakong\s+api\s+token\s+is\s+(missing|invalid|expired)/i.test(
    String(message || '')
  )
}

async function createQrImageUrl(qrText) {
  if (!qrText) return ''

  return QRCode.toDataURL(qrText, {
    errorCorrectionLevel: 'M',
    margin: 2,
    scale: 8,
    type: 'image/png',
    color: {
      dark: '#000000',
      light: '#ffffff',
    },
  })
}

function getPaymentErrorMessage(error) {
  const errorBody = error.response?.data
  const backendMessage =
    errorBody?.message ||
    errorBody?.error ||
    (typeof errorBody === 'string' ? errorBody : '')

  if (!error.response) {
    return 'Backend is not running on http://localhost:8080. Start the Spring Boot server, then generate the QR again.'
  }

  if (error.response?.status === 401) {
    return 'Please sign in again before making this payment.'
  }

  if (error.response?.status === 403) {
    if (/test qr is disabled/i.test(backendMessage)) {
      return 'Bakong QR is not available from the running backend yet. Restart Spring Boot, then generate the QR again.'
    }

    return backendMessage || 'This payment action is not allowed by the backend.'
  }

  return (
    backendMessage ||
    'Could not generate Bakong KHQR. Please try again.'
  )
}

function findStoredBookingAmount() {
  const bookingId = String(route.params.bookingId)
  const existingBooking = bookingStore.booking

  if (String(existingBooking?.id || existingBooking?.bookingId || '') === bookingId) {
    return Number(existingBooking?.totalPrice || 0)
  }

  const listedBooking = bookingStore.bookings.find(
    (booking) => String(booking.id || booking.bookingId || '') === bookingId
  )

  if (listedBooking) {
    return Number(listedBooking.totalPrice || 0)
  }

  try {
    const demoBookings = JSON.parse(localStorage.getItem('frontendDemoBookings') || '[]')
    const demoBooking = demoBookings.find(
      (booking) => String(booking.id || booking.bookingId || '') === bookingId
    )

    return Number(demoBooking?.totalPrice || 0)
  } catch {
    return 0
  }
}

async function loadPaymentAmount() {
  const routeAmount = Number(route.query.amount || 0)

  if (routeAmount > 0) {
    amount.value = routeAmount
    return
  }

  try {
    const booking = await bookingStore.fetchBooking(route.params.bookingId)
    amount.value = Number(booking?.totalPrice || 0)
  } catch {
    amount.value = findStoredBookingAmount()
  }

  if (Number(amount.value) <= 0) {
    amount.value = findStoredBookingAmount()
  }
}

function unlockPaymentAudio() {
  const AudioContext = window.AudioContext || window.webkitAudioContext
  if (!AudioContext) return

  try {
    paymentAudioContext ||= new AudioContext()

    if (paymentAudioContext.state === 'suspended') {
      paymentAudioContext.resume()
    }
  } catch {
    paymentAudioContext = null
  }
}

function playPaymentSuccessVoice() {
  const AudioContext = window.AudioContext || window.webkitAudioContext
  if (!AudioContext) return

  try {
    const audioContext = paymentAudioContext || new AudioContext()
    paymentAudioContext = audioContext

    if (audioContext.state === 'suspended') {
      audioContext.resume()
    }

    const gain = audioContext.createGain()
    gain.connect(audioContext.destination)
    gain.gain.setValueAtTime(0.001, audioContext.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.18, audioContext.currentTime + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.45)

    ;[660, 880, 1100].forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator()
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
      oscillator.connect(gain)
      oscillator.start(audioContext.currentTime + index * 0.09)
      oscillator.stop(audioContext.currentTime + index * 0.09 + 0.18)
    })
  } catch {
    // Some browsers block audio until the user interacts with the page.
  }
}

function completeQrPayment() {
  paymentCompleted.value = true
  completedBankKey.value = selectedBankKey.value
  paymentStatus.value = 'paid'
  paymentError.value = ''
  stopPaymentPolling()
  expireQrCode()
  showSuccessModal.value = true
  playPaymentSuccessVoice()
}

async function useBakongSession(session) {
  const qrText = session?.qr || ''

  bakongQrImage.value =
    session?.qrImage ||
    session?.qrImageUrl ||
    session?.qrUrl ||
    session?.khqrImage ||
    session?.image ||
    (await createQrImageUrl(qrText)) ||
    ''
  bakongReference.value =
    session?.md5 ||
    session?.reference ||
    session?.paymentReference ||
    ''

  if (Number(session?.expiresInSeconds) > 0) {
    qrSecondsLeft.value = Number(session.expiresInSeconds)
    startQrTimer()
  }
}

async function checkBakongPaymentStatus() {
  if (paymentCompleted.value || selectedMethod.value !== 'qr' || isQrExpired.value) return
  if (!bakongReference.value) return

  try {
    paymentStatus.value = 'checking'
    const status = await paymentStore.checkBakongPaymentStatus(
      route.params.bookingId,
      bakongReference.value
    )
    const normalizedStatus = normalizePaymentStatus(status)

    if (['paid', 'success', 'successful', 'completed', 'confirmed'].includes(normalizedStatus)) {
      completeQrPayment()
      return
    }

    if (['expired', 'cancelled', 'failed'].includes(normalizedStatus)) {
      expireQrCode()
      paymentStatus.value = 'expired'
      return
    }

    const message = status?.message || ''
    paymentError.value = isTransientBakongMessage(message)
      ? ''
      : message ||
        ''
    paymentStatus.value = 'waiting'
  } catch (error) {
    console.error('Bakong payment status check failed:', error)
    paymentError.value = getPaymentErrorMessage(error)
    paymentStatus.value = 'waiting'
  }
}

function startPaymentPolling() {
  stopPaymentPolling()
  checkBakongPaymentStatus()
  paymentPoller = setInterval(checkBakongPaymentStatus, 5000)
}

async function loadExistingPaymentStatus() {
  try {
    const status = await paymentStore.checkBakongPaymentStatus(route.params.bookingId)
    const normalizedStatus = normalizePaymentStatus(status)

    if (['paid', 'success', 'successful', 'completed', 'confirmed'].includes(normalizedStatus)) {
      completedBankKey.value = status?.bank || status?.selectedBank || selectedBankKey.value
      completeQrPayment()
      showSuccessModal.value = false
      return true
    }
  } catch {
    return false
  }

  return false
}

async function initializeBakongPayment() {
  if (paymentCompleted.value || selectedMethod.value !== 'qr' || loadingPaymentDetails.value) return

  paymentStatus.value = 'waiting'
  paymentError.value = ''
  bakongQrImage.value = ''
  bakongReference.value = ''

  if (Number(amount.value) <= 0) {
    paymentError.value = 'Payment amount is missing. Please open payment from your booking again.'
    stopPaymentPolling()
    expireQrCode()
    return
  }

  resetQrTimer()

  try {
    const session = await paymentStore.createBakongQr({
      bookingId: Number(route.params.bookingId),
      amount: amount.value,
      currency: 'USD',
    })

    await useBakongSession(session)
  } catch (error) {
    paymentError.value = getPaymentErrorMessage(error)
    stopPaymentPolling()
    return
  }

  startPaymentPolling()
}

async function copyBookingId() {
  try {
    await navigator.clipboard.writeText(bookingCode.value)
    bookingIdCopied.value = true

    if (copiedTimer) clearTimeout(copiedTimer)
    copiedTimer = setTimeout(() => {
      bookingIdCopied.value = false
      copiedTimer = null
    }, 1400)
  } catch {
    alert('Could not copy booking ID')
  }
}

onMounted(async () => {
  try {
    const methods = await paymentStore.fetchPaymentMethods()
    const bakongMethod = methods.find((method) =>
      String(method.methodName || method.paymentMethodName || '').toLowerCase().includes('bakong')
    )

    paymentMethodId.value = bakongMethod?.id || methods[0]?.id || ''

    await loadPaymentAmount()
  } finally {
    loadingPaymentDetails.value = false
  }

  if (await loadExistingPaymentStatus()) return

  initializeBakongPayment()
})

onUnmounted(() => {
  if (qrTimer) clearInterval(qrTimer)
  if (copiedTimer) clearTimeout(copiedTimer)
  stopPaymentPolling()
})

async function confirmPayment() {
  if (paymentCompleted.value || paymentStore.loading) return

  try {
    await paymentStore.createPayment({
      bookingId: Number(route.params.bookingId),
      paymentMethodId: Number(paymentMethodId.value || 1),
      amount: amount.value,
      paymentType:
        selectedMethod.value === 'qr'
          ? `${selectedBank.value.name} QR`
          : 'Cash',
    })

    paymentCompleted.value = true
    completedBankKey.value = selectedBankKey.value
    expireQrCode()
    showSuccessModal.value = true
  } catch (error) {
    alert(error.response?.data?.message || 'Payment failed')
  }
}

function pay() {
  confirmPayment()
}
</script>
