import React, { useState } from 'react';
import axios from 'axios';

function TransactionForm({ onTransactionAdded }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Expense');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    
    // Convert amount to number before sending
    const newTransaction = { 
      description, 
      amount: parseFloat(amount), 
      type 
    };

    // Post data to Spring Boot backend
    axios.post('http://localhost:8080/api/transactions', newTransaction)
      .then(response => {
        alert("Transaction Added!");
        
        // Refresh the list and calculations in App.js
        onTransactionAdded(); 
        
        // Reset local form states
        setDescription('');
        setAmount('');
      })
      .catch(error => console.error("API Error:", error));
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
      <div>
        <label>Description</label><br/>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Amount</label><br/>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      </div>
      <div>
        <label>Type</label><br/>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Expense">Expense</option>
          <option value="Income">Income</option>
        </select>
      </div>
      <button type="submit" style={{ padding: '5px 20px', cursor: 'pointer' }}>Add</button>
    </form>
  );
}

export default TransactionForm;