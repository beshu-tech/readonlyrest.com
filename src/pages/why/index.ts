import type { IconName } from '@/components/Icon';

/**
 * Registry of /why/* use-case landing pages.
 *
 * Single source of truth: consumed by the nav "Use cases" dropdown, the
 * home page Use cases section (with topic filter), the footer column,
 * and the sitemap. Keep slugs URL-stable once shipped — they're in the
 * sitemap and likely in Google's index.
 */

/**
 * Narrow, hand-curated topic set. Kept short so the filter bar reads at
 * a glance and every topic has at least two cards (otherwise filtering
 * by it returns a single item, which is more confusing than useful).
 */
export const TOPICS = [
  'Cost savings',
  'Identity',
  'Access control',
  'Multi-tenancy',
  'Compliance',
  'Architecture',
] as const;

export type Topic = (typeof TOPICS)[number];

export interface UseCase {
  /** URL slug under /why/. */
  slug: string;
  /** Long title, used in H1 and <title>. */
  title: string;
  /** Short label for nav/footer where space is tight. */
  shortLabel: string;
  /** One-sentence blurb for home page cards. */
  blurb: string;
  /** Icon shown on the home page card. */
  icon: IconName;
  /** Accent color (hex) used by the home card + its landing-page hero. */
  color: string;
  /** Short tag text displayed on the home card pill. */
  tag: string;
  /** Topics used by the home page filter. Each card should carry 1-3. */
  topics: readonly Topic[];
}

export const USE_CASES: readonly UseCase[] = [
  {
    slug: 'sso-without-platinum',
    title: 'SSO without Platinum',
    shortLabel: 'SSO without Platinum',
    blurb:
      'SAML, OIDC, LDAP and Active Directory on any Elastic tier — including Basic.',
    icon: 'key',
    color: '#0b847a',
    tag: 'Identity',
    topics: ['Cost savings', 'Identity'],
  },
  {
    slug: 'fls-dls-without-platinum',
    title: 'Field & document security without Platinum',
    shortLabel: 'FLS/DLS without Platinum',
    blurb:
      'Index, field and document-level access control without upgrading the cluster.',
    icon: 'lock',
    color: '#ec407a',
    tag: 'Access control',
    topics: ['Cost savings', 'Access control', 'Compliance'],
  },
  {
    slug: 'secure-kibana-embeds',
    title: 'Secure Kibana dashboard embeds',
    shortLabel: 'Secure Kibana embeds',
    blurb:
      'Embed dashboards in your app with per-user data via JWT — no shared passwords, no proxies.',
    icon: 'eye-off',
    color: '#4f46e5',
    tag: 'SaaS embedding',
    topics: ['Multi-tenancy', 'Architecture'],
  },
  {
    slug: 'platinum-on-basic-cloud',
    title: 'Platinum features on basic Elastic Cloud',
    shortLabel: 'Platinum on basic Cloud',
    blurb:
      'Keep data in the cheapest Elastic Cloud tier; enforce enterprise auth in a ReadonlyREST sidecar.',
    icon: 'cloud',
    color: '#2563eb',
    tag: 'Architecture',
    topics: ['Cost savings', 'Architecture'],
  },
  {
    slug: 'audit-compliance',
    title: 'Audit logs for SOC2, HIPAA and PCI',
    shortLabel: 'Audit compliance',
    blurb:
      'Ship every Elasticsearch access event off-cluster — ECS-formatted, per-user, per-rule, with zero bolt-on tooling.',
    icon: 'award',
    color: '#f59e0b',
    tag: 'Compliance',
    topics: ['Compliance', 'Access control'],
  },
  {
    slug: 'devsecops-acl-testing',
    title: 'Test access control before production',
    shortLabel: 'Testable ACL',
    blurb:
      'Impersonate any user, mock your IdP, sandbox new rules — validate ACL changes in CI, not in incidents.',
    icon: 'git',
    color: '#10b981',
    tag: 'DevOps',
    topics: ['Access control', 'Identity'],
  },
];
