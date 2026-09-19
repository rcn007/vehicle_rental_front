<template>
  <section class="location-page">
    <div class="container">
      <div class="location-hero">
        <div>
          <span class="section-label">DRIVEEASE LOCATIONS</span>
          <h1>Our Location</h1>
          <p>
            Find us in the heart of the city. Your next journey starts here.
          </p>
        </div>
        <div class="location-status"><span></span>Open today until 8:00 PM</div>
      </div>

      <div class="location-layout">
        <div class="location-map-frame">
          <iframe
            title="DriveEase location map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=103.232%2C11.572%2C103.292%2C11.632&amp;layer=mapnik&amp;marker=11.6022541%2C103.2627481"
            loading="lazy"
          ></iframe>
          <div class="map-label">
            <span class="map-pin"><MapPin :size="18" /></span>
            <div>
              <strong>DriveEase Pickup Location</strong
              ><small>11.6022541, 103.2627481</small>
            </div>
          </div>
          <a
            class="map-expand"
            href="https://www.google.com/maps/@11.6022541,103.2627481,250462m/data=!3m1!1e3?entry=ttu"
            target="_blank"
            rel="noreferrer"
            aria-label="Open map in a new tab"
          >
            <Navigation :size="18" />
          </a>
        </div>

        <aside class="location-card">
          <div class="location-card-heading">
            <span class="location-icon"><MapPin :size="20" /></span>
            <div>
              <span class="eyebrow">MAIN OFFICE</span>
              <h2>DriveEase Central</h2>
            </div>
          </div>
          <div class="location-details">
            <div class="location-detail">
              <span class="detail-icon"><MapPin :size="18" /></span>
              <div>
                <span>Address</span
                ><strong>11.6022541, 103.2627481<br />Cambodia</strong>
              </div>
            </div>
            <div class="location-detail">
              <span class="detail-icon"><Clock3 :size="18" /></span>
              <div>
                <span>Opening hours</span
                ><strong>Monday - Sunday<br />8:00 AM - 8:00 PM</strong>
              </div>
            </div>
            <div class="location-detail">
              <span class="detail-icon"><Phone :size="18" /></span>
              <div>
                <span>Phone number</span><strong>+855 23 555 012</strong>
              </div>
            </div>
          </div>
          <a
            class="btn btn-primary btn-full directions-button"
            href="https://www.google.com/maps/dir/?api=1&amp;destination=11.6022541,103.2627481"
            target="_blank"
            rel="noreferrer"
          >
            <Navigation :size="18" />Get Directions
          </a>
          <p class="location-note">
            Conveniently located near Riverside and the Central Market.
          </p>
        </aside>
      </div>

      <div class="location-benefits" aria-label="Location amenities">
        <div>
          <span><CarFront :size="19" /></span>
          <div>
            <strong>Easy vehicle pickup</strong
            ><small>Collect your keys in minutes</small>
          </div>
        </div>
        <div>
          <span><Clock3 :size="19" /></span>
          <div>
            <strong>Flexible opening hours</strong
            ><small>Every day, including weekends</small>
          </div>
        </div>
        <div>
          <span><Phone :size="19" /></span>
          <div>
            <strong>Local support</strong
            ><small>We are here when you need us</small>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { CarFront, Clock3, MapPin, Navigation, Phone } from '@lucide/vue'
</script>
