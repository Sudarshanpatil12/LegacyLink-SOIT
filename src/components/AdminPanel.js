import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  BarChart3,
  CheckCircle,
  Clock3,
  Download,
  Edit3,
  Eye,
  Filter,
  Loader2,
  RefreshCw,
  Save,
  Search,
  ShieldCheck,
  Trash2,
  Users,
  X,
  XCircle
} from 'lucide-react';
import apiService from '../services/api';

const emptyFilters = {
  department: '',
  status: '',
  graduationYear: ''
};

const editableFields = [
  'name',
  'email',
  'mobile',
  'department',
  'graduationYear',
  'jobTitle',
  'company',
  'location',
  'bio',
  'linkedinUrl',
  'status',
  'isVerified',
  'enrollmentNumber',
  'skills',
  'achievements',
  'experience'
];

const normalizeList = (value) => {
  if (Array.isArray(value)) {
    return value.filter(Boolean).join('\n');
  }
  return value || '';
};

const parseList = (value) => value
  .split('\n')
  .map((item) => item.trim())
  .filter(Boolean);

const getInitials = (name = '') => name
  .split(' ')
  .filter(Boolean)
  .slice(0, 2)
  .map((part) => part[0]?.toUpperCase() || '')
  .join('') || 'A';

const normalizeAlumni = (alumni) => ({
  ...alumni,
  id: alumni._id || alumni.id,
  registrationDate: alumni.registrationDate || alumni.createdAt || new Date().toISOString(),
  name: alumni.name || 'Unnamed Alumni',
  email: alumni.email || '',
  mobile: alumni.mobile || '',
  department: alumni.department || 'Not provided',
  graduationYear: alumni.graduationYear || '',
  jobTitle: alumni.jobTitle || 'Not provided',
  company: alumni.company || 'Not provided',
  location: alumni.location || 'Not provided',
  bio: alumni.bio || '',
  profileImage: alumni.profileImage || '',
  enrollmentNumber: alumni.enrollmentNumber || '',
  linkedinUrl: alumni.linkedinUrl || '',
  skills: Array.isArray(alumni.skills) ? alumni.skills : [],
  achievements: Array.isArray(alumni.achievements) ? alumni.achievements : [],
  experience: Array.isArray(alumni.experience) ? alumni.experience : [],
  pendingUpdates: alumni.pendingUpdates || null,
  pendingUpdateStatus: alumni.pendingUpdateStatus || 'none',
  isVerified: Boolean(alumni.isVerified)
});

const AdminPanel = () => {
  const [alumniData, setAlumniData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState(emptyFilters);
  const [activeTab, setActiveTab] = useState('registrations');
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [editingAlumni, setEditingAlumni] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loadError, setLoadError] = useState('');
  const notificationTimeoutRef = useRef(null);

  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type });
    clearTimeout(notificationTimeoutRef.current);
    notificationTimeoutRef.current = setTimeout(() => {
      setNotification(null);
    }, 4000);
  }, []);

  const loadAlumniData = useCallback(async ({ silent = false } = {}) => {
    if (silent) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      const response = await apiService.getAdminAlumni({ page: 1, limit: 500, sortBy: 'createdAt', sortOrder: 'desc' });
      const nextData = Array.isArray(response.data) ? response.data.map(normalizeAlumni) : [];
      setAlumniData(nextData);
      setLoadError('');
    } catch (error) {
      console.error('Failed to load alumni data:', error);
      setLoadError(error.message || 'Failed to load alumni data.');
      setAlumniData([]);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadAlumniData();
  }, [loadAlumniData]);

  useEffect(() => () => {
    clearTimeout(notificationTimeoutRef.current);
  }, []);

  const departmentOptions = useMemo(() => (
    [...new Set(alumniData.map((item) => item.department).filter(Boolean))].sort()
  ), [alumniData]);

  const yearOptions = useMemo(() => (
    [...new Set(alumniData.map((item) => item.graduationYear).filter(Boolean))].sort((a, b) => b - a)
  ), [alumniData]);

  const stats = useMemo(() => ({
    total: alumniData.length,
    pending: alumniData.filter((item) => item.status === 'pending').length,
    approved: alumniData.filter((item) => item.status === 'approved').length,
    rejected: alumniData.filter((item) => item.status === 'rejected').length,
    updatesPending: alumniData.filter((item) => item.pendingUpdateStatus === 'pending').length,
    verified: alumniData.filter((item) => item.isVerified).length
  }), [alumniData]);

  const filteredData = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return alumniData.filter((item) => {
      if (filters.department && item.department !== filters.department) {
        return false;
      }
      if (filters.status && item.status !== filters.status) {
        return false;
      }
      if (filters.graduationYear && String(item.graduationYear) !== String(filters.graduationYear)) {
        return false;
      }
      if (!term) {
        return true;
      }

      return [
        item.name,
        item.email,
        item.mobile,
        item.company,
        item.jobTitle,
        item.department,
        item.location,
        item.enrollmentNumber
      ].some((value) => String(value || '').toLowerCase().includes(term));
    });
  }, [alumniData, filters, searchTerm]);

  const analytics = useMemo(() => {
    const byDepartment = {};
    const byCompany = {};

    alumniData.forEach((item) => {
      byDepartment[item.department] = (byDepartment[item.department] || 0) + 1;
      byCompany[item.company] = (byCompany[item.company] || 0) + 1;
    });

    return {
      topDepartments: Object.entries(byDepartment).sort((a, b) => b[1] - a[1]).slice(0, 6),
      topCompanies: Object.entries(byCompany).sort((a, b) => b[1] - a[1]).slice(0, 6)
    };
  }, [alumniData]);

  const fetchAlumniRecord = useCallback(async (id) => {
    const response = await apiService.getAdminAlumniById(id);
    return normalizeAlumni(response.data);
  }, []);

  const openDetails = async (alumni) => {
    try {
      const record = await fetchAlumniRecord(alumni.id);
      setSelectedAlumni(record);
      setAlumniData((current) => current.map((item) => (item.id === record.id ? record : item)));
    } catch (error) {
      showNotification(error.message || 'Failed to load alumni details.', 'error');
    }
  };

  const startEditing = async (alumni) => {
    try {
      const record = await fetchAlumniRecord(alumni.id);
      setEditingAlumni(record);
      setSelectedAlumni((current) => (current && current.id === record.id ? record : current));
      setAlumniData((current) => current.map((item) => (item.id === record.id ? record : item)));
      setEditFormData({
        name: record.name,
        email: record.email,
        mobile: record.mobile,
        department: record.department,
        graduationYear: record.graduationYear,
        jobTitle: record.jobTitle,
        company: record.company,
        location: record.location,
        bio: record.bio,
        linkedinUrl: record.linkedinUrl,
        status: record.status,
        isVerified: record.isVerified,
        enrollmentNumber: record.enrollmentNumber,
        skills: normalizeList(record.skills),
        achievements: normalizeList(record.achievements),
        experience: normalizeList(record.experience)
      });
    } catch (error) {
      showNotification(error.message || 'Failed to load alumni details for editing.', 'error');
    }
  };

  const openEditorFromDetails = async () => {
    if (!selectedAlumni) {
      return;
    }

    await startEditing(selectedAlumni);
  };

  const syncUpdatedAlumni = (updated) => {
    setAlumniData((current) => current.map((item) => (item.id === updated.id ? updated : item)));
    setSelectedAlumni((current) => (current && current.id === updated.id ? updated : current));
    setEditingAlumni((current) => (current && current.id === updated.id ? updated : current));
  };

  const closeEditing = () => {
    setEditingAlumni(null);
    setEditFormData({});
  };

  const handleSaveEdit = async () => {
    if (!editingAlumni) {
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        ...editFormData,
        graduationYear: editFormData.graduationYear ? Number(editFormData.graduationYear) : undefined,
        skills: parseList(editFormData.skills || ''),
        achievements: parseList(editFormData.achievements || ''),
        experience: parseList(editFormData.experience || '')
      };

      Object.keys(payload).forEach((key) => {
        if (!editableFields.includes(key)) {
          delete payload[key];
        }
      });

      const response = await apiService.updateAdminAlumni(editingAlumni.id, payload);
      const updated = normalizeAlumni(response.data);

      syncUpdatedAlumni(updated);
      showNotification('Alumni profile updated successfully.', 'success');
      closeEditing();
    } catch (error) {
      showNotification(error.message || 'Failed to update alumni profile.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const response = await apiService.updateAlumniStatus(id, status);
      const updated = normalizeAlumni(response.data);
      syncUpdatedAlumni(updated);
      const emailMessage = response?.email?.sent ? ' Approval email sent.' : '';
      showNotification(`Alumni ${status}.${emailMessage}`.trim(), status === 'approved' ? 'success' : 'error');
    } catch (error) {
      showNotification(error.message || 'Failed to update alumni status.', 'error');
    }
  };

  const handlePendingUpdateAction = async (id, action) => {
    try {
      const response = action === 'approve'
        ? await apiService.approvePendingAlumniUpdates(id)
        : await apiService.rejectPendingAlumniUpdates(id);
      const updated = normalizeAlumni(response.data);
      syncUpdatedAlumni(updated);
      showNotification(
        action === 'approve' ? 'Pending profile changes approved.' : 'Pending profile changes rejected.',
        action === 'approve' ? 'success' : 'error'
      );
    } catch (error) {
      showNotification(error.message || 'Failed to process profile update.', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) {
      return;
    }

    try {
      await apiService.deleteAlumni(deleteConfirm.id);
      setAlumniData((current) => current.filter((item) => item.id !== deleteConfirm.id));
      setSelectedAlumni((current) => (current && current.id === deleteConfirm.id ? null : current));
      setDeleteConfirm(null);
      showNotification('Alumni deleted successfully.', 'success');
    } catch (error) {
      showNotification(error.message || 'Failed to delete alumni.', 'error');
    }
  };

  const exportCsv = () => {
    if (!filteredData.length) {
      showNotification('No alumni data available to export.', 'error');
      return;
    }

    const headers = ['Name', 'Email', 'Phone', 'Enrollment', 'Department', 'Batch', 'Role', 'Company', 'Location', 'Status'];
    const rows = filteredData.map((item) => ([
      item.name,
      item.email,
      item.mobile,
      item.enrollmentNumber,
      item.department,
      item.graduationYear,
      item.jobTitle,
      item.company,
      item.location,
      item.status
    ]));

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell || '').replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `alumni-admin-export-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const renderStatusPill = (status) => {
    const className = {
      approved: 'admin-pill admin-pill-approved',
      pending: 'admin-pill admin-pill-pending',
      rejected: 'admin-pill admin-pill-rejected'
    }[status] || 'admin-pill';

    return <span className={className}>{status}</span>;
  };

  const css = `
    .admin-shell {
      min-height: 100vh;
      background:
        radial-gradient(circle at top left, rgba(14, 116, 144, 0.14), transparent 28%),
        linear-gradient(180deg, #f4f8fb 0%, #eef3f8 100%);
      color: #102033;
      font-family: 'Inter', 'Segoe UI', sans-serif;
    }
    .admin-wrap {
      max-width: 1380px;
      margin: 0 auto;
      padding: 32px 20px 56px;
    }
    .admin-hero {
      display: flex;
      justify-content: space-between;
      gap: 20px;
      align-items: flex-start;
      margin-bottom: 24px;
      padding: 28px;
      border-radius: 24px;
      background: linear-gradient(135deg, #0b3b60, #125a86 55%, #0f766e);
      color: white;
      box-shadow: 0 24px 50px rgba(11, 59, 96, 0.24);
    }
    .admin-hero h1 {
      margin: 0 0 10px;
      font-size: clamp(2rem, 3vw, 2.8rem);
      line-height: 1.1;
    }
    .admin-hero p {
      margin: 0;
      color: rgba(255, 255, 255, 0.82);
      max-width: 720px;
      line-height: 1.6;
    }
    .admin-hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
    .admin-card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }
    .admin-stat-card,
    .admin-panel,
    .admin-table-wrap,
    .admin-analytics-card,
    .admin-modal-card {
      background: rgba(255, 255, 255, 0.92);
      border: 1px solid rgba(148, 163, 184, 0.2);
      box-shadow: 0 16px 35px rgba(15, 23, 42, 0.08);
      backdrop-filter: blur(10px);
    }
    .admin-stat-card {
      border-radius: 20px;
      padding: 20px;
      display: flex;
      gap: 14px;
      align-items: center;
    }
    .admin-stat-icon {
      width: 52px;
      height: 52px;
      border-radius: 16px;
      display: grid;
      place-items: center;
      flex-shrink: 0;
    }
    .admin-stat-card strong {
      display: block;
      font-size: 1.9rem;
      line-height: 1;
      margin-bottom: 6px;
    }
    .admin-stat-card span {
      color: #526173;
      font-size: 0.92rem;
    }
    .admin-tabs {
      display: inline-flex;
      gap: 10px;
      padding: 8px;
      border-radius: 16px;
      background: rgba(255,255,255,0.8);
      margin-bottom: 24px;
      border: 1px solid rgba(148, 163, 184, 0.2);
    }
    .admin-tab {
      border: none;
      border-radius: 12px;
      padding: 12px 18px;
      background: transparent;
      color: #3d4e61;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
      cursor: pointer;
    }
    .admin-tab.active {
      background: #0b3b60;
      color: white;
      box-shadow: 0 10px 20px rgba(11, 59, 96, 0.2);
    }
    .admin-panel {
      border-radius: 22px;
      padding: 22px;
      margin-bottom: 20px;
    }
    .admin-toolbar {
      display: grid;
      grid-template-columns: minmax(260px, 1.6fr) repeat(3, minmax(150px, 1fr));
      gap: 14px;
      align-items: center;
    }
    .admin-field,
    .admin-search {
      position: relative;
    }
    .admin-input,
    .admin-select,
    .admin-textarea {
      width: 100%;
      border: 1px solid #d7e0e8;
      border-radius: 14px;
      background: #f8fbfd;
      color: #102033;
      padding: 14px 16px;
      font-size: 0.95rem;
      outline: none;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }
    .admin-input:focus,
    .admin-select:focus,
    .admin-textarea:focus {
      border-color: #0f766e;
      box-shadow: 0 0 0 4px rgba(15, 118, 110, 0.12);
      background: white;
    }
    .admin-search .admin-input {
      padding-left: 46px;
    }
    .admin-search svg {
      position: absolute;
      top: 50%;
      left: 16px;
      transform: translateY(-50%);
      color: #648099;
    }
    .admin-toolbar-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      margin-top: 18px;
      flex-wrap: wrap;
    }
    .admin-button {
      border: none;
      border-radius: 14px;
      padding: 12px 16px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: transform 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease;
    }
    .admin-button:hover {
      transform: translateY(-1px);
      box-shadow: 0 12px 20px rgba(15, 23, 42, 0.12);
    }
    .admin-button:disabled {
      cursor: not-allowed;
      opacity: 0.65;
      transform: none;
      box-shadow: none;
    }
    .admin-button-primary { background: #0b3b60; color: white; }
    .admin-button-secondary { background: white; color: #102033; border: 1px solid #d7e0e8; }
    .admin-button-success { background: #15803d; color: white; }
    .admin-button-warning { background: #b45309; color: white; }
    .admin-button-danger { background: #b91c1c; color: white; }
    .admin-button-muted { background: #e8eef4; color: #244257; }
    .admin-segmented {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    .admin-segmented button {
      border: 1px solid #d7e0e8;
      background: white;
      color: #244257;
      padding: 10px 14px;
      border-radius: 999px;
      font-weight: 600;
      cursor: pointer;
    }
    .admin-segmented button.active {
      background: #0b3b60;
      color: white;
      border-color: #0b3b60;
    }
    .admin-table-wrap {
      overflow: hidden;
      border-radius: 22px;
    }
    .admin-table-scroll {
      overflow: auto;
    }
    .admin-table {
      width: 100%;
      border-collapse: collapse;
      min-width: 1050px;
    }
    .admin-table th,
    .admin-table td {
      padding: 18px 16px;
      text-align: left;
      border-bottom: 1px solid #e6edf3;
      vertical-align: top;
    }
    .admin-table th {
      background: #f6fafc;
      color: #506173;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .admin-table tr:hover td {
      background: rgba(248, 251, 253, 0.88);
    }
    .admin-person {
      display: flex;
      gap: 12px;
      align-items: flex-start;
    }
    .admin-avatar {
      width: 46px;
      height: 46px;
      border-radius: 14px;
      background: linear-gradient(135deg, #0b3b60, #0f766e);
      color: white;
      display: grid;
      place-items: center;
      font-weight: 700;
      flex-shrink: 0;
      overflow: hidden;
    }
    .admin-avatar img,
    .admin-photo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .admin-muted {
      color: #66788b;
      font-size: 0.88rem;
      line-height: 1.5;
    }
    .admin-pill {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 7px 10px;
      border-radius: 999px;
      font-size: 0.78rem;
      font-weight: 700;
      text-transform: capitalize;
      background: #e8eef4;
      color: #244257;
    }
    .admin-pill-approved { background: #dcfce7; color: #166534; }
    .admin-pill-pending { background: #fef3c7; color: #a16207; }
    .admin-pill-rejected { background: #fee2e2; color: #b91c1c; }
    .admin-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .admin-icon-btn {
      width: 38px;
      height: 38px;
      border-radius: 12px;
      border: none;
      display: grid;
      place-items: center;
      cursor: pointer;
      color: white;
    }
    .admin-empty,
    .admin-error {
      padding: 28px;
      text-align: center;
      border-radius: 20px;
      margin-top: 18px;
    }
    .admin-error {
      background: #fff1f2;
      color: #b91c1c;
      border: 1px solid #fecdd3;
    }
    .admin-empty {
      background: rgba(255,255,255,0.82);
      border: 1px dashed #cbd5e1;
      color: #526173;
    }
    .admin-analytics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }
    .admin-analytics-card {
      border-radius: 22px;
      padding: 22px;
    }
    .admin-analytics-card h3 {
      margin: 0 0 18px;
      font-size: 1.08rem;
    }
    .admin-list {
      display: grid;
      gap: 12px;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .admin-list li {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      padding: 12px 14px;
      border-radius: 14px;
      background: #f8fbfd;
      border: 1px solid #e6edf3;
    }
    .admin-modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(9, 16, 28, 0.66);
      backdrop-filter: blur(6px);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      z-index: 1000;
    }
    .admin-modal-card {
      width: min(980px, 100%);
      max-height: 90vh;
      overflow: auto;
      border-radius: 24px;
      padding: 26px;
    }
    .admin-modal-header {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: flex-start;
      margin-bottom: 22px;
    }
    .admin-modal-close {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      border: 1px solid #d7e0e8;
      background: white;
      cursor: pointer;
      display: grid;
      place-items: center;
    }
    .admin-profile-grid,
    .admin-form-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
    }
    .admin-info-card {
      padding: 18px;
      border-radius: 18px;
      background: #f8fbfd;
      border: 1px solid #e6edf3;
    }
    .admin-info-card h4 {
      margin: 0 0 8px;
      font-size: 0.84rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #5d7286;
    }
    .admin-info-card p {
      margin: 0;
      line-height: 1.6;
      color: #102033;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .admin-badge-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 12px;
    }
    .admin-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 10px;
    }
    .admin-chip {
      padding: 7px 10px;
      border-radius: 999px;
      background: #e6f4f1;
      color: #0f766e;
      font-size: 0.84rem;
      font-weight: 600;
    }
    .admin-label {
      display: block;
      margin-bottom: 8px;
      font-size: 0.84rem;
      font-weight: 700;
      color: #42556a;
    }
    .admin-textarea {
      min-height: 110px;
      resize: vertical;
    }
    .admin-notification {
      position: fixed;
      right: 20px;
      top: 20px;
      z-index: 1100;
      padding: 14px 18px;
      border-radius: 16px;
      color: white;
      box-shadow: 0 16px 35px rgba(15, 23, 42, 0.22);
      max-width: 360px;
    }
    .admin-notification.success { background: #15803d; }
    .admin-notification.error { background: #b91c1c; }
    .admin-photo {
      width: 124px;
      height: 124px;
      border-radius: 28px;
      overflow: hidden;
      background: linear-gradient(135deg, #0b3b60, #0f766e);
      color: white;
      display: grid;
      place-items: center;
      font-size: 2rem;
      font-weight: 800;
      box-shadow: 0 16px 30px rgba(11, 59, 96, 0.22);
      flex-shrink: 0;
    }
    .admin-modal-identity {
      display: flex;
      align-items: center;
      gap: 18px;
    }
    @media (max-width: 900px) {
      .admin-hero,
      .admin-modal-header,
      .admin-toolbar,
      .admin-profile-grid,
      .admin-form-grid {
        grid-template-columns: 1fr;
        display: grid;
      }
      .admin-hero-actions,
      .admin-toolbar-footer {
        width: 100%;
      }
      .admin-modal-identity {
        align-items: flex-start;
      }
    }
    @media (max-width: 640px) {
      .admin-wrap {
        padding-inline: 14px;
      }
      .admin-hero,
      .admin-panel,
      .admin-modal-card {
        padding: 18px;
      }
      .admin-card-grid {
        grid-template-columns: 1fr 1fr;
      }
    }
  `;

  if (isLoading) {
    return (
      <div className="admin-shell">
        <style>{css}</style>
        <div className="admin-wrap" style={{ display: 'grid', placeItems: 'center', minHeight: '70vh' }}>
          <div className="admin-panel" style={{ textAlign: 'center', padding: 32 }}>
            <Loader2 size={34} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
            <p style={{ margin: '14px 0 0', fontSize: '1rem', color: '#526173' }}>Loading admin portal data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <style>{`${css} @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

      {notification && (
        <div className={`admin-notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="admin-wrap">
        <section className="admin-hero">
          <div>
            <h1>Admin Portal</h1>
            <p>
              Review registrations, approve profile changes, inspect complete alumni records,
              and keep the alumni network accurate from one place.
            </p>
          </div>
          <div className="admin-hero-actions">
            <button className="admin-button admin-button-secondary" onClick={() => loadAlumniData({ silent: true })}>
              <RefreshCw size={18} className={isRefreshing ? 'spin' : ''} style={isRefreshing ? { animation: 'spin 1s linear infinite' } : undefined} />
              Refresh
            </button>
            <button className="admin-button admin-button-secondary" onClick={exportCsv}>
              <Download size={18} />
              Export CSV
            </button>
          </div>
        </section>

        <section className="admin-card-grid">
          <div className="admin-stat-card">
            <div className="admin-stat-icon" style={{ background: '#dbeafe', color: '#1d4ed8' }}><Users size={24} /></div>
            <div><strong>{stats.total}</strong><span>Total alumni records</span></div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-icon" style={{ background: '#dcfce7', color: '#166534' }}><CheckCircle size={24} /></div>
            <div><strong>{stats.approved}</strong><span>Approved members</span></div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-icon" style={{ background: '#fef3c7', color: '#a16207' }}><Clock3 size={24} /></div>
            <div><strong>{stats.pending}</strong><span>Pending approvals</span></div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-icon" style={{ background: '#e0f2fe', color: '#0369a1' }}><Edit3 size={24} /></div>
            <div><strong>{stats.updatesPending}</strong><span>Pending profile updates</span></div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-icon" style={{ background: '#ede9fe', color: '#6d28d9' }}><ShieldCheck size={24} /></div>
            <div><strong>{stats.verified}</strong><span>Verified alumni</span></div>
          </div>
        </section>

        <div className="admin-tabs">
          <button className={`admin-tab ${activeTab === 'registrations' ? 'active' : ''}`} onClick={() => setActiveTab('registrations')}>
            <Users size={18} />
            Registrations
          </button>
          <button className={`admin-tab ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>
            <BarChart3 size={18} />
            Analytics
          </button>
        </div>

        {activeTab === 'registrations' ? (
          <>
            <section className="admin-panel">
              <div className="admin-toolbar">
                <div className="admin-search">
                  <Search size={18} />
                  <input
                    className="admin-input"
                    type="text"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search by name, email, company, enrollment number, or location"
                  />
                </div>
                <div className="admin-field">
                  <select
                    className="admin-select"
                    value={filters.department}
                    onChange={(event) => setFilters((current) => ({ ...current, department: event.target.value }))}
                  >
                    <option value="">All departments</option>
                    {departmentOptions.map((department) => (
                      <option key={department} value={department}>{department}</option>
                    ))}
                  </select>
                </div>
                <div className="admin-field">
                  <select
                    className="admin-select"
                    value={filters.status}
                    onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value }))}
                  >
                    <option value="">All statuses</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div className="admin-field">
                  <select
                    className="admin-select"
                    value={filters.graduationYear}
                    onChange={(event) => setFilters((current) => ({ ...current, graduationYear: event.target.value }))}
                  >
                    <option value="">All batch years</option>
                    {yearOptions.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="admin-toolbar-footer">
                <div style={{ display: 'grid', gap: 12 }}>
                  <div className="admin-muted">
                    Showing <strong>{filteredData.length}</strong> of <strong>{alumniData.length}</strong> alumni records
                  </div>
                  <div className="admin-segmented">
                    <button className={!filters.status ? 'active' : ''} onClick={() => setFilters((current) => ({ ...current, status: '' }))}>
                      All Alumni
                    </button>
                    <button className={filters.status === 'approved' ? 'active' : ''} onClick={() => setFilters((current) => ({ ...current, status: 'approved' }))}>
                      Approved Members ({stats.approved})
                    </button>
                    <button className={filters.status === 'pending' ? 'active' : ''} onClick={() => setFilters((current) => ({ ...current, status: 'pending' }))}>
                      Pending ({stats.pending})
                    </button>
                    <button className={filters.status === 'rejected' ? 'active' : ''} onClick={() => setFilters((current) => ({ ...current, status: 'rejected' }))}>
                      Rejected ({stats.rejected})
                    </button>
                  </div>
                </div>
                <button className="admin-button admin-button-muted" onClick={() => { setSearchTerm(''); setFilters(emptyFilters); }}>
                  <Filter size={16} />
                  Reset filters
                </button>
              </div>
            </section>

            {loadError && (
              <div className="admin-error">
                <AlertCircle size={18} style={{ verticalAlign: 'text-bottom', marginRight: 8 }} />
                {loadError}
              </div>
            )}

            <section className="admin-table-wrap">
              <div className="admin-table-scroll">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Alumni</th>
                      <th>Contact</th>
                      <th>Academics</th>
                      <th>Professional</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((alumni) => (
                      <tr key={alumni.id}>
                        <td>
                          <div className="admin-person">
                            <div className="admin-avatar">
                              {alumni.profileImage ? (
                                <img src={alumni.profileImage} alt={alumni.name} />
                              ) : (
                                getInitials(alumni.name)
                              )}
                            </div>
                            <div>
                              <div style={{ fontWeight: 700, marginBottom: 4 }}>{alumni.name}</div>
                              <div className="admin-muted">{alumni.jobTitle}</div>
                              <div className="admin-muted">Joined: {new Date(alumni.registrationDate).toLocaleDateString()}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{alumni.email}</div>
                          <div className="admin-muted">{alumni.mobile || 'Phone not provided'}</div>
                          <div className="admin-muted">Enrollment: {alumni.enrollmentNumber || 'Not set'}</div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{alumni.department}</div>
                          <div className="admin-muted">Batch {alumni.graduationYear || 'Not set'}</div>
                          <div className="admin-muted">Verified: {alumni.isVerified ? 'Yes' : 'No'}</div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{alumni.company}</div>
                          <div className="admin-muted">{alumni.jobTitle}</div>
                          <div className="admin-muted">{alumni.location}</div>
                        </td>
                        <td>
                          {renderStatusPill(alumni.status)}
                          {alumni.pendingUpdateStatus === 'pending' && (
                            <div className="admin-badge-row">
                              <span className="admin-pill" style={{ background: '#dbeafe', color: '#1d4ed8' }}>Profile update pending</span>
                            </div>
                          )}
                        </td>
                        <td>
                          <div className="admin-actions">
                            <button className="admin-icon-btn" style={{ background: '#2563eb' }} onClick={() => openDetails(alumni)} title="View details">
                              <Eye size={16} />
                            </button>
                            <button className="admin-icon-btn" style={{ background: '#d97706' }} onClick={() => startEditing(alumni)} title="Edit alumni">
                              <Edit3 size={16} />
                            </button>
                            {alumni.status === 'pending' && (
                              <button className="admin-icon-btn" style={{ background: '#15803d' }} onClick={() => handleStatusUpdate(alumni.id, 'approved')} title="Approve alumni">
                                <CheckCircle size={16} />
                              </button>
                            )}
                            {alumni.status === 'pending' && (
                              <button className="admin-icon-btn" style={{ background: '#b91c1c' }} onClick={() => handleStatusUpdate(alumni.id, 'rejected')} title="Reject alumni">
                                <XCircle size={16} />
                              </button>
                            )}
                            {alumni.pendingUpdateStatus === 'pending' && (
                              <button className="admin-icon-btn" style={{ background: '#0f766e' }} onClick={() => handlePendingUpdateAction(alumni.id, 'approve')} title="Approve profile update">
                                <Save size={16} />
                              </button>
                            )}
                            {alumni.pendingUpdateStatus === 'pending' && (
                              <button className="admin-icon-btn" style={{ background: '#7c2d12' }} onClick={() => handlePendingUpdateAction(alumni.id, 'reject')} title="Reject profile update">
                                <X size={16} />
                              </button>
                            )}
                            <button className="admin-icon-btn" style={{ background: '#475569' }} onClick={() => setDeleteConfirm(alumni)} title="Delete alumni">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {!filteredData.length && (
                <div className="admin-empty">
                  <Users size={28} style={{ marginBottom: 12 }} />
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>No alumni records match the current filters.</div>
                  <div>Try clearing the filters or refreshing the admin panel.</div>
                </div>
              )}
            </section>
          </>
        ) : (
          <section className="admin-analytics-grid">
            <div className="admin-analytics-card">
              <h3>Department distribution</h3>
              <ul className="admin-list">
                {analytics.topDepartments.map(([department, count]) => (
                  <li key={department}>
                    <span>{department}</span>
                    <strong>{count}</strong>
                  </li>
                ))}
              </ul>
            </div>
            <div className="admin-analytics-card">
              <h3>Top companies</h3>
              <ul className="admin-list">
                {analytics.topCompanies.map(([company, count]) => (
                  <li key={company}>
                    <span>{company}</span>
                    <strong>{count}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </div>

      {selectedAlumni && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedAlumni(null)}>
          <div className="admin-modal-card" onClick={(event) => event.stopPropagation()}>
            <div className="admin-modal-header">
              <div className="admin-modal-identity">
                <div className="admin-photo">
                  {selectedAlumni.profileImage ? (
                    <img src={selectedAlumni.profileImage} alt={selectedAlumni.name} />
                  ) : (
                    getInitials(selectedAlumni.name)
                  )}
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.6rem' }}>{selectedAlumni.name}</h2>
                  <div className="admin-badge-row">
                    {renderStatusPill(selectedAlumni.status)}
                    <span className="admin-pill" style={{ background: selectedAlumni.isVerified ? '#dcfce7' : '#e2e8f0', color: selectedAlumni.isVerified ? '#166534' : '#475569' }}>
                      {selectedAlumni.isVerified ? 'Verified' : 'Not verified'}
                    </span>
                    {selectedAlumni.pendingUpdateStatus === 'pending' && (
                      <span className="admin-pill" style={{ background: '#dbeafe', color: '#1d4ed8' }}>Pending profile update</span>
                    )}
                  </div>
                </div>
              </div>
              <button className="admin-modal-close" onClick={() => setSelectedAlumni(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="admin-profile-grid">
              <div className="admin-info-card">
                <h4>Basic details</h4>
                <p><strong>Name:</strong> {selectedAlumni.name}</p>
                <p><strong>Enrollment number:</strong> {selectedAlumni.enrollmentNumber || 'Not provided'}</p>
                <p><strong>Department:</strong> {selectedAlumni.department}</p>
                <p><strong>Batch:</strong> {selectedAlumni.graduationYear || 'Not provided'}</p>
              </div>
              <div className="admin-info-card">
                <h4>Contact</h4>
                <p><strong>Email:</strong> {selectedAlumni.email || 'Not provided'}</p>
                <p><strong>Phone:</strong> {selectedAlumni.mobile || 'Not provided'}</p>
                <p><strong>LinkedIn:</strong> {selectedAlumni.linkedinUrl || 'Not provided'}</p>
                <p><strong>Location:</strong> {selectedAlumni.location}</p>
              </div>
              <div className="admin-info-card">
                <h4>Professional profile</h4>
                <p><strong>Role:</strong> {selectedAlumni.jobTitle}</p>
                <p><strong>Company:</strong> {selectedAlumni.company}</p>
                <p><strong>Registered:</strong> {new Date(selectedAlumni.registrationDate).toLocaleString()}</p>
                <p><strong>Last login:</strong> {selectedAlumni.lastLogin ? new Date(selectedAlumni.lastLogin).toLocaleString() : 'Not available'}</p>
              </div>
              <div className="admin-info-card">
                <h4>Bio</h4>
                <p>{selectedAlumni.bio || 'No bio added yet.'}</p>
              </div>
              <div className="admin-info-card">
                <h4>Skills</h4>
                {selectedAlumni.skills.length ? (
                  <div className="admin-chips">
                    {selectedAlumni.skills.map((skill) => <span key={skill} className="admin-chip">{skill}</span>)}
                  </div>
                ) : <p>No skills listed.</p>}
              </div>
              <div className="admin-info-card">
                <h4>Achievements</h4>
                {selectedAlumni.achievements.length ? (
                  <div className="admin-chips">
                    {selectedAlumni.achievements.map((achievement) => <span key={achievement} className="admin-chip">{achievement}</span>)}
                  </div>
                ) : <p>No achievements listed.</p>}
              </div>
              <div className="admin-info-card" style={{ gridColumn: '1 / -1' }}>
                <h4>Experience shared by alumni</h4>
                {selectedAlumni.experience.length ? (
                  <div className="admin-chips">
                    {selectedAlumni.experience.map((item) => <span key={item} className="admin-chip">{item}</span>)}
                  </div>
                ) : <p>No experience entries added yet.</p>}
              </div>
              {selectedAlumni.pendingUpdates && (
                <div className="admin-info-card" style={{ gridColumn: '1 / -1' }}>
                  <h4>Pending profile update payload</h4>
                  <p>{JSON.stringify(selectedAlumni.pendingUpdates, null, 2)}</p>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 20 }}>
              <button className="admin-button admin-button-secondary" onClick={openEditorFromDetails}>
                <Edit3 size={16} />
                Edit record
              </button>
              {selectedAlumni.status === 'pending' && (
                <button className="admin-button admin-button-success" onClick={() => handleStatusUpdate(selectedAlumni.id, 'approved')}>
                  <CheckCircle size={16} />
                  Approve registration
                </button>
              )}
              {selectedAlumni.status === 'pending' && (
                <button className="admin-button admin-button-danger" onClick={() => handleStatusUpdate(selectedAlumni.id, 'rejected')}>
                  <XCircle size={16} />
                  Reject registration
                </button>
              )}
              {selectedAlumni.pendingUpdateStatus === 'pending' && (
                <button className="admin-button admin-button-primary" onClick={() => handlePendingUpdateAction(selectedAlumni.id, 'approve')}>
                  <Save size={16} />
                  Approve profile update
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {editingAlumni && (
        <div className="admin-modal-backdrop" onClick={closeEditing}>
          <div className="admin-modal-card" onClick={(event) => event.stopPropagation()}>
            <div className="admin-modal-header">
              <div className="admin-modal-identity">
                <div className="admin-photo">
                  {editingAlumni.profileImage ? (
                    <img src={editingAlumni.profileImage} alt={editingAlumni.name} />
                  ) : (
                    getInitials(editingAlumni.name)
                  )}
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.6rem' }}>Edit Alumni Profile</h2>
                  <p className="admin-muted" style={{ marginTop: 8 }}>Save directly from the admin portal. Approved alumni remain visible in the directory.</p>
                </div>
              </div>
              <button className="admin-modal-close" onClick={closeEditing}>
                <X size={18} />
              </button>
            </div>

            <div className="admin-form-grid">
              <div>
                <label className="admin-label">Full name</label>
                <input className="admin-input" value={editFormData.name || ''} onChange={(event) => setEditFormData((current) => ({ ...current, name: event.target.value }))} />
              </div>
              <div>
                <label className="admin-label">Email</label>
                <input className="admin-input" type="email" value={editFormData.email || ''} onChange={(event) => setEditFormData((current) => ({ ...current, email: event.target.value }))} />
              </div>
              <div>
                <label className="admin-label">Phone</label>
                <input className="admin-input" value={editFormData.mobile || ''} onChange={(event) => setEditFormData((current) => ({ ...current, mobile: event.target.value }))} />
              </div>
              <div>
                <label className="admin-label">Enrollment number</label>
                <input className="admin-input" value={editFormData.enrollmentNumber || ''} onChange={(event) => setEditFormData((current) => ({ ...current, enrollmentNumber: event.target.value }))} />
              </div>
              <div>
                <label className="admin-label">Department</label>
                <input className="admin-input" value={editFormData.department || ''} onChange={(event) => setEditFormData((current) => ({ ...current, department: event.target.value }))} />
              </div>
              <div>
                <label className="admin-label">Batch year</label>
                <input className="admin-input" type="number" value={editFormData.graduationYear || ''} onChange={(event) => setEditFormData((current) => ({ ...current, graduationYear: event.target.value }))} />
              </div>
              <div>
                <label className="admin-label">Job title</label>
                <input className="admin-input" value={editFormData.jobTitle || ''} onChange={(event) => setEditFormData((current) => ({ ...current, jobTitle: event.target.value }))} />
              </div>
              <div>
                <label className="admin-label">Company</label>
                <input className="admin-input" value={editFormData.company || ''} onChange={(event) => setEditFormData((current) => ({ ...current, company: event.target.value }))} />
              </div>
              <div>
                <label className="admin-label">Location</label>
                <input className="admin-input" value={editFormData.location || ''} onChange={(event) => setEditFormData((current) => ({ ...current, location: event.target.value }))} />
              </div>
              <div>
                <label className="admin-label">LinkedIn URL</label>
                <input className="admin-input" value={editFormData.linkedinUrl || ''} onChange={(event) => setEditFormData((current) => ({ ...current, linkedinUrl: event.target.value }))} />
              </div>
              <div>
                <label className="admin-label">Status</label>
                <select className="admin-select" value={editFormData.status || 'pending'} onChange={(event) => setEditFormData((current) => ({ ...current, status: event.target.value }))}>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div>
                <label className="admin-label">Verification</label>
                <select className="admin-select" value={String(Boolean(editFormData.isVerified))} onChange={(event) => setEditFormData((current) => ({ ...current, isVerified: event.target.value === 'true' }))}>
                  <option value="true">Verified</option>
                  <option value="false">Not verified</option>
                </select>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label className="admin-label">Bio</label>
                <textarea className="admin-textarea" value={editFormData.bio || ''} onChange={(event) => setEditFormData((current) => ({ ...current, bio: event.target.value }))} />
              </div>
              <div>
                <label className="admin-label">Skills</label>
                <textarea className="admin-textarea" value={editFormData.skills || ''} onChange={(event) => setEditFormData((current) => ({ ...current, skills: event.target.value }))} placeholder="One skill per line" />
              </div>
              <div>
                <label className="admin-label">Achievements</label>
                <textarea className="admin-textarea" value={editFormData.achievements || ''} onChange={(event) => setEditFormData((current) => ({ ...current, achievements: event.target.value }))} placeholder="One achievement per line" />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label className="admin-label">Experience entries</label>
                <textarea className="admin-textarea" value={editFormData.experience || ''} onChange={(event) => setEditFormData((current) => ({ ...current, experience: event.target.value }))} placeholder="One experience item per line" />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 22, flexWrap: 'wrap' }}>
              <button className="admin-button admin-button-secondary" onClick={closeEditing}>Cancel</button>
              <button className="admin-button admin-button-primary" onClick={handleSaveEdit} disabled={isSaving}>
                {isSaving ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={16} />}
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="admin-modal-backdrop" onClick={() => setDeleteConfirm(null)}>
          <div className="admin-modal-card" style={{ width: 'min(520px, 100%)' }} onClick={(event) => event.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <h2 style={{ margin: 0, fontSize: '1.4rem' }}>Delete alumni record</h2>
                <p className="admin-muted" style={{ marginTop: 8 }}>
                  This will permanently remove <strong>{deleteConfirm.name}</strong> from the alumni database.
                </p>
              </div>
              <button className="admin-modal-close" onClick={() => setDeleteConfirm(null)}>
                <X size={18} />
              </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button className="admin-button admin-button-secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="admin-button admin-button-danger" onClick={handleDelete}>
                <Trash2 size={16} />
                Delete record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
