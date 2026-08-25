<template>
  <main class="p-6 min-h-[calc(100vh-64px)]">
    
    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6 gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-[#111827]">Users</h1>
        <p class="text-[#43474E] text-sm mt-1">Manage administrators, staff, and customers</p>
      </div>
      <div class="flex items-center gap-3">
        <button @click="$emit('export')" class="inline-flex items-center justify-center gap-2 min-h-10 px-4 rounded-lg text-sm font-medium text-[#111827] bg-[#F1F3FF] border border-[#D3DAEF] hover:bg-[#E1E8FD] transition-all shadow-sm">
          <i class="fa-solid fa-download text-xs"></i> Export
        </button>
        <button @click="$emit('add-user')" class="inline-flex items-center justify-center gap-2 min-h-10 px-4 rounded-lg text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-all shadow-sm">
          <i class="fa-solid fa-plus text-xs"></i> Add User
        </button>
      </div>
    </div>

    <!-- 5 KPI Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      
      <div class="p-5 bg-[#F1F3FF] border border-[#D3DAEF] rounded-xl shadow-sm flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <span class="text-[#7A8190] text-xs font-semibold tracking-wide">TOTAL USERS</span>
          <i class="fa-solid fa-users text-[#7A8190]"></i>
        </div>
        <div class="mt-2 text-2xl font-bold text-[#111827]">4,281</div>
      </div>

      <div class="p-5 bg-[#F1F3FF] border border-[#D3DAEF] rounded-xl shadow-sm flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <span class="text-[#7A8190] text-xs font-semibold tracking-wide">ACTIVE USERS</span>
          <i class="fa-solid fa-circle-check text-[#16A34A]"></i>
        </div>
        <div class="mt-2 text-2xl font-bold text-[#111827]">3,902</div>
      </div>

      <div class="p-5 bg-[#F1F3FF] border border-[#D3DAEF] rounded-xl shadow-sm flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <span class="text-[#7A8190] text-xs font-semibold tracking-wide">CUSTOMERS</span>
          <i class="fa-solid fa-user-tag text-[#7A8190]"></i>
        </div>
        <div class="mt-2 text-2xl font-bold text-[#111827]">4,150</div>
      </div>

      <div class="p-5 bg-[#F1F3FF] border border-[#D3DAEF] rounded-xl shadow-sm flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <span class="text-[#7A8190] text-xs font-semibold tracking-wide">ADMINISTRATORS</span>
          <i class="fa-solid fa-shield-halved text-[#7A8190]"></i>
        </div>
        <div class="mt-2 text-2xl font-bold text-[#111827]">24</div>
      </div>

      <div class="p-5 bg-[#F1F3FF] border border-[#D3DAEF] rounded-xl shadow-sm flex flex-col justify-between sm:col-span-2 lg:col-span-1">
        <div class="flex items-center justify-between">
          <span class="text-[#7A8190] text-xs font-semibold tracking-wide">INACTIVE</span>
          <i class="fa-solid fa-ban text-[#DC2626]"></i>
        </div>
        <div class="mt-2 text-2xl font-bold text-[#111827]">379</div>
      </div>

    </div>

    <!-- Filtering Bar -->
    <div class="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      <div class="relative w-full md:w-96">
        <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-[#7A8190]"></i>
        <input 
          type="text" 
          v-model="searchQuery"
          placeholder="Search by name or email..." 
          class="w-full h-10 pl-10 pr-4 bg-[#F1F3FF] border border-[#D3DAEF] rounded-lg text-sm text-[#111827] placeholder:text-[#7A8190] focus:outline-none focus:border-[#2563EB]"
        >
      </div>

      <div class="flex items-center gap-3 w-full md:w-auto justify-end">
        <div class="flex items-center gap-2 text-sm text-[#43474E]">
          <span class="font-medium text-xs">ROLE:</span>
          <select class="h-10 px-3 bg-[#F1F3FF] border border-[#D3DAEF] rounded-lg text-sm font-medium text-[#111827] focus:outline-none focus:border-[#2563EB]">
            <option>All Roles</option>
            <option>Admin</option>
            <option>Staff</option>
            <option>Customer</option>
          </select>
        </div>

        <div class="flex items-center gap-2 text-sm text-[#43474E]">
          <span class="font-medium text-xs">STATUS:</span>
          <select class="h-10 px-3 bg-[#F1F3FF] border border-[#D3DAEF] rounded-lg text-sm font-medium text-[#111827] focus:outline-none focus:border-[#2563EB]">
            <option>All Statuses</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <button class="h-10 px-3 bg-[#F1F3FF] border border-[#D3DAEF] rounded-lg text-[#43474E] hover:bg-[#E1E8FD] transition-colors">
          <i class="fa-solid fa-filter text-xs"></i>
        </button>
      </div>
    </div>

    <!-- Users Table Card -->
    <div class="bg-[#F1F3FF] border border-[#D3DAEF] rounded-xl shadow-sm overflow-hidden mb-6">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-[#E1E8FD] text-[#43474E] text-xs font-semibold border-y border-[#D3DAEF]">
              <th class="p-3.5 pl-6">USER</th>
              <th class="p-3.5">PHONE</th>
              <th class="p-3.5">GENDER</th>
              <th class="p-3.5">ROLE</th>
              <th class="p-3.5">STATUS</th>
              <th class="p-3.5">REGISTERED</th>
              <th class="p-3.5 pr-6 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#E1E6F5]">
            
            <tr class="hover:bg-[#E1E8FD]/40 transition-colors">
              <td class="p-4 pl-6">
                <div class="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Sarah Jenkins" class="w-9 h-9 rounded-full object-cover">
                  <div>
                    <div class="font-semibold text-[#111827] text-sm">Sarah Jenkins</div>
                    <div class="text-xs text-[#7A8190]">sarah.j@example.com</div>
                  </div>
                </div>
              </td>
              <td class="p-4 text-[#43474E] text-sm">+1 (555) 019-2834</td>
              <td class="p-4 text-[#43474E] text-sm">Female</td>
              <td class="p-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#DBEAFE] text-[#1D4ED8]">Admin</span>
              </td>
              <td class="p-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#DCFCE7] text-[#15803D]">Active</span>
              </td>
              <td class="p-4 text-[#43474E] text-sm">Oct 12, 2023</td>
              <td class="p-4 pr-6 text-right">
                <button class="text-[#7A8190] hover:text-[#111827]"><i class="fa-solid fa-ellipsis-vertical"></i></button>
              </td>
            </tr>

            <tr class="hover:bg-[#E1E8FD]/40 transition-colors">
              <td class="p-4 pl-6">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-full bg-[#1E3A5F] text-white flex items-center justify-center font-bold text-xs">MR</div>
                  <div>
                    <div class="font-semibold text-[#111827] text-sm">Marcus Rodriguez</div>
                    <div class="text-xs text-[#7A8190]">m.rodriguez@client.co</div>
                  </div>
                </div>
              </td>
              <td class="p-4 text-[#43474E] text-sm">+1 (555) 847-3920</td>
              <td class="p-4 text-[#43474E] text-sm">Male</td>
              <td class="p-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#DBEAFE] text-[#1D4ED8]">Customer</span>
              </td>
              <td class="p-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#DCFCE7] text-[#15803D]">Active</span>
              </td>
              <td class="p-4 text-[#43474E] text-sm">Nov 04, 2023</td>
              <td class="p-4 pr-6 text-right">
                <button class="text-[#7A8190] hover:text-[#111827]"><i class="fa-solid fa-ellipsis-vertical"></i></button>
              </td>
            </tr>

            <tr class="hover:bg-[#E1E8FD]/40 transition-colors">
              <td class="p-4 pl-6">
                <div class="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" alt="David Chen" class="w-9 h-9 rounded-full object-cover">
                  <div>
                    <div class="font-semibold text-[#111827] text-sm">David Chen</div>
                    <div class="text-xs text-[#7A8190]">d.chen@fleetops.net</div>
                  </div>
                </div>
              </td>
              <td class="p-4 text-[#43474E] text-sm">+1 (555) 231-9948</td>
              <td class="p-4 text-[#43474E] text-sm">Male</td>
              <td class="p-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FEF3C7] text-[#B45309]">Staff</span>
              </td>
              <td class="p-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FEE2E2] text-[#B91C1C]">Inactive</span>
              </td>
              <td class="p-4 text-[#43474E] text-sm">Jan 15, 2024</td>
              <td class="p-4 pr-6 text-right">
                <button class="text-[#7A8190] hover:text-[#111827]"><i class="fa-solid fa-ellipsis-vertical"></i></button>
              </td>
            </tr>

            <tr class="hover:bg-[#E1E8FD]/40 transition-colors">
              <td class="p-4 pl-6">
                <div class="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" alt="Emily Thompson" class="w-9 h-9 rounded-full object-cover">
                  <div>
                    <div class="font-semibold text-[#111827] text-sm">Emily Thompson</div>
                    <div class="text-xs text-[#7A8190]">emily.t@logistics.com</div>
                  </div>
                </div>
              </td>
              <td class="p-4 text-[#43474E] text-sm">+44 7700 900077</td>
              <td class="p-4 text-[#43474E] text-sm">Female</td>
              <td class="p-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#DBEAFE] text-[#1D4ED8]">Customer</span>
              </td>
              <td class="p-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#DCFCE7] text-[#15803D]">Active</span>
              </td>
              <td class="p-4 text-[#43474E] text-sm">Feb 28, 2024</td>
              <td class="p-4 pr-6 text-right">
                <button class="text-[#7A8190] hover:text-[#111827]"><i class="fa-solid fa-ellipsis-vertical"></i></button>
              </td>
            </tr>

          </tbody>
        </table>
      </div>

      <!-- Pagination Footer -->
      <div class="flex items-center justify-between p-4 px-6 border-t border-[#D3DAEF] text-sm text-[#43474E]">
        <div>Showing <span class="font-semibold text-[#111827]">1 to 10</span> of <span class="font-semibold text-[#111827]">4,281</span> entries</div>
        <div class="flex items-center gap-1">
          <button class="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#E1E8FD] text-[#7A8190]"><i class="fa-solid fa-chevron-left text-xs"></i></button>
          <button class="w-8 h-8 rounded-lg flex items-center justify-center font-semibold bg-[#2563EB] text-white shadow-sm">1</button>
          <button class="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#E1E8FD] font-medium text-[#111827]">2</button>
          <button class="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#E1E8FD] font-medium text-[#111827]">3</button>
          <span class="px-2 text-[#7A8190]">...</span>
          <button class="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#E1E8FD] font-medium text-[#111827]">429</button>
          <button class="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#E1E8FD] text-[#111827]"><i class="fa-solid fa-chevron-right text-xs"></i></button>
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