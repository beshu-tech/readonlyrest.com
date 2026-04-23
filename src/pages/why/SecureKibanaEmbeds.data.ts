import { createElement as h, type ReactNode } from 'react';
import type { UseCasePageProps } from '@/components/usecase/UseCasePage';
import type { FaqPair } from '@/seo/schema';

const hero = {
  img: '/images/hide-kibana-apps.png',
  alt: 'Embedded Kibana dashboards with per-user data via JWT',
};

const problemBody: ReactNode = h(
  'p',
  null,
  'You want to ship a Kibana dashboard inside your SaaS product. Every ',
  'customer sees only their own data. No shared passwords. No "impersonate ',
  'this service account" tricks. The Elastic stack doesn\u2019t make this ',
  'easy \u2014 most teams end up with a reverse proxy, a JWT forwarder, and ',
  'a long incident postmortem.',
);

const solutionBody: ReactNode = h(
  'p',
  null,
  'ReadonlyREST supports JWT-in-iframe authentication. Your app mints a ',
  'short-lived token with the tenant identity; the embedded Kibana reads it ',
  'from the URL; ReadonlyREST enforces per-user data access on every ',
  'request. Same embed URL, different data per viewer.',
);

const faq: { q: string; a: ReactNode }[] = [
  {
    q: 'How does the JWT get into the iframe?',
    a: h(
      'span',
      null,
      'Append it to the dashboard URL as a query parameter. ReadonlyREST validates the signature, extracts claims (user, groups, tenant), and uses them in the ACL rules.',
    ),
  },
  {
    q: 'Does the dashboard still work if the JWT expires?',
    a: 'No. That\u2019s the point. Short TTL means a leaked URL stops working in minutes. Refresh by minting a new token on page load.',
  },
  {
    q: 'Can I hide the Kibana chrome \u2014 sidebar, header, navigation?',
    a: h(
      'span',
      null,
      'Yes. Append ',
      h('code', { className: 'inline-code' }, 'embed=true'),
      ' to strip the chrome, and use the PRO plugin\u2019s custom CSS to remove anything Elastic left in.',
    ),
  },
  {
    q: 'Do all users need Elasticsearch accounts?',
    a: 'No. The JWT \u2018is\u2019 the identity. No rows in the .security index, no role mappings to maintain.',
  },
];

const faqPlain: readonly FaqPair[] = [
  {
    q: 'How does the JWT get into the iframe?',
    a: 'Append it to the dashboard URL as a query parameter. ReadonlyREST validates the signature, extracts claims and uses them in the ACL rules.',
  },
  {
    q: 'Does the dashboard still work if the JWT expires?',
    a: 'No. Short TTL means a leaked URL stops working in minutes. Refresh by minting a new token on page load.',
  },
  {
    q: 'Can I hide the Kibana chrome?',
    a: 'Yes. Append embed=true to strip the chrome, and use the PRO plugin custom CSS to remove anything Elastic left in.',
  },
  {
    q: 'Do all users need Elasticsearch accounts?',
    a: 'No. The JWT is the identity. No rows in the .security index, no role mappings to maintain.',
  },
];

export const SECURE_KIBANA_EMBEDS_DATA: UseCasePageProps = {
  slug: 'secure-kibana-embeds',
  title: 'Secure Kibana dashboard embeds',
  seoTitle:
    'Embed Kibana dashboards securely with per-user JWT \u2014 ReadonlyREST',
  seoDescription:
    'Ship Kibana dashboards in your SaaS with per-customer data. JWT-in-iframe authentication, row-level filters, no shared passwords, no proxies.',
  eyebrow: 'SaaS-ready embedding',
  subheading:
    'Drop a Kibana dashboard into your app. Every customer sees only their own data \u2014 JWT-in-iframe, enforced at the plugin layer.',
  heroImage: hero.img,
  heroImageAlt: hero.alt,
  palette: {
    primary: '#4f46e5',
    secondary: '#ec407a',
    accent: '#4f46e5',
  },
  tierBadges: ['SaaS', 'JWT', 'Multi-tenant', 'Any tier'],
  vs: {
    withoutLabel: 'Proxy / shared password',
    withLabel: 'ReadonlyREST JWT',
    rows: [
      { label: 'Identity', without: 'Shared service account', with: 'Per-viewer JWT, short TTL' },
      { label: 'Data isolation', without: 'Application layer only', with: 'Enforced at the Elasticsearch layer' },
      { label: 'Account sprawl', without: 'One ES user per customer', with: 'Zero \u2014 JWT is the identity' },
      { label: 'Leaked URL', without: 'Works forever', with: 'Expires in minutes' },
    ],
  },
  problem: {
    title: 'Shared passwords are not a plan.',
    body: problemBody,
    bullets: [
      'A proxy in front of Kibana leaks raw requests the moment someone bookmarks the URL.',
      'Per-customer clusters don\u2019t scale past a dozen tenants \u2014 and they cost a fortune.',
      'Kibana\u2019s own embedding tutorial assumes Elastic Platinum \u2014 and even then, no tenant isolation.',
    ],
  },
  solution: {
    title: 'Per-viewer identity, per-viewer data.',
    body: solutionBody,
    points: [
      {
        icon: 'key',
        title: 'JWT in the iframe',
        body: 'Mint a short-lived token with tenant claims; embed the dashboard URL; done.',
      },
      {
        icon: 'lock',
        title: 'Per-viewer DLS filter',
        body: '@{jwt:tenant} in the document rule means the same dashboard shows different rows.',
      },
      {
        icon: 'eye-off',
        title: 'Strip the Kibana chrome',
        body: 'embed=true plus custom CSS removes anything that would give away the Elastic UI.',
      },
      {
        icon: 'gauge',
        title: 'No per-user accounts',
        body: 'The JWT carries the identity. No .security rows, no role-mapping sprawl.',
      },
    ],
  },
  features: [
    {
      icon: 'eye-off',
      title: 'Embed dashboards with JWT',
      image: '/images/hide-kibana-apps.png',
      imageAlt: 'Embedded Kibana with custom chrome',
      body: h(
        'p',
        null,
        'Append a signed JWT to the dashboard URL. ReadonlyREST validates it, extracts claims, and routes the request through your ACL.',
      ),
      cta: {
        label: 'Embedding docs',
        href: 'https://docs.readonlyrest.com/kibana#embedding-kibana-dashboard-or-visualization-with-an-iframe-and-jwt-authentication',
      },
    },
    {
      icon: 'layers',
      title: 'One dashboard, many tenants',
      image: '/images/data-segregation.png',
      imageAlt: 'Data segregation per tenant in a shared Kibana',
      body: h(
        'p',
        null,
        'Template variables in the document filter (',
        h('code', { className: 'inline-code' }, '@{jwt:tenant}'),
        ') mean you author the dashboard once. Customers see only their own rows, automatically.',
      ),
      cta: {
        label: 'Multi-user guide',
        href: 'https://docs.readonlyrest.com/examples/multiuser_guide',
      },
    },
    {
      icon: 'layers',
      title: 'Custom branding in Kibana',
      image: '/images/kibana-tweaked-css.png',
      imageAlt: 'Kibana with custom branding applied',
      body: h(
        'p',
        null,
        'Overlay custom CSS and JavaScript to make Kibana blend into your product. Survives Kibana upgrades \u2014 no source-file patches.',
      ),
      cta: {
        label: 'Kibana UI tweaking',
        href: 'https://docs.readonlyrest.com/kibana#kibana-ui-tweaking',
      },
    },
    {
      icon: 'award',
      title: 'Audit every embed session',
      image: '/images/kibana-audit-monitoring.png',
      imageAlt: 'Audit dashboard in Kibana',
      body: h(
        'p',
        null,
        'Each iframe load is a real authenticated request. Every query, every dashboard, every panel \u2014 logged with the JWT identity.',
      ),
    },
  ],
  faq,
  faqPlain,
  keywords:
    'embed Kibana, Kibana iframe, Kibana JWT, multi-tenant Kibana, Kibana SaaS, embedded dashboards, ReadonlyREST',
};
