import React from 'react';
import { ArrowRight, ExternalLink, HelpCircle, Link as LinkIcon, PhoneCall } from 'lucide-react';
import { carrierBrandLogos, siteImages } from '../siteAssets';
import './Claims.css';

const carrierHubLink =
  'https://www.abelinsgroup.com/about-our-agency/insurance-companies/';

const carriers = [
  {
    name: 'Nationwide',
    phone: '1-800-421-3535',
    payLink: 'https://www.nationwide.com/personal/insurance/claims/',
  },
  {
    name: 'Progressive',
    phone: '1-800-274-4490',
    payLink: 'https://www.progressive.com/claims/',
  },
  {
    name: 'Liberty Mutual',
    phone: '1-800-225-2467',
    payLink: 'https://www.libertymutual.com/claims',
  },
  {
    name: 'Erie Insurance',
    phone: '1-800-367-3743',
    payLink: 'https://www.erieinsurance.com/claims',
  },
  {
    name: 'State Auto',
    phone: '1-877-722-5246',
    payLink: 'https://www.stateauto.com/claims',
  },
  {
    name: 'Hagerty',
    phone: '1-800-922-4050',
    payLink: 'https://www.hagerty.com/insurance/claims',
  },
];

const CarrierBadge = ({ name }) => {
  const src = carrierBrandLogos[name];

  if (src) {
    return <img src={src} alt={`${name} logo`} className="claims-logo-image" />;
  }

  return <div className="claims-logo-fallback">{name.slice(0, 2).toUpperCase()}</div>;
};

const Claims = ({ onQuoteClick }) => {
  return (
    <div className="claims-page">
      <section
        className="page-hero page-hero-image claims-hero"
        style={{ '--hero-image': `url(${siteImages.claims.hero})` }}
      >
        <div className="hero-content">
          <span className="badge">Claims and Service</span>
          <h1>
            Fast access when you need carrier support <span className="accent-text">most.</span>
          </h1>
          <p>
            Reach the carrier resources you need quickly, then lean on our team when you want help
            understanding the next step.
          </p>
          <div className="hero-inline-actions">
            <a href={carrierHubLink} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Full carrier directory <ExternalLink size={16} />
            </a>
            <button className="btn-primary" onClick={onQuoteClick}>
              Ask Abel for help <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="claims-grid section-padding">
        {carriers.map((carrier) => (
          <article key={carrier.name} className="claims-card">
            <div className="claims-card-header">
              <CarrierBadge name={carrier.name} />
              <h3>{carrier.name}</h3>
            </div>

            <div className="claims-info">
              <div className="info-item">
                <PhoneCall size={16} />
                <span>{carrier.phone}</span>
              </div>
              <div className="info-item">
                <LinkIcon size={16} />
                <span>Carrier payment and claim center</span>
              </div>
            </div>

            <div className="claims-actions">
              <a href={carrier.payLink} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Make Payment <ExternalLink size={14} />
              </a>
              <a href={carrier.payLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Report Claim
              </a>
            </div>
          </article>
        ))}
      </section>

      <section className="claims-contact">
        <div className="contact-box">
          <div className="contact-image">
            <img src={siteImages.claims.localHelp} alt="Abel Insurance sign on the lawn" />
          </div>
          <div className="contact-text">
            <div className="icon-badge inverse">
              <HelpCircle size={28} />
            </div>
            <h3>Need local help before or after you file?</h3>
            <p>
              During office hours, our local team can help you understand carrier steps, payment
              options, and what to expect next.
            </p>
            <a href="tel:3048785900" className="btn-cta">
              Call 304.878.5900
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Claims;
