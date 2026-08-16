<template>
  <footer class="footer">
    <div class="container footer-grid">
      <div>
        <h2 class="footer-logo">
          <span class="logo-mark">
            <CarFront :size="18" />
          </span>
          DriveEase
        </h2>
        <p>
          Premium vehicle rentals for every journey.
          Fast, affordable, reliable.
        </p>
      </div>

      <div>
        <h3>Company</h3>
        <RouterLink to="/">About Us</RouterLink>
        <RouterLink to="/">Careers</RouterLink>
        <RouterLink to="/">Press</RouterLink>
        <RouterLink to="/">Blog</RouterLink>
      </div>

      <div>
        <h3>Services</h3>
        <RouterLink to="/vehicles">Car Rental</RouterLink>
        <RouterLink to="/vehicles">SUV Rental</RouterLink>
        <RouterLink to="/vehicles">Motorcycles</RouterLink>
        <RouterLink to="/vehicles">Luxury Fleet</RouterLink>
      </div>

      <div>
        <h3>Support</h3>
        <RouterLink to="/">Help Center</RouterLink>
        <RouterLink to="/">Contact Us</RouterLink>
        <RouterLink to="/">Privacy Policy</RouterLink>
      </div>
    </div>

    <div class="footer-bottom">
      &copy; {{ new Date().getFullYear() }} DriveEase. All rights reserved.
    </div>
  </footer>
</template>

<script setup>
import { CarFront } from '@lucide/vue'
</script>
