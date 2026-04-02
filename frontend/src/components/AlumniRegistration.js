import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const departments = [
  'Computer Science (CSE)',
  'Electronics & Communication (ECE)',
  'Mechanical Engineering (ME)',
  'Information Technology (IT)',
  'Civil Engineering (CE)',
  'Electrical Engineering (EE)',
  'Biotechnology (BT)',
  'Chemical Engineering (CHE)',
  'Computer Science & Business Systems (CSBS)',
  'AI & Machine Learning (AIML)',
  'CSE Data Science (CSE-DS)',
  'Cybersecurity',
  'IoT & Automation (IoTA)'
];

const AlumniRegistration = () => {
  const navigate = useNavigate();
  const { registerAlumni } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');
  const [formData, setFormData] = useState({
    name: '', email: '', enrollmentNumber: '', password: '',
    confirmPassword: '', mobile: '', graduationYear: '', department: '',
    jobTitle: '', company: '', location: '', linkedinUrl: '', bio: '', profileImage: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('Profile photo must be 2 MB or smaller.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || '');
      setFormData((prev) => ({ ...prev, profileImage: result }));
      setPhotoPreview(result);
      setError('');
    };
    reader.onerror = () => {
      setError('Unable to read the selected image.');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError('Password and confirm password should match.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    const trimmedLinkedin = formData.linkedinUrl.trim();
    if (trimmedLinkedin && !/^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/.test(trimmedLinkedin)) {
      setError('Invalid LinkedIn URL. Use linkedin.com/in/... or leave the field empty.');
      return;
    }
    setIsSubmitting(true);
    const payload = {
      name: formData.name, email: formData.email,
      enrollmentNumber: formData.enrollmentNumber.trim().toUpperCase(),
      password: formData.password, mobile: formData.mobile,
      graduationYear: Number(formData.graduationYear), department: formData.department,
      jobTitle: formData.jobTitle, company: formData.company,
      location: formData.location, linkedinUrl: trimmedLinkedin || '', bio: formData.bio,
      profileImage: formData.profileImage || ''
    };
    const result = await registerAlumni(payload);
    setIsSubmitting(false);
    if (!result.success) { setError(result.error || 'Registration failed'); return; }
    navigate('/alumni-portal', {
      state: { message: result.message || 'Registration submitted. Await admin approval before logging in.' }
    });
  };

  const pwdStrength = () => {
    const p = formData.password;
    if (!p) return { width: '0%', color: 'transparent', label: '' };
    if (p.length < 6) return { width: '25%', color: '#ef4444', label: 'Too short' };
    if (p.length < 8) return { width: '50%', color: '#f59e0b', label: 'Fair' };
    if (!/[0-9]/.test(p) || !/[^a-zA-Z0-9]/.test(p)) return { width: '70%', color: '#2563eb', label: 'Good' };
    return { width: '100%', color: '#16a34a', label: 'Strong' };
  };

  const str = pwdStrength();

  const css = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    /* ── Same grid bg as Login & AlumniPortal ── */
    .ar-page {
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

    .ar-page::before {
      content: '';
      position: fixed; inset: 0;
      background: radial-gradient(ellipse 80% 80% at 50% 40%, transparent 40%, rgba(10,74,122,0.06) 100%);
      pointer-events: none; z-index: 0;
    }

    .ar-card {
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

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* ── Header: same navy + orange stripe as Login/Portal ── */
    .ar-header {
      background: #0a4a7a;
      padding: 22px 32px;
      display: flex; align-items: center;
      justify-content: space-between; gap: 16px;
      border-bottom: 3px solid #e67e22;
    }

    .ar-header-left { display: flex; align-items: center; gap: 12px; }

    .ar-icon {
      width: 42px; height: 42px; border-radius: 8px;
      background: #e67e22;
      display: flex; align-items: center; justify-content: center;
      font-size: 20px; flex-shrink: 0;
    }

    .ar-title { font-size: 1.2rem; font-weight: 700; color: white; line-height: 1.3; }
    .ar-subtitle { font-size: 0.78rem; color: rgba(255,255,255,0.72); margin-top: 2px; }

    .ar-login-pill { font-size: 0.78rem; color: rgba(255,255,255,0.72); white-space: nowrap; }
    .ar-login-pill a { color: #fbbf24; font-weight: 600; text-decoration: none; margin-left: 4px; }
    .ar-login-pill a:hover { text-decoration: underline; }

    /* ── Progress steps ── */
    .ar-steps {
      display: flex;
      background: #f0f6ff;
      border-bottom: 1px solid #dbeafe;
      padding: 0;
    }

    .ar-step {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      padding: 10px 8px;
      font-size: 0.75rem;
      font-weight: 600;
      color: #94a3b8;
      border-right: 1px solid #dbeafe;
      transition: color 0.2s;
    }

    .ar-step:last-child { border-right: none; }

    .ar-step.active {
      color: #0a4a7a;
      background: white;
      border-bottom: 2px solid #0a4a7a;
      margin-bottom: -1px;
    }

    .ar-step-num {
      width: 20px; height: 20px;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 0.7rem; font-weight: 700;
      background: #e2e8f0; color: #94a3b8;
      flex-shrink: 0;
      transition: all 0.2s;
    }

    .ar-step.active .ar-step-num {
      background: #0a4a7a; color: white;
    }

    /* ── Body ── */
    .ar-body { padding: 26px 32px 28px; }

    .ar-error {
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

    /* ── Section dividers ── */
    .ar-section {
      display: flex; align-items: center; gap: 10px;
      margin: 22px 0 14px;
    }
    .ar-section:first-child { margin-top: 0; }
    .ar-section-line { flex: 1; height: 1px; background: #e5e7eb; }
    .ar-section-tag {
      font-size: 0.72rem; font-weight: 700; letter-spacing: 0.09em;
      text-transform: uppercase; color: #0a4a7a; white-space: nowrap;
    }

    /* ── Grid ── */
    .ar-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .ar-full { grid-column: 1 / -1; }
    .ar-field { display: flex; flex-direction: column; gap: 5px; }

    .ar-label {
      font-size: 0.72rem; font-weight: 700; color: #374151;
      letter-spacing: 0.05em; text-transform: uppercase;
    }

    /* ── Inputs ── */
    .ar-input, .ar-select, .ar-textarea {
      width: 100%; padding: 9px 12px;
      border-radius: 6px; border: 1px solid #d1d5db;
      font-size: 0.9rem; font-family: Arial, sans-serif;
      color: #111827; background: #f9fafb;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
      outline: none; -webkit-appearance: none; appearance: none;
    }

    .ar-input:focus, .ar-select:focus, .ar-textarea:focus {
      border-color: #0a4a7a; background: white;
      box-shadow: 0 0 0 3px rgba(10,74,122,0.10);
    }

    .ar-input::placeholder, .ar-textarea::placeholder { color: #9ca3af; }
    .ar-textarea { resize: vertical; min-height: 88px; line-height: 1.5; }

    .ar-select-wrap { position: relative; }
    .ar-select-wrap::after {
      content: '▾'; position: absolute; right: 12px; top: 50%;
      transform: translateY(-50%); color: #9ca3af;
      pointer-events: none; font-size: 11px;
    }

    /* ── Password strength ── */
    .ar-pwd-bar-wrap {
      height: 3px; background: #e5e7eb;
      border-radius: 99px; overflow: hidden; margin-top: 5px;
    }
    .ar-pwd-bar {
      height: 100%; border-radius: 99px;
      transition: width 0.3s ease, background 0.3s ease;
    }
    .ar-pwd-hint { font-size: 0.7rem; margin-top: 3px; }

    .ar-photo-box {
      display: flex; align-items: center; gap: 14px;
      padding: 14px; border: 1px dashed #cbd5e1; border-radius: 10px;
      background: #f8fafc;
    }
    .ar-photo-preview {
      width: 84px; height: 84px; border-radius: 18px;
      overflow: hidden; background: linear-gradient(135deg, #0a4a7a, #1e6ba8);
      display: flex; align-items: center; justify-content: center;
      color: white; font-size: 0.75rem; font-weight: 700; text-align: center;
      flex-shrink: 0;
    }
    .ar-photo-preview img {
      width: 100%; height: 100%; object-fit: cover; display: block;
    }
    .ar-upload-btn {
      position: relative; display: inline-flex; align-items: center; justify-content: center;
      padding: 9px 14px; border-radius: 8px; background: #0a4a7a; color: white;
      font-size: 0.85rem; font-weight: 600; cursor: pointer; overflow: hidden;
    }
    .ar-upload-btn input {
      position: absolute; inset: 0; opacity: 0; cursor: pointer;
    }
    .ar-photo-note {
      font-size: 0.75rem; color: #6b7280; line-height: 1.5; margin-top: 6px;
    }

    /* ── Info tip box ── */
    .ar-tip {
      display: flex; align-items: flex-start; gap: 10px;
      background: #f0f6ff;
      border: 1px solid #dbeafe;
      border-left: 4px solid #0a4a7a;
      border-radius: 6px;
      padding: 11px 14px;
      font-size: 0.8rem; color: #1e3a5f;
      line-height: 1.6;
      margin-bottom: 20px;
    }
    .ar-tip-icon { font-size: 1rem; flex-shrink: 0; margin-top: 1px; }

    /* ── Footer ── */
    .ar-footer {
      display: flex; align-items: center; justify-content: space-between;
      padding: 15px 32px 22px;
      border-top: 1px solid #e5e7eb;
      background: #f8fafc;
      gap: 12px;
    }

    .ar-footer-note { font-size: 0.78rem; color: #9ca3af; }

    .ar-submit {
      background: #0a4a7a; color: white; border: none;
      padding: 10px 28px; border-radius: 6px;
      font-size: 0.9rem; font-weight: 600; font-family: Arial, sans-serif;
      cursor: pointer; display: flex; align-items: center; gap: 6px;
      box-shadow: 0 4px 6px -1px rgba(10,74,122,0.25);
      transition: background-color 0.2s ease, transform 0.2s ease;
    }
    .ar-submit:hover:not(:disabled) {
      background: #082e4d; transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(10,74,122,0.3);
    }
    .ar-submit:active:not(:disabled) { transform: translateY(0); }
    .ar-submit:disabled { opacity: 0.6; cursor: not-allowed; }

    .ar-spinner {
      width: 14px; height: 14px;
      border: 2px solid rgba(255,255,255,0.35); border-top-color: white;
      border-radius: 50%; animation: spin 0.65s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    @media (max-width: 600px) {
      .ar-page { background-size: 20px 20px; }
      .ar-header { padding: 16px 18px; flex-wrap: wrap; }
      .ar-body { padding: 18px 18px 20px; }
      .ar-footer { padding: 12px 18px 18px; flex-wrap: wrap; }
      .ar-grid { grid-template-columns: 1fr; }
      .ar-full { grid-column: 1; }
      .ar-step span { display: none; }
      .ar-submit { width: 100%; justify-content: center; }
    }
  `;

  const sections = ['Personal', 'Academic', 'Career', 'Profile'];

  return (
    <>
      <style>{css}</style>
      <div className="ar-page">
        <div className="ar-card">

          {/* Header */}
          <div className="ar-header">
            <div className="ar-header-left">
              <div className="ar-icon">🎓</div>
              <div>
                <div className="ar-title">Alumni Registration</div>
                <div className="ar-subtitle">Create your account using your enrollment number</div>
              </div>
            </div>
            <div className="ar-login-pill">
              Already registered?
              <Link to="/alumni-portal">Login here</Link>
            </div>
          </div>

          {/* Visual section steps (decorative, not clickable) */}
          <div className="ar-steps">
            {sections.map((s, i) => (
              <div key={s} className={`ar-step ${i === 0 ? 'active' : ''}`}>
                <span className="ar-step-num">{i + 1}</span>
                <span>{s}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="ar-body">

              {error && <div className="ar-error"><span>⚠️</span> {error}</div>}

              {/* Info tip */}
              <div className="ar-tip">
                <span className="ar-tip-icon">ℹ️</span>
                <span>Fill all required fields below. Your account will be reviewed by admin before activation. Fields marked <strong>*</strong> are mandatory.</span>
              </div>

              {/* ── Personal ── */}
              <div className="ar-section">
                <span className="ar-section-tag">Personal Information</span>
                <div className="ar-section-line" />
              </div>
              <div className="ar-grid">
                <div className="ar-field ar-full">
                  <label className="ar-label">Profile Photo</label>
                  <div className="ar-photo-box">
                    <div className="ar-photo-preview">
                      {photoPreview ? <img src={photoPreview} alt="Profile preview" /> : 'No photo'}
                    </div>
                    <div>
                      <label className="ar-upload-btn">
                        Upload Photo
                        <input type="file" accept="image/png,image/jpeg,image/jpg,image/webp" onChange={handlePhotoChange} />
                      </label>
                      <div className="ar-photo-note">
                        Optional. PNG, JPG, or WEBP up to 2 MB.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ar-field">
                  <label className="ar-label">Full Name *</label>
                  <input className="ar-input" name="name" placeholder="e.g. Rahul Sharma" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="ar-field">
                  <label className="ar-label">Email Address *</label>
                  <input className="ar-input" type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="ar-field">
                  <label className="ar-label">Enrollment Number *</label>
                  <input className="ar-input" name="enrollmentNumber" placeholder="e.g. 0901CS201234" value={formData.enrollmentNumber} onChange={handleChange} required />
                </div>
                <div className="ar-field">
                  <label className="ar-label">Mobile Number *</label>
                  <input className="ar-input" name="mobile" placeholder="+91 98765 43210" value={formData.mobile} onChange={handleChange} required />
                </div>
                <div className="ar-field">
                  <label className="ar-label">Set Password *</label>
                  <input className="ar-input" type="password" name="password" placeholder="Min 6 characters" value={formData.password} onChange={handleChange} required />
                  <div className="ar-pwd-bar-wrap">
                    <div className="ar-pwd-bar" style={{ width: str.width, background: str.color }} />
                  </div>
                  {str.label && <div className="ar-pwd-hint" style={{ color: str.color }}>{str.label}</div>}
                </div>
                <div className="ar-field">
                  <label className="ar-label">Confirm Password *</label>
                  <input className="ar-input" type="password" name="confirmPassword" placeholder="Re-enter password" value={formData.confirmPassword} onChange={handleChange} required />
                </div>
              </div>

              {/* ── Academic ── */}
              <div className="ar-section">
                <span className="ar-section-tag">Academic Details</span>
                <div className="ar-section-line" />
              </div>
              <div className="ar-grid">
                <div className="ar-field">
                  <label className="ar-label">Graduation Year *</label>
                  <input className="ar-input" type="number" name="graduationYear" placeholder="e.g. 2022" value={formData.graduationYear} onChange={handleChange} required />
                </div>
                <div className="ar-field">
                  <label className="ar-label">Department *</label>
                  <div className="ar-select-wrap">
                    <select className="ar-select" name="department" value={formData.department} onChange={handleChange} required>
                      <option value="">Select Department</option>
                      {departments.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* ── Professional ── */}
              <div className="ar-section">
                <span className="ar-section-tag">Professional Info</span>
                <div className="ar-section-line" />
              </div>
              <div className="ar-grid">
                <div className="ar-field">
                  <label className="ar-label">Job Title *</label>
                  <input className="ar-input" name="jobTitle" placeholder="e.g. Software Engineer" value={formData.jobTitle} onChange={handleChange} required />
                </div>
                <div className="ar-field">
                  <label className="ar-label">Company *</label>
                  <input className="ar-input" name="company" placeholder="e.g. Infosys" value={formData.company} onChange={handleChange} required />
                </div>
                <div className="ar-field ar-full">
                  <label className="ar-label">Location *</label>
                  <input className="ar-input" name="location" placeholder="e.g. Bengaluru, India" value={formData.location} onChange={handleChange} required />
                </div>
              </div>

              {/* ── Optional ── */}
              <div className="ar-section">
                <span className="ar-section-tag">Optional</span>
                <div className="ar-section-line" />
              </div>
              <div className="ar-grid">
                <div className="ar-field ar-full">
                  <label className="ar-label">LinkedIn URL</label>
                  <input className="ar-input" name="linkedinUrl" placeholder="https://linkedin.com/in/yourprofile" value={formData.linkedinUrl} onChange={handleChange} />
                </div>
                <div className="ar-field ar-full">
                  <label className="ar-label">Short Bio</label>
                  <textarea className="ar-textarea" name="bio" placeholder="A few lines about yourself, your journey, or your interests…" value={formData.bio} onChange={handleChange} />
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="ar-footer">
              <span className="ar-footer-note">📋 All submissions are reviewed by admin</span>
              <button type="submit" className="ar-submit" disabled={isSubmitting}>
                {isSubmitting
                  ? <><div className="ar-spinner" /> Registering…</>
                  : <>Register →</>
                }
              </button>
            </div>
          </form>

        </div>
      </div>
    </>
  );
};

export default AlumniRegistration;
