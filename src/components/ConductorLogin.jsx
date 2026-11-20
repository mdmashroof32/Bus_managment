import React, { useState } from 'react';
import { ArrowRight, BusFront, LockKeyhole, ShieldCheck } from 'lucide-react';

export default function ConductorLogin({ onLogin, onBack }) {
  const [staffId, setStaffId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin();
  };

  return (
    <main className="conductor-login-page">
      <section className="conductor-login-card" aria-labelledby="conductor-login-title">
        <div className="conductor-brand">
          <span className="conductor-brand-icon"><BusFront size={28} /></span>
          <span>DELHI TRANSIT <strong>CONTROL</strong></span>
        </div>

        <div className="conductor-login-heading">
          <span className="conductor-shield"><ShieldCheck size={24} /></span>
          <p className="conductor-eyebrow">CONDUCTOR ACCESS</p>
          <h1 id="conductor-login-title">Welcome aboard</h1>
          <p>Sign in with your staff credentials to open your ticketing terminal.</p>
        </div>

        <form className="conductor-login-form" onSubmit={handleSubmit}>
          <label htmlFor="conductor-staff-id">Staff ID</label>
          <input
            autoComplete="username"
            id="conductor-staff-id"
            name="staffId"
            onChange={(event) => setStaffId(event.target.value)}
            placeholder="Enter your conductor ID"
            required
            type="text"
            value={staffId}
          />

          <div className="conductor-password-label">
            <label htmlFor="conductor-password">Password</label>
            <LockKeyhole size={16} aria-hidden="true" />
          </div>
          <input
            autoComplete="current-password"
            id="conductor-password"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            required
            type="password"
            value={password}
          />

          <button className="conductor-login-submit" type="submit">
            Open conductor dashboard <ArrowRight size={18} />
          </button>
        </form>

        <p className="conductor-demo-notice">
          Demo sign-in: credentials are not verified. Connect a secure authentication service before using this portal with real accounts or data.
        </p>
        <button className="conductor-back-link" onClick={onBack} type="button">Back to administrator sign in</button>
      </section>
      <p className="conductor-login-footer">Delhi Intelligent Bus Management System • Staff portal</p>
    </main>
  );
}
