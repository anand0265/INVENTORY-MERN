import React,{useState} from 'react'
import './AddAccount.css'
import Navbar from '../../component/Navbar/Navbar';
import Sidebar from '../../component/Sidebar/Sidebar';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddAccount = () => {
  const navigate =useNavigate();

  const [formData,setformData] = useState({
    accountTitle:'',
            OpeningDate:'',
             accountNumber:'',
              OpeningBalance:'',
                  note:''
  })

  const handleChange=(e)=>{
    const {name,value} =e.target;
    setformData((prev)=>({...prev,[name]:value}))
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  const { accountTitle, OpeningDate, accountNumber, OpeningBalance } = formData;

  // Basic required field validation
  if (!accountTitle || !OpeningDate || !OpeningBalance) {
    toast.error("Provide all required fields");
    return;
  }

  // Validate accountNumber: must be 12 digits
  if (accountNumber && !/^\d{12}$/.test(accountNumber)) {
    toast.error("Account Number must be exactly 12 digits");
    return;
  }

  // Validate OpeningBalance: must be a number and > 500
  const balance = parseFloat(OpeningBalance);
  if (isNaN(balance) || balance < 500) {
    toast.error("Opening Balance must be a number greater than 500");
    return;
  }

  try {
    const payload = { ...formData };

    const response = await axios.post(
      'https://inventory-mern-oh02.onrender.com/api/account/add',
      payload
    );

    toast.success('Account Added Successfully');
    setTimeout(()=>{
navigate('/account-list');
    },3000)
  } catch (error) {
    const backendError =
      error.response?.data?.error ||
      error.response?.data?.message ||
      JSON.stringify(error.response?.data) ||
      'Something went wrong';

    toast.error(backendError);
  }
};

  


    const [sidebarVisible, setSidebarVisible] = useState(true);
          
              const toggleSidebar = () => {
              setSidebarVisible(!sidebarVisible);
            };
  return (
   <>
    <Navbar  onToggleSidebar={toggleSidebar}/>
    <ToastContainer position='top-right'/>
    <div className="contact-layout">
       {sidebarVisible && ( 
      <Sidebar />
       )}
      <div className="contact-wrapper">
        <h2>Create New Account</h2>
        <form className="contact-form" onSubmit={handleSubmit} encType='multipart/form-data'>
          <div className="form-section">
            <div className="form-group">
              <label>Account Title  *</label>
             <input type='text' placeholder='Enter account title' name='accountTitle' onChange={handleChange} value={formData.accountTitle} />
            </div>
            <div className="form-group">
              <label>Opening Date *</label>
              {/* <input type="text" class="form-control datepicker" name="opening_date" value="" required="" style="color: transparent;"></input> */}
              <input type="text" placeholder="Enter Opening Date" name='OpeningDate' onChange={handleChange} value={formData.OpeningDate}/>
            </div>
             <div className="form-group">
              <label>Account Number</label>
              <input type="text" placeholder="Enter Account Number" name='accountNumber' onChange={handleChange} value={formData.accountNumber} />
            </div>
            <div className="form-group">
              <label>Opening Balance $ *</label>
              <input type="text" placeholder="Enter Opening balance" name='OpeningBalance' onChange={handleChange} value={formData.OpeningBalance}/>
            </div>
            <div className="form-group">
              <label> Note</label>
             <textarea  className='form-control' name='note' onChange={handleChange} value={formData.note}></textarea>
            </div>
            </div>
            <div className="form-actions">
            <button type="submit"> <i className="fas fa-save"></i>Save Changes</button>
          </div>
   </form>

      </div>
     </div>
   </>
  )
}

export default AddAccount
