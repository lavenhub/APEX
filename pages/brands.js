// ===== BRANDS PAGE =====
function renderBrands() {
  const brands = [
    { name: 'Ferrari', logo: 'https://www.carlogos.org/car-logos/ferrari-logo.png', origin: 'Maranello, Italy', founded: '1939' },
    { name: 'Porsche', logo: 'https://www.carlogos.org/car-logos/porsche-logo.png', origin: 'Stuttgart, Germany', founded: '1931' },
    { name: 'Lamborghini', logo: 'https://www.carlogos.org/car-logos/lamborghini-logo.png', origin: 'Sant\'Agata Bolognese, Italy', founded: '1963' },
    { name: 'Bugatti', logo: 'https://www.carlogos.org/car-logos/bugatti-logo.png', origin: 'Molsheim, France', founded: '1909' },
    { name: 'Nissan', logo: 'https://www.carlogos.org/car-logos/nissan-logo.png', origin: 'Yokohama, Japan', founded: '1933' },
    { name: 'McLaren', logo: 'https://www.carlogos.org/car-logos/mclaren-logo.png', origin: 'Woking, UK', founded: '1963' },
    { name: 'Aston Martin', logo: 'https://www.carlogos.org/car-logos/aston-martin-logo.png', origin: 'Gaydon, UK', founded: '1913' },
    { name: 'Koenigsegg', logo: 'https://www.carlogos.org/car-logos/koenigsegg-logo.png', origin: 'Ängelholm, Sweden', founded: '1994' },
    { name: 'Pagani', logo: 'https://www.carlogos.org/car-logos/pagani-logo.png', origin: 'San Cesario sul Panaro, Italy', founded: '1992' },
    { name: 'Tesla', logo: 'https://www.carlogos.org/car-logos/tesla-logo.png', origin: 'Austin, Texas', founded: '2003' },
    { name: 'Mercedes-Benz', logo: 'https://www.carlogos.org/car-logos/mercedes-benz-logo.png', origin: 'Stuttgart, Germany', founded: '1926' },
    { name: 'BMW', logo: 'https://www.carlogos.org/car-logos/bmw-logo.png', origin: 'Munich, Germany', founded: '1916' },
  ];

  document.getElementById('page-brands').innerHTML = `
  <main class="pt-20 min-h-screen relative overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
      <div class="telemetry-grid h-full w-full"></div>
    </div>
    
    <section class="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 py-16">
      <div class="flex flex-col gap-4 mb-16 anim-up">
        <div class="flex items-center gap-3">
          <span class="w-12 h-px bg-primary"></span>
          <span class="hud-label text-primary">Global Automotive Archives</span>
        </div>
        <h1 class="text-on-surface font-bold uppercase" style="font-size:clamp(40px,6vw,80px);line-height:0.95;letter-spacing:-0.03em">The Brands</h1>
        <p class="text-on-surface-variant max-w-2xl mt-4" style="font-size:16px;line-height:1.7">
          Explore the world's most prestigious automotive manufacturers. From the heritage of Maranello to the electric revolution in Austin, every brand carries a unique DNA of motion.
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        ${brands.map((b, i) => `
          <div class="group relative bg-surface-container-low border border-outline-variant p-8 corner-notch card-hover anim-up" 
               style="animation-delay: ${0.1 * (i % 8)}s"
               onclick="showBrandDetail('${b.name}')">
            <div class="absolute top-4 right-4 hud-label text-outline-variant opacity-30 group-hover:opacity-100 transition-opacity" style="font-size:9px">EST. ${b.founded}</div>
            <div class="h-32 flex items-center justify-center mb-8 grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110">
              <img src="${b.logo}" class="max-h-full max-w-full object-contain" alt="${b.name}"/>
            </div>
            <div class="text-center">
              <h3 class="text-on-surface font-bold uppercase tracking-widest mb-1">${b.name}</h3>
              <p class="hud-label text-outline-variant" style="font-size:10px">${b.origin}</p>
            </div>
            <div class="absolute -inset-px border border-primary opacity-0 group-hover:opacity-40 transition-opacity pointer-events-none"></div>
            <div class="absolute bottom-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
          </div>
        `).join('')}
      </div>
    </section>

    <section class="py-12 border-y border-outline-variant mt-16" style="background:rgba(18,20,20,0.5)">
      <div class="max-w-7xl mx-auto px-6 lg:px-16 flex flex-wrap justify-between items-center gap-8">
        ${[
          { label: 'Total Archives', val: '42', suffix: '+' },
          { label: 'Neural Accuracy', val: '98.8', suffix: '%' },
          { label: 'Daily Scans', val: '1.2', suffix: 'k' },
          { label: 'Sync Status', val: 'NOMINAL', suffix: '' },
        ].map(s => `
          <div class="flex flex-col">
            <span class="hud-label text-outline-variant text-[10px] mb-1 uppercase tracking-[0.2em]">${s.label}</span>
            <span class="text-on-surface font-bold text-2xl tracking-tight">${s.val}${s.suffix}</span>
          </div>
        `).join('')}
      </div>
    </section>
  </main>`;
}

function showBrandDetail(name) {
  const brandData = {
    'Ferrari': { 
      history: 'Founded by Enzo Ferrari in 1939, Ferrari remains the undisputed king of luxury performance. Every car is a symphony of Italian engineering, track-bred DNA, and emotional design. Their racing division, Scuderia Ferrari, is the oldest and most successful Formula One team in history.',
      net_worth: '$75B', 
      valuation: 'Premium', 
      revenue: '€5.9B (2023)',
      tech_focus: 'Aerodynamic Fluid Dynamics, Hybrid KERS Systems',
      cars: ['SF90 Stradale', '296 GTB', 'Purosangue', '812 Competizione'] 
    },
    'Porsche': { 
      history: 'Porsche is synonymous with precision. Since the 356 and the legendary 911, the Stuttgart-based manufacturer has defined the "daily-driver supercar." Their focus on mechanical reliability and driver engagement has made them the most profitable car company per unit in the world.',
      net_worth: '$105B', 
      valuation: 'High', 
      revenue: '€40.5B (2023)',
      tech_focus: 'PDK Dual-Clutch, Active Aero (PAA), 800V EV Architecture',
      cars: ['911 GT3 RS', 'Taycan Turbo S', '718 GT4 RS', 'Cayenne Turbo GT'] 
    },
    'Tesla': { 
      history: 'The disruptor that changed the automotive industry forever. Tesla redefined the car as a "computer on wheels," pioneering over-the-air updates, autonomous driving hardware, and a global Supercharger network that set the standard for the electric era.',
      net_worth: '$650B', 
      valuation: 'Hyper', 
      revenue: '$96.8B (2023)',
      tech_focus: 'Autopilot/FSD, Neural Net Vision, Mega-Casting',
      cars: ['Model S Plaid', 'Cyberbeast', 'Model 3 Performance', 'Model X Plaid'] 
    },
    'Nissan': { 
      history: 'From the Z-cars to the legendary Skyline GT-R "Godzilla," Nissan has provided the world with high-performance engineering at a technical level that often embarrasses cars three times its price. Their advanced ATTESA E-TS all-wheel-drive system remains a benchmark for traction technology.',
      net_worth: '$15B', 
      valuation: 'Strategic', 
      revenue: '¥12.7T (2023)',
      tech_focus: 'ATTESA E-TS AWD, VR-Series Twin Turbo, e-4ORCE',
      cars: ['GT-R R35', 'Skyline R34 GT-R', 'Z Proto', 'Ariya'] 
    },
    'Bugatti': { 
      history: 'Ettore Bugatti once said, "If comparable, it is no longer Bugatti." This philosophy lives on in the W16-powered masterpieces like the Veyron and Chiron. Bugatti exists at the intersection of haute couture and aerospace performance, holding multiple world speed records.',
      net_worth: 'Rimac/Porsche JV', 
      valuation: 'Ultimate', 
      revenue: '€1.2B (Estimated)',
      tech_focus: 'W16 Quad-Turbo, High-Temp Titanium 3D Printing',
      cars: ['Chiron Super Sport', 'Veyron 16.4', 'Mistral', 'Bolide'] 
    },
    'Lamborghini': {
      history: 'Founded by Ferruccio Lamborghini to challenge Ferrari, the brand became the symbol of unbridled aggression and flamboyant design. From the Miura to the Revuelto, Lamborghini represents the raw emotional power of the V12 engine.',
      net_worth: '$18B (Estimated)',
      valuation: 'High',
      revenue: '€2.6B (2023)',
      tech_focus: 'ALA (Active Aero), Forged Composites, Hybrid V12',
      cars: ['Revuelto', 'Huracán STO', 'Urus Performante', 'Aventador SVJ']
    },
    'McLaren': {
      history: 'Born on the track. McLaren Automotive utilizes technology directly from their Formula One team. Their carbon fiber MonoCell chassis and hydraulic suspension systems provide a level of feel and precision that few can match.',
      net_worth: '$3B',
      valuation: 'Niche',
      revenue: '£600M (Estimated)',
      tech_focus: 'Carbon Fiber MonoCell, Proactive Chassis Control',
      cars: ['750S', 'P1', 'Artura', 'Senna GTR']
    }
  };

  const b = brandData[name] || { 
    history: 'A leading innovator in the automotive space with a focus on performance, safety, and sustainable design for the next generation of mobility.', 
    net_worth: 'Private', 
    valuation: 'Strategic', 
    revenue: 'Data Syncing...',
    tech_focus: 'Proprietary Research',
    cars: ['Intelligence Syncing...'] 
  };

  document.getElementById('page-brands').innerHTML = `
    <main class="pt-20 min-h-screen relative overflow-hidden">
      <section class="max-w-5xl mx-auto px-6 py-16 anim-up">
        <button class="hud-label text-primary mb-8 flex items-center gap-2 hover:gap-4 transition-all" onclick="renderBrands()">← BACK TO ARCHIVES</button>
        
        <div class="flex flex-col lg:flex-row gap-12 items-start mb-16">
          <div class="w-full lg:w-2/5 p-10 bg-surface-container border border-outline-variant corner-notch relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none">
              <span class="material-symbols-outlined" style="font-size:120px">corporate_fare</span>
            </div>
            <h1 class="text-on-surface font-bold uppercase text-5xl mb-10 relative z-10">${name}</h1>
            
            <div class="space-y-8 relative z-10">
              <div>
                <div class="hud-label text-outline-variant text-[10px] mb-2 uppercase tracking-widest">Market Capitalization</div>
                <div class="text-primary font-bold text-3xl">${b.net_worth}</div>
              </div>
              <div>
                <div class="hud-label text-outline-variant text-[10px] mb-2 uppercase tracking-widest">Annual Revenue</div>
                <div class="text-on-surface font-bold text-2xl">${b.revenue}</div>
              </div>
              <div>
                <div class="hud-label text-outline-variant text-[10px] mb-2 uppercase tracking-widest">Primary Technology Focus</div>
                <div class="text-secondary font-semibold text-lg uppercase">${b.tech_focus}</div>
              </div>
            </div>
          </div>

          <div class="w-full lg:w-3/5">
            <div class="mb-12">
              <h2 class="hud-label text-primary mb-6 uppercase tracking-[0.4em] font-bold">Strategic Intelligence briefing</h2>
              <p class="text-on-surface-variant leading-relaxed text-xl mb-10 border-l-4 border-primary pl-8">${b.history}</p>
            </div>
            
            <h2 class="hud-label text-secondary mb-6 uppercase tracking-[0.4em] font-bold">Active Fleet Profiles</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              ${b.cars.map(c => `
                <div class="p-6 border border-outline-variant bg-surface-container-low hover:border-primary transition-all cursor-pointer group hover:bg-surface-container" 
                     onclick="navigate('browse', { query: '${name} ${c}', title: '${name} ${c}' })">
                  <div class="text-on-surface font-bold text-lg group-hover:text-primary transition-colors mb-2">${c}</div>
                  <div class="flex justify-between items-center">
                    <div class="hud-label text-[10px] text-outline-variant tracking-widest uppercase">Analysis Ready</div>
                    <span class="material-symbols-outlined text-outline-variant text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </section>
    </main>
  `;
}
