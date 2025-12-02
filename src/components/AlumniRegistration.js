import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  MapPin,
  Linkedin,
  FileText,
  Camera,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

const AlumniRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    graduationYear: "",
    department: "",
    jobTitle: "",
    company: "",
    location: "",
    linkedinUrl: "",
    bio: "",
    profileImage: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const departments = [
    "CS & Business Systems (CSBS)",
    "AI & Machine Learning (AIML)",
    "CSE Data Science (CSE-DS)",
    "Masters",
  ];

  // ------------------------ Styles ------------------------
  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#f0f2f5",
      display: "flex",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "'Inter', sans-serif",
    },
    card: {
      backgroundColor: "white",
      borderRadius: "14px",
      padding: "30px 35px",
      width: "100%",
      maxWidth: "560px",
      boxShadow:
        "0 10px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
      display: "flex",
      flexDirection: "column",
      maxHeight: "95vh",
    },
    title: {
      fontSize: "1.9rem",
      fontWeight: "700",
      textAlign: "center",
      marginBottom: "6px",
      color: "#111827",
      fontFamily: "'Poppins', sans-serif",
    },
    subtitle: {
      textAlign: "center",
      marginBottom: "22px",
      color: "#6b7280",
    },

    // --- Progress Bar ---
    progressBarOuter: {
      width: "100%",
      marginBottom: "22px",
    },
    progressLabel: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "14px",
      color: "#6b7280",
      marginBottom: "6px",
    },
    progressTrack: {
      width: "100%",
      height: "8px",
      borderRadius: "4px",
      backgroundColor: "#e5e7eb",
      overflow: "hidden",
    },
    progressFill: {
      width: `${(step / 4) * 100}%`,
      height: "8px",
      backgroundColor: "#0056b3",
      transition: "0.3s ease",
    },

    // --- Slider ---
    sliderWrapper: {
      overflow: "hidden",
      flex: 1,
    },
    slider: {
      display: "flex",
      width: "400%",
      transform: `translateX(${-(step - 1) * 25}%)`,
      transition: "transform 0.4s ease",
    },
    stepBox: {
      width: "25%",
      paddingRight: "10px",
      overflowY: "auto",
      maxHeight: "60vh",
    },

    sectionTitle: {
      fontWeight: "600",
      fontSize: "1.25rem",
      marginBottom: "18px",
    },
    inputGroup: {
      marginBottom: "18px",
      position: "relative",
    },
    input: {
      width: "100%",
      padding: "12px 40px 12px 12px",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      backgroundColor: "#f9fafb",
      fontSize: "15px",
    },
    icon: {
      position: "absolute",
      right: "12px",
      top: "12px",
      color: "#9ca3af",
    },

    navigation: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "18px",
      paddingTop: "15px",
      borderTop: "1px solid #eee",
    },
    navBtn: {
      padding: "10px 22px",
      borderRadius: "6px",
      fontSize: "15px",
      cursor: "pointer",
      fontWeight: 600,
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    nextBtn: {
      backgroundColor: "#0056b3",
      color: "white",
    },
    backBtn: {
      backgroundColor: "#f3f4f6",
      color: "#444",
      border: "1px solid #d1d5db",
    },

    error: {
      backgroundColor: "#fee2e2",
      padding: "10px",
      color: "#dc2626",
      borderRadius: "6px",
      marginBottom: "10px",
      textAlign: "center",
      border: "1px solid #fca5a5",
    },

    // Modal
    modalOverlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 100,
    },
    modalCard: {
      background: "#fff",
      padding: "30px",
      borderRadius: "10px",
      width: "90%",
      maxWidth: "380px",
      textAlign: "center",
    },
    modalBtn: {
      background: "#0056b3",
      color: "#fff",
      padding: "10px 25px",
      borderRadius: "6px",
      fontWeight: 600,
      cursor: "pointer",
    },
  };

  // ------------------------ Form Logic ------------------------
  const handleNext = () => {
    setError("");

    if (step === 1 && (!formData.name || !formData.email || !formData.mobile)) {
      setError("Please fill all personal information fields.");
      return;
    }

    if (step === 2 && (!formData.graduationYear || !formData.department)) {
      setError("Please fill academic details.");
      return;
    }

    if (
      step === 3 &&
      (!formData.jobTitle || !formData.company || !formData.location)
    ) {
      setError("Please fill professional details.");
      return;
    }

    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => step > 1 && setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.profileImage) {
      setError("Please upload a profile image.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newData = {
        id: Date.now(),
        ...formData,
        status: "pending",
        registrationDate: new Date().toISOString().slice(0, 10),
      };

      const saved = JSON.parse(localStorage.getItem("alumniData") || "[]");
      saved.push(newData);
      localStorage.setItem("alumniData", JSON.stringify(saved));

      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 1200);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () =>
      setFormData((prev) => ({ ...prev, profileImage: reader.result }));
    reader.readAsDataURL(file);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Alumni Registration</h1>
        <p style={styles.subtitle}>Join our alumni community</p>

        {/* Progress Bar */}
        <div style={styles.progressBarOuter}>
          <div style={styles.progressLabel}>
            <span>Step {step} / 4</span>
            <span>
              {["Personal Info", "Academic Info", "Professional Info", "Profile"][step - 1]}
            </span>
          </div>
          <div style={styles.progressTrack}>
            <div style={styles.progressFill}></div>
          </div>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        {/* Slider */}
        <form onSubmit={handleSubmit}>
          <div style={styles.sliderWrapper}>
            <div style={styles.slider}>
              {/* Step 1 */}
              <div style={styles.stepBox}>
                <h3 style={styles.sectionTitle}>Personal Information</h3>

                <div style={styles.inputGroup}>
                  <input
                    style={styles.input}
                    name="name"
                    value={formData.name}
                    placeholder="Full Name *"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                  <User size={20} style={styles.icon} />
                </div>

                <div style={styles.inputGroup}>
                  <input
                    type="email"
                    style={styles.input}
                    name="email"
                    value={formData.email}
                    placeholder="Email *"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  <Mail size={20} style={styles.icon} />
                </div>

                <div style={styles.inputGroup}>
                  <input
                    style={styles.input}
                    name="mobile"
                    value={formData.mobile}
                    placeholder="Mobile Number *"
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                  />
                  <Phone size={20} style={styles.icon} />
                </div>
              </div>

              {/* Step 2 */}
              <div style={styles.stepBox}>
                <h3 style={styles.sectionTitle}>Academic Information</h3>

                <div style={styles.inputGroup}>
                  <select
                    name="graduationYear"
                    style={styles.input}
                    value={formData.graduationYear}
                    onChange={(e) =>
                      setFormData({ ...formData, graduationYear: e.target.value })
                    }
                  >
                    <option value="">Select Graduation Year*</option>
                    {Array.from({ length: 12 }, (_, i) => {
                      const year = 2030 - i;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                  <GraduationCap size={20} style={styles.icon} />
                </div>

                <div style={styles.inputGroup}>
                  <select
                    name="department"
                    style={styles.input}
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                  >
                    <option value="">Select Department *</option>
                    {departments.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                  <Briefcase size={20} style={styles.icon} />
                </div>
              </div>

              {/* Step 3 */}
              <div style={styles.stepBox}>
                <h3 style={styles.sectionTitle}>Professional Information</h3>

                <div style={styles.inputGroup}>
                  <input
                    style={styles.input}
                    name="jobTitle"
                    placeholder="Current Job Title *"
                    value={formData.jobTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, jobTitle: e.target.value })
                    }
                  />
                  <Briefcase size={20} style={styles.icon} />
                </div>

                <div style={styles.inputGroup}>
                  <input
                    style={styles.input}
                    name="company"
                    placeholder="Company *"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                  />
                  <Briefcase size={20} style={styles.icon} />
                </div>

                <div style={styles.inputGroup}>
                  <input
                    style={styles.input}
                    name="location"
                    placeholder="Current Location *"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                  <MapPin size={20} style={styles.icon} />
                </div>

                <div style={styles.inputGroup}>
                  <input
                    style={styles.input}
                    name="linkedinUrl"
                    placeholder="LinkedIn URL"
                    value={formData.linkedinUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, linkedinUrl: e.target.value })
                    }
                  />
                  <Linkedin size={20} style={styles.icon} />
                </div>
              </div>

              {/* Step 4 */}
              <div style={styles.stepBox}>
                <h3 style={styles.sectionTitle}>Profile & Bio</h3>

                <div style={styles.inputGroup}>
                  <textarea
                    style={{ ...styles.input, minHeight: "100px" }}
                    name="bio"
                    placeholder="Write your professional bio *"
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                  ></textarea>
                  <FileText size={20} style={styles.icon} />
                </div>

                {/* Image Upload */}
                <label style={{ fontSize: "14px", fontWeight: 500 }}>Profile Photo *</label>
                <div style={{ marginBottom: "20px", marginTop: "8px" }}>
                  <label
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                      cursor: "pointer",
                      background: "#f9fafb",
                      gap: "8px",
                    }}
                  >
                    <Camera size={18} />
                    Upload Photo
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                  </label>

                  {formData.profileImage && (
                    <span style={{ marginLeft: "10px", color: "#059669", fontWeight: 500 }}>
                      ✓ Selected
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div style={styles.navigation}>
            <button
              type="button"
              style={{ ...styles.navBtn, ...styles.backBtn, visibility: step === 1 ? "hidden" : "visible" }}
              onClick={handleBack}
            >
              <ArrowLeft size={18} /> Back
            </button>

            {step < 4 ? (
              <button
                type="button"
                style={{ ...styles.navBtn, ...styles.nextBtn }}
                onClick={handleNext}
              >
                Next <ArrowRight size={18} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                style={{ ...styles.navBtn, ...styles.nextBtn, opacity: isSubmitting ? 0.7 : 1 }}
              >
                {isSubmitting ? "Registering..." : "Submit Registration"}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            <CheckCircle size={55} color="#10b981" style={{ marginBottom: "12px" }} />
            <h2 style={{ fontSize: "1.4rem", fontWeight: 600 }}>Registration Submitted</h2>
            <p style={{ color: "#6b7280", marginTop: "10px" }}>
              Your registration is **pending admin approval**.
            </p>
            <button style={styles.modalBtn} onClick={() => navigate("/alumni")}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlumniRegistration;
