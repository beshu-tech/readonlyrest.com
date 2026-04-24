/**
 * Centralised SEO metadata for every route in the site.
 *
 * Consumed by:
 *  - The `<Seo>` component (runtime, after hydration).
 *  - The prerender plugin (build time, injected into static HTML).
 *
 * Keeping this in one place guarantees crawlers and share-card scrapers
 * that don't run JS see the correct `<title>`, description, canonical,
 * OG tags and JSON-LD — not the homepage defaults.
 */

import { HOME_ALL_FAQ } from './faqContent';
import {
  DEFAULT_OG_IMAGE,
  LOGO_URL,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  SOCIAL,
  abs,
  breadcrumbSchema,
  faqSchema,
  organizationSchema,
  reviewSchema,
  softwareApplicationSchema,
  webPageSchema,
  websiteSchema,
  type Crumb,
  type FaqPair,
} from './schema';
import { SSO_WITHOUT_PLATINUM_DATA } from '@/pages/why/SsoWithoutPlatinum.data';
import { FLS_DLS_DATA } from '@/pages/why/FlsDlsWithoutPlatinum.data';
import { SECURE_KIBANA_EMBEDS_DATA } from '@/pages/why/SecureKibanaEmbeds.data';
import { PLATINUM_ON_BASIC_CLOUD_DATA } from '@/pages/why/PlatinumOnBasicCloud.data';
import { AUDIT_COMPLIANCE_DATA } from '@/pages/why/AuditCompliance.data';
import { DEVSECOPS_ACL_TESTING_DATA } from '@/pages/why/DevSecOpsAclTesting.data';
import { FIPS_COMPLIANCE_DATA } from '@/pages/why/FipsCompliance.data';
import { PRIVACY_DATA } from '@/pages/legal/Privacy.data';
import { TERMS_DATA } from '@/pages/legal/Terms.data';

export interface RouteMeta {
  /** URL path, starts with `/`. */
  path: string;
  /** `<title>` tag. Already brand-suffixed as needed. */
  title: string;
  /** Meta description, 120–160 chars ideal. */
  description: string;
  /** Absolute or root-relative image for OG/Twitter card. */
  image: string;
  /** Alt text for the OG image. */
  imageAlt: string;
  /** Comma-separated keywords, optional. Low SEO weight but harmless. */
  keywords?: string;
  /** Block indexing — use for stage/preview routes. */
  noindex?: boolean;
  /** JSON-LD blocks to emit. Plain objects — serialised at consumption time. */
  jsonLd: readonly unknown[];
}

const HOME_TITLE =
  'ReadonlyREST — Security & multi-tenancy for Elasticsearch and Kibana';
const HOME_DESCRIPTION =
  'Pure Elasticsearch and Kibana with authentication, authorization, audit and multi-tenancy. Fit 1000+ tenants in one cluster. Free four-week trial.';

const DOWNLOAD_TITLE =
  'Download ReadonlyREST — free Elasticsearch & Kibana security plugin';
const DOWNLOAD_DESCRIPTION =
  'Self-serve download for the ReadonlyREST plugin for Elasticsearch and Kibana. Signed builds, installation guides, changelog and support links.';

const DOWNLOAD_FAQ: readonly FaqPair[] = [
  {
    q: 'Which Elastic stack versions are supported?',
    a: 'Elasticsearch >= 6.0.0 and Kibana >= 7.9.0 are supported on the public builds. Older Kibana builds are available to paying customers on request.',
  },
  {
    q: "What's in each download?",
    a: 'A signed plugin ZIP ready to install with elasticsearch-plugin install or kibana-plugin install, plus SHA checksums.',
  },
  {
    q: 'Do I need an activation key?',
    a: 'The Free edition does not. PRO and Enterprise features unlock with a trial activation key.',
  },
  {
    q: "Kibana and Elasticsearch versions don't match?",
    a: 'Plugin versions must match the Kibana or Elasticsearch version exactly. Use our universal Kibana plugin to decouple plugin version from Kibana version.',
  },
];

const homeBreadcrumbs: readonly Crumb[] = [{ name: 'Home', url: '/' }];

const homeJsonLd: readonly unknown[] = [
  organizationSchema(),
  websiteSchema(),
  softwareApplicationSchema(),
  webPageSchema({
    url: '/',
    name: HOME_TITLE,
    description: HOME_DESCRIPTION,
    image: '/images/hero-deer.png',
    breadcrumbs: homeBreadcrumbs,
  }),
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${SITE_URL}/#product-reviews`,
    name: 'ReadonlyREST for Elasticsearch and Kibana',
    image: abs('/images/hero-deer.png'),
    description:
      'Enterprise security plugin for the Elastic stack — authentication, authorization, audit and multi-tenancy.',
    brand: { '@type': 'Brand', name: SITE_NAME },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '3',
      bestRating: '5',
    },
    review: [
      reviewSchema({
        body: 'ReadonlyREST gave us proper multi-tenancy in Kibana — hundreds of teams, one cluster, no surprises.',
        author: 'Frédéric',
        organization: 'Research Institution',
      }),
      reviewSchema({
        body: 'Install was an afternoon. LDAP-backed access control across every index, documented and testable.',
        author: 'Justin',
        organization: 'Fortune 500 Bank',
      }),
      reviewSchema({
        body: 'Support is the people who wrote the code. Every ticket landed with a real answer.',
        author: 'Pierre',
        organization: 'Public Sector',
      }),
    ],
  },
  faqSchema(HOME_ALL_FAQ),
];

const downloadBreadcrumbs: readonly Crumb[] = [
  { name: 'Home', url: '/' },
  { name: 'Download', url: '/download' },
];

const downloadJsonLd: readonly unknown[] = [
  organizationSchema(),
  websiteSchema(),
  softwareApplicationSchema(),
  webPageSchema({
    url: '/download',
    name: DOWNLOAD_TITLE,
    description: DOWNLOAD_DESCRIPTION,
    image: '/images/download-hero-banner.png',
    breadcrumbs: downloadBreadcrumbs,
    mainEntityFaqs: DOWNLOAD_FAQ,
  }),
  breadcrumbSchema(downloadBreadcrumbs),
];

/**
 * Build JSON-LD for a /why/* use-case page.
 */
function useCaseJsonLd(data: {
  path: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  heroImage: string;
  faqPlain: readonly FaqPair[];
}): readonly unknown[] {
  const crumbs: readonly Crumb[] = [
    { name: 'Home', url: '/' },
    { name: 'Use cases', url: '/#use-cases' },
    { name: data.title, url: data.path },
  ];
  return [
    organizationSchema(),
    websiteSchema(),
    softwareApplicationSchema(),
    webPageSchema({
      url: data.path,
      name: data.seoTitle,
      description: data.seoDescription,
      image: data.heroImage,
      breadcrumbs: crumbs,
      mainEntityFaqs: data.faqPlain,
    }),
    breadcrumbSchema(crumbs),
    faqSchema(data.faqPlain),
  ];
}

export const ROUTES: readonly RouteMeta[] = [
  {
    path: '/',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    image: '/images/hero-deer.png',
    imageAlt:
      'ReadonlyREST — a deer standing alert, symbolizing vigilant Elasticsearch security',
    keywords:
      'Elasticsearch security, Kibana security, Elastic stack authentication, LDAP, SAML, Kibana multi-tenancy, ReadonlyREST, ECK security, Elasticsearch plugin',
    jsonLd: homeJsonLd,
  },
  {
    path: '/download',
    title: DOWNLOAD_TITLE,
    description: DOWNLOAD_DESCRIPTION,
    image: '/images/download-hero-banner.png',
    imageAlt: 'Download ReadonlyREST — a deer in a forest, brand hero',
    keywords:
      'ReadonlyREST download, Elasticsearch plugin download, Kibana plugin download, free Elasticsearch security, ROR plugin',
    jsonLd: downloadJsonLd,
  },
  ...[
    SSO_WITHOUT_PLATINUM_DATA,
    FLS_DLS_DATA,
    SECURE_KIBANA_EMBEDS_DATA,
    PLATINUM_ON_BASIC_CLOUD_DATA,
    AUDIT_COMPLIANCE_DATA,
    DEVSECOPS_ACL_TESTING_DATA,
    FIPS_COMPLIANCE_DATA,
  ].map<RouteMeta>((d) => {
    const path = `/why/${d.slug}`;
    const meta: RouteMeta = {
      path,
      title: d.seoTitle,
      description: d.seoDescription,
      image: d.heroImage,
      imageAlt: d.heroImageAlt,
      jsonLd: useCaseJsonLd({
        path,
        title: d.title,
        seoTitle: d.seoTitle,
        seoDescription: d.seoDescription,
        heroImage: d.heroImage,
        faqPlain: d.faqPlain,
      }),
    };
    if (d.keywords !== undefined) {
      meta.keywords = d.keywords;
    }
    return meta;
  }),
  ...[PRIVACY_DATA, TERMS_DATA].map<RouteMeta>((d) => ({
    path: d.path,
    title: d.seoTitle,
    description: d.seoDescription,
    image: '/images/hero-deer.png',
    imageAlt: 'ReadonlyREST — security for Elasticsearch and Kibana',
    jsonLd: [
      organizationSchema(),
      websiteSchema(),
      webPageSchema({
        url: d.path,
        name: d.seoTitle,
        description: d.seoDescription,
        breadcrumbs: [
          { name: 'Home', url: '/' },
          { name: d.title, url: d.path },
        ],
      }),
    ],
  })),
];

export function findRoute(path: string): RouteMeta | undefined {
  return ROUTES.find((r) => r.path === path);
}

/**
 * HTML-escape a string for safe interpolation into a `content="…"` attribute.
 */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Escape a JSON-LD block's string body. Prevents `</script>` early termination.
 */
function jsonLdSafe(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, '\\u003c');
}

/**
 * Render the `<head>`-injected SEO block for a given route — the raw HTML
 * string that gets baked into `dist/<path>/index.html` at build time.
 *
 * Stays in sync with what `<Seo>` produces at runtime, but runs without
 * React so the prerender plugin can call it from Node.
 */
export function renderRouteHead(meta: RouteMeta): string {
  const url = abs(meta.path);
  const image = meta.image.startsWith('http') ? meta.image : abs(meta.image);
  const robots = meta.noindex
    ? 'noindex, nofollow'
    : 'index, follow, max-image-preview:large, max-snippet:-1';

  // Every emitted tag carries `data-prerendered-seo` so the runtime can
  // strip them before Helmet takes over. Otherwise each route would serve
  // duplicate <title>/<meta>/<script> elements after hydration — messy in
  // the DOM and confusing for anyone inspecting the live page.
  const attr = 'data-prerendered-seo';
  const parts: string[] = [
    `<title ${attr}>${escapeHtml(meta.title)}</title>`,
    `<meta ${attr} name="description" content="${escapeHtml(meta.description)}">`,
  ];
  if (meta.keywords) {
    parts.push(
      `<meta ${attr} name="keywords" content="${escapeHtml(meta.keywords)}">`,
    );
  }
  parts.push(
    `<link ${attr} rel="canonical" href="${escapeHtml(url)}">`,
    `<meta ${attr} name="robots" content="${robots}">`,
    `<meta ${attr} property="og:type" content="website">`,
    `<meta ${attr} property="og:site_name" content="${escapeHtml(SITE_NAME)}">`,
    `<meta ${attr} property="og:url" content="${escapeHtml(url)}">`,
    `<meta ${attr} property="og:title" content="${escapeHtml(meta.title)}">`,
    `<meta ${attr} property="og:description" content="${escapeHtml(meta.description)}">`,
    `<meta ${attr} property="og:image" content="${escapeHtml(image)}">`,
    `<meta ${attr} property="og:image:alt" content="${escapeHtml(meta.imageAlt)}">`,
    `<meta ${attr} property="og:image:width" content="1200">`,
    `<meta ${attr} property="og:image:height" content="630">`,
    `<meta ${attr} property="og:locale" content="en_US">`,
    `<meta ${attr} name="twitter:card" content="summary_large_image">`,
    `<meta ${attr} name="twitter:site" content="@readonlyrest">`,
    `<meta ${attr} name="twitter:creator" content="@readonlyrest">`,
    `<meta ${attr} name="twitter:url" content="${escapeHtml(url)}">`,
    `<meta ${attr} name="twitter:title" content="${escapeHtml(meta.title)}">`,
    `<meta ${attr} name="twitter:description" content="${escapeHtml(meta.description)}">`,
    `<meta ${attr} name="twitter:image" content="${escapeHtml(image)}">`,
    `<meta ${attr} name="twitter:image:alt" content="${escapeHtml(meta.imageAlt)}">`,
    `<link ${attr} rel="alternate" hreflang="en" href="${escapeHtml(url)}">`,
    `<link ${attr} rel="alternate" hreflang="x-default" href="${escapeHtml(SITE_URL)}">`,
  );
  for (const block of meta.jsonLd) {
    parts.push(
      `<script ${attr} type="application/ld+json">${jsonLdSafe(block)}</script>`,
    );
  }
  return parts.join('\n    ');
}

// Silence "declared but its value is never read" when DEFAULT_OG_IMAGE / LOGO_URL /
// SITE_TAGLINE / SOCIAL are not referenced in this module's output. They're
// still part of the public schema.ts surface.
void DEFAULT_OG_IMAGE;
void LOGO_URL;
void SITE_TAGLINE;
void SOCIAL;
