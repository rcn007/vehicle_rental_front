import { defineStore } from 'pinia'
import api from '../api/axios'
import audiA4Image from '../assets/audiA4.jpg'

function imageUrlFrom(vehicle) {
  const vehicleImage = vehicle?.vehicle_image || vehicle?.vehicleImage
  const image = Array.isArray(vehicleImage) ? vehicleImage[0] : vehicleImage

  const url =
    vehicle?.image ||
    vehicle?.imageUrl ||
    image?.url ||
    image?.imageUrl ||
    image?.path ||
    image?.image ||
    (typeof image === 'string' ? image : null)

  // The image API currently returns Cloudinary URLs in Markdown-link form:
  // [https://...](https://...). An <img> needs only the URL in parentheses.
  const markdownUrl =
    typeof url === 'string' &&
    url.match(/^\[[^\]]*\]\((https?:\/\/[^)]+)\)$/)
  return markdownUrl ? markdownUrl[1] : url
}

function withVehicleImage(vehicle) {
  if (!vehicle || typeof vehicle !== 'object') return vehicle

  const image = imageUrlFrom(vehicle)
  return image ? { ...vehicle, image } : vehicle
}

async function withFetchedVehicleImage(vehicle) {
  try {
    const response = await api.get(`/vehicle_image/getById/${vehicle.id}`)
    const vehicleImage = response.data?.data || response.data

    return withVehicleImage({ ...vehicle, vehicle_image: vehicleImage })
  } catch {
    return withVehicleImage(vehicle)
  }
}

const sampleVehicles = [
  {
    id: 1,
    name: 'BMW 5 Series',
    brand: 'BMW',
    type: 'Sedan',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    seats: 5,
    pricePerDay: 0.1,
    rating: '4.9',
    status: 'Available',
    image:
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    name: 'Toyota RAV4 Hybrid',
    brand: 'Toyota',
    type: 'SUV',
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    seats: 5,
    pricePerDay: 0.25,
    rating: '4.7',
    status: 'Available',
    image:
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    name: 'Honda CBR650R',
    brand: 'Honda',
    type: 'Motorcycle',
    transmission: 'Manual',
    fuelType: 'Gasoline',
    seats: 2,
    pricePerDay: 0.1,
    rating: '4.8',
    status: 'Available',
    image:
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    name: 'Lamborghini Aventador',
    brand: 'Lamborghini',
    type: 'Luxury',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    seats: 2,
    pricePerDay: 350,
    rating: '4.9',
    status: 'Unavailable',
    image:
      'https://i.pinimg.com/1200x/11/43/1a/11431ab3e966a1a37530da7eaa5090fa.jpg'
  },
  {
    id: 5,
    name: 'Audi A4 Premium',
    brand: 'Audi',
    type: 'Sedan',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    seats: 5,
    pricePerDay: 0.35,
    rating: '4.6',
    status: 'Available',
    image: audiA4Image
  },
  {
    id: 6,
    name: 'Toyota Corolla Cross',
    brand: 'Toyota',
    type: 'SUV',
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    seats: 5,
    pricePerDay: 75,
    rating: '4.7',
    status: 'Available',
    image:
      'https://static0.carbuzzimages.com/wordpress/wp-content/uploads/2025/05/2026-toyota-corolla-cross-hybrid-xse-exterior-1.jpg?q=49&fit=crop&w=825&dpr=2'
  }
]

const vehicleImages = {
  'BMW 5 Series':
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80',
  'Toyota RAV4 Hybrid':
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80',
  'Honda CBR650R':
    'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80',
  'Rolls Royce Ghost':
    'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=900&q=80',
  'Audi A4 Premium':
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80',
  'Toyota Corolla Cross':
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=80',
}

function normalizeVehicle(vehicle) {
  if (!vehicle) return vehicle

  const name = vehicle.name || vehicle.model || 'Premium Vehicle'

  return {
    ...vehicle,
    name,
    brand: vehicle.brand || vehicle.brand_name || vehicle.make || 'Vehicle',
    type: vehicle.type || vehicle.category || vehicle.category_name || 'Rental',
    fuelType: vehicle.fuelType || vehicle.fuel_type || vehicle.fuel || 'Gasoline',
    seats: vehicle.seats || vehicle.seat || 4,
    image: vehicle.image || vehicle.imageUrl || vehicleImages[name] || sampleVehicles[0].image,
  }
}

export const useVehicleStore = defineStore('vehicle', {
  state: () => ({
    vehicles: [],
    vehicle: null,
    loading: false,
    error: null
  }),

  actions: {
    async fetchVehicles() {
      this.loading = true
      this.error = null

      try {
        const response = await api.get('/vehicle/getAll', {
          params: { include: 'vehicle_image' }
        })
        const vehicles = response.data?.data || response.data || sampleVehicles
        this.vehicles = Array.isArray(vehicles)
          ? await Promise.all(vehicles.map(withFetchedVehicleImage))
          : sampleVehicles
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to load vehicles'
        this.vehicles = sampleVehicles
      } finally {
        this.loading = false
      }
    },

    async fetchVehicle(id) {
      this.loading = true
      this.error = null

      try {
        // The Spring API exposes single vehicles at /vehicle/getById/{id}.
        // `include=vehicle_image` is not supported by that endpoint; images
        // are loaded by withFetchedVehicleImage below.
        const response = await api.get(`/vehicle/getById/${id}`)
        const vehicle = response.data?.data || response.data
        this.vehicle = withVehicleImage(vehicle)

        // The current backend exposes the image as a separate resource rather
        // than nesting it in GET /vehicle/{id}.
        this.vehicle = await withFetchedVehicleImage(vehicle)
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to load vehicle'
        this.vehicle =
          sampleVehicles.find((vehicle) => String(vehicle.id) === String(id)) ||
          sampleVehicles[0]
      } finally {
        this.loading = false
      }
    }
  }
})
