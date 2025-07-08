


import React, { useState, useRef, useEffect } from 'react';
import './Purchase.css';

import Sidebar from '../../component/Sidebar/Sidebar';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Navbar from '../../component/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Purchase = () => {
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [rows, setRows] = useState([]);
  const dropdownRef = useRef(null);
  const printRef = useRef();
  const navigate = useNavigate();

  const [sidebarVisible, setSidebarVisible] = useState(true);
      const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  const [suppliers, setSuppliers] = useState([]);

useEffect(() => {
  const fetchSuppliers = async () => {
    try {
      const res = await axios.get('https://inventory-mern-oh02.onrender.com/api/supplier');
      setSuppliers(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch suppliers', err);
    }
  };
  fetchSuppliers();
}, []);


  // 📦 Fetch purchases
  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await axios.get('https://inventory-mern-oh02.onrender.com/api/purchase');
        setRows(res.data);
      } catch (err) {
        console.error('❌ Failed to fetch purchases', err);
      }
    };
    fetchPurchases();
  }, []);

  // 🧾 Export PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('Purchase Order List', 14, 10);

    const headers = [["Order Date", "Supplier", "Order Status", "Grand Total", "Paid", "Payment Status"]];
    const data = rows.map(r => [
      new Date(r.order_date).toLocaleDateString(),
      r.supplier?.supplierName || 'N/A',
      r.order_status,
      `$${r.grand_total.toFixed(2)}`,
      `$${r.paid.toFixed(2)}`,
      r.payment_status
    ]);

    autoTable(doc, {
      head: headers,
      body: data,
      startY: 20,
    });

    doc.save("purchase_orders.pdf");
  };

  // 🖨️ Print table
  const handlePrint = () => {
    const content = printRef.current.innerHTML;
    const win = window.open('', '', 'width=900,height=650');
    win.document.write(`
      <html>
        <head>
          <title>Print Purchase Order List</title>
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

  const ClickAdd = () => navigate('/add/purchase');

  return (
    <>
      <Navbar onToggleSidebar={toggleSidebar}/>
      <div className="purchase-page">
        {/* <Sidebar /> */}
        {sidebarVisible && <Sidebar />}
        <div className="purchase-container">
          <div className="purchase-header">
            <h2>Purchase Order List</h2>
            <button className="add-btn" onClick={ClickAdd}>+ Add New</button>
          </div>

          <div className="filter-section">
            {/* <select><option>All Supplier</option></select> */}
            <select>
  <option value="">All Suppliers</option>
  {suppliers.map(supplier => (
    <option key={supplier._id} value={supplier._id}>
      {supplier.supplierName}
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

          <div className="print-area" ref={printRef}>
            <h2 style={{ textAlign: 'center', margin: '20px 0' }}>Purchase Order List</h2>
            <table className="purchase-table">
              <thead>
                <tr>
                  <th>Order Date</th>
                  <th>Supplier</th>
                  <th>Order Status</th>
                  <th>Grand Total</th>
                  <th>Paid</th>
                  <th>Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td>{new Date(row.order_date).toLocaleDateString()}</td>
                    <td>{row.supplier?.supplierName}</td>
                    <td>{row.order_status}</td>
                    <td>${row.grand_total.toFixed(2)}</td>
                    <td>${row.paid.toFixed(2)}</td>
                    <td>{row.payment_status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <table className="purchase-table screen-only">
            <thead>
              <tr>
                <th>Order Date</th>
                <th>Supplier</th>
                <th>Order Status</th>
                <th>Grand Total</th>
                <th>Paid</th>
                <th>Payment Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>{new Date(row.order_date).toLocaleDateString()}</td>
                  <td>{row.supplier?.supplierName}</td>
                  <td><span className={`status ${row.order_status.toLowerCase()}`}>{row.order_status}</span></td>
                  <td>${row.grand_total.toFixed(2)}</td>
                  <td>${row.paid.toFixed(2)}</td>
                  <td><span className={`status ${row.payment_status.toLowerCase()}`}>{row.payment_status}</span></td>
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

export default Purchase;
