import React, { useEffect, useState } from 'react';
import {
  HashRouter as Router,
  Link,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import {
  ChevronDown,
  ExternalLink,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  ShieldCheck,
  Sun,
  X,
} from 'lucide-react';
import About from './pages/About';
import Business from './pages/Business';
import Claims from './pages/Claims';
import Home from './pages/Home';
import Personal from './pages/Personal';
import { siteImages } from './siteAssets';
import './App.css';

const portalLink =
  'https://customerservice.agentinsure.com/EzLynxCustomerService/web/abel/account/login';
const carrierHubLink =
  'https://www.abelinsgroup.com/about-our-agency/insurance-companies/';
const officePhone = '3048785900';
const officePhoneLabel = '304.878.5900';
const officeEmail = 'info@abelinsgroup.com';

const routeMeta = {
  '/': {
    title: 'Abel Insurance | Independent Coverage for West Virginia',
    description:
      'Independent insurance guidance for homes, vehicles, businesses, and life across West Virginia, backed by local service and carrier choice.',
  },
  '/personal': {
    title: 'Personal Insurance | Abel Insurance',
    description:
      'Explore auto, home, umbrella, and personal protection options with a local Abel Insurance team that can help compare coverage.',
  },
  '/business': {
    title: 'Business Insurance | Abel Insurance',
    description:
      'Protect property, vehicles, operations, and specialty risks with business insurance guidance shaped around how your company works.',
  },
  '/about': {
    title: 'About Abel Insurance | Local Independent Agency',
    description:
      'Meet the local independent agency behind Abel Insurance and learn how we help clients navigate coverage with clarity and care.',
  },
  '/claims': {
    title: 'Claims and Carrier Help | Abel Insurance',
    description:
      'Find fast carrier claim and payment links, then connect with Abel Insurance for local guidance before or after you file.',
  },
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const RouteMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = routeMeta[pathname] ?? routeMeta['/'];
    document.title = meta.title;

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute('content', meta.description);
    }
  }, [pathname]);

  return null;
};

const BrandLogo = ({ compact = false }) => (
  <div className={`brand-lockup ${compact ? 'compact' : ''}`}>
    <div className="brand-copy">
      <span className="brand-name">
        ABEL<span>INSURANCE</span>
      </span>
      {!compact ? (
        <span className="brand-tagline">Independent and family owned agent</span>
      ) : null}
    </div>
  </div>
);

const QuoteModal = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsSubmitted(false);
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-shell"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-modal-title"
      >
        <button className="modal-close" onClick={onClose} aria-label="Close quote modal">
          <X />
        </button>

        <div
          className="modal-media"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(6, 19, 33, 0.18), rgba(6, 19, 33, 0.76)), url(${siteImages.home.quote})`,
          }}
        >
          <span className="badge">Start Your Quote</span>
          <h2>Talk through the coverage you actually need.</h2>
          <p>Local advice, multiple carriers, and a smoother path to better protection.</p>
        </div>

        <div className="modal-content">
          {!isSubmitted ? (
            <>
              <h2 id="quote-modal-title">
                Request a <span className="accent-text">Free Review</span>
              </h2>
              <p>
                Share a few details and the Abel team can help compare options for your home,
                vehicles, business, or life coverage.
              </p>

              <form
                className="quote-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  setIsSubmitted(true);
                }}
              >
                <input type="text" placeholder="Full Name" autoComplete="name" required />
                <input type="email" placeholder="Email Address" autoComplete="email" required />
                <input type="tel" placeholder="Phone Number" autoComplete="tel" required />
                <select required defaultValue="">
                  <option value="" disabled>
                    Select Insurance Type
                  </option>
                  <option value="personal">Personal Insurance</option>
                  <option value="business">Business Insurance</option>
                  <option value="life">Life Insurance</option>
                </select>
                <textarea
                  rows="4"
                  placeholder="What would you like help protecting?"
                  defaultValue=""
                />
                <div className="modal-form-footer">
                  <span>No pressure. Just practical guidance from a local team.</span>
                  <button type="submit" className="btn-primary">
                    Check My Rate
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="modal-success">
              <div className="icon-badge success-badge">
                <ShieldCheck size={28} />
              </div>
              <span className="badge">Request Received</span>
              <h2 id="quote-modal-title">Thanks for reaching out.</h2>
              <p>
                A team member can follow up soon to walk through the right next step. If your
                question is urgent, you can contact the office directly below.
              </p>
              <div className="modal-success-actions">
                <a href={`tel:${officePhone}`} className="btn-primary">
                  <Phone size={16} /> Call {officePhoneLabel}
                </a>
                <a href={`mailto:${officeEmail}`} className="btn-secondary">
                  <Mail size={16} /> Email the team
                </a>
              </div>
              <button className="text-link-button" onClick={() => setIsSubmitted(false)}>
                Send another request
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SupportPanel = ({ isOpen, onClose, onQuoteClick }) => {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="support-overlay" onClick={onClose}>
      <aside
        className="support-panel"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="support-panel-title"
      >
        <button className="support-close" onClick={onClose} aria-label="Close support panel">
          <X size={18} />
        </button>

        <div
          className="support-visual"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(6, 19, 33, 0.2), rgba(6, 19, 33, 0.78)), url(${siteImages.home.contact})`,
          }}
        >
          <span className="badge">Need quick help?</span>
          <h2 id="support-panel-title">Talk to the local team.</h2>
        </div>

        <div className="support-panel-body">
          <p>
            Questions about a payment, claim, policy change, or new coverage? We can help you take
            the next right step.
          </p>

          <div className="support-actions">
            <a href={`tel:${officePhone}`} className="btn-primary">
              <Phone size={16} /> Call {officePhoneLabel}
            </a>
            <a href={`mailto:${officeEmail}`} className="btn-secondary">
              <Mail size={16} /> Email support
            </a>
          </div>

          <div className="support-meta">
            <div className="support-meta-row">
              <MapPin size={16} />
              <span>172 S. Kanawha Street, Buckhannon, WV 26201</span>
            </div>
            <div className="support-meta-row">
              <ExternalLink size={16} />
              <a href={portalLink} target="_blank" rel="noopener noreferrer">
                Open secure client portal
              </a>
            </div>
          </div>

          <button
            className="text-link-button"
            onClick={() => {
              onClose();
              onQuoteClick();
            }}
          >
            Request a quote instead
          </button>
        </div>
      </aside>
    </div>
  );
};

const Navbar = ({
  isDark,
  isMenuOpen,
  onMenuClose,
  onMenuToggle,
  onQuoteClick,
  setIsDark,
}) => (
  <header className="sticky-header">
    <nav className="nav-container" aria-label="Main navigation">
      <Link to="/" className="logo-link" aria-label="Abel Insurance home">
        <BrandLogo compact />
      </Link>

      <ul className="nav-links">
        <li className="dropdown">
          <button type="button" className="nav-dropdown-toggle">
            Insurance Solutions <ChevronDown size={16} />
          </button>
          <ul className="dropdown-menu">
            <li>
              <Link to="/personal">Personal Insurance</Link>
            </li>
            <li>
              <Link to="/business">Business Insurance</Link>
            </li>
            <li>
              <Link to="/claims">Claims and Carrier Help</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li>
          <a href={carrierHubLink} target="_blank" rel="noopener noreferrer">
            Insurance Companies <ExternalLink size={12} />
          </a>
        </li>
        <li>
          <a href={portalLink} target="_blank" rel="noopener noreferrer">
            Client Portal <ExternalLink size={12} />
          </a>
        </li>
      </ul>

      <div className="header-actions">
        <button className="theme-toggle" onClick={() => setIsDark(!isDark)} aria-label="Toggle theme">
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <a href={`tel:${officePhone}`} className="btn-phone">
          <Phone size={16} /> {officePhoneLabel}
        </a>
        <button className="btn-primary" onClick={onQuoteClick}>
          Request a Quote
        </button>
      </div>

      <div className="header-mobile-actions">
        <button className="theme-toggle" onClick={() => setIsDark(!isDark)} aria-label="Toggle theme">
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button
          className={`menu-toggle ${isMenuOpen ? 'is-open' : ''}`}
          onClick={onMenuToggle}
          aria-label={isMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav-panel"
        >
          {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          <span>Menu</span>
        </button>
      </div>
    </nav>

    <div
      className={`mobile-nav-backdrop ${isMenuOpen ? 'is-open' : ''}`}
      onClick={onMenuClose}
      aria-hidden={!isMenuOpen}
    />

    <div
      id="mobile-nav-panel"
      className={`mobile-nav-panel ${isMenuOpen ? 'is-open' : ''}`}
      aria-hidden={!isMenuOpen}
    >
      <div className="mobile-nav-header">
        <BrandLogo compact />
        <button className="mobile-nav-close" onClick={onMenuClose} aria-label="Close mobile menu">
          <X size={18} />
        </button>
      </div>

      <div className="mobile-nav-group">
        <span className="mobile-nav-label">Insurance solutions</span>
        <Link to="/personal" className="mobile-nav-link" onClick={onMenuClose}>
          Personal Insurance
        </Link>
        <Link to="/business" className="mobile-nav-link" onClick={onMenuClose}>
          Business Insurance
        </Link>
        <Link to="/claims" className="mobile-nav-link" onClick={onMenuClose}>
          Claims and Carrier Help
        </Link>
      </div>

      <div className="mobile-nav-group">
        <span className="mobile-nav-label">Agency</span>
        <Link to="/about" className="mobile-nav-link" onClick={onMenuClose}>
          About Us
        </Link>
        <a
          href={carrierHubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-nav-link"
          onClick={onMenuClose}
        >
          Insurance Companies
        </a>
        <a
          href={portalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-nav-link"
          onClick={onMenuClose}
        >
          Client Portal
        </a>
      </div>

      <div className="mobile-nav-actions">
        <a href={`tel:${officePhone}`} className="btn-phone mobile-phone-link">
          <Phone size={16} /> {officePhoneLabel}
        </a>
        <button
          className="btn-primary mobile-quote-button"
          onClick={() => {
            onMenuClose();
            onQuoteClick();
          }}
        >
          Request a Quote
        </button>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="footer">
    <div className="footer-grid">
      <div className="footer-brand">
        <Link to="/" className="logo-link footer-logo" aria-label="Abel Insurance home">
          <BrandLogo compact />
        </Link>
        <p className="footer-copy">
          Independent insurance guidance for families, property owners, and businesses across West
          Virginia and the surrounding region.
        </p>
        <div className="footer-contact-list">
          <p>
            <MapPin size={16} /> 172 S. Kanawha Street, Buckhannon, WV 26201
          </p>
          <p>
            <Phone size={16} /> {officePhoneLabel}
          </p>
          <p>
            <Mail size={16} /> {officeEmail}
          </p>
        </div>
        <a href={portalLink} target="_blank" rel="noopener noreferrer" className="btn-secondary">
          Secure Client Login
        </a>
      </div>

      <div className="footer-links">
        <h4>Solutions</h4>
        <ul>
          <li>
            <Link to="/personal">Personal Insurance</Link>
          </li>
          <li>
            <Link to="/business">Business Insurance</Link>
          </li>
          <li>
            <Link to="/claims">Claims and Payments</Link>
          </li>
        </ul>
      </div>

      <div className="footer-links">
        <h4>Agency</h4>
        <ul>
          <li>
            <Link to="/about">About Abel Insurance</Link>
          </li>
          <li>
            <a href={carrierHubLink} target="_blank" rel="noopener noreferrer">
              Insurance Companies
            </a>
          </li>
          <li>
            <a href="https://www.abelinsgroup.com/contact/" target="_blank" rel="noopener noreferrer">
              Contact the Office
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div className="footer-bottom">
      <p>Copyright {new Date().getFullYear()} Abel Insurance. All rights reserved.</p>
    </div>
  </footer>
);

const AppShell = () => {
  const { pathname } = useLocation();
  const [isDark, setIsDark] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSupportOpen(false);
  }, [pathname]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1181px)');
    const handleChange = (event) => {
      if (event.matches) {
        setIsMenuOpen(false);
      }
    };

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (isQuoteOpen || isSupportOpen || isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen, isQuoteOpen, isSupportOpen]);

  const openQuoteModal = () => {
    setIsMenuOpen(false);
    setIsSupportOpen(false);
    setIsQuoteOpen(true);
  };

  return (
    <div className={`app-root ${isDark ? 'dark-mode' : 'light-mode'}`}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <ScrollToTop />
      <RouteMeta />
      <Navbar
        isDark={isDark}
        isMenuOpen={isMenuOpen}
        onMenuClose={() => setIsMenuOpen(false)}
        onMenuToggle={() => setIsMenuOpen((current) => !current)}
        onQuoteClick={openQuoteModal}
        setIsDark={setIsDark}
      />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home onQuoteClick={openQuoteModal} />} />
          <Route path="/personal" element={<Personal onQuoteClick={openQuoteModal} />} />
          <Route path="/business" element={<Business onQuoteClick={openQuoteModal} />} />
          <Route path="/about" element={<About onQuoteClick={openQuoteModal} />} />
          <Route path="/claims" element={<Claims onQuoteClick={openQuoteModal} />} />
        </Routes>
      </main>
      <Footer />
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
      <SupportPanel
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
        onQuoteClick={openQuoteModal}
      />
      <button
        className="chat-trigger"
        onClick={() => {
          setIsMenuOpen(false);
          setIsSupportOpen(true);
        }}
        aria-label="Open support options"
      >
        <Mail size={20} />
        <span>Need Help?</span>
      </button>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}

export default App;
