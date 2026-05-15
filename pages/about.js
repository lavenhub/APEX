// ===== ABOUT PAGE =====
function renderAbout() {
  document.getElementById('page-about').innerHTML = `
  <main class="pt-20 min-h-screen relative overflow-hidden">
    <div class="absolute inset-0 z-0">
      <div class="telemetry-grid h-full w-full opacity-10"></div>
    </div>

    <section class="relative z-10 max-w-5xl mx-auto px-6 lg:px-16 py-20">
      <div class="flex flex-col gap-6 mb-16 anim-up">
        <div class="flex items-center gap-3">
          <span class="w-12 h-px bg-secondary"></span>
          <span class="hud-label text-secondary uppercase tracking-widest">System Documentation</span>
        </div>
        <h1 class="text-on-surface font-bold uppercase" style="font-size:clamp(40px,8vw,70px);line-height:0.9;letter-spacing:-0.03em">Project APEX</h1>
        <p class="text-on-surface-variant max-w-3xl text-xl leading-relaxed">
          APEX is the world's most advanced automotive intelligence operating system. Built to bridge the gap between raw machine telemetry and human intuition.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div class="anim-left">
          <h2 class="hud-label text-primary mb-6 uppercase tracking-[0.2em]">Our Mission</h2>
          <p class="text-on-surface-variant leading-relaxed mb-6">
            We believe that every vehicle carries a unique digital fingerprint. Our mission is to decode this data, providing collectors, engineers, and enthusiasts with real-time insight into the world's finest machinery.
          </p>
          <div class="p-8 bg-surface-container border-l-4 border-primary corner-notch">
            <div class="text-on-surface font-bold italic mb-2">"Information is the only thing faster than a Ferrari at full throttle."</div>
            <div class="hud-label text-[10px] text-outline-variant">— APEX CORE PROTOCOL</div>
          </div>
        </div>

        <div class="anim-right">
          <h2 class="hud-label text-secondary mb-6 uppercase tracking-[0.2em]">Technical Stack</h2>
          <div class="space-y-6">
            ${[
              { title: 'Neural Core', desc: 'Powered by Gemini Vision for real-time visual vehicle identification.' },
              { title: 'Telemetry Bridge', desc: 'High-speed WebSockets providing sub-10ms data latency.' },
              { title: 'Vector Archive', desc: 'A global database of high-performance vehicle engineering dossiers.' },
              { title: 'Cinematic UI', desc: 'Built with a performance-first design system for ultra-smooth interaction.' }
            ].map(item => `
              <div class="flex gap-4">
                <div class="w-1 h-12 bg-outline-variant mt-1"></div>
                <div>
                  <div class="text-on-surface font-bold uppercase mb-1">${item.title}</div>
                  <div class="text-on-surface-variant text-sm">${item.desc}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Tech stats -->
      <div class="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 anim-up">
        ${[
          { label: 'Active Nodes', val: '1,242' },
          { label: 'Neural Accuracy', val: '99.9%' },
          { label: 'Scan Volume', val: '4.2M' },
          { label: 'System Uptime', val: '99.99%' }
        ].map(s => `
          <div class="text-center">
            <div class="hud-label text-outline-variant text-[9px] uppercase mb-1">${s.label}</div>
            <div class="text-on-surface font-bold text-2xl">${s.val}</div>
          </div>
        `).join('')}
      </div>
    </section>
  </main>`;
}
