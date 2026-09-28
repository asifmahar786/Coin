import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import {
  Wallet,
  LayoutDashboard,
  Receipt,
  Target,
  FileBarChart,
  Shield,
  LogOut,
  Map,
  Home,
  Info,
  UserRound,
} from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const baseNavItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/transactions', label: 'Transactions', icon: Receipt },
  { to: '/budget', label: 'Budget', icon: Target },
  { to: '/reports', label: 'Reports', icon: FileBarChart },
];

const railLinkClass = ({ isActive }) => `nav-rail__link${isActive ? ' is-active' : ''}`;
const tabLinkClass = ({ isActive }) => `nav-tabbar__link${isActive ? ' is-active' : ''}`;

const Navbar = ({ expanded = false, onToggle = () => {} }) => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const items = user?.role === 'admin'
    ? [...baseNavItems, { to: '/admin', label: 'Admin', icon: Shield }]
    : baseNavItems;

  const railItems = [...items, { to: '/profile', label: 'Profile', icon: UserRound }];

  const sitemapPages = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/transactions', label: 'Transactions', icon: Receipt },
    { to: '/budget', label: 'Budget', icon: Target },
    { to: '/reports', label: 'Reports', icon: FileBarChart },
    { to: '/profile', label: 'My profile', icon: UserRound },
    ...(user?.role === 'admin' ? [{ to: '/admin', label: 'Admin', icon: Shield }] : []),
    { to: '/', label: 'Home', icon: Home },
    { to: '/about', label: 'About', icon: Info },
  ];

  const initials = user?.name
    ? user.name.trim().split(/\s+/).map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : '?';


  return (
    <>
      <aside className={`nav-rail${expanded ? ' is-expanded' : ''}`}>
        <button
          type="button"
          className="nav-rail__logo"
          onClick={onToggle}
          aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
          aria-expanded={expanded}
        >
          <Wallet size={20} />
          {expanded && <span className="nav-rail__logo-text">CampusCoin</span>}
        </button>

        <nav className="nav-rail__links">
          {railItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={railLinkClass}
              aria-label={label}
            >
              <Icon size={19} />
              {expanded ? (
                <span className="nav-rail__label">{label}</span>
              ) : (
                <span className="nav-rail__tooltip">{label}</span>
              )}
            </NavLink>
          ))}

          <div className="nav-rail__sitemap">
            <NavLink
              to="/sitemap"
              className={railLinkClass}
              aria-label="Sitemap"
            >
              <Map size={19} />
              {expanded ? (
                <span className="nav-rail__label">Sitemap</span>
              ) : (
                <span className="nav-rail__tooltip">Sitemap</span>
              )}
            </NavLink>
            <div className="nav-rail__sitemap-flyout" role="menu">
              <p className="nav-rail__sitemap-flyout-title">Pages</p>
              {sitemapPages.map(({ to, label, icon: Icon }) => (
                <Link key={to} to={to} className="nav-rail__sitemap-flyout-link">
                  <Icon size={14} />
                  {label}
                </Link>
              ))}
              <Link to="/sitemap" className="nav-rail__sitemap-flyout-all">
                View full sitemap →
              </Link>
            </div>
          </div>
        </nav>

        <div
          className="nav-rail__account"
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
        >
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-haspopup="true"
            aria-expanded={menuOpen}
            aria-label="Account menu"
            className="nav-rail__avatar-btn"
          >
            {initials}
          </button>
          {expanded && <span className="nav-rail__label nav-rail__label--account">{user?.name}</span>}

          <div
            role="menu"
            className={`nav-rail__menu${menuOpen ? ' is-open' : ''}`}
          >
            <div className="nav-menu__info">
              <p className="nav-menu__name">{user?.name}</p>
              <p className="nav-menu__email">{user?.email}</p>
            </div>
            <div className="nav-menu__divider" />
            <Link to="/profile" role="menuitem" className="nav-menu__profile" onClick={() => setMenuOpen(false)}>
              <UserRound size={15} /> My profile
            </Link>
            <button
              onClick={logout}
              role="menuitem"
              className="nav-menu__logout"
            >
              <LogOut size={15} /> Log out
            </button>
          </div>
        </div>
      </aside>
      <header className="nav-topbar">
        <div className="nav-topbar__brand">
          <Wallet size={20} />
          CampusCoin
        </div>
      </header>
      <nav className="nav-tabbar">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={tabLinkClass}>
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
        <div className="nav-tabbar__account">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-haspopup="true"
            aria-expanded={menuOpen}
            aria-label="Account menu"
            className="nav-tabbar__avatar-btn"
          >
            {initials}
          </button>

          <div
            role="menu"
            className={`nav-tabbar__menu${menuOpen ? ' is-open' : ''}`}
          >
            <p className="nav-tabbar__name">{user?.name}</p>
            <Link to="/profile" role="menuitem" className="nav-menu__sitemap-link" onClick={() => setMenuOpen(false)}>
              <UserRound size={14} /> My profile
            </Link>
            <Link to="/sitemap" role="menuitem" className="nav-menu__sitemap-link" onClick={() => setMenuOpen(false)}>
              <Map size={14} /> Sitemap
            </Link>
            <button
              onClick={logout}
              role="menuitem"
              className="nav-tabbar__logout"
            >
              <LogOut size={14} /> Log out
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
