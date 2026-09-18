<template>
  <main class="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-[#10B981] selection:text-white">
    <!-- State: Loading -->
    <div v-if="loading" class="min-h-screen flex items-center justify-center bg-slate-50">
      <div class="text-center">
        <div class="relative w-12 h-12 mx-auto mb-4">
          <div class="absolute inset-0 rounded-full border-4 border-slate-200" />
          <div class="absolute inset-0 rounded-full border-4 border-t-[#10B981] animate-spin" />
        </div>
        <p class="text-sm font-medium text-slate-500 tracking-wide uppercase">Loading experience...</p>
      </div>
    </div>

    <!-- State: Error -->
    <div v-else-if="error" class="min-h-screen flex items-center justify-center px-6">
      <div class="text-center bg-white rounded-2xl shadow-xl shadow-slate-200/60 p-8 max-w-md border border-slate-100">
        <div class="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">!</div>
        <h2 class="text-xl font-bold text-slate-900 mb-2">Unable to load home page</h2>
        <p class="text-sm text-slate-500 mb-6 leading-relaxed">{{ error }}</p>
        <button
          class="px-6 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#0D9668] text-white font-semibold transition-all shadow-lg shadow-[#10B981]/25 active:scale-95"
          @click="loadHomeData"
        >
          Try Again
        </button>
      </div>
    </div>

    <!-- State: Ready -->
    <div v-else>
      <!-- Hero Section -->
<!-- Hero Section -->
<section
  class="relative min-h-[620px] lg:min-h-[680px] bg-slate-950 text-white overflow-hidden bg-cover bg-center"
  :style="heroStyle"
>
  <!-- Background overlay -->
  <div class="absolute inset-0 bg-slate-950/60" />

  <!-- Stronger left-side gradient for readable text -->
  <div
    class="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/20"
  />

  <!-- Bottom fade -->
  <div
    class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/40 to-transparent"
  />

  <div
    class="container relative z-10 mx-auto px-6 lg:px-8 min-h-[620px] lg:min-h-[680px] flex items-center"
  >
    <div class="max-w-3xl py-20 sm:py-24 lg:py-28">

    

      <!-- Hero Title -->
      <h1
        class="text-4xl sm:text-5xl lg:text-4xl xl:text-5xl
               font-extrabold tracking-tight
               text-white leading-[1.05]
               mb-6 max-w-3xl"
      >
        {{ heroTitle }}
      </h1>

      <!-- Hero Description -->
      <p
        class="text-base sm:text-lg lg:text-xl
               text-slate-300
               leading-relaxed
               max-w-2xl
               mb-9"
      >
        {{ heroDescription }}
      </p>

      <!-- Hero Buttons -->
      <div class="flex flex-wrap items-center gap-4">

        <!-- Dynamic Customizer Button -->
        <RouterLink
          :to="heroButtonLink"
          class="inline-flex items-center justify-center gap-2
                 px-7 py-3.5
                 rounded-xl
                 bg-[#10B981]
                 hover:bg-[#0D9668]
                 text-white
                 font-semibold
                 shadow-xl shadow-[#10B981]/25
                 transition-all duration-200
                 hover:-translate-y-0.5
                 active:translate-y-0"
        >
          {{ heroButtonText }}

          <ArrowRight
            :size="18"
            class="transition-transform group-hover:translate-x-1"
          />
        </RouterLink>

        <!-- Secondary Button -->
        <RouterLink
          to="/about"
          class="inline-flex items-center justify-center
                 px-7 py-3.5
                 rounded-xl
                 bg-white/10
                 hover:bg-white/20
                 backdrop-blur-md
                 border border-white/20
                 text-white
                 font-semibold
                 transition-all duration-200
                 hover:-translate-y-0.5
                 active:translate-y-0"
        >
          Learn More
        </RouterLink>

      </div>

      <!-- Small trust information -->
      <div
        class="flex flex-wrap items-center gap-x-6 gap-y-3
               mt-10 text-sm text-slate-300"
      >
        <div class="flex items-center gap-2">
          <ShieldCheck
            :size="17"
            class="text-emerald-400"
          />
          <span>Safe & Reliable</span>
        </div>

        <div class="hidden sm:block w-1 h-1 rounded-full bg-slate-500" />

        <div class="flex items-center gap-2">
          <Zap
            :size="17"
            class="text-emerald-400"
          />
          <span>Easy Booking</span>
        </div>

        <div class="hidden sm:block w-1 h-1 rounded-full bg-slate-500" />

        <div class="flex items-center gap-2">
          <Headphones
            :size="17"
            class="text-emerald-400"
          />
          <span>24/7 Support</span>
        </div>
      </div>

    </div>
  </div>
</section>

      <!-- Stats Band -->
      <section class="bg-white border-y border-slate-100 py-10 shadow-sm">
        <div class="container mx-auto px-6 lg:px-8">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-slate-100">
            <div v-for="stat in stats" :key="stat.label" class="px-4">
              <div class="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-1">{{ stat.value }}</div>
              <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Category Section -->
      <section class="py-20">
        <div class="container mx-auto px-6 lg:px-8">
          <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span class="text-xs font-bold text-[#10B981] tracking-wider uppercase mb-1 block">Explore</span>
              <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight">Browse By Category</h2>
            </div>
            <RouterLink 
              to="/categories" 
              class="inline-flex items-center gap-2 text-sm font-bold text-[#10B981] hover:text-[#0D9668] group transition-colors"
            >
              View All 
              <ArrowRight :size="16" class="transition-transform group-hover:translate-x-1" />
            </RouterLink>
          </div>

          <div v-if="categories.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              v-for="category in categories"
              :key="category.id || category.categoryId || category.name"
              class="group relative bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all hover:-translate-y-1 cursor-pointer overflow-hidden"
            >
              <div class="w-14 h-14 rounded-xl bg-emerald-50 text-[#10B981] flex items-center justify-center mb-5 group-hover:bg-[#10B981] group-hover:text-white transition-colors duration-300">
                <component :is="getCategoryIcon(category)" :size="28" />
              </div>
              <h3 class="text-lg font-bold text-slate-900 group-hover:text-[#10B981] transition-colors mb-1">
                {{ getCategoryName(category) }}
              </h3>
              <p class="text-xs font-medium text-slate-400">
                {{ getCategoryVehicleCount(category) }} vehicles available
              </p>
            </div>
          </div>

          <div v-else class="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400 text-sm">
            No categories available right now.
          </div>
        </div>
      </section>

      <!-- Featured Vehicles Section -->
      <section class="py-20 bg-slate-100/60 border-y border-slate-200/60">
        <div class="container mx-auto px-6 lg:px-8">
          <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span class="text-xs font-bold text-[#10B981] tracking-wider uppercase mb-1 block">Our Fleet</span>
              <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight">Featured Vehicles</h2>
            </div>
            <RouterLink 
              to="/vehicles" 
              class="inline-flex items-center gap-2 text-sm font-bold text-[#10B981] hover:text-[#0D9668] group transition-colors"
            >
              View All 
              <ArrowRight :size="16" class="transition-transform group-hover:translate-x-1" />
            </RouterLink>
          </div>

          <div v-if="vehicleStore.loading" class="text-center py-16 text-slate-400 text-sm">
            Loading vehicles...
          </div>

          <div v-else-if="featuredVehicles.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <VehicleCard
              v-for="vehicle in featuredVehicles"
              :key="vehicle.id"
              :vehicle="vehicle"
              :image="getVehicleImage(vehicle)"
              class="transition-all hover:-translate-y-1 hover:shadow-xl"
            />
          </div>

          <div v-else class="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400 text-sm">
            No vehicles available at the moment.
          </div>
        </div>
      </section>

      <!-- Benefits Section -->
      <section class="py-24">
        <div class="container mx-auto px-6 lg:px-8">
          <div class="max-w-xl mx-auto text-center mb-16">
            <span class="text-xs font-bold text-[#10B981] tracking-wider uppercase mb-1 block">Why Choose Us</span>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Rental Made Simple</h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div 
              v-for="benefit in benefits" 
              :key="benefit.title" 
              class="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div class="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-6">
                <component :is="benefit.icon" :size="24" />
              </div>
              <h3 class="text-base font-bold text-slate-900 mb-2">{{ benefit.title }}</h3>
              <p class="text-xs font-normal text-slate-500 leading-relaxed">{{ benefit.description }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  ArrowRight,
  Bike,
  Car,
  DollarSign,
  Gem,
  Headphones,
  ShieldCheck,
  Zap
} from '@lucide/vue'

import VehicleCard from '../components/VehicleCard.vue'
import { useVehicleStore } from '../stores/Vehicle'
import { getCustomizerSettings, getCategories, getVehiclesImage } from '../api/home'

// --- Configuration & Constants ---
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Safe & Reliable',
    description: 'Every vehicle is checked and maintained before rental.'
  },
  {
    icon: DollarSign,
    title: 'Transparent Pricing',
    description: 'No hidden fees. What you see is what you pay.'
  },
  {
    icon: Zap,
    title: 'Easy Booking',
    description: 'Book your vehicle quickly and easily online.'
  },
  {
    icon: Headphones,
    title: 'Customer Support',
    description: 'Our team is ready to help whenever you need us.'
  }
]

// --- State ---
const vehicleStore = useVehicleStore()
const customizer = ref(null)
const categories = ref([])
const vehicleImages = ref([])
const loading = ref(true)
const error = ref(null)

// --- Helper Functions ---
const unwrapResponse = (res) => {
  if (!res) return []
  if (Array.isArray(res)) return res
  if (Array.isArray(res.data)) return res.data
  if (Array.isArray(res.content)) return res.content
  if (Array.isArray(res.data?.content)) return res.data.content
  return []
}

const formatImageUrl = (rawPath) => {
  if (!rawPath) return null
  if (/^(https?:\/\/|data:)/i.test(rawPath)) return rawPath
  const cleanPath = rawPath.startsWith('/') ? rawPath : `/${rawPath}`
  return `${API_BASE_URL}${cleanPath}`
}

const getBrandName = (vehicle) => {
  if (vehicle?.brand && typeof vehicle.brand === 'object') {
    return vehicle.brand.name || vehicle.brand.brandName || 'Vehicle'
  }
  return vehicle?.brandName || vehicle?.brand_name || vehicle?.brand || 'Vehicle'
}

const getCategoryName = (category) => {
  if (typeof category === 'string') return category
  return category?.categoryName || category?.name || category?.category_name || 'Category'
}

const getCategoryVehicleCount = (category) => {
  return category?.vehicleCount ?? category?.vehicle_count ?? category?.count ?? 0
}

const getCategoryIcon = (category) => {
  const name = getCategoryName(category).toLowerCase()
  if (name.includes('motor') || name.includes('bike')) return Bike
  if (name.includes('luxury') || name.includes('premium')) return Gem
  return Car
}

const getVehicleImage = (vehicle) => {
  if (!vehicle) return null

  if (Array.isArray(vehicle.vehicleImages) && vehicle.vehicleImages.length > 0) {
    const imgObj = vehicle.vehicleImages[0]
    const raw = typeof imgObj === 'string' ? imgObj : (imgObj?.image || imgObj?.imageUrl || imgObj?.url || imgObj?.path)
    if (raw) return formatImageUrl(raw)
  }

  const directPath = vehicle.image || vehicle.imageUrl
  if (typeof directPath === 'string' && directPath) {
    return formatImageUrl(directPath)
  }

  if (Array.isArray(vehicleImages.value) && vehicleImages.value.length > 0) {
    const vehicleName = (vehicle.name || `${getBrandName(vehicle)} ${vehicle.model || ''}`).trim().toLowerCase()
    
    const match = vehicleImages.value.find((img) => {
      const imgVehicleId = Number(img.vehicle_id ?? img.vehicleId)
      if (imgVehicleId && imgVehicleId === Number(vehicle.id)) return true

      const imgName = String(img.vehicle_name ?? img.vehicleName ?? img.name ?? '').trim().toLowerCase()
      return imgName && imgName === vehicleName
    })

    if (match) {
      const raw = match.image || match.imageUrl || match.url || match.path
      if (raw) return formatImageUrl(raw)
    }
  }

  return null
}

// --- Computed Properties ---
const heroTitle = computed(() => {
  return (
    customizer.value?.title ||
    'Rent Your Perfect Vehicle Anywhere'
  )
})

const heroDescription = computed(() => {
  return (
    customizer.value?.description ||
    'Premium vehicles at your fingertips. Book online in minutes, drive with confidence.'
  )
})

const heroImage = computed(() => {
  return customizer.value?.heroImage || null
})

const heroButtonText = computed(() => {
  return (
    customizer.value?.buttonText ||
    'Browse Vehicles'
  )
})

const heroButtonLink = computed(() => {
  return (
    customizer.value?.buttonLink ||
    '/vehicles'
  )
})
const heroStyle = computed(() => {
  if (!heroImage.value) {
    return {
      backgroundImage:
        'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
    }
  }

  return {
    backgroundImage: `url("${formatImageUrl(heroImage.value)}")`
  }
})

const availableVehicleCount = computed(() => {
  return vehicleStore.vehicles.filter((v) => {
    const status = String(v?.status || '').toLowerCase()
    return status === 'available' || status.includes('available')
  }).length
})

const featuredVehicles = computed(() => vehicleStore.vehicles.slice(0, 3))

const stats = computed(() => [
  {
    value: customizer.value?.happyCustomers || '10,000+',
    label: 'Happy Customers'
  },
  {
    value: vehicleStore.vehicles.length > 0 ? `${vehicleStore.vehicles.length}+` : '0',
    label: 'Vehicles Available'
  },
  {
    value: customizer.value?.citiesCovered || '50+',
    label: 'Cities Covered'
  },
  {
    value: customizer.value?.averageRating || '4.9★',
    label: 'Average Rating'
  }
])

// --- Data Fetching ---
const loadHomeData = async () => {
  loading.value = true
  error.value = null

  try {
    const [customizerData, categoriesData, imagesData] = await Promise.all([
      getCustomizerSettings(),
      getCategories(),
      getVehiclesImage()
    ])

    customizer.value = customizerData
    categories.value = unwrapResponse(categoriesData)
    vehicleImages.value = unwrapResponse(imagesData)

    await vehicleStore.fetchVehicles()
  } catch (err) {
    console.error('Failed to load home page:', err)
    error.value = err.response?.data?.message || err.response?.data?.msg || err.message || 'Failed to load home page data.'
  } finally {
    loading.value = false
  }
}

onMounted(loadHomeData)
</script>