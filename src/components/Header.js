import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAlumni } from '../context/AlumniContext';
import { FaUserCircle, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const { currentUser, logout } = useAlumni();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check admin login status
  useEffect(() => {
    const checkAdminStatus = () => {
      const adminStatus = localStorage.getItem('isAdminLoggedIn');
      setIsAdminLoggedIn(adminStatus === 'true');
    };

    checkAdminStatus();
    
    // Listen for storage changes (in case admin logs in/out from another tab)
    window.addEventListener('storage', checkAdminStatus);
    
    return () => {
      window.removeEventListener('storage', checkAdminStatus);
    };
  }, []);

  // Check screen size for mobile/tablet
  useEffect(() => {
    const checkScreenSize = () => {
      // treat <=768px as mobile; tablets (<=1024) will show top bar
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Set active navigation based on current path
  useEffect(() => {
    const path = location.pathname;
    setActiveNav(path);
  }, [location]);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/');
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    setIsAdminLoggedIn(false);
    setIsDropdownOpen(false);
    navigate('/');
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Check if nav item is active
  const isNavActive = (path) => {
    if (path === '/') {
      return activeNav === '/';
    }
    return activeNav.startsWith(path);
  };

  // Styles object
  const styles = {
    header: {
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      zIndex: 1000
    },
    topBar: {
      backgroundColor: '#0a4a7a',
      color: 'white',
      padding: isMobile ? '6px 0' : '8px 0',
      fontSize: isMobile ? '12px' : '14px',
      display: isMobile ? 'none' : 'block'
    },
    container: {
      width: '90%',
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isMobile ? '0 15px' : '0'
    },
    topBarLeft: {
      display: 'flex',
      gap: '20px',
      alignItems: 'center'
    },
    topBarRight: {
      display: 'flex',
      gap: '15px',
      alignItems: 'center'
    },
    authButton: {
      color: 'white',
      textDecoration: 'none',
      padding: '8px 20px',
      borderRadius: '4px',
      transition: 'all 0.3s ease',
      fontWeight: '500',
      position: 'relative',
      overflow: 'hidden',
      zIndex: '1',
    },
    loginBtn: {
      backgroundColor: 'transparent',
      border: '1px solid white',
      ':hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
      },
      ':active': {
        transform: 'translateY(0)'
      }
    },
    registerBtn: {
      backgroundColor: '#e67e22',
      border: '1px solid #e67e22',
      ':hover': {
        backgroundColor: '#d46c13',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
      },
      ':active': {
        transform: 'translateY(0)'
      }
    },
    adminBtn: {
      backgroundColor: '#10b981',
      border: '1px solid #10b981',
      ':hover': {
        backgroundColor: '#059669',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
      },
      ':active': {
        transform: 'translateY(0)'
      }
    },
    mainHeader: {
      padding: isMobile ? '10px 0' : '15px 0',
      backgroundColor: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative'
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      gap: isMobile ? '8px' : '15px',
      margin: '0 auto',
      flex: 1,
      justifyContent: 'center'
    },
    logo: {
      height: isMobile ? '50px' : '70px',
      width: 'auto'
    },
    mobileMenuButton: {
      background: 'none',
      border: 'none',
      fontSize: '24px',
      color: '#0a4a7a',
      cursor: 'pointer',
      padding: '8px',
      borderRadius: '4px',
      transition: 'background-color 0.2s',
      marginLeft: '15px',
      display: isMobile ? 'block' : 'none'
    },
    logoText: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#333',
      height: isMobile ? '50px' : '70px',
      padding: '5px 0',
      textAlign: 'center'
    },
    logoTitle: {
      color: '#0a4a7a',
      fontSize: isMobile ? '14px' : '22px',
      margin: '0',
      fontWeight: 'bold',
      lineHeight: '1.2'
    },
    logoSubtitle: {
      color: '#e67e22',
      margin: '5px 0 0',
      fontSize: isMobile ? '10px' : '16px',
      lineHeight: '1.2'
    },
    mainNav: {
      backgroundColor: '#0a4a7a',
      display: isMobile ? 'none' : 'block'
    },
    navMenu: {
      display: 'flex',
      listStyle: 'none',
      margin: '0 auto',
      padding: '0',
      justifyContent: 'center',
      width: '100%',
      flexWrap: 'wrap'
    },
    mobileNav: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: '#0a4a7a',
      display: isMobileMenuOpen ? 'block' : 'none',
      zIndex: 1000,
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    mobileNavMenu: {
      listStyle: 'none',
      margin: 0,
      padding: 0
    },
    navItem: {
      position: 'relative',
      transition: 'all 0.3s ease',
    },
    navLink: {
      color: 'white',
      textDecoration: 'none',
      padding: isMobile ? '12px 20px' : '15px 20px',
      display: 'block',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      whiteSpace: 'nowrap',
      position: 'relative',
      overflow: 'hidden',
      borderBottom: isMobile ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
    },
    // Media queries
    '@media (max-width: 768px)': {
      container: {
        flexDirection: 'column',
        textAlign: 'center'
      },
      topBarLeft: {
        marginBottom: '5px',
        justifyContent: 'center'
      },
      topBarRight: {
        marginBottom: '5px',
        justifyContent: 'center'
      },
      logoContainer: {
        flexDirection: 'column',
        textAlign: 'center'
      },
      logo: {
        marginRight: '0',
        marginBottom: '10px'
      },
      navMenu: {
        flexDirection: 'column',
        alignItems: 'center'
      },
    }
  };

  // Navigation link style with hover and active states
  const getNavLinkStyle = (path) => ({
    ...styles.navLink,
    backgroundColor: isNavActive(path) ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
    position: 'relative',
    ':hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    // Add a subtle indicator for active state
    ...(isNavActive(path) && {
      '::after': {
        content: '""',
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '100%',
        height: '3px',
        backgroundColor: '#e67e22',
      }
    })
  });

  return (
    <header style={styles.header}>
      {/* Top Bar */}
      <div style={styles.topBar}>
        <div style={styles.container}>
          <div style={styles.topBarLeft}>
            <span>alumni@rgpv.ac.in</span>
            <span>+91 95228 76912</span>
          </div>
          <div style={styles.topBarRight}>
            {currentUser ? (
              <div style={{ position: 'relative' }}>
                <button 
                  onClick={toggleDropdown}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    transition: 'background-color 0.2s',
                    backgroundColor: isDropdownOpen ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                    ':hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    },
                  }}
                >
                  <FaUserCircle size={20} />
                  <span>{currentUser.name || 'Profile'}</span>
                </button>
                {isDropdownOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                    minWidth: '180px',
                    zIndex: 1000,
                    marginTop: '5px',
                    overflow: 'hidden',
                  }}>
                    <Link 
                      to="/complete-profile" 
                      style={{
                        display: 'block',
                        padding: '10px 15px',
                        color: '#333',
                        textDecoration: 'none',
                        transition: 'background-color 0.2s',
                        ':hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        },
                      }}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '10px 15px',
                        background: 'none',
                        border: 'none',
                        borderTop: '1px solid #eee',
                        color: '#e74c3c',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'background-color 0.2s',
                        ':hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        },
                      }}
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : isAdminLoggedIn ? (
              // Show Admin Panel and Logout when admin is logged in
              <div style={{ position: 'relative' }}>
                <button 
                  onClick={toggleDropdown}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    transition: 'background-color 0.2s',
                    backgroundColor: isDropdownOpen ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                    ':hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    },
                  }}
                >
                  <FaUserCircle size={20} />
                  <span>Admin Panel</span>
                </button>
                {isDropdownOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                    minWidth: '180px',
                    zIndex: 1000,
                    marginTop: '5px',
                    overflow: 'hidden',
                  }}>
                    <Link 
                      to="/admin" 
                      style={{
                        display: 'block',
                        padding: '10px 15px',
                        color: '#333',
                        textDecoration: 'none',
                        transition: 'background-color 0.2s',
                        ':hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        },
                      }}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                    <button
                      onClick={handleAdminLogout}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '10px 15px',
                        background: 'none',
                        border: 'none',
                        borderTop: '1px solid #eee',
                        color: '#e74c3c',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'background-color 0.2s',
                        ':hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        },
                      }}
                    >
                      <FaSignOutAlt />
                      <span>Admin Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Show regular login/register buttons when no one is logged in
              <>
                <Link 
                  to="/login" 
                  style={{
                    ...styles.authButton,
                    ...styles.loginBtn,
                    ':hover': {
                      ...styles.loginBtn[':hover'],
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }}
                >
                  Admin Login
                </Link>
                <Link 
                  to="/register" 
                  style={{
                    ...styles.authButton,
                    ...styles.registerBtn,
                    ':hover': {
                      ...styles.registerBtn[':hover'],
                      backgroundColor: '#d46c13',
                    }
                  }}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div style={styles.mainHeader}>
        <div style={styles.logoContainer}>
          <Link to="/" style={{display: 'flex', alignItems: 'center', textDecoration: 'none'}} onClick={closeMobileMenu}>
            <img
              src={`${process.env.PUBLIC_URL}/images/soit-logo.png`}
              alt="RGPV Alumni Logo"
              style={styles.logo}
              onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
            />
            <div style={styles.logoText}>
              <span style={{...styles.logoTitle, fontSize: isMobile ?  '1.1rem' : '1.4rem' , lineHeight: '1.2'}}>School of Information Technology,RGPV</span>
              <span style={{...styles.logoTitle, fontSize: isMobile ? '0.8rem' : '1rem', fontWeight: 'bold', lineHeight: '1.2'}}>State Technological University of Bhopal </span>
              <span style={{...styles.logoSubtitle, fontSize: isMobile ? '0.7rem' : '0.85rem', lineHeight: '1.2'}}>Approved by AICTE | Affiliated to RGPV Bhopal | NAAC Accredited</span>
            </div>
          </Link>
        </div>
        
        <button 
          style={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(10, 74, 122, 0.1)'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Desktop Navigation */}
      <nav style={styles.mainNav}>
        <div style={styles.container}>
          <ul style={styles.navMenu}>
            <li style={styles.navItem}>
              <Link 
                to="/" 
                style={getNavLinkStyle('/')}
                onMouseEnter={(e) => {
                  if (!isNavActive('/')) {
                    e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isNavActive('/')) {
                    e.target.style.backgroundColor = 'transparent';
                  } else {
                    e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
                  }
                }}
              >
                Home
              </Link>
            </li>
            <li style={styles.navItem}>
              <Link 
                to="/about" 
                style={getNavLinkStyle('/about')}
                onMouseEnter={(e) => {
                  if (!isNavActive('/about')) {
                    e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isNavActive('/about')) {
                    e.target.style.backgroundColor = 'transparent';
                  } else {
                    e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
                  }
                }}
              >
                About Us
              </Link>
            </li>
            <li style={styles.navItem}>
              <Link 
                to="/alumni" 
                style={getNavLinkStyle('/alumni')}
                onMouseEnter={(e) => {
                  if (!isNavActive('/alumni')) {
                    e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isNavActive('/alumni')) {
                    e.target.style.backgroundColor = 'transparent';
                  } else {
                    e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
                  }
                }}
              >
                Alumni Directory
              </Link>
            </li>
            <li style={styles.navItem}>
              <Link 
                to="/events" 
                style={getNavLinkStyle('/events')}
                onMouseEnter={(e) => {
                  if (!isNavActive('/events')) {
                    e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isNavActive('/events')) {
                    e.target.style.backgroundColor = 'transparent';
                  } else {
                    e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
                  }
                }}
              >
                Events
              </Link>
            </li>
            <li style={styles.navItem}>
              <Link 
                to="/jobs" 
                style={getNavLinkStyle('/jobs')}
                onMouseEnter={(e) => {
                  if (!isNavActive('/jobs')) {
                    e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isNavActive('/jobs')) {
                    e.target.style.backgroundColor = 'transparent';
                  } else {
                    e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
                  }
                }}
              >
                Career Opportunities
              </Link>
            </li>
            <li style={styles.navItem}>
              <Link 
                to="/gallery" 
                style={getNavLinkStyle('/gallery')}
                onMouseEnter={(e) => {
                  if (!isNavActive('/gallery')) {
                    e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isNavActive('/gallery')) {
                    e.target.style.backgroundColor = 'transparent';
                  } else {
                    e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
                  }
                }}
              >
                Gallery
              </Link>
            </li>
            <li style={styles.navItem}>
              <Link 
                to="/contact" 
                style={getNavLinkStyle('/contact')}
                onMouseEnter={(e) => {
                  if (!isNavActive('/contact')) {
                    e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isNavActive('/contact')) {
                    e.target.style.backgroundColor = 'transparent';
                  } else {
                    e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
                  }
                }}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav style={styles.mobileNav}>
        <ul style={styles.mobileNavMenu}>
          <li>
            <Link 
              to="/" 
              style={getNavLinkStyle('/')}
              onClick={closeMobileMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              style={getNavLinkStyle('/about')}
              onClick={closeMobileMenu}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link 
              to="/alumni" 
              style={getNavLinkStyle('/alumni')}
              onClick={closeMobileMenu}
            >
              Alumni Directory
            </Link>
          </li>
          <li>
            <Link 
              to="/events" 
              style={getNavLinkStyle('/events')}
              onClick={closeMobileMenu}
            >
              Events
            </Link>
          </li>
          <li>
            <Link 
              to="/jobs" 
              style={getNavLinkStyle('/jobs')}
              onClick={closeMobileMenu}
            >
              Career Opportunities
            </Link>
          </li>
          <li>
            <Link 
              to="/gallery" 
              style={getNavLinkStyle('/gallery')}
              onClick={closeMobileMenu}
            >
              Gallery
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              style={getNavLinkStyle('/contact')}
              onClick={closeMobileMenu}
            >
              Contact
            </Link>
          </li>
          {/* Show auth actions in mobile menu when not logged in */}
          {!currentUser && !isAdminLoggedIn && (
            <>
              <li>
                <Link to="/login" style={getNavLinkStyle('/login')} onClick={closeMobileMenu}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" style={getNavLinkStyle('/register')} onClick={closeMobileMenu}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;