<template>
  <section class="contact-page">
    <div class="contact-hero">
      <div class="container contact-hero-inner">
        <span class="section-label">DRIVEEASE SUPPORT</span>
        <h1>Contact Us</h1>
        <p>
          Have a question about your next journey? Our team is ready to help.
        </p>
      </div>
    </div>

    <div class="container contact-layout">
      <form class="contact-form-card" @submit.prevent="submitForm">
        <div class="contact-card-heading">
          <span class="contact-heading-icon"><MessageSquare :size="19" /></span>
          <div>
            <span class="eyebrow">WE ARE HERE TO HELP</span>
            <h2>Send us a message</h2>
          </div>
        </div>

        <div v-if="sent" class="contact-success" role="status">
          <CheckCircle2 :size="19" /> Thanks for reaching out. We will be in
          touch shortly.
        </div>

        <div class="contact-fields">
          <label class="contact-field">
            <span>Full Name</span>
            <input
              v-model="form.name"
              type="text"
              name="name"
              placeholder="Your full name"
              required
            />
          </label>
          <label class="contact-field">
            <span>Email</span>
            <input
              v-model="form.email"
              type="email"
              name="email"
              placeholder="you@example.com"
              required
            />
          </label>
          <label class="contact-field">
            <span>Phone Number</span>
            <input
              v-model="form.phone"
              type="tel"
              name="phone"
              placeholder="+855 12 345 678"
            />
          </label>
          <label class="contact-field">
            <span>Subject</span>
            <select v-model="form.subject" name="subject" required>
              <option value="" disabled>Select a subject</option>
              <option>Existing Booking</option>
              <option>Vehicle Rental</option>
              <option>General Question</option>
              <option>Feedback</option>
            </select>
          </label>
          <label class="contact-field contact-field-wide">
            <span>Message</span>
            <textarea
              v-model="form.message"
              name="message"
              rows="5"
              placeholder="How can we help you today?"
              required
            ></textarea>
          </label>
        </div>

        <button class="btn btn-primary btn-full contact-submit" type="submit">
          <Send :size="17" /> Send Message
        </button>
      </form>

      <aside class="contact-info-column">
        <div class="contact-info-card">
          <span class="eyebrow">GET IN TOUCH</span>
          <h2>Let’s talk about your trip</h2>
          <p>
            Our friendly team can help with bookings, vehicles, and anything in
            between.
          </p>

          <div class="contact-details">
            <a class="contact-detail" href="tel:+85523555012">
              <span class="contact-detail-icon"><Phone :size="18" /></span>
              <span><small>Phone</small><strong>+855 23 555 012</strong></span>
            </a>
            <a class="contact-detail" href="mailto:support@driveease.com">
              <span class="contact-detail-icon"><Mail :size="18" /></span>
              <span
                ><small>Email</small
                ><strong>support@driveease.com</strong></span
              >
            </a>
            <div class="contact-detail">
              <span class="contact-detail-icon"><MapPin :size="18" /></span>
              <span
                ><small>Address</small
                ><strong
                  >No. 12, Street 214, Doun Penh<br />Phnom Penh,
                  Cambodia</strong
                ></span
              >
            </div>
            <div class="contact-detail">
              <span class="contact-detail-icon"><Clock3 :size="18" /></span>
              <span
                ><small>Business hours</small
                ><strong>Monday - Sunday<br />8:00 AM - 8:00 PM</strong></span
              >
            </div>
          </div>

          <div class="contact-socials">
            <span>Follow DriveEase</span>
            <div>
              <a href="#" aria-label="DriveEase on Facebook"
                ><MessageCircle :size="17"
              /></a>
              <a href="#" aria-label="DriveEase on Instagram"
                ><Camera :size="17"
              /></a>
              <a href="#" aria-label="DriveEase on LinkedIn"
                ><Link2 :size="17"
              /></a>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import {
  CheckCircle2,
  Camera,
  Clock3,
  Link2,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  Send
} from '@lucide/vue'

const sent = ref(false)
const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

function submitForm() {
  sent.value = true
}
</script>
