




import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../../component/Sidebar/Sidebar';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Navbar from '../../component/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './InvoiceList.css';

const InvoiceList = () => {
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [rows, setRows] = useState([]);
  const dropdownRef = useRef(null);
  const printRef = useRef();
  const navigate = useNavigate();

  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/client/');
        setSuppliers(res.data);
      } catch (err) {
        console.error('❌ Failed to fetch suppliers', err);
      }
    };
    fetchSuppliers();
  }, []);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/invoice/');
        setRows(res.data);
      } catch (err) {
        console.error('❌ Failed to fetch invoices', err);
      }
    };
    fetchInvoices();
  }, []);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('Invoice List', 14, 10);

    const headers = [["Invoice number", "Client", "Invoice Date", "Due Date", "Payment Status", "Grand Total"]];
    const data = rows.map(r => [
      r.Invoice_number || 'N/A',
      r.client?.contact_name || 'N/A',
      new Date(r.Invoice_date).toLocaleDateString(),
      new Date(r.Due_date).toLocaleDateString(),
      r.status || 'N/A',
      r.grand_total || 0
    ]);

    autoTable(doc, {
      head: headers,
      body: data,
      startY: 20,
    });

    doc.save("invoice_list.pdf");
  };

  const handlePrint = () => {
    const content = printRef.current.innerHTML;
    const win = window.open('', '', 'width=900,height=650');
    win.document.write(`
      <html>
        <head>
          <title>Print Invoice List</title>
          <style>
            body { font-family: Arial; color: black; padding: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #333; padding: 8px; text-align: left; }
            th { background: #f2f2f2; }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  const ClickAdd = () => navigate('/create/invoice');

  return (
    <>
      <Navbar />
      <div className="purchase-page">
        <Sidebar />
        <div className="purchase-container">
          <div className="purchase-header">
            <h2>INVOICE LIST</h2>
            <button className="add-btn" onClick={ClickAdd}>+ Create Invoice</button>
          </div>

          <div className="filter-section">
            <select>
              <option value="">All Suppliers</option>
              {suppliers.map(supplier => (
                <option key={supplier._id} value={supplier._id}>
                  {supplier.contact_name}
                </option>
              ))}
            </select>

            <input type="text" placeholder="Order Status" />
            <input type="text" placeholder="Payment Status" />
            <input type="text" placeholder="Order Date Range" />
          </div>

          <div className="action-buttons">
            <button>Excel</button>
            <button>Copy</button>
            <button onClick={handleExportPDF}>PDF</button>
            <button onClick={handlePrint}>Print</button>
          </div>

          {/* Print Table */}
          <div className="print-area" ref={printRef}>
            <h2 style={{ textAlign: 'center', margin: '20px 0' }}>Invoice List</h2>
            <table className="purchase-table">
              <thead>
                <tr>
                  <th>Invoice Number</th>
                  <th>Client</th>
                  <th>Invoice Date</th>
                  <th>Due Date</th>
                  <th>Grand Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td>{row.Invoice_number}</td>
                    <td>{row.client?.contact_name}</td>
                    <td>{new Date(row.Invoice_date).toLocaleDateString()}</td>
                    <td>{new Date(row.Due_date).toLocaleDateString()}</td>
                    <td>${row.grand_total}</td>
                    <td>{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Screen Table */}
          <table className="purchase-table screen-only">
            <thead>
              <tr>
                <th>Invoice Number</th>
                <th>Client</th>
                <th>Invoice Date</th>
                <th>Due Date</th>
                <th>Grand Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>{row.Invoice_number}</td>
                  <td>{row.client?.contact_name}</td>
                  <td>{new Date(row.Invoice_date).toLocaleDateString()}</td>
                  <td>{new Date(row.Due_date).toLocaleDateString()}</td>
                  <td>${row.grand_total}</td>
                  <td>{row.status}</td>
                  <td className="action-cell" ref={dropdownRef}>
                    <button
                      className="action-btn"
                      onClick={() =>
                        setDropdownIndex(dropdownIndex === index ? null : index)
                      }
                    >
                      Action ▾
                    </button>
                    {dropdownIndex === index && (
                      <div className="dropdown-menu">
                        <div>Edit</div>
                        <div>View</div>
                        <div>Make Payment</div>
                        <div>View Payment History</div>
                        <div>Delete</div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default InvoiceList;
