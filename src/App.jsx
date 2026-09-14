import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DelhiMasterAdmin from './components/DelhiMasterAdmin';
import RevenueAnalytics from './components/RevenueAnalytics';
import StateDashboard from './components/StateDashboard';
import PassengerApp from './components/PassengerApp';
import DriverApp from './components/DriverApp';
import ConductorApp from './components/ConductorApp';
import SmartBusIoTAndAI from './components/SmartBusIoTAndAI';
import ArchitectureViewer from './components/ArchitectureViewer';
import DatabaseManager from './components/DatabaseManager';

export default function App() {
  const [activeTab, setActiveTab] = useState('master-admin');

  // Active Incident State
  const [incidents, setIncidents] = useState([
    { id: 'inc-1', busReg: 'DL-01-GC-3380', stc: 'DTC Kashmere Gate', type: 'TICKET FRAUD DELTA (+5 PASSENGERS)', location: 'Kashmere Gate ISBT, Delhi', time: '2 Mins Ago', resolved: false },
    { id: 'inc-2', busReg: 'DL-01-PC-2045', stc: 'DTC Sukhdev Vihar', type: 'PASSENGER SOS PANIC BUTTON', location: 'AIIMS Metro Station Bus Stop', time: '6 Mins Ago', resolved: false },
    { id: 'inc-3', busReg: 'DL-01-PC-1001', stc: 'DTC Millennium Park', type: 'DRIVER FATIGUE EYE ASPECT RATIO (EAR < 0.18)', location: 'Laxmi Nagar Flyover', time: '12 Mins Ago', resolved: true }
  ]);

  return (
    <div className="app-container">
      {/* Official Delhi Transport Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Main Active View */}
      <main className="main-content">
        {activeTab === 'master-admin' && (
          <DelhiMasterAdmin 
            incidents={incidents} 
            setIncidents={setIncidents} 
          />
        )}

        {activeTab === 'revenue' && (
          <RevenueAnalytics />
        )}

        {activeTab === 'dtc-fleet' && (
          <StateDashboard />
        )}

        {activeTab === 'one-delhi' && (
          <PassengerApp />
        )}

        {activeTab === 'driver' && (
          <DriverApp />
        )}

        {activeTab === 'conductor' && (
          <ConductorApp />
        )}

        {activeTab === 'iot-ai' && (
          <SmartBusIoTAndAI />
        )}

        {activeTab === 'database' && (
          <DatabaseManager />
        )}

        {activeTab === 'architecture' && (
          <ArchitectureViewer />
        )}
      </main>
    </div>
  );
}
