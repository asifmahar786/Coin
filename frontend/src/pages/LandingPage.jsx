import { useNavigate, Link } from 'react-router-dom';
import {
  Wallet,
  Target,
  FileBarChart,
  Sparkles,
  ShieldCheck,
  PiggyBank,
  TrendingUp,
  Menu,
  Check,
} from 'lucide-react';
import '../styles/landing.css';
const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Budgeting', href: '#showcase' },
  { label: 'Reports', href: '#showcase' },
  { label: 'Pricing', href: '#pricing' },
];
const NAV_ROUTE_LINKS = [{ label: 'About', to: '/about' }];
const FEATURES = [
  {
    icon: Wallet,
    title: 'Track Every Rupee',
    text: 'Log transactions in seconds and see exactly where your allowance, stipend or part-time income goes.',
  },
  {
    icon: Target,
    title: 'Smart Budgets',
    text: 'Set monthly budgets per category and get warned before you overspend on food, transport or fun.',
  },
  {
    icon: Sparkles,
    title: 'AI Insights',
    text: 'CampusCoin automatically categorizes spending and surfaces patterns you would otherwise miss.',
  },
  {
    icon: FileBarChart,
    title: 'Clean Reports',
    text: 'Exportable, visual reports that make sense of your semester spending in a single glance.',
  },
];
const SHOWCASE_POINTS = [
  'Automatic transaction categorization powered by AI',
  'Real-time budget alerts before you overspend',
  'Anomaly detection for unusual or duplicate charges',
  'One-tap PDF & CSV reports for the whole semester',
];
const STATS = [
  { num: '12K+', label: 'Students onboard' },
  { num: '₨48Cr+', label: 'Expenses tracked' },
  { num: '4.8/5', label: 'Average rating' },
  { num: '35+', label: 'Campuses' },
];
const LandingPage = () => {
  const navigate = useNavigate();
  const goToRegister = () => navigate('/register');
  return (
    <div className="landing">
      <nav className="landing-nav">
        <div className="landing-nav__inner">
          <Link to="/" className="landing-nav__brand">
            <span className="landing-nav__brand-dot" />
            CampusCoin
          </Link>
          <ul className="landing-nav__links">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
            {NAV_ROUTE_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
          <div className="landing-nav__actions">
            <Link to="/login" className="landing-btn landing-btn--ghost">
              Log in
            </Link>
            <button className="landing-btn landing-btn--accent" onClick={goToRegister}>
              Get Started
            </button>
          </div>
          <button className="landing-nav__toggle" aria-label="Menu">
            <Menu size={22} />
          </button>
        </div>
      </nav>
      <header className="landing-hero">
        <div className="landing__container landing-hero__inner">
          <div>
            <span className="landing-hero__eyebrow">
              <Sparkles size={14} /> Built for students
            </span>
            <h1 className="landing-hero__title">
              Take Control of <span>Your Campus Money</span>
            </h1>
            <p className="landing-hero__subtitle">
              Safe, simple, and smart expense tracking for students — budgets, AI insights
              and reports, all in one place.
            </p>
            <div className="landing-hero__actions">
              <button className="landing-btn landing-btn--accent" onClick={goToRegister}>
                Create free account
              </button>
              <a href="#features" className="landing-btn landing-btn--outline">
                Explore Features
              </a>
            </div>
            <div className="landing-hero__stats">
              <div>
                <div className="landing-hero__stat-num">12K+</div>
                <div className="landing-hero__stat-label">Students onboard</div>
              </div>
              <div>
                <div className="landing-hero__stat-num">35+</div>
                <div className="landing-hero__stat-label">Campuses</div>
              </div>
              <div>
                <div className="landing-hero__stat-num">4.8/5</div>
                <div className="landing-hero__stat-label">Average rating</div>
              </div>
            </div>
          </div>
          <div className="landing-hero__visual">
            <div className="landing-hero__blob" />
            <div className="floating-card floating-card--saved">
              <span className="floating-card__icon">
                <PiggyBank size={16} />
              </span>
              <div>
                <div className="floating-card__title">Saved this month</div>
                <div className="floating-card__value">₨6,200</div>
              </div>
            </div>
            <div className="phone-mock">
              <div className="phone-mock__header">
                <span className="phone-mock__title">Dashboard</span>
                <span className="phone-mock__avatar" />
              </div>
              <div className="phone-mock__balance-card">
                <div className="phone-mock__balance-label">Total Balance</div>
                <div className="phone-mock__balance-value">₨24,850</div>
              </div>
              <div className="phone-mock__bars">
                <span className="phone-mock__bar" style={{ height: '40%' }} />
                <span className="phone-mock__bar" style={{ height: '65%' }} />
                <span className="phone-mock__bar phone-mock__bar--active" style={{ height: '90%' }} />
                <span className="phone-mock__bar" style={{ height: '55%' }} />
                <span className="phone-mock__bar" style={{ height: '75%' }} />
                <span className="phone-mock__bar" style={{ height: '35%' }} />
              </div>
              <div className="phone-mock__row">
                <span className="phone-mock__row-label">Food & Dining</span>
                <span className="phone-mock__row-value">-₨1,200</span>
              </div>
              <div className="phone-mock__row">
                <span className="phone-mock__row-label">Transport</span>
                <span className="phone-mock__row-value">-₨480</span>
              </div>
            </div>
            <div className="floating-card floating-card--budget">
              <span className="floating-card__icon">
                <TrendingUp size={16} />
              </span>
              <div>
                <div className="floating-card__title">Budget on track</div>
                <div className="floating-card__value">72% used</div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="landing-logos">
        <div className="landing__container">
          <div className="landing-logos__label">Trusted by students across leading campuses</div>
          <div className="landing-logos__row">
            <span>NUST</span>
            <span>LUMS</span>
            <span>FAST</span>
            <span>IBA</span>
            <span>COMSATS</span>
          </div>
        </div>
      </section>
      <section className="landing-section" id="features">
        <div className="landing__container">
          <div className="landing-section__head--center">
            <div className="landing-section__eyebrow">Why CampusCoin</div>
            <h2 className="landing-section__heading">Everything you need to manage campus money</h2>
            <p className="landing-section__subheading">
              From daily spends to semester budgets, CampusCoin keeps your finances organized
              so you can focus on classes, not spreadsheets.
            </p>
          </div>
          <div className="feature-grid">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <div className="feature-card" key={title}>
                <div className="feature-card__icon">
                  <Icon size={22} />
                </div>
                <h3 className="feature-card__title">{title}</h3>
                <p className="feature-card__text">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="landing-section landing-showcase" id="showcase">
        <div className="landing__container showcase-grid">
          <div>
            <div className="landing-section__eyebrow" style={{ color: '#7fe0b0' }}>
              Smart Budgeting
            </div>
            <h2 className="landing-section__heading" style={{ color: '#fff' }}>
              Know where every rupee goes, automatically
            </h2>
            <ul className="showcase-list">
              {SHOWCASE_POINTS.map((point) => (
                <li key={point}>
                  <span className="showcase-list__check">
                    <Check size={13} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <button className="landing-btn landing-btn--accent" onClick={goToRegister}>
              Start budgeting free
            </button>
          </div>
          <div className="showcase-panel">
            <div className="showcase-panel__row">
              <div className="showcase-panel__cat">
                <span className="showcase-panel__dot" style={{ background: '#23c07d' }} />
                Food & Dining
              </div>
              <div className="showcase-panel__amount">₨4,500 / ₨6,000</div>
            </div>
            <div className="showcase-panel__row">
              <div className="showcase-panel__cat">
                <span className="showcase-panel__dot" style={{ background: '#2563eb' }} />
                Transport
              </div>
              <div className="showcase-panel__amount">₨1,800 / ₨2,500</div>
            </div>
            <div className="showcase-panel__row">
              <div className="showcase-panel__cat">
                <span className="showcase-panel__dot" style={{ background: '#d97706' }} />
                Books & Supplies
              </div>
              <div className="showcase-panel__amount">₨2,100 / ₨3,000</div>
            </div>
            <div className="showcase-panel__row">
              <div className="showcase-panel__cat">
                <span className="showcase-panel__dot" style={{ background: '#7c3aed' }} />
                Entertainment
              </div>
              <div className="showcase-panel__amount">₨950 / ₨1,500</div>
            </div>
          </div>
        </div>
      </section>
      <section className="stats-band">
        <div className="landing__container stats-grid">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="stats-grid__num">{s.num}</div>
              <div className="stats-grid__label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="landing-section">
        <div className="landing__container testimonial-card">
          <p className="testimonial-card__quote">
            "CampusCoin is the first budgeting app that actually gets student life — I finally
            know where my stipend disappears every month."
          </p>
          <div className="testimonial-card__person">
            <span className="testimonial-card__avatar">AR</span>
            <div style={{ textAlign: 'left' }}>
              <div className="testimonial-card__name">Ayesha Raza</div>
              <div className="testimonial-card__role">3rd Year, Computer Science</div>
            </div>
          </div>
        </div>
      </section>
      <section className="landing-section--tight" id="pricing">
        <div className="cta-banner">
          <div>
            <h2 className="cta-banner__heading">Ready to take control of your campus money?</h2>
            <p className="cta-banner__text">
              Create a free CampusCoin account in under a minute — no credit card needed.
            </p>
          </div>
          <div className="cta-banner__actions">
            <button className="landing-btn landing-btn--accent" onClick={goToRegister}>
              Get Started Free
            </button>
            <Link to="/login" className="landing-btn landing-btn--outline">
              Log in
            </Link>
          </div>
        </div>
      </section>
      <footer className="landing-footer">
        <div className="landing__container">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">
                <span className="landing-nav__brand-dot" />
                CampusCoin
              </div>
              <p style={{ fontSize: 14, color: '#9fb6ab', maxWidth: 260, lineHeight: 1.6 }}>
                The simplest way for students to track spending, budget smarter and stay on
                top of campus finances.
              </p>
            </div>
            <div className="footer-col">
              <div className="footer-col__title">Product</div>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#showcase">Budgeting</a></li>
                <li><a href="#pricing">Pricing</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <div className="footer-col__title">Company</div>
              <ul>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/sitemap">Sitemap</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <div className="footer-col__title">Account</div>
              <ul>
                <li><Link to="/login">Log in</Link></li>
                <li><Link to="/register">Sign up</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} CampusCoin. All rights reserved.</span>
            <span className="landing-nav__actions" style={{ gap: 16 }}>
              <ShieldCheck size={16} />
              Bank-level security
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default LandingPage;
