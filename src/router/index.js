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
import CreateBooking from '../components/booking/Create.vue'
import Update from '../components/booking/Update.vue'
import Detail from '../components/booking/Detail.vue'
import CreateVehicle from '../components/vehicles/CreateVehicle.vue'
import UpdateVehicle from '../components/vehicles/UpdateVehicle.vue'
import DetailVehicle from '../components/vehicles/DetailVehicle.vue'
import CreateCategory from '../components/category/CreateCategory.vue'
import UpdateCategory from '../components/category/UpdateCategory.vue'
import DetailCategory from '../components/category/DetailCategory.vue'
import CreateBrand from '../components/brands/CreateBrand.vue'
import UpdateBrands from '../components/brands/UpdateBrands.vue'
import DetailBrand from '../components/brands/DetailBrand.vue'
import CreateUser from '../components/user/CreateUser.vue'
import UpdateUser from '../components/user/UpdateUser.vue'
import DetailUser from '../components/user/DetailUser.vue'
import Profile from '../pages/Profile.vue'
import ResetPassword from '../views/auth/ResetPassword.vue'
import Favorites from '../views/Favorites.vue'
import RecieptView from '../views/RecieptView.vue'

const routes = [
  // -------------------------------------------------------------
  // Global Aliases & Redirects
  // -------------------------------------------------------------
  {
    path: '/login',
    redirect: '/auth/login'
  },
  {
    path: '/register',
    redirect: '/auth/register'
  },

  // -------------------------------------------------------------
  // Main Customer Layout Routes
  // -------------------------------------------------------------
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
      path: '/vehicles/:vehicleId',
      name: 'vehicle-detail',
      component: VehicleDetailView
    },
    {
      path: 'booking/:vehicleId',
      name: 'booking',
      component: BookingView,
      meta: {
        requiresAuth: true,
        roles: ['CLIENT','ADMIN']
      }
    },
    {
      path: 'payment/:bookingId',
      name: 'payment',
      component: PaymentView,
      meta: {
        requiresAuth: true,
        roles: ['CLIENT','ADMIN']
      }
    },
    {
      path: '/receipt/:bookingId',
      name: 'receipt',
      component: RecieptView,
      meta: {
        requiresAuth: true,
        roles: ['CLIENT','ADMIN']
      }
    },
    {
      path: 'my-bookings',
      name: 'my-bookings',
      component: MyBookingsView,
      meta: {
        requiresAuth: true,
        roles: ['CLIENT','ADMIN']
      }
    },
    {
      path: 'booking/detail-booking/:bookingId',
      name: 'detail_booking',
      component: MyBookingsView,
      meta: {
        requiresAuth: true,
        roles: ['CLIENT','ADMIN']
      }
    },
    {
      path: 'rental-history',
      name: 'rental-history',
      component: RentalHistoryView,
      meta: {
        requiresAuth: true,
        roles: ['CLIENT','ADMIN']
      }
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
      meta: {
        requiresAuth: true,
        roles: ['CLIENT', 'ADMIN']
      }
    },
    {
        path: '/favorites',
        name: 'Favorites',
        component: Favorites,
        meta: {
          requiresAuth: true,
           roles: ['CLIENT', 'ADMIN']
        }
      }
  ]
},

  // -------------------------------------------------------------
  // Authentication Routes
  // -------------------------------------------------------------
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
      },
      {
        path: 'reset-password',
        name: 'reset-password',
        component: ResetPassword
      }
    ]
  },

  // Google Callback handler endpoint matching backend Spring Security redirect
  {
    path: '/api/auth/google/callback',
    name: 'google-callback',
    component: LoginView
  },

  // -------------------------------------------------------------
  // Admin Portal Routes
  // -------------------------------------------------------------
  {
    path: '/admin',
    component: () => import('../layouts/AdminLayout.vue'),
    meta: {
    requiresAuth: true,
    roles: ['ADMIN']
    },
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
      },
      {
        path: 'profile_user',
        name: 'Profile',
        component: Profile
      },
      {
        path: 'bookings/create',
        name: 'CreateBooking',
        component: CreateBooking
      },
      {
        path: 'bookings/update/:id',
        name: 'UpdateBooking',
        component: Update
      },
      {
        path: 'bookings/:id',
        name: 'DetailBooking',
        component: Detail
      },
      {
        path: 'vehicles/create',
        name: 'CreateVehicle',
        component: CreateVehicle
      },
      {
        path: 'vehicles/update/:id',
        name: 'UpdateVehicle',
        component: UpdateVehicle
      },
      {
        path: 'vehicles/:id',
        name: 'DetailVehicle',
        component: DetailVehicle
      },
      {
        path: 'categories/create',
        name: 'CreateCategory',
        component: CreateCategory
      },
      {
        path: 'categories/update/:id',
        name: 'UpdateCategory',
        component: UpdateCategory
      },
      {
        path: 'categories/:id',
        name: 'DetailCategory',
        component: DetailCategory
      },
      {
        path: 'brands/create',
        name: 'CreateBrand',
        component: CreateBrand
      },
      {
        path: 'brands/update/:id',
        name: 'UpdateBrand',
        component: UpdateBrands
      },
      {
        path: 'brands/:id',
        name: 'DetailBrand',
        component: DetailBrand
      },
      {
        path: 'users/post',
        name: 'CreateUser',
        component: CreateUser
      },
      {
        path: 'users/update/:id',
        name: 'UpdateUser',
        component: UpdateUser
      },
      {
        path: 'users/:id',
        name: 'DetailUser',
        component: DetailUser
      }
    ]
  },

  // 404 Fallback
  {
    path: '/:pathMatch(.*)*',
    redirect: '/auth/login'
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

  // =========================
  // Check authentication
  // =========================
  if (to.meta.requiresAuth && !token) {
    return {
      name: 'login',
      query: {
        redirect: to.fullPath
      }
    }
  }

  // =========================
  // Check role
  // =========================
  if (to.meta.roles) {
    const allowedRoles = to.meta.roles

    const userRoles = Array.isArray(user?.roles)
      ? user.roles
      : user?.role
        ? [user.role]
        : []

    const hasPermission = userRoles.some((role) =>
      allowedRoles.includes(String(role).toUpperCase())
    )

    if (!hasPermission) {
      return {
        name: 'home'
      }
    }
  }

  return true
})

export default router