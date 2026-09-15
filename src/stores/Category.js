import { defineStore } from 'pinia'
import { getCategories } from '../api/categories'

function normalizeCategory(category) {
  if (typeof category === 'string') {
    return { name: category }
  }

  return {
    ...category,
    name:
      category?.category_name ||
      category?.name ||
      category?.categoryName ||
      category?.type ||
      ''
  }
}

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchCategories() {
      this.loading = true
      this.error = null

      try {
        const response = await getCategories()
        const payload = response.data?.data ?? response.data ?? []
        const data = Array.isArray(payload) ? payload : payload.content || []

        this.categories = data
          .map(normalizeCategory)
          .filter((category) => category.name)
      } catch (error) {
        this.error =
          error.response?.data?.message || 'Failed to load categories'
        this.categories = []
      } finally {
        this.loading = false
      }
    }
  }
})
