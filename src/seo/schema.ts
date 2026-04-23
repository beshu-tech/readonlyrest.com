/**
 * Centralized JSON-LD (schema.org) builders for SEO.
 *
 * Design notes
 * - One source of truth for URLs, social handles, product data. Pages import
 *   the builders they need and inject the serialized JSON into <Head>.
 * - Builders return plain objects so tests can compare them structurally and
 *   pages can merge additional fields if needed.
 * - All absolute URLs go through `abs()` so we can flip `SITE_URL` if we ever
 *   stage the site on a preview domain.
 */

export const SITE_URL = 'https://readonlyrest.com';
export const SITE_NAME = 'ReadonlyREST';
export const SITE_TAGLINE =
  'Security and multi-tenancy for Elasticsearch and Kibana';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/hero-deer.png`;
export const LOGO_URL = `${SITE_URL}/images/logo.png`;

/**
 * Public social handles, included in Organization `sameAs` for JSON-LD.
 * Only real, reachable profiles — broken URLs in `sameAs` hurt the
 * organisation's knowledge-panel credibility with Google.
 */
export const SOCIAL = {
  github: 'https://github.com/sscarduzio/elasticsearch-readonlyrest-plugin',
  twitter: 'https://twitter.com/readonlyrest',
} as const;

/** Resolve a project-relative path to an absolute URL. */
export const abs = (p: string): string =>
  p.startsWith('http') ? p : `${SITE_URL}${p.startsWith('/') ? p : `/${p}`}`;

/* -------------------------------------------------------------------------- */
/* Organization                                                               */
/* -------------------------------------------------------------------------- */

export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: 'ReadonlyREST Ltd.',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: LOGO_URL,
    width: 512,
    height: 512,
  },
  description:
    'ReadonlyREST builds security and multi-tenancy software for Elasticsearch and Kibana. Authentication, authorization, audit and encryption for the Elastic stack — since 2017.',
  foundingDate: '2017',
  sameAs: [SOCIAL.github, SOCIAL.twitter],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'support@readonlyrest.com',
      url: `${SITE_URL}/contact`,
      availableLanguage: ['English'],
    },
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'sales@readonlyrest.com',
      url: `${SITE_URL}/contact`,
      availableLanguage: ['English'],
    },
  ],
});

/* -------------------------------------------------------------------------- */
/* WebSite (enables Google sitelinks search box)                              */
/* -------------------------------------------------------------------------- */

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_TAGLINE,
  inLanguage: 'en-US',
  publisher: { '@id': `${SITE_URL}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

/* -------------------------------------------------------------------------- */
/* SoftwareApplication — the flagship product                                 */
/* -------------------------------------------------------------------------- */

export const softwareApplicationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': `${SITE_URL}/#product`,
  name: 'ReadonlyREST for Elasticsearch and Kibana',
  alternateName: ['ReadonlyREST', 'ROR'],
  applicationCategory: 'SecurityApplication',
  applicationSubCategory: 'Identity & Access Management',
  operatingSystem: 'Linux, macOS, Windows, Kubernetes, Docker',
  url: SITE_URL,
  downloadUrl: `${SITE_URL}/download`,
  softwareVersion: 'current',
  releaseNotes: 'https://portal.readonlyrest.com/changelog',
  image: DEFAULT_OG_IMAGE,
  description:
    'Elasticsearch and Kibana plugin providing authentication, authorization, audit, encryption and multi-tenancy. Pure Elastic stack — no forks, no proxies.',
  brand: { '@id': `${SITE_URL}/#organization` },
  publisher: { '@id': `${SITE_URL}/#organization` },
  offers: [
    {
      '@type': 'Offer',
      name: 'Free',
      price: '0',
      priceCurrency: 'USD',
      url: `${SITE_URL}/download`,
      availability: 'https://schema.org/InStock',
    },
    {
      '@type': 'Offer',
      name: 'PRO',
      priceCurrency: 'USD',
      url: `${SITE_URL}/pricing`,
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'USD',
        description: 'Annual subscription. See pricing page.',
      },
    },
    {
      '@type': 'Offer',
      name: 'Enterprise',
      priceCurrency: 'USD',
      url: `${SITE_URL}/pricing`,
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'USD',
        description: 'Annual subscription. Contact sales.',
      },
    },
  ],
  featureList: [
    'LDAP, SAML, OpenID Connect, JWT, Kerberos authentication',
    'Index, document and field level security',
    'Kibana multi-tenancy (1000+ tenants per cluster)',
    'Audit logging to any Elasticsearch index or external sink',
    'FIPS-compatible encryption in transit',
    'Kubernetes and Elastic Cloud on Kubernetes (ECK) support',
  ],
});

/* -------------------------------------------------------------------------- */
/* BreadcrumbList                                                             */
/* -------------------------------------------------------------------------- */

export interface Crumb { name: string; url: string }

export const breadcrumbSchema = (trail: readonly Crumb[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: abs(c.url),
  })),
});

/* -------------------------------------------------------------------------- */
/* FAQPage — extract Q&A as plain text for the Google rich result             */
/* -------------------------------------------------------------------------- */

export interface FaqPair { q: string; a: string }

export const faqSchema = (faqs: readonly FaqPair[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.a,
    },
  })),
});

/* -------------------------------------------------------------------------- */
/* Review / AggregateRating                                                   */
/* -------------------------------------------------------------------------- */

export interface ReviewInput {
  body: string;
  author: string;
  /** Org / affiliation shown after the name. */
  organization?: string;
}

export const reviewSchema = (r: ReviewInput) => ({
  '@type': 'Review',
  reviewBody: r.body,
  author: {
    '@type': 'Person',
    name: r.author,
    ...(r.organization ? { affiliation: r.organization } : {}),
  },
  reviewRating: {
    '@type': 'Rating',
    ratingValue: '5',
    bestRating: '5',
  },
});

/* -------------------------------------------------------------------------- */
/* WebPage wrapper — attaches breadcrumbs + primary image to a URL            */
/* -------------------------------------------------------------------------- */

export interface WebPageInput {
  url: string;
  name: string;
  description: string;
  image?: string;
  breadcrumbs?: readonly Crumb[];
  /** Pages that are themselves FAQ — set on the Download page (which has FAQ). */
  mainEntityFaqs?: readonly FaqPair[];
}

export const webPageSchema = (input: WebPageInput) => {
  const page: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${abs(input.url)}#webpage`,
    url: abs(input.url),
    name: input.name,
    description: input.description,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#product` },
    primaryImageOfPage: input.image ? abs(input.image) : DEFAULT_OG_IMAGE,
  };
  if (input.breadcrumbs?.length) {
    page.breadcrumb = breadcrumbSchema(input.breadcrumbs);
  }
  if (input.mainEntityFaqs?.length) {
    page.mainEntity = faqSchema(input.mainEntityFaqs).mainEntity;
  }
  return page;
};

/** Convenience: serialize a JSON-LD block without escaping surprises. */
export const jsonld = (obj: unknown): string =>
  JSON.stringify(obj).replace(/</g, '\\u003c');
