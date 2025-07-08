import React,{useState} from 'react'
import './AddReIncome.css'
import Sidebar from '../../component/Sidebar/Sidebar';
import Navbar from '../../component/Navbar/Navbar';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';


const AddReIncome = () => {

const [formData,setformData] = useState({
   date:'',
         account:'',
         incomeType:'',
          rotation:'',
           noOfRotation:'',
            amount:'',
             payer:'',
              paymentMethod:'',
                  reference:'',
                      note:''
})

const handleChange=(e)=>{
const {name,value} = e.target;
setformData((prev)=>({...prev, [name]:value}))
}

const handleSubmit=async(e)=>{
  e.preventDefault();

  try {
    const payload = {...formData}

    const response =await axios.post(
      'http://localhost:5000/api/re-income/add',
        payload
    )
       toast.success('Income Added Successfully');
  } catch (error) {
   const backendError =
           error.response?.data?.error ||
           error.response?.data?.message ||
           JSON.stringify(error.response?.data) ||
           'Something went wrong';
   
         toast.error(backendError);
    
  }
}


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
        <h4>Add Repeating Income</h4>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <div className="form-group">
              <label>Date <span>*</span></label>
              <input type="date" placeholder='Date' name='date' value={formData.date} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Account <span>*</span></label>
              <input type="text" placeholder="" onChange={handleChange} value={formData.account} name='account' />
            </div>
            <div className="form-group">
              <label>Income Type <span>*</span></label>
             <select onChange={handleChange} value={formData.incomeType} name='incomeType'>
                <option value="">Select</option>
  <option value="Salary">Salary</option>
  <option value="Sell">Sell</option>
  <option value="Water">Water</option>

             </select>
            </div>
            <div className="form-group">
              <label>Rotation <span>*</span></label>
              <select onChange={handleChange} value={formData.rotation} name='rotation'>
                <option value="">Select Rotation</option>
  <option value="Monthly">Monthly</option>
  <option value="Weekly">Weekly</option>
  <option value="Bi Weekly">Bi Weekly</option>
  <option value="Everyday">Everyday</option>
  <option value="Every 30 days">Every 30 days</option>
  <option value="Every 2 Month">Every 2 Month</option>
  <option value="Quarterly">Quarterly</option>
  <option value="Every 6 Month">Every 6 Month</option>
  <option value="Yearly">Yearly</option>

             </select>
            </div>
            <div className="form-group">
              <label>Number Of Rotation <span>*</span></label>
              <input type="number" placeholder="" onChange={handleChange} value={formData.noOfRotation} name='noOfRotation'/>
            </div>
            <div className="form-group">
              <label>Amount $  <span>*</span></label>
              <input type="text" placeholder="" onChange={handleChange} value={formData.amount} name='amount'/>
            </div>
            <div className="form-group">
              <label>Payer </label>
              <select onChange={handleChange} value={formData.payer} name='payer'>
                <option value="">Select one</option>
  <option value="Jhon Doe">Jhon Doe</option>
  <option value="HOST-1">HOST-1</option>
  <option value="Ffffff">Ffffff</option>
  <option value="Rajib">Rajib</option>
  <option value="Fgh">Fgh</option>
  <option value="Saurabh Patil">Saurabh Patil</option>
  <option value="13232">13232</option>
  <option value="Jyothsna">Jyothsna</option>

             </select>
            </div>
            <div className="form-group">
              <label>Payment Method  <span>*</span></label>
            <select onChange={handleChange} value={formData.paymentMethod} name='paymentMethod'>
                <option value="">Select one</option>
  <option value="Cash">Cash</option>
  <option value="PayPal">PayPal</option>
  <option value="Credit Card">Credit Card</option>
  <option value="Bkash">Bkash</option>
  <option value="Stripe">Stripe</option>
  <option value="Transfer">Transfer</option>
  <option value="Pix">Pix</option>
            </select>
            </div>
            <div className="form-group">
              <label>Reference</label>
              <input type="text" placeholder="" onChange={handleChange} value={formData.reference} name='reference' />
            </div>
            <div className="form-group">
              <label> Note</label>
             <textarea name="note" className='form-control' onChange={handleChange} value={formData.note}></textarea>
            </div>
            </div>
            <div className="form-actions">
            <button type="submit"> <i className="fas fa-save"></i>Save</button>
          </div>
            </form>
            </div>
            </div>
   </>
  )
}

export default AddReIncome
