<template>
  <div class="admin-page settings-page">
    <div class="settings-tabs">
      <button class="active">General</button>
      <button>Notifications</button>
      <button>Security</button>
      <button>Payment Config</button>
    </div>

    <section class="admin-panel settings-panel">
      <h2>General Settings</h2>
      <form>
        <label>Business Name<input value="DriveEase Rental" /></label>
        <label>Contact Email<input value="support@driveease.com" /></label>
        <label>Phone Number<input value="+855 23 123 456" /></label>
        <label>Website<input value="https://driveease.com" /></label>
        <label class="full">Address<input value="123 Norodom Blvd, Phnom Penh, Cambodia" /></label>
        <label>Currency<select><option>USD ($)</option></select></label>
        <label>Timezone<select><option>Asia/Phnom_Penh (UTC+7)</option></select></label>
        <div class="maintenance-toggle">
          <div>
            <strong>Maintenance Mode</strong>
            <p>Temporarily disable the customer website</p>
          </div>
          <label class="switch"><input type="checkbox" /><span></span></label>
        </div>
        <button class="btn btn-primary" type="button">Save Changes</button>
      </form>
    </section>
  </div>
</template>
