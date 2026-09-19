<template>
  <main class="p-6 md:p-8 min-h-[calc(100vh-64px)] bg-gray-50/50">
    
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
      <div>
        <div class="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <button @click="handleBack" class="hover:text-gray-900 flex items-center gap-1 transition-colors cursor-pointer">
            <i class="fa-solid fa-arrow-left text-[10px]"></i>
            <span>Back to Categories</span>
          </button>
          <span>/</span>
          <span class="text-gray-900 font-semibold">Edit #{{ activeId }}</span>
        </div>
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Update Category</h1>
        <p class="text-gray-500 text-sm mt-1">Modify category title, description, or status</p>
      </div>

      <div class="flex items-center gap-3">
        <button type="button" @click="handleBack" class="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-all shadow-xs cursor-pointer active:scale-95">
          <span>Cancel</span>
        </button>
        <button type="button" @click="handleSave" :disabled="submitting || loading" class="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-all shadow-xs cursor-pointer active:scale-95">
          <i v-if="submitting" class="fa-solid fa-circle-notch fa-spin text-xs"></i>
          <i v-else class="fa-solid fa-floppy-disk text-xs"></i>
          <span>{{ submitting ? 'Saving...' : 'Save Changes' }}</span>
        </button>
      </div>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="loading" class="max-w-2xl bg-white border border-gray-200/80 rounded-xl p-8 shadow-xs animate-pulse space-y-6">
      <div class="h-6 bg-gray-200 rounded w-1/3"></div>
      <div class="h-10 bg-gray-200 rounded"></div>
      <div class="h-24 bg-gray-200 rounded"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="fetchError" class="max-w-2xl p-8 bg-white border border-gray-200/80 rounded-xl text-center">
      <i class="fa-solid fa-triangle-exclamation text-rose-500 text-2xl mb-2"></i>
      <p class="text-gray-900 font-semibold mb-1">Failed to load category details</p>
      <p class="text-gray-500 text-xs mb-4">{{ fetchError }}</p>
      <button @click="fetchCategoryDetails" class="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700">Retry</button>
    </div>

    <!-- Form -->
    <form v-else @submit.prevent="handleSave" class="max-w-2xl bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs space-y-5">
      <h2 class="text-base font-bold text-gray-900 border-b border-gray-100 pb-4 flex items-center gap-2">
        <i class="fa-solid fa-pen-to-square text-blue-600 text-sm"></i>
        <span>Edit Category Details</span>
      </h2>

      <div>
        <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Category Name <span class="text-rose-500">*</span></label>
        <input type="text" v-model="form.name" required class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600">
      </div>

      <div>
        <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Description</label>
        <textarea v-model="form.description" rows="4" class="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"></textarea>
      </div>

      <div>
        <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Status</label>
        <select v-model="form.status" class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-900 focus:outline-none">
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>

      <div class="pt-2">
        <button type="submit" :disabled="submitting" class="w-full h-10 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-xs cursor-pointer disabled:opacity-50">
          Save Updates
        </button>
      </div>
    </form>

  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCategoryById, updateCategory } from '../../api/category'

const props = defineProps({ id: { type: [String, Number], default: null } })
const route = useRoute()
const router = useRouter()

const activeId = computed(() => props.id || route.params.id)

const loading = ref(true)
const submitting = ref(false)
const fetchError = ref(null)

const form = ref({
  name: '',
  description: '',
  status: 'ACTIVE'
})

const handleBack = () => router.push('/admin/categories')

const fetchCategoryDetails = async () => {
  if (!activeId.value) return
  try {
    loading.value = true
    fetchError.value = null
    const res = await getCategoryById(activeId.value)
    const data = res?.data || res || {}

    form.value = {
      name: data.name || '',
      description: data.description || '',
      status: String(data.status || 'ACTIVE').toUpperCase()
    }
  } catch (err) {
    console.error('Failed to load category:', err)
    fetchError.value = err.response?.data?.message || err.response?.data?.msg || 'Failed to retrieve category details.'
  } finally {
    loading.value = false
  }
}

const handleSave = async () => {
  try {
    submitting.value = true
    await updateCategory(activeId.value, form.value)
    router.push('/admin/categories')
  } catch (err) {
    console.error('Failed to update category:', err)
    alert(err.response?.data?.message || err.response?.data?.msg || 'Failed to update category.')
  } finally {
    submitting.value = false
  }
}

onMounted(fetchCategoryDetails)
</script>