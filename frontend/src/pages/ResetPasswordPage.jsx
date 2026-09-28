import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import AuthShell from '../components/common/AuthShell';
import PasswordInput from '../components/common/PasswordInput';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: '', confirm: '' });
  const [error, setError] = useState('');
  const [linkExpired, setLinkExpired] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('The two passwords do not match.');
      return;
    }

    setSubmitting(true);
    try {
      await api.post(`/auth/reset-password/${token}`, { password: form.password });
      navigate('/login', {
        replace: true,
        state: { notice: 'Password updated. Log in with your new password.' },
      });
    } catch (err) {
      const msg = err.response?.data?.message || 'Could not reset your password. Please try again.';
      setError(msg);
      if (/invalid|expired/i.test(msg)) setLinkExpired(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell
      sideTitle={<>Choose a new<br />password.</>}
      sideText="Pick something you haven't used before. You'll be able to log in with it straight away."
      points={['At least 6 characters', 'Use the eye icon to double-check what you typed']}
      footnote="Made for students, by students."
    >
      <h1 className="auth-title">Set a new password</h1>
      <p className="auth-subtitle">Enter your new password below.</p>

      {error && <div className="auth-error">{error}</div>}

      {linkExpired ? (
        <p className="auth-footer-text">
          <Link to="/forgot-password" className="auth-link">Request a new reset link</Link>
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="auth-form">
          <div>
            <label className="label" htmlFor="rp-password">New password</label>
            <PasswordInput
              id="rp-password"
              minLength={6}
              autoComplete="new-password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="At least 6 characters"
            />
          </div>
          <div>
            <label className="label" htmlFor="rp-confirm">Confirm new password</label>
            <PasswordInput
              id="rp-confirm"
              minLength={6}
              autoComplete="new-password"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              placeholder="Type it again"
            />
          </div>
          <button type="submit" disabled={submitting} className="btn-primary auth-submit">
            {submitting ? 'Updating...' : 'Update password'}
          </button>
        </form>
      )}

      <p className="auth-footer-text">
        <Link to="/login" className="auth-link">Back to log in</Link>
      </p>
    </AuthShell>
  );
};

export default ResetPasswordPage;
