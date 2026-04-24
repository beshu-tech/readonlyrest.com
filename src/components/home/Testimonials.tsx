import TestimonialCards from '../TestimonialCards';
import Icon from '../Icon';
import type { IconName } from '../Icon';
import SectionEyebrow from '../SectionEyebrow';

interface Stat { value: string; label: string }
interface Segment { num: string; label: string; tone: 'pink' | 'teal' | 'ink'; icon: IconName }

const STATS: readonly Stat[] = [
  { value: '1000+', label: 'Tenants in a single cluster' },
  { value: '2013', label: 'OSS Elasticsearch plugin' },
  { value: '4 wk', label: 'Free trial, extendable' },
  { value: 'Monthly', label: 'Releases with fixes & features' },
];

const TONE_BG: Record<Segment['tone'], string> = {
  pink: 'var(--color-hot-pink)',
  teal: 'var(--color-teal)',
  ink: 'var(--color-ink)',
};

export default function Testimonials() {
  return (
    <section className="section-soft py-20 md:py-24">
      <div className="page">
        <div className="max-w-3xl">
          <SectionEyebrow>Since 2017</SectionEyebrow>
          <h2 className="mt-4" style={{ textWrap: 'balance' }}>
            Hundreds of remarkable organisations{' '}
            <span className="text-[color:var(--color-ink-soft)]">trust&nbsp;us.</span>
          </h2>
        </div>

        {/* Logo wall */}
        <div className="mt-10 relative bg-white border border-[color:var(--color-border-subtle)] rounded-[var(--radius-card)] p-6 md:p-10 overflow-hidden">
          <img
            src="/images/customer-logos.png"
            alt="CERN, UNICEF, Orange, European Parliament, Council of Europe, Fidelity, JCDecaux, RingCentral, QIM, Revenu Québec, STFC, INFN and others"
            loading="lazy"
            className="w-full h-auto block"
          />
        </div>
        <p className="mt-3 text-[12px] text-[color:var(--color-ink-soft)] max-w-3xl leading-relaxed">
          Trademarks of their respective owners; presence does not imply endorsement.
        </p>

        {/* Quotes — directly under the logo wall so the first proof a reader
            scans is a customer's voice, not a stat. */}
        <div className="mt-16 md:mt-20">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h3 className="text-[color:var(--color-ink)]">In their words</h3>
            <a
              href="https://readonlyrest.com/blog"
              className="text-[14px] font-semibold text-[color:var(--color-teal)] inline-flex items-center gap-1.5 no-underline hover:underline"
            >
              Read all case studies <Icon name="arrow-right" size={14} />
            </a>
          </div>
          <div className="mt-6">
            <TestimonialCards />
          </div>
        </div>

        {/* Stats — dark band */}
        <div className="mt-14 rounded-[var(--radius-card)] overflow-hidden bg-[color:var(--color-surface-dark)] text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/10">
            {STATS.map((s) => (
              <div key={s.label} className="p-7 md:p-8">
                <div className="text-[clamp(32px,3.6vw,48px)] font-extrabold tracking-tight leading-none text-white">
                  {s.value}
                </div>
                <div className="mt-3 text-[14px] text-white/70 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Proud to protect — editorial band */}
        <div className="mt-16 md:mt-20 grid md:grid-cols-12 gap-10 md:gap-14 items-start">
          <div className="md:col-span-5">
            <SectionEyebrow>Who we protect</SectionEyebrow>
            <h3
              className="mt-4 text-[26px] md:text-[30px] font-extrabold tracking-tight leading-[1.15]"
              style={{ color: 'var(--color-ink)', textWrap: 'balance' }}
            >
              Proud to protect the data of{' '}
              <span className="text-[color:var(--color-hot-pink)]">
                consequential institutions
              </span>
              .
            </h3>
            <p className="mt-5 text-[15.5px] text-[color:var(--color-ink-soft)] leading-relaxed max-w-md">
              Our customers operate systems where a single access-control mistake has
              real-world cost. We take that seriously.
            </p>
          </div>
          <div className="md:col-span-7">
            <BubbleCluster />
          </div>
        </div>

      </div>
    </section>
  );
}

/**
 * Floating bubble cluster showing the customer segments we protect.
 *
 * Each bubble is an absolutely-positioned disc with a colored tone, a
 * big number, a small icon, and a caption underneath. Positions + sizes
 * are hand-tuned for a deliberate, asymmetric "cluster" feel — not a
 * grid. Animations:
 *  - One-shot stagger-in (opacity 0 + scale 0.85 → 1)
 *  - Continuous micro-float (±10px over 7s, per-bubble delay offset)
 *  - Hover: the hovered bubble scales up and brightens, siblings dim
 *    via `.bubble-cluster:hover .bubble` filter.
 *
 * Dimensions are in percent of the cluster frame, so the composition
 * stays proportional at any width. At narrow widths (below md) we fall
 * back to a simpler stacked grid where the infographic would otherwise
 * overlap awkwardly.
 */
interface Bubble {
  readonly label: string;
  readonly num: string;
  readonly tone: Segment['tone'];
  readonly icon: IconName;
  readonly size: number; // px
  readonly x: number; // % from left
  readonly y: number; // % from top
  readonly floatDelay: number; // ms
}

const BUBBLES: readonly Bubble[] = [
  // Nuclear research labs — flagship CERN, sits top-left, biggest.
  { label: 'Nuclear research labs', num: '3+', tone: 'teal', icon: 'spark', size: 168, x: 2, y: 4, floatDelay: 0 },
  // S&P 500 top 5 — marquee finance, top-right, same weight class.
  { label: 'S&P 500 top 5', num: '2+', tone: 'pink', icon: 'chart', size: 156, x: 58, y: 2, floatDelay: 1800 },
  // European Union institutions — centre-left.
  { label: 'European Union institutions', num: '2', tone: 'ink', icon: 'building', size: 130, x: 28, y: 42, floatDelay: 3400 },
  // Government bodies — bottom-left, medium.
  { label: 'Government bodies', num: '3+', tone: 'ink', icon: 'award', size: 116, x: 4, y: 62, floatDelay: 2500 },
  // Children-focused charities — bottom-right, smallest, teal for warmth.
  { label: 'Children-focused charities', num: '2+', tone: 'teal', icon: 'shield', size: 108, x: 64, y: 58, floatDelay: 900 },
];

function BubbleCluster() {
  return (
    <div
      className="bubble-cluster"
      role="list"
      aria-label="Customer segments we protect"
    >
      {BUBBLES.map((b, i) => (
        <div
          key={b.label}
          role="listitem"
          className="bubble"
          style={{
            left: `${String(b.x)}%`,
            top: `${String(b.y)}%`,
            width: `${String(b.size + 32)}px`,
            ['--size' as string]: `${String(b.size)}px`,
            ['--tone' as string]: TONE_BG[b.tone],
            ['--enter-delay' as string]: `${String(i * 90)}ms`,
            ['--float-delay' as string]: `${String(b.floatDelay)}ms`,
          }}
        >
          <span className="bubble-disc" aria-hidden>
            <span className="bubble-inner">
              <span>{b.num}</span>
              <Icon
                name={b.icon}
                size={Math.round(b.size * 0.18)}
                className="text-white/85"
              />
            </span>
          </span>
          <span className="bubble-label">{b.label}</span>
        </div>
      ))}
    </div>
  );
}
