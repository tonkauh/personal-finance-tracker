import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Sidebar from './components/Sidebar';
import TransactionForm from './components/TransactionForm';
import TransactionTable from './components/Transactiontable';
import Chart from './components/Chart';
import Settings from './components/Settings';

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [editData, setEditData] = useState(null); // Tracks the record currently being modified
  const [filterType, setFilterType] = useState('All'); // Manages the selected view filter
  const [showForm, setShowForm] = useState(false); // Controls form visibility
  const [activeMenu, setActiveMenu] = useState('Dashboard'); // Tracks active menu item

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
                  +{totalIncome.toLocaleString()} THB
                </h2>
              </div>

              <div className="summary-card expense">
                <div className="summary-card-header">
                  <p className="summary-card-label">Total Expense</p>
                  <div className="summary-card-icon expense"></div>
                </div>
                <h2 className="summary-card-amount">
                  -{totalExpense.toLocaleString()} THB
                </h2>
              </div>

              <div className={`summary-card saving ${netSaving < 0 ? 'negative' : ''}`}>
                <div className="summary-card-header">
                  <p className="summary-card-label">Net Saving</p>
                  <div className="summary-card-icon saving"></div>
                </div>
                <h2 className="summary-card-amount">
                  {netSaving.toLocaleString()} THB
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
        return <Settings />;
      
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <div className="main-content">
        <div className="page-header">
          <h1 className="page-title">
            {activeMenu === 'Dashboard' && 'Personal Finance Dashboard'}
            {activeMenu === 'Transactions' && 'Transactions'}
            {activeMenu === 'Reports' && 'Financial Reports'}
            {activeMenu === 'Settings' && 'Settings'}
          </h1>
          <p className="page-description">
            {activeMenu === 'Dashboard' && 'Track your income, expenses, and savings all in one place'}
            {activeMenu === 'Transactions' && 'View and manage all your transactions'}
            {activeMenu === 'Reports' && 'Visualize your financial data with charts and graphs'}
            {activeMenu === 'Settings' && 'Customize your finance tracker preferences'}
          </p>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}