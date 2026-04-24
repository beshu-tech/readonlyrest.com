import { createElement as h, type ReactNode } from 'react';
import type { UseCasePageProps } from '@/components/usecase/UseCasePage';
import type { FaqPair } from '@/seo/schema';

const hero = {
  img: '/images/kibana-audit-monitoring.png',
  alt: 'ReadonlyREST audit dashboard in Kibana showing per-user access events',
};

const problemBody: ReactNode = h(
  'p',
  null,
  'Regulators want to know who saw what, when, and why \u2014 down to the ',
  'individual query. Elastic\u2019s audit log is Platinum-only, routes ',
  'everything to the same indices you\u2019re auditing, and uses a format ',
  'your SIEM probably can\u2019t parse without a custom pipeline.',
);

const solutionBody: ReactNode = h(
  'p',
  null,
  'ReadonlyREST audit is on by default and ships to any destination. ',
  'Every request carries the real user, the rule that matched, the indices ',
  'touched, and the outcome \u2014 serialised as ECS or your own schema, ',
  'written to a dedicated cluster, a data stream with ILM, or a flat file.',
);

const faq: { q: string; a: ReactNode }[] = [
  {
    q: 'Which events are captured?',
    a: 'Every authenticated request: the matched ACL block, user and impersonator identities, groups, queried indices, and response outcome. Failed auth attempts are captured too, with their headers (passwords redacted).',
  },
  {
    q: 'Can I write audit to a different cluster than the one being audited?',
    a: 'Yes. The audit output is configured independently of the cluster ReadonlyREST protects. Most customers send audit to a dedicated hardened cluster so the log and the data it describes never share a failure domain.',
  },
  {
    q: 'What serialisation formats are supported?',
    a: 'JSON (default), ECS 1.6, and a hook for a custom serializer class. Choose the fields you want; drop the ones you don\u2019t for a leaner footprint.',
  },
  {
    q: 'Is audit available in the free edition?',
    a: 'The Elasticsearch plugin ships audit in every edition. Shipping audit to a remote cluster and the Kibana audit dashboard are commercial features.',
  },
];

const faqPlain: readonly FaqPair[] = faq.map((f) => ({
  q: f.q,
  a: typeof f.a === 'string' ? f.a : '(see page for details)',
}));

export const AUDIT_COMPLIANCE_DATA: UseCasePageProps = {
  slug: 'audit-compliance',
  title: 'Audit logs for SOC2, HIPAA and PCI',
  seoTitle:
    'Elasticsearch audit logs for SOC2, HIPAA and PCI \u2014 ReadonlyREST',
  seoDescription:
    'Ship Elasticsearch audit events off-cluster, ECS-serialised, per-user and per-rule. SOC2, HIPAA, PCI-DSS evidence on any Elastic tier.',
  eyebrow: 'Compliance-ready',
  subheading:
    'Every Elasticsearch access event, captured once, shipped anywhere. ECS-serialised, per-user, per-rule \u2014 the evidence your auditors actually ask for.',
  heroImage: hero.img,
  heroImageAlt: hero.alt,
  palette: {
    primary: '#f59e0b',
    secondary: '#ec407a',
    accent: '#f59e0b',
  },
  tierBadges: ['SOC 2', 'HIPAA', 'PCI-DSS', 'ISO 27001'],
  vs: {
    withoutLabel: 'Elastic Platinum audit',
    withLabel: 'ReadonlyREST audit',
    rows: [
      { label: 'License', without: 'Platinum only', with: 'Free tier of the ES plugin' },
      { label: 'Destination', without: 'Same cluster', with: 'Dedicated cluster, data stream, or file' },
      { label: 'Format', without: 'Elastic-specific schema', with: 'ECS, JSON, or custom serialiser' },
      { label: 'Per-rule toggle', without: 'Cluster-wide on/off', with: 'Per ACL block — exclude sensitive auth attempts' },
    ],
  },
  problem: {
    title: 'Audit evidence shouldn\u2019t cost a tier upgrade.',
    body: problemBody,
    bullets: [
      'Platinum-tier audit is priced per node, same as every other Platinum feature \u2014 even if audit is the only thing you actually need.',
      'Audit logs routed to the same cluster you\u2019re auditing are a conflict of interest (and a tamper risk).',
      'Elastic\u2019s audit format doesn\u2019t line up with ECS-native SIEM pipelines without a bespoke ingest processor.',
    ],
  },
  solution: {
    title: 'Audit by default. Shipped anywhere.',
    body: solutionBody,
    points: [
      {
        icon: 'award',
        title: 'Every event captured',
        body: 'Matched ACL block, user, impersonator, groups, indices, outcome \u2014 with single-user granularity.',
      },
      {
        icon: 'ship',
        title: 'Ship to any destination',
        body: 'Dedicated ES cluster, data stream with ILM, or a plain log file on disk. Multiple outputs simultaneously.',
      },
      {
        icon: 'layers',
        title: 'ECS or custom',
        body: 'ECS 1.6 out of the box, or wire in a custom serializer class for bespoke schemas.',
      },
      {
        icon: 'lock',
        title: 'Per-rule granularity',
        body: 'Enable globally or per ACL block. Exclude noisy auth-probe rules without losing coverage elsewhere.',
      },
    ],
  },
  features: [
    {
      icon: 'award',
      title: 'Audit dashboard in Kibana',
      image: '/images/kibana-audit-monitoring.png',
      imageAlt: 'ReadonlyREST audit dashboard showing access events per user',
      body: h(
        'p',
        null,
        'Pre-built Kibana dashboards slice access events by user, rule, index, and outcome \u2014 ready for SOC analysts without a custom Logstash pipeline.',
      ),
      cta: {
        label: 'Audit log docs',
        href: 'https://docs.readonlyrest.com/kibana#audit-log',
      },
    },
    {
      icon: 'ship',
      title: 'Off-cluster shipping',
      image: '/images/data-segregation.png',
      imageAlt: 'Audit events shipped to a separate dedicated cluster',
      body: h(
        'p',
        null,
        'Ship audit events to a dedicated hardened cluster so the log and the data it describes never share a failure domain. Or go old-school: a plain log file that your Fluent Bit / Vector pipeline tails.',
      ),
    },
    {
      icon: 'layers',
      title: 'ECS-native serialisation',
      image: '/images/testable-acl.png',
      imageAlt: 'Elasticsearch ACL audit events serialised in ECS format',
      body: h(
        'p',
        null,
        'ECS 1.6 out of the box. Every field standardised so your SIEM doesn\u2019t need per-source mapping. Custom serializer hook for bespoke schemas.',
      ),
    },
    {
      icon: 'clock',
      title: 'Per-block opt-in',
      image: '/images/reboot-less-settings.png',
      imageAlt: 'Audit toggle per ACL block in the ReadonlyREST config',
      body: h(
        'p',
        null,
        'Enable audit globally or turn it on only for the ACL blocks that matter. Exclude noisy health-probe auth attempts without losing coverage on the blocks your auditors care about.',
      ),
    },
  ],
  faq,
  faqPlain,
  keywords:
    'Elasticsearch audit log, SOC 2 Elasticsearch, HIPAA Elasticsearch, PCI Elasticsearch, ECS audit, off-cluster audit, Kibana audit dashboard',
};
