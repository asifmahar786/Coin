import { ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react';

const TransactionSummary = ({ transactions, totalCount }) => {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const net = income - expense;

  return (
    <div className="tx-summary-row">
      <div className="tx-summary-card">
        <span className="tx-summary-icon tx-summary-icon--income">
          <ArrowUpRight size={16} />
        </span>
        <div>
          <p className="tx-summary-label">Income</p>
          <p className="tx-summary-value tx-summary-value--income">Rs {income.toLocaleString()}</p>
        </div>
      </div>
      <div className="tx-summary-card">
        <span className="tx-summary-icon tx-summary-icon--expense">
          <ArrowDownRight size={16} />
        </span>
        <div>
          <p className="tx-summary-label">Expense</p>
          <p className="tx-summary-value tx-summary-value--expense">Rs {expense.toLocaleString()}</p>
        </div>
      </div>
      <div className="tx-summary-card">
        <span className="tx-summary-icon tx-summary-icon--net">
          <Wallet size={16} />
        </span>
        <div>
          <p className="tx-summary-label">Net</p>
          <p className={`tx-summary-value ${net >= 0 ? 'tx-summary-value--income' : 'tx-summary-value--expense'}`}>
            {net >= 0 ? '+' : '−'}Rs {Math.abs(net).toLocaleString()}
          </p>
        </div>
      </div>
      {totalCount !== undefined && (
        <p className="tx-summary-hint">
          Showing latest {transactions.length} of {totalCount} transactions
        </p>
      )}
    </div>
  );
};

export default TransactionSummary;
