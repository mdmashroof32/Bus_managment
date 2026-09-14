import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Bus, 
  MapPin, 
  Layers, 
  Navigation, 
  Zap, 
  Radio, 
  ShieldAlert, 
  Eye, 
  Maximize2, 
  RotateCcw,
  CheckCircle,
  Building2,
  Filter
} from 'lucide-react';
import { delhiDepots, delhiRoutes, delhiBusFleet } from '../data/delhiTransportData';

export default function LiveDelhiMap({ height = '460px', showControls = true, selectedBusId = null, onSelectBus = null }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({ buses: {}, depots: {}, routes: {} });

  const [buses, setBuses] = useState(delhiBusFleet);
  const [showBuses, setShowBuses] = useState(true);
  const [showDepots, setShowDepots] = useState(true);
  const [showRoutes, setShowRoutes] = useState(true);
  const [activeRouteFilter, setActiveRouteFilter] = useState('ALL');
  const [focusedEntity, setFocusedEntity] = useState(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Check if map already initialized
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    // Initialize Leaflet map centered at New Delhi (Connaught Place)
    const map = L.map(mapContainerRef.current, {
      center: [28.6139, 77.2090],
      zoom: 11,
      zoomControl: true,
      attributionControl: false
    });

    // Light CartoDB Voyager Tile Layer (Crisp, modern, high-contrast light map)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd'
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Render Routes (Polylines)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear previous route layers
    Object.values(markersRef.current.routes).forEach(layer => map.removeLayer(layer));
    markersRef.current.routes = {};

    if (!showRoutes) return;

    delhiRoutes.forEach(route => {
      if (activeRouteFilter !== 'ALL' && route.code !== activeRouteFilter) return;

      const polyline = L.polyline(route.coordinates, {
        color: route.color || '#2563eb',
        weight: 4,
        opacity: 0.85,
        dashArray: route.code === 'RING-SEWA' ? '6, 8' : undefined
      }).addTo(map);

      polyline.bindTooltip(`<strong>Route ${route.code}</strong><br/>${route.name}`, {
        sticky: true,
        className: 'leaflet-tooltip-custom'
      });

      markersRef.current.routes[route.code] = polyline;
    });
  }, [showRoutes, activeRouteFilter]);

  // Render Depots
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear previous depot markers
    Object.values(markersRef.current.depots).forEach(marker => map.removeLayer(marker));
    markersRef.current.depots = {};

    if (!showDepots) return;

    delhiDepots.forEach(depot => {
      const depotIcon = L.divIcon({
        className: 'custom-depot-marker',
        html: `
          <div style="
            background: #ffffff;
            border: 2px solid #7c3aed;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(124, 58, 237, 0.3);
            cursor: pointer;
          ">
            <span style="font-size: 14px;">🏢</span>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker([depot.lat, depot.lng], { icon: depotIcon }).addTo(map);

      marker.bindPopup(`
        <div style="font-family: var(--font-sans); padding: 4px; min-width: 180px;">
          <div style="font-weight: 800; color: #0f172a; font-size: 0.9rem;">${depot.name}</div>
          <div style="font-size: 0.75rem; color: #64748b; margin-top: 2px;">📍 ${depot.location}</div>
          <div style="display: flex; gap: 8px; margin-top: 8px; font-size: 0.75rem;">
            <span style="background: #eff6ff; color: #1d4ed8; padding: 2px 6px; border-radius: 4px; font-weight: 700;">${depot.totalBuses} Buses</span>
            <span style="background: #f0fdf4; color: #15803d; padding: 2px 6px; border-radius: 4px; font-weight: 700;">⚡ ${depot.evChargers} EV Ports</span>
          </div>
        </div>
      `);

      markersRef.current.depots[depot.id] = marker;
    });
  }, [showDepots]);

  // Render & Update Live Buses
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear previous bus markers
    Object.values(markersRef.current.buses).forEach(marker => map.removeLayer(marker));
    markersRef.current.buses = {};

    if (!showBuses) return;

    buses.forEach(bus => {
      if (activeRouteFilter !== 'ALL' && bus.routeCode !== activeRouteFilter) return;

      const isAlert = bus.status === 'FRAUD_FLAG';
      const isEV = bus.isEV;
      const markerColor = isAlert ? '#dc2626' : isEV ? '#16a34a' : '#2563eb';
      const borderColor = isAlert ? '#fee2e2' : isEV ? '#dcfce7' : '#dbeafe';

      const busIcon = L.divIcon({
        className: 'custom-bus-marker',
        html: `
          <div style="
            background: #ffffff;
            border: 3px solid ${markerColor};
            border-radius: 20px;
            padding: 4px 8px;
            display: flex;
            align-items: center;
            gap: 4px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            font-family: var(--font-sans);
            cursor: pointer;
            white-space: nowrap;
            transform: scale(0.95);
            transition: transform 0.2s ease;
          ">
            <div style="
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: ${markerColor};
            "></div>
            <strong style="font-size: 11px; color: #0f172a;">${bus.regNo.split('-').slice(2).join('-') || bus.regNo}</strong>
            <span style="font-size: 9px; font-weight: 700; color: ${markerColor};">${bus.speed}k</span>
          </div>
        `,
        iconSize: [70, 26],
        iconAnchor: [35, 13]
      });

      const marker = L.marker([bus.lat, bus.lng], { icon: busIcon }).addTo(map);

      marker.on('click', () => {
        setFocusedEntity(bus);
        if (onSelectBus) onSelectBus(bus);
      });

      marker.bindPopup(`
        <div style="font-family: var(--font-sans); padding: 4px; min-width: 220px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="font-size: 0.95rem; color: #0f172a;">${bus.regNo}</strong>
            <span style="font-size: 0.65rem; background: ${isEV ? '#dcfce7' : '#e0f2fe'}; color: ${isEV ? '#15803d' : '#0369a1'}; padding: 2px 6px; border-radius: 4px; font-weight: 700;">
              ${bus.batterySoc}
            </span>
          </div>
          <div style="font-size: 0.8rem; color: #2563eb; font-weight: 700; margin-top: 4px;">
            ${bus.route}
          </div>
          <div style="font-size: 0.75rem; color: #64748b; margin-top: 4px;">
            Driver: <strong>${bus.driver}</strong>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-top: 8px; font-size: 0.75rem; background: #f8fafc; padding: 6px; border-radius: 6px;">
            <div>Next: <strong>${bus.nextStop}</strong></div>
            <div>Speed: <strong style="color: #16a34a;">${bus.speed} km/h</strong></div>
            <div>Seats: <strong>${bus.occupancy}/${bus.capacity}</strong></div>
            <div>Depot: <strong>${bus.depot}</strong></div>
          </div>
        </div>
      `);

      markersRef.current.buses[bus.id] = marker;
    });
  }, [buses, showBuses, activeRouteFilter]);

  // Live GPS Movement Simulation (Simulate realistic movement around Delhi routes)
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses(prevBuses => 
        prevBuses.map(bus => {
          const deltaLat = (Math.random() - 0.48) * 0.0012;
          const deltaLng = (Math.random() - 0.48) * 0.0012;
          const newSpeed = Math.max(20, Math.min(65, bus.speed + Math.floor((Math.random() - 0.5) * 6)));
          return {
            ...bus,
            lat: bus.lat + deltaLat,
            lng: bus.lng + deltaLng,
            speed: newSpeed
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Center navigation handler
  const handleFlyTo = (lat, lng, zoom = 14) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([lat, lng], zoom, { duration: 1.2 });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      
      {/* Map Control Toolbar */}
      {showControls && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '10px',
          background: '#f8fafc',
          padding: '10px 14px',
          borderRadius: '12px',
          border: '1px solid var(--border-color)'
        }}>
          {/* Quick Layer Toggles */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Layers size={14} /> Layers:
            </span>
            <button
              onClick={() => setShowBuses(!showBuses)}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                border: showBuses ? '1px solid #3b82f6' : '1px solid #cbd5e1',
                background: showBuses ? '#eff6ff' : '#ffffff',
                color: showBuses ? '#1d4ed8' : '#64748b',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              🚌 Buses ({buses.length})
            </button>
            <button
              onClick={() => setShowDepots(!showDepots)}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                border: showDepots ? '1px solid #7c3aed' : '1px solid #cbd5e1',
                background: showDepots ? '#f3e8ff' : '#ffffff',
                color: showDepots ? '#7e22ce' : '#64748b',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              🏢 Depots ({delhiDepots.length})
            </button>
            <button
              onClick={() => setShowRoutes(!showRoutes)}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                border: showRoutes ? '1px solid #16a34a' : '1px solid #cbd5e1',
                background: showRoutes ? '#f0fdf4' : '#ffffff',
                color: showRoutes ? '#15803d' : '#64748b',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              🛣️ Route Paths
            </button>
          </div>

          {/* Quick Landmark Centers */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Jump To:</span>
            <button 
              onClick={() => handleFlyTo(28.6139, 77.2090, 12)}
              className="btn-secondary" 
              style={{ padding: '4px 8px', fontSize: '0.72rem' }}
            >
              Central Delhi
            </button>
            <button 
              onClick={() => handleFlyTo(28.5878, 77.2588, 14)}
              className="btn-secondary" 
              style={{ padding: '4px 8px', fontSize: '0.72rem' }}
            >
              Millennium Park
            </button>
            <button 
              onClick={() => handleFlyTo(28.6675, 77.2285, 14)}
              className="btn-secondary" 
              style={{ padding: '4px 8px', fontSize: '0.72rem' }}
            >
              Kashmere Gate
            </button>
            <button 
              onClick={() => handleFlyTo(28.5562, 77.0850, 14)}
              className="btn-secondary" 
              style={{ padding: '4px 8px', fontSize: '0.72rem' }}
            >
              IGI Airport
            </button>
            <button 
              onClick={() => handleFlyTo(28.6469, 77.3155, 14)}
              className="btn-secondary" 
              style={{ padding: '4px 8px', fontSize: '0.72rem' }}
            >
              Anand Vihar
            </button>
          </div>
        </div>
      )}

      {/* Map Display Viewport */}
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        height, 
        borderRadius: '16px', 
        overflow: 'hidden', 
        border: '1px solid var(--border-color)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)'
      }}>
        <div ref={mapContainerRef} style={{ width: '100%', height: '100%', zIndex: 1 }} />

        {/* Live GPS Telemetry Status Pill */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          zIndex: 1000,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
          padding: '6px 12px',
          borderRadius: '9999px',
          border: '1px solid var(--border-color)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: '#15803d'
        }}>
          <Radio size={12} className="pulse-emergency" />
          <span>DTC GNCTD Live GPS • 5s Pulse</span>
        </div>

        {/* Map Legend Floating Widget */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          zIndex: 1000,
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(8px)',
          padding: '8px 12px',
          borderRadius: '10px',
          border: '1px solid var(--border-color)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
          display: 'flex',
          gap: '12px',
          fontSize: '0.72rem',
          fontWeight: 600,
          color: '#0f172a'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#16a34a', display: 'inline-block' }}></span>
            Electric EV Bus
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#2563eb', display: 'inline-block' }}></span>
            CNG AC Bus
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#dc2626', display: 'inline-block' }}></span>
            Over-speed / Mismatch
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            🏢 Depot
          </span>
        </div>
      </div>

    </div>
  );
}
