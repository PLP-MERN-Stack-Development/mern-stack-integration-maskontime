const express = require('express');
const router = express.Router();
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  addComment,
  searchPosts
} = require('../controllers/postController');
const { authenticateToken } = require('../middleware/auth');
const { validatePost, validateComment } = require('../middleware/validation');
const { postValidationRules, commentValidationRules } = require('../validators/postValidator');

// Public routes
router.get('/', getAllPosts);
router.get('/search', searchPosts);
router.get('/:id', getPostById);

// Protected routes (require authentication)
router.post('/', authenticateToken, postValidationRules, validatePost, createPost);
router.put('/:id', authenticateToken, postValidationRules, validatePost, updatePost);
router.delete('/:id', authenticateToken, deletePost);
router.post('/:id/comments', authenticateToken, commentValidationRules, validateComment, addComment);

module.exports = router;
