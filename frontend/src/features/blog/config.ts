export const PUBLIC_WEBSITE_SLUG =
  import.meta.env.VITE_PUBLIC_WEBSITE_SLUG ?? 'optimus-manpower';

export const PUBLIC_WEBSITE_ID =
  import.meta.env.VITE_PUBLIC_WEBSITE_ID ?? '4';

export const API_BASE_URL =
  import.meta.env.VITE_BLOG_API_URL ??
  import.meta.env.VITE_PUBLIC_API_BASE_URL ??
  '/api/v1/public';
