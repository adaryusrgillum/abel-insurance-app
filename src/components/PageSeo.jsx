import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { buildAbsoluteAssetUrl, buildAbsolutePageUrl, isNoIndexBuild, siteConfig } from '../siteConfig';
import { defaultSeoImagePath } from '../seo';

const upsertMetaTag = (selector, attributes, content) => {
  let tag = document.head.querySelector(selector);

  if (!tag) {
    tag = document.createElement('meta');
    Object.entries(attributes).forEach(([key, value]) => {
      tag.setAttribute(key, value);
    });
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', content);
};

const upsertLinkTag = (rel, href) => {
  let tag = document.head.querySelector(`link[rel="${rel}"]`);

  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }

  tag.setAttribute('href', href);
};

const removeMetaTag = (selector) => {
  const tag = document.head.querySelector(selector);
  if (tag) {
    tag.remove();
  }
};

const removeManagedJsonLd = () => {
  document
    .querySelectorAll('script[type="application/ld+json"][data-seo-managed="true"]')
    .forEach((script) => script.remove());
};

const appendStructuredData = (schemaEntries) => {
  schemaEntries.filter(Boolean).forEach((entry) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo-managed', 'true');
    script.textContent = JSON.stringify(entry);
    document.head.appendChild(script);
  });
};

const PageSeo = ({
  title,
  description,
  path,
  imagePath = defaultSeoImagePath,
  imageAlt,
  type = 'website',
  robots,
  publishedTime,
  modifiedTime,
  structuredData = [],
}) => {
  const location = useLocation();

  useEffect(() => {
    const resolvedPath = path || location.pathname || '/';
    const canonicalUrl = buildAbsolutePageUrl(resolvedPath);
    const imageUrl = buildAbsoluteAssetUrl(imagePath);
    const robotsContent = robots || (isNoIndexBuild() ? 'noindex, nofollow' : 'index, follow');

    document.title = title;
    upsertMetaTag('meta[name="description"]', { name: 'description' }, description);
    upsertMetaTag('meta[name="robots"]', { name: 'robots' }, robotsContent);
    upsertMetaTag('meta[property="og:title"]', { property: 'og:title' }, title);
    upsertMetaTag('meta[property="og:description"]', { property: 'og:description' }, description);
    upsertMetaTag('meta[property="og:type"]', { property: 'og:type' }, type);
    upsertMetaTag('meta[property="og:url"]', { property: 'og:url' }, canonicalUrl);
    upsertMetaTag(
      'meta[property="og:site_name"]',
      { property: 'og:site_name' },
      siteConfig.legalName,
    );
    upsertMetaTag('meta[property="og:locale"]', { property: 'og:locale' }, 'en_US');
    upsertMetaTag('meta[property="og:image"]', { property: 'og:image' }, imageUrl);
    upsertMetaTag('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image');
    upsertMetaTag('meta[name="twitter:title"]', { name: 'twitter:title' }, title);
    upsertMetaTag('meta[name="twitter:description"]', { name: 'twitter:description' }, description);
    upsertMetaTag('meta[name="twitter:image"]', { name: 'twitter:image' }, imageUrl);

    if (imageAlt) {
      upsertMetaTag('meta[property="og:image:alt"]', { property: 'og:image:alt' }, imageAlt);
      upsertMetaTag('meta[name="twitter:image:alt"]', { name: 'twitter:image:alt' }, imageAlt);
    } else {
      removeMetaTag('meta[property="og:image:alt"]');
      removeMetaTag('meta[name="twitter:image:alt"]');
    }

    if (type === 'article' && publishedTime) {
      upsertMetaTag(
        'meta[property="article:published_time"]',
        { property: 'article:published_time' },
        publishedTime,
      );
    } else {
      removeMetaTag('meta[property="article:published_time"]');
    }

    if (type === 'article' && modifiedTime) {
      upsertMetaTag(
        'meta[property="article:modified_time"]',
        { property: 'article:modified_time' },
        modifiedTime,
      );
    } else {
      removeMetaTag('meta[property="article:modified_time"]');
    }

    upsertLinkTag('canonical', canonicalUrl);
    removeManagedJsonLd();
    appendStructuredData(structuredData);
  }, [
    description,
    imageAlt,
    imagePath,
    location.pathname,
    modifiedTime,
    path,
    publishedTime,
    robots,
    structuredData,
    title,
    type,
  ]);

  return null;
};

export default PageSeo;
