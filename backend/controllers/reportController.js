import asyncHandler from 'express-async-handler';
import sendEmail from '../utils/emailService.js';

// @desc    Send Custom Stock Report
// @route   POST /api/report/send
export const sendLowStockReport = asyncHandler(async (req, res) => {
  const { email, items, note } = req.body;

  if (!items || items.length === 0) {
    res.status(400);
    throw new Error('No items to report');
  }

  // Build HTML Table from the items sent by Frontend
  let tableRows = items.map(p => 
    `<tr>
      <td style="padding: 8px; border: 1px solid #ddd;">${p.name}</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${p.category}</td>
      <td style="padding: 8px; border: 1px solid #ddd; color: red; font-weight: bold;">${p.quantity}</td>
    </tr>`
  ).join('');

  const htmlContent = `
    <h2>Stock Inventory Report</h2>
    <p><strong>Note:</strong> ${note || 'Please review the following stock status.'}</p>
    <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
      <thead>
        <tr style="background-color: #f2f2f2;">
          <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Product</th>
          <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Category</th>
          <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Current Qty</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `;

  // Send to the email provided by user
  await sendEmail(email, 'Inventory Stock Report', htmlContent);
  res.json({ message: `Report sent successfully to ${email}` });
});