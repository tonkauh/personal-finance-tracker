import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TransactionForm from './components/TransactionForm';
import TransactionTable from './components/Transactiontable';

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch transactions from Spring Boot API
  const fetchTransactions = () => {
    axios.get('http://localhost:8080/api/transactions')
      .then(response => {
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

  // --- Financial Logic Feature ---
  // Calculate totals by filtering and reducing the transactions array
  const totalIncome = transactions
    .filter(t => t.type === 'Income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'Expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const netBalance = totalIncome - totalExpense;
  // --- Delete Transaction Feature ---
const deleteTransaction = (id) => {
  if (window.confirm("Are you sure?")) {
    axios.delete(`http://localhost:8080/api/transactions/${id}`)
      .then(() => {
        fetchTransactions(); 
        console.log("Deleted item with id:", id); 
      })
      .catch(err => console.error("Error:", err));
  }
};

// ... in your return statement, pass this function to the table
<TransactionTable data={transactions} onDelete={deleteTransaction} />

  if (loading) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Personal Finance Tracker</h1>

      {/* Summary Dashboard Feature */}
      <div>
        <div>
          <p>Total Income</p>
          <h2 style={{ color: 'green' }}>{totalIncome.toLocaleString()} THB</h2>
        </div>
        <div>
          <p>Total Expense</p>
          <h2 style={{ color: 'red' }}>{totalExpense.toLocaleString()} THB</h2>
        </div>
        <div>
          <p>Net Balance</p>
          <h2 style={{ color: netBalance >= 0 ? 'blue' : 'orange' }}>{netBalance.toLocaleString()} THB</h2>
        </div>
      </div>

      {/* Pass fetch function to form for automatic refresh */}
      <TransactionForm onTransactionAdded={fetchTransactions} />
      
      <div style={{ marginTop: '30px' }}>
        <h3>Recent Transactions</h3>
        {transactions.length === 0 ? (
          <p>No records found.</p>
        ) : (
          <TransactionTable data={transactions} onDelete={deleteTransaction} />
        )}
      </div>
    </div>
  );
}