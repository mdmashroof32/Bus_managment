import React, { useState } from 'react';
import { ArrowRight, BusFront, LockKeyhole, ShieldCheck } from 'lucide-react';

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email.trim() || !password) {
      setError('Enter your administrator email and password to continue.');
      return;
    }

    setError('');
    onLogin();
  };

  return (
    <main className="admin-login-page">
      <section className="admin-login-card" aria-labelledby="admin-login-title">
        <div className="admin-login-brand">
          <span className="admin-login-logo"><BusFront size={25} /></span>
          <span>DELHI TRANSIT <strong>CONTROL</strong></span>
        </div>

        <div className="admin-login-heading">
          <span className="admin-login-icon"><ShieldCheck size={22} /></span>
          <p className="admin-login-eyebrow">SECURE STAFF ACCESS</p>
          <h1 id="admin-login-title">Administrator sign in</h1>
          <p>Sign in to access fleet operations, service alerts, and network controls.</p>
        </div>

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <label htmlFor="admin-email">Work email</label>
          <input
            autoComplete="username"
            id="admin-email"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@transport.gov.in"
            required
            type="email"
            value={email}
          />

          <div className="admin-password-label">
            <label htmlFor="admin-password">Password</label>
            <LockKeyhole size={15} aria-hidden="true" />
          </div>
          <input
            autoComplete="current-password"
            id="admin-password"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            required
            type="password"
            value={password}
          />

          {error && <p className="admin-login-error" role="alert">{error}</p>}
          <button className="admin-login-submit" type="submit">
            Continue to dashboard <ArrowRight size={17} />
          </button>
        </form>

        <p className="admin-login-notice">
          Prototype only: this form does not verify credentials. Connect a secure authentication service before using it with real accounts or data.
        </p>
      </section>
      <p className="admin-login-footer">Delhi Intelligent Bus Management System <span>•</span> Staff portal</p>
    </main>
  );
}
