import React, { useState, useEffect } from 'react';
import { Search, Mail, Phone, MapPin, GraduationCap, BookOpen, X, Briefcase, Award, Globe } from 'lucide-react';

const FacultyPage = () => {
  const [faculty, setFaculty] = useState([]);
  const [filteredFaculty, setFilteredFaculty] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    departments: 0,
    phdHolders: 0,
    researchAreas: 0
  });

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
        bio: "Dr. Jitendra Agrawal leads the Computer Science department with a focus on academic excellence and innovation in computing education. With over 20 years of experience in academia, he has published numerous research papers in international journals and conferences.",
        image: "/faculty/hod.png",
        research: "Data Science, Artificial Intelligence, Academic Leadership",
        education: "PhD in Computer Science, RGPV University",
        qualifications: "PhD (Computer Science), M.Tech (CSE), B.Tech (CSE)",
        experience: "22 years",
        publications: 45,
        researchProjects: 12,
        isPhdHolder: true
      },
      {
        id: 2,
        name: "Dr. Sanjeev Sharma",
        title: "Professor of Information Technology",
        department: "Information Technology",
        email: "sanjeev.sharma@jit.edu",
        phone: "(555) 100-0002",
        office: "IT Building, Room 203",
        bio: "Dr. Sharma specializes in software systems and IT management. He has guided numerous student research projects in emerging technologies and has been instrumental in curriculum development for the IT department.",
        image: "/faculty/dean.png",
        research: "Software Engineering, IT Systems, Cloud Computing",
        education: "PhD in Information Technology, RGPV University",
        qualifications: "PhD (IT), M.Tech (IT), B.Tech (IT)",
        experience: "18 years",
        publications: 38,
        researchProjects: 8,
        isPhdHolder: true
      },
      {
        id: 3,
        name: "Dr. Nischol Mishra",
        title: "Associate Professor of Computer Science",
        department: "Computer Science",
        email: "nischal.mishra@jit.edu",
        phone: "(555) 100-0003",
        office: "CS Building, Room 205",
        bio: "Dr. Mishra's research explores modern computing architectures and data-driven solutions for real-world problems. He actively collaborates with industry partners on research projects.",
        image: "/faculty/d.png",
        research: "Computer Networks, Data Science, Machine Learning",
        education: "PhD in Computer Science, RGPV University",
        qualifications: "PhD (CSE), M.Tech (CSE), B.Tech (CSE)",
        experience: "15 years",
        publications: 32,
        researchProjects: 10,
        isPhdHolder: true
      },
      {
        id: 4,
        name: "Mrs. Alka Singh",
        title: "Assistant Professor of Statistics",
        department: "Mathematics & Statistics",
        email: "alka.singh@jit.edu",
        phone: "(555) 100-0004",
        office: "Math Building, Room 210",
        bio: "Prof. Singh teaches advanced statistics and data analytics with a focus on applied modeling techniques. She has developed several statistical models for industry applications.",
        image: "/faculty/d.png",
        research: "Statistics, Data Analysis, Probability Modeling",
        education: "MSc in Statistics, RGPV University",
        qualifications: "M.Sc (Statistics), B.Sc (Mathematics)",
        experience: "8 years",
        publications: 18,
        researchProjects: 5,
        isPhdHolder: false
      },
      {
        id: 5,
        name: "Mr. Mahendra K. Ahirwar",
        title: "Assistant Professor of Mechanical Engineering",
        department: "Mechanical Engineering",
        email: "mahendra.ahirwar@jit.edu",
        phone: "(555) 100-0005",
        office: "ME Block, Room 102",
        bio: "Prof. Ahirwar specializes in thermodynamics and mechanical system design. He has worked on several industrial projects involving energy optimization.",
        image: "/faculty/d.png",
        research: "Thermodynamics, Fluid Mechanics, Machine Design",
        education: "MTech in Mechanical Engineering, RGPV University",
        qualifications: "M.Tech (ME), B.Tech (ME)",
        experience: "10 years",
        publications: 22,
        researchProjects: 7,
        isPhdHolder: false
      },
      {
        id: 6,
        name: "Mr. Neeraj Kumar",
        title: "Assistant Professor of Civil Engineering",
        department: "Civil Engineering",
        email: "neeraj.kumar@jit.edu",
        phone: "(555) 100-0006",
        office: "Civil Block, Room 201",
        bio: "Mr. Kumar focuses on structural engineering and sustainable construction practices. He has contributed to several infrastructure development projects.",
        image: "/faculty/d.png",
        research: "Structural Engineering, Sustainability, Civil Design",
        education: "MTech in Structural Engineering, RGPV University",
        qualifications: "M.Tech (CE), B.Tech (CE)",
        experience: "9 years",
        publications: 20,
        researchProjects: 6,
        isPhdHolder: false
      },
      {
        id: 7,
        name: "Mr. Prateek Mandloi",
        title: "Assistant Professor, M.Tech Coordinator",
        department: "Computer Science",
        email: "prateek.mandloi@jit.edu",
        phone: "(555) 100-0007",
        office: "CS Block, Room 107",
        bio: "Prof. Mandloi coordinates postgraduate programs and focuses on cloud computing and software systems. He has developed innovative teaching methodologies.",
        image: "/faculty/d.png",
        research: "Cloud Computing, Distributed Systems, Software Engineering",
        education: "MTech in Computer Science, RGPV University",
        qualifications: "M.Tech (CSE), B.Tech (CSE)",
        experience: "12 years",
        publications: 25,
        researchProjects: 9,
        isPhdHolder: false
      },
      {
        id: 8,
        name: "Dr. Yogendra Sir",
        title: "Professor, CSBS Department",
        department: "Computer Science & Business Systems",
        email: "yogendra.csbs@jit.edu",
        phone: "(555) 100-0008",
        office: "CSBS Block, Room 202",
        bio: "Prof. Yogendra integrates computing with business problem-solving in modern enterprises. He brings industry experience to the classroom.",
        image: "/faculty/d.png",
        research: "CSBS, Business Analytics, Artificial Intelligence",
        education: "PhD in Computer Science, RGPV University",
        qualifications: "PhD (CSE), MBA, M.Tech (CSE)",
        experience: "20 years",
        publications: 40,
        researchProjects: 11,
        isPhdHolder: true
      },
      {
        id: 9,
        name: "Dr. Anuja Gupta",
        title: "Assistant Professor of Electronics",
        department: "Electronics & Communication",
        email: "anuja.gupta@jit.edu",
        phone: "(555) 100-0009",
        office: "EC Block, Room 304",
        bio: "Prof. Gupta focuses on embedded systems and VLSI design. She has mentored students in several national-level technical competitions.",
        image: "/faculty/d.png",
        research: "Embedded Systems, VLSI, Digital Design",
        education: "MTech in Electronics Engineering, RGPV University",
        qualifications: "M.Tech (ECE), B.Tech (ECE)",
        experience: "7 years",
        publications: 15,
        researchProjects: 4,
        isPhdHolder: false
      },
      {
        id: 10,
        name: "Dr. Mahesh Shankar",
        title: "Professor of Electrical Engineering",
        department: "Electrical Engineering",
        email: "mahesh.shankar@jit.edu",
        phone: "(555) 100-0010",
        office: "EE Block, Room 204",
        bio: "Dr. Shankar has extensive experience in power systems and control engineering. He has consulted for major power distribution companies.",
        image: "/faculty/d.png",
        research: "Power Systems, Control Systems, Electrical Machines",
        education: "PhD in Electrical Engineering, IIT Delhi",
        qualifications: "PhD (EE), M.Tech (EE), B.Tech (EE)",
        experience: "25 years",
        publications: 50,
        researchProjects: 15,
        isPhdHolder: true
      },
      {
        id: 11,
        name: "Dr. Lakshmi R. Suresh",
        title: "Assistant Professor of Humanities",
        department: "Humanities",
        email: "lakshmi.suresh@jit.edu",
        phone: "(555) 100-0011",
        office: "Humanities Block, Room 102",
        bio: "Prof. Suresh teaches communication and soft skills with emphasis on professional development. She has conducted numerous corporate training programs.",
        image: "/faculty/d.png",
        research: "Communication Skills, Personality Development, Linguistics",
        education: "MA in English, RGPV University",
        qualifications: "M.A (English), B.A (English)",
        experience: "6 years",
        publications: 12,
        researchProjects: 3,
        isPhdHolder: false
      },
      {
        id: 12,
        name: "Ratna Shrivastava",
        title: "Assistant Professor of Computer Science",
        department: "Computer Science",
        email: "ratna.shrivastava@jit.edu",
        phone: "(555) 100-0012",
        office: "CS Block, Room 109",
        bio: "Prof. Shrivastava teaches programming and software development with a focus on student innovation. She has developed innovative curriculum for programming courses.",
        image: "/faculty/d.png",
        research: "Programming, Software Engineering, Data Structures",
        education: "MTech in Computer Science, RGPV University",
        qualifications: "M.Tech (CSE), B.Tech (CSE)",
        experience: "8 years",
        publications: 20,
        researchProjects: 6,
        isPhdHolder: false
      },
      {
        id: 13,
        name: "Mr. Sanjay Singh",
        title: "Assistant Professor of Mechanical Engineering",
        department: "Mechanical Engineering",
        email: "sanjay.singh@jit.edu",
        phone: "(555) 100-0013",
        office: "ME Block, Room 203",
        bio: "Prof. Singh works on fluid dynamics and renewable energy systems. He has contributed to sustainable energy research projects.",
        image: "/faculty/d.png",
        research: "Fluid Mechanics, Renewable Energy, CAD Design",
        education: "MTech in Mechanical Engineering, RGPV University",
        qualifications: "M.Tech (ME), B.Tech (ME)",
        experience: "11 years",
        publications: 24,
        researchProjects: 8,
        isPhdHolder: false
      },
      {
        id: 14,
        name: "Dr. Shilpa Lakhhera",
        title: "Assistant Professor of Computer Science",
        department: "Computer Science",
        email: "shilpa.lakhhera@jit.edu",
        phone: "(555) 100-0014",
        office: "CS Block, Room 108",
        bio: "Prof. Lakhhera guides students in web technologies and software design. She has developed several web applications for educational purposes.",
        image: "/faculty/d.png",
        research: "Web Development, Software Design, Databases",
        education: "MTech in Computer Science, RGPV University",
        qualifications: "M.Tech (CSE), B.Tech (CSE)",
        experience: "9 years",
        publications: 18,
        researchProjects: 5,
        isPhdHolder: false
      },
      {
        id: 15,
        name: "Dr. Tuhin Shukla",
        title: "Assistant Professor of IT",
        department: "Information Technology",
        email: "tuhin.shukla@jit.edu",
        phone: "(555) 100-0015",
        office: "IT Block, Room 207",
        bio: "Prof. Shukla specializes in system design and application development. He brings practical industry experience to the classroom.",
        image: "/faculty/d.png",
        research: "System Design, Programming, Cloud Computing",
        education: "MTech in IT, RGPV University",
        qualifications: "M.Tech (IT), B.Tech (IT)",
        experience: "7 years",
        publications: 16,
        researchProjects: 4,
        isPhdHolder: false
      },
      {
        id: 16,
        name: "Mrs. Varsha Sharma",
        title: "Assistant Professor of Computer Science",
        department: "Computer Science",
        email: "varsha.sharma@jit.edu",
        phone: "(555) 100-0016",
        office: "CS Block, Room 110",
        bio: "Prof. Sharma focuses on database management and web-based technologies. She has developed database systems for various applications.",
        image: "/faculty/d.png",
        research: "Databases, Web Technologies, Data Management",
        education: "MTech in Computer Science, RGPV University",
        qualifications: "M.Tech (CSE), B.Tech (CSE)",
        experience: "8 years",
        publications: 19,
        researchProjects: 5,
        isPhdHolder: false
      },
      {
        id: 17,
        name: "Mr. Vipin Verma",
        title: "Assistant Professor of Computer Science",
        department: "Computer Science",
        email: "vipin.verma@jit.edu",
        phone: "(555) 100-0017",
        office: "CS Block, Room 111",
        bio: "Prof. Verma teaches data structures and problem-solving with practical implementation skills. He has mentored students in competitive programming.",
        image: "/faculty/d.png",
        research: "Algorithms, Programming, Software Systems",
        education: "MTech in Computer Science, RGPV University",
        qualifications: "M.Tech (CSE), B.Tech (CSE)",
        experience: "10 years",
        publications: 22,
        researchProjects: 7,
        isPhdHolder: false
      },
      {
        id: 18,
        name: "Mr. Vivek Sharma",
        title: "Assistant Professor of Computer Science",
        department: "Computer Science",
        email: "vivek.rgpv@jit.edu",
        phone: "(555) 100-0018",
        office: "CS Block, Room 112",
        bio: "Prof. Vivek focuses on computer organization and RGPV-affiliated curriculum design. He has contributed to curriculum development.",
        image: "/faculty/d.png",
        research: "Computer Architecture, Academic Design, Programming",
        education: "MTech in Computer Science, RGPV University",
        qualifications: "M.Tech (CSE), B.Tech (CSE)",
        experience: "8 years",
        publications: 17,
        researchProjects: 4,
        isPhdHolder: false
      }
    ];
    
    setFaculty(facultyData);
    setFilteredFaculty(facultyData);
    
    // Calculate stats
    const departments = new Set(facultyData.map(f => f.department));
    const phdHolders = facultyData.filter(f => f.isPhdHolder).length;
    const researchAreas = new Set(facultyData.flatMap(f => f.research.split(', ')));
    
    setStats({
      total: facultyData.length,
      departments: departments.size,
      phdHolders,
      researchAreas: researchAreas.size
    });
  }, []);

  // Filter faculty based on search and department
  useEffect(() => {
    let results = faculty;
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      results = results.filter(facultyMember => 
        facultyMember.name.toLowerCase().includes(searchLower) ||
        facultyMember.department.toLowerCase().includes(searchLower) ||
        facultyMember.research.toLowerCase().includes(searchLower) ||
        facultyMember.title.toLowerCase().includes(searchLower)
      );
    }
    
    if (selectedDepartment !== 'all') {
      results = results.filter(facultyMember => 
        facultyMember.department === selectedDepartment
      );
    }
    
    setFilteredFaculty(results);
  }, [searchTerm, selectedDepartment, faculty]);

  // Get unique departments for filter dropdown
  const departments = [
    { value: 'all', label: 'All Departments' },
    ...Array.from(new Set(faculty.map(f => f.department))).map(dept => ({
      value: dept,
      label: dept
    }))
  ];

  // Close modal when clicking outside
  useEffect(() => {
    if (selectedFaculty) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedFaculty]);

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
      transition: 'transform 0.3s ease',
    },
    statNumber: {
      fontSize: '2rem',
      fontWeight: '800',
      color: '#1a237e',
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
      transition: 'border-color 0.3s ease',
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
      cursor: 'pointer',
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
      backgroundColor: '#1a237e',
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
    cardTitle: {
      color: '#1a237e',
      fontWeight: '600',
      marginBottom: '5px',
    },
    cardDepartment: {
      color: '#6b7280',
      fontSize: '0.9rem',
      marginBottom: '15px',
      backgroundColor: '#e8f0fe',
      padding: '4px 12px',
      borderRadius: '12px',
      display: 'inline-block',
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
    cardResearch: {
      color: '#4b5563',
      lineHeight: '1.6',
      fontSize: '0.9rem',
      marginBottom: '20px',
      textAlign: 'left',
      backgroundColor: '#f8fafc',
      padding: '12px',
      borderRadius: '8px',
      borderLeft: '3px solid #1a237e',
    },
    cardQualifications: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      fontSize: '0.8rem',
      color: '#6b7280',
      marginBottom: '15px',
    },
    cardActions: {
      display: 'flex',
      gap: '10px',
      width: '100%',
      marginTop: 'auto',
    },
    viewButton: {
      flex: 1,
      padding: '10px',
      backgroundColor: '#1a237e',
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
      gridColumn: '1 / -1',
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
      background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
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
      color: '#1a237e',
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
    profileTitle: {
      color: '#1a237e',
      fontWeight: '600',
      fontSize: '1.1rem',
      marginBottom: '5px',
      textAlign: 'center',
    },
    profileDepartment: {
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
      color: '#1a237e',
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
      paddingBottom: '10px',
      borderBottom: '2px solid #e5e7eb',
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
      color: '#1a237e',
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
    researchSection: {
      marginBottom: '30px',
    },
    researchTags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginTop: '10px',
    },
    researchTag: {
      backgroundColor: '#e8f0fe',
      color: '#1a237e',
      padding: '6px 12px',
      borderRadius: '15px',
      fontSize: '0.85rem',
      fontWeight: '500',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '15px',
      marginTop: '20px',
    },
    statItem: {
      backgroundColor: '#f8fafc',
      padding: '15px',
      borderRadius: '8px',
      textAlign: 'center',
      border: '1px solid #e5e7eb',
    },
    statItemValue: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1a237e',
      marginBottom: '5px',
    },
    statItemLabel: {
      fontSize: '0.8rem',
      color: '#6b7280',
      fontWeight: '500',
    },
    actionButtons: {
      display: 'flex',
      gap: '15px',
      marginTop: '30px',
    },
    profileEmailButton: {
      flex: 1,
      padding: '15px',
      backgroundColor: '#1a237e',
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
    profileCallButton: {
      flex: 1,
      padding: '15px',
      backgroundColor: '#00c853',
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

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Faculty Directory</h1>
        <p style={styles.headerSubtitle}>
          Meet our distinguished faculty members at UIT RGPV
        </p>
      </div>

      <div style={styles.content}>
        {/* Stats */}
        <div style={styles.stats}>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>{stats.total}</div>
            <div style={styles.statLabel}>Total Faculty</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>{stats.departments}</div>
            <div style={styles.statLabel}>Departments</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>{stats.phdHolders}</div>
            <div style={styles.statLabel}>PhD Holders</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>{stats.researchAreas}</div>
            <div style={styles.statLabel}>Research Areas</div>
          </div>
        </div>

        {/* Filters */}
        <div style={styles.filters}>
          <div style={styles.searchBox}>
            <Search size={20} style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by name, department, research area, or title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
              onFocus={(e) => e.target.style.borderColor = '#1a237e'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
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
        </div>

        {/* Faculty Grid */}
        <div style={styles.grid}>
          {filteredFaculty.map(facultyMember => (
            <div
              key={facultyMember.id}
              style={styles.card}
              onClick={() => setSelectedFaculty(facultyMember)}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
              }}
            >
              <img
                src={facultyMember.image}
                alt={facultyMember.name}
                style={styles.cardImage}
                onError={e => {
                  e.target.style.display = 'none';
                  const fallback = e.target.nextSibling;
                  if (fallback) {
                    fallback.style.display = 'flex';
                    fallback.textContent = facultyMember.name.split(' ').map(n => n[0]).join('');
                  }
                }}
              />
              <div style={styles.fallbackImage}>
                {facultyMember.name.split(' ').map(n => n[0]).join('')}
              </div>
              
              <h3 style={styles.cardName}>{facultyMember.name}</h3>
              <p style={styles.cardTitle}>{facultyMember.title}</p>
              <span style={styles.cardDepartment}>{facultyMember.department}</span>
              
              <div style={styles.cardDetails}>
                <div style={styles.detailItem}>
                  <BookOpen size={16} />
                  <span>{facultyMember.qualifications.split(',')[0]}</span>
                </div>
                <div style={styles.detailItem}>
                  <Briefcase size={16} />
                  <span>{facultyMember.experience} experience</span>
                </div>
                {facultyMember.isPhdHolder && (
                  <div style={styles.detailItem}>
                    <Award size={16} />
                    <span>PhD Holder</span>
                  </div>
                )}
              </div>
              
              <div style={styles.cardResearch}>
                <strong>Research:</strong> {facultyMember.research}
              </div>
              
              <div style={styles.cardActions}>
                <button
                  style={styles.viewButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFaculty(facultyMember);
                  }}
                  onMouseEnter={e => e.target.style.backgroundColor = '#283593'}
                  onMouseLeave={e => e.target.style.backgroundColor = '#1a237e'}
                >
                  View Profile
                </button>
                <button
                  style={styles.emailButton}
                  onClick={e => {
                    e.stopPropagation();
                    window.location.href = `mailto:${facultyMember.email}`;
                  }}
                  onMouseEnter={e => e.target.style.backgroundColor = '#e5e7eb'}
                  onMouseLeave={e => e.target.style.backgroundColor = '#f3f4f6'}
                >
                  <Mail size={16} /> Email
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredFaculty.length === 0 && (
          <div style={styles.noResults}>
            <div style={{ fontSize: '3rem' }}>🔍</div>
            <h3>No faculty members found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Scrollable Profile Panel */}
      {selectedFaculty && (
        <div style={styles.overlay} onClick={() => setSelectedFaculty(null)}>
          <div style={styles.profilePanel} onClick={e => e.stopPropagation()}>
            {/* Close Button */}
            <button style={styles.closeButton} onClick={() => setSelectedFaculty(null)}>
              <X size={24} />
            </button>

            {/* Profile Image */}
            <div style={styles.profileImageContainer}>
              <img
                src={selectedFaculty.image}
                alt={selectedFaculty.name}
                style={styles.profileImage}
                onError={e => {
                  e.target.style.display = 'none';
                  const fallback = e.target.nextSibling;
                  if (fallback) {
                    fallback.style.display = 'flex';
                    fallback.textContent = selectedFaculty.name.split(' ').map(n => n[0]).join('');
                  }
                }}
              />
              <div style={styles.profileFallback}>
                {selectedFaculty.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>

            {/* Profile Content - Scrollable */}
            <div style={styles.profileContent}>
              <h2 style={styles.profileName}>{selectedFaculty.name}</h2>
              <p style={styles.profileTitle}>{selectedFaculty.title}</p>
              <p style={styles.profileDepartment}>{selectedFaculty.department}</p>

              {/* Badges */}
              <div style={styles.badges}>
                <span style={styles.badge}>
                  {selectedFaculty.isPhdHolder ? 'PhD Holder' : 'Masters'}
                </span>
                <span style={styles.badge}>
                  {selectedFaculty.experience} Experience
                </span>
                <span style={styles.badge}>
                  {selectedFaculty.publications} Publications
                </span>
              </div>

              {/* Contact Details */}
              <div style={styles.detailsSection}>
                <h3 style={styles.sectionTitle}>Contact Details</h3>
                <div style={styles.detailGrid}>
                  <div style={styles.detailCard}>
                    <Mail size={20} style={styles.detailIcon} />
                    <div>
                      <div style={styles.detailLabel}>Email</div>
                      <div style={styles.detailValue}>{selectedFaculty.email}</div>
                    </div>
                  </div>
                  
                  <div style={styles.detailCard}>
                    <Phone size={20} style={styles.detailIcon} />
                    <div>
                      <div style={styles.detailLabel}>Phone</div>
                      <div style={styles.detailValue}>{selectedFaculty.phone}</div>
                    </div>
                  </div>
                  
                  <div style={styles.detailCard}>
                    <MapPin size={20} style={styles.detailIcon} />
                    <div>
                      <div style={styles.detailLabel}>Office</div>
                      <div style={styles.detailValue}>{selectedFaculty.office}</div>
                    </div>
                  </div>
                  
                  <div style={styles.detailCard}>
                    <GraduationCap size={20} style={styles.detailIcon} />
                    <div>
                      <div style={styles.detailLabel}>Education</div>
                      <div style={styles.detailValue}>{selectedFaculty.education}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Qualifications */}
              <div style={styles.detailsSection}>
                <h3 style={styles.sectionTitle}>Qualifications</h3>
                <div style={styles.bioText}>
                  {selectedFaculty.qualifications}
                </div>
              </div>

              {/* Bio Section */}
              <div style={styles.bioSection}>
                <h3 style={styles.sectionTitle}>Professional Bio</h3>
                <p style={styles.bioText}>{selectedFaculty.bio}</p>
              </div>

              {/* Research Section */}
              <div style={styles.researchSection}>
                <h3 style={styles.sectionTitle}>Research Interests</h3>
                <div style={styles.researchTags}>
                  {selectedFaculty.research.split(', ').map((area, index) => (
                    <span key={index} style={styles.researchTag}>
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div style={styles.detailsSection}>
                <h3 style={styles.sectionTitle}>Academic Statistics</h3>
                <div style={styles.statsGrid}>
                  <div style={styles.statItem}>
                    <div style={styles.statItemValue}>{selectedFaculty.experience}</div>
                    <div style={styles.statItemLabel}>Years of Experience</div>
                  </div>
                  <div style={styles.statItem}>
                    <div style={styles.statItemValue}>{selectedFaculty.publications}</div>
                    <div style={styles.statItemLabel}>Publications</div>
                  </div>
                  <div style={styles.statItem}>
                    <div style={styles.statItemValue}>{selectedFaculty.researchProjects}</div>
                    <div style={styles.statItemLabel}>Research Projects</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={styles.actionButtons}>
                <button
                  style={styles.profileEmailButton}
                  onClick={() => window.location.href = `mailto:${selectedFaculty.email}`}
                  onMouseEnter={e => e.target.style.backgroundColor = '#283593'}
                  onMouseLeave={e => e.target.style.backgroundColor = '#1a237e'}
                >
                  <Mail size={20} />
                  Send Email
                </button>
                <button
                  style={styles.profileCallButton}
                  onClick={() => window.location.href = `tel:${selectedFaculty.phone.replace(/\D/g, '')}`}
                  onMouseEnter={e => e.target.style.backgroundColor = '#00e676'}
                  onMouseLeave={e => e.target.style.backgroundColor = '#00c853'}
                >
                  <Phone size={20} />
                  Call Office
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyPage;