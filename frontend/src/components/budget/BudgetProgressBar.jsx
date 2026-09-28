const getBarColor = (percent) => {
  if (percent >= 100) return 'bp-fill--danger';
  if (percent >= 80) return 'bp-fill--warning';
  return 'bp-fill--success';
};

const BudgetProgressBar = ({ budget }) => {
  const percent = Math.min(budget.percentUsed, 100);
  const color = getBarColor(budget.percentUsed);

  return (
    <div className="bp-row">
      <div className="bp-head">
        <div className="bp-head-left">
          <span>{budget.category.icon}</span>
          <span className="bp-cat-name">{budget.category.name}</span>
        </div>
        <span className={`bp-amounts ${budget.isExceeded ? 'bp-amounts--exceeded' : ''}`}>
          Rs {budget.spentAmount.toLocaleString()} / Rs {budget.limitAmount.toLocaleString()}
        </span>
      </div>
      <div className="bp-track">
        <div className={`bp-fill ${color}`} style={{ width: `${percent}%` }} />
      </div>
      {budget.isExceeded && (
        <p className="bp-over-text">Over budget by Rs {(budget.spentAmount - budget.limitAmount).toLocaleString()}</p>
      )}
    </div>
  );
};

export default BudgetProgressBar;
