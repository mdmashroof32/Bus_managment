import React, { useEffect, useRef, useState } from 'react';
import { AlertTriangle, Camera, CameraOff, Users } from 'lucide-react';
import { publishPassengerCount } from '../utils/passengerCount';

// Match the vision service's documented 127.0.0.1 bind address. `localhost` can
// resolve to IPv6 (::1) while the service is only listening on IPv4.
const DETECTION_URL = import.meta.env.VITE_YOLO_API_URL || 'http://127.0.0.1:8000/detect';
const BUS_CAPACITY = Number(import.meta.env.VITE_BUS_CAPACITY) || 55;

export default function PassengerVision() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);
  const [running, setRunning] = useState(false);
  const [count, setCount] = useState(null);
  const [detections, setDetections] = useState([]);
  const [frameSize, setFrameSize] = useState({ width: 1, height: 1 });
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
  }, []);

  useEffect(() => {
    if (!running) return undefined;

    let cancelled = false;
    let timer;

    const detectNextFrame = async () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas || video.readyState < 2) {
        timer = window.setTimeout(detectNextFrame, 250);
        return;
      }

      const scale = Math.min(1, 640 / video.videoWidth);
      canvas.width = Math.round(video.videoWidth * scale);
      canvas.height = Math.round(video.videoHeight * scale);
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      setFrameSize({ width: canvas.width, height: canvas.height });

      try {
        const response = await fetch(DETECTION_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: canvas.toDataURL('image/jpeg', 0.75) })
        });
        if (!response.ok) throw new Error(`YOLO service returned HTTP ${response.status}`);
        const result = await response.json();
        if (!Number.isInteger(result.count) || !Array.isArray(result.detections)) {
          throw new Error('YOLO service returned an invalid detection response.');
        }
        if (!cancelled) {
          setCount(result.count);
          setDetections(result.detections);
          setLastUpdated(new Date());
          setError('');
          publishPassengerCount(result.count);
        }
      } catch (requestError) {
        if (!cancelled) {
          const detail = requestError instanceof TypeError
            ? `Cannot reach ${DETECTION_URL}. Make sure the local YOLO service is running and open its /health URL.`
            : requestError.message;
          setError(detail);
        }
      }

      if (!cancelled) timer = window.setTimeout(detectNextFrame, 700);
    };

    detectNextFrame();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [running]);

  const startCamera = async () => {
    setError('');
    if (!navigator.mediaDevices?.getUserMedia) {
      setError('Camera access requires HTTPS or localhost and a supported browser.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setRunning(true);
    } catch (cameraError) {
      setError(cameraError.name === 'NotAllowedError'
        ? 'Camera permission was denied. Allow camera access to start passenger counting.'
        : `Could not start the camera: ${cameraError.message}`);
    }
  };

  const stopCamera = () => {
    setRunning(false);
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };

  const overCapacity = count !== null && count > BUS_CAPACITY;

  return (
    <section className="glass-panel" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ margin: 0, color: '#0f172a', fontSize: '1.1rem' }}>Live YOLO Passenger Headcount</h2>
          <p style={{ margin: '5px 0 0', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
            Laptop camera person detection • Results sync to the conductor dashboard
          </p>
        </div>
        <span className={`badge ${running && !error ? 'badge-success' : 'badge-info'}`}>
          {running ? (error ? 'CAMERA ON • YOLO OFFLINE' : 'LIVE DETECTION') : 'CAMERA STOPPED'}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(180px, 1fr)', gap: 16 }}>
        <div style={{ position: 'relative', minHeight: 260, background: '#0f172a', borderRadius: 14, overflow: 'hidden' }}>
          <video ref={videoRef} muted playsInline aria-label="Live laptop camera feed" style={{ width: '100%', height: '100%', minHeight: 260, objectFit: 'cover', display: running ? 'block' : 'none' }} />
          {!running && <div style={{ minHeight: 260, display: 'grid', placeItems: 'center', color: '#cbd5e1', textAlign: 'center', padding: 20 }}><div><Camera size={36} /><p>Start the camera to begin YOLO detection.</p></div></div>}
          {running && detections.map((detection, index) => {
            const [x1, y1, x2, y2] = detection.box;
            return <div key={`${index}-${x1}-${y1}`} style={{ position: 'absolute', left: `${(x1 / frameSize.width) * 100}%`, top: `${(y1 / frameSize.height) * 100}%`, width: `${((x2 - x1) / frameSize.width) * 100}%`, height: `${((y2 - y1) / frameSize.height) * 100}%`, border: '2px solid #22c55e', borderRadius: 6, pointerEvents: 'none' }}><span style={{ background: '#16a34a', color: '#fff', fontSize: 11, padding: '2px 5px' }}>PERSON {Math.round(detection.confidence * 100)}%</span></div>;
          })}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, padding: 16, background: overCapacity ? '#fef2f2' : '#f8fafc', border: `1px solid ${overCapacity ? '#fecaca' : 'var(--border-color)'}`, borderRadius: 14, textAlign: 'center' }}>
          <Users size={26} color={overCapacity ? '#dc2626' : '#2563eb'} />
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>PEOPLE DETECTED NOW</span>
          <strong className="font-mono" style={{ fontSize: '2.5rem', lineHeight: 1, color: overCapacity ? '#dc2626' : '#0f172a' }}>{count ?? '—'}</strong>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Bus capacity: {BUS_CAPACITY}</span>
          {lastUpdated && <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Updated {lastUpdated.toLocaleTimeString()}</span>}
          <button type="button" className={running ? 'btn-secondary' : 'btn-primary'} onClick={running ? stopCamera : startCamera} style={{ justifyContent: 'center', marginTop: 6 }}>
            {running ? <><CameraOff size={16} /> Stop camera</> : <><Camera size={16} /> Start headcount</>}
          </button>
        </div>
      </div>

      {overCapacity && <div role="alert" style={{ display: 'flex', gap: 8, alignItems: 'center', padding: 12, borderRadius: 10, background: '#fef2f2', color: '#b91c1c', fontWeight: 700 }}><AlertTriangle size={18} /> Bus capacity exceeded: {count} people detected for {BUS_CAPACITY} seats.</div>}
      {error && <p role="alert" style={{ margin: 0, color: '#b91c1c', fontSize: '0.82rem' }}>{error}</p>}
      <canvas ref={canvasRef} hidden />
    </section>
  );
}
