


import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PurchaseReceipt.css';
import html2pdf from 'html2pdf.js';

const PurchaseReceipt = () => {
  const { id } = useParams();
  const [purchase, setPurchase] = useState(null);
  const receiptRef = useRef();

  useEffect(() => {
    const fetchPurchase = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/purchase/${id}`);
        setPurchase(res.data);
      } catch (err) {
        console.error('❌ Fetch failed:', err);
      }
    };
    fetchPurchase();
  }, [id]);

  const handleDownloadPDF = () => {
    const element = receiptRef.current;
    const opt = {
      margin: 0.5,
      filename: `Purchase_${purchase._id}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  if (!purchase) return <div>Loading...</div>;

  const subtotal = purchase.product.reduce((sum, item) => {
    const base = (item.unitCost ?? 0) * (item.quantity ?? 0);
    const tax = (base * (item.taxRate ?? 0)) / 100;
    return sum + base + tax - (item.discount ?? 0);
  }, 0);

  return (
    <div>
      <div className="receipt-buttons">
        <button onClick={() => window.print()}>🖨️ Print</button>
        <button onClick={handleDownloadPDF}>📥 Download PDF</button>
      </div>

      <div className="receipt-container" ref={receiptRef}>
        <h2>Purchase Order</h2>
        <div className="header-section">
          <div>
            <h3>Inventory</h3>
            <p>India, Deoghar<br />info@democompany.com<br />VAT ID: 1554414114</p>
          </div>
          <div className="order-info">
            <p><strong>Order ID:</strong> {purchase._id}</p>
            <p><strong>Order Date:</strong> {new Date(purchase.order_date).toLocaleDateString()}</p>
            <p><strong>Order Status:</strong> {purchase.order_status}</p>
            <p><strong>Payment:</strong> {purchase.payment_status}</p>
            <p><strong>Brand:</strong> {purchase.brand}</p>
            <p><strong>Size:</strong> {purchase.size}</p>
          </div>
        </div>

        <h4>Supplier Details</h4>
        <p><strong>Name:</strong> {purchase.supplier?.supplierName}</p>
        <p><strong>Email:</strong> {purchase.supplier?.email}</p>
        <p><strong>Phone:</strong> {purchase.supplier?.phone}</p>
        <p><strong>VAT Number:</strong> {purchase.supplier?.vatNumber}</p>

        <table>
          <thead>
            <tr>
              <th>Name</th><th>Quantity</th><th>Unit Cost</th><th>Discount</th><th>Tax</th><th>Line Total</th>
            </tr>
          </thead>
          <tbody>
            {purchase.product.map((p, i) => {
              const base = (p.unitCost ?? 0) * (p.quantity ?? 0);
              const taxAmount = (base * (p.taxRate ?? 0)) / 100;
              const lineTotal = base + taxAmount - (p.discount ?? 0);

              return (
                <tr key={i}>
                  <td>{p.productName}</td>
                  <td>{p.quantity ?? 0}</td>
                  <td>${(p.unitCost ?? 0).toFixed(2)}</td>
                  <td>${(p.discount ?? 0).toFixed(2)}</td>
                  <td>{p.taxRate ?? 0}%</td>
                  <td>${(lineTotal ?? 0).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="summary">
          <p>Sub Total: ${subtotal.toFixed(2)}</p>
          <p>Shipping Cost: + ${(purchase.shipping_cost ?? 0).toFixed(2)}</p>
          <p>Discount: - ${(purchase.order_discount ?? 0).toFixed(2)}</p>
          <h3>Grand Total: ${(purchase.grand_total ?? 0).toFixed(2)}</h3>
          <p>Total Paid: $0.00</p>
          <p><strong>Amount Due:</strong> ${(purchase.grand_total ?? 0).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default PurchaseReceipt;
