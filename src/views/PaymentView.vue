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
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
} from 'vue'

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

// import heroImage from '../assets/hero.png'
// import abaLogo from '../assets/ABA.webp'
// import acledaLogo from '../assets/ACELEDA.jpg'
// import bakongLogo from '../assets/Bakong.png'

const route = useRoute()
const router = useRouter()

const bookingStore = useBookingStore()
const paymentStore = usePaymentStore()

/*
|--------------------------------------------------------------------------
| Payment state
|--------------------------------------------------------------------------
*/

const amount = ref(0)

const bakongPaymentId = ref(null)

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

const qrWasWaitingForCurrentSession = ref(false)

const selectedBankKey = ref('bakong')

let qrTimer = null
let copiedTimer = null
let paymentPoller = null
let paymentAudioContext = null

/*
|--------------------------------------------------------------------------
| Banks
|--------------------------------------------------------------------------
*/

const banks = [
  {
    key: 'bakong',
    name: 'Bakong',
    className: 'bakong',
    logo: 'https://play-lh.googleusercontent.com/Q27JPO0Plka8m3_-h2yw3Xu22Wedt3NJcxl1NPgMlaI6VRNcmSEPArvAcmnK1_TpmMBUlTsxjS1ycy0rRDFrmA=s0-br30',
  },
  {
    key: 'aba',
    name: 'ABA Bank',
    className: 'aba',
    logo: 'https://i.pinimg.com/736x/e2/33/f5/e233f5b0c5a358449398f202b03f063a.jpg',
  },
  {
    key: 'acleda',
    name: 'ACLEDA Bank',
    className: 'acleda',
    logo: 'https://www.acledabank.com.kh/kh/assets/download_material/download-logo-blue.jpg',
  },
]

/*
|--------------------------------------------------------------------------
| Computed
|--------------------------------------------------------------------------
*/

const selectedBank = computed(
  () =>
    banks.find(
      (bank) =>
        bank.key === selectedBankKey.value
    ) || banks[0]
)

const successBank = computed(
  () =>
    banks.find(
      (bank) =>
        bank.key === completedBankKey.value
    ) || selectedBank.value
)

const bookingSummary = computed(() => {
  const booking =
    bookingStore.booking || {}

  return {
    vehicleName:
      booking.vehicleName ||
      'BMW 5 Series',

    /*
     * heroImage was commented out,
     * so don't reference it here.
     */
    image:
      booking.vehicleImage ||
      booking.image ||
      '',

    pickupDate:
      formatDate(
        booking.pickupDate
      ),

    pickupTime:
      booking.pickupTime ||
      '10:00 AM',

    returnDate:
      formatDate(
        booking.returnDate
      ),

    returnTime:
      booking.returnTime ||
      '10:00 AM',

    location:
      booking.pickupLocation ||
      booking.returnLocation ||
      'DriveEase Central',
  }
})

const bookingCode = computed(
  () =>
    `#DEBKG${route.params.bookingId}`
)

const formattedAmount = computed(
  () =>
    Number(
      amount.value || 0
    ).toFixed(2)
)

const activeQrImage = computed(
  () => bakongQrImage.value
)

const isQrExpired = computed(
  () =>
    qrSecondsLeft.value <= 0 &&
    !paymentCompleted.value
)

const qrTimeLeft = computed(() => {
  const minutes = Math.floor(
    qrSecondsLeft.value / 60
  )

  const seconds =
    qrSecondsLeft.value % 60

  return `${String(minutes).padStart(
    2,
    '0'
  )}:${String(seconds).padStart(
    2,
    '0'
  )}`
})

const paymentStatusText =
  computed(() => {
    if (paymentCompleted.value) {
      return 'Payment confirmed'
    }

    if (
      paymentStatus.value ===
      'checking'
    ) {
      return 'Checking Bakong payment...'
    }

    if (isQrExpired.value) {
      return 'Generate a new QR to continue'
    }

    return `Waiting for ${selectedBank.value.name} payment...`
  })

const paymentMethodLabel =
  computed(() => {
    if (
      selectedMethod.value ===
      'cash'
    ) {
      return 'Cash Payment'
    }

    if (
      successBank.value.key ===
      'aba'
    ) {
      return 'ABA Bank'
    }

    if (
      successBank.value.key ===
      'acleda'
    ) {
      return 'ACLEDA Bank'
    }

    return 'Bakong KHQR'
  })

const backToBookingLink =
  computed(() => {
    const vehicleId =
      bookingStore.booking?.vehicleId

    return vehicleId
      ? `/booking/${vehicleId}`
      : '/vehicles'
  })

/*
|--------------------------------------------------------------------------
| Date
|--------------------------------------------------------------------------
*/

function formatDate(dateValue) {
  if (!dateValue) {
    return '-'
  }

  const date = new Date(
    `${dateValue}T00:00:00`
  )

  return date.toLocaleDateString(
    'en-US',
    {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }
  )
}

/*
|--------------------------------------------------------------------------
| QR timer
|--------------------------------------------------------------------------
*/

function startQrTimer() {
  if (qrTimer) {
    clearInterval(qrTimer)
  }

  qrTimer = setInterval(() => {
    if (
      qrSecondsLeft.value <= 0
    ) {
      clearInterval(qrTimer)

      qrTimer = null

      stopPaymentPolling()

      paymentStatus.value =
        'expired'

      return
    }

    qrSecondsLeft.value -= 1
  }, 1000)
}

function resetQrTimer() {
  if (qrTimer) {
    clearInterval(qrTimer)

    qrTimer = null
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

function expireQrCode() {
  if (qrTimer) {
    clearInterval(qrTimer)

    qrTimer = null
  }

  qrSecondsLeft.value = 0

  stopPaymentPolling()

  if (!paymentCompleted.value) {
    paymentStatus.value =
      'expired'
  }
}

/*
|--------------------------------------------------------------------------
| Payment method selection
|--------------------------------------------------------------------------
*/

function selectPaymentMethod(
  method
) {
  unlockPaymentAudio()

  if (
    paymentCompleted.value
  ) {
    paymentCompleted.value =
      false

    showSuccessModal.value =
      false
  }

  selectedMethod.value =
    method

  paymentError.value = ''

  if (method === 'qr') {
    initializeBakongPayment()
  } else {
    stopPaymentPolling()

    if (qrTimer) {
      clearInterval(qrTimer)

      qrTimer = null
    }

    paymentStatus.value =
      'waiting'
  }
}

/*
|--------------------------------------------------------------------------
| Bank selection
|--------------------------------------------------------------------------
*/

function selectBank(bankKey) {
  unlockPaymentAudio()

  if (
    paymentCompleted.value
  ) {
    paymentCompleted.value =
      false

    showSuccessModal.value =
      false
  }

  selectedBankKey.value =
    bankKey

  paymentError.value = ''

  /*
   * The current backend creates
   * Bakong KHQR.
   *
   * ABA / ACLEDA selection is
   * currently UI selection only.
   */
  if (
    selectedMethod.value ===
    'qr'
  ) {
    initializeBakongPayment()
  }
}

/*
|--------------------------------------------------------------------------
| Normalize payment status
|--------------------------------------------------------------------------
*/

function normalizePaymentStatus(
  status
) {
  return String(
    status?.status ||
      status?.paymentStatus ||
      status ||
      ''
  ).toLowerCase()
}

/*
|--------------------------------------------------------------------------
| Bakong temporary messages
|--------------------------------------------------------------------------
*/

function isTransientBakongMessage(
  message
) {
  return /transaction\s+could\s+not\s+be\s+found|transaction\s+not\s+found|not\s+available\s+yet|bakong\s+api\s+token\s+is\s+(missing|invalid|expired)/i.test(
    String(message || '')
  )
}

/*
|--------------------------------------------------------------------------
| Generate QR image
|--------------------------------------------------------------------------
*/

async function createQrImageUrl(
  qrText
) {
  if (!qrText) {
    return ''
  }

  try {
    return await QRCode.toDataURL(
      qrText,
      {
        errorCorrectionLevel: 'M',
        margin: 2,
        scale: 8,
        type: 'image/png',
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      }
    )
  } catch (error) {
    console.error(
      'Failed to generate QR image:',
      error
    )

    return ''
  }
}

/*
|--------------------------------------------------------------------------
| Error message
|--------------------------------------------------------------------------
*/

function getPaymentErrorMessage(
  error
) {
  const errorBody =
    error?.response?.data

  const backendMessage =
    errorBody?.message ||
    errorBody?.error ||
    (typeof errorBody ===
    'string'
      ? errorBody
      : '')

  /*
   * No HTTP response.
   * This can mean backend/network/CORS/etc.
   */
  if (!error?.response) {
    console.error(
      'Bakong network error:',
      error
    )

    if (
      error?.code ===
      'ERR_NETWORK'
    ) {
      return 'Cannot connect to the backend at http://localhost:8080. Please make sure Spring Boot is running.'
    }

    return (
      error?.message ||
      'Could not connect to the backend.'
    )
  }

  if (
    error.response.status ===
    401
  ) {
    return 'Please sign in again before making this payment.'
  }

  if (
    error.response.status ===
    403
  ) {
    if (
      /test qr is disabled/i.test(
        backendMessage
      )
    ) {
      return 'Bakong QR is not available from the running backend yet. Restart Spring Boot, then generate the QR again.'
    }

    return (
      backendMessage ||
      'This payment action is not allowed by the backend.'
    )
  }

  if (
    error.response.status ===
    404
  ) {
    return (
      backendMessage ||
      'Payment endpoint or payment was not found.'
    )
  }

  if (
    error.response.status ===
    400
  ) {
    return (
      backendMessage ||
      'Invalid payment information.'
    )
  }

  return (
    backendMessage ||
    'Could not process Bakong payment. Please try again.'
  )
}

/*
|--------------------------------------------------------------------------
| Find stored booking amount
|--------------------------------------------------------------------------
*/

function findStoredBookingAmount() {
  const bookingId =
    String(
      route.params.bookingId
    )

  const existingBooking =
    bookingStore.booking

  if (
    String(
      existingBooking?.id ||
        existingBooking?.bookingId ||
        ''
    ) === bookingId
  ) {
    return Number(
      existingBooking?.totalPrice ||
        0
    )
  }

  const listedBooking =
    bookingStore.bookings.find(
      (booking) =>
        String(
          booking.id ||
            booking.bookingId ||
            ''
        ) === bookingId
    )

  if (listedBooking) {
    return Number(
      listedBooking.totalPrice ||
        0
    )
  }

  try {
    const demoBookings =
      JSON.parse(
        localStorage.getItem(
          'frontendDemoBookings'
        ) || '[]'
      )

    const demoBooking =
      demoBookings.find(
        (booking) =>
          String(
            booking.id ||
              booking.bookingId ||
              ''
          ) === bookingId
      )

    return Number(
      demoBooking?.totalPrice ||
        0
    )
  } catch {
    return 0
  }
}

/*
|--------------------------------------------------------------------------
| Load payment amount
|--------------------------------------------------------------------------
*/

async function loadPaymentAmount() {
  const routeAmount =
    Number(
      route.query.amount || 0
    )

  if (routeAmount > 0) {
    amount.value =
      routeAmount

    return
  }

  try {
    const booking =
      await bookingStore.fetchBooking(
        route.params.bookingId
      )

    amount.value = Number(
      booking?.totalPrice || 0
    )
  } catch (error) {
    console.error(
      'Failed to fetch booking amount:',
      error
    )

    amount.value =
      findStoredBookingAmount()
  }

  if (
    Number(amount.value) <=
    0
  ) {
    amount.value =
      findStoredBookingAmount()
  }
}

/*
|--------------------------------------------------------------------------
| Audio
|--------------------------------------------------------------------------
*/

function unlockPaymentAudio() {
  const AudioContext =
    window.AudioContext ||
    window.webkitAudioContext

  if (!AudioContext) {
    return
  }

  try {
    paymentAudioContext ||=
      new AudioContext()

    if (
      paymentAudioContext.state ===
      'suspended'
    ) {
      paymentAudioContext.resume()
    }
  } catch {
    paymentAudioContext = null
  }
}

function playPaymentSuccessVoice() {
  const AudioContext =
    window.AudioContext ||
    window.webkitAudioContext

  if (!AudioContext) {
    return
  }

  try {
    const audioContext =
      paymentAudioContext ||
      new AudioContext()

    paymentAudioContext =
      audioContext

    if (
      audioContext.state ===
      'suspended'
    ) {
      audioContext.resume()
    }

    const gain =
      audioContext.createGain()

    gain.connect(
      audioContext.destination
    )

    gain.gain.setValueAtTime(
      0.001,
      audioContext.currentTime
    )

    gain.gain.exponentialRampToValueAtTime(
      0.18,
      audioContext.currentTime +
        0.02
    )

    gain.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime +
        0.45
    )

    ;[660, 880, 1100].forEach(
      (frequency, index) => {
        const oscillator =
          audioContext.createOscillator()

        oscillator.type = 'sine'

        oscillator.frequency.setValueAtTime(
          frequency,
          audioContext.currentTime
        )

        oscillator.connect(gain)

        oscillator.start(
          audioContext.currentTime +
            index * 0.09
        )

        oscillator.stop(
          audioContext.currentTime +
            index * 0.09 +
            0.18
        )
      }
    )
  } catch {
    // Browser may block audio.
  }
}

/*
|--------------------------------------------------------------------------
| Complete QR payment
|--------------------------------------------------------------------------
*/

function completeQrPayment() {
  paymentCompleted.value =
    true

  completedBankKey.value =
    selectedBankKey.value

  paymentStatus.value =
    'paid'

  paymentError.value = ''

  stopPaymentPolling()

  if (qrTimer) {
    clearInterval(qrTimer)

    qrTimer = null
  }

  qrSecondsLeft.value = 0

  showSuccessModal.value =
    true

  playPaymentSuccessVoice()
}

/*
|--------------------------------------------------------------------------
| Use Bakong session
|--------------------------------------------------------------------------
|
| IMPORTANT:
| paymentId is saved here.
|
| bookingId != paymentId
| md5 != paymentId
|
*/

async function useBakongSession(
  session
) {
  const qrText =
    session?.qr || ''

  bakongQrImage.value =
    session?.qrImage ||
    session?.qrImageUrl ||
    session?.qrUrl ||
    session?.khqrImage ||
    session?.image ||
    (await createQrImageUrl(
      qrText
    )) ||
    ''

  bakongReference.value =
    session?.md5 ||
    session?.reference ||
    session?.paymentReference ||
    ''

  /*
   * THIS IS THE IMPORTANT FIX.
   */
  bakongPaymentId.value =
    session?.paymentId ||
    session?.id ||
    null

  console.log(
    'Bakong payment session:',
    {
      paymentId:
        bakongPaymentId.value,

      md5:
        bakongReference.value,

      bookingId:
        route.params.bookingId,
    }
  )

  if (
    !bakongPaymentId.value
  ) {
    console.warn(
      'Bakong response does not contain paymentId:',
      session
    )

    paymentError.value =
      'Bakong payment was created, but the payment ID was not returned by the backend.'
  }

  if (
    Number(
      session?.expiresInSeconds
    ) > 0
  ) {
    qrSecondsLeft.value =
      Number(
        session.expiresInSeconds
      )

    startQrTimer()
  }
}

/*
|--------------------------------------------------------------------------
| Check Bakong payment status
|--------------------------------------------------------------------------
|
| IMPORTANT:
| Backend endpoint:
|
| GET /api/payments/bakong/{paymentId}/status
|
| So we MUST send paymentId.
|--------------------------------------------------------------------------
*/

async function checkBakongPaymentStatus() {
  if (
    paymentCompleted.value ||
    selectedMethod.value !== 'qr' ||
    isQrExpired.value
  ) {
    return
  }

  /*
   * Do NOT use:
   *
   * route.params.bookingId
   *
   * Do NOT use:
   *
   * bakongReference.value
   *
   * We need PAYMENT ID.
   */
  if (
    !bakongPaymentId.value
  ) {
    console.warn(
      'Bakong payment ID is missing. Cannot check payment status.'
    )

    return
  }

  try {
    paymentStatus.value =
      'checking'

    const status =
      await paymentStore.checkBakongPaymentStatus(
        bakongPaymentId.value
      )

    console.log(
      'Bakong payment status:',
      status
    )

    const normalizedStatus =
      normalizePaymentStatus(
        status
      )

    /*
     * Successful payment
     */
    if (
      [
        'paid',
        'success',
        'successful',
        'completed',
        'confirmed',
      ].includes(
        normalizedStatus
      )
    ) {
      completeQrPayment()

      return
    }

    /*
     * Failed / expired payment
     */
    if (
      [
        'expired',
        'cancelled',
        'failed',
      ].includes(
        normalizedStatus
      )
    ) {
      expireQrCode()

      paymentStatus.value =
        'expired'

      return
    }

    /*
     * Still waiting
     */
    const message =
      status?.message || ''

    paymentError.value =
      isTransientBakongMessage(
        message
      )
        ? ''
        : message || ''

    qrWasWaitingForCurrentSession.value =
      true

    paymentStatus.value =
      'waiting'
  } catch (error) {
    console.error(
      'Bakong payment status check failed:',
      error
    )

    paymentError.value =
      getPaymentErrorMessage(
        error
      )

    paymentStatus.value =
      'waiting'
  }
}

/*
|--------------------------------------------------------------------------
| Start payment polling
|--------------------------------------------------------------------------
*/

function startPaymentPolling() {
  stopPaymentPolling()

  /*
   * Check immediately.
   */
  checkBakongPaymentStatus()

  /*
   * Then check every 5 seconds.
   */
  paymentPoller =
    setInterval(
      checkBakongPaymentStatus,
      5000
    )
}

/*
|--------------------------------------------------------------------------
| Load existing payment status
|--------------------------------------------------------------------------
|
| Use stored PAYMENT ID.
| Do NOT use bookingId.
|--------------------------------------------------------------------------
*/

async function loadExistingPaymentStatus() {
  try {
    const lastPayment =
      JSON.parse(
        localStorage.getItem(
          'lastBakongScanPayment'
        ) || '{}'
      )

    if (
      !lastPayment.paymentId
    ) {
      return false
    }

    const status =
      await paymentStore.checkBakongPaymentStatus(
        lastPayment.paymentId
      )

    const normalizedStatus =
      normalizePaymentStatus(
        status
      )

    if (
      [
        'paid',
        'success',
        'successful',
        'completed',
        'confirmed',
      ].includes(
        normalizedStatus
      )
    ) {
      return true
    }
  } catch (error) {
    console.error(
      'Failed to load existing payment status:',
      error
    )

    return false
  }

  return false
}

/*
|--------------------------------------------------------------------------
| Initialize Bakong payment
|--------------------------------------------------------------------------
*/

async function initializeBakongPayment() {
  if (
    selectedMethod.value !==
    'qr'
  ) {
    return
  }

  if (
    loadingPaymentDetails.value
  ) {
    return
  }

  /*
   * If user chooses another bank
   * while current payment is completed,
   * allow a new payment session.
   */
  if (
    paymentCompleted.value
  ) {
    paymentCompleted.value =
      false

    showSuccessModal.value =
      false
  }

  /*
   * Stop old polling.
   */
  stopPaymentPolling()

  /*
   * Reset current session.
   */
  paymentStatus.value =
    'waiting'

  paymentError.value = ''

  bakongPaymentId.value =
    null

  bakongQrImage.value = ''

  bakongReference.value = ''

  qrWasWaitingForCurrentSession.value =
    false

  if (
    Number(amount.value) <=
    0
  ) {
    paymentError.value =
      'Payment amount is missing. Please open payment from your booking again.'

    expireQrCode()

    return
  }

  if (
    !paymentMethodId.value
  ) {
    paymentError.value =
      'Bakong payment method is not available.'

    return
  }

  resetQrTimer()

  try {
    const bookingId =
      Number(
        route.params.bookingId
      )

    const selectedPaymentMethodId =
      Number(
        paymentMethodId.value
      )

    const paymentAmount =
      Number(amount.value)

    console.log(
      'Creating Bakong payment:',
      {
        bookingId,
        paymentMethodId:
          selectedPaymentMethodId,
        amount:
          paymentAmount,
        currency: 'USD',
      }
    )

    const session =
      await paymentStore.createBakongQr(
        {
          bookingId,

          paymentMethodId:
            selectedPaymentMethodId,

          amount:
            paymentAmount,

          currency: 'USD',
        }
      )

    console.log(
      'Bakong payment session received:',
      session
    )

    await useBakongSession(
      session
    )
  } catch (error) {
    console.error(
      'Failed to initialize Bakong payment:',
      error
    )

    paymentError.value =
      getPaymentErrorMessage(
        error
      )

    stopPaymentPolling()

    return
  }

  /*
   * Only start polling if
   * paymentId exists.
   */
  if (
    bakongPaymentId.value
  ) {
    startPaymentPolling()
  } else {
    console.warn(
      'Payment created but paymentId is missing. Polling was not started.'
    )
  }
}

/*
|--------------------------------------------------------------------------
| Confirm payment
|--------------------------------------------------------------------------
*/

async function confirmPayment() {
  if (
    paymentCompleted.value ||
    paymentStore.loading
  ) {
    return
  }

  /*
   * Bakong QR payment is confirmed
   * automatically by polling.
   */
  if (
    selectedMethod.value ===
    'qr'
  ) {
    paymentError.value =
      'Please scan the Bakong KHQR. The payment will be confirmed automatically after Bakong confirms it.'

    return
  }

  /*
   * Cash payment
   */
  try {
    await paymentStore.createPayment(
      {
        bookingId:
          Number(
            route.params.bookingId
          ),

        paymentMethodId:
          Number(
            paymentMethodId.value ||
              1
          ),

        amount:
          amount.value,

        paymentType:
          'Cash',
      }
    )

    paymentCompleted.value =
      true

    completedBankKey.value =
      selectedBankKey.value

    paymentStatus.value =
      'paid'

    showSuccessModal.value =
      true

    playPaymentSuccessVoice()
  } catch (error) {
    console.error(
      'Cash payment failed:',
      error
    )

    paymentError.value =
      getPaymentErrorMessage(
        error
      )
  }
}

/*
|--------------------------------------------------------------------------
| Pay button
|--------------------------------------------------------------------------
*/

function pay() {
  confirmPayment()
}

/*
|--------------------------------------------------------------------------
| Copy booking ID
|--------------------------------------------------------------------------
*/

async function copyBookingId() {
  try {
    await navigator.clipboard.writeText(
      String(
        route.params.bookingId
      )
    )

    bookingIdCopied.value =
      true

    if (copiedTimer) {
      clearTimeout(copiedTimer)
    }

    copiedTimer = setTimeout(() => {
      bookingIdCopied.value =
        false
    }, 2000)
  } catch (error) {
    console.error(
      'Failed to copy booking ID:',
      error
    )
  }
}

/*
|--------------------------------------------------------------------------
| Mounted
|--------------------------------------------------------------------------
*/

onMounted(async () => {
  try {
    const methods =
      await paymentStore.fetchPaymentMethods()

    console.log(
      'Payment methods:',
      methods
    )

    const bakongMethod =
      methods.find(
        (method) =>
          String(
            method.methodName ||
              method.paymentMethodName ||
              ''
          )
            .toLowerCase()
            .includes(
              'bakong'
            )
      )

    paymentMethodId.value =
      bakongMethod?.id ||
      methods[0]?.id ||
      ''

    console.log(
      'Selected Bakong payment method ID:',
      paymentMethodId.value
    )

    await loadPaymentAmount()
  } catch (error) {
    console.error(
      'Failed to initialize payment page:',
      error
    )
  } finally {
    loadingPaymentDetails.value =
      false
  }

  await initializeBakongPayment()
})

/*
|--------------------------------------------------------------------------
| Unmounted
|--------------------------------------------------------------------------
*/

onUnmounted(() => {
  if (qrTimer) {
    clearInterval(qrTimer)

    qrTimer = null
  }

  if (copiedTimer) {
    clearTimeout(copiedTimer)

    copiedTimer = null
  }

  stopPaymentPolling()

  if (
    paymentAudioContext
  ) {
    try {
      paymentAudioContext.close()
    } catch {
      // Ignore audio cleanup errors.
    }

    paymentAudioContext =
      null
  }
})
</script>
