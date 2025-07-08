import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import Navbar from '../../component/Navbar/Navbar';
import Sidebar from '../../component/Sidebar/Sidebar';
import './ExpenseCalendar.css';

const ExpenseCalendar = () => {
  const [incomeEvents, setIncomeEvents] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(true);
    const toggleSidebar = () => setSidebarVisible(!sidebarVisible);


  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/re-expense/');
        const events = res.data.map((item) => ({
          title: `${item.expenseType} - $ ${parseFloat(item.amount).toFixed(2)}`,
          date: item.date,
          allDay: true,
        }));
        setIncomeEvents(events);
      } catch (err) {
        console.error('Error fetching income data:', err);
      }
    };

    fetchIncome();
  }, []);

  return (
    
    <>
      <Navbar onToggleSidebar={toggleSidebar}/>
      <div className="main-layout">
       
        {/* <Sidebar /> */}
         {sidebarVisible && <Sidebar />}
        
        <div  className={`calendar-container ${!sidebarVisible ? 'no-sidebar' : ''}`}>
          <h3 className="calendar-title">EXPENSE CALENDAR</h3>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={incomeEvents}
            headerToolbar={{
              left: 'prev,today,next',
              center: 'title',
              right: 'dayGridMonth,dayGridWeek,dayGridDay',
            }}
            height="auto"
          />
        </div>
      </div>
    </>
  );
};

export default ExpenseCalendar;
