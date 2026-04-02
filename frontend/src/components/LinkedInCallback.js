import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LinkedInCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleLinkedInCallback } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const processCallback = async () => {
      try {
        const token = searchParams.get('token');
        const type = searchParams.get('type');
        const error = searchParams.get('error');

        if (error) {
          setError('LinkedIn authentication failed');
          setLoading(false);
          return;
        }

        if (!token || !type) {
          setError('Invalid callback parameters');
          setLoading(false);
          return;
        }

        const result = await handleLinkedInCallback(token, type);
        
        if (result.success) {
          // Redirect based on user type
          if (type === 'admin') {
            navigate('/admin');
          } else {
            navigate('/');
          }
        } else {
          setError(result.error || 'Authentication failed');
        }
      } catch (err) {
        console.error('LinkedIn callback error:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    processCallback();
  }, [searchParams, handleLinkedInCallback, navigate]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        flexDirection: 'column',
        backgroundColor: '#f8fafc'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '4px solid #e5e7eb',
          borderTop: '4px solid #0a4a7a',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{
          marginTop: '20px',
          fontSize: '1.1rem',
          color: '#6b7280',
          fontWeight: '500'
        }}>
          Processing LinkedIn authentication...
        </p>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        flexDirection: 'column',
        backgroundColor: '#f8fafc',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%'
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '20px'
          }}>
            ❌
          </div>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '16px'
          }}>
            Authentication Failed
          </h2>
          <p style={{
            color: '#6b7280',
            marginBottom: '24px',
            lineHeight: '1.5'
          }}>
            {error}
          </p>
          <button
            onClick={() => navigate('/login')}
            style={{
              backgroundColor: '#0a4a7a',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#082e4d'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#0a4a7a'}
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default LinkedInCallback;

