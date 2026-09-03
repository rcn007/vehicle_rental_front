<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Left Configuration Columns -->
    <div class="lg:col-span-2 space-y-6">
      
      <!-- Site Branding Card -->
      <div class="bg-white border border-[#D3DAEF] rounded-xl p-6 shadow-sm">
        <h2 class="text-base font-bold text-[#111827] mb-1">Site Branding</h2>
        <p class="text-xs text-[#7A8190] mb-4">Manage your platform logo and visual identity.</p>
        
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div class="px-6 py-4 bg-[#F1F3FF] border border-[#D3DAEF] rounded-lg font-bold text-[#111827] text-sm">
            Precision Auto
          </div>
          <div>
            <button class="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#D3DAEF] rounded-lg text-sm font-medium text-[#111827] hover:bg-[#E1E8FD] transition-colors shadow-sm">
              <i class="fa-solid fa-upload text-xs"></i> Upload Logo
            </button>
            <div class="text-xs text-[#7A8190] mt-2">Recommended: 200×50px, PNG or SVG.</div>
          </div>
        </div>
      </div>

      <!-- Hero Section Card -->
      <div class="bg-white border border-[#D3DAEF] rounded-xl p-6 shadow-sm">
        <h2 class="text-base font-bold text-[#111827] mb-1">Hero Section</h2>
        <p class="text-xs text-[#7A8190] mb-4">Configure homepage hero banner imagery.</p>
        
        <div class="mb-4 rounded-lg overflow-hidden border border-[#D3DAEF] relative h-36">
          <img src="https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80" alt="Hero Banner" class="w-full h-full object-cover">
        </div>
        
        <div class="flex items-center gap-3">
          <button class="px-4 py-2 bg-white border border-[#D3DAEF] rounded-lg text-sm font-medium text-[#111827] hover:bg-[#E1E8FD] transition-colors shadow-sm">Replace</button>
          <button class="px-4 py-2 text-sm font-medium text-[#DC2626] hover:bg-[#FEE2E2]/50 rounded-lg transition-colors">Remove</button>
        </div>
      </div>

      <!-- Homepage Content Card -->
      <div class="bg-white border border-[#D3DAEF] rounded-xl p-6 shadow-sm">
        <h2 class="text-base font-bold text-[#111827] mb-1">Homepage Content</h2>
        <p class="text-xs text-[#7A8190] mb-4">Edit primary titles and meta tag descriptions.</p>
        
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-[#43474E] mb-1">Website Title</label>
            <input type="text" value="Precision Auto - Premium Vehicle Rentals" class="w-full h-10 px-3 bg-[#F1F3FF] border border-[#D3DAEF] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#2563EB]">
          </div>
          <div>
            <label class="block text-xs font-semibold text-[#43474E] mb-1">Description</label>
            <textarea rows="3" class="w-full p-3 bg-[#F1F3FF] border border-[#D3DAEF] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#2563EB]">Experience luxury and performance with our curated fleet of premium vehicles. Easy booking, professional service.</textarea>
          </div>
        </div>
      </div>

    </div>

    <!-- Live Preview Sidebar Column -->
    <div>
      <div class="sticky top-6 bg-white border border-[#D3DAEF] rounded-xl p-5 shadow-sm">
        <h2 class="text-sm font-bold text-[#111827] mb-3">Live Preview</h2>
        
        <!-- Mock Browser Frame -->
        <div class="border border-[#D3DAEF] rounded-lg overflow-hidden bg-[#111827] shadow-sm mb-3">
          <div class="flex items-center gap-1.5 px-3 py-2 bg-[#1F2937]">
            <div class="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></div>
            <div class="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></div>
            <div class="w-2.5 h-2.5 rounded-full bg-[#10B981]"></div>
          </div>
          <div class="p-4 bg-slate-900 text-white min-h-[220px] flex flex-col justify-between">
            <div class="flex justify-between items-center text-xs text-slate-400">
              <span class="font-bold text-white">Precision Auto</span>
              <div class="flex gap-2"><span>Fleet</span><span>About</span><span>Contact</span></div>
            </div>
            <div class="my-4">
              <h3 class="font-extrabold text-sm">Precision Auto - Premium Rentals</h3>
              <p class="text-[10px] text-slate-300 mt-1">Experience luxury and performance with our curated fleet.</p>
            </div>
            <button class="w-fit px-3 py-1 bg-[#2563EB] text-white text-[10px] font-medium rounded">Explore Fleet</button>
          </div>
        </div>

        <div class="flex items-center gap-2 p-2.5 bg-[#F1F3FF] border border-[#D3DAEF] rounded-lg text-xs text-[#43474E]">
          <i class="fa-regular fa-eye text-[#2563EB]"></i>
          <span>Preview updates in real-time as you type.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>