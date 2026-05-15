# APEX Automotive Intelligence OS

![APEX Header](https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80)

APEX is a high-performance, cinematic automotive research and intelligence platform. It combines AI-driven vehicle scanning with real-time telemetry and a global manufacturer archive to provide an unparalleled digital automotive experience.

## 🚀 Features

- **AI Neural Scanner**: Instantly identify vehicles and extract technical dossiers using Google Gemini Vision.
- **Dynamic Dossiers**: Deep-dive into vehicle specifications, history, and mechanical components with non-repeating high-definition visual briefings.
- **Global Fleet Archives**: Comprehensive intelligence on the world's most prestigious automotive brands, including financial metrics and corporate history.
- **Real-Time Telemetry**: Live WebSocket-driven performance monitoring (Engine RPM, Velocity, Thermal Loads).
- **Cinematic UI**: A state-of-the-art interface built with Vanilla JS/CSS, featuring glassmorphism, HUD overlays, and fluid animations.

## 🛠️ Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3 (Custom Design System).
- **Backend**: FastAPI (Python 3.10+), SQLite, WebSockets.
- **AI Engine**: Google Gemini 1.5 Pro Vision.
- **Networking**: Localtunnel / Render / Vercel ready.

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/lavenhub/APEX.git
cd APEX
```

### 2. Configure Backend
Create a `.env` file in the `backend/` directory:
```env
GEMINI_API_KEY=your_api_key_here
```

### 3. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 4. Run Locally
Execute the deployment script from the project root:
```powershell
.\DEPLOY.ps1
```

## 🌐 Deployment

The project is pre-configured for:
- **Vercel**: Static frontend hosting.
- **Render**: Persistent FastAPI backend hosting.
- **Localtunnel**: Instant public URL generation for local testing.

---
© 2024 APEX INTELLIGENCE PROTOCOL. All Rights Reserved.
