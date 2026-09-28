const ReportFilters = ({ filters, setFilters, onExport }) => (
  <div className="card rf-bar">
    <div>
      <label className="label">From</label>
      <input
        type="date"
        className="input-field"
        value={filters.startDate}
        onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
      />
    </div>
    <div>
      <label className="label">To</label>
      <input
        type="date"
        className="input-field"
        value={filters.endDate}
        onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
      />
    </div>
    <div>
      <label className="label">Type</label>
      <select
        className="input-field"
        value={filters.type}
        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
      >
        <option value="">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
    </div>
    <button onClick={onExport} className="btn-secondary">Export PDF</button>
  </div>
);

export default ReportFilters;
