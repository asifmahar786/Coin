const QuickAddButtons = ({ onAddIncome, onAddExpense }) => (
  <div className="qab-row">
    <button
      onClick={onAddIncome}
      className="qab-btn qab-btn--income"
    >
      <span className="qab-dot qab-dot--income">+</span>
      Add income
    </button>
    <button
      onClick={onAddExpense}
      className="qab-btn qab-btn--expense"
    >
      <span className="qab-dot qab-dot--expense">−</span>
      Add expense
    </button>
  </div>
);

export default QuickAddButtons;
