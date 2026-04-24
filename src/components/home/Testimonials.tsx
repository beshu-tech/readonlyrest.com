import TestimonialCards from '../TestimonialCards';
import Icon from '../Icon';
import type { IconName } from '../Icon';

interface Stat { value: string; label: string }
interface Segment { num: string; label: string; tone: 'pink' | 'teal' | 'ink'; icon: IconName }

const STATS: readonly Stat[] = [
  { value: '1000+', label: 'Tenants in a single cluster' },
  { value: '2013', label: 'OSS Elasticsearch plugin' },
  { value: '4 wk', label: 'Free trial, extendable' },
  { value: 'Monthly', label: 'Releases with fixes & features' },
];

const SEGMENTS: readonly Segment[] = [
  { num: '2+', label: 'S&P 500 top 5', tone: 'pink', icon: 'chart' },
  { num: '3+', label: 'Nuclear research labs', tone: 'teal', icon: 'spark' },
  { num: '2', label: 'European Union institutions', tone: 'ink', icon: 'building' },
  { num: '2+', label: 'Children-focused charities', tone: 'teal', icon: 'shield' },
  { num: '3+', label: 'Government bodies', tone: 'ink', icon: 'award' },
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
          <p className="eyebrow">Since 2017</p>
          <h2 className="mt-3" style={{ textWrap: 'balance' }}>
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
            <p className="eyebrow">Who we protect</p>
            <h3
              className="mt-3 text-[26px] md:text-[30px] font-extrabold tracking-tight leading-[1.15]"
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
          <ul className="md:col-span-7 divide-y divide-[color:var(--color-border-subtle)]">
            {SEGMENTS.map((s) => (
              <li key={s.label} className="flex items-center gap-4 py-3.5 md:py-4">
                <span
                  aria-hidden
                  className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full text-white font-extrabold text-[13.5px] tracking-tight"
                  style={{ background: TONE_BG[s.tone] }}
                >
                  {s.num}
                </span>
                <span className="flex-1 text-[16px] font-medium text-[color:var(--color-ink)]">
                  {s.label}
                </span>
                <Icon
                  name={s.icon}
                  size={18}
                  className="text-[color:var(--color-ink-soft)]/70 shrink-0"
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Quotes */}
        <div className="mt-20">
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
      </div>
    </section>
  );
}
