<template>
  <div class="home-page">
    <section class="hero-customer">
      <div class="container hero-inner">
        <div class="hero-copy">
          <div class="availability-pill">
            <span></span>
            500+ Vehicles Available Now
          </div>

          <h1>
            Rent Your Perfect
            <span>Vehicle</span> Anywhere
          </h1>

          <p class="hero-description">
            Premium vehicles at your fingertips. Book online in minutes, drive
            with confidence. No hidden fees, full transparency.
          </p>
        </div>
      </div>
    </section>

    <section class="stats-band">
      <div class="container stats-row">
        <div v-for="stat in stats" :key="stat.label">
          <strong>{{ stat.value }}</strong>
          <span>{{ stat.label }}</span>
        </div>
      </div>
    </section>

    <section class="section categories-section">
      <div class="container">
        <div class="section-header">
          <div>
            <p class="section-label">BROWSE BY TYPE</p>
            <h2>Popular Categories</h2>
          </div>
          <RouterLink to="/vehicles" class="view-link">
            View all <ArrowRight :size="18" />
          </RouterLink>
        </div>

        <div class="category-grid">
          <RouterLink
            v-for="category in categories"
            :key="category.name"
            to="/vehicles"
            class="category-card"
          >
            <img :src="category.image" :alt="category.name" />
            <div>
              <component :is="category.icon" :size="30" />
              <h3>{{ category.name }}</h3>
              <p>{{ category.copy }}</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header">
          <div>
            <p class="section-label">TOP PICKS</p>
            <h2>Featured Vehicles</h2>
          </div>
          <RouterLink to="/vehicles" class="view-link">
            View all <ArrowRight :size="18" />
          </RouterLink>
        </div>

        <div class="vehicle-grid">
          <VehicleCard
            v-for="vehicle in featuredVehicles"
            :key="vehicle.id"
            :vehicle="vehicle"
          />
        </div>
      </div>
    </section>

    <section class="section benefits-section">
      <div class="container">
        <div class="center-heading">
          <p class="section-label">WHY CHOOSE US</p>
          <h2>Everything You Need</h2>
          <p>We make vehicle rental simple, affordable, and worry-free.</p>
        </div>

        <div class="benefit-grid">
          <article v-for="benefit in benefits" :key="benefit.title">
            <component :is="benefit.icon" :size="36" />
            <h3>{{ benefit.title }}</h3>
            <p>{{ benefit.copy }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section cta-section">
      <div class="container">
        <div class="cta-panel">
          <h2>Ready to Hit the Road?</h2>
          <p>
            Join thousands of satisfied customers. Your perfect vehicle is just
            a few clicks away.
          </p>
          <div>
            <RouterLink to="/vehicles" class="btn btn-primary">
              Browse Vehicles
            </RouterLink>
            <RouterLink to="/auth/register" class="btn btn-soft">
              Create Account
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import {
  ArrowRight,
  Bike,
  Car,
  DollarSign,
  Gem,
  Headphones,
  ShieldCheck,
  Zap
} from '@lucide/vue'
import VehicleCard from '../components/VehicleCard.vue'
import { useVehicleStore } from '../stores/Vehicle'

const vehicleStore = useVehicleStore()

const stats = [
  { value: '10,000+', label: 'Happy Customers' },
  { value: '500+', label: 'Vehicles Available' },
  { value: '50+', label: 'Cities Covered' },
  { value: '4.9★', label: 'Average Rating' }
]

const categories = [
  {
    name: 'Sedan',
    copy: '120+ cars · From $45/day',
    icon: Car,
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'SUV',
    copy: '85+ vehicles · From $65/day',
    icon: Car,
    image:
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Motorcycle',
    copy: '60+ bikes · From $25/day',
    icon: Bike,
    image:
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Luxury',
    copy: '30+ cars · From $150/day',
    icon: Gem,
    image:
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=900&q=80'
  }
]

const benefits = [
  {
    title: 'Secure Booking',
    copy: 'SSL-encrypted transactions and verified vehicles for your peace of mind.',
    icon: ShieldCheck
  },
  {
    title: '24/7 Support',
    copy: 'Round-the-clock customer support via chat, phone, or email.',
    icon: Headphones
  },
  {
    title: 'Affordable Price',
    copy: 'Transparent pricing with no hidden fees. Best rates guaranteed.',
    icon: DollarSign
  },
  {
    title: 'Easy Booking',
    copy: 'Book your vehicle in under 3 minutes with our streamlined process.',
    icon: Zap
  }
]

const featuredVehicles = computed(() => vehicleStore.vehicles.slice(0, 3))

onMounted(() => {
  vehicleStore.fetchVehicles()
})
</script>
