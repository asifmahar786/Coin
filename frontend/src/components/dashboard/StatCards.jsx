import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const Change = ({ value, invert = false, light = false }) => {
  if (value === null) return null;
  const isUp = value >= 0;
  const good = invert ? !isUp : isUp;
  const Icon = isUp ? ArrowUpRight : ArrowDownRight;
  const cls = light
    ? 'stat-change stat-change--light'
    : `stat-change ${good ? 'stat-change--good' : 'stat-change--bad'}`;
  return (
    <span className={cls}>
      <Icon size={13} />
      {Math.abs(value)}% vs last month
    </span>
  );
};

const StatCards = ({ income, expense, balance, incomeChange, expenseChange, balanceChange }) => (
  <div className="stat-cards-row">
    <div className="stat-card">
      <p className="stat-card__label">Total Income</p>
      <p className="stat-card__value">Rs {income.toLocaleString()}</p>
      <Change value={incomeChange} />
    </div>

    <div className="stat-card stat-card--filled">
      <p className="stat-card__label stat-card__label--light">Total Expense</p>
      <p className="stat-card__value stat-card__value--light">Rs {expense.toLocaleString()}</p>
      <Change value={expenseChange} invert light />
    </div>

    <div className="stat-card">
      <p className="stat-card__label">Total Savings</p>
      <p className="stat-card__value">Rs {balance.toLocaleString()}</p>
      <Change value={balanceChange} />
    </div>
  </div>
);

export default StatCards;
