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
              <input type="text" v-model="form.name" required class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:border-blue-500">
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Brand</label>
              <select v-model="form.brand_id" required class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-500">
                <option :value="null" disabled>Select Brand</option>
                <option v-for="brand in brands" :key="brand.id" :value="brand.id">
                  {{ brand.name }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Category</label>
              <select v-model="form.category_id" required class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-500">
                <option :value="null" disabled>Select Category</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">License Plate</label>
              <input type="text" v-model="form.plate_number" required class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:border-blue-500">
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Model Year</label>
              <input type="number" v-model.number="form.year" class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:border-blue-500">
            </div>
          </div>
        </div>

        <!-- =========================================================
             VEHICLE GALLERY (4 DISTINCT SLOTS)
        ========================================================= -->
        <div class="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs space-y-5">
          <div class="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h2 class="text-base font-bold text-gray-900 flex items-center gap-2">
                <i class="fa-solid fa-images text-blue-600 text-sm"></i>
                <span>Vehicle Gallery Views</span>
              </h2>
              <p class="text-xs text-gray-500 mt-1">Upload precise angles for full vehicle presentation</p>
            </div>
          </div>

          <!-- 4 Boxes Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div 
              v-for="slot in gallerySlots" 
              :key="slot.key" 
              class="border border-gray-200 rounded-xl p-3 bg-gray-50/50 flex flex-col justify-between"
            >
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                  <i :class="slot.icon" class="text-blue-600"></i>
                  {{ slot.label }}
                </span>
                <span v-if="slot.image" class="text-[10px] bg-emerald-100 text-emerald-700 font-semibold px-2 py-0.5 rounded-full">
                  Uploaded
                </span>
              </div>

              <!-- Content Area inside Slot -->
              <div class="relative aspect-[16/10] bg-gray-100 rounded-lg border border-dashed border-gray-300 overflow-hidden group flex flex-col items-center justify-center">
                
                <!-- Skeleton Loader -->
                <div v-if="loadingGallery || slot.uploading" class="absolute inset-0 bg-white/80 backdrop-blur-xs flex flex-col items-center justify-center z-10">
                  <i class="fa-solid fa-circle-notch fa-spin text-blue-600 text-xl mb-1"></i>
                  <span class="text-[11px] font-medium text-gray-500">Processing...</span>
                </div>

                <!-- Case 1: Image Exists (Uploaded or Local Preview) -->
                <template v-if="slot.previewUrl || slot.image">
                  <img 
                    :src="slot.previewUrl || getGalleryImageUrl(slot.image)" 
                    :alt="slot.label"
                    class="w-full h-full object-cover"
                  />
                  <!-- Overlay Actions -->
                  <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button 
                      v-if="slot.image" 
                      type="button" 
                      @click="handleDeleteGalleryImage(slot.image)"
                      class="w-8 h-8 rounded-full bg-rose-500 text-white shadow hover:bg-rose-600 flex items-center justify-center cursor-pointer transition-transform active:scale-95"
                      title="Delete Image"
                    >
                      <i class="fa-solid fa-trash text-xs"></i>
                    </button>
                    <label 
                      :for="`slot-input-${slot.key}`" 
                      class="w-8 h-8 rounded-full bg-white text-gray-800 shadow hover:bg-gray-100 flex items-center justify-center cursor-pointer transition-transform active:scale-95"
                      title="Change Image"
                    >
                      <i class="fa-solid fa-pen-to-square text-xs"></i>
                    </label>
                  </div>
                </template>

                <!-- Case 2: Slot Empty -->
                <template v-else>
                  <label :for="`slot-input-${slot.key}`" class="w-full h-full flex flex-col items-center justify-center cursor-pointer p-4 text-center hover:bg-gray-100/50 transition-colors">
                    <i class="fa-solid fa-cloud-arrow-up text-gray-400 text-xl mb-1"></i>
                    <span class="text-xs font-semibold text-gray-600">Upload {{ slot.label }}</span>
                    <span class="text-[10px] text-gray-400 mt-0.5">PNG, JPG or WEBP</span>
                  </label>
                </template>

                <!-- Hidden Input per Slot -->
                <input 
                  :id="`slot-input-${slot.key}`" 
                  type="file" 
                  accept="image/*" 
                  class="hidden" 
                  @change="(e) => handleSlotFileChange(e, slot)"
                />
              </div>

              <!-- Action button for local files selected -->
              <div v-if="slot.file" class="mt-2 flex items-center gap-2">
                <button 
                  type="button" 
                  @click="uploadSlotImage(slot)" 
                  :disabled="slot.uploading"
                  class="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold transition-all disabled:opacity-50"
                >
                  Confirm Upload
                </button>
                <button 
                  type="button" 
                  @click="clearSlotFile(slot)"
                  class="px-2 py-1.5 text-gray-500 hover:text-gray-700 text-xs"
                >
                  Clear
                </button>
              </div>

            </div>
          </div>
        </div>

        <!-- Features & Options -->
        <div class="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs space-y-5">
          <h2 class="text-base font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-4">
            <i class="fa-solid fa-sliders text-blue-600 text-sm"></i>
            <span>Features & Options</span>
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Transmission</label>
              <select v-model="form.transmission" class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-500">
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Fuel Type</label>
              <select v-model="form.fuel_type" class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-500">
                <option value="Gasoline">Gasoline</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Seats</label>
              <input type="number" v-model.number="form.seat" min="1" class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:border-blue-500">
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
            <input type="number" step="0.01" v-model.number="form.pricePerDay" required class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-900 focus:outline-none focus:border-blue-500">
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Status</label>
            <select v-model="form.status" class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-500">
              <option value="AVAILABLE">Available</option>
              <option value="RENTED">Rented</option>
              <option value="MAINTENANCE">Maintenance</option>
              <option value="UNAVAILABLE">Unavailable</option>
            </select>
          </div>

          <!-- Main Image Upload Card Component -->
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Primary Main Image</label>
            <div class="border border-gray-200 rounded-xl p-3 bg-gray-50 flex flex-col gap-3">
              <div class="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-gray-200 border border-gray-300 flex items-center justify-center group">
                <img 
                  v-if="mainImagePreview" 
                  :src="mainImagePreview" 
                  alt="Main Vehicle Image" 
                  class="w-full h-full object-cover"
                />
                <div v-else class="text-center p-4">
                  <i class="fa-solid fa-image text-gray-400 text-2xl mb-1"></i>
                  <p class="text-[11px] text-gray-500">No primary image assigned</p>
                </div>

                <div v-if="mainImagePreview" class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <label for="main-image-file" class="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold cursor-pointer shadow hover:bg-gray-100">
                    Change Image
                  </label>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <label for="main-image-file" class="cursor-pointer inline-flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-700">
                  <i class="fa-solid fa-upload"></i>
                  <span>{{ mainImagePreview ? 'Select New Image' : 'Upload Image' }}</span>
                </label>
                <input id="main-image-file" type="file" accept="image/*" class="hidden" @change="handleImageChange" />
              </div>
            </div>
          </div>

          <!-- <button type="submit" :disabled="submitting" class="w-full h-10 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-xs cursor-pointer active:scale-95 disabled:opacity-50">
            Save Updates
          </button> -->
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
  getCategory, 
  getVehiclesImage, 
  createVehicleImage, 
  deleteVehicleImage 
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

const galleryImages = ref([])
const loadingGallery = ref(false)

const mainImagePreview = ref('')

// Structured 4 Gallery Views
const gallerySlots = ref([
  { key: 'front', label: 'Front View', icon: 'fa-solid fa-car-side', file: null, previewUrl: null, image: null, uploading: false },
  { key: 'side', label: 'Side View', icon: 'fa-solid fa-vector-square', file: null, previewUrl: null, image: null, uploading: false },
  { key: 'exterior', label: 'Exterior Angle', icon: 'fa-solid fa-arrows-to-eye', file: null, previewUrl: null, image: null, uploading: false },
  { key: 'interior', label: 'Interior View', icon: 'fa-solid fa-couch', file: null, previewUrl: null, image: null, uploading: false },
])

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
   GALLERY METHODS & MAPPER
========================================================= */

const fetchVehicleGallery = async () => {
  if (!activeId.value) return

  try {
    loadingGallery.value = true
    const response = await getVehiclesImage()
    const data = response?.data?.data || response?.data || response || []
    const images = Array.isArray(data) ? data : []

    galleryImages.value = images.filter(image => {
      const vehicleId = image.vehicle_id ?? image.vehicleId ?? image.vehicle?.id
      return Number(vehicleId) === Number(activeId.value)
    })

    // Map fetched gallery images to slots sequentially
    gallerySlots.value.forEach((slot, index) => {
      slot.image = galleryImages.value[index] || null
      slot.file = null
      if (slot.previewUrl) URL.revokeObjectURL(slot.previewUrl)
      slot.previewUrl = null
    })

  } catch (err) {
    console.error('Failed to load vehicle gallery:', err)
  } finally {
    loadingGallery.value = false
  }
}

const getGalleryImageUrl = (image) => {
  if (!image) return ''
  return image.imageUrl || image.image_url || image.url || image.image || image.path || ''
}

const handleSlotFileChange = (event, slot) => {
  const file = event.target.files?.[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    alert('Please select an image file.')
    return
  }

  slot.file = file
  slot.previewUrl = URL.createObjectURL(file)
}

const clearSlotFile = (slot) => {
  if (slot.previewUrl) URL.revokeObjectURL(slot.previewUrl)
  slot.file = null
  slot.previewUrl = null
}

const uploadSlotImage = async (slot) => {
  if (!activeId.value) return
  if (!slot.file) return

  try {
    slot.uploading = true
    const formData = new FormData()
    formData.append('vehicle_id', String(activeId.value))
    formData.append('image', slot.file)

    await createVehicleImage(formData)
    await fetchVehicleGallery()
  } catch (err) {
    alert(err.response?.data?.message || 'Failed to upload gallery image.')
  } finally {
    slot.uploading = false
  }
}

const handleDeleteGalleryImage = async (image) => {
  if (!image?.id) return
  if (!confirm('Are you sure you want to delete this image?')) return

  try {
    await deleteVehicleImage(image.id)
    await fetchVehicleGallery()
  } catch (err) {
    alert(err.response?.data?.message || 'Failed to delete gallery image.')
  }
}

/* =========================================================
   FORM ACTIONS & UTILS
========================================================= */

const handleBack = () => router.push('/admin/vehicles')

const fetchBrands = async () => {
  try {
    loadingBrands.value = true
    const response = await getBrand()
    const data = response?.data?.data || response?.data || response || []
    brands.value = Array.isArray(data) ? data : []
  } catch (err) {
    brands.value = []
  } finally {
    loadingBrands.value = false
  }
}

const fetchCategories = async () => {
  try {
    loadingCategories.value = true
    const response = await getCategory()
    const data = response?.data?.data || response?.data || response || []
    categories.value = Array.isArray(data) ? data : []
  } catch (err) {
    categories.value = []
  } finally {
    loadingCategories.value = false
  }
}

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
    const data = response?.data?.data || response?.data || response || {}

    form.value = {
      name: data.name || '',
      brand_id: data.brand_id ?? data.brandId ?? null,
      category_id: data.category_id ?? data.categoryId ?? null,
      model: data.model || '',
      year: Number(data.year || 2024),
      plate_number: data.plate_number || data.licensePlate || '',
      transmission: data.transmission || 'Automatic',
      fuel_type: data.fuel_type || data.fuelType || 'Gasoline',
      seat: Number(data.seat ?? data.seats ?? 5),
      pricePerDay: Number(data.pricePerDay ?? data.dailyRate ?? 0),
      status: data.status || 'AVAILABLE',
      description: data.description || '',
      image: data.mainImage || data.image || ''
    }

    if (typeof form.value.image === 'string') {
      mainImagePreview.value = form.value.image
    }

  } catch (err) {
    fetchError.value = err.message || 'Failed to load vehicle details.'
  } finally {
    loading.value = false
  }
}

const handleImageChange = (event) => {
  const file = event.target.files?.[0]
  if (file) {
    form.value.image = file
    mainImagePreview.value = URL.createObjectURL(file)
  }
}

const handleSave = async () => {
  if (!activeId.value) return
  if (!form.value.brand_id) return alert('Please select a brand.')
  if (!form.value.category_id) return alert('Please select a category.')

  try {
    submitting.value = true
    const formData = new FormData()

    formData.append('name', form.value.name)
    formData.append('brand_id', String(form.value.brand_id))
    formData.append('category_id', String(form.value.category_id))
    formData.append('model', form.value.model || '')
    formData.append('year', String(form.value.year))
    formData.append('plate_number', form.value.plate_number)
    formData.append('transmission', form.value.transmission)
    formData.append('fuel_type', form.value.fuel_type)
    formData.append('seat', String(form.value.seat))
    formData.append('pricePerDay', String(form.value.pricePerDay))
    formData.append('status', form.value.status)
    formData.append('description', form.value.description || '')

    if (form.value.image instanceof File) {
      formData.append('mainImage', form.value.image)
    }

    await updateVehicle(activeId.value, formData)
    alert('Vehicle updated successfully.')
    router.push('/admin/vehicles')
  } catch (err) {
    alert(err.response?.data?.message || 'Failed to update vehicle.')
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  await Promise.all([
    fetchVehicleDetails(),
    fetchBrands(),
    fetchCategories(),
    fetchVehicleGallery()
  ])
})
</script>