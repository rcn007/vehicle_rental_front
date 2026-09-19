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
          <span class="text-gray-900 font-semibold">Edit #{{ activeId }}</span>
        </div>
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Update Vehicle</h1>
        <p class="text-gray-500 text-sm mt-1">Modify details, status, or daily rates</p>
      </div>

      <div class="flex items-center gap-3">
        <button type="button" @click="handleBack" class="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-all shadow-xs active:scale-95 cursor-pointer">
          <span>Cancel</span>
        </button>
        <button type="button" @click="handleSave" :disabled="submitting || loading" class="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-all shadow-xs active:scale-95 cursor-pointer">
          <i v-if="submitting" class="fa-solid fa-circle-notch fa-spin text-xs"></i>
          <i v-else class="fa-solid fa-floppy-disk text-xs"></i>
          <span>{{ submitting ? 'Saving...' : 'Save Changes' }}</span>
        </button>
      </div>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="loading" class="bg-white border border-gray-200/80 rounded-xl p-8 shadow-xs animate-pulse space-y-6">
      <div class="h-6 bg-gray-200 rounded w-1/4"></div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="h-10 bg-gray-200 rounded"></div>
        <div class="h-10 bg-gray-200 rounded"></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="fetchError" class="p-8 bg-white border border-gray-200/80 rounded-xl text-center">
      <i class="fa-solid fa-triangle-exclamation text-rose-500 text-2xl mb-2"></i>
      <p class="text-gray-900 font-semibold mb-1">Failed to load vehicle details</p>
      <p class="text-gray-500 text-xs mb-4">{{ fetchError }}</p>
      <button @click="fetchVehicleDetails" class="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700">Retry</button>
    </div>

    <!-- Main Content Form -->
    <form v-else @submit.prevent="handleSave" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <!-- Left Column -->
      <div class="lg:col-span-2 space-y-6">
        
        <div class="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs space-y-5">
          <h2 class="text-base font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-4">
            <i class="fa-solid fa-car text-blue-600 text-sm"></i>
            <span>Vehicle Specifications</span>
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div class="sm:col-span-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Vehicle Name / Model</label>
              <input type="text" v-model="form.name" required class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none">
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Brand</label>
              <select
  v-model="form.brand_id"
  required
  class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-900 focus:outline-none"
>
  <option :value="null" disabled>
    Select Brand
  </option>

  <option
    v-for="brand in brands"
    :key="brand.id"
    :value="brand.id"
  >
    {{ brand.name }}
  </option>
</select> </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Category</label>
             <select
  v-model="form.category_id"
  required
  class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-900 focus:outline-none"
>
  <option :value="null" disabled>
    Select Category
  </option>

  <option
    v-for="category in categories"
    :key="category.id"
    :value="category.id"
  >
    {{ category.name }}
  </option>
</select>     </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">License Plate</label>
              <input type="text" v-model="form.plate_number" required class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none">
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Model Year</label>
              <input type="number" v-model.number="form.year" class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none">
            </div>
          </div>
        </div>

        <div class="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs space-y-5">
          <h2 class="text-base font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-4">
            <i class="fa-solid fa-sliders text-blue-600 text-sm"></i>
            <span>Features & Options</span>
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Transmission</label>
              <select v-model="form.transmission" class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-900">
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Fuel Type</label>
              <select v-model="form.fuel_type" class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-900">
                <option value="Gasoline">Gasoline</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Seats</label>
              <input type="number" v-model.number="form.seat" min="1" class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900">
            </div>
          </div>
        </div>

      </div>

      <!-- Right Column -->
      <div class="space-y-6">
        <div class="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs space-y-5">
          <h2 class="text-base font-bold text-gray-900 border-b border-gray-100 pb-4">Status & Rates</h2>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Daily Rate ($)</label>
            <input type="number" step="0.01" v-model.number="form.pricePerDay" required class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-900">
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Status</label>
            <select v-model="form.status" class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-900">
              <option value="AVAILABLE">Available</option>
              <option value="RENTED">Rented</option>
              <option value="MAINTENANCE">Maintenance</option>
              <option value="UNAVAILABLE">Unavailable</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Image URL</label>
            <input type="url" v-model="form.image" class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900">
          </div>

          <button type="submit" :disabled="submitting" class="w-full h-10 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-xs cursor-pointer active:scale-95 disabled:opacity-50">
            Save Updates
          </button>
        </div>
      </div>

    </form>
  </main>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  getVehicleById,
  updateVehicle,
  getBrand,
  getCategory
} from '../../api/vehicle'

const props = defineProps({
  id: {
    type: [String, Number],
    default: null
  }
})

const route = useRoute()
const router = useRouter()

const activeId = computed(() => props.id || route.params.id)

const loading = ref(true)
const submitting = ref(false)
const fetchError = ref(null)

const brands = ref([])
const categories = ref([])

const loadingBrands = ref(false)
const loadingCategories = ref(false)

const form = ref({
  name: '',
  brand_id: null,
  category_id: null,
  model: '',
  year: 2024,
  plate_number: '',
  transmission: 'Automatic',
  fuel_type: 'Gasoline',
  seat: 5,
  pricePerDay: 0,
  status: 'AVAILABLE',
  description: '',
  image: ''
})

/* =========================================================
   BACK
========================================================= */

const handleBack = () => {
  router.push('/admin/vehicles')
}

/* =========================================================
   FETCH BRANDS
========================================================= */

const fetchBrands = async () => {
  try {
    loadingBrands.value = true

    const response = await getBrand()

    console.log('Brands response:', response)

    const data =
      response?.data?.data ||
      response?.data ||
      response ||
      []

    brands.value = Array.isArray(data)
      ? data
      : []

    console.log('Brands:', brands.value)

  } catch (err) {
    console.error('Failed to load brands:', err)
    brands.value = []
  } finally {
    loadingBrands.value = false
  }
}

/* =========================================================
   FETCH CATEGORIES
========================================================= */

const fetchCategories = async () => {
  try {
    loadingCategories.value = true

    const response = await getCategory()

    console.log('Categories response:', response)

    const data =
      response?.data?.data ||
      response?.data ||
      response ||
      []

    categories.value = Array.isArray(data)
      ? data
      : []

    console.log('Categories:', categories.value)

  } catch (err) {
    console.error('Failed to load categories:', err)
    categories.value = []
  } finally {
    loadingCategories.value = false
  }
}

/* =========================================================
   FETCH VEHICLE
========================================================= */

const fetchVehicleDetails = async () => {
  if (!activeId.value) {
    fetchError.value = 'Vehicle ID is missing.'
    loading.value = false
    return
  }

  try {
    loading.value = true
    fetchError.value = null

    const response = await getVehicleById(activeId.value)

    console.log('Vehicle response:', response)

    const data =
      response?.data?.data ||
      response?.data ||
      response ||
      {}

    console.log('Vehicle data:', data)

    form.value = {
      name: data.name || '',

      brand_id:
        data.brand_id ??
        data.brandId ??
        null,

      category_id:
        data.category_id ??
        data.categoryId ??
        null,

      model:
        data.model || '',

      year:
        Number(data.year || 2024),

      plate_number:
        data.plate_number ||
        data.licensePlate ||
        '',

      transmission:
        data.transmission ||
        'Automatic',

      fuel_type:
        data.fuel_type ||
        data.fuelType ||
        'Gasoline',

      seat:
        Number(
          data.seat ??
          data.seats ??
          5
        ),

      pricePerDay:
        Number(
          data.pricePerDay ??
          data.dailyRate ??
          0
        ),

      status:
        data.status ||
        'AVAILABLE',

      description:
        data.description || '',

      image:
        data.mainImage ||
        data.image ||
        ''
    }

    console.log('Brand ID:', form.value.brand_id)
    console.log('Category ID:', form.value.category_id)
    console.log('Form:', form.value)

  } catch (err) {
    console.error('Failed to load vehicle:', err)

    fetchError.value =
      err.response?.data?.message ||
      err.response?.data?.msg ||
      err.response?.data?.error ||
      err.message ||
      'Failed to load vehicle details.'

  } finally {
    loading.value = false
  }
}

/* =========================================================
   IMAGE CHANGE
========================================================= */

const handleImageChange = (event) => {
  const file = event.target.files?.[0]

  if (file) {
    form.value.image = file
  }
}

/* =========================================================
   UPDATE VEHICLE
========================================================= */

const handleSave = async () => {
  if (!activeId.value) {
    alert('Vehicle ID is missing.')
    return
  }

  if (!form.value.brand_id) {
    alert('Brand ID is missing. Please select a brand.')
    return
  }

  if (!form.value.category_id) {
    alert('Category ID is missing. Please select a category.')
    return
  }

  try {
    submitting.value = true

    const formData = new FormData()

    formData.append(
      'name',
      form.value.name
    )

    formData.append(
      'brand_id',
      String(form.value.brand_id)
    )

    formData.append(
      'category_id',
      String(form.value.category_id)
    )

    formData.append(
      'model',
      form.value.model || ''
    )

    formData.append(
      'year',
      String(form.value.year)
    )

    formData.append(
      'plate_number',
      form.value.plate_number
    )

    formData.append(
      'transmission',
      form.value.transmission
    )

    formData.append(
      'fuel_type',
      form.value.fuel_type
    )

    formData.append(
      'seat',
      String(form.value.seat)
    )

    formData.append(
      'pricePerDay',
      String(form.value.pricePerDay)
    )

    formData.append(
      'status',
      form.value.status
    )

    formData.append(
      'description',
      form.value.description || ''
    )

    if (form.value.image instanceof File) {
      formData.append(
        'mainImage',
        form.value.image
      )
    }

    console.log('========== UPDATE VEHICLE ==========')
    console.log('Vehicle ID:', activeId.value)

    for (const [key, value] of formData.entries()) {
      console.log(
        key,
        ':',
        value instanceof File
          ? value.name
          : value
      )
    }

    const response = await updateVehicle(
      activeId.value,
      formData
    )

    console.log(
      'Update response:',
      response
    )

    alert('Vehicle updated successfully.')

    router.push('/admin/vehicles')

  } catch (err) {
    console.error(
      'Failed to update vehicle:',
      err
    )

    console.error(
      'Backend response:',
      err.response?.data
    )

    alert(
      err.response?.data?.message ||
      err.response?.data?.msg ||
      err.response?.data?.error ||
      err.message ||
      'Failed to update vehicle.'
    )

  } finally {
    submitting.value = false
  }
}

/* =========================================================
   INITIAL LOAD
========================================================= */

onMounted(async () => {
  await Promise.all([
    fetchVehicleDetails(),
    fetchBrands(),
    fetchCategories()
  ])
})
</script>