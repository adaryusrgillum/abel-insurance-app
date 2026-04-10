import React from 'react';
import { ArrowRight, Car, Home as HomeIcon, Umbrella } from 'lucide-react';
import { siteImages } from '../siteAssets';
import './Personal.css';

const Personal = ({ onQuoteClick }) => {
  const coverages = [
    {
      title: 'Auto Insurance',
      icon: <Car size={30} />,
      image: siteImages.personal.auto,
      description:
        'Compare protection for everyday drivers, classic cars, and bundled household policies with help from a local team.',
      bullets: [
        'Liability, collision, and comprehensive options',
        'Uninsured and underinsured motorist protection',
        'Multi-vehicle and multi-policy discount reviews',
      ],
    },
    {
      title: 'Home Insurance',
      icon: <HomeIcon size={30} />,
      image: siteImages.personal.home,
      description:
        'Protect your home, personal property, and liability exposure with coverage that fits primary, secondary, or specialty properties.',
      bullets: [
        'Dwelling, contents, and personal liability coverage',
        'Water backup, valuables, and flood conversations',
        'Options for condo, vacant, and rental properties',
      ],
    },
  ];

  return (
    <div className="personal-page">
      <section
        className="page-hero page-hero-image personal-hero"
        style={{ '--hero-image': `url(${siteImages.personal.hero})` }}
      >
        <div className="hero-content">
          <span className="badge">Personal Insurance</span>
          <h1>
            Protection for the people, homes, and routines you value{' '}
            <span className="accent-text">most.</span>
          </h1>
          <p>
            Protect the drivers, homes, and milestones that matter most with coverage shaped around
            your household and the way you live.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="personal-grid">
          {coverages.map((item) => (
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

      <section className="personal-gallery">
        <figure className="gallery-tile">
          <img src={siteImages.personal.classic} alt="Classic cars lined up at dusk" />
          <figcaption>Classic and collector vehicle conversations</figcaption>
        </figure>
        <figure className="gallery-tile">
          <img src={siteImages.personal.childLife} alt="Child running outdoors at sunset" />
          <figcaption>Life and long-term protection for changing seasons</figcaption>
        </figure>
      </section>

      <section className="umbrella-section">
        <div className="umbrella-card">
          <div className="umbrella-image">
            <img src={siteImages.personal.umbrella} alt="Family using a tablet together at home" />
          </div>
          <div className="umbrella-text">
            <div className="coverage-header">
              <div className="icon-badge">
                <Umbrella size={30} />
              </div>
              <h3>Umbrella and Excess Liability</h3>
            </div>
            <p>
              When your auto or home limits are not enough, additional liability coverage can help
              protect savings, future income, and peace of mind.
            </p>
            <div className="umbrella-inline-note">
              <img src={siteImages.personal.excess} alt="Father giving a child a piggyback ride" />
              <div>
                <h4>Built for bigger moments</h4>
                <p>Talk through umbrella, life, and specialty property needs in one review.</p>
              </div>
            </div>
            <button className="btn-primary" onClick={onQuoteClick}>
              Talk through options <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Personal;
