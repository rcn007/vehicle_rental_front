import { defineStore } from 'pinia'
import { getBrands } from '../api/brand'

function normalizeBrand(brand) {
  if (typeof brand === 'string') {
    return { name: brand, logo: '' }
  }

  return {
    ...brand,
    name:
      brand?.brand_name ||
      brand?.name ||
      brand?.brandName ||
      brand?.brand ||
      '',
    logo: brand?.logo || ''
  }
}

export const useBrandStore = defineStore('brand', {
  state: () => ({
    brands: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchBrands() {
      this.loading = true
      this.error = null

      try {
        const response = await getBrands()
        const data = response.data?.data || response.data || []

        this.brands = data.map(normalizeBrand).filter((brand) => brand.name)
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to load brands'
        this.brands = []
      } finally {
        this.loading = false
      }
    }
  }
})
