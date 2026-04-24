import { createElement as h, type ReactNode } from 'react';
import type { UseCasePageProps } from '@/components/usecase/UseCasePage';
import type { FaqPair } from '@/seo/schema';

const hero: { img: string; alt: string } = {
  img: '/images/ldap-saml-auth.png',
  alt: 'SAML, LDAP and OIDC authentication flows to Elasticsearch and Kibana',
};

const problemBody: ReactNode = h(
  'p',
  null,
  'Elastic puts SAML and OIDC behind the Platinum subscription. ',
  'That turns single sign-on — table stakes in any regulated environment — ',
  'into a five- or six-figure annual line item per cluster. For most teams, ',
  'SSO is not the reason they bought Elasticsearch.',
);

const solutionBody: ReactNode = h(
  'p',
  null,
  'ReadonlyREST adds enterprise authentication at the plugin layer, so the ',
  'underlying Elasticsearch license doesn\u2019t matter. One install and your ',
  'existing IdP — Okta, Keycloak, Azure AD, AD FS, plain LDAP — talks to ',
  'Elasticsearch and Kibana directly.',
);

const faq: { q: string; a: ReactNode }[] = [
  {
    q: 'Which SSO protocols are supported?',
    a: h(
      'span',
      null,
      'SAML 2.0, OpenID Connect, JWT, LDAP and Active Directory. Works with ',
      'Okta, Azure AD, Keycloak, Ping, AD FS, OneLogin and any standards-compliant IdP. ',
      'Proxy-delegated and external-HTTP authentication are also supported for non-standard setups.',
    ),
  },
  {
    q: 'Does this require a specific Elastic tier?',
    a: 'No. ReadonlyREST runs on any Elasticsearch \u2265 6.0 — Basic, Gold, Platinum or OSS. The plugin is the auth layer.',
  },
  {
    q: 'Do I need the Kibana plugin too?',
    a: 'Yes, if you use Kibana. The Kibana plugin renders the login screen and handles the SSO redirect. The Elasticsearch plugin enforces the decision on every request.',
  },
  {
    q: 'How do I map IdP groups to Elasticsearch permissions?',
    a: h(
      'span',
      null,
      'Groups from your SAML assertion or LDAP lookup are bound to ReadonlyREST ACL blocks. Index, field and document-level rules reference those groups directly — same config file, same review process.',
    ),
  },
  {
    q: 'Can I run this on Elastic Cloud without touching the main cluster?',
    a: h(
      'span',
      null,
      'Yes \u2014 deploy ROR as a sidecar. A small, data-less Elasticsearch + Kibana cluster runs the SSO layer and queries your Elastic Cloud cluster via Cross-Cluster Search. See ',
      h('a', { href: '/why/platinum-on-basic-cloud' }, 'Platinum features on basic Elastic Cloud'),
      ' for the full pattern.',
    ),
  },
];

const faqPlain: readonly FaqPair[] = [
  {
    q: 'Which SSO protocols are supported?',
    a: 'SAML 2.0, OpenID Connect, JWT, LDAP and Active Directory. Works with Okta, Azure AD, Keycloak, Ping, AD FS, OneLogin and any standards-compliant IdP. Proxy-delegated and external-HTTP authentication are also supported.',
  },
  {
    q: 'Does this require a specific Elastic tier?',
    a: 'No. ReadonlyREST runs on any Elasticsearch >= 6.0 — Basic, Gold, Platinum or OSS. The plugin is the auth layer.',
  },
  {
    q: 'Do I need the Kibana plugin too?',
    a: 'Yes, if you use Kibana. The Kibana plugin renders the login screen and handles the SSO redirect. The Elasticsearch plugin enforces the decision on every request.',
  },
  {
    q: 'How do I map IdP groups to Elasticsearch permissions?',
    a: 'Groups from your SAML assertion or LDAP lookup are bound to ReadonlyREST ACL blocks. Index, field and document-level rules reference those groups directly.',
  },
  {
    q: 'Can I run this on Elastic Cloud without touching the main cluster?',
    a: 'Yes. Deploy ROR as a sidecar: a small, data-less Elasticsearch + Kibana cluster runs the SSO layer and queries Elastic Cloud via Cross-Cluster Search.',
  },
];

export const SSO_WITHOUT_PLATINUM_DATA: UseCasePageProps = {
  slug: 'sso-without-platinum',
  title: 'SSO without Platinum',
  seoTitle:
    'SSO for Elasticsearch and Kibana without Platinum \u2014 SAML, OIDC, LDAP',
  seoDescription:
    'Add SAML, OIDC, LDAP and Active Directory to Elasticsearch and Kibana on any tier \u2014 Basic, Gold, or OSS. Skip the Platinum upgrade, keep the same IdP.',
  eyebrow: 'No Platinum required',
  subheading:
    'SAML, OIDC, LDAP and Active Directory on any Elasticsearch tier \u2014 Basic, Gold or OSS. Keep your existing IdP, skip the Platinum upgrade.',
  heroImage: hero.img,
  heroImageAlt: hero.alt,
  palette: {
    primary: '#0b847a',
    secondary: '#4f46e5',
    accent: '#ec407a',
  },
  tierBadges: ['Basic', 'Gold', 'Platinum', 'OSS'],
  vs: {
    withoutLabel: 'Without ReadonlyREST',
    withLabel: 'With ReadonlyREST',
    rows: [
      { label: 'SSO protocols', without: 'Platinum-tier only', with: 'SAML, OIDC, LDAP, AD, JWT' },
      { label: 'License cost', without: 'Five to six figures / cluster / year', with: 'Free tier covers most teams' },
      { label: 'Basic / OSS tier', without: 'File users only \u2014 no IdP', with: 'All IdPs on every tier' },
      { label: 'Group sync', without: 'Manual role mappings', with: 'Auto from SAML / LDAP assertions' },
    ],
  },
  problem: {
    title: 'SSO shouldn\u2019t cost a Platinum license.',
    body: problemBody,
    bullets: [
      'Platinum is priced per cluster, not per feature \u2014 you pay for ML, cross-cluster replication and more, even if all you wanted was SSO.',
      'Elastic\u2019s Basic/OSS tier has file-based users only \u2014 no IdP integration, no group sync, no MFA.',
      'Proxy-based workarounds (nginx/Apache auth) can\u2019t enforce field or document-level rules downstream.',
    ],
  },
  solution: {
    title: 'One plugin, every IdP.',
    body: solutionBody,
    points: [
      {
        icon: 'key',
        title: 'SAML 2.0',
        body: 'Any SAML IdP \u2014 Okta, Keycloak, Azure AD, AD FS, Ping.',
      },
      {
        icon: 'users',
        title: 'OpenID Connect',
        body: 'Keycloak, Auth0, Google, Microsoft \u2014 PKCE and refresh tokens supported.',
      },
      {
        icon: 'building',
        title: 'LDAP & Active Directory',
        body: 'Group sync, nested groups, role mapping \u2014 no bespoke adapter needed.',
      },
      {
        icon: 'shield',
        title: 'JWT & Proxy',
        body: 'Signed JWTs (HMAC, RSA, EC) for APIs and iframes; reverse-proxy and external-HTTP delegation for non-standard setups.',
      },
    ],
  },
  features: [
    {
      icon: 'key',
      title: 'Bring your own IdP',
      image: '/images/ldap-saml-auth.png',
      imageAlt: 'ReadonlyREST with LDAP, SAML and OIDC providers',
      body: h(
        'span',
        null,
        h(
          'p',
          null,
          'All major enterprise auth protocols are supported out of the box. Configure the IdP in the ReadonlyREST settings file (or GUI, in PRO and Enterprise).',
        ),
        h(
          'p',
          { className: 'mt-3' },
          'Non-standard auth? Use reverse proxy, external basic auth, or a REST microservice.',
        ),
      ),
      cta: {
        label: 'Authentication docs',
        href: 'https://docs.readonlyrest.com/examples',
      },
    },
    {
      icon: 'eye-off',
      title: 'Test your login flows without a live IdP',
      image: '/images/testable-acl.png',
      imageAlt: 'Impersonation GUI for testing access-control rules',
      body: h(
        'p',
        null,
        'Impersonate any user or group via HTTP headers in tests. Add mock users to LDAP/SAML connectors in the impersonation GUI \u2014 no dummy auth servers, no staging IdP.',
      ),
      cta: {
        label: 'Impersonation docs',
        href: 'https://docs.readonlyrest.com/kibana/impersonation',
      },
    },
    {
      icon: 'gauge',
      title: 'Change settings without a cluster restart',
      image: '/images/reboot-less-settings.png',
      imageAlt: 'ReadonlyREST reboot-less settings editor',
      body: h(
        'p',
        null,
        'Add a user, rotate an LDAP bind, tweak a SAML assertion mapping, click SAVE. Every Elasticsearch node picks up the change in seconds.',
      ),
    },
    {
      icon: 'award',
      title: 'Audit every authenticated request',
      image: '/images/kibana-audit-monitoring.png',
      imageAlt: 'Audit monitoring dashboard in Kibana',
      body: h(
        'p',
        null,
        'Every login, permission decision and data access is logged with single-user granularity. Ship audit events to a dedicated ES cluster for forensics and compliance.',
      ),
      cta: {
        label: 'Audit log docs',
        href: 'https://docs.readonlyrest.com/kibana#audit-log',
      },
    },
  ],
  faq,
  faqPlain,
  keywords:
    'Elasticsearch SSO, Kibana SSO, SAML Elasticsearch, OIDC Elasticsearch, LDAP Kibana, SSO without Platinum, ReadonlyREST auth',
};
