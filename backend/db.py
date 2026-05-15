"""
APEX Automotive Intelligence OS — Database Layer
SQLite via aiosqlite for async operations
"""
import aiosqlite
import json
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "apex.db")

# ─── Schema ────────────────────────────────────────────────────────────────────
CREATE_TABLES = """
CREATE TABLE IF NOT EXISTS vehicles (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    make            TEXT NOT NULL,
    model           TEXT NOT NULL,
    year            INTEGER,
    category        TEXT,          -- hypercar | f1 | jdm | electric | classic
    hp              INTEGER,
    torque          INTEGER,
    top_speed       INTEGER,       -- km/h
    accel_0_100     REAL,          -- seconds
    drivetrain      TEXT,
    engine          TEXT,
    displacement    TEXT,
    weight          INTEGER,       -- kg
    image_url       TEXT,
    description     TEXT,
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS garage (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    vehicle_id      INTEGER,
    make            TEXT,
    model           TEXT,
    year            INTEGER,
    confidence      REAL,
    raw_ai_response TEXT,
    scan_image_b64  TEXT,
    notes           TEXT,
    added_at        DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
);

CREATE TABLE IF NOT EXISTS telemetry_log (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    vehicle_id      INTEGER,
    session_id      TEXT,
    timestamp       DATETIME DEFAULT CURRENT_TIMESTAMP,
    aero_load       REAL,
    torque_vector   REAL,
    battery_thermal REAL,
    g_force         REAL,
    rpm             INTEGER,
    speed           REAL,
    raw_json        TEXT,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
);
"""

# ─── Seed data ─────────────────────────────────────────────────────────────────
SEED_VEHICLES = [
    # JDM
    ("Nissan", "GT-R R35", 2024, "jdm", 565, 633, 315, 2.7, "ATTESA E-TS AWD", "VR38DETT Twin-Turbo V6", "3.8L", 1752, "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800", "The Modern Godzilla — a masterclass in engineering violence."),
    ("Nissan", "Skyline R34 GT-R", 1999, "jdm", 280, 392, 250, 4.9, "ATTESA E-TS AWD", "RB26DETT Twin-Turbo I6", "2.6L", 1560, "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", "Godzilla in peak form. The R34 is legend."),
    ("Toyota", "Supra MK4", 1998, "jdm", 320, 427, 250, 4.6, "RWD", "2JZ-GTE Twin-Turbo I6", "3.0L", 1550, "https://images.unsplash.com/photo-1606016159991-cdf4a3322129?w=800", "The legendary 2JZ icon that defined a generation."),
    ("Honda", "NSX Type-R", 1992, "jdm", 276, 294, 270, 5.0, "RWD", "C30A V6 VTEC", "3.0L", 1230, "https://images.unsplash.com/photo-1610444379435-09bd26ab6775?w=800", "Senna's development, Honda's perfection."),
    ("Mazda", "RX-7 FD", 1995, "jdm", 255, 294, 250, 5.2, "RWD", "13B-REW Sequential Twin-Turbo Rotary", "1.3L", 1310, "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800", "Rotary magic wrapped in timeless curves."),
    ("Mitsubishi", "Lancer Evolution IX", 2006, "jdm", 286, 392, 250, 4.5, "AWD", "4G63T Inline-4 Turbo", "2.0L", 1410, "https://images.unsplash.com/photo-1616422285623-13ff0167c95c?w=800", "The ultimate rally-bred street weapon."),

    # Hypercar
    ("Bugatti", "Chiron Super Sport", 2023, "hypercar", 1600, 1600, 440, 2.4, "AWD", "W16 Quad-Turbo", "8.0L", 1995, "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=800", "16 cylinders, 4 turbos, 1600 horses. The pinnacle of combustion."),
    ("Porsche", "911 GT3 RS", 2023, "hypercar", 525, 465, 296, 3.2, "RWD PDK", "Naturally Aspirated Flat-6", "4.0L", 1430, "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800", "Track DNA, road-legal execution."),
    ("Lamborghini", "Huracán STO", 2023, "hypercar", 640, 565, 310, 3.0, "RWD", "Naturally Aspirated V10", "5.2L", 1339, "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800", "Super Trofeo Omologata — born on the track."),
    ("Pagani", "Huayra R", 2023, "hypercar", 850, 900, 350, 2.6, "RWD", "Mercedes-AMG V12 NA", "6.0L", 1050, "https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=800", "Horacio Pagani's obsession made metal."),
    ("Koenigsegg", "Jesko Absolut", 2023, "hypercar", 1600, 1500, 530, 2.5, "RWD LST", "5.0L Twin-Turbo V8", "5.0L", 1390, "https://images.unsplash.com/photo-1621252179027-94459d278660?w=800", "Built to break the 300mph barrier."),
    ("Ferrari", "SF90 Stradale", 2023, "hypercar", 986, 800, 340, 2.5, "AWD Hybrid", "4.0L V8 Twin-Turbo + 3 Electric Motors", "4.0L", 1570, "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800", "Maranello's hybrid lightning bolt."),

    # F1
    ("Ferrari", "SF-23", 2023, "f1", 1000, 400, 370, 1.8, "RWD", "1.6L Hybrid V6 Turbo", "1.6L", 798, "https://images.unsplash.com/photo-1541348263662-e068662d82af?w=800", "Formula One weapon. Zero road compromise."),
    ("Red Bull Racing", "RB19", 2023, "f1", 1050, 420, 375, 1.7, "RWD", "Honda RBPTH001 V6 Turbo", "1.6L", 798, "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800", "One of the most dominant machines in F1 history."),
    ("Mercedes-AMG", "W11", 2020, "f1", 1020, 410, 360, 1.8, "RWD", "Mercedes M11 EQ Performance", "1.6L", 746, "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800", "The pinnacle of the hybrid era regulations with DAS."),
    ("McLaren", "MP4/4", 1988, "f1", 650, 380, 333, 2.2, "RWD", "Honda RA168E V6 Turbo", "1.5L", 540, "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", "Senna and Prost's legendary 15-win masterpiece."),

    # Electric
    ("Tesla", "Model S Plaid", 2024, "electric", 1020, 1420, 322, 1.99, "AWD Tri-Motor", "3x Permanent Magnet AC", "N/A", 2162, "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800", "The benchmark of electric performance."),
    ("Porsche", "Taycan Turbo S", 2024, "electric", 750, 1050, 260, 2.8, "AWD", "Dual AC Synchronous", "N/A", 2295, "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800", "Electric soul, Porsche driving dynamics."),
    ("Rimac", "Nevera", 2023, "electric", 1914, 2360, 412, 1.85, "AWD Quad-Motor", "4x Permanent Magnet AC", "N/A", 2300, "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800", "The hypercar rewritten in lines of code and lithium."),
    ("Rivian", "R1T", 2024, "electric", 835, 908, 185, 3.0, "AWD Quad-Motor", "4x Electric Motors", "N/A", 3150, "https://images.unsplash.com/photo-1662012089408-04f213bbe028?w=800", "The electric adventure vehicle that changed the game."),

    # Classic
    ("Ferrari", "250 GTO", 1962, "classic", 296, 294, 280, 6.1, "RWD", "Tipo 168/62 Comp. V12", "3.0L", 880, "https://images.unsplash.com/photo-1541348263662-e068662d82af?w=800", "The holy grail of classic cars."),
    ("Aston Martin", "DB5", 1964, "classic", 282, 390, 230, 8.0, "RWD", "Tadek Marek Inline-6", "4.0L", 1502, "https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=800", "Shaken, not stirred."),
    ("Mercedes-Benz", "300 SL Gullwing", 1954, "classic", 215, 275, 260, 8.8, "RWD", "M198 Inline-6", "3.0L", 1310, "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=800", "The first supercar, complete with iconic doors."),
    ("Ford", "Mustang Boss 429", 1969, "classic", 375, 450, 190, 5.1, "RWD", "429 cubic inch V8", "7.0L", 1750, "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=800", "Pure American muscle brute force."),

    # Sports / Muscle / Others
    ("Dodge", "Challenger SRT Demon 170", 2023, "sports", 1025, 945, 346, 1.66, "RWD", "6.2L Supercharged HEMI V8", "6.2L", 1941, "https://images.unsplash.com/photo-1603386090075-b892b0360a1c?w=800", "The world's most powerful muscle car. A drag strip nightmare."),
    ("Chevrolet", "Corvette Z06 (C8)", 2024, "sports", 670, 460, 312, 2.6, "RWD", "LT6 Naturally Aspirated V8", "5.5L", 1561, "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800", "The supercar from Kentucky with a flat-plane crank heart."),
    ("Land Rover", "Defender 110 V8", 2024, "suv", 518, 461, 240, 5.1, "AWD", "Supercharged V8", "5.0L", 2670, "https://images.unsplash.com/photo-1611016186353-9af58c69a533?w=800", "Rugged capability meets supercharged elegance."),
    ("Mercedes-AMG", "G 63", 2024, "suv", 577, 627, 220, 4.5, "AWD", "4.0L V8 Biturbo", "4.0L", 2560, "https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=800", "The icon that refuses to evolve, and we love it for it."),
    ("Audi", "RS6 Avant", 2024, "luxury", 621, 627, 305, 3.4, "Quattro AWD", "4.0L V8 Biturbo", "4.0L", 2250, "https://images.unsplash.com/photo-1606148386377-5058869894e6?w=800", "The ultimate family wagon that eats supercars."),
]


async def init_db():
    """Initialize DB and seed with vehicle data."""
    async with aiosqlite.connect(DB_PATH) as db:
        await db.executescript(CREATE_TABLES)
        # Seed only if empty
        async with db.execute("SELECT COUNT(*) FROM vehicles") as cur:
            count = (await cur.fetchone())[0]
        if count == 0:
            await db.executemany(
                """INSERT INTO vehicles
                   (make,model,year,category,hp,torque,top_speed,accel_0_100,
                    drivetrain,engine,displacement,weight,image_url,description)
                   VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)""",
                SEED_VEHICLES
            )
        await db.commit()
    print(f"[DB] Initialized: {DB_PATH}")


async def get_db():
    """Dependency that yields a DB connection."""
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        yield db


async def row_to_dict(row):
    return dict(row) if row else None


async def rows_to_list(rows):
    return [dict(r) for r in rows]
