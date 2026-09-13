<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

    <!-- Left Column -->
    <div class="lg:col-span-2 space-y-6">

      <!-- Authentication Card -->
      <div class="bg-white border border-[#D3DAEF] rounded-xl p-6 shadow-sm">
        <div class="flex items-center justify-between">

          <div>
            <h2 class="text-base font-bold text-[#111827] mb-1">
              Two-Factor Authentication
            </h2>

            <p class="text-xs text-[#7A8190]">
              Require secondary verification code upon administrative sign-in.
            </p>
          </div>

          <label class="relative inline-flex items-center cursor-pointer">
            <input
              v-model="securitySettings.twoFactorEnabled"
              type="checkbox"
              class="sr-only peer"
            />

            <div
              class="w-11 h-6 bg-[#D3DAEF]
              rounded-full
              peer-checked:after:translate-x-full
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

      <!-- Session Security -->
      <div class="bg-white border border-[#D3DAEF] rounded-xl p-6 shadow-sm">

        <h2 class="text-base font-bold text-[#111827] mb-1">
          Session Timeout
        </h2>

        <p class="text-xs text-[#7A8190] mb-4">
          Automatically sign out idle administrators.
        </p>

        <select
          v-model="securitySettings.sessionTimeout"
          class="w-full sm:w-64 h-10 px-3
          bg-[#F1F3FF]
          border border-[#D3DAEF]
          rounded-lg
          text-sm text-[#111827]
          focus:outline-none"
        >
          <option value="30">30 minutes</option>
          <option value="60">1 hour</option>
          <option value="240">4 hours</option>
        </select>

        <button
          @click="saveSecuritySettings"
          :disabled="saving"
          class="mt-4 h-10 px-5
          bg-[#2563EB]
          text-white
          rounded-lg
          text-sm font-medium
          hover:bg-[#1D4ED8]
          disabled:opacity-50"
        >
          {{ saving ? "Saving..." : "Save Security Settings" }}
        </button>

      </div>

      <!-- Change Password -->
      <div class="bg-white border border-[#D3DAEF] rounded-xl p-6 shadow-sm">

        <h2 class="text-base font-bold text-[#111827] mb-4">
          Change Password
        </h2>

        <div class="space-y-4">

          <!-- Current -->
          <div>
            <label
              class="block text-xs font-semibold text-[#43474E] mb-1"
            >
              Current Password
            </label>

            <input
              v-model="passwordForm.currentPassword"
              type="password"
              placeholder="Enter current password"
              class="w-full h-10 px-3
              bg-[#F1F3FF]
              border border-[#D3DAEF]
              rounded-lg
              text-sm text-[#111827]
              focus:outline-none"
            />
          </div>

          <!-- New -->
          <div>
            <label
              class="block text-xs font-semibold text-[#43474E] mb-1"
            >
              New Password
            </label>

            <input
              v-model="passwordForm.newPassword"
              type="password"
              placeholder="Enter new password"
              class="w-full h-10 px-3
              bg-[#F1F3FF]
              border border-[#D3DAEF]
              rounded-lg
              text-sm text-[#111827]
              focus:outline-none"
            />
          </div>

          <!-- Confirm -->
          <div>
            <label
              class="block text-xs font-semibold text-[#43474E] mb-1"
            >
              Confirm Password
            </label>

            <input
              v-model="passwordForm.confirmPassword"
              type="password"
              placeholder="Confirm new password"
              class="w-full h-10 px-3
              bg-[#F1F3FF]
              border border-[#D3DAEF]
              rounded-lg
              text-sm text-[#111827]
              focus:outline-none"
            />
          </div>

          <button
            @click="handleChangePassword"
            :disabled="changingPassword"
            class="h-10 px-5
            bg-[#111827]
            text-white
            rounded-lg
            text-sm font-medium
            hover:bg-[#1F2937]
            disabled:opacity-50"
          >
            {{
              changingPassword
                ? "Changing..."
                : "Change Password"
            }}
          </button>

        </div>

      </div>

    </div>

    <!-- Right Sidebar -->
    <div>

      <div
        class="bg-white
        border border-[#D3DAEF]
        rounded-xl
        p-5
        shadow-sm
        space-y-4"
      >

        <h2 class="text-sm font-bold text-[#111827]">
          Security Information
        </h2>

        <div class="text-xs text-[#7A8190]">
          Last updated by
          <span class="text-[#111827] font-semibold">
            {{ securitySettings.updatedByName || "Admin" }}
          </span>
        </div>

        <div class="text-xs text-[#7A8190]">
          Last updated on
          <span class="text-[#111827] font-semibold">
            {{ formatDate(securitySettings.updatedAt) }}
          </span>
        </div>

        <!-- Error -->
        <div
          v-if="error"
          class="text-xs text-red-600
          bg-red-50
          border border-red-200
          rounded-lg
          p-3"
        >
          {{ error }}
        </div>

        <!-- Success -->
        <div
          v-if="success"
          class="text-xs text-green-600
          bg-green-50
          border border-green-200
          rounded-lg
          p-3"
        >
          {{ success }}
        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import {
  getSecuritySettings,
  updateSecuritySettings,
  changePassword,
} from "../../api/securitySetting";

const loading = ref(true);
const saving = ref(false);
const changingPassword = ref(false);

const error = ref("");
const success = ref("");

const securitySettings = ref({
  twoFactorEnabled: false,
  sessionTimeout: "30",
  updatedByName: "",
  updatedAt: null,
});

const passwordForm = ref({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const fetchSecuritySettings = async () => {
  try {
    loading.value = true;
    error.value = "";

    const response = await getSecuritySettings();

    console.log("Security settings:", response);

    securitySettings.value = {
      ...securitySettings.value,
      ...response.data,
    };

  } catch (err) {
    console.error("Failed to fetch security settings:", err);

    error.value =
      err.response?.data?.message ||
      "Failed to load security settings.";
  } finally {
    loading.value = false;
  }
};

const saveSecuritySettings = async () => {
  try {
    saving.value = true;
    error.value = "";
    success.value = "";

    const request = {
      twoFactorEnabled:
        securitySettings.value.twoFactorEnabled,

      sessionTimeout:
        securitySettings.value.sessionTimeout,
    };

    console.log("Updating security settings:", request);

    await updateSecuritySettings(request);

    success.value =
      "Security settings updated successfully.";

    await fetchSecuritySettings();

  } catch (err) {
    console.error(
      "Failed to update security settings:",
      err
    );

    error.value =
      err.response?.data?.message ||
      "Failed to update security settings.";
  } finally {
    saving.value = false;
  }
};

const handleChangePassword = async () => {
  try {
    error.value = "";
    success.value = "";

    if (!passwordForm.value.currentPassword) {
      error.value = "Please enter your current password.";
      return;
    }

    if (!passwordForm.value.newPassword) {
      error.value = "Please enter your new password.";
      return;
    }

    if (!passwordForm.value.confirmPassword) {
      error.value = "Please confirm your new password.";
      return;
    }

    if (
      passwordForm.value.newPassword !==
      passwordForm.value.confirmPassword
    ) {
      error.value = "New password and confirm password do not match.";
      return;
    }

    changingPassword.value = true;

    const request = {
      currentPassword:
        passwordForm.value.currentPassword,

      newPassword:
        passwordForm.value.newPassword,

      confirmPassword:
        passwordForm.value.confirmPassword,
    };

    await changePassword(request);

    success.value =
      "Password changed successfully.";

    passwordForm.value = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

  } catch (err) {
    console.error(
      "Failed to change password:",
      err
    );

    error.value =
      err.response?.data?.message ||
      "Failed to change password.";
  } finally {
    changingPassword.value = false;
  }
};

const formatDate = (date) => {
  if (!date) {
    return "Not available";
  }

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

onMounted(() => {
  fetchSecuritySettings();
});
</script>