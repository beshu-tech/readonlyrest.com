import { createElement as h, type ReactNode } from 'react';
import type { UseCasePageProps } from '@/components/usecase/UseCasePage';
import type { FaqPair } from '@/seo/schema';

const hero = {
  img: '/images/hero-deer.png',
  alt: 'ReadonlyREST FIPS 140-2 mode for Elasticsearch and Kibana',
};

const problemBody: ReactNode = h(
  'p',
  null,
  'Federal, defense, healthcare and financial deployments don\u2019t get ',
  'to pick their crypto library. They need FIPS 140-2 validated modules, ',
  'BCFKS keystores, and a paper trail for the audit. Elastic\u2019s FIPS ',
  'path is bundled with higher-tier licences and a support contract \u2014 ',
  'before you\u2019ve deployed a single node.',
);

const solutionBody: ReactNode = h(
  'p',
  null,
  'ReadonlyREST runs in FIPS SSL-only mode on top of BouncyCastle\u2019s ',
  'FIPS provider and BCFKS keystores. Applies to HTTP traffic AND ',
  'inter-node transport, on any tier. Convert your existing JKS/PKCS12 ',
  'keystores to BCFKS with the bundled tooling \u2014 no re-issuance.',
);

const faq: { q: string; a: ReactNode }[] = [
  {
    q: 'What FIPS standard does ReadonlyREST target?',
    a: 'FIPS 140-2 data-in-transit via BouncyCastle FIPS (BCFIPS) and BCFKS keystores. The JVM runs with the BCFIPS provider; ReadonlyREST configures SSL to use it for both HTTP and transport.',
  },
  {
    q: 'Do I need to re-issue my certificates?',
    a: 'No. Convert existing JKS or PKCS12 keystores to BCFKS in place. The ReadonlyREST distribution bundles a conversion tool; no CA round-trip required.',
  },
  {
    q: 'Is this available in the free edition?',
    a: 'Yes. FIPS SSL mode is a configuration feature of the Elasticsearch plugin, available on every tier.',
  },
  {
    q: 'Does FIPS mode affect performance?',
    a: 'Minimally. FIPS-validated crypto primitives have a small overhead vs the default JCE provider; for typical ES workloads the difference is inside measurement noise.',
  },
];

const faqPlain: readonly FaqPair[] = faq.map((f) => ({
  q: f.q,
  a: typeof f.a === 'string' ? f.a : '(see page)',
}));

export const FIPS_COMPLIANCE_DATA: UseCasePageProps = {
  slug: 'fips-compliance',
  title: 'FIPS 140-2 for Elasticsearch',
  seoTitle:
    'FIPS 140-2 Elasticsearch with ReadonlyREST \u2014 BouncyCastle + BCFKS',
  seoDescription:
    'Run Elasticsearch in FIPS 140-2 mode via BouncyCastle and BCFKS keystores. HTTP and inter-node TLS, on any Elastic tier. Federal and regulated workloads without vendor lock-in.',
  eyebrow: 'Regulated workloads',
  subheading:
    'FIPS 140-2 validated crypto for HTTP and inter-node TLS on any Elastic tier. Federal, defense, healthcare and financial workloads without the Platinum upsell.',
  heroImage: hero.img,
  heroImageAlt: hero.alt,
  palette: {
    primary: '#7c3aed',
    secondary: '#0b847a',
    accent: '#7c3aed',
  },
  tierBadges: ['FIPS 140-2', 'BCFIPS', 'BCFKS', 'FedRAMP-friendly'],
  vs: {
    withoutLabel: 'Elastic\u2019s path',
    withLabel: 'ReadonlyREST FIPS mode',
    rows: [
      { label: 'License', without: 'Bundled with higher tiers', with: 'Any Elastic tier' },
      { label: 'Crypto provider', without: 'Elastic-specific', with: 'BouncyCastle FIPS (BCFIPS)' },
      { label: 'Keystores', without: 'Need re-issuance', with: 'Convert JKS/PKCS12 in place' },
      { label: 'Coverage', without: 'HTTP only in some tiers', with: 'HTTP + inter-node transport' },
    ],
  },
  problem: {
    title: 'FIPS shouldn\u2019t depend on the tier you picked.',
    body: problemBody,
    bullets: [
      'Regulators accept validated crypto modules, not licence agreements \u2014 but Elastic\u2019s FIPS story starts above Basic.',
      'Standing up a second FIPS-validated cluster just to satisfy a specific contract is weeks of engineering.',
      'Hand-rolling a BouncyCastle setup for Elasticsearch without operator tooling breaks on every minor upgrade.',
    ],
  },
  solution: {
    title: 'BouncyCastle FIPS, HTTP + transport, any tier.',
    body: solutionBody,
    points: [
      {
        icon: 'shield',
        title: 'BCFIPS provider',
        body: 'BouncyCastle FIPS (BCFIPS) as the JVM security provider. FIPS 140-2 validated primitives for all TLS handshakes.',
      },
      {
        icon: 'lock',
        title: 'BCFKS keystores',
        body: 'BCFKS keystore format end-to-end. In-place conversion tool for existing JKS or PKCS12 keystores \u2014 no CA round-trip.',
      },
      {
        icon: 'layers',
        title: 'HTTP + transport',
        body: 'FIPS mode covers external client TLS AND the cluster\u2019s own node-to-node transport. Regulators look at both.',
      },
      {
        icon: 'check',
        title: 'Any Elastic tier',
        body: 'Configuration of the open-source Elasticsearch plugin. No Platinum, no commercial licence required.',
      },
    ],
  },
  features: [
    {
      icon: 'shield',
      title: 'BCFIPS-validated crypto',
      image: '/images/testable-acl.png',
      imageAlt: 'ReadonlyREST FIPS mode configuration in ES YAML',
      body: h(
        'p',
        null,
        'BouncyCastle FIPS provider (BCFIPS) loaded as the JVM\u2019s primary security provider. Every TLS handshake \u2014 HTTP and internode \u2014 uses the validated primitives required by FIPS 140-2.',
      ),
      cta: {
        label: 'FIPS mode docs',
        href: 'https://docs.readonlyrest.com/',
      },
    },
    {
      icon: 'lock',
      title: 'Convert keystores in place',
      image: '/images/reboot-less-settings.png',
      imageAlt: 'BCFKS keystore conversion command-line output',
      body: h(
        'p',
        null,
        'Bundled tooling converts your existing JKS and PKCS12 keystores to BCFKS without re-issuing certificates. Your CA, your cert, your chain \u2014 just a different container.',
      ),
    },
    {
      icon: 'layers',
      title: 'HTTP and transport',
      image: '/images/data-segregation.png',
      imageAlt: 'FIPS-mode TLS applied to HTTP and inter-node transport channels',
      body: h(
        'p',
        null,
        'External client TLS and the cluster\u2019s internal transport channel both run on FIPS-validated primitives. Auditors look at both; a half-FIPS cluster fails the review.',
      ),
    },
    {
      icon: 'award',
      title: 'Paper trail ready',
      image: '/images/kibana-audit-monitoring.png',
      imageAlt: 'Audit trail for a FIPS-compliant Elasticsearch cluster',
      body: h(
        'p',
        null,
        'Pair FIPS TLS with ReadonlyREST audit for the full compliance stack: validated crypto + per-user access evidence. What your auditor actually asks for.',
      ),
    },
  ],
  faq,
  faqPlain,
  keywords:
    'FIPS Elasticsearch, FIPS 140-2 Elasticsearch, BouncyCastle Elasticsearch, BCFKS, FedRAMP Elasticsearch, federal Elasticsearch, HIPAA TLS',
};
