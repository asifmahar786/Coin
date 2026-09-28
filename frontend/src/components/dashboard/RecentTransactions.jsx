const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

const RecentTransactions = ({ transactions }) => (
  <div className="card db-panel">
    <div className="chart-head">
      <h3 className="chart-title">Recent Transactions</h3>
    </div>

    {(!transactions || transactions.length === 0) && (
      <p className="chart-empty-text">No transactions logged yet.</p>
    )}

    <div className="recent-list">
      {transactions?.map((t) => (
        <div key={t._id} className={`recent-item recent-item--${t.type}`}>
          <div className="recent-item__info">
            <p className="recent-item__name">{t.category?.name || t.description || 'Transaction'}</p>
            <p className="recent-item__date">{formatDate(t.date)}</p>
          </div>
          <p className={`recent-item__amount recent-item__amount--${t.type}`}>
            {t.type === 'income' ? '+' : '−'}Rs {Number(t.amount).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default RecentTransactions;
