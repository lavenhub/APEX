import os
import json
import base64
import re
from io import BytesIO
from dotenv import load_dotenv
from duckduckgo_search import DDGS

load_dotenv(override=True)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

# ─── Configure Gemini ──────────────────────────────────────────────────────────
AI_ENABLED = False
_client = None

if GEMINI_API_KEY and GEMINI_API_KEY != "your_gemini_api_key_here":
    try:
        import google.generativeai as genai
        genai.configure(api_key=GEMINI_API_KEY)
        _model = genai.GenerativeModel('gemini-flash-latest')
        AI_ENABLED = True
        print("[AI] Gemini AI scanner: ACTIVE (google-generativeai)")
    except Exception as e:
        print(f"[AI] Gemini init failed: {e}. Using mock scanner.")
        with open("scanner_error.log", "a") as f: f.write(f"[AI] Init failed: {e}\n")
else:
    print("[AI] WARNING: No Gemini API key set. Using mock scanner.")
    with open("scanner_error.log", "a") as f: f.write(f"[AI] Init failed: No key set. Key length is {len(GEMINI_API_KEY) if GEMINI_API_KEY else 0}\n")


# ─── Prompt ────────────────────────────────────────────────────────────────────
SCAN_PROMPT = """
You are APEX, an elite automotive intelligence AI. Analyze this vehicle image and respond with a JSON object only — no markdown, no extra text.

Extract the following:
{
  "make": "Brand name",
  "model": "Full model name",
  "year": 2024,
  "category": "one of: hypercar | f1 | jdm | electric | classic | sports | luxury | suv",
  "confidence": 97.4,
  "hp": 565,
  "torque": 633,
  "top_speed": 315,
  "accel_0_100": 2.7,
  "drivetrain": "AWD / RWD / FWD / etc",
  "engine": "Engine code or description",
  "displacement": "3.8L",
  "weight": 1752,
  "description": "2-3 sentence exciting description of this car's performance character",
  "track_aggression": 90,
  "aero_efficiency": 85,
  "technical_complexity": 88,
  "driver_accessibility": 70,
  "launch_response": 95,
  "fun_fact": "One fascinating engineering fact about this car"
}

If you cannot identify the vehicle, set confidence below 50 and make/model as "Unknown Vehicle".
All numeric fields must be integers or floats. Return valid JSON only.
"""


async def scan_vehicle_image(image_bytes: bytes) -> dict:
    """
    Send image to Gemini Vision and parse the vehicle telemetry response.
    Falls back to mock data if AI is not configured.
    """
    if not AI_ENABLED:
        return _mock_scan_result()

    try:
        # Pass raw bytes directly to Gemini — no Pillow needed
        response = _model.generate_content([
            SCAN_PROMPT,
            {"mime_type": "image/jpeg", "data": image_bytes}
        ])

        raw_text = response.text.strip()

        # Find the first '{' and the last '}' to extract the JSON payload safely
        start_idx = raw_text.find('{')
        end_idx = raw_text.rfind('}')
        if start_idx != -1 and end_idx != -1 and end_idx >= start_idx:
            raw_text = raw_text[start_idx:end_idx + 1]
            
        result = json.loads(raw_text)
        result["ai_powered"] = True
        result["raw_response"] = raw_text
        
        # Fetch high-quality images via DDGS
        try:
            ddgs = DDGS()
            query = f"{result.get('make', '')} {result.get('model', '')} car high resolution"
            search_results = list(ddgs.images(query, max_results=3))
            result["extra_images"] = [img['image'] for img in search_results if 'image' in img]
        except Exception as img_err:
            print(f"[AI] Extra images fetch failed: {img_err}")
            result["extra_images"] = []

        return result

    except json.JSONDecodeError as e:
        err_msg = f"[AI] JSON parse error: {e}\nRaw Text: {raw_text}"
        print(err_msg)
        with open("scanner_error.log", "a") as f: f.write(err_msg + "\n")
        fallback = _mock_scan_result()
        fallback["error"] = "AI response parse failed"
        return fallback

    except Exception as e:
        err_msg = f"[AI] Gemini error: {e}"
        print(err_msg)
        with open("scanner_error.log", "a") as f: f.write(err_msg + "\n")
        fallback = _mock_scan_result()
        fallback["error"] = str(e)
        return fallback


def _mock_scan_result() -> dict:
    """Returns realistic mock scan data when AI is unavailable."""
    import random
    vehicles = [
        {"make": "Nissan", "model": "GT-R R35", "year": 2024, "category": "jdm",
         "confidence": 94.7, "hp": 565, "torque": 633, "top_speed": 315,
         "accel_0_100": 2.7, "drivetrain": "ATTESA E-TS AWD",
         "engine": "VR38DETT Twin-Turbo V6", "displacement": "3.8L", "weight": 1752,
         "description": "The Modern Godzilla redefines all-wheel-drive precision. Twin-turbocharged fury meets surgical electronics.",
         "track_aggression": 98, "aero_efficiency": 92, "technical_complexity": 95,
         "driver_accessibility": 76, "launch_response": 99,
         "fun_fact": "Every VR38DETT engine is hand-built by a single Takumi technician in a dust-free clean room.",
         "extra_images": ["https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200"]},
        {"make": "Porsche", "model": "911 GT3 RS", "year": 2023, "category": "hypercar",
         "confidence": 91.2, "hp": 525, "torque": 465, "top_speed": 296,
         "accel_0_100": 3.2, "drivetrain": "RWD PDK",
         "engine": "NA Flat-6", "displacement": "4.0L", "weight": 1430,
         "description": "Track DNA wrapped in road-legal engineering. The GT3 RS is Porsche's purest expression of performance.",
         "track_aggression": 97, "aero_efficiency": 98, "technical_complexity": 90,
         "driver_accessibility": 72, "launch_response": 94,
         "fun_fact": "The 911 GT3 RS generates more than 400kg of downforce at 200km/h.",
         "extra_images": ["https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200", "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200"]},
    ]
    result = random.choice(vehicles)
    result["ai_powered"] = False
    result["mock"] = True
    return result
