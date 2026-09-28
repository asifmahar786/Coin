import { AlertTriangle, Pencil, Trash2 } from 'lucide-react';

const TransactionItem = ({ transaction, onEdit, onDelete }) => {
  const isIncome = transaction.type === 'income';
  const tint = transaction.category?.color || (isIncome ? '#12B76A' : '#EF4444');

  return (
    <div className="ti-row">
      <div className="ti-left">
        <span
          className="ti-icon"
          style={{ background: `${tint}1A`, color: tint }}
        >
          {transaction.category?.icon || (isIncome ? '↑' : '↓')}
        </span>
        <div className="ti-info">
          <p className="ti-desc">{transaction.description || transaction.category?.name}</p>
          <div className="ti-meta">
            <p className="ti-meta-text">
              {transaction.category?.name} · {new Date(transaction.date).toLocaleDateString()}
            </p>
            {transaction.isFlaggedAnomaly && (
              <span
                title={transaction.anomalyReason}
                className="ti-anomaly"
              >
                <AlertTriangle size={12} /> Unusual
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="ti-right">
        <span className={`ti-amount ${isIncome ? 'ti-amount--income' : 'ti-amount--expense'}`}>
          {isIncome ? '+' : '-'} Rs {transaction.amount.toLocaleString()}
        </span>
        <button onClick={() => onEdit(transaction)} aria-label="Edit" className="cc-icon-btn ti-edit-btn">
          <Pencil size={15} />
        </button>
        <button onClick={() => onDelete(transaction._id)} aria-label="Delete" className="cc-icon-btn ti-delete-btn">
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
};

export default TransactionItem;
