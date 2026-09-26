<template>
  <div class="w-full pt-1">

    <!-- =========================================================
         FIND AVAILABLE DATES
    ========================================================== -->
    <button
      type="button"
      @click="openSearch"
      :disabled="availabilityLoading"
      :class="[
        'group w-full h-11',
        'rounded-xl border',
        'px-3.5',
        'flex items-center justify-between',
        'transition-all duration-200',
        'cursor-pointer',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        'text-xs font-bold',

        isLambo
          ? [
              'bg-amber-500/[0.04]',
              'border-amber-500/20',
              'text-amber-300',
              'hover:bg-amber-500/[0.09]',
              'hover:border-amber-500/35'
            ]
          : [
              'bg-slate-50',
              'border-slate-200',
              'text-slate-700',
              'hover:bg-slate-100',
              'hover:border-slate-300'
            ]
      ]"
    >

      <!-- LEFT -->
      <span class="flex items-center gap-2.5 min-w-0">

        <!-- ICON -->
        <span
          :class="[
            'w-7 h-7 rounded-lg shrink-0',
            'flex items-center justify-center',

            isLambo
              ? 'bg-amber-500/10 text-amber-400'
              : 'bg-blue-50 text-blue-600'
          ]"
        >
          <i
            :class="[
              availabilityLoading
                ? 'fa-solid fa-circle-notch animate-spin'
                : 'fa-solid fa-calendar-days',
              'text-[11px]'
            ]"
          ></i>
        </span>

        <!-- TEXT -->
        <span class="truncate">
          {{
            availabilityLoading
              ? 'Finding available dates...'
              : 'Find Available Dates'
          }}
        </span>

      </span>

      <!-- RIGHT -->
      <span
        v-if="!availabilityLoading"
        :class="[
          'w-6 h-6 rounded-full shrink-0',
          'flex items-center justify-center',
          'transition-transform duration-200',
          'group-hover:translate-x-0.5',

          isLambo
            ? 'text-amber-400'
            : 'text-slate-400'
        ]"
      >
        <i class="fa-solid fa-arrow-right text-[9px]"></i>
      </span>

    </button>


    <!-- =========================================================
         AVAILABLE DATES POPUP
    ========================================================== -->
    <Teleport to="body">

      <Transition name="availability-modal">

        <div
          v-if="showResults"
          class="fixed inset-0 z-[9999]
                 flex items-center justify-center
                 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="availability-modal-title"
          @keydown.esc="closeSearch"
        >

          <!-- ===================================================
               BACKDROP
          ==================================================== -->
          <div
            class="absolute inset-0
                   bg-black/70
                   backdrop-blur-sm"
            @click="closeSearch"
          ></div>


          <!-- ===================================================
               MODAL
          ==================================================== -->
          <div
            :class="[
              'relative z-10',
              'w-full max-w-lg',
              'max-h-[85vh]',
              'overflow-hidden',
              'rounded-3xl',
              'border',
              'shadow-2xl',
              'flex flex-col',

              isLambo
                ? [
                    'bg-[#17120F]',
                    'border-amber-500/20'
                  ]
                : [
                    'bg-white',
                    'border-slate-200'
                  ]
            ]"
          >

            <!-- =================================================
                 MODAL HEADER
            ================================================== -->
            <header
              :class="[
                'px-5 py-4',
                'border-b',
                'flex items-center justify-between',
                'shrink-0',

                isLambo
                  ? 'border-amber-500/10'
                  : 'border-slate-200'
              ]"
            >

              <!-- HEADER LEFT -->
              <div class="flex items-center gap-3">

                <!-- ICON -->
                <div
                  :class="[
                    'w-10 h-10 rounded-xl',
                    'flex items-center justify-center',

                    isLambo
                      ? 'bg-amber-500/10 text-amber-400'
                      : 'bg-blue-50 text-blue-600'
                  ]"
                >
                  <i
                    class="fa-solid fa-calendar-check text-sm"
                  ></i>
                </div>


                <!-- TITLE -->
                <div>

                  <h2
                    id="availability-modal-title"
                    :class="[
                      'text-sm font-extrabold',

                      isLambo
                        ? 'text-white'
                        : 'text-slate-900'
                    ]"
                  >
                    Available Rental Dates
                  </h2>

                  <p
                    :class="[
                      'text-[10px] mt-0.5',

                      isLambo
                        ? 'text-slate-500'
                        : 'text-slate-400'
                    ]"
                  >
                    Choose a period that works for you.
                  </p>

                </div>

              </div>


              <!-- CLOSE -->
              <button
                type="button"
                @click="closeSearch"
                aria-label="Close modal"
                :class="[
                  'w-9 h-9 rounded-xl',
                  'flex items-center justify-center',
                  'transition',

                  isLambo
                    ? [
                        'text-slate-500',
                        'hover:text-white',
                        'hover:bg-white/5'
                      ]
                    : [
                        'text-slate-400',
                        'hover:text-slate-700',
                        'hover:bg-slate-100'
                      ]
                ]"
              >
                <i class="fa-solid fa-xmark"></i>
              </button>

            </header>


            <!-- =================================================
                 SEARCH INFORMATION
            ================================================== -->
            <div
              :class="[
                'px-5 py-3',
                'border-b',
                'shrink-0',

                isLambo
                  ? [
                      'bg-black/10',
                      'border-amber-500/10'
                    ]
                  : [
                      'bg-slate-50',
                      'border-slate-200'
                    ]
              ]"
            >

              <div
                class="flex items-center justify-between gap-4"
              >

                <!-- DURATION -->
                <div>

                  <p
                    :class="[
                      'text-[10px]',

                      isLambo
                        ? 'text-slate-500'
                        : 'text-slate-400'
                    ]"
                  >
                    Rental duration
                  </p>

                  <p
                    :class="[
                      'text-sm font-extrabold mt-0.5',

                      isLambo
                        ? 'text-white'
                        : 'text-slate-900'
                    ]"
                  >
                    {{ rentalDays }}
                    {{ rentalDays === 1 ? 'day' : 'days' }}
                  </p>

                </div>


                <!-- SEARCH FROM -->
                <div class="text-right">

                  <p
                    :class="[
                      'text-[10px]',

                      isLambo
                        ? 'text-slate-500'
                        : 'text-slate-400'
                    ]"
                  >
                    Searching from
                  </p>

                  <p
                    :class="[
                      'text-[10px] font-bold mt-0.5',

                      isLambo
                        ? 'text-slate-300'
                        : 'text-slate-700'
                    ]"
                  >
                    {{ formatDate(searchStartDate) }}
                  </p>

                </div>

              </div>

            </div>


            <!-- =================================================
                 RESULTS
            ================================================== -->
            <main
              class="overflow-y-auto
                     max-h-[55vh]
                     flex-1"
            >

              <!-- LOADING -->
              <div
                v-if="availabilityLoading"
                class="px-5 py-14
                       flex flex-col
                       items-center
                       justify-center
                       text-center"
              >

                <div
                  :class="[
                    'w-12 h-12 rounded-2xl',
                    'flex items-center justify-center',

                    isLambo
                      ? 'bg-amber-500/10 text-amber-400'
                      : 'bg-blue-50 text-blue-600'
                  ]"
                >
                  <i
                    class="fa-solid
                           fa-circle-notch
                           animate-spin"
                  ></i>
                </div>

                <p
                  :class="[
                    'text-sm font-bold mt-4',

                    isLambo
                      ? 'text-white'
                      : 'text-slate-800'
                  ]"
                >
                  Finding available dates...
                </p>

                <p
                  :class="[
                    'text-[10px] mt-1',

                    isLambo
                      ? 'text-slate-500'
                      : 'text-slate-400'
                  ]"
                >
                  Checking available rental periods.
                </p>

              </div>


              <!-- RESULTS LIST -->
              <ul
                v-else-if="availablePeriods.length > 0"
                :class="[
                  'divide-y',

                  isLambo
                    ? 'divide-amber-500/10'
                    : 'divide-slate-200'
                ]"
              >

                <li
                  v-for="period in availablePeriods"
                  :key="`${period.pickupDate}-${period.returnDate}`"
                  :class="[
                    'px-5 py-4',
                    'flex items-center justify-between',
                    'gap-4',
                    'transition',

                    isLambo
                      ? 'hover:bg-white/[0.02]'
                      : 'hover:bg-slate-50'
                  ]"
                >

                  <!-- PERIOD -->
                  <div
                    class="flex items-center gap-3 min-w-0"
                  >

                    <!-- ICON -->
                    <div
                      :class="[
                        'w-10 h-10 rounded-xl',
                        'flex items-center justify-center',
                        'shrink-0',

                        isLambo
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-emerald-50 text-emerald-600'
                      ]"
                    >
                      <i
                        class="fa-solid
                               fa-calendar-check
                               text-sm"
                      ></i>
                    </div>


                    <!-- TEXT -->
                    <div class="min-w-0">

                      <p
                        :class="[
                          'text-xs font-bold truncate',

                          isLambo
                            ? 'text-white'
                            : 'text-slate-800'
                        ]"
                      >
                        {{ formatDate(period.pickupDate) }}

                        <span
                          :class="[
                            'mx-1',

                            isLambo
                              ? 'text-slate-600'
                              : 'text-slate-300'
                          ]"
                        >
                          →
                        </span>

                        {{ formatDate(period.returnDate) }}
                      </p>

                      <p
                        :class="[
                          'text-[10px] mt-0.5',

                          isLambo
                            ? 'text-emerald-400'
                            : 'text-emerald-600'
                        ]"
                      >
                        {{ rentalDays }}
                        {{ rentalDays === 1 ? 'day' : 'days' }}
                        available
                      </p>

                    </div>

                  </div>


                  <!-- SELECT BUTTON -->
                  <button
                    type="button"
                    @click="selectPeriod(period)"
                    :class="[
                      'h-9 px-4',
                      'rounded-xl',
                      'shrink-0',
                      'text-[10px] font-bold',
                      'flex items-center',
                      'justify-center',
                      'gap-2',
                      'transition',
                      'active:scale-95',

                      isLambo
                        ? [
                            'bg-amber-500',
                            'text-black',
                            'hover:bg-amber-400'
                          ]
                        : [
                            'bg-slate-900',
                            'text-white',
                            'hover:bg-slate-800'
                          ]
                    ]"
                  >
                    <i class="fa-solid fa-check"></i>
                    Select
                  </button>

                </li>

              </ul>


              <!-- EMPTY -->
              <div
                v-else
                class="px-5 py-14
                       text-center"
              >

                <div
                  :class="[
                    'w-14 h-14 mx-auto',
                    'mb-4 rounded-2xl',
                    'flex items-center justify-center',

                    isLambo
                      ? 'bg-rose-500/10 text-rose-400'
                      : 'bg-rose-50 text-rose-500'
                  ]"
                >
                  <i
                    class="fa-solid
                           fa-calendar-xmark
                           text-lg"
                  ></i>
                </div>

                <p
                  :class="[
                    'text-sm font-bold',

                    isLambo
                      ? 'text-white'
                      : 'text-slate-800'
                  ]"
                >
                  No available period found
                </p>

                <p
                  :class="[
                    'text-[10px]',
                    'mt-2',
                    'max-w-xs',
                    'mx-auto',
                    'leading-5',

                    isLambo
                      ? 'text-slate-500'
                      : 'text-slate-400'
                  ]"
                >
                  Try another rental period or choose
                  a different starting date.
                </p>

              </div>

            </main>


            <!-- =================================================
                 FOOTER
            ================================================== -->
            <footer
              :class="[
                'px-5 py-4',
                'border-t',
                'flex items-center justify-between',
                'gap-3',
                'shrink-0',

                isLambo
                  ? 'border-amber-500/10'
                  : 'border-slate-200'
              ]"
            >

              <p
                :class="[
                  'text-[10px]',

                  isLambo
                    ? 'text-slate-500'
                    : 'text-slate-400'
                ]"
              >
                {{ availablePeriods.length }}

                {{
                  availablePeriods.length === 1
                    ? 'period'
                    : 'periods'
                }}
                found
              </p>


              <button
                type="button"
                @click="closeSearch"
                :class="[
                  'h-9 px-4 rounded-xl',
                  'border',
                  'text-[10px] font-bold',
                  'transition',

                  isLambo
                    ? [
                        'border-white/10',
                        'text-slate-300',
                        'hover:bg-white/5'
                      ]
                    : [
                        'border-slate-200',
                        'text-slate-600',
                        'hover:bg-slate-50'
                      ]
                ]"
              >
                Close
              </button>

            </footer>

          </div>

        </div>

      </Transition>

    </Teleport>

  </div>
</template>


<script setup>
import { computed, ref } from 'vue'


/* ================================================================
   PROPS
================================================================ */

const props = defineProps({

  bookings: {
    type: Array,
    default: () => []
  },

  pickupDate: {
    type: String,
    default: ''
  },

  returnDate: {
    type: String,
    default: ''
  },

  isLambo: {
    type: Boolean,
    default: false
  }

})


/* ================================================================
   EMITS
================================================================ */

const emit = defineEmits([
  'select-dates'
])


/* ================================================================
   STATE
================================================================ */

const availabilityLoading = ref(false)

const showResults = ref(false)

const availablePeriods = ref([])

const searchStartDate = ref('')


/* ================================================================
   COMPUTED
================================================================ */

const vehicleBookings = computed(() => {
  return props.bookings || []
})


const isLambo = computed(() => {
  return props.isLambo
})


const rentalDays = computed(() => {
  return calculateDays(
    props.pickupDate,
    props.returnDate
  )
})


/*
 * Only these booking statuses should block
 * a vehicle from being rented.
 */
const BLOCKING_STATUSES = [
  'PENDING',
  'CONFIRMED',
  'RENTED'
]


/* ================================================================
   DATE FORMAT
================================================================ */

function formatDate(dateString) {

  if (!dateString) {
    return ''
  }

  const date = new Date(
    `${dateString}T00:00:00`
  )

  return new Intl.DateTimeFormat(
    'en-US',
    {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }
  ).format(date)
}


/* ================================================================
   CALCULATE DAYS
================================================================ */

function calculateDays(
  startDate,
  endDate
) {

  if (!startDate || !endDate) {
    return 0
  }

  const start = new Date(
    `${startDate}T00:00:00`
  )

  const end = new Date(
    `${endDate}T00:00:00`
  )

  return Math.max(
    0,
    Math.ceil(
      (end - start) / 86400000
    )
  )
}


/* ================================================================
   ADD DAYS
================================================================ */

function addDays(
  dateString,
  days
) {

  const date = new Date(
    `${dateString}T00:00:00`
  )

  date.setDate(
    date.getDate() + days
  )

  return [
    date.getFullYear(),
    String(
      date.getMonth() + 1
    ).padStart(2, '0'),
    String(
      date.getDate()
    ).padStart(2, '0')
  ].join('-')
}


/* ================================================================
   TODAY
================================================================ */

function getToday() {

  const date = new Date()

  return [
    date.getFullYear(),
    String(
      date.getMonth() + 1
    ).padStart(2, '0'),
    String(
      date.getDate()
    ).padStart(2, '0')
  ].join('-')
}


/* ================================================================
   FILTER BLOCKING BOOKINGS
================================================================ */

function getBlockingBookings() {

  return [...vehicleBookings.value]

    .filter(booking => {

      if (
        !booking.pickupDate ||
        !booking.returnDate
      ) {
        return false
      }

      const status =
        String(
          booking.status || ''
        ).toUpperCase()

      /*
       * If backend doesn't provide status,
       * keep the booking as blocking.
       *
       * This is safer for availability.
       */
      if (!status) {
        return true
      }

      return BLOCKING_STATUSES.includes(
        status
      )
    })

    .sort(
      (a, b) =>
        a.pickupDate.localeCompare(
          b.pickupDate
        )
    )
}


/* ================================================================
   FIND AVAILABLE DATES
================================================================ */

function findAvailableDates() {

  if (availabilityLoading.value) {
    return
  }


  /*
   * Use selected rental duration.
   *
   * Example:
   * Sep 29 -> Oct 1
   * = 2 days
   */
  const duration =
    rentalDays.value >= 1
      ? rentalDays.value
      : 1


  availabilityLoading.value = true

  showResults.value = true


  /*
   * Start from selected pickup date.
   * If no date exists, use today.
   */
  let searchStart =
    props.pickupDate ||
    getToday()


  searchStartDate.value =
    searchStart


  try {

    const results = []

    const blockedBookings =
      getBlockingBookings()


    let attempts = 0

    const maxResults = 5


    /*
     * Search maximum 100 days forward.
     */
    while (
      results.length < maxResults &&
      attempts < 100
    ) {

      attempts++


      const proposedReturn =
        addDays(
          searchStart,
          duration
        )


      /*
       * Check whether proposed period
       * overlaps a blocked booking.
       *
       * Same rule as backend:
       *
       * pickup < existingReturn
       * AND
       * return > existingPickup
       */
      const overlappingBooking =
        blockedBookings.find(
          booking => {

            return (
              searchStart <
                booking.returnDate &&
              proposedReturn >
                booking.pickupDate
            )
          }
        )


      /*
       * AVAILABLE
       */
      if (!overlappingBooking) {

        results.push({
          pickupDate:
            searchStart,

          returnDate:
            proposedReturn
        })


        /*
         * Move one day forward
         * to find another period.
         */
        searchStart =
          addDays(
            searchStart,
            1
          )

        continue
      }


      /*
       * BLOCKED
       *
       * Jump directly to the end
       * of the blocking booking.
       */
      if (
        overlappingBooking.returnDate >
        searchStart
      ) {

        searchStart =
          overlappingBooking.returnDate

      } else {

        searchStart =
          addDays(
            searchStart,
            1
          )

      }

    }


    availablePeriods.value =
      results

  } finally {

    availabilityLoading.value =
      false

  }

}


/* ================================================================
   OPEN SEARCH
================================================================ */

function openSearch() {
  findAvailableDates()
}


/* ================================================================
   CLOSE SEARCH
================================================================ */

function closeSearch() {
  showResults.value = false
}


/* ================================================================
   SELECT PERIOD
================================================================ */

function selectPeriod(period) {

  emit(
    'select-dates',
    {
      pickupDate:
        period.pickupDate,

      returnDate:
        period.returnDate
    }
  )


  showResults.value = false
}


/* ================================================================
   EXPOSE TO PARENT
================================================================ */

defineExpose({
  openSearch
})
</script>


<style scoped>
/* ================================================================
   MODAL TRANSITION
================================================================ */

.availability-modal-enter-active,
.availability-modal-leave-active {
  transition:
    opacity 0.2s ease;
}


.availability-modal-enter-active
> div:last-child,

.availability-modal-leave-active
> div:last-child {
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}


.availability-modal-enter-from,
.availability-modal-leave-to {
  opacity: 0;
}


.availability-modal-enter-from
> div:last-child,

.availability-modal-leave-to
> div:last-child {
  transform:
    scale(0.96)
    translateY(8px);

  opacity: 0;
}


/* ================================================================
   SCROLLBAR
================================================================ */

main::-webkit-scrollbar {
  width: 5px;
}

main::-webkit-scrollbar-track {
  background: transparent;
}

main::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.25);
  border-radius: 999px;
}

main::-webkit-scrollbar-thumb:hover {
  background: rgba(148, 163, 184, 0.4);
}
</style>