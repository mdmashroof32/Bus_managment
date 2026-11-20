import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import Header from './components/Header';
import DelhiMasterAdmin from './components/DelhiMasterAdmin';
import RevenueAnalytics from './components/RevenueAnalytics';
import StateDashboard from './components/StateDashboard';
import RoleDashboard from './components/RoleDashboard';
import DriverApp from './components/DriverApp';
import SmartBusIoTAndAI from './components/SmartBusIoTAndAI';
import PassengerVision from './components/PassengerVision';
import ArchitectureViewer from './components/ArchitectureViewer';
import DatabaseManager from './components/DatabaseManager';
import AdminLogin from './components/AdminLogin';
import ConductorLogin from './components/ConductorLogin';

function ConductorWorkspace({ onLogout }) {
  return (
    <div className="app-container conductor-workspace">
      <header className="conductor-workspace-header">
        <div className="conductor-workspace-brand">
          <span className="conductor-workspace-mark">DTC</span>
          <div>
            <strong>DELHI TRANSIT CONTROL</strong>
            <span>Conductor staff portal</span>
          </div>
        </div>
        <span className="conductor-workspace-route">ROUTE 534-A · ON DUTY</span>
        <button className="conductor-workspace-logout" onClick={onLogout} type="button">
          <LogOut size={16} /> Sign out
        </button>
      </header>
      <main className="main-content conductor-workspace-main">
        <RoleDashboard role="conductor" />
      </main>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('admin-login');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [portal, setPortal] = useState('admin');
  const [isConductorAuthenticated, setIsConductorAuthenticated] = useState(false);

  const handleAdminLogin = () => {
    // Demo-only access state; production access must be verified by a server.
    setIsAdminAuthenticated(true);
    setActiveTab('master-admin');
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setActiveTab('admin-login');
  };

  const handleConductorLogout = () => {
    setIsConductorAuthenticated(false);
  };

  if (portal === 'conductor') {
    if (isConductorAuthenticated) {
      return <ConductorWorkspace onLogout={handleConductorLogout} />;
    }

    return (
      <div className="app-container">
        <ConductorLogin
          onLogin={() => setIsConductorAuthenticated(true)}
          onBack={() => setPortal('admin')}
        />
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    return (
      <div className="app-container">
        <AdminLogin onLogin={handleAdminLogin} onConductorLogin={() => setPortal('conductor')} />
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAdminAuthenticated={isAdminAuthenticated}
        onAdminLogout={handleAdminLogout}
      />

      <main className="main-content">
        {activeTab === 'master-admin' && <DelhiMasterAdmin />}
        {activeTab === 'revenue' && <RevenueAnalytics />}
        {activeTab === 'dtc-fleet' && <StateDashboard />}
        {activeTab === 'one-delhi' && <RoleDashboard role="user" />}
        {activeTab === 'driver' && <DriverApp />}
        {activeTab === 'conductor' && <RoleDashboard role="conductor" />}
        {activeTab === 'iot-ai' && <><SmartBusIoTAndAI /><PassengerVision /></>}
        {activeTab === 'database' && <DatabaseManager />}
        {activeTab === 'architecture' && <ArchitectureViewer />}
      </main>
    </div>
  );
}
