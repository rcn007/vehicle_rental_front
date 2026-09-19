<template>
  <RouterLink
    :to="{
      path: '/vehicles',
      query: {
        category:
          category?.id ||
          category?.categoryId ||
          category?.category_id
      }
    }"
    class="group relative block w-full h-[380px] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-slate-900 cursor-pointer"
  >
    <!-- Background Image -->
    <img
      :src="imageUrl"
      :alt="categoryName"
      class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      @error="handleImageError"
    />

    <!-- Overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-black/65 via-black/10 to-black/60 opacity-90 group-hover:opacity-75 transition-opacity duration-300"
    />

    <!-- Content -->
    <div
      class="relative z-10 h-full p-6 flex flex-col justify-between select-none"
    >
      <div>
        <h3
          class="text-2xl sm:text-3xl font-extrabold text-white tracking-wide leading-tight group-hover:text-emerald-400 transition-colors"
        >
          {{ categoryName }}
        </h3>
      </div>

      <!-- Bottom Right Arrow -->
      <div class="flex justify-end">
        <div
          class="w-12 h-12 rounded-full
                 bg-white text-slate-900
                 group-hover:bg-[#10B981] group-hover:text-white
                 flex items-center justify-center
                 shadow-lg
                 transition-all duration-300
                 group-hover:scale-110"
        >
          <ArrowUpRight
            :size="20"
            class="transition-transform duration-300
                   group-hover:translate-x-0.5
                   group-hover:-translate-y-0.5"
          />
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowUpRight } from '@lucide/vue'

const props = defineProps({
  category: {
    type: Object,
    required: true
  },

  image: {
    type: String,
    default: null
  },

  vehicleCount: {
    type: Number,
    default: 0
  }
})

// ============================================================
// CATEGORY NAME
// ============================================================

const categoryName = computed(() => {
  return (
    props.category?.categoryName ||
    props.category?.name ||
    props.category?.category_name ||
    'Category'
  )
})

// ============================================================
// IMAGE
// ============================================================

const imageUrl = computed(() => {
  return props.image || '/images/vehicle-placeholder.jpg'
})

// ============================================================
// IMAGE ERROR
// ============================================================

const handleImageError = (event) => {
  console.error('Failed to load category image:', event.target.src)

  if (
    !event.target.src.includes(
      '/images/vehicle-placeholder.jpg'
    )
  ) {
    event.target.src =
      '/images/vehicle-placeholder.jpg'
  }
}
</script>