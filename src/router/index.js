import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import VehiclesView from '../views/VehiclesView.vue'
import VehicleDetailView from '../views/VehicleDetailView.vue'
import BookingView from '../views/BookingView.vue'
import PaymentView from '../views/PaymentView.vue'
import MyBookingsView from '../views/MyBookingView.vue'
import ProfileView from '../views/ProfileView.vue'
import RentalHistoryView from '../views/RentalHistoryView.vue'
import LocationView from '../views/LocationView.vue'
import ContactView from '../views/ContactView.vue'

import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'
import VerifyOtpView from '../views/auth/VerifyotpView.vue'
import ForgotPasswordView from '../views/auth/ForgotPasswordView.vue'

import Dashboard from '../pages/Dashboard.vue'
import UserDashboard from '../pages/UserDashboard.vue'
import BookingDashboard from '../pages/BookingDashboard.vue'
import PaymentDashboard from '../pages/PaymentDashboard.vue'
import CategoryDashboard from '../pages/CategoryDashboard.vue'
import BrandDashboard from '../pages/BrandDashboard.vue'
import ReportDashboard from '../pages/ReportDashboard.vue'
import SettingDashboard from '../pages/SettingDashboard.vue'
import HistoryDashboard from '../pages/HistoryDashboard.vue'
import VehicleDashboard from '../pages/VehicleDashboard.vue'

const routes = [
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView
      },
      {
        path: 'vehicles',
        name: 'vehicles',
        component: VehiclesView
      },
      {
        path: 'vehicles/:id',
        name: 'vehicle-detail',
        component: VehicleDetailView
      },
      {
        path: 'booking/:vehicleId',
        name: 'booking',
        component: BookingView,
        meta: { requiresAuth: true }
      },
      {
        path: 'payment/:bookingId',
        name: 'payment',
        component: PaymentView,
        meta: { requiresAuth: true }
      },
      {
        path: 'my-bookings',
        name: 'my-bookings',
        component: MyBookingsView
      },
      {
        path: 'rental-history',
        name: 'rental-history',
        component: RentalHistoryView
      },
      {
        path: 'locations',
        name: 'locations',
        component: LocationView
      },
      {
        path: 'contact',
        name: 'contact',
        component: ContactView
      },
      {
        path: 'profile',
        name: 'profile',
        component: ProfileView,
        meta: { requiresAuth: true }
      }
    ]
  },

  {
    path: '/auth',
    children: [
      {
        path: 'login',
        name: 'login',
        component: LoginView
      },
      {
        path: 'register',
        name: 'register',
        component: RegisterView
      },
      {
        path: 'verify-otp',
        name: 'verify-otp',
        component: VerifyOtpView
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: ForgotPasswordView
      }
    ]
  },

  {
    path: '/admin',
    component: () => import('../layouts/AdminLayout.vue'),

    children: [
      {
        path: '',
        redirect: '/admin/dashboard'
      },

      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: Dashboard,
        meta: { title: 'Dashboard' }
      },

      {
        path: 'vehicles',
        name: 'admin-vehicles',
        component: VehicleDashboard,
        meta: { title: 'Vehicle Management' }
      },

      {
        path: 'bookings',
        name: 'admin-bookings',
        component: BookingDashboard,
        meta: { title: 'Booking Management' }
      },

      {
        path: 'payments',
        name: 'admin-payments',
        component: PaymentDashboard,
        meta: { title: 'Payment Management' }
      },

      {
        path: 'users',
        name: 'admin-users',
        component: UserDashboard,
        meta: { title: 'User Management' }
      },

      {
        path: 'categories',
        name: 'admin-categories',
        component: CategoryDashboard,
        meta: { title: 'Categories' }
      },

      {
        path: 'brands',
        name: 'admin-brands',
        component: BrandDashboard,
        meta: { title: 'Brands' }
      },

      {
        path: 'reports',
        name: 'admin-reports',
        component: ReportDashboard,
        meta: { title: 'Reports & Analytics' }
      },

      {
        path: 'history',
        name: 'admin-history',
        component: HistoryDashboard,
        meta: { title: 'History' }
      },

      {
        path: 'settings',
        name: 'admin-settings',
        component: SettingDashboard,
        meta: { title: 'Settings' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to) => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  if (to.meta.requiresAuth && !token) {
    return {
      name: 'login',
      query: { redirect: to.fullPath }
    }
  }

  if (to.meta.requiresAdmin) {
    const roles = Array.isArray(user?.roles) ? user.roles : [user?.role]
    const isAdmin = roles.some((role) =>
      ['ADMIN', 'ROLE_ADMIN'].includes(String(role).toUpperCase())
    )

    if (!isAdmin) {
      return { name: 'home' }
    }
  }
})

export default router
