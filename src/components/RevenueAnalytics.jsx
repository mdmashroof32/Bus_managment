import React, { useState } from 'react';
import { 
  IndianRupee, 
  TrendingUp, 
  CreditCard, 
  Ticket, 
  Heart, 
  BarChart3, 
  PieChart, 
  ArrowUpRight, 
  ShieldCheck, 
  CheckCircle2, 
  Download, 
  RefreshCw, 
  Bus, 
  DollarSign, 
  Sparkles,
  Zap,
  Building2,
  Users
} from 'lucide-react';
import { delhiStats, delhiRoutes } from '../data/delhiTransportData';

export default function RevenueAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('Today');
  const [paymentFilter, setPaymentFilter] = useState('ALL');

  // Revenue metrics breakdown data
  const revenueMetrics = [
    {
      title: 'Total Gross Daily Collection',
      amount: '₹ 7.82 Cr',
      change: '+8.4% vs last week',
      isPositive: true,
      subtext: 'Includes Cash + NCMC + OneDelhi QR',
      icon: IndianRupee,
      color: '#2563eb',
      bgColor: '#eff6ff'
    },
    {
      title: 'Digital & NCMC Payments',
      amount: '₹ 5.00 Cr',
      change: '64.0% Digital Adoption',
      isPositive: true,
      subtext: 'NCMC Metro Cards & OneDelhi QR',
      icon: CreditCard,
      color: '#16a34a',
      bgColor: '#f0fdf4'
    },
    {
      title: 'GNCTD Pink Pass Subsidy',
      amount: '₹ 1.48 Cr',
      change: '1.48M Free Women Trips',
      isPositive: true,
      subtext: 'Reimbursed 100% by Govt of Delhi',
      icon: Heart,
      color: '#db2777',
      bgColor: '#fdf2f8'
    },
    {
      title: 'Fare Recovery & Efficiency',
      amount: '94.2%',
      change: '+2.1% leakage reduction',
      isPositive: true,
      subtext: 'AI Delta Camera Fraud Audit',
      icon: ShieldCheck,
      color: '#7c3aed',
      bgColor: '#f5f3ff'
    }
  ];

  // Route revenue breakdown
  const routeRevenues = [
    { route: '534-A (Anand Vihar ➔ Mehrauli)', buses: 42, dailyTickets: 84200, revenue: '₹ 12,63,000', digitalPct: 72, growth: '+11%' },
    { route: 'RING-SEWA (Ring Road Mudrika)', buses: 65, dailyTickets: 142000, revenue: '₹ 21,30,000', digitalPct: 68, growth: '+9%' },
    { route: 'AIRPORT-EXP (Kashmere ➔ T3)', buses: 24, dailyTickets: 38500, revenue: '₹ 9,62,500', digitalPct: 89, growth: '+15%' },
    { route: '419 (Old Delhi ➔ Ambedkar Nagar)', buses: 36, dailyTickets: 76000, revenue: '₹ 11,40,000', digitalPct: 58, growth: '+4%' },
    { route: '764 (Nehru Place ➔ Najafgarh)', buses: 38, dailyTickets: 69000, revenue: '₹ 10,35,000', digitalPct: 61, growth: '+6%' },
    { route: 'CBD-1 (Connaught Place Express)', buses: 30, dailyTickets: 54000, revenue: '₹ 8,10,000', digitalPct: 82, growth: '+12%' }
  ];

  // Ticket price brackets distribution
  const fareBrackets = [
    { fare: '₹5 (Non-AC Short)', tickets: '980,000', revenue: '₹ 49.0 L', percentage: 25, color: '#3b82f6' },
    { fare: '₹10 (AC Standard)', tickets: '1,420,000', revenue: '₹ 142.0 L', percentage: 36, color: '#16a34a' },
    { fare: '₹15 (Long Distance)', tickets: '1,100,000', revenue: '₹ 165.0 L', percentage: 28, color: '#7c3aed' },
    { fare: '₹25 (Airport Express)', tickets: '385,000', revenue: '₹ 96.25 L', percentage: 11, color: '#d97706' }
  ];

  // Payment Mode Breakdown
  const paymentModes = [
    { mode: 'OneDelhi App QR Code', percentage: 38, value: '₹ 2.97 Cr', color: '#2563eb' },
    { mode: 'NCMC Smart Card (Metro/Bus)', percentage: 26, value: '₹ 2.03 Cr', color: '#16a34a' },
    { mode: 'Cash (Conductor ETM)', percentage: 36, value: '₹ 2.82 Cr', color: '#64748b' }
  ];

  // Live ETM Terminal POS Transactions
  const liveTransactions = [
    { id: 'TXN-99812', time: '15:24:02', bus: 'DL-01-PC-1001', conductor: 'Vikram S.', type: 'NCMC Tap', amount: '₹ 15', status: 'SUCCESS' },
    { id: 'TXN-99811', time: '15:23:55', bus: 'DL-01-PC-2045', conductor: 'Rakesh M.', type: 'OneDelhi QR Scan', amount: '₹ 10', status: 'SUCCESS' },
    { id: 'TXN-99810', time: '15:23:48', bus: 'DL-01-GC-3380', conductor: 'Sunil K.', type: 'Pink Pass (Govt)', amount: '₹ 0 (Reimbursed)', status: 'PINK_PASS' },
    { id: 'TXN-99809', time: '15:23:40', bus: 'DL-01-PC-4102', conductor: 'Amit V.', type: 'Cash ETM Print', amount: '₹ 25', status: 'SUCCESS' },
    { id: 'TXN-99808', time: '15:23:31', bus: 'DL-01-GC-5512', conductor: 'Deepak T.', type: 'OneDelhi QR Scan', amount: '₹ 10', status: 'SUCCESS' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top Banner & Control Panel */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '10px', borderRadius: '10px', background: '#eff6ff', border: '1px solid #bfdbfe' }}>
              <IndianRupee size={24} color="#2563eb" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', color: '#0f172a', margin: 0, fontWeight: 800 }}>
                DTC &amp; DIMTS Revenue &amp; Fare Collection Center
              </h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0, marginTop: '2px' }}>
                Real-time ticketing revenue, NCMC digital payments, Pink Pass govt reimbursement &amp; ETM audits
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            {['Today', 'This Week', 'This Month', 'FY 2026-27'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  background: selectedPeriod === period ? '#ffffff' : 'transparent',
                  color: selectedPeriod === period ? '#2563eb' : '#64748b',
                  fontWeight: selectedPeriod === period ? 700 : 500,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  boxShadow: selectedPeriod === period ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                {period}
              </button>
            ))}
          </div>

          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', padding: '8px 14px' }}>
            <Download size={14} /> Export Revenue Report
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
        {revenueMetrics.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>{item.title}</span>
                  <div style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 800, marginTop: '4px' }}>
                    {item.amount}
                  </div>
                </div>
                <div style={{ padding: '10px', borderRadius: '10px', background: item.bgColor }}>
                  <Icon size={22} color={item.color} />
                </div>
              </div>

              <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', color: item.isPositive ? '#16a34a' : '#dc2626', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <ArrowUpRight size={14} /> {item.change}
                </span>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{item.subtext}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle Layout: Payment Channel Breakdown & Ticket Fare Categories */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '20px' }}>
        
        {/* Payment Channels & Digital Adoption Progress */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.05rem', color: '#0f172a', margin: 0, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PieChart size={18} color="#2563eb" />
              Fare Collection Channels Split
            </h3>
            <span className="badge badge-success font-mono">64% Digital</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {paymentModes.map((mode, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                  <span style={{ color: '#0f172a', fontWeight: 600 }}>{mode.mode}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{mode.value}</span>
                    <strong className="font-mono" style={{ color: mode.color }}>{mode.percentage}%</strong>
                  </div>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${mode.percentage}%`, height: '100%', background: mode.color, borderRadius: '4px', transition: 'width 0.4s ease' }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
            <Sparkles size={20} color="#7c3aed" />
            <div style={{ fontSize: '0.8rem', color: '#334155' }}>
              <strong>NCMC One-Nation One-Card</strong> integration live across all 7,420 DTC buses &amp; Delhi Metro lines.
            </div>
          </div>
        </div>

        {/* Ticket Price Bracket Distribution */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.05rem', color: '#0f172a', margin: 0, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart3 size={18} color="#16a34a" />
              Fare Bracket &amp; Ticket Volume Split
            </h3>
            <span className="badge badge-info font-mono">4.35M Tickets/Day</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {fareBrackets.map((bracket, idx) => (
              <div key={idx} style={{ padding: '10px 14px', borderRadius: '8px', background: '#f8fafc', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: bracket.color }} />
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#0f172a', fontWeight: 700 }}>{bracket.fare}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{bracket.tickets} tickets issued</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="font-mono" style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: 800 }}>{bracket.revenue}</div>
                  <span style={{ fontSize: '0.72rem', color: bracket.color, fontWeight: 700 }}>{bracket.percentage}% of revenue</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Corridor & Route Revenue Leaderboard Table */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', color: '#0f172a', margin: 0, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bus size={18} color="#dc2626" />
              Corridor &amp; Route Revenue Performance
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
              Top revenue-generating bus corridors across Delhi NCT
            </p>
          </div>
          <span className="badge badge-success font-mono">Real-time Telemetry Synced</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)', background: '#f8fafc' }}>
                <th style={{ padding: '12px' }}>Route Corridor</th>
                <th style={{ padding: '12px' }}>Active Fleet</th>
                <th style={{ padding: '12px' }}>Daily Passengers</th>
                <th style={{ padding: '12px' }}>Digital Ticket %</th>
                <th style={{ padding: '12px' }}>Total Gross Revenue</th>
                <th style={{ padding: '12px' }}>Growth</th>
              </tr>
            </thead>
            <tbody>
              {routeRevenues.map((r, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                  <td style={{ padding: '12px', fontWeight: 700, color: '#0f172a' }}>
                    {r.route}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span className="badge badge-info font-mono">{r.buses} Buses</span>
                  </td>
                  <td style={{ padding: '12px', color: '#334155' }}>
                    {r.dailyTickets.toLocaleString()}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '60px', height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${r.digitalPct}%`, height: '100%', background: '#2563eb' }} />
                      </div>
                      <span className="font-mono" style={{ fontSize: '0.78rem', fontWeight: 700, color: '#2563eb' }}>{r.digitalPct}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <strong className="font-mono" style={{ color: '#16a34a', fontSize: '0.9rem' }}>{r.revenue}</strong>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span className="badge badge-success font-mono">{r.growth}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live ETM POS Ticketing Audit Stream */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', color: '#0f172a', margin: 0, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CreditCard size={18} color="#7c3aed" />
              Live Electronic Ticket Machine (ETM) Audit Log
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
              Live ticketing validation streaming from 7,420 bus conductors' hand-held POS terminals
            </p>
          </div>
          <span className="badge badge-info font-mono" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <RefreshCw size={12} className="spin-slow" />
            Live Sync
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)', background: '#f8fafc' }}>
                <th style={{ padding: '10px 12px' }}>Txn Ref ID</th>
                <th style={{ padding: '10px 12px' }}>Timestamp</th>
                <th style={{ padding: '10px 12px' }}>Bus Unit</th>
                <th style={{ padding: '10px 12px' }}>Conductor</th>
                <th style={{ padding: '10px 12px' }}>Payment Mode</th>
                <th style={{ padding: '10px 12px' }}>Amount</th>
                <th style={{ padding: '10px 12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {liveTransactions.map((tx) => (
                <tr key={tx.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '10px 12px', fontFamily: 'monospace', color: '#2563eb', fontWeight: 700 }}>{tx.id}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-muted)' }}>{tx.time}</td>
                  <td style={{ padding: '10px 12px', fontWeight: 600, color: '#0f172a' }}>{tx.bus}</td>
                  <td style={{ padding: '10px 12px', color: '#334155' }}>{tx.conductor}</td>
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>{tx.type}</td>
                  <td style={{ padding: '10px 12px', fontWeight: 800, color: tx.status === 'PINK_PASS' ? '#db2777' : '#16a34a' }}>{tx.amount}</td>
                  <td style={{ padding: '10px 12px' }}>
                    {tx.status === 'PINK_PASS' ? (
                      <span className="badge" style={{ background: '#fce7f3', color: '#be185d', border: '1px solid #fbcfe8' }}>PINK PASS</span>
                    ) : (
                      <span className="badge badge-success">VERIFIED</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
