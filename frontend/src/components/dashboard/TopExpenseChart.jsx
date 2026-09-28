import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      Rs {payload[0].value.toLocaleString()}
    </div>
  );
};

const TopExpenseChart = ({ data }) => {
  const top5 = [...(data || [])].sort((a, b) => b.total - a.total).slice(0, 5);

  if (top5.length === 0) {
    return (
      <div className="card db-panel">
        <div className="chart-head">
          <h3 className="chart-title">Top Expense Categories</h3>
        </div>
        <p className="chart-empty-text">No expenses to show yet.</p>
      </div>
    );
  }

  const maxIndex = top5.reduce((best, cur, i, arr) => (cur.total > arr[best].total ? i : best), 0);

  return (
    <div className="card db-panel">
      <div className="chart-head">
        <h3 className="chart-title">Top Expense Categories</h3>
        <span className="chart-pill chart-pill--green">This month</span>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={top5} margin={{ top: 28, right: 8, left: 0, bottom: 0 }} barCategoryGap="30%">
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: 'var(--c-slate-400)' }}
            axisLine={false}
            tickLine={false}
            interval={0}
          />
          <YAxis hide />
          <Tooltip cursor={{ fill: 'var(--c-slate-50)' }} content={<CustomTooltip />} />
          <Bar dataKey="total" radius={[8, 8, 8, 8]} maxBarSize={38}>
            {top5.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={index === maxIndex ? 'var(--db-green-600)' : 'var(--db-green-150)'}
              />
            ))}
            <LabelList
              dataKey="total"
              position="top"
              content={({ x, y, width, value, index }) =>
                index === maxIndex ? (
                  <g>
                    <rect x={x + width / 2 - 26} y={y - 26} width={52} height={20} rx={6} fill="var(--c-slate-800)" />
                    <text x={x + width / 2} y={y - 12} textAnchor="middle" fontSize="11" fill="#fff" fontWeight="600">
                      Rs {value.toLocaleString()}
                    </text>
                  </g>
                ) : null
              }
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopExpenseChart;
