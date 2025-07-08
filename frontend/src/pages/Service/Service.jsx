import React,{useState} from 'react'
import './Service.css'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const Service = () => {


  const navigate = useNavigate();
        const handleClose = () => {
      navigate(-1); // Go back to ContactGroupList
    };

    
      const [formData, setFormData] = useState({
       ServiceName:'',
        ServiceCost:'',
        Description:''

      });

      const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post('http://localhost:5000/api/service/add', formData);
    toast.success('Services added!');
    setTimeout(()=>{
  navigate('/service-list');
    },3000)
   // go back
  } catch (err) {
    console.error(err);
   toast.error('Failed to add Service');
  }
};
  return ( <>
   <ToastContainer position='top-right'/>
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>SERVICE LIST</h2>
          <span className="close-button" onClick={handleClose}>&times;</span>
        </div>

        <form  onSubmit={handleSubmit}>
        
            
          <div className="form-row">
           <label>Service Name  <span>*</span></label>
           <input
                type="text"
                name="ServiceName"
                value={formData.ServiceName}
                onChange={handleChange}
                required
              />
           
          </div>

            
          <div className="form-row">
           <label>Service Cost $  <span>*</span></label>
           <input
                type="text"
                name="ServiceCost"
                value={formData.ServiceCost}
                onChange={handleChange}
                required
              />
           
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="Description"
              rows="3"
             value={formData.Description}
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
}

export default Service
