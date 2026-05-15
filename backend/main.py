"""
APEX Automotive Intelligence OS — FastAPI Backend
Main application entry point with all REST + WebSocket routes.
"""
import os
import json
import asyncio
import base64
import time
from contextlib import asynccontextmanager
from typing import Optional

import aiosqlite
from fastapi import FastAPI, File, UploadFile, HTTPException, WebSocket, WebSocketDisconnect, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from dotenv import load_dotenv

from db import init_db, DB_PATH, rows_to_list, row_to_dict
from scanner import scan_vehicle_image
from telemetry import get_engine

load_dotenv(override=True)

# ─── Lifespan ──────────────────────────────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    print("[APEX] Server ready on http://localhost:8000")
    yield
    print("[APEX] Shutting down.")


# ─── App ───────────────────────────────────────────────────────────────────────
app = FastAPI(
    title="APEX Automotive Intelligence OS",
    version="1.0.0",
    description="Backend API for real-time vehicle telemetry, AI scanning, and garage management.",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # In production: restrict to your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─── Models ────────────────────────────────────────────────────────────────────
class GarageSaveRequest(BaseModel):
    make: str
    model: str
    year: Optional[int] = None
    confidence: Optional[float] = None
    raw_ai_response: Optional[str] = None
    notes: Optional[str] = ""
    vehicle_id: Optional[int] = None
    scan_image_b64: Optional[str] = None


class GarageUpdateNotes(BaseModel):
    notes: str


# ─── HEALTH ────────────────────────────────────────────────────────────────────
@app.get("/api/health")
async def health():
    return {
        "status": "NOMINAL",
        "system": "APEX Automotive Intelligence OS",
        "version": "1.0.0",
        "timestamp": time.time(),
    }


# ─── VEHICLES ──────────────────────────────────────────────────────────────────
@app.get("/api/vehicles")
async def list_vehicles(
    category: Optional[str] = Query(None),
    limit: int = Query(20, le=100),
    offset: int = Query(0),
):
    """List all vehicles with optional category filter."""
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        if category:
            cur = await db.execute(
                "SELECT * FROM vehicles WHERE category=? LIMIT ? OFFSET ?",
                (category, limit, offset)
            )
        else:
            cur = await db.execute(
                "SELECT * FROM vehicles LIMIT ? OFFSET ?",
                (limit, offset)
            )
        rows = await cur.fetchall()
        count_cur = await db.execute(
            "SELECT COUNT(*) FROM vehicles" + (" WHERE category=?" if category else ""),
            (category,) if category else ()
        )
        total = (await count_cur.fetchone())[0]

    return {"vehicles": await rows_to_list(rows), "total": total, "limit": limit, "offset": offset}


@app.get("/api/vehicles/{vehicle_id}")
async def get_vehicle(vehicle_id: int):
    """Get a single vehicle by ID."""
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cur = await db.execute("SELECT * FROM vehicles WHERE id=?", (vehicle_id,))
        row = await cur.fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return await row_to_dict(row)


@app.get("/api/categories")
async def list_categories():
    """Get all available vehicle categories with counts."""
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cur = await db.execute(
            "SELECT category, COUNT(*) as count FROM vehicles GROUP BY category"
        )
        rows = await cur.fetchall()
    return {"categories": await rows_to_list(rows)}


@app.get("/api/search")
async def search_vehicles(q: str = Query(..., min_length=1)):
    """Full-text search over make, model, engine, description."""
    term = f"%{q}%"
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cur = await db.execute(
            """SELECT * FROM vehicles
               WHERE make LIKE ? OR model LIKE ? OR engine LIKE ? OR description LIKE ?
               LIMIT 10""",
            (term, term, term, term)
        )
        rows = await cur.fetchall()
    return {"results": await rows_to_list(rows), "query": q}


# ─── AI SCANNER ────────────────────────────────────────────────────────────────
@app.post("/api/scan")
async def scan_vehicle(file: UploadFile = File(...)):
    """
    Upload a vehicle image. Gemini Vision identifies the car and returns
    full telemetry + DNA analysis.
    """
    # Validate file type
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files are accepted.")

    # Read image bytes
    image_bytes = await file.read()
    if len(image_bytes) > 30 * 1024 * 1024:  # 30MB hard limit
        raise HTTPException(status_code=413, detail="Image too large. Max 30MB.")

    # Run AI scanner
    result = await scan_vehicle_image(image_bytes)

    # Try to match against DB
    matched_vehicle = None
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        make = result.get("make", "")
        model = result.get("model", "")
        if make and model:
            cur = await db.execute(
                "SELECT * FROM vehicles WHERE make LIKE ? AND model LIKE ? LIMIT 1",
                (f"%{make}%", f"%{model}%")
            )
            row = await cur.fetchone()
            matched_vehicle = await row_to_dict(row) if row else None

    result["db_match"] = matched_vehicle
    result["scan_timestamp"] = time.time()

    return result


# ─── GARAGE ────────────────────────────────────────────────────────────────────
@app.post("/api/garage/save")
async def save_to_garage(payload: GarageSaveRequest):
    """Save a scanned vehicle to the user's garage."""
    async with aiosqlite.connect(DB_PATH) as db:
        cur = await db.execute(
            """INSERT INTO garage (vehicle_id, make, model, year, confidence, raw_ai_response, scan_image_b64, notes)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
            (
                payload.vehicle_id,
                payload.make,
                payload.model,
                payload.year,
                payload.confidence,
                payload.raw_ai_response,
                payload.scan_image_b64,
                payload.notes,
            )
        )
        await db.commit()
        garage_id = cur.lastrowid
    return {"success": True, "garage_id": garage_id, "message": f"{payload.make} {payload.model} saved to garage."}


@app.get("/api/garage")
async def list_garage(limit: int = Query(20)):
    """Get all saved vehicles in the user's garage."""
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cur = await db.execute(
            "SELECT * FROM garage ORDER BY added_at DESC LIMIT ?", (limit,)
        )
        rows = await cur.fetchall()
    result = await rows_to_list(rows)
    # Remove large base64 from listing (only return metadata)
    for r in result:
        if r.get("scan_image_b64"):
            r["has_scan_image"] = True
            r.pop("scan_image_b64", None)
    return {"garage": result, "total": len(result)}


@app.get("/api/garage/{garage_id}")
async def get_garage_entry(garage_id: int):
    """Get a specific garage entry including scan image."""
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cur = await db.execute("SELECT * FROM garage WHERE id=?", (garage_id,))
        row = await cur.fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="Garage entry not found")
    return await row_to_dict(row)


@app.patch("/api/garage/{garage_id}/notes")
async def update_garage_notes(garage_id: int, payload: GarageUpdateNotes):
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("UPDATE garage SET notes=? WHERE id=?", (payload.notes, garage_id))
        await db.commit()
    return {"success": True}


@app.delete("/api/garage/{garage_id}")
async def delete_from_garage(garage_id: int):
    """Remove a vehicle from the garage."""
    async with aiosqlite.connect(DB_PATH) as db:
        cur = await db.execute("SELECT id FROM garage WHERE id=?", (garage_id,))
        row = await cur.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="Entry not found")
        await db.execute("DELETE FROM garage WHERE id=?", (garage_id,))
        await db.commit()
    return {"success": True, "deleted_id": garage_id}


# ─── TELEMETRY (REST poll) ─────────────────────────────────────────────────────
@app.get("/api/telemetry/live")
async def get_live_telemetry(vehicle_id: int = Query(1)):
    """Single telemetry frame — call every second for polling."""
    engine = get_engine(vehicle_id)
    return engine.next_frame()


@app.get("/api/telemetry/dashboard")
async def get_dashboard_telemetry(vehicle_id: int = Query(1)):
    """4-metric summary for the Discover page dashboard widgets."""
    engine = get_engine(vehicle_id)
    return engine.dashboard_summary()


@app.post("/api/telemetry/log")
async def log_telemetry(vehicle_id: int, session_id: str):
    """Log a telemetry frame to DB for history."""
    engine = get_engine(vehicle_id)
    frame = engine.next_frame()
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute(
            """INSERT INTO telemetry_log
               (vehicle_id, session_id, aero_load, torque_vector, battery_thermal, g_force, rpm, speed, raw_json)
               VALUES (?,?,?,?,?,?,?,?,?)""",
            (
                vehicle_id, session_id,
                frame["aero_load_kgf"], frame["torque_nm"],
                frame["battery_thermal_c"], frame["g_lateral"],
                frame["rpm"], frame["speed_kmh"],
                json.dumps(frame),
            )
        )
        await db.commit()
    return frame


@app.get("/api/telemetry/history/{vehicle_id}")
async def get_telemetry_history(vehicle_id: int, limit: int = Query(50)):
    """Get telemetry history for a vehicle."""
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cur = await db.execute(
            "SELECT * FROM telemetry_log WHERE vehicle_id=? ORDER BY timestamp DESC LIMIT ?",
            (vehicle_id, limit)
        )
        rows = await cur.fetchall()
    return {"history": await rows_to_list(rows)}


# ─── WEBSOCKET — Real-time telemetry stream ────────────────────────────────────
class ConnectionManager:
    def __init__(self):
        self.active: list[WebSocket] = []

    async def connect(self, ws: WebSocket):
        await ws.accept()
        self.active.append(ws)

    def disconnect(self, ws: WebSocket):
        if ws in self.active:
            self.active.remove(ws)

    async def broadcast(self, data: dict):
        dead = []
        for ws in self.active:
            try:
                await ws.send_json(data)
            except Exception:
                dead.append(ws)
        for ws in dead:
            self.disconnect(ws)


manager = ConnectionManager()


@app.websocket("/ws/telemetry")
async def websocket_telemetry(websocket: WebSocket, vehicle_id: int = 1):
    """WebSocket endpoint — streams one telemetry frame per second."""
    await manager.connect(websocket)
    engine = get_engine(vehicle_id)
    try:
        while True:
            frame = engine.next_frame()
            await websocket.send_json(frame)
            await asyncio.sleep(1)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
    except Exception as e:
        print(f"[WS] Error: {e}")
        manager.disconnect(websocket)


# ─── STATS ─────────────────────────────────────────────────────────────────────
@app.get("/api/stats")
async def platform_stats():
    """Global platform stats shown on the home page."""
    async with aiosqlite.connect(DB_PATH) as db:
        veh_cur = await db.execute("SELECT COUNT(*) FROM vehicles")
        garage_cur = await db.execute("SELECT COUNT(*) FROM garage")
        scan_cur = await db.execute("SELECT COUNT(*) FROM garage")
        veh_count = (await veh_cur.fetchone())[0]
        garage_count = (await garage_cur.fetchone())[0]
        scan_count = (await scan_cur.fetchone())[0]

    return {
        "vehicles_indexed": veh_count,
        "garage_entries": garage_count,
        "scans_performed": scan_count,
        "peak_velocity_kmh": 342,
        "system_latency_ms": 0.04,
        "active_sensors": 400,
        "neural_core_pct": 98,
    }


# ─── Run directly ──────────────────────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=os.getenv("HOST", "0.0.0.0"),
        port=int(os.getenv("PORT", 8000)),
        reload=True,
        log_level="info",
    )
