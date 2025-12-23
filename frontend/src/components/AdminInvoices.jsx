import React, { useState, useEffect, useMemo } from 'react';
import { adminService } from '../services/api';

const AdminInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [amountRange, setAmountRange] = useState({ min: '', max: '' });
  const [selectedInvoices, setSelectedInvoices] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [groupBy, setGroupBy] = useState('none');
  const [showPreview, setShowPreview] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [clientNotes, setClientNotes] = useState({});

  const itemsPerPageOptions = [5, 10, 20, 50];

  useEffect(() => {
    loadInvoices();
    
    if (autoRefresh) {
      const interval = setInterval(loadInvoices, 30000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const loadInvoices = async () => {
    try {
      const response = await adminService.getAllInvoices();
      setInvoices(response.data.invoices);
    } catch (err) {
      console.error('Error loading invoices:', err);
      alert('Error loading invoices');
    } finally {
      setLoading(false);
    }
  };

  // Calculate client performance scores
  const clientScores = useMemo(() => {
    const scores = {};
    invoices.forEach(invoice => {
      if (!scores[invoice.clientName]) {
        scores[invoice.clientName] = { paid: 0, total: 0 };
      }
      scores[invoice.clientName].total++;
      if (invoice.status === 'Paid') {
        scores[invoice.clientName].paid++;
      }
    });
    
    Object.keys(scores).forEach(client => {
      scores[client].percentage = (scores[client].paid / scores[client].total) * 100;
    });
    
    return scores;
  }, [invoices]);

  // Calculate days overdue
  const getDaysOverdue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = today - due;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Advanced filtering and search
  const filteredInvoices = useMemo(() => {
    let filtered = invoices.filter(invoice => {
      const matchesSearch = searchTerm === '' || 
        invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.user?.name?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'All' || invoice.status === statusFilter;

      const invoiceDate = new Date(invoice.dueDate);
      const matchesDateRange = (!dateRange.start || invoiceDate >= new Date(dateRange.start)) &&
        (!dateRange.end || invoiceDate <= new Date(dateRange.end));

      const matchesAmount = (!amountRange.min || invoice.total >= parseFloat(amountRange.min)) &&
        (!amountRange.max || invoice.total <= parseFloat(amountRange.max));

      return matchesSearch && matchesStatus && matchesDateRange && matchesAmount;
    });

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'amount':
          return b.total - a.total;
        case 'amount-low':
          return a.total - b.total;
        case 'date':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'date-old':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'client':
          return a.clientName.localeCompare(b.clientName);
        case 'overdue':
          return getDaysOverdue(b.dueDate) - getDaysOverdue(a.dueDate);
        default:
          return 0;
      }
    });

    return filtered;
  }, [invoices, searchTerm, statusFilter, dateRange, amountRange, sortBy]);

  // Grouping logic
  const groupedInvoices = useMemo(() => {
    if (groupBy === 'none') {
      return { 'All': filteredInvoices };
    }

    let grouped = {};
    filteredInvoices.forEach(invoice => {
      let key;
      if (groupBy === 'status') {
        key = invoice.status;
      } else if (groupBy === 'client') {
        key = invoice.clientName;
      } else if (groupBy === 'user') {
        key = invoice.user?.name || 'Unassigned';
      }
      
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(invoice);
    });
    return grouped;
  }, [filteredInvoices, groupBy]);

  // Pagination
  const paginatedInvoices = useMemo(() => {
    const allInvoices = filteredInvoices;
    const totalPages = Math.ceil(allInvoices.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    
    return {
      items: allInvoices.slice(start, end),
      totalPages,
      currentPage,
      totalItems: allInvoices.length
    };
  }, [filteredInvoices, currentPage, itemsPerPage]);

  // Calculate statistics
  const stats = useMemo(() => {
    return {
      total: filteredInvoices.reduce((sum, inv) => sum + inv.total, 0),
      paid: filteredInvoices.filter(inv => inv.status === 'Paid').reduce((sum, inv) => sum + inv.total, 0),
      pending: filteredInvoices.filter(inv => inv.status === 'Pending').reduce((sum, inv) => sum + inv.total, 0),
      overdue: filteredInvoices.filter(inv => inv.status === 'Overdue').reduce((sum, inv) => sum + inv.total, 0),
      overdueCount: filteredInvoices.filter(inv => inv.status === 'Overdue').length,
      count: filteredInvoices.length,
      avgPaymentTime: filteredInvoices.length > 0 
        ? (filteredInvoices.reduce((sum, inv) => sum + (inv.paidDate ? getDaysOverdue(inv.createdAt) : 0), 0) / filteredInvoices.length).toFixed(0)
        : 0
    };
  }, [filteredInvoices]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceColor = (percentage) => {
    if (percentage === 100) return 'text-green-400';
    if (percentage >= 75) return 'text-yellow-400';
    return 'text-red-400';
  };

  const exportToCSV = () => {
    const headers = ['Invoice #', 'Client', 'User', 'Amount', 'Status', 'Due Date', 'Days Overdue'];
    const rows = filteredInvoices.map(inv => [
      inv.invoiceNumber,
      inv.clientName,
      inv.user?.name || 'N/A',
      inv.total,
      inv.status,
      new Date(inv.dueDate).toLocaleDateString(),
      inv.status === 'Overdue' ? getDaysOverdue(inv.dueDate) : '-'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoices_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const toggleSelectInvoice = (id) => {
    const newSelected = new Set(selectedInvoices);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedInvoices(newSelected);
  };

  const selectAllFiltered = () => {
    if (selectedInvoices.size === filteredInvoices.length) {
      setSelectedInvoices(new Set());
    } else {
      setSelectedInvoices(new Set(filteredInvoices.map(inv => inv._id)));
    }
  };

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const markAsAction = async (action) => {
    if (selectedInvoices.size === 0) {
      alert('Please select invoices');
      return;
    }
    // Simulate batch action
    alert(`Marked ${selectedInvoices.size} invoice(s) as ${action}`);
    setSelectedInvoices(new Set());
  };

  const printSelected = () => {
    if (selectedInvoices.size === 0) {
      alert('Please select invoices to print');
      return;
    }
    alert(`Printing ${selectedInvoices.size} invoice(s)...`);
  };

  const addNote = (invoiceId) => {
    const note = prompt('Add a note for this invoice:');
    if (note) {
      setClientNotes({ ...clientNotes, [invoiceId]: note });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-primary rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">All Invoices</h2>
          <p className="text-gray-400">Manage and track all your invoices</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-3 py-2 rounded-lg transition text-sm ${autoRefresh ? 'bg-green-600 text-white' : 'bg-white/10 text-gray-300'}`}
            title={autoRefresh ? 'Auto-refresh enabled' : 'Enable auto-refresh'}
          >
            {autoRefresh ? '🔄' : '⏸'} Auto-Refresh
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
          <p className="text-gray-300 text-sm">Total Amount</p>
          <p className="text-2xl font-bold text-white">₹{stats.total.toFixed(2)}</p>
          <p className="text-gray-400 text-xs mt-1">{stats.count} invoices</p>
        </div>
        <div className="bg-green-500/10 backdrop-blur-sm rounded-lg p-4 border border-green-500/30">
          <p className="text-green-300 text-sm">Paid</p>
          <p className="text-2xl font-bold text-green-400">₹{stats.paid.toFixed(2)}</p>
        </div>
        <div className="bg-yellow-500/10 backdrop-blur-sm rounded-lg p-4 border border-yellow-500/30">
          <p className="text-yellow-300 text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-400">₹{stats.pending.toFixed(2)}</p>
        </div>
        <div className="bg-red-500/10 backdrop-blur-sm rounded-lg p-4 border border-red-500/30">
          <p className="text-red-300 text-sm">Overdue ({stats.overdueCount})</p>
          <p className="text-2xl font-bold text-red-400">₹{stats.overdue.toFixed(2)}</p>
        </div>
        <div className="bg-blue-500/10 backdrop-blur-sm rounded-lg p-4 border border-blue-500/30">
          <p className="text-blue-300 text-sm">Avg Payment Time</p>
          <p className="text-2xl font-bold text-blue-400">{stats.avgPaymentTime} days</p>
        </div>
      </div>

      {/* Batch Actions Panel */}
      {selectedInvoices.size > 0 && (
        <div className="bg-blue-600/20 border border-blue-600/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <p className="text-blue-300 font-semibold">✓ {selectedInvoices.size} invoice(s) selected</p>
            <div className="flex gap-2">
              <button
                onClick={() => markAsAction('Paid')}
                className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm transition"
              >
                ✅ Mark as Paid
              </button>
              <button
                onClick={() => markAsAction('Pending')}
                className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded text-sm transition"
              >
                ⏳ Mark as Pending
              </button>
              <button
                onClick={printSelected}
                className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm transition"
              >
                🖨️ Print Selected
              </button>
              <button
                onClick={() => setSelectedInvoices(new Set())}
                className="px-3 py-1 bg-red-600/50 hover:bg-red-600 text-white rounded text-sm transition"
              >
                ✕ Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search and Controls */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="🔍 Search by invoice #, client, or user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-white/40"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm"
          >
            🔧 {showFilters ? 'Hide' : 'Show'} Filters
          </button>
          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition text-sm"
          >
            📥 Export CSV
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-7 gap-3 pt-4 border-t border-white/20">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-white/40 text-sm"
            >
              <option value="All">📊 All Status</option>
              <option value="Paid">✅ Paid</option>
              <option value="Pending">⏳ Pending</option>
              <option value="Overdue">⚠️ Overdue</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-white/40 text-sm"
            >
              <option value="date">📅 Newest First</option>
              <option value="date-old">📅 Oldest First</option>
              <option value="amount">💰 Highest Amount</option>
              <option value="amount-low">💰 Lowest Amount</option>
              <option value="client">👤 Client (A-Z)</option>
              <option value="overdue">⚠️ Most Overdue</option>
            </select>

            <select
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value)}
              className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-white/40 text-sm"
            >
              <option value="none">📋 No Grouping</option>
              <option value="status">📊 Group by Status</option>
              <option value="client">👥 Group by Client</option>
              <option value="user">👤 Group by User</option>
            </select>

            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
              className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-white/40 text-sm"
            />

            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
              className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-white/40 text-sm"
            />

            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(parseInt(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-white/40 text-sm"
            >
              {itemsPerPageOptions.map(opt => (
                <option key={opt} value={opt}>📄 {opt} per page</option>
              ))}
            </select>

            <button
              onClick={() => {
                setStatusFilter('All');
                setSortBy('date');
                setDateRange({start: '', end: ''});
                setAmountRange({min: '', max: ''});
                setGroupBy('none');
                setCurrentPage(1);
              }}
              className="px-3 py-2 bg-red-600/30 hover:bg-red-600/50 text-red-200 rounded-lg transition text-sm"
            >
              🔄 Reset
            </button>
          </div>
        )}
      </div>

      {/* Results Info & Pagination Controls */}
      <div className="flex items-center justify-between text-gray-300 text-sm">
        <p>Showing <span className="font-bold text-white">{paginatedInvoices.items.length}</span> of <span className="font-bold text-white">{paginatedInvoices.totalItems}</span> invoices</p>
        {selectedInvoices.size > 0 && (
          <button
            onClick={() => setSelectedInvoices(new Set())}
            className="text-blue-400 hover:text-blue-300"
          >
            ✕ Clear Selection ({selectedInvoices.size})
          </button>
        )}
      </div>

      {/* Grouped/Ungrouped Invoices Table */}
      <div className="space-y-6">
        {Object.keys(groupedInvoices).map((groupKey) => (
          <div key={groupKey} className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden">
            {groupBy !== 'none' && (
              <div className="bg-white/20 px-6 py-3 border-b border-white/20">
                <h3 className="text-white font-semibold text-lg">
                  {groupKey} ({groupedInvoices[groupKey].length} invoice{groupedInvoices[groupKey].length !== 1 ? 's' : ''})
                </h3>
              </div>
            )}
            
            {groupedInvoices[groupKey].length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">📭 No invoices found</p>
                <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-white text-sm">
                  <thead className="bg-white/10 border-b border-white/20">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={groupedInvoices[groupKey].every(inv => selectedInvoices.has(inv._id))}
                          onChange={() => {
                            const newSelected = new Set(selectedInvoices);
                            groupedInvoices[groupKey].forEach(inv => {
                              if (selectedInvoices.has(inv._id)) {
                                newSelected.delete(inv._id);
                              } else {
                                newSelected.add(inv._id);
                              }
                            });
                            setSelectedInvoices(newSelected);
                          }}
                          className="cursor-pointer"
                        />
                      </th>
                      <th className="px-6 py-3 text-left">Favorite</th>
                      <th className="px-6 py-3 text-left">Invoice #</th>
                      <th className="px-6 py-3 text-left">Client</th>
                      <th className="px-6 py-3 text-left">User</th>
                      <th className="px-6 py-3 text-right">Amount</th>
                      <th className="px-6 py-3 text-left">Status</th>
                      <th className="px-6 py-3 text-left">Due Date</th>
                      <th className="px-6 py-3 text-left">Days Overdue</th>
                      <th className="px-6 py-3 text-left">Client Score</th>
                      <th className="px-6 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedInvoices[groupKey].map((invoice) => (
                      <tr 
                        key={invoice._id} 
                        className={`border-b border-white/10 hover:bg-white/5 transition ${selectedInvoices.has(invoice._id) ? 'bg-blue-500/20' : ''}`}
                      >
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedInvoices.has(invoice._id)}
                            onChange={() => toggleSelectInvoice(invoice._id)}
                            className="cursor-pointer"
                          />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => toggleFavorite(invoice._id)}
                            className="text-xl hover:scale-125 transition"
                          >
                            {favorites.has(invoice._id) ? '⭐' : '☆'}
                          </button>
                        </td>
                        <td className="px-6 py-4 font-semibold text-blue-300">{invoice.invoiceNumber}</td>
                        <td className="px-6 py-4">{invoice.clientName}</td>
                        <td className="px-6 py-4">{invoice.user?.name || 'N/A'}</td>
                        <td className="px-6 py-4 text-right font-bold">₹{invoice.total?.toFixed(2) || '0.00'}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(invoice.status)}`}>
                            {invoice.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">{new Date(invoice.dueDate).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          {invoice.status === 'Overdue' ? (
                            <span className="text-red-400 font-bold">{getDaysOverdue(invoice.dueDate)} days</span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`font-bold ${getPerformanceColor(clientScores[invoice.clientName]?.percentage || 0)}`}>
                            {(clientScores[invoice.clientName]?.percentage || 0).toFixed(0)}%
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center space-x-2">
                          <button 
                            onClick={() => setShowPreview(invoice)}
                            className="text-blue-400 hover:text-blue-300 transition" 
                            title="View Details"
                          >
                            👁️
                          </button>
                          <button 
                            onClick={() => addNote(invoice._id)}
                            className="text-yellow-400 hover:text-yellow-300 transition" 
                            title="Add Note"
                          >
                            📝
                          </button>
                          <button 
                            className="text-green-400 hover:text-green-300 transition" 
                            title="Send Reminder"
                          >
                            📧
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {paginatedInvoices.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 text-white rounded-lg transition"
          >
            ← Previous
          </button>
          
          <div className="flex gap-1">
            {Array.from({ length: paginatedInvoices.totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-lg transition ${
                  currentPage === page 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setCurrentPage(Math.min(paginatedInvoices.totalPages, currentPage + 1))}
            disabled={currentPage === paginatedInvoices.totalPages}
            className="px-3 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 text-white rounded-lg transition"
          >
            Next →
          </button>
        </div>
      )}

      {/* Invoice Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="p-6 border-b border-white/20 flex justify-between items-center sticky top-0 bg-gray-900">
              <h3 className="text-2xl font-bold text-white">Invoice Preview</h3>
              <button
                onClick={() => setShowPreview(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Invoice Number</p>
                  <p className="text-white font-bold">{showPreview.invoiceNumber}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Status</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(showPreview.status)}`}>
                    {showPreview.status}
                  </span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Client</p>
                  <p className="text-white font-bold">{showPreview.clientName}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Amount</p>
                  <p className="text-white font-bold text-lg">₹{showPreview.total?.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Due Date</p>
                  <p className="text-white">{new Date(showPreview.dueDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Created By</p>
                  <p className="text-white">{showPreview.user?.name || 'N/A'}</p>
                </div>
              </div>
              
              {clientNotes[showPreview._id] && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <p className="text-yellow-300 text-sm font-semibold">📝 Note</p>
                  <p className="text-yellow-200 mt-2">{clientNotes[showPreview._id]}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInvoices;
