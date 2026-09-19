<template>
  <main class="p-6 md:p-8 min-h-[calc(100vh-64px)] bg-gray-50/50">
    
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
      <div>
        <div class="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <button @click="handleBack" class="hover:text-gray-900 flex items-center gap-1 transition-colors cursor-pointer">
            <i class="fa-solid fa-arrow-left text-[10px]"></i>
            <span>Back to Brands</span>
          </button>
          <span>/</span>
          <span class="text-gray-900 font-semibold">New Brand</span>
        </div>
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Add Brand</h1>
        <p class="text-gray-500 text-sm mt-1">Register a new vehicle manufacturer profile</p>
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
          <span>{{ submitting ? 'Saving...' : 'Save Brand' }}</span>
        </button>
      </div>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSave" class="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl">
      
      <!-- Main Details -->
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs space-y-5">
          <h2 class="text-base font-bold text-gray-900 border-b border-gray-100 pb-4 flex items-center gap-2">
            <i class="fa-solid fa-shield-halved text-blue-600 text-sm"></i>
            <span>Brand Profile</span>
          </h2>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Brand Name <span class="text-rose-500">*</span></label>
            <input type="text" v-model="form.name" required placeholder="e.g. Toyota, BMW" class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600">
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Logo Image URL</label>
            <input type="url" v-model="form.logo" placeholder="https://..." class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600">
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Description</label>
            <textarea v-model="form.description" rows="4" placeholder="Company profile or description..." class="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"></textarea>
          </div>
        </div>
      </div>

      <!-- Side Bar Settings -->
      <div class="space-y-6">
        <div class="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs space-y-5">
          <h2 class="text-base font-bold text-gray-900 border-b border-gray-100 pb-4">Brand Logo Preview</h2>

          <!-- Live Preview Box -->
          <div class="w-full h-32 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center p-4">
            <img v-if="form.logo" :src="form.logo" alt="Logo preview" class="max-h-full max-w-full object-contain" @error="handlePreviewError" />
            <div v-else class="text-center text-gray-400">
              <i class="fa-solid fa-image text-2xl mb-1"></i>
              <p class="text-[11px]">Logo Preview</p>
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Status</label>
            <select v-model="form.status" class="w-full h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-900 focus:outline-none">
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          <button 
            type="submit" 
            :disabled="submitting || !form.name" 
            class="w-full h-10 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-xs cursor-pointer disabled:opacity-50"
          >
            {{ submitting ? 'Processing...' : 'Confirm & Save' }}
          </button>
        </div>
      </div>

    </form>

  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createBrand } from '../../api/brands'

const router = useRouter()
const submitting = ref(false)

const form = ref({
  name: '',
  logo: '',
  description: '',
  status: 'ACTIVE'
})

const handleBack = () => router.push('/admin/brands')

const handlePreviewError = (e) => {
  e.target.style.display = 'none'
}

const handleSave = async () => {
  if (!form.value.name) return

  try {
    submitting.value = true
    await createBrand(form.value)
    router.push('/admin/brands')
  } catch (err) {
    console.error('Failed to create brand:', err)
    alert(err.response?.data?.message || err.response?.data?.msg || 'Failed to create brand.')
  } finally {
    submitting.value = false
  }
}
</script>