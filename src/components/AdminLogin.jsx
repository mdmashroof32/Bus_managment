import React, { useState } from 'react';
import { ArrowRight, BusFront, LockKeyhole, ShieldCheck } from 'lucide-react';

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username.trim() || !password) {
      setError('Enter your username and password to continue.');
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
          <p className="admin-login-eyebrow">ADMINISTRATOR ACCESS</p>
          <h1 id="admin-login-title">Sign in to your dashboard</h1>
          <p>Enter your administrator username and password to continue.</p>
        </div>

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <label htmlFor="admin-username">Username</label>
          <input
            autoComplete="username"
            id="admin-username"
            name="username"
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter your username"
            required
            type="text"
            value={username}
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
            Sign in <ArrowRight size={17} />
          </button>
        </form>

        <p className="admin-login-notice">
          Demo interface: credentials are not verified. Connect a secure authentication service before using this portal with real accounts or data.
        </p>
      </section>
      <p className="admin-login-footer">Delhi Intelligent Bus Management System</p>
    </main>
  );
}
