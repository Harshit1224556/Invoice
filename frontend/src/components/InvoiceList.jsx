import React from 'react';

const InvoiceList = ({ invoices, loading, onDelete, onEdit }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-primary rounded-full"></div>
        </div>
      </div>
    );
  }

  if (invoices.length === 0) {
    return (
      <div className="text-center py-16 animate-slide-up">
        <p className="text-gray-400 text-xl mb-4">No invoices yet</p>
        <p className="text-gray-500">Create your first invoice to get started</p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Overdue':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {invoices.map((invoice, index) => (
        <div
          key={invoice._id}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:border-primary/50 hover:shadow-glow transform hover:scale-105 transition-all duration-300 animate-slide-up"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-white font-bold text-lg">{invoice.invoiceNumber}</h3>
              <p className="text-gray-300 text-sm">{invoice.clientName}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(invoice.status)}`}>
              {invoice.status}
            </span>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Total:</span>
              <span className="text-white font-bold text-lg">₹{invoice.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-300">Due Date:</span>
              <span className="text-gray-200">{new Date(invoice.dueDate).toLocaleDateString()}</span>
            </div>
            {invoice.notes && (
              <div className="text-gray-300 text-sm mt-2 p-2 bg-white/5 rounded">
                {invoice.notes}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(invoice)}
              className="flex-1 bg-blue-500/80 hover:bg-blue-600 text-white font-semibold py-2 px-3 rounded-lg transform hover:scale-105 transition-all duration-300"
            >
              Edit
            </button>
            <button
              onClick={() => window.open(`/invoice/${invoice._id}/print`, '_blank')}
              className="flex-1 bg-emerald-500/80 hover:bg-emerald-600 text-white font-semibold py-2 px-3 rounded-lg transform hover:scale-105 transition-all duration-300"
            >
              Print
            </button>
            <button
              onClick={() => onDelete(invoice._id)}
              className="flex-1 bg-red-500/80 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-lg transform hover:scale-105 transition-all duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvoiceList;
