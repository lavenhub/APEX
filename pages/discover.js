// ===== DISCOVER PAGE =====
let _discoverStream = null;

function renderDiscover() {
  document.getElementById('page-discover').innerHTML = `
  <main class="pt-20">

    <!-- Hero Section -->
    <section class="relative px-6 lg:px-16 mb-16 overflow-hidden" style="height:600px">
      <div class="absolute inset-0 z-0">
        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbbgmo4KD2qUukVsoxRfP33-wL_f0Bh5-OELA2_A7vtpovxdtV7u9lX4fzM-bOw7QP1gF4GQjvqVeQNLP4eamxADza99HWo2m6Tn7tADCTWnxsk7vlKtUJfKF9GlNWYGcRYu2Upe1-fCasadrJ2352Z02RG8qwa1OFd4MDmZXtMurmVzgkr6pZYSVHLwegGtO6guDqJL7NM7aqtvLqcaUkI_YkMBkUhRDHwX6bfGzUSNk7pcjex3P1wYpQe7KSrq4QHxTPDFgmcuo"
             class="w-full h-full object-cover opacity-35 mix-blend-luminosity" alt="Hero"/>
        <div class="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent"></div>
        <div class="absolute inset-0 spotlight"></div>
      </div>
      <div class="relative z-10 h-full flex flex-col justify-end pb-16 max-w-7xl mx-auto">
        <div class="flex items-center gap-3 mb-4 anim-up anim-delay-1">
          <span class="h-px w-12 bg-primary"></span>
          <span class="hud-label text-primary">Intelligence Hub</span>
        </div>
        <h1 class="text-on-surface font-bold uppercase mb-4 anim-left anim-delay-2" style="font-size:clamp(50px,9vw,90px);line-height:0.95;letter-spacing:-0.03em">DISCOVER THE<br>PINNACLE.</h1>
        <p class="text-on-surface-variant max-w-lg anim-up anim-delay-3" style="font-size:17px;line-height:1.7">
          Navigate through curated automotive hierarchies. From track-born monsters to the silent revolution of electrons.
        </p>
      </div>
    </section>

    <!-- Category Bento Grid -->
    <section class="px-6 lg:px-16 pb-20 max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        <!-- Hypercars - Large -->
        <div class="md:col-span-8 group relative overflow-hidden bg-surface-container border border-outline-variant notch-tl card-hover" style="aspect-ratio:16/9;cursor:pointer" onclick="navigate('browse', { category: 'hypercar', title: 'HYPERCARS' })">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMfsd6TGPGjmDTns0egynqpeQ0c-gc0A5EvI4pA8v0K1TblT0EkG1HiajDIG9DpXYgSv-zJNwSzJvrIsmFlE0UJ1wuLmzmVqk6VqOQxOgH3nFMXwxSovUd4yF3bs70-XKOtpLTtE9Zfst4GlbHAc5YRiYhLnNA0BfEmD4a40xIYcBR0WN8rMJ9ERObmOHIE0SrHhL3ztRpKXzbQss4HRyGsYEYYXXI3uj6ZF0Wujd3NT9Er6U5g1GHpKLT7oYQ0p1KqDUbpXIulBw"
             class="w-full h-full object-cover mix-blend-overlay opacity-60 bento-img absolute inset-0" alt="Hypercars"/>
          <div class="absolute inset-0 bg-gradient-to-t from-background/95 to-transparent"></div>
          <div class="absolute bottom-0 left-0 p-8">
            <span class="hud-label text-primary mb-3 block">01 / PERFORMANCE</span>
            <h3 class="text-on-surface font-bold uppercase mb-3" style="font-size:42px;line-height:1.05">HYPERCARS</h3>
            <p class="text-on-surface-variant max-w-md mb-5" style="font-size:14px;line-height:1.6">Pushing the boundaries of physics and exclusivity. Where engineering meets art.</p>
            <a class="inline-flex items-center gap-2 text-primary hud-label group-hover:gap-4 transition-all">Explore Models <span class="material-symbols-outlined text-sm">arrow_forward</span></a>
          </div>
        </div>

        <!-- Formula 1 -->
        <div class="md:col-span-4 group relative overflow-hidden bg-surface-container border border-outline-variant notch-tl card-hover" style="min-height:360px;cursor:pointer" onclick="navigate('browse', { category: 'f1', title: 'FORMULA 1' })">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfL8lWhdg0ZNur4Q4qOktriOzdKYI2DJIUpqxzDtSXVpKsDv4Vl3BZdMqiXQYWhzMN3jMVF7WnFzmgSwsnZZFJEt3zz8LDqtY22z91ezRjvLoedDXEHM_X9qwdNp05ddUQ2rIR80edn6TnKyjU1kpJxwzwDYLDSkW0LiY_yLOEUmRHo_O7mRTdJbZrhm4UfF1ImyjCv1EnPu_3llBdHAJQ25g5eUOP4u96ireFGte-bIWZKAH-VBVN3_LFzNGJULyvjEs8NZs9Oqw"
             class="w-full h-full object-cover mix-blend-overlay opacity-50 bento-img absolute inset-0" alt="F1"/>
          <div class="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent"></div>
          <div class="absolute bottom-0 left-0 p-8">
            <span class="hud-label text-secondary mb-3 block">02 / TELEMETRY</span>
            <h3 class="text-on-surface font-bold uppercase mb-3" style="font-size:26px">FORMULA 1</h3>
            <a class="inline-flex items-center gap-2 text-primary hud-label">Race Specs <span class="material-symbols-outlined text-sm">analytics</span></a>
          </div>
        </div>

        <!-- JDM -->
        <div class="md:col-span-4 group relative overflow-hidden bg-surface-container border border-outline-variant notch-tl card-hover" style="aspect-ratio:1;cursor:pointer" onclick="navigate('browse', { category: 'jdm', title: 'JDM ICONS' })">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuARjfDN3gjX1CBvO6v0xFHJl647YwBGiBG9Z73Lkqd5bh-sM2pNnGrc4YWobcOXNdijxnptvtJustYG1XcD6BA8IVRGKuDIceMofh0mG7RaCZyY6iOU6uOZ00QFiu9LJr3l6IUibEDdtsDamJhB6tiYKAdzVkXOJUM_L9pd_m-8C5GjjOGwUPHX_KH9x-k4ZbwtT_bkeKWwAxuqh_yhhcKv8KupBzfgGCnmdInaDLNSbpffwbe9nCDgPNaQ3sZew0O-PKZ8f02eHUU"
             class="w-full h-full object-cover mix-blend-overlay opacity-60 bento-img absolute inset-0" alt="JDM"/>
          <div class="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
          <div class="absolute bottom-0 left-0 p-8">
            <span class="hud-label text-on-surface-variant mb-3 block">03 / CULTURE</span>
            <h3 class="text-on-surface font-bold uppercase mb-3" style="font-size:26px">JDM ICONS</h3>
            <a class="inline-flex items-center gap-2 text-primary hud-label">Tuner Logs <span class="material-symbols-outlined text-sm">settings_input_component</span></a>
          </div>
        </div>

        <!-- EVs -->
        <div class="md:col-span-4 group relative overflow-hidden bg-surface-container border border-outline-variant notch-tl card-hover" style="aspect-ratio:1;cursor:pointer" onclick="navigate('browse', { category: 'electric', title: 'ELECTRIC EVOLUTION' })">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHoh8pgp9lEccN5iEvqtEHJJtC-87HiDbK7F-n1TTWm4ivgyWFmxHzzt8J1UB7fzBksbQ0ZfU3uXGbdvkv3OddKsVJR3Ib67fMPtv9otF7TdYBjJ1Cdj2KMKfs5boumb0hwSS9RxBcSeduKVcxjFeOoKol-rSvSI3v5iGRgwrJMNNxWZgHifYo8CGdO4K2Z9AMXXxzX0B467_RjCqZUsne_q6s5qrjsAfggMwzXDE-4RsHHq0oXXFvLWmEcEiv_OtXOr2bhMf54Zs"
             class="w-full h-full object-cover mix-blend-screen opacity-40 bento-img absolute inset-0" alt="EV"/>
          <div class="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
          <div class="absolute bottom-0 left-0 p-8">
            <span class="hud-label text-primary mb-3 block">04 / KINETIC</span>
            <h3 class="text-on-surface font-bold uppercase mb-3" style="font-size:26px">ELECTRIC EVOLUTION</h3>
            <a class="inline-flex items-center gap-2 text-primary hud-label">Voltage Stats <span class="material-symbols-outlined text-sm">bolt</span></a>
          </div>
        </div>

        <!-- Classics -->
        <div class="md:col-span-4 group relative overflow-hidden bg-surface-container border border-outline-variant notch-tl card-hover" style="aspect-ratio:1;cursor:pointer" onclick="navigate('browse', { category: 'classic', title: 'CLASSIC PRECISION' })">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRZWJTXitQWj8Y7oQ-YeuDGWFX3Ue14N59hFpvflSiSwlyInxk54geoYoTK_GclRc_j61V6WR-DGgmhXAx3xC5uWwmZF6blyO8rGCWD5NtwXK5UYjf34OxJy_3Ca52bfYe8133UMwp7X9ZNtGrQRv1ktMGVSEhxC4n1PRANUTQWRuV1v58upuiHT9yvCzCw4j_DncaQ7_bdah6HOlabYyEsMkncq58ESDVz30FREFVVerVmV_9Q5dTMp6S-RYTkOg9L9Y7QHn696U"
             class="w-full h-full object-cover mix-blend-overlay opacity-50 bento-img absolute inset-0" alt="Classic"/>
          <div class="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
          <div class="absolute bottom-0 left-0 p-8">
            <span class="hud-label text-secondary mb-3 block">05 / HERITAGE</span>
            <h3 class="text-on-surface font-bold uppercase mb-3" style="font-size:26px">CLASSIC PRECISION</h3>
            <a class="inline-flex items-center gap-2 text-primary hud-label">Archives <span class="material-symbols-outlined text-sm">history_edu</span></a>
          </div>
        </div>

      </div>
    </section>

    <!-- Live Fleet Telemetry -->
    <section class="px-6 lg:px-16 py-20 border-t border-outline-variant" style="background:#0c0f0f">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <h2 class="text-on-surface font-bold uppercase" style="font-size:clamp(28px,4vw,46px);letter-spacing:-0.02em">LIVE FEED: GLOBAL FLEET</h2>
            <p class="hud-label text-on-surface-variant flex items-center gap-2 mt-2">
              <span class="live-dot"></span> SYSTEM STATUS: REAL-TIME DATA ACTIVE
            </p>
          </div>
          <div class="flex gap-3">
            <button class="w-12 h-12 flex items-center justify-center border border-outline-variant hover:border-primary transition-colors">
              <span class="material-symbols-outlined text-on-surface">chevron_left</span>
            </button>
            <button class="w-12 h-12 flex items-center justify-center border border-outline-variant hover:border-primary transition-colors">
              <span class="material-symbols-outlined text-on-surface">chevron_right</span>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="telemetryWidgets">
          ${[
            {label:'Aero-Load / Front', id:'tw-aero',  unit:'kgf', barId:'twb-aero',  icon:'speed',      color:'primary'},
            {label:'Torque / Vector',   id:'tw-torq',  unit:'Nm',  barId:'twb-torq',  icon:'hub',        color:'secondary'},
            {label:'Battery / Thermal', id:'tw-therm', unit:'°C',  barId:'twb-therm', icon:'thermostat', color:'primary'},
            {label:'Lateral / G-Force', id:'tw-gforce',unit:'G',   barId:'twb-gforce',icon:'navigation', color:'secondary'},
          ].map(d => `
            <div class="p-6 border border-outline-variant card-hover" style="background:#1a1c1c">
              <div class="flex justify-between items-start mb-6">
                <span class="hud-label text-on-surface-variant" style="font-size:10px">${d.label}</span>
                <span class="material-symbols-outlined text-${d.color}" style="font-size:16px">${d.icon}</span>
              </div>
              <div class="text-on-surface font-bold mb-3" style="font-size:34px">
                <span id="${d.id}">—</span> <span class="hud-label text-on-surface-variant font-normal">${d.unit}</span>
              </div>
              <div class="w-full h-px bg-outline-variant overflow-hidden">
                <div id="${d.barId}" class="h-full bg-${d.color}" style="width:0%;transition:width 0.8s ease"></div>
              </div>
            </div>`).join('')}
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="px-6 lg:px-16 py-12 border-t border-outline-variant" style="background:#121414">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <span class="text-on-surface font-bold text-2xl">APEX</span>
        <div class="flex flex-wrap gap-8">
          ${['Telemetry Protocol','Privacy','Security','API Resources'].map(l =>
            `<a href="#" class="hud-label text-on-surface-variant hover:text-secondary transition-colors">${l}</a>`).join('')}
        </div>
        <span class="hud-label text-secondary">© 2024 APEX INTELLIGENCE. SYSTEM STATUS: NOMINAL.</span>
      </div>
    </footer>
  </main>`;

  // Start live telemetry stream for this page
  setTimeout(startDiscoverTelemetry, 200);
}

function startDiscoverTelemetry() {
  // Stop old stream if navigating back
  if (_discoverStream) { _discoverStream.stop(); _discoverStream = null; }

  _discoverStream = new TelemetryStream(1, (frame) => {
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    const setBar = (id, pct) => {
      const el = document.getElementById(id);
      if (el) el.style.width = Math.min(100, Math.max(0, pct)) + '%';
    };

    const aero  = frame.aero_load_kgf ?? 842;
    const torq  = frame.torque_nm     ?? 1240;
    const therm = frame.battery_thermal_c ?? 42.8;
    const g     = Math.abs(frame.g_lateral ?? 1.84);

    set('tw-aero',   aero.toFixed(0));
    set('tw-torq',   torq.toFixed(0));
    set('tw-therm',  therm.toFixed(1));
    set('tw-gforce', g.toFixed(2));

    setBar('twb-aero',   aero / 10);
    setBar('twb-torq',   torq / 12.4);
    setBar('twb-therm',  therm / 1.2);
    setBar('twb-gforce', g / 0.025);
  });

  _discoverStream.start();
}

