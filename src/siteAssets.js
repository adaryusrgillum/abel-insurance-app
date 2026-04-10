import {
  brandAssetPaths,
  carrierBrandLogoPaths,
  homeCarrierLogoPaths,
  siteImagePaths,
} from './assetPaths';

export const toAssetUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

const prefixAssetObject = (value) => {
  if (typeof value === 'string') {
    return toAssetUrl(value);
  }

  if (Array.isArray(value)) {
    return value.map((entry) => prefixAssetObject(entry));
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [key, prefixAssetObject(entry)]),
  );
};

export const brandAssets = prefixAssetObject(brandAssetPaths);
export const siteImages = prefixAssetObject(siteImagePaths);
export const homeCarrierLogos = homeCarrierLogoPaths.map((carrier) => ({
  ...carrier,
  src: toAssetUrl(carrier.src),
}));
export const carrierBrandLogos = Object.fromEntries(
  Object.entries(carrierBrandLogoPaths).map(([name, src]) => [name, toAssetUrl(src)]),
);
