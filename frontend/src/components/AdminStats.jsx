import React, { useState, useEffect } from 'react';
import { adminService } from '../services/api';

const AdminStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await adminService.getSystemStats();
      setStats(response.data);
    } catch (err) {
      console.error('Error loading stats:', err);
      alert('Error loading statistics');
    } finally {
      setLoading(false);
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

  const statCards = [
    { label: 'Total Users', value: stats?.totalUsers || 0, icon: '👥', color: 'from-blue-500 to-blue-600' },
    { label: 'Admin Users', value: stats?.totalAdmins || 0, icon: '👨‍💼', color: 'from-purple-500 to-purple-600' },
    { label: 'Total Invoices', value: stats?.totalInvoices || 0, icon: '📄', color: 'from-indigo-500 to-indigo-600' },
    { label: 'Total Revenue', value: `₹${(stats?.totalRevenue || 0).toFixed(2)}`, icon: '💰', color: 'from-green-500 to-green-600' },
    { label: 'Outstanding', value: `₹${(stats?.totalOutstanding || 0).toFixed(2)}`, icon: '⏳', color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">System Dashboard</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${stat.color} p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-slide-up`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white/80 text-sm font-semibold">{stat.label}</p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
              </div>
              <span className="text-3xl">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Invoice Status Breakdown */}
      {stats?.invoicesByStatus && (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 animate-slide-up">
          <h3 className="text-xl font-bold text-white mb-4">Invoices by Status</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-green-500/20 p-4 rounded-lg border border-green-500/30">
              <p className="text-green-200 text-sm">Paid</p>
              <p className="text-3xl font-bold text-green-400">{stats.invoicesByStatus.paid}</p>
            </div>
            <div className="bg-yellow-500/20 p-4 rounded-lg border border-yellow-500/30">
              <p className="text-yellow-200 text-sm">Pending</p>
              <p className="text-3xl font-bold text-yellow-400">{stats.invoicesByStatus.pending}</p>
            </div>
            <div className="bg-blue-500/20 p-4 rounded-lg border border-blue-500/30">
              <p className="text-blue-200 text-sm">Draft</p>
              <p className="text-3xl font-bold text-blue-400">{stats.invoicesByStatus.draft}</p>
            </div>
            <div className="bg-red-500/20 p-4 rounded-lg border border-red-500/30">
              <p className="text-red-200 text-sm">Overdue</p>
              <p className="text-3xl font-bold text-red-400">{stats.invoicesByStatus.overdue}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStats;
