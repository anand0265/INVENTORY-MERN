


//==========================================================================================================================

import React, { useState, useEffect } from 'react';
import Sidebar from '../../component/Sidebar/Sidebar';
import Navbar from '../../component/Navbar/Navbar';
import axios from 'axios';
import './Quotation.css';
import { FaPlus } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Quotation = () => {
  const usenavigate = useNavigate();
  const location = useLocation();

  const openProduct = () => usenavigate('/products/add', { state: { background: location } });
  const openClient = () => usenavigate('/client/add', { state: { background: location } });
  const openService = () => usenavigate('/service/add', { state: { background: location } });

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const [productsList, setProductsList] = useState([]);
  const [services, setServices] = useState([]);
  const [clientss, setClients] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState('');

  const [formData, setFormData] = useState({
    Quotation_number: '',
    client: '',
    Quotation_date: '',
    note: '',
  });

  const [items, setItems] = useState([]); // Both products and services in one table

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await axios.get('https://inventory-mern-oh02.onrender.com/api/products/');
        const serviceRes = await axios.get('https://inventory-mern-oh02.onrender.com/api/service/');
        const clientRes = await axios.get('https://inventory-mern-oh02.onrender.com/api/client/');
        setProductsList(productRes.data);
        setServices(Array.isArray(serviceRes.data.service) ? serviceRes.data.service : []);
        setClients(clientRes.data);
      } catch (err) {
        console.error('Failed to fetch data', err);
      }
    };
    fetchData();
  }, []);

  const calculateSubtotal = (item) => {
    const base = item.unitCost * item.quantity;
    const taxAmount = (base * item.taxRate) / 100;
    return (base + taxAmount - item.discount).toFixed(2);
  };

  const handleProductSelect = (e) => {
    const id = e.target.value;
    const product = productsList.find(p => p._id === id);
    if (product && !items.find(i => i._id === id && i.type === 'product')) {
      setItems(prev => [...prev, {
        ...product,
        type: 'product',
        quantity: 1,
        discount: 0,
        taxRate: 0,
        unitCost: product.productCost || 0
      }]);
    }
    setSelectedProductId('');
  };

  const handleServiceSelect = (e) => {
    const id = e.target.value;
    const service = services.find(s => s._id === id);
    if (service && !items.find(i => i._id === id && i.type === 'service')) {
      setItems(prev => [...prev, {
        ...service,
        type: 'service',
        quantity: 1,
        discount: 0,
        taxRate: 0,
        unitCost: service.ServiceCost || 0
      }]);
    }
    setSelectedServiceId('');
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = parseFloat(value) || 0;
    setItems(updated);
  };

  const handleDelete = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const totalQty = items.reduce((sum, p) => sum + p.quantity, 0);
  const grandTotal = items.reduce((sum, p) => sum + parseFloat(calculateSubtotal(p)), 0).toFixed(2);

  const handleSave = async () => {
    try {
      const payload = {
        Quotation_number: formData.Quotation_number,
        client: formData.client,
        Quotation_date: formData.Quotation_date,
        product: items.filter(i => i.type === 'product').map(p => ({
          productId: p._id,
          productName: p.productName,
          quantity: p.quantity,
          unitCost: p.unitCost,
          discount: p.discount,
          taxRate: p.taxRate
        })),
        service: items.filter(i => i.type === 'service').map(s => ({
          serviceId: s._id,
          serviceName: s.ServiceName,
          quantity: s.quantity,
          unitCost: s.unitCost,
          discount: s.discount,
          taxRate: s.taxRate
        })),
        note: formData.note,
        grand_total: parseFloat(grandTotal)
      };

      const res = await axios.post('https://inventory-mern-oh02.onrender.com/api/quotation/add', payload);
      toast.success('Quotation saved successfully');
      setTimeout(() => {
        usenavigate(`/quotation-receipt/${res.data._id}`);
      }, 3000);
    } catch (err) {
      console.error('Error saving quotation:', err);
      toast.error(err?.response?.data?.message || 'Error saving quotation');
    }
  };

  return (
    <>
      <Navbar onToggleSidebar={toggleSidebar} />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="invoice-page">
        <div className="invoice-container">
          {isSidebarOpen && <Sidebar />}
          <div className="invoice-content">
            <h2>Create Quotation</h2>
            <div className="invoice-form">

              <div className="form-row">
                <div>
                  <label>Quotation Number *</label>
                  <input type="text" placeholder="QT1089" value={formData.Quotation_number}
                    onChange={e => setFormData({ ...formData, Quotation_number: e.target.value })} />
                </div>
                <div>
                  <label>Select Client *</label>
                  <select value={formData.client} onChange={e => setFormData({ ...formData, client: e.target.value })}>
                    <option value="">Select One</option>
                    {clientss.map(s => (
                      <option key={s._id} value={s._id}>{s.contact_name}</option>
                    ))}
                  </select>
                  <button className="add-btn" onClick={openClient}><FaPlus /> Add New</button>
                </div>
                <div>
                  <label>Quotation Date *</label>
                  <input type="date" value={formData.Quotation_date}
                    onChange={e => setFormData({ ...formData, Quotation_date: e.target.value })} />
                </div>
              </div>

              <div className="form-row">
                <div>
                  <label>Select Product</label>
                  <select value={selectedProductId} onChange={handleProductSelect}>
                    <option>Select Product</option>
                    {productsList.map(p => (
                      <option key={p._id} value={p._id}>{p.productName}</option>
                    ))}
                  </select>
                  <button className="add-btn" onClick={openProduct}><FaPlus /> Add New</button>
                </div>
                <div>
                  <label>Select Service</label>
                  <select value={selectedServiceId} onChange={handleServiceSelect}>
                    <option>Select Service</option>
                    {services.map(s => (
                      <option key={s._id} value={s._id}>{s.ServiceName}</option>
                    ))}
                  </select>
                  <button className="add-btn" onClick={openService}><FaPlus /> Add New</button>
                </div>
              </div>

              <h3>Quotation Items</h3>
              <table className="invoice-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Unit Cost</th>
                    <th>Discount</th>
                    <th>Tax</th>
                    <th>Sub Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.type}</td>
                      <td>{item.type === 'product' ? item.productName : item.ServiceName}</td>
                      <td><input type="number" value={item.quantity} onChange={e => handleInputChange(index, 'quantity', e.target.value)} /></td>
                      <td><input type="number" value={item.unitCost} onChange={e => handleInputChange(index, 'unitCost', e.target.value)} /></td>
                      <td><input type="number" value={item.discount} onChange={e => handleInputChange(index, 'discount', e.target.value)} /></td>
                      <td>
                        <select value={item.taxRate} onChange={e => handleInputChange(index, 'taxRate', e.target.value)}>
                          <option value={0}>Select GST</option>
                          <option value={5}>5% GST</option>
                          <option value={10}>10% GST</option>
                          <option value={18}>18% GST</option>
                        </select>
                      </td>
                      <td><input value={calculateSubtotal(item)} readOnly /></td>
                      <td><button onClick={() => handleDelete(index)}>🗑️</button></td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="2"><strong>Total</strong></td>
                    <td>{totalQty}</td>
                    <td colSpan="3"></td>
                    <td><strong>₹{grandTotal}</strong></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>

              <div className="form-row">
                <label>Note</label>
                <textarea rows="3" placeholder="Enter any notes here..."
                  value={formData.note} onChange={e => setFormData({ ...formData, note: e.target.value })}></textarea>
              </div>

              <button className="save-invoice-btn" onClick={handleSave}>Save Quotation</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quotation;
