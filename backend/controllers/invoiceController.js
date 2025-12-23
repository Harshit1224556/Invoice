const Invoice = require('../models/Invoice');

// Generate unique invoice number
const generateInvoiceNumber = async () => {
  const count = await Invoice.countDocuments();
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `INV-${year}${month}-${String(count + 1).padStart(5, '0')}`;
};

// @desc    Create new invoice
// @route   POST /api/invoices
// @access  Private
exports.createInvoice = async (req, res) => {
  try {
    const invoiceNumber = await generateInvoiceNumber();
    
    const invoice = await Invoice.create({
      ...req.body,
      user: req.user._id,
      invoiceNumber
    });

    res.status(201).json(invoice);
  } catch (error) {
    console.error('Create Invoice Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all invoices for logged in user
// @route   GET /api/invoices
// @access  Private
exports.getInvoices = async (req, res) => {
  try {
    const { status, search, sortBy = 'createdAt', order = 'desc' } = req.query;
    
    let query = { user: req.user._id };

    // Filter by status
    if (status && status !== 'all') {
      query.status = status;
    }

    // Search functionality
    if (search) {
      query.$or = [
        { invoiceNumber: { $regex: search, $options: 'i' } },
        { clientName: { $regex: search, $options: 'i' } },
        { clientEmail: { $regex: search, $options: 'i' } }
      ];
    }

    const sortOrder = order === 'asc' ? 1 : -1;
    const invoices = await Invoice.find(query).sort({ [sortBy]: sortOrder });

    res.json(invoices);
  } catch (error) {
    console.error('Get Invoices Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single invoice
// @route   GET /api/invoices/:id
// @access  Private
exports.getInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    // Check if invoice belongs to user
    if (invoice.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to access this invoice' });
    }

    res.json(invoice);
  } catch (error) {
    console.error('Get Invoice Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update invoice
// @route   PUT /api/invoices/:id
// @access  Private
exports.updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    // Check if invoice belongs to user
    if (invoice.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this invoice' });
    }

    // Update fields
    Object.assign(invoice, req.body);
    
    const updatedInvoice = await invoice.save();
    res.json(updatedInvoice);
  } catch (error) {
    console.error('Update Invoice Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete invoice
// @route   DELETE /api/invoices/:id
// @access  Private
exports.deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    // Check if invoice belongs to user
    if (invoice.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this invoice' });
    }

    await invoice.deleteOne();
    res.json({ message: 'Invoice removed successfully', id: req.params.id });
  } catch (error) {
    console.error('Delete Invoice Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get dashboard statistics
// @route   GET /api/invoices/stats
// @access  Private
exports.getDashboardStats = async (req, res) => {
  try {
    const invoices = await Invoice.find({ user: req.user._id });
    
    const totalRevenue = invoices
      .filter(inv => inv.status === 'Paid')
      .reduce((sum, inv) => sum + inv.total, 0);
    
    const totalOutstanding = invoices
      .filter(inv => inv.status === 'Pending' || inv.status === 'Overdue')
      .reduce((sum, inv) => sum + inv.total, 0);
    
    const paidInvoices = invoices.filter(inv => inv.status === 'Paid').length;
    const pendingInvoices = invoices.filter(inv => inv.status === 'Pending').length;
    const draftInvoices = invoices.filter(inv => inv.status === 'Draft').length;
    const overdueInvoices = invoices.filter(inv => inv.status === 'Overdue').length;

    // Recent invoices (last 5)
    const recentInvoices = invoices
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    res.json({
      totalRevenue,
      totalOutstanding,
      paidInvoices,
      pendingInvoices,
      draftInvoices,
      overdueInvoices,
      totalInvoices: invoices.length,
      recentInvoices
    });
  } catch (error) {
    console.error('Get Stats Error:', error);
    res.status(500).json({ message: error.message });
  }
};