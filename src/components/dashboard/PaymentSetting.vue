<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 text-[--text]">

    <!-- Left Column -->
    <div class="lg:col-span-2 space-y-6">

      <!-- Payment Methods Card -->
      <div class="bg-[--background] border border-[#334155] rounded-xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.25)]">
        <h2 class="text-base font-bold text-[#f8fafc] mb-1">
          Payment Methods
        </h2>

        <p class="text-xs text-[#94a3b8] mb-4">
          Enable or disable checkout gateways.
        </p>

        <div v-if="loading" class="text-sm text-[#94a3b8]">
          Loading payment settings...
        </div>

        <div v-else class="space-y-4">

          <!-- Cash -->
          <div
            class="flex items-center justify-between p-3 bg-[--background] border border-[#334155] rounded-lg"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-9 h-9 bg-[--background] rounded-lg border border-[#334155] flex items-center justify-center text-[#10b981]"
              >
                <i class="fa-solid fa-wallet text-sm"></i>
              </div>

              <div>
                <div class="text-sm font-bold text-[--text]">
                  Cash
                </div>

                <div class="text-xs text-[--text]">
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
                class="w-11 h-6 bg-[#10b981]  border border-[#334155] rounded-full
                peer-focus:outline-none
                peer-checked:bg-[#10b981]
                peer-checked:border-[#10b981]
                after:content-['']
                after:absolute
                after:top-0.5
                after:left-0.5
                after:bg-[#f8fafc]
                after:border-[#334155]
                after:border
                after:rounded-full
                after:h-5
                after:w-5
                after:transition-all
                peer-checked:after:translate-x-full
                peer-checked:after:border-white"
              ></div>
            </label>
          </div>

          <!-- ABA KHQR -->
          <div
            class="flex items-center justify-between p-3 bg-[--background] border border-[#334155] rounded-lg"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-9 h-9 bg-[--background] rounded-lg border border-[#334155] flex items-center justify-center text-[#10b981]"
              >
                <i class="fa-solid fa-qrcode text-sm"></i>
              </div>

              <div>
                <div class="text-sm font-bold text-[--text]">
                  ABA KHQR
                </div>

                <div class="text-xs text-[--text]">
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
                class="w-11 h-6 bg-[#10b981]  border border-[#334155] rounded-full
                peer-focus:outline-none
                peer-checked:bg-[#10b981]
                peer-checked:border-[#10b981]
                after:content-['']
                after:absolute
                after:top-[2px]
                after:left-[2px]
                after:bg-[#f8fafc]
                after:border-[#334155]
                after:border
                after:rounded-full
                after:h-5
                after:w-5
                after:transition-all
                peer-checked:after:translate-x-full
                peer-checked:after:border-white"
              ></div>
            </label>
          </div>

          <!-- Card -->
          <div
            class="flex items-center justify-between p-3 bg-[--background] border border-[#334155] rounded-lg"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-9 h-9 bg-[--background] rounded-lg border border-[#334155] flex items-center justify-center text-[#10b981]"
              >
                <i class="fa-solid fa-credit-card text-sm"></i>
              </div>

              <div>
                <div class="text-sm font-bold text-[--text]">
                  Card
                </div>

                <div class="text-xs text-[--text]">
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
                class="w-11 h-6 bg-[#10b981]  border border-[#334155] rounded-full
                peer-focus:outline-none
                peer-checked:bg-[#10b981]
                peer-checked:border-[#10b981]
                after:content-['']
                after:absolute
                after:top-[2px]
                after:left-[2px]
                after:bg-[#f8fafc]
                after:border-[#334155]
                after:border
                after:rounded-full
                after:h-5
                after:w-5
                after:transition-all
                peer-checked:after:translate-x-full
                peer-checked:after:border-white"
              ></div>
            </label>
          </div>

          <!-- Bakong -->
          <div
            class="flex items-center justify-between p-3 bg-[--background] border border-[#334155] rounded-lg"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-9 h-9 bg-[--background] rounded-lg border border-[#334155] flex items-center justify-center text-[#10b981]"
              >
                <i class="fa-solid fa-building-columns text-sm"></i>
              </div>

              <div>
                <div class="text-sm font-bold text-[--text]">
                  Bakong
                </div>

                <div class="text-xs text-[#94a3b8]">
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
                class="w-11 h-6 bg-[#10b981] border border-[#334155] rounded-full
                peer-focus:outline-none
                peer-checked:bg-[#10b981]
                peer-checked:border-[#10b981]
                after:content-['']
                after:absolute
                after:top-[2px]
                after:left-[2px]
                after:bg-[#f8fafc]
                after:border-[#334155]
                after:border
                after:rounded-full
                after:h-5
                after:w-5
                after:transition-all
                peer-checked:after:translate-x-full
                peer-checked:after:border-white"
              ></div>
            </label>
          </div>

        </div>
      </div>

    </div>

    <!-- Right Summary -->
    <div>
      <div
        class="bg-[#1e293b] border border-[#334155] rounded-xl p-5 shadow-[0_4px_12px_rgba(0,0,0,0.25)] space-y-4"
      >

        <h2 class="text-sm font-bold text-[#f8fafc]">
          Payment Summary
        </h2>

        <div class="space-y-3 text-sm">

          <div
            class="flex justify-between py-2 border-b border-[#334155]"
          >
            <span class="text-[#94a3b8]">
              Enabled Methods
            </span>

            <span class="font-bold text-[#f8fafc]">
              {{ enabledMethods }}
            </span>
          </div>

          <div
            class="flex justify-between py-2 border-b border-[#334155]"
          >
            <span class="text-[#94a3b8]">
              Disabled Methods
            </span>

            <span class="font-bold text-[#f8fafc]">
              {{ disabledMethods }}
            </span>
          </div>

        </div>

        <!-- Error Alert -->
        <div
          v-if="error"
          class="text-xs text-[#ef4444] bg-[#ef4444]/10 border border-[#ef4444]/20 rounded-lg p-3"
        >
          {{ error }}
        </div>

        <!-- Success Alert -->
        <div
          v-if="success"
          class="text-xs text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/20 rounded-lg p-3"
        >
          {{ success }}
        </div>

        <button
          @click="saveSettings"
          :disabled="saving || loading"
          class="w-full h-10 bg-[#10b981] text-[#0f172a] rounded-lg text-sm font-semibold hover:bg-[#34d399] transition shadow-[0_1px_3px_rgba(0,0,0,0.2)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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