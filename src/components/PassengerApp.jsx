import React, { useState } from 'react';
import { 
  Smartphone, 
  MapPin, 
  Search, 
  QrCode, 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  IndianRupee, 
  Radio, 
  Bus, 
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  Zap,
  ArrowLeft
} from 'lucide-react';

export default function PassengerApp() {
  const [activeTab, setActiveTab] = useState('search'); // 'search' | 'seat' | 'ticket' | 'sos'
  const [origin, setOrigin] = useState('Anand Vihar ISBT, Delhi');
  const [destination, setDestination] = useState('AIIMS Metro Station, Delhi');
  const [isPinkTicket, setIsPinkTicket] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState('14A');
  const [bookedTicket, setBookedTicket] = useState(null);
  const [sosTriggered, setSosTriggered] = useState(false);

  const handleBookTicket = () => {
    const newTicket = {
      id: 'DTC-ONE-DELHI-882194',
      busNo: 'DL-01-PC-1001',
      route: '534-A AC EV Express',
      origin,
      destination,
      seat: selectedSeat,
      fare: isPinkTicket ? 0 : 25,
      isPinkPass: isPinkTicket,
      qrHash: 'ONE_DELHI:DL01PC1001:DTC882194:SIGN_d9a82',
      time: 'Today, 20:50 PM'
    };
    setBookedTicket(newTicket);
    setActiveTab('ticket');
  };

  const handleQuickRoute = (from, to) => {
    setOrigin(from);
    setDestination(to);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0' }}>
      
      {/* Light Smartphone Frame Container */}
      <div style={{ 
        width: '400px', 
        height: '750px', 
        background: '#ffffff', 
        borderRadius: '40px', 
        border: '12px solid #e2e8f0', 
        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Smartphone Camera Notch */}
        <div style={{ 
          width: '130px', 
          height: '22px', 
          background: '#e2e8f0', 
          borderRadius: '0 0 14px 14px', 
          margin: '0 auto',
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50
        }} />

        {/* Mobile Header Bar */}
        <div style={{ 
          padding: '34px 20px 14px 20px', 
          background: '#f8fafc', 
          borderBottom: '1px solid var(--border-color)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ padding: '6px', borderRadius: '8px', background: '#fee2e2' }}>
              <Bus size={18} color="#dc2626" />
            </div>
            <div>
              <span style={{ fontWeight: 800, fontSize: '0.92rem', color: '#0f172a', display: 'block', lineHeight: 1.1 }}>One Delhi App</span>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>State Bus Transit Mobile</span>
            </div>
          </div>
          <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>
            <Radio size={10} className="pulse-emergency" /> 5G Live
          </span>
        </div>

        {/* App Content Body */}
        <div style={{ flex: 1, padding: '16px', overflowY: 'auto', background: '#ffffff' }}>
          
          {/* SEARCH TAB */}
          {activeTab === 'search' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* Route Input Card */}
              <div style={{ 
                background: '#f8fafc', 
                padding: '16px', 
                borderRadius: '16px', 
                border: '1px solid var(--border-color)' 
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ fontSize: '0.85rem', color: '#0f172a', fontWeight: 700, margin: 0 }}>Plan Delhi Journey</h4>
                  <span className="badge badge-info" style={{ fontSize: '0.65rem' }}>Live Tracking</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ position: 'relative' }}>
                    <MapPin size={16} color="#16a34a" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input 
                      type="text" 
                      value={origin} 
                      onChange={(e) => setOrigin(e.target.value)}
                      placeholder="Enter pickup point"
                      style={{ width: '100%', padding: '10px 10px 10px 34px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 500 }}
                    />
                  </div>

                  <div style={{ position: 'relative' }}>
                    <MapPin size={16} color="#dc2626" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input 
                      type="text" 
                      value={destination} 
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="Enter destination"
                      style={{ width: '100%', padding: '10px 10px 10px 34px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 500 }}
                    />
                  </div>
                </div>

                {/* Quick Popular Routes */}
                <div style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
                  <button 
                    onClick={() => handleQuickRoute('Anand Vihar ISBT, Delhi', 'AIIMS Metro Station, Delhi')}
                    style={{ fontSize: '0.68rem', padding: '4px 8px', borderRadius: '6px', border: '1px solid #e2e8f0', background: '#ffffff', cursor: 'pointer' }}
                  >
                    Anand Vihar ➔ AIIMS
                  </button>
                  <button 
                    onClick={() => handleQuickRoute('Kashmere Gate ISBT', 'IGI Airport Terminal 3')}
                    style={{ fontSize: '0.68rem', padding: '4px 8px', borderRadius: '6px', border: '1px solid #e2e8f0', background: '#ffffff', cursor: 'pointer' }}
                  >
                    ISBT ➔ Airport
                  </button>
                </div>

                {/* Pink Ticket Women Subsidy Switcher */}
                <div style={{ 
                  marginTop: '12px', 
                  background: '#fdf2f8', 
                  border: '1px solid #fbcfe8', 
                  padding: '10px 12px', 
                  borderRadius: '10px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  cursor: 'pointer'
                }}
                onClick={() => setIsPinkTicket(!isPinkTicket)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <HeartHandshake size={18} color="#db2777" />
                    <div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#be185d' }}>Delhi Pink Ticket Subsidy</div>
                      <div style={{ fontSize: '0.68rem', color: '#9d174d' }}>Free zero-fare travel for women</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={isPinkTicket}
                    onChange={(e) => setIsPinkTicket(e.target.checked)}
                    style={{ width: '18px', height: '18px', accentColor: '#db2777', cursor: 'pointer' }}
                  />
                </div>
              </div>

              {/* Available Bus Card */}
              <div style={{ 
                background: '#ffffff', 
                padding: '16px', 
                borderRadius: '16px', 
                border: '1px solid #bfdbfe',
                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.08)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="badge badge-info font-mono">DL-01-PC-1001</span>
                  <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700 }}>Arriving in 2 Mins</span>
                </div>

                <div style={{ marginTop: '10px', fontSize: '0.92rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Zap size={16} color="#16a34a" /> Route 534-A TATA EV Express
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Millennium Park Depot • AC Electric
                </div>

                <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Seats Occupancy</span>
                    <div style={{ fontSize: '0.85rem', color: '#b45309', fontWeight: 700 }}>44 / 55 Seats</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Total Fare</span>
                    <div className="font-mono" style={{ fontSize: '0.95rem', color: isPinkTicket ? '#be185d' : '#15803d', fontWeight: 800 }}>
                      {isPinkTicket ? 'FREE (Pink Pass)' : '₹ 25.00'}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setActiveTab('seat')}
                  className="btn-primary" 
                  style={{ width: '100%', marginTop: '14px', justifyContent: 'center', fontSize: '0.88rem' }}
                >
                  Select Seat &amp; Book <ArrowRight size={15} />
                </button>
              </div>

            </div>
          )}

          {/* SEAT SELECTION TAB */}
          {activeTab === 'seat' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <button 
                  onClick={() => setActiveTab('search')} 
                  style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}
                >
                  <ArrowLeft size={14} /> Back
                </button>
                <h4 style={{ fontSize: '0.88rem', color: '#0f172a', margin: 0, fontWeight: 700 }}>Choose Seat</h4>
              </div>

              {/* Bus Seat Layout Simulator */}
              <div style={{ 
                background: '#f8fafc', 
                padding: '16px', 
                borderRadius: '16px', 
                border: '1px solid var(--border-color)', 
                textAlign: 'center' 
              }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '12px' }}>
                  🚌 FRONT DRIVER CABIN
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', margin: '0 auto', maxWidth: '240px' }}>
                  {['1A', '1B', '1C', '1D', '2A', '2B', '2C', '2D', '14A', '14B', '14C', '14D'].map((st) => {
                    const isOccupied = st === '1A' || st === '1B' || st === '2C';
                    const isSelected = selectedSeat === st;

                    return (
                      <button
                        key={st}
                        disabled={isOccupied}
                        onClick={() => setSelectedSeat(st)}
                        style={{
                          padding: '10px 4px',
                          borderRadius: '8px',
                          border: isSelected ? '2px solid #2563eb' : isOccupied ? '1px solid #fecaca' : '1px solid #cbd5e1',
                          background: isOccupied ? '#fee2e2' : isSelected ? '#2563eb' : '#ffffff',
                          color: isOccupied ? '#b91c1c' : isSelected ? '#ffffff' : '#0f172a',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          cursor: isOccupied ? 'not-allowed' : 'pointer',
                          boxShadow: isSelected ? '0 2px 8px rgba(37, 99, 235, 0.3)' : 'none'
                        }}
                      >
                        {st}
                      </button>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginTop: '14px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  <span>🟢 Available</span>
                  <span>🔴 Occupied</span>
                  <span>🔵 Selected</span>
                </div>

                <div style={{ marginTop: '16px', background: '#ffffff', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                  Selected Seat: <strong style={{ color: '#2563eb' }}>{selectedSeat}</strong> • Fare: <strong style={{ color: isPinkTicket ? '#be185d' : '#15803d' }}>{isPinkTicket ? '₹0.00 (Pink Pass)' : '₹25.00'}</strong>
                </div>

                <button
                  onClick={handleBookTicket}
                  className="btn-primary"
                  style={{ width: '100%', marginTop: '14px', justifyContent: 'center' }}
                >
                  {isPinkTicket ? 'Issue Zero-Fare Pink Pass Ticket' : 'Pay ₹ 25 via UPI / NCMC Card'}
                </button>
              </div>
            </div>
          )}

          {/* DYNAMIC QR TICKET TAB */}
          {activeTab === 'ticket' && bookedTicket && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'center' }}>
              <div style={{ 
                padding: '20px', 
                borderRadius: '16px',
                border: bookedTicket.isPinkPass ? '2px solid #fbcfe8' : '2px solid #bbf7d0',
                background: bookedTicket.isPinkPass ? '#fdf2f8' : '#f0fdf4',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.05)'
              }}>
                <span className={`badge ${bookedTicket.isPinkPass ? 'badge-pink' : 'badge-success'}`} style={{ marginBottom: '10px' }}>
                  <ShieldCheck size={14} /> {bookedTicket.isPinkPass ? 'DELHI PINK PASS ISSUED' : 'ONE DELHI TICKET VALID'}
                </span>

                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>
                  {bookedTicket.route}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  DTC EV: <strong>{bookedTicket.busNo}</strong> • Seat: <strong>{bookedTicket.seat}</strong>
                </div>

                {/* High Contrast Dynamic QR Code */}
                <div style={{ 
                  margin: '16px auto', 
                  width: '170px', 
                  height: '170px', 
                  background: '#ffffff', 
                  borderRadius: '14px', 
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  border: '1px solid var(--border-color)'
                }}>
                  <QrCode size={140} color="#0f172a" />
                </div>

                <div className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)', wordBreak: 'break-all' }}>
                  {bookedTicket.qrHash}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#b45309', marginTop: '8px', fontWeight: 600 }}>
                  ⚡ Dynamic QR refreshed (Anti-screenshot secured)
                </div>
              </div>

              <button 
                onClick={() => setActiveTab('search')}
                className="btn-secondary"
                style={{ justifyContent: 'center', fontSize: '0.82rem' }}
              >
                Book Another Journey
              </button>
            </div>
          )}

          {/* SOS TAB */}
          {activeTab === 'sos' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'center', padding: '16px 0' }}>
              <div>
                <h4 style={{ fontSize: '1.05rem', color: '#dc2626', fontWeight: 800, margin: 0 }}>Delhi Police 112 Emergency SOS</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Direct emergency dispatch to Delhi Police PCR and DTC Central Monitoring
                </p>
              </div>

              <button
                onClick={() => setSosTriggered(!sosTriggered)}
                className="pulse-emergency"
                style={{
                  width: '130px',
                  height: '130px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                  border: '4px solid #fee2e2',
                  color: '#ffffff',
                  fontWeight: 900,
                  fontSize: '1.5rem',
                  margin: '16px auto',
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(220, 38, 38, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column'
                }}
              >
                <ShieldAlert size={28} />
                <span style={{ fontSize: '1rem', marginTop: '2px' }}>SOS</span>
              </button>

              {sosTriggered && (
                <div style={{ padding: '14px', border: '1px solid #fecaca', background: '#fef2f2', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#b91c1c' }}>
                    🚨 Delhi Police PCR Unit #DL-04 Dispatched!
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#7f1d1d', marginTop: '4px' }}>
                    Live GPS Stream Transmitted • ETA &lt; 3 mins
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Mobile Navigation Tabs Footer */}
        <div style={{ 
          padding: '10px 16px', 
          background: '#f8fafc', 
          borderTop: '1px solid var(--border-color)', 
          display: 'flex', 
          justifyContent: 'space-around' 
        }}>
          <button 
            onClick={() => setActiveTab('search')} 
            style={{ background: 'none', border: 'none', color: activeTab === 'search' ? '#2563eb' : '#64748b', fontSize: '0.72rem', fontWeight: activeTab === 'search' ? 700 : 500, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', cursor: 'pointer' }}
          >
            <Search size={18} /> Search
          </button>
          <button 
            onClick={() => setActiveTab(bookedTicket ? 'ticket' : 'search')} 
            style={{ background: 'none', border: 'none', color: activeTab === 'ticket' ? '#2563eb' : '#64748b', fontSize: '0.72rem', fontWeight: activeTab === 'ticket' ? 700 : 500, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', cursor: 'pointer' }}
          >
            <QrCode size={18} /> Ticket
          </button>
          <button 
            onClick={() => setActiveTab('sos')} 
            style={{ background: 'none', border: 'none', color: activeTab === 'sos' ? '#dc2626' : '#64748b', fontSize: '0.72rem', fontWeight: activeTab === 'sos' ? 700 : 500, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', cursor: 'pointer' }}
          >
            <ShieldAlert size={18} /> Emergency
          </button>
        </div>

      </div>

    </div>
  );
}
