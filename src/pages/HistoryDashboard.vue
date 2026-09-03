<template>
  <main class="p-6  min-h-[calc(100vh-64px)] relative overflow-x-hidden">
    
    <!-- Breadcrumb & Header -->
    <div class="mb-6">
     
      <h1 class="text-4xl font-bold tracking-tight text-[#111827]">Rental History</h1>
      <p class="text-[#43474E] text-xl mt-1">View and manage completed vehicle rental history</p>
    </div>

    <!-- 3 KPI Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 ">
      
      <!-- Total Rentals -->
      <div class="p-5 bg-white border border-[#D3DAEF] rounded-xl shadow-sm flex items-center justify-between ">
        <div>
          <div class="text-[#43474E] text-xl font-medium mb-1 ">TOTAL RENTALS</div>
          <div class="text-3xl font-bold text-[#111827]">1,248</div>
          <div class="text-xs text-[#7A8190] mt-1">All completed rentals</div>
        </div>
        <div class="w-12 h-12 rounded-xl bg-[#F1F3FF] border border-[#D3DAEF] flex items-center justify-center text-[#111827]">
          <i class="fa-solid fa-car text-lg"></i>
        </div>
      </div>

      <!-- Total Revenue -->
      <div class="p-5 bg-white border border-[#D3DAEF] rounded-xl shadow-sm flex items-center justify-between">
        <div>
          <div class="text-[#43474E] text-xl font-medium mb-1">TOTAL REVENUE</div>
          <div class="text-3xl font-bold text-[#111827]">$86,450</div>
          <div class="text-xs text-[#7A8190] mt-1">Revenue from completed</div>
        </div>
        <div class="w-12 h-12 rounded-xl bg-[#F1F3FF] border border-[#D3DAEF] flex items-center justify-center text-[#111827]">
          <i class="fa-solid fa-wallet text-lg"></i>
        </div>
      </div>

      <!-- Average Duration -->
      <div class="p-5 bg-white border border-[#D3DAEF] rounded-xl shadow-sm flex items-center justify-between">
        <div>
          <div class="text-[#43474E] text-xl font-medium mb-1">AVERAGE DURATION</div>
          <div class="text-3xl font-bold text-[#111827]">3.4 Days</div>
          <div class="text-xs text-[#7A8190] mt-1">Average rental length</div>
        </div>
        <div class="w-12 h-12 rounded-xl bg-[#F1F3FF] border border-[#D3DAEF] flex items-center justify-center text-[#111827]">
          <i class="fa-solid fa-chart-line text-lg"></i>
        </div>
      </div>

    </div>

    <!-- Main Content Container -->
    <div class="bg-white border border-[#D3DAEF] rounded-xl shadow-sm overflow-hidden">
      
      <!-- Section Header & Filter Toolbar -->
      <div class="p-5 border-b border-[#D3DAEF]">
        <h2 class="text-lg font-bold text-[#111827]">Rental History</h2>
        <p class="text-xs text-[#7A8190] mb-4">Completed and previous rental transactions</p>

        <div class="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          
          <!-- Search Input -->
          <div class="relative flex-1">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search ID, customer, vehicle..." 
              class="w-full h-10 pl-9 pr-4 bg-[#F1F3FF] border border-[#D3DAEF] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#2563EB]"
            >
            <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-[#7A8190] text-xs"></i>
          </div>

          <!-- Date Range Filter -->
          <div class="relative">
            <select v-model="selectedDateRange" class="h-10 px-3 pr-8 bg-[#F1F3FF] border border-[#D3DAEF] rounded-lg text-sm text-[#111827] focus:outline-none">
              <option value="">Date Range</option>
              <option value="last-7">Last 7 Days</option>
              <option value="last-30">Last 30 Days</option>
              <option value="aug-2026">August 2026</option>
            </select>
          </div>

          <!-- Vehicle Filter -->
          <div class="relative">
            <select v-model="selectedVehicle" class="h-10 px-3 pr-8 bg-[#F1F3FF] border border-[#D3DAEF] rounded-lg text-sm text-[#111827] focus:outline-none">
              <option value="">All Vehicles</option>
              <option value="Toyota Camry">Toyota Camry</option>
              <option value="Honda CR-V">Honda CR-V</option>
              <option value="Toyota Fortuner">Toyota Fortuner</option>
            </select>
          </div>

        </div>
      </div>

      <!-- Table View -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-[#F8FAFC] text-[#7A8190] text-xs font-bold uppercase tracking-wider border-b border-[#D3DAEF]">
              <th class="p-3.5 pl-6">BOOKING ID</th>
              <th class="p-3.5">CUSTOMER</th>
              <th class="p-3.5">VEHICLE</th>
              <th class="p-3.5 pr-6">DATES</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#E1E6F5]">
            <tr 
              v-for="rental in filteredRentals" 
              :key="rental.id"
              @click="openDetails(rental)"
              class="hover:bg-[#F8FAFC] transition-colors cursor-pointer"
            >
              <td class="p-4 pl-6 font-bold text-[#2563EB] text-sm">{{ rental.id }}</td>
              <td class="p-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-[#E1E8FD] text-[#2563EB] font-bold flex items-center justify-center text-xs">
                    {{ rental.customerInitials }}
                  </div>
                  <span class="font-semibold text-[#111827] text-sm">{{ rental.customerName }}</span>
                </div>
              </td>
              <td class="p-4">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded bg-[#F1F3FF] border border-[#D3DAEF] flex items-center justify-center text-[#111827]">
                    <i class="fa-solid fa-car text-[10px]"></i>
                  </div>
                  <span class="text-sm text-[#111827] font-medium">{{ rental.vehicleName }}</span>
                </div>
              </td>
              <td class="p-4 pr-6 text-xs text-[#43474E]">
                <div class="font-medium text-[#111827]">{{ rental.dateRange }}</div>
                <div class="text-[#7A8190] mt-0.5">{{ rental.duration }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Footer -->
      <div class="p-4 px-6 bg-[#F8FAFC] border-t border-[#D3DAEF] text-xs text-[#7A8190]">
        Showing 1-{{ filteredRentals.length }} of 1,248 rentals
      </div>

    </div>

    <!-- Backdrop Overlay for Side Drawer -->
    <div 
      v-if="selectedRental" 
      @click="selectedRental = null"
      class="fixed inset-0 bg-black/30 backdrop-blur-xs z-40 transition-opacity"
    ></div>

    <!-- Slide-Over Rental Details Drawer -->
    <div 
      class="fixed top-0 right-0 bottom-0 w-full sm:w-[480px] bg-white border-l border-[#D3DAEF] shadow-2xl z-50 transform transition-transform duration-300 overflow-y-auto flex flex-col justify-between"
      :class="selectedRental ? 'translate-x-0' : 'translate-x-full'"
    >
      <div v-if="selectedRental" class="p-6">
        
        <!-- Drawer Header -->
        <div class="flex items-center justify-between pb-4 border-b border-[#D3DAEF]">
          <h2 class="text-lg font-bold text-[#111827]">Rental Details</h2>
          <button @click="selectedRental = null" class="w-8 h-8 rounded-lg hover:bg-[#F1F3FF] flex items-center justify-center text-[#7A8190] hover:text-[#111827]">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <!-- Booking ID & Status Card -->
        <div class="mt-5 p-4 bg-[#F8FAFC] border border-[#D3DAEF] rounded-xl">
          <div class="flex items-center justify-between mb-2">
            <span class="font-bold text-[#111827] text-base">{{ selectedRental.id }}</span>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-[#DCFCE7] text-[#15803D]">
              {{ selectedRental.status }}
            </span>
          </div>
          <div class="text-xs text-[#7A8190] mb-4">{{ selectedRental.dateRange }} ({{ selectedRental.duration }})</div>
          
          <div class="flex items-center gap-2">
            <button @click="handleAction('invoice')" class="flex-1 py-2 bg-white border border-[#D3DAEF] rounded-lg text-xs font-bold text-[#111827] hover:bg-[#E1E8FD] transition-colors shadow-sm">Invoice</button>
            <button @click="handleAction('contract')" class="flex-1 py-2 bg-white border border-[#D3DAEF] rounded-lg text-xs font-bold text-[#111827] hover:bg-[#E1E8FD] transition-colors shadow-sm">Contract</button>
          </div>
        </div>

        <!-- Customer Details -->
        <div class="mt-5">
          <div class="text-[11px] font-bold uppercase tracking-wider text-[#7A8190] mb-2">CUSTOMER</div>
          <div class="flex items-center gap-3 p-3 bg-[#F1F3FF] border border-[#D3DAEF] rounded-xl">
            <div class="w-9 h-9 rounded-full bg-[#2563EB] text-white font-bold flex items-center justify-center text-xs">
              {{ selectedRental.customerInitials }}
            </div>
            <div>
              <div class="font-bold text-[#111827] text-sm">{{ selectedRental.customerName }}</div>
              <div class="text-xs text-[#7A8190]">{{ selectedRental.customerEmail }}</div>
            </div>
          </div>
        </div>

        <!-- Vehicle Details -->
        <div class="mt-5">
          <div class="text-[11px] font-bold uppercase tracking-wider text-[#7A8190] mb-2">VEHICLE</div>
          <div class="flex items-center gap-3 p-3 bg-[#F1F3FF] border border-[#D3DAEF] rounded-xl">
            <div class="w-12 h-10 rounded bg-white border border-[#D3DAEF] flex items-center justify-center text-[#111827]">
              <i class="fa-solid fa-car text-sm"></i>
            </div>
            <div>
              <div class="font-bold text-[#111827] text-sm">{{ selectedRental.vehicleName }}</div>
              <div class="text-xs text-[#7A8190]">Plate: {{ selectedRental.plateNumber }}</div>
            </div>
          </div>
        </div>

        <!-- Payment Breakdown -->
        <div class="mt-5">
          <div class="text-[11px] font-bold uppercase tracking-wider text-[#7A8190] mb-2">PAYMENT</div>
          <div class="p-4 bg-[#F8FAFC] border border-[#D3DAEF] rounded-xl space-y-2 text-xs">
            <div class="flex justify-between pb-2 border-b border-[#D3DAEF]">
              <span class="text-[#7A8190]">Status</span>
              <span class="font-semibold text-[#15803D]">{{ selectedRental.paymentStatus }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-[#7A8190]">Base Rate ({{ selectedRental.duration }})</span>
              <span class="font-medium text-[#111827]">{{ selectedRental.baseRate }}</span>
            </div>
            <div class="flex justify-between pt-2 border-t border-[#D3DAEF] font-bold text-sm">
              <span class="text-[#111827]">Total</span>
              <span class="text-[#111827]">{{ selectedRental.totalAmount }}</span>
            </div>
          </div>
        </div>

        <!-- Rental Timeline -->
        <div class="mt-5">
          <div class="text-[11px] font-bold uppercase tracking-wider text-[#7A8190] mb-3">RENTAL TIMELINE</div>
          <div class="space-y-4 pl-2 border-l-2 border-[#D3DAEF] ml-2">
            
            <div class="relative pl-4">
              <div class="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-[#2563EB] border-2 border-white"></div>
              <div class="text-xs font-bold text-[#111827]">Created</div>
              <div class="text-[10px] text-[#7A8190]">Aug 01, 2026 at 10:23 AM</div>
            </div>

            <div class="relative pl-4">
              <div class="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-[#2563EB] border-2 border-white"></div>
              <div class="text-xs font-bold text-[#111827]">Confirmed</div>
              <div class="text-[10px] text-[#7A8190]">Aug 01, 2026 at 11:05 AM</div>
            </div>

            <div class="relative pl-4">
              <div class="absolute -left-[21px] top-1 w-3.5 h-3.5 rounded-full bg-[#16A34A] border-2 border-white flex items-center justify-center">
                <i class="fa-solid fa-check text-[6px] text-white"></i>
              </div>
              <div class="text-xs font-bold text-[#111827]">Picked Up & Completed</div>
              <div class="text-[10px] text-[#7A8190]">Aug 05, 2026 at 08:30 AM</div>
            </div>

          </div>
        </div>

      </div>

      <!-- Drawer Footer Actions -->
      <div v-if="selectedRental" class="p-4 px-6 bg-[#F8FAFC] border-t border-[#D3DAEF] flex items-center gap-3">
        <button @click="handleAction('print')" class="flex-1 py-2.5 bg-white border border-[#D3DAEF] rounded-lg text-xs font-bold text-[#111827] hover:bg-[#E1E8FD] transition-colors shadow-sm">Print Receipt</button>
        <button @click="handleAction('full-record')" class="flex-1 py-2.5 bg-[#111827] text-white rounded-lg text-xs font-bold hover:bg-black transition-colors shadow-sm">Full Record</button>
      </div>

    </div>

  </main>
</template>

<script setup>
import { ref, computed } from 'vue'

// Reactive Filters and State
const searchQuery = ref('')
const selectedDateRange = ref('')
const selectedVehicle = ref('')
const selectedRental = ref(null)

// Mock Dataset matching reference screen
const rentals = ref([
  {
    id: '#BK-1024',
    customerName: 'John Smith',
    customerInitials: 'JS',
    customerEmail: 'john.smith@example.com',
    vehicleName: 'Toyota Camry',
    plateNumber: '3B-5678',
    dateRange: 'Aug 10 - Aug 13',
    duration: '3 days',
    status: 'Completed',
    paymentStatus: 'Paid via ABA',
    baseRate: '$240.00',
    totalAmount: '$240.00'
  },
  {
    id: '#BK-1023',
    customerName: 'Sokha Chan',
    customerInitials: 'SC',
    customerEmail: 'sokha.chan@example.com',
    vehicleName: 'Honda CR-V',
    plateNumber: '2C-9876',
    dateRange: 'Aug 08 - Aug 12',
    duration: '4 days',
    status: 'Completed',
    paymentStatus: 'Paid via Card',
    baseRate: '$380.00',
    totalAmount: '$380.00'
  },
  {
    id: '#BK-1022',
    customerName: 'Dara Kim',
    customerInitials: 'DK',
    customerEmail: 'dara.kim@example.com',
    vehicleName: 'Toyota Fortuner',
    plateNumber: '2A-1234',
    dateRange: 'Aug 05 - Aug 08',
    duration: '3 days',
    status: 'Completed',
    paymentStatus: 'Paid via ABA',
    baseRate: '$240.00',
    totalAmount: '$240.00'
  }
])

// Filter Computed Logic
const filteredRentals = computed(() => {
  return rentals.value.filter(rental => {
    const matchesSearch = 
      rental.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      rental.customerName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      rental.vehicleName.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesVehicle = selectedVehicle.value ? rental.vehicleName === selectedVehicle.value : true
    
    return matchesSearch && matchesVehicle
  })
})

// Drawer Selection Event
const openDetails = (rental) => {
  selectedRental.value = rental
}

// Action Trigger Handlers
const handleAction = (actionType) => {
  switch (actionType) {
    case 'invoice':
      alert(`Downloading invoice for ${selectedRental.value.id}...`)
      break
    case 'contract':
      alert(`Opening rental contract for ${selectedRental.value.id}...`)
      break
    case 'print':
      window.print()
      break
    case 'full-record':
      alert(`Navigating to full archive record for ${selectedRental.value.id}...`)
      break
  }
}
</script>