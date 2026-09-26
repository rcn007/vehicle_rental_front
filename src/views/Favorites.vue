<template>
  <section class="min-h-screen bg-[var(--background)] py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-[1200px] mx-auto">

      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-[var(--text)]">My Favorites</h1>
        <p class="mt-2 text-gray-500">Vehicles you have saved for later.</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="py-20 text-center text-gray-500">
        Loading favorites...
      </div>

      <!-- Empty State -->
      <div v-else-if="favorites.length === 0" class="py-20 text-center">
        <Heart :size="48" class="mx-auto text-gray-300" />
        <h2 class="mt-4 text-xl font-semibold text-[var(--text)]">No favorite vehicles yet</h2>
        <p class="mt-2 text-gray-500">Save vehicles you like and they will appear here.</p>
        <RouterLink
          to="/vehicles"
          class="inline-block mt-6 px-5 py-3 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition"
        >
          Browse Vehicles
        </RouterLink>
      </div>

      <!-- Favorites Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <VehicleCard
          v-for="fav in favorites"
          :key="fav.favoriteId"
          :vehicle="fav.vehicle"
          :image="fav.vehicle.mainImage"
          :is-favorite="true"
          @favorite-changed="handleFavoriteChanged"
        />
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Heart } from '@lucide/vue'
import VehicleCard from '../components/VehicleCard.vue'
import { getFavorites } from '../api/favorite'

const favorites = ref([])
const loading = ref(true)

// Maps backend FavoriteVehicleResponse DTO into VehicleCard prop structure
const mapFavoriteResponse = (item) => {
  if (!item) return null

  return {
    favoriteId: item.favoriteId,
    vehicle: {
      id: item.vehicleId,
      name: item.name,
      mainImage: item.mainImage,
      model: item.model,
      year: item.year,
      transmission: item.transmission,
      fuelType: item.fuelType,
      seats: item.seat,
      pricePerDay: item.pricePerDay,
      status: item.status,
      brandName: item.brandName,
      categoryName: item.categoryName
    }
  }
}

const loadFavorites = async () => {
  loading.value = true

  try {
    const data = await getFavorites()
    
    // Normalize response array
    const rawList = Array.isArray(data) ? data : (data?.data || [])

    favorites.value = rawList
      .map(mapFavoriteResponse)
      .filter(fav => fav && fav.vehicle && fav.vehicle.id)

  } catch (error) {
    console.error('Failed to load favorites:', error)
    favorites.value = []
  } finally {
    loading.value = false
  }
}

// When client un-favorites, immediately drop vehicle from grid view
const handleFavoriteChanged = ({ vehicleId, isFavorite }) => {
  if (!isFavorite) {
    favorites.value = favorites.value.filter(
      fav => String(fav.vehicle.id) !== String(vehicleId)
    )
  }
}

onMounted(loadFavorites)
</script>