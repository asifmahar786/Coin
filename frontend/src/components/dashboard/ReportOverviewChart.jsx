import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const ReportOverviewChart = ({ income, expense, balance }) => {
  const total = income + expense + Math.max(balance, 0);
  const data = [
    { name: 'Income', value: income || 0.0001, color: 'var(--db-green-500)' },
    { name: 'Expense', value: expense || 0.0001, color: 'var(--c-slate-800)' },
    { name: 'Savings', value: Math.max(balance, 0) || 0.0001, color: 'var(--db-green-150)' },
  ];

  const rows = [
    { label: 'Income', value: income, color: 'var(--db-green-500)', up: true },
    { label: 'Expense', value: expense, color: 'var(--c-slate-800)', up: false },
    { label: 'Savings', value: Math.max(balance, 0), color: 'var(--db-green-150)', up: balance >= 0 },
  ];

  return (
    <div className="card db-panel">
      <div className="chart-head">
        <h3 className="chart-title">Report Overview</h3>
      </div>
      <div className="report-overview">
        <div className="report-overview__chart">
          <ResponsiveContainer width="100%" height={170}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={78}
                paddingAngle={3}
                startAngle={90}
                endAngle={-270}
                stroke="none"
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="report-overview__total">
            <span>Rs {total.toLocaleString()}</span>
            <small>Total flow</small>
          </div>
        </div>
        <div className="report-overview__legend">
          {rows.map((row) => (
            <div key={row.label} className="report-overview__row">
              <span className="report-overview__dot" style={{ background: row.color }} />
              <span className="report-overview__row-label">{row.label}</span>
              <span className="report-overview__row-value">Rs {row.value.toLocaleString()}</span>
              {row.up ? (
                <ArrowUpRight size={14} className="report-overview__up" />
              ) : (
                <ArrowDownRight size={14} className="report-overview__down" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportOverviewChart;
