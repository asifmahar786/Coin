import { useEffect, useState } from 'react';
import api from '../api/axios';
import Layout from '../components/common/Layout';
import Breadcrumbs from '../components/common/Breadcrumbs';
import Loader from '../components/common/Loader';
import ReportFilters from '../components/reports/ReportFilters';
import ReportTable from '../components/reports/ReportTable';

const firstOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  .toISOString()
  .slice(0, 10);
const today = new Date().toISOString().slice(0, 10);

const ReportsPage = () => {
  const [filters, setFilters] = useState({ startDate: firstOfMonth, endDate: today, type: '' });
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateError, setDateError] = useState('');

  const loadReport = async () => {
    if (new Date(filters.startDate) > new Date(filters.endDate)) {
      setDateError('"From" date cannot be after "To" date.');
      setRows([]);
      setLoading(false);
      return;
    }
    setDateError('');
    setLoading(true);
    const { data } = await api.get('/reports/category', { params: filters });
    setRows(data.data);
    setLoading(false);
  };

  useEffect(() => {
    loadReport();
  }, [filters.startDate, filters.endDate, filters.type]);

  const handleExport = async () => {
    if (new Date(filters.startDate) > new Date(filters.endDate)) {
      setDateError('"From" date cannot be after "To" date.');
      return;
    }
    const response = await api.get('/reports/export', {
      params: { startDate: filters.startDate, endDate: filters.endDate },
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'campuscoin-report.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <Layout>
      <Breadcrumbs items={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Reports' }]} />
      <h1 className="page-title">Reports</h1>

      <div className="page-stack-sm">
        <ReportFilters filters={filters} setFilters={setFilters} onExport={handleExport} />
        {dateError && <p className="reports-error">{dateError}</p>}
        {!dateError && (loading ? <Loader /> : <ReportTable rows={rows} />)}
      </div>
    </Layout>
  );
};

export default ReportsPage;
