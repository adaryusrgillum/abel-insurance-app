export const siteConfig = {
  siteName: 'Abel Insurance',
  legalName: 'Abel Insurance Group',
  siteDescription:
    'Independent insurance agency in Buckhannon, West Virginia helping clients compare auto, home, flood, business, and life coverage with local guidance.',
  phone: '3048785900',
  phoneDisplay: '304.878.5900',
  faxDisplay: '304.621.6044',
  faxPhone: '3046216044',
  email: 'contact@abelinsgroup.com',
  address: {
    street: '172 S. Kanawha Street',
    city: 'Buckhannon',
    region: 'WV',
    postalCode: '26201',
    country: 'US',
  },
  officeHoursDisplay: '9:00AM - 5:00PM Monday - Friday',
  officeHoursSchema: ['Mo-Fr 09:00-17:00'],
  serviceArea: ['Buckhannon, WV', 'Upshur County, WV', 'West Virginia'],
  licensedStates: ['WV', 'VA', 'MD', 'OH', 'PA', 'KY'],
  sameAs: [
    'https://www.facebook.com/Abel.Ins.Group',
    'https://www.linkedin.com/company/abelinsgroup/',
  ],
};

export const defaultSiteUrl = 'https://www.abelinsgroup.com';

export const getSiteUrl = () => import.meta.env?.VITE_SITE_URL || defaultSiteUrl;

export const getRouterMode = () => import.meta.env?.VITE_ROUTER_MODE || 'browser';

export const isNoIndexBuild = () => import.meta.env?.VITE_NOINDEX === 'true';

const normalizeSiteUrl = (url) => (url.endsWith('/') ? url : `${url}/`);
const normalizePath = (path = '') => path.replace(/^\/+/, '');

export const buildAbsoluteAssetUrl = (path = '') => {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return new URL(normalizePath(path), normalizeSiteUrl(getSiteUrl())).toString();
};

export const buildAbsolutePageUrl = (path = '/') => {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const cleanPath = path === '/' ? '' : normalizePath(path);
  const baseUrl = normalizeSiteUrl(getSiteUrl());

  if (getRouterMode() === 'hash') {
    return cleanPath ? `${baseUrl}#/${cleanPath}` : `${baseUrl}#/`;
  }

  return new URL(cleanPath, baseUrl).toString();
};
