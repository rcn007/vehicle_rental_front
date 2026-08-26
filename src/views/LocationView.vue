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
            src="https://www.openstreetmap.org/export/embed.html?bbox=104.902%2C11.547%2C104.935%2C11.575&amp;layer=mapnik&amp;marker=11.561%2C104.918"
            loading="lazy"
          ></iframe>
          <div class="map-label">
            <span class="map-pin"><MapPin :size="18" /></span>
            <div>
              <strong>DriveEase Central</strong
              ><small>Phnom Penh, Cambodia</small>
            </div>
          </div>
          <a
            class="map-expand"
            href="https://www.openstreetmap.org/?mlat=11.561&amp;mlon=104.918#map=15/11.561/104.918"
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
                ><strong
                  >No. 12, Street 214, Doun Penh<br />Phnom Penh,
                  Cambodia</strong
                >
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
            href="https://www.google.com/maps/dir/?api=1&amp;destination=11.561,104.918"
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
