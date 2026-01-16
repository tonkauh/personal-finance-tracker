import React, { useState } from 'react';
import axios from 'axios';

function TransactionForm({ onTransactionAdded }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Expense');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    
    const newTransaction = { description, amount: parseFloat(amount), type };

    axios.post('http://localhost:8080/api/transactions', newTransaction)
      .then(response => {
        alert("Transaction Added!"); // Notify user
        
        // Success: Trigger parent component to refresh the list
        onTransactionAdded();
        
        // Reset input fields after successful save
        setDescription('');
        setAmount('');
      })
      .catch(error => console.error("API Error:", error)); // Log communication issues
  };
  return (
    
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px'}}>
      <h3>Add New Transaction</h3>
      <input 
        type="text" placeholder="Description" value={description}
        onChange={(e) => setDescription(e.target.value)} required 
      />
      <input 
        type="number" placeholder="Amount" value={amount}
        onChange={(e) => setAmount(e.target.value)} required 
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="Expense">Expense</option>
        <option value="Income">Income</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
}

export default TransactionForm;