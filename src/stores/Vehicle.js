import { defineStore } from 'pinia'
import api from '../api/axios'
import audiA4Image from '../assets/audiA4.jpg'

const sampleVehicles = [
  {
    id: 1,
    name: 'BMW 5 Series',
    brand: 'BMW',
    type: 'Sedan',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    seats: 5,
    pricePerDay: 120,
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
    pricePerDay: 85,
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
    pricePerDay: 45,
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
    pricePerDay: 95,
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
        const response = await api.get('/vehicles')
        this.vehicles = response.data?.data || response.data || sampleVehicles
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
        const response = await api.get(`/vehicles/${id}`)
        this.vehicle = response.data?.data || response.data
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
