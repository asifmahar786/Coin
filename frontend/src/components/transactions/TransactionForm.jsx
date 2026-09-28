import { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import api from '../../api/axios';

const TransactionForm = ({ categories, initialType = 'expense', onSaved, editingTransaction, onCancelEdit }) => {
  const [form, setForm] = useState({
    type: initialType,
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().slice(0, 10),
  });
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [saving, setSaving] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (editingTransaction) {
      setForm({
        type: editingTransaction.type,
        category: editingTransaction.category._id,
        amount: editingTransaction.amount,
        description: editingTransaction.description,
        date: editingTransaction.date.slice(0, 10),
      });
    }
  }, [editingTransaction]);

  const handleDescriptionChange = (value) => {
    setForm((f) => ({ ...f, description: value }));
    clearTimeout(debounceRef.current);
    if (!value || value.length < 3) {
      setAiSuggestion(null);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      try {
        const { data } = await api.post('/ai/categorize', { description: value });
        setAiSuggestion(data.data);
      } catch {
        setAiSuggestion(null);
      }
    }, 500);
  };

  const acceptSuggestion = () => {
    if (aiSuggestion) setForm((f) => ({ ...f, category: aiSuggestion._id }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingTransaction) {
        await api.put(`/transactions/${editingTransaction._id}`, form);
      } else {
        await api.post('/transactions', form);
      }
      setForm({ type: initialType, category: '', amount: '', description: '', date: new Date().toISOString().slice(0, 10) });
      setAiSuggestion(null);
      onSaved();
    } finally {
      setSaving(false);
    }
  };

  const filteredCategories = categories.filter((c) => c.type === form.type);

  return (
    <form onSubmit={handleSubmit} className="card tf-form">
      <h3 className="tf-title">
        {editingTransaction ? 'Edit transaction' : 'Add a transaction'}
      </h3>

      <div className="tf-type-toggle">
        {['expense', 'income'].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setForm((f) => ({ ...f, type: t, category: '' }))}
            className={`tf-type-btn ${
              form.type === t
                ? t === 'income'
                  ? 'tf-type-btn--income-active'
                  : 'tf-type-btn--expense-active'
                : ''
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div>
        <label className="label">Description</label>
        <input
          className="input-field"
          value={form.description}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          placeholder="e.g. Lunch at campus cafe"
        />
        {aiSuggestion && aiSuggestion._id !== form.category && (
          <button
            type="button"
            onClick={acceptSuggestion}
            className="tf-ai-suggestion badge-smart"
          >
            <Sparkles size={12} /> Looks like "{aiSuggestion.name}" — tap to use
          </button>
        )}
      </div>

      <div className="tf-grid-2">
        <div>
          <label className="label">Amount (Rs)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            required
            className="input-field"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Date</label>
          <input
            type="date"
            required
            className="input-field"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="label">Category</label>
        <select
          required
          className="input-field"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="">Select a category</option>
          {filteredCategories.map((c) => (
            <option key={c._id} value={c._id}>{c.icon} {c.name}</option>
          ))}
        </select>
      </div>

      <div className="tf-actions">
        <button type="submit" disabled={saving} className="btn-primary tf-submit">
          {saving ? 'Saving...' : editingTransaction ? 'Update' : 'Add transaction'}
        </button>
        {editingTransaction && (
          <button type="button" onClick={onCancelEdit} className="btn-secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TransactionForm;
