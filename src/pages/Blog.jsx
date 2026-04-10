import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, Clock3, MapPin } from 'lucide-react';
import PageSeo from '../components/PageSeo';
import { featuredBlogPosts, blogPosts } from '../content/blogPosts';
import { toAssetUrl } from '../siteAssets';
import { buildBlogSchema, buildBreadcrumbSchema } from '../seo';
import './Blog.css';

const blogTopics = [
  'West Virginia auto insurance',
  'Buckhannon homeowners insurance',
  'Flood insurance in West Virginia',
  'Contractor insurance',
  'Independent insurance agency advice',
];

const Blog = ({ onQuoteClick }) => {
  const leadPost = featuredBlogPosts[0];
  const supportPosts = blogPosts.filter((post) => post.slug !== leadPost.slug);

  return (
    <div className="blog-page">
      <PageSeo
        title="West Virginia Insurance Blog | Auto, Home, Flood, and Business Tips | Abel Insurance"
        description="Browse Abel Insurance articles covering West Virginia auto insurance, home insurance, flood coverage, business insurance, and local guidance from Buckhannon."
        path="/blog"
        imagePath={leadPost.heroImagePath}
        imageAlt={leadPost.heroAlt}
        structuredData={[
          buildBlogSchema(blogPosts),
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
          ]),
        ]}
      />

      <section className="blog-hero section-padding">
        <div className="blog-hero-copy">
          <span className="section-kicker">West Virginia insurance blog</span>
          <h1>Helpful insurance answers written for West Virginia drivers, homeowners, and business owners.</h1>
          <p>
            We built this resource center around the questions people actually ask before they buy,
            renew, bundle, or revisit coverage. It is designed to support local search visibility
            and be genuinely useful when someone needs clarity fast.
          </p>
          <div className="blog-topic-list" aria-label="Popular West Virginia insurance topics">
            {blogTopics.map((topic) => (
              <span key={topic} className="blog-topic-chip">
                {topic}
              </span>
            ))}
          </div>
          <div className="blog-hero-meta">
            <span>
              <MapPin size={16} /> Buckhannon, WV insight with statewide relevance
            </span>
          </div>
        </div>

        <article className="blog-feature-card">
          <div className="blog-feature-media">
            <img src={toAssetUrl(leadPost.heroImagePath)} alt={leadPost.heroAlt} />
          </div>
          <div className="blog-feature-body">
            <span className="badge">{leadPost.category}</span>
            <h2>{leadPost.title}</h2>
            <p>{leadPost.excerpt}</p>
            <div className="blog-card-meta">
              <span>
                <CalendarDays size={15} /> April 9, 2026
              </span>
              <span>
                <Clock3 size={15} /> {leadPost.readTime}
              </span>
            </div>
            <Link to={`/blog/${leadPost.slug}`} className="btn-primary">
              Read the guide <ArrowRight size={16} />
            </Link>
          </div>
        </article>
      </section>

      <section className="section-padding blog-grid-section">
        <div className="section-header">
          <span className="section-kicker">Fresh resources</span>
          <h2>Coverage guides built around high-intent insurance questions in West Virginia.</h2>
        </div>

        <div className="blog-grid">
          {supportPosts.map((post) => (
            <article key={post.slug} className="blog-card">
              <Link to={`/blog/${post.slug}`} className="blog-card-media-link">
                <div className="blog-card-media">
                  <img src={toAssetUrl(post.heroImagePath)} alt={post.heroAlt} />
                </div>
              </Link>

              <div className="blog-card-body">
                <span className="badge">{post.category}</span>
                <h3>
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p>{post.excerpt}</p>
                <div className="blog-card-meta">
                  <span>
                    <CalendarDays size={15} /> April 9, 2026
                  </span>
                  <span>
                    <Clock3 size={15} /> {post.readTime}
                  </span>
                </div>
                <Link to={`/blog/${post.slug}`} className="card-link">
                  Read more <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-padding blog-cta-strip">
        <div>
          <span className="section-kicker">Need a local answer?</span>
          <h2>Use the blog for research, then let us help tailor the coverage.</h2>
          <p>
            Reading helps, but your property, vehicles, and business still deserve a policy review
            built around your own situation.
          </p>
        </div>
        <button className="btn-primary" onClick={onQuoteClick}>
          Request a quote review
        </button>
      </section>
    </div>
  );
};

export default Blog;
