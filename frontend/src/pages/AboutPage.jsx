import { Link, useNavigate } from 'react-router-dom';
import {
  Wallet,
  Menu,
  Sparkles,
  Target,
  ShieldCheck,
  Heart,
  Users,
  Rocket,
} from 'lucide-react';
import '../styles/landing.css';

const NAV_LINKS = [
  { label: 'Features', href: '/#features' },
  { label: 'Budgeting', href: '/#showcase' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'About', to: '/about' },
];

const VALUES = [
  {
    icon: Heart,
    title: 'Built for students, by students',
    text: 'CampusCoin started as a final-year project born from our own struggle to track hostel and mess expenses — every feature is shaped by real student feedback.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy first',
    text: 'Your transactions are yours. We never sell data, and everything is encrypted in transit and at rest.',
  },
  {
    icon: Target,
    title: 'Simplicity over clutter',
    text: 'No confusing spreadsheets or 20-step forms — just fast, friendly tools that fit a student\u2019s daily routine.',
  },
  {
    icon: Rocket,
    title: 'Always improving',
    text: 'We ship small, useful updates every month based directly on what our campus community asks for.',
  },
];

const TEAM = [
  { initials: 'HR', name: 'Hamza Raza', role: 'Founder & Full-Stack Dev' },
  { initials: 'AS', name: 'Ayesha Siddiqui', role: 'Product & UX' },
  { initials: 'MB', name: 'Moiz Baig', role: 'Backend & Data' },
];

const AboutPage = () => {
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
            {NAV_LINKS.map((link) =>
              link.to ? (
                <li key={link.label}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ) : (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              )
            )}
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

      <header className="about-hero">
        <div className="landing__container">
          <span className="landing-hero__eyebrow">
            <Sparkles size={14} /> Our story
          </span>
          <h1 className="about-hero__title">
            Helping students make sense of <span>campus money</span>
          </h1>
          <p className="about-hero__subtitle">
            CampusCoin is a student-built expense tracker designed around real hostel budgets,
            mess bills and stipends — not generic corporate finance.
          </p>
        </div>
      </header>

      <section className="landing-section">
        <div className="landing__container about-story-grid">
          <div>
            <div className="landing-section__eyebrow">Why we built CampusCoin</div>
            <h2 className="landing-section__heading">From a leaky wallet to a working product</h2>
            <p className="landing-section__subheading" style={{ marginBottom: 20 }}>
              It began as a class project when our own team couldn&apos;t figure out where our
              monthly allowance was going. We tried spreadsheets, sticky notes, and every budgeting
              app on the Play Store — none of them understood student life: irregular income,
              hostel mess cuts, and split expenses with roommates.
            </p>
            <p className="landing-section__subheading">
              So we built the tool we wished existed: fast transaction logging, budgets that reset
              every semester, and AI insights that actually speak the language of student spending.
            </p>
          </div>
          <div className="about-story-image">
            <img
              src="https://picsum.photos/seed/campuscoin-story/900/700"
              alt="Students collaborating on the CampusCoin project"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="landing-section landing-showcase" id="values">
        <div className="landing__container">
          <div className="landing-section__head--center">
            <div className="landing-section__eyebrow" style={{ color: '#7fe0b0' }}>
              What we stand for
            </div>
            <h2 className="landing-section__heading" style={{ color: '#fff', marginLeft: 'auto', marginRight: 'auto' }}>
              The values behind every feature
            </h2>
          </div>
          <div className="feature-grid">
            {VALUES.map(({ icon: Icon, title, text }) => (
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

      <section className="landing-section">
        <div className="landing__container about-story-grid about-story-grid--reverse">
          <div className="about-story-image">
            <img
              src="https://picsum.photos/seed/campuscoin-campus/900/700"
              alt="CampusCoin team working on campus"
              loading="lazy"
            />
          </div>
          <div>
            <div className="landing-section__eyebrow">
              <Users size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} />
              The team
            </div>
            <h2 className="landing-section__heading">A small team, close to our users</h2>
            <p className="landing-section__subheading" style={{ marginBottom: 28 }}>
              We&apos;re a handful of students and recent grads who still track our own spending
              in CampusCoin every day.
            </p>
            <div className="about-team-list">
              {TEAM.map((member) => (
                <div className="about-team-card" key={member.name}>
                  <span className="testimonial-card__avatar">{member.initials}</span>
                  <div>
                    <div className="testimonial-card__name">{member.name}</div>
                    <div className="testimonial-card__role">{member.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="landing-section--tight">
        <div className="cta-banner">
          <div>
            <h2 className="cta-banner__heading">Want to see CampusCoin in action?</h2>
            <p className="cta-banner__text">
              Create a free account and get a feel for the dashboard in under a minute.
            </p>
          </div>
          <div className="cta-banner__actions">
            <button className="landing-btn landing-btn--accent" onClick={goToRegister}>
              Get Started Free
            </button>
            <Link to="/" className="landing-btn landing-btn--outline">
              Back to home
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
                <li><a href="/#features">Features</a></li>
                <li><a href="/#showcase">Budgeting</a></li>
                <li><a href="/#pricing">Pricing</a></li>
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

export default AboutPage;
