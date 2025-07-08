import React, { useState } from 'react';
import './AddProduct.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';


const AddProduct = () => {
     const navigate = useNavigate();
      const handleClose = () => {
    navigate(-1); // Go back to ProductList
  };




  

  const [formData, setFormData] = useState({
    productName: '',
    supplier: '',
    productCost: '',
    productPrice: '',
    productUnit: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post('http://localhost:5000/api/products/add', formData);
    toast.success('Product added!');
    setTimeout(()=>{
  navigate(-1);
    },3000)
   // go back
  } catch (err) {
    console.error(err);
   toast.error('Failed to add product');
  }
};
 

  return (
    <>
    <ToastContainer position='top-right'/>
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add Product</h2>
          <span className="close-button" onClick={handleClose}>&times;</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Product Name <span>*</span></label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Product Cost $ <span>*</span></label>
              <input
                type="number"
                name="productCost"
                value={formData.productCost}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Supplier</label>
              <select
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
              >
                <option value="">-- Select --</option>
                <option value="Supplier1">Supplier1</option>
              </select>
            </div>

            <div className="form-group">
              <label>Product Price $ <span>*</span></label>
              <input
                type="number"
                name="productPrice"
                value={formData.productPrice}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Product Unit <span>*</span></label>
              <div className="unit-row">
                <select
                  name="productUnit"
                  value={formData.productUnit}
                  onChange={handleChange}
                  required
                >
                  <option value="">- Select Product Unit -</option>
                  <option value="kg">kg</option>
                  <option value="pcs">pcs</option>
                </select>
                <button type="button" className="add-new-btn">+ Add New</button>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-footer">
            <button type="submit" className="save-btn">
              💾 Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </>

  );
};

export default AddProduct;
