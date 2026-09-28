import { useState } from 'react';
import api from '../../api/axios';

const BudgetForm = ({ categories, onSaved }) => {
  const [form, setForm] = useState({ category: '', limitAmount: '' });
  const [saving, setSaving] = useState(false);

  const expenseCategories = categories.filter((c) => c.type === 'expense');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const month = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();
      await api.post('/budgets', { ...form, month });
      setForm({ category: '', limitAmount: '' });
      onSaved();
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card bf-form">
      <h3 className="bf-title">Set a budget goal</h3>
      <div>
        <label className="label">Category</label>
        <select
          required
          className="input-field"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="">Select a category</option>
          {expenseCategories.map((c) => (
            <option key={c._id} value={c._id}>{c.icon} {c.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="label">Monthly limit (Rs)</label>
        <input
          type="number"
          min="0"
          required
          className="input-field"
          value={form.limitAmount}
          onChange={(e) => setForm({ ...form, limitAmount: e.target.value })}
        />
      </div>
      <button type="submit" disabled={saving} className="btn-primary bf-submit">
        {saving ? 'Saving...' : 'Set budget'}
      </button>
    </form>
  );
};

export default BudgetForm;
