// src/components/AlumniDirectory.js
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, GraduationCap, Mail, Phone, Linkedin } from 'lucide-react';
import { sampleAlumni } from '../data/sampleAlumni';

const AlumniDirectory = () => {
  const [alumniData, setAlumniData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedAlumni, setSelectedAlumni] = useState(null);

  useEffect(() => {
    loadAlumniData();
    
    // Refresh data every 3 seconds to get real-time updates
    const interval = setInterval(loadAlumniData, 3000);
    return () => clearInterval(interval);
  }, []);

  const loadAlumniData = () => {
    const storedData = localStorage.getItem('alumniData');
    let allAlumni = [];

    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        // Handle both array and single-object (some registration code may overwrite with one object)
        if (Array.isArray(parsed)) {
          allAlumni = parsed;
        } else if (parsed && typeof parsed === 'object') {
          allAlumni = [parsed];
        }
      } catch (err) {
        // If stored JSON is malformed, fall back to sample data
        console.error('Failed to parse alumniData from localStorage:', err);
        allAlumni = [];
      }
    }

    // Merge with sampleAlumni so we don't lose previously available entries if localStorage contains only the newly registered object.
    // Deduplicate by `id` (if id exists) giving precedence to localStorage entries.
    const mergedMap = new Map();

    // First add sample data
    (sampleAlumni || []).forEach(a => {
      if (a && a.id != null) mergedMap.set(a.id, a);
    });

    // Then overlay stored entries (so newly-registered items replace or add)
    allAlumni.forEach(a => {
      if (a && a.id != null) mergedMap.set(a.id, a);
    });

    const merged = Array.from(mergedMap.values());

    // Show only approved alumni in the directory
    const approvedAlumni = merged.filter(alum => alum && alum.status === 'approved');
    setAlumniData(approvedAlumni);
  };

  const departments = [
    { value: 'all', label: 'All Departments' },
    { value: 'Computer Science (CSE)', label: 'Computer Science' },
    { value: 'Electronics & Communication (ECE)', label: 'Electronics & Communication' },
    { value: 'Mechanical Engineering (ME)', label: 'Mechanical Engineering' },
    { value: 'Information Technology (IT)', label: 'Information Technology' },
    { value: 'Civil Engineering (CE)', label: 'Civil Engineering' },
    { value: 'Electrical Engineering (EE)', label: 'Electrical Engineering' },
    { value: 'Biotechnology (BT)', label: 'Biotechnology' },
    { value: 'Chemical Engineering (CHE)', label: 'Chemical Engineering' },
    { value: 'CS & Business Systems (CSBS)', label: 'CS & Business Systems' },
    { value: 'AI & Machine Learning (AIML)', label: 'AI & Machine Learning' },
    { value: 'CSE Data Science (CSE-DS)', label: 'CSE Data Science' },
    { value: 'Cybersecurity', label: 'Cybersecurity' },
    { value: 'IoT & Applications (IOTA)', label: 'IoT & Applications' },
  ];

  const graduationYears = [
    { value: 'all', label: 'All Years' },
    ...Array.from({ length: 20 }, (_, i) => {
      const year = 2005 + i;
      return { value: year.toString(), label: year.toString() };
    }),
  ];

  const filteredAlumni = alumniData.filter(alumni => {
    const matchesSearch = alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alumni.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alumni.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alumni.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'all' || alumni.department === selectedDepartment;
    const matchesYear = selectedYear === 'all' || alumni.graduationYear.toString() === selectedYear;

    return matchesSearch && matchesDepartment && matchesYear;
  });

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
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      fontWeight: '800',
      fontFamily: "'Poppins', sans-serif",
      marginBottom: '16px',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    headerSubtitle: {
      fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
      opacity: 0.9,
      maxWidth: '600px',
      margin: '0 auto',
    },
    content: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '40px 20px',
    },
    filters: {
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '20px',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
      marginBottom: '40px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
    },
    searchBox: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    },
    searchInput: {
      width: '100%',
      padding: '15px 45px 15px 15px',
      border: '2px solid #e5e7eb',
      borderRadius: '10px',
      fontSize: '16px',
      fontFamily: "'Inter', sans-serif",
    },
    searchIcon: {
      position: 'absolute',
      right: '15px',
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
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '30px',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '30px',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      marginBottom: '20px',
    },
    avatar: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      objectFit: 'cover',
    },
    name: {
      fontSize: '1.4rem',
      fontWeight: '700',
      fontFamily: "'Poppins', sans-serif",
      color: '#1f2937',
      marginBottom: '5px',
    },
    jobTitle: {
      color: '#667eea',
      fontWeight: '600',
      marginBottom: '5px',
    },
    company: {
      color: '#6b7280',
      fontSize: '0.9rem',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      marginBottom: '20px',
    },
    detailItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      color: '#6b7280',
      fontSize: '0.9rem',
    },
    bio: {
      color: '#4b5563',
      lineHeight: '1.6',
      fontSize: '0.9rem',
      marginBottom: '20px',
    },
    actions: {
      display: 'flex',
      gap: '10px',
    },
    actionButton: {
      flex: 1,
      padding: '10px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '5px',
      fontSize: '0.8rem',
      fontWeight: '500',
      transition: 'all 0.3s ease',
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '40px',
      maxWidth: '500px',
      width: '100%',
      maxHeight: '90vh',
      overflow: 'auto',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
    },
    stats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      marginBottom: '40px',
    },
    statCard: {
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '15px',
      textAlign: 'center',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
    },
    statNumber: {
      fontSize: '2.5rem',
      fontWeight: '800',
      color: '#667eea',
      marginBottom: '8px',
    },
    statLabel: {
      color: '#6b7280',
      fontWeight: '600',
      textTransform: 'uppercase',
      fontSize: '0.8rem',
      letterSpacing: '0.5px',
    },
  };

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
            <div style={styles.statLabel}>Approved Alumni</div>
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
          <div style={styles.statCard}>
            <div style={styles.statNumber}>
              {[...new Set(alumniData.map(alum => alum.company))].length}
            </div>
            <div style={styles.statLabel}>Companies</div>
          </div>
        </div>

        {/* Filters */}
        <div style={styles.filters}>
          <div style={styles.searchBox}>
            <input
              type="text"
              placeholder="Search by name, company, role, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
            <Search size={20} style={styles.searchIcon} />
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
          {filteredAlumni.map((alumni) => (
            <div
              key={alumni.id}
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.08)';
              }}
              onClick={() => setSelectedAlumni(alumni)}
            >
              <div style={styles.cardHeader}>
                <img
                  src={alumni.profileImage}
                  alt={alumni.name}
                  style={styles.avatar}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div style={{
                  ...styles.avatar,
                  display: 'none',
                  backgroundColor: '#667eea',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.5rem'
                }}>
                  {alumni.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 style={styles.name}>{alumni.name}</h3>
                  <p style={styles.jobTitle}>{alumni.jobTitle}</p>
                  <p style={styles.company}>{alumni.company}</p>
                </div>
              </div>
              
              <div style={styles.details}>
                <div style={styles.detailItem}>
                  <GraduationCap size={16} />
                  <span>Batch of {alumni.graduationYear}</span>
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
              
              <p style={styles.bio}>{alumni.bio}</p>
              
              <div style={styles.actions}>
                <button
                  style={{
                    ...styles.actionButton,
                    backgroundColor: '#0077b5',
                    color: 'white'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(alumni.linkedinUrl, '_blank');
                  }}
                >
                  <Linkedin size={14} />
                  LinkedIn
                </button>
                <button
                  style={{
                    ...styles.actionButton,
                    backgroundColor: '#f3f4f6',
                    color: '#374151'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = `mailto:${alumni.email}`;
                  }}
                >
                  <Mail size={14} />
                  Email
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredAlumni.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#6b7280',
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔍</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>No alumni found</h3>
            <p>Try adjusting your search criteria or filters</p>
          </div>
        )}

        {/* Modal */}
        {selectedAlumni && (
          <div style={styles.modal} onClick={() => setSelectedAlumni(null)}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div style={styles.cardHeader}>
                <img
                  src={selectedAlumni.profileImage}
                  alt={selectedAlumni.name}
                  style={styles.avatar}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div style={{
                  ...styles.avatar,
                  display: 'none',
                  backgroundColor: '#667eea',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.5rem'
                }}>
                  {selectedAlumni.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 style={styles.name}>{selectedAlumni.name}</h3>
                  <p style={styles.jobTitle}>{selectedAlumni.jobTitle}</p>
                  <p style={styles.company}>{selectedAlumni.company}</p>
                </div>
              </div>
              
              <div style={styles.details}>
                <div style={styles.detailItem}>
                  <GraduationCap size={16} />
                  <span>Batch of {selectedAlumni.graduationYear}</span>
                </div>
                <div style={styles.detailItem}>
                  <Briefcase size={16} />
                  <span>{selectedAlumni.department}</span>
                </div>
                <div style={styles.detailItem}>
                  <MapPin size={16} />
                  <span>{selectedAlumni.location}</span>
                </div>
                <div style={styles.detailItem}>
                  <Mail size={16} />
                  <span>{selectedAlumni.email}</span>
                </div>
                <div style={styles.detailItem}>
                  <Phone size={16} />
                  <span>{selectedAlumni.mobile}</span>
                </div>
              </div>
              
              <p style={styles.bio}>{selectedAlumni.bio}</p>
              
              <div style={styles.actions}>
                <button
                  style={{
                    ...styles.actionButton,
                    backgroundColor: '#0077b5',
                    color: 'white'
                  }}
                  onClick={() => window.open(selectedAlumni.linkedinUrl, '_blank')}
                >
                  <Linkedin size={14} />
                  Connect on LinkedIn
                </button>
                <button
                  style={{
                    ...styles.actionButton,
                    backgroundColor: '#667eea',
                    color: 'white'
                  }}
                  onClick={() => window.location.href = `mailto:${selectedAlumni.email}`}
                >
                  <Mail size={14} />
                  Send Email
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumniDirectory;