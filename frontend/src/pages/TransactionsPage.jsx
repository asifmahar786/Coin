import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import Layout from '../components/common/Layout';
import Breadcrumbs from '../components/common/Breadcrumbs';
import Loader from '../components/common/Loader';
import Toast from '../components/common/Toast';
import TransactionForm from '../components/transactions/TransactionForm';
import TransactionList from '../components/transactions/TransactionList';
import TransactionSummary from '../components/transactions/TransactionSummary';
import CSVImport from '../components/transactions/CSVImport';

const TransactionsPage = () => {
  const [searchParams] = useSearchParams();
  const [transactions, setTransactions] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState(null);

  const loadData = async () => {
    setLoading(true);
    const [txRes, catRes] = await Promise.all([
      api.get('/transactions'),
      api.get('/categories'),
    ]);
    setTransactions(txRes.data.data);
    setTotalCount(txRes.data.total ?? txRes.data.data.length);
    setCategories(catRes.data.data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaved = () => {
    setEditing(null);
    setToast({ message: 'Transaction saved', type: 'success' });
    loadData();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this transaction?')) return;
    await api.delete(`/transactions/${id}`);
    setToast({ message: 'Transaction deleted', type: 'info' });
    loadData();
  };

  if (loading) return <Layout><Loader /></Layout>;

  return (
    <Layout>
      <Breadcrumbs items={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Transactions' }]} />
      <h1 className="page-title">Transactions</h1>

      <TransactionSummary transactions={transactions} totalCount={totalCount} />

      <div className="grid-3-1-2">
        <div className="grid-3-1-2__side">
          <TransactionForm
            categories={categories}
            initialType={searchParams.get('type') || 'expense'}
            editingTransaction={editing}
            onCancelEdit={() => setEditing(null)}
            onSaved={handleSaved}
          />
          <CSVImport categories={categories} onImported={loadData} />
        </div>

        <div>
          <TransactionList
            transactions={transactions}
            onEdit={setEditing}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </Layout>
  );
};

export default TransactionsPage;
