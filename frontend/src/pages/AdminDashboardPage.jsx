import { useEffect, useState } from 'react';
import api from '../api/axios';
import Layout from '../components/common/Layout';
import Breadcrumbs from '../components/common/Breadcrumbs';
import Loader from '../components/common/Loader';
import UsageStats from '../components/admin/UsageStats';
import UserManager from '../components/admin/UserManager';
import CategoryManager from '../components/admin/CategoryManager';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const [statsRes, usersRes, catRes] = await Promise.all([
      api.get('/admin/stats'),
      api.get('/admin/users'),
      api.get('/categories'),
    ]);
    setStats(statsRes.data.data);
    setUsers(usersRes.data.data);
    setCategories(catRes.data.data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <Layout><Loader /></Layout>;

  return (
    <Layout>
      <Breadcrumbs items={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Admin' }]} />
      <h1 className="page-title">Admin panel</h1>

      <div className="page-stack">
        <UsageStats stats={stats} />
        <UserManager users={users} onChanged={loadData} />
        <CategoryManager categories={categories} onChanged={loadData} />
      </div>
    </Layout>
  );
};

export default AdminDashboardPage;
