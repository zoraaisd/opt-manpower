import { Helmet } from 'react-helmet-async';

type SeoHeadProps = {
  title: string;
  description: string;
  keywords?: string | null;
  canonical_url?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  og_image?: string | null;
  type?: 'website' | 'article';
};

export const SeoHead = ({
  title,
  description,
  keywords,
  canonical_url,
  og_title,
  og_description,
  og_image,
  type = 'website',
}: SeoHeadProps) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    {keywords ? <meta name="keywords" content={keywords} /> : null}
    <meta name="robots" content="index,follow" />
    {canonical_url ? <link rel="canonical" href={canonical_url} /> : null}
    <meta property="og:type" content={type} />
    <meta property="og:title" content={og_title ?? title} />
    <meta property="og:description" content={og_description ?? description} />
    {canonical_url ? <meta property="og:url" content={canonical_url} /> : null}
    {og_image ? <meta property="og:image" content={og_image} /> : null}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={og_title ?? title} />
    <meta name="twitter:description" content={og_description ?? description} />
    {og_image ? <meta name="twitter:image" content={og_image} /> : null}
  </Helmet>
);
