import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Wallet } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import PasswordInput from '../components/common/PasswordInput';

const LoginPage = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || '/dashboard';
  const notice = location.state?.notice || '';
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(form.email, form.password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Could not log in. Check your details and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (user) return <Navigate to={redirectTo} replace />;

  return (
    <div className="auth-shell">
      <div className="auth-side">
        <div className="auth-side__brand">
          CampusCoin
        </div>

        <div>
          <h1 className="auth-side__title">
            Your allowance,<br />finally under control.
          </h1>
          <p className="auth-side__text">
            Built for student life — track pocket money, hostel bills, and everything in between without the spreadsheet headache.
          </p>

          <div className="auth-side__points">
            <p>Set savings goals for that trip or gadget</p>
            <p>Log food, transport and hostel spends in seconds</p>
            <p>See where your money actually goes each month</p>
          </div>
        </div>

        <p className="auth-side__footnote">Made for students, by students.</p>
      </div>

      <div className="auth-form-wrap">
        <div className="auth-form-card">
          <div className="auth-mobile-brand">
            <span>CampusCoin</span>
          </div>

          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">
            Log in to see your balance and this month's spending.
          </p>

          {notice && !error && <div className="auth-notice">{notice}</div>}

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div>
              <label className="label" htmlFor="email">Student email</label>
              <input
                id="email"
                type="email"
                required
                className="input-field"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="admin@gmail.com"
              />
            </div>
            <div>
              <div className="auth-field-row">
                <label className="label" htmlFor="password">Password</label>
                <Link to="/forgot-password" className="auth-link-sm">
                  Forgot password?
                </Link>
              </div>
              <PasswordInput
                id="password"
                autoComplete="current-password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
              />
            </div>
            <button type="submit" disabled={submitting} className="btn-primary auth-submit">
              {submitting ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <p className="auth-footer-text">
            New to campus banking?{' '}
            <Link to="/register" className="auth-link">
              Create your free account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
