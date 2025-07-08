







import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './InvoiceReceipt.css';
import html2pdf from 'html2pdf.js';
import logo from '../../assets/amvi-logo.png';

const InvoiceReceipt = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const receiptRef = useRef(); // 👈 Ref for download

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/invoice/${id}`);
        setInvoice(res.data);
      } catch (err) {
        console.error('Failed to fetch invoice', err);
      }
    };

    fetchInvoice();
  }, [id]);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  const calculateSubtotal = (item) => {
    const base = item.unitCost * item.quantity;
    const tax = (base * item.taxRate) / 100;
    return base + tax - item.discount;
  };

  const handleDownload = () => {
    const element = receiptRef.current;
    html2pdf().from(element).save(`Invoice_${invoice?.Invoice_number}.pdf`);
  };

  if (!invoice) return <p>Loading invoice...</p>;

  return (
    <div className="receipt-container" ref={receiptRef}>
      <img src={logo} alt="Company Logo" className="company-logo" />
      <div className="company-header">
        <h1>QxBilling</h1>
        <p className='inv'><strong>Inventory</strong></p>        
        <p>India, Deoghar</p>
        <p>info@democompany.com</p>
        <p>VAT ID: 1554414114</p>
      </div>

      <div className="details-row">
        <div>
          <h3>Invoice To</h3>
          <p><strong>Name :</strong> {invoice.client?.contact_name}</p>
          <p><strong>Email :</strong> {invoice.client?.contact_email}</p>
          <p><strong>Company :</strong> {invoice.client?.company_name}</p>
        </div>
        <div>
          <h3>Invoice Details</h3>
          <p><strong>Invoice #:</strong> {invoice.Invoice_number}</p>
          <p><strong>Invoice Date:</strong> {formatDate(invoice.Invoice_date)}</p>
          <p><strong>Due Date:</strong> {formatDate(invoice.Due_date)}</p>
          <p><strong>Payment Status:</strong> {invoice.status}</p>
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
          {invoice.product?.map((item, i) => (
            <tr key={i}>
              <td>{item.productName}</td>
              <td>{item.quantity.toFixed(2)}</td>
              <td>${item.unitCost.toFixed(2)}</td>
              <td>${item.discount.toFixed(2)}</td>
              <td>${calculateSubtotal(item).toFixed(2)}</td>
            </tr>
          ))}

          {Array.isArray(invoice.service) &&
            invoice.service.map((s, i) => (
              <tr key={`service-${i}`}>
                <td>{s.serviceName}</td>
                <td>{s.quantity.toFixed(2)}</td>
                <td>${s.unitCost.toFixed(2)}</td>
                <td>${s.discount.toFixed(2)}</td>
                <td>${calculateSubtotal(s).toFixed(2)}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="summary">
        <p><strong>Sub Total:</strong> ${invoice.grand_total.toFixed(2)}</p>
        <p><strong>Grand Total:</strong> ${invoice.grand_total.toFixed(2)}</p>
        <p><strong>Total Paid:</strong> $0.00</p>
        <p><strong>Amount Due:</strong> ${invoice.grand_total.toFixed(2)}</p>
      </div>

      <button className="download-btn" onClick={handleDownload}>Download PDF</button>
    </div>
  );
};

export default InvoiceReceipt;











// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './InvoiceReceipt.css';

// /**
//  * Renders a printable A4 invoice page.
//  * Pass an `invoice` prop to populate the fields dynamically.
//  * If no prop is supplied, sample data are shown so nothing crashes.
//  */
// const InvoiceReceipt = ({ invoice }) => {
//   // fallback sample data (remove when wiring to your API)
//   const sample = {
//     invoiceNumber: 'S12023-001',
//     date: 'September 26, 2030',
//     dueDate: 'October 15, 2030',
//     client: {
//       name: 'John Smith',
//       company: 'ABC Corporation',
//       address: '123 Em Street Green Valley',
//       phone: '(555) 555-5555',
//       email: 'john.smith@email.com',
//     },
//     items: [
//       { no: 1, desc: 'Logo Design', qty: '1 project', rate: 500, total: 500 },
//       { no: 2, desc: 'Brochure Design', qty: '2 projects', rate: 750, total: 1500 },
//       { no: 3, desc: 'Website Redesign', qty: '1 project', rate: 800, total: 800 },
//       { no: 4, desc: 'Social Media Graphics', qty: '5 hours', rate: 50, total: 250 },
//     ],
//     subtotal: 3050,
//     taxRate: 0.08,
//     terms: [
//       'Payment is due upon receipt of this invoice.',
//       'Late payments may incur additional charges.',
//       'Please make checks payable to Your Graphic Design Studio.',
//     ],
//     paymentInfo: {
//       method: 'Bank Transfer',
//       account: '1234-5678-9012-3456',
//     },
//     signer: 'John Smith',
//     contact: 'designstudio@email.com | (123) 456-7890',
//   };

//   const data = invoice || sample;
//   const tax = data.subtotal * (data.taxRate ?? 0);
//   const grandTotal = data.subtotal + tax;

//   return (
//     <div className="page A4">
//       <div className="certificate">
//         <div className="invoice-container">
//           {/* ---------- Header ---------- */}
//           <div className="row header">
//             <div className="col-8">
//               <h1>INVOICE</h1>
//             </div>
//             <div className="col-4 text-end">
//               {/* Replace with your logo path */}
//               <img src="/amvi-logo.png" alt="logo" />
//             </div>
//           </div>

//           <div className="divider"></div>

//           {/* ---------- Bill-to & Invoice meta ---------- */}
//           <div className="columns">
//             <div className="bill-to">
//               <h2>Bill To:</h2>
//               <div className="client-info">
//                 <div><strong>Client Name:</strong> {data.client.name}</div>
//                 <div><strong>Company Name:</strong> {data.client.company}</div>
//                 <div><strong>Billing Address:</strong> {data.client.address}</div>
//                 <div><strong>Phone:</strong> {data.client.phone}</div>
//                 <div><strong>Email:</strong> {data.client.email}</div>
//               </div>
//             </div>
//             <div className="invoice-details">
//               <div><strong>Invoice Number:</strong> {data.invoiceNumber}</div>
//               <div><strong>Date:</strong> {data.date}</div>
//               <div><strong>Due Date:</strong> {data.dueDate}</div>
//             </div>
//           </div>

//           {/* ---------- Service table ---------- */}
//           <div className="section-heading"><h2>Service Details:</h2></div>

//           <table className="service-table">
//             <thead>
//               <tr>
//                 <th>No</th>
//                 <th>Description of Service</th>
//                 <th>Quantity</th>
//                 <th>Rate</th>
//                 <th>Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.items.map((item) => (
//                 <tr key={item.no}>
//                   <td>{item.no}</td>
//                   <td>{item.desc}</td>
//                   <td>{item.qty}</td>
//                   <td>${item.rate.toFixed(2)}</td>
//                   <td>${item.total.toFixed(2)}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* ---------- Totals ---------- */}
//           <div className="totals">
//             <table>
//               <tbody>
//                 <tr>
//                   <td>Subtotal</td>
//                   <td>${data.subtotal.toFixed(2)}</td>
//                 </tr>
//                 <tr>
//                   <td>Tax&nbsp;({(data.taxRate * 100).toFixed(0)}%)</td>
//                   <td>${tax.toFixed(2)}</td>
//                 </tr>
//                 <tr>
//                   <td><strong>Total Amount Due</strong></td>
//                   <td><strong>${grandTotal.toFixed(2)}</strong></td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>

//           {/* ---------- Terms ---------- */}
//           <div className="terms">
//             <div className="section-heading"><h2>Terms and Conditions:</h2></div>
//             {data.terms.map((t, i) => <p key={i}>{t}</p>)}
//           </div>

//           {/* ---------- Payment info ---------- */}
//           <div className="payment-info">
//             <div className="section-heading"><h2>Payment Information:</h2></div>
//             <p><strong>Payment Method:</strong> {data.paymentInfo.method}</p>
//             <p><strong>Bank Account:</strong> {data.paymentInfo.account}</p>
//           </div>

//           {/* ---------- Signature ---------- */}
//           <div className="signature">{data.signer}</div>

//           {/* ---------- Footer ---------- */}
//           <div className="footer">
//             <p>Questions? Email Us: {data.contact}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InvoiceReceipt;
