import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { loginAdmin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields'); return; }
    const result = await loginAdmin(email, password);
    if (!result.success) {
      setError(result.error || 'Invalid credentials');
      return;
    }
    navigate('/admin');
  };

  const css = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    .al-page {
      min-height: 100vh;
      font-family: Arial, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 16px;
      position: relative;
      background-color: #eef2f7;
      background-image:
        linear-gradient(rgba(10, 74, 122, 0.07) 1px, transparent 1px),
        linear-gradient(90deg, rgba(10, 74, 122, 0.07) 1px, transparent 1px);
      background-size: 32px 32px;
    }

    .al-page::before {
      content: '';
      position: fixed; inset: 0;
      background: radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(10,74,122,0.06) 100%);
      pointer-events: none; z-index: 0;
    }

    .al-card {
      position: relative; z-index: 1;
      width: 100%; max-width: 440px;
      background: white;
      border-radius: 12px; overflow: hidden;
      box-shadow:
        0 1px 0 rgba(10,74,122,0.08),
        0 4px 6px rgba(0,0,0,0.04),
        0 12px 32px rgba(10,74,122,0.10);
      animation: fadeUp 0.4s ease both;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .al-header {
      background: #0a4a7a;
      padding: 24px 32px;
      display: flex; align-items: center; gap: 12px;
      border-bottom: 3px solid #e67e22;
    }

    .al-icon {
      width: 42px; height: 42px; border-radius: 8px;
      background: #e67e22;
      display: flex; align-items: center; justify-content: center;
      font-size: 20px; flex-shrink: 0;
    }

    .al-title { font-size: 1.2rem; font-weight: 700; color: white; line-height: 1.3; }
    .al-subtitle { font-size: 0.78rem; color: rgba(255,255,255,0.72); margin-top: 2px; }

    .al-body { padding: 26px 32px 10px; }

    .al-error {
      background: #fee2e2; border: 1px solid #fca5a5; color: #b91c1c;
      border-radius: 6px; padding: 10px 12px; font-size: 0.875rem;
      display: flex; align-items: center; gap: 8px;
      margin-bottom: 18px; animation: shake 0.3s ease;
    }

    @keyframes shake {
      0%,100% { transform: translateX(0); }
      25%,75%  { transform: translateX(-4px); }
      50%      { transform: translateX(4px); }
    }

    .al-section {
      display: flex; align-items: center; gap: 10px;
      margin: 18px 0 14px;
    }
    .al-section-line { flex: 1; height: 1px; background: #e5e7eb; }
    .al-section-tag {
      font-size: 0.72rem; font-weight: 700; letter-spacing: 0.09em;
      text-transform: uppercase; color: #0a4a7a; white-space: nowrap;
    }

    .al-field { display: flex; flex-direction: column; gap: 5px; margin-bottom: 14px; }
    .al-label {
      font-size: 0.72rem; font-weight: 700; color: #374151;
      letter-spacing: 0.05em; text-transform: uppercase;
    }

    .al-input-wrap { position: relative; }

    .al-input {
      width: 100%; padding: 9px 38px 9px 12px;
      border-radius: 6px; border: 1px solid #d1d5db;
      font-size: 0.9rem; font-family: Arial, sans-serif;
      color: #111827; background: #f9fafb;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
      outline: none;
    }
    .al-input:focus {
      border-color: #0a4a7a; background: white;
      box-shadow: 0 0 0 3px rgba(10,74,122,0.1);
    }
    .al-input::placeholder { color: #9ca3af; }

    .al-input-icon {
      position: absolute; right: 10px; top: 50%;
      transform: translateY(-50%);
      color: #9ca3af; display: flex; align-items: center;
    }

    .al-eye-btn {
      background: none; border: none; cursor: pointer;
      color: #9ca3af; display: flex; align-items: center;
      padding: 0; transition: color 0.15s;
    }
    .al-eye-btn:hover { color: #0a4a7a; }

    .al-demo {
      background: #f0f6ff;
      border: 1px solid #dbeafe;
      border-left: 4px solid #0a4a7a;
      border-radius: 6px;
      padding: 12px 14px;
      font-size: 0.875rem;
      color: #1e3a5f;
      line-height: 1.7;
      margin-bottom: 6px;
    }
    .al-demo strong {
      color: #0a4a7a; display: block; margin-bottom: 2px;
      font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.06em;
    }

    .al-footer {
      padding: 16px 32px 24px;
      border-top: 1px solid #e5e7eb;
      background: #f8fafc;
    }

    .al-submit {
      width: 100%;
      background: #0a4a7a;
      color: white; border: none;
      padding: 10px 24px; border-radius: 6px;
      font-size: 0.9rem; font-weight: 600;
      font-family: Arial, sans-serif;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center; gap: 6px;
      box-shadow: 0 4px 6px -1px rgba(10,74,122,0.25);
      transition: background-color 0.2s ease, transform 0.2s ease;
      margin-bottom: 14px;
    }
    .al-submit:hover {
      background: #082e4d; transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(10,74,122,0.3);
    }
    .al-submit:active { transform: translateY(0); }

    .al-links {
      text-align: center; font-size: 0.8rem;
      color: #6b7280; line-height: 1.8;
    }
    .al-links a { color: #0a4a7a; font-weight: 600; text-decoration: none; }
    .al-links a:hover { color: #082e4d; text-decoration: underline; }

    @media (max-width: 480px) {
      .al-page { background-size: 20px 20px; }
      .al-header { padding: 18px 20px; }
      .al-body { padding: 20px 20px 10px; }
      .al-footer { padding: 14px 20px 20px; }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <div className="al-page">
        <div className="al-card">

          <div className="al-header">
            <div className="al-icon">🛡️</div>
            <div>
              <div className="al-title">Admin Portal</div>
              <div className="al-subtitle">Sign in to manage the alumni network</div>
            </div>
          </div>

          <div className="al-body">
            {error && <div className="al-error"><span>⚠️</span> {error}</div>}

            <div className="al-demo">
              <strong>Default Admin Credentials</strong>
              Email: `admin@rgpv.com`<br />
              Password: `admin123`
            </div>

            <form onSubmit={handleSubmit}>
              <div className="al-section" style={{ marginTop: 0 }}>
                <span className="al-section-tag">Credentials</span>
                <div className="al-section-line" />
              </div>

              <div className="al-field">
                <label className="al-label">Email Address</label>
                <div className="al-input-wrap">
                  <input
                    className="al-input"
                    type="email"
                    placeholder="admin@rgpv.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span className="al-input-icon"><Mail size={15} /></span>
                </div>
              </div>

              <div className="al-field" style={{ marginBottom: 0 }}>
                <label className="al-label">Password</label>
                <div className="al-input-wrap">
                  <input
                    className="al-input"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="al-input-icon">
                    <button type="button" className="al-eye-btn" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </span>
                </div>
              </div>

            </form>
          </div>

          <div className="al-footer">
            <button className="al-submit" onClick={handleSubmit}>
              Sign In
            </button>
            <div className="al-links">
              Not an admin?&nbsp;
              <Link to="/register">Register as Alumni</Link>
              &nbsp;or&nbsp;
              <Link to="/alumni">View Directory</Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Login;
