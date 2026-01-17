import React from 'react';

function TransactionTable({ data, onDelete, onEdit }) {
  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <table className="transaction-table" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Description</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'white' }}>
              No transactions found. Add your first transaction above!
            </td>
          </tr>
        ) : (
          data.map((t) => (
            <tr key={t.id}>
              <td>{t.description}</td>
              <td style={{ fontWeight: 600, color: 'white' }}>
                {t.type === 'Income' ? '+' : '-'}{t.amount.toLocaleString()} THB
              </td>
              <td>
                <span className={`type-badge ${t.type.toLowerCase()}`}>
                  {t.type === 'Expense' && t.category ? t.category : t.type}
                </span>
              </td>
              <td>
                <div className="action-buttons">
                  <button 
                    className="btn-sm btn-edit" 
                    onClick={() => onEdit(t)}
                    title="Edit"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.333 2.00001C11.5084 1.82446 11.7163 1.68506 11.9448 1.59127C12.1732 1.49747 12.4179 1.45117 12.6663 1.45117C12.9148 1.45117 13.1595 1.49747 13.3879 1.59127C13.6164 1.68506 13.8243 1.82446 13.9997 2.00001C14.1753 2.17545 14.3147 2.38334 14.4085 2.6118C14.5023 2.84025 14.5486 3.08496 14.5486 3.33334C14.5486 3.58172 14.5023 3.82643 14.4085 4.05488C14.3147 4.28334 14.1753 4.49123 13.9997 4.66668L5.49967 13.1667L1.33301 14.3333L2.49967 10.1667L11.333 2.00001Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button 
                    className="btn-sm btn-delete" 
                    onClick={() => onDelete(t.id)}
                    title="Delete"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 4H14M12.6667 4V13.3333C12.6667 13.687 12.5262 14.0261 12.2761 14.2762C12.026 14.5263 11.687 14.6667 11.3333 14.6667H4.66667C4.31305 14.6667 3.97391 14.5263 3.72381 14.2762C3.47371 14.0261 3.33333 13.687 3.33333 13.3333V4M5.33333 4V2.66667C5.33333 2.31305 5.47371 1.97391 5.72381 1.72381C5.97391 1.47371 6.31305 1.33333 6.66667 1.33333H9.33333C9.68696 1.33333 10.0261 1.47371 10.2762 1.72381C10.5263 1.97391 10.6667 2.31305 10.6667 2.66667V4M6.66667 7.33333V11.3333M9.33333 7.33333V11.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
    </div>
  );
}
export default TransactionTable;