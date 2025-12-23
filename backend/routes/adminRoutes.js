const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserDetails,
  toggleAdminStatus,
  deleteUser,
  getAllInvoices,
  getSystemStats
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { adminProtect } = require('../middleware/adminMiddleware');

// All routes require authentication and admin status
router.use(protect);
router.use(adminProtect);

// System Stats
router.get('/stats', getSystemStats);

// User Management
router.get('/users', getAllUsers);
router.get('/users/:id', getUserDetails);
router.put('/users/:id/toggle-admin', toggleAdminStatus);
router.delete('/users/:id', deleteUser);

// Invoice Management
router.get('/invoices', getAllInvoices);

module.exports = router;
