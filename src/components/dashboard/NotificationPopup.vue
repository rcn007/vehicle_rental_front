<template>
  <Transition name="notification">
    <div
      v-if="notification"
      class="w-full bg-[--background] border-b border-[#D3DAEF] shadow-md"
    >
      <div class="px-6 py-4 flex items-start justify-between">

        <div class="flex items-start gap-3">

          <!-- Icon -->
          <div
            class="w-10 h-10 rounded-full bg-[--background] flex items-center justify-center flex-shrink-0"
          >
            <i
              class="fa-regular fa-bell text-[#2563EB]"
            ></i>
          </div>

          <!-- Content -->
          <div>
            <div
              class="text-sm font-bold text-[--text]"
            >
              {{ notification.title }}
            </div>

            <div
              class="text-sm text-[#43474E] mt-1"
            >
              {{ notification.message }}
            </div>

            <div
              class="text-xs text-[#7A8190] mt-1"
            >
              Just now
            </div>
          </div>

        </div>

        <!-- Close -->
        <button
          @click="closeNotification"
          class="text-[#7A8190] hover:text-[--text]"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>

      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'

const notification = ref(null)

const showNotification = (newNotification) => {
  notification.value = newNotification
}

const closeNotification = () => {
  notification.value = null
}

defineExpose({
  showNotification
})
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>