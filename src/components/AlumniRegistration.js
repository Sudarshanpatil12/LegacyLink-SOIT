import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, Mail, Phone, GraduationCap, Briefcase, 
  MapPin, Linkedin, FileText, Camera, CheckCircle,
  ArrowRight, ArrowLeft 
} from 'lucide-react';

const AlumniRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    graduationYear: '',
    department: '',
    jobTitle: '',
    company: '',
    linkedinUrl: '',
    location: '',
    bio: '',
    profileImage: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const navigate = useNavigate();

  const departments = [
    'CS & Business Systems (CSBS)',
    'AI & Machine Learning (AIML)',
    'CSE Data Science (CSE-DS)',
    'Masters'
  ];

  // --- STYLES ---
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4d8e2' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: "'Inter', sans-serif",
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '30px 40px 40px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      width: '100%',
      maxWidth: '550px',
      maxHeight: '95vh',
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      fontSize: '1.8rem',
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: '10px',
      color: '#111827',
      fontFamily: "'Poppins', sans-serif",
    },
    subtitle: {
      textAlign: 'center',
      color: '#6b7280',
      marginBottom: '25px',
      fontSize: '1rem',
    },
    // --- Progress Bar ---
    progressContainer: {
      width: '100%',
      marginBottom: '25px',
    },
    progressSteps: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px',
      fontSize: '14px',
      color: '#6b7280',
      fontWeight: '500',
    },
    progressBarBackground: {
      height: '8px',
      backgroundColor: '#e5e7eb',
      borderRadius: '4px',
      width: '100%',
      overflow: 'hidden',
    },
    progressBarFill: {
      height: '100%',
      width: `${(step / 4) * 100}%`,
      backgroundColor: '#0056b3',
      borderRadius: '4px',
      transition: 'width 0.4s ease',
    },
    // --- Form Slider ---
    formSliderContainer: {
      flex: 1,
      overflow: 'hidden',
      position: 'relative',
    },
    formSlider: {
      display: 'flex',
      width: '400%', // 4 steps * 100%
      transform: `translateX(-${(step - 1) * 25}%)`, // (step - 1) * (100 / 4)
      transition: 'transform 0.4s cubic-bezier(0.65, 0, 0.35, 1)',
    },
    formStep: {
      width: '25%', // 100 / 4
      padding: '5px 2px',
      flexShrink: 0,
      overflowY: 'auto',
      maxHeight: 'calc(95vh - 300px)', // Adjust based on card padding, titles, buttons
      minHeight: '300px', // Ensure a minimum height
    },
    // --- Fields ---
    sectionTitle: {
      fontSize: '1.3rem',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '20px',
      paddingBottom: '8px',
      borderBottom: '2px solid #f3f4f6',
    },
    inputGroup: {
      marginBottom: '20px',
      position: 'relative',
    },
    input: {
      width: '100%',
      padding: '12px 40px 12px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '16px',
      backgroundColor: '#f9fafb',
      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      fontFamily: 'inherit',
    },
    select: {
      width: '100%',
      padding: '12px 40px 12px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '16px',
      backgroundColor: '#f9fafb',
      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      fontFamily: 'inherit',
      appearance: 'none',
    },
    textarea: {
      width: '100%',
      padding: '12px 40px 12px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '16px',
      backgroundColor: '#f9fafb',
      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      fontFamily: 'inherit',
      resize: 'vertical',
      minHeight: '100px',
    },
    icon: {
      position: 'absolute',
      right: '12px',
      top: '13px',
      color: '#9ca3af',
      pointerEvents: 'none',
    },
    // --- Navigation ---
    navigation: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '25px',
      paddingTop: '20px',
      borderTop: '1px solid #f3f4f6',
    },
    navButton: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontFamily: "'Inter', sans-serif",
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    nextButton: {
      backgroundColor: '#0056b3',
      color: 'white',
    },
    backButton: {
      backgroundColor: '#f3f4f6',
      color: '#4b5563',
      border: '1px solid #d1d5db',
    },
    // --- Other ---
    error: {
      color: '#dc2626',
      backgroundColor: '#fee2e2',
      border: '1px solid #fca5a5',
      borderRadius: '6px',
      padding: '10px',
      textAlign: 'center',
      marginBottom: '20px',
      fontSize: '14px',
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
    },
    modalContent: {
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
      width: '90%',
      textAlign: 'center',
      zIndex: 101,
    },
    modalTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '15px',
    },
    modalText: {
      fontSize: '1rem',
      color: '#6b7280',
      marginBottom: '25px',
      lineHeight: '1.6',
    },
    modalButton: {
      width: 'auto',
      padding: '10px 30px',
      marginTop: '10px',
      backgroundColor: '#0056b3',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
  };

  // --- FORM LOGIC ---

  const handleNext = () => {
    setError('');
    // --- Per-Step Validation ---
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.mobile) {
        setError('Please fill in all personal information fields.');
        return;
      }
    } else if (step === 2) {
      if (!formData.graduationYear || !formData.department) {
        setError('Please select your graduation year and department.');
        return;
      }
    } else if (step === 3) {
      if (!formData.jobTitle || !formData.company || !formData.location) {
        setError('Please fill in all professional information fields.');
        return;
      }
    }
    
    if (step < 4) {
      setStep(s => s + 1);
    }
  };

  const handleBack = () => {
    setError('');
    if (step > 1) {
      setStep(s => s - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // --- FINAL VALIDATION ---
    if (formData.bio.length < 50) {
      setError('Professional Bio must be at least 50 characters.');
      setStep(4); 
      return;
    }

    if (!formData.profileImage) {
      setError('Please upload a profile photo.');
      setStep(4); 
      return;
    }
    
    setIsSubmitting(true);

    // Simulate registration process
    setTimeout(() => {
      const newAlumni = {
        id: Date.now().toString(),
        ...formData,
        graduationYear: parseInt(formData.graduationYear),
        profileImage: formData.profileImage, // Use the uploaded image
        status: 'pending', // Key change: status is pending
        registrationDate: new Date().toISOString().split('T')[0],
      };
      
      const existingData = JSON.parse(localStorage.getItem('alumniData') || '[]');
      const updatedData = [...existingData, newAlumni];
      localStorage.setItem('alumniData', JSON.stringify(updatedData));
      
      setIsSubmitting(false);
      setShowSuccessModal(true); 
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profileImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate('/alumni'); 
  };

  const stepTitles = ["Personal Info", "Academic Info", "Professional Info", "Profile & Bio"];

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Alumni Registration</h1>
        <p style={styles.subtitle}>Join our alumni network and connect with fellow graduates</p>
        
        {/* --- Progress Bar --- */}
        <div style={styles.progressContainer}>
          <div style={styles.progressSteps}>
            <span>Step {step} of 4</span>
            <span>{stepTitles[step - 1]}</span>
          </div>
          <div style={styles.progressBarBackground}>
            <div style={styles.progressBarFill}></div>
          </div>
        </div>

        {error && <div style={styles.error}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          {/* --- Form Slider --- */}
          <div style={styles.formSliderContainer}>
            <div style={styles.formSlider}>
              
              {/* --- Step 1: Personal --- */}
              <div style={styles.formStep}>
                <h3 style={styles.sectionTitle}>Personal Information</h3>
                <div style={styles.inputGroup}>
                  <input type="text" name="name" placeholder="Full Name *" value={formData.name} onChange={handleChange} style={styles.input} />
                  <User size={20} style={styles.icon} />
                </div>
                <div style={styles.inputGroup}>
                  <input type="email" name="email" placeholder="Email Address *" value={formData.email} onChange={handleChange} style={styles.input} />
                  <Mail size={20} style={styles.icon} />
                </div>
                <div style={styles.inputGroup}>
                  <input type="tel" name="mobile" placeholder="Mobile Number *" value={formData.mobile} onChange={handleChange} style={styles.input} />
                  <Phone size={20} style={styles.icon} />
                </div>
              </div>
              
              {/* --- Step 2: Academic --- */}
              <div style={styles.formStep}>
                <h3 style={styles.sectionTitle}>Academic Information</h3>
                <div style={styles.inputGroup}>
                  <select name="graduationYear" value={formData.graduationYear} onChange={handleChange} style={styles.select}>
                    <option value="">Graduation Year *</option>
                    {Array.from({ length: 30 }, (_, i) => {
                      const year = new Date().getFullYear() - i;
                      return <option key={year} value={year}>{year}</option>;
                    })}
                  </select>
                  <GraduationCap size={20} style={styles.icon} />
                </div>
                <div style={styles.inputGroup}>
                  <select name="department" value={formData.department} onChange={handleChange} style={styles.select}>
                    <option value="">Department *</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                  <Briefcase size={20} style={styles.icon} />
                </div>
              </div>
              
              {/* --- Step 3: Professional --- */}
              <div style={styles.formStep}>
                <h3 style={styles.sectionTitle}>Professional Information</h3>
                <div style={styles.inputGroup}>
                  <input type="text" name="jobTitle" placeholder="Current Job Title *" value={formData.jobTitle} onChange={handleChange} style={styles.input} />
                  <Briefcase size={20} style={styles.icon} />
                </div>
                <div style={styles.inputGroup}>
                  <input type="text" name="company" placeholder="Current Company *" value={formData.company} onChange={handleChange} style={styles.input} />
                  <Briefcase size={20} style={styles.icon} />
                </div>
                <div style={styles.inputGroup}>
                  <input type="text" name="location" placeholder="Current Location *" value={formData.location} onChange={handleChange} style={styles.input} />
                  <MapPin size={20} style={styles.icon} />
                </div>
                <div style={styles.inputGroup}>
                  <input type="url" name="linkedinUrl" placeholder="LinkedIn Profile URL" value={formData.linkedinUrl} onChange={handleChange} style={styles.input} />
                  <Linkedin size={20} style={styles.icon} />
                </div>
              </div>

              {/* --- Step 4: Bio & Photo --- */}
              <div style={styles.formStep}>
                <h3 style={styles.sectionTitle}>Profile & Bio</h3>
                <div style={styles.inputGroup}>
                  <textarea name="bio" placeholder="Professional Bio (Minimum 50 characters) *" value={formData.bio} onChange={handleChange} style={styles.textarea} />
                  <FileText size={0} style={styles.icon} />
                </div>
                <div style={styles.inputGroup}>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }}>
                    Profile Photo *
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <label style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px',
                      backgroundColor: '#f9fafb', border: '1px solid #d1d5db', borderRadius: '6px',
                      cursor: 'pointer', fontSize: '14px', transition: 'all 0.2s ease'
                    }}>
                      <Camera size={16} />
                      Choose File
                      <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                    </label>
                    {formData.profileImage && (
                      <span style={{ fontSize: '14px', color: '#059669' }}>✓ Photo selected</span>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
          
          {/* --- Navigation Buttons --- */}
          <div style={styles.navigation}>
            <button 
              type="button" 
              onClick={handleBack}
              style={{
                ...styles.navButton, 
                ...styles.backButton,
                visibility: step > 1 ? 'visible' : 'hidden' 
              }}
            >
              <ArrowLeft size={18} />
              Back
            </button>

            {step < 4 ? (
              <button 
                type="button" 
                onClick={handleNext}
                style={{...styles.navButton, ...styles.nextButton}}
              >
                Next
                <ArrowRight size={18} />
              </button>
            ) : (
              <button 
                type="submit" 
                style={{...styles.navButton, ...styles.nextButton}}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Registering...' : 'Register as Alumni'}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* --- Success Modal --- */}
      {showSuccessModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <CheckCircle size={50} color="#10b981" style={{ marginBottom: '20px' }} />
            <h2 style={styles.modalTitle}>Registration Submitted</h2>
            <p style={styles.modalText}>
              Your registration has been successfully submitted. It is now **pending** approval from the admin team. You will be notified once your 
              profile is active.
            </p>
            <button 
              style={styles.modalButton} 
              onClick={handleModalClose}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#004a99'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlumniRegistration;