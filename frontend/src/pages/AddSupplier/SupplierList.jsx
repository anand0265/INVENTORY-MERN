import React, { useEffect, useState } from 'react';

import Navbar from '../../component/Navbar/Navbar';
import Sidebar from '../../component/Sidebar/Sidebar';
import axios from 'axios';
import './SupplierList.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const  SupplierList = () => {
  const usenavigate = useNavigate();
  const location = useLocation();

   const [sidebarVisible, setSidebarVisible] = useState(true);
    const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');

  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://inventory-mern-oh02.onrender.com/api/supplier/');
      setProducts(res.data);  // FIXED
    setFiltered(res.data);
    } catch (err) {
      console.error('Error fetching products', err);
    }
  };

  const deleteProduct = async (supplierId) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    try {
      await axios.delete(`https://inventory-mern-oh02.onrender.com/api/supplier/delete/${supplierId}`);
      toast.success('Deleted successfully');
      fetchProducts();
    } catch (error) {
      console.log('Error deleting product:', error);
      const backendError =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.response?.data?.error?.phone?.message ||
        JSON.stringify(error.response?.data) ||
        'Something went wrong';

      toast.error(backendError);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openModal = () => {
    usenavigate('/add/supplier' );
  };

  

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearch(keyword);
    const filteredResults = products.filter((p) =>
      p.supplierName.toLowerCase().includes(keyword)
    );
    setFiltered(filteredResults);
    setCurrentPage(1);
  };

  const handleEntriesChange = (e) => {
    const newPerPage = Number(e.target.value);
    const firstIndex = (currentPage - 1) * entriesPerPage;
    const newPage = Math.floor(firstIndex / newPerPage) + 1;
    setEntriesPerPage(newPerPage);
    setCurrentPage(newPage);
  };

  const indexOfLast = currentPage * entriesPerPage;
  const indexOfFirst = indexOfLast - entriesPerPage;
  const currentData = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / entriesPerPage);

  return (
    <>
      <Navbar  onToggleSidebar={toggleSidebar}/>
      <ToastContainer position="top-right" />
      <div className="main-layout">
        {/* <div className="sidebar-container">
          <Sidebar />
        </div> */}
        {sidebarVisible && <Sidebar />}

        <div className={`product-list-container ${!sidebarVisible ? 'no-sidebar' : ''}`}>
          <div className="product-header">
            <h3>LIST OF SUPPLIER</h3>
            <div className="product-controls">
              <div className="entry">
                Show{' '}
                <select value={entriesPerPage} onChange={handleEntriesChange}>
                  {[5, 10, 25, 50].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>{' '}
                Entries
              </div>
              <button onClick={openModal} className="add-btn">
                + Add New
              </button>
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={handleSearch}
                className="search-input"
              />
            </div>
          </div>

          <table className="product-table">
            <thead>
              <tr>
                <th>Supplier Name</th>
                <th>Company Name</th>
                <th>Vat Number</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((group, i) => (
                <tr key={i}>
                  <td>{group.supplierName}</td>
                  <td>{group.companyName}</td>
                  <td>{group.vatNumber}</td>
                  <td>{group.phone}</td>

    
                  <td>
                    <button className="edit-btn">✏️</button>
                    <button className="view-btn">👁️</button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteProduct(group._id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="bottom-bar">
            <div>
              Showing {filtered.length === 0 ? 0 : indexOfFirst + 1} to{' '}
              {Math.min(indexOfLast, filtered.length)} of {filtered.length} Entries
            </div>
            <div className="pagination">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              <span>{currentPage}</span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupplierList;
