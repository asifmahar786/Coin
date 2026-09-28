import { useState } from 'react';
import api from '../api/axios';
import useAuth from '../hooks/useAuth';
import Layout from '../components/common/Layout';
import Breadcrumbs from '../components/common/Breadcrumbs';
import Toast from '../components/common/Toast';
import PasswordInput from '../components/common/PasswordInput';

const YEAR_OPTIONS = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate'];

const initialsOf = (name) =>
  name
    ? name.trim().split(/\s+/).map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : '?';

const ProfilePage = () => {
  const { user, setUser } = useAuth();

  const [profile, setProfile] = useState({
    name: user?.name || '',
    academicYear: user?.academicYear || '',
    monthlyAllowanceBaseline: user?.monthlyAllowanceBaseline ?? 0,
    monthlySavingsGoal: user?.monthlySavingsGoal ?? 0,
  });
  const [profileError, setProfileError] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);

  const [pw, setPw] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [pwError, setPwError] = useState('');
  const [savingPw, setSavingPw] = useState(false);

  const [toast, setToast] = useState(null);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileError('');
    if (!profile.name.trim()) {
      setProfileError('Name cannot be empty.');
      return;
    }
    setSavingProfile(true);
    try {
      const { data } = await api.put('/users/profile', {
        name: profile.name.trim(),
        academicYear: profile.academicYear,
        monthlyAllowanceBaseline: Number(profile.monthlyAllowanceBaseline) || 0,
        monthlySavingsGoal: Number(profile.monthlySavingsGoal) || 0,
      });
      setUser({ ...user, ...data.data });
      setToast({ message: 'Profile updated', type: 'success' });
    } catch (err) {
      setProfileError(err.response?.data?.message || 'Could not update your profile. Try again.');
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPwError('');
    if (pw.newPassword.length < 6) {
      setPwError('New password must be at least 6 characters.');
      return;
    }
    if (pw.newPassword !== pw.confirmPassword) {
      setPwError('New password and confirmation do not match.');
      return;
    }
    setSavingPw(true);
    try {
      await api.put('/users/change-password', {
        currentPassword: pw.currentPassword,
        newPassword: pw.newPassword,
      });
      setPw({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setToast({ message: 'Password changed', type: 'success' });
    } catch (err) {
      setPwError(err.response?.data?.message || 'Could not change your password. Try again.');
    } finally {
      setSavingPw(false);
    }
  };

  return (
    <Layout>
      <Breadcrumbs items={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'My profile' }]} />
      <h1 className="page-title">My profile</h1>

      <div className="profile-grid">
        <form className="card profile-card" onSubmit={handleProfileSubmit}>
          <div className="profile-head">
            <span className="profile-avatar">{initialsOf(profile.name || user?.name)}</span>
            <div>
              <p className="profile-head__name">{user?.name}</p>
              <p className="profile-head__email">{user?.email}</p>
            </div>
          </div>

          <h2 className="profile-card__title">Personal details</h2>

          {profileError && <div className="auth-error">{profileError}</div>}

          <div className="profile-fields">
            <div className="profile-fields__full">
              <label className="label" htmlFor="profile-name">Full name</label>
              <input
                id="profile-name"
                className="input-field"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                required
              />
            </div>

            <div className="profile-fields__full">
              <label className="label" htmlFor="profile-email">Email</label>
              <input
                id="profile-email"
                className="input-field"
                value={user?.email || ''}
                disabled
                readOnly
              />
              <p className="profile-hint">Your email is your login and can't be changed here.</p>
            </div>

            <div>
              <label className="label" htmlFor="profile-year">Academic year</label>
              <select
                id="profile-year"
                className="input-field"
                value={profile.academicYear}
                onChange={(e) => setProfile({ ...profile, academicYear: e.target.value })}
              >
                <option value="">Not set</option>
                {YEAR_OPTIONS.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label" htmlFor="profile-allowance">Monthly allowance (Rs)</label>
              <input
                id="profile-allowance"
                type="number"
                min="0"
                className="input-field"
                value={profile.monthlyAllowanceBaseline}
                onChange={(e) => setProfile({ ...profile, monthlyAllowanceBaseline: e.target.value })}
              />
            </div>

            <div>
              <label className="label" htmlFor="profile-goal">Monthly savings goal (Rs)</label>
              <input
                id="profile-goal"
                type="number"
                min="0"
                className="input-field"
                value={profile.monthlySavingsGoal}
                onChange={(e) => setProfile({ ...profile, monthlySavingsGoal: e.target.value })}
              />
            </div>
          </div>

          <div className="profile-actions">
            <button type="submit" className="btn-primary" disabled={savingProfile}>
              {savingProfile ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </form>

        <form className="card profile-card" onSubmit={handlePasswordSubmit}>
          <h2 className="profile-card__title">Change password</h2>
          <p className="profile-hint profile-hint--top">
            Use at least 6 characters. You'll stay signed in after changing it.
          </p>

          {pwError && <div className="auth-error">{pwError}</div>}

          <div className="profile-fields profile-fields--stack">
            <div>
              <label className="label" htmlFor="pw-current">Current password</label>
              <PasswordInput
                id="pw-current"
                autoComplete="current-password"
                value={pw.currentPassword}
                onChange={(e) => setPw({ ...pw, currentPassword: e.target.value })}
              />
            </div>
            <div>
              <label className="label" htmlFor="pw-new">New password</label>
              <PasswordInput
                id="pw-new"
                minLength={6}
                autoComplete="new-password"
                value={pw.newPassword}
                onChange={(e) => setPw({ ...pw, newPassword: e.target.value })}
              />
            </div>
            <div>
              <label className="label" htmlFor="pw-confirm">Confirm new password</label>
              <PasswordInput
                id="pw-confirm"
                minLength={6}
                autoComplete="new-password"
                value={pw.confirmPassword}
                onChange={(e) => setPw({ ...pw, confirmPassword: e.target.value })}
              />
            </div>
          </div>

          <div className="profile-actions">
            <button type="submit" className="btn-primary" disabled={savingPw}>
              {savingPw ? 'Updating...' : 'Update password'}
            </button>
          </div>
        </form>
      </div>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </Layout>
  );
};

export default ProfilePage;
