import { createElement as h, type ReactNode } from 'react';
import type { UseCasePageProps } from '@/components/usecase/UseCasePage';
import type { FaqPair } from '@/seo/schema';

const hero = {
  img: '/images/elastic-cloud-ccs.png',
  alt: 'Elastic Cloud Cross-Cluster Search with a ReadonlyREST sidecar',
};

const problemBody: ReactNode = h(
  'span',
  null,
  h(
    'p',
    null,
    'Elastic Cloud\u2019s basic tier is reasonably cheap, fast and stable. ',
    'Updates are seamless; data grows indefinitely. Then you need SSO, or ',
    'multi-tenancy, or field-level security \u2014 and the bill for the ',
    'Platinum tier sky-rockets.',
  ),
  h(
    'p',
    { className: 'mt-3' },
    'The alternative \u2014 installing a security plugin directly on every ',
    'node \u2014 tightly couples your security layer with the cluster. ',
    'Upgrading Elasticsearch becomes entangled with plugin compatibility. ',
    'A fragile ecosystem, where minor changes carry real risk.',
  ),
);

const solutionBody: ReactNode = h(
  'span',
  null,
  h(
    'p',
    null,
    'Keep all your data in Elastic Cloud\u2019s basic tier. Put a small, ',
    h('strong', null, 'data-less'),
    ' Elasticsearch + Kibana cluster in front of it, with ReadonlyREST installed. ',
    'Users authenticate against the sidecar; the sidecar queries Elastic Cloud as a remote cluster via Cross-Cluster Search.',
  ),
  h(
    'p',
    { className: 'mt-3' },
    'No hacks. The two pieces are glued together by ',
    h('strong', null, 'Trusted deployments'),
    ' (Elastic Cloud\u2019s official way to connect a self-managed cluster) and ',
    h('strong', null, 'Cross-Cluster Search'),
    ' (Elasticsearch\u2019s built-in query federation). Both are first-class features.',
  ),
);

const faq: { q: string; a: ReactNode }[] = [
  {
    q: 'Why not install ReadonlyREST on the main cluster instead?',
    a: h(
      'span',
      null,
      'You can \u2014 but installing any plugin on every node tightly couples the security layer with the data layer. Upgrades have to line up plugin compatibility with Elasticsearch versions; ROR config changes touch production nodes. With the sidecar, ROR runs independently: the main cluster upgrades on its own schedule, and ROR changes are isolated to a small, stateless cluster where testing is safe.',
    ),
  },
  {
    q: 'How does the sidecar talk to Elastic Cloud?',
    a: h(
      'span',
      null,
      'Elastic Cloud\u2019s ',
      h(
        'a',
        { href: 'https://www.elastic.co/guide/en/cloud/current/ec-trust-management.html#ec-trust-self-managed' },
        'Trusted environments',
      ),
      ' let a self-managed cluster connect securely to a managed Elastic Cloud deployment. Once trust is established, ',
      h(
        'a',
        { href: 'https://www.elastic.co/guide/en/cloud/current/ec-enable-ccs.html' },
        'Cross-Cluster Search',
      ),
      ' lets the sidecar query remote indices on Elastic Cloud as if they were local shards.',
    ),
  },
  {
    q: 'Where is the data stored?',
    a: 'Entirely in Elastic Cloud. The sidecar is data-less \u2014 it holds no indices, just ACL configuration and audit logs. That means cheap, stateless, easy to redeploy.',
  },
  {
    q: 'Can I run the sidecar on Kubernetes?',
    a: h(
      'span',
      null,
      'Yes. The sidecar is a standard Elasticsearch + Kibana deployment. Works with the official ',
      h(
        'a',
        { href: 'https://www.elastic.co/guide/en/cloud-on-k8s/current/index.html' },
        'Elastic Cloud on Kubernetes (ECK)',
      ),
      ' operator \u2014 rolling upgrades, TLS rotation, autoscaling handled for you.',
    ),
  },
  {
    q: 'Does this violate the Elastic License?',
    a: 'No. The sidecar is your cluster on your infrastructure. Trusted deployments and Cross-Cluster Search are standard Elastic features, documented and supported.',
  },
];

const faqPlain: readonly FaqPair[] = [
  {
    q: 'Why not install ReadonlyREST on the main cluster instead?',
    a: 'Installing any plugin on every node tightly couples the security layer with the data layer. Upgrades have to line up plugin compatibility with Elasticsearch versions. With the sidecar, ROR runs independently: the main cluster upgrades on its own schedule, and ROR changes are isolated to a small, stateless cluster.',
  },
  {
    q: 'How does the sidecar talk to Elastic Cloud?',
    a: 'Via Trusted environments and Cross-Cluster Search. Trust lets a self-managed cluster connect securely to Elastic Cloud; CCS lets the sidecar query remote indices as if they were local.',
  },
  {
    q: 'Where is the data stored?',
    a: 'Entirely in Elastic Cloud. The sidecar is data-less \u2014 it holds no indices, just ACL configuration and audit logs.',
  },
  {
    q: 'Can I run the sidecar on Kubernetes?',
    a: 'Yes. The sidecar is a standard Elasticsearch + Kibana deployment. Works with the official ECK operator.',
  },
  {
    q: 'Does this violate the Elastic License?',
    a: 'No. The sidecar is your cluster. Trusted deployments and Cross-Cluster Search are standard Elastic features.',
  },
];

export const PLATINUM_ON_BASIC_CLOUD_DATA: UseCasePageProps = {
  slug: 'platinum-on-basic-cloud',
  title: 'Platinum features on basic Elastic Cloud',
  seoTitle:
    'Platinum features on basic Elastic Cloud \u2014 ReadonlyREST sidecar architecture',
  seoDescription:
    'Keep data in basic-tier Elastic Cloud. Add SSO, multi-tenancy and FLS/DLS through a data-less ReadonlyREST sidecar via Trusted deployments + Cross-Cluster Search.',
  eyebrow: 'Sidecar architecture',
  subheading:
    'Keep your data in the cheapest Elastic Cloud tier. Enforce enterprise auth, multi-tenancy and access control through a small, data-less ReadonlyREST sidecar.',
  heroImage: hero.img,
  heroImageAlt: hero.alt,
  palette: {
    primary: '#2563eb',
    secondary: '#0b847a',
    accent: '#ec407a',
  },
  tierBadges: ['Elastic Cloud', 'ECK', 'CCS', 'Data-less'],
  vs: {
    withoutLabel: 'Platinum on every node',
    withLabel: 'ReadonlyREST sidecar',
    rows: [
      { label: 'Pricing', without: 'Per-node tier upgrade, forever', with: 'Cheapest Elastic Cloud tier + small sidecar' },
      { label: 'Upgrades', without: 'Plugin compatibility matrix', with: 'Main cluster upgrades independently' },
      { label: 'Blast radius', without: 'Config change touches prod data', with: 'Changes isolated to stateless cluster' },
      { label: 'Testing', without: 'Rehearse in prod', with: 'Spin up a second sidecar, test safely' },
    ],
  },
  problem: {
    title: 'Pay for the data tier, not the auth tier.',
    body: problemBody,
    bullets: [
      'Platinum is priced per node \u2014 the bill grows with the cluster, forever.',
      'Installing a security plugin on every ES node couples upgrades to plugin compatibility \u2014 minor changes carry significant risk.',
      'Elastic\u2019s own guides assume one-cluster-per-feature \u2014 no official pattern for "cheap storage, strong auth".',
    ],
  },
  solution: {
    title: 'Data-less sidecar. Cloud-managed data.',
    body: solutionBody,
    points: [
      {
        icon: 'cloud',
        title: 'Elastic Cloud (basic)',
        body: 'Holds the data. Seamless upgrades, indefinite growth, no security plugins.',
      },
      {
        icon: 'shield',
        title: 'ReadonlyREST sidecar',
        body: 'Enforces SSO, FLS, DLS, multi-tenancy and audit \u2014 on your infra.',
      },
      {
        icon: 'git',
        title: 'Trusted deployments + CCS',
        body: 'Federate the two: the sidecar queries Elastic Cloud as a remote cluster.',
      },
      {
        icon: 'ship',
        title: 'ECK-ready',
        body: 'The sidecar is a standard ES + Kibana deployment, Kubernetes-native via the official operator.',
      },
    ],
  },
  features: [
    {
      icon: 'cloud',
      title: 'One cluster manages data, the other manages access',
      image: '/images/elastic-cloud-ccs.png',
      imageAlt: 'Cross-Cluster Search from a ReadonlyREST sidecar to Elastic Cloud',
      body: h(
        'span',
        null,
        h(
          'p',
          null,
          'Users authenticate against the data-less sidecar. The sidecar queries Elastic Cloud via Cross-Cluster Search, carrying the authenticated identity into every request.',
        ),
        h(
          'p',
          { className: 'mt-3' },
          'Access-control decisions \u2014 auth, FLS, DLS, audit \u2014 all happen in the sidecar, before the CCS request fans out.',
        ),
      ),
      cta: {
        label: 'Elastic Cloud interop guide',
        href: 'https://docs.readonlyrest.com/examples/elastic-cloud-cluster-integration',
      },
    },
    {
      icon: 'gauge',
      title: 'Upgrade the main cluster without touching security',
      image: '/images/reboot-less-settings.png',
      imageAlt: 'ReadonlyREST reboot-less settings editor',
      body: h(
        'span',
        null,
        h(
          'p',
          null,
          'Elastic Cloud upgrades on its own schedule \u2014 no plugin compatibility matrix to chase. ROR changes are isolated to the sidecar, where new configurations can be tested without risking production data.',
        ),
        h(
          'p',
          { className: 'mt-3' },
          'Reboot-less settings updates in the sidecar: add a user, rotate an LDAP bind, tweak a SAML mapping, click SAVE.',
        ),
      ),
    },
    {
      icon: 'ship',
      title: 'Kubernetes-native via ECK',
      image: '/images/eck-logo.png',
      imageAlt: 'Elastic Cloud on Kubernetes operator logo',
      body: h(
        'p',
        null,
        'Deploy the sidecar as a standard ECK-managed Elasticsearch + Kibana resource. Rolling upgrades, TLS rotation, autoscaling \u2014 all handled by the operator.',
      ),
      cta: {
        label: 'ECK guide',
        href: 'https://docs.readonlyrest.com/eck',
      },
    },
    {
      icon: 'layers',
      title: '1,000+ tenants on one Elastic Cloud deployment',
      image: '/images/data-segregation.png',
      imageAlt: 'Multi-tenant access through a ReadonlyREST sidecar',
      body: h(
        'p',
        null,
        'Tenant identity lives in the JWT or SAML assertion; the sidecar turns it into a document-level filter before CCS forwards the query to Elastic Cloud. Same dashboard, different data per tenant.',
      ),
      cta: {
        label: 'Multi-tenancy guide',
        href: 'https://docs.readonlyrest.com/examples/multitenancy_guide',
      },
    },
  ],
  faq,
  faqPlain,
  keywords:
    'Elastic Cloud Platinum alternative, Elastic Cloud sidecar, Cross-Cluster Search, Trusted deployments, data-less sidecar, ReadonlyREST ECK, multi-tenant Elastic Cloud',
};
