import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import useAuth from '../hooks/useAuth';
import Layout from '../components/common/Layout';
import Loader from '../components/common/Loader';
import StatCards from '../components/dashboard/StatCards';
import QuickAddButtons from '../components/dashboard/QuickAddButtons';
import SavingTipsWidget from '../components/dashboard/SavingTipsWidget';
import TopExpenseChart from '../components/dashboard/TopExpenseChart';
import ReportOverviewChart from '../components/dashboard/ReportOverviewChart';
import ExpenseActivityChart from '../components/dashboard/ExpenseActivityChart';
import RecentTransactions from '../components/dashboard/RecentTransactions';

const pctChange = (curr, prev) => {
  if (prev === undefined || prev === null || prev === 0) return null;
  return Math.round(((curr - prev) / Math.abs(prev)) * 100);
};

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({ income: 0, expense: 0, topCategory: null, byCategory: [] });
  const [trend, setTrend] = useState([]);
  const [insights, setInsights] = useState([]);
  const [recentTx, setRecentTx] = useState([]);

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const [categoryRes, trendRes, insightsRes, txRes] = await Promise.all([
        api.get('/reports/category', { params: { startDate: monthStart, endDate: monthEnd } }),
        api.get('/reports/income-vs-expense', { params: { groupBy: 'monthly', months: 6 } }),
        api.get('/insights'),
        api.get('/transactions', { params: { limit: 5 } }),
      ]);

      const rows = categoryRes.data.data;
      const income = rows.filter((r) => r.category.type === 'income').reduce((s, r) => s + r.total, 0);
      const expense = rows.filter((r) => r.category.type === 'expense').reduce((s, r) => s + r.total, 0);
      const expenseRows = rows
        .filter((r) => r.category.type === 'expense')
        .map((r) => ({ name: r.category.name, total: r.total, color: r.category.color }));
      const topCategory = expenseRows.length
        ? { ...expenseRows.sort((a, b) => b.total - a.total)[0] }
        : null;

      setSummary({ income, expense, topCategory, byCategory: expenseRows });

      const trendMap = {};
      trendRes.data.data.forEach((row) => {
        const period = row._id.period;
        trendMap[period] = trendMap[period] || { period, income: 0, expense: 0 };
        trendMap[period][row._id.type] = row.total;
      });
      setTrend(Object.values(trendMap).sort((a, b) => (a.period > b.period ? 1 : -1)));

      setInsights(insightsRes.data.data);
      setRecentTx(txRes.data.data);
    } catch (err) {
      console.error('Dashboard load failed', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handlePin = async (id) => {
    await api.put(`/insights/${id}/bookmark`);
    loadDashboard();
  };

  const handleDismiss = async (id) => {
    await api.put(`/insights/${id}/dismiss`);
    setInsights((prev) => prev.filter((i) => i._id !== id));
  };

  if (loading) return <Layout><Loader label="Loading your dashboard..." /></Layout>;

  const monthLabel = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const prev = trend.length >= 2 ? trend[trend.length - 2] : null;
  const balance = summary.income - summary.expense;
  const prevBalance = prev ? prev.income - prev.expense : null;

  return (
    <Layout>
      <div className="dash-header">
        <div>
          <h1 className="dash-greeting">Hi {user?.name?.split(' ')[0]} </h1>
          <p className="dash-subtext">
            Here's how your money looks in {monthLabel}.
          </p>
        </div>
        <QuickAddButtons
          onAddExpense={() => navigate('/transactions?type=expense')}
          onAddIncome={() => navigate('/transactions?type=income')}
        />
      </div>

      <StatCards
        income={summary.income}
        expense={summary.expense}
        balance={balance}
        incomeChange={pctChange(summary.income, prev?.income)}
        expenseChange={pctChange(summary.expense, prev?.expense)}
        balanceChange={pctChange(balance, prevBalance)}
      />

      <div className="db-grid-a">
        <TopExpenseChart data={summary.byCategory} />
        <RecentTransactions transactions={recentTx} />
      </div>

      <div className="db-grid-b">
        <ReportOverviewChart income={summary.income} expense={summary.expense} balance={balance} />
        <ExpenseActivityChart data={trend} />
      </div>

      <SavingTipsWidget insights={insights} onPin={handlePin} onDismiss={handleDismiss} />
    </Layout>
  );
};

export default DashboardPage;
