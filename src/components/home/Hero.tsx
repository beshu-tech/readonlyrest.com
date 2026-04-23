import { Link } from 'react-router-dom';
import Icon from '../Icon';

/**
 * Hero — full-bleed deer photograph with left-anchored copy.
 *
 * Composition: left-to-right darkening so the headline sits on solid black
 * while the deer still reads on the right. Trust strip is a full-width band
 * under the headline block (not inline) — reads as proof, not afterthought.
 */
export default function Hero() {
  return (
    <section aria-label="Hero" className="relative isolate overflow-hidden bg-black">
      <img
        src="/images/hero-deer.png"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            'linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.78) 35%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.15) 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      <div className="relative page pt-28 md:pt-36 pb-20 md:pb-28 min-h-[clamp(520px,74vh,760px)] flex flex-col justify-center">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-hot-pink)]">
            Security &amp; multi-tenancy for Elastic Stack
          </p>
          <h1 className="mt-5 font-extrabold tracking-tight text-white">
            The power of{' '}
            <span className="text-[color:var(--color-hot-pink)]">1000</span> ELK
            clusters &mdash; in one.
          </h1>
          <p className="mt-6 text-[19px] md:text-[20px] text-white/85 leading-relaxed">
            Pure Elasticsearch or Kibana. Add authentication, authorization, audit
            and multi-tenancy &mdash; save money, time, and resources.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link to="/download" className="btn-teal text-[15px]">
              <Icon name="download" size={18} />
              Download free
            </Link>
            <a href="#pitch" className="btn-ghost-dark text-[15px]">
              See how it works
              <Icon name="arrow-right" size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-black/40 backdrop-blur-sm">
        <div className="page py-4 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 text-[12.5px] text-white/65">
          <span className="inline-flex items-center gap-2">
            <Icon name="check" size={14} className="text-[color:var(--color-teal)]" />
            4-week free trial
          </span>
          <span className="inline-flex items-center gap-2">
            <Icon name="check" size={14} className="text-[color:var(--color-teal)]" />
            Trusted by CERN, UNICEF, Orange
          </span>
          <span className="inline-flex items-center gap-2">
            <Icon name="check" size={14} className="text-[color:var(--color-teal)]" />
            Monthly releases since 2017
          </span>
        </div>
      </div>
    </section>
  );
}
