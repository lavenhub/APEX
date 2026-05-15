// ===== BROWSE PAGE =====
function renderBrowse() {
  document.getElementById('page-browse').innerHTML = `
  <main class="pt-20 min-h-screen relative telemetry-grid overflow-hidden">
    <section class="max-w-7xl mx-auto px-6 lg:px-16 py-16">
      <div class="mb-12 anim-up">
        <button class="text-primary text-sm tracking-widest uppercase mb-4 hover:text-white transition-colors" onclick="navigate('discover')">
          ← BACK TO DISCOVER
        </button>
        <h1 id="browseTitle" class="text-on-surface font-bold uppercase" style="font-size:clamp(40px,7vw,70px);line-height:1;letter-spacing:-0.03em">BROWSE</h1>
        <p class="text-on-surface-variant mt-3 text-lg">Select a vehicle to view its complete engineering dossier.</p>
      </div>
      
      <div id="browseGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Vehicles will be injected here -->
      </div>
    </section>
  </main>
  `;
}

window.addEventListener('page-navigated', async (e) => {
  if (e.detail.page !== 'browse') return;
  const params = e.detail.params;
  
  if (params && params.title) {
    document.getElementById('browseTitle').textContent = params.title;
  }
  
  const grid = document.getElementById('browseGrid');
  grid.innerHTML = '<div class="col-span-full text-center py-20 text-on-surface-variant animate-pulse">LOADING FLEET DATA...</div>';
  
  try {
    let vehicles = [];
    if (params && params.query) {
      const res = await ApexAPI.searchVehicles(params.query);
      vehicles = res.results || [];
    } else {
      const res = await ApexAPI.getVehicles(params?.category);
      vehicles = res.vehicles || [];
    }

    if (vehicles.length === 0) {
      grid.innerHTML = '<div class="col-span-full text-center py-20 text-on-surface-variant">NO VEHICLES FOUND.</div>';
      return;
    }
    
    grid.innerHTML = vehicles.map((v, i) => `
      <div class="bg-surface-container border border-outline-variant notch-tl overflow-hidden card-hover anim-up cursor-pointer group flex flex-col"
           style="animation-delay: ${i * 0.1}s"
           onclick="navigate('dossier', { id: ${v.id} })">
        <div class="relative w-full aspect-video border-b border-outline-variant bg-[#0c0f0f]">
          <img src="${v.image_url}" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" alt="${v.make} ${v.model}"/>
          <div class="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent pointer-events-none"></div>
          <div class="absolute bottom-4 left-4">
            <div class="hud-label text-primary mb-1">${v.category}</div>
            <h3 class="text-on-surface font-bold text-2xl uppercase">${v.make} ${v.model}</h3>
          </div>
        </div>
        <div class="p-6 grid grid-cols-2 gap-4 flex-grow">
          <div>
            <div class="hud-label text-on-surface-variant text-[10px]">OUTPUT</div>
            <div class="text-on-surface font-semibold">${v.hp} BHP</div>
          </div>
          <div>
            <div class="hud-label text-on-surface-variant text-[10px]">0-100</div>
            <div class="text-on-surface font-semibold">${v.accel_0_100}s</div>
          </div>
          <div class="col-span-2 mt-auto">
            <div class="hud-label text-on-surface-variant text-[10px]">ENGINE</div>
            <div class="text-on-surface text-sm line-clamp-1">${v.engine}</div>
          </div>
        </div>
      </div>
    `).join('');
    
  } catch (err) {
    grid.innerHTML = '<div class="col-span-full text-center py-20 text-error">FAILED TO LOAD FLEET DATA.</div>';
  }
});
