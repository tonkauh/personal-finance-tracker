import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TransactionForm from './components/TransactionForm';
import TransactionTable from './components/Transactiontable';

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [editData, setEditData] = useState(null); // Tracks the record currently being modified
  const [filterType, setFilterType] = useState('All'); // Manages the selected view filter

  // Synchronize local state with backend database
  const fetchTransactions = () => {
    axios.get('http://localhost:8080/api/transactions')
      .then(res => setTransactions(res.data))
      .catch(err => console.error("Data retrieval error:", err));
  };

  useEffect(() => { fetchTransactions(); }, []);

  // Remove record by ID and refresh the list
  const deleteTransaction = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      axios.delete(`http://localhost:8080/api/transactions/${id}`)
        .then(() => fetchTransactions())
        .catch(err => console.error("Deletion failed:", err));
    }
  };

  // Derive subset of transactions based on user selection
  const filteredData = transactions.filter(t => 
    filterType === 'All' ? true : t.type === filterType
  );

  // Compute aggregate financial metrics from the master transaction list
  const totalIncome = transactions
    .filter(t => t.type === 'Income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'Expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const netSaving = totalIncome - totalExpense; // Calculate net balance

  return (
    <div style={{ padding: '30px', fontFamily: 'Inter, sans-serif' }}>
      <h1>Personal Finance Dashboard</h1>

      {/* Financial Summary Dashboard: Visualizing aggregate data */}
      <div style={{ marginBottom: '30px' }}>
        <div>
          <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Total Income</p>
          <h2 style={{ margin: 0, color: '#28a745' }}>+{totalIncome.toLocaleString()} THB</h2>
        </div>
      
        <div>
          <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Total Expense</p>
          <h2 style={{ margin: 0, color: '#dc3545' }}>-{totalExpense.toLocaleString()} THB</h2>
        </div>
      
        <div>
          <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Net Saving</p>
          <h2 style={{ margin: 0, color: netSaving >= 0 ? '#007bff' : '#fd7e14' }}>
            {netSaving.toLocaleString()} THB
          </h2>
        </div>
      </div>

      <hr />

      {/* Control panel for filtering transaction categories */}
      <div style={{ marginBottom: '20px', marginTop: '20px' }}>
        <span>View Category: </span>
        <select onChange={(e) => setFilterType(e.target.value)} value={filterType}>
          <option value="All">All Transactions</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </div>

      {/* Form component handling both Create and Update operations */}
      <TransactionForm 
        onTransactionAdded={fetchTransactions} 
        editData={editData} 
        setEditData={setEditData} 
      />

      {/* Tabular display of filtered transaction history */}
      <div style={{ marginTop: '20px' }}>
        <h3>History</h3>
        <TransactionTable 
          data={filteredData} 
          onDelete={deleteTransaction} 
          onEdit={(item) => setEditData(item)} // Propagate data to the form for editing
        />
      </div>
    </div>
  );
}