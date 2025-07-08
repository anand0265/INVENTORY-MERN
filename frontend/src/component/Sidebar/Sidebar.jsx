import React,{ useState } from 'react'
import './Sidebar.css'
import { FaUserCircle, FaTachometerAlt, FaBox, FaCartPlus, FaTruck, FaUndo, FaChartLine, FaMoneyBillAlt, FaPhone
    ,FaExchangeAlt, FaRedoAlt, FaChartBar } from 'react-icons/fa';
    import { MdOutlineSettingsSystemDaydream } from "react-icons/md";
    import { LiaLanguageSolid } from "react-icons/lia";
    import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";

import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [showContactsSubmenu, setShowContactsSubmenu] =useState(false);
    const [showSupplierMenu, setShowSupplierMenu]= useState(false);
    const [showPurchaseMenu, setShowPurchaseMwnu] = useState(false);
    const [showReturnMenu, setShowReturnMenu] = useState(false);
    const [showSalesMenu, setShowSalesMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showTransactionMenu, setShowTransactionMenu] = useState(false);
    const [showReccuringMenu, setShowReccuringMenu] = useState(false);
    const [showReportMenu, setShowReportMenu] = useState(false);
    
    const [showSystemSettingMenu, setShowSystemSettingMenu] = useState(false);
    const [showUserMangMenu, setShowUserMangMenu] = useState(false);
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    const [showTransactionSettMenu, setShowTransactionSettMenu] = useState(false);
    
  return (
    <>
          <aside className="sidebar">
            <div className="admin-section">
              <FaUserCircle className="admin-avatar" />
              <p className="admin-names">Admin</p>
            </div>
            <h4 id='NAVI'>NAVIGATION</h4>
            <nav className="nav-links">
              {/* <a href="#"><FaTachometerAlt /> Dashboard</a> */}
              <Link to='/dashboard'><FaTachometerAlt />Dashboard</Link>
              {/* <a href="#"><FaPhone /> Contacts</a> */}
            
    <div className="nav-item-with-submenu">
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setShowContactsSubmenu(!showContactsSubmenu);
        }}
     className="submenu-toggle" >
        <FaPhone /> Contacts {showContactsSubmenu ? (
          <MdKeyboardArrowDown className="arrow-icon" />
        ) : (
          <MdKeyboardArrowRight className="arrow-icon" />
        )}
      </a>
      {showContactsSubmenu && (
        <div className="submenu">
          {/* <a href="#"> Contact List</a> */}
          <Link to='/contact-list'>Contact List</Link>
        
          {/* <a href="#"> Add New</a> */}
          <Link to="/add-contact">Add New</Link>
          {/* <a href="#"> Contact Group</a> */}
          <Link to='/contact-group-list' >Contact Group</Link>
        </div>
      )}
    </div>
              {/* <a href="#"><FaBox /> Products</a> */}
               <Link to="/products"><FaBox />Products</Link>
              {/* <a href="#"><FaChartLine /> Services</a> */}
              <Link to='/service-list'><FaChartLine /> Services</Link>
              {/* <a href="#"><FaTruck /> Supplier</a> */}
              
              <div className="nav-item-with-submenu">
      <a href="#" onClick={(e) => {e.preventDefault(); setShowSupplierMenu(!showSupplierMenu);}}  className="submenu-toggle">
         <FaTruck /> Supplier  {showSupplierMenu ? (
          <MdKeyboardArrowDown className="arrow-icon" />
        ) : (
          <MdKeyboardArrowRight className="arrow-icon" />
        )} </a>
      {showSupplierMenu && (
        <div className="submenu">
          {/* <a href="#"> Supplier List</a> */}
          <Link to='/supplier-list' >Supplier List</Link>
          {/* <a href="#"> Add New</a> */}
          <Link to='/add/supplier'>Add New</Link>
        </div>
      )}
    </div>
              {/* <a href="#"><FaCartPlus /> Purchase</a> */}
              <div className='nav-item-with-submenu'>
                <a href="#" onClick={(e)=>{e.preventDefault(); setShowPurchaseMwnu(!showPurchaseMenu)}} className="submenu-toggle">
                   <FaCartPlus /> Purchase {showPurchaseMenu ? (
                      <MdKeyboardArrowDown className="arrow-icon" />
                   ): (
                       <MdKeyboardArrowRight className="arrow-icon" />
                   )} </a>
                   {showPurchaseMenu && (
                    <div className='submenu'>
                        {/* <a href="#">Purchase Order</a> */}
                        <Link to='/purchase' >Purchase Order</Link>
                        {/* <a href="#">New PurchaseOrder</a> */}
                        <Link to='/add/purchase' >New Purchase Order</Link>
                        </div>
                   )}
                </div>
    
    
              {/* <a href="#"><FaUndo /> Return</a> */}

              {/*  Remove this part */}
              
               {/* <div className='nav-item-with-submenu'>
               <a href="#" onClick={(e)=>{e.preventDefault(); setShowReturnMenu(!showReturnMenu)}} className='submenu-toggle' >
                <FaUndo /> Return {showReturnMenu ? (
                    <MdKeyboardArrowDown className="arrow-icon" />
                     ) : (
                    <MdKeyboardArrowRight className="arrow-icon" />
                     )} </a>
                     {showReturnMenu && (
                         <div className='submenu'>
                        <a href="#">Purchase Return</a>
                        <a href="#">Sales Return</a>
                        </div>
                     )}
                </div> */}

              {/* <a href="#"><FaChartLine /> Sales</a> */}
              <div className='nav-item-with-submenu'>
               <a href="#" onClick={(e)=>{e.preventDefault(); setShowSalesMenu(!showSalesMenu)}} className='submenu-toggle' >
                <FaChartLine /> Sales {showSalesMenu ? (
                    <MdKeyboardArrowDown className="arrow-icon" />
                     ) : (
                    <MdKeyboardArrowRight className="arrow-icon" />
                     )} </a>
                     {showSalesMenu && (
                         <div className='submenu'>
                        {/* <a href="#">Create Invoice</a> */}
                        <Link to='/create/invoice'>Create Invoice</Link>
                        {/* <a href="#">Invoice List</a> */}
                        <Link to='/invoice-list'>Invoice List</Link>
                         {/* <a href="#">Create Quotation</a> */}
                         <Link to='/create/quotation'>Create Quotation</Link>
                        {/* <a href="#">Quotation List</a> */}
                        <Link to='/quotation-list'>Quotation List</Link>
                        </div>
                     )}
                </div>
    
              {/* <a href="#"><FaMoneyBillAlt /> Accounts</a> */}
              <div className='nav-item-with-submenu'>
               <a href="#" onClick={(e)=>{e.preventDefault(); setShowAccountMenu(!showAccountMenu)}} className='submenu-toggle' >
                <FaMoneyBillAlt /> Accounts {showAccountMenu ? (
                    <MdKeyboardArrowDown className="arrow-icon" />
                     ) : (
                    <MdKeyboardArrowRight className="arrow-icon" />
                     )} </a>
                     {showAccountMenu && (
                         <div className='submenu'>
                        {/* <a href="#">All Account</a> */}
                        <Link to='/account-list'>All Account</Link>
                        {/* <a href="#">Add New Account</a> */}
                        <Link to='/add-account'>Add New Account</Link>
                        </div>
                     )}
                </div>
              {/* <a href=""><FaExchangeAlt /> Transaction</a> */}
              <div className='nav-item-with-submenu'>
               <a href="#" onClick={(e)=>{e.preventDefault(); setShowTransactionMenu(!showTransactionMenu)}} className='submenu-toggle' >
                <FaExchangeAlt /> Transaction {showTransactionMenu ? (
                    <MdKeyboardArrowDown className="arrow-icon" />
                     ) : (
                    <MdKeyboardArrowRight className="arrow-icon" />
                     )} </a>
                     {showTransactionMenu && (
                         <div className='submenu'>
                        {/* <a href="#">Income/Deposit</a> */}
                        <Link to='/incomes-list'>Income/Deposit</Link>
                        {/* <a href="#">Expense</a> */}
                        <Link to='/expenses-list'>Expenses</Link>
                        {/* <a href="#">Transfer</a> */}
                        <Link to='/add-transfer'>Transfer</Link>
                        {/* <a href="#">Income Calender</a> */}
                        <Link to='/income-calender'>Income Calender</Link>
                         {/* <a href="#">Expense Calender</a> */}
                         <Link to='/expense-calender'>Expense Calender</Link>
                        </div>
                     )}
                </div>
          {/* <a href=""><FaRedoAlt /> Recurring Transaction</a> */}
          <div className='nav-item-with-submenu'>
               <a href="#" onClick={(e)=>{e.preventDefault(); setShowReccuringMenu(!showReccuringMenu)}} className='submenu-toggle' >
               <FaRedoAlt /> Recurring Transaction {showReccuringMenu ? (
                    <MdKeyboardArrowDown className="arrow-icon" />
                     ) : (
                    <MdKeyboardArrowRight className="arrow-icon" />
                     )} </a>
                     {showReccuringMenu && (
                         <div className='submenu'>
                        {/* <a href="#">Add Repeating Income</a> */}
                        <Link to='/add-income'>Add Repeating Income</Link>
                        {/* <a href="#">Repeating Income List</a> */}
                        <Link to='/income-list'>Repeating Income List</Link>
                        {/* <a href="#">Add Repeating Expense</a> */}
                        <Link to='/add-expense'>Add Repeating Expense</Link>
                        {/* <a href="#">Repeating Expense List</a> */}
                        <Link to='/expense-list'>Repeating Expense List</Link>
                        </div>
                     )}
                </div>
          {/* <a href=""><FaChartBar /> Report</a> */}
          <div className='nav-item-with-submenu'>
               <a href="#" onClick={(e)=>{e.preventDefault(); setShowReportMenu(!showReportMenu)}} className='submenu-toggle' >
             <FaChartBar /> Report {showReportMenu ? (
                    <MdKeyboardArrowDown className="arrow-icon" />
                     ) : (
                    <MdKeyboardArrowRight className="arrow-icon" />
                     )} </a>
                     {showReportMenu && (
                         <div className='submenu'>
                        <a href="#">Account Statement</a>
                        <a href="#">Income Report</a>
                        <a href="#">Expense Report</a>
                        <a href="#">Transfer Report</a>
                        <a href="#">Income VS Expense</a>
                        <a href="#">Report by Payer</a>
                        <a href="#">Report by Payee</a>
                        </div>
                     )}
                </div>
            </nav>
            <h4 id='NAVI'>SYSTEM SETTING</h4>
              <nav className="nav-links">
            {/* <a href="#"><MdOutlineSettingsSystemDaydream /> System Setting</a> */}
            <div className="nav-item-with-submenu">
      <a href="#" onClick={(e) => {e.preventDefault(); setShowSystemSettingMenu(!showSystemSettingMenu)}} className="submenu-toggle" >
      <MdOutlineSettingsSystemDaydream /> System Setting {showSystemSettingMenu ? (
          <MdKeyboardArrowDown className="arrow-icon" />
        ) : (
          <MdKeyboardArrowRight className="arrow-icon" />
        )}
      </a>
      {showSystemSettingMenu && (
        <div className="submenu">
          <a href="#">General Setting</a>
          <a href="#">Product Unit</a>
          <a href="#">Email Template</a>
          <a href="#">Database Backup</a>
        </div>
      )}
    </div>
               {/* <a href="#"><FaUserCircle/> User Management</a> */}
               <div className="nav-item-with-submenu">
      <a href="#" onClick={(e) => {e.preventDefault(); setShowUserMangMenu(!showUserMangMenu)}} className="submenu-toggle" >
     <FaUserCircle/> User Management {showUserMangMenu ? (
          <MdKeyboardArrowDown className="arrow-icon" />
        ) : (
          <MdKeyboardArrowRight className="arrow-icon" />
        )}
      </a>
      {showUserMangMenu && (
        <div className="submenu">
          <a href="#">All User</a>
          {/* <a href="#">Add New</a> */}
          <Link to='/add-new-user'>Add New</Link>
          <a href="#">User Roles</a>
          <a href="#">Access Control</a>
        </div>
      )}
    </div>
               {/* <a href="#"><LiaLanguageSolid />Languages</a> */}
               <div className="nav-item-with-submenu">
      <a href="#" onClick={(e) => {e.preventDefault(); setShowLanguageMenu(!showLanguageMenu)}} className="submenu-toggle" >
    <LiaLanguageSolid />Languages  {showLanguageMenu ? (
          <MdKeyboardArrowDown className="arrow-icon" />
        ) : (
          <MdKeyboardArrowRight className="arrow-icon" />
        )}
      </a>
      {showLanguageMenu && (
        <div className="submenu">
          <a href="#">All Language</a>
          <a href="#">Add New</a>
        </div>
      )}
    </div>
               {/* <a href="#"><RiSettings4Line size={22} />Transaction Setting</a> */}
               <div className="nav-item-with-submenu">
      <a href="#" onClick={(e) => {e.preventDefault(); setShowTransactionSettMenu(!showTransactionSettMenu)}} className="submenu-toggle" >
    <RiSettings4Line size={22} />Transaction Setting  {showTransactionSettMenu ? (
          <MdKeyboardArrowDown className="arrow-icon" />
        ) : (
          <MdKeyboardArrowRight className="arrow-icon" />
        )}
      </a>
      {showTransactionSettMenu && (
        <div className="submenu">
          <a href="#">Income & Expense Type</a>
          <a href="#">Payment Methods</a>
               <a href="#">Tax Settings</a>
        </div>
      )}
    </div>
            </nav>
          </aside>
          
            
    </>
  )
}

export default Sidebar
