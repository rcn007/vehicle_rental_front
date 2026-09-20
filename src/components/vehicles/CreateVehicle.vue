<template>
  <main class="p-6 md:p-8 min-h-[calc(100vh-64px)] bg-gray-50/50">
    
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
      <div>
        <div class="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <button @click="handleBack" class="hover:text-gray-900 flex items-center gap-1 transition-colors cursor-pointer">
            <i class="fa-solid fa-arrow-left text-[10px]"></i>
            <span>Back to Vehicles</span>
          </button>
          <span>/</span>
          <span class="text-gray-900 font-semibold">New Vehicle</span>
        </div>
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Add Vehicle</h1>
        <p class="text-gray-500 text-sm mt-1">Register a new vehicle into your rental fleet</p>
      </div>

      <div class="flex items-center gap-3">
        <button 
          type="button" 
          @click="handleBack" 
          class="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-all shadow-xs active:scale-95 cursor-pointer"
        >
          <span>Cancel</span>
        </button>
        <button 
          type="button" 
          @click="handleSave" 
          :disabled="submitting || !isFormValid" 
          class="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-all shadow-xs active:scale-95 cursor-pointer"
        >
          <i v-if="submitting" class="fa-solid fa-circle-notch fa-spin text-xs"></i>
          <i v-else class="fa-solid fa-check text-xs"></i>
          <span>{{ submitting ? 'Saving...' : 'Save Vehicle' }}</span>
        </button>
      </div>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSave" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <!-- Left Column (Main Specs) -->
      <div class="lg:col-span-2 space-y-6">
        
        <div class="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs space-y-5">
          <h2 class="text-base font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-4">
            <i class="fa-solid fa-car text-blue-600 text-sm"></i>
            <span>General Specs</span>
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div class="sm:col-span-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Vehicle Name / Model <span class="text-rose-500">*</span></label>
              <input type="text" v-model="form.name" required placeholder="e.g. Toyota RAV4 Hybrid" class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600">
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Brand <span class="text-rose-500">*</span></label>
              <input type="text" v-model="form.brand" required placeholder="e.g. Toyota" class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600">
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Category <span class="text-rose-500">*</span></label>
              <input type="text" v-model="form.category" required placeholder="e.g. SUV" class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600">
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">License Plate <span class="text-rose-500">*</span></label>
              <input type="text" v-model="form.licensePlate" required placeholder="e.g. ABC-1234" class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600">
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Manufacturing Year</label>
              <input type="number" v-model.number="form.year" placeholder="2023" class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600">
            </div>
          </div>
        </div>

        <div class="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs space-y-5">
          <h2 class="text-base font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-4">
            <i class="fa-solid fa-sliders text-blue-600 text-sm"></i>
            <span>Technical Options</span>
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Transmission</label>
              <select v-model="form.transmission" class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-900 focus:outline-none">
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Fuel Type</label>
              <select v-model="form.fuelType" class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-900 focus:outline-none">
                <option value="Gasoline">Gasoline</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Seats</label>
              <input type="number" v-model.number="form.seats" min="1" class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900">
            </div>
          </div>
        </div>

      </div>

      <!-- Right Column (Pricing & Status) -->
      <div class="space-y-6">
        <div class="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs space-y-5">
          <h2 class="text-base font-bold text-gray-900 border-b border-gray-100 pb-4">Pricing & Status</h2>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Daily Rental Rate ($) <span class="text-rose-500">*</span></label>
            <input type="number" step="0.01" v-model.number="form.dailyRate" required placeholder="0.00" class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-900">
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Initial Status</label>
            <select v-model="form.status" class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-900">
              <option value="AVAILABLE">Available</option>
              <option value="MAINTENANCE">Maintenance</option>
              <option value="UNAVAILABLE">Unavailable</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Image URL</label>
            <input type="url" v-model="form.image" placeholder="https://..." class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900">
          </div>

          <button 
            type="submit" 
            :disabled="submitting || !isFormValid" 
            class="w-full h-11 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md active:scale-98 cursor-pointer disabled:opacity-50"
          >
            {{ submitting ? 'Processing...' : 'Confirm & Save' }}
          </button>
        </div>
      </div>

    </form>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { createVehicle } from '../../api/vehicle'

const router = useRouter()
const submitting = ref(false)

const form = ref({
  name: '',
  brand: '',
  category: '',
  licensePlate: '',
  year: new Date().getFullYear(),
  transmission: 'Automatic',
  fuelType: 'Gasoline',
  seats: 5,
  dailyRate: '',
  status: 'AVAILABLE',
  image: ''
})

const isFormValid = computed(() => {
  return form.value.name && form.value.brand && form.value.category && form.value.licensePlate && Number(form.value.dailyRate) > 0
})

const handleBack = () => router.push('/admin/vehicles')

const handleSave = async () => {
  if (!isFormValid.value) return

  try {
    submitting.value = true
    const payload = {
      ...form.value,
      dailyRate: Number(form.value.dailyRate),
      pricePerDay: Number(form.value.dailyRate) // compatibility fallback
    }
    await createVehicle(payload)
    router.push('/admin/vehicles')
  } catch (err) {
    console.error('Failed to create vehicle:', err)
    alert(err.response?.data?.message || err.response?.data?.msg || 'Failed to create vehicle')
  } finally {
    submitting.value = false
  }
}
</script>