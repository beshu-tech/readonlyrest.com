import { createElement as h, type ReactNode } from 'react';
import type { UseCasePageProps } from '@/components/usecase/UseCasePage';
import type { FaqPair } from '@/seo/schema';

const hero = {
  img: '/images/testable-acl.png',
  alt: 'Field and document-level access-control rules in ReadonlyREST',
};

const problemBody: ReactNode = h(
  'p',
  null,
  'Field-level security (FLS) and document-level security (DLS) are the ',
  'reason most teams buy Platinum. Masking PII columns, filtering rows by ',
  'tenant \u2014 this is compliance work, not a nice-to-have. Paying a ',
  'per-cluster tier-up for two rules in an access-control config is a ',
  'bad trade.',
);

const solutionBody: ReactNode = h(
  'p',
  null,
  'ReadonlyREST ships full index, field and document-level security at the ',
  'free tier of the plugin. Rules are declarative, versionable, and ',
  'testable \u2014 you keep them in Git next to the rest of your infra.',
);

const faq: { q: string; a: ReactNode }[] = [
  {
    q: 'Is FLS available in the free Elasticsearch plugin?',
    a: 'Yes. Index, field and document-level security are in the GPLv3 Elasticsearch plugin \u2014 no subscription required for the ES-side plugin.',
  },
  {
    q: 'How do I hide specific fields from a group?',
    a: h(
      'span',
      null,
      'Use the ',
      h('code', { className: 'inline-code' }, 'fields'),
      ' rule on an ACL block. Positive list (whitelist) or negative list (blacklist) per user or group.',
    ),
  },
  {
    q: 'Does document-level filtering work with search aggregations?',
    a: 'Yes. The DLS filter is applied at query-rewrite time, so aggregations, terms queries and search-after all respect the row filter.',
  },
  {
    q: 'Can I test ACL rules without a live cluster?',
    a: 'The ACL is testable with HTTP headers \u2014 impersonate any user or group in a unit test and assert which documents come back. No dummy LDAP server required.',
  },
];

const faqPlain: readonly FaqPair[] = [
  {
    q: 'Is FLS available in the free Elasticsearch plugin?',
    a: 'Yes. Index, field and document-level security are in the GPLv3 Elasticsearch plugin.',
  },
  {
    q: 'How do I hide specific fields from a group?',
    a: 'Use the fields rule on an ACL block. Positive list or negative list per user or group.',
  },
  {
    q: 'Does document-level filtering work with search aggregations?',
    a: 'Yes. The DLS filter is applied at query-rewrite time, so aggregations, terms queries and search-after all respect the row filter.',
  },
  {
    q: 'Can I test ACL rules without a live cluster?',
    a: 'The ACL is testable with HTTP headers. Impersonate any user or group in a unit test and assert which documents come back.',
  },
];

export const FLS_DLS_DATA: UseCasePageProps = {
  slug: 'fls-dls-without-platinum',
  title: 'Field & document security without Platinum',
  seoTitle:
    'Field-level and document-level security for Elasticsearch without Platinum',
  seoDescription:
    'Mask PII fields, filter rows per tenant, version your rules in Git \u2014 FLS and DLS on any Elasticsearch tier with ReadonlyREST.',
  eyebrow: 'No Platinum required',
  subheading:
    'Index, field and document-level access control on Basic, Gold or OSS. Declarative rules, versionable, testable in CI.',
  heroImage: hero.img,
  heroImageAlt: hero.alt,
  palette: {
    primary: '#ec407a',
    secondary: '#0b847a',
    accent: '#0b847a',
  },
  tierBadges: ['Basic', 'Gold', 'Platinum', 'OSS'],
  vs: {
    withoutLabel: 'Without ReadonlyREST',
    withLabel: 'With ReadonlyREST',
    rows: [
      { label: 'Field masking', without: 'Platinum only', with: 'Free tier of the ES plugin' },
      { label: 'Document filter', without: 'Platinum only', with: 'Template vars on any tier' },
      { label: 'Review workflow', without: 'Opaque role mappings', with: 'YAML in Git, testable in CI' },
      { label: 'Tenant creation', without: 'Spin up a new cluster', with: 'One line, one second' },
    ],
  },
  problem: {
    title: 'Compliance shouldn\u2019t require a tier upgrade.',
    body: problemBody,
    bullets: [
      'Platinum pricing is per cluster \u2014 one rule to mask an email column costs the same as the rest of the bundle combined.',
      'Application-level filtering (in your API, not Elasticsearch) leaks raw documents to anyone who can hit the cluster directly.',
      'Hand-rolled proxies reimplement half of Elasticsearch\u2019s query parser and drift out of sync.',
    ],
  },
  solution: {
    title: 'Full ACL in the plugin, not the license.',
    body: solutionBody,
    points: [
      {
        icon: 'layers',
        title: 'Index-level',
        body: 'Which indices a group can read, write, or manage.',
      },
      {
        icon: 'eye-off',
        title: 'Field-level',
        body: 'Include or exclude specific fields per user or group.',
      },
      {
        icon: 'lock',
        title: 'Document-level',
        body: 'Row filter applied before the query runs, with template variables.',
      },
      {
        icon: 'git',
        title: 'Testable',
        body: 'ACL rules are plain YAML. Version them in Git, unit-test them with curl.',
      },
    ],
  },
  features: [
    {
      icon: 'lock',
      title: 'Index, field and document-level rules in one file',
      image: '/images/testable-acl.png',
      imageAlt: 'ReadonlyREST ACL rules in a YAML file',
      body: h(
        'p',
        null,
        'One readable YAML block declares what a group can see. No nested JSON, no scattered aliases, no role-mapping tables.',
      ),
      cta: {
        label: 'Elasticsearch plugin docs',
        href: 'https://docs.readonlyrest.com/elasticsearch',
      },
    },
    {
      icon: 'git',
      title: 'Test your ACL in CI',
      image: '/images/testable-acl.png',
      imageAlt: 'Testing the ACL with HTTP headers',
      body: h(
        'p',
        null,
        'Impersonate users via HTTP headers. Mock LDAP responses in the impersonation GUI. Assert on what documents come back from a real Elasticsearch \u2014 no dummy IdP, no fake data.',
      ),
      cta: {
        label: 'Impersonation docs',
        href: 'https://docs.readonlyrest.com/kibana/impersonation',
      },
    },
    {
      icon: 'layers',
      title: 'Multi-tenant filters without a new cluster',
      image: '/images/data-segregation.png',
      imageAlt: 'Data segregation across tenants in one Elasticsearch cluster',
      body: h(
        'p',
        null,
        'Template variables in DLS filters (',
        h('code', { className: 'inline-code' }, '@{jwt:tenant}'),
        ') let the same dashboard show different data to different users. Creating a tenancy takes one second.',
      ),
      cta: {
        label: 'Multi-tenancy guide',
        href: 'https://docs.readonlyrest.com/examples/multitenancy_guide',
      },
    },
    {
      icon: 'award',
      title: 'Audit every field-level decision',
      image: '/images/kibana-audit-monitoring.png',
      imageAlt: 'Audit logs with ACL decision per request',
      body: h(
        'p',
        null,
        'Every request logs which ACL block matched, which fields were stripped, and which documents the DLS filter removed. Compliance evidence on demand.',
      ),
    },
  ],
  faq,
  faqPlain,
  keywords:
    'Elasticsearch FLS, Elasticsearch DLS, field-level security, document-level security, Elasticsearch without Platinum, ReadonlyREST ACL',
};
