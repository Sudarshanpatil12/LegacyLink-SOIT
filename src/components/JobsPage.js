import React, { useState } from 'react';
import {
  Search, MapPin, Briefcase, DollarSign, Clock,
  AlertTriangle, CheckCircle, ExternalLink, Building,
  ChevronRight, Shield, Filter, Brain, Users
} from 'lucide-react';

// ML Analysis Simulation
const analyzeJobSafety = (job) => {
  const features = {
    salaryToExperience: job.salary / (job.experienceRequired + 1),
    descriptionQuality: job.description.length > 100,
    requirementsCount: job.requirements.length,
    professionalEmail: job.contactEmail.includes('@') && !job.contactEmail.includes('gmail.com'),
    companyVerification: job.verifiedCompany
  };

  let riskScore = 0;
  
  if (features.salaryToExperience > 1000000) riskScore += 30;
  if (!features.descriptionQuality) riskScore += 20;
  if (features.requirementsCount < 2) riskScore += 15;
  if (!features.professionalEmail) riskScore += 15;
  if (!features.companyVerification) riskScore += 20;

  const fakeProbability = Math.min(Math.max(riskScore, 0), 100);
  
  return {
    fakeProbability,
    safetyLevel: fakeProbability >= 70 ? 'high-risk' : fakeProbability >= 40 ? 'caution' : 'safe',
    features
  };
};

// Safety Badge Component
const SafetyBadge = ({ safetyLevel }) => {
  const colors = {
    'safe': '#10b981',
    'caution': '#f59e0b',
    'high-risk': '#ef4444'
  };
  
  const icons = {
    'safe': <CheckCircle size={16} />,
    'caution': <AlertTriangle size={16} />,
    'high-risk': <AlertTriangle size={16} />
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '6px 12px',
      backgroundColor: '#f8fafc',
      color: colors[safetyLevel],
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: '600',
      border: `1px solid ${colors[safetyLevel]}20`
    }}>
      {icons[safetyLevel]}
      {safetyLevel.toUpperCase()}
    </div>
  );
};

// Company logo mapping using Clearbit API (reliable logo service)
const companyLogoMap = {
  'Microsoft': 'https://logo.clearbit.com/microsoft.com',
  'Rojni Tech Foundation': 'https://logo.clearbit.com/rojnitech.com',
  'CarWale': 'https://logo.clearbit.com/carwale.com',
  'Jaro Education': 'https://logo.clearbit.com/jaroeducation.com',
  'Bajaj Finserv': 'https://logo.clearbit.com/bajajfinserv.in',
  'Techma': 'https://logo.clearbit.com/techma.com',
  'CRM Solutions Inc': 'https://logo.clearbit.com/crmsolutions.com',
  'Averoft': 'https://logo.clearbit.com/averoft.com',
  'IBM India': 'https://logo.clearbit.com/ibm.com',
  'Appointy': 'https://logo.clearbit.com/appointy.com',
  'TCS NQT': 'https://logo.clearbit.com/tcs.com',
  'Hike': 'https://logo.clearbit.com/hike.in',
  'Acmegrade & Infosys': 'https://logo.clearbit.com/infosys.com',
  'Tech Solutions Consultancy': 'https://logo.clearbit.com/techsols.com'
};

// Color mapping for fallback initials
const companyColorMap = {
  'Microsoft': '#0078D4',
  'Rojni Tech Foundation': '#4F46E5',
  'CarWale': '#FF6B6B',
  'Jaro Education': '#1E40AF',
  'Bajaj Finserv': '#003DA5',
  'Techma': '#6366F1',
  'CRM Solutions Inc': '#0EA5E9',
  'Averoft': '#06B6D4',
  'IBM India': '#0F62FE',
  'Appointy': '#8B5CF6',
  'TCS NQT': '#004687',
  'Hike': '#14B8A6',
  'Acmegrade & Infosys': '#003478',
  'Tech Solutions Consultancy': '#EF4444'
};

// Job Card Component
const JobCard = ({ job, onClick }) => {
  const [logoLoaded, setLogoLoaded] = React.useState(false);
  const safety = analyzeJobSafety(job);
  const logoUrl = companyLogoMap[job.company] || job.companyLogo;
  const bgColor = companyColorMap[job.company] || '#667eea';
  const initials = job.company.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase();
  
  return (
    <div style={styles.jobCard} onClick={onClick}>
      <div style={styles.cardHeader}>
        <div style={styles.companyInfo}>
          {/* MODIFIED: Replaced Building icon with company logo */}
          <div style={{...styles.companyIcon, background: 'white', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            {logoLoaded ? (
              <img
                src={logoUrl}
                alt={`${job.company} logo`}
                style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '12px' }}
              />
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                backgroundColor: bgColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '18px',
                borderRadius: '12px',
                fontFamily: 'Arial, sans-serif'
              }}>
                {initials}
              </div>
            )}
            <img
              src={logoUrl}
              alt={`${job.company} logo`}
              style={{ display: 'none' }}
              onLoad={() => setLogoLoaded(true)}
              onError={() => setLogoLoaded(false)}
            />
          </div>
          <div>
            <h3 style={styles.jobTitle}>{job.title}</h3>
            <p style={styles.companyName}>{job.company}</p>
          </div>
        </div>
        <SafetyBadge safetyLevel={safety.safetyLevel} />
      </div>

      <div style={styles.jobDetails}>
        <div style={styles.detailItem}>
          <MapPin size={14} />
          <span>{job.location}</span>
        </div>
        <div style={styles.detailItem}>
          <DollarSign size={14} />
          <span>₹{(job.salary / 100000).toFixed(1)}L/year</span>
        </div>
        <div style={styles.detailItem}>
          <Clock size={14} />
          <span>{job.experienceRequired}+ years</span>
        </div>
      </div>

      <p style={styles.jobDescription}>{job.description.slice(0, 120)}...</p>

      <div style={styles.cardFooter}>
        <span style={styles.postedDate}>Posted {job.postedDate}</span>
        <button style={styles.viewButton}>
          View Details <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

// Job Details Component
const JobDetails = ({ job, onBack }) => {
  const [logoLoaded, setLogoLoaded] = React.useState(false);
  const safety = analyzeJobSafety(job);
  const logoUrl = companyLogoMap[job.company] || job.companyLogo;
  const bgColor = companyColorMap[job.company] || '#667eea';
  const initials = job.company.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div style={styles.detailsContainer}>
      <button style={styles.backButton} onClick={onBack}>
        ← Back to Jobs
      </button>

      {/* MODIFIED: Added logo and flex container to header */}
      <div style={styles.detailsHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            ...styles.companyIcon, // Reused style
            width: '68px',         // Made it bigger
            height: '68px',
            background: 'white',
            padding: '8px',
            borderRadius: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            {logoLoaded ? (
              <img
                src={logoUrl}
                alt={`${job.company} logo`}
                style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '12px' }}
              />
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                backgroundColor: bgColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '20px',
                borderRadius: '12px',
                fontFamily: 'Arial, sans-serif'
              }}>
                {initials}
              </div>
            )}
            <img
              src={logoUrl}
              alt={`${job.company} logo`}
              style={{ display: 'none' }}
              onLoad={() => setLogoLoaded(true)}
              onError={() => setLogoLoaded(false)}
            />
          </div>
          <div>
            <h1 style={styles.detailsTitle}>{job.title}</h1>
            <p style={styles.detailsCompany}>{job.company}</p>
          </div>
        </div>
        <SafetyBadge safetyLevel={safety.safetyLevel} />
      </div>

      {/* Safety Analysis */}
      <div style={styles.safetyCard}>
        <div style={styles.safetyHeader}>
          <Brain size={20} />
          <span>AI Safety Score: {safety.fakeProbability}% Risk</span>
        </div>
        <div style={styles.riskMeter}>
          <div style={{
            ...styles.riskFill,
            width: `${safety.fakeProbability}%`,
            backgroundColor: safety.safetyLevel === 'safe' ? '#10b981' : 
                             safety.safetyLevel === 'caution' ? '#f59e0b' : '#ef4444'
          }} />
        </div>
      </div>

      <div style={styles.detailsGrid}>
        <div style={styles.mainContent}>
          <div style={styles.section}>
            <h3>Job Description</h3>
            <p style={styles.description}>{job.description}</p>
          </div>

          <div style={styles.section}>
            <h3>Requirements</h3>
            <div style={styles.requirementsList}>
              {job.requirements.map((req, index) => (
                <div key={index} style={styles.requirement}>
                  <CheckCircle size={16} color="#10b981" />
                  {req}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={styles.sidebar}>
          <div style={styles.infoCard}>
            <h4>Job Overview</h4>
            <div style={styles.infoList}>
              <div style={styles.infoItem}>
                <MapPin size={16} />
                <span>{job.location}</span>
              </div>
              <div style={styles.infoItem}>
                <Briefcase size={16} />
                <span>{job.type}</span>
              </div>
              <div style={styles.infoItem}>
                <DollarSign size={16} />
                <span>₹{(job.salary / 100000).toFixed(1)}L/year</span>
              </div>
              <div style={styles.infoItem}>
                <Clock size={16} />
                <span>{job.experienceRequired}+ years exp</span>
              </div>
            </div>
          </div>

          <div style={styles.infoCard}>
            <h4>Company Info</h4>
            <div style={styles.infoList}>
              <div style={styles.infoItem}>
                <Users size={16} />
                <span>{job.companySize} employees</span>
              </div>
            </div>
          </div>

          <button
            style={{
              ...styles.applyButton,
              backgroundColor: safety.safetyLevel === 'high-risk' ? '#ef4444' : 
                               safety.safetyLevel === 'caution' ? '#f59e0b' : '#10b981'
            }}
            onClick={() => window.open(job.applyLink, '_blank')}
          >
            {safety.safetyLevel === 'high-risk' ? 'Apply with Caution' : 
             safety.safetyLevel === 'caution' ? 'Verify & Apply' : 'Apply Now'}
            <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Jobs Page Component
const JobsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedRisk, setSelectedRisk] = useState('all');
  const [currentPage, setCurrentPage] = useState('list');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // MODIFIED: Added 'companyLogo' field to each job
  const jobsData = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "Microsoft",
      companyLogo: "https://logo.clearbit.com/microsoft.com",
      location: "Bangalore, India",
      type: "Full Time",
      category: "technology",
      salary: 3500000,
      experienceRequired: 5,
      description: "Join Microsoft's engineering team to work on cutting-edge cloud technologies. We're looking for passionate engineers with expertise in distributed systems and microservices architecture.",
      requirements: ["Bachelor's in Computer Science", "5+ years experience", "Cloud platforms", "System design"],
      postedDate: "2024-01-15",
      verifiedCompany: true,
      contactEmail: "careers@microsoft.com",
      website: "https://microsoft.com",
      companySize: "10000+",
      applyLink: "https://careers.microsoft.com"
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "Rojni Tech Foundation",
      companyLogo: "https://logo.clearbit.com/rojnitech.org",
      location: "Pune, India",
      type: "Full Time",
      category: "technology",
      salary: 1800000,
      experienceRequired: 2,
      description: "Join Rojni Tech Foundation as a Full Stack Developer to work on innovative educational technology solutions. Develop and maintain web applications using modern technologies.",
      requirements: ["Bachelor's in Computer Science", "2+ years experience", "React/Node.js", "Database management"],
      postedDate: "2024-01-18",
      verifiedCompany: true,
      contactEmail: "hr@rojnitech.org",
      website: "https://rojnitech.org",
      companySize: "50-200",
      applyLink: "https://rojnitech.org/careers"
    },
    {
      id: 3,
      title: "Software Development Engineer",
      company: "CarWale",
      companyLogo: "https://logo.clearbit.com/carwale.com",
      location: "Mumbai, India",
      type: "Full Time",
      category: "technology",
      salary: 2200000,
      experienceRequired: 3,
      description: "Work on India's leading automotive platform. Develop scalable solutions for car enthusiasts and buyers across the country.",
      requirements: ["B.Tech/B.E. in CS", "3+ years experience", "Java/Python", "Problem solving skills"],
      postedDate: "2024-01-17",
      verifiedCompany: true,
      contactEmail: "jobs@carwale.com",
      website: "https://carwale.com",
      companySize: "500-1000",
      applyLink: "https://carwale.com/careers"
    },
    {
      id: 4,
      title: "EdTech Developer",
      company: "Jaro Education",
      companyLogo: "https://logo.clearbit.com/jaroeducation.com",
      location: "Mumbai, India",
      type: "Full Time",
      category: "technology",
      salary: 1600000,
      experienceRequired: 2,
      description: "Develop innovative educational platforms and learning management systems for Jaro Education's online programs.",
      requirements: ["Degree in CS/IT", "2+ years experience", "JavaScript frameworks", "API development"],
      postedDate: "2024-01-16",
      verifiedCompany: true,
      contactEmail: "careers@jaroeducation.com",
      website: "https://jaroeducation.com",
      companySize: "200-500",
      applyLink: "https://jaroeducation.com/careers"
    },
    {
      id: 5,
      title: "Digital Solutions Engineer",
      company: "Bajaj Finserv",
      companyLogo: "https://logo.clearbit.com/bajajfinserv.in",
      location: "Pune, India",
      type: "Full Time",
      category: "technology",
      salary: 2800000,
      experienceRequired: 4,
      description: "Join Bajaj Finserv's digital transformation team to build innovative financial solutions for millions of customers.",
      requirements: ["B.Tech/MCA", "4+ years experience", "Financial systems", "Agile methodology"],
      postedDate: "2024-01-15",
      verifiedCompany: true,
      contactEmail: "digital.careers@bajajfinserv.in",
      website: "https://bajajfinserv.in",
      companySize: "10000+",
      applyLink: "https://bajajfinserv.in/careers"
    },
    {
      id: 6,
      title: "AI/ML Engineer",
      company: "Techma",
      companyLogo: "https://logo.clearbit.com/techma.com",
      location: "Bangalore, India",
      type: "Full Time",
      category: "technology",
      salary: 2400000,
      experienceRequired: 3,
      description: "Work on cutting-edge AI and machine learning projects at Techma. Develop intelligent solutions for various industry domains.",
      requirements: ["Master's in AI/ML preferred", "3+ years experience", "Python/TensorFlow", "Data analysis"],
      postedDate: "2024-01-18",
      verifiedCompany: true,
      contactEmail: "ai-careers@techma.com",
      website: "https://techma.com",
      companySize: "1000-5000",
      applyLink: "https://techma.com/careers"
    },
    {
      id: 7,
      title: "CRM Developer",
      company: "CRM Solutions Inc",
      companyLogo: "https://logo.clearbit.com/crmsolutions.com",
      location: "Hyderabad, India",
      type: "Full Time",
      category: "technology",
      salary: 2000000,
      experienceRequired: 3,
      description: "Develop and customize CRM solutions for enterprise clients. Work on Salesforce and other CRM platforms.",
      requirements: ["Bachelor's degree", "3+ years CRM experience", "Salesforce/Apex", "Business analysis"],
      postedDate: "2024-01-17",
      verifiedCompany: true,
      contactEmail: "jobs@crmsolutions.com",
      website: "https://crmsolutions.com",
      companySize: "500-1000",
      applyLink: "https://crmsolutions.com/careers"
    },
    {
      id: 8,
      title: "Cloud Engineer",
      company: "Averoft",
      companyLogo: "https://logo.clearbit.com/averoft.com",
      location: "Chennai, India",
      type: "Full Time",
      category: "technology",
      salary: 2600000,
      experienceRequired: 4,
      description: "Join Averoft's cloud team to design and implement scalable cloud infrastructure solutions for global clients.",
      requirements: ["B.Tech in CS/IT", "4+ years cloud experience", "AWS/Azure", "DevOps practices"],
      postedDate: "2024-01-16",
      verifiedCompany: true,
      contactEmail: "cloud-careers@averoft.com",
      website: "https://averoft.com",
      companySize: "1000-5000",
      applyLink: "https://averoft.com/careers"
    },
    {
      id: 9,
      title: "Data Scientist",
      company: "IBM India",
      companyLogo: "https://logo.clearbit.com/ibm.com",
      location: "Delhi, India",
      type: "Full Time",
      category: "technology",
      salary: 3200000,
      experienceRequired: 5,
      description: "Work with IBM's data science team on enterprise AI solutions and predictive analytics projects.",
      requirements: ["Master's/PhD preferred", "5+ years experience", "Python/R", "Statistical modeling"],
      postedDate: "2024-01-15",
      verifiedCompany: true,
      contactEmail: "datascience.india@ibm.com",
      website: "https://ibm.com",
      companySize: "10000+",
      applyLink: "https://ibm.com/careers"
    },
    {
      id: 10,
      title: "Product Manager",
      company: "Appointy",
      companyLogo: "https://logo.clearbit.com/appointy.com",
      location: "Indore, India",
      type: "Full Time",
      category: "product",
      salary: 2200000,
      experienceRequired: 4,
      description: "Lead product development for Appointy's scheduling platform used by businesses worldwide.",
      requirements: ["MBA/B.Tech", "4+ years PM experience", "Product strategy", "User research"],
      postedDate: "2024-01-18",
      verifiedCompany: true,
      contactEmail: "product@apointy.com",
      website: "https://appointy.com",
      companySize: "200-500",
      applyLink: "https://appointy.com/careers"
    },
    {
      id: 11,
      title: "Software Engineer",
      company: "TCS NQT",
      companyLogo: "https://logo.clearbit.com/tcs.com",
      location: "Multiple Locations, India",
      type: "Full Time",
      category: "technology",
      salary: 1800000,
      experienceRequired: 0,
      description: "Join TCS through the National Qualifier Test program. Work on diverse projects across various domains and technologies.",
      requirements: ["B.E/B.Tech 2023/2024", "Good academic record", "Programming fundamentals", "Problem solving"],
      postedDate: "2024-01-17",
      verifiedCompany: true,
      contactEmail: "nqt@tcs.com",
      website: "https://tcs.com",
      companySize: "500000+",
      applyLink: "https://tcs.com/careers"
    },
    {
      id: 12,
      title: "Mobile App Developer",
      company: "Hike",
      companyLogo: "https://logo.clearbit.com/hike.com",
      location: "Bangalore, India",
      type: "Full Time",
      category: "technology",
      salary: 2500000,
      experienceRequired: 3,
      description: "Develop innovative mobile applications for Hike's social platform with millions of active users.",
      requirements: ["B.Tech in CS", "3+ years mobile development", "React Native/Flutter", "UI/UX understanding"],
      postedDate: "2024-01-16",
      verifiedCompany: true,
      contactEmail: "mobile.careers@hike.com",
      website: "https://hike.com",
      companySize: "500-1000",
      applyLink: "https://hike.com/careers"
    },
    {
      id: 13,
      title: "Cybersecurity Analyst",
      company: "Acmegrade & Infosys",
      companyLogo: "https://logo.clearbit.com/infosys.com",
      location: "Bangalore, India",
      type: "Full Time",
      category: "security",
      salary: 2800000,
      experienceRequired: 4,
      description: "Joint opportunity with Acmegrade and Infosys to work on enterprise cybersecurity solutions and threat analysis.",
      requirements: ["B.Tech in CS/IT", "4+ years security experience", "Cybersecurity tools", "Risk assessment"],
      postedDate: "2024-01-15",
      verifiedCompany: true,
      contactEmail: "security.careers@acmegrade.com",
      website: "https://acmegrade.com",
      companySize: "1000-5000",
      applyLink: "https://acmegrade.com/careers"
    },
    {
      id: 14,
      title: "Quick Hiring - High Salary Developer",
      company: "Tech Solutions Consultancy",
      companyLogo: "https://logo.clearbit.com/tech-consultancy-xyz.com", // Will likely be a default icon
      location: "Dubai, UAE",
      type: "Full Time",
      category: "technology",
      salary: 8000000,
      experienceRequired: 1,
      description: "Immediate hiring. Good package. Apply now. We need developers for various projects.",
      requirements: ["Any degree", "Basic programming"],
      postedDate: "2024-01-16",
      verifiedCompany: false,
      contactEmail: "job@consultancy.com",
      website: "http://tech-consultancy-xyz.com",
      companySize: "10-50",
      applyLink: "#"
    }
  ];

  const filteredJobs = jobsData.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || 
                            job.location.toLowerCase().includes(selectedLocation);
    
    const safety = analyzeJobSafety(job);
    const matchesRisk = selectedRisk === 'all' || safety.safetyLevel === selectedRisk;

    return matchesSearch && matchesCategory && matchesLocation && matchesRisk;
  });

  const viewJobDetails = (job) => {
    setSelectedJob(job);
    setCurrentPage('details');
  };

  const safeJobs = filteredJobs.filter(job => analyzeJobSafety(job).safetyLevel === 'safe').length;
  const riskyJobs = filteredJobs.filter(job => analyzeJobSafety(job).safetyLevel === 'high-risk').length;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        {/* <div style={styles.nav}>
          <div style={styles.logo}>
            <Shield size={24} />
            <span>JobShield</span>
          </div>
        </div> */}

        {/* --- MODIFIED SECTION --- */}
        <div style={styles.hero}>
          <h1 style={styles.heroTitle}>Find Your Next Opportunity Safely</h1>
          <p style={styles.heroSubtitle}>
            AI-powered protection against job scams and fraudulent listings
          </p>
          
          {/* --- ADDED STATS --- */}
          <div style={styles.heroStats}>
            <div style={styles.heroStat}>
              <CheckCircle size={16} />
              <span>Verified Companies</span>
            </div>
            <div style={styles.heroStat}>
              <Brain size={16} />
              <span>AI Risk Analysis</span>
            </div>
            <div style={styles.heroStat}>
              <Shield size={16} />
              <span>Safe Applications</span>
            </div>
          </div>
          {/* --- END MODIFIED SECTION --- */}

        </div>
      </div>

      <div style={styles.main}>
        {/* Search and Filters */}
        <div style={styles.controls}>
          <div style={styles.searchBox}>
            <Search size={20} color="#666" />
            <input
              type="text"
              placeholder="Search jobs or companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
            <button 
              style={styles.filterButton}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} />
              Filters
            </button>
          </div>

          {showFilters && (
            <div style={styles.filters}>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={styles.filter}
              >
                <option value="all">All Categories</option>
                <option value="technology">Technology</option>
                <option value="product">Product</option>
                <option value="security">Security</option>
              </select>

              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                style={styles.filter}
              >
                <option value="all">All Locations</option>
                <option value="india">India</option>
                <option value="remote">Remote</option>
                <option value="dubai">Dubai</option>
              </select>

              <select
                value={selectedRisk}
                onChange={(e) => setSelectedRisk(e.target.value)}
                style={styles.filter}
              >
                <option value="all">All Risk Levels</option>
                <option value="safe">Safe</option>
                <option value="caution">Caution</option>
                <option value="high-risk">High Risk</option>
              </select>
            </div>
          )}
        </div>

        {/* Stats */}
        <div style={styles.stats}>
          <div style={styles.stat}>
            <strong>{filteredJobs.length}</strong>
            <span>Jobs Found</span>
          </div>
          <div style={styles.stat}>
            <strong>{safeJobs}</strong>
            <span>Safe Jobs</span>
          </div>
          <div style={styles.stat}>
            <strong>{riskyJobs}</strong>
            <span>High Risk</span>
          </div>
        </div>

        {/* Content */}
        {currentPage === 'list' ? (
          <div style={styles.jobsGrid}>
            {filteredJobs.map(job => (
              <JobCard 
                key={job.id} 
                job={job} 
                onClick={() => viewJobDetails(job)}
              />
            ))}
          </div>
        ) : (
          <JobDetails 
            job={selectedJob} 
            onBack={() => setCurrentPage('list')}
          />
        )}
      </div>
    </div>
  );
};

// Styles remain the same as your original code
// Enhanced Professional Styles with Unique Designs
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    lineHeight: 1.6,
  },
  header: {
    background: 'linear-gradient(135deg, #0a4a7a 0%, #1e6ba8 100%)',
    color: 'white',
    padding: '40px 0 80px',
    position: 'relative',
    overflow: 'hidden',
  },
  nav: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px 40px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoIcon: {
    width: '52px',
    height: '52px',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.2)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  },
  logoText: {
    fontSize: '1.5rem',
    fontWeight: '800',
    display: 'block',
    letterSpacing: '-0.02em',
  },
  logoSubtitle: {
    fontSize: '0.875rem',
    opacity: 0.8,
    display: 'block',
    marginTop: '2px',
    fontWeight: '500',
  },
  hero: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    textAlign: 'center', // --- MODIFICATION: Centered the text ---
  },
  heroContent: {
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: '800',
    marginBottom: '16px',
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    opacity: 0.9,
    marginBottom: '32px',
    lineHeight: 1.5,
    fontWeight: '400',
  },
  heroStats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '32px',
    flexWrap: 'wrap',
  },
  heroStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.95rem',
    opacity: 0.9,
    background: 'rgba(255,255,255,0.1)',
    padding: '12px 20px',
    borderRadius: '12px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.2)',
  },
  main: {
    maxWidth: '1200px',
    margin: '-40px auto 80px',
    padding: '0 24px',
  },
  controls: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '32px',
    marginBottom: '24px',
    boxShadow: '0 8px 40px rgba(0, 0, 0, 0.08)',
    border: '1px solid #f1f5f9',
    background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
  },
  searchSection: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  },
  searchBox: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  },
  searchInput: {
    flex: 1,
    padding: '18px 20px',
    border: 'none',
    background: 'transparent',
    fontSize: '16px',
    fontFamily: 'inherit',
    outline: 'none',
    fontWeight: '500',
  },
  searchButton: {
    padding: '18px 28px',
    background: 'linear-gradient(135deg, #0a4a7a 0%, #2563eb 100%)',
    color: 'white',
    border: 'none',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(10, 74, 122, 0.2)',
  },
  filterToggle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 22px',
    background: 'white',
    color: '#64748b',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  },
  filters: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginTop: '24px',
    paddingTop: '24px',
    borderTop: '1px solid #f1f5f9',
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  filterLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
  },
  filterSelect: {
    padding: '14px',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '14px',
    fontFamily: 'inherit',
    background: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
    fontWeight: '500',
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
    marginBottom: '32px',
  },
  statCard: {
    background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
    padding: '28px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
    border: '1px solid #f1f5f9',
    transition: 'all 0.3s ease',
  },
  statIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  },
  statNumber: {
    fontSize: '1.75rem',
    fontWeight: '800',
    color: '#0a4a7a',
    letterSpacing: '-0.02em',
  },
  statLabel: {
    fontSize: '0.9rem',
    color: '#64748b',
    marginTop: '4px',
    fontWeight: '600',
  },
  resultsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    padding: '0 8px',
  },
  resultsTitle: {
    fontSize: '1.75rem',
    fontWeight: '800',
    color: '#0a4a7a',
    letterSpacing: '-0.02em',
  },
  resultsCount: {
    color: '#64748b',
    fontSize: '0.95rem',
    fontWeight: '600',
    background: '#f1f5f9',
    padding: '8px 16px',
    borderRadius: '12px',
  },
  jobsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
    gap: '24px',
  },
  jobCard: {
    background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
    borderRadius: '24px',
    padding: '28px',
    boxShadow: '0 8px 40px rgba(0, 0, 0, 0.06)',
    border: '1px solid #f1f5f9',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
    position: 'relative',
    overflow: 'hidden',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
  },
  companyInfo: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
  },
  companyIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
    border: '2px solid rgba(255,255,255,0.2)',
    flexShrink: 0, // Prevents icon from shrinking
  },
  jobTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#0a4a7a',
    margin: '0 0 6px 0',
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
  },
  companyRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  companyName: {
    fontSize: '1rem',
    color: '#64748b',
    margin: 0,
    fontWeight: '600',
  },
  verifiedBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 12px',
    background: 'linear-gradient(135deg, #10b98120 0%, #10b98110 100%)',
    color: '#10b981',
    borderRadius: '12px',
    fontSize: '0.8rem',
    fontWeight: '700',
    border: '1px solid #10b98130',
  },
  jobDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
  },
  detailItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#64748b',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  jobDescription: {
    color: '#64748b',
    fontSize: '0.95rem',
    lineHeight: 1.6,
    marginBottom: '20px',
    fontWeight: '500',
  },
  skillsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '20px',
  },
  skillTag: {
    padding: '6px 12px',
    background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
    color: '#475569',
    borderRadius: '10px',
    fontSize: '0.8rem',
    fontWeight: '600',
    border: '1px solid #e2e8f0',
  },
  moreSkills: {
    padding: '6px 12px',
    color: '#64748b',
    fontSize: '0.8rem',
    fontWeight: '600',
    background: '#f8fafc',
    borderRadius: '10px',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  postedDate: {
    color: '#94a3b8',
    fontSize: '0.85rem',
    fontWeight: '600',
  },
  jobType: {
    padding: '4px 12px',
    background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
    color: '#64748b',
    borderRadius: '10px',
    fontSize: '0.8rem',
    fontWeight: '700',
    border: '1px solid #e2e8f0',
  },
  viewButton: {
    background: 'linear-gradient(135deg, #0a4a7a 0%, #2563eb 100%)',
    color: 'white',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontWeight: '700',
    fontSize: '0.85rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(10, 74, 122, 0.2)',
  },
  // Enhanced Details Page Styles
  detailsContainer: {
    background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
    borderRadius: '28px',
    padding: '40px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
    border: '1px solid #f1f5f9',
  },
  backButton: {
    background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
    border: '1px solid #e2e8f0',
    color: '#0a4a7a',
    cursor: 'pointer',
    fontSize: '16px',
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    padding: '12px 20px',
    borderRadius: '14px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  },
  detailsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '32px',
  },
  titleSection: {
    flex: 1,
  },
  detailsTitle: {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#0a4a7a',
    margin: '0 0 10px 0',
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  companySection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  companyIconLarge: {
    width: '68px',
    height: '68px',
    borderRadius: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
    border: '2px solid rgba(255,255,255,0.2)',
  },
  detailsCompany: {
    fontSize: '1.5rem',
    color: '#2563eb',
    fontWeight: '700',
    margin: '0 0 6px 0',
    letterSpacing: '-0.01em',
  },
  companyMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  companySize: {
    color: '#64748b',
    fontSize: '1rem',
    fontWeight: '600',
    background: '#f1f5f9',
    padding: '6px 14px',
    borderRadius: '10px',
  },
  verifiedBadgeLarge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 16px',
    background: 'linear-gradient(135deg, #10b98120 0%, #10b98110 100%)',
    color: '#10b981',
    borderRadius: '14px',
    fontSize: '0.9rem',
    fontWeight: '700',
    border: '1px solid #10b98130',
  },
  safetyCard: {
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    borderRadius: '20px',
    padding: '32px',
    marginBottom: '32px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
  },
  safetyHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '24px',
  },
  safetyTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#0a4a7a',
    margin: 0,
    letterSpacing: '-0.01em',
  },
  safetySubtitle: {
    color: '#64748b',
    fontSize: '0.9rem',
    margin: 0,
    fontWeight: '500',
  },
  riskMeterContainer: {
    // Risk meter styles
  },
  riskLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
    fontSize: '0.9rem',
    color: '#64748b',
    fontWeight: '600',
  },
  riskMeter: {
    width: '100%',
    height: '12px',
    background: 'linear-gradient(135deg, #e2e8f0 0%, #f1f5f9 100%)',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: '16px',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.04)',
  },
  riskFill: {
    height: '100%',
    transition: 'width 0.3s ease',
    borderRadius: '8px',
  },
  riskScore: {
    textAlign: 'center',
    fontSize: '1rem',
    color: '#64748b',
    fontWeight: '7V00',
    background: 'white',
    padding: '12px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '40px',
  },
  mainContent: {
    // Main content styles
  },
  section: {
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#0a4a7a',
    marginBottom: '20px',
    letterSpacing: '-0.01em',
  },
  description: {
    lineHeight: 1.7,
    color: '#475569',
    fontSize: '1.05rem',
    fontWeight: '500',
  },
  requirementsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  requirement: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    padding: '16px 0',
    borderBottom: '1px solid #f1f5f9',
  },
  checkCircle: {
    marginTop: '2px',
    flexShrink: 0,
    background: 'linear-gradient(135deg, #10b98120 0%, #10b98110 100%)',
    padding: '8px',
    borderRadius: '10px',
  },
  sidebar: {
    // Sidebar styles
  },
  infoCard: {
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    borderRadius: '20px',
    padding: '28px',
    marginBottom: '24px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
  },
  infoCardTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#0a4a7a',
    marginBottom: '20px',
    letterSpacing: '-0.01em',
  },
  infoList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
  },
  infoLabel: {
    display: 'block',
    fontSize: '0.9rem',
    color: '#64748b',
    marginBottom: '4px',
    fontWeight: '600',
  },
  infoValue: {
    display: 'block',
    fontSize: '1rem',
    color: '#374151',
    fontWeight: '700',
  },
  applyButton: {
    width: '100%',
    padding: '20px',
    color: 'white',
    border: 'none',
    borderRadius: '16px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    letterSpacing: '-0.01em',
  },
};

// Add hover effects
const hoverEffects = `
  .job-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
  }
  
  .stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.1);
  }
  
  .search-button:hover, .apply-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(10, 74, 122, 0.3);
  }
  
  .filter-toggle:hover {
    background: #f8fafc;
    border-color: #0a4a7a;
    color: #0a4a7a;
  }
  
  .back-button:hover {
    background: #e2e8f0;
    transform: translateX(-4px);
  }
`;

// Add the hover effects to the component
const JobsPageWithStyles = () => {
  return (
    <>
      <style>{hoverEffects}</style>
      <JobsPage />
    </>
  );
};

export default JobsPageWithStyles;