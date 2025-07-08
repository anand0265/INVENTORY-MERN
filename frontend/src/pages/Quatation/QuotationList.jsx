




import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../../component/Sidebar/Sidebar';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Navbar from '../../component/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './QuotationList.css';

const InvoiceList = () => {
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [rows, setRows] = useState([]);
  const dropdownRef = useRef(null);
  const printRef = useRef();
  const navigate = useNavigate();

  

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await axios.get('https://inventory-mern-oh02.onrender.com/api/quotation/');
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

    const headers = [["Quotation number", "Client", "Quotation Date",  "Grand Total"]];
    const data = rows.map(r => [
      r.Quotation_number || 'N/A',
      r.client?.contact_name || 'N/A',
      new Date(r.Quotation_date).toLocaleDateString(),
      r.grand_total || 0
    ]);

    autoTable(doc, {
      head: headers,
      body: data,
      startY: 20,
    });

    doc.save("quotation_list.pdf");
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

  const ClickAdd = () => navigate('/create/quotation');

  return (
    <>
      <Navbar />
      <div className="purchase-page">
        <Sidebar />
        <div className="purchase-container">
          <div className="purchase-header">
            <h2>QUOTATION LIST</h2>
            <button className="add-btn" onClick={ClickAdd}>+ Add New</button>
          </div>

          <div className="filter-section">
            <label htmlFor="">Search</label>
            <input type="text" placeholder="Search here" />
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
                  <th>Quotation Number</th>
                  <th>Client</th>
                  <th>Quotation Date</th>
                  <th>Grand Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td>{row.Quotation_number}</td>
                    <td>{row.client?.contact_name}</td>
                    <td>{new Date(row.Quotation_date).toLocaleDateString()}</td>
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
                <th>Quotation Number</th>
                  <th>Client</th>
                  <th>Quotation Date</th>
                  <th>Grand Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>{row.Quotation_number}</td>
                  <td>{row.client?.contact_name}</td>
                  <td>{new Date(row.Quotation_date).toLocaleDateString()}</td>
                  <td>${row.grand_total}</td>
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
