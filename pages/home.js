// ===== HOME PAGE =====
function renderHome() {
  document.getElementById('page-home').innerHTML = `
  <main>
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center px-6 lg:px-16 pt-20 overflow-hidden">
      <!-- Background layers -->
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 spotlight"></div>
        <div class="absolute top-1/4 left-0 w-full h-px bg-outline-variant opacity-20"></div>
        <div class="absolute bottom-1/4 left-0 w-full h-px bg-outline-variant opacity-20"></div>
        <div class="absolute top-0 left-1/3 w-px h-full bg-outline-variant opacity-20"></div>
        <div class="absolute top-0 right-1/4 w-px h-full bg-outline-variant opacity-10"></div>
        <!-- Ambient glow -->
        <div class="absolute top-1/2 right-1/4 w-96 h-96 rounded-full blur-[120px]" style="background:rgba(255,180,171,0.06)"></div>
      </div>

      <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-7xl mx-auto">
        <!-- Text -->
        <div class="lg:col-span-5 flex flex-col justify-center anim-left anim-delay-1">
          <div class="flex items-center gap-3 mb-6">
            <span class="w-12 h-px bg-primary"></span>
            <span class="hud-label" style="letter-spacing:0.25em">Telemetry Protocol v4.0</span>
          </div>
          <h1 class="font-bold uppercase text-on-surface mb-3 text-glow" style="font-size:clamp(72px,10vw,130px);line-height:0.9;letter-spacing:-0.04em">APEX</h1>
          <h2 class="text-secondary uppercase font-semibold mb-8" style="font-size:18px;letter-spacing:0.2em">Automotive Intelligence</h2>
          <p class="text-on-surface-variant mb-12 border-l-2 border-outline-variant pl-6 max-w-md" style="font-size:17px;line-height:1.7">
            Next-generation performance monitoring and synthetic vehicle diagnostics. Decode the DNA of motion with cinematic precision.
          </p>
          <div class="flex flex-wrap gap-4">
            <button class="btn-primary" onclick="navigate('scan')">Start Scanning</button>
            <button class="btn-ghost" onclick="navigate('discover')">Explore Database</button>
          </div>

          <!-- HUD stats strip -->
          <div class="mt-12 grid grid-cols-4 gap-4 border-t border-outline-variant pt-8">
            <div>
              <div class="hud-label mb-1">Peak Velocity</div>
              <div class="text-on-surface font-bold text-xl" data-count="342" data-suffix=" km/h" id="stat-velocity">342 km/h</div>
            </div>
            <div>
              <div class="hud-label mb-1">System Latency</div>
              <div class="text-on-surface font-bold text-xl" data-count="0.04" data-decimals="2" data-suffix=" ms" id="stat-latency">0.04 ms</div>
            </div>
            <div>
              <div class="hud-label mb-1">Active Sensors</div>
              <div class="text-on-surface font-bold text-xl" data-count="400" data-suffix="+" id="stat-sensors">400+</div>
            </div>
            <div>
              <div class="hud-label mb-1">Neural Core</div>
              <div class="text-on-surface font-bold text-xl" data-count="98" data-suffix="%" id="stat-neural">98%</div>
            </div>
          </div>
        </div>

        <!-- Car Showcase -->
        <div class="lg:col-span-7 relative min-h-[400px] lg:min-h-0 flex items-center justify-center anim-right anim-delay-2">
          <!-- Decorative geometry -->
          <div class="absolute top-8 right-8 w-28 h-28 border border-outline-variant opacity-30 rotate-45"></div>
          <div class="absolute bottom-16 right-32 w-56 h-56 border border-outline-variant opacity-10 -rotate-12"></div>
          <div class="absolute top-1/2 left-0 w-full h-px bg-outline-variant opacity-10"></div>

          <!-- Car image -->
          <div class="relative z-20 group w-full">
            <img src="https://images.unsplash.com/photo-1592198084033-aade902d1aae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="APEX Hero Vehicle"
              class="w-full h-auto object-cover grayscale contrast-125 brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"/>

            <!-- HUD corners -->
            <div class="absolute top-0 left-0 p-3 border-l-2 border-t-2 border-primary w-20 h-20 opacity-70">
              <div class="hud-label" style="font-size:9px">SCAN: 42.001</div>
            </div>
            <div class="absolute bottom-0 right-0 p-3 border-r-2 border-b-2 border-primary w-20 h-20 flex flex-col justify-end items-end opacity-70">
              <div class="hud-label" style="font-size:9px">STAB: 99.8%</div>
            </div>

            <!-- Scan beam overlay -->
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
              <div class="scan-beam opacity-20"></div>
            </div>
          </div>

          <!-- Ambient beam -->
          <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-24 blur-3xl opacity-20" style="background:linear-gradient(to top, rgba(255,180,171,0.3), transparent)"></div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <div class="hud-label">Scroll</div>
        <div class="w-px h-12 bg-outline-variant animate-pulse"></div>
      </div>
    </section>

    <!-- Telemetry Marquee Strip -->
    <section class="w-full bg-primary py-3 overflow-hidden border-y border-outline-variant">
      <div class="animate-marquee gap-16 whitespace-nowrap" style="display:flex;width:fit-content">
        ${['ENGINE_STATUS: OPTIMAL','ENERGY_FLUX: 1.21GW','PEAK_VELOCITY: 342 KM/H','SYSTEM_LATENCY: 0.04 MS',
           'NEURAL_CORE: 98%','AERO_LOAD: 842 KGF','TORQUE_VECTOR: 1,240 NM','G_FORCE: 1.84G'].map(t => `
          <div class="flex items-center gap-4 text-on-primary font-bold uppercase tracking-widest px-8" style="font-size:12px;letter-spacing:0.3em">
            <span class="material-symbols-outlined text-sm">speed</span> ${t}
          </div>`).join('')}
        ${['ENGINE_STATUS: OPTIMAL','ENERGY_FLUX: 1.21GW','PEAK_VELOCITY: 342 KM/H','SYSTEM_LATENCY: 0.04 MS'].map(t => `
          <div class="flex items-center gap-4 text-on-primary font-bold uppercase tracking-widest px-8" style="font-size:12px;letter-spacing:0.3em">
            <span class="material-symbols-outlined text-sm">sensors</span> ${t}
          </div>`).join('')}
      </div>
    </section>

    <!-- Capabilities Bento Grid -->
    <section class="px-6 lg:px-16 py-24" style="background:#0c0f0f">
      <div class="max-w-7xl mx-auto">
        <div class="mb-16 anim-up anim-delay-1">
          <div class="hud-label mb-2">Capabilities / Core</div>
          <div class="w-full h-px bg-outline-variant"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

          <!-- Big card: Telemetry -->
          <div class="md:col-span-8 bg-surface border border-outline-variant p-10 notch-accent relative overflow-hidden group card-hover anim-up anim-delay-2">
            <div class="scan-line-texture absolute inset-0 opacity-5 pointer-events-none"></div>
            <div class="relative z-10">
              <div class="flex justify-between items-start mb-16">
                <span class="material-symbols-outlined text-primary text-4xl">analytics</span>
                <span class="hud-label text-on-surface-variant">SR-902-X</span>
              </div>
              <h3 class="text-on-surface font-bold uppercase mb-4" style="font-size:42px;line-height:1.1;letter-spacing:-0.02em">Precision Telemetry</h3>
              <p class="text-on-surface-variant max-w-md mb-8" style="font-size:15px;line-height:1.7">
                Real-time data ingestion from over 400 internal sensors. Monitor g-force, thermal distribution, and aero efficiency with zero latency.
              </p>
              <button class="flex items-center gap-2 text-primary hud-label group-hover:gap-4 transition-all" onclick="navigate('discover')">
                View Protocol <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          <!-- Small card: Visual AI -->
          <div class="md:col-span-4 bg-surface-container-high border border-outline-variant p-8 notch-accent relative card-hover anim-up anim-delay-3 flex flex-col justify-between">
            <div>
              <span class="material-symbols-outlined text-secondary text-4xl mb-6 block">view_in_ar</span>
              <h4 class="text-on-surface font-bold uppercase mb-4" style="font-size:26px">Visual AI</h4>
              <p class="text-on-surface-variant text-sm" style="line-height:1.7">Advanced computer vision for structural integrity assessment and performance tuning.</p>
            </div>
            <!-- Scan line display -->
            <div class="mt-6 bg-black border border-outline-variant h-28 relative overflow-hidden flex items-center justify-center">
              <div class="w-4/5 h-px bg-primary animate-pulse" style="box-shadow:0 0 12px rgba(255,180,171,0.6)"></div>
              <div class="scan-beam opacity-30"></div>
            </div>
          </div>

          <!-- Small card: Global -->
          <div class="md:col-span-4 bg-surface border border-outline-variant p-8 notch-accent card-hover anim-up anim-delay-4">
            <span class="material-symbols-outlined text-tertiary text-4xl mb-6 block">language</span>
            <h4 class="text-on-surface font-bold uppercase mb-4" style="font-size:26px">Global Fleet</h4>
            <p class="text-on-surface-variant text-sm" style="line-height:1.7">Connect with elite collectors and engineers worldwide through a decentralized vehicle ledger.</p>
          </div>

          <!-- Wide card: Dark Studio -->
          <div class="md:col-span-8 bg-surface-container-highest border border-outline-variant relative overflow-hidden group card-hover anim-up anim-delay-5" style="min-height:300px">
            <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Dark sports car"
              class="absolute inset-0 w-full h-full object-cover opacity-40 bento-img"/>
            <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div class="relative z-10 p-10 h-full flex flex-col justify-end" style="min-height:300px">
              <h4 class="text-white font-bold uppercase mb-2" style="font-size:38px;line-height:1.1">Cinematic Showcase</h4>
              <p class="hud-label text-primary">Studio A // Sector 7</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features row -->
    <section class="px-6 lg:px-16 py-24 bg-surface-dim">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          ${[
            {icon:'bolt',title:'Instant Analysis',desc:'Sub-millisecond AI processing of every sensor data point. Real-time feedback loop between vehicle dynamics and driver input.'},
            {icon:'radar',title:'360° Monitoring',desc:'Comprehensive coverage of all vehicle systems from ADAS sensors to exhaust temperature mapping across 12 zones.'},
            {icon:'psychology',title:'Neural Intelligence',desc:'Self-learning algorithms trained on 50M+ data points from track and road environments across 140 countries.'}
          ].map(f => `
            <div class="p-8 border border-outline-variant card-hover" style="background:#1a1c1c">
              <span class="material-symbols-outlined text-secondary text-3xl mb-5 block">${f.icon}</span>
              <h4 class="text-on-surface font-semibold uppercase mb-3" style="font-size:18px;letter-spacing:0.05em">${f.title}</h4>
              <p class="text-on-surface-variant text-sm" style="line-height:1.7">${f.desc}</p>
            </div>`).join('')}
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="px-6 lg:px-16 py-24 relative overflow-hidden" style="background:#0c0f0f">
      <div class="absolute inset-0 telemetry-grid opacity-30"></div>
      <div class="relative z-10 max-w-3xl mx-auto text-center">
        <div class="hud-label mb-6 text-primary">Begin Your Session</div>
        <h2 class="text-on-surface font-bold uppercase mb-6" style="font-size:clamp(40px,6vw,72px);line-height:1.05;letter-spacing:-0.03em">DECODE THE DNA OF MOTION</h2>
        <p class="text-on-surface-variant mb-10 text-lg" style="line-height:1.7">Upload your vehicle image and let APEX's AI engine extract every telemetric signature in seconds.</p>
        <button class="btn-primary" onclick="navigate('scan')">Launch Scanner →</button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="px-6 lg:px-16 py-12 border-t border-outline-variant" style="background:#121414">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
          <div class="text-on-surface font-bold text-2xl mb-2">APEX</div>
          <p class="hud-label text-secondary">© 2024 APEX INTELLIGENCE. SYSTEM STATUS: NOMINAL.</p>
        </div>
        <div class="flex flex-wrap gap-8">
          ${['Telemetry Protocol','Privacy','Security','API Resources'].map(l =>
            `<a href="#" class="hud-label text-on-surface-variant hover:text-secondary transition-colors">${l}</a>`).join('')}
        </div>
        <div class="flex gap-3">
          ${['share','database'].map(i => `
            <div class="w-10 h-10 border border-outline-variant flex items-center justify-center hover:border-primary transition-colors cursor-pointer">
              <span class="material-symbols-outlined text-on-surface-variant text-sm">${i}</span>
            </div>`).join('')}
        </div>
      </div>
    </footer>
  </main>`;
}
