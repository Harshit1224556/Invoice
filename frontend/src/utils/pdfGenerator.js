export async function generateInvoicePDF(invoice) {
  try {
    // dynamic import to avoid bundler resolution issues in some environments
    const { jsPDF } = await import('jspdf');
    const html2canvasModule = await import('html2canvas');
    const html2canvas = html2canvasModule?.default || html2canvasModule;
    // Build a simple printable element
    const wrap = document.createElement('div');
    wrap.style.width = '800px';
    wrap.style.padding = '24px';
    wrap.style.background = '#ffffff';
    wrap.style.color = '#000';
    wrap.style.fontFamily = 'Arial, Helvetica, sans-serif';
    wrap.innerHTML = `
      <div style="text-align: center; margin-bottom: 16px;">
        <h1>Invoice ${invoice.invoiceNumber || ''}</h1>
        <div>${invoice.clientName || ''} - ${invoice.clientEmail || ''}</div>
      </div>
      <div style="margin-top: 12px;">
        <strong>Issue Date:</strong> ${new Date(invoice.createdAt || Date.now()).toLocaleDateString()}<br/>
        <strong>Due Date:</strong> ${invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : ''}
      </div>
      <table style="width:100%; border-collapse: collapse; margin-top:16px;">
        <thead>
          <tr>
            <th style="text-align:left; border-bottom:1px solid #ddd; padding:8px">Description</th>
            <th style="text-align:right; border-bottom:1px solid #ddd; padding:8px">Qty</th>
            <th style="text-align:right; border-bottom:1px solid #ddd; padding:8px">Rate</th>
            <th style="text-align:right; border-bottom:1px solid #ddd; padding:8px">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${ (invoice.items || []).map(item => `
            <tr>
              <td style="padding:8px; border-bottom:1px solid #f1f1f1">${item.description || ''}</td>
              <td style="padding:8px; border-bottom:1px solid #f1f1f1; text-align:right">${item.quantity || 0}</td>
              <td style="padding:8px; border-bottom:1px solid #f1f1f1; text-align:right">₹${(item.rate||0).toFixed(2)}</td>
              <td style="padding:8px; border-bottom:1px solid #f1f1f1; text-align:right">₹${(item.amount||0).toFixed(2)}</td>
            </tr>
          `).join('') }
        </tbody>
      </table>
      <div style="margin-top:16px; text-align:right; font-weight:700">
        Subtotal: ₹${(invoice.subtotal||0).toFixed(2)}<br/>
        Tax: ₹${(invoice.tax||0).toFixed(2)}<br/>
        Discount: ₹${(invoice.discount||0).toFixed(2)}<br/>
        <div style="margin-top:8px; font-size:18px;">Total: ₹${(invoice.total||0).toFixed(2)}</div>
      </div>
      <div style="margin-top:20px; font-size:12px; color:#444">Status: ${invoice.status || ''}</div>
    `;

    document.body.appendChild(wrap);

    const canvas = await html2canvas(wrap, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'pt', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = pageWidth - 40; // margins
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    let position = 20;
    pdf.addImage(imgData, 'PNG', 20, position, imgWidth, imgHeight);

    const fileName = `${invoice.invoiceNumber || 'invoice'}.pdf`;
    pdf.save(fileName);

    document.body.removeChild(wrap);
  } catch (err) {
    console.error('PDF generation error:', err);
    alert('Failed to generate PDF');
  }
}
