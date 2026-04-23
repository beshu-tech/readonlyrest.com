import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Seo from '@/seo/Seo';
import { organizationSchema, webPageSchema, websiteSchema } from '@/seo/schema';
import type { Crumb } from '@/seo/schema';

export interface LegalSection {
  heading: string;
  /** Paragraph-level content, or a <p>-free ReactNode for custom layouts. */
  body: ReactNode;
}

export interface LegalPageProps {
  /** URL path, e.g. `/privacy`. */
  path: string;
  /** Page <h1> and breadcrumb label. */
  title: string;
  /** SEO <title> — brand-suffixed. */
  seoTitle: string;
  /** SEO meta description. */
  seoDescription: string;
  /** Effective date, ISO or human-readable. Shown in the hero. */
  effectiveDate: string;
  /** Optional one-paragraph intro. */
  intro?: ReactNode;
  /** Legal body — ordered list of numbered sections. */
  sections: readonly LegalSection[];
  /** Optional closing note (contact, jurisdiction reminder, etc.). */
  closing?: ReactNode;
}

/**
 * Shared layout for legal / policy pages (Privacy, Terms, DPA, Acceptable
 * Use, etc.). Content comes from per-page data files; layout, SEO wiring
 * and breadcrumbs are centralised here.
 */
export default function LegalPage(props: LegalPageProps) {
  const { path, title, seoTitle, seoDescription, effectiveDate, intro, sections, closing } = props;

  const crumbs: readonly Crumb[] = [
    { name: 'Home', url: '/' },
    { name: title, url: path },
  ];
  const jsonLd = [
    organizationSchema(),
    websiteSchema(),
    webPageSchema({
      url: path,
      name: seoTitle,
      description: seoDescription,
      breadcrumbs: crumbs,
    }),
  ];

  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDescription}
        path={path}
        jsonLd={jsonLd}
      />

      {/* Hero — compact, not a sales hero */}
      <section className="section-soft py-14 md:py-16 border-b border-[color:var(--color-border-subtle)]">
        <div className="page">
          <nav className="text-[13px] text-[color:var(--color-ink-soft)] flex items-center gap-2">
            <Link to="/" className="hover:text-[color:var(--color-ink)] no-underline">Home</Link>
            <span aria-hidden>/</span>
            <span className="text-[color:var(--color-ink)]">{title}</span>
          </nav>
          <h1 className="mt-4 font-extrabold tracking-tight">{title}</h1>
          <p className="mt-3 text-[14px] text-[color:var(--color-ink-soft)]">
            Effective date: <strong className="text-[color:var(--color-ink)]">{effectiveDate}</strong>
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-md bg-white border border-[color:var(--color-border-subtle)] px-3 py-2 text-[13px] text-[color:var(--color-ink-soft)]">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 7v4M8 5.25v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            This page is provided for informational purposes and will be
            updated from time to time. Contact us for any question.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="py-14 md:py-20">
        <div className="page grid md:grid-cols-[minmax(0,260px)_minmax(0,1fr)] gap-10 md:gap-16 items-start">
          {/* TOC sidebar */}
          <aside className="md:sticky md:top-24">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[color:var(--color-ink-soft)]">
              Contents
            </p>
            <ol className="mt-4 space-y-2 text-[14px] text-[color:var(--color-ink-soft)]">
              {sections.map((s, i) => {
                const id = sectionId(s.heading);
                return (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="flex items-start gap-2 no-underline hover:text-[color:var(--color-ink)]"
                    >
                      <span className="text-[color:var(--color-ink-soft)]/60 shrink-0">
                        {String(i + 1).padStart(2, '0')}.
                      </span>
                      <span>{s.heading}</span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </aside>

          {/* Article body */}
          <article className="max-w-3xl">
            {intro && (
              <div className="text-[17px] leading-relaxed text-[color:var(--color-ink)]">
                {intro}
              </div>
            )}
            {sections.map((s, i) => {
              const id = sectionId(s.heading);
              return (
                <section key={id} id={id} className="mt-10 scroll-mt-24">
                  <h2 className="!text-[24px] !font-extrabold tracking-tight">
                    <span className="text-[color:var(--color-ink-soft)] mr-2">
                      {String(i + 1).padStart(2, '0')}.
                    </span>
                    {s.heading}
                  </h2>
                  <div className="mt-4 text-[16px] leading-relaxed text-[color:var(--color-ink)] [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-1 [&_a]:text-[color:var(--color-teal)]">
                    {s.body}
                  </div>
                </section>
              );
            })}
            {closing && (
              <div className="mt-12 pt-8 border-t border-[color:var(--color-border-subtle)] text-[15px] leading-relaxed text-[color:var(--color-ink-soft)]">
                {closing}
              </div>
            )}
          </article>
        </div>
      </section>
    </>
  );
}

function sectionId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
