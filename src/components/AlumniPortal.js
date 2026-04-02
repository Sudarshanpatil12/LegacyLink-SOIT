import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const departments = [
  'Computer Science (CSE)', 'Electronics & Communication (ECE)',
  'Mechanical Engineering (ME)', 'Information Technology (IT)',
  'Civil Engineering (CE)', 'Electrical Engineering (EE)',
  'Biotechnology (BT)', 'Chemical Engineering (CHE)',
  'Computer Science & Business Systems (CSBS)', 'AI & Machine Learning (AIML)',
  'CSE Data Science (CSE-DS)', 'Cybersecurity', 'IoT & Automation (IoTA)'
];

const AlumniPortal = () => {
  const { user, userType, loginAlumni, updateProfile, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const [loginData, setLoginData] = useState({ enrollmentNumber: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '', email: '', enrollmentNumber: '', mobile: '',
    graduationYear: '', department: '', jobTitle: '', company: '',
    location: '', linkedinUrl: '', bio: '', experience: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user && userType === 'alumni') {
      setProfileData({
        name: user.name || '', email: user.email || '',
        enrollmentNumber: user.enrollmentNumber || '', mobile: user.mobile || '',
        graduationYear: user.graduationYear || '', department: user.department || '',
        jobTitle: user.jobTitle || '', company: user.company || '',
        location: user.location || '', linkedinUrl: user.linkedinUrl || '',
        bio: user.bio || '',
        experience: Array.isArray(user.experience) ? user.experience.join('\n') : ''
      });
    }
  }, [user, userType]);

  useEffect(() => {
    if (location.state?.message) setMessage(location.state.message);
  }, [location.state]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); setMessage('');
    const result = await loginAlumni(loginData.enrollmentNumber.trim().toUpperCase(), loginData.password);
    if (!result.success) { setError(result.error || 'Login failed'); return; }
    setMessage('Login successful');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError(''); setMessage(''); setSaving(true);
    const payload = {
      name: profileData.name, email: profileData.email, mobile: profileData.mobile,
      graduationYear: Number(profileData.graduationYear), department: profileData.department,
      jobTitle: profileData.jobTitle, company: profileData.company,
      location: profileData.location, linkedinUrl: profileData.linkedinUrl,
      bio: profileData.bio,
      experience: profileData.experience.split('\n').map(l => l.trim()).filter(Boolean)
    };
    const result = await updateProfile(payload);
    setSaving(false);
    if (!result.success) { setError(result.error || 'Profile update failed'); return; }
    setMessage(result.message || 'Changes submitted for approval.');
  };

  const set = (field) => (e) => setProfileData(prev => ({ ...prev, [field]: e.target.value }));

  const css = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    /* Classic grid/dot background pattern */
    .ap-page {
      min-height: 100vh;
      font-family: Arial, sans-serif;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding: 40px 16px 60px;
      position: relative;
      background-color: #eef2f7;
      background-image:
        linear-gradient(rgba(10, 74, 122, 0.07) 1px, transparent 1px),
        linear-gradient(90deg, rgba(10, 74, 122, 0.07) 1px, transparent 1px);
      background-size: 32px 32px;
    }

    /* Soft vignette so edges feel warm, not harsh */
    .ap-page::before {
      content: '';
      position: fixed; inset: 0;
      background: radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(10,74,122,0.06) 100%);
      pointer-events: none; z-index: 0;
    }

    .ap-card {
      position: relative; z-index: 1;
      width: 100%; max-width: 780px;
      background: white;
      border-radius: 12px; overflow: hidden;
      box-shadow:
        0 1px 0 rgba(10,74,122,0.08),
        0 4px 6px rgba(0,0,0,0.04),
        0 12px 32px rgba(10,74,122,0.10);
      animation: fadeUp 0.4s ease both;
    }

    .ap-card-sm { max-width: 460px; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* Header */
    .ap-header {
      background: #0a4a7a;
      padding: 24px 32px;
      display: flex; align-items: center;
      justify-content: space-between; gap: 16px;
      /* thin orange stripe at bottom */
      border-bottom: 3px solid #e67e22;
    }

    .ap-header-left { display: flex; align-items: center; gap: 12px; }

    .ap-icon {
      width: 42px; height: 42px; border-radius: 8px;
      background: #e67e22;
      display: flex; align-items: center; justify-content: center;
      font-size: 20px; flex-shrink: 0;
    }

    .ap-title { font-size: 1.2rem; font-weight: 700; color: white; line-height: 1.3; }
    .ap-subtitle { font-size: 0.78rem; color: rgba(255,255,255,0.72); margin-top: 2px; }

    .ap-logout-btn {
      background: rgba(255,255,255,0.12);
      border: 1px solid rgba(255,255,255,0.25);
      color: rgba(255,255,255,0.85); font-size: 0.8rem; font-weight: 500;
      padding: 6px 14px; border-radius: 6px; cursor: pointer;
      transition: background 0.2s;
    }
    .ap-logout-btn:hover { background: rgba(255,255,255,0.22); color: white; }

    /* Body */
    .ap-body { padding: 28px 32px 30px; }

    .ap-alert {
      border-radius: 6px; padding: 10px 14px; font-size: 0.875rem;
      display: flex; align-items: center; gap: 8px; margin-bottom: 20px;
    }
    .ap-alert-error {
      background: #fee2e2; border: 1px solid #fca5a5; color: #b91c1c;
      animation: shake 0.3s ease;
    }
    .ap-alert-ok { background: #dcfce7; border: 1px solid #86efac; color: #166534; }

    @keyframes shake {
      0%,100% { transform: translateX(0); }
      25%,75%  { transform: translateX(-4px); }
      50%      { transform: translateX(4px); }
    }

    /* Section divider */
    .ap-section {
      display: flex; align-items: center; gap: 10px;
      margin: 24px 0 14px;
    }
    .ap-section:first-child { margin-top: 0; }
    .ap-section-line { flex: 1; height: 1px; background: #e5e7eb; }
    .ap-section-tag {
      font-size: 0.72rem; font-weight: 700; letter-spacing: 0.09em;
      text-transform: uppercase; color: #0a4a7a; white-space: nowrap;
    }

    /* Grid */
    .ap-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .ap-full { grid-column: 1 / -1; }
    .ap-field { display: flex; flex-direction: column; gap: 5px; }
    .ap-label {
      font-size: 0.72rem; font-weight: 700; color: #374151;
      letter-spacing: 0.05em; text-transform: uppercase;
    }

    /* Inputs */
    .ap-input, .ap-select, .ap-textarea {
      width: 100%; padding: 9px 12px;
      border-radius: 6px; border: 1px solid #d1d5db;
      font-size: 0.9rem; font-family: Arial, sans-serif;
      color: #111827; background: #f9fafb;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
      outline: none; -webkit-appearance: none; appearance: none;
    }
    .ap-input:focus, .ap-select:focus, .ap-textarea:focus {
      border-color: #0a4a7a; background: white;
      box-shadow: 0 0 0 3px rgba(10,74,122,0.1);
    }
    .ap-input::placeholder, .ap-textarea::placeholder { color: #9ca3af; }
    .ap-input:read-only {
      background: #f3f4f6; color: #9ca3af;
      cursor: not-allowed; border-color: #e5e7eb;
    }
    .ap-textarea { resize: vertical; min-height: 88px; line-height: 1.5; }

    .ap-input-wrap { position: relative; }
    .ap-input-wrap .ap-input { padding-right: 38px; }
    .ap-eye-btn {
      position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
      background: none; border: none; cursor: pointer;
      color: #9ca3af; font-size: 14px; transition: color 0.15s;
    }
    .ap-eye-btn:hover { color: #0a4a7a; }

    .ap-select-wrap { position: relative; }
    .ap-select-wrap::after {
      content: '▾'; position: absolute; right: 12px; top: 50%;
      transform: translateY(-50%); color: #9ca3af;
      pointer-events: none; font-size: 11px;
    }

    /* User badge */
    .ap-user-badge {
      display: flex; align-items: center; gap: 12px;
      background: #f0f6ff;
      border: 1px solid #dbeafe;
      border-left: 4px solid #0a4a7a;
      border-radius: 8px; padding: 12px 16px; margin-bottom: 22px;
    }
    .ap-user-avatar {
      width: 40px; height: 40px; border-radius: 50%;
      background: #0a4a7a;
      display: flex; align-items: center; justify-content: center;
      font-size: 16px; flex-shrink: 0;
    }
    .ap-user-name { font-size: 0.95rem; font-weight: 600; color: #0a4a7a; }
    .ap-user-meta { font-size: 0.78rem; color: #64748b; margin-top: 2px; }

    /* Footer */
    .ap-footer {
      display: flex; align-items: center; justify-content: space-between;
      padding: 16px 32px 24px;
      border-top: 1px solid #e5e7eb;
      background: #f8fafc;
      gap: 12px;
    }

    .ap-register-link { font-size: 0.875rem; color: #6b7280; }
    .ap-register-link a { color: #0a4a7a; font-weight: 600; text-decoration: none; }
    .ap-register-link a:hover { color: #082e4d; text-decoration: underline; }

    /* Primary button */
    .ap-btn-primary {
      background: #0a4a7a; color: white; border: none;
      padding: 10px 24px; border-radius: 6px;
      font-size: 0.9rem; font-weight: 600;
      cursor: pointer; display: flex; align-items: center; gap: 6px;
      box-shadow: 0 4px 6px -1px rgba(10,74,122,0.25);
      transition: background-color 0.2s ease, transform 0.2s ease;
    }
    .ap-btn-primary:hover:not(:disabled) {
      background: #082e4d; transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(10,74,122,0.3);
    }
    .ap-btn-primary:active:not(:disabled) { transform: translateY(0); }
    .ap-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

    .ap-spinner {
      width: 14px; height: 14px;
      border: 2px solid rgba(255,255,255,0.35); border-top-color: white;
      border-radius: 50%; animation: spin 0.65s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    @media (max-width: 600px) {
      .ap-page { background-size: 20px 20px; }
      .ap-header { padding: 18px 20px; flex-wrap: wrap; }
      .ap-body { padding: 20px 20px 22px; }
      .ap-footer { padding: 14px 20px 20px; flex-wrap: wrap; }
      .ap-grid { grid-template-columns: 1fr; }
      .ap-full { grid-column: 1; }
      .ap-btn-primary { width: 100%; justify-content: center; }
    }
  `;

  // ── LOGIN VIEW ──
  if (!isAuthenticated() || userType !== 'alumni') {
    return (
      <>
        <style>{css}</style>
        <div className="ap-page">
          <div className="ap-card ap-card-sm">
            <div className="ap-header">
              <div className="ap-header-left">
                <div className="ap-icon">🎓</div>
                <div>
                  <div className="ap-title">Alumni Login</div>
                  <div className="ap-subtitle">Sign in with your enrollment number</div>
                </div>
              </div>
            </div>

            <form onSubmit={handleLogin}>
              <div className="ap-body">
                {error   && <div className="ap-alert ap-alert-error"><span>⚠️</span> {error}</div>}
                {message && <div className="ap-alert ap-alert-ok"><span>✅</span> {message}</div>}

                <div className="ap-section" style={{ marginTop: 0 }}>
                  <span className="ap-section-tag">Credentials</span>
                  <div className="ap-section-line" />
                </div>

                <div className="ap-grid">
                  <div className="ap-field ap-full">
                    <label className="ap-label">Enrollment Number *</label>
                    <input
                      className="ap-input"
                      placeholder="e.g. 0901CS201234"
                      value={loginData.enrollmentNumber}
                      onChange={e => setLoginData(p => ({ ...p, enrollmentNumber: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="ap-field ap-full">
                    <label className="ap-label">Password *</label>
                    <div className="ap-input-wrap">
                      <input
                        className="ap-input"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={e => setLoginData(p => ({ ...p, password: e.target.value }))}
                        required
                      />
                      <button type="button" className="ap-eye-btn" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? '🙈' : '👁️'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ap-footer">
                <div className="ap-register-link">
                  New here? <Link to="/register">Register as Alumni</Link>
                </div>
                <button type="submit" className="ap-btn-primary">Login →</button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }

  // ── PROFILE VIEW ──
  return (
    <>
      <style>{css}</style>
      <div className="ap-page">
        <div className="ap-card">
          <div className="ap-header">
            <div className="ap-header-left">
              <div className="ap-icon">🎓</div>
              <div>
                <div className="ap-title">My Alumni Profile</div>
                <div className="ap-subtitle">Changes require admin approval before they are applied</div>
              </div>
            </div>
            <button type="button" className="ap-logout-btn" onClick={logout}>Sign Out</button>
          </div>

          <form onSubmit={handleSave}>
            <div className="ap-body">
              {error   && <div className="ap-alert ap-alert-error"><span>⚠️</span> {error}</div>}
              {message && <div className="ap-alert ap-alert-ok"><span>✅</span> {message}</div>}

              <div className="ap-user-badge">
                <div className="ap-user-avatar">👤</div>
                <div>
                  <div className="ap-user-name">{profileData.name || 'Alumni'}</div>
                  <div className="ap-user-meta">{profileData.enrollmentNumber} · {profileData.department || 'N/A'}</div>
                </div>
              </div>

              <div className="ap-section">
                <span className="ap-section-tag">Personal Information</span>
                <div className="ap-section-line" />
              </div>
              <div className="ap-grid">
                <div className="ap-field">
                  <label className="ap-label">Full Name *</label>
                  <input className="ap-input" value={profileData.name} onChange={set('name')} placeholder="Full Name" required />
                </div>
                <div className="ap-field">
                  <label className="ap-label">Email Address *</label>
                  <input className="ap-input" type="email" value={profileData.email} onChange={set('email')} placeholder="Email" required />
                </div>
                <div className="ap-field">
                  <label className="ap-label">Enrollment Number</label>
                  <input className="ap-input" value={profileData.enrollmentNumber} readOnly />
                </div>
                <div className="ap-field">
                  <label className="ap-label">Mobile Number *</label>
                  <input className="ap-input" value={profileData.mobile} onChange={set('mobile')} placeholder="Mobile" required />
                </div>
              </div>

              <div className="ap-section">
                <span className="ap-section-tag">Academic Details</span>
                <div className="ap-section-line" />
              </div>
              <div className="ap-grid">
                <div className="ap-field">
                  <label className="ap-label">Graduation Year *</label>
                  <input className="ap-input" type="number" value={profileData.graduationYear} onChange={set('graduationYear')} placeholder="e.g. 2022" required />
                </div>
                <div className="ap-field">
                  <label className="ap-label">Department *</label>
                  <div className="ap-select-wrap">
                    <select className="ap-select" value={profileData.department} onChange={set('department')} required>
                      <option value="">Select Department</option>
                      {departments.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="ap-section">
                <span className="ap-section-tag">Professional Info</span>
                <div className="ap-section-line" />
              </div>
              <div className="ap-grid">
                <div className="ap-field">
                  <label className="ap-label">Job Title *</label>
                  <input className="ap-input" value={profileData.jobTitle} onChange={set('jobTitle')} placeholder="e.g. Software Engineer" required />
                </div>
                <div className="ap-field">
                  <label className="ap-label">Company *</label>
                  <input className="ap-input" value={profileData.company} onChange={set('company')} placeholder="e.g. Infosys" required />
                </div>
                <div className="ap-field ap-full">
                  <label className="ap-label">Location *</label>
                  <input className="ap-input" value={profileData.location} onChange={set('location')} placeholder="e.g. Bengaluru, India" required />
                </div>
              </div>

              <div className="ap-section">
                <span className="ap-section-tag">Optional</span>
                <div className="ap-section-line" />
              </div>
              <div className="ap-grid">
                <div className="ap-field ap-full">
                  <label className="ap-label">LinkedIn URL</label>
                  <input className="ap-input" value={profileData.linkedinUrl} onChange={set('linkedinUrl')} placeholder="https://linkedin.com/in/yourprofile" />
                </div>
                <div className="ap-field ap-full">
                  <label className="ap-label">Short Bio</label>
                  <textarea className="ap-textarea" value={profileData.bio} onChange={set('bio')} placeholder="A few lines about yourself…" />
                </div>
                <div className="ap-field ap-full">
                  <label className="ap-label">Experience</label>
                  <textarea
                    className="ap-textarea" style={{ minHeight: '100px' }}
                    value={profileData.experience} onChange={set('experience')}
                    placeholder={"One entry per line, e.g.\nSenior Engineer at TCS (2022–Present)\nIntern at Wipro (2021)"}
                  />
                </div>
              </div>
            </div>

            <div className="ap-footer">
              <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                ✏️ Changes will be reviewed by admin
              </div>
              <button type="submit" className="ap-btn-primary" disabled={saving}>
                {saving ? <><div className="ap-spinner" /> Saving…</> : <>Save Changes →</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AlumniPortal;