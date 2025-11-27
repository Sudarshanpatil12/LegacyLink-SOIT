// API service for connecting to the backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // GET request
  async get(endpoint, options = {}) {
    return this.request(endpoint, { method: 'GET', ...options });
  }

  // POST request
  async post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    });
  }

  // PUT request
  async put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    });
  }

  // DELETE request
  async delete(endpoint, options = {}) {
    return this.request(endpoint, { method: 'DELETE', ...options });
  }

  // Authentication methods
  async registerAlumni(alumniData) {
    return this.post('/auth/register', alumniData);
  }

  async loginAlumni(email, password) {
    return this.post('/auth/login', { email, password });
  }

  async loginAdmin(email, password) {
    return this.post('/auth/admin/login', { email, password });
  }

  async getCurrentUser() {
    return this.get('/auth/me');
  }

  async updateProfile(profileData) {
    return this.put('/auth/profile', profileData);
  }

  async logout() {
    return this.post('/auth/logout');
  }

  // Alumni methods
  async getAlumni(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/alumni?${queryString}` : '/alumni';
    return this.get(endpoint);
  }

  async getAlumniById(id) {
    return this.get(`/alumni/${id}`);
  }

  async getAlumniStats() {
    return this.get('/alumni/stats/overview');
  }

  async searchAlumni(query, limit = 20) {
    return this.get(`/alumni/search/${encodeURIComponent(query)}?limit=${limit}`);
  }

  async syncLinkedInData(linkedinUrl) {
    return this.post('/alumni/linkedin/sync', { linkedinUrl });
  }

  // Event methods
  async getEvents(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/events?${queryString}` : '/events';
    return this.get(endpoint);
  }

  async getEventById(id) {
    return this.get(`/events/${id}`);
  }

  async getEventCategories() {
    return this.get('/events/categories/list');
  }

  async getUpcomingEvents(limit = 5) {
    return this.get(`/events/upcoming/list?limit=${limit}`);
  }

  async createEvent(eventData) {
    return this.post('/events', eventData);
  }

  async updateEvent(id, eventData) {
    return this.put(`/events/${id}`, eventData);
  }

  async deleteEvent(id) {
    return this.delete(`/events/${id}`);
  }

  async getMyEvents(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/events/user/my-events?${queryString}` : '/events/user/my-events';
    return this.get(endpoint);
  }

  // Admin methods
  async getAdminDashboard() {
    return this.get('/admin/dashboard');
  }

  async getAdminAlumni(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/admin/alumni?${queryString}` : '/admin/alumni';
    return this.get(endpoint);
  }

  async updateAlumniStatus(id, status, reason = '') {
    return this.put(`/admin/alumni/${id}/status`, { status, reason });
  }

  async deleteAlumni(id) {
    return this.delete(`/admin/alumni/${id}`);
  }

  async getAdminEvents(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/admin/events?${queryString}` : '/admin/events';
    return this.get(endpoint);
  }

  async approveEvent(id, isApproved) {
    return this.put(`/admin/events/${id}/approve`, { isApproved });
  }

  async deleteEvent(id) {
    return this.delete(`/admin/events/${id}`);
  }

  async createAdmin(adminData) {
    return this.post('/admin/admins', adminData);
  }

  async getAdmins() {
    return this.get('/admin/admins');
  }

  async updateAdmin(id, adminData) {
    return this.put(`/admin/admins/${id}`, adminData);
  }

  async deleteAdmin(id) {
    return this.delete(`/admin/admins/${id}`);
  }

  // Health check
  async healthCheck() {
    return this.get('/health');
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;

