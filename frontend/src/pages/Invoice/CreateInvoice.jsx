

import React, { useState, useEffect } from 'react';
import Sidebar from '../../component/Sidebar/Sidebar';
import Navbar from '../../component/Navbar/Navbar';
import axios from 'axios';
import './CreateInvoice.css';
import { FaPlus } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateInvoice = () => {
  const usenavigate = useNavigate();
  const location = useLocation();

  const openProduct = () => {
    usenavigate('/products/add', { state: { background: location } });
  };

  const openClient = () => {
    usenavigate('/client/add', { state: { background: location } });
  };

  const openService = () => {
    usenavigate('/service/add', { state: { background: location } });
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const [productsList, setProductsList] = useState([]);
  const [services, setServices] = useState([]);
  const [clientss, setClients] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    note: '',
    Invoice_number: '',
    client: '',
    Invoice_date: '',
    service: '',
    Due_date: '',
    status: 'Unpaid',
  });

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
        discount: 0,
        taxRate: 0,
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
        Invoice_number: formData.Invoice_number,
        client: formData.client,
        Invoice_date: formData.Invoice_date,
        Due_date: formData.Due_date,
        status: formData.status,
        product: products.map(p => ({
          productId: p._id,
          productName: p.productName,
          quantity: p.quantity,
          unitCost: p.unitCost,
          discount: p.discount,
          taxRate: p.taxRate
        })),
        note: formData.note,
          grand_total: parseFloat(totalSubtotal) // <-- Include this
      };

      const res = await axios.post('https://inventory-mern-oh02.onrender.com/api/invoice/add', payload);
      toast.success('Invoice saved successfully');
      setTimeout(()=>{
 usenavigate(`/invoice-receipt/${res.data._id}`);
      },3000)
     
    } catch (err) {
      console.error('Error saving invoice:', err);
      toast.error(err?.response?.data?.message || 'Error saving invoice');
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
            <h2>Create Invoice</h2>

            <div className="invoice-form">
              <div className="form-row">
                <div>
                  <label>Invoice Number *</label>
                  <input type="text" placeholder="IN1343" value={formData.Invoice_number}
                    onChange={e => setFormData({ ...formData, Invoice_number: e.target.value })} />
                </div>
                <div>
                  <label>Select Client *</label>
                  <select value={formData.client} onChange={e => setFormData({ ...formData, client: e.target.value })}>
                    <option>Select One</option>
                    {clientss.map(s => (
                      <option key={s._id} value={s._id}>{s.contact_name}</option>
                    ))}
                  </select>
                  <button className="add-btn" onClick={openClient}><FaPlus /> Add New</button>
                </div>
                <div>
                  <label>Invoice Date *</label>
                  <input type="date" value={formData.Invoice_date}
                    onChange={e => setFormData({ ...formData, Invoice_date: e.target.value })} />
                </div>
                <div>
                  <label>Due Date *</label>
                  <input type="date" value={formData.Due_date}
                    onChange={e => setFormData({ ...formData, Due_date: e.target.value })} />
                </div>
                <div>
                  <label>Status</label>
                  <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                    <option value="Unpaid">Unpaid</option>
                    <option value="Paid">Paid</option>
                    <option value="Partially Paid">Partially Paid</option>
                  </select>
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
                  <select value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })}>
                    <option value="">Select Service</option>
                    {services.map((service) => (
                      <option key={service._id} value={service._id}>
                        {service.ServiceName}
                      </option>
                    ))}
                  </select>
                  <button className="add-btn" onClick={openService}><FaPlus /> Add New</button>
                </div>
              </div>

              <table className="invoice-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Unit Cost</th>
                    <th>Discount</th>
                    <th>Tax</th>
                    <th>Sub Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p, i) => (
                    <tr key={i}>
                      <td>{p.productName}</td>
                      <td><input placeholder="Description" /></td>
                      <td><input type="number" value={p.quantity} onChange={e => handleInputChange(i, 'quantity', e.target.value)} /></td>
                      <td><input type="number" value={p.unitCost} onChange={e => handleInputChange(i, 'unitCost', e.target.value)} /></td>
                      <td><input type="number" value={p.discount} onChange={e => handleInputChange(i, 'discount', e.target.value)} /></td>
                      <td>
                        <select value={p.taxRate} onChange={e => handleInputChange(i, 'taxRate', e.target.value)}>
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

              <div className="form-row">
                <label>Note</label>
                <textarea rows="3" placeholder="Enter any notes here..."
                  value={formData.note} onChange={e => setFormData({ ...formData, note: e.target.value })}></textarea>
              </div>

              <button className="save-invoice-btn" onClick={handleSave}>Save Invoice</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateInvoice;




//--------------------------------------------------------------------------------------------
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navbar from '../../component/Navbar/Navbar';
// import Sidebar from '../../component/Sidebar/Sidebar';
// import './CreateInvoice.css';
// import { FaPlus } from 'react-icons/fa';
// import { useLocation, useNavigate } from 'react-router-dom';

// const CreateInvoice = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [clients, setClients] = useState([]);
//   const [productsList, setProductsList] = useState([]);
//   const [servicesList, setServicesList] = useState([]);
//   const [selectedProductId, setSelectedProductId] = useState('');
//   const [selectedServiceId, setSelectedServiceId] = useState('');
//   const [lineItems, setLineItems] = useState([]);
//   const [invoiceData, setInvoiceData] = useState({
//     Invoice_number: '',
//     client: '',
//     Invoice_date: '',
//     Due_date: '',
//     status: 'Unpaid',
//     note: ''
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [clientsRes, productsRes, servicesRes] = await Promise.all([
//           axios.get('http://localhost:5000/api/client'),
//           axios.get('http://localhost:5000/api/products'),
//           axios.get('http://localhost:5000/api/service')
//         ]);
//         setClients(clientsRes.data);
//         setProductsList(productsRes.data);
//         setServicesList(servicesRes.data);
//       } catch (err) {
//         console.error('Error fetching data', err);
//       }
//     };
//     fetchData();
//   }, []);

//   const calculateLineTotal = (item) => {
//     const base = item.unitCost * item.quantity;
//     const taxAmount = (base * item.taxRate) / 100;
//     return (base + taxAmount - item.discount).toFixed(2);
//   };

//   const handleProductSelect = (e) => {
//     const id = e.target.value;
//     const product = productsList.find(p => p._id === id);
//     if (product && !lineItems.find(item => item._id === id)) {
//       setLineItems(prev => [...prev, {
//         _id: product._id,
//         name: product.productName,
//         description: product.description,
//         quantity: 1,
//         unitCost: product.productPrice,
//         discount: 0,
//         taxRate: 0,
//         type: 'product'
//       }]);
//     }
//     setSelectedProductId('');
//   };

//   const handleInputChange = (index, field, value) => {
//     const updated = [...lineItems];
//     updated[index][field] = parseFloat(value) || 0;
//     setLineItems(updated);
//   };

//   const removeLineItem = (index) => {
//     const updated = [...lineItems];
//     updated.splice(index, 1);
//     setLineItems(updated);
//   };

//   const handleInvoiceChange = (e) => {
//     const { name, value } = e.target;
//     setInvoiceData(prev => ({ ...prev, [name]: value }));
//   };

//   const totalQty = lineItems.reduce((sum, item) => sum + item.quantity, 0);
//   const totalAmount = lineItems.reduce((sum, item) => sum + parseFloat(calculateLineTotal(item)), 0).toFixed(2);

//   const handleSaveInvoice = async () => {
//     try {
//       const payload = {
//         ...invoiceData,
//         grand_total: parseFloat(totalAmount),
//         product: lineItems.filter(i => i.type === 'product').map(p => ({
//           productId: p._id,
//           productName: p.name,
//           quantity: p.quantity,
//           unitCost: p.unitCost,
//           discount: p.discount,
//           taxRate: p.taxRate
//         })),
//         service: lineItems.filter(i => i.type === 'service').map(s => ({
//           serviceId: s._id,
//           serviceName: s.name,
//           quantity: s.quantity,
//           unitCost: s.unitCost,
//           discount: s.discount,
//           taxRate: s.taxRate
//         })),
//         note: invoiceData.note
//       };

//       const res = await axios.post('http://localhost:5000/api/invoice/add', payload);
//       alert('Invoice created successfully');
//       navigate(`/invoice-receipt/${res.data._id}`);
//     } catch (err) {
//       console.error('Error creating invoice:', err);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="main-content">
//         <Sidebar />
//         <div className="invoice-form">
//           <h2>Create Invoice</h2>

//           <div className="form-row">
//             <input name="Invoice_number" placeholder="Invoice Number" onChange={handleInvoiceChange} />
//             <select name="client" value={invoiceData.client} onChange={handleInvoiceChange}>
//               <option value="">Select Client</option>
//               {clients.map(c => (
//                 <option key={c._id} value={c._id}>{c.contact_name}</option>
//               ))}
//             </select>
//             <input type="date" name="Invoice_date" onChange={handleInvoiceChange} />
//             <input type="date" name="Due_date" onChange={handleInvoiceChange} />
//             <select name="status" value={invoiceData.status} onChange={handleInvoiceChange}>
//               <option value="Unpaid">Unpaid</option>
//               <option value="Paid">Paid</option>
//             </select>
//           </div>

//           <div className="form-row">
//             <select value={selectedProductId} onChange={handleProductSelect}>
//               <option value="">Select Product</option>
//               {productsList.map(p => (
//                 <option key={p._id} value={p._id}>{p.productName}</option>
//               ))}
//             </select>
//           </div>

//           <table>
//             <thead>
//               <tr>
//                 <th>Name</th><th>Description</th><th>Qty</th><th>Unit Cost</th><th>Discount</th><th>Tax</th><th>Total</th><th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {lineItems.map((item, idx) => (
//                 <tr key={idx}>
//                   <td>{item.name}</td>
//                   <td>{item.description}</td>
//                   <td><input type="number" value={item.quantity} onChange={e => handleInputChange(idx, 'quantity', e.target.value)} /></td>
//                   <td><input type="number" value={item.unitCost} onChange={e => handleInputChange(idx, 'unitCost', e.target.value)} /></td>
//                   <td><input type="number" value={item.discount} onChange={e => handleInputChange(idx, 'discount', e.target.value)} /></td>
//                   <td>
//                     <select value={item.taxRate} onChange={e => handleInputChange(idx, 'taxRate', e.target.value)}>
//                       <option value={0}>Select GST</option>
//                       <option value={5}>5%</option>
//                       <option value={10}>10%</option>
//                       <option value={18}>18%</option>
//                     </select>
//                   </td>
//                   <td><input readOnly value={calculateLineTotal(item)} /></td>
//                   <td><button onClick={() => removeLineItem(idx)}>❌</button></td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div className="form-row">
//             <strong>Total Qty:</strong> {totalQty} | <strong>Total Amount:</strong> ${totalAmount}
//           </div>

//           <textarea name="note" placeholder="Note" onChange={handleInvoiceChange}></textarea>

//           <button className="save-btn" onClick={handleSaveInvoice}>Save Invoice</button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CreateInvoice;
