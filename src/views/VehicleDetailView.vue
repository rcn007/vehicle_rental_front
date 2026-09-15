<template>
  <section class="vehicle-page">
    <div class="container">
      <!-- Back Button Navigation -->
      <div class="nav-back-wrapper">
        <RouterLink to="/vehicles" class="back-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Vehicles
        </RouterLink>
      </div>

      <!-- Loading State -->
      <div v-if="vehicleStore.loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading vehicle details...</p>
      </div>

      <!-- Vehicle Content Shell -->
      <div
        v-else-if="vehicleStore.vehicle"
        class="vehicle-detail-shell"
      >
        <!-- Main Vehicle Section -->
        <div class="vehicle-main">

          <!-- Image Showcase Panel -->
          <div class="image-showcase">
            <div class="main-image-wrapper">
              <img
                :src="selectedImage || primaryImage"
                :alt="vehicleStore.vehicle.name"
                class="detail-image"
                @error="handleMainImageError"
              />
              <div
                class="status-badge-floating"
                :class="{ unavailable: !isAvailable }"
              >
                {{ statusText }}
              </div>
            </div>

            <!-- Thumbnail Selector Strip -->
            <div v-if="galleryImages.length > 1" class="thumbnail-strip">
              <button
                v-for="(img, index) in galleryImages"
                :key="index"
                class="thumb-btn"
                :class="{ active: (selectedImage || primaryImage) === img }"
                @click="selectedImage = img"
              >
                <img :src="img" alt="Thumbnail preview" />
              </button>
            </div>
          </div>

          <!-- Vehicle Information Panel -->
          <div class="detail-panel">
            <div class="brand-subtitle">
              {{ vehicleStore.vehicle.brand_name || 'Brand' }} • {{ vehicleStore.vehicle.model || 'Model' }} ({{ vehicleStore.vehicle.year || '2026' }})
            </div>

            <h1>{{ vehicleStore.vehicle.name }}</h1>

            <p class="vehicle-description">
              {{
                vehicleStore.vehicle.description ||
                'Experience premium comfort, reliability, and modern efficiency on your upcoming journey with this top-tier vehicle.'
              }}
            </p>

            <!-- Expanded Specifications Grid -->
            <div class="spec-grid">
              <!-- Category -->
              <div class="spec-item">
                <span class="spec-label">Category</span>
                <span class="spec-value">{{ vehicleStore.vehicle.category_name || '-' }}</span>
              </div>

              <!-- Fuel Type -->
              <div class="spec-item">
                <span class="spec-label">Fuel Type</span>
                <span class="spec-value">{{ vehicleStore.vehicle.fuel_type || 'Gasoline' }}</span>
              </div>

              <!-- Transmission -->
              <div class="spec-item">
                <span class="spec-label">Transmission</span>
                <span class="spec-value">{{ vehicleStore.vehicle.transmission || 'Automatic' }}</span>
              </div>

              <!-- Seats -->
              <div class="spec-item">
                <span class="spec-label">Capacity</span>
                <span class="spec-value">{{ vehicleStore.vehicle.seat ?? 4 }} Seats</span>
              </div>

              <!-- Year -->
              <div class="spec-item">
                <span class="spec-label">Year</span>
                <span class="spec-value">{{ vehicleStore.vehicle.year || '-' }}</span>
              </div>

              <!-- Plate Number -->
              <div class="spec-item">
                <span class="spec-label">Plate No.</span>
                <span class="spec-value plate-text">{{ vehicleStore.vehicle.plate_number || 'Confidential' }}</span>
              </div>
            </div>

            <!-- Price & Booking Block -->
            <div class="booking-card-action">
              <div class="price-block">
                <span class="currency">$</span>
                <span class="amount">{{ vehicleStore.vehicle.pricePerDay || 0 }}</span>
                <small>/ day</small>
              </div>

              <RouterLink
                v-if="isAvailable"
                :to="`/booking/${vehicleStore.vehicle.id}`"
                class="book-button"
              >
                Book This Vehicle Now
              </RouterLink>

              <button
                v-else
                class="book-button disabled-button"
                disabled
              >
                Currently Unavailable
              </button>
            </div>

          </div>
        </div>

        <!-- Gallery Grid Section -->
        <div class="gallery-section">
          <h2>Vehicle Gallery</h2>

          <div
            v-if="galleryImages.length"
            class="gallery-grid"
          >
            <div
              v-for="(img, index) in galleryImages"
              :key="index"
              class="gallery-item"
              @click="selectedImage = img"
            >
              <img
                :src="img"
                :alt="`${vehicleStore.vehicle.name} gallery view ${index + 1}`"
                @error="handleGalleryImageError"
              />
            </div>
          </div>

          <div
            v-else
            class="no-images"
          >
            <p>No additional gallery images available for this vehicle.</p>
          </div>
        </div>

      </div>

      <!-- Vehicle Not Found -->
      <div
        v-else-if="!vehicleStore.loading"
        class="loading-state"
      >
        <p>Vehicle not found or has been removed.</p>
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useVehicleStore } from '../stores/Vehicle'
import { getVehiclesImage } from '../api/vehicle'

const route = useRoute()
const vehicleStore = useVehicleStore()

const vehicleImages = ref([])
const imageLoading = ref(false)
const selectedImage = ref(null)

const API_BASE_URL = 'http://localhost:8080'

function getResponseData(response) {
  const data = response?.data ?? response

  if (Array.isArray(data)) return data
  if (Array.isArray(data?.data)) return data.data
  if (Array.isArray(data?.content)) return data.content

  return []
}

function formatImageUrl(rawPath) {
  if (!rawPath) return null

  if (
    rawPath.startsWith('http://') ||
    rawPath.startsWith('https://') ||
    rawPath.startsWith('data:')
  ) {
    return rawPath
  }

  const cleanPath = rawPath.startsWith('/')
    ? rawPath
    : `/${rawPath}`

  return `${API_BASE_URL}${cleanPath}`
}

function getImageRawValue(image) {
  if (!image) return null
  if (typeof image === 'string') return image

  return (
    image.image ||
    image.imageUrl ||
    image.url ||
    image.path ||
    image.imagePath ||
    null
  )
}

function isImageForVehicle(image, vehicle) {
  if (!image || !vehicle) return false

  const vehicleId = Number(vehicle.id)
  const imageVehicleId = Number(
    image.vehicle_id ??
    image.vehicleId ??
    image.vehicle?.id ??
    image.vehicle?.vehicleId
  )

  if (imageVehicleId && vehicleId && imageVehicleId === vehicleId) {
    return true
  }

  const vehicleName = String(vehicle.name || vehicle.model || '').trim().toLowerCase()
  const imageVehicleName = String(image.vehicle_name || image.vehicleName || image.name || '').trim().toLowerCase()

  return vehicleName && imageVehicleName && vehicleName === imageVehicleName
}

const currentVehicleImages = computed(() => {
  const vehicle = vehicleStore.vehicle
  if (!vehicle) return []

  const matchedImages = vehicleImages.value.filter((image) =>
    isImageForVehicle(image, vehicle)
  )

  return matchedImages
    .map((image) => formatImageUrl(getImageRawValue(image)))
    .filter(Boolean)
})

const primaryImage = computed(() => {
  if (currentVehicleImages.value.length > 0) {
    return currentVehicleImages.value[0]
  }

  const vehicle = vehicleStore.vehicle
  const raw = vehicle?.image || vehicle?.imageUrl || vehicle?.imagePath

  if (raw) return formatImageUrl(raw)

  return '/images/vehicle-placeholder.jpg'
})

const galleryImages = computed(() => {
  return currentVehicleImages.value.length > 0
    ? currentVehicleImages.value
    : [primaryImage.value]
})

const isAvailable = computed(() => {
  const status = String(
    vehicleStore.vehicle?.status || 'AVAILABLE'
  ).toLowerCase()

  return status === 'available'
})

const statusText = computed(() => {
  return vehicleStore.vehicle?.status || 'AVAILABLE'
})

async function fetchVehicleImages() {
  imageLoading.value = true
  try {
    const response = await getVehiclesImage()
    vehicleImages.value = getResponseData(response)
  } catch (error) {
    console.error('Failed to fetch vehicle images:', error)
    vehicleImages.value = []
  } finally {
    imageLoading.value = false
  }
}

const handleMainImageError = (event) => {
  const placeholder = '/images/vehicle-placeholder.jpg'
  if (!event.target.src.includes(placeholder)) {
    event.target.src = placeholder
  }
}

const handleGalleryImageError = (event) => {
  const placeholder = '/images/vehicle-placeholder.jpg'
  if (!event.target.src.includes(placeholder)) {
    event.target.src = placeholder
  }
}

watch(() => vehicleStore.vehicle?.id, () => {
  selectedImage.value = null
})

onMounted(async () => {
  await vehicleStore.fetchVehicle(route.params.id)
  await fetchVehicleImages()
})
</script>

<style scoped>
.vehicle-page {
  padding: 24px 0 80px;
  background: #f8fafc;
  min-height: 100vh;
}

.container {
  width: min(1300px, 92%);
  margin: 0 auto;
}

.nav-back-wrapper {
  margin-bottom: 20px;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #475569;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 8px 16px;
  border-radius: 10px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(15, 23, 42, 0.02);
}

.back-button:hover {
  color: #0f172a;
  background: #f1f5f9;
  border-color: #cbd5e1;
}

.loading-state {
  padding: 80px 20px;
  text-align: center;
  color: #64748b;
  font-size: 1.15rem;
  font-weight: 500;
}

.vehicle-detail-shell {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
}

.vehicle-main {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 36px;
  align-items: start;
}

.image-showcase {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.main-image-wrapper {
  position: relative;
  height: 460px;
  background: #f1f5f9;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.detail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.status-badge-floating {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  background: #dcfce7;
  color: #166534;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.status-badge-floating.unavailable {
  background: #fef3c7;
  color: #92400e;
}

.thumbnail-strip {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.thumb-btn {
  width: 76px;
  height: 60px;
  border-radius: 10px;
  border: 2px solid transparent;
  overflow: hidden;
  background: #f1f5f9;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s ease;
}

.thumb-btn img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumb-btn.active {
  border-color: #2563eb;
  transform: scale(1.05);
}

.detail-panel {
  display: flex;
  flex-direction: column;
}

.brand-subtitle {
  font-size: 0.9rem;
  font-weight: 600;
  color: #2563eb;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 6px;
}

.detail-panel h1 {
  margin: 0 0 12px 0;
  font-size: clamp(2rem, 2.5vw, 2.6rem);
  line-height: 1.15;
  color: #0f172a;
  font-weight: 800;
}

.vehicle-description {
  margin: 0 0 24px 0;
  color: #475569;
  font-size: 1.02rem;
  line-height: 1.5;
}

.spec-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 28px;
}

.spec-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px;
}

.spec-label {
  color: #64748b;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.spec-value {
  color: #0f172a;
  font-size: 1rem;
  font-weight: 700;
}

.plate-text {
  font-family: monospace;
  letter-spacing: 0.05em;
}

.booking-card-action {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.price-block {
  display: flex;
  align-items: baseline;
  gap: 2px;
  color: #0f172a;
}

.price-block .currency {
  font-size: 1.4rem;
  font-weight: 700;
}

.price-block .amount {
  font-size: 2.4rem;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.price-block small {
  font-size: 0.95rem;
  color: #64748b;
  margin-left: 4px;
}

.book-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 52px;
  background: #0f172a;
  color: #ffffff;
  font-weight: 700;
  font-size: 1.05rem;
  border-radius: 12px;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
}

.book-button:hover {
  background: #1e293b;
}

.disabled-button {
  background: #cbd5e1;
  cursor: not-allowed;
}

.gallery-section {
  margin-top: 48px;
  border-top: 1px solid #e2e8f0;
  padding-top: 32px;
}

.gallery-section h2 {
  margin: 0 0 20px 0;
  font-size: 1.5rem;
  color: #0f172a;
  font-weight: 700;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.gallery-item {
  height: 200px;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  background: #f1f5f9;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.gallery-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.no-images {
  padding: 30px;
  text-align: center;
  background: #f8fafc;
  border-radius: 12px;
  color: #64748b;
  border: 1px dashed #cbd5e1;
}

@media (max-width: 900px) {
  .vehicle-main {
    grid-template-columns: 1fr;
  }

  .gallery-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .spec-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .gallery-grid {
    grid-template-columns: 1fr;
  }
}
</style>