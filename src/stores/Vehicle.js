import { defineStore } from 'pinia'
import api from '../api/axios'

export const useVehicleStore = defineStore('vehicle', {
  state: () => ({
    vehicles: [],
    vehicle: null,

    loading: false,
    error: null
  }),

  actions: {

    // ========================================================
    // GET ALL VEHICLES
    // ========================================================

    async fetchVehicles() {
      this.loading = true
      this.error = null

      try {
        const response = await api.get('/vehicle/getAll')

        this.vehicles =
          response?.data?.data ??
          response?.data ??
          []

        // Make sure it is always an array
        if (!Array.isArray(this.vehicles)) {
          this.vehicles = []
        }

        console.log('Vehicles fetched:', this.vehicles)

        return this.vehicles

      } catch (error) {
        console.error('Failed to load vehicles:', error)

        this.error =
          error.response?.data?.message ||
          error.response?.data?.msg ||
          error.message ||
          'Failed to load vehicles'

        this.vehicles = []

        throw error

      } finally {
        this.loading = false
      }
    },

    // ========================================================
    // GET VEHICLE BY ID
    // ========================================================

    async fetchVehicle(id) {
      this.loading = true
      this.error = null

      try {
        const response = await api.get(
          `/vehicle/getById/${id}`
        )

        this.vehicle =
          response?.data?.data ??
          response?.data ??
          null

        console.log(
          'Vehicle fetched:',
          this.vehicle
        )

        return this.vehicle

      } catch (error) {
        console.error(
          'Failed to load vehicle:',
          error
        )

        this.error =
          error.response?.data?.message ||
          error.response?.data?.msg ||
          error.message ||
          'Failed to load vehicle'

        this.vehicle = null

        throw error

      } finally {
        this.loading = false
      }
    },

    // ========================================================
    // CLEAR CURRENT VEHICLE
    // ========================================================

    clearVehicle() {
      this.vehicle = null
      this.error = null
    }
  }
})