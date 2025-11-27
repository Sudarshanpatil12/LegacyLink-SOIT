import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (email === 'admin@rgpv.com' && password === 'admin') {
      localStorage.setItem('isAdminLoggedIn', 'true');
      navigate('/admin');
      return;
    }
    setError('Invalid credentials. Use admin@rgpv.com / admin');
  };
  
  // New, more professional style object
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4d8e2' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: "'Inter', sans-serif",
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '40px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      width: '100%',
      maxWidth: '420px',
    },
    title: {
      fontSize: '1.8rem',
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: '10px',
      color: '#111827',
      fontFamily: "'Poppins', sans-serif",
    },
    subtitle: {
      textAlign: 'center',
      color: '#6b7280',
      marginBottom: '30px',
      fontSize: '1rem',
    },
    inputGroup: {
      marginBottom: '20px',
      position: 'relative',
    },
    input: {
      width: '100%',
      padding: '12px 10px 12px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '16px',
      backgroundColor: '#f9fafb',
      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    },
    icon: {
      position: 'absolute',
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9ca3af',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#0056b3',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
      fontFamily: "'Inter', sans-serif",
      transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
      boxShadow: isHovered ? '0 4px 12px rgba(0, 86, 179, 0.3)' : 'none',
    },
    error: {
      color: '#dc2626',
      backgroundColor: '#fee2e2',
      border: '1px solid #fca5a5',
      borderRadius: '6px',
      padding: '10px',
      textAlign: 'center',
      marginBottom: '20px',
      fontSize: '14px',
    },
    demo: {
      border: '1px dashed #9ca3af',
      padding: '15px',
      borderRadius: '6px',
      marginTop: '25px',
      textAlign: 'center',
      fontSize: '14px',
      color: '#4b5563',
    },
    link: {
        color: '#0056b3', 
        textDecoration: 'none',
        fontWeight: '500',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Admin Portal</h1>
        <p style={styles.subtitle}>Please sign in to continue</p>
        
        {error && <div style={styles.error}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              onFocus={(e) => { e.target.style.borderColor = '#0056b3'; e.target.style.boxShadow = '0 0 0 3px rgba(0, 86, 179, 0.1)'; }}
              onBlur={(e) => { e.target.style.borderColor = '#d1d5db'; e.target.style.boxShadow = 'none'; }}
            />
            <Mail size={20} style={styles.icon} />
          </div>
          
          <div style={styles.inputGroup}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              onFocus={(e) => { e.target.style.borderColor = '#0056b3'; e.target.style.boxShadow = '0 0 0 3px rgba(0, 86, 179, 0.1)'; }}
              onBlur={(e) => { e.target.style.borderColor = '#d1d5db'; e.target.style.boxShadow = 'none'; }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ ...styles.icon, background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          <button 
            type="submit" 
            style={styles.button}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Sign In
          </button>
        </form>
        
        <div style={styles.demo}>
          <strong>Demo Admin Credentials:</strong><br />
          Email: admin@rgpv.com<br />
          Password: admin
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
          <p style={{ color: '#6b7280' }}>
            Not an admin?{' '}
            <Link to="/register" style={styles.link}>Register as Alumni</Link> or{' '}
            <Link to="/alumni" style={styles.link}>View Directory</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;