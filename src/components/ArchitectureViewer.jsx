import React, { useState } from 'react';
import { 
  Code2, 
  Database, 
  Layers, 
  Server, 
  FileText, 
  Copy, 
  Check, 
  Cpu, 
  Radio, 
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function ArchitectureViewer() {
  const [activeSubTab, setActiveSubTab] = useState('microservices');
  const [copied, setCopied] = useState(false);

  const microserviceSpec = `1. API Gateway Service (Kong / Envoy)
   - Port: 443 (HTTPS / gRPC)
   - Handles SSL termination, Rate limiting (20,000 req/sec), JWT validation
   
2. Auth & IAM Service (Go / Keycloak)
   - Aadhaar DigiLocker SSO integration
   - OAuth2 Bearer Tokens & Role-Based Access Control (RBAC)

3. Bus & Fleet Tracking Service (Go)
   - Ingests IoT GPS telemetry from Kafka broker topics (5s heartbeat)
   - Redis Geospatial indexing (GEOADD / GEORADIUS) for sub-second spatial queries

4. Route & Schedule Service (Java Spring Boot)
   - GTFS & GTFS-Realtime static and dynamic route geometry
   - Stop-level ETA estimation engine using historical traffic patterns

5. Ticket & Reservation Service (Java)
   - Distributed locking via Redis Redlock algorithm for concurrency
   - Transactional seat reservation engine with ACID compliance

6. AI Telemetry & Vision Service (Python FastAPI)
   - Overhead camera passenger counting validation
   - Fraud detection algorithm matching passenger delta against POS ticket count

7. Emergency SOS & Incident Management (Go)
   - High priority queue execution broadcasting to Police Control Rooms (PCR 112)`;

  const sqlDDL = `-- PostgreSQL + PostGIS Core DDL Schema for DTC Bus Transit Engine
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Fleet Master (Buses)
CREATE TABLE buses (
    bus_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    registration_number VARCHAR(20) UNIQUE NOT NULL,
    corporation_code VARCHAR(10) NOT NULL, -- e.g. DTC, DIMTS
    seating_capacity INT NOT NULL,
    standing_capacity INT NOT NULL,
    iot_device_id VARCHAR(50) UNIQUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- TimescaleDB Telemetry Logs Hypertable
CREATE TABLE bus_telemetry_logs (
    recorded_at TIMESTAMP WITH TIME ZONE NOT NULL,
    bus_id UUID NOT NULL,
    location GEOMETRY(Point, 4326) NOT NULL,
    speed_kmh NUMERIC(5,2),
    ai_passenger_count INT,
    driver_fatigue_alert BOOLEAN DEFAULT FALSE,
    panic_button_pressed BOOLEAN DEFAULT FALSE
);
SELECT create_hypertable('bus_telemetry_logs', 'recorded_at');`;

  const k8sManifest = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: dtc-gps-tracking-service
  namespace: dtc-production
spec:
  replicas: 10
  selector:
    matchLabels:
      app: gps-tracking
  template:
    metadata:
      labels:
        app: gps-tracking
    spec:
      containers:
      - name: gps-tracking-app
        image: registry.dtc.delhi.gov.in/core/gps-service:v2.1.0
        resources:
          limits:
            cpu: "2"
            memory: "4Gi"
          requests:
            cpu: "500m"
            memory: "1Gi"`;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ padding: '12px', borderRadius: '12px', background: '#eff6ff', border: '1px solid #bfdbfe' }}>
            <Code2 size={26} color="#2563eb" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.2rem', color: '#0f172a', margin: 0, fontWeight: 800 }}>
              System Blueprint &amp; Architecture Inspector
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0, marginTop: '2px' }}>
              Microservices specifications, PostgreSQL schema DDL, and Kubernetes deployments
            </p>
          </div>
        </div>

        <span className="badge badge-info font-mono">DTC Spec v2.4</span>
      </div>

      {/* Sub Tabs */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveSubTab('microservices')}
          className={activeSubTab === 'microservices' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.85rem' }}
        >
          <Server size={16} /> Microservices Architecture
        </button>
        <button
          onClick={() => setActiveSubTab('sql')}
          className={activeSubTab === 'sql' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.85rem' }}
        >
          <Database size={16} /> PostgreSQL &amp; PostGIS DDL
        </button>
        <button
          onClick={() => setActiveSubTab('k8s')}
          className={activeSubTab === 'k8s' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.85rem' }}
        >
          <Layers size={16} /> Kubernetes Manifests
        </button>
      </div>

      {/* Code Inspector Box (Light Theme) */}
      <div className="glass-panel" style={{ padding: '24px', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
            {activeSubTab === 'microservices' && 'Microservices Component Architecture (gRPC / REST)'}
            {activeSubTab === 'sql' && 'PostgreSQL / PostGIS & TimescaleDB Core DDL'}
            {activeSubTab === 'k8s' && 'Production Kubernetes Deployment (k8s)'}
          </span>

          <button
            onClick={() => handleCopy(activeSubTab === 'microservices' ? microserviceSpec : activeSubTab === 'sql' ? sqlDDL : k8sManifest)}
            className="btn-secondary"
            style={{ padding: '6px 12px', fontSize: '0.75rem' }}
          >
            {copied ? <Check size={14} color="#16a34a" /> : <Copy size={14} />}
            {copied ? 'Copied' : 'Copy Code'}
          </button>
        </div>

        <pre className="font-mono" style={{ 
          background: '#f8fafc', 
          color: '#0f172a', 
          padding: '20px', 
          borderRadius: '12px', 
          fontSize: '0.82rem', 
          overflowX: 'auto', 
          lineHeight: '1.7',
          border: '1px solid var(--border-color)'
        }}>
          {activeSubTab === 'microservices' && microserviceSpec}
          {activeSubTab === 'sql' && sqlDDL}
          {activeSubTab === 'k8s' && k8sManifest}
        </pre>
      </div>

    </div>
  );
}
