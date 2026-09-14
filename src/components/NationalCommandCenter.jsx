import React, { useState } from 'react';
import { 
  Building2, 
  Bus, 
  Users, 
  IndianRupee, 
  ShieldAlert, 
  Radio, 
  MapPin, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Eye, 
  Sparkles,
  RefreshCw
} from 'lucide-react';

export default function NationalCommandCenter({ liveStats, stateData, incidents, setIncidents }) {
  const [selectedState, setSelectedState] = useState('MH');

  const activeStateObj = stateData.find(s => s.code === selectedState) || stateData[0];

  const handleResolveAlert = (id) => {
    setIncidents(prev => prev.map(inc => inc.id === id ? { ...inc, resolved: true } : inc));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top Banner KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>National Fleet Online</span>
              <h2 className="font-mono" style={{ fontSize: '1.8rem', color: '#60a5fa', marginTop: '6px' }}>
                {liveStats.busesOnline.toLocaleString()}
              </h2>
              <span style={{ fontSize: '0.75rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                <TrendingUp size={12} /> 99.4% Operational Rate
              </span>
            </div>
            <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
              <Bus size={24} color="#60a5fa" />
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Daily Commuter Volume</span>
              <h2 className="font-mono" style={{ fontSize: '1.8rem', color: '#34d399', marginTop: '6px' }}>
                {liveStats.dailyPassengers} Million
              </h2>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                Peak Capacity: 62.5M
              </span>
            </div>
            <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <Users size={24} color="#34d399" />
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Today's Revenue Collection</span>
              <h2 className="font-mono" style={{ fontSize: '1.8rem', color: '#fbbf24', marginTop: '6px' }}>
                ₹ {liveStats.todayRevenue} Cr
              </h2>
              <span style={{ fontSize: '0.75rem', color: '#34d399', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <TrendingUp size={12} /> UPI/NCMC: 76.2%
              </span>
            </div>
            <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
              <IndianRupee size={24} color="#fbbf24" />
            </div>
          </div>
        </div>

        <div className="glass-panel glass-panel-glow" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Emergency SOS Dispatches</span>
              <h2 className="font-mono" style={{ fontSize: '1.8rem', color: '#f87171', marginTop: '6px' }}>
                {incidents.filter(i => !i.resolved).length} Active
              </h2>
              <span className="badge badge-danger" style={{ marginTop: '4px' }}>
                PCR Response &lt; 4.2 Mins
              </span>
            </div>
            <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              <ShieldAlert size={24} color="#f87171" className="pulse-emergency" />
            </div>
          </div>
        </div>

      </div>

      {/* Main Grid: Interactive India Fleet Map & Emergency Ticker */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        
        {/* Interactive India Map Panel */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={20} color="#60a5fa" />
                India Pan-National Operations View
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                Select state transport corporation to inspect live fleet clusters
              </p>
            </div>
            <span className="badge badge-info" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Radio size={12} className="pulse-emergency" />
              Live PostGIS Geospatial Feed
            </span>
          </div>

          {/* Interactive State Selector Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '10px', marginBottom: '20px' }}>
            {stateData.map(st => (
              <button
                key={st.code}
                onClick={() => setSelectedState(st.code)}
                style={{
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: selectedState === st.code ? '1px solid #3b82f6' : '1px solid var(--border-color)',
                  background: selectedState === st.code ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.02)',
                  color: selectedState === st.code ? '#60a5fa' : 'var(--text-main)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{st.code} • {st.stc}</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, marginTop: '2px' }}>{st.name}</div>
                <div className="font-mono" style={{ fontSize: '0.75rem', color: '#34d399', marginTop: '2px' }}>{st.buses.toLocaleString()} Buses</div>
              </button>
            ))}
          </div>

          {/* Map Visualizer Display Box */}
          <div style={{ 
            flex: 1, 
            minHeight: '340px', 
            background: 'radial-gradient(circle at 50% 50%, #0f172a 0%, #090d16 100%)', 
            borderRadius: '14px', 
            border: '1px solid var(--border-color)', 
            position: 'relative', 
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            {/* Grid overlay lines */}
            <div style={{ 
              position: 'absolute', inset: 0, 
              backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }} />

            <div style={{ zIndex: 10, textAlign: 'center', width: '100%', maxWidth: '500px' }}>
              <div className="glass-panel" style={{ padding: '20px', backdropFilter: 'blur(20px)', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span className="badge badge-purple">{activeStateObj.stc}</span>
                  <span style={{ fontSize: '1rem', fontWeight: 700, color: 'white' }}>{activeStateObj.name} Command Sector</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', textAlign: 'center' }}>
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Active Fleet</div>
                    <div className="font-mono" style={{ fontSize: '1.1rem', color: '#60a5fa', fontWeight: 700 }}>
                      {activeStateObj.buses.toLocaleString()}
                    </div>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Daily Riders</div>
                    <div className="font-mono" style={{ fontSize: '1.1rem', color: '#34d399', fontWeight: 700 }}>
                      {activeStateObj.passengers}
                    </div>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Daily Revenue</div>
                    <div className="font-mono" style={{ fontSize: '1.1rem', color: '#fbbf24', fontWeight: 700 }}>
                      {activeStateObj.revenue}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '16px', fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '8px' }}>
                  <span>IoT Telemetry Pulse: <strong style={{ color: '#34d399' }}>99.8% Signal</strong></span>
                  <span>AI Fraud Index: <strong style={{ color: '#f87171' }}>1.4% Low</strong></span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Live Emergency SOS & Fraud Ticker Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="glass-panel" style={{ padding: '20px', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '1rem', color: '#f87171', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldAlert size={18} className="pulse-emergency" />
                Live Incident Dispatch
              </h3>
              <span className="badge badge-danger">High Priority</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '420px', overflowY: 'auto' }}>
              {incidents.map((inc) => (
                <div 
                  key={inc.id} 
                  style={{ 
                    background: inc.resolved ? 'rgba(255,255,255,0.02)' : 'rgba(239, 68, 68, 0.08)',
                    border: inc.resolved ? '1px solid var(--border-color)' : '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '12px',
                    padding: '12px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="font-mono" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f87171' }}>
                      {inc.busReg}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{inc.time}</span>
                  </div>

                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'white', marginTop: '4px' }}>
                    {inc.type}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    📍 {inc.location} ({inc.stc})
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                    {inc.resolved ? (
                      <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>
                        <CheckCircle2 size={10} /> Dispatched & Resolved
                      </span>
                    ) : (
                      <>
                        <span className="badge badge-warning" style={{ fontSize: '0.65rem' }}>
                          PCR Alert Sent
                        </span>
                        <button
                          onClick={() => handleResolveAlert(inc.id)}
                          className="btn-danger"
                          style={{ padding: '4px 10px', fontSize: '0.7rem', borderRadius: '6px' }}
                        >
                          Resolve Unit
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* STC Rankings & Analytics Overview Table */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', color: 'white', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Building2 size={18} color="#60a5fa" />
          State Transport Corporation (STC) Performance Matrix
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px' }}>State / STC</th>
                <th style={{ padding: '12px' }}>Total Fleet</th>
                <th style={{ padding: '12px' }}>Daily Passengers</th>
                <th style={{ padding: '12px' }}>Daily Revenue</th>
                <th style={{ padding: '12px' }}>IoT Online Rate</th>
                <th style={{ padding: '12px' }}>AI Fraud Flag Rate</th>
                <th style={{ padding: '12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {stateData.map((st) => (
                <tr key={st.code} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '12px', fontWeight: 600, color: 'white' }}>
                    {st.name} <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>({st.stc})</span>
                  </td>
                  <td className="font-mono" style={{ padding: '12px', color: '#60a5fa' }}>{st.buses.toLocaleString()}</td>
                  <td className="font-mono" style={{ padding: '12px', color: '#34d399' }}>{st.passengers}</td>
                  <td className="font-mono" style={{ padding: '12px', color: '#fbbf24' }}>{st.revenue}</td>
                  <td className="font-mono" style={{ padding: '12px', color: '#34d399' }}>99.6%</td>
                  <td className="font-mono" style={{ padding: '12px', color: st.fraudRate > 2.0 ? '#f87171' : '#34d399' }}>
                    {st.fraudRate}%
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span className="badge badge-success">OPTIMAL</span>
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
