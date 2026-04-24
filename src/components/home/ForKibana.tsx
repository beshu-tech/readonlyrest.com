import type { ReactNode } from 'react';
import Icon from '../Icon';
import SectionEyebrow from '../SectionEyebrow';

interface Plan {
  title: string;
  tag: string;
  tagTone: 'free' | 'pro' | 'ent';
  image: string;
  imageAlt: string;
  blurb: ReactNode;
  /** Shown as a dividing "Everything in <previous tier>, plus:" label above the feature list. */
  inherits?: string;
  features: readonly ReactNode[];
  cta: { label: string; href: string };
  highlight?: boolean;
}

const PLANS: readonly Plan[] = [
  {
    title: 'Free Kibana Plugin',
    tag: 'Free forever',
    tagTone: 'free',
    image: '/images/kibana-free-badge.png',
    imageAlt: 'ReadonlyREST Free \u2014 a herd of colorful elks in a forest',
    blurb: 'The perfect starting point: basic functionality, free forever.',
    features: [
      'Auth: File, LDAP, JWT auth header, External, Proxy',
      'Full ACL: Index, Document, Field security',
      'Kibana access levels (RO / RW / Admin)',
    ],
    cta: { label: 'Download free', href: '/download' },
  },
  {
    title: 'PRO Kibana Plugin',
    tag: 'Pro',
    tagTone: 'pro',
    image: '/images/kibana-pro-badge.png',
    imageAlt: 'ReadonlyREST PRO \u2014 elks in technicolor hoodies',
    blurb: 'Take ownership of the Kibana experience.',
    inherits: 'Everything in Free, plus:',
    features: [
      <a key="f1" href="https://docs.readonlyrest.com/kibana#kibana-ui-tweaking">
        Custom branding
      </a>,
      <a
        key="f2"
        href="https://docs.readonlyrest.com/kibana#embedding-kibana-dashboard-or-visualization-with-an-iframe-and-jwt-authentication"
      >
        Embedded dashboards (JWT in iframe src)
      </a>,
      <span key="f3">
        <a href="https://docs.readonlyrest.com/examples/multiuser_guide">Multi-user:</a>{' '}
        same dashboards, different data
      </span>,
      <a key="f4" href="https://docs.readonlyrest.com/elasticsearch#kibana_hide_apps">
        Hide Kibana apps
      </a>,
      <span key="f5">
        <a href="https://docs.readonlyrest.com/examples/custom-middleware">
          Custom middleware
        </a>{' '}
        (OTP, etc.)
      </span>,
      <a key="f6" href="https://docs.readonlyrest.com/kibana/readonlyrest-api">
        Reboot-less settings GUI
      </a>,
    ],
    cta: { label: 'Request a quote', href: 'https://readonlyrest.com/quote' },
    highlight: true,
  },
  {
    title: 'Enterprise Kibana Plugin',
    tag: 'Enterprise',
    tagTone: 'ent',
    image: '/images/kibana-enterprise-badge.png',
    imageAlt: 'ReadonlyREST Enterprise \u2014 elks in suits',
    blurb: '1000 Kibanas in one cluster, with modern enterprise authentication.',
    inherits: 'Everything in Pro, plus:',
    features: [
      <a key="f1" href="https://docs.readonlyrest.com/examples/multitenancy_guide">
        Multi-tenancy (virtual ELK clusters)
      </a>,
      <a
        key="f2"
        href="https://forum.readonlyrest.com/t/ror-enterprise-feature-preview-group-tenancy-selector-video/276"
      >
        Tenancy switching
      </a>,
      <a key="f3" href="https://docs.readonlyrest.com/examples/saml-sso">
        SAML 2.0 authentication
      </a>,
      <a key="f4" href="https://docs.readonlyrest.com/examples/oidc-sso/keycloak_oidc">
        OpenID Connect authentication
      </a>,
      <span key="f5">
        <a href="https://docs.readonlyrest.com/commercial#what-is-priority-support">
          Priority email support
        </a>{' '}
        (SLA)
      </span>,
    ],
    cta: { label: 'Talk to sales', href: 'https://readonlyrest.com/contact' },
  },
];

function Tag({ tone, children }: { tone: Plan['tagTone']; children: ReactNode }) {
  const bg =
    tone === 'free'
      ? 'bg-white/10 text-white/80'
      : tone === 'pro'
        ? 'bg-[color:var(--color-teal)] text-white'
        : 'bg-[color:var(--color-hot-pink)] text-white';
  return (
    <span
      className={`text-[11px] font-bold uppercase tracking-[0.14em] px-2 py-1 rounded ${bg}`}
    >
      {children}
    </span>
  );
}

export default function ForKibana() {
  return (
    <section id="for-kibana" className="section-dark py-20 md:py-24">
      <div className="page">
        <div className="max-w-3xl">
          <SectionEyebrow tone="dark">Using Kibana?</SectionEyebrow>
          <h2 className="mt-4">Three tiers. One upgrade path.</h2>
          <p className="mt-5 text-[17px] text-white/75 max-w-2xl">
            Start with the free plugin. Graduate to PRO for a centralized security
            settings UI, or Enterprise for multi-tenancy and SSO.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {PLANS.map((p) => (
            <article
              key={p.title}
              className={`rounded-[var(--radius-card)] flex flex-col overflow-hidden ${
                p.highlight
                  ? 'bg-white/[0.06] border border-white/20 ring-1 ring-[color:var(--color-teal)]/30'
                  : 'bg-white/[0.03] border border-white/10'
              }`}
            >
              <div className="aspect-[16/9] w-full bg-black/40 border-b border-white/10 flex items-center justify-center overflow-hidden">
                <img
                  src={p.image}
                  alt={p.imageAlt}
                  loading="lazy"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6 md:p-7 flex flex-col flex-1">
                <Tag tone={p.tagTone}>{p.tag}</Tag>
                <h3 className="mt-4">{p.title}</h3>
                <p className="mt-3 text-[15px] text-white/75 leading-relaxed">
                  {p.blurb}
                </p>
                {p.inherits && (
                  <div className="mt-5 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-white/60 pb-3 border-b border-white/10">
                    <Icon name="check" size={14} className="text-[color:var(--color-teal)] shrink-0" />
                    {p.inherits}
                  </div>
                )}
                <ul className={`check-list ${p.inherits ? 'mt-4' : 'mt-5'} text-[15px] flex-1`}>
                  {p.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
                <div className="mt-7">
                  <a
                    href={p.cta.href}
                    className={p.highlight ? 'btn-teal text-[14px]' : 'btn-ghost-dark text-[14px]'}
                  >
                    {p.cta.label}
                    <Icon name="arrow-right" size={14} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
