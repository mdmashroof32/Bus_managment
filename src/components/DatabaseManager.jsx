import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Server, 
  Terminal, 
  Play, 
  RefreshCw, 
  CheckCircle2, 
  Table as TableIcon, 
  Key, 
  Layers, 
  Download, 
  Zap, 
  Cpu, 
  AlertCircle,
  FileCode
} from 'lucide-react';
import { useDatabase } from '../db/useDatabase';

export default function DatabaseManager() {
  const { dbStats, executeQuery, resetDb, dbInstance } = useDatabase();
  const [selectedTable, setSelectedTable] = useState('buses');
  const [sqlInput, setSqlInput] = useState('SELECT * FROM buses;');
  const [queryResult, setQueryResult] = useState(null);
  const [executing, setExecuting] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState('workbench'); // 'workbench' | 'schema' | 'ddl'

  const schemaTables = [
    {
      name: 'depots',
      description: 'Master list of State Bus EV and CNG Bus Depots across Delhi',
      primaryKey: 'id',
      columns: [
        { name: 'id', type: 'VARCHAR(50)', pk: true },
        { name: 'name', type: 'VARCHAR(150)' },
        { name: 'code', type: 'VARCHAR(10)' },
        { name: 'totalBuses', type: 'INT' },
        { name: 'evChargers', type: 'INT' },
        { name: 'status', type: 'VARCHAR(50)' },
        { name: 'location', type: 'VARCHAR(200)' },
        { name: 'lat', type: 'DECIMAL(10,6)' },
        { name: 'lng', type: 'DECIMAL(10,6)' }
      ]
    },
    {
      name: 'routes',
      description: 'Delhi Bus Transit Routes & Waypoints Geometry',
      primaryKey: 'code',
      columns: [
        { name: 'code', type: 'VARCHAR(20)', pk: true },
        { name: 'name', type: 'VARCHAR(200)' },
        { name: 'color', type: 'VARCHAR(20)' },
        { name: 'via', type: 'VARCHAR(255)' },
        { name: 'distanceKm', type: 'DECIMAL(6,2)' },
        { name: 'activeBuses', type: 'INT' },
        { name: 'frequencyMins', type: 'INT' },
        { name: 'coordinates', type: 'JSON' }
      ]
    },
    {
      name: 'buses',
      description: 'Live Bus Fleet Telemetry & Driver Assignments',
      primaryKey: 'id',
      columns: [
        { name: 'id', type: 'VARCHAR(50)', pk: true },
        { name: 'regNo', type: 'VARCHAR(20)' },
        { name: 'depot', type: 'VARCHAR(100)' },
        { name: 'type', type: 'VARCHAR(100)' },
        { name: 'route', type: 'VARCHAR(200)' },
        { name: 'routeCode', type: 'VARCHAR(20)', fk: 'routes.code' },
        { name: 'driver', type: 'VARCHAR(100)' },
        { name: 'speed', type: 'INT' },
        { name: 'occupancy', type: 'INT' },
        { name: 'capacity', type: 'INT' },
        { name: 'batterySoc', type: 'VARCHAR(20)' },
        { name: 'nextStop', type: 'VARCHAR(150)' },
        { name: 'fatigueScore', type: 'DECIMAL(4,2)' },
        { name: 'status', type: 'VARCHAR(50)' },
        { name: 'lat', type: 'DECIMAL(10,6)' },
        { name: 'lng', type: 'DECIMAL(10,6)' },
        { name: 'isEV', type: 'BOOLEAN' }
      ]
    },
    {
      name: 'incidents',
      description: 'Realtime Incident Log (Ticket Fraud, SOS, Fatigue)',
      primaryKey: 'id',
      columns: [
        { name: 'id', type: 'VARCHAR(50)', pk: true },
        { name: 'busReg', type: 'VARCHAR(20)' },
        { name: 'stc', type: 'VARCHAR(100)' },
        { name: 'type', type: 'VARCHAR(100)' },
        { name: 'location', type: 'VARCHAR(200)' },
        { name: 'time', type: 'VARCHAR(50)' },
        { name: 'resolved', type: 'BOOLEAN' }
      ]
    },
    {
      name: 'tickets',
      description: 'Fare Transactions & Pink Pass Subsidy Receipts',
      primaryKey: 'ticket_id',
      columns: [
        { name: 'ticket_id', type: 'VARCHAR(50)', pk: true },
        { name: 'bus_id', type: 'VARCHAR(50)', fk: 'buses.id' },
        { name: 'route_code', type: 'VARCHAR(20)', fk: 'routes.code' },
        { name: 'passenger_type', type: 'VARCHAR(50)' },
        { name: 'fare_amount', type: 'DECIMAL(8,2)' },
        { name: 'payment_mode', type: 'VARCHAR(50)' },
        { name: 'issued_at', type: 'TIMESTAMP' }
      ]
    },
    {
      name: 'telemetry',
      description: 'IoT AI Vision & EAR Camera Logs',
      primaryKey: 'log_id',
      columns: [
        { name: 'log_id', type: 'VARCHAR(50)', pk: true },
        { name: 'bus_id', type: 'VARCHAR(50)', fk: 'buses.id' },
        { name: 'recorded_at', type: 'TIMESTAMP' },
        { name: 'speed_kmh', type: 'INT' },
        { name: 'ai_passenger_count', type: 'INT' },
        { name: 'ticket_pos_count', type: 'INT' }
      ]
    }
  ];

  // Auto-run query on initial render
  useEffect(() => {
    handleRunQuery(sqlInput);
  }, []);

  const handleRunQuery = async (queryText) => {
    setExecuting(true);
    const res = await executeQuery(queryText || sqlInput);
    setQueryResult(res);
    setExecuting(false);
  };

  const handlePresetQuery = (sql, tableName) => {
    setSqlInput(sql);
    if (tableName) setSelectedTable(tableName);
    handleRunQuery(sql);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* DB Connection Status Banner */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)', border: '1px solid #bbf7d0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ padding: '12px', borderRadius: '12px', background: '#dcfce7', border: '1px solid #86efac' }}>
            <Database size={28} color="#16a34a" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '1.2rem', color: '#0f172a', margin: 0, fontWeight: 800 }}>
                Database Connection &amp; Relational Engine
              </h2>
              <span className="badge badge-success" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <CheckCircle2 size={12} /> {dbStats.status}
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0, marginTop: '4px' }}>
              Engine: <strong>{dbStats.engine}</strong> • DB Name: <strong>{dbStats.dbName}</strong> • Tables: <strong>7 Active Tables</strong>
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ textAlignment: 'right', fontSize: '0.8rem' }}>
            <div style={{ color: 'var(--text-muted)' }}>Latency</div>
            <div style={{ fontWeight: 800, color: '#16a34a', fontFamily: 'monospace' }}>{dbStats.latencyMs} ms</div>
          </div>
          <div style={{ textAlignment: 'right', fontSize: '0.8rem' }}>
            <div style={{ color: 'var(--text-muted)' }}>Total Records</div>
            <div style={{ fontWeight: 800, color: '#2563eb', fontFamily: 'monospace' }}>{dbStats.totalRecords}</div>
          </div>
          <button 
            onClick={resetDb}
            className="btn-secondary" 
            style={{ fontSize: '0.78rem', padding: '6px 12px', gap: '6px' }}
            title="Reset DB & Re-seed Sample Data"
          >
            <RefreshCw size={14} /> Reset &amp; Seed
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={() => setActiveSubTab('workbench')}
          className={activeSubTab === 'workbench' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.85rem' }}
        >
          <Terminal size={16} /> Interactive SQL Workbench
        </button>
        <button
          onClick={() => setActiveSubTab('schema')}
          className={activeSubTab === 'schema' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.85rem' }}
        >
          <TableIcon size={16} /> Schema Inspector ({schemaTables.length} Tables)
        </button>
        <button
          onClick={() => setActiveSubTab('ddl')}
          className={activeSubTab === 'ddl' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.85rem' }}
        >
          <FileCode size={16} /> PostgreSQL DDL Script
        </button>
      </div>

      {/* SubTab 1: SQL Workbench */}
      {activeSubTab === 'workbench' && (
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '20px' }}>
          
          {/* Quick Query Selector Sidebar */}
          <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Quick Table Queries
            </span>

            {schemaTables.map(tbl => (
              <button
                key={tbl.name}
                onClick={() => handlePresetQuery(`SELECT * FROM ${tbl.name};`, tbl.name)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: selectedTable === tbl.name ? '1px solid #2563eb' : '1px solid var(--border-color)',
                  background: selectedTable === tbl.name ? '#eff6ff' : '#ffffff',
                  color: selectedTable === tbl.name ? '#1e40af' : '#0f172a',
                  cursor: 'pointer',
                  fontWeight: selectedTable === tbl.name ? 700 : 500,
                  fontSize: '0.82rem',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <TableIcon size={14} color={selectedTable === tbl.name ? '#2563eb' : '#64748b'} />
                  <span>{tbl.name}</span>
                </div>
                <span className="font-mono" style={{ fontSize: '0.72rem', opacity: 0.7 }}>
                  SELECT
                </span>
              </button>
            ))}

            <div style={{ marginTop: '10px', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                System Queries
              </span>
              <button
                onClick={() => handlePresetQuery('SHOW TABLES;')}
                className="btn-secondary"
                style={{ width: '100%', marginTop: '8px', fontSize: '0.75rem', justifyContent: 'flex-start' }}
              >
                <Layers size={13} /> SHOW TABLES;
              </button>
              <button
                onClick={() => handlePresetQuery('INSERT INTO incidents (busReg, type) VALUES ("DL-01-PC-1001", "TEST ALERT");')}
                className="btn-secondary"
                style={{ width: '100%', marginTop: '6px', fontSize: '0.75rem', justifyContent: 'flex-start' }}
              >
                <Zap size={13} /> INSERT TEST INCIDENT
              </button>
            </div>
          </div>

          {/* SQL Editor & Results Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Editor Box */}
            <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Terminal size={16} color="#2563eb" /> SQL Command Line
                </span>
                <button
                  onClick={() => handleRunQuery()}
                  disabled={executing}
                  className="btn-primary"
                  style={{ fontSize: '0.8rem', padding: '6px 14px' }}
                >
                  <Play size={14} /> {executing ? 'Executing...' : 'Run Query'}
                </button>
              </div>

              <textarea
                value={sqlInput}
                onChange={(e) => setSqlInput(e.target.value)}
                rows={3}
                className="font-mono"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  background: '#0f172a',
                  color: '#38bdf8',
                  fontSize: '0.88rem',
                  lineHeight: '1.5',
                  outline: 'none',
                  resize: 'vertical'
                }}
                placeholder="Enter SQL statement, e.g. SELECT * FROM buses;"
              />
            </div>

            {/* Query Results Box */}
            <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '280px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
                  Execution Result
                </span>
                {queryResult && queryResult.executionTimeMs && (
                  <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Time: {queryResult.executionTimeMs} ms • {queryResult.rows ? `${queryResult.rows.length} rows` : '0 rows'}
                  </span>
                )}
              </div>

              {queryResult?.error ? (
                <div style={{ padding: '12px', borderRadius: '8px', background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertCircle size={16} /> Error: {queryResult.error}
                </div>
              ) : queryResult?.rows ? (
                <div style={{ overflowX: 'auto', maxHeight: '350px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-color)' }}>
                        {queryResult.columns?.map(col => (
                          <th key={col} style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 700, color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {queryResult.rows.map((row, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          {queryResult.columns?.map(col => (
                            <td key={col} style={{ padding: '8px 12px', fontFamily: typeof row[col] === 'object' ? 'monospace' : 'inherit' }}>
                              {typeof row[col] === 'object' ? JSON.stringify(row[col]) : String(row[col] ?? '')}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : queryResult?.message ? (
                <div style={{ padding: '12px', borderRadius: '8px', background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', fontSize: '0.82rem' }}>
                  ✓ {queryResult.message}
                </div>
              ) : (
                <div style={{ padding: '40px', textAlignment: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Run a SQL query above to see live database results.
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* SubTab 2: Schema Inspector */}
      {activeSubTab === 'schema' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
          {schemaTables.map(tbl => (
            <div key={tbl.name} className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <TableIcon size={18} color="#2563eb" />
                    <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                      {tbl.name}
                    </h3>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0, marginTop: '4px' }}>
                    {tbl.description}
                  </p>
                </div>
                <span className="badge badge-info font-mono" style={{ fontSize: '0.7rem' }}>
                  PK: {tbl.primaryKey}
                </span>
              </div>

              <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-color)' }}>
                      <th style={{ padding: '6px 10px', textAlign: 'left', fontWeight: 700 }}>Column Name</th>
                      <th style={{ padding: '6px 10px', textAlign: 'left', fontWeight: 700 }}>Data Type</th>
                      <th style={{ padding: '6px 10px', textAlign: 'center', fontWeight: 700 }}>Key</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tbl.columns.map(col => (
                      <tr key={col.name} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '6px 10px', fontWeight: col.pk ? 700 : 400, color: col.pk ? '#2563eb' : '#0f172a' }}>
                          {col.name}
                        </td>
                        <td className="font-mono" style={{ padding: '6px 10px', color: '#64748b', fontSize: '0.72rem' }}>
                          {col.type}
                        </td>
                        <td style={{ padding: '6px 10px', textAlign: 'center' }}>
                          {col.pk && <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>PK</span>}
                          {col.fk && <span className="badge badge-warning" style={{ fontSize: '0.65rem' }}>FK</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SubTab 3: SQL DDL */}
      {activeSubTab === 'ddl' && (
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>
              Official State Bus Transit PostgreSQL / PostGIS Schema DDL Script
            </span>
            <a
              href="/src/db/schema.sql"
              download="dtc_schema.sql"
              className="btn-secondary"
              style={{ fontSize: '0.78rem', textDecoration: 'none' }}
            >
              <Download size={14} /> Download schema.sql
            </a>
          </div>
          <pre className="font-mono" style={{ background: '#0f172a', color: '#38bdf8', padding: '16px', borderRadius: '8px', fontSize: '0.8rem', overflowX: 'auto', lineHeight: '1.6' }}>
{`-- DTC Transport Enterprise PostgreSQL Schema
CREATE TABLE depots (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    total_buses INT DEFAULT 0,
    ev_chargers INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'OPTIMAL',
    location VARCHAR(200),
    latitude DECIMAL(10, 6) NOT NULL,
    longitude DECIMAL(10, 6) NOT NULL
);

CREATE TABLE routes (
    code VARCHAR(20) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    color VARCHAR(20) DEFAULT '#2563eb',
    via VARCHAR(255),
    distance_km DECIMAL(6, 2) NOT NULL,
    active_buses INT DEFAULT 0,
    frequency_mins INT DEFAULT 5
);

CREATE TABLE buses (
    id VARCHAR(50) PRIMARY KEY,
    reg_no VARCHAR(20) UNIQUE NOT NULL,
    depot_id VARCHAR(50) REFERENCES depots(id),
    bus_type VARCHAR(100) NOT NULL,
    route_code VARCHAR(20) REFERENCES routes(code),
    driver_name VARCHAR(100),
    speed_kmh INT DEFAULT 0,
    occupancy INT DEFAULT 0,
    capacity INT DEFAULT 55,
    status VARCHAR(50) DEFAULT 'ON_ROUTE'
);`}
          </pre>
        </div>
      )}

    </div>
  );
}
