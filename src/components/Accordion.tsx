import type { ReactNode } from 'react';

export interface FaqItem {
  q: string;
  a: ReactNode;
}

/**
 * Shared FAQ-style accordion. Purely CSS-driven (`<details>`/`<summary>`),
 * so it works without client-side state, matches the site's "no-JS-for-UI"
 * conventions, and stays airgap-clean.
 */
export default function Accordion({ items }: { items: readonly FaqItem[] }) {
  return (
    <dl className="divide-y divide-[color:var(--color-border-subtle)] border-y border-[color:var(--color-border-subtle)]">
      {items.map((item) => (
        <details key={item.q} className="group py-5 px-1">
          <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
            <span className="text-[18px] font-semibold leading-snug">{item.q}</span>
            <span
              aria-hidden
              className="shrink-0 h-6 w-6 rounded-full border border-[color:var(--color-border-subtle)] flex items-center justify-center text-[color:var(--color-ink-soft)] group-open:rotate-45 transition-transform"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
          </summary>
          <div className="mt-3 text-[16px] leading-relaxed text-[color:var(--color-ink)] pr-10">
            {item.a}
          </div>
        </details>
      ))}
    </dl>
  );
}
