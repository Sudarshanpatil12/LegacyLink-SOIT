import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, Users } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Styles
  const styles = {
    // Outermost container, now with no padding
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: "'Inter', sans-serif",
    },
    // Centered container for content below the header
    mainContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '60px 20px', // Padding re-applied here for content
    },
    // Full-width header
    header: {
      background: 'linear-gradient(135deg, #0a4a7a 0%, #1e6ba8 100%)',
      color: 'white',
      padding: '80px 20px 60px',
      textAlign: 'center',
    },
    headerTitle: {
      fontSize: '3rem',
      fontWeight: '800',
      marginBottom: '16px',
      fontFamily: "'Poppins', sans-serif",
    },
    headerSubtitle: {
      fontSize: '1.2rem',
      opacity: 0.9,
      maxWidth: '600px',
      margin: '0 auto',
      lineHeight: '1.6',
    },
    contentGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '60px',
      alignItems: 'flex-start',
      marginBottom: '80px',
    },
    contactInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '40px',
    },
    infoSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    },
    infoTitle: {
      fontSize: '2.25rem',
      fontWeight: '700',
      color: '#1e293b',
      lineHeight: '1.3',
    },
    infoText: {
      fontSize: '1.125rem',
      color: '#64748b',
      lineHeight: '1.7',
    },
    contactList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    contactItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '20px',
      padding: '24px',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #f1f5f9',
      transition: 'all 0.3s ease',
    },
    iconContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '56px',
      height: '56px',
      borderRadius: '12px',
      flexShrink: 0,
    },
    contactContent: {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    contactTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#1e293b',
      margin: '0',
    },
    contactDetail: {
      fontSize: '1rem',
      color: '#64748b',
      lineHeight: '1.5',
      margin: '0',
    },
    quickSupport: {
      backgroundColor: '#f0f9ff',
      padding: '32px',
      borderRadius: '16px',
      border: '1px solid #e0f2fe',
    },
    quickSupportHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      marginBottom: '20px',
    },
    quickSupportTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#1e293b',
      margin: '0',
    },
    supportList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    supportItem: {
      fontSize: '1rem',
      color: '#475569',
      lineHeight: '1.5',
      margin: '0',
    },
    contactForm: {
      backgroundColor: 'white',
      padding: '48px',
      borderRadius: '20px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      border: '1px solid #f1f5f9',
    },
    formTitle: {
      fontSize: '2.25rem',
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: '32px',
      lineHeight: '1.3',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    },
    formRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    label: {
      fontSize: '1rem',
      fontWeight: '500',
      color: '#374151',
    },
    input: {
      padding: '16px 20px',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      fontFamily: 'inherit',
      outline: 'none',
    },
    textarea: {
      padding: '16px 20px',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      fontSize: '1rem',
      minHeight: '160px',
      resize: 'vertical',
      transition: 'all 0.3s ease',
      fontFamily: 'inherit',
      outline: 'none',
    },
    submitButton: {
      padding: '18px 32px',
      backgroundColor: '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '1.125rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      marginTop: '8px',
    },
    mapSection: {
      backgroundColor: 'white',
      padding: '48px',
      borderRadius: '20px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      border: '1px solid #f1f5f9',
    },
    mapTitle: {
      fontSize: '2.25rem',
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: '32px',
      textAlign: 'center',
      lineHeight: '1.3',
    },
    mapContainer: {
      backgroundColor: '#f8fafc',
      borderRadius: '16px',
      height: '400px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px dashed #cbd5e1',
    },
    mapContent: {
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
    },
    mapIcon: {
      width: '64px',
      height: '64px',
      color: '#94a3b8',
    },
    mapText: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#475569',
      margin: '0',
    },
    mapSubtext: {
      fontSize: '1rem',
      color: '#94a3b8',
      margin: '0',
    },
  };

  return (
    <div style={styles.container}>
      
      {/* Header Section (Now full-width) */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Contact Us</h1>
        <p style={styles.headerSubtitle}>
          Get in touch with our team. We're here to help and answer any questions you might have.
        </p>
      </div>

      {/* Main content is wrapped in the centered container */}
      <div style={styles.mainContainer}>
        <div style={styles.contentGrid}>
          
          {/* Contact Information */}
          <div style={styles.contactInfo}>
            <div style={styles.infoSection}>
              <h2 style={styles.infoTitle}>Get in Touch</h2>
              <p style={styles.infoText}>
                Have questions about alumni events, registration, or anything else? 
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            {/* Contact Details */}
            <div style={styles.contactList}>
              <div 
                style={styles.contactItem}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 25px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                }}
              >
                <div style={{...styles.iconContainer, backgroundColor: '#dbeafe'}}>
                  <Mail style={{width: '24px', height: '24px', color: '#2563eb'}} />
                </div>
                <div style={styles.contactContent}>
                  <h3 style={styles.contactTitle}>Email</h3>
                  <p style={styles.contactDetail}>alumni@rgpv.ac.in</p>
                  <p style={styles.contactDetail}>support@rgpvalumni.com</p>
                </div>
              </div>

              <div 
                style={styles.contactItem}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 25px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                }}
              >
                <div style={{...styles.iconContainer, backgroundColor: '#dcfce7'}}>
                  <Phone style={{width: '24px', height: '24px', color: '#16a34a'}} />
                </div>
                <div style={styles.contactContent}>
                  <h3 style={styles.contactTitle}>Phone</h3>
                  <p style={styles.contactDetail}>+91 755 2678873</p>
                  <p style={styles.contactDetail}>+91 755 2678870</p>
                </div>
              </div>

              <div 
                style={styles.contactItem}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 25px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                }}
              >
                <div style={{...styles.iconContainer, backgroundColor: '#f3e8ff'}}>
                  <MapPin style={{width: '24px', height: '24px', color: '#9333ea'}} />
                </div>
                <div style={styles.contactContent}>
                  <h3 style={styles.contactTitle}>Address</h3>
                  <p style={styles.contactDetail}>
                    School of Information Technology, RGPV<br />
                    Airport Road, Gandhi Nagar<br />
                    Bhopal, Madhya Pradesh - 462033
                  </p>
                </div>
              </div>

              <div 
                style={styles.contactItem}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 25px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                }}
              >
                <div style={{...styles.iconContainer, backgroundColor: '#ffedd5'}}>
                  <Clock style={{width: '24px', height: '24px', color: '#ea580c'}} />
                </div>
                <div style={styles.contactContent}>
                  <h3 style={styles.contactTitle}>Office Hours</h3>
                  <p style={styles.contactDetail}>Monday - Friday: 9:00 AM - 5:00 PM</p>
                  <p style={styles.contactDetail}>Saturday: 10:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>

            <div style={styles.quickSupport}>
              <div style={styles.quickSupportHeader}>
                <Users style={{width: '28px', height: '28px', color: '#2563eb'}} />
                <h3 style={styles.quickSupportTitle}>Quick Support</h3>
              </div>
              <div style={styles.supportList}>
                <p style={styles.supportItem}>• For alumni registration issues</p>
                <p style={styles.supportItem}>• Event registration queries</p>
                <p style={styles.supportItem}>• Profile update requests</p>
                <p style={styles.supportItem}>• General alumni network questions</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div style={styles.contactForm}>
            <h2 style={styles.formTitle}>Send us a Message</h2>
            
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label htmlFor="name" style={styles.label}>Full Name *</label>
                  <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} style={styles.input} placeholder="Enter your full name"
                    onFocus={(e) => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label htmlFor="email" style={styles.label}>Email Address *</label>
                  <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} style={styles.input} placeholder="Enter your email"
                    onFocus={(e) => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="subject" style={styles.label}>Subject *</label>
                <input type="text" id="subject" name="subject" required value={formData.subject} onChange={handleChange} style={styles.input} placeholder="What is this regarding?"
                  onFocus={(e) => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="message" style={styles.label}>Message *</label>
                <textarea id="message" name="message" required value={formData.message} onChange={handleChange} style={styles.textarea} placeholder="Tell us how we can help you..."
                  onFocus={(e) => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
              <button type="submit" style={styles.submitButton}
                onMouseEnter={(e) => { e.target.style.backgroundColor = '#1d4ed8'; e.target.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.target.style.backgroundColor = '#2563eb'; e.target.style.transform = 'translateY(0)'; }}
              >
                <Send style={{width: '20px', height: '20px'}} />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div style={styles.mapSection}>
          <h2 style={styles.mapTitle}>Find Us</h2>
          <div style={styles.mapContainer}>
            <div style={styles.mapContent}>
              <MapPin style={styles.mapIcon} />
              <p style={styles.mapText}>RGPV Campus Map</p>
              <p style={styles.mapSubtext}>Interactive map coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;