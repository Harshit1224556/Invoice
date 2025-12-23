import React, { useState, useEffect } from 'react';
import { adminService } from '../services/api';

const AdminInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInvoices();
  }, []);

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
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">All Invoices</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-white">
          <thead className="bg-white/10 border-b border-white/20">
            <tr>
              <th className="px-6 py-3 text-left">Invoice #</th>
              <th className="px-6 py-3 text-left">Client</th>
              <th className="px-6 py-3 text-left">User</th>
              <th className="px-6 py-3 text-right">Amount</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice._id} className="border-b border-white/10 hover:bg-white/5 transition">
                <td className="px-6 py-4 font-semibold">{invoice.invoiceNumber}</td>
                <td className="px-6 py-4">{invoice.clientName}</td>
                <td className="px-6 py-4">{invoice.user?.name || 'N/A'}</td>
                <td className="px-6 py-4 text-right font-bold">₹{invoice.total?.toFixed(2) || '0.00'}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(invoice.status)}`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4">{new Date(invoice.dueDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminInvoices;
