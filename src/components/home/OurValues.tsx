import type { ReactNode } from 'react';
import Icon, { type IconName } from '../Icon';

interface Value {
  title: string;
  icon: IconName;
  body: ReactNode;
  hero?: boolean;
}

const VALUES: readonly Value[] = [
  {
    title: 'Security through simplicity',
    icon: 'shield',
    hero: true,
    body: (
      <>
        <p>
          Since 2013 ReadonlyREST has been a reference in Elasticsearch and Kibana
          security.
        </p>
        <p className="mt-3">
          The weakest link in security is human error. That&apos;s why we embrace
          &ldquo;convention over configuration&rdquo;.
        </p>
        <p className="mt-3">
          As a side effect, our solution{' '}
          <strong>integrates in hours</strong> — not days or weeks.
        </p>
      </>
    ),
  },
  {
    title: 'Performance',
    icon: 'gauge',
    body: (
      <p>
        Forged by experience in extra-large clusters (banking, ad-tech) and wildly fast
        write rates (CERN). Our software can take the challenge.
      </p>
    ),
  },
  {
    title: 'Accountability',
    icon: 'users',
    body: (
      <p>
        Best-in-class support: the same engineers who wrote the software answer your
        SLA support tickets.
      </p>
    ),
  },
  {
    title: 'Continuous improvement',
    icon: 'clock',
    body: (
      <p>
        Monthly releases for fixes and features, plus extra releases when a new Elastic
        version ships or a security fix is needed. Layer after layer, year after year.
      </p>
    ),
  },
];

const HERO = VALUES.find((v) => v.hero);
const REST = VALUES.filter((v) => !v.hero);

export default function OurValues() {
  if (!HERO) return null;
  const hero = HERO;
  const rest = REST;

  return (
    <section className="section-dark py-20 md:py-24">
      <div className="page">
        <div className="max-w-3xl">
          <p className="eyebrow-dark">Our values</p>
          <h2 className="mt-3">How we work, in four points.</h2>
        </div>

        <div className="mt-12 grid lg:grid-cols-12 gap-5">
          {/* Hero value — large card */}
          <article className="lg:col-span-6 card-dark p-8 md:p-10 flex flex-col">
            <div className="h-12 w-12 rounded-md bg-[color:var(--color-teal)]/20 text-[color:var(--color-teal)] flex items-center justify-center">
              <Icon name={hero.icon} size={26} />
            </div>
            <h3 className="mt-6 text-[24px] md:text-[28px]">{hero.title}</h3>
            <div className="mt-4 text-[17px] text-white/85 leading-relaxed">
              {hero.body}
            </div>
          </article>

          {/* Other values — compact cards */}
          <div className="lg:col-span-6 grid sm:grid-cols-2 gap-5">
            {rest.map((v) => (
              <article key={v.title} className="card-dark p-6 flex flex-col">
                <div className="h-10 w-10 rounded-md bg-white/5 text-white/70 flex items-center justify-center">
                  <Icon name={v.icon} size={20} />
                </div>
                <h3 className="mt-5">{v.title}</h3>
                <div className="mt-3 text-[15px] text-white/75 leading-relaxed">
                  {v.body}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
