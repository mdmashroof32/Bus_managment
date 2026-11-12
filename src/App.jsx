import React, { useState } from 'react';
import Header from './components/Header';
import DelhiMasterAdmin from './components/DelhiMasterAdmin';
import RevenueAnalytics from './components/RevenueAnalytics';
import StateDashboard from './components/StateDashboard';
import RoleDashboard from './components/RoleDashboard';
import DriverApp from './components/DriverApp';
import SmartBusIoTAndAI from './components/SmartBusIoTAndAI';
import ArchitectureViewer from './components/ArchitectureViewer';
import DatabaseManager from './components/DatabaseManager';
import AdminLogin from './components/AdminLogin';

export default function App() {
  const [activeTab, setActiveTab] = useState('admin-login');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const handleAdminLogin = () => {
    // Demo-only access state; production access must be verified by a server.
    setIsAdminAuthenticated(true);
    setActiveTab('master-admin');
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setActiveTab('admin-login');
  };

  if (!isAdminAuthenticated) {
    return (
      <div className="app-container">
        <AdminLogin onLogin={handleAdminLogin} />
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
        {activeTab === 'iot-ai' && <SmartBusIoTAndAI />}
        {activeTab === 'database' && <DatabaseManager />}
        {activeTab === 'architecture' && <ArchitectureViewer />}
      </main>
    </div>
  );
}
