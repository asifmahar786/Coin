import { Users, UserCheck, Receipt, Tags } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, tint }) => (
  <div className="card us-card">
    <div className={`us-card-icon ${tint}`}>
      <Icon size={18} />
    </div>
    <div>
      <p className="us-card-label">{label}</p>
      <p className="us-card-value">{value}</p>
    </div>
  </div>
);

const UsageStats = ({ stats }) => (
  <div className="us-grid">
    <StatCard icon={Users} label="Total students" value={stats?.users?.total ?? 0} tint="us-card-icon--primary" />
    <StatCard icon={UserCheck} label="Active students" value={stats?.users?.active ?? 0} tint="us-card-icon--success" />
    <StatCard icon={Receipt} label="Total transactions" value={stats?.transactions?.total ?? 0} tint="us-card-icon--warning" />
    <StatCard icon={Tags} label="Categories" value={stats?.defaultCategories ?? 0} tint="us-card-icon--smart" />
  </div>
);

export default UsageStats;
