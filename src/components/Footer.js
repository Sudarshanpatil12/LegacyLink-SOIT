const Footer = () => {
  const handleLinkClick = (href) => {
    window.location.href = href;
  };

  return (
    <footer 
      style={{
        backgroundColor: '#0a4a7a',
        color: 'white',
        width: '100%',
        marginTop: 'auto',
      }}
    >
      {/* Main Footer Content */}
      <div 
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '48px 16px 24px',
        }}
      >
        {/* Top Section - Links and Information */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px',
            marginBottom: '40px',
          }}
        >
          {/* College Information */}
          <div>
            <h3 
              style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                marginBottom: '20px',
                color: '#fbbf24',
              }}
            >
              🎓 SOIT RGPV
            </h3>
            <p 
              style={{
                marginBottom: '16px',
                lineHeight: '1.6',
                color: '#d1d5db',
                fontSize: '0.95rem',
              }}
            >
              School of Information Technology<br />
              Rajiv Gandhi Proudyogiki Vishwavidyalaya<br />
              Airport Road, Gandhi Nagar<br />
              Bhopal, Madhya Pradesh - 462033
            </p>
            <div style={{ marginTop: '20px' }}>
              <p style={{ marginBottom: '8px', color: '#d1d5db' }}>
                <strong style={{ color: 'white' }}>📞 Phone:</strong> +91-755-2678812
              </p>
              <p style={{ marginBottom: '8px', color: '#d1d5db' }}>
                <strong style={{ color: 'white' }}>📧 Email:</strong> info@soitrgpv.ac.in
              </p>
              <p style={{ color: '#d1d5db' }}>
                <strong style={{ color: 'white' }}>🌐 Website:</strong> www.soitrgpv.ac.in
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 
              style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                marginBottom: '20px',
                color: '#fbbf24',
              }}
            >
              🔗 Quick Links
            </h3>
            <ul 
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Alumni Directory', path: '/alumni' },
                { name: 'Events', path: '/events' },
                { name: 'Career Opportunities', path: '/jobs' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.name} style={{ marginBottom: '12px' }}>
                  <button
                    onClick={() => handleLinkClick(link.path)}
                    style={{
                      color: '#d1d5db',
                      textDecoration: 'none',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.95rem',
                      transition: 'color 0.2s ease',
                      padding: 0,
                      textAlign: 'left',
                    }}
                    onMouseOver={(e) => e.target.style.color = 'white'}
                    onMouseOut={(e) => e.target.style.color = '#d1d5db'}
                  >
                    → {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Alumni Resources */}
          <div>
            <h3 
              style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                marginBottom: '20px',
                color: '#fbbf24',
              }}
            >
              👥 Alumni Resources
            </h3>
            <ul 
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              {[
                { name: 'Alumni Portal', path: '/alumni-portal' },
                { name: 'Mentorship Program', path: '/mentorship' },
                { name: 'Job Postings', path: '/jobs' },
                { name: 'Network Events', path: '/network-events' },
                { name: 'Success Stories', path: '/success-stories' },
                { name: 'Give Back', path: '/give-back' },
              ].map((link) => (
                <li key={link.name} style={{ marginBottom: '12px' }}>
                  <button
                    onClick={() => handleLinkClick(link.path)}
                    style={{
                      color: '#d1d5db',
                      textDecoration: 'none',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.95rem',
                      transition: 'color 0.2s ease',
                      padding: 0,
                      textAlign: 'left',
                    }}
                    onMouseOver={(e) => e.target.style.color = 'white'}
                    onMouseOut={(e) => e.target.style.color = '#d1d5db'}
                  >
                    → {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 
              style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                marginBottom: '20px',
                color: '#fbbf24',
              }}
            >
              📞 Connect With Us
            </h3>
            
            {/* Social Media Links */}
            <div style={{ marginBottom: '24px' }}>
              <h4 
                style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: 'white',
                }}
              >
                Follow us on:
              </h4>
              <div 
                style={{
                  display: 'flex',
                  gap: '12px',
                }}
              >
                {[
                  { name: 'Facebook', icon: '📘', url: 'https://facebook.com/soitrgpv' },
                  { name: 'Twitter', icon: '🐦', url: 'https://twitter.com/soitrgpv' },
                  { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com/school/soitrgpv' },
                  { name: 'Instagram', icon: '📷', url: 'https://instagram.com/soitrgpv' },
                  { name: 'YouTube', icon: '📺', url: 'https://youtube.com/soitrgpv' },
                ].map((social) => (
                  <button
                    key={social.name}
                    onClick={() => window.open(social.url, '_blank')}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontSize: '1.1rem',
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.transform = 'translateY(0)';
                    }}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Contact */}
            <div>
              <h4 
                style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: 'white',
                }}
              >
                📧 Get In Touch
              </h4>
              <p 
                style={{
                  fontSize: '0.875rem',
                  color: '#d1d5db',
                  marginBottom: '16px',
                  lineHeight: '1.5',
                }}
              >
                Have questions? Reach out to our alumni relations team.
              </p>
              <button
                onClick={() => handleLinkClick('/contact')}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '6px',
                  backgroundColor: '#fbbf24',
                  color: '#0a4a7a',
                  border: 'none',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#f59e0b';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#fbbf24';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Contact Alumni Team
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div 
          style={{
            height: '1px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            margin: '32px 0',
          }}
        />

        {/* Bottom Section - Copyright and Legal */}
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            textAlign: 'center',
          }}
        >
          {/* Copyright */}
          <div>
            <p 
              style={{
                color: '#d1d5db',
                fontSize: '0.875rem',
                margin: 0,
              }}
            >
              © {new Date().getFullYear()} School of Information Technology, RGPV Bhopal. 
              All rights reserved.
            </p>
          </div>

          {/* Legal Links */}
          <div 
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '24px',
            }}
          >
            {[
              { name: 'Privacy Policy', path: '/privacy' },
              { name: 'Terms of Service', path: '/terms' },
              { name: 'Accessibility', path: '/accessibility' },
            ].map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.path)}
                style={{
                  color: '#d1d5db',
                  fontSize: '0.875rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                  padding: 0,
                }}
                onMouseOver={(e) => e.target.style.color = 'white'}
                onMouseOut={(e) => e.target.style.color = '#d1d5db'}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Accreditation */}
          <div>
            <p 
              style={{
                color: '#9ca3af',
                fontSize: '0.75rem',
                margin: 0,
                fontStyle: 'italic',
              }}
            >
              Approved by AICTE | Affiliated to RGPV Bhopal | NAAC Accredited
            </p>
          </div>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>
        {`
          @media (max-width: 768px) {
            .footer-grid {
              grid-template-columns: 1fr !important;
              gap: 32px !important;
            }
            
            .footer-bottom {
              flex-direction: column !important;
              text-align: center !important;
              gap: 20px !important;
            }
            
            .social-links {
              justify-content: center !important;
            }
          }
          
          @media (min-width: 1024px) {
            .footer-grid {
              grid-template-columns: repeat(4, 1fr) !important;
            }
            
            .footer-bottom {
              flex-direction: row !important;
            }
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;