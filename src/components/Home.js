import React, { useState, useEffect } from 'react';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeDept, setActiveDept] = useState("csbs");

  // Slides data for hero slider
  const slides = [
    {
      id: 1,
      title: "Our Beautiful Campus",
      subtitle: "Where learning meets innovation",
      image: "/images/rgpv2.png",
    },
    {
      id: 2,
      title: "School of Information Technology",
      subtitle: "Shaping the engineers of tomorrow",
      image: "/images/soit.png",
    },
    {
      id: 3,
      title: "Welcome to SOIT RGPV, Bhopal",
      subtitle: "Empowering Minds. Building Futures.",
      image: "/images/rgpv1.png",
    },
    {
      id: 4,
      title: "Welcome to SOIT RGPV, Bhopal",
      subtitle: "Empowering Minds. Building Futures.",
      image: "/faculty/faculty.jpg",
    },
   
  ];

  // Department data
  const departmentList = [
    {
      id: "csbs",
      name: "CSBS",
      fullName: "Computer Science & Business Systems",
      description: "Integrating computer science with business systems for industry-ready professionals",
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      facultyCount: 16,
    },
    {
      id: "aiml",
      name: "AIML",
      fullName: "Artificial Intelligence & Machine Learning",
      description: "Pioneering the future of intelligent systems and automated decision-making",
      image: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      facultyCount: 14,
    },
    {
      id: "cse-ds",
      name: "CSE-DS",
      fullName: "Computer Science Engineering - Data Science",
      description: "Harnessing the power of data to drive insights and innovation",
      image: "https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      facultyCount: 15,
    },
   {
  id: "mtech-cseds",
  name: "M.Tech ",
  fullName: "Master of Technology in Computer Science Engineering - Data Science",
  description: "Advancing expertise in data-driven computing, analytics, and intelligent systems.",
  image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  facultyCount: 10,
}
  ];

  // Notices data
  const notices = [
    { id: 1, text: "Alumni Meet 2025 registrations now open!", link: "/events" },
    { id: 2, text: "New job opportunities for SOIT graduates", link: "/opportunities" },
    { id: 3, text: "SOIT Annual Reunion: 15th June 2025", link: "/events" },
  ];

  const facultyData = [
  {
    id: 1,
    name: "Dr. Jitendra Agrawal",
    position: "Director & Head of Department",
    department: "School of Information Technology",
    qualification: "Ph.D. in Computer Science",
    experience: "27+ Years",
    specialization: "Data Mining, Soft Computing, Machine Learning, Information Security",
    email: "jitendra.agrawal@rgtu.net",
    phone: "+91-755-2678812",
    image: "/faculty/hod.png",
    achievements: [
      "Best Teacher Award by World Education Congress",
      "60+ Research Papers Published",
      "Guided 4 PhD Scholars",
      "7 Books Published",
      "05 Patents Filed"
    ],
    research: ["Data Mining", "Machine Learning", "Information Security", "Soft Computing"],
  },
  {
    id: 2,
    name: "Dr. Sanjeev Sharma",
    position: "Dean of Faculty & Professor",
    department: "Computer Science & Engineering",
    qualification: "Ph.D. in Computer Engineering",
    experience: "22+ Years",
    specialization: "Mobile Computing, Data Mining, Social Media Analytics",
    email: "sanjeev.sharma@rgtu.net",
    phone: "+91-755-2678813",
    image: "/faculty/dean.png",
    achievements: [
      "Research Paper Award at International Conference",
      "40+ Research Papers Published",
      "Guided 3 PhD Scholars",
      "Project Consultant for Govt. Projects"
    ],
    research: ["Mobile Computing", "Social Media Analytics", "Big Data", "Cloud Computing"],
  },
  
];

  // Enhanced Alumni Data with more details
const alumniData = [
  {
    id: "1",
    name: "Harshay  Bairagi",
    email: "harshay.bairagi@example.com",
    graduationYear: 2025,
    department: "CSE",
    degree: "B.Tech in Computer Science",
    achievement: "AIR 234 in GATE CSE 2025",
    jobTitle: "GATE Topper",
    company: "—",
    linkedinUrl: "https://linkedin.com/in/harshaybairagi",
    location: "Bhopal, India",
    bio: "Secured AIR 234 in GATE CSE 2025. Known for consistent academic excellence and passion for computer science.",
    profileImage: "/alumni/Harshay.png",
    skills: ["Data Structures", "Algorithms", "Problem Solving", "C++", "Operating Systems"],
  },
  {
    id: "2",
    name: "Amar Raj Singh",
    email: "amar.raj.singh@example.com",
    graduationYear: 2020,
    department: "Humanities",
    degree: "B.Tech in Information Technology",
    achievement: "Qualified UPSC Civil Services Examination",
    jobTitle: "IAS Officer (Trainee)",
    company: "Government of India",
    linkedinUrl: "https://linkedin.com/in/amarrjsingh",
    location: "New Delhi, India",
    bio: "Cracked the prestigious UPSC Civil Services Exam through hard work and determination. Dedicated to public service and policy reform.",
    profileImage: "/alumni/Amar.png",
    skills: ["Public Policy", "Administration", "Leadership", "Ethics"],
  },
  {
    id: "3",
    name: "Yati Vishnoi",
    email: "yati.vishnoi@example.com",
    graduationYear: 2019,
    department: "CSE",
    degree: "B.Tech in Computer Science",
    jobTitle: "Software Development Engineer II",
    company: "Google",
    linkedinUrl: "https://linkedin.com/in/yativishnoi",
    location: "Bangalore, India",
    bio: "Currently working as SDE 2 at Google. Passionate about scalable software design and machine learning applications.",
    profileImage: "/alumni/yati.png",
    skills: ["Java", "Python", "System Design", "Machine Learning", "Cloud Computing"],
  },
];


  // Stats data
  const stats = [
    { icon: "🎓", value: "2,500+", label: "Alumni Worldwide" },
    { icon: "🏢", value: "150+", label: "Partner Companies" },
    { icon: "🌎", value: "35+", label: "Countries" },
    { icon: "📊", value: "95%", label: "Placement Rate" },
  ];

  // Testimonials data
  const testimonials = [
  {
    id: 1,
    name: "Dr. Shikha Agrawal",
    role: "Director",
    department: "Training and Placement Department",
    organization: "Rajiv Gandhi Proudyogiki Vishwavidyalaya, Bhopal, Madhya Pradesh",
    content:
      "We take immense pride in our alumni who continue to achieve excellence across industries. Their success reflects the strong foundation laid here at RGPV.",
    image:
     "/faculty/tnp.png",
  },
  {
    id: 2,
    name: "Dr. Jitendra Agrawal",
    role: "Professor & HOD",
    department: "Computer Science",
    organization: "School of Information Technology, RGPV",
    content:
      "Our alumni network has been instrumental in creating opportunities for current students through mentorship and placement support.",
    image:
      "/faculty/hod.png",
  },
  {
    id: 3,
    name: "Tuhin Shukla",
    role: "Alumni Coordinator",
    department: "SOIT",
    organization: "Rajiv Gandhi Proudyogiki Vishwavidyalaya, Bhopal",
    content:
      "The alumni portal has significantly improved engagement and networking among graduates. It’s inspiring to see our alumni give back to the institute community.",
    image:
     "/faculty/tuhin_mam.png",
  },
 
];


  // Auto-play slider every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Handler for department button clicks
  const handleDeptClick = (deptId) => {
    setActiveDept(deptId);
  };

  // Handler for links
  const handleLinkClick = (href) => {
    window.location.href = href;
  };

  // Find active department
  const activeDepartment = departmentList.find(dept => dept.id === activeDept);

  return (
    <div style={{ width: '100%', margin: 0, padding: 0, fontFamily: 'Arial, sans-serif' }}>
      {/* 1. Hero Slider - Full Width Fade Effect */}
      <section 
        style={{
          position: 'relative',
          height: '600px',
          width: '100%',
          overflow: 'hidden',
          margin: 0,
          padding: 0,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              transition: 'opacity 1s ease-in-out',
              opacity: index === currentSlide ? 1 : 0,
              zIndex: index === currentSlide ? 1 : 0,
            }}
          >
            {/* Dark Overlay */}
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(17, 24, 39, 0.4)',
                zIndex: 10,
              }}
            />

            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 0,
              }}
            />

            {/* Text Overlay */}
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: 'white',
                padding: '0 16px',
              }}
            >
              <div style={{ maxWidth: '100%' }}>
                <h1 
                  style={{
                    fontSize: 'clamp(2rem, 5vw, 3rem)',
                    fontWeight: 'bold',
                    marginBottom: '16px',
                    lineHeight: 1.2,
                  }}
                >
                  {slide.title}
                </h1>
                <p 
                  style={{
                    fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    marginBottom: '32px',
                    lineHeight: 1.4,
                    maxWidth: '600px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  {slide.subtitle}
                </p>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button
                    onClick={() => handleLinkClick('/alumni')}
                    style={{
                      backgroundColor: '#0a4a7a',
                      color: 'white',
                      padding: '12px 24px',
                      fontSize: '1rem',
                      fontWeight: '500',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease',
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#082e4d'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#0a4a7a'}
                  >
                    👥 Visit Alumni Portal
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Dots */}
        <div 
          style={{
            position: 'absolute',
            bottom: '24px',
            left: 0,
            right: 0,
            zIndex: 30,
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: currentSlide === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. Notices/News Section - Light Background */}
      <section 
        style={{
          backgroundColor: 'rgba(10, 74, 122, 0.05)',
          padding: '16px 0',
          width: '100%',
        }}
      >
        <div 
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <h2 
            style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#0a4a7a',
              display: 'flex',
              alignItems: 'center',
              margin: 0,
            }}
          >
            📅 Notices & News
          </h2>
          <ul 
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '32px 8px',
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            {notices.map((notice) => (
              <li key={notice.id} style={{ margin: 0 }}>
                <button
                  onClick={() => handleLinkClick(notice.link)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#0a4a7a',
                    textDecoration: 'none',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.2s ease',
                    fontSize: '0.875rem',
                  }}
                  onMouseOver={(e) => e.target.style.color = '#082e4d'}
                  onMouseOut={(e) => e.target.style.color = '#0a4a7a'}
                >
                  ➡️ {notice.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Departments Section - White Background with Tabs */}
      <section 
  style={{
    padding: '80px 0',
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    width: '100%',
  }}
>
  <div 
    style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px',
    }}
  >
    {/* Section Header */}
    <div 
      style={{
        textAlign: 'center',
        marginBottom: '60px',
      }}
    >
      <h2 
        style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          margin: '0 auto',
          color: '#0a4a7a',
          background: 'linear-gradient(135deg, #0a4a7a 0%, #082e4d 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        <span style={{ fontSize: '2rem' }}>🎓</span>
        Academic Departments
      </h2>
      <p 
        style={{
          fontSize: '1.125rem',
          color: '#64748b',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: 1.6,
        }}
      >
        Discover our specialized departments offering cutting-edge programs in emerging technologies with industry-aligned curriculum
      </p>
    </div>

    {/* Department Tabs */}
    <div 
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '12px',
        marginBottom: '48px',
      }}
    >
      {departmentList.map((dept) => (
        <button
          key={dept.id}
          onClick={() => handleDeptClick(dept.id)}
          style={{
            padding: '12px 24px',
            borderRadius: '50px',
            transition: 'all 0.3s ease',
            fontWeight: '600',
            cursor: 'pointer',
            border: '2px solid transparent',
            backgroundColor: activeDept === dept.id ? '#0a4a7a' : 'white',
            color: activeDept === dept.id ? 'white' : '#475569',
            boxShadow: activeDept === dept.id 
              ? '0 8px 20px rgba(10, 74, 122, 0.3)' 
              : '0 2px 8px rgba(0, 0, 0, 0.05)',
            transform: activeDept === dept.id ? 'translateY(-2px)' : 'translateY(0)',
          }}
          onMouseOver={(e) => {
            if (activeDept !== dept.id) {
              e.target.style.backgroundColor = '#e2e8f0';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }
          }}
          onMouseOut={(e) => {
            if (activeDept !== dept.id) {
              e.target.style.backgroundColor = 'white';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
            }
          }}
        >
          {dept.name}
        </button>
      ))}
    </div>

    {/* Active Department Content */}
    {activeDepartment && (
      <div 
        style={{
          borderRadius: '20px',
          overflow: 'hidden',
          backgroundColor: 'white',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0',
          transition: 'all 0.3s ease',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.1)';
        }}
      >
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0',
            minHeight: '400px',
          }}
        >
          {/* Department Image */}
          <div 
            style={{
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <img
              src={activeDepartment.image}
              alt={`${activeDepartment.name} Department`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
              }}
            />
            <div 
              style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                right: '0',
                background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                padding: '20px',
                color: 'white',
              }}
            >
              <span 
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  backdropFilter: 'blur(10px)',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                }}
              >
                👥 {activeDepartment.facultyCount} Faculty Members
              </span>
            </div>
          </div>

          {/* Department Details */}
          <div 
            style={{
              padding: '48px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <h3 
              style={{
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: '16px',
                color: '#0a4a7a',
                lineHeight: 1.3,
              }}
            >
              {activeDepartment.fullName}
            </h3>
            <p 
              style={{
                color: '#64748b',
                marginBottom: '24px',
                lineHeight: 1.6,
                fontSize: '1.1rem',
              }}
            >
              {activeDepartment.description}
            </p>

            {/* Department Features */}
            {activeDepartment.features && (
              <div style={{ marginBottom: '32px' }}>
                <h4 
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '12px',
                  }}
                >
                  Key Features:
                </h4>
                <div 
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '8px',
                  }}
                >
                  {activeDepartment.features.slice(0, 4).map((feature, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#64748b',
                        fontSize: '0.9rem',
                      }}
                    >
                      <span style={{ color: '#10b981', fontSize: '1.1rem' }}>✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div 
              style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
              }}
            >
              <button
                onClick={() => handleLinkClick(`/departments/${activeDepartment.id}`)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#0a4a7a',
                  color: 'white',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(10, 74, 122, 0.3)',
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#082e4d';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(10, 74, 122, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#0a4a7a';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(10, 74, 122, 0.3)';
                }}
              >
                Explore Department
                <span style={{ fontSize: '1.1rem' }}>→</span>
              </button>
              <button
                onClick={() => handleLinkClick('/admissions')}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: '2px solid #0a4a7a',
                  backgroundColor: 'transparent',
                  color: '#0a4a7a',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#0a4a7a';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#0a4a7a';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Admission Info
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
</section>

      {/* 4. Institutional Excellence Section */}
<section 
  style={{
    padding: '60px 0',
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    width: '100%',
  }}
>
  <div 
    style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px',
    }}
  >
    {/* Section Header */}
    <div 
      style={{
        textAlign: 'center',
        marginBottom: '40px',
      }}
    >
      <h2 
        style={{
          fontSize: '2rem',
          fontWeight: '700',
          marginBottom: '12px',
          color: '#0a4a7a',
        }}
      >
        📊 Our Achievements
      </h2>
      <p 
        style={{
          fontSize: '1rem',
          color: '#64748b',
          maxWidth: '500px',
          margin: '0 auto',
          lineHeight: 1.5,
        }}
      >
        Celebrating excellence through our global alumni community
      </p>
    </div>

    {/* Stats Grid */}
    <div 
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px',
      }}
    >
      {stats.map((stat, index) => (
        <div
          key={index}
          style={{
            background: 'white',
            padding: '24px 20px',
            borderRadius: '12px',
            textAlign: 'center',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
            e.currentTarget.style.borderColor = '#0a4a7a';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
            e.currentTarget.style.borderColor = '#e2e8f0';
          }}
        >
          {/* Stat Icon */}
          <div 
            style={{
              width: '50px',
              height: '50px',
              margin: '0 auto 16px',
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              border: '1px solid #e0f2fe',
            }}
          >
            {stat.icon}
          </div>
          
          {/* Stat Value */}
          <div 
            style={{
              fontSize: '1.75rem',
              fontWeight: '700',
              color: '#0a4a7a',
              marginBottom: '8px',
              lineHeight: '1',
            }}
          >
            {stat.value}
          </div>
          
          {/* Stat Label */}
          <div 
            style={{
              color: '#374151',
              fontSize: '0.9rem',
              fontWeight: '600',
              marginBottom: '4px',
            }}
          >
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* 5. Featured Alumni Section */}
<section 
  style={{
    backgroundColor: 'white',
    padding: '60px 0',
    width: '100%',
  }}
>
  <div 
    style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px',
    }}
  >
    <div 
      style={{
        marginBottom: '40px',
        textAlign: 'center',
      }}
    >
      <h2 
        style={{
          marginBottom: '12px',
          fontSize: '2rem',
          fontWeight: '700',
          color: '#0a4a7a',
        }}
      >
        🌟 Featured Alumni
      </h2>
      <p 
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          color: '#64748b',
          fontSize: '1rem',
          lineHeight: '1.5',
        }}
      >
        Meet our distinguished alumni making significant contributions in their fields
      </p>
    </div>

    {/* Alumni Grid */}
    <div 
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
        marginBottom: '40px',
      }}
    >
      {alumniData.map((alumni) => (
        <div
          key={alumni.id}
          style={{
            background: 'white',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.3s ease',
            overflow: 'hidden',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
          }}
        >
          <div style={{ padding: '24px' }}>
            {/* Profile Header */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                marginBottom: '16px',
              }}
            >
              <div 
                style={{
                  width: '60px',
                  height: '60px',
                  flexShrink: 0,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid #0a4a7a',
                }}
              >
                <img
                  src={alumni.profileImage}
                  alt={alumni.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <h3 
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#0a4a7a',
                    margin: '0 0 4px 0',
                  }}
                >
                  {alumni.name}
                </h3>
                <p 
                  style={{
                    fontSize: '0.9rem',
                    color: '#2563eb',
                    fontWeight: '500',
                    margin: '0 0 2px 0',
                  }}
                >
                  {alumni.jobTitle} at {alumni.company}
                </p>
                <p 
                  style={{
                    fontSize: '0.8rem',
                    color: '#64748b',
                    margin: '0',
                  }}
                >
                  {alumni.degree} • {alumni.graduationYear}
                </p>
              </div>
            </div>

            {/* Bio */}
            <p 
              style={{
                marginBottom: '16px',
                color: '#4b5563',
                fontSize: '0.85rem',
                lineHeight: '1.5',
              }}
            >
              {alumni.bio}
            </p>

            {/* Skills */}
            <div style={{ marginBottom: '16px' }}>
              <div 
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                }}
              >
                {alumni.skills.slice(0, 4).map((skill, index) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: '#eff6ff',
                      color: '#1e40af',
                      padding: '4px 8px',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div 
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid #e2e8f0',
                paddingTop: '16px',
              }}
            >
              <button
                onClick={() => handleLinkClick(alumni.linkedinUrl)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#0077b5',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '0.8rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#005885'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#0077b5'}
              >
                <span style={{ marginRight: '4px' }}>🔗</span>
                LinkedIn
              </button>
              <button
                onClick={() => handleLinkClick('/alumni')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#0a4a7a',
                  background: 'none',
                  border: 'none',
                  fontSize: '0.8rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                }}
                onMouseOver={(e) => e.target.style.color = '#082e4d'}
                onMouseOut={(e) => e.target.style.color = '#0a4a7a'}
              >
                View Profile
                <span style={{ marginLeft: '4px' }}>→</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* View All Button */}
    <div 
      style={{
        textAlign: 'center',
      }}
    >
      <button
        onClick={() => handleLinkClick('/alumni')}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          borderRadius: '8px',
          backgroundColor: '#0a4a7a',
          padding: '10px 24px',
          fontSize: '0.9rem',
          fontWeight: '600',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#082e4d';
          e.target.style.transform = 'translateY(-2px)';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#0a4a7a';
          e.target.style.transform = 'translateY(0)';
        }}
      >
        Explore All Alumni
        <span style={{ marginLeft: '8px' }}>🎓</span>
      </button>
    </div>
  </div>
</section>

      {/* 6. Testimonials Section */}
      <section 
        style={{
          backgroundColor: 'white',
          padding: '64px 0',
          width: '100%',
        }}
      >
        <div 
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 16px',
          }}
        >
          <div 
            style={{
              textAlign: 'center',
              marginBottom: '48px',
            }}
          >
            <h2 
              style={{
                fontSize: '1.875rem',
                fontWeight: 'bold',
                color: '#0a4a7a',
                marginBottom: '16px',
              }}
            >
              What Our Alumni Say
            </h2>
            <p 
              style={{
                maxWidth: '672px',
                margin: '0 auto',
                color: '#6b7280',
                fontSize: '1rem',
                lineHeight: '1.5',
              }}
            >
              Hear from our alumni community about their experiences and success stories
            </p>
            <div 
              style={{
                display: window.innerWidth <= 1024 ? 'block' : 'none',
                marginTop: '12px',
                fontSize: '0.875rem',
                color: '#0a4a7a',
                fontWeight: '500',
              }}
            >
              ← Swipe to see more →
            </div>
          </div>

          {/* Testimonials Grid */}
          <div 
            className="testimonials-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px',
            }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="testimonial-card"
                style={{
                  backgroundColor: '#f9fafb',
                  padding: '32px',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  textAlign: 'center',
                }}
              >
                <div 
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    margin: '0 auto 16px',
                    border: '3px solid #0a4a7a',
                  }}
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <p 
                  style={{
                    color: '#4b5563',
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    marginBottom: '16px',
                    fontStyle: 'italic',
                  }}
                >
                  "{testimonial.content}"
                </p>
                <div>
                  <h4 
                    style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: '#0a4a7a',
                      margin: '0',
                    }}
                  >
                    {testimonial.name}
                  </h4>
                  <p 
                    style={{
                      color: '#6b7280',
                      fontSize: '0.875rem',
                      margin: '4px 0 0 0',
                    }}
                  >
                    {testimonial.role}
                    {testimonial.department && ` • ${testimonial.department}`}
                    {testimonial.company && ` • ${testimonial.company}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA Section */}
      <section 
        style={{
          backgroundColor: '#0a4a7a',
          padding: '64px 0',
          width: '100%',
        }}
      >
        <div 
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 16px',
            textAlign: 'center',
          }}
        >
          <h2 
            style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '16px',
            }}
          >
            Join Our Alumni Network
          </h2>
          <p 
            style={{
              fontSize: '1.125rem',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '32px',
              lineHeight: '1.6',
            }}
          >
            Connect with fellow graduates, access exclusive resources, and stay updated with the latest developments at the School of Information Technology.
          </p>
          <div 
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={() => handleLinkClick('/add-alumni')}
              style={{
                backgroundColor: '#e67e22',
                color: 'white',
                padding: '12px 24px',
                fontSize: '1rem',
                fontWeight: '500',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                boxShadow: '0 4px 6px -1px rgba(230, 126, 34, 0.2)',
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#d35400'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#e67e22'}
            >
              Sign Up Now
            </button>
            <button
              onClick={() => handleLinkClick('/admin/login')}
              style={{
                backgroundColor: 'transparent',
                color: 'white',
                padding: '12px 24px',
                fontSize: '1rem',
                fontWeight: '500',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backdropFilter: 'blur(8px)',
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              Login
            </button>
          </div>
        </div>
      </section>

      {/* 8. Faculty & Leadership Section */}
{/* 8. Faculty & Leadership Section */}
<section 
  style={{
    padding: '80px 0',
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    width: '100%',
  }}
>
  <div 
    style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px',
    }}
  >
    {/* Section Header */}
    <div 
      style={{
        textAlign: 'center',
        marginBottom: '60px',
      }}
    >
      <h2 
        style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          margin: '0 auto',
          color: '#0a4a7a',
          background: 'linear-gradient(135deg, #0a4a7a 0%, #082e4d 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        <span style={{ fontSize: '2rem' }}>👨‍🏫</span>
        Faculty & Leadership
      </h2>
      <p 
        style={{
          fontSize: '1.125rem',
          color: '#64748b',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: 1.6,
        }}
      >
        Meet our distinguished faculty members and academic leadership at School of Information Technology, RGPV Bhopal
      </p>
    </div>

    {/* Faculty Grid */}
    <div 
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
        gap: '32px',
        marginBottom: '60px',
      }}
    >
      {facultyData.map((faculty) => (
        <div
          key={faculty.id}
          style={{
            background: 'white',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
            transition: 'all 0.3s ease',
            overflow: 'hidden',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.15)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
          }}
        >
          {/* Faculty Header with Image and Basic Info */}
          <div 
            style={{
              padding: '32px 32px 24px',
              borderBottom: '1px solid #f1f5f9',
              display: 'flex',
              gap: '20px',
              alignItems: 'flex-start',
            }}
          >
            <div 
              style={{
                position: 'relative',
                flexShrink: 0,
              }}
            >
              <div 
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '3px solid #0a4a7a',
                  backgroundColor: '#f8fafc',
                }}
              >
                <img
                  src={faculty.image}
                  alt={faculty.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div 
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#64748b',
                    fontSize: '2rem',
                    display: 'none'
                  }}
                >
                  👨‍🏫
                </div>
              </div>
              <div 
                style={{
                  position: 'absolute',
                  bottom: '-8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#0a4a7a',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  whiteSpace: 'nowrap',
                }}
              >
                {faculty.experience}
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <h3 
                style={{
                  fontSize: '1.375rem',
                  fontWeight: '700',
                  color: '#0a4a7a',
                  margin: '0 0 8px 0',
                  lineHeight: 1.3,
                }}
              >
                {faculty.name}
              </h3>
              <p 
                style={{
                  color: '#2563eb',
                  fontWeight: '600',
                  margin: '0 0 4px 0',
                  fontSize: '1rem',
                }}
              >
                {faculty.position}
              </p>
              <p 
                style={{
                  color: '#64748b',
                  margin: '0 0 4px 0',
                  fontSize: '0.9rem',
                }}
              >
                {faculty.department}
              </p>
              <p 
                style={{
                  color: '#94a3b8',
                  margin: '0',
                  fontSize: '0.85rem',
                }}
              >
                {faculty.qualification}
              </p>
            </div>
          </div>

          {/* Faculty Details */}
          <div style={{ padding: '24px 32px' }}>
            {/* Specialization */}
            <div style={{ marginBottom: '20px' }}>
              <div 
                style={{
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px',
                }}
              >
                Specialization:
              </div>
              <div 
                style={{
                  color: '#64748b',
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                }}
              >
                {faculty.specialization}
              </div>
            </div>

            {/* Research Areas */}
            <div style={{ marginBottom: '20px' }}>
              <div 
                style={{
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px',
                }}
              >
                Research Areas:
              </div>
              <div 
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                }}
              >
                {faculty.research.map((area, index) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: '#eff6ff',
                      color: '#1e40af',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      border: '1px solid #dbeafe',
                    }}
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Achievements */}
            <div>
              <div 
                style={{
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px',
                }}
              >
                Key Achievements:
              </div>
              <ul 
                style={{
                  paddingLeft: '16px',
                  margin: '0',
                  color: '#64748b',
                  fontSize: '0.85rem',
                  lineHeight: 1.5,
                }}
              >
                {faculty.achievements.slice(0, 2).map((achievement, index) => (
                  <li key={index} style={{ marginBottom: '4px' }}>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Faculty Contact */}
          <div 
            style={{
              padding: '20px 32px',
              backgroundColor: '#f8fafc',
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                fontSize: '0.8rem',
                color: '#64748b',
              }}
            >
              <span>📧 {faculty.email}</span>
              <span>📞 {faculty.phone}</span>
            </div>
            <button
              onClick={() => handleLinkClick(`/faculty/${faculty.id}`)}
              style={{
                color: '#0a4a7a',
                background: 'none',
                border: 'none',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
              onMouseOver={(e) => {
                e.target.style.color = '#082e4d';
                e.target.style.transform = 'translateX(2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.color = '#0a4a7a';
                e.target.style.transform = 'translateX(0)';
              }}
            >
              View Profile
              <span style={{ fontSize: '1rem' }}>→</span>
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* Academic Statistics */}
    <div 
      style={{
        background: 'white',
        padding: '40px',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        marginBottom: '48px',
      }}
    >
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '32px',
          textAlign: 'center',
        }}
      >
        <div>
          <div 
            style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#0a4a7a',
              marginBottom: '8px',
              background: 'linear-gradient(135deg, #0a4a7a 0%, #2563eb 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            25+
          </div>
          <div 
            style={{
              color: '#64748b',
              fontSize: '1rem',
              fontWeight: '500',
            }}
          >
            Faculty Members
          </div>
        </div>
        <div>
          <div 
            style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#0a4a7a',
              marginBottom: '8px',
              background: 'linear-gradient(135deg, #0a4a7a 0%, #2563eb 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            60+
          </div>
          <div 
            style={{
              color: '#64748b',
              fontSize: '1rem',
              fontWeight: '500',
            }}
          >
            Research Papers
          </div>
        </div>
        <div>
          <div 
            style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#0a4a7a',
              marginBottom: '8px',
              background: 'linear-gradient(135deg, #0a4a7a 0%, #2563eb 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            27+
          </div>
          <div 
            style={{
              color: '#64748b',
              fontSize: '1rem',
              fontWeight: '500',
            }}
          >
            Years Experience
          </div>
        </div>
        <div>
          <div 
            style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#0a4a7a',
              marginBottom: '8px',
              background: 'linear-gradient(135deg, #0a4a7a 0%, #2563eb 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            05
          </div>
          <div 
            style={{
              color: '#64748b',
              fontSize: '1rem',
              fontWeight: '500',
            }}
          >
            Patents Filed
          </div>
        </div>
      </div>
    </div>

    {/* View All Button */}
    <div 
      style={{
        textAlign: 'center',
      }}
    >
      <button
        onClick={() => handleLinkClick('/faculty')}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          borderRadius: '8px',
          backgroundColor: 'transparent',
          padding: '12px 32px',
          fontSize: '1rem',
          fontWeight: '600',
          color: '#0a4a7a',
          border: '2px solid #0a4a7a',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#0a4a7a';
          e.target.style.color = 'white';
          e.target.style.transform = 'translateY(-2px)';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = 'transparent';
          e.target.style.color = '#0a4a7a';
          e.target.style.transform = 'translateY(0)';
        }}
      >
        View Complete Faculty Directory
        <span style={{ marginLeft: '12px', fontSize: '1.125rem' }}>→</span>
      </button>
    </div>
  </div>
</section>

      {/* Responsive Styles for Mobile and Tablet */}
      <style>
        {`
          /* Mobile First - Base styles for mobile */
          .hero-slider {
            height: 400px !important;
          }
          
          .notices-container {
            flex-direction: column !important;
            text-align: center !important;
            gap: 12px !important;
            padding: 12px !important;
          }
          
          .notices-list {
            justify-content: center !important;
            flex-direction: column !important;
            gap: 8px !important;
          }
          
          .department-tabs {
            gap: 4px !important;
            padding: 16px !important;
          }
          
          .tab-button {
            padding: 8px 16px !important;
            font-size: 0.875rem !important;
          }

          .alumni-grid {
            display: flex !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            justify-content: center !important;
            gap: 20px !important;
            padding: 20px !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: thin !important;
            scrollbar-color: #0a4a7a #f1f5f9 !important;
          }

          .alumni-grid::-webkit-scrollbar {
            height: 6px !important;
          }

          .alumni-grid::-webkit-scrollbar-track {
            background: #f1f5f9 !important;
            border-radius: 3px !important;
          }

          .alumni-grid::-webkit-scrollbar-thumb {
            background: #0a4a7a !important;
            border-radius: 3px !important;
          }

          .alumni-grid::-webkit-scrollbar-thumb:hover {
            background: #082e4d !important;
          }

          .alumni-card {
            flex: 0 0 280px !important;
            padding: 16px !important;
            scroll-snap-align: start !important;
          }

          .alumni-profile {
            flex-direction: column !important;
            text-align: center !important;
            gap: 12px !important;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
            padding: 20px !important;
          }

          .testimonials-grid {
            display: flex !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            gap: 20px !important;
            padding: 20px !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: thin !important;
            scrollbar-color: #0a4a7a #f1f5f9 !important;
          }

          .testimonials-grid::-webkit-scrollbar {
            height: 6px !important;
          }

          .testimonials-grid::-webkit-scrollbar-track {
            background: #f1f5f9 !important;
            border-radius: 3px !important;
          }

          .testimonials-grid::-webkit-scrollbar-thumb {
            background: #0a4a7a !important;
            border-radius: 3px !important;
          }

          .testimonials-grid::-webkit-scrollbar-thumb:hover {
            background: #082e4d !important;
          }

          .testimonial-card {
            flex: 0 0 280px !important;
            scroll-snap-align: start !important;
          }

          .cta-buttons {
            flex-direction: column !important;
            align-items: center !important;
            gap: 12px !important;
          }

          .department-grid {
            grid-template-columns: 1fr !important;
            padding: 20px !important;
          }
          
          .department-image-container {
            height: 200px !important;
          }

          /* Tablet styles */
          @media (min-width: 768px) and (max-width: 1024px) {
            .hero-slider {
              height: 500px !important;
            }
            
            .notices-container {
              flex-direction: row !important;
              justify-content: space-between !important;
              padding: 16px !important;
            }
            
            .notices-list {
              flex-direction: row !important;
              flex-wrap: wrap !important;
              gap: 16px !important;
            }
            
            .department-tabs {
              gap: 8px !important;
              padding: 20px !important;
            }
            
            .tab-button {
              padding: 10px 20px !important;
              font-size: 0.9rem !important;
            }

            .alumni-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 24px !important;
              padding: 40px 20px !important;
            }

            .stats-grid {
              grid-template-columns: repeat(4, 1fr) !important;
              gap: 20px !important;
              padding: 40px 20px !important;
            }

            .testimonials-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 24px !important;
              padding: 40px 20px !important;
            }

            .cta-buttons {
              flex-direction: row !important;
              justify-content: center !important;
              gap: 16px !important;
            }

            .department-grid {
              grid-template-columns: 1fr 1fr !important;
              padding: 40px 20px !important;
            }
            
            .department-image-container {
              height: 280px !important;
            }
          }

          /* Desktop styles */
          @media (min-width: 1025px) {
            .hero-slider {
              height: 600px !important;
            }
            
            .notices-container {
              flex-direction: row !important;
              justify-content: space-between !important;
              padding: 16px 0 !important;
            }
            
            .notices-list {
              flex-direction: row !important;
              flex-wrap: wrap !important;
              gap: 32px 8px !important;
            }
            
            .department-tabs {
              gap: 8px !important;
              padding: 20px !important;
            }
            
            .tab-button {
              padding: 8px 16px !important;
              font-size: 1rem !important;
            }

            .alumni-grid {
              grid-template-columns: repeat(3, 1fr) !important;
              gap: 32px !important;
              padding: 40px 20px !important;
            }

            .stats-grid {
              grid-template-columns: repeat(4, 1fr) !important;
              gap: 32px !important;
              padding: 40px 20px !important;
            }

            .testimonials-grid {
              grid-template-columns: repeat(3, 1fr) !important;
              gap: 32px !important;
              padding: 40px 20px !important;
            }

            .cta-buttons {
              flex-direction: row !important;
              justify-content: center !important;
              gap: 16px !important;
            }

            .department-grid {
              grid-template-columns: 1fr 1fr !important;
              padding: 40px 20px !important;
            }
            
            .department-image-container {
              height: 320px !important;
            }
          }

          /* Mobile-specific adjustments */
          @media (max-width: 480px) {
            .hero-slider {
              height: 350px !important;
            }
            
            .stats-grid {
              grid-template-columns: 1fr !important;
              gap: 12px !important;
            }
            
            .tab-button {
              padding: 6px 12px !important;
              font-size: 0.8rem !important;
            }
            
            .alumni-card {
              padding: 12px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Home;