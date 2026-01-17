import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TransactionForm({ onTransactionAdded, editData, setEditData }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Expense');

  // Populate form fields when switching to edit mode
  useEffect(() => {
    if (editData) {
      setDescription(editData.description);
      setAmount(editData.amount);
      setType(editData.type);
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { description, amount: parseFloat(amount), type };

    // Toggle between Create and Update operations
    if (editData) {
      // Execute PUT request for existing records
      axios.put(`http://localhost:8080/api/transactions/${editData.id}`, payload)
        .then(() => finalizeSubmission());
    } else {
      // Execute POST request for new entries
      axios.post('http://localhost:8080/api/transactions', payload)
        .then(() => finalizeSubmission());
    }
  };

  // Reset UI state and notify parent component
  const finalizeSubmission = () => {
    setEditData(null);
    onTransactionAdded();
    setDescription('');
    setAmount('');
    setType('Expense');
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h4>{editData ? "Update Transaction" : "New Transaction"}</h4>
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required />
      <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" required />
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="Expense">Expense</option>
        <option value="Income">Income</option>
      </select>
      <button type="submit">{editData ? "Apply Changes" : "Create"}</button>
      {editData && (
        <button type="button" onClick={() => finalizeSubmission()} style={{ marginLeft: '10px' }}>
          Cancel
        </button>
      )}
    </form>
  );
}
export default TransactionForm;