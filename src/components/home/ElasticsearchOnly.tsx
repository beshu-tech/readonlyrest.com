import Icon from '../Icon';

interface Plan {
  title: string;
  tag: string;
  /** Hero deer image baked into the card background. */
  image: string;
  imageAlt: string;
  blurb: string;
  features: readonly string[];
  cta: { label: string; href: string };
  /** Dark tone = commercial edition (black card, teal pill). */
  tone: 'light' | 'dark';
}

const PLANS: readonly Plan[] = [
  {
    title: 'GPLv3 Elasticsearch Plugin',
    tag: 'Free — OSS',
    image: '/images/es-plugin-gpl-deer.png',
    imageAlt: 'ReadonlyREST Free — a chrome-metal deer bust on pale background',
    blurb: 'Open-source. Good for cloud hosting and non-commercial projects.',
    features: [
      'TLS/SSL transport & HTTPS',
      'IP-level ACL',
      'Index, Field, Document-level ACL',
      'JWT / LDAP authentication',
    ],
    cta: { label: 'Download free', href: '/download' },
    tone: 'light',
  },
  {
    title: 'Commercial Elasticsearch Plugin',
    tag: 'Commercial',
    image: '/images/es-plugin-commercial-deer.png',
    imageAlt: 'ReadonlyREST Commercial — a chrome-metal deer bust on black',
    blurb: 'When the plugin is a component of a proprietary, commercial solution.',
    features: [
      'Everything in Free (OSS)',
      'No GPLv3 limitations',
      'White-label option',
      'ECK Kubernetes operator compatibility',
    ],
    cta: { label: 'Request a quote', href: 'https://readonlyrest.com/quote' },
    tone: 'dark',
  },
];

/**
 * "No Kibana? No problem." — two big editorial cards showcasing the two
 * Elasticsearch-only editions. Deer hero photograph fills each card, with
 * a tone-matched gradient fading from the hero at the top to a solid
 * panel at the bottom where the content sits. The copy stays legible
 * regardless of where the deer antlers fall in the image.
 */
export default function ElasticsearchOnly() {
  return (
    <section className="section-soft py-20 md:py-28">
      <div className="page">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-hot-pink)]/10 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.16em] text-[color:var(--color-hot-pink)]">
            Elasticsearch-only users
          </span>
          <h2 className="mt-4 tracking-tight">No Kibana? No problem.</h2>
          <p className="mt-5 text-[17px] text-[color:var(--color-ink-soft)] max-w-2xl leading-relaxed">
            Two editions of the Elasticsearch plugin, for two licensing realities.{' '}
            <a
              href="#for-kibana"
              className="text-[color:var(--color-teal)] hover:underline"
            >
              Also using Kibana?
            </a>
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {PLANS.map((p) => (
            <PlanCard key={p.title} plan={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const isDark = plan.tone === 'dark';
  // Background panel tone — echoes the mock:
  //   light (Free / OSS):  white-to-pale photograph → fades into a dark panel
  //                        from the mid-point down so the feature list has
  //                        enough contrast regardless of image crop.
  //   dark (Commercial):   near-black photograph → stays dark throughout.
  const cardBg = isDark
    ? 'bg-[#0a0d0c]'
    : 'bg-[color:var(--color-surface-dark)]';
  const tileSurface = isDark
    ? 'rgba(8,12,11,0.0)'
    : 'rgba(245,245,240,0.0)';
  // Overlays lock the text-legibility contrast. The Free card has a pale,
  // high-value hero image (chrome deer on near-white) — if the gradient
  // stays light the feature list disappears into the antlers. We stack
  // two layers: a global darkening wash (so even the top half reads as
  // moody, not like a product photo), plus an aggressive bottom fade
  // that floors the content zone at near-black.
  const overlay = isDark
    ? 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.92) 100%)'
    : 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.96) 100%)';
  const pillClass = isDark
    ? 'bg-[color:var(--color-teal)] text-white'
    : 'bg-black/55 text-white border border-white/20 backdrop-blur-sm';
  const ctaClass = isDark
    ? 'btn-teal text-[14px]'
    : 'btn-ghost-dark text-[14px]';

  return (
    <article
      className={`relative rounded-[var(--radius-card)] overflow-hidden border ${
        isDark ? 'border-white/10' : 'border-white/10'
      } ${cardBg} flex flex-col min-h-[560px]`}
      style={{ background: tileSurface }}
    >
      {/* Hero image fills the card. object-top anchors the antlers at the top. */}
      <img
        src={plan.image}
        alt={plan.imageAlt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
      />
      {/* Top-to-bottom overlay keeps the content legible. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: overlay }}
      />

      {/* Tier pill in the top-left corner, overlayed on the hero. */}
      <div className="relative p-6 md:p-7 flex-1 flex flex-col">
        <span
          className={`inline-flex self-start items-center rounded-md px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] ${pillClass}`}
        >
          {plan.tag}
        </span>

        {/* Spacer so the hero dominates the top half. */}
        <div className="flex-1" />

        {/* Content block at the bottom of the card. */}
        <div className="relative mt-auto">
          <h3 className="!text-[22px] md:!text-[24px] !font-extrabold text-white tracking-tight leading-tight">
            {plan.title}
          </h3>
          <p className="mt-3 text-[15px] text-white/75 leading-relaxed">
            {plan.blurb}
          </p>
          <ul className="mt-6 space-y-3 text-[15px] text-white/90">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="shrink-0 mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--color-teal)]/20 text-[color:var(--color-teal)]"
                >
                  <Icon name="check" size={14} />
                </span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <div className="mt-7">
            <a href={plan.cta.href} className={ctaClass}>
              {plan.cta.label}
              <Icon name="arrow-right" size={14} />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
