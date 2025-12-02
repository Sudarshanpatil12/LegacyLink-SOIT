// src/components/AlumniDirectory.js
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, GraduationCap, Mail, Phone, Linkedin, X } from 'lucide-react';
import { sampleAlumni } from '../data/sampleAlumni';

const AlumniDirectory = () => {
  const [alumniData, setAlumniData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedAlumni, setSelectedAlumni] = useState(null);

  useEffect(() => {
    loadAlumniData();
    const interval = setInterval(loadAlumniData, 3000);
    return () => clearInterval(interval);
  }, []);

  const loadAlumniData = () => {
    const storedData = localStorage.getItem('alumniData');
    let allAlumni = [];

    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        if (Array.isArray(parsed)) allAlumni = parsed;
        else if (parsed && typeof parsed === 'object') allAlumni = [parsed];
      } catch (err) {
        console.error('Parse Error:', err);
      }
    }

    const mergedMap = new Map();
    (sampleAlumni || []).forEach(a => a?.id && mergedMap.set(a.id, a));
    allAlumni.forEach(a => a?.id && mergedMap.set(a.id, a));

    const approvedAlumni = Array.from(mergedMap.values())
      .filter(alum => alum.status === 'approved');
    
    setAlumniData(approvedAlumni);
  };

  const departments = [
    { value: 'all', label: 'All Departments' },
    
    { value: 'Computer Science & Business Systems (CSBS)', label: 'CS & Business Systems' },
    { value: 'AI & Machine Learning (AIML)', label: 'AI & Machine Learning' },
    { value: 'CSE Data Science (CSE-DS)', label: 'CSE Data Science' },
    { value: 'Masters', label: 'Masters' },
    
  ];

  const graduationYears = [
    { value: 'all', label: 'All Years' },
    ...Array.from({ length: 8 }, (_, i) => {
      const year = 2022 + i;
      return { value: year.toString(), label: year.toString() };
    }),
  ];

  const filteredAlumni = alumniData.filter(alumni => {
    const matchesSearch = 
      alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment = selectedDepartment === 'all' || alumni.department === selectedDepartment;
    const matchesYear = selectedYear === 'all' || alumni.graduationYear.toString() === selectedYear;

    return matchesSearch && matchesDepartment && matchesYear;
  });

  // Close modal when clicking outside
  useEffect(() => {
    if (selectedAlumni) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedAlumni]);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Alumni Directory</h1>
        <p style={styles.headerSubtitle}>
          Connect with approved UIT RGPV alumni across the globe
        </p>
      </div>

      <div style={styles.content}>
        {/* Stats */}
        <div style={styles.stats}>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>{alumniData.length}</div>
            <div style={styles.statLabel}>Total Alumni</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>
              {[...new Set(alumniData.map(alum => alum.company))].length}
            </div>
            <div style={styles.statLabel}>Companies</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>{departments.length - 1}</div>
            <div style={styles.statLabel}>Departments</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>
              {[...new Set(alumniData.map(alum => alum.location.split(', ').pop()))].length}
            </div>
            <div style={styles.statLabel}>Cities</div>
          </div>
        </div>

        {/* Filters */}
        <div style={styles.filters}>
          <div style={styles.searchBox}>
            <Search size={20} style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by name, company, role, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>
          
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            style={styles.select}
          >
            {departments.map(dept => (
              <option key={dept.value} value={dept.value}>
                {dept.label}
              </option>
            ))}
          </select>
          
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            style={styles.select}
          >
            {graduationYears.map(year => (
              <option key={year.value} value={year.value}>
                {year.label}
              </option>
            ))}
          </select>
        </div>

        {/* Alumni Grid */}
        <div style={styles.grid}>
          {filteredAlumni.map(alumni => (
            <div
              key={alumni.id}
              style={styles.card}
              onClick={() => setSelectedAlumni(alumni)}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <img
                src={alumni.profileImage}
                alt={alumni.name}
                style={styles.cardImage}
                onError={e => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div style={styles.fallbackImage}>
                {alumni.name.split(' ').map(n => n[0]).join('')}
              </div>
              
              <h3 style={styles.cardName}>{alumni.name}</h3>
              <p style={styles.cardJob}>{alumni.jobTitle}</p>
              <p style={styles.cardCompany}>{alumni.company}</p>
              
              <div style={styles.cardDetails}>
                <div style={styles.detailItem}>
                  <GraduationCap size={16} />
                  <span>Batch {alumni.graduationYear}</span>
                </div>
                <div style={styles.detailItem}>
                  <Briefcase size={16} />
                  <span>{alumni.department}</span>
                </div>
                <div style={styles.detailItem}>
                  <MapPin size={16} />
                  <span>{alumni.location}</span>
                </div>
              </div>
              
              <p style={styles.cardBio}>{alumni.bio.substring(0, 120)}...</p>
              
              <div style={styles.cardActions}>
                <button
                  style={styles.linkedinButton}
                  onClick={e => {
                    e.stopPropagation();
                    window.open(alumni.linkedinUrl, '_blank');
                  }}
                >
                  <Linkedin size={16} /> LinkedIn
                </button>
                <button
                  style={styles.emailButton}
                  onClick={e => {
                    e.stopPropagation();
                    window.location.href = `mailto:${alumni.email}`;
                  }}
                >
                  <Mail size={16} /> Email
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredAlumni.length === 0 && (
          <div style={styles.noResults}>
            <div style={{ fontSize: '3rem' }}>🔍</div>
            <h3>No alumni found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Scrollable Profile Panel */}
      {selectedAlumni && (
        <div style={styles.overlay} onClick={() => setSelectedAlumni(null)}>
          <div style={styles.profilePanel} onClick={e => e.stopPropagation()}>
            {/* Close Button */}
            <button style={styles.closeButton} onClick={() => setSelectedAlumni(null)}>
              <X size={24} />
            </button>

            {/* Profile Image */}
            <div style={styles.profileImageContainer}>
              <img
                src={selectedAlumni.profileImage}
                alt={selectedAlumni.name}
                style={styles.profileImage}
                onError={e => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div style={styles.profileFallback}>
                {selectedAlumni.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>

            {/* Profile Content - Scrollable */}
            <div style={styles.profileContent}>
              <h2 style={styles.profileName}>{selectedAlumni.name}</h2>
              <p style={styles.profileJob}>{selectedAlumni.jobTitle}</p>
              <p style={styles.profileCompany}>{selectedAlumni.company}</p>

              {/* Badges */}
              <div style={styles.badges}>
                <span style={styles.badge}>
                  {selectedAlumni.department}
                </span>
                <span style={styles.badge}>
                  Batch {selectedAlumni.graduationYear}
                </span>
              </div>

              {/* All Details */}
              <div style={styles.detailsSection}>
                <h3 style={styles.sectionTitle}>Contact Details</h3>
                <div style={styles.detailGrid}>
                  <div style={styles.detailCard}>
                    <Mail size={20} style={styles.detailIcon} />
                    <div>
                      <div style={styles.detailLabel}>Email</div>
                      <div style={styles.detailValue}>{selectedAlumni.email}</div>
                    </div>
                  </div>
                  
                  <div style={styles.detailCard}>
                    <Phone size={20} style={styles.detailIcon} />
                    <div>
                      <div style={styles.detailLabel}>Phone</div>
                      <div style={styles.detailValue}>{selectedAlumni.mobile}</div>
                    </div>
                  </div>
                  
                  <div style={styles.detailCard}>
                    <MapPin size={20} style={styles.detailIcon} />
                    <div>
                      <div style={styles.detailLabel}>Location</div>
                      <div style={styles.detailValue}>{selectedAlumni.location}</div>
                    </div>
                  </div>
                  
                  <div style={styles.detailCard}>
                    <Briefcase size={20} style={styles.detailIcon} />
                    <div>
                      <div style={styles.detailLabel}>Department</div>
                      <div style={styles.detailValue}>{selectedAlumni.department}</div>
                    </div>
                  </div>
                  
                  <div style={styles.detailCard}>
                    <GraduationCap size={20} style={styles.detailIcon} />
                    <div>
                      <div style={styles.detailLabel}>Graduation Year</div>
                      <div style={styles.detailValue}>{selectedAlumni.graduationYear}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio Section */}
              <div style={styles.bioSection}>
                <h3 style={styles.sectionTitle}>Professional Bio</h3>
                <p style={styles.bioText}>{selectedAlumni.bio}</p>
              </div>

              {/* Action Buttons */}
              <div style={styles.actionButtons}>
                <button
                  style={styles.profileLinkedinButton}
                  onClick={() => window.open(selectedAlumni.linkedinUrl, '_blank')}
                >
                  <Linkedin size={20} />
                  Connect on LinkedIn
                </button>
                <button
                  style={styles.profileEmailButton}
                  onClick={() => window.location.href = `mailto:${selectedAlumni.email}`}
                >
                  <Mail size={20} />
                  Send Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: "'Inter', sans-serif",
  },
  header: {
    background: 'linear-gradient(135deg, #0a4a7a 0%, #1e6ba8 100%)',
    color: 'white',
    padding: '60px 20px',
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: '800',
    marginBottom: '16px',
  },
  headerSubtitle: {
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
    opacity: 0.9,
    maxWidth: '600px',
    margin: '0 auto',
  },
  content: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '40px',
  },
  statCard: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '15px',
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: '800',
    color: '#0a4a7a',
    marginBottom: '8px',
  },
  statLabel: {
    color: '#6b7280',
    fontWeight: '600',
    fontSize: '0.9rem',
  },
  filters: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '15px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    marginBottom: '40px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '15px',
  },
  searchBox: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  searchInput: {
    width: '100%',
    padding: '15px 15px 15px 45px',
    border: '2px solid #e5e7eb',
    borderRadius: '10px',
    fontSize: '16px',
    fontFamily: "'Inter', sans-serif",
  },
  searchIcon: {
    position: 'absolute',
    left: '15px',
    color: '#9ca3af',
  },
  select: {
    width: '100%',
    padding: '15px',
    border: '2px solid #e5e7eb',
    borderRadius: '10px',
    fontSize: '16px',
    fontFamily: "'Inter', sans-serif",
    backgroundColor: 'white',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '25px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '25px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  cardImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '20px',
    border: '3px solid #f0f0f0',
  },
  fallbackImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#0a4a7a',
    color: 'white',
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  cardName: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '5px',
  },
  cardJob: {
    color: '#0a4a7a',
    fontWeight: '600',
    marginBottom: '5px',
  },
  cardCompany: {
    color: '#6b7280',
    fontSize: '0.9rem',
    marginBottom: '15px',
  },
  cardDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '15px',
    width: '100%',
  },
  detailItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#6b7280',
    fontSize: '0.85rem',
    justifyContent: 'center',
  },
  cardBio: {
    color: '#4b5563',
    lineHeight: '1.6',
    fontSize: '0.9rem',
    marginBottom: '20px',
    textAlign: 'left',
  },
  cardActions: {
    display: 'flex',
    gap: '10px',
    width: '100%',
    marginTop: 'auto',
  },
  linkedinButton: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#0077b5',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    fontSize: '0.85rem',
    fontWeight: '500',
    transition: 'background-color 0.3s ease',
  },
  emailButton: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#f3f4f6',
    color: '#374151',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    fontSize: '0.85rem',
    fontWeight: '500',
    transition: 'background-color 0.3s ease',
  },
  noResults: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#6b7280',
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  },
  
  // Profile Panel Styles
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  profilePanel: {
    backgroundColor: 'white',
    borderRadius: '20px',
    width: '100%',
    maxWidth: '800px',
    maxHeight: '90vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    backgroundColor: 'white',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    zIndex: 10,
  },
  profileImageContainer: {
    background: 'linear-gradient(135deg, #0a4a7a 0%, #1e6ba8 100%)',
    padding: '40px',
    textAlign: 'center',
  },
  profileImage: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '5px solid white',
    boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
  },
  profileFallback: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    backgroundColor: 'white',
    color: '#0a4a7a',
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '3rem',
    fontWeight: 'bold',
    border: '5px solid white',
    boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
    margin: '0 auto',
  },
  profileContent: {
    padding: '30px',
    overflowY: 'auto',
    flex: 1,
  },
  profileName: {
    fontSize: '2rem',
    fontWeight: '800',
    color: '#1f2937',
    marginBottom: '5px',
    textAlign: 'center',
  },
  profileJob: {
    color: '#0a4a7a',
    fontWeight: '600',
    fontSize: '1.1rem',
    marginBottom: '5px',
    textAlign: 'center',
  },
  profileCompany: {
    color: '#6b7280',
    fontSize: '1rem',
    marginBottom: '20px',
    textAlign: 'center',
  },
  badges: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap',
  },
  badge: {
    padding: '8px 16px',
    backgroundColor: '#e8f0fe',
    color: '#0a4a7a',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
  detailsSection: {
    marginBottom: '30px',
  },
  sectionTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '20px',
  },
  detailGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '15px',
  },
  detailCard: {
    backgroundColor: '#f8fafc',
    padding: '20px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    border: '1px solid #e5e7eb',
  },
  detailIcon: {
    color: '#0a4a7a',
  },
  detailLabel: {
    fontSize: '0.85rem',
    color: '#6b7280',
    marginBottom: '4px',
  },
  detailValue: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1f2937',
  },
  bioSection: {
    marginBottom: '30px',
  },
  bioText: {
    color: '#4b5563',
    lineHeight: '1.8',
    fontSize: '1rem',
    backgroundColor: '#f8fafc',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
  },
  actionButtons: {
    display: 'flex',
    gap: '15px',
    marginTop: '30px',
  },
  profileLinkedinButton: {
    flex: 1,
    padding: '15px',
    backgroundColor: '#0077b5',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    transition: 'background-color 0.3s ease',
  },
  profileEmailButton: {
    flex: 1,
    padding: '15px',
    backgroundColor: '#0a4a7a',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    transition: 'background-color 0.3s ease',
  },
};

export default AlumniDirectory;