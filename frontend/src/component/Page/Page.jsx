// Page.jsx
import React from 'react';
import './Page.css';
import logo from '../../assets/amvi-logo.png'; // Place your logo in src or adjust path

const Page = () => {
  return (
    <div className="receipt-container">
      <div className="company-header">
        <div className="header-flex">
          <img src={logo} alt="Company Logo" className="company-logo" />
          <div className="company-details">
            <h1>QxBilling</h1>
            <p><strong>Inventory</strong></p>
            <p>India, Deoghar</p>
            <p>info@democompany.com</p>
            <p>VAT ID: 1554414114</p>
          </div>
        </div>
      </div>

      <div className="details-row">
        <div>
          <h3>Invoice To</h3>
          <p>Client Name</p>
          <p>client@example.com</p>
          <p>Client Company</p>
        </div>
        <div>
          <h3>Invoice Details</h3>
          <p><strong>Invoice #:</strong> INV-001</p>
          <p><strong>Invoice Date:</strong> 01 Jul 2025</p>
          <p><strong>Due Date:</strong> 08 Jul 2025</p>
          <p><strong>Payment Status:</strong> Paid</p>
        </div>
      </div>

      <table className="item-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Unit Cost</th>
            <th>Discount</th>
            <th>Sub Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Product A</td>
            <td>2.00</td>
            <td>$50.00</td>
            <td>$5.00</td>
            <td>$95.00</td>
          </tr>
          <tr>
            <td>Service B</td>
            <td>1.00</td>
            <td>$100.00</td>
            <td>$0.00</td>
            <td>$100.00</td>
          </tr>
        </tbody>
      </table>

      <div className="summary">
        <p><strong>Sub Total:</strong> $195.00</p>
        <p><strong>Grand Total:</strong> $195.00</p>
        <p><strong>Total Paid:</strong> $195.00</p>
        <p><strong>Amount Due:</strong> $0.00</p>
      </div>

      <button className="download-btn">Download PDF</button>
    </div>
  );
};

export default Page;
