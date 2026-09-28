import { useEffect, useState } from 'react';
import api from '../api/axios';
import Layout from '../components/common/Layout';
import Breadcrumbs from '../components/common/Breadcrumbs';
import Loader from '../components/common/Loader';
import BudgetForm from '../components/budget/BudgetForm';
import BudgetProgressBar from '../components/budget/BudgetProgressBar';

const BudgetPage = () => {
  const [budgets, setBudgets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const [budgetRes, catRes] = await Promise.all([
      api.get('/budgets'),
      api.get('/categories'),
    ]);
    setBudgets(budgetRes.data.data);
    setCategories(catRes.data.data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <Layout><Loader /></Layout>;

  return (
    <Layout>
      <Breadcrumbs items={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Budget' }]} />
      <h1 className="page-title">Budget goals</h1>

      <div className="grid-3-1-2">
        <div>
          <BudgetForm categories={categories} onSaved={loadData} />
        </div>

        <div>
          <div className="card">
            <h3 className="budget-card-title">This month's progress</h3>
            {budgets.length === 0 ? (
              <p className="budget-empty-text">
                No budget goals set yet — add one to start tracking limits.
              </p>
            ) : (
              budgets.map((b) => <BudgetProgressBar key={b._id} budget={b} />)
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BudgetPage;
