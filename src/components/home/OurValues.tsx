import type { ReactNode } from 'react';
import Icon, { type IconName } from '../Icon';

interface Value {
  title: string;
  icon: IconName;
  /** Hex accent — drives corner glow and numeric badge. */
  accent: string;
  /** Single-sentence one-liner shown under the title. */
  lead: string;
  /** Optional second paragraph for the "read more" zone at the bottom. */
  body: ReactNode;
}

const VALUES: readonly Value[] = [
  {
    title: 'Security through simplicity',
    icon: 'shield',
    accent: '#0b847a',
    lead: 'Convention over configuration. The weakest link in security is human error.',
    body: (
      <>
        The open-source Elasticsearch plugin has been a reference since
        2013. As a side effect, our solution{' '}
        <strong className="text-[color:var(--color-ink)]">integrates in hours</strong> — not
        days or weeks.
      </>
    ),
  },
  {
    title: 'Performance',
    icon: 'gauge',
    accent: '#ec407a',
    lead: 'Forged in banking, ad-tech, and CERN-scale write rates.',
    body: (
      <>
        Our software has been battle-tested on extra-large clusters with the
        hardest read and write workloads in the industry.
      </>
    ),
  },
  {
    title: 'Accountability',
    icon: 'users',
    accent: '#4f46e5',
    lead: 'The engineers who wrote the code answer your tickets.',
    body: (
      <>
        Enterprise includes <strong className="text-[color:var(--color-ink)]">Priority Support</strong> —
        private email support with a max 2-working-day response SLA.
        No offshore help-desk, no ticket bouncing.
      </>
    ),
  },
  {
    title: 'Continuous improvement',
    icon: 'clock',
    accent: '#2563eb',
    lead: 'Monthly releases. Extra releases on new Elastic versions or CVEs.',
    body: (
      <>
        Layer after layer, year after year. Security is a process, not a product.
      </>
    ),
  },
];

/**
 * "How we work" — four numbered pillars.
 *
 * Replaces the earlier masonry (1 hero + 3 varied-height cards that
 * left awkward voids) with an equal-height 4-up pillar layout: every
 * card same shape, each with a distinct accent colour, numbered 01–04,
 * icon, lead + body. A stat ribbon underneath anchors the dark section
 * with concrete proof points.
 */
export default function OurValues() {
  return (
    <section className="section-soft py-20 md:py-28">
      <div className="relative page">
        <div className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 md:gap-16 items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-hot-pink)]/10 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.16em] text-[color:var(--color-hot-pink)]">
              How we work
            </span>
            <h2 className="mt-4 tracking-tight">
              Four principles, one promise.
            </h2>
          </div>
          <p className="text-[17px] text-[color:var(--color-ink-soft)] leading-relaxed md:max-w-xl">
            Open-source Elasticsearch plugin since 2013. Commercial Kibana
            plugin since 2017. These four principles are why customers keep
            renewing.
          </p>
        </div>

        {/* Pillar grid — equal-height cards, four up on desktop. */}
        <ol className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((v, i) => (
            <li
              key={v.title}
              className="group relative rounded-[var(--radius-card)] overflow-hidden bg-white border border-[color:var(--color-border-subtle)] hover:border-[color:var(--color-ink)]/25 hover:shadow-[var(--shadow-card-lg)] transition-all p-7 flex flex-col"
            >
              {/* Top accent bar */}
              <div
                aria-hidden
                className="absolute top-0 left-0 right-0 h-[3px] pointer-events-none"
                style={{ background: v.accent }}
              />
              {/* Corner tint that warms up on hover */}
              <div
                aria-hidden
                className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-[0.07] group-hover:opacity-20 blur-3xl pointer-events-none transition-opacity"
                style={{ background: `radial-gradient(circle, ${v.accent}ee 0%, ${v.accent}00 60%)` }}
              />

              <div className="relative flex items-center justify-between">
                <div
                  className="h-11 w-11 rounded-md flex items-center justify-center text-white"
                  style={{ background: v.accent }}
                >
                  <Icon name={v.icon} size={22} />
                </div>
                <span
                  aria-hidden
                  className="font-mono text-[12px] font-bold tracking-[0.16em] text-[color:var(--color-ink-soft)]"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <h3 className="relative mt-6 !text-[19px] !font-bold tracking-tight leading-snug">
                {v.title}
              </h3>
              <p className="relative mt-3 text-[14.5px] font-semibold text-[color:var(--color-ink)] leading-relaxed">
                {v.lead}
              </p>
              <div className="relative mt-3 pt-3 border-t border-[color:var(--color-border-subtle)] text-[14px] text-[color:var(--color-ink-soft)] leading-relaxed">
                {v.body}
              </div>
            </li>
          ))}
        </ol>

        {/* Stat ribbon as closing proof — fills the negative space the old
            masonry left behind, and gives the section a grounded ending. */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/10 rounded-[var(--radius-card)] overflow-hidden bg-white/[0.03] border border-white/10">
          {[
            { v: '2013', l: 'OSS Elasticsearch plugin' },
            { v: '2017', l: 'Commercial Kibana plugin' },
            { v: 'Monthly', l: 'Release cadence' },
            { v: 'CERN-scale', l: 'Performance-tested' },
          ].map((s) => (
            <div key={s.l} className="px-6 py-5 md:px-7 md:py-6">
              <div className="text-[20px] md:text-[22px] font-extrabold tracking-tight text-white leading-none">
                {s.v}
              </div>
              <div className="mt-2 text-[12.5px] text-white/60 uppercase tracking-[0.1em]">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
