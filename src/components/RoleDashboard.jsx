import React from 'react';
import { Activity, ArrowUpRight, Bus, CalendarDays, CircleCheck, Clock3, MapPin, Ticket, Users } from 'lucide-react';
import ConductorApp from './ConductorApp';
import PassengerApp from './PassengerApp';

const dashboardData = {
  conductor: {
    title: 'Conductor dashboard',
    subtitle: 'Your shift at a glance. Issue and validate tickets using the ticketing terminal below.',
    badge: 'ON DUTY',
    icon: Ticket,
    metrics: [
      { label: 'Tickets validated', value: '38', detail: 'This trip', icon: CircleCheck, tone: 'green' },
      { label: 'Passengers onboard', value: '43', detail: 'Live camera count', icon: Users, tone: 'blue' },
      { label: 'Current route', value: '534-A', detail: 'EV Express', icon: Bus, tone: 'purple' },
      { label: 'Shift status', value: 'Active', detail: 'Millennium Park depot', icon: Activity, tone: 'amber' },
    ],
    section: 'Ticketing terminal',
    detail: 'Scan passes, issue tickets, and monitor passenger counts for your active trip.',
    app: ConductorApp,
  },
  user: {
    title: 'Passenger dashboard',
    subtitle: 'Plan your next journey, keep your ticket handy, and stay up to date while you travel.',
    badge: 'SERVICE LIVE',
    icon: Bus,
    metrics: [
      { label: 'Nearby service', value: '2 min', detail: 'Route 534-A arriving', icon: Clock3, tone: 'green' },
      { label: 'Next stop', value: 'AIIMS', detail: 'Delhi Metro Station', icon: MapPin, tone: 'blue' },
      { label: 'Tickets', value: 'Ready', detail: 'Book or view a journey', icon: Ticket, tone: 'purple' },
      { label: 'Travel today', value: 'Today', detail: 'View your trip details', icon: CalendarDays, tone: 'amber' },
    ],
    section: 'Journey planner',
    detail: 'Search for a route, choose a seat, and view your digital ticket or emergency options.',
    app: PassengerApp,
  },
};

export default function RoleDashboard({ role }) {
  const dashboard = dashboardData[role];
  const DashboardIcon = dashboard.icon;
  const RoleApp = dashboard.app;

  return (
    <div className="role-dashboard">
      <section className="role-dashboard-heading">
        <div>
          <div className="role-dashboard-kicker"><DashboardIcon size={15} /> PERSONAL WORKSPACE</div>
          <h1>{dashboard.title}</h1>
          <p>{dashboard.subtitle}</p>
        </div>
        <span className="role-dashboard-status"><i /> {dashboard.badge}</span>
      </section>

      <section className="dashboard-metrics" aria-label="Dashboard summary">
        {dashboard.metrics.map(({ label, value, detail, icon: Icon, tone }) => (
          <article className="dashboard-metric" key={label}>
            <span className={`dashboard-metric-icon ${tone}`}><Icon size={18} /></span>
            <span className="dashboard-metric-label">{label}</span>
            <strong>{value}</strong>
            <span className="dashboard-metric-detail">{detail}</span>
          </article>
        ))}
      </section>

      <section className="dashboard-tool-heading">
        <div>
          <span className="dashboard-tool-eyebrow"><ArrowUpRight size={14} /> QUICK ACCESS</span>
          <h2>{dashboard.section}</h2>
          <p>{dashboard.detail}</p>
        </div>
        <span className="dashboard-live"><i /> Live service</span>
      </section>
      <RoleApp />
    </div>
  );
}
