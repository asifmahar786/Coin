import { useState } from 'react';
import { Ban, CheckCircle, Trash2 } from 'lucide-react';
import api from '../../api/axios';

const UserManager = ({ users, onChanged }) => {
  const [search, setSearch] = useState('');

  const toggleStatus = async (id) => {
    await api.put(`/admin/users/${id}/disable`);
    onChanged();
  };

  const deleteUser = async (id) => {
    if (!confirm('Delete this student account? This cannot be undone.')) return;
    await api.delete(`/admin/users/${id}`);
    onChanged();
  };

  const filtered = users.filter(
    (u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card">
      <div className="um-header">
        <h3 className="um-title">Students</h3>
        <input
          className="input-field um-search"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="um-table-wrap">
        <table className="um-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u._id}>
                <td className="um-cell-name">{u.name}</td>
                <td className="um-cell-email">{u.email}</td>
                <td>
                  <span className={u.isActive ? 'badge-income' : 'badge-expense'}>
                    {u.isActive ? 'Active' : 'Disabled'}
                  </span>
                </td>
                <td className="um-cell-actions">
                  <button
                    onClick={() => toggleStatus(u._id)}
                    aria-label={u.isActive ? 'Disable user' : 'Enable user'}
                    className={`cc-icon-btn ${u.isActive ? 'um-btn-warning' : 'um-btn-success'}`}
                  >
                    {u.isActive ? <Ban size={15} /> : <CheckCircle size={15} />}
                  </button>
                  <button onClick={() => deleteUser(u._id)} aria-label="Delete user" className="cc-icon-btn um-btn-danger">
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManager;
