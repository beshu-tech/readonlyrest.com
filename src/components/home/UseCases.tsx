import { Link } from 'react-router-dom';
import Icon from '../Icon';
import { USE_CASES } from '@/pages/why';

/**
 * Home-page "Use cases" section. Dark, vivid, orb-lit. Each of the four
 * cards carries its own accent color matching its destination /why/*
 * landing page, so scanning the grid already previews which wedge speaks
 * to the reader. The palette + shared icon vocabulary tie the home card
 * back to its mini-site: same mood, same identity.
 */
export default function UseCases() {
  return (
    <section
      id="use-cases"
      className="relative isolate overflow-hidden bg-[color:var(--color-surface-dark)] text-white py-20 md:py-28"
    >
      {/* Multi-hue orb backdrop \u2014 each orb uses one of the four page palettes
          so the section feels alive without introducing any new brand colour. */}
      <div
        aria-hidden
        className="absolute -top-40 -left-32 w-[560px] h-[560px] rounded-full opacity-40 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #0b847acc 0%, #0b847a00 65%)' }}
      />
      <div
        aria-hidden
        className="absolute top-1/2 -right-40 w-[620px] h-[620px] rounded-full opacity-40 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #ec407acc 0%, #ec407a00 65%)' }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 left-1/3 w-[520px] h-[520px] rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #4f46e5cc 0%, #4f46e500 65%)' }}
      />

      <div className="relative page">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-hot-pink)]/15 border border-[color:var(--color-hot-pink)]/30 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.16em] text-[color:var(--color-hot-pink)]">
            Use cases
          </span>
          <h2 className="mt-4 tracking-tight text-white">Four wedges. One plugin.</h2>
          <p className="mt-5 text-[17px] text-white/70 max-w-2xl leading-relaxed">
            Most teams don&apos;t need the full Elastic Platinum bundle &mdash; they need
            one feature from it. ReadonlyREST ships those features at the plugin
            layer, on any tier.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {USE_CASES.map((u) => (
            <Link
              key={u.slug}
              to={`/why/${u.slug}`}
              className="group relative rounded-[var(--radius-card)] overflow-hidden no-underline bg-white/[0.04] border border-white/10 hover:border-white/25 transition-colors p-6 flex flex-col"
              style={{
                // Custom property so the per-card accent can be used inside
                // the card without inline styles everywhere.
                ['--accent' as string]: u.color,
              }}
            >
              {/* Corner orb that lights up on hover */}
              <div
                aria-hidden
                className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-30 group-hover:opacity-60 blur-3xl pointer-events-none transition-opacity"
                style={{ background: `radial-gradient(circle, ${u.color}ee 0%, ${u.color}00 60%)` }}
              />
              {/* Top accent bar */}
              <div
                aria-hidden
                className="absolute top-0 left-0 right-0 h-[3px] pointer-events-none"
                style={{ background: u.color }}
              />

              <div className="relative flex items-center justify-between">
                <div
                  className="h-11 w-11 rounded-md flex items-center justify-center text-white"
                  style={{ background: u.color }}
                >
                  <Icon name={u.icon} size={22} />
                </div>
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.14em] rounded-full px-2 py-1 border"
                  style={{
                    color: u.color,
                    borderColor: `${u.color}55`,
                    background: `${u.color}15`,
                  }}
                >
                  {u.tag}
                </span>
              </div>

              <h3 className="relative mt-6 !text-[20px] !font-bold tracking-tight text-white leading-tight">
                {u.title}
              </h3>
              <p className="relative mt-3 text-[14.5px] leading-relaxed text-white/70 flex-1">
                {u.blurb}
              </p>
              <span
                className="relative mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold transition-colors group-hover:gap-2.5"
                style={{ color: u.color }}
              >
                Learn more <Icon name="arrow-right" size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
