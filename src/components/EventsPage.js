import React, { useState } from 'react';
import { 
  Calendar, MapPin, Clock, Users, Send, RadioTower, 
  Code, Briefcase, Filter, ArrowUpRight, Star,
  Award, TrendingUp, UserCheck, Building
} from 'lucide-react';

const EventsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // --- ENHANCED EVENTS DATA ---
  const events = [
    {
      id: 1,
      title: "GDG SOIT: Cloud Dev Day",
      date: "2025-11-22",
      time: "10:00 AM - 4:00 PM",
      location: "SOIT, RGPV",
      description: "Join Google Developer Groups SOIT for a comprehensive day of cloud workshops, hands-on labs, and expert talks on Google Cloud Platform and Firebase. Perfect for developers looking to scale their skills.",
      image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&h=400&fit=crop",
      category: "society",
      attendees: 120,
      status: "upcoming",
      registrationUrl: "#",
      featured: true,
      organizer: "GDG SOIT",
      tags: ["Cloud", "Workshop", "GCP"],
      price: "Free"
    },
    {
      id: 2,
      title: "SOIT Placement Career Fair 2025",
      date: "2025-11-05",
      time: "9:00 AM - 5:00 PM",
      location: "RGPV Auditorium",
      description: "Connect with top recruiters from leading tech companies including Microsoft, Google, and emerging startups. Exclusive opportunities for final and pre-final year students.",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop",
      category: "career",
      attendees: 450,
      status: "upcoming",
      registrationUrl: "#",
      featured: true,
      organizer: "SOIT Placement Cell",
      tags: ["Career", "Recruitment", "Networking"],
      price: "Free"
    },
    {
      id: 3,
      title: "IEEE SOIT: 'Innovate' Ideathon 2025",
      date: "2025-12-02",
      time: "48-Hour Event",
      location: "Virtual Event",
      description: "A 48-hour intensive ideathon challenging participants to build innovative solutions for real-world problems. Sponsored by IEEE SOIT Student Branch with industry mentors.",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop",
      category: "society",
      attendees: 80,
      status: "upcoming",
      registrationUrl: "#",
      featured: false,
      organizer: "IEEE SOIT",
      tags: ["Hackathon", "Innovation", "IEEE"],
      price: "Free"
    },
    {
      id: 4,
      title: "Annual Alumni Meet 2025",
      date: "2025-12-20",
      time: "10:00 AM - 6:00 PM",
      location: "RGPV Campus, Bhopal",
      description: "Reconnect with SOIT alumni network spanning decades. Network with industry leaders, share experiences, and explore collaboration opportunities.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
      category: "alumni",
      attendees: 300,
      status: "upcoming",
      registrationUrl: "#",
      featured: true,
      organizer: "SOIT Alumni Association",
      tags: ["Networking", "Alumni", "Community"],
      price: "₹500"
    },
    {
      id: 5,
      title: "Full-Stack Web Development Masterclass",
      date: "2025-10-12",
      time: "2:00 PM - 6:00 PM",
      location: "Computer Lab, SOIT",
      description: "Advanced hands-on workshop covering modern MERN stack development, deployment strategies, and best practices for building scalable web applications.",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop",
      category: "workshop",
      attendees: 60,
      status: "past",
      registrationUrl: "#",
      featured: false,
      organizer: "SOIT Tech Club",
      tags: ["Web Development", "MERN", "Workshop"],
      price: "Free"
    },
    {
      id: 6,
      title: "TechnoIgnis 2025 - Annual Tech Symposium",
      date: "2025-04-18",
      time: "9:00 AM - 5:00 PM",
      location: "SOIT Building",
      description: "The premier technical symposium featuring cutting-edge research presentations, project exhibitions, and keynote sessions from industry pioneers.",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop",
      category: "tech",
      attendees: 500,
      status: "past",
      registrationUrl: "#",
      featured: true,
      organizer: "SOIT Technical Board",
      tags: ["Symposium", "Research", "Innovation"],
      price: "₹200"
    },
    {
      id: 7,
      title: "HackSOIT 2025 - 36-Hour Hackathon",
      date: "2025-03-15",
      time: "36-Hour Hackathon",
      location: "RGPV Auditorium",
      description: "SOIT's flagship hackathon bringing together the brightest minds for 36 hours of innovation, collaboration, and groundbreaking project development.",
      image: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=600&h=400&fit=crop",
      category: "hackathon",
      attendees: 200,
      status: "past",
      registrationUrl: "#",
      featured: true,
      organizer: "SOIT Coding Club",
      tags: ["Hackathon", "Coding", "Innovation"],
      price: "Free"
    },
    {
      id: 8,
      title: "TechNova 2025 - Cultural & Tech Fest",
      date: "2025-02-25",
      time: "6:00 PM - 11:00 PM",
      location: "Open Air Theater, RGPV",
      description: "Annual cultural extravaganza blending technology showcases with artistic performances, competitions, and industry networking sessions.",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop",
      category: "cultural",
      attendees: 1200,
      status: "past",
      registrationUrl: "#",
      featured: false,
      organizer: "SOIT Cultural Committee",
      tags: ["Cultural", "Tech", "Festival"],
      price: "₹300"
    }
  ];

  // --- ENHANCED CATEGORIES ---
  const categories = [
    { id: 'all', name: 'All Events', icon: <Calendar size={18} />, count: events.length },
    { id: 'society', name: 'Society Events', icon: <Building size={18} />, count: events.filter(e => e.category === 'society').length },
    { id: 'career', name: 'Career Fair', icon: <Briefcase size={18} />, count: events.filter(e => e.category === 'career').length },
    { id: 'workshop', name: 'Workshops', icon: <Code size={18} />, count: events.filter(e => e.category === 'workshop').length },
    { id: 'alumni', name: 'Alumni', icon: <UserCheck size={18} />, count: events.filter(e => e.category === 'alumni').length },
    { id: 'tech', name: 'Tech Symposium', icon: <TrendingUp size={18} />, count: events.filter(e => e.category === 'tech').length },
    { id: 'hackathon', name: 'Hackathons', icon: <RadioTower size={18} />, count: events.filter(e => e.category === 'hackathon').length },
    { id: 'cultural', name: 'Cultural', icon: <Award size={18} />, count: events.filter(e => e.category === 'cultural').length }
  ];

  // --- SORTING LOGIC ---
  const getSortedEvents = (events) => {
    switch (sortBy) {
      case 'date':
        return [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
      case 'attendees':
        return [...events].sort((a, b) => b.attendees - a.attendees);
      case 'featured':
        return [...events].sort((a, b) => (b.featured - a.featured));
      default:
        return events;
    }
  };

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  const sortedEvents = getSortedEvents(filteredEvents);
  const upcomingEvents = events.filter(event => event.status === 'upcoming');
  const pastEvents = events.filter(event => event.status === 'past');
  const featuredEvents = events.filter(event => event.featured);

  return (
    <div style={styles.container}>
      {/* Enhanced Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          
          <h1 style={styles.headerTitle}>SOIT Events & Reunions</h1>
          <p style={styles.headerSubtitle}>
            Connect, learn, and grow with the SOIT community through curated events, workshops, and networking opportunities
          </p>
          {/* <div style={styles.headerStats}>
            <div style={styles.headerStat}>
              <div style={styles.statNumber}>{events.length}+</div>
              <div style={styles.statLabel}>Total Events</div>
            </div>
            <div style={styles.headerStat}>
              <div style={styles.statNumber}>{featuredEvents.length}</div>
              <div style={styles.statLabel}>Featured</div>
            </div>
            <div style={styles.headerStat}>
              <div style={styles.statNumber}>5000+</div>
              <div style={styles.statLabel}>Community</div>
            </div>
          </div> */}
        </div>
      </div>

      <div style={styles.mainContainer}>
        {/* Enhanced Stats Section */}
        <div style={styles.statsSection}>
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>
                <Calendar size={24} color="#0a4a7a" />
              </div>
              <div style={styles.statContent}>
                <div style={styles.statNumber}>{upcomingEvents.length}</div>
                <div style={styles.statLabel}>Upcoming Events</div>
              </div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>
                <Users size={24} color="#0a4a7a" />
              </div>
              <div style={styles.statContent}>
                <div style={styles.statNumber}>{pastEvents.reduce((sum, event) => sum + event.attendees, 0)}+</div>
                <div style={styles.statLabel}>Total Participants</div>
              </div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>
                <Award size={24} color="#0a4a7a" />
              </div>
              <div style={styles.statContent}>
                <div style={styles.statNumber}>{categories.length - 1}</div>
                <div style={styles.statLabel}>Event Categories</div>
              </div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>
                <TrendingUp size={24} color="#0a4a7a" />
              </div>
              <div style={styles.statContent}>
                <div style={styles.statNumber}>98%</div>
                <div style={styles.statLabel}>Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div style={styles.controls}>
          <div style={styles.categoryFilters}>
            {categories.map(category => (
              <button
                key={category.id}
                className="filter-button"
                style={{
                  ...styles.filterButton,
                  ...(selectedCategory === category.id && styles.activeFilter)
                }}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span style={styles.filterIcon}>{category.icon}</span>
                {category.name}
                <span style={{
                  ...styles.filterCount,
                  ...(selectedCategory === category.id && styles.activeFilterCount)
                }}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          <div style={styles.sortContainer}>
            <Filter size={16} />
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              style={styles.sortSelect}
            >
              <option value="date">Sort by Date</option>
              <option value="attendees">Sort by Popularity</option>
              <option value="featured">Sort by Featured</option>
            </select>
          </div>
        </div>

        {/* Featured Events Banner */}
        {featuredEvents.length > 0 && selectedCategory === 'all' && (
          <div style={styles.featuredSection}>
            <div style={styles.sectionHeader}>
              <Star size={20} color="#f59e0b" />
              <h2 style={styles.sectionTitle}>Featured Events</h2>
            </div>
            <div style={styles.featuredGrid}>
              {featuredEvents.slice(0, 2).map(event => (
                <div key={event.id} style={styles.featuredCard} className="event-card">
                  {event.featured && (
                    <div style={styles.featuredBadge}>
                      <Star size={12} />
                      Featured
                    </div>
                  )}
                  <img src={event.image} alt={event.title} style={styles.featuredImage} />
                  <div style={styles.featuredContent}>
                    <div style={styles.eventHeader}>
                      <h3 style={styles.eventTitle}>{event.title}</h3>
                      <span style={styles.priceTag}>{event.price}</span>
                    </div>
                    <div style={styles.organizer}>{event.organizer}</div>
                    <div style={styles.eventMeta}>
                      <div style={styles.metaItem}>
                        <Calendar size={14} />
                        <span>{event.date}</span>
                      </div>
                      <div style={styles.metaItem}>
                        <MapPin size={14} />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <p style={styles.eventDescription}>{event.description}</p>
                    <div style={styles.eventFooter}>
                      <div style={styles.attendees}>
                        <Users size={14} />
                        <span>{event.attendees} {event.status === 'upcoming' ? 'registered' : 'attended'}</span>
                      </div>
                      <button style={styles.registerButton} className="register-button">
                        {event.status === 'upcoming' ? 'Register Now' : 'View Recap'}
                        <ArrowUpRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Events Grid */}
        <div style={styles.eventsSection}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>
              {selectedCategory === 'all' ? 'All Events' : 
               categories.find(cat => cat.id === selectedCategory)?.name}
            </h2>
            <span style={styles.resultsCount}>{sortedEvents.length} events</span>
          </div>

          <div style={styles.eventsGrid}>
            {sortedEvents.map(event => (
              <div key={event.id} style={styles.eventCard} className="event-card">
                {event.featured && (
                  <div style={styles.featuredBadge}>
                    <Star size={12} />
                    Featured
                  </div>
                )}
                <img src={event.image} alt={event.title} style={styles.eventImage} />
                <div style={styles.eventContent}>
                  <div style={styles.eventHeader}>
                    <h3 style={styles.eventTitle}>{event.title}</h3>
                    <div style={styles.eventMetaCompact}>
                      <span style={{
                        ...styles.statusBadge,
                        ...(event.status === 'upcoming' ? styles.statusUpcoming : styles.statusPast)
                      }}>
                        {event.status}
                      </span>
                      <span style={styles.priceTag}>{event.price}</span>
                    </div>
                  </div>
                  
                  <div style={styles.organizer}>{event.organizer}</div>

                  <div style={styles.eventMeta}>
                    <div style={styles.metaItem}>
                      <Calendar size={14} />
                      <span>{event.date}</span>
                    </div>
                    <div style={styles.metaItem}>
                      <Clock size={14} />
                      <span>{event.time}</span>
                    </div>
                    <div style={styles.metaItem}>
                      <MapPin size={14} />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <p style={styles.eventDescription}>{event.description}</p>

                  <div style={styles.tags}>
                    {event.tags.map((tag, index) => (
                      <span key={index} style={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div style={styles.eventFooter}>
                    <div style={styles.attendees}>
                      <Users size={14} />
                      <span>{event.attendees} {event.status === 'upcoming' ? 'registered' : 'attended'}</span>
                    </div>
                    <button style={styles.registerButton} className="register-button">
                      {event.status === 'upcoming' ? 'Register' : 'View Recap'}
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {sortedEvents.length === 0 && (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📅</div>
            <h3 style={styles.emptyTitle}>No events found</h3>
            <p style={styles.emptyText}>Try selecting a different category or check back later for new events</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- ENHANCED PROFESSIONAL STYLES ---
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  header: {
    background: 'linear-gradient(135deg, #0a4a7a 0%, #1e6ba8 100%)',
    color: 'white',
    padding: '80px 20px 60px',
    position: 'relative',
    overflow: 'hidden',
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center',
    position: 'relative',
    zIndex: 2,
  },
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '20px',
    fontSize: '0.9rem',
    opacity: 0.9,
  },
  breadcrumbItem: {
    fontWeight: '500',
  },
  breadcrumbSeparator: {
    opacity: 0.6,
  },
  headerTitle: {
    fontSize: '3.5rem',
    fontWeight: '800',
    marginBottom: '16px',
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: '-0.02em',
    background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  headerSubtitle: {
    fontSize: '1.2rem',
    opacity: 0.9,
    maxWidth: '600px',
    margin: '0 auto 40px',
    lineHeight: '1.6',
    fontWeight: '400',
  },
  headerStats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    flexWrap: 'wrap',
  },
  headerStat: {
    textAlign: 'center',
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: '800',
    marginBottom: '4px',
  },
  statLabel: {
    fontSize: '0.9rem',
    opacity: 0.8,
    fontWeight: '500',
  },
  mainContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  statsSection: {
    marginBottom: '50px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  statCard: {
    backgroundColor: 'white',
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
    background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
  },
  statContent: {
    flex: 1,
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: '800',
    color: '#0a4a7a',
    marginBottom: '4px',
  },
  statLabel: {
    color: '#64748b',
    fontWeight: '600',
    fontSize: '0.9rem',
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px',
    flexWrap: 'wrap',
    gap: '20px',
  },
  categoryFilters: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    flex: 1,
  },
  filterButton: {
    padding: '12px 20px',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    backgroundColor: 'white',
    color: '#64748b',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.9rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  },
  activeFilter: {
    background: 'linear-gradient(135deg, #0a4a7a 0%, #1e6ba8 100%)',
    color: 'white',
    borderColor: '#0a4a7a',
    boxShadow: '0 4px 12px rgba(10, 74, 122, 0.2)',
  },
  filterIcon: {
    display: 'flex',
    alignItems: 'center',
  },
  filterCount: {
    backgroundColor: '#f1f5f9',
    color: '#0a4a7a',
    padding: '2px 8px',
    borderRadius: '8px',
    fontSize: '0.75rem',
    fontWeight: '700',
    minWidth: '24px',
    textAlign: 'center',
  },
  activeFilterCount: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
  },
  sortContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#64748b',
    fontWeight: '500',
  },
  sortSelect: {
    padding: '10px 12px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    backgroundColor: 'white',
    color: '#374151',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
  featuredSection: {
    marginBottom: '50px',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#0a4a7a',
    margin: 0,
  },
  featuredGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '24px',
  },
  featuredCard: {
    backgroundColor: 'white',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
    border: '1px solid #f1f5f9',
    transition: 'all 0.3s ease',
    position: 'relative',
  },
  featuredBadge: {
    position: 'absolute',
    top: '16px',
    left: '16px',
    backgroundColor: '#fef3c7',
    color: '#92400e',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    zIndex: 2,
    border: '1px solid #fbbf24',
  },
  featuredImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  featuredContent: {
    padding: '24px',
  },
  eventsSection: {
    marginBottom: '40px',
  },
  resultsCount: {
    color: '#64748b',
    fontSize: '0.9rem',
    fontWeight: '600',
    background: '#f1f5f9',
    padding: '6px 12px',
    borderRadius: '8px',
  },
  eventsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
    gap: '24px',
  },
  eventCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
    border: '1px solid #f1f5f9',
    transition: 'all 0.3s ease',
    position: 'relative',
  },
  eventImage: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
  },
  eventContent: {
    padding: '20px',
  },
  eventHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '8px',
    gap: '12px',
  },
  eventTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#0a4a7a',
    margin: 0,
    flex: 1,
    lineHeight: '1.3',
  },
  eventMetaCompact: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    alignItems: 'flex-end',
  },
  statusBadge: {
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '0.7rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    border: '1px solid transparent',
  },
  statusUpcoming: {
    backgroundColor: '#dcfce7',
    color: '#166534',
    borderColor: '#bbf7d0'
  },
  statusPast: {
    backgroundColor: '#f1f5f9',
    color: '#64748b',
    borderColor: '#e2e8f0'
  },
  priceTag: {
    fontSize: '0.8rem',
    fontWeight: '700',
    color: '#0a4a7a',
    background: '#f1f5f9',
    padding: '4px 8px',
    borderRadius: '6px',
  },
  organizer: {
    color: '#64748b',
    fontSize: '0.85rem',
    fontWeight: '600',
    marginBottom: '12px',
  },
  eventMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '12px',
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#64748b',
    fontSize: '0.85rem',
    fontWeight: '500',
  },
  eventDescription: {
    color: '#475569',
    fontSize: '0.9rem',
    lineHeight: '1.5',
    marginBottom: '16px',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginBottom: '16px',
  },
  tag: {
    padding: '4px 8px',
    backgroundColor: '#f1f5f9',
    color: '#475569',
    borderRadius: '6px',
    fontSize: '0.75rem',
    fontWeight: '600',
  },
  eventFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attendees: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#64748b',
    fontSize: '0.85rem',
    fontWeight: '500',
  },
  registerButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: 'linear-gradient(135deg, #0a4a7a 0%, #2563eb 100%)',
    color: 'white',
    padding: '10px 16px',
    borderRadius: '10px',
    border: 'none',
    fontSize: '0.85rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(10, 74, 122, 0.2)',
  },
  emptyState: {
    textAlign: 'center',
    padding: '80px 20px',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
    border: '1px solid #f1f5f9',
    gridColumn: '1 / -1',
  },
  emptyIcon: {
    fontSize: '4rem',
    marginBottom: '20px',
  },
  emptyTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#475569',
    marginBottom: '8px',
  },
  emptyText: {
    color: '#94a3b8',
    maxWidth: '300px',
    margin: '0 auto',
  },
};

// --- ENHANCED HOVER EFFECTS ---
const hoverEffects = `
  .event-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
  }
  
  .stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.1);
  }
  
  .register-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(10, 74, 122, 0.3);
  }
  
  .filter-button:not(.active):hover {
    background-color: #f8fafc;
    border-color: #cbd5e1;
    transform: translateY(-1px);
  }
`;

// Wrapper component to inject styles
const EventsPageWithStyles = () => {
  return (
    <>
      <style>{hoverEffects}</style>
      <EventsPage />
    </>
  );
};

export default EventsPageWithStyles;