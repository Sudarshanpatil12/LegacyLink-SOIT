import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const response = await apiService.getCurrentUser();
          setUser(response.data.user);
          setUserType(response.data.userType);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear invalid token
        localStorage.removeItem('authToken');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login alumni
  const loginAlumni = async (email, password) => {
    try {
      setError(null);
      const response = await apiService.loginAlumni(email, password);
      
      if (response.success) {
        localStorage.setItem('authToken', response.token);
        setUser(response.alumni);
        setUserType('alumni');
        return { success: true, data: response.alumni };
      }
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  // Login admin
  const loginAdmin = async (email, password) => {
    try {
      setError(null);
      const response = await apiService.loginAdmin(email, password);
      
      if (response.success) {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('isAdminLoggedIn', 'true');
        setUser(response.admin);
        setUserType('admin');
        return { success: true, data: response.admin };
      }
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  // Register alumni
  const registerAlumni = async (alumniData) => {
    try {
      setError(null);
      const response = await apiService.registerAlumni(alumniData);
      
      if (response.success) {
        localStorage.setItem('authToken', response.token);
        setUser(response.alumni);
        setUserType('alumni');
        return { success: true, data: response.alumni };
      }
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  // LinkedIn OAuth login
  const loginWithLinkedIn = () => {
    window.location.href = `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/auth/linkedin`;
  };

  // Handle LinkedIn callback
  const handleLinkedInCallback = async (token, type) => {
    try {
      localStorage.setItem('authToken', token);
      const response = await apiService.getCurrentUser();
      setUser(response.data.user);
      setUserType(response.data.userType);
      return { success: true, data: response.data.user };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  // Update profile
  const updateProfile = async (profileData) => {
    try {
      setError(null);
      const response = await apiService.updateProfile(profileData);
      
      if (response.success) {
        setUser(response.alumni);
        return { success: true, data: response.alumni };
      }
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  // Logout
  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('isAdminLoggedIn');
      setUser(null);
      setUserType(null);
      setError(null);
    }
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem('authToken');
  };

  // Check if user is admin
  const isAdmin = () => {
    return userType === 'admin';
  };

  // Check if user is alumni
  const isAlumni = () => {
    return userType === 'alumni';
  };

  // Check if alumni is verified
  const isVerified = () => {
    return user && user.isVerified;
  };

  // Check if alumni is approved
  const isApproved = () => {
    return user && user.status === 'approved';
  };

  const value = {
    user,
    userType,
    loading,
    error,
    loginAlumni,
    loginAdmin,
    registerAlumni,
    loginWithLinkedIn,
    handleLinkedInCallback,
    updateProfile,
    logout,
    clearError,
    isAuthenticated,
    isAdmin,
    isAlumni,
    isVerified,
    isApproved,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

