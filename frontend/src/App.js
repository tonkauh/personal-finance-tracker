import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [transactions, setTransactions] = useState([]);

  // ฟังก์ชันสำหรับดึงข้อมูลจาก Spring Boot
  const fetchTransactions = () => {
    axios.get('http://localhost:8080/api/transactions')
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h1>Personal Finance Tracker</h1>
      
      <h3>รายการธุรกรรม</h3>
      {transactions.length === 0 ? (
        <p>ไม่มีข้อมูลการทำรายการในขณะนี้</p>
      ) : (
        <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ padding: '10px' }}>รายละเอียด</th>
              <th style={{ padding: '10px' }}>จำนวนเงิน</th>
              <th style={{ padding: '10px' }}>ประเภท</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td style={{ padding: '10px' }}>{t.description}</td>
                <td style={{ padding: '10px' }}>{t.amount.toLocaleString()} บาท</td>
                <td style={{ padding: '10px' }}>{t.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;