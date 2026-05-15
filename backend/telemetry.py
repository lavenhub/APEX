"""
APEX Automotive Intelligence OS — Live Telemetry Generator
Simulates real-time sensor streams for connected vehicles.
"""
import random
import math
import time


class TelemetryEngine:
    """Simulates live vehicle telemetry data with realistic fluctuations."""

    def __init__(self, vehicle_id: int = 1):
        self.vehicle_id = vehicle_id
        self.session_id = f"SES-{int(time.time())}"
        self._tick = 0
        # Base values
        self._base_rpm = 3200
        self._base_speed = 180
        self._base_temp = 88.0
        self._base_g = 0.8

    def next_frame(self) -> dict:
        """Generate one telemetry frame with smooth noise."""
        t = self._tick
        self._tick += 1

        rpm = int(self._base_rpm + math.sin(t * 0.3) * 800 + random.gauss(0, 120))
        rpm = max(800, min(8000, rpm))

        speed = self._base_speed + math.sin(t * 0.15) * 40 + random.gauss(0, 5)
        speed = max(0, min(342, speed))

        g_lat = self._base_g + math.sin(t * 0.7) * 0.6 + random.gauss(0, 0.1)
        g_long = math.cos(t * 0.5) * 0.4 + random.gauss(0, 0.05)

        aero_load = 420 + (speed ** 1.7) * 0.004 + random.gauss(0, 15)
        aero_load = max(0, round(aero_load, 1))

        battery_thermal = self._base_temp + math.sin(t * 0.1) * 8 + random.gauss(0, 0.5)
        battery_thermal = round(max(25, min(120, battery_thermal)), 1)

        torque = int(rpm * 0.09 + random.gauss(0, 20))
        torque = max(0, min(1240, torque))

        boost_psi = round(max(0, 14 + math.sin(t * 0.4) * 6 + random.gauss(0, 0.5)), 1)
        fuel_flow = round(max(0, speed * 0.3 + random.gauss(0, 2)), 1)
        coolant_temp = round(90 + math.sin(t * 0.05) * 5 + random.gauss(0, 0.3), 1)

        return {
            "session_id": self.session_id,
            "vehicle_id": self.vehicle_id,
            "tick": t,
            "timestamp": time.time(),
            "rpm": rpm,
            "speed_kmh": round(speed, 1),
            "g_lateral": round(g_lat, 3),
            "g_longitudinal": round(g_long, 3),
            "aero_load_kgf": aero_load,
            "battery_thermal_c": battery_thermal,
            "torque_nm": torque,
            "boost_psi": boost_psi,
            "fuel_flow_lph": fuel_flow,
            "coolant_temp_c": coolant_temp,
            "throttle_pct": round(min(100, max(0, (rpm / 8000) * 100 + random.gauss(0, 5))), 1),
            "brake_pct": round(max(0, random.gauss(0, 8)), 1),
            "steering_deg": round(math.sin(t * 0.2) * 45 + random.gauss(0, 2), 1),
        }

    def dashboard_summary(self) -> dict:
        """Returns the 4 key metrics shown in the Discover page dashboard."""
        frame = self.next_frame()
        return {
            "aero_load": {"value": frame["aero_load_kgf"], "unit": "kgf", "label": "Aero-Load / Front", "pct": min(100, frame["aero_load_kgf"] / 10)},
            "torque": {"value": frame["torque_nm"], "unit": "Nm", "label": "Torque / Vector", "pct": frame["torque_nm"] / 12.4},
            "thermal": {"value": frame["battery_thermal_c"], "unit": "°C", "label": "Battery / Thermal", "pct": frame["battery_thermal_c"] / 1.2},
            "g_force": {"value": abs(round(frame["g_lateral"], 2)), "unit": "G", "label": "Lateral / G-Force", "pct": abs(frame["g_lateral"]) / 0.025},
        }


# Singleton engines per vehicle_id
_engines: dict[int, TelemetryEngine] = {}


def get_engine(vehicle_id: int = 1) -> TelemetryEngine:
    if vehicle_id not in _engines:
        _engines[vehicle_id] = TelemetryEngine(vehicle_id)
    return _engines[vehicle_id]
