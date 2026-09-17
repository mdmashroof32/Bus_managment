import React, { useState } from 'react';
import { 
  Bus, 
  Users, 
  MapPin, 
  AlertTriangle, 
  ShieldAlert, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle,
  Activity,
  Gauge,
  Zap,
  Building2,
  Map as MapIcon
} from 'lucide-react';
import { delhiDepots, delhiBusFleet } from '../data/delhiTransportData';
import LiveDelhiMap from './LiveDelhiMap';

export default function StateDashboard() {
  const [selectedDepot, setSelectedDepot] = useState('Millennium Park');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedBus, setSelectedBus] = useState(null);

  const filteredFleet = delhiBusFleet.filter(bus => {
    const matchesSearch = bus.regNo.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          bus.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          bus.driver.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || bus.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header & Depot Switcher */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '10px', margin: 0, fontWeight: 800 }}>
            <Building2 size={22} color="#dc2626" />
            State Bus Depot &amp; EV Fleet Live Dashboard
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0, marginTop: '2px' }}>
            Real-time geospatial tracking, depot operations, EV charging status, and fleet telemetry across Delhi NCR
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Select Depot:</span>
          <select 
            value={selectedDepot} 
            onChange={(e) => setSelectedDepot(e.target.value)}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              color: '#0f172a',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {delhiDepots.map(dep => (
              <option key={dep.id} value={dep.name}>{dep.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* LIVE INTERACTIVE GEOSPATIAL MAP PANEL */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapIcon size={20} color="#2563eb" />
            <h3 style={{ fontSize: '1.05rem', color: '#0f172a', margin: 0, fontWeight: 700 }}>
              Live Delhi NCR Bus Tracking &amp; Depot Network Map
            </h3>
          </div>
          <span className="badge badge-info font-mono">
            {delhiBusFleet.length} Live Units Streaming
          </span>
        </div>

        {/* Real Interactive Leaflet Map */}
        <LiveDelhiMap 
          height="450px" 
          showControls={true} 
          onSelectBus={(bus) => setSelectedBus(bus)}
        />
      </div>

      {/* Fleet Live Telemetry Search & Filter Bar */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '280px' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search bus reg no (e.g. DL-01-PC-1001), route, or driver..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 38px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  color: '#0f172a',
                  fontSize: '0.85rem'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <Filter size={16} color="var(--text-muted)" />
            <button
              onClick={() => setStatusFilter('ALL')}
              className={statusFilter === 'ALL' ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '8px 14px', fontSize: '0.82rem' }}
            >
              All Fleet
            </button>
            <button
              onClick={() => setStatusFilter('ON_ROUTE')}
              className={statusFilter === 'ON_ROUTE' ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '8px 14px', fontSize: '0.82rem' }}
            >
              On Route
            </button>
            <button
              onClick={() => setStatusFilter('FRAUD_FLAG')}
              className={statusFilter === 'FRAUD_FLAG' ? 'btn-danger' : 'btn-secondary'}
              style={{ padding: '8px 14px', fontSize: '0.82rem' }}
            >
              Fraud Alerts
            </button>
          </div>
        </div>

        {/* Bus Fleet Grid Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)', background: '#f8fafc' }}>
                <th style={{ padding: '12px' }}>DTC Bus Registration</th>
                <th style={{ padding: '12px' }}>Route Corridor</th>
                <th style={{ padding: '12px' }}>Driver</th>
                <th style={{ padding: '12px' }}>Speed &amp; Location</th>
                <th style={{ padding: '12px' }}>Battery / Fuel</th>
                <th style={{ padding: '12px' }}>Seat Occupancy</th>
                <th style={{ padding: '12px' }}>AI Telemetry Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredFleet.map((bus, idx) => (
                <tr 
                  key={bus.id} 
                  style={{ 
                    borderBottom: '1px solid var(--border-color)', 
                    background: selectedBus?.id === bus.id ? '#eff6ff' : idx % 2 === 0 ? '#ffffff' : '#f8fafc',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedBus(bus)}
                >
                  <td style={{ padding: '12px' }}>
                    <div className="font-mono" style={{ color: '#dc2626', fontWeight: 800 }}>{bus.regNo}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{bus.type}</div>
                  </td>

                  <td style={{ padding: '12px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{bus.route}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Next: {bus.nextStop}</div>
                  </td>

                  <td style={{ padding: '12px' }}>
                    <div style={{ color: '#0f172a', fontWeight: 600 }}>{bus.driver}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Depot: {bus.depot}</div>
                  </td>

                  <td style={{ padding: '12px' }}>
                    <div className="font-mono" style={{ color: '#16a34a', fontWeight: 700 }}>{bus.speed} km/h</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>📍 {bus.lat.toFixed(4)}, {bus.lng.toFixed(4)}</div>
                  </td>

                  <td style={{ padding: '12px' }}>
                    <span className="badge badge-success font-mono">
                      <Zap size={10} /> {bus.batterySoc}
                    </span>
                  </td>

                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '80px', height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ 
                          width: `${(bus.occupancy / bus.capacity) * 100}%`, 
                          height: '100%', 
                          background: bus.occupancy > 50 ? '#dc2626' : '#16a34a' 
                        }} />
                      </div>
                      <span className="font-mono" style={{ fontSize: '0.8rem', color: '#0f172a', fontWeight: 600 }}>
                        {bus.occupancy}/{bus.capacity}
                      </span>
                    </div>
                  </td>

                  <td style={{ padding: '12px' }}>
                    {bus.status === 'FRAUD_FLAG' ? (
                      <span className="badge badge-danger" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <AlertTriangle size={12} /> Delta Mismatch!
                      </span>
                    ) : (
                      <span className="badge badge-success">NOMINAL</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
