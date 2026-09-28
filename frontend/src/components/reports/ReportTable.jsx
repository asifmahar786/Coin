const ReportTable = ({ rows }) => {
  if (!rows.length) {
    return (
      <div className="card rt-empty">
        <p>No data for this period.</p>
      </div>
    );
  }

  return (
    <div className="card rt-wrap">
      <table className="rt-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Type</th>
            <th>Transactions</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row._id}>
              <td className="rt-cell-cat">{row.category.name}</td>
              <td>
                <span className={row.category.type === 'income' ? 'badge-income' : 'badge-expense'}>
                  {row.category.type}
                </span>
              </td>
              <td className="rt-cell-count">{row.count}</td>
              <td className={`rt-cell-total ${row.category.type === 'income' ? 'rt-cell-total--income' : 'rt-cell-total--expense'}`}>
                Rs {row.total.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;
