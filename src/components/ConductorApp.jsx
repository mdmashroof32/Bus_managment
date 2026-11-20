import React, { useEffect, useState } from 'react';
import { 
  CreditCard, 
  QrCode, 
  IndianRupee, 
  AlertTriangle, 
  CheckCircle2, 
  Printer, 
  Users, 
  Eye, 
  HeartHandshake,
  RefreshCw
} from 'lucide-react';
import { getPassengerCount, subscribePassengerCount } from '../utils/passengerCount';

export default function ConductorApp() {
  const [validatedCount, setValidatedCount] = useState(38);
  const [passengerCount, setPassengerCount] = useState(() => getPassengerCount()?.count ?? null);
  const [printedTicket, setPrintedTicket] = useState(null);
  const [qrScanning, setQrScanning] = useState(false);

  useEffect(() => subscribePassengerCount((value) => setPassengerCount(value.count)), []);

  const deltaMismatch = passengerCount === null ? null : passengerCount - validatedCount;
  const isFraudAlert = deltaMismatch !== null && deltaMismatch >= 4;

  const handleIssueCashTicket = () => {
    const tck = {
      id: `DTC-TCK-${Math.floor(100000 + Math.random() * 900000)}`,
      fare: 25,
      route: '534-A EV Express',
      time: new Date().toLocaleTimeString(),
      type: 'CASH PAPER TICKET'
    };
    setPrintedTicket(tck);
    setValidatedCount(prev => prev + 1);
  };

  const handleIssuePinkTicket = () => {
    const tck = {
      id: `DTC-PINK-${Math.floor(100000 + Math.random() * 900000)}`,
      fare: 0,
      route: '534-A EV Express',
      time: new Date().toLocaleTimeString(),
      type: 'WOMEN PINK PASS (FREE)'
    };
    setPrintedTicket(tck);
    setValidatedCount(prev => prev + 1);
  };

  const handleScanQR = () => {
    setQrScanning(true);
    setTimeout(() => {
      setQrScanning(false);
      setValidatedCount(prev => prev + 1);
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0' }}>
      <div className="glass-panel" style={{
        width: '450px',
        maxWidth: '100%',
        padding: '24px',
        borderRadius: '24px',
        border: '2px solid #cbd5e1',
        boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        background: '#ffffff'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          <div>
            <span className="badge badge-purple" style={{ fontSize: '0.68rem' }}>DTC POS-8812 • Millennium Park</span>
            <h3 style={{ fontSize: '1.05rem', color: '#0f172a', marginTop: '4px', fontWeight: 800 }}>DTC Electronic Ticketing Machine (ETM)</h3>
          </div>
          <span className="badge badge-success">NCMC Online</span>
        </div>

        <div role={isFraudAlert ? 'alert' : undefined} style={{
          background: isFraudAlert ? '#fef2f2' : '#f0fdf4',
          border: isFraudAlert ? '1px solid #fecaca' : '1px solid #bbf7d0',
          padding: '16px',
          borderRadius: '16px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '0.82rem', color: '#0f172a', fontWeight: 700 }}>AI Vision Camera vs Scanned Tickets</span>
            <span className={`badge ${isFraudAlert ? 'badge-danger' : 'badge-success'}`}>
              {passengerCount === null ? 'CAMERA NOT CONNECTED' : isFraudAlert ? '⚠️ UNTICKETED COMMUTERS' : '✓ TALLY MATCHED'}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginTop: '12px', textAlign: 'center' }}>
            <div style={{ background: '#ffffff', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600 }}>Validated</div>
              <div className="font-mono" style={{ fontSize: '1.3rem', color: '#16a34a', fontWeight: 800 }}>{validatedCount}</div>
            </div>
            <div style={{ background: '#ffffff', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600 }}>Live YOLO Count</div>
              <div className="font-mono" style={{ fontSize: '1.3rem', color: '#2563eb', fontWeight: 800 }}>{passengerCount ?? '—'}</div>
            </div>
            <div style={{ background: '#ffffff', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600 }}>Passenger Delta</div>
              <div className="font-mono" style={{ fontSize: '1.3rem', color: isFraudAlert ? '#dc2626' : '#16a34a', fontWeight: 800 }}>
                {deltaMismatch === null ? '—' : `${deltaMismatch > 0 ? '+' : ''}${deltaMismatch}`}
              </div>
            </div>
          </div>

          {isFraudAlert && <p style={{ fontSize: '0.75rem', color: '#b91c1c', marginTop: '10px', marginBottom: 0, fontWeight: 600 }}><AlertTriangle size={14} style={{ verticalAlign: 'middle' }} /> AI camera detects {deltaMismatch} more people than validated tickets. Please verify with the passenger.</p>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <button onClick={handleScanQR} disabled={qrScanning} className="btn-primary" style={{ padding: '14px', borderRadius: '12px', justifyContent: 'center', fontSize: '0.85rem' }}>
            <QrCode size={18} /> {qrScanning ? 'Scanning QR...' : 'Scan QR / NCMC'}
          </button>
          <button onClick={handleIssuePinkTicket} className="btn-secondary" style={{ padding: '14px', borderRadius: '12px', justifyContent: 'center', fontSize: '0.85rem', background: '#fdf2f8', borderColor: '#fbcfe8', color: '#be185d' }}>
            <HeartHandshake size={18} color="#db2777" /> Issue Pink Pass (₹0)
          </button>
        </div>

        <button onClick={handleIssueCashTicket} className="btn-secondary" style={{ width: '100%', padding: '12px', borderRadius: '12px', justifyContent: 'center', fontSize: '0.88rem' }}>
          <Printer size={18} /> Issue Cash Paper Ticket (₹ 25.00)
        </button>

        {printedTicket && <div style={{ background: printedTicket.type.includes('PINK') ? '#fdf2f8' : '#f8fafc', color: '#0f172a', padding: '16px', borderRadius: '12px', fontFamily: 'monospace', fontSize: '0.8rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'center', border: printedTicket.type.includes('PINK') ? '2px dashed #f472b6' : '1px dashed #94a3b8' }}>
          <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#0f172a' }}>DELHI TRANSPORT CORPORATION (DTC)</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>GOVT. OF NCT OF DELHI</div>
          <div style={{ color: '#cbd5e1', margin: '4px 0' }}>--------------------------------</div>
          <div style={{ fontWeight: 'bold', color: printedTicket.type.includes('PINK') ? '#be185d' : '#0f172a' }}>{printedTicket.type}</div>
          <div>TICKET NO: <strong>{printedTicket.id}</strong></div>
          <div>FARE AMOUNT: <strong>₹ {printedTicket.fare}.00</strong></div>
          <div>ISSUED AT: {printedTicket.time}</div>
          <div style={{ color: '#cbd5e1', margin: '4px 0' }}>--------------------------------</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>VALID ON ALL STATE BUSES</div>
        </div>}
      </div>
    </div>
  );
}
