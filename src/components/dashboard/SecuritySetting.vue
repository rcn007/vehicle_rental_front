<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 text-(--text) p-3">
    
    <!-- Left Column: Settings & Password Forms -->
    <div class="lg:col-span-2 space-y-6">

      <!-- 2FA Card -->
      <!-- <div :class="cardClasses">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-base font-bold text-(--text) mb-1">Two-Factor Authentication</h2>
            <p class="text-xs text-(--muted)">
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
              class="w-11 h-6 bg-[#10b981]  border border-(--border) 
              rounded-full peer-focus:outline-none peer-checked:bg-(--accent) peer-checked:border-(--accent) after:content-[''] 
              after:absolute after:top-[2px] after:left-[2px] after:bg-(--text) after:border-(--border) after:border after:rounded-full 
              after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"
            ></div>
          </label>
        </div>
      </div> -->

      <!-- Session Timeout Card -->
      <!-- <div :class="cardClasses">
        <h2 class="text-base font-bold text-(--text) mb-1">Session Timeout</h2>
        <p class="text-xs text-(--muted) mb-4">
          Automatically sign out idle administrators.
        </p>

        <select
          v-model="securitySettings.sessionTimeout"
          :class="[inputClasses, 'w-full sm:w-64 cursor-pointer']"
        >
          <option
            v-for="option in timeoutOptions"
            :key="option.value"
            :value="option.value"
            class="bg-(--background) text-(--text)"
          >
            {{ option.label }}
          </option>
        </select>

        <div>
          <button
            @click="saveSecuritySettings"
            :disabled="saving"
            :class="[btnClasses, 'mt-4']"
          >
            {{ saving ? "Saving..." : "Save Security Settings" }}
          </button>
        </div>
      </div> -->

      <!-- Change Password Card -->
      <div :class="cardClasses">
        <h2 class="text-base font-bold text-(--text) mb-4">Change Password</h2>

        <form @submit.prevent="handleChangePassword" class="space-y-4">
          <div v-for="field in passwordFields" :key="field.id">
            <label :for="field.id" :class="labelClasses">
              {{ field.label }}
            </label>
            <input
              :id="field.id"
              v-model="passwordForm[field.key]"
              type="password"
              :placeholder="field.placeholder"
              :class="inputClasses"
            />
          </div>

          <button
            type="submit"
            :disabled="changingPassword"
            :class="btnClasses"
          >
            {{ changingPassword ? "Changing..." : "Change Password" }}
          </button>
        </form>
      </div>

    </div>

    <!-- Right Column: Info Sidebar -->
    <div>
      <div :class="[cardClasses, 'p-5 space-y-4']">
        <h2 class="text-sm font-bold text-(--text)">Security Information</h2>

        <div class="text-xs text-(--muted)">
          Last updated by
          <span class="text-(--text) font-semibold block sm:inline">
            {{ securitySettings.updatedByName || "Admin" }}
          </span>
        </div>

        <div class="text-xs text-(--muted)">
          Last updated on
          <span class="text-(--text) font-semibold block sm:inline">
            {{ formatDate(securitySettings.updatedAt) }}
          </span>
        </div>

        <!-- Dynamic Feedback Alerts -->
        <div
          v-if="error"
          class="text-xs text-(--danger) bg-(--danger)/10 border border-(--danger)/20 rounded-lg p-3"
        >
          {{ error }}
        </div>

        <div
          v-if="success"
          class="text-xs text-(--success) bg-(--success)/10 border border-(--success)/20 rounded-lg p-3"
        >
          {{ success }}
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { getSecuritySettings, updateSecuritySettings, changePassword } from "../../api/securitySetting";

// Shared Component Styles
const cardClasses = "bg-(--surface) border border-(--border) rounded-xl p-6 shadow-(--shadow-md)";
const inputClasses = "w-full h-10 px-3 bg-(--background) border border-(--border) rounded-lg text-sm text-(--text) placeholder:text-(--muted) focus:outline-none focus:border-(--accent)";
const btnClasses = "h-10 px-5 bg-(--accent) text-(--background) rounded-lg text-sm font-semibold hover:bg-(--accent-hover) transition shadow-(--shadow-sm) active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
const labelClasses = "block text-xs font-semibold text-(--muted) mb-1";

// Constants
const timeoutOptions = [
  { value: "30", label: "30 minutes" },
  { value: "60", label: "1 hour" },
  { value: "240", label: "4 hours" },
];

const passwordFields = [
  { id: "current-password", key: "currentPassword", label: "Current Password", placeholder: "Enter current password" },
  { id: "new-password", key: "newPassword", label: "New Password", placeholder: "Enter new password" },
  { id: "confirm-password", key: "confirmPassword", label: "Confirm Password", placeholder: "Confirm new password" },
];

// Reactive State
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

const passwordForm = reactive({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

// Utility Functions
const clearMessages = () => {
  error.value = "";
  success.value = "";
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Actions
const fetchSettings = async () => {
  try {
    clearMessages();
    const response = await getSecuritySettings();
    securitySettings.value = response.data;
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to load security settings.";
  }
};

const saveSecuritySettings = async () => {
  try {
    saving.value = true;
    clearMessages();

    await updateSecuritySettings(securitySettings.value);
    success.value = "Security settings updated successfully.";
    await fetchSettings();
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to save settings.";
  } finally {
    saving.value = false;
  }
};

const handleChangePassword = async () => {
  clearMessages();

  if (!passwordForm.currentPassword || !passwordForm.newPassword) {
    error.value = "Please fill in all required password fields.";
    return;
  }

  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    error.value = "New password and confirmation do not match.";
    return;
  }

  try {
    changingPassword.value = true;
    await changePassword({
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword,
    });

    success.value = "Password changed successfully.";
    passwordForm.currentPassword = "";
    passwordForm.newPassword = "";
    passwordForm.confirmPassword = "";
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to change password.";
  } finally {
    changingPassword.value = false;
  }
};

onMounted(fetchSettings);
</script>