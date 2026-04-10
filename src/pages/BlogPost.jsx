import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CalendarDays, Clock3 } from 'lucide-react';
import PageSeo from '../components/PageSeo';
import { getBlogPostBySlug, getRelatedBlogPosts } from '../content/blogPosts';
import { toAssetUrl } from '../siteAssets';
import { buildBlogPostingSchema, buildBreadcrumbSchema } from '../seo';
import './Blog.css';

const formatDate = (value) =>
  new Date(`${value}T12:00:00`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

const BlogPost = ({ onQuoteClick }) => {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = getRelatedBlogPosts(post.slug);

  return (
    <div className="blog-page">
      <PageSeo
        title={`${post.title} | Abel Insurance Blog`}
        description={post.description}
        path={`/blog/${post.slug}`}
        imagePath={post.heroImagePath}
        imageAlt={post.heroAlt}
        type="article"
        publishedTime={post.publishedTime}
        modifiedTime={post.modifiedTime}
        structuredData={[
          buildBlogPostingSchema(post),
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <section className="blog-post-hero">
        <div className="blog-post-hero-media">
          <img src={toAssetUrl(post.heroImagePath)} alt={post.heroAlt} />
        </div>

        <div className="blog-post-hero-copy section-padding">
          <Link to="/blog" className="blog-back-link">
            <ArrowLeft size={16} /> Back to blog
          </Link>
          <span className="section-kicker">{post.category}</span>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <div className="blog-card-meta">
            <span>
              <CalendarDays size={15} /> {formatDate(post.publishedTime)}
            </span>
            <span>
              <Clock3 size={15} /> {post.readTime}
            </span>
          </div>
        </div>
      </section>

      <section className="section-padding blog-post-shell">
        <article className="blog-article">
          <p className="blog-article-intro">{post.intro}</p>

          <div className="blog-takeaways">
            <h2>Key takeaways</h2>
            <ul>
              {post.takeaways.map((takeaway) => (
                <li key={takeaway}>{takeaway}</li>
              ))}
            </ul>
          </div>

          {post.sections.map((section) => (
            <section key={section.heading} className="blog-article-section">
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}

          <div className="blog-article-cta">
            <span className="section-kicker">Need help applying this?</span>
            <h2>{post.cta.title}</h2>
            <p>{post.cta.body}</p>
            <div className="blog-article-actions">
              <Link to={post.cta.path} className="btn-secondary">
                {post.cta.label}
              </Link>
              <button className="btn-primary" onClick={onQuoteClick}>
                Request a local review
              </button>
            </div>
          </div>
        </article>

        <aside className="blog-sidebar">
          <div className="blog-sidebar-card">
            <span className="section-kicker">Primary keyword</span>
            <h3>{post.primaryKeyword}</h3>
            <p>
              This article was written to answer a specific West Virginia insurance search with
              plain-language guidance and local relevance.
            </p>
          </div>

          <div className="blog-sidebar-card">
            <span className="section-kicker">Related topics</span>
            <div className="blog-topic-list">
              {post.keywords.map((keyword) => (
                <span key={keyword} className="blog-topic-chip">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="section-padding related-posts-section">
        <div className="section-header">
          <span className="section-kicker">Keep reading</span>
          <h2>More insurance guides for West Virginia households and businesses.</h2>
        </div>

        <div className="blog-grid">
          {relatedPosts.map((relatedPost) => (
            <article key={relatedPost.slug} className="blog-card">
              <Link to={`/blog/${relatedPost.slug}`} className="blog-card-media-link">
                <div className="blog-card-media">
                  <img src={toAssetUrl(relatedPost.heroImagePath)} alt={relatedPost.heroAlt} />
                </div>
              </Link>
              <div className="blog-card-body">
                <span className="badge">{relatedPost.category}</span>
                <h3>
                  <Link to={`/blog/${relatedPost.slug}`}>{relatedPost.title}</Link>
                </h3>
                <p>{relatedPost.excerpt}</p>
                <Link to={`/blog/${relatedPost.slug}`} className="card-link">
                  Read the article <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
