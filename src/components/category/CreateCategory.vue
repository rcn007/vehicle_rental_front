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
          <span class="text-gray-900 font-semibold">New Category</span>
        </div>
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Add Category</h1>
        <p class="text-gray-500 text-sm mt-1">Define a new vehicle classification group</p>
      </div>

      <div class="flex items-center gap-3">
        <button 
          type="button" 
          @click="handleBack" 
          class="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-all shadow-xs cursor-pointer active:scale-95"
        >
          <span>Cancel</span>
        </button>
        <button 
          type="button" 
          @click="handleSave" 
          :disabled="submitting || !form.name" 
          class="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-all shadow-xs cursor-pointer active:scale-95"
        >
          <i v-if="submitting" class="fa-solid fa-circle-notch fa-spin text-xs"></i>
          <i v-else class="fa-solid fa-check text-xs"></i>
          <span>{{ submitting ? 'Saving...' : 'Save Category' }}</span>
        </button>
      </div>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSave" class="max-w-2xl bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs space-y-5">
      <h2 class="text-base font-bold text-gray-900 border-b border-gray-100 pb-4 flex items-center gap-2">
        <i class="fa-solid fa-shapes text-blue-600 text-sm"></i>
        <span>Category Information</span>
      </h2>

      <div>
        <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Category Name <span class="text-rose-500">*</span></label>
        <input type="text" v-model="form.name" required placeholder="e.g. Electric SUV" class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600">
      </div>

      <div>
        <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Description</label>
        <textarea v-model="form.description" rows="4" placeholder="Briefly describe this category..." class="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"></textarea>
      </div>

      <div>
        <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Status</label>
        <select v-model="form.status" class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-900 focus:outline-none">
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>

      <div class="pt-2">
        <button 
          type="submit" 
          :disabled="submitting || !form.name" 
          class="w-full h-10 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-xs cursor-pointer disabled:opacity-50"
        >
          {{ submitting ? 'Processing...' : 'Confirm & Save' }}
        </button>
      </div>
    </form>

  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createCategory } from '../../api/category'

const router = useRouter()
const submitting = ref(false)

const form = ref({
  name: '',
  description: '',
  status: 'ACTIVE'
})

const handleBack = () => router.push('/admin/categories')

const handleSave = async () => {
  if (!form.value.name) return

  try {
    submitting.value = true
    await createCategory(form.value)
    router.push('/admin/categories')
  } catch (err) {
    console.error('Failed to create category:', err)
    alert(err.response?.data?.message || err.response?.data?.msg || 'Failed to create category.')
  } finally {
    submitting.value = false
  }
}
</script>