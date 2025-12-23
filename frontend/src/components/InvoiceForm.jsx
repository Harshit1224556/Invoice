import React, { useState } from 'react';
import { invoiceService } from '../services/api';

const InvoiceForm = ({ invoiceId, initialData, onClose }) => {
  const [formData, setFormData] = useState(initialData || {
    clientName: '',
    clientEmail: '',
    clientAddress: '',
    clientPhone: '',
    clientCity: '',
    clientCountry: '',
    items: [{ description: '', quantity: 1, rate: 0, amount: 0 }],
    subtotal: 0,
    tax: 0,
    taxRate: 0,
    discount: 0,
    total: 0,
    dueDate: '',
    status: 'Draft',
    notes: '',
    paymentMethod: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = field === 'quantity' || field === 'rate' ? parseFloat(value) || 0 : value;
    
    // Calculate item amount
    if (field === 'quantity' || field === 'rate') {
      newItems[index].amount = newItems[index].quantity * newItems[index].rate;
    }
    
    setFormData(prev => ({ ...prev, items: newItems }));
    calculateTotals([...newItems], formData.taxRate, formData.discount);
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, rate: 0, amount: 0 }]
    }));
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, items: newItems }));
    calculateTotals(newItems, formData.taxRate, formData.discount);
  };

  const calculateTotals = (items, taxRate, discount) => {
    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const tax = (subtotal * taxRate) / 100;
    const total = subtotal + tax - discount;
    
    setFormData(prev => ({
      ...prev,
      subtotal,
      tax,
      total
    }));
  };

  const handleTaxRateChange = (e) => {
    const taxRate = parseFloat(e.target.value) || 0;
    setFormData(prev => ({ ...prev, taxRate }));
    calculateTotals(formData.items, taxRate, formData.discount);
  };

  const handleDiscountChange = (e) => {
    const discount = parseFloat(e.target.value) || 0;
    setFormData(prev => ({ ...prev, discount }));
    calculateTotals(formData.items, formData.taxRate, discount);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (invoiceId) {
        await invoiceService.updateInvoice(invoiceId, formData);
      } else {
        await invoiceService.createInvoice(formData);
      }
      onClose();
    } catch (err) {
      console.error('Error saving invoice:', err);
      alert('Error saving invoice');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-slide-up max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-bold gradient-text mb-6">
          {invoiceId ? 'Edit Invoice' : 'Create Invoice'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Client Information */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Client Name *</label>
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary"
              placeholder="Client name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Client Email *</label>
            <input
              type="email"
              name="clientEmail"
              value={formData.clientEmail}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary"
              placeholder="client@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Client Address</label>
            <input
              type="text"
              name="clientAddress"
              value={formData.clientAddress}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary"
              placeholder="Street address"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
              <input
                type="text"
                name="clientCity"
                value={formData.clientCity}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary"
                placeholder="City"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
              <input
                type="text"
                name="clientCountry"
                value={formData.clientCountry}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary"
                placeholder="Country"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Client Phone</label>
            <input
              type="tel"
              name="clientPhone"
              value={formData.clientPhone}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          {/* Invoice Items */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Invoice Items</h3>
            {formData.items.map((item, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    required
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary"
                    placeholder="Item description"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Qty *</label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      min="1"
                      required
                      className="w-full px-2 py-2 border-2 border-gray-200 rounded-lg focus:border-primary text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Rate *</label>
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
                      step="0.01"
                      required
                      className="w-full px-2 py-2 border-2 border-gray-200 rounded-lg focus:border-primary text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Amount</label>
                    <div className="w-full px-2 py-2 bg-gray-100 rounded-lg text-sm font-semibold">
                      ₹{item.amount.toFixed(2)}
                    </div>
                  </div>
                </div>

                {formData.items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="mt-2 text-red-500 hover:text-red-700 font-semibold text-sm"
                  >
                    Remove Item
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addItem}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg transition"
            >
              + Add Item
            </button>
          </div>

          {/* Totals */}
          <div className="border-t pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-semibold">Subtotal:</span>
              <span>₹{formData.subtotal.toFixed(2)}</span>
            </div>

            <div className="flex items-center gap-2">
              <label className="font-semibold">Tax Rate (%):</label>
              <input
                type="number"
                value={formData.taxRate}
                onChange={handleTaxRateChange}
                step="0.01"
                min="0"
                className="flex-1 px-2 py-1 border border-gray-200 rounded text-sm"
              />
              <span>= ₹{formData.tax.toFixed(2)}</span>
            </div>

            <div className="flex items-center gap-2">
              <label className="font-semibold">Discount (₹):</label>
              <input
                type="number"
                value={formData.discount}
                onChange={handleDiscountChange}
                step="0.01"
                min="0"
                className="flex-1 px-2 py-1 border border-gray-200 rounded text-sm"
              />
            </div>

            <div className="border-t pt-2 flex justify-between font-bold text-base bg-blue-50 p-2 rounded">
              <span>Total:</span>
              <span>₹{formData.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Due Date and Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Due Date *</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary"
            >
              <option value="Draft">Draft</option>
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Method</label>
            <input
              type="text"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary"
              placeholder="e.g., Bank Transfer, Cash, Card"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary h-24 resize-none"
              placeholder="Additional notes"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 gradient-primary text-white font-bold py-2 px-4 rounded-lg hover:shadow-glow transform hover:scale-105 transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Invoice'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceForm;
