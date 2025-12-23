import React, { useState, useEffect, useContext } from 'react';
import { invoiceService } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import InvoiceForm from '../components/InvoiceForm';
import InvoiceList from '../components/InvoiceList';
import DashboardStats from '../components/DashboardStats';
import Header from '../components/Header';

const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState(null);
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [invoicesRes, statsRes] = await Promise.all([
        invoiceService.getInvoices(),
        invoiceService.getDashboardStats(),
      ]);
      setInvoices(invoicesRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      try {
        await invoiceService.deleteInvoice(id);
        setInvoices(invoices.filter(inv => inv._id !== id));
      } catch (err) {
        console.error('Error deleting invoice:', err);
      }
    }
  };

  const handleEdit = (invoice) => {
    setEditingId(invoice._id);
    setEditingData(invoice);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingId(null);
    setEditingData(null);
    loadData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 animate-fade-in">
      <Header user={user} onLogout={logout} />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-5xl font-bold text-white mb-2">
            Welcome back, <span className="gradient-text">{user?.name || 'User'}</span>
          </h1>
          <p className="text-gray-300 text-lg">Manage and track your invoices seamlessly</p>
        </div>

        {/* Dashboard Stats */}
        {stats && <DashboardStats stats={stats} />}

        {/* Create Invoice Button */}
        {!showForm && (
          <div className="mb-8 animate-slide-up">
            <button
              onClick={() => setShowForm(true)}
              className="gradient-primary text-white font-bold py-4 px-8 rounded-lg shadow-glow hover:shadow-glow-accent transform hover:scale-105 transition-all duration-300"
            >
              + Create New Invoice
            </button>
          </div>
        )}

        {/* Invoice Form */}
        {showForm && (
          <InvoiceForm
            invoiceId={editingId}
            initialData={editingData}
            onClose={handleFormClose}
          />
        )}

        {/* Invoice List */}
        {!showForm && (
          <InvoiceList
            invoices={invoices}
            loading={loading}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
