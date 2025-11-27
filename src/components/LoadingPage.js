// src/components/LoadingPage.js
import React, { useEffect, useState } from 'react';

const LoadingPage = ({ isLoading }) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 5 ? '' : prev + '.'));
    }, 500);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .loading-spinner {
          animation: spin 1s linear infinite;
        }
      `}</style>
      <div style={styles.container}>
        <div style={styles.content}>
          <img 
            src={`${process.env.PUBLIC_URL}/images/soit-logo.png`}
            alt="SOIT Logo"
            style={styles.logo}
          />
          <h1 style={styles.title}>Legacy Link - SOIT</h1>
          <h2 style={styles.title}>RGPV</h2>
          <div style={styles.loadingText}>
            <p>Loading{dots}</p>
          </div>
          <div style={styles.spinner} className="loading-spinner">
            <div style={styles.spinnerInner}></div>
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f8fafc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    fontFamily: "'Inter', sans-serif"
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '30px',
    textAlign: 'center'
  },
  logo: {
    height: '120px',
    width: 'auto',
    objectFit: 'contain',
    filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))'
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#0a4a7a',
    margin: '0',
    fontFamily: "'Poppins', sans-serif"
  },
  loadingText: {
    fontSize: '16px',
    color: '#667eea',
    fontWeight: '600',
    minHeight: '24px'
  },
  spinner: {
    width: '60px',
    height: '60px',
    border: '4px solid #e5e7eb',
    borderTop: '4px solid #667eea',
    borderRadius: '50%'
  },
  spinnerInner: {
    width: '100%',
    height: '100%'
  }
};

export default LoadingPage;
