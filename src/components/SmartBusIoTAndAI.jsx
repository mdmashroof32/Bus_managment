import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Eye, 
  Camera, 
  Radio, 
  Activity, 
  Terminal, 
  Zap, 
  Users, 
  CheckCircle, 
  AlertTriangle,
  Flame
} from 'lucide-react';

export default function SmartBusIoTAndAI() {
  const [peopleEntered, setPeopleEntered] = useState(48);
  const [peopleExited, setPeopleExited] = useState(6);
  const [logs, setLogs] = useState([]);

  // Telemetry stream generator
  useEffect(() => {
    const interval = setInterval(() => {
      const timestamp = new Date().toISOString();
      const newLog = {
        id: Math.random().toString(36).substring(7),
        time: timestamp.split('T')[1].substring(0, 8),
        topic: 'nibms/bus/dl01eq9821/telemetry',
        netCount: peopleEntered - peopleExited,
        lat: (28.6139 + (Math.random() - 0.5) * 0.01).toFixed(4),
        lng: (77.2090 + (Math.random() - 0.5) * 0.01).toFixed(4),
        fatigueStatus: 'NOMINAL'
      };
      setLogs(prev => [newLog, ...prev.slice(0, 6)]);
    }, 2500);

    return () => clearInterval(interval);
  }, [peopleEntered, peopleExited]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top Banner */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ padding: '12px', borderRadius: '12px', background: '#f3e8ff', border: '1px solid #e9d5ff' }}>
            <Cpu size={26} color="#7c3aed" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '1.2rem', color: '#0f172a', margin: 0, fontWeight: 800 }}>
                Smart Bus Edge AI &amp; Vision Telemetry Unit
              </h2>
              <span className="badge badge-purple font-mono">NVIDIA Jetson Orin Nano</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0, marginTop: '2px' }}>
              Real-time deep learning video processing @ 30 FPS • CAN-Bus OBD-II Receiver
            </p>
          </div>
        </div>

        <span className="badge badge-success" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Radio size={12} className="pulse-emergency" /> NavIC GPS Active
        </span>
      </div>

      {/* Main Dual Camera Vision Feeds */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* FRONT DOOR CAMERA - PASSENGER ENTRY / EXIT COUNTER */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '1rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', margin: 0, fontWeight: 700 }}>
              <Camera size={18} color="#0284c7" />
              Front Door Camera AI (YOLOv8 Head Tracker)
            </h3>
            <span className="badge badge-info">30 FPS Stream</span>
          </div>

          <div style={{ 
            height: '240px', 
            background: '#f8fafc', 
            borderRadius: '14px', 
            border: '1px solid #bae6fd',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Simulated Bounding Boxes */}
            <div style={{
              position: 'absolute',
              top: '25%',
              left: '35%',
              width: '64px',
              height: '64px',
              border: '2px solid #0284c7',
              borderRadius: '8px',
              background: 'rgba(2, 132, 199, 0.08)',
              display: 'flex',
              alignItems: 'flex-start',
              padding: '4px',
              fontSize: '0.65rem',
              color: '#0369a1',
              fontWeight: 'bold'
            }}>
              HUMAN 98%
            </div>

            <div style={{
              position: 'absolute',
              top: '45%',
              left: '55%',
              width: '64px',
              height: '64px',
              border: '2px solid #16a34a',
              borderRadius: '8px',
              background: 'rgba(22, 163, 74, 0.08)',
              display: 'flex',
              alignItems: 'flex-start',
              padding: '4px',
              fontSize: '0.65rem',
              color: '#15803d',
              fontWeight: 'bold'
            }}>
              ENTRY 99%
            </div>

            <div style={{ zIndex: 10, textAlign: 'center' }}>
              <Eye size={36} color="#0284c7" style={{ marginBottom: '8px' }} />
              <div style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: 700 }}>OVERHEAD STEREOSCOPIC VISION</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Virtual Entry / Exit Boundary Vectors Active</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginTop: '16px', textAlign: 'center' }}>
            <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Entered</span>
              <div className="font-mono" style={{ fontSize: '1.3rem', color: '#16a34a', fontWeight: 800 }}>{peopleEntered}</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Exited</span>
              <div className="font-mono" style={{ fontSize: '1.3rem', color: '#dc2626', fontWeight: 800 }}>{peopleExited}</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>Net Commuters</span>
              <div className="font-mono" style={{ fontSize: '1.3rem', color: '#2563eb', fontWeight: 800 }}>{peopleEntered - peopleExited}</div>
            </div>
          </div>
        </div>

        {/* REAR CAMERA & SEAT HEATMAP */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '1rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', margin: 0, fontWeight: 700 }}>
              <Flame size={18} color="#7c3aed" />
              Rear Cabin Seat Occupancy Heatmap AI
            </h3>
            <span className="badge badge-purple">Spatial Grid</span>
          </div>

          <div style={{ 
            height: '240px', 
            background: '#f8fafc', 
            borderRadius: '14px', 
            border: '1px solid #e9d5ff',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            {/* Heatmap Grid Simulator */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px', width: '100%', maxWidth: '320px' }}>
              {Array.from({ length: 24 }).map((_, idx) => {
                const isHigh = idx % 3 === 0;
                const isMid = idx % 2 === 0;
                const bg = isHigh ? '#fee2e2' : isMid ? '#fef3c7' : '#dcfce7';
                const textCol = isHigh ? '#b91c1c' : isMid ? '#b45309' : '#15803d';
                const borderCol = isHigh ? '#fca5a5' : isMid ? '#fde68a' : '#86efac';
                return (
                  <div 
                    key={idx} 
                    style={{ 
                      height: '30px', 
                      background: bg, 
                      borderRadius: '6px', 
                      border: `1px solid ${borderCol}`,
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '0.72rem',
                      fontWeight: 'bold',
                      color: textCol
                    }}
                  >
                    S{idx + 1}
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: '16px', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', gap: '14px', fontWeight: 600 }}>
              <span style={{ color: '#b91c1c' }}>🔴 Occupied</span>
              <span style={{ color: '#b45309' }}>🟡 Reserved</span>
              <span style={{ color: '#15803d' }}>🟢 Available</span>
            </div>
          </div>

          <div style={{ marginTop: '16px', background: '#f8fafc', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.85rem', color: '#0f172a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 600 }}>LED Display Output:</span>
            <span className="font-mono" style={{ color: '#2563eb', fontWeight: 800 }}>"NEXT: AIIMS • SEATS AVAIL: 13"</span>
          </div>
        </div>

      </div>

      {/* Edge MQTT JSON Payload Stream */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.05rem', color: '#0f172a', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px', margin: 0, fontWeight: 700 }}>
          <Terminal size={18} color="#16a34a" />
          Live MQTT Telemetry Payload Stream (Jetson Edge &rarr; Kafka Broker)
        </h3>

        <div className="font-mono" style={{ 
          background: '#f8fafc', 
          borderRadius: '10px', 
          padding: '16px', 
          fontSize: '0.78rem', 
          color: '#0f172a', 
          maxHeight: '200px', 
          overflowY: 'auto',
          border: '1px solid var(--border-color)',
          lineHeight: '1.8'
        }}>
          {logs.map((log) => (
            <div key={log.id} style={{ marginBottom: '4px' }}>
              <span style={{ color: '#64748b' }}>[{log.time}]</span>{' '}
              <span style={{ color: '#2563eb', fontWeight: 600 }}>{log.topic}</span> -&gt;{' '}
              <span style={{ color: '#0f172a' }}>
                {`{"bus_id": "DL-01-EQ-9821", "passengers_net": `}<strong style={{ color: '#16a34a' }}>{log.netCount}</strong>{`, "lat": ${log.lat}, "lng": ${log.lng}, "driver_fatigue": `}<strong style={{ color: '#2563eb' }}>"{log.fatigueStatus}"</strong>{`}`}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
