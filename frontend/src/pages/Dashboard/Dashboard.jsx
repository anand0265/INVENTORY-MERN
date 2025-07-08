// import React, { useState } from 'react'
// import './Dashboard.css'
// import Navbar from '../../component/Navbar/Navbar'
 
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from 'recharts';
// import Sidebar from '../../component/Sidebar/Sidebar';



// const Dashboard = () => {
//   const [sidebarVisible, setSidebarVisible] = useState(true);

//     const toggleSidebar = () => {
//     setSidebarVisible(!sidebarVisible);
//   };


//      const data = [
//   { name: 'Jan', Income: 0, Expense: 0 },
//   { name: 'Feb', Income: 650000, Expense: 100000 },
//   { name: 'Mar', Income: 0, Expense: 250000 },
//   { name: 'Apr', Income: 3000, Expense: 2000 },
//   { name: 'May', Income: 500000, Expense: 5000 },
//   { name: 'Jun', Income: 0, Expense: 0 },
//   { name: 'Jul', Income: 0, Expense: 0 },
//   { name: 'Aug', Income: 0, Expense: 0 },
//   { name: 'Sep', Income: 0, Expense: 0 },
//   { name: 'Oct', Income: 0, Expense: 0 },
//   { name: 'Nov', Income: 0, Expense: 0 },
//   { name: 'Dec', Income: 0, Expense: 0 },
// ];
//   return (
//     <>
//   <Navbar onToggleSidebar={toggleSidebar} />
   
//     <div className="dashboard-container">
//          {sidebarVisible && ( 
//       <Sidebar/>
//        )}

//       <main className="main-content">
//         <div className="stats">
//           <div className="card">Current Day Income <p>$0.00</p></div>
//           <div className="card">Current Day Expense <p>$0.00</p></div>
//           <div className="card">Monthly Income <p>$0.00</p></div>
//           <div className="card">Monthly Expense <p>$0.00</p></div>
//         </div>

//         <div className="chart-section">
//           <h3>Income vs Expense of 2025</h3>
//           <div className="chart-placeholder"> <ResponsiveContainer width="100%" height={300}>
//   <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
//     <CartesianGrid strokeDasharray="3 3" />
//     <XAxis dataKey="name" />
//     <YAxis />
//     <Tooltip />
//     <Legend />
//     <Line type="monotone" dataKey="Income" stroke="#2c67f2" />
//     <Line type="monotone" dataKey="Expense" stroke="#f54242" />
//   </LineChart>
// </ResponsiveContainer></div>
          
//         </div>

//         <div className="table-section">
//           <div className="table-box">
//             <h4>Last 5 Income</h4>
//             <table>
//               <thead>
//                 <tr><th>Date</th><th>Type</th><th>Amount</th><th>Details</th></tr>
//               </thead>
//               <tbody>
//                 <tr><td>28/May/2025</td><td>Sell</td><td>$1000.00</td><td>---</td></tr>
//               </tbody>
//             </table>
//           </div>
//           <div className="table-box">
//             <h4>Last 5 Expense</h4>
//             <table>
//               <thead>
//                 <tr><th>Date</th><th>Type</th><th>Amount</th><th>Details</th></tr>
//               </thead>
//               <tbody>
//                 <tr><td>28/May/2025</td><td>Transfer</td><td>$100.00</td><td>---</td></tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//         {/* 2 div */}
//          <div className="table-section">
//              <div className="table-box">
//             <div className="stats">
//           <div className="cards">Income vs Expense of Jun, 2025 </div>

//           <div className="cards">Financial Account Balance
//              <table>
//               <thead>
//                 <tr><th>A/C</th><th>A/C Number</th><th>Balance</th></tr>
//               </thead>
//               <tbody>
//                 <tr><td>beg</td><td>1001</td><td>$ -139,705.00</td></tr>
//                  <tr><td>Kareem Hassani</td><td></td><td>$ -31,325.00</td></tr>
//                   <tr><td>Test-1</td><td>123456</td><td>$ 5,912.00</td></tr>
//                    <tr><td>Test-1</td><td>2321</td><td>$ -1,900.00</td></tr>
//               </tbody>
//             </table>
//           </div>
//          </div>
//         </div>
//          </div>
//       </main>
//     </div>


    
//     </>
//   )
// }

// export default Dashboard













import React, { useState } from 'react';
import './Dashboard.css';
import Navbar from '../../component/Navbar/Navbar';
import Sidebar from '../../component/Sidebar/Sidebar';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Dashboard = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  const data = [
    { name: 'Jan', Income: 0, Expense: 0 },
    { name: 'Feb', Income: 650000, Expense: 100000 },
    { name: 'Mar', Income: 0, Expense: 250000 },
    { name: 'Apr', Income: 3000, Expense: 2000 },
    { name: 'May', Income: 500000, Expense: 5000 },
    { name: 'Jun', Income: 0, Expense: 0 },
    { name: 'Jul', Income: 0, Expense: 0 },
    { name: 'Aug', Income: 0, Expense: 0 },
    { name: 'Sep', Income: 0, Expense: 0 },
    { name: 'Oct', Income: 0, Expense: 0 },
    { name: 'Nov', Income: 0, Expense: 0 },
    { name: 'Dec', Income: 0, Expense: 0 },
  ];

  return (
    <>
      <Navbar onToggleSidebar={toggleSidebar} />
      <div className="dashboard-container">
        {sidebarVisible && <Sidebar />}
        <main className="main-content">
          {/* Top 4 Cards */}
          <div className="stats">
            <div className="card">Current Day Income <p>$0.00</p></div>
            <div className="card">Current Day Expense <p>$0.00</p></div>
            <div className="card">Monthly Income <p>$0.00</p></div>
            <div className="card">Monthly Expense <p>$0.00</p></div>
          </div>

          {/* Line Chart */}
          <div className="chart-section">
            <h3>Income vs Expense of 2025</h3>
            <div className="chart-placeholder">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Income" stroke="#2c67f2" />
                  <Line type="monotone" dataKey="Expense" stroke="#f54242" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Two Tables */}
          <div className="table-section">
            <div className="table-box">
              <h4>Last 5 Income</h4>
              <table>
                <thead>
                  <tr><th>Date</th><th>Type</th><th>Amount</th><th>Details</th></tr>
                </thead>
                <tbody>
                  <tr><td>28/May/2025</td><td>Sell</td><td>$1000.00</td><td>---</td></tr>
                </tbody>
              </table>
            </div>
            <div className="table-box">
              <h4>Last 5 Expense</h4>
              <table>
                <thead>
                  <tr><th>Date</th><th>Type</th><th>Amount</th><th>Details</th></tr>
                </thead>
                <tbody>
                  <tr><td>28/May/2025</td><td>Transfer</td><td>$100.00</td><td>---</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Row: Card + Table */}
          <div className="bottom-section">
            <div className="cards">Income vs Expense of Jun, 2025</div>
            <div className="table-box">
              <h4>Financial Account Balance</h4>
              <table>
                <thead>
                  <tr><th>A/C</th><th>A/C Number</th><th>Balance</th></tr>
                </thead>
                <tbody>
                  <tr><td>beg</td><td>1001</td><td>$ -139,705.00</td></tr>
                  <tr><td>Kareem Hassani</td><td></td><td>$ -31,325.00</td></tr>
                  <tr><td>Test-1</td><td>123456</td><td>$ 5,912.00</td></tr>
                  <tr><td>Test-1</td><td>2321</td><td>$ -1,900.00</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
