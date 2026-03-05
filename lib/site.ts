const FALLBACK_SITE_URL = 'https://brokenarrowoutdoors.com';

function normalizeBaseUrl(raw?: string) {
  if (!raw) return FALLBACK_SITE_URL;
  const trimmed = raw.trim();
  if (!trimmed) return FALLBACK_SITE_URL;
  if (/^https?:\/\//i.test(trimmed)) return trimmed.replace(/\/+$/, '');
  return `https://${trimmed.replace(/\/+$/, '')}`;
}

export function getBaseUrl() {
  return normalizeBaseUrl(process.env.NEXT_PUBLIC_SITE_URL);
}

export function toAbsoluteUrl(pathOrUrl: string) {
  if (!pathOrUrl) return getBaseUrl();
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const base = getBaseUrl();
  return `${base}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`;
}

