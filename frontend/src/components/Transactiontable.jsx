import React from 'react';

function TransactionTable({ data, onDelete, onEdit }) {
  return (
    <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
      <thead>
        <tr style={{ backgroundColor: '#f9f9f9' }}>
          <th>Description</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((t) => (
          <tr key={t.id}>
            <td>{t.description}</td>
            <td>{t.amount.toLocaleString()} THB</td>
            <td>{t.type}</td>
            <td>
              {/* Trigger edit mode for the selected entry */}
              <button onClick={() => onEdit(t)} style={{ marginRight: '8px' }}>Edit</button>
              {/* Permanent removal of the record */}
              <button onClick={() => onDelete(t.id)} style={{ color: '#d9534f' }}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default TransactionTable;