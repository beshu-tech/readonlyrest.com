import type { ReactNode } from 'react';
import Icon, { type IconName } from '../Icon';

interface Card {
  title: string;
  image: string;
  icon: IconName;
  body: ReactNode;
  cta?: { label: string; href: string };
}

const CARDS: readonly Card[] = [
  {
    title: 'Tweak the Look & Feel in Kibana',
    image: '/images/kibana-tweaked-css.png',
    icon: 'layers',
    body: (
      <>
        <p>
          Make Kibana blend in with your company branding. Use the ReadonlyREST Kibana
          plugin to overlay custom CSS stylesheets and JavaScript. Styles and behaviour
          of every page are cleanly overridden.
        </p>
        <p className="mt-3">
          Gone are the days of unreliably patching source files every time Kibana
          updates. Our custom assets get dynamically loaded on every page.
        </p>
      </>
    ),
    cta: {
      label: 'Kibana UI tweaking docs',
      href: 'https://docs.readonlyrest.com/kibana#kibana-ui-tweaking',
    },
  },
  {
    title: 'Off-site auditing & monitoring',
    image: '/images/kibana-audit-monitoring.png',
    icon: 'chart',
    body: (
      <>
        <p>
          Keep an eye on accesses, failed logins, and data access with single-user
          granularity. Spot the users and queries hogging resources the most.
        </p>
        <p className="mt-3">
          Optionally, audit logs can be shipped to a dedicated remote ES cluster for
          further analysis and better security.
        </p>
      </>
    ),
    cta: {
      label: 'Audit Logs docs',
      href: 'https://docs.readonlyrest.com/kibana#audit-log',
    },
  },
  {
    title: 'Efficient data segregation',
    image: '/images/data-segregation.png',
    icon: 'layers',
    body: (
      <>
        <p>
          Stop creating a new cluster for each project. Save tons of computing
          resources by using a single Elasticsearch cluster and Kibana instance for
          virtually unlimited projects.
        </p>
        <p className="mt-3">A new tenancy can be created or destroyed in 1 second.</p>
        <p className="mt-3">
          With <strong>group mapping</strong>, creating a tenancy is as quick as
          creating an LDAP group.
        </p>
        <p className="mt-3 text-[14px] text-[color:var(--color-ink-soft)]">
          Complete segregation is optional — sometimes the same indices can be read by
          multiple groups, avoiding data duplication.
        </p>
      </>
    ),
    cta: {
      label: 'Multi-tenancy guide',
      href: 'https://docs.readonlyrest.com/examples/multitenancy_guide',
    },
  },
  {
    title: 'Bring your own authentication',
    image: '/images/ldap-saml-auth.png',
    icon: 'key',
    body: (
      <>
        <p>
          All major enterprise-grade authentication and authorization protocols are
          supported out of the box:{' '}
          <a href="https://docs.readonlyrest.com/examples">SAML, LDAP, OpenID Connect</a>.
        </p>
        <p className="mt-3">
          <a href="https://docs.readonlyrest.com/kibana/impersonation">
            User impersonation and external auth mocking
          </a>{' '}
          is supported in our GUI — no need to spin up a test LDAP server or SAML IdP.
        </p>
        <p className="mt-3 text-[14px] text-[color:var(--color-ink-soft)]">
          Non-standard auth systems: reverse proxy, external basic auth, or a REST
          microservice.
        </p>
      </>
    ),
  },
  {
    title: 'Elastic Cloud integration',
    image: '/images/elastic-cloud-ccs.png',
    icon: 'cloud',
    body: (
      <>
        <p>
          Keep all data in a cluster in the cheapest Elastic Cloud tier. Enforce access
          control and multi-tenancy with ReadonlyREST.
        </p>
        <p className="mt-3">
          Works thanks to Elastic Cloud&apos;s{' '}
          <a href="https://www.elastic.co/guide/en/cloud/current/ec-trust-management.html#ec-trust-self-managed">
            Trusted environments
          </a>{' '}
          and{' '}
          <a href="https://www.elastic.co/guide/en/cloud/current/ec-enable-ccs.html">
            Cross-Cluster Search (CCS)
          </a>
          .
        </p>
      </>
    ),
    cta: {
      label: 'Elastic Cloud interop docs',
      href: 'https://docs.readonlyrest.com/examples/elastic-cloud-cluster-integration',
    },
  },
  {
    title: 'Only show the right Kibana apps',
    image: '/images/hide-kibana-apps.png',
    icon: 'eye-off',
    body: (
      <>
        <p>Should the sales team use the machine learning app?</p>
        <p>Should auditors see anything besides dashboards?</p>
        <p className="mt-3">
          ReadonlyREST can <strong>disable any Kibana app</strong> for any user or
          group.
        </p>
      </>
    ),
    cta: {
      label: 'Hide Kibana apps docs',
      href: 'https://docs.readonlyrest.com/kibana#hiding-kibana-apps',
    },
  },
  {
    title: 'Reboot-less security settings editor',
    image: '/images/reboot-less-settings.png',
    icon: 'gauge',
    body: (
      <>
        <p>
          Add a user, modify permissions, tweak LDAP connectors, then click SAVE. All
          Elasticsearch nodes pick up the changes in seconds. Goodbye rolling
          restarts.
        </p>
        <p className="mt-3 text-[14px] text-[color:var(--color-ink-soft)]">
          Available in <strong>GUI</strong> and <strong>API</strong> mode (Enterprise
          edition).
        </p>
      </>
    ),
    cta: {
      label: 'Settings API docs',
      href: 'https://docs.readonlyrest.com/kibana/readonlyrest-api',
    },
  },
  {
    title: 'Testable access control',
    image: '/images/testable-acl.png',
    icon: 'git',
    body: (
      <>
        <p>
          Our ACL is <strong>testable</strong> with code. Write tests that use simple
          HTTP headers to impersonate users and groups.
        </p>
        <p className="mt-3">
          Add mock users to LDAP/SAML connectors in the impersonation GUI and use them
          in your tests — no dummy auth servers needed.
        </p>
      </>
    ),
    cta: {
      label: 'Test settings guide',
      href: 'https://docs.readonlyrest.com/kibana/readonlyrest-api',
    },
  },
];

export default function FeatureCards() {
  return (
    <section className="page py-20 md:py-24">
      <div className="max-w-3xl">
        <p className="eyebrow-muted">Features</p>
        <h2 className="mt-3">Everything you need for Elastic security.</h2>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {CARDS.map((c) => (
          <article key={c.title} className="card card-hover flex flex-col">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-md bg-[color:var(--color-teal)]/10 text-[color:var(--color-teal)] flex items-center justify-center shrink-0">
                <Icon name={c.icon} size={20} />
              </div>
              <h3 className="mt-1">{c.title}</h3>
            </div>
            <div className="mt-4 text-[15px] leading-relaxed text-[color:var(--color-ink)]">
              {c.body}
            </div>
            <img
              src={c.image}
              alt={c.title}
              width={1000}
              height={600}
              loading="lazy"
              className="mt-6 w-full h-auto rounded border border-[color:var(--color-border-subtle)]"
            />
            {c.cta && (
              <div className="mt-5">
                <a href={c.cta.href} className="btn-ghost no-underline text-[14px]">
                  {c.cta.label}
                  <Icon name="arrow-right" size={14} />
                </a>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
