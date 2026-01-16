function TransactionTable({ data }) {
  return (
    <table border="1" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
      <thead>
        <tr style={{ backgroundColor: '#f2f2f2' }}>
          <th style={{ padding: '10px' }}>Description</th> 
          <th style={{ padding: '10px' }}>Amount</th>      
          <th style={{ padding: '10px' }}>Type</th>       
        </tr>
      </thead>
      <tbody>
        {data && data.length > 0 ? (
          data.map((t) => (
            <tr key={t.id}>
              <td style={{ padding: '10px' }}>{t.description}</td>
              <td style={{ padding: '10px' }}>{t.amount.toLocaleString()} THB</td>
              <td style={{ padding: '10px' }}>{t.type}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" style={{ textAlign: 'center', padding: '20px' }}>
              No transactions found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default TransactionTable;