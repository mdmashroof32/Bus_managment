-- ============================================================================
-- DELHI TRANSPORT CORPORATION (DTC) & DIMTS ENTERPRISE DATABASE SCHEMA
-- PostgreSQL + PostGIS / SQLite Compatible DDL Specification
-- Version: 2.4.0 Production Release
-- ============================================================================

-- 1. EXTENSIONS (PostgreSQL only)
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- CREATE EXTENSION IF NOT EXISTS "postgis";

-- 2. DEPOTS MASTER TABLE
CREATE TABLE IF NOT EXISTS depots (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    total_buses INT DEFAULT 0,
    ev_chargers INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'OPTIMAL',
    location VARCHAR(200),
    latitude DECIMAL(10, 6) NOT NULL,
    longitude DECIMAL(10, 6) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. BUS ROUTES MASTER TABLE
CREATE TABLE IF NOT EXISTS routes (
    code VARCHAR(20) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    color VARCHAR(20) DEFAULT '#2563eb',
    via VARCHAR(255),
    distance_km DECIMAL(6, 2) NOT NULL,
    active_buses INT DEFAULT 0,
    frequency_mins INT DEFAULT 5,
    coordinates JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. BUS FLEET MASTER TABLE
CREATE TABLE IF NOT EXISTS buses (
    id VARCHAR(50) PRIMARY KEY,
    reg_no VARCHAR(20) UNIQUE NOT NULL,
    depot_id VARCHAR(50) REFERENCES depots(id),
    depot_name VARCHAR(100),
    bus_type VARCHAR(100) NOT NULL, -- e.g., TATA STARBUS ELECTRIC EV, LOW FLOOR CNG AC
    route_code VARCHAR(20) REFERENCES routes(code),
    route_name VARCHAR(200),
    driver_name VARCHAR(100),
    speed_kmh INT DEFAULT 0,
    occupancy INT DEFAULT 0,
    capacity INT DEFAULT 55,
    battery_soc VARCHAR(20),
    next_stop VARCHAR(150),
    fatigue_score DECIMAL(4, 2) DEFAULT 0.10,
    status VARCHAR(50) DEFAULT 'ON_ROUTE', -- ON_ROUTE, CHARGING, FRAUD_FLAG, MAINTENANCE
    latitude DECIMAL(10, 6),
    longitude DECIMAL(10, 6),
    heading VARCHAR(50),
    is_ev BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. TICKETING & PASSENGER FARE TRANSACTIONS TABLE
CREATE TABLE IF NOT EXISTS tickets (
    ticket_id VARCHAR(50) PRIMARY KEY,
    bus_id VARCHAR(50) REFERENCES buses(id),
    route_code VARCHAR(20) REFERENCES routes(code),
    passenger_type VARCHAR(50) NOT NULL, -- ADULT, CHILD, PINK_PASS_FEMALE, SENIOR
    fare_amount DECIMAL(8, 2) DEFAULT 0.00,
    payment_mode VARCHAR(50) DEFAULT 'ONE_DELHI_CARD', -- ONE_DELHI_CARD, UPI_QR, CASH, PINK_PASS
    source_stop VARCHAR(100),
    destination_stop VARCHAR(100),
    is_pink_pass BOOLEAN DEFAULT FALSE,
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. INCIDENTS & SAFETY ALERTS TABLE
CREATE TABLE IF NOT EXISTS incidents (
    id VARCHAR(50) PRIMARY KEY,
    bus_reg VARCHAR(20) NOT NULL,
    stc VARCHAR(100) NOT NULL,
    incident_type VARCHAR(100) NOT NULL, -- TICKET FRAUD, SOS PANIC, DRIVER FATIGUE, OVERSEEDING
    location VARCHAR(200),
    time_label VARCHAR(50),
    resolved BOOLEAN DEFAULT FALSE,
    severity VARCHAR(20) DEFAULT 'HIGH',
    reported_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. IOT TELEMETRY & AI VISION LOGS TABLE (TimescaleDB / Hypertable Target)
CREATE TABLE IF NOT EXISTS bus_telemetry_logs (
    log_id VARCHAR(50) PRIMARY KEY,
    bus_id VARCHAR(50) REFERENCES buses(id),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    latitude DECIMAL(10, 6),
    longitude DECIMAL(10, 6),
    speed_kmh INT,
    ai_passenger_count INT,
    ticket_pos_count INT,
    passenger_delta INT,
    driver_ear_score DECIMAL(4, 2), -- Eye Aspect Ratio for drowsiness
    panic_button_pressed BOOLEAN DEFAULT FALSE
);

-- 8. DAILY REVENUE & SYSTEM STATS SUMMARY
CREATE TABLE IF NOT EXISTS revenue_summaries (
    id VARCHAR(50) PRIMARY KEY,
    summary_date DATE NOT NULL,
    total_active_buses INT,
    total_passengers INT,
    total_revenue_inr DECIMAL(12, 2),
    pink_passes_issued INT,
    pink_pass_subsidy_inr DECIMAL(12, 2),
    aqi_index INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INDEXES FOR FAST GEOSPATIAL & ANALYTICS LOOKUPS
CREATE INDEX IF NOT EXISTS idx_buses_depot ON buses(depot_id);
CREATE INDEX IF NOT EXISTS idx_buses_route ON buses(route_code);
CREATE INDEX IF NOT EXISTS idx_buses_status ON buses(status);
CREATE INDEX IF NOT EXISTS idx_tickets_bus ON tickets(bus_id);
CREATE INDEX IF NOT EXISTS idx_tickets_issued ON tickets(issued_at);
CREATE INDEX IF NOT EXISTS idx_incidents_resolved ON incidents(resolved);
CREATE INDEX IF NOT EXISTS idx_telemetry_bus ON bus_telemetry_logs(bus_id, recorded_at);
