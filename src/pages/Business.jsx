import React from 'react';
import { ArrowRight, BriefcaseBusiness, Building2, ShieldAlert, Truck } from 'lucide-react';
import { siteImages } from '../siteAssets';
import './Business.css';

const Business = ({ onQuoteClick }) => {
  const businessCoverages = [
    {
      title: 'Business Owners Coverage',
      icon: <BriefcaseBusiness size={30} />,
      image: siteImages.business.owners,
      description:
        'Support for owners who need property, liability, and operational protection wrapped into a smarter package.',
      bullets: [
        'General liability and property coverage',
        'Business interruption and equipment conversations',
        'Policy design around your size, footprint, and budget',
      ],
    },
    {
      title: 'Commercial Property',
      icon: <Building2 size={30} />,
      image: siteImages.business.property,
      description:
        'Coverage that helps protect buildings, contents, inventory, and the physical spaces your business depends on.',
      bullets: [
        'Owned and leased space protection',
        'Contents, tenant improvements, and key assets',
        'Options for specialty property exposures',
      ],
    },
    {
      title: 'Business Auto and Fleet',
      icon: <Truck size={30} />,
      image: siteImages.business.auto,
      description:
        'From a single service vehicle to a working fleet, Abel can help keep your operation moving.',
      bullets: [
        'Commercial auto liability and physical damage',
        'Fleet, delivery, and service-vehicle discussions',
        'Driver, route, and usage-based policy reviews',
      ],
    },
  ];

  return (
    <div className="business-page">
      <section
        className="page-hero page-hero-image business-hero"
        style={{ '--hero-image': `url(${siteImages.business.hero})` }}
      >
        <div className="hero-content">
          <span className="badge">Business Insurance</span>
          <h1>
            Protection for the work you have built and the people who help run{' '}
            <span className="accent-text">it.</span>
          </h1>
          <p>
            Keep your operation protected with coverage designed around property, vehicles,
            employees, and the day-to-day risks of doing business.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="business-grid">
          {businessCoverages.map((item) => (
            <article key={item.title} className="coverage-item">
              <div className="coverage-media">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="coverage-content">
                <div className="coverage-header">
                  <div className="icon-badge">{item.icon}</div>
                  <h2>{item.title}</h2>
                </div>
                <p>{item.description}</p>
                <ul className="coverage-list">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="industry-strip">
        <div className="industry-copy">
          <span className="section-kicker">Insurance by industry</span>
          <h2>Specialized coverage should feel tailored, not generic.</h2>
          <p>
            No two operations face the same exposures. We can help you compare coverage for your
            field, equipment, customers, and growth plans.
          </p>
        </div>
        <div className="industry-image">
          <img src={siteImages.business.industry} alt="Desk with calculator and model houses" />
        </div>
      </section>

      <section className="management-section">
        <div className="management-card">
          <div className="management-visuals">
            <figure className="management-image large">
              <img src={siteImages.business.fleet} alt="Commercial fleet vehicles lined up" />
            </figure>
            <figure className="management-image small">
              <img
                src={siteImages.business.workersComp}
                alt="Business manager standing in a warehouse distribution center"
              />
            </figure>
          </div>

          <div className="management-text">
            <div className="coverage-header">
              <div className="icon-badge">
                <ShieldAlert size={30} />
              </div>
              <h3>Risk, workers&apos; comp, and specialty support</h3>
            </div>
            <p>
              When your exposure stretches beyond a basic package, Abel can help talk through
              workers&apos; compensation, management liability, hospitality risks, and
              industry-specific needs.
            </p>
            <button className="btn-primary" onClick={onQuoteClick}>
              Request a business review <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Business;
