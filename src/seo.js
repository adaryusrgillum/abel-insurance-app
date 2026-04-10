import { brandAssetPaths } from './assetPaths';
import { buildAbsoluteAssetUrl, buildAbsolutePageUrl, siteConfig } from './siteConfig';

export const defaultSeoImagePath = brandAssetPaths.homeHero;

export const buildBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: buildAbsolutePageUrl(item.path),
  })),
});

export const buildInsuranceAgencySchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'InsuranceAgency',
  name: siteConfig.legalName,
  url: buildAbsolutePageUrl('/'),
  image: buildAbsoluteAssetUrl(defaultSeoImagePath),
  logo: buildAbsoluteAssetUrl(brandAssetPaths.icon),
  description: siteConfig.siteDescription,
  telephone: `+1${siteConfig.phone}`,
  email: siteConfig.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.region,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.country,
  },
  areaServed: siteConfig.serviceArea,
  openingHours: siteConfig.officeHoursSchema,
  sameAs: siteConfig.sameAs,
});

export const buildWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.siteName,
  alternateName: siteConfig.legalName,
  description: siteConfig.siteDescription,
  url: buildAbsolutePageUrl('/'),
  publisher: {
    '@type': 'Organization',
    name: siteConfig.legalName,
    logo: {
      '@type': 'ImageObject',
      url: buildAbsoluteAssetUrl(brandAssetPaths.icon),
    },
  },
});

export const buildServiceSchema = ({ name, description, path, serviceType }) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  description,
  url: buildAbsolutePageUrl(path),
  serviceType,
  areaServed: siteConfig.serviceArea,
  provider: {
    '@type': 'InsuranceAgency',
    name: siteConfig.legalName,
    url: buildAbsolutePageUrl('/'),
  },
});

export const buildBlogSchema = (posts) => ({
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Abel Insurance Blog',
  description:
    'West Virginia insurance articles covering auto, home, flood, and business coverage questions.',
  url: buildAbsolutePageUrl('/blog'),
  publisher: {
    '@type': 'Organization',
    name: siteConfig.legalName,
    logo: {
      '@type': 'ImageObject',
      url: buildAbsoluteAssetUrl(brandAssetPaths.icon),
    },
  },
  blogPost: posts.map((post) => ({
    '@type': 'BlogPosting',
    headline: post.title,
    url: buildAbsolutePageUrl(`/blog/${post.slug}`),
    datePublished: post.publishedTime,
    dateModified: post.modifiedTime,
    description: post.description,
  })),
});

export const buildBlogPostingSchema = (post) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.description,
  image: [buildAbsoluteAssetUrl(post.heroImagePath)],
  datePublished: post.publishedTime,
  dateModified: post.modifiedTime,
  author: {
    '@type': 'Organization',
    name: siteConfig.legalName,
  },
  publisher: {
    '@type': 'Organization',
    name: siteConfig.legalName,
    logo: {
      '@type': 'ImageObject',
      url: buildAbsoluteAssetUrl(brandAssetPaths.icon),
    },
  },
  mainEntityOfPage: buildAbsolutePageUrl(`/blog/${post.slug}`),
  articleSection: post.category,
  keywords: post.keywords.join(', '),
});
