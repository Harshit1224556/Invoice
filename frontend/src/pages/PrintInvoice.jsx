import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { invoiceService } from '../services/api';

const PrintInvoice = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await invoiceService.getInvoice(id);
        setInvoice(res.data);
      } catch (err) {
        console.error('Failed to load invoice for print', err);
        alert('Failed to load invoice');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  useEffect(() => {
    if (invoice) {
      // give browser a moment to render then invoke print
      setTimeout(() => {
        window.print();
      }, 500);
    }
  }, [invoice]);

  if (loading) return <div style={{padding:24}}>Loading...</div>;
  if (!invoice) return <div style={{padding:24}}>Invoice not found</div>;

  return (
    <div style={{ padding: 24, fontFamily: 'Arial, Helvetica, sans-serif', color: '#000', background: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0 }}>Invoice</h1>
          <div>{invoice.invoiceNumber}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div><strong>Issue:</strong> {new Date(invoice.createdAt).toLocaleDateString()}</div>
          <div><strong>Due:</strong> {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : ''}</div>
          <div><strong>Status:</strong> {invoice.status}</div>
        </div>
      </div>

      <hr style={{ margin: '16px 0' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ margin: '0 0 8px 0' }}>Bill To</h3>
          <div>{invoice.clientName}</div>
          <div>{invoice.clientEmail}</div>
          <div>{invoice.clientAddress}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <h3 style={{ margin: '0 0 8px 0' }}>From</h3>
          <div>{invoice.company || 'Your Company'}</div>
          <div>{invoice.address || ''}</div>
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 20 }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Description</th>
            <th style={{ textAlign: 'right', borderBottom: '1px solid #ddd', padding: 8 }}>Qty</th>
            <th style={{ textAlign: 'right', borderBottom: '1px solid #ddd', padding: 8 }}>Rate</th>
            <th style={{ textAlign: 'right', borderBottom: '1px solid #ddd', padding: 8 }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {(invoice.items || []).map((it, idx) => (
            <tr key={idx}>
              <td style={{ padding: 8, borderBottom: '1px solid #f1f1f1' }}>{it.description}</td>
              <td style={{ padding: 8, borderBottom: '1px solid #f1f1f1', textAlign: 'right' }}>{it.quantity}</td>
              <td style={{ padding: 8, borderBottom: '1px solid #f1f1f1', textAlign: 'right' }}>₹{(it.rate||0).toFixed(2)}</td>
              <td style={{ padding: 8, borderBottom: '1px solid #f1f1f1', textAlign: 'right' }}>₹{(it.amount||0).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 16, textAlign: 'right', fontWeight: 700 }}>
        <div>Subtotal: ₹{(invoice.subtotal||0).toFixed(2)}</div>
        <div>Tax: ₹{(invoice.tax||0).toFixed(2)}</div>
        <div>Discount: ₹{(invoice.discount||0).toFixed(2)}</div>
        <div style={{ fontSize: 18, marginTop: 8 }}>Total: ₹{(invoice.total||0).toFixed(2)}</div>
      </div>

      <div style={{ marginTop: 24, fontSize: 12, color: '#444' }}>
        <div>Notes: {invoice.notes || '-'}</div>
      </div>
    </div>
  );
};

export default PrintInvoice;
