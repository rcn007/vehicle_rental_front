<template>
  <section class="min-h-screen w-full bg-[var(--background)] py-6 px-4 sm:px-6 lg:px-8 text-[var(--text)] font-[family-name:var(--font-heading)]">
    <div class="max-w-[1500px] mx-auto space-y-6 mt-20">

      <!-- ================= TOP NAVIGATION ================= -->
      <nav class="flex items-center justify-between gap-4" aria-label="Breadcrumb">
        <button
          type="button"
          @click="goBack"
          class="group inline-flex items-center gap-2.5 text-sm font-semibold text-[var(--secondary)] hover:text-[var(--text)] transition-all"
        >
          <span class="w-9 h-9 rounded-xl bg-[var(--surface)] border border-[var(--border)] group-hover:border-[var(--accent)] flex items-center justify-center transition-all">
            <i class="fa-solid fa-arrow-left text-xs transition-transform group-hover:-translate-x-0.5"></i>
          </span>
          <span class="hidden sm:inline">Back to vehicles</span>
        </button>

        <div class="hidden sm:flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
          <span>Select Vehicle</span>
          <i class="fa-solid fa-chevron-right text-[8px]"></i>
          <span class="px-3 py-1.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)]">
            Reservation
          </span>
          <i class="fa-solid fa-chevron-right text-[8px]"></i>
          <span>Payment</span>
        </div>
      </nav>

      <!-- ================= LOADING STATE ================= -->
      <div
        v-if="vehicleStore.loading"
        class="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-16 text-center shadow-xl space-y-4"
        role="status"
      >
        <div class="w-16 h-16 rounded-2xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center mx-auto">
          <i class="fa-solid fa-circle-notch fa-spin text-2xl"></i>
        </div>
        <h1 class="text-xl font-bold text-[var(--text)]">Loading your vehicle...</h1>
        <p class="text-sm text-[var(--secondary)]">Please wait while we load the vehicle details.</p>
      </div>

      <!-- ================= VEHICLE NOT FOUND ================= -->
      <div
        v-else-if="!vehicle || vehicleStore.error || !Number.isInteger(vehicleId) || vehicleId <= 0"
        class="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-16 text-center shadow-xl space-y-5"
      >
        <div class="w-16 h-16 bg-[var(--background)] border border-[var(--border)] rounded-2xl flex items-center justify-center mx-auto text-[var(--muted)] text-2xl">
          <i class="fa-solid fa-car-burst"></i>
        </div>
        <h1 class="text-2xl font-black text-[var(--text)]">Vehicle unavailable</h1>
        <p class="text-sm text-[var(--secondary)] max-w-md mx-auto leading-relaxed">
          We could not load this vehicle. Please return to the fleet and try again.
        </p>
        <button
          type="button"
          @click="goBack"
          class="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold rounded-xl transition-all shadow-lg"
        >
          <i class="fa-solid fa-arrow-left"></i>
          Back to Fleet
        </button>
      </div>

      <!-- ================= MAIN CONTENT ================= -->
      <div v-else class="max-w-5xl mx-auto space-y-6">

        <!-- VEHICLE OVERVIEW -->
        <article class="bg-[var(--surface)] border border-[var(--border)] rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12">
          
          <!-- IMAGE PANEL -->
          <div class="lg:col-span-5 bg-[var(--background)] relative p-5 sm:p-6 flex flex-col min-h-[470px] border-b lg:border-b-0 lg:border-r border-[var(--border)]">
            <div class="absolute w-[70%] h-[45%] top-[25%] left-[15%] bg-[var(--accent)] blur-[90px] opacity-10 rounded-full pointer-events-none"></div>

            <div class="relative z-10 flex items-center justify-between">
              <span class="inline-flex items-center gap-2 bg-[var(--surface)] border border-[var(--border)] text-[var(--secondary)] text-[10px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-full">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]"></span>
                Verified Fleet
              </span>
              <span class="w-9 h-9 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--muted)]">
                <i class="fa-solid fa-car-side text-xs"></i>
              </span>
            </div>

            <div class="relative z-10 flex-1 flex items-center justify-center py-8">
              <img
                :key="mainImage"
                :src="mainImage"
                :alt="vehicleName"
                @error="handleImageError"
                class="w-full h-[260px] sm:h-[300px] object-contain hover:scale-[1.04] transition-transform duration-500 drop-shadow-[0_25px_35px_rgba(0,0,0,0.65)]"
              />
            </div>

            <div class="relative z-10 border-t border-[var(--border)] pt-4 flex items-center justify-between gap-4">
              <div class="flex items-center gap-3 min-w-0">
                <div class="w-9 h-9 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shrink-0">
                  <i class="fa-solid fa-location-dot text-[var(--accent)] text-xs"></i>
                </div>
                <div class="min-w-0">
                  <p class="text-[9px] uppercase tracking-wider font-bold text-[var(--muted)]">Pickup Location</p>
                  <p class="text-[11px] font-semibold text-[var(--secondary)] truncate mt-0.5">{{ pickupStation }}</p>
                </div>
              </div>

              <span class="hidden sm:inline-flex shrink-0 text-[9px] font-bold uppercase tracking-wider text-emerald-400">
                <i class="fa-solid fa-circle-check mr-1"></i> Ready
              </span>
            </div>
          </div>

          <!-- VEHICLE INFORMATION -->
          <div class="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-7">
            <div>
              <div class="flex items-center justify-between gap-3">
                <span class="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--accent)]">
                  {{ vehicleBrand }} Collection
                </span>
                <span class="shrink-0 bg-[var(--background)] text-[var(--secondary)] px-3 py-1.5 rounded-lg text-[10px] font-bold border border-[var(--border)]">
                  {{ vehicleCategory }}
                </span>
              </div>

              <h1 class="text-3xl sm:text-4xl font-black text-[var(--text)] tracking-tight mt-3">
                {{ vehicleName }}
              </h1>

              <p class="text-sm sm:text-[15px] text-[var(--secondary)] mt-4 leading-7 max-w-2xl">
                {{ vehicle.description || 'Your next journey, thoughtfully arranged. Choose your rental dates and make this vehicle part of your plans.' }}
              </p>

              <!-- SPECIFICATIONS GRID -->
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-7 pt-6 border-t border-[var(--border)]">
                <div
                  v-for="spec in vehicleSpecs"
                  :key="spec.label"
                  class="group bg-[var(--background)] border border-[var(--border)] hover:border-[var(--border-hover)] rounded-2xl p-4 transition-all"
                >
                  <div class="w-8 h-8 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mb-3">
                    <i :class="spec.icon" class="text-xs"></i>
                  </div>
                  <p class="text-[9px] uppercase tracking-wider font-bold text-[var(--muted)]">{{ spec.label }}</p>
                  <p class="text-[11px] font-bold text-[var(--text)] truncate mt-1">{{ spec.value }}</p>
                </div>
              </div>
            </div>

            <!-- ACTION AREA -->
            <div class="pt-6 border-t border-(--border)">
<!-- Inside VEHICLE INFORMATION -> ACTION AREA -->
<button
  type="button"
  @click="scrollToRentalSchedule"
  class="w-full h-12 rounded-xl
         bg-[#141226] text-white
         font-bold text-sm
         flex items-center justify-center gap-2
         
         hover:bg-[#1E1B3A]
         active:scale-[0.99]"
>
  <i class="fa-solid fa-calendar-days"></i>
  Book This Vehicle
</button>



              <div class="grid grid-cols-2 gap-3 mt-3">
                <a
                  href="https://t.me/my_vehicle_rental_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="h-11 rounded-xl bg-[var(--background)] border border-[var(--border)] hover:border-[var(--border-hover)] hover:bg-[var(--surface-card)] flex items-center justify-center gap-2 text-xs font-bold text-[var(--text)] transition-all"
                >
                  <i class="fa-brands fa-telegram text-sm"></i> Telegram
                </a>
                <a
                  href="tel:+85512345678"
                  class="h-11 rounded-xl bg-[var(--background)] border border-[var(--border)] hover:border-[var(--border-hover)] hover:bg-[var(--surface-card)] flex items-center justify-center gap-2 text-xs font-bold text-[var(--text)] transition-all"
                >
                  <i class="fa-solid fa-phone text-xs"></i> Call Us
                </a>
              </div>
            </div>
          </div>
        </article>

        <!-- VEHICLE GALLERY -->
        <section class="bg-[var(--surface)] border border-[var(--border)] rounded-3xl overflow-hidden shadow-xl">
          <div class="px-6 py-5 border-b border-[var(--border)] flex items-center justify-between gap-4">
            <div>
              <p class="text-[9px] font-extrabold tracking-[0.18em] uppercase text-[var(--muted)]">Vehicle Gallery</p>
              <h2 class="text-lg sm:text-xl font-black text-[var(--text)] mt-1">Explore {{ vehicleName }}</h2>
            </div>
            <span class="inline-flex items-center gap-2 text-[10px] font-bold text-[var(--secondary)] bg-[var(--background)] px-3 py-2 rounded-xl border border-[var(--border)]">
              <i class="fa-regular fa-images text-[var(--accent)]"></i>
              {{ galleryImages.length }} Photos
            </span>
          </div>

          <div class="p-5 sm:p-6">
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                v-for="(image, index) in galleryImages"
                :key="image.id"
                type="button"
                @click="openGalleryImage(image)"
                class="group relative overflow-hidden rounded-2xl bg-[var(--background)] border border-[var(--border)] hover:border-[var(--accent)] aspect-[4/3] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all duration-300"
              >
                <img
                  :src="image.url"
                  :alt="`${vehicleName} - ${image.label}`"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300"></div>
                <span class="absolute top-3 left-3 w-7 h-7 rounded-lg bg-black/60 backdrop-blur-md text-white text-[10px] font-bold flex items-center justify-center border border-white/10">
                  {{ index + 1 }}
                </span>
                <span class="absolute bottom-3 right-3 w-8 h-8 rounded-lg bg-white/90 text-[#141226] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
                  <i class="fa-solid fa-expand text-xs"></i>
                </span>
                <span class="absolute bottom-3 left-3 text-white text-[10px] font-bold drop-shadow-md">
                  {{ image.label }}
                </span>
              </button>
            </div>
          </div>
        </section>

        <!-- RENTAL SCHEDULE -->
        <section id="book" class="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
          <div class="flex items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center">
                <i class="fa-regular fa-calendar-check"></i>
              </div>
              <div>
                <h2 class="text-base font-bold text-[var(--text)]">Rental Schedule</h2>
                <p class="text-[10px] text-[var(--muted)] mt-0.5">Select your pickup and return dates</p>
              </div>
            </div>

            <span class="hidden sm:inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
              <i class="fa-solid fa-check"></i> Instant Confirmation
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="block text-[10px] font-bold uppercase tracking-wider text-[var(--secondary)]">Pickup Date</label>
              <div class="relative">
                 <input
                  type="date"
                  v-model="form.pickupDate"
                  :min="today"
                  class="w-full h-12 bg-[var(--background)] border border-[var(--border)] text-[var(--text)] rounded-xl pl-11 pr-4 text-sm font-semibold focus:outline-none focus:border-[var(--accent)] transition-all"
                />
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-[10px] font-bold uppercase tracking-wider text-[var(--secondary)]">Return Date</label>
              <div class="relative">
                  <input
                  type="date"
                  v-model="form.returnDate"
                  :min="form.pickupDate || today"
                  class="w-full h-12 bg-[var(--background)] border border-[var(--border)] text-[var(--text)] rounded-xl pl-11 pr-4 text-sm font-semibold focus:outline-none focus:border-[var(--accent)] transition-all"
                />
              </div>
            </div>
          </div>

          <div v-if="scheduleError" class="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs font-semibold flex items-center gap-3">
            <i class="fa-solid fa-circle-exclamation"></i>
            <span>{{ scheduleError }}</span>
          </div>

          <div class="p-4 bg-[var(--background)] rounded-2xl border border-[var(--border)] flex items-center justify-between gap-4">
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-9 h-9 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 flex items-center justify-center shrink-0">
                <i class="fa-solid fa-location-dot text-xs"></i>
              </div>
              <div class="min-w-0">
                <span class="text-[10px] font-bold text-[var(--text)] block">Pickup Location</span>
                <span class="text-[11px] text-[var(--secondary)] truncate block mt-0.5">{{ pickupStation }}</span>
              </div>
            </div>
            <span class="hidden sm:block text-[9px] font-bold text-[var(--muted)] whitespace-nowrap">Flexible pickup</span>
          </div>
        </section>

        <!-- RESERVATION SUMMARY (MOVED HERE) -->
        <section class="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
          <div class="flex items-center justify-between pb-4 border-b border-[var(--border)]">
            <h3 class="font-bold text-base text-[var(--text)]">Reservation Summary</h3>
            <span class="text-[9px] font-extrabold uppercase tracking-wider text-[var(--accent)] bg-[var(--accent)]/10 px-2.5 py-1.5 rounded-lg border border-[var(--accent)]/20">
              Step 2 / 3
            </span>
          </div>

          <!-- Driver & Rate Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Driver Card -->
            <div class="flex items-center gap-3 p-3.5 rounded-2xl bg-[var(--background)] border border-[var(--border)]">
              <div class="w-10 h-10 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] font-extrabold flex items-center justify-center text-xs shrink-0">
                {{ initials }}
              </div>
              <div class="overflow-hidden flex-1">
                <p class="text-[9px] text-[var(--muted)] uppercase font-extrabold tracking-wider">Primary Driver</p>
                <p class="text-xs font-bold text-[var(--text)] truncate mt-1">{{ customerName }}</p>
              </div>
              <button type="button" class="text-[10px] text-[var(--accent)] hover:underline font-bold">Change</button>
            </div>

            <!-- Daily Rate -->
            <div class="p-4 rounded-2xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-between">
              <div>
                <p class="text-[10px] uppercase tracking-wider font-bold text-[var(--muted)]">Daily Rate</p>
                <p class="text-xl font-black text-[var(--text)] mt-1">{{ money(vehiclePrice) }} <span class="text-[10px] text-[var(--muted)] font-normal">/ day</span></p>
              </div>
              <div class="w-10 h-10 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center">
                <i class="fa-solid fa-tag text-xs"></i>
              </div>
            </div>
          </div>

          <!-- Availability Status -->
          <div class="flex items-center justify-between px-1">
            <span class="text-xs text-[var(--secondary)] font-semibold">Availability</span>
            <span
              class="px-3 py-1.5 rounded-full font-extrabold text-[10px] flex items-center gap-1.5"
              :class="{
                'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20': vehicleStatus === 'AVAILABLE',
                'bg-amber-500/10 text-amber-400 border border-amber-500/20': vehicleStatus === 'RESERVED' || vehicleStatus === 'RENTED',
                'bg-rose-500/10 text-rose-400 border border-rose-500/20': vehicleStatus === 'MAINTENANCE'
              }"
            >
              <span
                class="w-1.5 h-1.5 rounded-full"
                :class="{
                  'bg-emerald-400': vehicleStatus === 'AVAILABLE',
                  'bg-amber-400': vehicleStatus === 'RESERVED' || vehicleStatus === 'RENTED',
                  'bg-rose-400': vehicleStatus === 'MAINTENANCE'
                }"
              ></span>
              {{ vehicleStatusText }}
            </span>
          </div>

          <!-- Cost Breakdown -->
          <div class="pt-5 border-t border-[var(--border)] space-y-3">
            <div class="flex justify-between text-xs text-[var(--secondary)]">
              <span>Rental Duration</span>
              <span class="font-bold text-[var(--text)]">{{ rentalDays }} {{ rentalDays === 1 ? 'day' : 'days' }}</span>
            </div>
            <div class="flex justify-between text-xs text-[var(--secondary)]">
              <span>Vehicle Subtotal</span>
              <span class="font-semibold text-[var(--text)]">{{ money(total) }}</span>
            </div>
            <div class="flex justify-between text-xs text-[var(--secondary)]">
              <span>Insurance</span>
              <span class="text-emerald-400 font-bold">INCLUDED</span>
            </div>

            <div class="pt-4 mt-2 border-t border-[var(--border)] flex items-end justify-between gap-3">
              <div>
                <p class="text-xs font-bold text-[var(--text)]">Total Amount</p>
                <p class="text-[9px] text-[var(--muted)] mt-1">Before payment</p>
              </div>
              <span class="text-2xl font-black text-[var(--accent)]">{{ money(total) }}</span>
            </div>
          </div>

          <!-- CTA & Security Note -->
          <div class="space-y-3 pt-2">
            <button
              type="button"
              @click="createBooking"
              :disabled="!canBook || bookingStore.loading"
              class="w-full h-13 rounded-2xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-extrabold text-sm transition-all shadow-lg flex items-center justify-center gap-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <i v-if="bookingStore.loading" class="fa-solid fa-circle-notch fa-spin"></i>
              <i v-else class="fa-solid fa-credit-card"></i>
              <span>{{ bookingStore.loading ? 'Creating Booking...' : 'Proceed to Payment' }}</span>
              <i v-if="!bookingStore.loading" class="fa-solid fa-arrow-right text-xs"></i>
            </button>

            <div class="flex items-center justify-center gap-2.5 text-[10px] text-[var(--muted)] leading-relaxed text-center">
              <i class="fa-solid fa-shield-halved text-[var(--accent)]"></i>
              <p>Your reservation is protected. Secure payment processing is required to confirm your booking.</p>
            </div>
          </div>
        </section>

      </div>
    </div>

    <!-- GALLERY LIGHTBOX -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="selectedGalleryImage"
          class="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          @click.self="closeGalleryImage"
        >
          <div class="relative w-full max-w-5xl bg-[var(--surface)] border border-[var(--border)] rounded-3xl overflow-hidden shadow-2xl">
            <button
              type="button"
              @click="closeGalleryImage"
              class="absolute top-4 right-4 z-20 w-10 h-10 rounded-xl bg-black/60 text-white border border-white/10 backdrop-blur-md flex items-center justify-center hover:bg-black transition-colors"
            >
              <i class="fa-solid fa-xmark"></i>
            </button>

            <div class="bg-black flex items-center justify-center p-4 min-h-[300px] max-h-[75vh]">
              <img
                :src="selectedGalleryImage.url"
                :alt="`${vehicleName} - ${selectedGalleryImage.label}`"
                class="max-w-full max-h-[70vh] object-contain"
              />
            </div>

            <div class="px-6 py-5 flex items-center justify-between gap-4">
              <div>
                <p class="text-sm font-bold text-[var(--text)]">{{ selectedGalleryImage.label }}</p>
                <p class="text-[10px] text-[var(--muted)] mt-1">{{ vehicleName }}</p>
              </div>
              <button
                type="button"
                @click="closeGalleryImage"
                class="px-4 py-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--text)] text-xs font-bold hover:bg-[var(--surface-card)] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>
<script setup>
import {
  computed,
  onMounted,
  reactive,
  ref
} from 'vue'

import {
  useRoute,
  useRouter
} from 'vue-router'

// Stores
import { useVehicleStore } from '../stores/Vehicle'
import { useBookingStore } from '../stores/Booking'
import { useAuthStore } from '../stores/Auth'

// Assets & API
import heroImage from '../assets/hero.png'
import { getVehiclesImage } from '../api/vehicle.js'

const route = useRoute()
const router = useRouter()

const vehicleStore = useVehicleStore()
const bookingStore = useBookingStore()
const authStore = useAuthStore()

const vehicleImages = ref([])

const vehicleSpecs = computed(() => [
  { label: 'Gearbox', value: transmission.value, icon: 'fa-solid fa-gears' },
  { label: 'Engine', value: fuelType.value, icon: 'fa-solid fa-gas-pump' },
  { label: 'Capacity', value: `${seats.value} Seats`, icon: 'fa-solid fa-users' },
  { label: 'Class', value: vehicleCategory.value, icon: 'fa-solid fa-shield-halved' },
])

/* =========================================================
   STATIC GALLERY
   Later replace this with vehicle_image API data
========================================================= */
// const galleryImages = ref([
//   {
//     id: 1,
//     url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=85',
//     label: 'Front View'
//   },
//   {
//     id: 2,
//     url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=85',
//     label: 'Side View'
//   },
//   {
//     id: 3,
//     url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85',
//     label: 'Exterior'
//   },
//   {
//     id: 4,
//     url: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=85',
//     label: 'Interior'
//   }
// ])
const galleryImages = ref([])

const selectedGalleryImage = ref(null)

function openGalleryImage(image) {
  selectedGalleryImage.value = image
}

function closeGalleryImage() {
  selectedGalleryImage.value = null
}


/* =========================================================
   MAIN IMAGE
========================================================= */
const mainImage = computed(() => {
  const image = vehicle.value?.mainImage

  if (!image) {
    return heroImage
  }

  if (
    image.startsWith('http://') ||
    image.startsWith('https://') ||
    image.startsWith('data:')
  ) {
    return image
  }

  return `http://localhost:8080${
    image.startsWith('/') ? image : `/${image}`
  }`
})

/* =========================================================
   DATE HELPERS
========================================================= */
function localDate(offset = 0) {
  const date = new Date()

  date.setDate(date.getDate() + offset)

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0')
  ].join('-')
}

const today = localDate()

const form = reactive({
  pickupDate: localDate(1),
  returnDate: localDate(4)
})

/* =========================================================
   COMPUTED VEHICLE VALUES
========================================================= */
const vehicleId = computed(() => Number(route.params.vehicleId))

const vehicle = computed(() => vehicleStore.vehicle)

const vehicleName = computed(() => {
  const v = vehicle.value

  return (
    v?.name ||
    v?.vehicleName ||
    v?.model ||
    'Premium Vehicle'
  )
})

const vehicleBrand = computed(() => {
  const v = vehicle.value

  if (!v) return 'Vehicle'

  const brand = v.brand

  if (typeof brand === 'string') {
    return brand
  }

  if (brand && typeof brand === 'object') {
    return (
      brand.brandName ||
      brand.name ||
      brand.brand_name ||
      brand.make ||
      'Vehicle'
    )
  }

  return (
    v.brandName ||
    v.brand_name ||
    v.make ||
    'Vehicle'
  )
})
function scrollToRentalSchedule() {
  const section = document.getElementById('book')

  if (!section) return

  section.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}

const vehicleCategory = computed(() => {
  const v = vehicle.value

  if (!v) return 'Rental'

  const category = v.category

  if (typeof category === 'string') {
    return category
  }

  if (category && typeof category === 'object') {
    return (
      category.categoryName ||
      category.name ||
      category.category_name ||
      category.type ||
      'Rental'
    )
  }

  return (
    v.categoryName ||
    v.category_name ||
    v.type ||
    'Rental'
  )
})

const vehiclePrice = computed(() => {
  const v = vehicle.value

  return (
    v?.pricePerDay ??
    v?.price_per_day ??
    v?.price ??
    v?.rentalPrice ??
    0
  )
})

const fuelType = computed(() => {
  const v = vehicle.value

  return (
    v?.fuelType ||
    v?.fuel_type ||
    v?.fuel ||
    'Gasoline'
  )
})

const transmission = computed(() => {
  const v = vehicle.value

  return (
    v?.transmission ||
    v?.transmissionType ||
    v?.transmission_type ||
    'Automatic'
  )
})

const seats = computed(() => {
  const v = vehicle.value

  return (
    v?.seats ??
    v?.seat ??
    v?.numberOfSeats ??
    4
  )
})

const vehicleStatus = computed(() => {
  return String(
    vehicle.value?.status || ''
  ).toUpperCase()
})

const vehicleStatusText = computed(() => {
  switch (vehicleStatus.value) {
    case 'AVAILABLE':
      return 'Available'

    case 'RENTED':
      return 'Rented'

    case 'MAINTENANCE':
      return 'Maintenance'

    case 'RESERVED':
      return 'Reserved'

    default:
      return 'Unknown'
  }
})

/* =========================================================
   RENTAL CALCULATIONS
========================================================= */
const rentalDays = computed(() => {
  if (
    !form.pickupDate ||
    !form.returnDate
  ) {
    return 0
  }

  const pickup = Date.parse(
    form.pickupDate
  )

  const returnDate = Date.parse(
    form.returnDate
  )

  const days =
    (returnDate - pickup) / 86400000

  return Number.isFinite(days)
    ? Math.max(0, Math.ceil(days))
    : 0
})

const scheduleError = computed(() => {
  if (
    !form.pickupDate ||
    !form.returnDate
  ) {
    return 'Choose both rental dates.'
  }

  if (form.pickupDate < today) {
    return 'Pickup date cannot be in the past.'
  }

  if (rentalDays.value < 1) {
    return 'Return date must be after pickup date.'
  }

  return ''
})

const total = computed(() => {
  return (
    Math.max(
      0,
      Number(vehiclePrice.value) || 0
    ) * rentalDays.value
  )
})

const canBook = computed(() => {
  return (
    !scheduleError.value &&
    vehicleStatus.value === 'AVAILABLE' &&
    Number(vehiclePrice.value) > 0
  )
})

const money = (value) => {
  return new Intl.NumberFormat(
    'en-US',
    {
      style: 'currency',
      currency: 'USD'
    }
  ).format(Number(value) || 0)
}

/* =========================================================
   CUSTOMER
========================================================= */
const customerName = computed(() => {
  return (
    authStore.user?.name ||
    authStore.user?.fullName ||
    authStore.user?.username ||
    'Guest driver'
  )
})

const initials = computed(() => {
  return customerName.value
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase()
})

/* =========================================================
   PICKUP STATION
========================================================= */
const pickupStation = computed(() => {
  const location = vehicle.value?.location

  if (typeof location === 'string') {
    return location
  }

  return (
    location?.name ||
    location?.address ||
    'Contact our team to arrange your pickup'
  )
})

/* =========================================================
   IMAGE FORMATTERS
========================================================= */
function formatImageUrl(rawPath) {
  if (
    !rawPath ||
    typeof rawPath !== 'string'
  ) {
    return null
  }

  const path = rawPath.trim()

  if (!path) {
    return null
  }

  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:')
  ) {
    return path
  }

  const cleanPath =
    path.startsWith('/')
      ? path
      : `/${path}`

  return `http://localhost:8080${cleanPath}`
}

/* =========================================================
   VEHICLE IMAGE
========================================================= */
const vehicleImage = computed(() => {
  const currentVehicle = vehicle.value

  if (!currentVehicle) {
    return heroImage
  }

  if (
    Array.isArray(
      currentVehicle.vehicleImages
    ) &&
    currentVehicle.vehicleImages.length > 0
  ) {
    const imageObject =
      currentVehicle.vehicleImages[0]

    const raw =
      typeof imageObject === 'string'
        ? imageObject
        : (
            imageObject?.image ||
            imageObject?.imageUrl ||
            imageObject?.url ||
            imageObject?.path ||
            imageObject?.imagePath
          )

    const formatted =
      formatImageUrl(raw)

    if (formatted) {
      return formatted
    }
  }

  const directPath =
    currentVehicle.image ||
    currentVehicle.imageUrl ||
    currentVehicle.imagePath

  if (
    typeof directPath === 'string' &&
    directPath.trim()
  ) {
    const formatted =
      formatImageUrl(directPath)

    if (formatted) {
      return formatted
    }
  }

  if (
    Array.isArray(vehicleImages.value) &&
    vehicleImages.value.length > 0
  ) {
    const currentVehicleId =
      Number(currentVehicle.id)

    const matchById =
      vehicleImages.value.find(image => {
        const imageVehicleId =
          Number(
            image.vehicle_id ??
            image.vehicleId ??
            image.vehicle?.id ??
            image.vehicle?.vehicleId
          )

        return (
          imageVehicleId &&
          imageVehicleId === currentVehicleId
        )
      })

    if (matchById) {
      const raw =
        matchById.image ||
        matchById.imageUrl ||
        matchById.url ||
        matchById.path ||
        matchById.imagePath

      const formatted =
        formatImageUrl(raw)

      if (formatted) {
        return formatted
      }
    }
  }

  return heroImage
})

/* =========================================================
   IMAGE ERROR
========================================================= */
function handleImageError(event) {
  if (
    !event?.target ||
    event.target.dataset.fallback === 'true'
  ) {
    return
  }

  event.target.dataset.fallback = 'true'
  event.target.src = heroImage
}

/* =========================================================
   FETCH VEHICLE IMAGES
========================================================= */
async function fetchVehicleImages() {
  try {
    const response = await getVehiclesImage()

    console.log('=================================')
    console.log('VEHICLE IMAGE API RESPONSE:', response)
    console.log('CURRENT VEHICLE ID:', vehicleId.value)
    console.log('=================================')

    /*
     * Your API helper may already return response.data,
     * so support all common response structures.
     */
    const data =
      response?.data?.data ??
      response?.data ??
      response

    const images = Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
        ? data.data
        : []

    console.log('ALL VEHICLE IMAGE ROWS:', images)

    const currentVehicleId = Number(vehicleId.value)

    const matchedImages = images.filter(image => {
      const imageVehicleId =
        image?.vehicle_id ??
        image?.vehicleId ??
        image?.vehicle?.id ??
        image?.vehicle?.vehicleId

      console.log('Checking vehicle image:', {
        imageId: image?.id,
        imageVehicleId,
        currentVehicleId
      })

      return (
        imageVehicleId != null &&
        Number(imageVehicleId) === currentVehicleId
      )
    })

    console.log(
      'MATCHED IMAGES FOR VEHICLE:',
      matchedImages
    )

    galleryImages.value = matchedImages
      .slice(0, 4)
      .map((image, index) => {
        const rawImage =
          image?.image_url ??
          image?.imageUrl ??
          image?.image ??
          image?.url ??
          image?.path ??
          image?.imagePath

        const imageUrl = formatImageUrl(rawImage)

        console.log('MAPPING GALLERY IMAGE:', {
          id: image?.id,
          rawImage,
          imageUrl
        })

        if (!imageUrl) {
          return null
        }

        return {
          id: image.id,
          url: imageUrl,
          label: [
            'Front View',
            'Side View',
            'Exterior',
            'Interior'
          ][index] || `Vehicle Photo ${index + 1}`
        }
      })
      .filter(Boolean)

    console.log(
      'FINAL DETAIL GALLERY:',
      galleryImages.value
    )

  } catch (error) {
    console.error(
      'FAILED TO FETCH VEHICLE GALLERY:',
      error
    )

    galleryImages.value = []
  }
}
/* =========================================================
   CREATE BOOKING
========================================================= */
async function createBooking() {
  if (
    !canBook.value ||
    bookingStore.loading
  ) {
    return
  }

  try {
    let userId =
      Number(authStore.user?.id)

    if (!userId) {
      const storedUser =
        localStorage.getItem('user')

      if (storedUser) {
        try {
          const parsedUser =
            JSON.parse(storedUser)

          userId =
            Number(parsedUser?.id)
        } catch (error) {
          console.error(
            'Invalid stored user:',
            error
          )
        }
      }
    }

    if (
      !Number.isInteger(userId) ||
      userId <= 0
    ) {
      alert(
        'Please login before booking a vehicle.'
      )

      router.push({
        name: 'login',
        query: {
          redirect: route.fullPath
        }
      })

      return
    }

    const id = vehicleId.value

    if (
      !Number.isInteger(id) ||
      id <= 0
    ) {
      throw new Error(
        'Invalid vehicle.'
      )
    }

    const booking =
      await bookingStore.createBooking({
        userId,
        vehicleId: id,
        pickupDate:
          form.pickupDate,
        returnDate:
          form.returnDate
      })

    const bookingId =
      booking?.id ||
      booking?.bookingId

    if (!bookingId) {
      throw new Error(
        'Booking was created without an id.'
      )
    }

    router.push(
      `/payment/${bookingId}`
    )

  } catch (error) {
    console.error(
      'Create booking error:',
      error
    )

    alert(
      error?.response?.data?.message ||
      error?.message ||
      'Failed to create booking'
    )
  }
}

/* =========================================================
   BACK
========================================================= */
function goBack() {
  router.back()
}

/* =========================================================
   ON MOUNT
========================================================= */
onMounted(async () => {
  if (
    !Number.isInteger(vehicleId.value) ||
    vehicleId.value <= 0
  ) {
    console.error(
      'Invalid vehicle ID:',
      route.params.vehicleId
    )

    return
  }

  try {
    await Promise.all([
      vehicleStore.fetchVehicle(
        vehicleId.value
      ),
      fetchVehicleImages()
    ])
  } catch (error) {
    console.error(
      'Failed to fetch vehicle detail:',
      error
    )
  }
})
</script>