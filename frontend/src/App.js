import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Button from './components/Button.jsx';
import TransactionTable from './components/Transactiontable.jsx';

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true); // สร้างสถานะ Loading

  useEffect(() => {
    axios.get('http://localhost:8080/api/transactions')
      .then(response => {
        setTransactions(response.data);
        setLoading(false); // โหลดเสร็จแล้ว ปิด Loading
      })
      .catch(error => {
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>Loading...</h2>; 

  return (
    <div>
      <h1>Personal Finance Tracker</h1>
      {transactions.length === 0 ? (
        <p>No transactions found. Try adding some!</p> 
      ) : (
        <TransactionTable data={transactions} />
      )}
    </div>
  );
}