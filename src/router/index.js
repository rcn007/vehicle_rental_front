import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import VehiclesView from '../views/VehiclesView.vue'
import VehicleDetailView from '../views/VehicleDetailView.vue'
import BookingView from '../views/BookingView.vue'
import PaymentView from '../views/PaymentView.vue'
import MyBookingsView from '../views/MyBookingView.vue'
import ProfileView from '../views/ProfileView.vue'
import RentalHistoryView from '../views/RentalHistoryView.vue'

import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'
import VerifyOtpView from '../views/auth/VerifyotpView.vue'
import ForgotPasswordView from '../views/auth/ForgotPasswordView.vue'

import DashboardView from '../views/admin/DashboardView.vue'
import AdminVehiclesView from '../views/admin/VehiclesView.vue'
import BookingsView from '../views/admin/BookingView.vue'
import PaymentsView from '../views/admin/PaymentView.vue'
import UsersView from '../views/admin/UsersView.vue'
import CategoriesView from '../views/admin/CategoriesView.vue'
import BrandsView from '../views/admin/BrandsView.vue'
import AdminRentalHistoryView from '../views/admin/AdminRentalHistoryView.vue'
import ReportsView from '../views/admin/ReportsView.vue'
import PaymentMethodsView from '../views/admin/PatmentMethodsView.vue'

const routes = [
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView,
      },
      {
        path: 'vehicles',
        name: 'vehicles',
        component: VehiclesView,
      },
      {
        path: 'vehicles/:id',
        name: 'vehicle-detail',
        component: VehicleDetailView,
      },
      {
        path: 'booking/:vehicleId',
        name: 'booking',
        component: BookingView,
        meta: { requiresAuth: true },
      },
      {
        path: 'payment/:bookingId',
        name: 'payment',
        component: PaymentView,
        meta: { requiresAuth: true },
      },
      {
        path: 'my-bookings',
        name: 'my-bookings',
        component: MyBookingsView,
      },
      {
        path: 'rental-history',
        name: 'rental-history',
        component: RentalHistoryView,
      },
      {
        path: 'profile',
        name: 'profile',
        component: ProfileView,
        meta: { requiresAuth: true },
      },
    ],
  },

  {
    path: '/auth',
    children: [
      {
        path: 'login',
        name: 'login',
        component: LoginView,
      },
      {
        path: 'register',
        name: 'register',
        component: RegisterView,
      },
      {
        path: 'verify-otp',
        name: 'verify-otp',
        component: VerifyOtpView,
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: ForgotPasswordView,
      },
    ],
  },

  {
    path: '/admin',
    component: () => import('../layouts/AdminLayout.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
    children: [
      {
        path: '',
        redirect: '/admin/dashboard',
      },
      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: DashboardView,
        meta: { title: 'Dashboard' },
      },
      {
        path: 'vehicles',
        name: 'admin-vehicles',
        component: AdminVehiclesView,
        meta: { title: 'Vehicle Management' },
      },
      {
        path: 'bookings',
        name: 'admin-bookings',
        component: BookingsView,
        meta: { title: 'Booking Management' },
      },
      {
        path: 'payments',
        name: 'admin-payments',
        component: PaymentsView,
        meta: { title: 'Payment Management' },
      },
      {
        path: 'users',
        name: 'admin-users',
        component: UsersView,
        meta: { title: 'User Management' },
      },
      {
        path: 'categories',
        name: 'admin-categories',
        component: CategoriesView,
        meta: { title: 'Categories' },
      },
      {
        path: 'brands',
        name: 'admin-brands',
        component: BrandsView,
        meta: { title: 'Brands' },
      },
      {
        path: 'rental-history',
        name: 'admin-rental-history',
        component: AdminRentalHistoryView,
        meta: { title: 'Rental History' },
      },
      {
        path: 'reports',
        name: 'admin-reports',
        component: ReportsView,
        meta: { title: 'Reports & Analytics' },
      },
      {
        path: 'payment-methods',
        name: 'admin-payment-methods',
        component: PaymentMethodsView,
        meta: { title: 'Settings' },
      },
      {
        path: 'settings',
        name: 'admin-settings',
        component: PaymentMethodsView,
        meta: { title: 'Settings' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  if (to.meta.requiresAuth && !token) {
    return {
      name: 'login',
      query: { redirect: to.fullPath },
    }
  }

  if (to.meta.requiresAdmin) {
    const role = user?.role?.toUpperCase()

    if (role !== 'ADMIN') {
      return { name: 'home' }
    }
  }
})

export default router
