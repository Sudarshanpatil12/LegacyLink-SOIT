// src/components/Gallery.js
import React, { useState } from 'react';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  // Sample gallery data - replace with your actual images
  const galleryData = {
    all: [
      {
        id: 1,
        src: "/images/rgpv2.png",
        title: 'Campus View',
        category: 'campus',
        description: 'Beautiful view of RGPV campus'
      },
      {
        id: 2,
        src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&h=300&fit=crop',
        title: 'Graduation Day',
        category: 'events',
        description: 'Graduation ceremony 2023'
      },
      {
        id: 3,
        src: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?w=400&h=300&fit=crop',
        title: 'Lab Session',
        category: 'academics',
        description: 'Students working in computer lab'
      },
      {
        id: 4,
        src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop',
        title: 'Team Meeting',
        category: 'events',
        description: 'Alumni team planning session'
      },
      {
        id: 5,
        src: 'https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=400&h=300&fit=crop',
        title: 'Library',
        category: 'campus',
        description: 'Central library building'
      },
      {
        id: 6,
        src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop',
        title: 'Workshop',
        category: 'events',
        description: 'Technical workshop session'
      },
      {
        id: 7,
        src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop',
        title: 'Sports Day',
        category: 'sports',
        description: 'Annual sports competition'
      },
      {
        id: 8,
        src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop',
        title: 'Cultural Fest',
        category: 'events',
        description: 'College cultural festival'
      },
      {
        id: 9,
        src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
        title: 'Lecture Hall',
        category: 'academics',
        description: 'Modern lecture theater'
      }
    ],
    campus: [
      {
        id: 1,
        src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop',
        title: 'Campus View',
        category: 'campus',
        description: 'Beautiful view of RGPV campus'
      },
      {
        id: 5,
        src: 'https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=400&h=300&fit=crop',
        title: 'Library',
        category: 'campus',
        description: 'Central library building'
      },
      {
        id: 10,
        src: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop',
        title: 'Main Building',
        category: 'campus',
        description: 'University main building'
      }
    ],
    events: [
      {
        id: 2,
        src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&h=300&fit=crop',
        title: 'Graduation Day',
        category: 'events',
        description: 'Graduation ceremony 2023'
      },
      {
        id: 4,
        src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop',
        title: 'Team Meeting',
        category: 'events',
        description: 'Alumni team planning session'
      },
      {
        id: 6,
        src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop',
        title: 'Workshop',
        category: 'events',
        description: 'Technical workshop session'
      },
      {
        id: 8,
        src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop',
        title: 'Cultural Fest',
        category: 'events',
        description: 'College cultural festival'
      }
    ],
    academics: [
      {
        id: 3,
        src: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?w=400&h=300&fit=crop',
        title: 'Lab Session',
        category: 'academics',
        description: 'Students working in computer lab'
      },
      {
        id: 9,
        src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
        title: 'Lecture Hall',
        category: 'academics',
        description: 'Modern lecture theater'
      },
      {
        id: 11,
        src: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
        title: 'Research Lab',
        category: 'academics',
        description: 'Advanced research laboratory'
      }
    ],
    sports: [
      {
        id: 7,
        src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop',
        title: 'Sports Day',
        category: 'sports',
        description: 'Annual sports competition'
      },
      {
        id: 12,
        src: 'https://images.unsplash.com/photo-1536922246289-88c42f957773?w=400&h=300&fit=crop',
        title: 'Cricket Match',
        category: 'sports',
        description: 'Inter-college cricket tournament'
      }
    ]
  };

  const categories = [
    { id: 'all', name: 'All Photos', count: galleryData.all.length },
    { id: 'campus', name: 'Campus', count: galleryData.campus.length },
    { id: 'events', name: 'Events', count: galleryData.events.length },
    { id: 'academics', name: 'Academics', count: galleryData.academics.length },
    { id: 'sports', name: 'Sports', count: galleryData.sports.length }
  ];

  const currentImages = selectedCategory === 'all' ? galleryData.all : galleryData[selectedCategory];

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: "'Inter', sans-serif",
    },
    header: {
      background: 'linear-gradient(135deg, #0a4a7a 0%, #1e6ba8 100%)',
      color: 'white',
      padding: '80px 20px 60px',
      textAlign: 'center',
    },
    headerTitle: {
      fontSize: '3rem',
      fontWeight: '800',
      marginBottom: '16px',
      fontFamily: "'Poppins', sans-serif",
    },
    headerSubtitle: {
      fontSize: '1.2rem',
      opacity: 0.9,
      maxWidth: '600px',
      margin: '0 auto',
      lineHeight: '1.6',
    },
    content: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
    },
    filters: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '12px',
      marginBottom: '40px',
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    },
    filterButton: {
      padding: '12px 24px',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      backgroundColor: 'white',
      color: '#6b7280',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    activeFilter: {
      backgroundColor: '#0a4a7a',
      color: 'white',
      borderColor: '#0a4a7a',
    },
    galleryGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '24px',
      marginBottom: '40px',
    },
    galleryItem: {
      position: 'relative',
      borderRadius: '12px',
      overflow: 'hidden',
      cursor: 'pointer',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      backgroundColor: 'white',
    },
    galleryImage: {
      width: '100%',
      height: '250px',
      objectFit: 'cover',
      transition: 'transform 0.3s ease',
    },
    imageOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))',
      color: 'white',
      padding: '20px',
      transform: 'translateY(100%)',
      transition: 'transform 0.3s ease',
    },
    imageTitle: {
      fontSize: '1.1rem',
      fontWeight: '600',
      marginBottom: '8px',
    },
    imageDescription: {
      fontSize: '0.9rem',
      opacity: 0.8,
      lineHeight: '1.4',
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
    },
    modalContent: {
      position: 'relative',
      maxWidth: '90vw',
      maxHeight: '90vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    modalImage: {
      maxWidth: '100%',
      maxHeight: '70vh',
      objectFit: 'contain',
      borderRadius: '8px',
    },
    modalInfo: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      marginTop: '20px',
      maxWidth: '600px',
      textAlign: 'center',
    },
    modalTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '8px',
    },
    modalDescription: {
      color: '#6b7280',
      lineHeight: '1.6',
    },
    closeButton: {
      position: 'absolute',
      top: '-40px',
      right: '0',
      background: 'none',
      border: 'none',
      color: 'white',
      fontSize: '2rem',
      cursor: 'pointer',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    navButtons: {
      position: 'absolute',
      top: '50%',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0 20px',
      transform: 'translateY(-50%)',
    },
    navButton: {
      background: 'rgba(255, 255, 255, 0.2)',
      border: 'none',
      color: 'white',
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      transition: 'background-color 0.3s ease',
    },
    stats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      marginBottom: '40px',
    },
    statCard: {
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '12px',
      textAlign: 'center',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    },
    statNumber: {
      fontSize: '2.5rem',
      fontWeight: '800',
      color: '#0a4a7a',
      marginBottom: '8px',
    },
    statLabel: {
      color: '#6b7280',
      fontWeight: '600',
      textTransform: 'uppercase',
      fontSize: '0.8rem',
      letterSpacing: '0.5px',
    },
    emptyState: {
      textAlign: 'center',
      padding: '60px 20px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    },
    emptyIcon: {
      fontSize: '4rem',
      marginBottom: '16px',
      color: '#d1d5db',
    },
    emptyTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#6b7280',
      marginBottom: '8px',
    },
    emptyText: {
      color: '#9ca3af',
    },
  };

  const handleNextImage = () => {
    const currentIndex = currentImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % currentImages.length;
    setSelectedImage(currentImages[nextIndex]);
  };

  const handlePrevImage = () => {
    const currentIndex = currentImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    setSelectedImage(currentImages[prevIndex]);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Gallery</h1>
        <p style={styles.headerSubtitle}>
          Explore the vibrant life at RGPV through our collection of memorable moments, 
          campus views, and special events
        </p>
      </div>

      <div style={styles.content}>
        {/* Stats */}
        <div style={styles.stats}>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>{galleryData.all.length}+</div>
            <div style={styles.statLabel}>Photos</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>{categories.length - 1}</div>
            <div style={styles.statLabel}>Categories</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>2020-2024</div>
            <div style={styles.statLabel}>Years Covered</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>1000+</div>
            <div style={styles.statLabel}>Memories</div>
          </div>
        </div>

        {/* Category Filters */}
        <div style={styles.filters}>
          {categories.map(category => (
            <button
              key={category.id}
              style={{
                ...styles.filterButton,
                ...(selectedCategory === category.id ? styles.activeFilter : {})
              }}
              onClick={() => setSelectedCategory(category.id)}
              onMouseEnter={(e) => {
                if (selectedCategory !== category.id) {
                  e.target.style.backgroundColor = '#f3f4f6';
                  e.target.style.borderColor = '#d1d5db';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category.id) {
                  e.target.style.backgroundColor = 'white';
                  e.target.style.borderColor = '#e5e7eb';
                }
              }}
            >
              {category.name}
              <span style={{
                backgroundColor: selectedCategory === category.id ? 'rgba(255,255,255,0.2)' : '#f3f4f6',
                color: selectedCategory === category.id ? 'white' : '#6b7280',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '0.8rem',
                fontWeight: '600',
              }}>
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div style={styles.galleryGrid}>
          {currentImages.map(image => (
            <div
              key={image.id}
              style={styles.galleryItem}
              onClick={() => setSelectedImage(image)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 25px rgba(0, 0, 0, 0.15)';
                e.currentTarget.querySelector('img').style.transform = 'scale(1.05)';
                e.currentTarget.querySelector('[data-overlay]').style.transform = 'translateY(0)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                e.currentTarget.querySelector('img').style.transform = 'scale(1)';
                e.currentTarget.querySelector('[data-overlay]').style.transform = 'translateY(100%)';
              }}
            >
              <img
                src={image.src}
                alt={image.title}
                style={styles.galleryImage}
              />
              <div data-overlay style={styles.imageOverlay}>
                <h3 style={styles.imageTitle}>{image.title}</h3>
                <p style={styles.imageDescription}>{image.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {currentImages.length === 0 && (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📷</div>
            <h3 style={styles.emptyTitle}>No photos found</h3>
            <p style={styles.emptyText}>
              We couldn't find any photos in this category. Please try another category.
            </p>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div style={styles.modal} onClick={() => setSelectedImage(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              style={styles.closeButton}
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            
            <div style={styles.navButtons}>
              <button
                style={styles.navButton}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage();
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
              >
                ‹
              </button>
              <button
                style={styles.navButton}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
              >
                ›
              </button>
            </div>

            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              style={styles.modalImage}
            />
            
            <div style={styles.modalInfo}>
              <h2 style={styles.modalTitle}>{selectedImage.title}</h2>
              <p style={styles.modalDescription}>{selectedImage.description}</p>
              <div style={{
                marginTop: '12px',
                padding: '6px 12px',
                backgroundColor: '#f3f4f6',
                borderRadius: '20px',
                fontSize: '0.8rem',
                color: '#6b7280',
                fontWeight: '500',
                display: 'inline-block',
              }}>
                {selectedImage.category.charAt(0).toUpperCase() + selectedImage.category.slice(1)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;