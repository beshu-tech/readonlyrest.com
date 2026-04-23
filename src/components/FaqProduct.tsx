import type { ReactNode } from 'react';

interface Item { q: string; a: ReactNode }

const ITEMS: readonly Item[] = [
  {
    q: "Which Elastic stack versions are supported?",
    a: (
      <>
        Elasticsearch &ge; 6.0.0 and Kibana &ge; 7.9.0 are supported on the public
        builds. Older Kibana builds are available to paying customers on request.
      </>
    ),
  },
  {
    q: "What's in each download?",
    a: (
      <>
        A signed plugin ZIP ready to install with{' '}
        <code className="inline-code">elasticsearch-plugin install</code> or{' '}
        <code className="inline-code">kibana-plugin install</code>, plus SHA checksums.
      </>
    ),
  },
  {
    q: 'Do I need an activation key?',
    a: (
      <>
        The Free edition does not. PRO and Enterprise features unlock with a{' '}
        <a href="https://readonlyrest.com/customer/trial">trial activation key</a>.
      </>
    ),
  },
  {
    q: "Kibana and Elasticsearch versions don't match?",
    a: (
      <>
        Plugin versions must match the Kibana / Elasticsearch version exactly. Use our{' '}
        <a href="https://docs.readonlyrest.com/universal-builds">universal</a> Kibana
        plugin to decouple plugin version from Kibana version.
      </>
    ),
  },
];

export default function FaqProduct() {
  return (
    <div className="card p-8">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-md bg-[color:var(--color-teal)]/10 text-[color:var(--color-teal)] flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="12" cy="12" r="9" />
            <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 1-1 1.7M12 17.25h.01" />
          </svg>
        </div>
        <h2 className="!text-[clamp(22px,2.4vw,28px)]">FAQ</h2>
      </div>
      <dl className="mt-6 divide-y divide-[color:var(--color-border-subtle)]">
        {ITEMS.map((item) => (
          <details key={item.q} className="group py-4 first:pt-0">
            <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
              <span className="text-[16px] font-semibold leading-snug">{item.q}</span>
              <span
                aria-hidden
                className="shrink-0 h-6 w-6 rounded-full border border-[color:var(--color-border-subtle)] flex items-center justify-center text-[color:var(--color-ink-soft)] group-open:rotate-45 transition-transform"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <div className="mt-2 text-[15px] leading-relaxed text-[color:var(--color-ink-soft)] pr-10">
              {item.a}
            </div>
          </details>
        ))}
      </dl>
    </div>
  );
}
