<template>
  <div
    class="receipt-page min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-mono"
  >
    <!-- Loading -->
    <div
      v-if="loading"
      
      class="w-full max-w-md bg-white p-8 text-center rounded-sm shadow-md"
    >
      <i class="fa-solid fa-spinner fa-spin text-xl"></i>
      <p class="mt-3 text-sm">Loading receipt...</p>
    </div>

    <!-- Error -->
    <div
      v-else-if="error"
      class="w-full max-w-md bg-white p-8 text-center rounded-sm shadow-md"
    >
      <i class="fa-solid fa-circle-exclamation text-red-500 text-2xl"></i>

      <p class="mt-3 font-bold">
        Unable to load receipt
      </p>

      <p class="mt-2 text-xs text-gray-500">
        {{ error }}
      </p>

      <button
        type="button"
        @click="loadReceipt"
        class="mt-5 px-4 py-2 bg-gray-900 text-white text-xs font-sans font-bold rounded-lg"
      >
        Try Again
      </button>
    </div>

    <!-- Receipt -->
    <template v-else>
      <!-- Action Controls -->
      <div
     
        class="w-full max-w-md mb-4 flex justify-end print:hidden"
      >
        <button
          type="button"
          @click="printReceipt"
          class="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-xs font-sans font-bold rounded-lg shadow-md transition-all cursor-pointer active:scale-95"
        >
          <i class="fa-solid fa-print"></i>
          Print / Save as PDF
        </button>
      </div>

      <!-- Receipt Container -->
      <div
       id="receipt"
        class="w-full max-w-md bg-white p-8 rounded-sm shadow-md border border-gray-200 text-gray-900 text-sm leading-relaxed print:shadow-none print:border-none print:p-0"
      >
        <!-- Header -->
<!-- Header -->
        <div class="text-center space-y-2 mb-6">

          <!-- Logo -->
          <div
            v-if="customizer.logo"
            class="flex justify-center items-center"
          >
            <img
              :src="customizer.logo"
              :alt="customizer.websiteName"
              class="max-h-16 max-w-[180px] object-contain"
              @error="customizer.logo = ''"
            />
          </div>

          <!-- Website Name -->
          <h1
            class="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase font-sans"
          >
            {{ customizer.websiteName }}
          </h1>

          <p class="font-semibold text-base">
            Rental Receipt
          </p>

          <p class="text-gray-600">
            Thank you for choosing our service
          </p>

        </div>

        <!-- Metadata -->
        <div class="text-center space-y-1 mb-4">
          <p>
            Booking ID:
            <strong>#{{ bookingId }}</strong>
          </p>

          <p>
            Date:
            {{ formattedPaymentDate }}
          </p>
        </div>

        <!-- Divider -->
        <div
          class="border-b-2 border-dashed border-gray-800 my-4"
        ></div>

        <!-- Vehicle -->
        <div class="space-y-2">
          <div class="flex justify-between gap-4">
            <span>Vehicle</span>

            <span class="font-bold text-right">
              {{ booking.vehicleName }}
            </span>
          </div>

          <div class="flex justify-between gap-4">
            <span>Pickup</span>

            <span class="text-right">
              {{ formatDate(booking.pickupDate) }}
            </span>
          </div>

          <div class="flex justify-between gap-4">
            <span>Return</span>

            <span class="text-right">
              {{ formatDate(booking.returnDate) }}
            </span>
          </div>

          <div class="flex justify-between gap-4">
            <span>Rental Duration</span>

            <span>
              {{ rentalDays }}
              {{ rentalDays === 1 ? 'day' : 'days' }}
            </span>
          </div>
        </div>

        <!-- Divider -->
        <div
          class="border-b-2 border-dashed border-gray-800 my-4"
        ></div>

        <!-- Customer -->
        <div class="space-y-2">
          <div class="flex justify-between gap-4">
            <span>Customer</span>

            <span class="font-bold text-right">
              {{ booking.customerName }}
            </span>
          </div>

          <div
            v-if="booking.customerEmail"
            class="flex justify-between gap-4"
          >
            <span>Email</span>

            <span class="text-right break-all">
              {{ booking.customerEmail }}
            </span>
          </div>

          <div
            v-if="booking.customerPhone"
            class="flex justify-between gap-4"
          >
            <span>Phone</span>

            <span>
              {{ booking.customerPhone }}
            </span>
          </div>
        </div>

        <!-- Divider -->
        <div
          class="border-b-2 border-dashed border-gray-800 my-4"
        ></div>

        <!-- Rental Amount -->
        <div class="space-y-2">
          <div class="flex justify-between">
            <span>Daily Rental Rate</span>

            <span>
              {{ money(booking.pricePerDay) }}
            </span>
          </div>

          <div class="flex justify-between">
            <span>Rental Days</span>

            <span>
              {{ rentalDays }}
            </span>
          </div>

          <div class="flex justify-between font-bold text-base">
            <span>Total</span>

            <span>
              {{ money(booking.totalPrice) }}
            </span>
          </div>
        </div>

        <!-- Divider -->
        <div
          class="border-b-2 border-dashed border-gray-800 my-4"
        ></div>

        <!-- Payment -->
        <div class="space-y-2">
          <div class="flex justify-between">
            <span>Payment</span>

            <span>
              {{ payment.paymentMethod }}
            </span>
          </div>

          <div class="flex justify-between">
            <span>Payment Type</span>

            <span>
              {{ payment.paymentType }}
            </span>
          </div>

          <div class="flex justify-between">
            <span>Amount Paid</span>

            <span>
              {{ money(payment.amount) }}
            </span>
          </div>

          <div class="flex justify-between font-bold">
            <span>Status</span>

            <span>
              {{ payment.status }}
            </span>
          </div>
        </div>

        <!-- Divider -->
        <div
          class="border-b-2 border-dashed border-gray-800 my-4"
        ></div>

        <!-- Footer -->
        <div class="text-center space-y-1 mt-6">
          <p class="font-semibold">
            Thank you for your booking!
          </p>

          <p>
            Please keep this receipt for your records.
          </p>

          <p class="text-xs text-gray-500 mt-3">
            Vehicle Rental System
          </p>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import {
  computed,
  onMounted,
  ref,
} from 'vue'

import { useRoute } from 'vue-router'

import { useBookingStore } from '../stores/Booking'
import { usePaymentStore } from '../stores/Payment'
import { getCustomizerSettings } from '../api/customizer'
const route = useRoute()

const bookingStore = useBookingStore()
const paymentStore = usePaymentStore()
const customizer = ref({
  logo: '',
  websiteName: 'ChuolTov',
})
const loading = ref(true)
const error = ref('')

const booking = ref({
  vehicleName: '-',
  pickupDate: '',
  returnDate: '',
  customerName: '-',
  customerEmail: '',
  customerPhone: '',
  pricePerDay: 0,
  totalPrice: 0,
})

const payment = ref({
  paymentMethod: 'Cash Payment',
  paymentType: 'Cash',
  amount: 0,
  status: 'APPROVED',
})

const bookingId = computed(() => {
  return route.params.bookingId
})

const rentalDays = computed(() => {
  if (
    !booking.value.pickupDate ||
    !booking.value.returnDate
  ) {
    return 0
  }

  const pickup = new Date(
    `${booking.value.pickupDate}T00:00:00`
  )

  const returnDate = new Date(
    `${booking.value.returnDate}T00:00:00`
  )

  return Math.max(
    0,
    Math.ceil(
      (returnDate - pickup) /
        86400000
    )
  )
})

const formattedPaymentDate = computed(() => {
  return new Date().toLocaleString(
    'en-US',
    {
      dateStyle: 'short',
      timeStyle: 'short',
    }
  )
})

function money(value) {
  return new Intl.NumberFormat(
    'en-US',
    {
      style: 'currency',
      currency: 'USD',
    }
  ).format(Number(value) || 0)
}

function formatDate(value) {
  if (!value) {
    return '-'
  }

  const date = new Date(
    `${value}T00:00:00`
  )

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleDateString(
    'en-US',
    {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }
  )
}

async function loadReceipt() {
  loading.value = true
  error.value = ''

  try {
    const id = Number(
      route.params.bookingId
    )

    if (!Number.isInteger(id) || id <= 0) {
      throw new Error(
        'Invalid booking ID.'
      )
    }
    // Fetch customizer settings
const customizerData = await getCustomizerSettings()

customizer.value = {
  logo: customizerData?.logo || '',
  websiteName:
    customizerData?.websiteName ||
    'ChuolTov',
}

    /*
     * Fetch booking
     */
    const bookingData =
      await bookingStore.fetchBooking(id)

    console.log(
      'Receipt booking:',
      bookingData
    )

    booking.value = {
      vehicleName:
        bookingData?.vehicleName ||
        bookingData?.vehicle?.name ||
        bookingData?.vehicle?.vehicleName ||
        '-',

      pickupDate:
        bookingData?.pickupDate || '',

      returnDate:
        bookingData?.returnDate || '',

      customerName:
        bookingData?.customerName ||
        bookingData?.user?.name ||
        bookingData?.user?.fullName ||
        '-',

      customerEmail:
        bookingData?.customerEmail ||
        bookingData?.user?.email ||
        '',

      customerPhone:
        bookingData?.customerPhone ||
        bookingData?.user?.tell ||
        bookingData?.user?.phone ||
        '',

      pricePerDay:
        Number(
          bookingData?.pricePerDay ||
          bookingData?.vehiclePrice ||
          bookingData?.vehicle?.pricePerDay ||
          0
        ),

      totalPrice:
        Number(
          bookingData?.totalPrice ||
          bookingData?.totalAmount ||
          0
        ),
    }

    /*
     * Fetch payment
     */
    const paymentData =
      await paymentStore.fetchPaymentByBookingId(id)

    console.log(
      'Receipt payment:',
      paymentData
    )

    payment.value = {
      paymentMethod:
        paymentData?.paymentMethod?.methodName ||
        paymentData?.paymentMethodName ||
        paymentData?.methodName ||
        'Cash Payment',

      paymentType:
        paymentData?.paymentType ||
        'Cash',

      amount:
        Number(
          paymentData?.amount ||
          booking.value.totalPrice ||
          0
        ),

      status:
        String(
          paymentData?.status ||
          'APPROVED'
        ).toUpperCase(),
    }
  } catch (err) {
    console.error(
      'Failed to load receipt:',
      err
    )

    error.value =
      err?.response?.data?.message ||
      err?.message ||
      'Failed to load receipt.'
  } finally {
    loading.value = false
  }
}





function printReceipt() {
  window.print()
}

onMounted(() => {
  loadReceipt()
})
</script>

<style>
/* =========================================
   PRINT RECEIPT ONLY
   ========================================= */

@media print {

  /* Hide everything first */
  body * {
    visibility: hidden !important;
  }

  /* Show only receipt */
  #receipt,
  #receipt * {
    visibility: visible !important;
  }

  /* Put receipt at the top-left of the printed page */
  #receipt {
    position: absolute !important;
    left: 0 !important;
    top: 0 !important;

    width: 100% !important;
    max-width: 100% !important;

    margin: 0 !important;
    padding: 20px !important;

    background: white !important;
    border: none !important;
    box-shadow: none !important;

    color: #000 !important;
  }

  /* Hide navbar, footer and other layout elements */
  nav,
  header,
  footer,
  .navbar,
  .footer,
  .site-navbar,
  .site-footer {
    display: none !important;
  }

  /* Remove page background */
  html,
  body {
    margin: 0 !important;
    padding: 0 !important;
    background: white !important;
  }

  /* Remove receipt page spacing */
  .receipt-page {
    min-height: auto !important;
    padding: 0 !important;
    margin: 0 !important;
    background: white !important;
  }

  /* Don't print buttons */
  button,
  .print\:hidden {
    display: none !important;
  }
}

/* =========================================
   SCREEN
   ========================================= */

@media screen {
  .receipt-page {
    min-height: 100vh;
  }
}
</style>