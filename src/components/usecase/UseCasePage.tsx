import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Icon, { type IconName } from '@/components/Icon';
import Accordion, { type FaqItem } from '@/components/Accordion';
import TestimonialCards from '@/components/TestimonialCards';
import Seo from '@/seo/Seo';
import SectionEyebrow from '@/components/SectionEyebrow';
import {
  organizationSchema,
  websiteSchema,
  softwareApplicationSchema,
  webPageSchema,
  faqSchema,
} from '@/seo/schema';
import type { FaqPair } from '@/seo/schema';

interface ProblemBlock {
  title: string;
  body: ReactNode;
  bullets: readonly string[];
}

interface SolutionPoint {
  icon: IconName;
  title: string;
  body: ReactNode;
}

interface SolutionBlock {
  title: string;
  body: ReactNode;
  points: readonly SolutionPoint[];
}

interface FeatureCard {
  icon: IconName;
  title: string;
  image: string;
  imageAlt: string;
  body: ReactNode;
  cta?: { label: string; href: string };
}

interface Stat {
  value: string;
  label: string;
}

interface VsRow {
  label: string;
  /** What happens without ReadonlyREST. */
  without: string;
  /** What happens with ReadonlyREST. */
  with: string;
}

/**
 * Per-page visual palette. Each page gets a dominant hue that drives
 * hero gradient orbs and accent highlights. Values are hex strings so
 * they can be interpolated into inline styles.
 */
export interface Palette {
  /** Primary hero orb colour (top-left). */
  primary: string;
  /** Secondary hero orb colour (bottom-right). */
  secondary: string;
  /** Accent badge colour. */
  accent: string;
}

const DEFAULT_PALETTE: Palette = {
  primary: '#0b847a',
  secondary: '#ec407a',
  accent: '#ec407a',
};

const DEFAULT_STATS: readonly Stat[] = [
  { value: '9 yrs', label: 'In production since 2017' },
  { value: '1000+', label: 'Tenants per cluster' },
  { value: 'Monthly', label: 'Release cadence' },
  { value: 'Any tier', label: 'Basic, Gold, Platinum, OSS' },
];

const DEFAULT_TIER_BADGES: readonly string[] = ['Basic', 'Gold', 'Platinum', 'OSS'];

export interface UseCasePageProps {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  subheading: string;
  heroImage: string;
  heroImageAlt: string;
  /** Visual palette for this page. */
  palette?: Palette;
  /** Supported Elastic tiers shown as badges under the hero CTAs. */
  tierBadges?: readonly string[];
  /** Primary CTA href. Defaults to /download. */
  primaryCta?: { label: string; href: string };
  /** Secondary CTA href. Defaults to talk-to-sales. */
  secondaryCta?: { label: string; href: string };
  problem: ProblemBlock;
  /** Optional side-by-side comparison rows for the "vs Platinum" block. */
  vs?: {
    withoutLabel: string;
    withLabel: string;
    rows: readonly VsRow[];
  };
  solution: SolutionBlock;
  features: readonly FeatureCard[];
  /** Stats ribbon data — defaults to DEFAULT_STATS. */
  stats?: readonly Stat[];
  /** FAQ items (rendered + emitted as JSON-LD FAQPage). */
  faq: readonly FaqItem[];
  /** Plain-text mirror of `faq` for SEO. Length must match `faq`. */
  faqPlain: readonly FaqPair[];
  /** Keywords meta. */
  keywords?: string;
}

/**
 * Rotating palette classes for feature-card icon pills. Pages get visual
 * variety without needing per-card configuration.
 */
const PILL_CLASSES: readonly string[] = [
  'bg-[color:var(--color-teal)]/10 text-[color:var(--color-teal)]',
  'bg-[color:var(--color-hot-pink)]/10 text-[color:var(--color-hot-pink)]',
  'bg-[color:var(--color-ink)]/10 text-[color:var(--color-ink)]',
  'bg-[#4f46e5]/10 text-[#4f46e5]',
];

/**
 * Shared /why/* landing page template.
 *
 * Composition: Hero → Problem → Vs → Solution → Features → Stats → Proof → FAQ → CTA.
 * Per-page copy/icons/images/palette come from the data file; layout, SEO
 * wiring and visual language are centralised here.
 */
export default function UseCasePage(props: UseCasePageProps) {
  const {
    slug,
    title,
    seoTitle,
    seoDescription,
    eyebrow,
    subheading,
    heroImage,
    heroImageAlt,
    palette = DEFAULT_PALETTE,
    tierBadges = DEFAULT_TIER_BADGES,
    primaryCta = { label: 'Download free', href: '/download' },
    secondaryCta = { label: 'Talk to sales', href: 'https://readonlyrest.com/contact' },
    problem,
    vs,
    solution,
    features,
    stats = DEFAULT_STATS,
    faq,
    faqPlain,
    keywords,
  } = props;

  const path = `/why/${slug}`;

  const jsonLd = [
    organizationSchema(),
    websiteSchema(),
    softwareApplicationSchema(),
    webPageSchema({
      url: path,
      name: seoTitle,
      description: seoDescription,
      image: heroImage,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Use cases', url: '/#use-cases' },
        { name: title, url: path },
      ],
      mainEntityFaqs: faqPlain,
    }),
    faqSchema(faqPlain),
  ];

  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDescription}
        path={path}
        image={heroImage}
        imageAlt={heroImageAlt}
        {...(keywords ? { keywords } : {})}
        jsonLd={jsonLd}
      />

      {/* Hero — layered image + dual colour orbs + gradient wash */}
      <section aria-label={`${title} hero`} className="relative isolate overflow-hidden bg-[color:var(--color-surface-dark)]">
        <img
          src={heroImage}
          alt={heroImageAlt}
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        {/* Primary orb */}
        <div
          aria-hidden
          className="absolute -top-40 -left-40 w-[620px] h-[620px] rounded-full opacity-70 blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(circle, ${palette.primary}cc 0%, ${palette.primary}00 65%)` }}
        />
        {/* Secondary orb */}
        <div
          aria-hidden
          className="absolute -bottom-48 -right-32 w-[560px] h-[560px] rounded-full opacity-60 blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(circle, ${palette.secondary}cc 0%, ${palette.secondary}00 65%)` }}
        />
        {/* Contrast wash */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.75) 100%)',
          }}
        />

        <div className="relative page pt-28 md:pt-32 pb-20 md:pb-24 min-h-[clamp(520px,68vh,720px)] flex flex-col justify-center">
          <nav className="text-[13px] text-white/70 flex items-center gap-2">
            <Link to="/" className="hover:text-white no-underline">Home</Link>
            <span aria-hidden>/</span>
            <Link to="/#use-cases" className="hover:text-white no-underline">Use cases</Link>
            <span aria-hidden>/</span>
            <span className="text-white">{title}</span>
          </nav>
          <div className="mt-6 max-w-3xl">
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white"
              style={{ background: palette.accent }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white" aria-hidden />
              {eyebrow}
            </span>
            <h1 className="mt-5 font-extrabold tracking-tight text-white">{title}</h1>
            <p className="mt-6 text-[19px] md:text-[21px] text-white/85 leading-relaxed">
              {subheading}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              {primaryCta.href.startsWith('/') ? (
                <Link to={primaryCta.href} className="btn-teal text-[15px]">
                  <Icon name="download" size={18} />
                  {primaryCta.label}
                </Link>
              ) : (
                <a href={primaryCta.href} className="btn-teal text-[15px]">
                  <Icon name="download" size={18} />
                  {primaryCta.label}
                </a>
              )}
              <a href={secondaryCta.href} className="btn-ghost-dark text-[15px]">
                {secondaryCta.label}
                <Icon name="arrow-right" size={16} />
              </a>
            </div>

            {/* Tier-supported strip */}
            <div className="mt-10 flex items-center flex-wrap gap-3">
              <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/60">
                Works on
              </span>
              {tierBadges.map((tier) => (
                <span
                  key={tier}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[13px] font-semibold text-white/90 backdrop-blur-sm"
                >
                  <Icon name="check" size={12} className="text-[color:var(--color-teal)]" />
                  {tier}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Fade into next section */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, var(--color-surface-soft) 100%)',
          }}
        />
      </section>

      {/* Problem */}
      <section className="section-soft py-20 md:py-24">
        <div className="page grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 md:gap-16 items-start">
          <div>
            <SectionEyebrow>The problem</SectionEyebrow>
            <h2 className="mt-4 accent-bar">{problem.title}</h2>
          </div>
          <div>
            <div className="text-[17px] leading-relaxed text-[color:var(--color-ink)]">
              {problem.body}
            </div>
            <ul className="mt-7 space-y-3">
              {problem.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 rounded-lg bg-white border border-[color:var(--color-border-subtle)] px-4 py-3 text-[15.5px] leading-relaxed"
                >
                  <span
                    aria-hidden
                    className="shrink-0 mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--color-hot-pink)]/12 text-[color:var(--color-hot-pink)]"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Vs comparison (optional) */}
      {vs && (
        <section className="page py-16 md:py-20">
          <div className="relative rounded-[var(--radius-card)] overflow-hidden border border-[color:var(--color-border-subtle)] bg-white">
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[color:var(--color-border-subtle)]">
              {/* Without */}
              <div className="relative p-8 md:p-10">
                <div
                  aria-hidden
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: palette.secondary }}
                />
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--color-hot-pink)]/15 text-[color:var(--color-hot-pink)]">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                  <h3 className="!text-[17px] !font-bold text-[color:var(--color-ink)]">{vs.withoutLabel}</h3>
                </div>
                <ul className="mt-5 space-y-3">
                  {vs.rows.map((row) => (
                    <li key={row.label} className="text-[15px] leading-relaxed">
                      <span className="block text-[12px] font-bold uppercase tracking-[0.1em] text-[color:var(--color-ink-soft)]">
                        {row.label}
                      </span>
                      <span className="mt-1 block text-[color:var(--color-ink)]">{row.without}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* With */}
              <div
                className="relative p-8 md:p-10"
                style={{ background: `linear-gradient(180deg, ${palette.primary}0d 0%, transparent 60%)` }}
              >
                <div
                  aria-hidden
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: palette.primary }}
                />
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full text-white"
                    style={{ background: palette.primary }}
                  >
                    <Icon name="check" size={14} />
                  </span>
                  <h3 className="!text-[17px] !font-bold text-[color:var(--color-ink)]">{vs.withLabel}</h3>
                </div>
                <ul className="mt-5 space-y-3">
                  {vs.rows.map((row) => (
                    <li key={row.label} className="text-[15px] leading-relaxed">
                      <span className="block text-[12px] font-bold uppercase tracking-[0.1em] text-[color:var(--color-ink-soft)]">
                        {row.label}
                      </span>
                      <span className="mt-1 block font-semibold text-[color:var(--color-ink)]">{row.with}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Solution — numbered step cards */}
      <section className="page py-20 md:py-24">
        <div className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 md:gap-16 items-start">
          <div>
            <SectionEyebrow accent={palette.primary}>The solution</SectionEyebrow>
            <h2 className="mt-4 accent-bar">{solution.title}</h2>
            <div className="mt-6 text-[17px] leading-relaxed text-[color:var(--color-ink)]">
              {solution.body}
            </div>
          </div>
          <ol className="grid sm:grid-cols-2 gap-4">
            {solution.points.map((p, i) => (
              <li
                key={i}
                className="relative p-6 rounded-[var(--radius-card)] bg-white border border-[color:var(--color-border-subtle)] hover:border-[color:var(--color-ink)]/25 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="inline-flex items-center justify-center w-8 h-8 rounded-md text-white font-extrabold text-[14px] tracking-tight"
                    style={{ background: palette.primary }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <Icon
                    name={p.icon}
                    size={20}
                    className="text-[color:var(--color-ink-soft)]"
                  />
                </div>
                <h3 className="mt-4 !text-[17px] !font-bold">{p.title}</h3>
                <div className="mt-2 text-[15px] leading-relaxed text-[color:var(--color-ink-soft)]">
                  {p.body}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Features */}
      <section className="section-soft py-20 md:py-24">
        <div className="page">
          <div className="max-w-3xl">
            <SectionEyebrow>What you get</SectionEyebrow>
            <h2 className="mt-4">Capabilities that make this use case real.</h2>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((c, i) => {
              const pill = PILL_CLASSES[i % PILL_CLASSES.length] ?? PILL_CLASSES[0];
              return (
                <article
                  key={c.title}
                  className="card card-hover flex flex-col relative overflow-hidden"
                >
                  {/* Decorative accent corner */}
                  <div
                    aria-hidden
                    className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-[0.07] pointer-events-none"
                    style={{ background: palette.primary }}
                  />
                  <div className="relative flex items-start gap-3">
                    <div className={`h-11 w-11 rounded-md flex items-center justify-center shrink-0 ${pill}`}>
                      <Icon name={c.icon} size={22} />
                    </div>
                    <h3 className="mt-1 !text-[18px]">{c.title}</h3>
                  </div>
                  <div className="relative mt-4 text-[15px] leading-relaxed text-[color:var(--color-ink)]">
                    {c.body}
                  </div>
                  <img
                    src={c.image}
                    alt={c.imageAlt}
                    width={1000}
                    height={600}
                    loading="lazy"
                    className="relative mt-6 w-full h-auto rounded border border-[color:var(--color-border-subtle)]"
                  />
                  {c.cta && (
                    <div className="relative mt-5">
                      <a href={c.cta.href} className="btn-ghost no-underline text-[14px]">
                        {c.cta.label}
                        <Icon name="arrow-right" size={14} />
                      </a>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats ribbon */}
      <section className="relative isolate overflow-hidden bg-[color:var(--color-surface-dark)] text-white">
        <div
          aria-hidden
          className="absolute -top-32 right-[-10%] w-[480px] h-[480px] rounded-full opacity-30 blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(circle, ${palette.primary}cc 0%, ${palette.primary}00 60%)` }}
        />
        <div
          aria-hidden
          className="absolute -bottom-40 left-[-10%] w-[480px] h-[480px] rounded-full opacity-25 blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(circle, ${palette.secondary}cc 0%, ${palette.secondary}00 60%)` }}
        />
        <div className="relative page py-14 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y divide-white/10 md:divide-y-0 md:divide-x">
            {stats.map((s) => (
              <div key={s.label} className="p-6 md:p-8 text-center md:text-left">
                <div className="text-[clamp(28px,3.6vw,44px)] font-extrabold tracking-tight leading-none text-white">
                  {s.value}
                </div>
                <div className="mt-3 text-[13px] text-white/70 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="section-dark py-20 md:py-24">
        <div className="page">
          <div className="max-w-3xl">
            <SectionEyebrow accent={palette.accent}>Proof</SectionEyebrow>
            <h2 className="mt-4">Trusted where access-control mistakes are expensive.</h2>
          </div>
          <div className="mt-10 testimonials-dark-overrides">
            <TestimonialCards />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="page py-20 md:py-24">
        <div className="max-w-3xl">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <h2 className="mt-4 accent-bar">Common questions.</h2>
        </div>
        <div className="mt-10 max-w-4xl">
          <Accordion items={faq} />
        </div>
      </section>

      {/* Final CTA — gradient-lit teal band */}
      <section
        className="relative isolate overflow-hidden text-white py-20 md:py-24"
        style={{ background: 'var(--color-teal)' }}
      >
        <div
          aria-hidden
          className="absolute -top-32 -left-20 w-[420px] h-[420px] rounded-full opacity-40 blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(circle, ${palette.secondary}cc 0%, ${palette.secondary}00 65%)` }}
        />
        <div
          aria-hidden
          className="absolute -bottom-40 -right-20 w-[480px] h-[480px] rounded-full opacity-35 blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(circle, ${palette.primary}ee 0%, ${palette.primary}00 60%)` }}
        />
        <div className="relative page max-w-3xl text-center mx-auto">
          <SectionEyebrow tone="dark">10-minute PoC</SectionEyebrow>
          <h2 className="mt-4 text-white">Try it now, on your laptop.</h2>
          <p className="mt-5 text-white/90 text-[17px] leading-relaxed">
            Build the all-in-one Docker image, point your browser at port 5601,
            log in as <strong>admin</strong> / <strong>passwd</strong>.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/download" className="btn-ghost text-[15px]">
              <Icon name="download" size={18} />
              Download free
            </Link>
            <a href="https://readonlyrest.com/contact" className="btn-ghost-dark text-[15px]">
              Talk to sales
              <Icon name="arrow-right" size={16} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
