const express = require('express');
const router = express.Router();
const {
  createInvoice,
  getInvoices,
  getInvoice,
  updateInvoice,
  deleteInvoice,
  getDashboardStats
} = require('../controllers/invoiceController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected
router.use(protect);

// Get dashboard stats (must be before /:id route)
router.get('/stats', getDashboardStats);

// Invoice CRUD routes
router.route('/')
  .get(getInvoices)
  .post(createInvoice);

router.route('/:id')
  .get(getInvoice)
  .put(updateInvoice)
  .delete(deleteInvoice);

module.exports = router;