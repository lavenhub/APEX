// ===== DOSSIER PAGE =====
let _lastVehicleData = null;

function renderDossier(vehicleData = null) {
  const v = vehicleData || {
    make: 'NISSAN',
    model: 'GT-R R35',
    year: 2024,
    hp: 600,
    top_speed: 315,
    acceleration: '2.7S',
    drive_type: 'AWD',
    engine: 'VR38DETT',
    weight: '1,752 KG',
    desc: 'The R35 GT-R redefined the limits of physics, blending all-wheel-drive precision with a twin-turbocharged heart that beat with technical perfection.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200'
  };
  _lastVehicleData = v;

  const page = document.getElementById('page-dossier');
  page.innerHTML = `
  <main class="min-h-screen relative pt-16">
    <!-- Top Hero Section -->
    <section class="grid grid-cols-1 lg:grid-cols-2">
      <!-- Left: Visual Focus -->
      <div class="relative overflow-hidden group border-r border-outline-variant" style="min-height:70vh">
        <img src="${v.image}" 
             class="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105" 
             alt="${v.model}"/>
        <div class="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
        
        <!-- Overlay HUD -->
        <div class="absolute top-10 left-10 z-20 flex flex-col gap-6">
          <div class="flex items-center gap-4 bg-black/40 backdrop-blur-md px-6 py-4 border-l-4 border-primary anim-left">
            <div>
              <div class="hud-label text-primary text-[10px] uppercase mb-1">SCAN_CONFIRMATION</div>
              <div class="text-on-surface font-bold text-xl uppercase tracking-tighter">${v.make} // ${v.model}</div>
            </div>
          </div>
          
          <div class="flex flex-col items-end gap-2">
            <div class="w-48 h-px bg-outline-variant overflow-hidden">
              <div class="h-px bg-primary" style="width:66%"></div>
            </div>
            <div class="hud-label text-on-surface-variant" style="font-size:10px">ROTATION_AXIS_X: ACTIVE</div>
          </div>
        </div>

        <!-- Corner decorations -->
        <div class="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary z-30 opacity-60"></div>
        <div class="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-primary z-30 opacity-60"></div>
      </div>

      <!-- Right: Details -->
      <div class="p-10 lg:p-20 flex flex-col justify-center relative" style="background:#121414">
        <div class="relative z-10">
          <span class="hud-label text-secondary mb-4 block" style="letter-spacing:0.3em">Experimental Unit // ${v.id || '001'}</span>
          <h1 class="text-on-surface font-bold uppercase mb-2 anim-left anim-delay-1" style="font-size:clamp(42px,6vw,72px);line-height:0.95;letter-spacing:-0.03em">${v.make}<br>${v.model}</h1>
          <h2 class="text-primary uppercase font-semibold mb-10 anim-left anim-delay-2" style="font-size:18px;letter-spacing:0.25em">${v.year} SPECIFICATION</h2>
          <p class="text-on-surface-variant mb-10 border-l-2 border-primary pl-6 max-w-xl anim-up anim-delay-3" style="font-size:16px;line-height:1.8">
            ${v.desc}
          </p>
          <div class="flex flex-wrap gap-4 anim-up anim-delay-4">
            <button class="btn-primary" id="engineBtn" onclick="startEngine()">START ENGINE</button>
            <button class="btn-ghost" onclick="downloadDossier()">GENERATE REPORT</button>
          </div>
          
          <div id="engineStatus" class="mt-8 hidden anim-fade">
             <div class="flex items-center gap-3 mb-2">
                <span class="w-3 h-3 rounded-full bg-secondary animate-pulse"></span>
                <span class="hud-label text-secondary uppercase tracking-widest">Core Primed</span>
             </div>
             <div class="flex items-center gap-4">
                <div class="flex-1 bg-surface-container h-1 overflow-hidden">
                  <div id="rpmBar" class="h-full bg-secondary transition-all duration-300" style="width:0%"></div>
                </div>
                <div id="rpmDisplay" class="hud-label text-on-surface-variant" style="font-size:11px">0 RPM</div>
             </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Specs Grid -->
    <section class="bg-surface py-24 border-y border-outline-variant">
      <div class="max-w-7xl mx-auto px-6 lg:px-16">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Stats Column -->
          <div class="lg:col-span-1 flex flex-col gap-8">
            <div>
              <div class="hud-label text-outline-variant text-[10px] mb-2 uppercase tracking-[0.4em]">Engine Performance</div>
              <div class="flex items-baseline gap-2">
                <span class="text-on-surface font-bold text-6xl" id="dossier-hp">${v.hp}</span>
                <span class="text-primary font-bold">BHP</span>
              </div>
            </div>
            <div>
              <div class="hud-label text-outline-variant text-[10px] mb-2 uppercase tracking-[0.4em]">Velocity Threshold</div>
              <div class="flex items-baseline gap-2">
                <span class="text-on-surface font-bold text-6xl" id="dossier-speed">${v.top_speed}</span>
                <span class="text-secondary font-bold">KM/H</span>
              </div>
            </div>
            <div>
              <div class="hud-label text-outline-variant text-[10px] mb-2 uppercase tracking-[0.4em]">Mass Efficiency</div>
              <div class="flex items-baseline gap-2">
                <span class="text-on-surface font-bold text-6xl">${v.weight.split(' ')[0]}</span>
                <span class="text-tertiary font-bold">KG</span>
              </div>
            </div>
          </div>

          <!-- Component Map -->
          <div class="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
            ${[
              {icon:'precision_manufacturing', label:'Drivetrain', val: v.drive_type},
              {icon:'settings_input_component', label:'Transmission', val: v.transmission || 'Dual-Clutch'},
              {icon:'memory', label:'Control Unit', val:'APEX v2.4'},
              {icon:'monitor_weight', label:'Weight', val: v.weight},
              {icon:'bolt', label:'Powerplant', val: v.engine},
              {icon:'speed', label:'Acceleration', val: v.acceleration},
            ].map(s => `
              <div class="p-5 border border-outline-variant flex flex-col justify-between card-hover" style="background:#1a1c1c">
                <span class="material-symbols-outlined text-secondary text-2xl mb-4">${s.icon}</span>
                <div>
                  <div class="hud-label text-on-surface uppercase mb-1">${s.label}</div>
                  <div class="text-on-surface-variant font-semibold" style="font-size:15px">${s.val}</div>
                </div>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- AI Story Section -->
    <section class="px-6 lg:px-16 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center" style="background:#0c0f0f">
      <div class="order-2 lg:order-1">
        <div class="hud-label text-primary mb-6 flex items-center gap-3">
          <span class="w-10 h-px bg-primary"></span> Intelligence Briefing
        </div>
        <h3 class="text-on-surface font-bold uppercase mb-8" style="font-size:clamp(28px,4vw,44px);letter-spacing:-0.02em">TECHNICAL CORE ANALYSIS</h3>
        <div class="space-y-5 text-on-surface-variant" style="font-size:16px;line-height:1.8">
          <p>Every component in this ${v.make} has been engineered to withstand extreme thermal and kinetic loads. The ${v.engine} acts as the mechanical heart, utilizing high-pressure lubrication and precision-balanced internals to achieve peak efficiency.</p>
          <p>Integrated sensors provide a 100Hz telemetry stream back to the APEX core, allowing for real-time adjustments to aerodynamic profiles and damping rates. This represents the pinnacle of digital-to-mechanical synergy.</p>
        </div>
        <button class="flex items-center gap-4 text-secondary hud-label uppercase mt-10 group hover:gap-6 transition-all" onclick="downloadDossier()">
          Download Full Dossier <span class="material-symbols-outlined group-hover:translate-x-2 transition-transform">download</span>
        </button>
      </div>
      <div class="order-1 lg:order-2 relative border border-outline-variant" style="aspect-ratio:16/9">
        <img id="dossier-image-2" src="https://images.unsplash.com/photo-1540066019607-e5f69323a8bc?w=800"
             class="w-full h-full object-cover" alt="Technical Detail"/>
        <div class="absolute inset-0 mix-blend-overlay" style="background:rgba(255,180,171,0.1)"></div>
        <div class="absolute inset-0 pointer-events-none">
          <div class="scan-beam opacity-20"></div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="px-6 lg:px-16 py-24 flex flex-col items-center text-center bg-primary">
      <h2 class="text-on-primary font-bold uppercase mb-6" style="font-size:clamp(42px,7vw,80px);line-height:1;letter-spacing:-0.03em">OWN THE ARCHIVE</h2>
      <p class="text-on-primary-container max-w-2xl mb-10" style="font-size:16px;line-height:1.7">
        Download the complete engineering dossier for the ${v.make} ${v.model} platform, including telemetry charts, Nürburgring lap data, and component schematics.
      </p>
      <button class="flex items-center gap-4 px-12 py-5 hud-label uppercase hover:scale-105 transition-transform active:scale-95"
              style="background:#690005;color:#fff;letter-spacing:0.25em"
              onclick="downloadDossier()">
        DOWNLOAD FULL DOSSIER <span class="material-symbols-outlined">download</span>
      </button>
    </section>
  </main>`;

  // Secondary image rotation logic
  const secondaryImg = document.getElementById('dossier-image-2');
  if (secondaryImg) {
    const hardcodedDetails = [
      'https://images.unsplash.com/photo-1540066019607-e5f69323a8bc?w=800', // Brembo brakes
      'https://images.unsplash.com/photo-1590124673327-010486c9d09c?w=800', // Suspension/Spring
      'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?w=800', // Engine block
      'https://images.unsplash.com/photo-1621252179027-94459d278660?w=800', // Carbon fiber detail
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800'  // Rotary engine detail
    ];
    
    // Get last index from global state or window
    let lastIdx = window.__lastDetailIdx !== undefined ? window.__lastDetailIdx : -1;
    let newIdx = Math.floor(Math.random() * hardcodedDetails.length);
    
    // Non-repeating logic
    while (newIdx === lastIdx) {
      newIdx = Math.floor(Math.random() * hardcodedDetails.length);
    }
    
    window.__lastDetailIdx = newIdx;
    secondaryImg.src = hardcodedDetails[newIdx];
  }
}

function downloadDossier() {
  const v = _lastVehicleData || {};
  const makeModel = `${v.make || ''} ${v.model || ''}`.trim() || 'VEHICLE';
  
  const content = `
APEX AUTOMOTIVE INTELLIGENCE OS
VEHICLE DOSSIER REPORT
----------------------------------
UNIT: ${makeModel}
YEAR: ${v.year || 'N/A'}
----------------------------------
SPECIFICATIONS:
  - Output: ${v.hp || '---'} BHP
  - Velocity: ${v.top_speed || '---'} KM/H
  - Acceleration: ${v.acceleration || '---'}
  - Drive: ${v.drive_type || '---'}
  - Engine: ${v.engine || '---'}
  - Weight: ${v.weight || '---'}
  - Status: NOMINAL / VERIFIED
----------------------------------
INTELLIGENCE BRIEFING:
${v.desc || 'No briefings available for this unit.'}
----------------------------------
(c) 2024 APEX INTELLIGENCE PROTOCOL
CONFIDENTIAL DATA ARCHIVE
  `.trim();

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `APEX_DOSSIER_${makeModel.replace(/\s+/g, '_')}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Engine start interactivity
let engineRunning = false;
let rpmInterval = null;

function startEngine() {
  if (engineRunning) return;
  engineRunning = true;
  document.getElementById('engineStatus')?.classList.remove('hidden');
  const btn = document.getElementById('engineBtn');
  if (btn) {
    btn.textContent = 'ENGINE ON';
    btn.classList.add('bg-secondary', 'text-black');
  }

  // RPM idle simulation
  let rpm = 850;
  const bar = document.getElementById('rpmBar');
  const display = document.getElementById('rpmDisplay');
  if (bar) bar.style.width = '12%';

  rpmInterval = setInterval(() => {
    rpm = 800 + Math.random() * 200;
    if (display) display.textContent = `${Math.round(rpm)} RPM`;
    if (bar) bar.style.width = `${10 + (Math.random() * 5)}%`;
  }, 400);
}
