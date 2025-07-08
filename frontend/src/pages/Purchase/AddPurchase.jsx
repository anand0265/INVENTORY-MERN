import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../component/Navbar/Navbar';
import Sidebar from '../../component/Sidebar/Sidebar';
import './AddPurchase.css';
import { useNavigate } from 'react-router-dom';

const AddPurchase = () => {
  const navigate = useNavigate();

  const [sidebarVisible, setSidebarVisible] = useState(true);
      const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  const [productsList, setProductsList] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    order_date: '',
    supplier: '',
    order_status: 'Ordered',
    order_discount: 0,
    shipping_cost: 0,
    note: '',
    brand: '',
    size: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await axios.get('http://localhost:5000/api/products/');
        const supplierRes = await axios.get('http://localhost:5000/api/supplier/');
        setProductsList(productRes.data);
        setSuppliers(supplierRes.data);
      } catch (err) {
        console.error('Failed to fetch data', err);
      }
    };
    fetchData();
  }, []);

  const calculateSubtotal = (p) => {
    const base = p.unitCost * p.quantity;
    const taxAmount = (base * p.taxRate) / 100;
    return (base + taxAmount - p.discount).toFixed(2);
  };

  const handleProductSelect = (e) => {
    const id = e.target.value;
    const product = productsList.find(p => p._id === id);
    if (product && !products.find(p => p._id === id)) {
      setProducts(prev => [...prev, {
        ...product,
        quantity: 1,
        discount: '',
        taxRate: '',
        unitCost: product.productCost || 0
      }]);
    }
    setSelectedProductId('');
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = parseFloat(value) || 0;
    setProducts(updated);
  };

  const handleDelete = (index) => {
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
  };

  const totalQty = products.reduce((sum, p) => sum + p.quantity, 0);
  const totalSubtotal = products.reduce((sum, p) => sum + parseFloat(calculateSubtotal(p)), 0).toFixed(2);

  const handleSave = async () => {
    try {
      const payload = {
        brand: formData.brand,
        size: formData.size,
        order_date: formData.order_date,
        supplier: formData.supplier,
        order_status: formData.order_status,
        grand_total: parseFloat(totalSubtotal),
        paid: 0,
        payment_status: 'Unpaid',
        order_discount: formData.order_discount,
        shipping_cost: formData.shipping_cost,
        product: products.map(p => ({
          productId: p._id,
          productName: p.productName,
          quantity: p.quantity,
          unitCost: p.unitCost,
          discount: p.discount,
          taxRate: p.taxRate
        })),
        note: formData.note
      };

      const res = await axios.post('http://localhost:5000/api/purchase/create', payload);
      alert('Purchase saved successfully');
      navigate(`/purchase-receipt/${res.data._id}`);
    } catch (err) {
      console.error('Error creating purchase:', err);
      alert('Error saving purchase');
    }
  };

  return (
    <>
      <Navbar onToggleSidebar={toggleSidebar}/>
      <div className="purchase-container">
        {/* <Sidebar /> */}
        {sidebarVisible && <Sidebar />}
        <div className="main-content">
          <div className="purchase-form">
            <h2>Create Purchase Order</h2>

            <div className="form-group-row">
              <div className="input-group">
                <label>Order Date</label>
                <input
                  type="date"
                  value={formData.order_date}
                  onChange={e => setFormData({ ...formData, order_date: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label>Supplier</label>
                <select
                  value={formData.supplier}
                  onChange={e => setFormData({ ...formData, supplier: e.target.value })}
                >
                  <option value="">Select Supplier</option>
                  {suppliers.map(s => (
                    <option key={s._id} value={s._id}>{s.supplierName}</option>
                  ))}
                </select>
              </div>
              <div className="input-group">
                <label>Order Status</label>
                <select
                  value={formData.order_status}
                  onChange={e => setFormData({ ...formData, order_status: e.target.value })}
                >
                  <option value="Ordered">Ordered</option>
                  <option value="Received">Received</option>
                </select>
              </div>
              <div className="input-group">
                <label>Brand</label>
                <input
                  type="text"
                  placeholder="Brand name"
                  value={formData.brand}
                  onChange={e => setFormData({ ...formData, brand: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group-row">
              <div className="input-group">
                <label>Size</label>
                <input
                  type="text"
                  placeholder="Enter Size"
                  value={formData.size}
                  onChange={e => setFormData({ ...formData, size: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label>Select Product</label>
                <select value={selectedProductId} onChange={handleProductSelect}>
                  <option value="">Select Product</option>
                  {productsList.map(p => (
                    <option key={p._id} value={p._id}>{p.productName}</option>
                  ))}
                </select>
              </div>
              <div className="input-group">
                <label>Order Discount</label>
                <input
                  type="number"
                  placeholder="Order Discount $"
                  value={formData.order_discount}
                  onChange={e => setFormData({ ...formData, order_discount: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label>Shipping Cost</label>
                <input
                  type="number"
                  placeholder="Shipping Cost $"
                  value={formData.shipping_cost}
                  onChange={e => setFormData({ ...formData, shipping_cost: e.target.value })}
                />
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Name</th><th>Description</th><th>Quantity</th><th>Unit Cost</th><th>Product cost</th><th>Discount</th><th>Tax</th><th>Sub Total</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={i}>
                    <td>{p.productName}</td>
                    <td><input placeholder="Description" /></td>
                    <td><input type="number" value={p.quantity} onChange={e => handleInputChange(i, 'quantity', e.target.value)} /></td>
                    <td><input type="number" value={p.unitCost} onChange={e => handleInputChange(i, 'unitCost', e.target.value)} /></td>
                    <td><input type="number" value={p.productPrice} onChange={e => handleInputChange(i, 'productPrice', e.target.value)} /></td>
                    <td><input type="number" value={p.discount} onChange={e => handleInputChange(i, 'discount', e.target.value)} /></td>
                    <td>
                      <select
                        value={p.taxRate}
                        onChange={e => {
                          const updated = [...products];
                          updated[i].taxRate = parseFloat(e.target.value);
                          setProducts(updated);
                        }}>
                        <option value={0}>Select GST</option>
                        <option value={5}>5% GST</option>
                        <option value={10}>10% GST</option>
                        <option value={18}>18% GST</option>
                      </select>
                    </td>
                    <td><input value={calculateSubtotal(p)} readOnly /></td>
                    <td><button onClick={() => handleDelete(i)}>🗑️</button></td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="2"><strong>Total</strong></td>
                  <td>{totalQty}</td>
                  <td colSpan="3"></td>
                  <td><strong>${totalSubtotal}</strong></td>
                  <td></td>
                </tr>
              </tbody>
            </table>

            <textarea
              placeholder="Note"
              value={formData.note}
              onChange={e => setFormData({ ...formData, note: e.target.value })}
            ></textarea>

            <button className="save-btn" onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPurchase;








