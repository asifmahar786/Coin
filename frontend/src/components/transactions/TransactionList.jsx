import { Receipt } from 'lucide-react';
import TransactionItem from './TransactionItem';

const TransactionList = ({ transactions, onEdit, onDelete }) => {
  if (!transactions.length) {
    return (
      <div className="card tl-empty">
        <span className="tl-empty-icon">
          <Receipt size={22} />
        </span>
        <p>No transactions yet. Add your first one to get started.</p>
      </div>
    );
  }

  return (
    <div className="card tl-card">
      <div className="tl-head">
        <h3 className="tl-title">Recent transactions</h3>
        <span className="tl-count">{transactions.length}</span>
      </div>
      <div className="tl-list">
        {transactions.map((t) => (
          <TransactionItem key={t._id} transaction={t} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
