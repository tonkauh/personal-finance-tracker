import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TransactionForm({ onTransactionAdded, editData, setEditData, onClose }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Expense');
  const [category, setCategory] = useState('Food');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Populate form fields when switching to edit mode
  useEffect(() => {
    if (editData) {
      setDescription(editData.description);
      setAmount(editData.amount);
      setType(editData.type);
      setCategory(editData.category || 'Food');
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const payload = { 
      description, 
      amount: parseFloat(amount), 
      type,
      category: type === 'Expense' ? category : null
    };

    try {
      // Toggle between Create and Update operations
      if (editData) {
        // Execute PUT request for existing records
        await axios.put(`http://localhost:8080/api/transactions/${editData.id}`, payload);
      } else {
        // Execute POST request for new entries
        await axios.post('http://localhost:8080/api/transactions', payload);
      }
      finalizeSubmission();
    } catch (err) {
      console.error('Error saving transaction:', err);
      setError('Failed to save transaction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset UI state and notify parent component
  const finalizeSubmission = () => {
    setEditData(null);
    onTransactionAdded();
    setDescription('');
    setAmount('');
    setType('Expense');
    setCategory('Food');
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      <div className="transaction-form-overlay" onClick={onClose}></div>
      <div className="transaction-form-container floating-form" style={{ width: '90%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="form-header">
          <h4 className="transaction-form-title">
            {editData ? "Update Transaction" : "New Transaction"}
          </h4>
          <button 
            className="form-close-btn" 
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>
      <form onSubmit={handleSubmit} className="transaction-form">
        {error && <div className="form-error" style={{ color: '#ff4d4d', marginBottom: '1rem' }}>{error}</div>}
        <div className="form-group">
          <label className="form-label">Description</label>
          <input 
            className="form-input"
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            placeholder="Enter description" 
            required 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Amount (THB)</label>
          <input 
            className="form-input"
            type="number" 
            value={amount} 
            onChange={e => setAmount(e.target.value)} 
            placeholder="0.00" 
            required 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Type</label>
          <select 
            className="form-select"
            value={type} 
            onChange={e => setType(e.target.value)}
          >
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
          </select>
        </div>
        {type === 'Expense' && (
          <div className="form-group">
            <label className="form-label">Category</label>
            <select 
              className="form-select"
              value={category} 
              onChange={e => setCategory(e.target.value)}
            >
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Invest">Invest</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>
          </div>
        )}
        <div className="form-actions">
          <button 
            className="btn btn-primary" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : (editData ? "Apply Changes" : "Create Transaction")}
          </button>
          {editData && (
            <button 
              className="btn btn-secondary" 
              type="button" 
              onClick={() => finalizeSubmission()}
              disabled={isLoading}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      </div>
    </>
  );
}
export default TransactionForm;