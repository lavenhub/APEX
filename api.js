/**
 * APEX Automotive Intelligence OS — API Service Layer
 * All frontend ↔ backend communication goes through here.
 */

const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
  ? 'http://localhost:8000' 
  : 'https://apex-j36n.onrender.com'; 

const WS_BASE = API_BASE.replace('http', 'ws');

// ─── Connection state ──────────────────────────────────────────────────────────
window.APEX = window.APEX || {};
window.APEX.backendOnline = false;

// Check backend health on load
async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/api/health`, { signal: AbortSignal.timeout(2000) });
    if (res.ok) {
      window.APEX.backendOnline = true;
      showBackendStatus(true);
      return true;
    }
  } catch (_) {}
  window.APEX.backendOnline = false;
  showBackendStatus(false);
  return false;
}

function showBackendStatus(online) {
  // Inject a tiny status badge into the nav
  let badge = document.getElementById('backendBadge');
  if (!badge) {
    badge = document.createElement('div');
    badge.id = 'backendBadge';
    badge.style.cssText = `
      position:fixed; bottom:16px; left:16px; z-index:9999;
      display:flex; align-items:center; gap:8px;
      background:rgba(18,20,20,0.92); border:1px solid #5e3f3b;
      padding:6px 12px; font-family:'Space Grotesk',monospace;
      font-size:10px; letter-spacing:0.15em; text-transform:uppercase;
    `;
    document.body.appendChild(badge);
  }
  badge.innerHTML = online
    ? `<span style="width:6px;height:6px;border-radius:50%;background:#4ade80;animation:pulse 1.5s infinite"></span>
       <span style="color:#e2e2e2">Backend: Online</span>`
    : `<span style="width:6px;height:6px;border-radius:50%;background:#ffb4ab;animation:pulse 1.5s infinite"></span>
       <span style="color:#e8bcb7">Backend: Offline — Mock Mode</span>`;
}


// ─── VEHICLES ──────────────────────────────────────────────────────────────────
const ApexAPI = {

  async getVehicles(category = null, limit = 20) {
    if (!window.APEX.backendOnline) {
      // Mock data for offline mode
      const mockVehicles = [
        { id: 1, make: 'Nissan', model: 'GT-R R35', year: 2024, category: 'jdm', hp: 565, accel_0_100: 2.7, engine: 'VR38DETT V6', image_url: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800' },
        { id: 2, make: 'Porsche', model: '911 GT3 RS', year: 2023, category: 'hypercar', hp: 525, accel_0_100: 3.2, engine: '4.0L NA Flat-6', image_url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800' },
        { id: 3, make: 'Ferrari', model: 'SF-23', year: 2023, category: 'f1', hp: 1000, accel_0_100: 1.8, engine: '1.6L Hybrid V6', image_url: 'https://images.unsplash.com/photo-1541348263662-e068662d82af?w=800' },
        { id: 4, make: 'Tesla', model: 'Model S Plaid', year: 2024, category: 'electric', hp: 1020, accel_0_100: 1.99, engine: 'Tri-Motor', image_url: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800' },
        { id: 5, make: 'Ferrari', model: '250 GTO', year: 1962, category: 'classic', hp: 296, accel_0_100: 6.1, engine: 'V12', image_url: 'https://images.unsplash.com/photo-1541348263662-e068662d82af?w=800' },
      ];
      const filtered = category ? mockVehicles.filter(v => v.category === category) : mockVehicles;
      return { vehicles: filtered, total: filtered.length };
    }
    const params = new URLSearchParams({ limit });
    if (category) params.set('category', category);
    const res = await fetch(`${API_BASE}/api/vehicles?${params}`);
    return res.json();
  },

  async getVehicle(id) {
    if (!window.APEX.backendOnline) return null;
    const res = await fetch(`${API_BASE}/api/vehicles/${id}`);
    if (!res.ok) return null;
    return res.json();
  },

  async searchVehicles(query) {
    if (!window.APEX.backendOnline) {
      const mockResults = [
        { id: 1, make: 'Nissan', model: 'GT-R R35', year: 2024, category: 'jdm', hp: 565, accel_0_100: 2.7, engine: 'VR38DETT V6', image_url: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800' },
        { id: 2, make: 'Porsche', model: '911 GT3 RS', year: 2023, category: 'hypercar', hp: 525, accel_0_100: 3.2, engine: '4.0L NA Flat-6', image_url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800' },
        { id: 4, make: 'Tesla', model: 'Model S Plaid', year: 2024, category: 'electric', hp: 1020, accel_0_100: 1.99, engine: 'Tri-Motor', image_url: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800' },
      ];
      const q = query.toLowerCase();
      const filtered = mockResults.filter(v => v.make.toLowerCase().includes(q) || v.model.toLowerCase().includes(q));
      return { results: filtered };
    }
    const res = await fetch(`${API_BASE}/api/search?q=${encodeURIComponent(query)}`);
    return res.json();
  },

  async getStats() {
    try {
      const res = await fetch(`${API_BASE}/api/stats`, { signal: AbortSignal.timeout(3000) });
      return res.json();
    } catch (_) {
      return { peak_velocity_kmh: 342, system_latency_ms: 0.04, active_sensors: 400, neural_core_pct: 98 };
    }
  },

  // ─── Scanner ──────────────────────────────────────────────────────────────
  async scanImage(file) {
    if (!window.APEX.backendOnline) {
      // Return mock result after 2.5s delay
      await new Promise(r => setTimeout(r, 2500));
      return _mockScanResult();
    }
    const form = new FormData();
    form.append('file', file);
    const res = await fetch(`${API_BASE}/api/scan`, { method: 'POST', body: form });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Scan failed');
    }
    return res.json();
  },

  // ─── Garage ───────────────────────────────────────────────────────────────
  async saveToGarage(payload) {
    if (!window.APEX.backendOnline) {
      return { success: true, garage_id: Date.now(), message: 'Saved (offline mode)' };
    }
    const res = await fetch(`${API_BASE}/api/garage/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.json();
  },

  async getGarage() {
    if (!window.APEX.backendOnline) return { garage: [], total: 0 };
    const res = await fetch(`${API_BASE}/api/garage`);
    return res.json();
  },

  async deleteFromGarage(id) {
    if (!window.APEX.backendOnline) return { success: true };
    const res = await fetch(`${API_BASE}/api/garage/${id}`, { method: 'DELETE' });
    return res.json();
  },

  // ─── Telemetry REST ───────────────────────────────────────────────────────
  async getLiveTelemetry(vehicleId = 1) {
    if (!window.APEX.backendOnline) return _mockTelemetry();
    try {
      const res = await fetch(`${API_BASE}/api/telemetry/live?vehicle_id=${vehicleId}`,
                              { signal: AbortSignal.timeout(2000) });
      return res.json();
    } catch (_) { return _mockTelemetry(); }
  },

  async getDashboardTelemetry(vehicleId = 1) {
    if (!window.APEX.backendOnline) return _mockDashboard();
    try {
      const res = await fetch(`${API_BASE}/api/telemetry/dashboard?vehicle_id=${vehicleId}`,
                              { signal: AbortSignal.timeout(2000) });
      return res.json();
    } catch (_) { return _mockDashboard(); }
  },
};

// ─── WebSocket Telemetry Stream ────────────────────────────────────────────────
class TelemetryStream {
  constructor(vehicleId = 1, onFrame = null) {
    this.vehicleId = vehicleId;
    this.onFrame = onFrame;
    this.ws = null;
    this._mockInterval = null;
    this._running = false;
  }

  start() {
    this._running = true;
    if (window.APEX.backendOnline) {
      this._connectWS();
    } else {
      this._startMock();
    }
  }

  stop() {
    this._running = false;
    if (this.ws) { try { this.ws.close(); } catch (_) {} this.ws = null; }
    if (this._mockInterval) { clearInterval(this._mockInterval); this._mockInterval = null; }
  }

  _connectWS() {
    try {
      this.ws = new WebSocket(`${WS_BASE}/ws/telemetry?vehicle_id=${this.vehicleId}`);
      this.ws.onmessage = (e) => {
        if (this.onFrame) this.onFrame(JSON.parse(e.data));
      };
      this.ws.onerror = () => this._startMock();
      this.ws.onclose = () => { if (this._running) this._startMock(); };
    } catch (_) { this._startMock(); }
  }

  _startMock() {
    let tick = 0;
    this._mockInterval = setInterval(() => {
      if (!this._running) return;
      if (this.onFrame) this.onFrame(_mockTelemetry(tick++));
    }, 1000);
  }
}

// ─── Mock fallbacks ────────────────────────────────────────────────────────────
function _mockScanResult() {
  return {
    make: 'Nissan', model: 'GT-R R35', year: 2024, category: 'jdm',
    confidence: 94.7, hp: 565, torque: 633, top_speed: 315, accel_0_100: 2.7,
    drivetrain: 'ATTESA E-TS AWD', engine: 'VR38DETT Twin-Turbo V6',
    displacement: '3.8L', weight: 1752,
    description: 'The Modern Godzilla. Twin-turbocharged fury meets surgical all-wheel-drive electronics.',
    track_aggression: 98, aero_efficiency: 92, technical_complexity: 95,
    driver_accessibility: 76, launch_response: 99,
    fun_fact: 'Every VR38DETT engine is hand-built by a single Takumi technician in a dust-free clean room.',
    ai_powered: false, mock: true,
    extra_images: [
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200'
    ]
  };
}

let _mockTick = 0;
function _mockTelemetry(tick = _mockTick++) {
  const t = tick;
  const rpm  = Math.round(3200 + Math.sin(t * 0.3) * 800 + (Math.random() - 0.5) * 240);
  const speed = Math.max(0, 180 + Math.sin(t * 0.15) * 40 + (Math.random() - 0.5) * 10);
  const aero  = Math.max(0, 420 + Math.pow(speed, 1.7) * 0.004 + (Math.random() - 0.5) * 30);
  const g     = parseFloat((0.8 + Math.sin(t * 0.7) * 0.6 + (Math.random() - 0.5) * 0.2).toFixed(3));
  const boost = parseFloat((14 + Math.sin(t * 0.4) * 6 + (Math.random() - 0.5) * 1).toFixed(1));
  return {
    tick: t, timestamp: Date.now() / 1000,
    rpm: Math.max(800, Math.min(8000, rpm)),
    speed_kmh: parseFloat(speed.toFixed(1)),
    g_lateral: g, g_longitudinal: parseFloat((Math.cos(t * 0.5) * 0.4).toFixed(3)),
    aero_load_kgf: parseFloat(aero.toFixed(1)),
    battery_thermal_c: parseFloat((88 + Math.sin(t * 0.1) * 8 + (Math.random() - 0.5) * 1).toFixed(1)),
    torque_nm: Math.round(Math.max(0, rpm * 0.09 + (Math.random() - 0.5) * 40)),
    boost_psi: boost,
    throttle_pct: parseFloat((Math.min(100, (rpm / 8000) * 100)).toFixed(1)),
    coolant_temp_c: parseFloat((90 + Math.sin(t * 0.05) * 5).toFixed(1)),
  };
}

function _mockDashboard() {
  const frame = _mockTelemetry();
  return {
    aero_load: { value: frame.aero_load_kgf, unit: 'kgf', label: 'Aero-Load / Front', pct: Math.min(100, frame.aero_load_kgf / 10) },
    torque:    { value: frame.torque_nm,      unit: 'Nm',  label: 'Torque / Vector',   pct: frame.torque_nm / 12.4 },
    thermal:   { value: frame.battery_thermal_c, unit: '°C', label: 'Battery / Thermal', pct: frame.battery_thermal_c / 1.2 },
    g_force:   { value: Math.abs(frame.g_lateral), unit: 'G', label: 'Lateral / G-Force', pct: Math.abs(frame.g_lateral) / 0.025 },
  };
}

// ─── Search UI helper ─────────────────────────────────────────────────────────
function initSearchBar() {
  const input = document.querySelector('input[placeholder="SYSTEM_SEARCH"]');
  if (!input) return;

  let searchBox = null;

  input.addEventListener('input', async (e) => {
    const q = e.target.value.trim();
    if (q.length < 2) { if (searchBox) searchBox.remove(); searchBox = null; return; }

    const data = await ApexAPI.searchVehicles(q);

    if (!searchBox) {
      searchBox = document.createElement('div');
      searchBox.id = 'searchDropdown';
      searchBox.style.cssText = `
        position:fixed; top:72px; right:64px; z-index:9999; min-width:280px;
        background:#1e2020; border:1px solid #5e3f3b;
        font-family:'Space Grotesk',sans-serif;
      `;
      document.body.appendChild(searchBox);
    }

    if (!data.results.length) {
      searchBox.innerHTML = `<div style="padding:12px;font-size:11px;color:#af8783;letter-spacing:0.1em">NO RESULTS FOUND</div>`;
      return;
    }

    searchBox.innerHTML = data.results.map(v => `
      <div onclick="navigate('dossier', { id: ${v.id} });document.getElementById('searchDropdown')?.remove()"
           style="padding:12px 16px;cursor:pointer;border-bottom:1px solid #5e3f3b;transition:background 0.2s"
           onmouseover="this.style.background='#282a2b'" onmouseout="this.style.background=''">
        <div style="font-size:13px;font-weight:600;color:#e2e2e2">${v.make} ${v.model}</div>
        <div style="font-size:10px;color:#e8bcb7;letter-spacing:0.12em;text-transform:uppercase">${v.year || ''} · ${v.category || ''} · ${v.hp || '—'} BHP</div>
      </div>`).join('');
  });

  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !searchBox?.contains(e.target)) {
      searchBox?.remove(); searchBox = null;
    }
  });
}

// Boot when DOM is ready
window.addEventListener('DOMContentLoaded', async () => {
  await checkBackendHealth();
  setInterval(checkBackendHealth, 5000);
  initSearchBar();
});
