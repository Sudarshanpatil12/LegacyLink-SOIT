import React, { useState, useEffect } from 'react';

const FacultyPage = () => {
  const [faculty, setFaculty] = useState([]);
  const [filteredFaculty, setFilteredFaculty] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample faculty data
  useEffect(() => {
    const facultyData = [
  {
    id: 1,
    name: "Dr. Jitendra Agrawal",
    title: "Head of Department",
    department: "Computer Science",
    email: "jitendra.agrawal@jit.edu",
    phone: "(555) 100-0001",
    office: "CS Building, Room 101",
    bio: "Dr. Jitendra Agrawal leads the Computer Science department with a focus on academic excellence and innovation in computing education.",
    image: "/faculty/hod.png",
    research: "Data Science, Artificial Intelligence, Academic Leadership",
    education: "PhD in Computer Science, RGPV University"
  },
  {
    id: 2,
    name: "Dr. Sanjeev Sharma",
    title: "Professor of Information Technology",
    department: "Information Technology",
    email: "sanjeev.sharma@jit.edu",
    phone: "(555) 100-0002",
    office: "IT Building, Room 203",
    bio: "Dr. Sharma specializes in software systems and IT management. He has guided numerous student research projects in emerging technologies.",
    image: "/faculty/dean.png",
    research: "Software Engineering, IT Systems, Cloud Computing",
    education: "PhD in Information Technology, RGPV University"
  },
  {
    id: 3,
    name: "Dr. Nischal Mishra",
    title: "Associate Professor of Computer Science",
    department: "Computer Science",
    email: "nischal.mishra@jit.edu",
    phone: "(555) 100-0003",
    office: "CS Building, Room 205",
    bio: "Dr. Mishra’s research explores modern computing architectures and data-driven solutions for real-world problems.",
    image: "/faculty/d.png",
    research: "Computer Networks, Data Science, Machine Learning",
    education: "PhD in Computer Science, RGPV University"
  },
  {
    id: 4,
    name: "Alka Singh",
    title: "Assistant Professor of Statistics",
    department: "Mathematics & Statistics",
    email: "alka.singh@jit.edu",
    phone: "(555) 100-0004",
    office: "Math Building, Room 210",
    bio: "Prof. Singh teaches advanced statistics and data analytics with a focus on applied modeling techniques.",
    image: "/faculty/d.png",
    research: "Statistics, Data Analysis, Probability Modeling",
    education: "MSc in Statistics, RGPV University"
  },
  {
    id: 5,
    name: "Mahendra K. Ahirwar",
    title: "Assistant Professor of Mechanical Engineering",
    department: "Mechanical Engineering",
    email: "mahendra.ahirwar@jit.edu",
    phone: "(555) 100-0005",
    office: "ME Block, Room 102",
    bio: "Prof. Ahirwar specializes in thermodynamics and mechanical system design.",
    image: "/faculty/d.png",
    research: "Thermodynamics, Fluid Mechanics, Machine Design",
    education: "MTech in Mechanical Engineering, RGPV University"
  },
  {
    id: 6,
    name: "Mr. Neeraj Kumar",
    title: "Assistant Professor of Civil Engineering",
    department: "Civil Engineering",
    email: "neeraj.kumar@jit.edu",
    phone: "(555) 100-0006",
    office: "Civil Block, Room 201",
    bio: "Mr. Kumar focuses on structural engineering and sustainable construction practices.",
    image: "/faculty/d.png",
    research: "Structural Engineering, Sustainability, Civil Design",
    education: "MTech in Structural Engineering, RGPV University"
  },
  {
    id: 7,
    name: "Prateek Mandloi",
    title: "Assistant Professor, M.Tech Coordinator",
    department: "Computer Science",
    email: "prateek.mandloi@jit.edu",
    phone: "(555) 100-0007",
    office: "CS Block, Room 107",
    bio: "Prof. Mandloi coordinates postgraduate programs and focuses on cloud computing and software systems.",
    image: "/faculty/d.png",
    research: "Cloud Computing, Distributed Systems, Software Engineering",
    education: "MTech in Computer Science, RGPV University"
  },
  {
    id: 8,
    name: "Yogendra Sir",
    title: "Professor, CSBS Department",
    department: "Computer Science & Business Systems",
    email: "yogendra.csbs@jit.edu",
    phone: "(555) 100-0008",
    office: "CSBS Block, Room 202",
    bio: "Prof. Yogendra integrates computing with business problem-solving in modern enterprises.",
    image: "/faculty/d.png",
    research: "CSBS, Business Analytics, Artificial Intelligence",
    education: "PhD in Computer Science, RGPV University"
  },
  {
    id: 9,
    name: "Anuja Gupta",
    title: "Assistant Professor of Electronics",
    department: "Electronics & Communication",
    email: "anuja.gupta@jit.edu",
    phone: "(555) 100-0009",
    office: "EC Block, Room 304",
    bio: "Prof. Gupta focuses on embedded systems and VLSI design.",
    image: "/faculty/d.png",
    research: "Embedded Systems, VLSI, Digital Design",
    education: "MTech in Electronics Engineering, RGPV University"
  },
  {
    id: 10,
    name: "Dr. Mahesh Shankar",
    title: "Professor of Electrical Engineering",
    department: "Electrical Engineering",
    email: "mahesh.shankar@jit.edu",
    phone: "(555) 100-0010",
    office: "EE Block, Room 204",
    bio: "Dr. Shankar has extensive experience in power systems and control engineering.",
    image: "/faculty/d.png",
    research: "Power Systems, Control Systems, Electrical Machines",
    education: "PhD in Electrical Engineering, IIT Delhi"
  },
  {
    id: 11,
    name: "Lakshmi R. Suresh",
    title: "Assistant Professor of Humanities",
    department: "Humanities",
    email: "lakshmi.suresh@jit.edu",
    phone: "(555) 100-0011",
    office: "Humanities Block, Room 102",
    bio: "Prof. Suresh teaches communication and soft skills with emphasis on professional development.",
    image: "/faculty/d.png",
    research: "Communication Skills, Personality Development, Linguistics",
    education: "MA in English, RGPV University"
  },
  {
    id: 12,
    name: "Ratna Shrivastava",
    title: "Assistant Professor of Computer Science",
    department: "Computer Science",
    email: "ratna.shrivastava@jit.edu",
    phone: "(555) 100-0012",
    office: "CS Block, Room 109",
    bio: "Prof. Shrivastava teaches programming and software development with a focus on student innovation.",
    image: "/faculty/d.png",
    research: "Programming, Software Engineering, Data Structures",
    education: "MTech in Computer Science, RGPV University"
  },
  {
    id: 13,
    name: "Sanjay Singh",
    title: "Assistant Professor of Mechanical Engineering",
    department: "Mechanical Engineering",
    email: "sanjay.singh@jit.edu",
    phone: "(555) 100-0013",
    office: "ME Block, Room 203",
    bio: "Prof. Singh works on fluid dynamics and renewable energy systems.",
    image: "/faculty/d.png",
    research: "Fluid Mechanics, Renewable Energy, CAD Design",
    education: "MTech in Mechanical Engineering, RGPV University"
  },
  {
    id: 14,
    name: "Shilpa Lakhhera",
    title: "Assistant Professor of Computer Science",
    department: "Computer Science",
    email: "shilpa.lakhhera@jit.edu",
    phone: "(555) 100-0014",
    office: "CS Block, Room 108",
    bio: "Prof. Lakhhera guides students in web technologies and software design.",
    image: "/faculty/d.png",
    research: "Web Development, Software Design, Databases",
    education: "MTech in Computer Science, RGPV University"
  },
  {
    id: 15,
    name: "Tuhin Shukla",
    title: "Assistant Professor of IT",
    department: "Information Technology",
    email: "tuhin.shukla@jit.edu",
    phone: "(555) 100-0015",
    office: "IT Block, Room 207",
    bio: "Prof. Shukla specializes in system design and application development.",
    image: "/faculty/d.png",
    research: "System Design, Programming, Cloud Computing",
    education: "MTech in IT, RGPV University"
  },
  {
    id: 16,
    name: "Varsha Sharma",
    title: "Assistant Professor of Computer Science",
    department: "Computer Science",
    email: "varsha.sharma@jit.edu",
    phone: "(555) 100-0016",
    office: "CS Block, Room 110",
    bio: "Prof. Sharma focuses on database management and web-based technologies.",
    image: "/faculty/d.png",
    research: "Databases, Web Technologies, Data Management",
    education: "MTech in Computer Science, RGPV University"
  },
  {
    id: 17,
    name: "Vipin Verma",
    title: "Assistant Professor of Computer Science",
    department: "Computer Science",
    email: "vipin.verma@jit.edu",
    phone: "(555) 100-0017",
    office: "CS Block, Room 111",
    bio: "Prof. Verma teaches data structures and problem-solving with practical implementation skills.",
    image: "/faculty/d.png",
    research: "Algorithms, Programming, Software Systems",
    education: "MTech in Computer Science, RGPV University"
  },
  {
    id: 18,
    name: "Vivek RGPV",
    title: "Assistant Professor of Computer Science",
    department: "Computer Science",
    email: "vivek.rgpv@jit.edu",
    phone: "(555) 100-0018",
    office: "CS Block, Room 112",
    bio: "Prof. Vivek focuses on computer organization and RGPV-affiliated curriculum design.",
    image: "/faculty/d.png",
    research: "Computer Architecture, Academic Design, Programming",
    education: "MTech in Computer Science, RGPV University"
  }
];

    
    setFaculty(facultyData);
    setFilteredFaculty(facultyData);
  }, []);

  // Filter faculty based on search and department
  useEffect(() => {
    let results = faculty;
    
    if (searchTerm) {
      results = results.filter(facultyMember => 
        facultyMember.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        facultyMember.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        facultyMember.research.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (departmentFilter !== 'all') {
      results = results.filter(facultyMember => 
        facultyMember.department === departmentFilter
      );
    }
    
    setFilteredFaculty(results);
  }, [searchTerm, departmentFilter, faculty]);

  // Get unique departments for filter dropdown
  const departments = ['all', ...new Set(faculty.map(f => f.department))];

  const openModal = (facultyMember) => {
    setSelectedFaculty(facultyMember);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFaculty(null);
  };

  // Internal CSS styles
  const styles = {
    facultyPage: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      lineHeight: 1.6,
      color: '#333',
      backgroundColor: '#f5f7fa',
      minHeight: '100vh'
    },
    facultyHeader: {
      background: 'linear-gradient(135deg, #2c3e50, #3498db)',
      color: 'white',
      padding: '60px 0',
      textAlign: 'center',
      marginBottom: '40px'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px'
    },
    headerTitle: {
      fontSize: '2.5rem',
      marginBottom: '10px',
      fontWeight: '700'
    },
    headerSubtitle: {
      fontSize: '1.2rem',
      opacity: 0.9,
      maxWidth: '600px',
      margin: '0 auto'
    },
    facultyControls: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      marginBottom: '30px',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    searchBox: {
      position: 'relative',
      flex: 1,
      minWidth: '300px'
    },
    searchIcon: {
      position: 'absolute',
      left: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#95a5a6'
    },
    searchInput: {
      width: '100%',
      padding: '12px 20px 12px 45px',
      border: '1px solid #ddd',
      borderRadius: '30px',
      fontSize: '1rem',
      transition: 'all 0.3s',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    filterBox: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    filterLabel: {
      fontWeight: '600',
      color: '#2c3e50'
    },
    filterSelect: {
      padding: '10px 15px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      backgroundColor: 'white',
      fontSize: '1rem',
      cursor: 'pointer',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    facultyGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '30px',
      marginBottom: '50px'
    },
    facultyCard: {
      background: 'white',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s, box-shadow 0.3s'
    },
    facultyImage: {
      height: '200px',
      overflow: 'hidden'
    },
    facultyImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.5s'
    },
    facultyInfo: {
      padding: '20px'
    },
    facultyName: {
      color: '#2c3e50',
      marginBottom: '5px',
      fontSize: '1.3rem'
    },
    facultyTitle: {
      color: '#3498db',
      fontWeight: '600',
      marginBottom: '5px'
    },
    facultyDepartment: {
      color: '#e74c3c',
      fontWeight: '600',
      marginBottom: '10px',
      fontSize: '0.9rem'
    },
    facultyResearch: {
      color: '#95a5a6',
      fontSize: '0.9rem',
      marginBottom: '15px',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    },
    viewProfileBtn: {
      background: '#3498db',
      color: 'white',
      border: 'none',
      padding: '8px 15px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'background 0.3s',
      width: '100%'
    },
    noResults: {
      gridColumn: '1 / -1',
      textAlign: 'center',
      padding: '60px 20px',
      color: '#95a5a6'
    },
    noResultsIcon: {
      fontSize: '3rem',
      marginBottom: '20px',
      color: '#ddd'
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    },
    modalContent: {
      background: 'white',
      borderRadius: '10px',
      maxWidth: '800px',
      width: '100%',
      maxHeight: '90vh',
      overflowY: 'auto',
      position: 'relative',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
    },
    closeModal: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      color: '#95a5a6',
      cursor: 'pointer',
      zIndex: 10,
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      transition: 'background 0.3s'
    },
    modalBody: {
      padding: '30px'
    },
    facultyDetailHeader: {
      display: 'flex',
      gap: '30px',
      marginBottom: '30px',
      flexWrap: 'wrap'
    },
    facultyDetailImage: {
      flex: '0 0 200px'
    },
    facultyDetailImg: {
      width: '100%',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    facultyDetailInfo: {
      flex: 1,
      minWidth: '300px'
    },
    facultyDetailName: {
      color: '#2c3e50',
      marginBottom: '5px',
      fontSize: '1.8rem'
    },
    facultyDetailTitle: {
      color: '#3498db',
      fontWeight: '600',
      marginBottom: '5px',
      fontSize: '1.1rem'
    },
    facultyDetailDepartment: {
      color: '#e74c3c',
      fontWeight: '600',
      marginBottom: '20px',
      fontSize: '1rem'
    },
    contactInfo: {
      marginBottom: '20px'
    },
    contactItem: {
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    contactIcon: {
      width: '20px',
      color: '#3498db'
    },
    detailSection: {
      marginBottom: '25px'
    },
    detailSectionTitle: {
      color: '#2c3e50',
      marginBottom: '10px',
      paddingBottom: '5px',
      borderBottom: '2px solid #ecf0f1'
    },
    // Media queries for responsive design
    '@media (max-width: 768px)': {
      facultyControls: {
        flexDirection: 'column',
        alignItems: 'stretch'
      },
      searchBox: {
        minWidth: '100%'
      },
      filterBox: {
        justifyContent: 'space-between'
      },
      facultyGrid: {
        gridTemplateColumns: '1fr'
      },
      facultyDetailHeader: {
        flexDirection: 'column'
      },
      facultyDetailImage: {
        flex: '0 0 auto',
        maxWidth: '200px',
        margin: '0 auto'
      }
    }
  };

  // Helper function to handle responsive styles
  const getResponsiveStyle = (baseStyle) => {
    return {
      ...baseStyle,
      ...(window.innerWidth <= 768 && styles['@media (max-width: 768px)'])
    };
  };

  return (
    <div style={styles.facultyPage}>
      <header style={styles.facultyHeader}>
        <div style={styles.container}>
          <h1 style={styles.headerTitle}>Faculty Directory</h1>
          <p style={styles.headerSubtitle}>Meet our distinguished faculty members at LegacyLink University</p>
        </div>
      </header>

      <div style={styles.container}>
        <div style={getResponsiveStyle(styles.facultyControls)}>
          <div style={styles.searchBox}>
            <i className="fas fa-search" style={styles.searchIcon}></i>
            <input
              type="text"
              placeholder="Search by name, department, or research area..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
              onFocus={(e) => {
                e.target.style.outline = 'none';
                e.target.style.borderColor = '#3498db';
                e.target.style.boxShadow = '0 0 0 3px rgba(52, 152, 219, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#ddd';
                e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
            />
          </div>
          
          <div style={styles.filterBox}>
            <label htmlFor="department-filter" style={styles.filterLabel}>Filter by Department:</label>
            <select
              id="department-filter"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              style={styles.filterSelect}
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={styles.facultyGrid}>
          {filteredFaculty.length > 0 ? (
            filteredFaculty.map(facultyMember => (
              <div 
                key={facultyMember.id} 
                style={styles.facultyCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
                  e.currentTarget.querySelector('img').style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.querySelector('img').style.transform = 'scale(1)';
                }}
              >
                <div style={styles.facultyImage}>
                  <img 
                    src={facultyMember.image} 
                    alt={facultyMember.name} 
                    style={styles.facultyImg}
                  />
                </div>
                <div style={styles.facultyInfo}>
                  <h3 style={styles.facultyName}>{facultyMember.name}</h3>
                  <p style={styles.facultyTitle}>{facultyMember.title}</p>
                  <p style={styles.facultyDepartment}>{facultyMember.department}</p>
                  <p style={styles.facultyResearch}>{facultyMember.research}</p>
                  <button 
                    style={styles.viewProfileBtn}
                    onClick={() => openModal(facultyMember)}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#2980b9';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#3498db';
                    }}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={styles.noResults}>
              <i className="fas fa-search" style={styles.noResultsIcon}></i>
              <h3>No faculty members found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Faculty Detail Modal */}
      {isModalOpen && selectedFaculty && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div 
            style={styles.modalContent} 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              style={styles.closeModal}
              onClick={closeModal}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'none';
              }}
            >
              <i className="fas fa-times"></i>
            </button>
            
            <div style={styles.modalBody}>
              <div style={getResponsiveStyle(styles.facultyDetailHeader)}>
                <div style={styles.facultyDetailImage}>
                  <img 
                    src={selectedFaculty.image} 
                    alt={selectedFaculty.name} 
                    style={styles.facultyDetailImg}
                  />
                </div>
                <div style={styles.facultyDetailInfo}>
                  <h2 style={styles.facultyDetailName}>{selectedFaculty.name}</h2>
                  <p style={styles.facultyDetailTitle}>{selectedFaculty.title}</p>
                  <p style={styles.facultyDetailDepartment}>{selectedFaculty.department}</p>
                  
                  <div style={styles.contactInfo}>
                    <p style={styles.contactItem}>
                      <i className="fas fa-envelope" style={styles.contactIcon}></i> 
                      {selectedFaculty.email}
                    </p>
                    <p style={styles.contactItem}>
                      <i className="fas fa-phone" style={styles.contactIcon}></i> 
                      {selectedFaculty.phone}
                    </p>
                    <p style={styles.contactItem}>
                      <i className="fas fa-map-marker-alt" style={styles.contactIcon}></i> 
                      {selectedFaculty.office}
                    </p>
                  </div>
                </div>
              </div>
              
              <div style={styles.facultyDetailBody}>
                <div style={styles.detailSection}>
                  <h3 style={styles.detailSectionTitle}>Biography</h3>
                  <p>{selectedFaculty.bio}</p>
                </div>
                
                <div style={styles.detailSection}>
                  <h3 style={styles.detailSectionTitle}>Research Interests</h3>
                  <p>{selectedFaculty.research}</p>
                </div>
                
                <div style={styles.detailSection}>
                  <h3 style={styles.detailSectionTitle}>Education</h3>
                  <p>{selectedFaculty.education}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyPage;