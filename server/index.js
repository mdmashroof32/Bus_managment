import express from 'express';
import cors from 'cors';
import db, { initDb, executeRawSql } from './db.js';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Initialize Database
initDb();

// --------------------------------------------------
// Health & System Info
// --------------------------------------------------
app.get('/api/health', (req, res) => {
  try {
    const stores = ['depots', 'routes', 'buses', 'incidents', 'tickets', 'bus_telemetry_logs', 'system_stats'];
    let totalRecords = 0;
    const tableCounts = {};

    for (const table of stores) {
      try {
        const row = db.prepare(`SELECT COUNT(*) as count FROM ${table}`).get();
        tableCounts[table] = row ? row.count : 0;
        totalRecords += tableCounts[table];
      } catch (err) {
        tableCounts[table] = 0;
      }
    }

    res.json({
      status: 'CONNECTED',
      dbName: 'delhi_transport.db',
      engine: 'Express Node.js + SQLite3',
      tablesCount: stores.length,
      totalRecords,
      tableCounts,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ status: 'ERROR', error: err.message });
  }
});

// --------------------------------------------------
// Depots Endpoints
// --------------------------------------------------
app.get('/api/depots', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM depots').all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/depots', (req, res) => {
  try {
    const { id, name, code, totalBuses, evChargers, status, location, lat, lng } = req.body;
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO depots (id, name, code, totalBuses, evChargers, status, location, lat, lng)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(id || `dep-${Date.now()}`, name, code, totalBuses || 0, evChargers || 0, status || 'OPTIMAL', location, lat || 28.6139, lng || 77.2090);
    res.json({ success: true, id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/depots/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM depots WHERE id = ?');
    stmt.run(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------------------------------------
// Routes Endpoints
// --------------------------------------------------
app.get('/api/routes', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM routes').all();
    const formatted = rows.map(r => ({
      ...r,
      coordinates: r.coordinates ? JSON.parse(r.coordinates) : []
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/routes', (req, res) => {
  try {
    const { code, name, color, via, distanceKm, activeBuses, frequencyMins, coordinates } = req.body;
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO routes (code, name, color, via, distanceKm, activeBuses, frequencyMins, coordinates)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(code, name, color || '#2563eb', via, distanceKm || 0, activeBuses || 0, frequencyMins || 5, JSON.stringify(coordinates || []));
    res.json({ success: true, code });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/routes/:code', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM routes WHERE code = ?');
    stmt.run(req.params.code);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------------------------------------
// Buses Endpoints
// --------------------------------------------------
app.get('/api/buses', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM buses').all();
    const formatted = rows.map(b => ({
      ...b,
      isEV: Boolean(b.isEV)
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/buses', (req, res) => {
  try {
    const { id, regNo, depot, type, route, routeCode, driver, speed, occupancy, capacity, batterySoc, nextStop, fatigueScore, status, lat, lng, heading, isEV } = req.body;
    const busId = id || `dtc-${Date.now()}`;
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO buses (id, regNo, depot, type, route, routeCode, driver, speed, occupancy, capacity, batterySoc, nextStop, fatigueScore, status, lat, lng, heading, isEV)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(busId, regNo, depot, type, route, routeCode, driver, speed || 0, occupancy || 0, capacity || 55, batterySoc || '100%', nextStop || '', fatigueScore || 0, status || 'ON_ROUTE', lat || 28.6139, lng || 77.2090, heading || 'North', isEV ? 1 : 0);
    res.json({ success: true, id: busId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.patch('/api/buses/:id/location', (req, res) => {
  try {
    const { lat, lng, speed, occupancy, status } = req.body;
    const stmt = db.prepare(`
      UPDATE buses 
      SET lat = COALESCE(?, lat),
          lng = COALESCE(?, lng),
          speed = COALESCE(?, speed),
          occupancy = COALESCE(?, occupancy),
          status = COALESCE(?, status),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    stmt.run(lat, lng, speed, occupancy, status, req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/buses/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM buses WHERE id = ?');
    stmt.run(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------------------------------------
// Incidents Endpoints
// --------------------------------------------------
app.get('/api/incidents', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM incidents ORDER BY reported_at DESC').all();
    const formatted = rows.map(i => ({
      ...i,
      resolved: Boolean(i.resolved)
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/incidents', (req, res) => {
  try {
    const { id, busReg, stc, type, location, time, severity, resolved } = req.body;
    const incId = id || `inc-${Date.now()}`;
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO incidents (id, busReg, stc, type, location, time, resolved, severity)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(incId, busReg, stc, type, location, time || 'Just Now', resolved ? 1 : 0, severity || 'HIGH');
    res.json({ success: true, id: incId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.patch('/api/incidents/:id/resolve', (req, res) => {
  try {
    const stmt = db.prepare('UPDATE incidents SET resolved = 1 WHERE id = ?');
    stmt.run(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/incidents/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM incidents WHERE id = ?');
    stmt.run(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------------------------------------
// Tickets Endpoints
// --------------------------------------------------
app.get('/api/tickets', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM tickets ORDER BY issued_at DESC LIMIT 100').all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/tickets', (req, res) => {
  try {
    const { ticket_id, bus_id, route_code, passenger_type, fare_amount, payment_mode, source_stop, destination_stop, is_pink_pass } = req.body;
    const tId = ticket_id || `tck-${Date.now()}`;
    const stmt = db.prepare(`
      INSERT INTO tickets (ticket_id, bus_id, route_code, passenger_type, fare_amount, payment_mode, source_stop, destination_stop, is_pink_pass)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(tId, bus_id, route_code, passenger_type, fare_amount || 0, payment_mode || 'ONE_DELHI_CARD', source_stop, destination_stop, is_pink_pass ? 1 : 0);
    res.json({ success: true, ticket_id: tId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// --------------------------------------------------
// Telemetry Endpoints
// --------------------------------------------------
app.get('/api/telemetry', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM bus_telemetry_logs ORDER BY recorded_at DESC LIMIT 100').all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/telemetry', (req, res) => {
  try {
    const { log_id, bus_id, speed_kmh, ai_passenger_count, ticket_pos_count, passenger_delta, driver_ear_score, panic_button_pressed } = req.body;
    const lId = log_id || `log-${Date.now()}`;
    const stmt = db.prepare(`
      INSERT INTO bus_telemetry_logs (log_id, bus_id, speed_kmh, ai_passenger_count, ticket_pos_count, passenger_delta, driver_ear_score, panic_button_pressed)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(lId, bus_id, speed_kmh, ai_passenger_count, ticket_pos_count, passenger_delta, driver_ear_score, panic_button_pressed ? 1 : 0);
    res.json({ success: true, log_id: lId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// --------------------------------------------------
// System Stats Endpoint
// --------------------------------------------------
app.get('/api/stats', (req, res) => {
  try {
    const stats = db.prepare('SELECT * FROM system_stats WHERE id = ?').get('main_stats');
    res.json(stats || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------------------------------------
// SQL Execution Engine Endpoint
// --------------------------------------------------
app.post('/api/sql/execute', (req, res) => {
  try {
    const { sql } = req.body;
    if (!sql) {
      return res.status(400).json({ success: false, error: 'SQL query is required' });
    }
    const result = executeRawSql(sql);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Delhi Transport Express Server running on http://localhost:${PORT}`);
});
