<template>
  <div
    class="min-h-screen bg-[var(--background)] font-sans text-[var(--text)] p-4 sm:p-6 lg:p-10 antialiased transition-colors duration-200"
  >
    <div class="max-w-[1320px] mx-auto space-y-6">

      <!-- =========================================================
            TOP HEADER
      ========================================================== -->
      <header class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-[var(--text)] tracking-tight">
            My Bookings
          </h1>
          <p class="text-base sm:text-lg text-[var(--secondary)] mt-0.5">
            Manage your upcoming and active vehicle rentals.
          </p>
        </div>
      </header>

      <!-- =========================================================
            SUMMARY METRICS
      ========================================================== -->
      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          class="bg-[var(--surface)] p-4 sm:p-5 rounded-[var(--radius-lg)] border border-[var(--border)] shadow-sm flex flex-col justify-between h-28 relative"
        >
          <div class="flex justify-between items-start">
            <span class="text-[13px] font-bold uppercase tracking-wider text-[var(--text)]">
              Total Bookings
            </span>
            <i class="fa-solid fa-car-side text-[var(--muted)] text-sm"></i>
          </div>
          <div class="text-2xl sm:text-3xl font-black text-[var(--text)]">
            {{ bookings.length }}
          </div>
        </div>

        <div
          class="bg-[var(--surface)] p-4 sm:p-5 rounded-[var(--radius-lg)] border border-[var(--border)] shadow-sm flex flex-col justify-between h-28 relative"
        >
          <div class="flex justify-between items-start">
            <span class="text-[13px] font-bold uppercase tracking-wider text-[var(--text)]">
              Active Now
            </span>
            <span
              class="px-2 py-0.5 rounded-full bg-[var(--success)]/10 text-[var(--success)] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-[var(--success)]"></span>
              Live
            </span>
          </div>
          <div class="text-2xl sm:text-3xl font-black text-[var(--text)]">
            {{ activeBookings.length }}
          </div>
        </div>

        <div
          class="bg-[var(--surface)] p-4 sm:p-5 rounded-[var(--radius-lg)] border border-[var(--border)] shadow-sm flex flex-col justify-between h-28 relative"
        >
          <div class="flex justify-between items-start">
            <span class="text-[13px] font-bold uppercase tracking-wider text-[var(--text)]">
              Upcoming
            </span>
            <i class="fa-regular fa-calendar-check text-[var(--muted)] text-sm"></i>
          </div>
          <div class="text-2xl sm:text-3xl font-black text-[var(--text)]">
            {{ upcomingBookings.length }}
          </div>
        </div>

        <div
          class="bg-[var(--surface)] p-4 sm:p-5 rounded-[var(--radius-lg)] border border-[var(--border)] shadow-sm flex flex-col justify-between h-28 relative"
        >
          <div class="flex justify-between items-start">
            <span class="text-[13px] font-bold uppercase tracking-wider text-[var(--text)]">
              Payment Due
            </span>
            <span
              class="px-2 py-0.5 rounded-full bg-[var(--danger)]/10 text-[var(--danger)] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"
            >
              <i class="fa-solid fa-clock text-[9px]"></i>
              Expiring
            </span>
          </div>
          <div class="text-2xl sm:text-3xl font-black text-[var(--danger)]">
            {{ pendingBookings.length }}
          </div>
        </div>
      </section>

      <!-- =========================================================
            FILTER & SEARCH
      ========================================================== -->
      <section
        class="bg-[var(--surface)] p-2.5 sm:p-3 rounded-[var(--radius-lg)] border border-[var(--border)] shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-3"
      >
        <div class="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0 no-scrollbar">
          <button
            v-for="tab in filterTabs"
            :key="tab.label"
            @click="activeTab = tab.label"
            :class="[
              activeTab === tab.label
                ? 'bg-[var(--accent)] text-white shadow-sm'
                : 'bg-transparent text-[var(--secondary)] hover:text-[var(--text)] hover:bg-[var(--background)]',
              'px-3.5 py-1.5 rounded-[var(--radius-md)] text-sm font-bold whitespace-nowrap transition-all cursor-pointer'
            ]"
          >
            {{ tab.label }} ({{ tab.count }})
          </button>
        </div>

        <div class="flex items-center gap-2">
          <div class="relative flex-1 sm:w-72">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search booking ID, model..."
              class="w-full pl-3 pr-3 py-1.5 bg-[var(--background)] border border-[var(--border)] rounded-[var(--radius-md)] text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-all"
            />
          </div>
        </div>
      </section>

      <!-- =========================================================
            ACTIVE DEPLOYMENT SECTION
      ========================================================== -->
      <section v-if="activeBookings.length > 0" class="space-y-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse"></span>
            <h2 class="text-sm font-bold uppercase tracking-wider text-[var(--text)]">
              Active Deployment
            </h2>
            <span
              v-if="activeBookings.length > 1"
              class="ml-2 px-2 py-0.5 text-[10px] font-extrabold bg-[#10B981]/10 text-[#10B981] rounded-full border border-[#10B981]/30"
            >
              {{ currentIndex + 1 }} of {{ activeBookings.length }}
            </span>
          </div>

          <div class="flex items-center gap-3">
            <span
              class="hidden sm:inline-block text-[11px] font-bold text-[var(--muted)] uppercase tracking-wider"
            >
              TELEMETRY LINK STABILIZED
            </span>

            <div v-if="activeBookings.length > 1" class="flex items-center gap-1 bg-[var(--surface)] p-1 rounded-lg border border-[var(--border)]">
              <button
                type="button"
                @click="prevBooking"
                class="p-1 text-xs hover:bg-[var(--background)] rounded text-[var(--text)] transition-colors"
                title="Previous Vehicle"
              >
                <i class="fa-solid fa-chevron-left"></i>
              </button>
              <button
                type="button"
                @click="nextBooking"
                class="p-1 text-xs hover:bg-[var(--background)] rounded text-[var(--text)] transition-colors"
                title="Next Vehicle"
              >
                <i class="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>

        <div
          class="max-w-full w-full border-t-4 border-[#10B981] bg-[var(--surface)] rounded-xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 text-[var(--text)]"
        >
          <div
            class="lg:col-span-5 p-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[var(--border)] bg-[var(--background)] relative group"
          >
            <div class="flex justify-between items-center gap-3 z-10">
              <span
                class="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--surface)] rounded-full text-xs font-semibold text-[var(--text)] shadow-sm border border-[var(--border)]"
              >
                <span class="w-2 h-2 rounded-full bg-[#10B981]"></span>
                ACTIVE RENTAL #VR-{{ String(currentBooking.id || 0).padStart(5, '0') }}
              </span>

              <span class="px-3 py-1 bg-[#1E1B3A] text-white text-xs font-semibold rounded-md shadow-sm whitespace-nowrap">
                {{ getReturnCountdown(currentBooking.returnDate) }}
              </span>
            </div>

            <div class="my-6 relative flex justify-center items-center min-h-[220px]">
              <img
                :key="currentBooking.id"
                :src="getVehicleImage(currentBooking)"
                :alt="currentBooking.vehicleName || 'Vehicle'"
                @error="handleImageError"
                class="w-full max-w-sm h-[220px] object-contain rounded-lg mix-blend-multiply drop-shadow-md hover:scale-105 transition-transform duration-300 px-8"
              />
            </div>
          </div>

          <div class="lg:col-span-7 p-6 flex flex-col justify-between">
            <div class="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <p class="text-xs font-bold tracking-wider text-[var(--muted)] uppercase">
                  AURUM EXECUTIVE FLEET
                </p>
                <h2 class="text-2xl font-black text-[var(--text)] mt-1">
                  {{ currentBooking.vehicleName || 'Vehicle' }}
                </h2>
                <p class="text-xs font-medium text-[var(--secondary)] mt-1">
                  Vehicle ID #{{ currentBooking.vehicleId }}
                </p>
              </div>

              <div class="bg-[var(--background)] p-3.5 rounded-xl text-right border border-[var(--border)] min-w-[140px]">
                <p class="text-[10px] font-bold text-[var(--muted)] tracking-wider uppercase">
                  BILLING SUMMARY
                </p>
                <div class="flex items-baseline justify-end gap-0.5 mt-0.5">
                  <span class="text-2xl font-black text-[var(--text)]">
                    ${{ getDailyRate(currentBooking) }}
                  </span>
                  <span class="text-xs font-semibold text-[var(--muted)]">/day</span>
                </div>
                <p class="text-xs font-bold text-[#10B981] mt-0.5">
                  Total Paid ${{ formatPrice(currentBooking.totalPrice) }}
                </p>
              </div>
            </div>

            <div class="bg-[var(--background)] border border-[var(--border)] rounded-2xl p-4 my-4">
              <div class="flex justify-between items-center mb-3">
                <span class="text-xs font-bold text-[var(--text)]">Journey Progression</span>
                <span class="text-xs font-bold text-[#10B981] flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                  IN PROGRESS ({{ getProgress(currentBooking) }}%)
                </span>
              </div>

              <div class="w-full bg-[var(--border)] h-2 rounded-full overflow-hidden mb-4">
                <div
                  class="bg-gray-900 h-full rounded-full transition-all duration-500"
                  :style="{ width: `${getProgress(currentBooking)}%` }"
                ></div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div class="flex items-start gap-2.5">
                  <div class="p-1 rounded-full text-[#10B981] bg-emerald-100/60 mt-0.5">
                    <i class="fa-solid fa-circle-check w-4 h-4"></i>
                  </div>
                  <div>
                    <p class="text-[10px] font-bold text-[var(--muted)] uppercase">PICKUP COMPLETED</p>
                    <p class="text-xs font-bold text-[var(--text)]">
                      {{ formatDateTime(currentBooking.pickupDate) }}
                    </p>
                    <p class="text-[11px] text-[var(--secondary)] font-medium">Rental Start</p>
                  </div>
                </div>

                <div class="flex items-start gap-2.5">
                  <div class="p-1 rounded-full text-[#10B981] bg-emerald-100/60 mt-0.5">
                    <i class="fa-solid fa-location-crosshairs w-4 h-4"></i>
                  </div>
                  <div>
                    <p class="text-[10px] font-bold text-[var(--muted)] uppercase">IN TRANSIT</p>
                    <p class="text-xs font-bold text-[var(--text)]">Telemetry Active</p>
                    <p class="text-[11px] text-[var(--secondary)] font-medium">Vehicle Assigned</p>
                  </div>
                </div>

                <div class="flex items-start gap-2.5">
                  <div class="p-1 rounded-full text-[var(--muted)] bg-[var(--border)]/60 mt-0.5">
                    <i class="fa-regular fa-clock w-4 h-4"></i>
                  </div>
                  <div>
                    <p class="text-[10px] font-bold text-[var(--muted)] uppercase">SCHEDULED RETURN</p>
                    <p class="text-xs font-bold text-[var(--text)]">
                      {{ formatDateTime(currentBooking.returnDate) }}
                    </p>
                    <p class="text-[11px] text-[var(--secondary)] font-medium">Rental End</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div class="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <div class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--background)] text-[var(--secondary)] text-xs font-bold rounded-lg border border-[var(--border)]">
                  <i class="fa-solid fa-shield-halved text-[#10B981]"></i> Rental Active
                </div>
                <div class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--background)] text-[var(--secondary)] text-xs font-bold rounded-lg border border-[var(--border)]">
                  <i class="fa-solid fa-calendar-days text-[var(--muted)]"></i> {{ currentBooking.totalDays || 0 }} Days
                </div>
                <div v-if="currentBooking.seats" class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--background)] text-[var(--secondary)] text-xs font-bold rounded-lg border border-[var(--border)]">
                  <i class="fa-solid fa-user text-[var(--muted)]"></i> {{ currentBooking.seats }} Seats
                </div>
                <div class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--background)] text-[var(--secondary)] text-xs font-bold rounded-lg border border-[var(--border)]">
                  <i class="fa-solid fa-receipt text-[var(--muted)]"></i> ${{ formatPrice(currentBooking.totalPrice) }}
                </div>
              </div>

              <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  @click="viewBookingDetails(currentBooking.id)"
                  class="px-4 py-2.5 bg-[#141226] hover:bg-[#1E1B3A] text-white text-xs font-bold rounded-md flex items-center gap-1.5 transition-all shadow-sm"
                >
                  View Details
                  <i class="fa-solid fa-arrow-right text-[10px]"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- =========================================================
            SCHEDULED & RECENT ACTIVITY
      ========================================================== -->
      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-xl font-bold text-[var(--text)]">
              Scheduled & Recent Activity
            </h2>
            <p class="text-xs text-[var(--secondary)]">
              Archived and forthcoming contract allocations
            </p>
          </div>

          <span class="text-[11px] font-bold text-[var(--muted)] uppercase tracking-wider">
            {{ filteredBookings.length }} RECORDS
          </span>
        </div>

        <div v-if="loading" class="text-center py-12 text-[var(--muted)] text-sm">
          <i class="fa-solid fa-spinner animate-spin text-lg mb-2 block"></i>
          Loading your allocations...
        </div>

        <div
          v-else-if="error"
          class="text-center py-8 text-[var(--danger)] text-sm bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)]"
        >
          {{ error }}
        </div>

        <div
          v-else-if="filteredBookings.length === 0"
          class="text-center py-12 text-[var(--secondary)] text-sm bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)]"
        >
          No vehicle allocations found matching your filter criteria.
        </div>

        <!-- Booking Cards Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="booking in paginatedBookings"
            :key="booking.id"
            class="bg-[var(--surface)] rounded-[var(--radius-lg)] border p-5 shadow-sm flex flex-col justify-between space-y-4 transition-all"
            :class="
              normalizeStatus(booking.status) === 'PENDING'
                ? 'border-2 border-[var(--danger)]/30 hover:border-[var(--danger)]'
                : 'border-[var(--border)] hover:border-[var(--accent)]'
            "
          >
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span
                  class="px-2 py-0.5 rounded-[var(--radius-sm)] text-[10px] font-extrabold uppercase"
                  :class="
                    normalizeStatus(booking.status) === 'PENDING'
                      ? 'bg-[var(--danger)]/10 border border-[var(--danger)]/20 text-[var(--danger)]'
                      : 'bg-[var(--background)] border border-[var(--border)] text-[var(--muted)]'
                  "
                >
                  {{ normalizeStatus(booking.status) }} #VR-{{ String(booking.id).padStart(5, '0') }}
                </span>

                <span class="text-[11px] font-bold flex items-center gap-1" :class="getStatusClass(booking.status)">
                  <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
                  {{ formatStatus(booking.status) }}
                </span>
              </div>

              <div>
                <h3 class="text-base font-extrabold text-[var(--text)]">
                  {{ booking.vehicleName || 'Vehicle' }}
                </h3>
                <p class="text-xs text-[var(--secondary)]">
                  Vehicle ID #{{ booking.vehicleId }}
                </p>
              </div>

              <div class="bg-[var(--background)] p-3 rounded-[var(--radius-md)] border border-[var(--border)] space-y-1.5 text-xs">
                <div class="flex justify-between gap-3">
                  <span class="text-[var(--muted)] flex items-center gap-1.5">
                    <i class="fa-regular fa-calendar text-[10px]"></i> Schedule
                  </span>
                  <span class="font-bold text-[var(--text)] text-right">
                    {{ formatDate(booking.pickupDate) }} - {{ formatDate(booking.returnDate) }}
                  </span>
                </div>

                <div class="flex justify-between">
                  <span class="text-[var(--muted)] flex items-center gap-1.5">
                    <i class="fa-solid fa-receipt text-[10px]"></i> Billing
                  </span>
                  <span
                    class="font-bold"
                    :class="normalizeStatus(booking.status) === 'PENDING' ? 'text-[var(--danger)]' : 'text-[var(--success)]'"
                  >
                    ${{ formatPrice(booking.totalPrice) }}
                  </span>
                </div>

                <div class="flex justify-between">
                  <span class="text-[var(--muted)] flex items-center gap-1.5">
                    <i class="fa-solid fa-calendar-days text-[10px]"></i> Duration
                  </span>
                  <span class="font-bold text-[var(--text)]">
                    {{ booking.totalDays }} days
                  </span>
                </div>
              </div>

              <div
                v-if="normalizeStatus(booking.status) === 'PENDING'"
                class="bg-[var(--danger)]/10 text-[var(--danger)] p-2 rounded-[var(--radius-md)] text-[11px] font-bold flex items-center justify-center gap-1.5"
              >
                <i class="fa-solid fa-hourglass-half text-[10px]"></i> Payment required
              </div>
            </div>

            <!-- Actions -->
            <div
              class="grid gap-2 pt-2 border-t border-[var(--border)]"
              :class="normalizeStatus(booking.status) === 'PENDING' ? 'grid-cols-3' : 'grid-cols-2'"
            >
              <button
                v-if="normalizeStatus(booking.status) !== 'CANCELLED'"
                @click.stop="openCancelModal(booking)"
                class="py-2 px-3 bg-[var(--background)] hover:bg-red-50 hover:text-[var(--danger)] hover:border-[var(--danger)]/30 border border-[var(--border)] text-[var(--text)] text-xs font-bold rounded-[var(--radius-md)] transition-all cursor-pointer text-center"
              >
                Cancel
              </button>

              <button
                v-if="normalizeStatus(booking.status) === 'PENDING'"
                @click.stop="goToPayment(booking.id)"
                class="col-span-2 py-2 px-3 bg-[var(--danger)] hover:bg-red-700 text-white text-xs font-bold rounded-[var(--radius-md)] transition-all cursor-pointer text-center"
              >
                Complete Payment
              </button>

              <button
                v-else
                @click.stop="viewBookingDetails(booking.id)"
                class="py-2 px-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold rounded-[var(--radius-md)] transition-all cursor-pointer text-center"
              >
                View Details
              </button>
              <button
                v-if="normalizeStatus(booking.status) !== 'CANCELLED'"
                @click.stop="goToReceipt(booking.id)"
                class="py-2 px-3 bg-[var(--background)] hover:bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] text-xs font-bold rounded-[var(--radius-md)] transition-all cursor-pointer text-center flex items-center justify-center gap-1.5"
              >
                <i class="fa-solid fa-receipt text-[10px]"></i>
                Receipt
              </button>
            </div>
          </div>
        </div>

        <!-- Pagination Controls -->
        <div
          v-if="filteredBookings.length > 0 && totalPages > 1"
          class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[var(--border)] bg-[var(--surface)] p-4 rounded-[var(--radius-lg)] border"
        >
          <div class="text-xs text-[var(--muted)] font-medium">
            Showing <span class="font-bold text-[var(--text)]">{{ startIndex + 1 }}</span>
            to <span class="font-bold text-[var(--text)]">{{ Math.min(endIndex, filteredBookings.length) }}</span>
            of <span class="font-bold text-[var(--text)]">{{ filteredBookings.length }}</span> items
          </div>

          <div class="flex items-center gap-1.5">
            <button
              @click="goToPage(1)"
              :disabled="currentPage === 1"
              class="px-2.5 py-1.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--background)] text-xs font-semibold hover:bg-[var(--surface)] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <i class="fa-solid fa-angles-left"></i>
            </button>

            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-3 py-1.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--background)] text-xs font-semibold hover:bg-[var(--surface)] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Prev
            </button>

            <button
              v-for="page in visiblePageNumbers"
              :key="page"
              @click="goToPage(page)"
              :class="[
                currentPage === page
                  ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                  : 'bg-[var(--background)] text-[var(--text)] border-[var(--border)] hover:bg-[var(--surface)]',
                'px-3 py-1.5 rounded-[var(--radius-md)] border text-xs font-bold transition-all'
              ]"
            >
              {{ page }}
            </button>

            <button
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-3 py-1.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--background)] text-xs font-semibold hover:bg-[var(--surface)] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>

            <button
              @click="goToPage(totalPages)"
              :disabled="currentPage === totalPages"
              class="px-2.5 py-1.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--background)] text-xs font-semibold hover:bg-[var(--surface)] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <i class="fa-solid fa-angles-right"></i>
            </button>
          </div>
        </div>
      </section>

    </div>

    <!-- =========================================================
          CUSTOM CANCEL CONFIRMATION MODAL (POPUP BOX)
    ========================================================== -->
    <Teleport to="body">
      <div
        v-if="showCancelModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity"
      >
        <div
          class="bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150"
        >
          <div class="flex items-center gap-3 text-red-500">
            <div class="p-2.5 bg-red-100 rounded-full">
              <i class="fa-solid fa-triangle-exclamation text-xl"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-[var(--text)]">Cancel Booking</h3>
              <p class="text-xs text-[var(--secondary)]">VR-{{ String(selectedBookingToCancel?.id || 0).padStart(5, '0') }}</p>
            </div>
          </div>

          <p class="text-sm text-[var(--secondary)]">
            Are you sure you want to cancel the reservation for 
            <strong class="text-[var(--text)]">{{ selectedBookingToCancel?.vehicleName || 'this vehicle' }}</strong>? 
            This action cannot be undone.
          </p>

          <div class="flex justify-end gap-3 pt-2">
            <button
              type="button"
              @click="closeCancelModal"
              :disabled="cancelling"
              class="px-4 py-2 bg-[var(--background)] hover:bg-[var(--border)] text-[var(--text)] text-xs font-bold rounded-lg transition-colors border border-[var(--border)]"
            >
              Keep Booking
            </button>

            <button
              type="button"
              @click="confirmCancelBooking"
              :disabled="cancelling"
              class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2"
            >
              <i v-if="cancelling" class="fa-solid fa-spinner animate-spin"></i>
              {{ cancelling ? 'Cancelling...' : 'Yes, Cancel' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { getMyBookings, deleteBooking} from '../api/booking'
import { getVehicles } from '../api/vehicle'

const router = useRouter()

/* =========================================================
   STATE
========================================================= */
const bookings = ref([])
const vehicles = ref([])

const loading = ref(true)
const error = ref('')

const activeTab = ref('All')
const searchQuery = ref('')
const sortBy = ref('newest')

/* =========================================================
   POPUP MODAL STATE
========================================================= */
const showCancelModal = ref(false)
const selectedBookingToCancel = ref(null)
const cancelling = ref(false)

/* =========================================================
   PAGINATION STATE
========================================================= */
const currentPage = ref(1)
const pageSize = ref(6)

/* =========================================================
   CAROUSEL STATE
========================================================= */
const currentIndex = ref(0)

const currentBooking = computed(() => {
  return activeBookings.value[currentIndex.value] || activeBookings.value[0] || {}
})

const nextBooking = () => {
  if (activeBookings.value.length === 0) return
  currentIndex.value = (currentIndex.value + 1) % activeBookings.value.length
}

const prevBooking = () => {
  if (activeBookings.value.length === 0) return
  currentIndex.value =
    currentIndex.value === 0 ? activeBookings.value.length - 1 : currentIndex.value - 1
}
const goToReceipt = (bookingId) => {
  if (bookingId) {
    router.push(`/receipt/${bookingId}`)
  }
}

/* =========================================================
   CANCEL MODAL HANDLERS
========================================================= */
const openCancelModal = (booking) => {
  selectedBookingToCancel.value = booking
  showCancelModal.value = true
}

const closeCancelModal = () => {
  showCancelModal.value = false
  selectedBookingToCancel.value = null
}

const confirmCancelBooking = async () => {
  if (!selectedBookingToCancel.value?.id) return

  cancelling.value = true
  try {
    await deleteBooking(selectedBookingToCancel.value.id)
    closeCancelModal()
    await loadBookings()
  } catch (err) {
    console.error('Failed to cancel booking:', err)
    alert(err?.response?.data?.message || 'Failed to cancel the booking.')
  } finally {
    cancelling.value = false
  }
}

const goToPayment = (bookingId) => {
  if (bookingId) {
    router.push(`/payment/${bookingId}`)
  }
}

/* =========================================================
   DURATION COMPUTATION
========================================================= */
const calculateDays = (pickup, returnDate) => {
  if (!pickup || !returnDate) return 1
  const start = new Date(pickup)
  const end = new Date(returnDate)
  const diffTime = Math.abs(end - start)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays > 0 ? diffDays : 1
}

const processBookingData = (data) => {
  if (!data) return null
  const totalDays =
    Number(data.totalDays) > 0
      ? Number(data.totalDays)
      : calculateDays(data.pickupDate, data.returnDate)

  return {
    ...data,
    totalDays
  }
}

/* =========================================================
   FILTER TABS
========================================================= */
const filterTabs = computed(() => [
  { label: 'All', count: bookings.value.length },
  { label: 'Active', count: activeBookings.value.length },
  { label: 'Upcoming', count: upcomingBookings.value.length },
  { label: 'Pending', count: pendingBookings.value.length },
  { label: 'Cancelled', count: cancelledBookings.value.length }
])

/* =========================================================
   IMAGE UTILITIES
========================================================= */
const formatImageUrl = (rawPath) => {
  if (!rawPath || typeof rawPath !== 'string') return null
  const path = rawPath.trim()
  if (!path) return null
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `http://localhost:8080${cleanPath}`
}

const extractRawImagePath = (vehicle) => {
  if (!vehicle) return null
  if (typeof vehicle === 'string') return vehicle
  return (
    vehicle.mainImage ||
    vehicle.image ||
    vehicle.imageUrl ||
    vehicle.url ||
    vehicle.path ||
    vehicle.imagePath ||
    null
  )
}

const getImageVehicleId = (vehicle) => {
  if (!vehicle) return null
  const id = Number(vehicle.id ?? vehicle.vehicleId)
  return Number.isInteger(id) && id > 0 ? id : null
}

const getVehicleImage = (booking) => {
  if (!booking) return getFallbackImage()
  const vehicleId = Number(booking.vehicleId)
  if (!Number.isInteger(vehicleId) || vehicleId <= 0) return getFallbackImage()

  const vehicle = vehicles.value.find((item) => getImageVehicleId(item) === vehicleId)
  if (vehicle) {
    const imagePath = extractRawImagePath(vehicle)
    const imageUrl = formatImageUrl(imagePath)
    if (imageUrl) return imageUrl
  }

  return getFallbackImage()
}

const getFallbackImage = () => {
  return 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&q=80'
}

const handleImageError = (event) => {
  if (!event?.target || event.target.dataset.fallback === 'true') return
  event.target.dataset.fallback = 'true'
  event.target.src = getFallbackImage()
}

/* =========================================================
   API LOADERS
========================================================= */
const loadVehicles = async () => {
  try {
    const response = await getVehicles()
    const data = response?.data ?? response
    vehicles.value = Array.isArray(data) ? data : (Array.isArray(data?.data) ? data.data : [])
  } catch (vehicleError) {
    console.error('Failed to load vehicles:', vehicleError)
    vehicles.value = []
  }
}

const loadBookings = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await getMyBookings()
    const data = response?.data ?? response
    let result = Array.isArray(data) ? data : (Array.isArray(data?.data) ? data.data : [])

    bookings.value = result.map(processBookingData).filter(Boolean)
  } catch (err) {
    console.error('Failed to load my bookings:', err)
    bookings.value = []
    error.value = 'Failed to load your bookings.'
  } finally {
    loading.value = false
  }
}

/* =========================================================
   STATUS UTILITIES
========================================================= */
const normalizeStatus = (status) => String(status || '').toUpperCase()

const formatStatus = (status) => {
  return normalizeStatus(status)
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

const getStatusClass = (status) => {
  const normalized = normalizeStatus(status)
  if (['CONFIRMED', 'ACTIVE', 'RENTED'].includes(normalized)) return 'text-[var(--success)]'
  if (normalized === 'PENDING') return 'text-[var(--warning)]'
  if (normalized === 'CANCELLED') return 'text-[var(--muted)]'
  return 'text-[var(--secondary)]'
}

/* =========================================================
   BOOKING GROUPS
========================================================= */
const activeBookings = computed(() => {
  return bookings.value.filter((b) => {
    const status = normalizeStatus(b.status)
    return status === 'ACTIVE' || status === 'RENTED'
  })
})

const upcomingBookings = computed(() => {
  return bookings.value.filter((b) => normalizeStatus(b.status) === 'CONFIRMED')
})

const pendingBookings = computed(() => {
  return bookings.value.filter((b) => normalizeStatus(b.status) === 'PENDING')
})

const cancelledBookings = computed(() => {
  return bookings.value.filter((b) => normalizeStatus(b.status) === 'CANCELLED')
})

/* =========================================================
   FILTERED & PAGINATED BOOKINGS
========================================================= */
const filteredBookings = computed(() => {
  let result = [...bookings.value]

  if (activeTab.value !== 'All') {
    result = result.filter((booking) => {
      const status = normalizeStatus(booking.status)
      if (activeTab.value === 'Active') return status === 'ACTIVE' || status === 'RENTED'
      if (activeTab.value === 'Upcoming') return status === 'CONFIRMED'
      if (activeTab.value === 'Pending') return status === 'PENDING'
      if (activeTab.value === 'Cancelled') return status === 'CANCELLED'
      return true
    })
  }

  const search = searchQuery.value.trim().toLowerCase()
  if (search) {
    result = result.filter((booking) => {
      const id = String(booking.id || '').toLowerCase()
      const vehicle = String(booking.vehicleName || '').toLowerCase()
      return id.includes(search) || vehicle.includes(search)
    })
  }

  if (sortBy.value === 'newest') {
    result.sort((a, b) => Number(b.id) - Number(a.id))
  } else if (sortBy.value === 'oldest') {
    result.sort((a, b) => Number(a.id) - Number(b.id))
  } else if (sortBy.value === 'price') {
    result.sort((a, b) => Number(b.totalPrice || 0) - Number(a.totalPrice || 0))
  }

  return result
})

const totalPages = computed(() => Math.ceil(filteredBookings.value.length / pageSize.value) || 1)
const startIndex = computed(() => (currentPage.value - 1) * pageSize.value)
const endIndex = computed(() => startIndex.value + pageSize.value)

const paginatedBookings = computed(() => {
  return filteredBookings.value.slice(startIndex.value, endIndex.value)
})

const visiblePageNumbers = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// Ensure currentPage stays within valid boundary if items list changes
watch(totalPages, (newTotalPages) => {
  if (currentPage.value > newTotalPages) {
    currentPage.value = newTotalPages
  }
})

watch([activeTab, searchQuery, sortBy], () => {
  currentPage.value = 1
})

/* =========================================================
   DATE & PRICE FORMATTERS
========================================================= */
const formatDate = (date) => {
  if (!date) return '-'
  const parsed = new Date(`${date}T00:00:00`)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
}

const formatDateTime = (date) => formatDate(date)

const formatPrice = (price) => Number(price || 0).toFixed(2)

const getDailyRate = (booking) => {
  if (!booking) return '0.00'
  const totalPrice = Number(booking.totalPrice || 0)
  const totalDays = Number(booking.totalDays || 0)
  if (totalDays <= 0) return '0.00'
  return (totalPrice / totalDays).toFixed(2)
}

const getReturnCountdown = (returnDate) => {
  if (!returnDate) return '—'
  const end = new Date(`${returnDate}T23:59:59`).getTime()
  const diff = end - Date.now()
  if (diff <= 0) return 'RETURN DUE'

  const totalHours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(totalHours / 24)
  const hours = totalHours % 24

  return days > 0 ? `${days}d ${hours}h left` : `${hours}h left`
}

const getProgress = (booking) => {
  if (!booking?.pickupDate || !booking?.returnDate) return 0
  const start = new Date(`${booking.pickupDate}T00:00:00`).getTime()
  const end = new Date(`${booking.returnDate}T23:59:59`).getTime()
  const now = Date.now()

  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start || now <= start) return 0
  if (now >= end) return 100

  return Math.round(((now - start) / (end - start)) * 100)
}

const viewBookingDetails = (bookingId) => {
  if (bookingId) router.push(`/booking/detail/${bookingId}`)
}

/* =========================================================
   LIFECYCLE
========================================================= */
onMounted(async () => {
  await Promise.all([loadVehicles(), loadBookings()])
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>