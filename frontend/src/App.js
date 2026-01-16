import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import TransactionForm from './components/TransactionForm.jsx';
import TransactionTable from './components/Transactiontable.jsx';

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // create func

const fetchTransactions = () => {
  // Get latest data from backend
  axios.get('http://localhost:8080/api/transactions')
    .then(response => {
      // Update state with new data to trigger re-render
      setTransactions(response.data); 
      setLoading(false);
    })
    .catch(error => {
      console.error("Fetch error:", error);
      setLoading(false);
    });
};


  useEffect(() => {
    fetchTransactions();
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>Personal Finance Tracker</h1>
      <TransactionForm onTransactionAdded={fetchTransactions} />
      
      {transactions.length === 0 ? (
        <p>No transactions found. Try adding some!</p>
      ) : (
        <TransactionTable data={transactions} />
      )}
    </div>
  );
}