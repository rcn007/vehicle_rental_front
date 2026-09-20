<template>
  <Transition name="notification">
    <div
      v-if="notification"
      class="fixed
             top-16
             left-0
             right-0
             z-[9999]
             bg-white
             dark:bg-[#1E293B]
             border-b
             border-[#D3DAEF]
             dark:border-slate-700
             shadow-md"
    >

      <div
        class="px-6
               py-4
               flex
               items-center
               justify-between
               gap-4"
      >

        <!-- Left -->
        <div class="flex items-center gap-3 min-w-0">

          <!-- Icon -->
          <div
            class="w-10
                   h-10
                   rounded-full
                   bg-blue-50
                   dark:bg-blue-500/10
                   flex
                   items-center
                   justify-center
                   flex-shrink-0"
          >
            <i
              v-if="notification.type === 'NEW_BOOKING'"
              class="fa-solid fa-calendar-check
                     text-blue-600
                     dark:text-blue-400"
            ></i>

            <i
              v-else-if="notification.type === 'PAYMENT_RECEIVED'"
              class="fa-solid fa-money-bill-wave
                     text-emerald-600
                     dark:text-emerald-400"
            ></i>

            <i
              v-else
              class="fa-regular fa-bell
                     text-blue-600
                     dark:text-blue-400"
            ></i>
          </div>


          <!-- Content -->
          <div class="min-w-0">

            <div
              class="text-sm
                     font-bold
                     text-gray-900
                     dark:text-white"
            >
              {{ notification.title }}
            </div>

            <div
              class="text-sm
                     text-gray-600
                     dark:text-slate-300
                     mt-0.5
                     truncate"
            >
              {{ notification.message }}
            </div>

            <div
              class="text-xs
                     text-gray-400
                     dark:text-slate-500
                     mt-1"
            >
              Just now
            </div>

          </div>

        </div>


        <!-- Close -->
        <button
          type="button"
          @click="closeNotification"
          class="w-8
                 h-8
                 flex
                 items-center
                 justify-center
                 rounded-lg
                 text-gray-400
                 hover:text-gray-700
                 hover:bg-gray-100
                 dark:hover:text-white
                 dark:hover:bg-slate-700
                 transition
                 flex-shrink-0"
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

let notificationTimer = null


const showNotification = (newNotification) => {

  if (notificationTimer) {
    clearTimeout(notificationTimer)
  }

  notification.value = newNotification

  // Hide automatically after 5 seconds
  notificationTimer = setTimeout(() => {
    notification.value = null
  }, 120000)
}


const closeNotification = () => {

  if (notificationTimer) {
    clearTimeout(notificationTimer)
    notificationTimer = null
  }

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

.notification-enter-from {
  opacity: 0;
  transform: translateY(-100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

</style>