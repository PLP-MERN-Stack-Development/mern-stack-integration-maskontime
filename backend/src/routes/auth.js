const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getCurrentUser,
  updateProfile,
  changePassword
} = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');
const { validateAuth, validatePasswordChange } = require('../middleware/validation');
const { authValidationRules, passwordChangeValidationRules } = require('../validators/authValidator');

// Public routes
router.post('/register', authValidationRules, validateAuth, register);
router.post('/login', authValidationRules, validateAuth, login);

// Protected routes (require authentication)
router.get('/me', authenticateToken, getCurrentUser);
router.put('/profile', authenticateToken, updateProfile);
router.put('/change-password', authenticateToken, passwordChangeValidationRules, validatePasswordChange, changePassword);

module.exports = router;
