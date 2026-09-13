<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

    <!-- Left Column -->
    <div class="lg:col-span-2 space-y-6">

      <!-- Payment Methods -->
      <div class="bg-white border border-[#D3DAEF] rounded-xl p-6 shadow-sm">
        <h2 class="text-base font-bold text-[#111827] mb-1">
          Payment Methods
        </h2>

        <p class="text-xs text-[#7A8190] mb-4">
          Enable or disable checkout gateways.
        </p>

        <div v-if="loading" class="text-sm text-[#7A8190]">
          Loading payment settings...
        </div>

        <div v-else class="space-y-4">

          <!-- Cash -->
          <div
            class="flex items-center justify-between p-3 bg-[#F1F3FF] border border-[#D3DAEF] rounded-lg"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-9 h-9 bg-white rounded-lg border border-[#D3DAEF] flex items-center justify-center text-[#111827]"
              >
                <i class="fa-solid fa-wallet text-sm"></i>
              </div>

              <div>
                <div class="text-sm font-bold text-[#111827]">
                  Cash
                </div>

                <div class="text-xs text-[#7A8190]">
                  Allow customers to pay with cash.
                </div>
              </div>
            </div>

            <label class="relative inline-flex items-center cursor-pointer">
              <input
                v-model="paymentSettings.cashEnabled"
                type="checkbox"
                class="sr-only peer"
              />

              <div
                class="w-11 h-6 bg-[#D3DAEF] rounded-full
                peer-checked:after:translate-x-full
                peer-checked:after:border-white
                after:content-['']
                after:absolute
                after:top-[2px]
                after:left-[2px]
                after:bg-white
                after:border-[#D3DAEF]
                after:border
                after:rounded-full
                after:h-5
                after:w-5
                after:transition-all
                peer-checked:bg-[#2563EB]"
              ></div>
            </label>
          </div>

          <!-- ABA KHQR -->
          <div
            class="flex items-center justify-between p-3 bg-[#F1F3FF] border border-[#D3DAEF] rounded-lg"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-9 h-9 bg-white rounded-lg border border-[#D3DAEF] flex items-center justify-center text-[#111827]"
              >
                <i class="fa-solid fa-qrcode text-sm"></i>
              </div>

              <div>
                <div class="text-sm font-bold text-[#111827]">
                  ABA KHQR
                </div>

                <div class="text-xs text-[#7A8190]">
                  Accept instant scan-and-pay transactions.
                </div>
              </div>
            </div>

            <label class="relative inline-flex items-center cursor-pointer">
              <input
                v-model="paymentSettings.abaKhqrEnabled"
                type="checkbox"
                class="sr-only peer"
              />

              <div
                class="w-11 h-6 bg-[#D3DAEF] rounded-full
                peer-checked:after:translate-x-full
                peer-checked:after:border-white
                after:content-['']
                after:absolute
                after:top-[2px]
                after:left-[2px]
                after:bg-white
                after:border-[#D3DAEF]
                after:border
                after:rounded-full
                after:h-5
                after:w-5
                after:transition-all
                peer-checked:bg-[#2563EB]"
              ></div>
            </label>
          </div>

          <!-- Card -->
          <div
            class="flex items-center justify-between p-3 bg-[#F1F3FF] border border-[#D3DAEF] rounded-lg"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-9 h-9 bg-white rounded-lg border border-[#D3DAEF] flex items-center justify-center text-[#111827]"
              >
                <i class="fa-solid fa-credit-card text-sm"></i>
              </div>

              <div>
                <div class="text-sm font-bold text-[#111827]">
                  Card
                </div>

                <div class="text-xs text-[#7A8190]">
                  Allow customers to pay with card.
                </div>
              </div>
            </div>

            <label class="relative inline-flex items-center cursor-pointer">
              <input
                v-model="paymentSettings.cardEnabled"
                type="checkbox"
                class="sr-only peer"
              />

              <div
                class="w-11 h-6 bg-[#D3DAEF] rounded-full
                peer-checked:after:translate-x-full
                peer-checked:after:border-white
                after:content-['']
                after:absolute
                after:top-[2px]
                after:left-[2px]
                after:bg-white
                after:border-[#D3DAEF]
                after:border
                after:rounded-full
                after:h-5
                after:w-5
                after:transition-all
                peer-checked:bg-[#2563EB]"
              ></div>
            </label>
          </div>

          <!-- Bakong -->
          <div
            class="flex items-center justify-between p-3 bg-[#F1F3FF] border border-[#D3DAEF] rounded-lg"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-9 h-9 bg-white rounded-lg border border-[#D3DAEF] flex items-center justify-center text-[#111827]"
              >
                <i class="fa-solid fa-building-columns text-sm"></i>
              </div>

              <div>
                <div class="text-sm font-bold text-[#111827]">
                  Bakong
                </div>

                <div class="text-xs text-[#7A8190]">
                  Accept Bakong payment transactions.
                </div>
              </div>
            </div>

            <label class="relative inline-flex items-center cursor-pointer">
              <input
                v-model="paymentSettings.bakongEnabled"
                type="checkbox"
                class="sr-only peer"
              />

              <div
                class="w-11 h-6 bg-[#D3DAEF] rounded-full
                peer-checked:after:translate-x-full
                peer-checked:after:border-white
                after:content-['']
                after:absolute
                after:top-[2px]
                after:left-[2px]
                after:bg-white
                after:border-[#D3DAEF]
                after:border
                after:rounded-full
                after:h-5
                after:w-5
                after:transition-all
                peer-checked:bg-[#2563EB]"
              ></div>
            </label>
          </div>

        </div>
      </div>

    </div>

    <!-- Right Summary -->
    <div>
      <div
        class="bg-white border border-[#D3DAEF] rounded-xl p-5 shadow-sm space-y-4"
      >

        <h2 class="text-sm font-bold text-[#111827]">
          Payment Summary
        </h2>

        <div class="space-y-3 text-sm">

          <div
            class="flex justify-between py-2 border-b border-[#D3DAEF]"
          >
            <span class="text-[#7A8190]">
              Enabled Methods
            </span>

            <span class="font-bold text-[#111827]">
              {{ enabledMethods }}
            </span>
          </div>

          <div
            class="flex justify-between py-2 border-b border-[#D3DAEF]"
          >
            <span class="text-[#7A8190]">
              Disabled Methods
            </span>

            <span class="font-bold text-[#111827]">
              {{ disabledMethods }}
            </span>
          </div>

        </div>

        <!-- Error -->
        <div
          v-if="error"
          class="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg p-3"
        >
          {{ error }}
        </div>

        <!-- Success -->
        <div
          v-if="success"
          class="text-xs text-green-600 bg-green-50 border border-green-200 rounded-lg p-3"
        >
          {{ success }}
        </div>

        <button
          @click="saveSettings"
          :disabled="saving || loading"
          class="w-full h-10 bg-[#2563EB] text-white rounded-lg text-sm font-medium hover:bg-[#1D4ED8] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ saving ? "Saving..." : "Save Changes" }}
        </button>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import {
  getPaymentSettings,
  updatePaymentSettings,
} from "../../api/paymentSetting";

const loading = ref(true);
const saving = ref(false);

const error = ref("");
const success = ref("");

const paymentSettings = ref({
  cashEnabled: false,
  abaKhqrEnabled: false,
  cardEnabled: false,
  bakongEnabled: false,
});

const fetchSettings = async () => {
  try {
    loading.value = true;
    error.value = "";

    const response = await getPaymentSettings();

    console.log("Payment settings response:", response);

    paymentSettings.value = response.data;
  } catch (err) {
    console.error("Failed to fetch payment settings:", err);

    error.value =
      err.response?.data?.message ||
      "Failed to load payment settings.";
  } finally {
    loading.value = false;
  }
};

const enabledMethods = computed(() => {
  let count = 0;

  if (paymentSettings.value.cashEnabled) {
    count++;
  }

  if (paymentSettings.value.abaKhqrEnabled) {
    count++;
  }

  if (paymentSettings.value.cardEnabled) {
    count++;
  }

  if (paymentSettings.value.bakongEnabled) {
    count++;
  }

  return count;
});

const disabledMethods = computed(() => {
  return 4 - enabledMethods.value;
});

const saveSettings = async () => {
  try {
    saving.value = true;
    error.value = "";
    success.value = "";

    const request = {
      cashEnabled: paymentSettings.value.cashEnabled,
      abaKhqrEnabled: paymentSettings.value.abaKhqrEnabled,
      cardEnabled: paymentSettings.value.cardEnabled,
      bakongEnabled: paymentSettings.value.bakongEnabled,
    };

    console.log("Updating payment settings:", request);

    await updatePaymentSettings(request);

    success.value = "Payment settings updated successfully.";

    await fetchSettings();
  } catch (err) {
    console.error("Failed to update payment settings:", err);

    error.value =
      err.response?.data?.message ||
      "Failed to update payment settings.";
  } finally {
    saving.value = false;
  }
};

onMounted(() => {
  fetchSettings();
});
</script>