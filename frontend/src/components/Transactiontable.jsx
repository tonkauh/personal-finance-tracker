import React from 'react'; 

function TransactionTable({ data, onDelete }) {
  return (
    <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ backgroundColor: '#f2f2f2' }}>
          <th>Description</th>
          <th>Amount</th>
          <th>Type</th>
          <th>Action</th> {/* New Column */}
        </tr>
      </thead>
      <tbody>
        {data.map((t) => (
          <tr key={t.id}>
            <td>{t.description}</td>
            <td>{t.amount.toLocaleString()} THB</td>
            <td>{t.type}</td>
            <td style={{ textAlign: 'center' }}>
              {/* Delete Button calling the delete function */}
              <button 
                onClick={() => onDelete(t.id)} 
                style={{ color: 'white', backgroundColor: '#ff5252', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TransactionTable;