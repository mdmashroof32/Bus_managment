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
  HeartHandshake,
  IndianRupee,
  Database,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import { delhiStats } from '../data/delhiTransportData';

export default function Header({ activeTab, setActiveTab, isAdminAuthenticated, onAdminLogout }) {
  const tabs = [
    { id: 'admin-login', label: 'Admin Login', icon: ShieldCheck, badge: 'ADMIN' },
    { id: 'master-admin', label: 'Admin Dashboard', icon: Sliders },
    { id: 'revenue', label: 'Revenue & Fare', icon: IndianRupee, badge: 'FINANCE' },
    { id: 'dtc-fleet', label: 'Fleet & Depots', icon: Bus },
    { id: 'one-delhi', label: 'User Dashboard', icon: Smartphone, badge: 'USER' },
    { id: 'driver', label: 'Driver Terminal', icon: MapPin },
    { id: 'conductor', label: 'Conductor Dashboard', icon: CreditCard, badge: 'STAFF' },
    { id: 'iot-ai', label: 'AI Vision & IoT', icon: Cpu, badge: 'AI' },
    { id: 'database', label: 'DB & SQL Workbench', icon: Database, badge: 'SQL' },
    { id: 'architecture', label: 'System Specs', icon: Code2 },
  ];

  return (
    <header style={{
      background: '#ffffff',
      borderBottom: '1px solid var(--border-color)',
      padding: '16px 24px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'linear-gradient(135deg, #dc2626 0%, #2563eb 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(37, 99, 235, 0.2)' }}>
              <Bus size={24} color="#ffffff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '1.2rem', color: '#0f172a', margin: 0, letterSpacing: '-0.01em', fontWeight: 800 }}>
                  STATE BUS <span style={{ color: '#2563eb' }}>TRANSIT</span>
                </h1>
                <span className="badge badge-success" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Radio size={10} className="pulse-emergency" /> Live GNCTD Network
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                Govt. of NCT of Delhi • Delhi Intelligent Bus Management System
              </p>
            </div>
          </div>

          <div className="header-metrics">
            <div><span>Active Fleet</span><strong className="font-mono" style={{ color: '#2563eb' }}>{delhiStats.activeBuses.toLocaleString()} Buses</strong></div>
            <div className="header-metric-divider" />
            <div><span>Electric EV Fleet</span><strong className="font-mono" style={{ color: '#16a34a' }}>{delhiStats.electricEVBuses.toLocaleString()} EVs</strong></div>
            <div className="header-metric-divider" />
            <div><span>Pink Passes Today</span><strong className="font-mono" style={{ color: '#db2777' }}>{delhiStats.pinkPassIssuedToday}</strong></div>
            <div className="header-metric-divider" />
            <div><span>Delhi AQI</span><strong className="badge badge-warning">{delhiStats.aqiDelhi} AQI</strong></div>
          </div>
        </div>

        <nav className="app-navigation" aria-label="Main navigation">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setActiveTab(tab.id)}
                className={`app-navigation-tab${isActive ? ' active' : ''}`}
                type="button"
              >
                <Icon size={16} /> {tab.label}
                {tab.badge && <span className={`nav-badge ${tab.badge === 'ADMIN' ? 'admin' : tab.badge === 'AI' ? 'ai' : ''}`}>{tab.badge}</span>}
              </button>
            );
          })}
          {isAdminAuthenticated && (
            <button className="app-navigation-tab nav-logout" onClick={onAdminLogout} type="button">
              <LogOut size={16} /> Sign out
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
