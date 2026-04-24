import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import Icon, { type IconName } from '../Icon';
import SectionEyebrow from '../SectionEyebrow';

type Tier = 'Free' | 'PRO' | 'Enterprise';

interface Card {
  title: string;
  image: string;
  icon: IconName;
  tier: Tier;
  body: ReactNode;
  cta?: { label: string; href: string };
}

const CARDS: readonly Card[] = [
  {
    title: 'Tweak the Look & Feel in Kibana',
    image: '/images/kibana-tweaked-css.png',
    icon: 'layers',
    tier: 'PRO',
    body: (
      <>
        <p>
          Make Kibana blend in with your company branding. Use the ReadonlyREST Kibana
          plugin to overlay custom CSS stylesheets and JavaScript. Styles and behaviour
          of every page are cleanly overridden.
        </p>
        <p className="mt-3">
          Gone are the days of unreliably patching source files every time Kibana
          updates. Our custom assets get dynamically loaded on every page.
        </p>
      </>
    ),
    cta: {
      label: 'Kibana UI tweaking docs',
      href: 'https://docs.readonlyrest.com/kibana#kibana-ui-tweaking',
    },
  },
  {
    title: 'Off-site auditing & monitoring',
    image: '/images/kibana-audit-monitoring.png',
    icon: 'chart',
    tier: 'Enterprise',
    body: (
      <>
        <p>
          Keep an eye on accesses, failed logins, and data access with single-user
          granularity. Spot the users and queries hogging resources the most.
        </p>
        <p className="mt-3">
          Optionally, audit logs can be shipped to a dedicated remote ES cluster for
          further analysis and better security.
        </p>
      </>
    ),
    cta: {
      label: 'Audit Logs docs',
      href: 'https://docs.readonlyrest.com/kibana#audit-log',
    },
  },
  {
    title: 'Efficient data segregation',
    image: '/images/data-segregation.png',
    icon: 'layers',
    tier: 'Enterprise',
    body: (
      <>
        <p>
          Stop creating a new cluster for each project. Save tons of computing
          resources by using a single Elasticsearch cluster and Kibana instance for
          virtually unlimited projects.
        </p>
        <p className="mt-3">A new tenancy can be created or destroyed in 1 second.</p>
        <p className="mt-3">
          With <strong>group mapping</strong>, creating a tenancy is as quick as
          creating an LDAP group.
        </p>
        <p className="mt-3 text-[14px] text-[color:var(--color-ink-soft)]">
          Complete segregation is optional — sometimes the same indices can be read by
          multiple groups, avoiding data duplication.
        </p>
      </>
    ),
    cta: {
      label: 'Multi-tenancy guide',
      href: 'https://docs.readonlyrest.com/examples/multitenancy_guide',
    },
  },
  {
    title: 'Bring your own authentication',
    image: '/images/ldap-saml-auth.png',
    icon: 'key',
    tier: 'Enterprise',
    body: (
      <>
        <p>
          All major enterprise-grade authentication and authorization protocols are
          supported out of the box:{' '}
          <a href="https://docs.readonlyrest.com/examples">SAML, LDAP, OpenID Connect</a>.
        </p>
        <p className="mt-3">
          <a href="https://docs.readonlyrest.com/kibana/impersonation">
            User impersonation and external auth mocking
          </a>{' '}
          is supported in our GUI — no need to spin up a test LDAP server or SAML IdP.
        </p>
        <p className="mt-3 text-[14px] text-[color:var(--color-ink-soft)]">
          Non-standard auth systems: reverse proxy, external basic auth, or a REST
          microservice.
        </p>
      </>
    ),
  },
  {
    title: 'Elastic Cloud integration',
    image: '/images/elastic-cloud-ccs.png',
    icon: 'cloud',
    tier: 'Enterprise',
    body: (
      <>
        <p>
          Keep all data in a cluster in the cheapest Elastic Cloud tier. Enforce access
          control and multi-tenancy with ReadonlyREST.
        </p>
        <p className="mt-3">
          Works thanks to Elastic Cloud&apos;s{' '}
          <a href="https://www.elastic.co/guide/en/cloud/current/ec-trust-management.html#ec-trust-self-managed">
            Trusted environments
          </a>{' '}
          and{' '}
          <a href="https://www.elastic.co/guide/en/cloud/current/ec-enable-ccs.html">
            Cross-Cluster Search (CCS)
          </a>
          .
        </p>
      </>
    ),
    cta: {
      label: 'Elastic Cloud interop docs',
      href: 'https://docs.readonlyrest.com/examples/elastic-cloud-cluster-integration',
    },
  },
  {
    title: 'Only show the right Kibana apps',
    image: '/images/hide-kibana-apps.png',
    icon: 'eye-off',
    tier: 'PRO',
    body: (
      <>
        <p>Should the sales team use the machine learning app?</p>
        <p>Should auditors see anything besides dashboards?</p>
        <p className="mt-3">
          ReadonlyREST can <strong>disable any Kibana app</strong> for any user or
          group.
        </p>
      </>
    ),
    cta: {
      label: 'Hide Kibana apps docs',
      href: 'https://docs.readonlyrest.com/kibana#hiding-kibana-apps',
    },
  },
  {
    title: 'Reboot-less security settings editor',
    image: '/images/reboot-less-settings.png',
    icon: 'gauge',
    tier: 'PRO',
    body: (
      <>
        <p>
          Add a user, modify permissions, tweak LDAP connectors, then click SAVE. All
          Elasticsearch nodes pick up the changes in seconds. Goodbye rolling
          restarts.
        </p>
        <p className="mt-3 text-[14px] text-[color:var(--color-ink-soft)]">
          Available in <strong>GUI</strong> and <strong>API</strong> mode (Enterprise
          edition).
        </p>
      </>
    ),
    cta: {
      label: 'Settings API docs',
      href: 'https://docs.readonlyrest.com/kibana/readonlyrest-api',
    },
  },
  {
    title: 'Testable access control',
    image: '/images/testable-acl.png',
    icon: 'git',
    tier: 'Enterprise',
    body: (
      <>
        <p>
          Our ACL is <strong>testable</strong> with code. Write tests that use simple
          HTTP headers to impersonate users and groups.
        </p>
        <p className="mt-3">
          Add mock users to LDAP/SAML connectors in the impersonation GUI and use them
          in your tests — no dummy auth servers needed.
        </p>
      </>
    ),
    cta: {
      label: 'Test settings guide',
      href: 'https://docs.readonlyrest.com/kibana/readonlyrest-api',
    },
  },
];

/**
 * Rotating icon-pill palette. Each card gets a distinct hue so the grid
 * reads as varied rather than a wall of teal pills.
 */
const PILL_PALETTES = [
  { bg: 'bg-[color:var(--color-teal)]/10', fg: 'text-[color:var(--color-teal)]', tint: '#0b847a' },
  { bg: 'bg-[color:var(--color-hot-pink)]/10', fg: 'text-[color:var(--color-hot-pink)]', tint: '#ec407a' },
  { bg: 'bg-[#4f46e5]/10', fg: 'text-[#4f46e5]', tint: '#4f46e5' },
  { bg: 'bg-[color:var(--color-ink)]/10', fg: 'text-[color:var(--color-ink)]', tint: '#373835' },
] as const;

type Palette = (typeof PILL_PALETTES)[number];

/** Safe lookup that rotates through the palette list by index. */
function palette(i: number): Palette {
  return PILL_PALETTES[i % PILL_PALETTES.length] ?? PILL_PALETTES[0];
}

/**
 * Subscription-tier pill shown on each feature card, matching the
 * ReadonlyREST commercial plans. Free = muted, PRO = teal, Enterprise
 * = hot pink, so the tier hierarchy reads at a glance.
 */
function TierBadge({ tier, theme }: { tier: Tier; theme: 'light' | 'dark' }) {
  const isDark = theme === 'dark';
  const styles: Record<Tier, string> = isDark
    ? {
        Free: 'border-white/25 text-white/85 bg-white/10',
        PRO: 'border-[color:var(--color-teal)]/50 text-[color:var(--color-teal)] bg-[color:var(--color-teal)]/15',
        Enterprise:
          'border-[color:var(--color-hot-pink)]/50 text-[color:var(--color-hot-pink)] bg-[color:var(--color-hot-pink)]/15',
      }
    : {
        Free: 'border-[color:var(--color-border-subtle)] text-[color:var(--color-ink-soft)] bg-white',
        PRO: 'border-[color:var(--color-teal)]/40 text-[color:var(--color-teal)] bg-[color:var(--color-teal)]/10',
        Enterprise:
          'border-[color:var(--color-hot-pink)]/40 text-[color:var(--color-hot-pink)] bg-[color:var(--color-hot-pink)]/10',
      };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.16em] ${styles[tier]}`}
    >
      {tier}
    </span>
  );
}

export default function FeatureCards() {
  const [featured, ...rest] = CARDS;

  // Split the non-featured cards into two stripes so we can weave a dark
  // band through the middle of the section. Top 3 on soft cream, the
  // second stripe sits on a dark panel for rhythm and visual contrast.
  const firstStripe = rest.slice(0, 3);
  const secondStripe = rest.slice(3);
  const featuredPalette = palette(0);

  return (
    <section className="section-soft py-20 md:py-28">
      <div className="page">
        {/* Header with stat badges */}
        <div className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 md:gap-16 items-end">
          <div>
            <SectionEyebrow>Features</SectionEyebrow>
            <h2 className="mt-4 accent-bar">Everything you need for Elastic security.</h2>
          </div>
          <ul className="flex flex-wrap gap-3 md:justify-end">
            {[
              { v: '8', l: 'capabilities' },
              { v: 'Any', l: 'Elastic tier' },
              { v: '2017', l: 'battle-tested since' },
            ].map((s) => (
              <li
                key={s.l}
                className="inline-flex items-baseline gap-2 rounded-full bg-white border border-[color:var(--color-border-subtle)] px-4 py-2"
              >
                <span className="text-[16px] font-extrabold tracking-tight text-[color:var(--color-ink)]">
                  {s.v}
                </span>
                <span className="text-[12px] uppercase tracking-[0.12em] text-[color:var(--color-ink-soft)]">
                  {s.l}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Featured editorial card — alternating left/right isn't needed
            for a single featured; keep one big row so the visual weight
            anchors the section. */}
        <article className="relative mt-12 rounded-[var(--radius-card)] overflow-hidden bg-white border border-[color:var(--color-border-subtle)] shadow-[var(--shadow-card)] group">
          <div
            aria-hidden
            className="absolute -top-28 -right-24 w-[360px] h-[360px] rounded-full opacity-30 blur-3xl pointer-events-none"
            style={{ background: `radial-gradient(circle, ${featuredPalette.tint}aa 0%, ${featuredPalette.tint}00 65%)` }}
          />
          <div className="relative grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] items-stretch">
            <div className="p-8 md:p-10 lg:p-12 flex flex-col">
              <div className="flex items-center gap-3">
                <div className={`h-12 w-12 rounded-md flex items-center justify-center shrink-0 ${featuredPalette.bg} ${featuredPalette.fg}`}>
                  <Icon name={featured.icon} size={24} />
                </div>
                <span
                  className="text-[11px] font-bold uppercase tracking-[0.16em]"
                  style={{ color: featuredPalette.tint }}
                >
                  Featured capability
                </span>
                <span className="ml-auto">
                  <TierBadge tier={featured.tier} theme="light" />
                </span>
              </div>
              <h3 className="mt-5 !text-[26px] md:!text-[30px] !font-extrabold tracking-tight leading-tight">
                {featured.title}
              </h3>
              <div className="mt-4 text-[15.5px] leading-relaxed text-[color:var(--color-ink)] flex-1">
                {featured.body}
              </div>
              {featured.cta && (
                <div className="mt-7">
                  <a href={featured.cta.href} className="btn-teal text-[14px]">
                    {featured.cta.label}
                    <Icon name="arrow-right" size={14} />
                  </a>
                </div>
              )}
            </div>
            <div className="relative bg-[color:var(--color-surface-soft)] border-t md:border-t-0 md:border-l border-[color:var(--color-border-subtle)] p-8 md:p-10 flex items-center justify-center">
              <img
                src={featured.image}
                alt={featured.title}
                width={1000}
                height={600}
                loading="lazy"
                className="w-full h-auto rounded border border-[color:var(--color-border-subtle)] shadow-[var(--shadow-card-lg)] transition-transform group-hover:-translate-y-1"
              />
            </div>
          </div>
        </article>

        {/* First stripe — horizontal carousel on the soft background. */}
        <CarouselRow theme="light" className="mt-8">
          {firstStripe.map((c, i) => (
            <CarouselItem key={c.title}>
              <FeatureCard card={c} palette={palette(i + 1)} theme="light" />
            </CarouselItem>
          ))}
        </CarouselRow>
      </div>

      {/* Dark stripe for the second half \u2014 breaks the white rhythm. */}
      {secondStripe.length > 0 && (
        <div className="relative mt-16 md:mt-20 py-16 md:py-20 bg-[color:var(--color-surface-dark)] overflow-hidden">
          <div
            aria-hidden
            className="absolute -top-40 -left-20 w-[480px] h-[480px] rounded-full opacity-25 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, #0b847acc 0%, #0b847a00 60%)' }}
          />
          <div
            aria-hidden
            className="absolute -bottom-40 -right-20 w-[560px] h-[560px] rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, #ec407acc 0%, #ec407a00 60%)' }}
          />
          <div className="relative page">
            <div className="max-w-2xl">
              <SectionEyebrow tone="dark">Operational wins</SectionEyebrow>
              <h3 className="mt-4 !text-[24px] !font-extrabold text-white tracking-tight">
                Features that make production life easier.
              </h3>
            </div>
            <CarouselRow theme="dark" className="mt-8">
              {secondStripe.map((c, i) => (
                <CarouselItem key={c.title}>
                  <FeatureCard
                    card={c}
                    palette={palette(i + firstStripe.length + 1)}
                    theme="dark"
                  />
                </CarouselItem>
              ))}
            </CarouselRow>
          </div>
        </div>
      )}
    </section>
  );
}

function FeatureCard({
  card,
  palette,
  theme,
}: {
  card: Card;
  palette: Palette;
  theme: 'light' | 'dark';
}) {
  const isDark = theme === 'dark';
  return (
    <article
      className={`group relative rounded-[var(--radius-card)] overflow-hidden flex flex-col transition-colors ${
        isDark
          ? 'bg-white/[0.04] border border-white/10 hover:border-white/25'
          : 'card card-hover'
      }`}
    >
      <div
        aria-hidden
        className="absolute -top-14 -right-14 w-40 h-40 rounded-full opacity-[0.07] group-hover:opacity-20 blur-2xl pointer-events-none transition-opacity"
        style={{ background: palette.tint }}
      />

      {/* Tier badge floats in the top-right corner of every card. */}
      <div className={`absolute top-4 right-4 z-[1] ${isDark ? '' : ''}`}>
        <TierBadge tier={card.tier} theme={isDark ? 'dark' : 'light'} />
      </div>

      <div className={`relative flex items-start gap-3 pr-24 ${isDark ? 'px-6 pt-6' : ''}`}>
        <div
          className={`h-11 w-11 rounded-md flex items-center justify-center shrink-0 ${palette.bg} ${palette.fg}`}
        >
          <Icon name={card.icon} size={22} />
        </div>
        <h3
          className={`mt-1 !text-[17px] !font-bold leading-tight ${isDark ? 'text-white' : ''}`}
        >
          {card.title}
        </h3>
      </div>
      <div
        className={`relative mt-4 text-[14.5px] leading-relaxed ${
          isDark ? 'text-white/70 px-6' : 'text-[color:var(--color-ink)]'
        }`}
      >
        {card.body}
      </div>
      <img
        src={card.image}
        alt={card.title}
        width={1000}
        height={600}
        loading="lazy"
        className={`relative mt-5 w-full h-auto ${
          isDark
            ? 'rounded border border-white/10 mx-0 px-6 pb-0'
            : 'rounded border border-[color:var(--color-border-subtle)]'
        }`}
        style={isDark ? { padding: '0 24px' } : undefined}
      />
      {card.cta && (
        <div className={`relative mt-5 ${isDark ? 'px-6 pb-6' : ''}`}>
          <a
            href={card.cta.href}
            className={`no-underline inline-flex items-center gap-1.5 text-[13.5px] font-semibold ${
              isDark ? 'text-white/80 hover:text-white' : 'btn-ghost'
            }`}
          >
            {card.cta.label}
            <Icon name="arrow-right" size={14} />
          </a>
        </div>
      )}
      {!card.cta && !isDark && <div className="mt-5" />}
    </article>
  );
}

/**
 * Horizontal carousel with CSS scroll-snap and desktop prev/next arrows.
 *
 * - Uses the browser's native horizontal scroll (so touch/trackpad work
 *   out of the box; no third-party dep).
 * - Each child is wrapped in a fixed-width, snap-start tile via
 *   `<CarouselItem>`.
 * - Prev/next buttons scroll by roughly one viewport width of the track,
 *   disabled at the ends. Edge-fade masks hint at overflow.
 */
function CarouselRow({
  children,
  theme,
  className,
}: {
  children: ReactNode;
  theme: 'light' | 'dark';
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const isDark = theme === 'dark';

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateEdges();
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => { updateEdges(); };
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateEdges);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateEdges);
    };
  }, [updateEdges]);

  const scrollBy = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    // Scroll by ~80% of the visible width, so each click reveals the
    // next tile group without overshooting.
    const delta = Math.round(el.clientWidth * 0.85) * dir;
    el.scrollBy({ left: delta, behavior: 'smooth' });
  }, []);

  const arrowBase =
    'inline-flex items-center justify-center w-10 h-10 rounded-full border transition-all disabled:opacity-30 disabled:cursor-not-allowed';
  const arrowLight =
    'bg-white border-[color:var(--color-border-subtle)] text-[color:var(--color-ink)] hover:border-[color:var(--color-ink)]/30 hover:shadow-[var(--shadow-card)]';
  const arrowDark =
    'bg-white/10 border-white/20 text-white hover:bg-white/15 hover:border-white/35';

  return (
    <div className={`relative ${className ?? ''}`}>
      {/* Edge-fade masks — subtle hint that there's more content. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute top-0 bottom-0 left-0 w-8 z-10 transition-opacity ${
          canPrev ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: isDark
            ? 'linear-gradient(90deg, rgba(10,10,10,0.85), rgba(10,10,10,0))'
            : 'linear-gradient(90deg, rgba(247,245,242,0.9), rgba(247,245,242,0))',
        }}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute top-0 bottom-0 right-0 w-8 z-10 transition-opacity ${
          canNext ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: isDark
            ? 'linear-gradient(270deg, rgba(10,10,10,0.85), rgba(10,10,10,0))'
            : 'linear-gradient(270deg, rgba(247,245,242,0.9), rgba(247,245,242,0))',
        }}
      />

      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-px-4 pb-2 -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {children}
      </div>

      {/* Controls row — prev/next arrows + a short hint. Only meaningful
          on desktop; mobile users swipe. */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <span
          className={`text-[13px] ${
            isDark ? 'text-white/55' : 'text-[color:var(--color-ink-soft)]'
          }`}
        >
          Swipe or use the arrows
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Scroll to previous capabilities"
            onClick={() => { scrollBy(-1); }}
            disabled={!canPrev}
            className={`${arrowBase} ${isDark ? arrowDark : arrowLight}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Scroll to next capabilities"
            onClick={() => { scrollBy(1); }}
            disabled={!canNext}
            className={`${arrowBase} ${isDark ? arrowDark : arrowLight}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * A snap-aligned fixed-width tile. We give it a responsive min/max
 * width so the carousel always shows roughly one-at-a-time on mobile,
 * two on md, three on lg. Height stretches to the tallest sibling so
 * the arrows row stays aligned across breakpoints.
 */
function CarouselItem({ children }: { children: ReactNode }) {
  return (
    <div
      className="shrink-0 snap-start basis-[min(86vw,360px)] sm:basis-[380px] lg:basis-[calc((100%-2*1.25rem)/3)] flex"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="flex flex-col w-full">{children}</div>
    </div>
  );
}
