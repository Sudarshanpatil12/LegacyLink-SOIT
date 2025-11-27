// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import EventsPage from './components/EventsPage';
import AlumniDirectory from './components/AlumniDirectory';
import AlumniRegistration from './components/AlumniRegistration';
import JobsPage from "./components/JobsPage";
import Footer from './components/Footer';
import Contact from './components/Contact';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import Gallery from './components/Gallery';
import Faculty from './components/Faculty';
import LinkedInCallback from './components/LinkedInCallback';

function App() {
  return (
    <AuthProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/register" element={<AlumniRegistration/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/admin" element={<AdminPanel/>} />
            <Route path="/auth/callback" element={<LinkedInCallback/>} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/alumni" element={<AlumniDirectory />} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/jobs" element={<JobsPage/>} />
            <Route path="/faculty" element={<Faculty/>} />

            <Route path="*" element={<h1 style={{ textAlign: 'center', marginTop: '40px', fontSize: '1.5rem', fontWeight: '600', color: '#1f2937' }}>404 - Page Not Found</h1>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;