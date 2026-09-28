import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import api from '../../api/axios';

const CategoryManager = ({ categories, onChanged }) => {
  const [form, setForm] = useState({ name: '', type: 'expense' });
  const defaults = categories.filter((c) => c.isDefault);

  const handleAdd = async (e) => {
    e.preventDefault();
    await api.post('/admin/categories', form);
    setForm({ name: '', type: 'expense' });
    onChanged();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this default category for everyone?')) return;
    await api.delete(`/admin/categories/${id}`);
    onChanged();
  };

  return (
    <div className="card">
      <h3 className="cm-title">Default categories</h3>

      <form onSubmit={handleAdd} className="cm-form">
        <input
          required
          className="input-field"
          placeholder="Category name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <select
          className="input-field cm-type-select"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <button type="submit" className="btn-primary cm-add-btn">Add</button>
      </form>

      <ul className="cm-list">
        {defaults.map((c) => (
          <li key={c._id} className="cm-list-item">
            <span className={c.type === 'income' ? 'badge-income' : 'badge-expense'}>{c.name}</span>
            <button onClick={() => handleDelete(c._id)} className="cc-icon-btn cm-delete-btn">
              <Trash2 size={14} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManager;
