// src/components/AdminPanel.js
import React, { useState, useEffect, useMemo } from 'react';
import {
  Search, CheckCircle, XCircle, Eye, Mail, Download, Edit,
  Save, X, Trash2, Users, AlertCircle, Check, Loader, Filter,
  Calendar, Clock, UserPlus, SortDesc, SortAsc, Bell, RefreshCw,
  BarChart3, FileText, Shield, Settings, Database, EyeOff,
  Send, MessageSquare, Upload, Image, Lock, Unlock, Award,
  TrendingUp, PieChart, CreditCard, Globe, Target, Zap,
  ExternalLink, ChevronDown, ChevronUp, CheckSquare, Square,
  Building, GraduationCap, Briefcase, MapPin
} from 'lucide-react';
import { sampleAlumni } from '../data/sampleAlumni';

const AdminPanel = () => {
  // State management
  const [alumniData, setAlumniData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    department: '',
    status: '',
    graduationYear: '',
  });
  const [sortConfig, setSortConfig] = useState({ key: 'registrationDate', direction: 'desc' });
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [editingAlumni, setEditingAlumni] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('registrations');
  const [bulkSelection, setBulkSelection] = useState([]);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);

  // Initialize with sample data
  useEffect(() => {
    loadAlumniData();
  }, []);

  // Extract unique departments and years from data
  useEffect(() => {
    if (alumniData.length > 0) {
      const departments = [...new Set(alumniData.map(alum => alum.department))].sort();
      const years = [...new Set(alumniData.map(alum => alum.graduationYear))].sort((a, b) => b - a);
      setDepartmentOptions(departments);
      setYearOptions(years);
    }
  }, [alumniData]);

  // Load data from sampleAlumni
  const loadAlumniData = () => {
    setIsLoading(true);
    try {
      // Start with sample alumni data
      let data = [...sampleAlumni];
      
      // Check localStorage for any updates
      const storedData = localStorage.getItem('alumniData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          // Merge sample data with localStorage data
          const sampleIds = new Set(data.map(d => d.id));
          const additionalData = parsedData.filter(item => !sampleIds.has(item.id));
          data = [...data, ...additionalData];
        }
      }

      // Ensure all alumni have required fields
      data = data.map(alum => ({
        ...alum,
        status: alum.status || 'approved',
        registrationDate: alum.registrationDate || new Date().toISOString().split('T')[0],
        isNew: alum.isNew !== undefined ? alum.isNew : false,
        verified: alum.verified !== undefined ? alum.verified : true,
        profileImage: alum.profileImage || null,
      }));

      setAlumniData(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setIsLoading(false);
    }
  };

  // Calculate statistics
  const stats = useMemo(() => {
    return {
      total: alumniData.length,
      pending: alumniData.filter(d => d.status === 'pending').length,
      approved: alumniData.filter(d => d.status === 'approved').length,
      rejected: alumniData.filter(d => d.status === 'rejected').length,
      new: alumniData.filter(d => d.isNew).length,
      withImage: alumniData.filter(d => d.profileImage).length,
      verified: alumniData.filter(d => d.verified).length,
      departments: departmentOptions.length,
    };
  }, [alumniData, departmentOptions]);

  // Filter and sort data
  const filteredData = useMemo(() => {
    let result = [...alumniData];

    // Apply filters
    if (filters.department) {
      result = result.filter(item => item.department === filters.department);
    }
    if (filters.status) {
      result = result.filter(item => item.status === filters.status);
    }
    if (filters.graduationYear) {
      result = result.filter(item => item.graduationYear.toString() === filters.graduationYear);
    }

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(item =>
        item.name?.toLowerCase().includes(term) ||
        item.email?.toLowerCase().includes(term) ||
        item.company?.toLowerCase().includes(term) ||
        item.jobTitle?.toLowerCase().includes(term) ||
        item.department?.toLowerCase().includes(term)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === 'registrationDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [alumniData, filters, searchTerm, sortConfig]);

  // Handle sort
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  // Bulk actions
  const toggleBulkSelection = () => {
    if (bulkSelection.length === filteredData.length) {
      setBulkSelection([]);
    } else {
      setBulkSelection(filteredData.map(item => item.id));
    }
  };

  const handleBulkApprove = () => {
    const updatedData = alumniData.map(item =>
      bulkSelection.includes(item.id) ? { ...item, status: 'approved', isNew: false } : item
    );
    setAlumniData(updatedData);
    saveToLocalStorage(updatedData);
    setBulkSelection([]);
    showNotification(`${bulkSelection.length} alumni approved`, 'success');
  };

  const handleBulkReject = () => {
    const updatedData = alumniData.map(item =>
      bulkSelection.includes(item.id) ? { ...item, status: 'rejected', isNew: false } : item
    );
    setAlumniData(updatedData);
    saveToLocalStorage(updatedData);
    setBulkSelection([]);
    showNotification(`${bulkSelection.length} alumni rejected`, 'error');
  };

  const handleBulkDelete = () => {
    const updatedData = alumniData.filter(item => !bulkSelection.includes(item.id));
    setAlumniData(updatedData);
    saveToLocalStorage(updatedData);
    setBulkSelection([]);
    showNotification(`${bulkSelection.length} alumni deleted`, 'error');
  };

  // Single alumni actions
  const handleApprove = (id) => {
    const updatedData = alumniData.map(item =>
      item.id === id ? { ...item, status: 'approved', isNew: false } : item
    );
    setAlumniData(updatedData);
    saveToLocalStorage(updatedData);
    showNotification('Alumni approved', 'success');
  };

  const handleReject = (id) => {
    const updatedData = alumniData.map(item =>
      item.id === id ? { ...item, status: 'rejected', isNew: false } : item
    );
    setAlumniData(updatedData);
    saveToLocalStorage(updatedData);
    showNotification('Alumni rejected', 'error');
  };

  const handleDelete = (id) => {
    const updatedData = alumniData.filter(item => item.id !== id);
    setAlumniData(updatedData);
    saveToLocalStorage(updatedData);
    setDeleteConfirm(null);
    showNotification('Alumni deleted', 'error');
  };

  const handleVerify = (id) => {
    const updatedData = alumniData.map(item =>
      item.id === id ? { ...item, verified: !item.verified } : item
    );
    setAlumniData(updatedData);
    saveToLocalStorage(updatedData);
    showNotification('Verification status updated', 'success');
  };

  const handleEdit = (alumni) => {
    setEditingAlumni(alumni.id);
    setEditFormData({ ...alumni });
  };

  const handleSaveEdit = () => {
    if (!editFormData.name || !editFormData.email) {
      showNotification('Name and email are required', 'error');
      return;
    }

    const updatedData = alumniData.map(item =>
      item.id === editingAlumni ? { ...item, ...editFormData } : item
    );
    setAlumniData(updatedData);
    saveToLocalStorage(updatedData);
    setEditingAlumni(null);
    setEditFormData({});
    showNotification('Changes saved successfully', 'success');
  };

  const handleCancelEdit = () => {
    setEditingAlumni(null);
    setEditFormData({});
  };

  // Save to localStorage
  const saveToLocalStorage = (data) => {
    try {
      localStorage.setItem('alumniData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  // Export functions
  const exportToCSV = (type = 'all') => {
    let dataToExport = [];
    
    switch (type) {
      case 'all':
        dataToExport = filteredData;
        break;
      case 'approved':
        dataToExport = filteredData.filter(d => d.status === 'approved');
        break;
      case 'pending':
        dataToExport = filteredData.filter(d => d.status === 'pending');
        break;
      default:
        dataToExport = filteredData;
    }

    if (dataToExport.length === 0) {
      showNotification('No data to export', 'error');
      return;
    }

    const headers = ['Name', 'Email', 'Mobile', 'Department', 'Batch', 'Job Title', 'Company', 'Location', 'Status', 'Registration Date'];
    const csvData = dataToExport.map(item => [
      `"${item.name}"`,
      `"${item.email}"`,
      `"${item.mobile}"`,
      `"${item.department}"`,
      item.graduationYear,
      `"${item.jobTitle}"`,
      `"${item.company}"`,
      `"${item.location}"`,
      item.status,
      item.registrationDate
    ]);

    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alumni-${type}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    showNotification(`Exported ${dataToExport.length} records`, 'success');
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      department: '',
      status: '',
      graduationYear: '',
    });
    setSortConfig({ key: 'registrationDate', direction: 'desc' });
    setBulkSelection([]);
  };

  // Notification system
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return { bg: '#dcfce7', text: '#166534', border: '#86efac' };
      case 'pending': return { bg: '#fef3c7', text: '#d97706', border: '#fcd34d' };
      case 'rejected': return { bg: '#fee2e2', text: '#dc2626', border: '#fca5a5' };
      default: return { bg: '#f3f4f6', text: '#6b7280', border: '#d1d5db' };
    }
  };

  // Get department abbreviation
  const getDeptAbbreviation = (department) => {
    if (!department) return '';
    const match = department.match(/\(([^)]+)\)/);
    return match ? match[1] : department.substring(0, 3).toUpperCase();
  };

  // Analytics Component
  const AnalyticsTab = () => {
    // Calculate analytics data
    const analyticsData = useMemo(() => {
      const departmentCount = {};
      const yearCount = {};
      const companyCount = {};
      const locationCount = {};
      const statusCount = { approved: 0, pending: 0, rejected: 0 };
      const verifiedCount = { verified: 0, notVerified: 0 };
      
      alumniData.forEach(alumni => {
        // Department count
        departmentCount[alumni.department] = (departmentCount[alumni.department] || 0) + 1;
        
        // Year count
        yearCount[alumni.graduationYear] = (yearCount[alumni.graduationYear] || 0) + 1;
        
        // Company count (top 10)
        companyCount[alumni.company] = (companyCount[alumni.company] || 0) + 1;
        
        // Location count
        locationCount[alumni.location] = (locationCount[alumni.location] || 0) + 1;
        
        // Status count
        statusCount[alumni.status] = (statusCount[alumni.status] || 0) + 1;
        
        // Verified count
        if (alumni.verified) {
          verifiedCount.verified++;
        } else {
          verifiedCount.notVerified++;
        }
      });

      // Sort and get top values
      const topDepartments = Object.entries(departmentCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
      
      const topCompanies = Object.entries(companyCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
      
      const topLocations = Object.entries(locationCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

      // Year trend
      const years = Object.keys(yearCount).sort((a, b) => a - b);
      const yearData = years.map(year => ({
        year,
        count: yearCount[year]
      }));

      return {
        topDepartments,
        topCompanies,
        topLocations,
        yearData,
        statusData: Object.entries(statusCount),
        verifiedData: Object.entries(verifiedCount),
        totalAlumni: alumniData.length,
      };
    }, [alumniData]);

    return (
      <div style={analyticsStyles.container}>
        {/* Key Metrics */}
        <div style={analyticsStyles.metricsGrid}>
          <div style={analyticsStyles.metricCard}>
            <div style={{...analyticsStyles.metricIcon, backgroundColor: '#dbeafe', color: '#1d4ed8'}}>
              <Users size={24} />
            </div>
            <div style={analyticsStyles.metricContent}>
              <div style={analyticsStyles.metricValue}>{analyticsData.totalAlumni}</div>
              <div style={analyticsStyles.metricLabel}>Total Alumni</div>
            </div>
          </div>
          
          <div style={analyticsStyles.metricCard}>
            <div style={{...analyticsStyles.metricIcon, backgroundColor: '#dcfce7', color: '#166534'}}>
              <Building size={24} />
            </div>
            <div style={analyticsStyles.metricContent}>
              <div style={analyticsStyles.metricValue}>
                {Object.keys(analyticsData.topCompanies).length}
              </div>
              <div style={analyticsStyles.metricLabel}>Companies</div>
            </div>
          </div>
          
          <div style={analyticsStyles.metricCard}>
            <div style={{...analyticsStyles.metricIcon, backgroundColor: '#fef3c7', color: '#d97706'}}>
              <MapPin size={24} />
            </div>
            <div style={analyticsStyles.metricContent}>
              <div style={analyticsStyles.metricValue}>
                {Object.keys(analyticsData.topLocations).length}
              </div>
              <div style={analyticsStyles.metricLabel}>Locations</div>
            </div>
          </div>
          
          <div style={analyticsStyles.metricCard}>
            <div style={{...analyticsStyles.metricIcon, backgroundColor: '#f3e8ff', color: '#7c3aed'}}>
              <GraduationCap size={24} />
            </div>
            <div style={analyticsStyles.metricContent}>
              <div style={analyticsStyles.metricValue}>
                {Object.keys(analyticsData.topDepartments).length}
              </div>
              <div style={analyticsStyles.metricLabel}>Departments</div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div style={analyticsStyles.chartsGrid}>
          {/* Status Distribution */}
          <div style={analyticsStyles.chartCard}>
            <div style={analyticsStyles.chartHeader}>
              <h3 style={analyticsStyles.chartTitle}>Status Distribution</h3>
              <PieChart size={20} color="#6b7280" />
            </div>
            <div style={analyticsStyles.chartContent}>
              {analyticsData.statusData.map(([status, count]) => {
                const color = getStatusColor(status);
                const percentage = ((count / analyticsData.totalAlumni) * 100).toFixed(1);
                return (
                  <div key={status} style={analyticsStyles.distributionItem}>
                    <div style={analyticsStyles.distributionHeader}>
                      <div style={{...analyticsStyles.distributionColor, backgroundColor: color.bg}} />
                      <span style={analyticsStyles.distributionLabel}>{status.toUpperCase()}</span>
                      <span style={analyticsStyles.distributionValue}>{count}</span>
                    </div>
                    <div style={analyticsStyles.progressBar}>
                      <div 
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: color.text,
                          height: '6px',
                          borderRadius: '3px'
                        }} 
                      />
                    </div>
                    <div style={analyticsStyles.percentage}>{percentage}%</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Department Distribution */}
          <div style={analyticsStyles.chartCard}>
            <div style={analyticsStyles.chartHeader}>
              <h3 style={analyticsStyles.chartTitle}>Top Departments</h3>
              <BarChart3 size={20} color="#6b7280" />
            </div>
            <div style={analyticsStyles.chartContent}>
              {analyticsData.topDepartments.map(([dept, count]) => {
                const percentage = ((count / analyticsData.totalAlumni) * 100).toFixed(1);
                return (
                  <div key={dept} style={analyticsStyles.barItem}>
                    <div style={analyticsStyles.barInfo}>
                      <span style={analyticsStyles.barLabel}>{dept}</span>
                      <span style={analyticsStyles.barValue}>{count}</span>
                    </div>
                    <div style={analyticsStyles.barContainer}>
                      <div 
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: '#0a4a7a',
                          height: '24px',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          paddingLeft: '8px',
                          color: 'white',
                          fontSize: '0.8rem',
                          fontWeight: '500',
                        }}
                      >
                        {percentage}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Year-wise Distribution */}
          <div style={analyticsStyles.chartCard}>
            <div style={analyticsStyles.chartHeader}>
              <h3 style={analyticsStyles.chartTitle}>Batch Year Distribution</h3>
              <TrendingUp size={20} color="#6b7280" />
            </div>
            <div style={analyticsStyles.chartContent}>
              <div style={analyticsStyles.yearChart}>
                {analyticsData.yearData.map(({ year, count }) => (
                  <div key={year} style={analyticsStyles.yearBar}>
                    <div style={analyticsStyles.yearCount}>{count}</div>
                    <div 
                      style={{ 
                        height: `${Math.min(count * 10, 150)}px`,
                        backgroundColor: '#10b981',
                        width: '30px',
                        borderRadius: '4px 4px 0 0',
                      }} 
                    />
                    <div style={analyticsStyles.yearLabel}>{year}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Companies */}
          <div style={analyticsStyles.chartCard}>
            <div style={analyticsStyles.chartHeader}>
              <h3 style={analyticsStyles.chartTitle}>Top Companies</h3>
              <Briefcase size={20} color="#6b7280" />
            </div>
            <div style={analyticsStyles.chartContent}>
              <div style={analyticsStyles.companyList}>
                {analyticsData.topCompanies.map(([company, count], index) => (
                  <div key={company} style={analyticsStyles.companyItem}>
                    <div style={analyticsStyles.companyRank}>{index + 1}</div>
                    <div style={analyticsStyles.companyInfo}>
                      <div style={analyticsStyles.companyName}>{company}</div>
                      <div style={analyticsStyles.companyCount}>{count} alumni</div>
                    </div>
                    <div style={analyticsStyles.companyBadge}>
                      {((count / analyticsData.totalAlumni) * 100).toFixed(0)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Location Distribution */}
          <div style={{ ...analyticsStyles.chartCard, gridColumn: '1 / -1' }}>
            <div style={analyticsStyles.chartHeader}>
              <h3 style={analyticsStyles.chartTitle}>Geographical Distribution</h3>
              <Globe size={20} color="#6b7280" />
            </div>
            <div style={analyticsStyles.chartContent}>
              <div style={analyticsStyles.locationGrid}>
                {analyticsData.topLocations.map(([location, count]) => {
                  const percentage = ((count / analyticsData.totalAlumni) * 100).toFixed(1);
                  return (
                    <div key={location} style={analyticsStyles.locationItem}>
                      <div style={analyticsStyles.locationHeader}>
                        <MapPin size={16} color="#6b7280" />
                        <span style={analyticsStyles.locationName}>{location}</span>
                      </div>
                      <div style={analyticsStyles.locationStats}>
                        <span style={analyticsStyles.locationCount}>{count}</span>
                        <span style={analyticsStyles.locationPercentage}>{percentage}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Verification Status */}
        <div style={analyticsStyles.verificationCard}>
          <div style={analyticsStyles.chartHeader}>
            <h3 style={analyticsStyles.chartTitle}>Verification Status</h3>
            <Shield size={20} color="#6b7280" />
          </div>
          <div style={analyticsStyles.verificationContent}>
            <div style={analyticsStyles.verificationStats}>
              {analyticsData.verifiedData.map(([status, count]) => (
                <div key={status} style={analyticsStyles.verificationStat}>
                  <div style={analyticsStyles.verificationValue}>{count}</div>
                  <div style={analyticsStyles.verificationLabel}>
                    {status === 'verified' ? 'Verified' : 'Not Verified'}
                  </div>
                  <div style={analyticsStyles.verificationPercentage}>
                    {((count / analyticsData.totalAlumni) * 100).toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Styles
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: "'Inter', sans-serif",
    },
    header: {
      background: 'linear-gradient(135deg, #0a4a7a 0%, #1e6ba8 100%)',
      color: 'white',
      padding: '30px 40px',
      boxShadow: '0 4px 20px rgba(10, 74, 122, 0.2)',
    },
    headerContent: {
      maxWidth: '1400px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '20px',
    },
    titleSection: {
      flex: 1,
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '800',
      marginBottom: '8px',
      fontFamily: "'Poppins', sans-serif",
    },
    subtitle: {
      fontSize: '1.1rem',
      opacity: 0.9,
    },
    headerActions: {
      display: 'flex',
      gap: '10px',
    },
    mainContent: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '30px 20px',
    },
    tabs: {
      display: 'flex',
      backgroundColor: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      marginBottom: '30px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
    },
    tab: {
      flex: 1,
      padding: '18px 24px',
      textAlign: 'center',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      fontSize: '0.95rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      borderBottom: '3px solid transparent',
    },
    activeTab: {
      backgroundColor: '#f0f9ff',
      color: '#0a4a7a',
      borderBottomColor: '#0a4a7a',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '20px',
      marginBottom: '30px',
    },
    statCard: {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
      display: 'flex',
      alignItems: 'center',
      gap: '18px',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    statIcon: {
      width: '56px',
      height: '56px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    statContent: {
      flex: 1,
    },
    statNumber: {
      fontSize: '2rem',
      fontWeight: '800',
      marginBottom: '4px',
    },
    statLabel: {
      fontSize: '0.85rem',
      color: '#6b7280',
      fontWeight: '500',
    },
    filtersSection: {
      backgroundColor: 'white',
      padding: '28px',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
      marginBottom: '30px',
    },
    filterRow: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '15px',
      marginBottom: '20px',
    },
    searchBox: {
      position: 'relative',
      gridColumn: '1 / -1',
    },
    searchInput: {
      width: '100%',
      padding: '14px 20px 14px 48px',
      border: '2px solid #e5e7eb',
      borderRadius: '10px',
      fontSize: '0.95rem',
      transition: 'border-color 0.3s ease',
    },
    searchIcon: {
      position: 'absolute',
      left: '18px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9ca3af',
    },
    select: {
      width: '100%',
      padding: '14px 16px',
      border: '2px solid #e5e7eb',
      borderRadius: '10px',
      fontSize: '0.95rem',
      backgroundColor: 'white',
      cursor: 'pointer',
    },
    filterActions: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '20px',
      paddingTop: '20px',
      borderTop: '1px solid #e5e7eb',
    },
    bulkActions: {
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
    },
    button: {
      padding: '11px 22px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.85rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.3s ease',
    },
    tableContainer: {
      backgroundColor: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
    },
    tableHeader: {
      display: 'grid',
      gridTemplateColumns: '50px 180px 220px 120px 100px 140px 100px 120px 140px',
      backgroundColor: '#f8fafc',
      padding: '18px',
      borderBottom: '2px solid #e5e7eb',
      fontWeight: '600',
      color: '#4b5563',
      fontSize: '0.85rem',
    },
    tableRow: {
      display: 'grid',
      gridTemplateColumns: '50px 180px 220px 120px 100px 140px 100px 120px 140px',
      padding: '18px',
      borderBottom: '1px solid #e5e7eb',
      alignItems: 'center',
      transition: 'background-color 0.3s ease',
    },
    checkbox: {
      width: '18px',
      height: '18px',
      cursor: 'pointer',
      accentColor: '#0a4a7a',
    },
    avatar: {
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '2px solid #e5e7eb',
    },
    statusBadge: {
      padding: '5px 10px',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: '600',
      display: 'inline-block',
      textAlign: 'center',
      minWidth: '70px',
    },
    actionCell: {
      display: 'flex',
      gap: '6px',
    },
    actionIcon: {
      width: '30px',
      height: '30px',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    sortableHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      cursor: 'pointer',
    },
    notification: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '16px 24px',
      borderRadius: '10px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      zIndex: 2000,
      backgroundColor: 'white',
      borderLeft: '5px solid',
      animation: 'slideIn 0.3s ease',
    },
    '@keyframes slideIn': {
      from: { transform: 'translateX(100%)', opacity: 0 },
      to: { transform: 'translateX(0)', opacity: 1 },
    },
  };

  // Analytics Styles
  const analyticsStyles = {
    container: {
      padding: '20px 0',
    },
    metricsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      marginBottom: '30px',
    },
    metricCard: {
      backgroundColor: 'white',
      padding: '25px',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      transition: 'transform 0.3s ease',
    },
    metricIcon: {
      width: '60px',
      height: '60px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    metricContent: {
      flex: 1,
    },
    metricValue: {
      fontSize: '2.2rem',
      fontWeight: '800',
      marginBottom: '5px',
    },
    metricLabel: {
      fontSize: '0.9rem',
      color: '#6b7280',
      fontWeight: '500',
    },
    chartsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '20px',
      marginBottom: '30px',
    },
    chartCard: {
      backgroundColor: 'white',
      padding: '25px',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
    },
    chartHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '25px',
    },
    chartTitle: {
      fontSize: '1.2rem',
      fontWeight: '700',
      color: '#1f2937',
      margin: 0,
    },
    chartContent: {
      minHeight: '250px',
    },
    distributionItem: {
      marginBottom: '20px',
    },
    distributionHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '8px',
    },
    distributionColor: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
    },
    distributionLabel: {
      flex: 1,
      fontSize: '0.9rem',
      fontWeight: '500',
      color: '#4b5563',
    },
    distributionValue: {
      fontSize: '0.9rem',
      fontWeight: '600',
      color: '#1f2937',
    },
    progressBar: {
      height: '6px',
      backgroundColor: '#e5e7eb',
      borderRadius: '3px',
      marginBottom: '6px',
      overflow: 'hidden',
    },
    percentage: {
      fontSize: '0.8rem',
      color: '#6b7280',
      textAlign: 'right',
    },
    barItem: {
      marginBottom: '20px',
    },
    barInfo: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px',
    },
    barLabel: {
      fontSize: '0.9rem',
      color: '#4b5563',
      fontWeight: '500',
      maxWidth: '70%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    barValue: {
      fontSize: '0.9rem',
      fontWeight: '600',
      color: '#1f2937',
    },
    barContainer: {
      height: '24px',
      backgroundColor: '#e5e7eb',
      borderRadius: '4px',
      overflow: 'hidden',
    },
    yearChart: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      gap: '20px',
      height: '200px',
      paddingTop: '20px',
    },
    yearBar: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
    },
    yearCount: {
      fontSize: '0.9rem',
      fontWeight: '600',
      color: '#1f2937',
    },
    yearLabel: {
      fontSize: '0.8rem',
      color: '#6b7280',
    },
    companyList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    companyItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      padding: '15px',
      backgroundColor: '#f8fafc',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
    },
    companyRank: {
      width: '32px',
      height: '32px',
      backgroundColor: '#0a4a7a',
      color: 'white',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '700',
      fontSize: '0.9rem',
    },
    companyInfo: {
      flex: 1,
    },
    companyName: {
      fontSize: '0.95rem',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '2px',
    },
    companyCount: {
      fontSize: '0.8rem',
      color: '#6b7280',
    },
    companyBadge: {
      backgroundColor: '#dcfce7',
      color: '#166534',
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: '600',
    },
    locationGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '15px',
    },
    locationItem: {
      backgroundColor: '#f8fafc',
      padding: '20px',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
    },
    locationHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '15px',
    },
    locationName: {
      fontSize: '0.95rem',
      fontWeight: '600',
      color: '#1f2937',
    },
    locationStats: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    locationCount: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#0a4a7a',
    },
    locationPercentage: {
      fontSize: '0.9rem',
      color: '#6b7280',
      fontWeight: '500',
    },
    verificationCard: {
      backgroundColor: 'white',
      padding: '25px',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
    },
    verificationContent: {
      display: 'flex',
      justifyContent: 'center',
    },
    verificationStats: {
      display: 'flex',
      gap: '40px',
      textAlign: 'center',
    },
    verificationStat: {
      padding: '20px',
      minWidth: '150px',
    },
    verificationValue: {
      fontSize: '2.5rem',
      fontWeight: '800',
      marginBottom: '5px',
    },
    verificationLabel: {
      fontSize: '0.9rem',
      color: '#6b7280',
      fontWeight: '500',
      marginBottom: '5px',
    },
    verificationPercentage: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#0a4a7a',
    },
  };

  // Loading state
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f8fafc',
      }}>
        <Loader size={40} color="#0a4a7a" className="animate-spin" />
        <span style={{ marginLeft: '15px', fontSize: '1.2rem', color: '#0a4a7a' }}>
          Loading Admin Panel...
        </span>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.titleSection}>
            <h1 style={styles.title}>Alumni Management Admin</h1>
            <p style={styles.subtitle}>Manage alumni registrations and profiles</p>
          </div>
          <div style={styles.headerActions}>
            <button
              style={{ ...styles.button, backgroundColor: '#3b82f6', color: 'white' }}
              onClick={loadAlumniData}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2563eb'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#3b82f6'}
            >
              <RefreshCw size={18} />
              Refresh
            </button>
            <button
              style={{ ...styles.button, backgroundColor: '#10b981', color: 'white' }}
              onClick={() => setShowExportOptions(true)}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#059669'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#10b981'}
            >
              <Download size={18} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Tabs */}
        <div style={styles.tabs}>
          <div
            style={{ ...styles.tab, ...(activeTab === 'registrations' && styles.activeTab) }}
            onClick={() => setActiveTab('registrations')}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = activeTab === 'registrations' ? '#f0f9ff' : 'white'}
          >
            <Users size={20} />
            Registrations ({filteredData.length})
          </div>
          <div
            style={{ ...styles.tab, ...(activeTab === 'analytics' && styles.activeTab) }}
            onClick={() => setActiveTab('analytics')}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = activeTab === 'analytics' ? '#f0f9ff' : 'white'}
          >
            <BarChart3 size={20} />
            Analytics
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'registrations' ? (
          <>
            {/* Statistics */}
            <div style={styles.statsGrid}>
              <div 
                style={styles.statCard}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ ...styles.statIcon, backgroundColor: '#dbeafe' }}>
                  <Users size={28} color="#1d4ed8" />
                </div>
                <div style={styles.statContent}>
                  <div style={{ ...styles.statNumber, color: '#1d4ed8' }}>{stats.total}</div>
                  <div style={styles.statLabel}>Total Alumni</div>
                </div>
              </div>
              <div 
                style={styles.statCard}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ ...styles.statIcon, backgroundColor: '#dcfce7' }}>
                  <CheckCircle size={28} color="#166534" />
                </div>
                <div style={styles.statContent}>
                  <div style={{ ...styles.statNumber, color: '#166534' }}>{stats.approved}</div>
                  <div style={styles.statLabel}>Approved</div>
                </div>
              </div>
              <div 
                style={styles.statCard}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ ...styles.statIcon, backgroundColor: '#fef3c7' }}>
                  <Clock size={28} color="#d97706" />
                </div>
                <div style={styles.statContent}>
                  <div style={{ ...styles.statNumber, color: '#d97706' }}>{stats.pending}</div>
                  <div style={styles.statLabel}>Pending</div>
                </div>
              </div>
              <div 
                style={styles.statCard}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ ...styles.statIcon, backgroundColor: '#fef3c7' }}>
                  <Award size={28} color="#d97706" />
                </div>
                <div style={styles.statContent}>
                  <div style={{ ...styles.statNumber, color: '#d97706' }}>{stats.verified}</div>
                  <div style={styles.statLabel}>Verified</div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div style={styles.filtersSection}>
              <div style={styles.filterRow}>
                <div style={styles.searchBox}>
                  <Search size={20} style={styles.searchIcon} />
                  <input
                    type="text"
                    placeholder="Search alumni by name, email, company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={styles.searchInput}
                    onFocus={e => e.target.style.borderColor = '#3b82f6'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
                
                <select
                  value={filters.department}
                  onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                  style={styles.select}
                >
                  <option value="">All Departments</option>
                  {departmentOptions.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  style={styles.select}
                >
                  <option value="">All Status</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
                
                <select
                  value={filters.graduationYear}
                  onChange={(e) => setFilters({ ...filters, graduationYear: e.target.value })}
                  style={styles.select}
                >
                  <option value="">All Years</option>
                  {yearOptions.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              
              <div style={styles.filterActions}>
                <div style={styles.bulkActions}>
                  <input
                    type="checkbox"
                    checked={bulkSelection.length === filteredData.length && filteredData.length > 0}
                    onChange={toggleBulkSelection}
                    style={styles.checkbox}
                  />
                  <span style={{ fontSize: '0.9rem', color: '#6b7280', marginRight: '15px' }}>
                    Select All ({bulkSelection.length} selected)
                  </span>
                  
                  {bulkSelection.length > 0 && (
                    <>
                      <button
                        style={{ ...styles.button, backgroundColor: '#10b981', color: 'white' }}
                        onClick={handleBulkApprove}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#059669'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#10b981'}
                      >
                        <CheckCircle size={16} />
                        Approve ({bulkSelection.length})
                      </button>
                      <button
                        style={{ ...styles.button, backgroundColor: '#ef4444', color: 'white' }}
                        onClick={handleBulkReject}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#dc2626'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ef4444'}
                      >
                        <XCircle size={16} />
                        Reject ({bulkSelection.length})
                      </button>
                      <button
                        style={{ ...styles.button, backgroundColor: '#6b7280', color: 'white' }}
                        onClick={handleBulkDelete}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#4b5563'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#6b7280'}
                      >
                        <Trash2 size={16} />
                        Delete ({bulkSelection.length})
                      </button>
                    </>
                  )}
                </div>
                
                <div>
                  <button
                    style={{ ...styles.button, backgroundColor: '#f3f4f6', color: '#4b5563' }}
                    onClick={resetFilters}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                  >
                    <Filter size={16} />
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div style={styles.tableContainer}>
              <div style={styles.tableHeader}>
                <div></div>
                <div style={styles.sortableHeader} onClick={() => handleSort('name')}>
                  Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                </div>
                <div>Contact</div>
                <div>Department</div>
                <div style={styles.sortableHeader} onClick={() => handleSort('graduationYear')}>
                  Batch {sortConfig.key === 'graduationYear' && (sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                </div>
                <div>Company</div>
                <div style={styles.sortableHeader} onClick={() => handleSort('status')}>
                  Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                </div>
                <div>Verified</div>
                <div>Actions</div>
              </div>
              
              {filteredData.map(alumni => (
                <div 
                  key={alumni.id} 
                  style={styles.tableRow}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
                >
                  <div>
                    <input
                      type="checkbox"
                      checked={bulkSelection.includes(alumni.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setBulkSelection([...bulkSelection, alumni.id]);
                        } else {
                          setBulkSelection(bulkSelection.filter(id => id !== alumni.id));
                        }
                      }}
                      style={styles.checkbox}
                    />
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={alumni.profileImage || `https://ui-avatars.com/api/?name=${alumni.name}&background=0a4a7a&color=fff`}
                      alt={alumni.name}
                      style={styles.avatar}
                    />
                    <div>
                      <div style={{ fontWeight: '600', marginBottom: '4px' }}>{alumni.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{alumni.jobTitle}</div>
                    </div>
                  </div>
                  
                  <div>
                    <div style={{ fontWeight: '500', marginBottom: '4px' }}>{alumni.email}</div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{alumni.mobile}</div>
                  </div>
                  
                  <div>
                    <div style={{ fontWeight: '500' }}>{getDeptAbbreviation(alumni.department)}</div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '2px' }}>
                      {alumni.department.length > 20 ? alumni.department.substring(0, 20) + '...' : alumni.department}
                    </div>
                  </div>
                  
                  <div style={{ fontWeight: '600', color: '#0a4a7a' }}>{alumni.graduationYear}</div>
                  
                  <div>
                    <div style={{ fontWeight: '500' }}>{alumni.company}</div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '2px' }}>{alumni.location}</div>
                  </div>
                  
                  <div>
                    <span style={{
                      ...styles.statusBadge,
                      backgroundColor: getStatusColor(alumni.status).bg,
                      color: getStatusColor(alumni.status).text,
                      border: `1px solid ${getStatusColor(alumni.status).border}`,
                    }}>
                      {alumni.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <div>
                    <button
                      onClick={() => handleVerify(alumni.id)}
                      style={{
                        ...styles.statusBadge,
                        backgroundColor: alumni.verified ? '#dcfce7' : '#f3f4f6',
                        color: alumni.verified ? '#166534' : '#6b7280',
                        cursor: 'pointer',
                        border: `1px solid ${alumni.verified ? '#86efac' : '#d1d5db'}`,
                        minWidth: '90px',
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >
                      {alumni.verified ? 'VERIFIED' : 'NOT VERIFIED'}
                    </button>
                  </div>
                  
                  <div style={styles.actionCell}>
                    <div
                      style={{ ...styles.actionIcon, backgroundColor: '#3b82f6', color: 'white' }}
                      onClick={() => setSelectedAlumni(alumni)}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2563eb'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#3b82f6'}
                      title="View Details"
                    >
                      <Eye size={16} />
                    </div>
                    <div
                      style={{ ...styles.actionIcon, backgroundColor: '#f59e0b', color: 'white' }}
                      onClick={() => handleEdit(alumni)}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#d97706'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f59e0b'}
                      title="Edit"
                    >
                      <Edit size={16} />
                    </div>
                    <div
                      style={{ ...styles.actionIcon, backgroundColor: '#ef4444', color: 'white' }}
                      onClick={() => setDeleteConfirm(alumni)}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#dc2626'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ef4444'}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </div>
                    {alumni.status === 'pending' && (
                      <div
                        style={{ ...styles.actionIcon, backgroundColor: '#10b981', color: 'white' }}
                        onClick={() => handleApprove(alumni.id)}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#059669'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#10b981'}
                        title="Approve"
                      >
                        <CheckCircle size={16} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {filteredData.length === 0 && (
                <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
                  <Users size={48} style={{ marginBottom: '16px', color: '#d1d5db' }} />
                  <div style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '8px' }}>
                    No alumni found
                  </div>
                  <div>Try adjusting your search or filters</div>
                </div>
              )}
            </div>
          </>
        ) : (
          <AnalyticsTab />
        )}
      </div>

      {/* Export Options Modal */}
      {showExportOptions && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px',
        }} onClick={() => setShowExportOptions(false)}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '30px',
            maxWidth: '500px',
            width: '100%',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
          }} onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '20px' }}>
              Export Data
            </h2>
            <div style={{ display: 'grid', gap: '12px' }}>
              <button
                style={{ ...styles.button, backgroundColor: '#3b82f6', color: 'white' }}
                onClick={() => { exportToCSV('all'); setShowExportOptions(false); }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2563eb'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#3b82f6'}
              >
                <Database size={18} />
                Export All Data ({filteredData.length} records)
              </button>
              <button
                style={{ ...styles.button, backgroundColor: '#10b981', color: 'white' }}
                onClick={() => { exportToCSV('approved'); setShowExportOptions(false); }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#059669'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#10b981'}
              >
                <CheckCircle size={18} />
                Export Approved Only ({stats.approved} records)
              </button>
              <button
                style={{ ...styles.button, backgroundColor: '#f59e0b', color: 'white' }}
                onClick={() => { exportToCSV('pending'); setShowExportOptions(false); }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#d97706'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f59e0b'}
              >
                <Clock size={18} />
                Export Pending Only ({stats.pending} records)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingAlumni && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px',
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
          }}>
            <div style={{ padding: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '700' }}>Edit Alumni Profile</h2>
                <button
                  onClick={handleCancelEdit}
                  style={{ background: 'none', border: 'none', fontSize: '1.5rem', color: '#9ca3af', cursor: 'pointer' }}
                >
                  ×
                </button>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Full Name</label>
                  <input
                    type="text"
                    value={editFormData.name || ''}
                    onChange={e => setEditFormData({ ...editFormData, name: e.target.value })}
                    style={{ ...styles.select, padding: '10px', fontSize: '0.9rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email</label>
                  <input
                    type="email"
                    value={editFormData.email || ''}
                    onChange={e => setEditFormData({ ...editFormData, email: e.target.value })}
                    style={{ ...styles.select, padding: '10px', fontSize: '0.9rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Phone Number</label>
                  <input
                    type="tel"
                    value={editFormData.mobile || ''}
                    onChange={e => setEditFormData({ ...editFormData, mobile: e.target.value })}
                    style={{ ...styles.select, padding: '10px', fontSize: '0.9rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Department</label>
                  <select
                    value={editFormData.department || ''}
                    onChange={e => setEditFormData({ ...editFormData, department: e.target.value })}
                    style={{ ...styles.select, padding: '10px', fontSize: '0.9rem' }}
                  >
                    <option value="">Select Department</option>
                    {departmentOptions.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Graduation Year</label>
                  <input
                    type="number"
                    value={editFormData.graduationYear || ''}
                    onChange={e => setEditFormData({ ...editFormData, graduationYear: parseInt(e.target.value) })}
                    style={{ ...styles.select, padding: '10px', fontSize: '0.9rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Job Title</label>
                  <input
                    type="text"
                    value={editFormData.jobTitle || ''}
                    onChange={e => setEditFormData({ ...editFormData, jobTitle: e.target.value })}
                    style={{ ...styles.select, padding: '10px', fontSize: '0.9rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Company</label>
                  <input
                    type="text"
                    value={editFormData.company || ''}
                    onChange={e => setEditFormData({ ...editFormData, company: e.target.value })}
                    style={{ ...styles.select, padding: '10px', fontSize: '0.9rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Location</label>
                  <input
                    type="text"
                    value={editFormData.location || ''}
                    onChange={e => setEditFormData({ ...editFormData, location: e.target.value })}
                    style={{ ...styles.select, padding: '10px', fontSize: '0.9rem' }}
                  />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Bio</label>
                  <textarea
                    value={editFormData.bio || ''}
                    onChange={e => setEditFormData({ ...editFormData, bio: e.target.value })}
                    style={{ ...styles.select, padding: '10px', fontSize: '0.9rem', minHeight: '100px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Status</label>
                  <select
                    value={editFormData.status || ''}
                    onChange={e => setEditFormData({ ...editFormData, status: e.target.value })}
                    style={{ ...styles.select, padding: '10px', fontSize: '0.9rem' }}
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Verification Status</label>
                  <select
                    value={editFormData.verified || false}
                    onChange={e => setEditFormData({ ...editFormData, verified: e.target.value === 'true' })}
                    style={{ ...styles.select, padding: '10px', fontSize: '0.9rem' }}
                  >
                    <option value="true">Verified</option>
                    <option value="false">Not Verified</option>
                  </select>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                <button
                  onClick={handleCancelEdit}
                  style={{ ...styles.button, backgroundColor: '#6b7280', color: 'white' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#4b5563'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#6b7280'}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  style={{ ...styles.button, backgroundColor: '#10b981', color: 'white' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#059669'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#10b981'}
                >
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px',
        }} onClick={() => setDeleteConfirm(null)}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '40px',
            maxWidth: '500px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
          }} onClick={e => e.stopPropagation()}>
            <Trash2 size={60} color="#ef4444" style={{ marginBottom: '20px' }} />
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '15px' }}>
              Delete Confirmation
            </h2>
            <p style={{ color: '#6b7280', lineHeight: 1.6, marginBottom: '30px' }}>
              Are you sure you want to delete <strong>{deleteConfirm.name}</strong>'s profile?
              This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button
                onClick={() => setDeleteConfirm(null)}
                style={{ ...styles.button, backgroundColor: '#6b7280', color: 'white' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#4b5563'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#6b7280'}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm.id)}
                style={{ ...styles.button, backgroundColor: '#ef4444', color: 'white' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#dc2626'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ef4444'}
              >
                <Trash2 size={16} />
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '16px 24px',
          borderRadius: '10px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 2000,
          backgroundColor: 'white',
          borderLeft: '5px solid',
          borderLeftColor: notification.type === 'success' ? '#10b981' : '#ef4444',
          animation: 'slideIn 0.3s ease',
        }}>
          {notification.type === 'success' ? (
            <CheckCircle size={24} color="#10b981" />
          ) : (
            <AlertCircle size={24} color="#ef4444" />
          )}
          <span style={{ fontWeight: '500' }}>{notification.message}</span>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;