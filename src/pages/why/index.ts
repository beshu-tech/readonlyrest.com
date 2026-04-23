import type { IconName } from '@/components/Icon';

/**
 * Registry of /why/* use-case landing pages.
 *
 * Single source of truth: consumed by the nav "Use cases" dropdown, the
 * home page Use cases section, the footer column, and the sitemap.
 * Keep slugs URL-stable once shipped — they're in the sitemap and likely
 * in Google's index.
 */
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
}

export const USE_CASES: readonly UseCase[] = [
  {
    slug: 'sso-without-platinum',
    title: 'SSO without Platinum',
    shortLabel: 'SSO without Platinum',
    blurb:
      'SAML, OIDC, LDAP and Kerberos on any Elastic tier — including Basic.',
    icon: 'key',
  },
  {
    slug: 'fls-dls-without-platinum',
    title: 'Field & document security without Platinum',
    shortLabel: 'FLS/DLS without Platinum',
    blurb:
      'Index, field and document-level access control without upgrading the cluster.',
    icon: 'lock',
  },
  {
    slug: 'secure-kibana-embeds',
    title: 'Secure Kibana dashboard embeds',
    shortLabel: 'Secure Kibana embeds',
    blurb:
      'Embed dashboards in your app with per-user data via JWT — no shared passwords, no proxies.',
    icon: 'eye-off',
  },
  {
    slug: 'platinum-on-basic-cloud',
    title: 'Platinum features on basic Elastic Cloud',
    shortLabel: 'Platinum on basic Cloud',
    blurb:
      'Keep data in the cheapest Elastic Cloud tier; enforce enterprise auth in a ReadonlyREST sidecar.',
    icon: 'cloud',
  },
];
