import React, { useEffect, useState } from 'react';

import Navbar from '../../component/Navbar/Navbar';
import Sidebar from '../../component/Sidebar/Sidebar';
import axios from 'axios';
import './AccountList.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const ProductList = () => {
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
      const res = await axios.get('http://localhost:5000/api/account/');
      setProducts(res.data.accounts);
      setFiltered(res.data.accounts);
    } catch (err) {
      console.error('Error fetching products', err);
    }
  };

  const deleteProduct = async (productId) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/account/delete/${productId}`);
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
    usenavigate('/add-account');
  };

  // search functinalities
  const handleSearch = (e) => {
  const keyword = e.target.value.toLowerCase();
  setSearch(keyword);

  const filteredResults = products.filter((p) =>
    p.accountTitle.toLowerCase().includes(keyword) ||
    p.accountNumber?.toLowerCase().includes(keyword) ||
    p.OpeningBalance?.toString().toLowerCase().includes(keyword)
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
      <Navbar  />
      <ToastContainer position="top-right" />
      <div className="main-layout">
        <div className="sidebar-container">
          <Sidebar />
        </div>

        <div className="product-list-container">
          <div className="product-header">
            <h3>ACCOUNT LIST</h3>
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
                <th>Account Title</th>
                <th>Opening Date</th>
                <th>Account Number</th>
                <th>Opening Balance</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
  {currentData.map((product, i) => (
    <tr key={i}>
      <td>{product.accountTitle}</td>
      <td>{product.OpeningDate}</td>
      <td>{product.accountNumber}</td>
      <td>Rs. {parseFloat(product.OpeningBalance).toFixed(2)}</td>
      <td>
        <button className="edit-btn">✏️</button>
        <button className="view-btn">👁️</button>
        <button
          className="delete-btn"
          onClick={() => deleteProduct(product._id)}
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

export default ProductList;
