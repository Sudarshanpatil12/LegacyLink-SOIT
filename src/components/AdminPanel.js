// src/components/AdminPanel.js
import React, { useState, useEffect } from 'react';
import { 
  Search, CheckCircle, XCircle, Eye, Mail, Download, Edit, 
  Save, X, Trash2, Users, AlertCircle, Check, Loader 
} from 'lucide-react';

// Using a placeholder sampleAlumni as it's not provided
const sampleAlumni = [
  { 
    id: '1', 
    name: 'Admin Sample User', 
    email: 'admin.sample@test.com', 
    mobile: '1234567890',
    graduationYear: 2020, 
    department: 'CS & Business Systems (CSBS)', 
    jobTitle: 'Software Architect', 
    company: 'TechCorp Solutions', 
    location: 'San Jose, CA', 
    linkedinUrl: 'https://linkedin.com/in/adminsample', 
    bio: 'Experienced architect specializing in scalable cloud applications and machine learning integration.', 
    status: 'approved', 
    registrationDate: '2025-10-01', 
    profileImage: null 
  },
  {
    id: '2', 
    name: 'Pending Alum', 
    email: 'pending.alum@example.com', 
    mobile: '9876543210',
    graduationYear: 2024, 
    department: 'AI & Machine Learning (AIML)', 
    jobTitle: 'Data Analyst', 
    company: 'Startup X', 
    location: 'Remote', 
    linkedinUrl: '', 
    bio: 'Fresh graduate eager to contribute to cutting-edge AI projects and data modeling.', 
    status: 'pending', 
    registrationDate: '2025-11-05', 
    profileImage: null 
  }
];


const AdminPanel = () => {
  const [alumniData, setAlumniData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterStatus, setFilterStatus] = useState('pending'); // Default to pending
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [editingAlumni, setEditingAlumni] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [notification, setNotification] = useState(null); // { message: '', type: 'success' | 'error' }
  const [lightboxImage, setLightboxImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- Utility Functions ---

  const generateAvatarUrl = (name) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3b82f6&color=fff&size=48`;
  };

  const loadAlumniData = () => {
    setIsLoading(true);
    const storedData = localStorage.getItem('alumniData');
    if (storedData && storedData !== '[]') {
      const parsedData = JSON.parse(storedData);
      setAlumniData(parsedData);
    } else {
      // If no data in localStorage, initialize with sample data
      const alumniWithStatus = sampleAlumni.map(alum => ({
        ...alum,
        status: alum.status || 'approved',
        registrationDate: alum.registrationDate || new Date().toISOString().split('T')[0],
        profileImage: alum.profileImage || null,
      }));
      setAlumniData(alumniWithStatus);
      localStorage.setItem('alumniData', JSON.stringify(alumniWithStatus));
    }
    setTimeout(() => setIsLoading(false), 300); // Simulate network latency
  };

  useEffect(() => {
    loadAlumniData();
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000); // Display for 4 seconds
  };

  const departments = [
    'CS & Business Systems (CSBS)',
    'AI & Machine Learning (AIML)',
    'CSE Data Science (CSE-DS)',
    'Masters',
    'Computer Science (CSE)',
    'Electronics & Communication (ECE)',
    'Mechanical Engineering (ME)',
    'Information Technology (IT)',
    'Civil Engineering (CE)',
  ];

  const handleApprove = (alumniId) => {
    const updatedData = alumniData.map(alumni => 
      alumni.id === alumniId 
        ? { 
            ...alumni, 
            status: 'approved', 
            approvedDate: new Date().toISOString().split('T')[0] 
          }
        : alumni
    );
    
    setAlumniData(updatedData);
    localStorage.setItem('alumniData', JSON.stringify(updatedData));
    showNotification('Alumni approved successfully! Now visible in the public directory.', 'success');
  };

  const handleReject = (alumniId) => {
    const updatedData = alumniData.map(alumni => 
      alumni.id === alumniId 
        ? { ...alumni, status: 'rejected' }
        : alumni
    );
    
    setAlumniData(updatedData);
    localStorage.setItem('alumniData', JSON.stringify(updatedData));
    showNotification('Alumni application rejected.', 'error');
  };

  const handleDelete = (alumniId) => {
    const updatedData = alumniData.filter(alumni => alumni.id !== alumniId);
    setAlumniData(updatedData);
    localStorage.setItem('alumniData', JSON.stringify(updatedData));
    setDeleteConfirm(null);
    setSelectedAlumni(null); // Close modal if open
    showNotification('Alumni profile deleted successfully.', 'error');
  };

  const handleEdit = (alumni) => {
    setEditingAlumni(alumni.id);
    setEditFormData({ ...alumni });
  };

  const handleSaveEdit = () => {
    // Basic validation for required fields
    if (!editFormData.name || !editFormData.email || !editFormData.jobTitle) {
      showNotification('Name, Email, and Job Title are required.', 'error');
      return;
    }

    const updatedData = alumniData.map(alumni => 
      alumni.id === editingAlumni 
        ? { ...alumni, ...editFormData } // Merge existing data with form data
        : alumni
    );
    
    setAlumniData(updatedData);
    localStorage.setItem('alumniData', JSON.stringify(updatedData));
    setEditingAlumni(null);
    setEditFormData({});
    showNotification('Alumni information updated successfully!', 'success');
  };

  const handleCancelEdit = () => {
    setEditingAlumni(null);
    setEditFormData({});
  };

  const handleEditChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: field === 'graduationYear' ? parseInt(value) || '' : value // Ensure year is number
    }));
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilterDepartment('');
    setFilterStatus(''); 
  };

  const exportToCSV = () => {
    const approvedAlumni = alumniData.filter(alumni => alumni.status === 'approved');
    if (approvedAlumni.length === 0) {
      showNotification('No approved alumni to export.', 'error');
      return;
    }
    const headers = ['Name', 'Email', 'Mobile', 'Graduation Year', 'Department', 'Job Title', 'Company', 'Location', 'Registration Date', 'Approved Date', 'LinkedIn'];
    const csvData = approvedAlumni.map(alumni => [
      `"${alumni.name}"`,
      `"${alumni.email}"`,
      alumni.mobile,
      alumni.graduationYear,
      `"${alumni.department}"`,
      `"${alumni.jobTitle}"`,
      `"${alumni.company}"`,
      `"${alumni.location}"`,
      alumni.registrationDate,
      alumni.approvedDate || 'N/A',
      `"${alumni.linkedinUrl}"`
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `approved-alumni-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    showNotification(`Exported ${approvedAlumni.length} records to CSV.`, 'success');
  };

  const filteredAlumni = alumniData.filter(alumni => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = (
      alumni.name.toLowerCase().includes(searchLower) ||
      alumni.company.toLowerCase().includes(searchLower) ||
      alumni.email.toLowerCase().includes(searchLower) ||
      (alumni.jobTitle && alumni.jobTitle.toLowerCase().includes(searchLower))
    );
    
    const matchesDept = (filterDepartment === '' || alumni.department === filterDepartment);
    const matchesStatus = (filterStatus === '' || alumni.status === filterStatus);
    
    return matchesSearch && matchesDept && matchesStatus;
  });

  const pendingCount = alumniData.filter(a => a.status === 'pending').length;
  const approvedCount = alumniData.filter(a => a.status === 'approved').length;
  const rejectedCount = alumniData.filter(a => a.status === 'rejected').length;

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '32px 16px',
      fontFamily: "'Inter', sans-serif",
    },
    wrapper: {
      maxWidth: '1280px',
      margin: '0 auto',
    },
    header: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '32px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
      marginBottom: '32px',
    },
    headerTop: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
      gap: '16px',
    },
    title: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '8px',
    },
    subtitle: {
      color: '#6b7280',
      fontSize: '1.125rem',
      marginTop: '-8px',
    },
    exportButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: '#10b981',
      color: 'white',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'background-color 0.3s ease',
      flexShrink: 0,
    },
    stats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
      marginBottom: '24px',
    },
    statCard: {
      padding: '16px',
      borderRadius: '8px',
      border: '1px solid',
      textAlign: 'center',
    },
    statNumber: {
      fontSize: '1.5rem',
      fontWeight: '700',
      marginBottom: '4px',
    },
    statLabel: {
      fontSize: '0.75rem',
      fontWeight: '500',
      textTransform: 'uppercase',
    },
    filters: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '16px',
      alignItems: 'center',
    },
    searchBox: {
      position: 'relative',
      flex: '1 1 300px', 
      minWidth: '200px', // Adjusted for smaller screens
    },
    searchInput: {
      width: '100%',
      padding: '12px 12px 12px 40px', // Added padding-left for icon
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      fontSize: '14px',
      outline: 'none',
      transition: 'border-color 0.2s, box-shadow 0.2s',
    },
    searchIcon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9ca3af',
      pointerEvents: 'none', // Prevent interference with input
    },
    clearSearchIcon: {
      position: 'absolute',
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9ca3af',
      cursor: 'pointer',
    },
    select: {
      padding: '12px 16px',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      fontSize: '14px',
      outline: 'none',
      backgroundColor: 'white',
      flex: '1 1 200px',
      minWidth: '180px',
    },
    clearFiltersButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '12px 16px',
      border: 'none',
      borderRadius: '8px',
      backgroundColor: '#f3f4f6',
      color: '#4b5563',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'background-color 0.3s ease',
    },
    alumniList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    alumniCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
      borderLeft: '4px solid',
    },
    cardContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center', 
      gap: '16px',
      marginBottom: '12px',
    },
    avatar: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      objectFit: 'cover', 
      backgroundColor: '#e0e7ff', 
      flexShrink: 0,
    },
    alumniInfo: {
      flex: '1',
    },
    alumniName: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '4px',
    },
    alumniJob: {
      color: '#3b82f6',
      fontWeight: '600',
      marginBottom: '8px',
    },
    alumniDetails: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '16px',
      fontSize: '0.875rem',
      color: '#6b7280',
      marginBottom: '4px',
    },
    statusBadge: {
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: '500',
    },
    registrationDate: {
      fontSize: '0.75rem',
      color: '#9ca3af',
      marginTop: '4px',
    },
    bio: {
      color: '#4b5563',
      lineHeight: '1.5',
      fontSize: '0.875rem',
      marginBottom: '16px',
    },
    editInput: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '0.875rem',
      marginBottom: '8px',
    },
    editTextarea: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '0.875rem',
      minHeight: '80px',
      resize: 'vertical',
      marginBottom: '8px',
    },
    actions: {
      display: 'flex',
      flexWrap: 'wrap', 
      gap: '8px',
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center', 
      gap: '6px',
      padding: '8px 16px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      textDecoration: 'none',
      flex: '1 1 auto', 
      minWidth: '80px', 
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
      padding: '16px',
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '32px',
      maxWidth: '600px',
      width: '100%',
      maxHeight: '90vh',
      overflow: 'auto',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
      textAlign: 'center', 
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '24px',
      textAlign: 'left', 
    },
    modalTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1f2937',
    },
    closeButton: {
      color: '#9ca3af',
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
    },
    modalGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '24px',
      marginBottom: '24px',
      textAlign: 'left', 
    },
    modalSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    modalLabel: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '4px',
    },
    modalText: {
      color: '#1f2937',
    },
    modalBio: {
      marginBottom: '24px',
      textAlign: 'left', 
    },
    modalActions: {
      display: 'flex',
      gap: '12px',
    },
    modalActionButton: {
      flex: '1',
      padding: '12px 16px',
      border: 'none',
      borderRadius: '8px',
      color: 'white',
      textAlign: 'center',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    deleteModal: {
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
      padding: '16px',
    },
    deleteModalContent: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '32px',
      maxWidth: '500px',
      width: '100%',
      textAlign: 'center',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
    },
    deleteIcon: {
      fontSize: '4rem',
      color: '#ef4444',
      marginBottom: '16px',
    },
    deleteTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '12px',
    },
    deleteText: {
      color: '#6b7280',
      lineHeight: '1.6',
      marginBottom: '24px',
    },
    deleteActions: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'center',
    },
    deleteButton: {
      padding: '12px 24px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'background-color 0.3s ease',
    },
    emptyState: {
      textAlign: 'center',
      padding: '48px 20px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    emptyIcon: {
      marginBottom: '16px',
      color: '#d1d5db',
    },
    emptyTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#6b7280',
      marginBottom: '8px',
    },
    emptyText: {
      color: '#9ca3af',
    },
    notification: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '16px 24px',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      zIndex: 2000,
      backgroundColor: 'white',
    },
    notificationSuccess: {
      borderLeft: '4px solid #10b981',
    },
    notificationError: {
      borderLeft: '4px solid #ef4444',
    },
    notificationText: {
      color: '#1f2937',
      fontWeight: '500',
    },
    lightbox: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '16px',
    },
    lightboxImage: {
      maxWidth: '90vw',
      maxHeight: '90vh',
      objectFit: 'contain',
      borderRadius: '8px',
    },
    lightboxClose: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      color: 'white',
      background: 'none',
      border: 'none',
      fontSize: '2rem',
      cursor: 'pointer',
    },
    loadingOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '12px',
    }
  };

  if (isLoading) {
    return (
      <div style={{...styles.container, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Loader size={40} color="#3b82f6" className="animate-spin" /> 
        <p style={{marginLeft: '10px', fontSize: '1.2rem', color: '#3b82f6'}}>Loading Alumni Data...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        
        {/* --- Notification Bar --- */}
        {notification && (
          <div style={{
            ...styles.notification,
            ...(notification.type === 'success' ? styles.notificationSuccess : styles.notificationError)
          }}>
            {notification.type === 'success' ? 
              <CheckCircle size={20} color="#10b981" /> : 
              <AlertCircle size={20} color="#ef4444" />}
            <span style={styles.notificationText}>{notification.message}</span>
            <button 
              onClick={() => setNotification(null)}
              style={{ ...styles.closeButton, color: '#9ca3af', fontSize: '1.2rem', position: 'relative', top: '-2px', right: '-2px' }}
            >
              ×
            </button>
          </div>
        )}

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerTop}>
            <div>
              <h1 style={styles.title}>Alumni Management Admin</h1>
              <p style={styles.subtitle}>Manage alumni registrations and approvals</p>
            </div>
            <button
              onClick={exportToCSV}
              style={styles.exportButton}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
            >
              <Download size={20} />
              Export Approved Alumni
            </button>
          </div>

          {/* Stats */}
          <div style={styles.stats}>
            <div style={{...styles.statCard, backgroundColor: '#dbeafe', borderColor: '#93c5fd'}}>
              <div style={{...styles.statNumber, color: '#1d4ed8'}}>{alumniData.length}</div>
              <div style={{...styles.statLabel, color: '#1e40af'}}>Total Registrations</div>
            </div>
            <div style={{...styles.statCard, backgroundColor: '#fef3c7', borderColor: '#fcd34d'}}>
              <div style={{...styles.statNumber, color: '#d97706'}}>{pendingCount}</div>
              <div style={{...styles.statLabel, color: '#b45309'}}>Pending Approval</div>
            </div>
            <div style={{...styles.statCard, backgroundColor: '#dcfce7', borderColor: '#86efac'}}>
              <div style={{...styles.statNumber, color: '#15803d'}}>{approvedCount}</div>
              <div style={{...styles.statLabel, color: '#166534'}}>Approved Alumni</div>
            </div>
            <div style={{...styles.statCard, backgroundColor: '#fee2e2', borderColor: '#fca5a5'}}>
              <div style={{...styles.statNumber, color: '#dc2626'}}>{rejectedCount}</div>
              <div style={{...styles.statLabel, color: '#b91c1c'}}>Rejected</div>
            </div>
          </div>

          {/* Filters */}
          <div style={styles.filters}>
            <div style={styles.searchBox}>
              <Search size={20} style={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search alumni by name, company, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
              {/* --- Clear search button --- */}
              {searchTerm && (
                <X 
                  size={20} 
                  style={styles.clearSearchIcon} 
                  onClick={() => setSearchTerm('')} 
                />
              )}
            </div>
            
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              style={styles.select}
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={styles.select}
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="">All Status</option>
            </select>

            {/* --- Clear all filters button --- */}
            <button
              onClick={handleClearFilters}
              style={styles.clearFiltersButton}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#e5e7eb'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#f3f4f6'}
            >
              <XCircle size={16} />
              Clear All Filters
            </button>
          </div>
        </div>

        {/* Alumni List */}
        <div style={styles.alumniList}>
          {filteredAlumni.map(alumni => (
            <div 
              key={alumni.id} 
              style={{
                ...styles.alumniCard,
                borderLeftColor: 
                  alumni.status === 'pending' ? '#f59e0b' : 
                  alumni.status === 'approved' ? '#10b981' : '#ef4444'
              }}
            >
              <div style={styles.cardContent}>
                <div style={styles.cardHeader}>
                  <img
                    src={alumni.profileImage || generateAvatarUrl(alumni.name)} // Use fallback if image is null
                    alt={`${alumni.name}'s profile`}
                    style={styles.avatar}
                  />
                  <div style={styles.alumniInfo}>
                    {editingAlumni === alumni.id ? (
                      <>
                        <input type="text" value={editFormData.name || ''} onChange={(e) => handleEditChange('name', e.target.value)} style={styles.editInput} placeholder="Full Name" />
                        <input type="email" value={editFormData.email || ''} onChange={(e) => handleEditChange('email', e.target.value)} style={styles.editInput} placeholder="Email" />
                        <input type="text" value={editFormData.jobTitle || ''} onChange={(e) => handleEditChange('jobTitle', e.target.value)} style={styles.editInput} placeholder="Job Title" />
                        <input type="text" value={editFormData.company || ''} onChange={(e) => handleEditChange('company', e.target.value)} style={styles.editInput} placeholder="Company" />
                      </>
                    ) : (
                      <>
                        <h3 style={styles.alumniName}>{alumni.name}</h3>
                        <p style={styles.alumniJob}>{alumni.jobTitle} at {alumni.company}</p>
                      </>
                    )}
                    
                    <div style={styles.alumniDetails}>
                      {editingAlumni === alumni.id ? (
                        <>
                          <select value={editFormData.department || ''} onChange={(e) => handleEditChange('department', e.target.value)} style={styles.editInput} >
                            <option value="">Select Department</option>
                            {departments.map(dept => (
                              <option key={dept} value={dept}>{dept}</option>
                            ))}
                          </select>
                          <input type="number" value={editFormData.graduationYear || ''} onChange={(e) => handleEditChange('graduationYear', e.target.value)} style={styles.editInput} placeholder="Graduation Year" />
                          <input type="text" value={editFormData.location || ''} onChange={(e) => handleEditChange('location', e.target.value)} style={styles.editInput} placeholder="Location" />
                        </>
                      ) : (
                        <>
                          <span><strong>Department:</strong> {alumni.department}</span>
                          <span><strong>Graduation:</strong> {alumni.graduationYear}</span>
                          <span><strong>Location:</strong> {alumni.location}</span>
                        </>
                      )}
                      <span style={{
                        ...styles.statusBadge,
                        backgroundColor: 
                          alumni.status === 'pending' ? '#fef3c7' :
                          alumni.status === 'approved' ? '#dcfce7' : '#fee2e2',
                        color: 
                          alumni.status === 'pending' ? '#d97706' :
                          alumni.status === 'approved' ? '#166534' : '#dc2626'
                      }}>
                        {alumni.status.toUpperCase()}
                      </span>
                    </div>
                    <div style={styles.registrationDate}>
                      Registered: {alumni.registrationDate}
                      {alumni.approvedDate && ` • Approved: ${alumni.approvedDate}`}
                    </div>
                  </div>
                </div>
                
                {editingAlumni === alumni.id ? (
                  <textarea value={editFormData.bio || ''} onChange={(e) => handleEditChange('bio', e.target.value)} style={styles.editTextarea} placeholder="Professional Bio" />
                ) : (
                  <p style={styles.bio}>{alumni.bio}</p>
                )}
                
                <div style={styles.actions}>
                  {editingAlumni === alumni.id ? (
                    <>
                      <button onClick={handleSaveEdit} style={{ ...styles.button, backgroundColor: '#10b981', color: 'white' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'} onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'} >
                        <Save size={16} /> Save
                      </button>
                      <button onClick={handleCancelEdit} style={{ ...styles.button, backgroundColor: '#6b7280', color: 'white' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#4b5563'} onMouseLeave={(e) => e.target.style.backgroundColor = '#6b7280'} >
                        <X size={16} /> Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setSelectedAlumni(alumni)} style={{ ...styles.button, backgroundColor: '#3b82f6', color: 'white' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'} onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'} >
                        <Eye size={16} /> View
                      </button>
                      
                      {alumni.status === 'approved' && (
                        <button onClick={() => handleEdit(alumni)} style={{ ...styles.button, backgroundColor: '#f59e0b', color: 'white' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#d97706'} onMouseLeave={(e) => e.target.style.backgroundColor = '#f59e0b'} >
                          <Edit size={16} /> Edit
                        </button>
                      )}
                      
                      {alumni.status === 'pending' && (
                        <>
                          <button onClick={() => handleApprove(alumni.id)} style={{ ...styles.button, backgroundColor: '#10b981', color: 'white' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'} onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'} >
                            <CheckCircle size={16} /> Approve
                          </button>
                          <button onClick={() => handleReject(alumni.id)} style={{ ...styles.button, backgroundColor: '#ef4444', color: 'white' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'} onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'} >
                            <XCircle size={16} /> Reject
                          </button>
                        </>
                      )}
                      
                      {(alumni.status === 'approved' || alumni.status === 'rejected') && (
                        <a href={`mailto:${alumni.email}`} style={{ ...styles.button, backgroundColor: '#8b5cf6', color: 'white' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#7c3aed'} onMouseLeave={(e) => e.target.style.backgroundColor = '#8b5cf6'} >
                          <Mail size={16} /> Email
                        </a>
                      )}

                      <button onClick={() => setDeleteConfirm(alumni)} style={{ ...styles.button, backgroundColor: '#ef4444', color: 'white' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'} onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'} >
                        <Trash2 size={16} /> Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredAlumni.length === 0 && (
            <div style={styles.emptyState}>
              <Users size={64} style={styles.emptyIcon} />
              <h3 style={styles.emptyTitle}>No alumni found</h3>
              <p style={styles.emptyText}>Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Alumni Detail Modal */}
      {selectedAlumni && (
        <div style={styles.modal} onClick={() => setSelectedAlumni(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <img
              onClick={() => selectedAlumni.profileImage && setLightboxImage(selectedAlumni.profileImage)}
              src={selectedAlumni.profileImage || generateAvatarUrl(selectedAlumni.name)}
              alt={`${selectedAlumni.name}'s profile`}
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                objectFit: 'cover',
                margin: '-80px auto 20px',
                border: '4px solid white',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                cursor: selectedAlumni.profileImage ? 'pointer' : 'default', // Only clickable if image exists
              }}
            />
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>{selectedAlumni.name}</h2>
              <button onClick={() => setSelectedAlumni(null)} style={styles.closeButton} >
                ×
              </button>
            </div>

            <div style={styles.modalGrid}>
              <div style={styles.modalSection}>
                <div><label style={styles.modalLabel}>Email</label><p style={styles.modalText}>{selectedAlumni.email}</p></div>
                <div><label style={styles.modalLabel}>Mobile</label><p style={styles.modalText}>{selectedAlumni.mobile}</p></div>
                <div><label style={styles.modalLabel}>Department</label><p style={styles.modalText}>{selectedAlumni.department}</p></div>
                <div><label style={styles.modalLabel}>Graduation Year</label><p style={styles.modalText}>{selectedAlumni.graduationYear}</p></div>
              </div>
              <div style={styles.modalSection}>
                <div><label style={styles.modalLabel}>Job Title</label><p style={styles.modalText}>{selectedAlumni.jobTitle}</p></div>
                <div><label style={styles.modalLabel}>Company</label><p style={styles.modalText}>{selectedAlumni.company}</p></div>
                <div><label style={styles.modalLabel}>Location</label><p style={styles.modalText}>{selectedAlumni.location}</p></div>
                {selectedAlumni.linkedinUrl && (
                  <div>
                    <label style={styles.modalLabel}>LinkedIn</label>
                    <a href={selectedAlumni.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{...styles.modalText, color: '#3b82f6', textDecoration: 'none', wordBreak: 'break-all'}}>
                      View Profile
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div style={styles.modalBio}>
              <label style={styles.modalLabel}>Professional Bio</label>
              <p style={{...styles.modalText, lineHeight: '1.6'}}>{selectedAlumni.bio}</p>
            </div>

            <div style={styles.modalActions}>
              <a href={`mailto:${selectedAlumni.email}`} style={{...styles.modalActionButton, backgroundColor: '#3b82f6'}} onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'} onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}>
                Contact via Email
              </a>
              {selectedAlumni.linkedinUrl && (
                <a href={selectedAlumni.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{...styles.modalActionButton, backgroundColor: '#1e40af'}} onMouseEnter={(e) => e.target.style.backgroundColor = '#1e3a8a'} onMouseLeave={(e) => e.target.style.backgroundColor = '#1e40af'}>
                  View LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div style={styles.deleteModal} onClick={() => setDeleteConfirm(null)}>
          <div style={styles.deleteModalContent} onClick={(e) => e.stopPropagation()}>
            <Trash2 size={64} style={{...styles.deleteIcon, margin: '0 auto 16px'}} />
            <h2 style={styles.deleteTitle}>Delete Alumni Profile</h2>
            <p style={styles.deleteText}>
              Are you sure you want to delete **{deleteConfirm.name}**'s profile? 
              This action cannot be undone.
            </p>
            <div style={styles.deleteActions}>
              <button onClick={() => setDeleteConfirm(null)} style={{...styles.deleteButton, backgroundColor: '#6b7280', color: 'white'}} onMouseEnter={(e) => e.target.style.backgroundColor = '#4b5563'} onMouseLeave={(e) => e.target.style.backgroundColor = '#6b7280'}>
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteConfirm.id)} style={{...styles.deleteButton, backgroundColor: '#ef4444', color: 'white'}} onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'} onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}>
                Delete Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Image Lightbox Modal --- */}
      {lightboxImage && (
        <div style={styles.lightbox} onClick={() => setLightboxImage(null)}>
          <button onClick={() => setLightboxImage(null)} style={styles.lightboxClose}>
            ×
          </button>
          <img
            src={lightboxImage}
            alt="Profile full view"
            style={styles.lightboxImage}
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </div>
  );
};

export default AdminPanel;