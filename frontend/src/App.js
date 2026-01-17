import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Sidebar from './components/Sidebar';
import TransactionForm from './components/TransactionForm';
import TransactionTable from './components/TransactionTable';
import Chart from './components/Chart';
import Settings from './components/Settings';

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [editData, setEditData] = useState(null); // Tracks the record currently being modified
  const [filterType, setFilterType] = useState('All'); // Manages the selected view filter
  const [showForm, setShowForm] = useState(false); // Controls form visibility
  const [activeMenu, setActiveMenu] = useState('Dashboard'); // Tracks active menu item
  const [currency, setCurrency] = useState(() => localStorage.getItem('app_currency') || 'THB');

  useEffect(() => {
    localStorage.setItem('app_currency', currency);
  }, [currency]);

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
        .catch(err => console.error("Deletetion failed:", err));
    }
  };

  // Derive subset of transactions based on user selection
  const filteredData = transactions.filter(t => 
    filterType === 'All' ? true : t.type === filterType
  );
  // Derive financial summaries from the master transaction list
  const totalIncome = transactions
    .filter(t => t.type === 'Income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'Expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const netSaving = totalIncome - totalExpense; // Calculate net balance

  const renderContent = () => {
    switch (activeMenu) {
      case 'Dashboard':
        return (
          <>
            {/* Financial Summary Dashboard */}
            <div className="summary-cards">
              <div className="summary-card income">
                <div className="summary-card-header">
                  <p className="summary-card-label">Total Income</p>
                  <div className="summary-card-icon income"></div>
                </div>
                <h2 className="summary-card-amount">
                  +{totalIncome.toLocaleString()} {currency}
                </h2>
              </div>

              <div className="summary-card expense">
                <div className="summary-card-header">
                  <p className="summary-card-label">Total Expense</p>
                  <div className="summary-card-icon expense"></div>
                </div>
                <h2 className="summary-card-amount">
                  -{totalExpense.toLocaleString()} {currency}
                </h2>
              </div>

              <div className={`summary-card saving ${netSaving < 0 ? 'negative' : ''}`}>
                <div className="summary-card-header">
                  <p className="summary-card-label">Net Saving</p>
                  <div className="summary-card-icon saving"></div>
                </div>
                <h2 className="summary-card-amount">
                  {netSaving.toLocaleString()} {currency}
                </h2>
              </div>
            </div>

            {(showForm || editData) && (
              <TransactionForm 
                onTransactionAdded={fetchTransactions} 
                editData={editData} 
                setEditData={setEditData}
                onClose={() => {
                  setShowForm(false);
                  setEditData(null);
                }}
              />
            )}

            <div className="bottom-section">
              <Chart transactions={transactions} />
              <div className="transaction-table-container">
                <div className="transaction-header">
                  <h3 className="transaction-table-title">Transaction History</h3>
                  <div className="transaction-controls">
                    <span className="filter-label">View Category:</span>
                    <select 
                      className="filter-select"
                      onChange={(e) => setFilterType(e.target.value)} 
                      value={filterType}
                    >
                      <option value="All">All Transactions</option>
                      <option value="Income">Income</option>
                      <option value="Expense">Expense</option>
                    </select>
                    <button 
                      className="btn btn-primary new-transaction-btn"
                      onClick={() => setShowForm(true)}
                      title="New Transaction"
                    >
                      +
                    </button>
                  </div>
                </div>
                <TransactionTable 
                  data={filteredData} 
                  onDelete={deleteTransaction} 
                  onEdit={(item) => setEditData(item)}
                />
              </div>
            </div>
          </>
        );
      
      case 'Transactions':
        return (
          <>
            {(showForm || editData) && (
              <TransactionForm 
                onTransactionAdded={fetchTransactions} 
                editData={editData} 
                setEditData={setEditData}
                onClose={() => {
                  setShowForm(false);
                  setEditData(null);
                }}
              />
            )}

            <div className="transaction-table-container">
              <div className="transaction-header">
                <h3 className="transaction-table-title">Transaction History</h3>
                <div className="transaction-controls">
                  <span className="filter-label">View Category:</span>
                  <select 
                    className="filter-select"
                    onChange={(e) => setFilterType(e.target.value)} 
                    value={filterType}
                  >
                    <option value="All">All Transactions</option>
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                  </select>
                  <button 
                    className="btn btn-primary new-transaction-btn"
                    onClick={() => setShowForm(true)}
                    title="New Transaction"
                  >
                    +
                  </button>
                </div>
              </div>
              <TransactionTable 
                data={filteredData} 
                onDelete={deleteTransaction} 
                onEdit={(item) => setEditData(item)}
              />
            </div>
          </>
        );
      
      case 'Reports':
        return (
          <div className="chart-container full-width-chart">
            <Chart transactions={transactions} />
          </div>
        );
      
      case 'Settings':
        return <Settings currency={currency} setCurrency={setCurrency} />;
      
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      
      <div className="mobile-bottom-nav">
        <button 
          className={`mobile-nav-item ${activeMenu === 'Dashboard' ? 'active' : ''}`}
          onClick={() => setActiveMenu('Dashboard')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
        </button>
        <button 
          className={`mobile-nav-item ${activeMenu === 'Transactions' ? 'active' : ''}`}
          onClick={() => setActiveMenu('Transactions')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
        </button>
        <button 
          className={`mobile-nav-item ${activeMenu === 'Reports' ? 'active' : ''}`}
          onClick={() => setActiveMenu('Reports')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
        </button>
        <button 
          className={`mobile-nav-item ${activeMenu === 'Settings' ? 'active' : ''}`}
          onClick={() => setActiveMenu('Settings')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        </button>
      </div>
      <div className="main-content">
        {activeMenu !== 'Dashboard' && (
          <div className="page-header">
            <h1 className="page-title">
              {activeMenu === 'Transactions' && 'Transactions'}
              {activeMenu === 'Reports' && 'Financial Reports'}
              {activeMenu === 'Settings' && 'Settings'}
            </h1>
            <p className="page-description">
              {activeMenu === 'Transactions' && 'View and manage all your transactions'}
              {activeMenu === 'Reports' && 'Visualize your financial data with charts and graphs'}
              {activeMenu === 'Settings' && 'Customize your finance tracker preferences'}
            </p>
          </div>
        )}

        {renderContent()}
      </div>
    </div>
  );
}
