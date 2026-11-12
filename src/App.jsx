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

  const handleNavigation = (tab) => {
    if (tab === 'master-admin' && !isAdminAuthenticated) {
      setActiveTab('admin-login');
      return;
    }
    setActiveTab(tab);
  };

  const handleAdminLogin = () => {
    // Demo-only access state; this is not authentication or authorization.
    setIsAdminAuthenticated(true);
    setActiveTab('master-admin');
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setActiveTab('admin-login');
  };

  return (
    <div className="app-container">
      <Header
        activeTab={activeTab}
        setActiveTab={handleNavigation}
        isAdminAuthenticated={isAdminAuthenticated}
        onAdminLogout={handleAdminLogout}
      />

      <main className="main-content">
        {activeTab === 'admin-login' && <AdminLogin onLogin={handleAdminLogin} />}
        {activeTab === 'master-admin' && isAdminAuthenticated && (
          <DelhiMasterAdmin />
        )}
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
