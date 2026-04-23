import { Link } from 'react-router-dom';
import Icon from '../Icon';
import { USE_CASES } from '@/pages/why';

/**
 * Home-page "Use cases" section. Surfaces the /why/* landing pages
 * beyond the nav dropdown — four cards linking to each mini-site.
 *
 * Data comes from src/pages/why/index.ts so the nav dropdown, this
 * section, and the footer column stay in sync.
 */
export default function UseCases() {
  return (
    <section id="use-cases" className="page py-20 md:py-24">
      <div className="max-w-3xl">
        <p className="eyebrow">Use cases</p>
        <h2 className="mt-3 accent-bar">Four wedges. One plugin.</h2>
        <p className="mt-6 text-[17px] text-[color:var(--color-ink-soft)] max-w-2xl">
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
            className="card card-hover flex flex-col no-underline"
          >
            <div className="h-10 w-10 rounded-md bg-[color:var(--color-teal)]/10 text-[color:var(--color-teal)] flex items-center justify-center">
              <Icon name={u.icon} size={20} />
            </div>
            <h3 className="mt-5">{u.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--color-ink-soft)] flex-1">
              {u.blurb}
            </p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[color:var(--color-teal)]">
              Learn more <Icon name="arrow-right" size={14} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
