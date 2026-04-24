import { createElement as h, type ReactNode } from 'react';
import type { UseCasePageProps } from '@/components/usecase/UseCasePage';
import type { FaqPair } from '@/seo/schema';

const hero = {
  img: '/images/testable-acl.png',
  alt: 'ReadonlyREST impersonation GUI for testing ACL rules',
};

const problemBody: ReactNode = h(
  'p',
  null,
  'Access-control changes are the one config surface where mistakes are ',
  'loud: either you over-share and leak data, or you over-lock and a ',
  'VP can\u2019t open the dashboard at 6pm on a Friday. Most teams roll ',
  'new ACL straight to prod and pray.',
);

const solutionBody: ReactNode = h(
  'p',
  null,
  'ReadonlyREST ships an admin-only sandbox: draft new rules in a test ',
  'settings buffer, mock your LDAP or SAML IdP without touching the real ',
  'one, impersonate any user in your org, and see exactly what they\u2019d ',
  'see. Promote to live only when the tests pass.',
);

const faq: { q: string; a: ReactNode }[] = [
  {
    q: 'Does impersonation need access to our production IdP?',
    a: 'No. The impersonation GUI mocks external auth services (LDAP, OIDC, custom) with test users and groups. No staging IdP, no dummy directory service \u2014 just the mock config in the test sandbox.',
  },
  {
    q: 'Can I test rules in CI?',
    a: 'Yes. Every ACL rule is addressable via HTTP headers, so you can impersonate a user by setting a header on a plain curl call. Integration tests against a real Elasticsearch + ReadonlyREST + mocked IdP take a minute to run.',
  },
  {
    q: 'What happens to live traffic while test settings are active?',
    a: 'Test settings run side-by-side with production ACL; they don\u2019t replace it. Only requests carrying the impersonator\u2019s header hit the test buffer. Everyone else keeps seeing the live rules.',
  },
  {
    q: 'Is this an Enterprise feature?',
    a: 'Yes. Test Settings + External Service Mocks + Impersonation UI are in the Enterprise edition of the Kibana plugin.',
  },
];

const faqPlain: readonly FaqPair[] = faq.map((f) => ({
  q: f.q,
  a: typeof f.a === 'string' ? f.a : '(see page)',
}));

export const DEVSECOPS_ACL_TESTING_DATA: UseCasePageProps = {
  slug: 'devsecops-acl-testing',
  title: 'Test access control before production',
  seoTitle:
    'Test Elasticsearch ACL rules before production \u2014 ReadonlyREST impersonation',
  seoDescription:
    'Sandbox new ACL rules, mock your IdP, impersonate users and verify what they see \u2014 before you ship to prod. DevSecOps for the Elastic stack.',
  eyebrow: 'DevSecOps-ready',
  subheading:
    'Draft ACL in a sandbox. Mock your IdP. Impersonate users. Promote to prod only when every test passes.',
  heroImage: hero.img,
  heroImageAlt: hero.alt,
  palette: {
    primary: '#10b981',
    secondary: '#4f46e5',
    accent: '#10b981',
  },
  tierBadges: ['CI-friendly', 'Enterprise', 'Kibana', 'Any IdP'],
  vs: {
    withoutLabel: 'Without ReadonlyREST',
    withLabel: 'With ReadonlyREST',
    rows: [
      { label: 'Test environment', without: 'Rehearse in prod', with: 'Isolated test sandbox, 30-min TTL' },
      { label: 'IdP for tests', without: 'Stand up a dummy LDAP', with: 'Mock users + groups in the GUI' },
      { label: 'Impersonation', without: 'Share a password', with: 'Admin-only impersonation with audit trail' },
      { label: 'CI integration', without: 'Hand-written scripts', with: 'HTTP headers — curl it' },
    ],
  },
  problem: {
    title: 'ACL changes shouldn\u2019t be rehearsed in production.',
    body: problemBody,
    bullets: [
      'Staging an LDAP server just to rehearse a group-mapping change is days of work for ten minutes of actual testing.',
      'Kibana\u2019s built-in role simulator doesn\u2019t cover external IdP assertions, custom groups, or impersonation across multi-tenancy.',
      'Ship-without-testing means your incident postmortem is explaining who saw what and for how long.',
    ],
  },
  solution: {
    title: 'Sandbox your ACL. Mock your IdP. Impersonate anyone.',
    body: solutionBody,
    points: [
      {
        icon: 'git',
        title: 'Test settings sandbox',
        body: 'Draft ACL in memory, valid for 30 minutes, auto-expires. No risk to live rules.',
      },
      {
        icon: 'users',
        title: 'External service mocks',
        body: 'Simulate LDAP, OIDC, and custom auth with mock users + groups \u2014 no staging IdP needed.',
      },
      {
        icon: 'eye-off',
        title: 'Impersonation UI',
        body: 'Click to see what any user sees. Every impersonation is logged with the admin identity behind it.',
      },
      {
        icon: 'document',
        title: 'Testable in CI',
        body: 'Headers are the contract: curl with X-RoR-Username and watch the ACL decision land.',
      },
    ],
  },
  features: [
    {
      icon: 'git',
      title: 'Test settings that auto-expire',
      image: '/images/testable-acl.png',
      imageAlt: 'Test settings buffer in ReadonlyREST Kibana plugin',
      body: h(
        'p',
        null,
        'Drafts live in an in-memory buffer for 30 minutes (configurable). Forget to clean up and the buffer evicts itself \u2014 no lingering test config leaking into production.',
      ),
      cta: {
        label: 'Impersonation docs',
        href: 'https://docs.readonlyrest.com/kibana/impersonation',
      },
    },
    {
      icon: 'users',
      title: 'Mock external services',
      image: '/images/testable-acl.png',
      imageAlt: 'External service mock configuration for LDAP and OIDC',
      body: h(
        'p',
        null,
        'Define mock LDAP users, mock OIDC group claims, mock custom auth providers. Your test sandbox never touches the live directory \u2014 and never needs a staging one to exist.',
      ),
    },
    {
      icon: 'eye-off',
      title: 'Admin-only impersonation',
      image: '/images/kibana-audit-monitoring.png',
      imageAlt: 'Audit dashboard with impersonator user field highlighted',
      body: h(
        'p',
        null,
        'Admins impersonate any user to verify exactly what they can see. Each impersonated request audits both the target user AND the admin behind them \u2014 no shared-password blind spots.',
      ),
    },
    {
      icon: 'document',
      title: 'HTTP-header contract',
      image: '/images/reboot-less-settings.png',
      imageAlt: 'HTTP headers for ACL impersonation in a shell curl call',
      body: h(
        'p',
        null,
        'Every ACL decision is reducible to a header contract. Your integration tests run as plain curl; your GitHub Actions pipeline asserts on the response codes and response bodies.',
      ),
    },
  ],
  faq,
  faqPlain,
  keywords:
    'test Elasticsearch ACL, ReadonlyREST impersonation, DevSecOps Elasticsearch, CI access control, mock LDAP, mock OIDC, Kibana role simulator',
};
