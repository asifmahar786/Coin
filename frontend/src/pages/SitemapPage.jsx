import { Link } from 'react-router-dom';
import {
  Wallet,
  Home,
  Info,
  LogIn,
  UserPlus,
  LayoutDashboard,
  Receipt,
  Target,
  FileBarChart,
  Shield,
  UserRound,
  ArrowDownCircle,
  ArrowUpCircle,
  Folder,
  FolderOpen,
  Lock,
  KeyRound,
  LockKeyhole,
} from 'lucide-react';
import useAuth from '../hooks/useAuth';
import '../styles/landing.css';

const SITE_TREE = {
  name: 'campuscoin',
  path: '/',
  icon: FolderOpen,
  desc: 'CampusCoin web application',
  children: [
    {
      name: 'public',
      icon: Folder,
      access: 'public',
      desc: 'Open to everyone',
      children: [
        { to: '/', name: 'home', label: 'Home', icon: Home, desc: 'Landing page with features, showcase and pricing.' },
        { to: '/about', name: 'about', label: 'About', icon: Info, desc: 'Our story, values and the team behind CampusCoin.' },
        {
          to: '/login',
          name: 'login',
          label: 'Log in',
          icon: LogIn,
          desc: 'Sign in to an existing account.',
          children: [
            { to: '/forgot-password', name: 'forgot-password', label: 'Forgot password', icon: KeyRound, desc: 'Request a password reset link by email.' },
            { to: '/reset-password/:token', name: 'reset-password', label: 'Reset password', icon: LockKeyhole, desc: 'Choose a new password (opened from the emailed link).' },
          ],
        },
        { to: '/register', name: 'register', label: 'Sign up', icon: UserPlus, desc: 'Create a new CampusCoin account.' },
      ],
    },
    {
      name: 'app',
      icon: Folder,
      access: 'user',
      desc: 'Student area — sign-in required',
      children: [
        { to: '/dashboard', name: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, desc: 'Monthly overview, charts, recent activity and smart tips.' },
        {
          to: '/transactions',
          name: 'transactions',
          label: 'Transactions',
          icon: Receipt,
          desc: 'Add, edit, filter and import income & expenses.',
          children: [
            { to: '/transactions?type=income', name: 'add-income', label: 'Add income', icon: ArrowDownCircle, desc: 'Opens the form ready for an income entry.' },
            { to: '/transactions?type=expense', name: 'add-expense', label: 'Add expense', icon: ArrowUpCircle, desc: 'Opens the form ready for an expense entry.' },
          ],
        },
        { to: '/budget', name: 'budget', label: 'Budget', icon: Target, desc: 'Set and track monthly category budgets.' },
        { to: '/reports', name: 'reports', label: 'Reports', icon: FileBarChart, desc: 'Category and income-vs-expense reports, PDF export.' },
        { to: '/profile', name: 'profile', label: 'My profile', icon: UserRound, desc: 'Update your details, savings goal and password.' },
      ],
    },
    {
      name: 'admin',
      icon: Folder,
      access: 'admin',
      desc: 'Administrators only',
      children: [
        { to: '/admin', name: 'admin-dashboard', label: 'Admin dashboard', icon: Shield, desc: 'Users, categories and platform usage statistics.' },
      ],
    },
  ],
};

const ACCESS_BADGE = {
  public: { text: 'Public', cls: 'sitetree__badge--public' },
  user: { text: 'Sign-in required', cls: 'sitetree__badge--user' },
  admin: { text: 'Admin only', cls: 'sitetree__badge--admin' },
};

const TreeNode = ({ node, isRoot = false }) => {
  const Icon = node.icon;
  const badge = node.access ? ACCESS_BADGE[node.access] : null;

  const inner = (
    <>
      <span className="sitetree__icon">
        <Icon size={16} />
      </span>
      <span className="sitetree__body">
        <span className="sitetree__line">
          <span className="sitetree__name">{node.label || node.name}</span>
          {node.path || node.to ? <code className="sitetree__path">{node.path || node.to}</code> : null}
          {badge && (
            <span className={`sitetree__badge ${badge.cls}`}>
              {node.access === 'user' && <Lock size={10} />} {badge.text}
            </span>
          )}
        </span>
        <span className="sitetree__desc">{node.desc}</span>
      </span>
    </>
  );

  return (
    <li className={`sitetree__item${isRoot ? ' sitetree__item--root' : ''}`}>
      {node.to && !node.to.includes(':') ? (
        <Link to={node.to} state={{ from: node.to }} className="sitetree__node sitetree__node--page">
          {inner}
        </Link>
      ) : (
        <div className={`sitetree__node ${node.to ? 'sitetree__node--static' : 'sitetree__node--folder'}${isRoot ? ' is-root' : ''}`}>{inner}</div>
      )}
      {node.children && (
        <ul className="sitetree__list">
          {node.children.map((child) => (
            <TreeNode key={child.name} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

const SitemapPage = () => {
  const { user } = useAuth();

  return (
    <div className="landing">
      <nav className="landing-nav">
        <div className="landing-nav__inner">
          <Link to="/" className="landing-nav__brand">
            <span className="landing-nav__brand-dot" />
            CampusCoin
          </Link>
          <div className="landing-nav__actions">
            {user ? (
              <Link to="/dashboard" className="landing-btn landing-btn--accent">
                Go to dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="landing-btn landing-btn--ghost">
                  Log in
                </Link>
                <Link to="/register" className="landing-btn landing-btn--accent">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <header className="about-hero" style={{ padding: '56px 0' }}>
        <div className="landing__container">
          <span className="landing-hero__eyebrow">
            <Wallet size={14} /> Sitemap
          </span>
          <h1 className="about-hero__title" style={{ fontSize: 36 }}>
            Every page, <span>one place</span>
          </h1>
          <p className="about-hero__subtitle">
            The whole of CampusCoin laid out as a tree — click any page to jump straight to it.
          </p>
        </div>
      </header>

      <section className="landing-section" style={{ paddingTop: 48 }}>
        <div className="landing__container">
          <div className="sitetree">
            <ul className="sitetree__root">
              <TreeNode node={SITE_TREE} isRoot />
            </ul>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="landing__container">
          <div className="footer-bottom" style={{ borderTop: 'none', paddingTop: 0 }}>
            <span>© {new Date().getFullYear()} CampusCoin. All rights reserved.</span>
            <Link to="/" style={{ color: 'var(--lg-muted)' }}>Back to home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SitemapPage;
