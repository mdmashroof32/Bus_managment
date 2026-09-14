import React, { useState } from 'react';
import { 
  Navigation, 
  Gauge, 
  ShieldAlert, 
  CheckCircle, 
  AlertTriangle, 
  Radio, 
  Clock, 
  Activity, 
  Eye,
  Bus,
  Zap,
  BatteryCharging,
  Plus,
  Minus
} from 'lucide-react';

export default function DriverApp() {
  const [speed, setSpeed] = useState(42);
  const [sosTriggered, setSosTriggered] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header Bar for DTC Driver Terminal */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ padding: '12px', borderRadius: '12px', background: '#eff6ff', border: '1px solid #bfdbfe' }}>
            <Bus size={26} color="#2563eb" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '1.2rem', color: '#0f172a', margin: 0, fontWeight: 700 }}>
                DTC Driver Display Unit (DDU Terminal)
              </h2>
              <span className="badge badge-info font-mono">DL-01-PC-1001 (EV)</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, marginTop: '2px' }}>
              Driver: <strong>Rajesh Kumar</strong> (DTC ID: DRV-8812) • Millennium Park Depot
            </p>
          </div>
        </div>

        <button 
          onClick={() => setSosTriggered(!sosTriggered)}
          className="btn-danger pulse-emergency"
          style={{ fontSize: '0.9rem', padding: '10px 20px' }}
        >
          <ShieldAlert size={18} /> {sosTriggered ? 'SOS Signal Active' : 'Driver Emergency SOS'}
        </button>
      </div>

      {/* Main Grid: Telemetry Speedometer, Navigation & Diagnostics */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '20px' }}>
        
        {/* Live Speedometer & Safety Gauge Panel */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em' }}>CURRENT BUS SPEED</span>
          
          <div style={{ 
            width: '160px', 
            height: '160px', 
            borderRadius: '50%', 
            border: `8px solid ${speed > 60 ? '#fee2e2' : '#dcfce7'}`,
            borderTopColor: speed > 60 ? '#dc2626' : '#16a34a',
            borderRightColor: speed > 60 ? '#dc2626' : '#16a34a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '18px 0',
            background: speed > 60 ? '#fef2f2' : '#f0fdf4',
            transition: 'all 0.3s ease'
          }}>
            <strong className="font-mono" style={{ fontSize: '2.8rem', color: speed > 60 ? '#dc2626' : '#15803d', lineHeight: 1 }}>
              {speed}
            </strong>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '4px' }}>KM / H</span>
          </div>

          {/* Simple One-Click Speed Controls */}
          <div style={{ display: 'flex', gap: '8px', width: '100%', justifyContent: 'center' }}>
            <button 
              onClick={() => setSpeed(prev => Math.max(0, prev - 5))} 
              className="btn-secondary" 
              style={{ padding: '8px 16px', fontSize: '0.9rem', flex: 1, justifyContent: 'center' }}
            >
              <Minus size={14} /> 5
            </button>
            <button 
              onClick={() => setSpeed(prev => Math.min(80, prev + 5))} 
              className="btn-secondary" 
              style={{ padding: '8px 16px', fontSize: '0.9rem', flex: 1, justifyContent: 'center' }}
            >
              <Plus size={14} /> 5
            </button>
          </div>

          <div style={{ 
            marginTop: '16px', 
            fontSize: '0.8rem', 
            fontWeight: 600,
            color: speed > 60 ? '#dc2626' : '#15803d',
            background: speed > 60 ? '#fee2e2' : '#dcfce7',
            padding: '6px 12px',
            borderRadius: '6px',
            width: '100%'
          }}>
            {speed > 60 ? '⚠️ Speed Warning (> 60 km/h)' : '✓ City Speed Limit Compliant'}
          </div>
        </div>

        {/* Route Navigation Panel */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
            <h3 style={{ fontSize: '1.05rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
              <Navigation size={20} color="#2563eb" />
              Route 534-A (Anand Vihar ISBT ➔ Mehrauli)
            </h3>
            <span className="badge badge-success">ON SCHEDULE (+1 min)</span>
          </div>

          <div style={{ 
            flex: 1, 
            background: '#f8fafc', 
            borderRadius: '12px', 
            border: '1px solid var(--border-color)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '14px', 
              background: '#ffffff', 
              padding: '16px', 
              borderRadius: '10px', 
              border: '1px solid #bfdbfe',
              boxShadow: '0 2px 6px rgba(37, 99, 235, 0.08)'
            }}>
              <div style={{ padding: '10px', borderRadius: '8px', background: '#eff6ff' }}>
                <Bus size={26} color="#2563eb" />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 700, letterSpacing: '0.04em' }}>NEXT STOP IN 420 METERS</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>AIIMS Metro Station Bus Stop</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px' }}>
              <div style={{ background: '#ffffff', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Destination Terminal</span>
                <div style={{ fontSize: '0.95rem', color: '#0f172a', fontWeight: 700 }}>Mehrauli Terminal</div>
              </div>
              <div style={{ background: '#ffffff', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Distance Remaining</span>
                <div className="font-mono" style={{ fontSize: '0.95rem', color: '#16a34a', fontWeight: 700 }}>14.2 km (ETA: 24 mins)</div>
              </div>
            </div>
          </div>
        </div>

        {/* EV Battery & Fatigue AI Monitor Panel */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h3 style={{ fontSize: '1.05rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <Activity size={20} color="#7c3aed" />
            TATA EV Diagnostics
          </h3>

          <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>EV Battery (SoC)</span>
              <BatteryCharging size={18} color="#16a34a" />
            </div>
            <div className="font-mono" style={{ fontSize: '1.25rem', color: '#15803d', marginTop: '4px', fontWeight: 700 }}>
              84% <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>(168 km Range)</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Millennium Park Port Active
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Driver Fatigue Vision AI</span>
              <Eye size={18} color="#7c3aed" />
            </div>
            <div className="font-mono" style={{ fontSize: '1.1rem', color: '#15803d', fontWeight: 700, marginTop: '4px' }}>
              0.12 (Alert &amp; Normal)
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Electric Motor Temp</div>
            <div className="font-mono" style={{ fontSize: '1.1rem', color: '#0284c7', fontWeight: 700, marginTop: '4px' }}>
              62.0 °C (Nominal)
            </div>
          </div>
        </div>

      </div>

      {sosTriggered && (
        <div className="glass-panel" style={{ padding: '18px', background: '#fef2f2', border: '1px solid #f87171' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldAlert size={24} color="#dc2626" className="pulse-emergency" />
            <div>
              <h4 style={{ color: '#b91c1c', margin: 0, fontSize: '0.95rem', fontWeight: 700 }}>
                🚨 SOS DISPATCH TRANSMITTED TO DTC MASTER CONTROL ROOM &amp; DELHI POLICE
              </h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#7f1d1d', marginTop: '2px' }}>
                GPS coordinates and in-cabin audio feed transmitted. Emergency unit ETA: &lt; 3 minutes.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
