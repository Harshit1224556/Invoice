const User = require('../models/User');
const Invoice = require('../models/Invoice');

// @desc    Get all users (admin only)
// @route   GET /api/admin/users
// @access  Admin
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    const userCount = await User.countDocuments();

    res.json({
      totalUsers: userCount,
      users
    });
  } catch (error) {
    console.error('Get All Users Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single user details
// @route   GET /api/admin/users/:id
// @access  Admin
exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get user's invoices
    const invoices = await Invoice.find({ user: req.params.id });
    const totalRevenue = invoices
      .filter(inv => inv.status === 'Paid')
      .reduce((sum, inv) => sum + inv.total, 0);

    res.json({
      user,
      invoiceCount: invoices.length,
      totalRevenue
    });
  } catch (error) {
    console.error('Get User Details Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle user admin status
// @route   PUT /api/admin/users/:id/toggle-admin
// @access  Admin
exports.toggleAdminStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isAdmin = !user.isAdmin;
    await user.save();

    res.json({
      message: `User ${user.isAdmin ? 'promoted to' : 'demoted from'} admin`,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    console.error('Toggle Admin Status Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Admin
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete all user's invoices
    await Invoice.deleteMany({ user: req.params.id });
    
    // Delete user
    await user.deleteOne();

    res.json({ message: 'User and associated invoices deleted successfully' });
  } catch (error) {
    console.error('Delete User Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all invoices across system
// @route   GET /api/admin/invoices
// @access  Admin
exports.getAllInvoices = async (req, res) => {
  try {
    const { status, sortBy = 'createdAt', order = 'desc' } = req.query;
    
    let query = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }

    const sortOrder = order === 'asc' ? 1 : -1;
    const invoices = await Invoice.find(query)
      .populate('user', 'name email company')
      .sort({ [sortBy]: sortOrder });

    res.json({
      totalInvoices: invoices.length,
      invoices
    });
  } catch (error) {
    console.error('Get All Invoices Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get system statistics
// @route   GET /api/admin/stats
// @access  Admin
exports.getSystemStats = async (req, res) => {
  try {
    const users = await User.find();
    const invoices = await Invoice.find();
    const admins = await User.countDocuments({ isAdmin: true });

    const totalRevenue = invoices
      .filter(inv => inv.status === 'Paid')
      .reduce((sum, inv) => sum + inv.total, 0);

    const totalOutstanding = invoices
      .filter(inv => inv.status === 'Pending' || inv.status === 'Overdue')
      .reduce((sum, inv) => sum + inv.total, 0);

    const invoicesByStatus = {
      paid: invoices.filter(inv => inv.status === 'Paid').length,
      pending: invoices.filter(inv => inv.status === 'Pending').length,
      draft: invoices.filter(inv => inv.status === 'Draft').length,
      overdue: invoices.filter(inv => inv.status === 'Overdue').length,
    };

    res.json({
      totalUsers: users.length,
      totalAdmins: admins,
      totalInvoices: invoices.length,
      totalRevenue,
      totalOutstanding,
      invoicesByStatus
    });
  } catch (error) {
    console.error('Get System Stats Error:', error);
    res.status(500).json({ message: error.message });
  }
};
