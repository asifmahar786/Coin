import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MailCheck, ArrowLeft } from 'lucide-react';
import api from '../api/axios';
import AuthShell from '../components/common/AuthShell';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const { data } = await api.post('/auth/forgot-password', { email });
      setResult({ emailSent: data.emailSent, devResetToken: data.devResetToken });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell
      sideTitle={<>Locked out?<br />We'll get you back in.</>}
      sideText="Enter the email you signed up with and we'll send you a link to choose a new password."
      points={['The reset link is valid for 30 minutes', 'Your budgets and transactions stay untouched']}
      footnote="Made for students, by students."
    >
      {result ? (
        <div className="auth-success">
          <span className="auth-success__icon"><MailCheck size={26} /></span>
          <h1 className="auth-title">Check your inbox</h1>
          <p className="auth-subtitle">
            If an account exists for <strong>{email}</strong>, a password reset link is on its way.
            It expires in 30 minutes.
          </p>

          {result.devResetToken && (
            <div className="auth-devbox">
              <p className="auth-devbox__title">Demo mode: email isn't configured on the server</p>
              <p className="auth-devbox__text">
                Use this link to reset the password right now instead.
              </p>
              <Link to={`/reset-password/${result.devResetToken}`} className="btn-primary auth-devbox__btn">
                Reset password now
              </Link>
            </div>
          )}

          <p className="auth-footer-text">
            <Link to="/login" className="auth-link">Back to log in</Link>
          </p>
        </div>
      ) : (
        <>
          <h1 className="auth-title">Forgot your password?</h1>
          <p className="auth-subtitle">
            No problem — tell us your email and we'll send you a reset link.
          </p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div>
              <label className="label" htmlFor="fp-email">Student email</label>
              <input
                id="fp-email"
                type="email"
                required
                autoFocus
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@campus.edu"
              />
            </div>
            <button type="submit" disabled={submitting} className="btn-primary auth-submit">
              {submitting ? 'Sending...' : 'Send reset link'}
            </button>
          </form>

          <p className="auth-footer-text">
            <Link to="/login" className="auth-link auth-link--back">
              <ArrowLeft size={14} /> Back to log in
            </Link>
          </p>
        </>
      )}
    </AuthShell>
  );
};

export default ForgotPasswordPage;
