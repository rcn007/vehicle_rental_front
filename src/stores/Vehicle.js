import { defineStore } from 'pinia'
import api from '../api/axios'

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
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80',
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
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80',
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
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    name: 'Rolls Royce Ghost',
    brand: 'Rolls Royce',
    type: 'Luxury',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    seats: 4,
    pricePerDay: 0.3,
    rating: '4.9',
    status: 'Unavailable',
    image:
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=900&q=80',
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
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80',
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
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=80',
  },
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
    error: null,
  }),

  actions: {
    async fetchVehicles() {
      this.loading = true
      this.error = null

      try {
        const response = await api.get('/vehicle/getAll')
        const vehicles = response.data?.data || response.data || []
        this.vehicles = vehicles.length ? vehicles.map(normalizeVehicle) : sampleVehicles
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
        const response = await api.get(`/vehicle/getById/${id}`)
        this.vehicle =
          normalizeVehicle(response.data?.data || response.data) ||
          sampleVehicles.find((vehicle) => String(vehicle.id) === String(id)) ||
          sampleVehicles[0]
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to load vehicle'
        this.vehicle =
          sampleVehicles.find((vehicle) => String(vehicle.id) === String(id)) ||
          sampleVehicles[0]
      } finally {
        this.loading = false
      }
    },
  },
})
