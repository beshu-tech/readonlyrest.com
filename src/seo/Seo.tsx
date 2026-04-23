import { Helmet } from 'react-helmet-async';
import {
  SITE_NAME,
  SITE_URL,
  DEFAULT_OG_IMAGE,
  abs,
  jsonld,
} from './schema';

export interface SeoProps {
  /** Full title. Will NOT be suffixed with the brand — pass the final version. */
  title: string;
  /** 120–160 chars is ideal. */
  description: string;
  /** Project-relative path, e.g. "/" or "/download". */
  path: string;
  /** Override the social image. Absolute or project-relative. */
  image?: string;
  /** Override OG image alt text. */
  imageAlt?: string;
  /** "article" | "website" | "product". Default: "website". */
  ogType?: string;
  /** Keywords — comma-separated. Low weight, but harmless. */
  keywords?: string;
  /** Author name for `article` pages (blog posts). */
  author?: string;
  /** Block indexing — stage/private pages. */
  noindex?: boolean;
  /** JSON-LD blocks to emit. */
  jsonLd?: readonly unknown[];
}

/**
 * Single source of truth for head tags. Every page renders `<Seo ... />`
 * instead of hand-rolling <meta> tags.
 */
export default function Seo(props: SeoProps) {
  const {
    title,
    description,
    path,
    image,
    imageAlt = 'ReadonlyREST — security and multi-tenancy for the Elastic stack',
    ogType = 'website',
    keywords,
    author,
    noindex = false,
    jsonLd = [],
  } = props;

  const url = abs(path);
  const imageUrl = image ? abs(image) : DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}
      <link rel="canonical" href={url} />

      <meta
        name="robots"
        content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1'}
      />

      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@readonlyrest" />
      <meta name="twitter:creator" content="@readonlyrest" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={imageAlt} />

      <link rel="alternate" hrefLang="en" href={url} />
      <link rel="alternate" hrefLang="x-default" href={SITE_URL} />

      {jsonLd.map((block, i) => (
        <script key={i} type="application/ld+json">
          {jsonld(block)}
        </script>
      ))}
    </Helmet>
  );
}
