import React,{useState} from 'react'
import './ContactGroup.css'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const ContactGroup = () => {


  const navigate = useNavigate();
        const handleClose = () => {
      navigate(-1); // Go back to ContactGroupList
    };

    
      const [formData, setFormData] = useState({
        Groupname:'',
        note:''
      });

      const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post('http://localhost:5000/api/contact/group/add', formData);
    toast.success('Contact Group added!');
    setTimeout(()=>{
  navigate('/contact-group-list');
    },3000)
   // go back
  } catch (err) {
    console.error(err);
   toast.error('Failed to add Group');
  }
};
  return ( <>
   <ToastContainer position='top-right'/>
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add Contact Group</h2>
          <span className="close-button" onClick={handleClose}>&times;</span>
        </div>

        <form  onSubmit={handleSubmit}>
        
            
          <div className="form-row">
           <label>Group Name <span>*</span></label>
           <input
                type="text"
                name="Groupname"
                value={formData.Groupname}
                onChange={handleChange}
                required
              />
           
          </div>

          <div className="form-group">
            <label>Note</label>
            <textarea
              name="note"
              rows="3"
             value={formData.note}
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

export default ContactGroup
