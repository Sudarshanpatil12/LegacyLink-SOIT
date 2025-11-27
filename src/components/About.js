import React from "react";
import { ExternalLink, Mail, MapPin, Phone, Users, Target, Eye, BookOpen, GraduationCap, Award, Globe } from "lucide-react";

const About = () => {
  // Styles matching the contact page design
  const styles = {
    // Outermost container
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: "'Inter', sans-serif",
    },
    // Centered container for content below the header
    mainContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '60px 20px',
    },
    // Full-width header (same as contact page)
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
    contentSection: {
      marginBottom: '80px',
    },
    sectionTitle: {
      fontSize: '2.25rem',
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: '40px',
      textAlign: 'center',
      fontFamily: "'Poppins', sans-serif",
    },
    
    // History section
    historyGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '60px',
      alignItems: 'center',
      marginBottom: '60px',
    },
    imageContainer: {
      position: 'relative',
      height: '400px',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    historyContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    },
    contentTitle: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#1e293b',
      margin: 0,
      fontFamily: "'Poppins', sans-serif",
    },
    contentText: {
      fontSize: '1.125rem',
      color: '#64748b',
      lineHeight: '1.7',
      margin: 0,
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
      marginTop: '20px',
    },
    statCard: {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '16px',
      textAlign: 'center',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #f1f5f9',
      transition: 'all 0.3s ease',
    },
    statNumber: {
      fontSize: '2.5rem',
      fontWeight: '800',
      color: '#2563eb',
      margin: '0 0 8px 0',
      fontFamily: "'Poppins', sans-serif",
    },
    statLabel: {
      fontSize: '1rem',
      color: '#64748b',
      fontWeight: '600',
      margin: 0,
    },

    // Mission & Vision section
    missionVisionGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '40px',
      marginBottom: '60px',
    },
    missionCard: {
      backgroundColor: 'white',
      padding: '40px',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      border: '1px solid #f1f5f9',
      transition: 'all 0.3s ease',
    },
    visionCard: {
      backgroundColor: 'white',
      padding: '40px',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      border: '1px solid #f1f5f9',
      transition: 'all 0.3s ease',
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      marginBottom: '24px',
    },
    cardIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '56px',
      height: '56px',
      borderRadius: '12px',
      flexShrink: 0,
    },
    cardTitle: {
      fontSize: '1.75rem',
      fontWeight: '700',
      color: '#1e293b',
      margin: 0,
      fontFamily: "'Poppins', sans-serif",
    },
    cardText: {
      fontSize: '1.125rem',
      color: '#64748b',
      lineHeight: '1.7',
      marginBottom: '20px',
    },
    listItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      marginBottom: '12px',
      fontSize: '1rem',
      color: '#64748b',
    },
    listDot: {
      width: '6px',
      height: '6px',
      backgroundColor: '#64748b',
      borderRadius: '50%',
      marginTop: '8px',
      flexShrink: 0,
    },

    // Departments section
    departmentsSection: {
      backgroundColor: 'white',
      padding: '48px',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      border: '1px solid #f1f5f9',
      marginBottom: '60px',
    },
    departmentsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
    },
    departmentCard: {
      backgroundColor: '#f8fafc',
      padding: '24px',
      borderRadius: '12px',
      textAlign: 'center',
      border: '1px solid #e2e8f0',
      transition: 'all 0.3s ease',
    },
    departmentTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#1e293b',
      margin: 0,
    },

    // Contact section
    contactGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '40px',
      marginBottom: '60px',
    },
    contactCard: {
      backgroundColor: 'white',
      padding: '40px',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      border: '1px solid #f1f5f9',
      transition: 'all 0.3s ease',
    },
    contactHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      marginBottom: '24px',
    },
    contactIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '56px',
      height: '56px',
      borderRadius: '12px',
      flexShrink: 0,
    },
    contactTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#1e293b',
      margin: 0,
      fontFamily: "'Poppins', sans-serif",
    },
    contactItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '16px',
      marginBottom: '20px',
    },
    contactText: {
      fontSize: '1rem',
      color: '#64748b',
      lineHeight: '1.5',
      margin: 0,
    },

    // CTA section
    ctaSection: {
      backgroundColor: 'white',
      padding: '60px 40px',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      border: '1px solid #f1f5f9',
      textAlign: 'center',
    },
    ctaButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      padding: '16px 32px',
      backgroundColor: '#2563eb',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '12px',
      fontWeight: '600',
      fontSize: '1.125rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontFamily: 'inherit',
    },
  };

  // Hover effects helper function
  const withHover = (baseStyle) => ({
    ...baseStyle,
    onMouseEnter: (e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 12px 25px rgba(0, 0, 0, 0.15)';
    },
    onMouseLeave: (e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = baseStyle.boxShadow || '0 10px 25px rgba(0, 0, 0, 0.1)';
    },
  });

  return (
    <div style={styles.container}>
      
      {/* Header Section (Same as contact page) */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>About SOIT</h1>
        <p style={styles.headerSubtitle}>
          Discover the legacy, mission, and vision that make SOIT, RGPV Bhopal a premier institution 
          in technical education and innovation.
        </p>
      </div>

      {/* Main content is wrapped in the centered container */}
      <div style={styles.mainContainer}>
        
        {/* History Section */}
        <section style={styles.contentSection}>
          <h2 style={styles.sectionTitle}>Our Legacy</h2>
          <div style={styles.historyGrid}>
            <div 
              style={withHover(styles.imageContainer)}
            >
              <img
                src="/images/rgpv1.png"
                alt="School of Information Technology Campus"
                style={styles.image}
              />
            </div>
            <div style={styles.historyContent}>
              <h3 style={styles.contentTitle}>Our Journey</h3>
              <p style={styles.contentText}>
                Established in 1986, SOIT, RGPV Bhopal has evolved from a regional technical institute to a 
                nationally recognized center of excellence. Our journey spans over three decades of 
                transformative education and innovation.
              </p>
              <p style={styles.contentText}>
                We take immense pride in our rich heritage of producing visionary engineers and technology 
                leaders who are shaping the future across global industries and research frontiers.
              </p>
              <div style={styles.statsGrid}>
                <div style={withHover(styles.statCard)}>
                  <div style={styles.statNumber}>35+</div>
                  <p style={styles.statLabel}>Years of Excellence</p>
                </div>
                <div style={withHover(styles.statCard)}>
                  <div style={styles.statNumber}>5000+</div>
                  <p style={styles.statLabel}>Successful Alumni</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section style={styles.contentSection}>
          <h2 style={styles.sectionTitle}>Our Mission & Vision</h2>
          <div style={styles.missionVisionGrid}>
            {/* Mission Card */}
            <div style={withHover(styles.missionCard)}>
              <div style={styles.cardHeader}>
                <div style={{...styles.cardIcon, backgroundColor: '#dbeafe'}}>
                  <Target style={{width: '24px', height: '24px', color: '#2563eb'}} />
                </div>
                <h3 style={styles.cardTitle}>Our Mission</h3>
              </div>
              <p style={styles.cardText}>
                To provide quality technical education and create competent professionals with high ethical standards 
                and leadership qualities to serve the society and nation.
              </p>
              <div>
                {[
                  "Impart quality education in engineering and technology",
                  "Foster research and innovation ecosystem",
                  "Develop industry-ready professionals",
                  "Promote ethical practices and social responsibility",
                  "Establish strong industry-academia partnerships"
                ].map((item, index) => (
                  <div key={index} style={styles.listItem}>
                    <div style={styles.listDot}></div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vision Card */}
            <div style={withHover(styles.visionCard)}>
              <div style={styles.cardHeader}>
                <div style={{...styles.cardIcon, backgroundColor: '#f3e8ff'}}>
                  <Eye style={{width: '24px', height: '24px', color: '#9333ea'}} />
                </div>
                <h3 style={styles.cardTitle}>Our Vision</h3>
              </div>
              <p style={styles.cardText}>
                To be a center of excellence in technical education and research, producing globally competent 
                professionals who contribute to the development of society and nation.
              </p>
              <p style={styles.cardText}>
                SOIT RGPV envisions becoming a globally recognized institution known for its academic excellence, 
                innovative research, and producing graduates who are technically competent and socially responsible.
              </p>
            </div>
          </div>
        </section>

        {/* Departments Section */}
        <section style={styles.departmentsSection}>
          <h2 style={{...styles.sectionTitle, marginBottom: '40px'}}>Academic Departments</h2>
          <div style={styles.departmentsGrid}>
            {[
              "Computer Science & Business Systems",
              "Artificial Intelligence & Machine Learning", 
              "Computer Science & Data Science",
              "Cybersecurity",
              "Internet of Things & Applications",
              "Cloud Computing",
              "Blockchain Technology",
              "Software Engineering"
            ].map((department, index) => (
              <div 
                key={index}
                style={withHover(styles.departmentCard)}
              >
                <h4 style={styles.departmentTitle}>{department}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section style={styles.contentSection}>
          <h2 style={styles.sectionTitle}>Get In Touch</h2>
          <div style={styles.contactGrid}>
            {/* Alumni Cell */}
            <div style={withHover(styles.contactCard)}>
              <div style={styles.contactHeader}>
                <div style={{...styles.contactIcon, backgroundColor: '#dcfce7'}}>
                  <Users style={{width: '24px', height: '24px', color: '#16a34a'}} />
                </div>
                <h3 style={styles.contactTitle}>Alumni Cell</h3>
              </div>
              <div style={styles.contactItem}>
                <MapPin style={{width: '20px', height: '20px', color: '#64748b'}} />
                <p style={styles.contactText}>
                  School of Information Technology, RGPV<br />
                  Airport Road, Gandhi Nagar<br />
                  Bhopal, Madhya Pradesh - 462033
                </p>
              </div>
              <div style={styles.contactItem}>
                <Phone style={{width: '20px', height: '20px', color: '#64748b'}} />
                <p style={styles.contactText}>+91 755 2678873</p>
              </div>
              <div style={styles.contactItem}>
                <Mail style={{width: '20px', height: '20px', color: '#64748b'}} />
                <p style={styles.contactText}>alumni.cell@soitrgpv.ac.in</p>
              </div>
            </div>

            {/* Placement Cell */}
            <div style={withHover(styles.contactCard)}>
              <div style={styles.contactHeader}>
                <div style={{...styles.contactIcon, backgroundColor: '#ffedd5'}}>
                  <Target style={{width: '24px', height: '24px', color: '#ea580c'}} />
                </div>
                <h3 style={styles.contactTitle}>Training & Placement</h3>
              </div>
              <div style={styles.contactItem}>
                <MapPin style={{width: '20px', height: '20px', color: '#64748b'}} />
                <p style={styles.contactText}>
                  Training & Placement Office<br />
                  School of Information Technology, RGPV<br />
                  Bhopal, Madhya Pradesh - 462033
                </p>
              </div>
              <div style={styles.contactItem}>
                <Phone style={{width: '20px', height: '20px', color: '#64748b'}} />
                <p style={styles.contactText}>+91 755 2678870</p>
              </div>
              <div style={styles.contactItem}>
                <Mail style={{width: '20px', height: '20px', color: '#64748b'}} />
                <p style={styles.contactText}>placement@soitrgpv.ac.in</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={withHover(styles.ctaSection)}>
          <h2 style={{...styles.sectionTitle, marginBottom: '20px'}}>Explore More About SOIT</h2>
          <p style={{...styles.contentText, marginBottom: '32px', textAlign: 'center'}}>
            Discover detailed information about our courses, faculty, research, admissions, and campus life on our official website.
          </p>
          <a
            href="https://www.soitrgpv.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            style={withHover(styles.ctaButton)}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#1d4ed8';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#2563eb';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Visit Official Website
            <ExternalLink style={{width: '20px', height: '20px'}} />
          </a>
        </section>
      </div>
    </div>
  );
};

export default About;