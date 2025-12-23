import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AdminStats from '../components/AdminStats';
import AdminUsers from '../components/AdminUsers';
import AdminInvoices from '../components/AdminInvoices';
import Header from '../components/Header';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('stats');
  const { user, logout } = useContext(AuthContext);

  const tabs = [
    { id: 'stats', label: 'Dashboard', icon: '📊' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'invoices', label: 'All Invoices', icon: '📄' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 animate-fade-in">
      <Header user={user} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Admin Header */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-5xl font-bold text-white mb-2">
            Admin <span className="gradient-text">Panel</span>
          </h1>
          <p className="text-gray-300 text-lg">Manage users and invoices across the system</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 animate-slide-up">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'gradient-primary text-white shadow-glow'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'stats' && <AdminStats />}
          {activeTab === 'users' && <AdminUsers />}
          {activeTab === 'invoices' && <AdminInvoices />}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
