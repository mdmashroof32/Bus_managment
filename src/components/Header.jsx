import React from 'react';
import { 
  Bus, 
  Smartphone, 
  Cpu, 
  MapPin, 
  Code2, 
  Radio, 
  Sliders,
  CreditCard,
  Zap,
  HeartHandshake,
  Layers,
  Activity,
  IndianRupee,
  Database
} from 'lucide-react';
import { delhiStats } from '../data/delhiTransportData';

export default function Header({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'master-admin', label: 'Admin Command', icon: Sliders, badge: 'ADMIN' },
    { id: 'revenue', label: 'Revenue & Fare', icon: IndianRupee, badge: 'FINANCE' },
    { id: 'dtc-fleet', label: 'Fleet & Depots', icon: Bus },
    { id: 'one-delhi', label: 'Passenger App', icon: Smartphone, badge: 'PASSENGER' },
    { id: 'driver', label: 'Driver Terminal', icon: MapPin },
    { id: 'conductor', label: 'Conductor POS', icon: CreditCard },
    { id: 'iot-ai', label: 'AI Vision & IoT', icon: Cpu, badge: 'AI' },
    { id: 'database', label: 'DB & SQL Workbench', icon: Database, badge: 'SQL' },
    { id: 'architecture', label: 'System Specs', icon: Code2 }
  ];

  return (
    <header style={{ 
      background: '#ffffff', 
      borderBottom: '1px solid var(--border-color)', 
      padding: '16px 24px', 
      position: 'sticky', 
      top: 0, 
      zIndex: 100,
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)'
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        
        {/* Top Branding & Real-time Live Counters */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          
          {/* Delhi State Transport Brand & Seal */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '44px', 
              height: '44px', 
              borderRadius: '10px', 
              background: 'linear-gradient(135deg, #dc2626 0%, #2563eb 100%)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(37, 99, 235, 0.2)'
            }}>
              <Bus size={24} color="#ffffff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ fontSize: '1.2rem', color: '#0f172a', margin: 0, letterSpacing: '-0.01em', fontWeight: 800 }}>
                  STATE BUS <span style={{ color: '#2563eb' }}>TRANSIT</span>
                </h1>
                <span className="badge badge-success" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Radio size={10} className="pulse-emergency" />
                  Live GNCTD Network
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                Govt. of NCT of Delhi • Delhi Intelligent Bus Management System
              </p>
            </div>
          </div>

          {/* Metric Overview Strip */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px', 
            background: '#f8fafc', 
            padding: '8px 16px', 
            borderRadius: '12px', 
            border: '1px solid var(--border-color)',
            flexWrap: 'wrap'
          }}>
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', fontWeight: 500 }}>Active Fleet</span>
              <strong className="font-mono" style={{ fontSize: '0.9rem', color: '#2563eb' }}>{delhiStats.activeBuses.toLocaleString()} Buses</strong>
            </div>
            <div style={{ width: '1px', height: '22px', background: 'var(--border-color)' }} />
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', fontWeight: 500 }}>Electric EV Fleet</span>
              <strong className="font-mono" style={{ fontSize: '0.9rem', color: '#16a34a' }}>{delhiStats.electricEVBuses.toLocaleString()} EVs</strong>
            </div>
            <div style={{ width: '1px', height: '22px', background: 'var(--border-color)' }} />
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', fontWeight: 500 }}>Pink Passes Today</span>
              <strong className="font-mono" style={{ fontSize: '0.9rem', color: '#db2777' }}>{delhiStats.pinkPassIssuedToday}</strong>
            </div>
            <div style={{ width: '1px', height: '22px', background: 'var(--border-color)' }} />
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', fontWeight: 500 }}>Delhi AQI</span>
              <span className="badge badge-warning">{delhiStats.aqiDelhi} AQI</span>
            </div>
            <div style={{ width: '1px', height: '22px', background: 'var(--border-color)' }} />
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', fontWeight: 500 }}>Database</span>
              <span className="badge badge-success" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Database size={10} /> IndexedDB SQL
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          marginTop: '14px', 
          overflowX: 'auto', 
          paddingBottom: '2px' 
        }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  border: isActive ? '1px solid #3b82f6' : '1px solid #e2e8f0',
                  background: isActive ? '#eff6ff' : '#ffffff',
                  color: isActive ? '#1d4ed8' : '#475569',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 1px 3px rgba(37, 99, 235, 0.12)' : 'none'
                }}
              >
                <Icon size={16} color={isActive ? '#2563eb' : '#64748b'} />
                {tab.label}
                {tab.badge && (
                  <span style={{
                    fontSize: '0.65rem',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: tab.badge === 'ADMIN' ? '#fee2e2' : tab.badge === 'AI' ? '#f3e8ff' : '#e0f2fe',
                    color: tab.badge === 'ADMIN' ? '#b91c1c' : tab.badge === 'AI' ? '#7e22ce' : '#0369a1',
                    fontWeight: 700
                  }}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
