import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import PasswordInput from '../components/common/PasswordInput';

const YEAR_OPTIONS = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate'];

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', academicYear: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create account. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-side">
        <div className="auth-side__brand">
          CampusCoin
        </div>

        <div>
          <h1 className="auth-side__title">
            Join thousands of<br />students budgeting smarter.
          </h1>
          <p className="auth-side__text">
            One free account gets you spending insights, budgets, and savings goals built around campus life.
          </p>

          <div className="auth-side__points">
            <p>Smart categorisation as you add expenses</p>
            <p>Set a monthly savings goal and track it</p>
            <p>Your data stays private and yours alone</p>
          </div>
        </div>

        <p className="auth-side__footnote">Takes under a minute to set up.</p>
      </div>

      <div className="auth-form-wrap">
        <div className="auth-form-card">
          <div className="auth-mobile-brand">
            <span>CampusCoin</span>
          </div>

          <h1 className="auth-title">Create your account</h1>
          <p className="auth-subtitle">
            Start tracking your money in under a minute.
          </p>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div>
              <label className="label" htmlFor="name">Full name</label>
              <input
                id="name"
                required
                className="input-field"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ali Khan"
              />
            </div>
            <div>
              <label className="label" htmlFor="email">Student email</label>
              <input
                id="email"
                type="email"
                required
                className="input-field"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@campus.edu"
              />
            </div>
            <div>
              <label className="label" htmlFor="academicYear">Academic year</label>
              <select
                id="academicYear"
                className="input-field"
                value={form.academicYear}
                onChange={(e) => setForm({ ...form, academicYear: e.target.value })}
              >
                <option value="">Select year (optional)</option>
                {YEAR_OPTIONS.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label" htmlFor="password">Password</label>
              <PasswordInput
                id="password"
                minLength={6}
                autoComplete="new-password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="At least 6 characters"
              />
            </div>
            <button type="submit" disabled={submitting} className="btn-primary auth-submit">
              {submitting ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p className="auth-footer-text">
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
