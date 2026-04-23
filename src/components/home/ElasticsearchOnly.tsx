import Icon from '../Icon';

interface Plan {
  title: string;
  tag: string;
  blurb: string;
  features: readonly string[];
  cta: { label: string; href: string };
  highlight?: boolean;
}

const PLANS: readonly Plan[] = [
  {
    title: 'GPLv3 Elasticsearch Plugin',
    tag: 'Free — OSS',
    blurb:
      'Open-source. Good for cloud hosting and non-commercial projects.',
    features: [
      'TLS/SSL transport & HTTPS',
      'IP-level ACL',
      'Index, Field, Document-level ACL',
      'JWT / LDAP authentication',
    ],
    cta: { label: 'Download free', href: '/download' },
  },
  {
    title: 'Commercial Elasticsearch Plugin',
    tag: 'Commercial',
    blurb:
      'When the plugin is a component of a proprietary, commercial solution.',
    features: [
      'Everything in Free (OSS)',
      'No GPLv3 limitations',
      'White-label option',
      'ECK Kubernetes operator compatibility',
    ],
    cta: { label: 'Request a quote', href: 'https://readonlyrest.com/quote' },
    highlight: true,
  },
];

export default function ElasticsearchOnly() {
  return (
    <section className="section-dark-2 py-20 md:py-24">
      <div className="page">
        <div className="max-w-3xl">
          <p className="eyebrow-dark">Elasticsearch-only users</p>
          <h2 className="mt-3">No Kibana? No problem.</h2>
          <p className="mt-5 text-[17px] text-white/75 max-w-2xl">
            Two editions of the Elasticsearch plugin, for two licensing realities.{' '}
            <a href="#for-kibana" className="text-white/90">
              Also using Kibana?
            </a>
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {PLANS.map((p) => (
            <article
              key={p.title}
              className={`rounded-[var(--radius-card)] p-7 md:p-8 flex flex-col ${
                p.highlight
                  ? 'bg-[color:var(--color-teal)]/15 border border-[color:var(--color-teal)]/40'
                  : 'bg-white/[0.04] border border-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`text-[11px] font-bold uppercase tracking-[0.14em] px-2 py-1 rounded ${
                    p.highlight
                      ? 'bg-[color:var(--color-teal)] text-white'
                      : 'bg-white/10 text-white/80'
                  }`}
                >
                  {p.tag}
                </span>
              </div>
              <h3 className="mt-4">{p.title}</h3>
              <p className="mt-3 text-[15px] text-white/75 leading-relaxed">
                {p.blurb}
              </p>
              <ul className="check-list mt-5 text-[15px] flex-1">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
