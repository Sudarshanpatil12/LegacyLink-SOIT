const express = require('express');
const passport = require('passport');
const Alumni = require('../models/Alumni');
const Admin = require('../models/Admin');
const { generateToken } = require('../middleware/auth');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// LinkedIn OAuth routes
router.get('/linkedin', passport.authenticate('linkedin', {
  scope: ['r_emailaddress', 'r_liteprofile']
}));

router.get('/linkedin/callback', 
  passport.authenticate('linkedin', { failureRedirect: '/login' }),
  async (req, res) => {
    try {
      const alumni = req.user;
      
      // Generate JWT token
      const token = generateToken({
        id: alumni._id,
        email: alumni.email,
        type: 'alumni'
      });

      // Redirect to frontend with token
      res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}&type=alumni`);
    } catch (error) {
      console.error('LinkedIn callback error:', error);
      res.redirect(`${process.env.FRONTEND_URL}/login?error=linkedin_error`);
    }
  }
);

// Alumni registration
router.post('/register', async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      graduationYear,
      department,
      jobTitle,
      company,
      location,
      bio,
      linkedinUrl,
      skills = [],
      achievements = []
    } = req.body;

    // Check if alumni already exists
    const existingAlumni = await Alumni.findOne({ email });
    if (existingAlumni) {
      return res.status(400).json({
        success: false,
        message: 'Alumni with this email already exists'
      });
    }

    // Create new alumni
    const alumni = new Alumni({
      name,
      email,
      mobile,
      graduationYear,
      department,
      jobTitle,
      company,
      location,
      bio,
      linkedinUrl,
      skills,
      achievements,
      status: 'pending'
    });

    await alumni.save();

    // Generate token for immediate login
    const token = generateToken({
      id: alumni._id,
      email: alumni.email,
      type: 'alumni'
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful. Your account is pending approval.',
      token,
      alumni: alumni.getPublicProfile()
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
});

// Alumni login (if they have a password set)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // For now, we'll use a simple approach since we don't have password field
    // In a real implementation, you'd add password field to Alumni model
    const alumni = await Alumni.findOne({ email });
    
    if (!alumni) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    if (alumni.status !== 'approved') {
      return res.status(401).json({
        success: false,
        message: 'Account pending approval'
      });
    }

    // Generate token
    const token = generateToken({
      id: alumni._id,
      email: alumni.email,
      type: 'alumni'
    });

    // Update last login
    alumni.lastLogin = new Date();
    await alumni.save();

    res.json({
      success: true,
      message: 'Login successful',
      token,
      alumni: alumni.getPublicProfile()
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
});

// Admin login
router.post('/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    if (!admin.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated'
      });
    }

    if (admin.isLocked) {
      return res.status(401).json({
        success: false,
        message: 'Account is locked due to too many failed attempts'
      });
    }

    const isMatch = await admin.comparePassword(password);
    
    if (!isMatch) {
      await admin.incLoginAttempts();
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Reset login attempts on successful login
    await admin.resetLoginAttempts();
    admin.lastLogin = new Date();
    await admin.save();

    // Generate token
    const token = generateToken({
      id: admin._id,
      email: admin.email,
      type: 'admin'
    });

    res.json({
      success: true,
      message: 'Admin login successful',
      token,
      admin: admin.getSafeProfile()
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
});

// Get current user profile
router.get('/me', authenticateToken, async (req, res) => {
  try {
    if (req.userType === 'admin') {
      return res.json({
        success: true,
        user: req.admin.getSafeProfile(),
        userType: 'admin'
      });
    } else {
      return res.json({
        success: true,
        user: req.alumni.getPublicProfile(),
        userType: 'alumni'
      });
    }
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get profile',
      error: error.message
    });
  }
});

// Update profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    if (req.userType === 'admin') {
      return res.status(400).json({
        success: false,
        message: 'Admin profiles cannot be updated through this endpoint'
      });
    }

    const allowedUpdates = [
      'name', 'mobile', 'jobTitle', 'company', 'location', 'bio',
      'linkedinUrl', 'skills', 'achievements', 'contactPreferences', 'privacySettings'
    ];

    const updates = {};
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const alumni = await Alumni.findByIdAndUpdate(
      req.alumni._id,
      updates,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Profile updated successfully',
      alumni: alumni.getPublicProfile()
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message
    });
  }
});

// Logout (client-side token removal)
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful'
  });
});

module.exports = router;

