import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const formatPeriod = (period) => {
  if (!period) return '';
  const [y, m] = period.split('-');
  if (!m) return period;
  const d = new Date(Number(y), Number(m) - 1, 1);
  return d.toLocaleDateString('en-US', { month: 'short' });
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip__label">{formatPeriod(label)}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.dataKey === 'expense' ? 'Expense' : 'Income'}: Rs {p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

const ExpenseActivityChart = ({ data }) => {
  const sorted = [...(data || [])].sort((a, b) => (a.period > b.period ? 1 : -1));

  return (
    <div className="card db-panel">
      <div className="chart-head">
        <h3 className="chart-title">Expense Activity</h3>
        <span className="chart-legend-pill">
          <span className="chart-legend-dot" /> Actual expense
        </span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={sorted} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--db-green-500)" stopOpacity={0.28} />
              <stop offset="100%" stopColor="var(--db-green-500)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="var(--c-slate-100)" />
          <XAxis
            dataKey="period"
            tickFormatter={formatPeriod}
            tick={{ fontSize: 12, fill: 'var(--c-slate-400)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="expense"
            stroke="var(--db-green-500)"
            strokeWidth={2.5}
            fill="url(#expenseFill)"
            dot={{ r: 4, fill: '#fff', stroke: 'var(--db-green-500)', strokeWidth: 2 }}
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseActivityChart;
