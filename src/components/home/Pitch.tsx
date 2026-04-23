import type { ReactNode } from 'react';
import Icon from '../Icon';
import type { IconName } from '../Icon';

/**
 * Pitch — multi-tenancy thesis with security as the enabling capability.
 * Copy flows: problem → thesis → promise → supporting capabilities.
 */
interface Feature { icon: IconName; body: ReactNode }

const FEATURES: readonly Feature[] = [
  { icon: 'lock', body: 'Granular access control on indices, documents, and fields' },
  { icon: 'building', body: 'Enterprise auth: LDAP, SAML, OIDC, JWT, Kerberos' },
  {
    icon: 'cloud',
    body: (
      <>
        <strong>Interoperable</strong> with{' '}
        <a href="https://www.elastic.co/cloud/">Elastic Cloud</a> managed service
      </>
    ),
  },
  {
    icon: 'ship',
    body: (
      <>
        <strong>Works great</strong> on Kubernetes via{' '}
        <a href="https://docs.readonlyrest.com/eck">ECK</a>
      </>
    ),
  },
];

export default function Pitch() {
  return (
    <section id="pitch" className="page py-20 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div>
          <p className="eyebrow-muted">The problem</p>
          <p className="mt-3 text-[22px] md:text-[26px] leading-snug text-[color:var(--color-ink-soft)]">
            Still spinning up a new cluster for each project?
          </p>

          <h2 className="mt-8 accent-bar">One cluster. 1000+ tenants.</h2>
          <p className="mt-6 text-[17px] text-[color:var(--color-ink-soft)]">
            Effortlessly fit hundreds of fully isolated teams and projects inside a
            single Elasticsearch deployment &mdash; without compromising on security
            or performance.
          </p>

          <ul className="mt-8 space-y-4 text-[17px]">
            {FEATURES.map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <Icon
                  name={f.icon}
                  size={22}
                  className="text-[color:var(--color-teal)] shrink-0 mt-0.5"
                />
                <span>{f.body}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#try-it-with-docker" className="btn-teal text-[15px]">
              <Icon name="rocket" size={18} />
              10-minute PoC with Docker
            </a>
            <a href="https://docs.readonlyrest.com/" className="btn-ghost text-[15px]">
              Read the docs
              <Icon name="arrow-right" size={16} />
            </a>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <img
            src="/images/hero-product-screens.png"
            alt="ReadonlyREST Kibana login screen and security settings editor"
            width={700}
            height={460}
            loading="lazy"
            className="w-full max-w-[620px] h-auto"
          />
        </div>
      </div>
    </section>
  );
}
