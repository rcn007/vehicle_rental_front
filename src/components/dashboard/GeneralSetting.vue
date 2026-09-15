<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 text-[--text">
    <!-- Left Configuration Columns -->
    <div class="lg:col-span-2 space-y-6">

      <!-- Toast Alert Notification -->
      <transition name="fade">
        <div
          v-if="toast.show"
          :class="[
            'p-4 rounded-xl border flex items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.2)]',
            toast.type === 'success'
              ? 'bg-[#10b981]/10 border-[#10b981]/20 text-[#10b981]'
              : 'bg-[#ef4444]/10 border-[#ef4444]/20 text-[#ef4444]'
          ]"
        >
          <div class="flex items-center gap-3 text-sm font-medium">
            <i
              :class="
                toast.type === 'success'
                  ? 'fa-solid fa-circle-check text-[#10b981]'
                  : 'fa-solid fa-circle-exclamation text-[#ef4444]'
              "
            ></i>
            <span>{{ toast.message }}</span>
          </div>

          <button
            type="button"
            @click="toast.show = false"
            class="text-xs opacity-70 hover:opacity-100 cursor-pointer text-[#94a3b8]"
          >
            <i class="fa-solid fa-xmark text-base"></i>
          </button>
        </div>
      </transition>

      <!-- Loading State -->
      <div
        v-if="loading"
        class="bg-[--background] border border-[#334155] rounded-xl p-12 text-center text-[#94a3b8] shadow-[0_1px_3px_rgba(0,0,0,0.2)]"
      >
        <i class="fa-solid fa-spinner animate-spin text-3xl text-[--text] mb-3"></i>
        <p class="text-sm font-medium">Loading customizer settings...</p>
      </div>

      <div v-else class="space-y-6">
        <!-- Site Branding Card -->
        <div class="bg-[--background] border border-[#334155] rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.2)]">
          <h2 class="text-base font-bold text-[--text] mb-1">Site Branding</h2>
          <p class="text-xs text-[--text] mb-4">
            Manage your platform logo and visual identity.
          </p>

          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <!-- Logo Preview -->
            <div
              class="px-6 py-4 bg-[--background] border border-[#334155] rounded-lg font-bold text-[--text] text-sm flex items-center justify-center min-w-[160px] min-h-[60px]"
            >
              <img
                v-if="form.logoUrl"
                :src="form.logoUrl"
                alt="Brand Logo"
                class="max-h-10 max-w-[140px] object-contain"
              />
              <span v-else>{{ form.siteName || 'Precision Auto' }}</span>
            </div>

            <div>
              <!-- Hidden Logo Input -->
              <input
                ref="logoInputRef"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleLogoChange"
              />

              <button
                type="button"
                @click="logoInputRef?.click()"
                class="inline-flex items-center gap-2 px-4 py-2 bg-[--background] border border-[#334155] rounded-lg text-sm font-medium text-[--text] hover:bg-[#334155] transition-colors shadow-[0_1px_3px_rgba(0,0,0,0.2)] cursor-pointer"
              >
                <i class="fa-solid fa-upload text-xs text-[--text]"></i>
                Upload Logo
              </button>

              <div class="text-xs text-[--text] mt-2">
                Recommended: 200×50px, PNG or SVG.
              </div>
            </div>
          </div>
        </div>

        <!-- Hero Section Card -->
        <div class="bg-[--background] border border-[#334155] rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.2)]">
          <h2 class="text-base font-bold text-[#f8fafc] mb-1">Hero Section</h2>
          <p class="text-xs text-[--text] mb-4">
            Configure homepage hero banner imagery.
          </p>

          <!-- Hidden Hero Image Input -->
          <input
            ref="heroInputRef"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleHeroChange"
          />

          <!-- Hero Preview -->
          <div
            class="mb-4 rounded-lg overflow-hidden border border-[#334155] relative h-36 bg-[--background] flex items-center justify-center"
          >
            <img
              v-if="form.heroBannerUrl"
              :src="form.heroBannerUrl"
              alt="Hero Banner"
              class="w-full h-full object-cover"
            />
            <div
              v-else
              class="text-xs text-[--text] flex flex-col items-center gap-1"
            >
              <i class="fa-regular fa-image text-2xl"></i>
              <span>No hero banner selected</span>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <button
              type="button"
              @click="heroInputRef?.click()"
              class="px-4 py-2 bg-[#0f172a] border border-[#334155] rounded-lg text-sm font-medium text-[#f8fafc] hover:bg-[#334155] transition-colors shadow-[0_1px_3px_rgba(0,0,0,0.2)] cursor-pointer"
            >
              Replace
            </button>

            <button
              type="button"
              @click="removeHeroBanner"
              class="px-4 py-2 text-sm font-medium text-[#ef4444] hover:bg-[#ef4444]/10 rounded-lg transition-colors cursor-pointer"
            >
              Remove
            </button>
          </div>
        </div>

        <!-- Homepage Content Card -->
        <div class="bg-[--background] border border-[#334155] rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.2)]">
          <h2 class="text-base font-bold text-[--text] mb-1">
            Homepage Content
          </h2>
          <p class="text-xs text-[--text] mb-4">
            Edit primary titles and meta tag descriptions.
          </p>

          <div class="space-y-4">
            <!-- Site Name -->
            <div>
              <label class="block text-xs font-semibold text-[--text] mb-1">
                Brand/Site Name
              </label>
              <input
                v-model="form.siteName"
                type="text"
                placeholder="e.g. Precision Auto"
                class="w-full h-10 px-3 bg-[--background] border border-[#334155] rounded-lg text-sm text-[--text] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#10b981]"
              />
            </div>

            <!-- Website Title -->
            <div>
              <label class="block text-xs font-semibold text-[#94a3b8] mb-1">
                Website Title
              </label>
              <input
                v-model="form.websiteTitle"
                type="text"
                placeholder="Website Header Title"
                class="w-full h-10 px-3 bg-[--background] border border-[#334155] rounded-lg text-sm text-[--text] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#10b981]"
              />
            </div>

            <!-- Description -->
            <div>
              <label class="block text-xs font-semibold text-[--text] mb-1">
                Description
              </label>
              <textarea
                v-model="form.description"
                rows="3"
                placeholder="Homepage description..."
                class="w-full p-3 bg-[--background] border border-[#334155] rounded-lg text-sm text-[#f8fafc] placeholder:text-[--text] focus:outline-none focus:border-[#10b981]"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Save Button -->
        <div class="flex justify-end">
          <button
            type="button"
            @click="saveSettings"
            :disabled="saving"
            class="px-6 py-2.5 bg-[#10b981] hover:bg-[#34d399] active:scale-95 text-[#0f172a] font-semibold text-sm rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.2)] focus:ring-4 focus:ring-[#10b981]/20 transition-all disabled:opacity-50 flex items-center gap-2 cursor-pointer"
          >
            <i
              v-if="saving"
              class="fa-solid fa-circle-notch animate-spin text-sm"
            ></i>
            <i v-else class="fa-regular fa-floppy-disk text-sm"></i>
            <span>{{ saving ? 'Saving Changes...' : 'Save Customizer' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Live Preview -->
    <div>
      <div class="sticky top-6 bg-[#1e293b] border border-[#334155] rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.2)]">
        <h2 class="text-sm font-bold text-[#f8fafc] mb-3">Live Preview</h2>

        <!-- Mock Browser Frame -->
        <div class="border border-[#334155] rounded-lg overflow-hidden bg-[#0f172a] shadow-[0_1px_3px_rgba(0,0,0,0.2)] mb-3">
          <!-- Browser Header -->
          <div class="flex items-center gap-1.5 px-3 py-2 bg-[#1e293b] border-b border-[#334155]">
            <div class="w-2.5 h-2.5 rounded-full bg-[#ef4444]"></div>
            <div class="w-2.5 h-2.5 rounded-full bg-[#f59e0b]"></div>
            <div class="w-2.5 h-2.5 rounded-full bg-[#10b981]"></div>
          </div>

          <!-- Mock Homepage -->
          <div
            class="p-4 bg-[#0f172a] text-[#f8fafc] min-h-[220px] flex flex-col justify-between relative bg-cover bg-center transition-all"
            :style="
              form.heroBannerUrl
                ? {
                    backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.85)), url(${form.heroBannerUrl})`
                  }
                : {}
            "
          >
            <!-- Mock Header -->
            <div class="flex justify-between items-center text-xs text-[#94a3b8] relative z-10">
              <div class="flex items-center gap-2">
                <img
                  v-if="form.logoUrl"
                  :src="form.logoUrl"
                  alt="Logo"
                  class="h-4 max-w-[70px] object-contain"
                />
                <span class="font-bold text-[#f8fafc]">
                  {{ form.siteName || 'Precision Auto' }}
                </span>
              </div>

              <div class="flex gap-2 text-[10px]">
                <span>Fleet</span>
                <span>About</span>
                <span>Contact</span>
              </div>
            </div>

            <!-- Mock Hero Text -->
            <div class="my-4 relative z-10">
              <h3 class="font-extrabold text-sm line-clamp-1 text-[#f8fafc]">
                {{ form.websiteTitle || 'Precision Auto - Premium Vehicle Rentals' }}
              </h3>
              <p class="text-[10px] text-[#94a3b8] mt-1 line-clamp-2">
                {{ form.description || 'Experience luxury and performance with our curated fleet of premium vehicles.' }}
              </p>
            </div>

            <!-- Mock Button -->
            <button
              type="button"
              class="w-fit px-3 py-1 bg-[#10b981] text-[#0f172a] text-[10px] font-bold rounded relative z-10 pointer-events-none"
            >
              Explore Fleet
            </button>
          </div>
        </div>

        <!-- Preview Info -->
        <div class="flex items-center gap-2 p-2.5 bg-[#0f172a] border border-[#334155] rounded-lg text-xs text-[#94a3b8]">
          <i class="fa-regular fa-eye text-[#10b981]"></i>
          <span>Preview updates in real-time as you type.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  getCustomizerSettings,
  updateCustomizerSettings
} from '../../api/customizer'

// ==========================================
// PAGE STATE
// ==========================================
const loading = ref(true)
const saving = ref(false)

// ==========================================
// FILE INPUT REFERENCES
// ==========================================
const logoInputRef = ref(null)
const heroInputRef = ref(null)

// ==========================================
// SELECTED FILES
// ==========================================
const logoFile = ref(null)
const heroImageFile = ref(null)

// ==========================================
// TOAST
// ==========================================
const toast = ref({
  show: false,
  message: '',
  type: 'success'
})

// ==========================================
// FORM
// ==========================================
const form = ref({
  siteName: 'Precision Auto',
  websiteTitle: 'Precision Auto - Premium Vehicle Rentals',
  description:
    'Experience luxury and performance with our curated fleet of premium vehicles. Easy booking, professional service.',
  logoUrl: '',
  heroBannerUrl: ''
})

// ==========================================
// SHOW TOAST
// ==========================================
const showToast = (message, type = 'success') => {
  toast.value = {
    show: true,
    message,
    type
  }

  setTimeout(() => {
    toast.value.show = false
  }, 4000)
}

// ==========================================
// LOGO FILE CHANGE
// ==========================================
const handleLogoChange = (event) => {
  const file = event.target.files?.[0]
  if (!file) return

  logoFile.value = file
  form.value.logoUrl = URL.createObjectURL(file)
}

// ==========================================
// HERO IMAGE FILE CHANGE
// ==========================================
const handleHeroChange = (event) => {
  const file = event.target.files?.[0]
  if (!file) return

  heroImageFile.value = file
  form.value.heroBannerUrl = URL.createObjectURL(file)
}

// ==========================================
// REMOVE HERO IMAGE
// ==========================================
const removeHeroBanner = () => {
  form.value.heroBannerUrl = ''
  heroImageFile.value = null
  if (heroInputRef.value) {
    heroInputRef.value.value = ''
  }
}

// ==========================================
// LOAD SETTINGS
// ==========================================
onMounted(async () => {
  try {
    const data = await getCustomizerSettings()
    const resData = data?.data || data

    if (resData) {
      form.value = {
        siteName: resData.title || 'Precision Auto',
        websiteTitle: resData.title || 'Precision Auto - Premium Vehicle Rentals',
        description:
          resData.description ||
          'Experience luxury and performance with our curated fleet of premium vehicles. Easy booking, professional service.',
        logoUrl: resData.logo || '',
        heroBannerUrl: resData.heroImage || ''
      }
    }
  } catch (error) {
    console.error('Failed to load customizer settings:', error)
    showToast('Failed to load settings. Displaying default values.', 'error')
  } finally {
    loading.value = false
  }
})

// ==========================================
// SAVE SETTINGS
// ==========================================
const saveSettings = async () => {
  if (saving.value) return
  saving.value = true

  try {
    const formData = new FormData()

    // TEXT FIELDS
    formData.append(
      'title',
      form.value.websiteTitle || form.value.siteName || ''
    )
    formData.append('description', form.value.description || '')
    formData.append('buttonText', 'Explore Fleet')
    formData.append('buttonLink', '/vehicles')

    // LOGO
    if (logoFile.value && logoFile.value instanceof File) {
      formData.append('logoFile', logoFile.value)
    } else {
      formData.append('logo', form.value.logoUrl || '')
    }

    // HERO IMAGE
    if (heroImageFile.value && heroImageFile.value instanceof File) {
      formData.append('heroImageFile', heroImageFile.value)
    } else {
      formData.append('heroImage', form.value.heroBannerUrl || '')
    }

    // UPDATE BACKEND
    const res = await updateCustomizerSettings(formData)
    const updatedData = res?.data || res

    // UPDATE FRONTEND FROM RESPONSE
    if (updatedData) {
      form.value.siteName = updatedData.title || form.value.siteName
      form.value.websiteTitle = updatedData.title || form.value.websiteTitle
      form.value.description = updatedData.description || form.value.description
      form.value.logoUrl = updatedData.logo || form.value.logoUrl
      form.value.heroBannerUrl = updatedData.heroImage || form.value.heroBannerUrl
    }

    // CLEAR SELECTED FILE REFS
    logoFile.value = null
    heroImageFile.value = null

    if (logoInputRef.value) logoInputRef.value.value = ''
    if (heroInputRef.value) heroInputRef.value.value = ''

    showToast('Customizer settings updated successfully!', 'success')
  } catch (error) {
    console.error('Failed to update customizer settings:', error)
    showToast(
      error.response?.data?.message || 'Failed to save settings. Please try again.',
      'error'
    )
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>