const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const { authenticateToken } = require('../middleware/auth');
const { validateCategory } = require('../middleware/validation');
const { categoryValidationRules } = require('../validators/categoryValidator');

// Public routes
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);

// Protected routes (require authentication)
router.post('/', authenticateToken, categoryValidationRules, validateCategory, createCategory);
router.put('/:id', authenticateToken, categoryValidationRules, validateCategory, updateCategory);
router.delete('/:id', authenticateToken, deleteCategory);

module.exports = router;
