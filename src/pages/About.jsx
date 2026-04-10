import React from 'react';
import { ArrowRight, Building2, HeartHandshake } from 'lucide-react';
import { siteImages } from '../siteAssets';
import './About.css';

const About = ({ onQuoteClick }) => {
  return (
    <div className="about-page">
      <section
        className="page-hero page-hero-image about-hero"
        style={{ '--hero-image': `url(${siteImages.about.hero})` }}
      >
        <div className="hero-content">
          <span className="badge">About Our Agency</span>
          <h1>
            Local service rooted in <span className="accent-text">real relationships.</span>
          </h1>
          <p>
            We combine carrier choice with the kind of personal service that comes from knowing our
            community and the people we serve.
          </p>
        </div>
      </section>

      <section className="about-story section-padding">
        <div className="about-copy">
          <span className="section-kicker">Who we are</span>
          <h2>A family-minded agency with an independent point of view.</h2>
          <p>
            Abel Insurance pairs local knowledge with carrier choice, helping clients move through
            personal, business, and specialty insurance decisions with clearer support.
          </p>
          <button className="btn-primary" onClick={onQuoteClick}>
            Start a conversation <ArrowRight size={16} />
          </button>
        </div>

        <div className="about-photos">
          <figure className="about-photo large">
            <img src={siteImages.about.waiting} alt="Waiting area inside the Abel Insurance office" />
          </figure>
          <figure className="about-photo small">
            <img src={siteImages.about.officeDog} alt="Guest and dog inside the Abel Insurance office" />
          </figure>
        </div>
      </section>

      <section className="mission-grid">
        <article className="mission-card">
          <div className="icon-badge">
            <HeartHandshake size={28} />
          </div>
          <h3>Service-first guidance</h3>
          <p>
            Our approach is about helping clients understand options, not pushing a single carrier
            or a rushed quote.
          </p>
        </article>

        <article className="mission-card">
          <div className="icon-badge">
            <Building2 size={28} />
          </div>
          <h3>Real office, real team</h3>
          <p>
            When you call or stop in, you are working with a local agency that is here to answer
            questions before, during, and after a policy change.
          </p>
        </article>

        <article className="mission-card image-card">
          <img src={siteImages.about.team} alt="Abel Insurance team seated together" />
          <div className="mission-card-copy">
            <h3>Meet the people behind the guidance</h3>
            <p>Friendly service and clear advice still matter, especially when coverage gets personal.</p>
          </div>
        </article>
      </section>

      <section className="independence-section">
        <div className="independence-copy">
          <span className="section-kicker">We are independent</span>
          <h2>Choice matters, especially when the risks are not all the same.</h2>
          <p>
            Independent access gives us room to compare options and help you choose coverage that
            better matches your property, budget, and comfort level.
          </p>
        </div>
        <div className="independence-visuals">
          <figure className="independence-image scenic">
            <img src={siteImages.about.independent} alt="West Virginia waterfall in the mountains" />
          </figure>
          <figure className="independence-image office">
            <img src={siteImages.about.entrance} alt="Front entrance of the Abel Insurance office" />
          </figure>
        </div>
      </section>
    </div>
  );
};

export default About;
