import React, { useState } from 'react';
import { 
  Building2, 
  Bus, 
  Users, 
  IndianRupee, 
  ShieldAlert, 
  Radio, 
  Zap, 
  Sliders, 
  AlertOctagon, 
  CheckCircle2, 
  Volume2, 
  Layers,
  Activity,
  BatteryCharging,
  MapPin,
  Send,
  Map as MapIcon
} from 'lucide-react';
import { delhiStats, delhiDepots } from '../data/delhiTransportData';
import LiveDelhiMap from './LiveDelhiMap';

export default function DelhiMasterAdmin({ incidents, setIncidents }) {
  const [grapStage4Active, setGrapStage4Active] = useState(false);
  const [emergencyBusesDispatched, setEmergencyBusesDispatched] = useState(12);
  const [ledAnnouncement, setLedAnnouncement] = useState('ALL DTC ELECTRIC EV BUSES RUNNING ON FREQUENCY. WEAR MASKS FOR AIR QUALITY.');
  const [announcementPushed, setAnnouncementPushed] = useState(false);

  const handleDispatchEmergency = () => {
    setEmergencyBusesDispatched(prev => prev + 5);
  };

  const handlePushAnnouncement = () => {
    setAnnouncementPushed(true);
    setTimeout(() => setAnnouncementPushed(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top Banner: Master System Control Bar */}
      <div className="glass-panel glass-panel-glow" style={{ padding: '20px', background: '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '1.25rem', color: '#0f172a', margin: 0, fontWeight: 800 }}>
                DTC Master Command &amp; Control Center
              </h2>
              <span className="badge badge-purple" style={{ fontSize: '0.72rem' }}>
                <Sliders size={12} /> Master Override Active
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0, marginTop: '4px' }}>
              Govt. of NCT of Delhi • Transport Department • Direct Fleet Control Protocol
            </p>
          </div>

          {/* Quick Master Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            
            {/* GRAP Pollution Override Toggle */}
            <button
              onClick={() => setGrapStage4Active(!grapStage4Active)}
              style={{
                padding: '10px 16px',
                borderRadius: '10px',
                border: grapStage4Active ? '1px solid #f87171' : '1px solid #e2e8f0',
                background: grapStage4Active ? '#fee2e2' : '#ffffff',
                color: grapStage4Active ? '#b91c1c' : '#475569',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}
            >
              <AlertOctagon size={16} color={grapStage4Active ? '#dc2626' : '#d97706'} />
              {grapStage4Active ? 'GRAP-4 FREE TRANSIT: ACTIVE' : 'TOGGLE GRAP-4 FREE TRANSIT'}
            </button>

            {/* Emergency Fleet Dispatch Button */}
            <button
              onClick={handleDispatchEmergency}
              className="btn-primary"
              style={{ fontSize: '0.82rem', padding: '10px 16px' }}
            >
              <Zap size={16} /> Dispatch Emergency EV Fleet (+5)
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid 1: System Control Panels & Interactive Live Delhi Map */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        
        {/* REAL INTERACTIVE DELHI NCR MAP */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', margin: 0, fontWeight: 700 }}>
                <MapIcon size={20} color="#2563eb" />
                Delhi NCR Live Bus Corridor &amp; Real-time Map
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0, marginTop: '2px' }}>
                Spatial tracking of active EV buses, CNG express units, and ISBT depot clusters
              </p>
            </div>
            <span className="badge badge-success">GPS Live Feed</span>
          </div>

          {/* Interactive Leaflet Map */}
          <LiveDelhiMap height="360px" showControls={true} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginTop: '16px' }}>
            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Emergency Fleet Dispatched</span>
              <div className="font-mono" style={{ fontSize: '1.2rem', color: '#2563eb', fontWeight: 800 }}>
                {emergencyBusesDispatched} Buses
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Delhi AQI Pollution Level</span>
              <div className="font-mono" style={{ fontSize: '1.2rem', color: grapStage4Active ? '#dc2626' : '#d97706', fontWeight: 800 }}>
                {delhiStats.aqiDelhi} (POOR)
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Pink Passes Issued Today</span>
              <div className="font-mono" style={{ fontSize: '1.2rem', color: '#db2777', fontWeight: 800 }}>
                {delhiStats.pinkPassIssuedToday}
              </div>
            </div>
          </div>

        </div>

        {/* MASTER BROADCAST & OVERRIDE CONTROL PANEL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Citywide LED Passenger Advisory Broadcast */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '0.98rem', color: '#0f172a', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', margin: 0, fontWeight: 700 }}>
              <Volume2 size={18} color="#d97706" />
              Citywide LED Bus Stop Broadcast
            </h3>
            
            <textarea
              rows={3}
              value={ledAnnouncement}
              onChange={(e) => setLedAnnouncement(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                color: '#0f172a',
                fontSize: '0.8rem',
                marginTop: '12px'
              }}
            />

            <button
              onClick={handlePushAnnouncement}
              className="btn-primary"
              style={{ width: '100%', marginTop: '10px', justifyContent: 'center', fontSize: '0.82rem' }}
            >
              <Send size={14} /> Push Broadcast to 1,420 Displays
            </button>

            {announcementPushed && (
              <div className="badge badge-success" style={{ width: '100%', justifyContent: 'center', marginTop: '8px', padding: '6px' }}>
                <CheckCircle2 size={14} /> Broadcast Sent to All Bus Stops!
              </div>
            )}
          </div>

          {/* EV Charging & Power Grid Matrix */}
          <div className="glass-panel" style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '0.98rem', color: '#15803d', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', margin: 0, fontWeight: 700 }}>
              <BatteryCharging size={18} color="#16a34a" />
              Delhi EV Bus Depot Charging Matrix
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px', flex: 1 }}>
              {delhiDepots.slice(0, 4).map((dep) => (
                <div key={dep.id} style={{ background: '#f8fafc', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: '#0f172a', fontWeight: 600 }}>{dep.name}</span>
                    <span className="badge badge-info" style={{ fontSize: '0.65rem' }}>{dep.evChargers} EV Guns</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '3px', marginTop: '6px', overflow: 'hidden' }}>
                    <div style={{ width: `${(dep.evChargers / 50) * 100}%`, height: '100%', background: '#16a34a' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Main Grid 2: Delhi Official Depots Breakdown Table */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.05rem', color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', margin: 0, fontWeight: 700 }}>
          <Building2 size={20} color="#7c3aed" />
          Official DTC &amp; DIMTS Depot Operational Status
        </h3>

        <div style={{ overflowX: 'auto', marginTop: '14px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)', background: '#f8fafc' }}>
                <th style={{ padding: '12px' }}>Depot Name</th>
                <th style={{ padding: '12px' }}>Code</th>
                <th style={{ padding: '12px' }}>Total Fleet</th>
                <th style={{ padding: '12px' }}>EV Fast Charging Guns</th>
                <th style={{ padding: '12px' }}>Location</th>
                <th style={{ padding: '12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {delhiDepots.map((dep, idx) => (
                <tr key={dep.id} style={{ borderBottom: '1px solid var(--border-color)', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                  <td style={{ padding: '12px', fontWeight: 700, color: '#0f172a' }}>{dep.name}</td>
                  <td className="font-mono" style={{ padding: '12px', color: '#7c3aed', fontWeight: 600 }}>{dep.code}</td>
                  <td className="font-mono" style={{ padding: '12px', color: '#2563eb', fontWeight: 700 }}>{dep.totalBuses} Buses</td>
                  <td className="font-mono" style={{ padding: '12px', color: '#16a34a', fontWeight: 700 }}>{dep.evChargers} Ports</td>
                  <td style={{ padding: '12px', color: 'var(--text-muted)' }}>📍 {dep.location}</td>
                  <td style={{ padding: '12px' }}>
                    <span className="badge badge-success">ONLINE</span>
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
