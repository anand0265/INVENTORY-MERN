
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './QuotationReceipt.css';
import html2pdf from 'html2pdf.js';


const QuotationReceipt = () => {
  const { id } = useParams();
  const [quotation, setQuotation] = useState(null);
  const receiptRef = useRef();

  useEffect(() => {
    const fetchQuotation = async () => {
      try {
        const res = await axios.get(`https://inventory-mern-oh02.onrender.com/api/quotation/${id}`);
        console.log("Fetched Quotation:", res.data);
        setQuotation(res.data);
      } catch (err) {
        console.error('Failed to fetch quotation', err);
      }
    };
    fetchQuotation();
  }, [id]);

  const handleDownload = () => {
    const element = receiptRef.current;
    html2pdf().from(element).save(`Quotation_${quotation?.Quotation_number}.pdf`);
  };

  if (!quotation) return <div style={{ padding: '20px' }}>Loading quotation...</div>;

  const allItems = [
    ...(quotation.product || []).map(p => ({
      type: 'Product',
      name: p.productName || p.productId?.productName || 'Unnamed Product',
      quantity: p.quantity,
      unitCost: p.unitCost,
      discount: p.discount,
      taxRate: p.taxRate
    })),
    ...(quotation.service || []).map(s => ({
      type: 'Service',
      name: s.serviceName || s.serviceId?.ServiceName || 'Unnamed Service',
      quantity: s.quantity,
      unitCost: s.unitCost,
      discount: s.discount,
      taxRate: s.taxRate
    }))
  ];

  return (
    <div className="quotation-receipt" ref={receiptRef}>
      <div className="company-header">
        <h2>QxBilling</h2>
        <p><strong>Inventory</strong></p>
        <p>Deoghar, Jharkhand</p>
        <p>info@democompany.com</p>
        <p>VAT ID: 1554414114</p>
      </div>

      <div className="quotation-info">
        <div>
         
          <h3>Quotation To</h3>
          <p>{quotation.client?.contact_name || 'No Name'}</p>
          <p>{quotation.client?.contact_email || 'No Email'}</p>
          {/* <p>{quotation.client?.company_name || 'No Company'}</p> */}
        </div>
        <div>
         
          <h3>Quotation Details</h3>
          <p><strong>Quotation #:</strong> {quotation.Quotation_number}</p>
          <p><strong>Quotation Date:</strong> {new Date(quotation.Quotation_date).toLocaleDateString('en-GB')}</p>
        </div>
      </div>

      <table className="quotation-table">
        <thead>
          <tr>
            {/* <th>Type</th> */}
            <th>Name</th>
            <th>Quantity</th>
            <th>Unit Cost</th>
            <th>Discount</th>
            <th>Tax</th>
            <th>Sub Total</th>
          </tr>
        </thead>
        <tbody>
          {allItems.map((item, index) => {
            const base = item.unitCost * item.quantity;
            const taxAmount = (base * item.taxRate) / 100;
            const subtotal = base + taxAmount - item.discount;
            return (
              <tr key={index}>
                {/* <td>{item.type}</td> */}
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>$ {item.unitCost.toFixed(2)}</td>
                <td>$ {item.discount.toFixed(2)}</td>
                <td>{item.taxRate}%</td>
                <td>$ {subtotal.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="totals">
        <p><strong>Grand Total:</strong> $ {quotation.grand_total.toFixed(2)}</p>
      </div>

      <div className="note">
        <p><strong>Note:</strong> {quotation.note || 'No note provided.'}</p>
      </div>

      <button className="download-btn" onClick={handleDownload}>Download PDF</button>
    </div>
  );
};

export default QuotationReceipt;

