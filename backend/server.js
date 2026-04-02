const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const path = require('path');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const alumniRoutes = require('./routes/alumni');
const adminRoutes = require('./routes/admin');
const eventsRoutes = require('./routes/events');
const { ensureDefaultAdmin } = require('./utils/seedAdmin');
const { ensureSampleAlumni } = require('./utils/seedSampleAlumni');

// Import middleware
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// Middleware
// During development allow all origins to simplify local testing.
// In production, restrict to the configured FRONTEND_URL.
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? (process.env.FRONTEND_URL || 'http://localhost:3000') : true,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Passport middleware
app.use(passport.initialize());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rgpv_alumni')
.then(async () => {
  console.log('✅ Connected to MongoDB');
  await ensureDefaultAdmin();
  try {
    await ensureSampleAlumni();
  } catch (error) {
    console.error('Sample alumni sync failed:', error.message);
  }
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/alumni', alumniRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/events', eventsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'RGPV Alumni API is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint (helpful for quick browser checks)
app.get('/', (req, res) => {
  res.send(`<h2>RGPV Alumni API</h2><p>Server is running. Use <a href="/api/health">/api/health</a> for a JSON status.</p>`);
});

// Error handling middleware
app.use(errorHandler);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  console.log(`🔗 API URL: http://localhost:${PORT}/api`);
});
