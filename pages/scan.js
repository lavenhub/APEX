// ===== SCAN PAGE =====
function renderScan() {
  document.getElementById('page-scan').innerHTML = `
  <main class="pt-20 min-h-screen relative telemetry-grid overflow-hidden">
    <!-- Ambient blobs -->
    <div class="absolute top-32 right-16 w-80 h-80 rounded-full blur-[120px] pointer-events-none" style="background:rgba(255,180,171,0.05)"></div>
    <div class="absolute bottom-32 left-16 w-96 h-96 rounded-full blur-[140px] pointer-events-none" style="background:rgba(255,229,177,0.04)"></div>

    <!-- Frame lines -->
    <div class="absolute inset-0 pointer-events-none opacity-20">
      <div class="absolute top-0 left-1/4 h-full w-px bg-outline-variant"></div>
      <div class="absolute top-0 right-1/4 h-full w-px bg-outline-variant"></div>
      <div class="absolute top-1/3 left-0 w-full h-px bg-outline-variant"></div>
      <div class="absolute bottom-1/3 left-0 w-full h-px bg-outline-variant"></div>
    </div>

    <section class="relative z-10 max-w-6xl mx-auto px-6 lg:px-16 py-16 flex flex-col items-center gap-12">
      <!-- Title -->
      <div class="text-center anim-up anim-delay-1">
        <div class="flex items-center justify-center gap-3 mb-4">
          <span class="live-dot"></span>
          <span class="hud-label text-primary">System Ready: Scanning Chamber Active</span>
        </div>
        <h1 class="text-on-surface font-bold uppercase" style="font-size:clamp(48px,8vw,90px);line-height:1.05;letter-spacing:-0.03em">AI Vehicle Scan</h1>
        <p class="text-on-surface-variant mt-4" style="font-size:15px">Upload a vehicle image. The AI engine will extract all telemetric signatures.</p>
      </div>

      <!-- Main Scanner Interface -->
      <div class="w-full anim-up anim-delay-2">
        <div class="relative w-full border border-outline-variant corner-notch overflow-hidden transition-all duration-500 hover:border-primary"
             style="background:#0c0f0f;aspect-ratio:16/9;max-height:500px"
             id="dropZone"
             ondragover="event.preventDefault();this.classList.add('drag-over')"
             ondragleave="this.classList.remove('drag-over')"
             ondrop="handleDrop(event)">

          <!-- Radar sweep -->
          <div class="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
            <div class="radar-sweep absolute" style="top:50%;left:50%;width:200%;height:200%;transform-origin:0 0;background:conic-gradient(from 0deg, rgba(255,180,171,0.8) 0deg, transparent 60deg)"></div>
          </div>

          <!-- HUD overlays: top-left -->
          <div class="absolute top-4 left-4 flex flex-col gap-2 z-20">
            <div class="flex items-center gap-2 hud-label text-on-surface-variant border-l-4 border-primary px-2 py-1" style="background:rgba(18,20,20,0.8);font-size:10px">
              <span class="material-symbols-outlined" style="font-size:12px">sensors</span> LATENCY: 14MS
            </div>
            <div class="flex items-center gap-2 hud-label text-on-surface-variant border-l-4 border-secondary px-2 py-1" style="background:rgba(18,20,20,0.8);font-size:10px">
              <span class="material-symbols-outlined" style="font-size:12px">memory</span> NEURAL CORE: 98%
            </div>
          </div>

          <!-- HUD overlays: top-right -->
          <div class="absolute top-4 right-4 flex flex-col items-end gap-2 z-20">
            <div class="hud-label text-secondary px-2 py-1" style="background:rgba(18,20,20,0.8);font-size:10px">Mode: Deep Analysis</div>
            <div class="hud-label text-on-surface-variant" style="font-size:10px">45.2394° N, 74.1240° W</div>
          </div>

          <!-- Drop zone center -->
          <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-8 cursor-pointer" id="dropContent" onclick="document.getElementById('fileInput').click()">
            <input type="file" id="fileInput" class="hidden" accept="image/*" onchange="handleFileSelect(event)"/>
            <div class="relative mb-6">
              <div class="absolute inset-0 blur-2xl rounded-full" style="background:rgba(255,180,171,0.15)"></div>
              <span class="material-symbols-outlined text-primary relative" style="font-size:80px">upload_file</span>
            </div>
            <h3 class="text-on-surface font-bold uppercase mb-3" style="font-size:28px;letter-spacing:0.1em">Drop Image to Scan</h3>
            <p class="hud-label text-on-surface-variant max-w-sm">Supported: RAW, JPEG, PNG, TIFF — Max 128MB — AI Engine v4.0 Active</p>
            <button class="btn-primary mt-8">Browse Filesystem</button>
          </div>

          <!-- Scan result overlay (hidden by default) -->
          <div class="absolute inset-0 hidden" id="scanResult">
            <img id="scannedImage" class="w-full h-full object-cover opacity-70"/>
            <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            
            <!-- NEW: Launch Car Button Overlay -->
            <div id="launchButtonOverlay" class="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm hidden z-30 anim-fade-in">
              <button class="group relative px-12 py-5 bg-primary text-on-primary font-bold uppercase tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95 border-2 border-white/20 btn-launch-glow" 
                      onclick="launchCarAnalysis()">
                <div class="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <div class="absolute -inset-1 border border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span class="relative flex items-center gap-3">
                  <span class="material-symbols-outlined">rocket_launch</span>
                  Launch Vehicle Analysis
                </span>
              </button>
            </div>

            <!-- NEW: Loading Overlay -->
            <div id="loadingOverlay" class="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md hidden z-40 anim-fade-in">
              <div class="relative w-28 h-28 mb-8">
                <div class="absolute inset-0 border-[6px] border-primary/10 rounded-full"></div>
                <div class="absolute inset-0 border-[6px] border-primary rounded-full border-t-transparent animate-spin" style="animation-duration: 0.8s"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="w-16 h-16 border-2 border-secondary/30 rounded-full animate-ping"></div>
                  <span class="absolute material-symbols-outlined text-primary animate-pulse" style="font-size:36px">memory</span>
                </div>
              </div>
              <div class="hud-label text-primary animate-pulse tracking-[0.4em] text-lg font-bold">ENGAGING NEURAL CORE</div>
              <div class="text-[11px] text-on-surface-variant mt-3 font-mono uppercase tracking-[0.2em] opacity-60" id="loadingStatusText">DECODING TELEMETRY SIGNATURES...</div>
              
              <!-- Progress bar in loading -->
              <div class="w-48 h-1 bg-outline-variant mt-6 rounded-full overflow-hidden">
                <div id="loadingBarInner" class="h-full bg-primary" style="width:0%; transition: width 0.3s ease-out"></div>
              </div>
            </div>

            <div class="absolute inset-0 pointer-events-none">
              <!-- scanning animation -->
              <div class="scan-beam opacity-50" id="activeScanBeam"></div>
            </div>
            <!-- Crosshair -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32" id="crosshair">
              <div class="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary"></div>
              <div class="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary"></div>
              <div class="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary"></div>
              <div class="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary"></div>
            </div>
          </div>

          <!-- Bottom telemetry bar -->
          <div class="absolute bottom-0 left-0 w-full h-10 border-t border-outline-variant flex items-center justify-between px-4" style="background:rgba(18,20,20,0.85)">
            <div class="flex gap-4 items-center">
              <div class="w-20 h-1 bg-outline-variant rounded-full overflow-hidden">
                <div class="scan-progress h-full bg-primary rounded-full"></div>
              </div>
              <div class="w-28 h-1 bg-outline-variant rounded-full overflow-hidden">
                <div class="h-full bg-secondary rounded-full" style="width:65%"></div>
              </div>
            </div>
            <div class="hud-label text-on-surface-variant" style="font-size:9px">AI-X VEHICLE FINGERPRINTING — SECURE LINK ACTIVE</div>
          </div>
        </div>
      </div>

      <!-- Metrics Bento -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">

        <!-- Confidence -->
        <div class="bg-surface-container-high border border-outline-variant p-6 corner-notch relative overflow-hidden card-hover anim-up anim-delay-3">
          <div class="flex justify-between items-start mb-6">
            <div class="hud-label text-on-surface-variant">Detection Confidence</div>
            <span class="material-symbols-outlined text-primary">radar</span>
          </div>
          <div class="text-primary font-bold mb-3" style="font-size:42px" id="confidenceVal">--.--%</div>
          <div class="w-full h-1 bg-outline-variant mb-2">
            <div class="h-full bg-primary transition-all duration-1000" id="confidenceBar" style="width:0%"></div>
          </div>
          <p class="hud-label text-on-surface-variant" style="font-size:10px" id="confidenceStatus">Waiting for input stream...</p>
        </div>

        <!-- Rotational Analysis -->
        <div class="bg-surface-container-high border border-outline-variant p-6 flex flex-col items-center justify-center relative overflow-hidden card-hover anim-up anim-delay-4">
          <div class="absolute top-3 left-3 hud-label text-on-surface-variant" style="font-size:9px">ROTATIONAL ANALYSIS</div>
          <div class="relative w-24 h-24 border-4 border-dashed border-outline-variant rounded-full flex items-center justify-center" style="animation:radarSpin 10s linear infinite">
            <div class="w-14 h-14 border-2 border-primary rounded-full"></div>
          </div>
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="material-symbols-outlined text-secondary" style="font-size:22px">filter_center_focus</span>
          </div>
        </div>

        <!-- Telemetry Feed -->
        <div class="bg-surface-container-high border border-outline-variant p-6 corner-notch overflow-hidden card-hover anim-up anim-delay-5">
          <div class="hud-label text-on-surface-variant mb-4">Telemetry Feed</div>
          <div class="space-y-2" id="telemetryLog" style="font-size:10px;font-family:'Space Grotesk',monospace">
            <div class="text-on-surface-variant opacity-40">[14:02:11] INITIALIZING SCANNER...</div>
            <div class="text-on-surface-variant opacity-60">[14:02:12] NEURAL MAPPING READY.</div>
            <div class="text-primary">[14:02:14] AWAITING VISUAL DATA.</div>
            <div class="text-secondary animate-pulse">_ <span class="cursor">|</span></div>
          </div>
        </div>
      </div>

      <!-- Analysis Result (shown after scan) -->
      <div class="w-full hidden" id="analysisResult">
        <div class="border border-primary relative" style="background:#0c0f0f">
          <div class="notch-tl"></div>

          <!-- Header -->
          <div class="px-8 pt-8 pb-4 border-b border-outline-variant">
            <div class="hud-label text-primary mb-1">// SCAN COMPLETE — VEHICLE IDENTIFIED</div>
            <p class="text-on-surface-variant text-sm italic" id="scanDescription" style="font-size:13px;line-height:1.6"></p>
          </div>

          <!-- Key stats row -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 px-8 py-6 border-b border-outline-variant">
            ${[
              {label:'Make / Model', id:'makeModel'},
              {label:'Engine Output', id:'enginePower'},
              {label:'Drivetrain', id:'drivetrain'},
              {label:'AI Confidence', id:'aiConf'},
            ].map(s => `
              <div>
                <div class="hud-label text-on-surface-variant mb-2">${s.label}</div>
                <div class="text-on-surface font-semibold text-lg" id="${s.id}">—</div>
              </div>`).join('')}
          </div>

          <!-- DNA analysis bars -->
          <div class="px-8 py-6 border-b border-outline-variant">
            <div class="hud-label text-on-surface-variant mb-5">AI DNA ANALYSIS</div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              ${[
                {label:'Track Aggression', id:'dna-track', color:'primary'},
                {label:'Aero Efficiency',  id:'dna-aero',  color:'primary'},
                {label:'Technical Complexity', id:'dna-tech', color:'secondary'},
                {label:'Driver Accessibility', id:'dna-access', color:'secondary'},
                {label:'Launch Response', id:'dna-launch', color:'primary'},
              ].map(b => `
                <div>
                  <div class="flex justify-between hud-label text-on-surface mb-2">
                    <span>${b.label}</span>
                  </div>
                  <div class="h-1 bg-outline-variant">
                    <div id="${b.id}" class="h-full bg-${b.color}" style="width:0%;transition:width 1.2s cubic-bezier(0.22,1,0.36,1)"></div>
                  </div>
                </div>`).join('')}
            </div>
          </div>

          <!-- Fun fact -->
          <div class="px-8 py-5 hidden" id="funFactContainer">
            <div class="flex gap-3 items-start">
              <span class="material-symbols-outlined text-secondary" style="font-size:18px;margin-top:2px">lightbulb</span>
              <p class="hud-label text-on-surface-variant" id="funFact" style="font-size:11px;line-height:1.7"></p>
            </div>
          </div>

          <!-- Actions -->
          <div class="px-8 py-6 flex flex-wrap gap-4">
            <button class="btn-primary" onclick="navigate('dossier', { scanData: _lastScanResult, imageUrl: (_lastScanResult?.extra_images && _lastScanResult.extra_images.length > 0) ? _lastScanResult.extra_images[0] : _lastScanImageUrl })">View Full Dossier →</button>
            <button id="saveGarageBtn" class="btn-ghost" onclick="saveCurrentScan()">SAVE TO COLLECTION</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="px-6 lg:px-16 py-12 border-t border-outline-variant" style="background:#121414">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="text-on-surface font-bold text-2xl">APEX</div>
        <div class="flex flex-wrap gap-8">
          ${['Telemetry Protocol','Privacy','Security','API Resources'].map(l =>
            `<a href="#" class="hud-label text-on-surface-variant hover:text-secondary transition-colors">${l}</a>`).join('')}
        </div>
        <div class="hud-label text-secondary">© 2024 APEX INTELLIGENCE. SYSTEM STATUS: NOMINAL.</div>
      </div>
    </footer>
  </main>`;

  // Setup drop zone + file handling
  setupScanInteractions();
}

function setupScanInteractions() {
  // Will be called after DOM render
  setTimeout(() => {
    const dropZone = document.getElementById('dropZone');
    if (!dropZone) return;
    dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.style.borderColor = 'rgba(255,180,171,0.6)'; });
    dropZone.addEventListener('dragleave', () => { dropZone.style.borderColor = ''; });
    dropZone.addEventListener('drop', handleDrop);
  }, 100);
}

function handleDrop(e) {
  e.preventDefault();
  const file = e.dataTransfer?.files[0] || null;
  if (file && file.type.startsWith('image/')) processFile(file);
}

function handleFileSelect(e) {
  const file = e.target.files[0];
  if (file) processFile(file);
}

// Store last scan result for garage save
let _lastScanResult = null;
let _lastScanFile = null;
let _lastScanImageUrl = null;

function processFile(file) {
  _lastScanFile = file;
  const reader = new FileReader();
  reader.onload = async (e) => {
    // Show image preview immediately
    _lastScanImageUrl = e.target.result;
    document.getElementById('scannedImage').src = _lastScanImageUrl;
    document.getElementById('dropContent').classList.add('hidden');
    document.getElementById('scanResult').classList.remove('hidden');
    
    // Show the Launch Car button overlay
    document.getElementById('launchButtonOverlay').classList.remove('hidden');

    // Reset confidence
    const confVal = document.getElementById('confidenceVal');
    const confBar = document.getElementById('confidenceBar');
    if (confVal) confVal.textContent = '—.—%';
    if (confBar) confBar.style.width = '0%';
    document.getElementById('confidenceStatus').textContent = 'Waiting for system launch...';

    // Log messages
    const log = document.getElementById('telemetryLog');
    const ts = () => new Date().toLocaleTimeString('en-GB', {hour:'2-digit',minute:'2-digit',second:'2-digit'});
    const addLog = (cls, msg) => {
      const div = document.createElement('div');
      div.className = `${cls} anim-up`; div.style.fontSize = '10px'; div.style.fontFamily = 'monospace';
      div.textContent = `[${ts()}] ${msg}`;
      log.appendChild(div);
      log.scrollTop = log.scrollHeight;
    };

    addLog('text-primary', 'IMAGE RECEIVED. SYSTEM READY FOR LAUNCH.');
  };
  reader.readAsDataURL(file);
}

/**
 * NEW: Launch Car Analysis
 * Triggered when user clicks 'Launch Vehicle Analysis' button.
 */
async function launchCarAnalysis() {
  if (!_lastScanFile) return;

  const launchOverlay = document.getElementById('launchButtonOverlay');
  const loadingOverlay = document.getElementById('loadingOverlay');
  const loadingBar = document.getElementById('loadingBarInner');
  const loadingText = document.getElementById('loadingStatusText');
  
  launchOverlay.classList.add('hidden');
  loadingOverlay.classList.remove('hidden');

  // Log messages helper
  const log = document.getElementById('telemetryLog');
  const ts = () => new Date().toLocaleTimeString('en-GB', {hour:'2-digit',minute:'2-digit',second:'2-digit'});
  const addLog = (cls, msg) => {
    const div = document.createElement('div');
    div.className = `${cls} anim-up`; div.style.fontSize = '10px'; div.style.fontFamily = 'monospace';
    div.textContent = `[${ts()}] ${msg}`;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
  };

  addLog('text-secondary', 'LAUNCHING NEURAL CORE...');
  
  // Fake progress animation for loading bar
  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 90) progress = 90;
    if (loadingBar) loadingBar.style.width = progress + '%';
    
    // Update loading text status
    const statuses = [
      'DECODING TELEMETRY...', 
      'IDENTIFYING CHASSIS...', 
      'CALCULATING AERO-LOAD...', 
      'MAPPING ENGINE DNA...',
      'FINALIZING SCAN...'
    ];
    if (loadingText) loadingText.textContent = statuses[Math.floor(progress / 20)] || 'PROCESSING...';
  }, 400);

  try {
    // Call real API
    const result = await ApexAPI.scanImage(_lastScanFile);
    _lastScanResult = result;

    clearInterval(progressInterval);
    if (loadingBar) loadingBar.style.width = '100%';
    
    // Short delay to show 100%
    await new Promise(r => setTimeout(r, 600));

    // Hide loading
    loadingOverlay.classList.add('hidden');

    const confVal = document.getElementById('confidenceVal');
    const confBar = document.getElementById('confidenceBar');
    const finalConf = result.confidence || 94.7;

    // Animate confidence to final
    let curr = 0;
    const finalInterval = setInterval(() => {
      curr = Math.min(curr + 2.5, finalConf);
      if (confVal) confVal.textContent = curr.toFixed(1) + '%';
      if (confBar) confBar.style.width = curr + '%';
      if (curr >= finalConf) clearInterval(finalInterval);
    }, 20);

    addLog('text-secondary', result.ai_powered ? 'GEMINI VISION MATCH FOUND.' : 'MATCH FOUND (MOCK MODE).');
    addLog('text-primary', `VEHICLE: ${result.make} ${result.model} ${result.year || ''}`);

    document.getElementById('confidenceStatus').textContent =
      result.ai_powered ? 'Gemini Vision AI — fingerprint confirmed.' : 'Neural match confirmed (mock mode).';

    showResults(result);

  } catch (err) {
    clearInterval(progressInterval);
    loadingOverlay.classList.add('hidden');
    addLog('text-primary', `ERROR: ${err.message}`);
    document.getElementById('confidenceStatus').textContent = 'Scan failed — check backend.';
  }
}

function showResults(result = null) {
  const r = result || { make:'Nissan', model:'GT-R R35', hp:565, drivetrain:'ATTESA E-TS AWD', confidence:94.7 };
  document.getElementById('analysisResult')?.classList.remove('hidden');
  document.getElementById('makeModel').textContent    = `${r.make} ${r.model}`;
  document.getElementById('enginePower').textContent  = `${r.hp || '—'} BHP`;
  document.getElementById('drivetrain').textContent   = r.drivetrain || '—';
  document.getElementById('aiConf').textContent       = `${(r.confidence || 0).toFixed(1)}%`;

  // Show fun fact if available
  const factEl = document.getElementById('funFact');
  if (factEl && r.fun_fact) {
    factEl.textContent = r.fun_fact;
    factEl.parentElement?.classList.remove('hidden');
  }

  // Show description
  const descEl = document.getElementById('scanDescription');
  if (descEl && r.description) descEl.textContent = r.description;

  // Show DNA bars
  if (r.track_aggression) updateDNABars(r);

  // NEW: Scroll to results
  setTimeout(() => {
    document.getElementById('analysisResult')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function updateDNABars(r) {
  const bars = {
    'dna-track': r.track_aggression,
    'dna-aero':  r.aero_efficiency,
    'dna-tech':  r.technical_complexity,
    'dna-access':r.driver_accessibility,
    'dna-launch':r.launch_response,
  };
  Object.entries(bars).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) { el.style.transition = 'width 1.2s cubic-bezier(0.22,1,0.36,1)'; el.style.width = val + '%'; }
  });
}

async function saveCurrentScan() {
  if (!_lastScanResult) return;
  const btn = document.getElementById('saveGarageBtn');
  if (btn) btn.textContent = 'SAVING...';

  // Read image as base64
  let imgB64 = null;
  if (_lastScanFile) {
    imgB64 = await new Promise(res => {
      const fr = new FileReader();
      fr.onload = e => res(e.target.result.split(',')[1]);
      fr.readAsDataURL(_lastScanFile);
    });
  }

  const res = await ApexAPI.saveToGarage({
    make: _lastScanResult.make,
    model: _lastScanResult.model,
    year: _lastScanResult.year,
    confidence: _lastScanResult.confidence,
    raw_ai_response: JSON.stringify(_lastScanResult),
    scan_image_b64: imgB64,
    notes: '',
  });

  if (btn) btn.textContent = res.success ? '✓ SAVED TO COLLECTION' : 'SAVE FAILED';
  setTimeout(() => { if (btn) btn.textContent = 'SAVE TO COLLECTION'; }, 3000);
}
