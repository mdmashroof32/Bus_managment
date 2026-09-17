import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'delhi_transport.db');
const db = new DatabaseSync(dbPath);

// Initialize Tables
export function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS depots (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      code TEXT UNIQUE NOT NULL,
      totalBuses INTEGER DEFAULT 0,
      evChargers INTEGER DEFAULT 0,
      status TEXT DEFAULT 'OPTIMAL',
      location TEXT,
      lat REAL NOT NULL,
      lng REAL NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS routes (
      code TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      color TEXT DEFAULT '#2563eb',
      via TEXT,
      distanceKm REAL NOT NULL,
      activeBuses INTEGER DEFAULT 0,
      frequencyMins INTEGER DEFAULT 5,
      coordinates TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS buses (
      id TEXT PRIMARY KEY,
      regNo TEXT UNIQUE NOT NULL,
      depot TEXT,
      type TEXT NOT NULL,
      route TEXT,
      routeCode TEXT,
      driver TEXT,
      speed INTEGER DEFAULT 0,
      occupancy INTEGER DEFAULT 0,
      capacity INTEGER DEFAULT 55,
      batterySoc TEXT,
      nextStop TEXT,
      fatigueScore REAL DEFAULT 0.10,
      status TEXT DEFAULT 'ON_ROUTE',
      lat REAL,
      lng REAL,
      heading TEXT,
      isEV INTEGER DEFAULT 1,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS tickets (
      ticket_id TEXT PRIMARY KEY,
      bus_id TEXT,
      route_code TEXT,
      passenger_type TEXT NOT NULL,
      fare_amount REAL DEFAULT 0.00,
      payment_mode TEXT DEFAULT 'ONE_DELHI_CARD',
      source_stop TEXT,
      destination_stop TEXT,
      is_pink_pass INTEGER DEFAULT 0,
      issued_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS incidents (
      id TEXT PRIMARY KEY,
      busReg TEXT NOT NULL,
      stc TEXT NOT NULL,
      type TEXT NOT NULL,
      location TEXT,
      time TEXT,
      resolved INTEGER DEFAULT 0,
      severity TEXT DEFAULT 'HIGH',
      reported_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS bus_telemetry_logs (
      log_id TEXT PRIMARY KEY,
      bus_id TEXT,
      recorded_at TEXT DEFAULT CURRENT_TIMESTAMP,
      speed_kmh INTEGER,
      ai_passenger_count INTEGER,
      ticket_pos_count INTEGER,
      passenger_delta INTEGER,
      driver_ear_score REAL,
      panic_button_pressed INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS system_stats (
      id TEXT PRIMARY KEY,
      activeBuses INTEGER,
      electricEVBuses INTEGER,
      cngBuses INTEGER,
      dailyPassengers TEXT,
      todayRevenue TEXT,
      pinkPassIssuedToday TEXT,
      pinkPassSubsidyGovt TEXT,
      aqiDelhi INTEGER,
      connectedDepots INTEGER,
      evChargingStationsActive INTEGER,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);

  seedDataIfEmpty();
}

function seedDataIfEmpty() {
  const depotCount = db.prepare('SELECT COUNT(*) as count FROM depots').get().count;
  if (depotCount === 0) {
    console.log('Seeding initial Delhi DTC dataset into SQLite database...');

    // Depots
    const insertDepot = db.prepare(`
      INSERT INTO depots (id, name, code, totalBuses, evChargers, status, location, lat, lng)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const initialDepots = [
      ['dep-1', 'Millennium Park EV Depot', 'MPD', 1100, 45, 'OPTIMAL', 'Near Sarai Kale Khan / Nizamuddin', 28.5878, 77.2588],
      ['dep-2', 'Anand Vihar ISBT Depot', 'AVD', 480, 20, 'OPTIMAL', 'Anand Vihar ISBT Hub', 28.6469, 77.3155],
      ['dep-3', 'Kashmere Gate ISBT Depot', 'KGD', 520, 24, 'OPTIMAL', 'Kashmere Gate ISBT', 28.6675, 77.2285],
      ['dep-4', 'Sukhdev Vihar EV Depot', 'SVD', 350, 35, 'CHARGING_HIGH', 'Mathura Road Okhla', 28.5583, 77.2750],
      ['dep-5', 'Rajghat DTC Depot', 'RGD', 610, 28, 'OPTIMAL', 'Ring Road Rajghat', 28.6415, 77.2503],
      ['dep-6', 'Rohini Sector-22 EV Depot', 'RND', 420, 30, 'OPTIMAL', 'Rohini Sector 22', 28.7180, 77.0650],
      ['dep-7', 'Nehru Place Bus Terminal', 'NPD', 390, 18, 'OPTIMAL', 'Nehru Place Outer Ring Rd', 28.5494, 77.2530]
    ];
    for (const d of initialDepots) insertDepot.run(...d);

    // Routes
    const insertRoute = db.prepare(`
      INSERT INTO routes (code, name, color, via, distanceKm, activeBuses, frequencyMins, coordinates)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const initialRoutes = [
      ['534-A', 'Anand Vihar ISBT ➔ Mehrauli Terminal', '#2563eb', 'Laxmi Nagar • AIIMS • Malviya Nagar', 28.5, 42, 4, JSON.stringify([[28.6469, 77.3155], [28.6304, 77.2772], [28.6180, 77.2450], [28.5878, 77.2588], [28.5672, 77.2100], [28.5400, 77.2050], [28.5200, 77.1800]])],
      ['AIRPORT-EXP', 'ISBT Kashmere Gate ➔ IGI Airport T3', '#16a34a', 'CP • Dhaula Kuan • Aerocity', 24.8, 24, 10, JSON.stringify([[28.6675, 77.2285], [28.6401, 77.2403], [28.6315, 77.2167], [28.5918, 77.1616], [28.5562, 77.1200], [28.5562, 77.0850]])],
      ['RING-SEWA', 'Ring Road Mudrika Express', '#7c3aed', 'Kashmere Gate • Rajghat • Ashram • AIIMS • Dhaula Kuan', 48.0, 65, 3, JSON.stringify([[28.6675, 77.2285], [28.6415, 77.2503], [28.5878, 77.2588], [28.5700, 77.2500], [28.5672, 77.2100], [28.5918, 77.1616], [28.6400, 77.1400], [28.6850, 77.1700], [28.6675, 77.2285]])],
      ['419', 'Old Delhi Railway Station ➔ Ambedkar Nagar', '#d97706', 'Delhi Gate • ITPO • Ashram • Khanpur', 22.0, 36, 5, JSON.stringify([[28.6580, 77.2290], [28.6401, 77.2403], [28.6150, 77.2480], [28.5700, 77.2500], [28.5494, 77.2530], [28.5150, 77.2350]])]
    ];
    for (const r of initialRoutes) insertRoute.run(...r);

    // Buses
    const insertBus = db.prepare(`
      INSERT INTO buses (id, regNo, depot, type, route, routeCode, driver, speed, occupancy, capacity, batterySoc, nextStop, fatigueScore, status, lat, lng, heading, isEV)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const initialBuses = [
      ['dtc-1001', 'DL-01-PC-1001', 'Millennium Park', 'TATA STARBUS ELECTRIC EV', '534-A (Anand Vihar ➔ Mehrauli)', '534-A', 'Rajesh Kumar (ID: DTC-8812)', 42, 44, 55, '84%', 'AIIMS Metro Station', 0.12, 'ON_ROUTE', 28.5672, 77.2100, 'South-West', 1],
      ['dtc-1002', 'DL-01-PC-2045', 'Sukhdev Vihar EV', 'JBM ECO-LIFE ELECTRIC AC', 'RING-SEWA (Clockwise)', 'RING-SEWA', 'Sunil Verma (ID: DTC-4491)', 48, 52, 55, '68%', 'Dhaula Kuan Flyover', 0.15, 'ON_ROUTE', 28.5918, 77.1616, 'North-East', 1],
      ['dtc-1003', 'DL-01-GC-3380', 'Kashmere Gate', 'DTC LOW FLOOR CNG AC', 'AIRPORT-EXP (T3 Express)', 'AIRPORT-EXP', 'Manish Tyagi (ID: DTC-1104)', 64, 46, 50, 'CNG 92%', 'Aerocity Metro Hub', 0.84, 'FRAUD_FLAG', 28.5562, 77.1200, 'West', 0],
      ['dtc-1004', 'DL-01-PC-4102', 'Rohini Sector-22', 'TATA STARBUS ELECTRIC EV', '534-A (Anand Vihar ➔ Mehrauli)', '534-A', 'Dharmendra Sharma (ID: DTC-9921)', 38, 36, 55, '91%', 'Laxmi Nagar Metro', 0.08, 'ON_ROUTE', 28.6304, 77.2772, 'West', 1],
      ['dtc-1005', 'DL-01-GC-5512', 'Rajghat Depot', 'DTC LOW FLOOR CNG AC', '419 (Old Delhi ➔ Ambedkar Nagar)', '419', 'Gurpreet Singh (ID: DTC-7711)', 28, 38, 55, 'CNG 78%', 'Delhi Gate ISBT', 0.14, 'ON_ROUTE', 28.6401, 77.2403, 'South', 0],
      ['dtc-1006', 'DL-01-PC-7789', 'Nehru Place Depot', 'TATA STARBUS ELECTRIC EV', 'RING-SEWA (Clockwise)', 'RING-SEWA', 'Vikram Negi (ID: DTC-6632)', 44, 41, 55, '79%', 'Ashram Flyover Node', 0.10, 'ON_ROUTE', 28.5700, 77.2500, 'North', 1],
      ['dtc-1007', 'DL-01-PC-8820', 'Anand Vihar Depot', 'JBM ECO-LIFE ELECTRIC AC', 'AIRPORT-EXP (T3 Express)', 'AIRPORT-EXP', 'Amit Kumar (ID: DTC-3341)', 52, 48, 55, '86%', 'Connaught Place Central', 0.11, 'ON_ROUTE', 28.6315, 77.2167, 'South-West', 1]
    ];
    for (const b of initialBuses) insertBus.run(...b);

    // Incidents
    const insertIncident = db.prepare(`
      INSERT INTO incidents (id, busReg, stc, type, location, time, resolved, severity)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const initialIncidents = [
      ['inc-1', 'DL-01-GC-3380', 'DTC Kashmere Gate', 'TICKET FRAUD DELTA (+5 PASSENGERS)', 'Kashmere Gate ISBT, Delhi', '2 Mins Ago', 0, 'CRITICAL'],
      ['inc-2', 'DL-01-PC-2045', 'DTC Sukhdev Vihar', 'PASSENGER SOS PANIC BUTTON', 'AIIMS Metro Station Bus Stop', '6 Mins Ago', 0, 'HIGH'],
      ['inc-3', 'DL-01-PC-1001', 'DTC Millennium Park', 'DRIVER FATIGUE EYE ASPECT RATIO (EAR < 0.18)', 'Laxmi Nagar Flyover', '12 Mins Ago', 1, 'MEDIUM']
    ];
    for (const inc of initialIncidents) insertIncident.run(...inc);

    // System Stats
    const insertStats = db.prepare(`
      INSERT INTO system_stats (id, activeBuses, electricEVBuses, cngBuses, dailyPassengers, todayRevenue, pinkPassIssuedToday, pinkPassSubsidyGovt, aqiDelhi, connectedDepots, evChargingStationsActive)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    insertStats.run(
      'main_stats',
      7420,
      2150,
      5270,
      '4.35 Million',
      '₹ 7.82 Crores',
      '1.48 Million',
      '₹ 1.48 Crores',
      284,
      42,
      128
    );

    console.log('Database seeded successfully.');
  }
}

// SQL Execution Helper for Dynamic Admin Queries
export function executeRawSql(sqlQuery) {
  const cleanSql = sqlQuery.trim();
  const startTime = performance.now();
  try {
    const isSelect = /^\s*(SELECT|SHOW|PRAGMA|EXPLAIN)/i.test(cleanSql);
    if (isSelect) {
      const stmt = db.prepare(cleanSql);
      const rows = stmt.all();
      const executionTimeMs = (performance.now() - startTime).toFixed(2);
      const columns = rows.length > 0 ? Object.keys(rows[0]) : [];
      return { success: true, columns, rows, executionTimeMs };
    } else {
      const stmt = db.prepare(cleanSql);
      const result = stmt.run();
      const executionTimeMs = (performance.now() - startTime).toFixed(2);
      return {
        success: true,
        message: `Query executed successfully. Changes: ${result.changes}`,
        affectedRows: result.changes,
        executionTimeMs
      };
    }
  } catch (err) {
    return {
      success: false,
      error: err.message,
      executionTimeMs: (performance.now() - startTime).toFixed(2)
    };
  }
}

export default db;
