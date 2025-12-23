import React from 'react';

const DashboardStats = ({ stats }) => {
  // Use backend keys: totalRevenue (sum of paid), totalOutstanding, paidInvoices (count), pendingInvoices (count)
  const totalInvoices = stats?.totalInvoices || 0;
  const totalRevenue = parseFloat(stats?.totalRevenue || 0);
  const totalOutstanding = parseFloat(stats?.totalOutstanding || 0);
  const paidCount = stats?.paidInvoices || 0;
  const pendingCount = stats?.pendingInvoices || 0;

  const statCards = [
    {
      label: 'Total Invoices',
      value: totalInvoices,
      icon: '📄',
      color: 'from-blue-500 to-blue-600',
    },
    {
      label: 'Total Revenue',
      value: `₹${totalRevenue.toFixed(2)}`,
      icon: '💰',
      color: 'from-green-500 to-green-600',
    },
    {
      label: 'Outstanding',
      value: `₹${totalOutstanding.toFixed(2)}`,
      icon: '⏳',
      color: 'from-orange-500 to-orange-600',
    },
    {
      label: 'Paid (count)',
      value: paidCount,
      icon: '✅',
      color: 'from-emerald-500 to-emerald-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className={`bg-gradient-to-br ${stat.color} p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-slide-up`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-white/80 text-sm font-semibold">{stat.label}</p>
              <p className="text-3xl font-bold mt-2">{stat.value}</p>
            </div>
            <span className="text-4xl">{stat.icon}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
