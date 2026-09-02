<template>
  <main class="p-6 md:p-8 min-h-[calc(100vh-64px)] bg-gray-50/50">
    
    <!-- Page Header & Main Actions -->
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Users</h1>
        <p class="text-xs text-gray-500 mt-1">Manage administrators, operational staff, and registered customers</p>
      </div>
      
      <div class="flex items-center gap-3 shrink-0">
        <button 
          @click="$emit('export')" 
          class="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-lg text-xs font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-all shadow-xs cursor-pointer active:scale-95"
        >
          <i class="fa-solid fa-download text-[11px] text-gray-400"></i>
          <span>Export</span>
        </button>
        <button 
          @click="$emit('add-user')" 
          class="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-xs cursor-pointer active:scale-95"
        >
          <i class="fa-solid fa-plus text-[10px]"></i>
          <span>Add User</span>
        </button>
      </div>
    </div>

    <!-- 5 KPI Summary Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      
      <!-- KPI 1: Total Users -->
      <div class="p-4 bg-white border border-gray-200/80 rounded-xl shadow-xs hover:border-gray-300 transition-all flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <span class="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Total Users</span>
          <div class="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs">
            <i class="fa-solid fa-users"></i>
          </div>
        </div>
        <div class="mt-3">
          <div class="text-2xl font-extrabold text-gray-900">4,281</div>
          <p class="text-[10px] text-gray-400 mt-0.5 font-medium">All user types</p>
        </div>
      </div>

      <!-- KPI 2: Active Users -->
      <div class="p-4 bg-white border border-gray-200/80 rounded-xl shadow-xs hover:border-gray-300 transition-all flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <span class="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Active</span>
          <div class="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
            <i class="fa-solid fa-circle-check"></i>
          </div>
        </div>
        <div class="mt-3">
          <div class="text-2xl font-extrabold text-gray-900">3,902</div>
          <p class="text-[10px] text-emerald-600 font-bold mt-0.5">91% active rate</p>
        </div>
      </div>

      <!-- KPI 3: Customers -->
      <div class="p-4 bg-white border border-gray-200/80 rounded-xl shadow-xs hover:border-gray-300 transition-all flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <span class="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Customers</span>
          <div class="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs">
            <i class="fa-solid fa-user-tag"></i>
          </div>
        </div>
        <div class="mt-3">
          <div class="text-2xl font-extrabold text-gray-900">4,150</div>
          <p class="text-[10px] text-gray-400 mt-0.5 font-medium">End consumers</p>
        </div>
      </div>

      <!-- KPI 4: Administrators -->
      <div class="p-4 bg-white border border-gray-200/80 rounded-xl shadow-xs hover:border-gray-300 transition-all flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <span class="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Admins</span>
          <div class="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-xs">
            <i class="fa-solid fa-shield-halved"></i>
          </div>
        </div>
        <div class="mt-3">
          <div class="text-2xl font-extrabold text-gray-900">24</div>
          <p class="text-[10px] text-gray-400 mt-0.5 font-medium">System access</p>
        </div>
      </div>

      <!-- KPI 5: Inactive Users -->
      <div class="p-4 bg-white border border-gray-200/80 rounded-xl shadow-xs hover:border-gray-300 transition-all flex flex-col justify-between sm:col-span-2 lg:col-span-1">
        <div class="flex items-center justify-between">
          <span class="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Inactive</span>
          <div class="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center text-xs">
            <i class="fa-solid fa-user-xmark"></i>
          </div>
        </div>
        <div class="mt-3">
          <div class="text-2xl font-extrabold text-gray-900">379</div>
          <p class="text-[10px] text-rose-600 font-bold mt-0.5">Suspended or inactive</p>
        </div>
      </div>

    </div>

    <!-- Users Table Container -->
    <div class="bg-white border border-gray-200/80 rounded-xl shadow-xs overflow-hidden mb-6">
      
      <!-- Table Search & Filters Control Bar -->
      <div class="p-4 px-6 border-b border-gray-200/80 bg-white flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        <!-- Search Input -->
        <div class="relative flex-1 max-w-md">
          <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Search by user name or email address..." 
            class="w-full h-9 pl-9 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-xs"
          >
        </div>

        <!-- Filter Selects -->
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2">
            <label class="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Role:</label>
            <select class="h-9 px-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer">
              <option>All Roles</option>
              <option>Admin</option>
              <option>Staff</option>
              <option>Customer</option>
            </select>
          </div>

          <div class="flex items-center gap-2">
            <label class="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status:</label>
            <select class="h-9 px-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer">
              <option>All Statuses</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

      </div>

      <!-- Data Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-gray-700">
          <thead>
            <tr class="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider text-[10px] border-b border-gray-200">
              <th class="py-3 px-6">User</th>
              <th class="py-3 px-5">Phone</th>
              <th class="py-3 px-5">Gender</th>
              <th class="py-3 px-5">Role</th>
              <th class="py-3 px-5">Status</th>
              <th class="py-3 px-5">Registered</th>
              <th class="py-3 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            
            <!-- Row 1 -->
            <tr class="hover:bg-gray-50/80 transition-colors">
              <td class="py-3.5 px-6">
                <div class="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Sarah Jenkins" class="w-8 h-8 rounded-full object-cover ring-1 ring-gray-200">
                  <div>
                    <div class="font-bold text-gray-900 text-xs">Sarah Jenkins</div>
                    <div class="text-[11px] text-gray-400 font-medium">sarah.j@example.com</div>
                  </div>
                </div>
              </td>
              <td class="py-3.5 px-5 text-gray-600 font-medium">+1 (555) 019-2834</td>
              <td class="py-3.5 px-5 text-gray-500">Female</td>
              <td class="py-3.5 px-5">
                <span class="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200/60">
                  Admin
                </span>
              </td>
              <td class="py-3.5 px-5">
                <span class="px-2.5 py-1 text-[10px] font-bold inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 rounded-full">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Active
                </span>
              </td>
              <td class="py-3.5 px-5 text-gray-400">Oct 12, 2023</td>
              <td class="py-3.5 px-6 text-right">
                <button class="w-7 h-7 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors inline-flex items-center justify-center cursor-pointer">
                  <i class="fa-solid fa-ellipsis-vertical text-xs"></i>
                </button>
              </td>
            </tr>

            <!-- Row 2 -->
            <tr class="hover:bg-gray-50/80 transition-colors">
              <td class="py-3.5 px-6">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                    MR
                  </div>
                  <div>
                    <div class="font-bold text-gray-900 text-xs">Marcus Rodriguez</div>
                    <div class="text-[11px] text-gray-400 font-medium">m.rodriguez@client.co</div>
                  </div>
                </div>
              </td>
              <td class="py-3.5 px-5 text-gray-600 font-medium">+1 (555) 847-3920</td>
              <td class="py-3.5 px-5 text-gray-500">Male</td>
              <td class="py-3.5 px-5">
                <span class="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60">
                  Customer
                </span>
              </td>
              <td class="py-3.5 px-5">
                <span class="px-2.5 py-1 text-[10px] font-bold inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 rounded-full">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Active
                </span>
              </td>
              <td class="py-3.5 px-5 text-gray-400">Nov 04, 2023</td>
              <td class="py-3.5 px-6 text-right">
                <button class="w-7 h-7 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors inline-flex items-center justify-center cursor-pointer">
                  <i class="fa-solid fa-ellipsis-vertical text-xs"></i>
                </button>
              </td>
            </tr>

            <!-- Row 3 -->
            <tr class="hover:bg-gray-50/80 transition-colors">
              <td class="py-3.5 px-6">
                <div class="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" alt="David Chen" class="w-8 h-8 rounded-full object-cover ring-1 ring-gray-200">
                  <div>
                    <div class="font-bold text-gray-900 text-xs">David Chen</div>
                    <div class="text-[11px] text-gray-400 font-medium">d.chen@fleetops.net</div>
                  </div>
                </div>
              </td>
              <td class="py-3.5 px-5 text-gray-600 font-medium">+1 (555) 231-9948</td>
              <td class="py-3.5 px-5 text-gray-500">Male</td>
              <td class="py-3.5 px-5">
                <span class="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200/60">
                  Staff
                </span>
              </td>
              <td class="py-3.5 px-5">
                <span class="px-2.5 py-1 text-[10px] font-bold inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 rounded-full">
                  <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                  Inactive
                </span>
              </td>
              <td class="py-3.5 px-5 text-gray-400">Jan 15, 2024</td>
              <td class="py-3.5 px-6 text-right">
                <button class="w-7 h-7 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors inline-flex items-center justify-center cursor-pointer">
                  <i class="fa-solid fa-ellipsis-vertical text-xs"></i>
                </button>
              </td>
            </tr>

            <!-- Row 4 -->
            <tr class="hover:bg-gray-50/80 transition-colors">
              <td class="py-3.5 px-6">
                <div class="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" alt="Emily Thompson" class="w-8 h-8 rounded-full object-cover ring-1 ring-gray-200">
                  <div>
                    <div class="font-bold text-gray-900 text-xs">Emily Thompson</div>
                    <div class="text-[11px] text-gray-400 font-medium">emily.t@logistics.com</div>
                  </div>
                </div>
              </td>
              <td class="py-3.5 px-5 text-gray-600 font-medium">+44 7700 900077</td>
              <td class="py-3.5 px-5 text-gray-500">Female</td>
              <td class="py-3.5 px-5">
                <span class="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60">
                  Customer
                </span>
              </td>
              <td class="py-3.5 px-5">
                <span class="px-2.5 py-1 text-[10px] font-bold inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 rounded-full">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Active
                </span>
              </td>
              <td class="py-3.5 px-5 text-gray-400">Feb 28, 2024</td>
              <td class="py-3.5 px-6 text-right">
                <button class="w-7 h-7 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors inline-flex items-center justify-center cursor-pointer">
                  <i class="fa-solid fa-ellipsis-vertical text-xs"></i>
                </button>
              </td>
            </tr>

          </tbody>
        </table>
      </div>

      <!-- Clean Pagination Footer -->
      <div class="flex flex-col sm:flex-row items-center justify-between p-4 px-6 border-t border-gray-100 text-xs text-gray-500 gap-3">
        <div>
          Showing <span class="font-bold text-gray-900">1 to 10</span> of <span class="font-bold text-gray-900">4,281</span> entries
        </div>
        
        <div class="flex items-center gap-1">
          <button class="w-7 h-7 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-gray-300 transition-all cursor-pointer">
            <i class="fa-solid fa-chevron-left text-[10px]"></i>
          </button>
          
          <button class="w-7 h-7 rounded-lg font-bold bg-blue-600 text-white shadow-xs flex items-center justify-center text-xs">1</button>
          <button class="w-7 h-7 rounded-lg hover:bg-gray-100 font-semibold text-gray-700 flex items-center justify-center transition-colors cursor-pointer">2</button>
          <button class="w-7 h-7 rounded-lg hover:bg-gray-100 font-semibold text-gray-700 flex items-center justify-center transition-colors cursor-pointer">3</button>
          <span class="px-1 text-gray-400">...</span>
          <button class="w-7 h-7 rounded-lg hover:bg-gray-100 font-semibold text-gray-700 flex items-center justify-center transition-colors cursor-pointer">429</button>
          
          <button class="w-7 h-7 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:border-gray-300 transition-all cursor-pointer">
            <i class="fa-solid fa-chevron-right text-[10px]"></i>
          </button>
        </div>
      </div>

    </div>

  </main>
</template>

<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
defineEmits(['export', 'add-user'])
</script>