import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock3, ExternalLink, MapPin, Shield, Users } from 'lucide-react';
import Coin3D from '../components/Coin3D';
import { featuredBlogPosts } from '../content/blogPosts';
import { brandAssets, homeCarrierLogos, siteImages } from '../siteAssets';
import './Home.css';

const portalLink =
  'https://customerservice.agentinsure.com/EzLynxCustomerService/web/abel/account/login';

const Home = ({ onQuoteClick }) => {
  const navigate = useNavigate();

  const quickfacts = [
    {
      icon: <Shield size={22} />,
      title: 'Independent market access',
      description:
        'Compare options across multiple carriers to find protection that fits your home, vehicles, and budget.',
    },
    {
      icon: <Users size={22} />,
      title: 'Local service team',
      description:
        'Work with people who know the region, understand the risks, and stay available when life changes.',
    },
    {
      icon: <MapPin size={22} />,
      title: 'Buckhannon office support',
      description:
        'Visit the office, give us a call, or lean on us for reviews, updates, and claim-time questions.',
    },
  ];

  const featuredSolutions = [
    {
      title: 'Personal Insurance',
      description:
        'Auto, home, umbrella, and life coverage built around the people and property you care about.',
      image: siteImages.home.personal,
      path: '/personal',
    },
    {
      title: 'Business Insurance',
      description:
        'Coverage for owners, property, fleets, and the day-to-day risks that come with growth.',
      image: siteImages.home.business,
      path: '/business',
    },
    {
      title: 'Insurance by Industry',
      description:
        'From contractors to hospitality, Abel helps shape specialized protection that fits the way you work.',
      image: siteImages.home.industry,
      path: '/business',
    },
  ];

  const insightPosts = featuredBlogPosts.slice(0, 3);

  return (
    <div className="home-container">
      <section
        className="hero-unified"
        style={{
          '--hero-image': `url(${brandAssets.homeHero})`,
          '--texture-image': `url(${brandAssets.homeTexture})`,
        }}
        >
        <div className="hero-stack">
          <div className="hero-copy">
            <span className="badge hero-badge">Independent & family owned agent</span>
            <div className="hero-headline-row">
              <div className="hero-inline-coin">
                <Coin3D size={140} emblemSrc={brandAssets.icon} />
              </div>
              <h1>
                We&apos;re Here to Put Your Needs <span className="accent-text">First.</span>
              </h1>
            </div>
            <p>
              Independent guidance for homes, vehicles, and businesses across West Virginia,
              backed by carrier choice and personal service that stays close when life changes.
            </p>

            <div className="hero-btns">
              <button className="btn-cta" onClick={onQuoteClick}>
                Start Your Quote <ArrowRight size={18} />
              </button>
              <a href={portalLink} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Client Portal <ExternalLink size={16} />
              </a>
            </div>

            <div className="trust-indicators">
              <div className="trust-item">
                <Shield size={16} />
                <span>Independent, family-owned guidance</span>
              </div>
              <div className="trust-item">
                <MapPin size={16} />
                <span>Buckhannon office serving West Virginia families and businesses</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-photo-card scenic-card">
              <img src={brandAssets.homeHero} alt="West Virginia mountain river landscape" />
            </div>
            <div className="hero-photo-card office-card">
              <img src={siteImages.home.officeSign} alt="Abel Insurance Group office sign" />
            </div>
          </div>
        </div>
      </section>

      <section className="home-quickfacts">
        {quickfacts.map((fact) => (
          <div key={fact.title} className="quickfact-card">
            {fact.icon}
            <div>
              <strong>{fact.title}</strong>
              <span>{fact.description}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="services-section">
        <div className="section-header">
          <span className="section-kicker">Insurance solutions</span>
          <h2>Coverage built around the way you live, drive, own, and work.</h2>
        </div>

        <div className="cards-grid">
          {featuredSolutions.map((card) => (
            <article key={card.title} className="service-card">
              <div className="service-card-media">
                <img src={card.image} alt={card.title} />
              </div>
              <div className="service-card-body">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <button className="card-link" onClick={() => navigate(card.path)}>
                  Explore coverage <ArrowRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="agency-highlight">
        <div className="highlight-copy">
          <span className="section-kicker">Agency experience</span>
          <h2>A local agency experience that feels personal from the first call.</h2>
          <p>
            From everyday policy questions to claim-time support, our team helps you make
            confident decisions without the hard sell.
          </p>
          <button className="btn-primary" onClick={onQuoteClick}>
            Request a local review
          </button>
        </div>

        <div className="highlight-visual">
          <figure className="highlight-tile feature">
            <img src={siteImages.home.solutions} alt="Conference room inside Abel Insurance Group" />
          </figure>
          <figure className="highlight-tile support">
            <img src={siteImages.home.contact} alt="Abel Insurance Group sign on the lawn" />
          </figure>
        </div>
      </section>

      <section className="carrier-section">
        <div className="section-header">
          <span className="section-kicker">Carrier partners</span>
          <h2>Well-known carriers, with one local advocate on your side.</h2>
        </div>

        <div className="carrier-carousel">
          {homeCarrierLogos.map((carrier) => (
            <div key={carrier.name} className="carrier-logo-card">
              <img src={carrier.src} alt={`${carrier.name} logo`} className="carrier-logo" />
            </div>
          ))}
        </div>

        <button className="carrier-link" onClick={() => navigate('/claims')}>
          View claims and carrier help <ArrowRight size={16} />
        </button>
      </section>

      <section className="blog-preview-section">
        <div className="section-header">
          <span className="section-kicker">West Virginia insurance insights</span>
          <h2>Helpful articles that answer the questions clients ask before they buy.</h2>
        </div>

        <div className="blog-preview-grid">
          {insightPosts.map((post) => (
            <article key={post.slug} className="blog-preview-card">
              <span className="badge">{post.category}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <div className="blog-preview-meta">
                <Clock3 size={15} />
                <span>{post.readTime}</span>
              </div>
              <button className="card-link" onClick={() => navigate(`/blog/${post.slug}`)}>
                Read the article <ArrowRight size={16} />
              </button>
            </article>
          ))}
        </div>

        <button className="btn-secondary" onClick={() => navigate('/blog')}>
          Browse the full blog
        </button>
      </section>
    </div>
  );
};

export default Home;
