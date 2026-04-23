import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from './Icon';
import { USE_CASES } from '@/pages/why';

interface NavLink {
  label: string;
  href?: string;
  internal?: boolean;
  submenu?: readonly NavLink[];
}

const USE_CASE_LINKS: readonly NavLink[] = USE_CASES.map((u) => ({
  label: u.shortLabel,
  href: `/why/${u.slug}`,
  internal: true,
}));

const LINKS: readonly NavLink[] = [
  { label: 'Use cases', submenu: USE_CASE_LINKS },
  { label: 'Documentation', href: 'https://docs.readonlyrest.com/' },
  { label: 'Download', href: '/download', internal: true },
  { label: 'Blog', href: 'https://readonlyrest.com/blog/' },
  { label: 'Customer Portal', href: 'https://readonlyrest.com/customer' },
];

function NavAnchor({ link }: { link: NavLink }) {
  const className =
    'flex items-center px-3 py-2 no-underline whitespace-nowrap text-[color:var(--color-ink)] hover:text-[color:var(--color-teal)] transition-colors';
  if (!link.href) return null;
  return link.internal ? (
    <Link to={link.href} className={className}>
      {link.label}
    </Link>
  ) : (
    <a href={link.href} className={className}>
      {link.label}
    </a>
  );
}

/**
 * Desktop dropdown using native <details>. `useLocation` closes the dropdown
 * on route change, and an outside-click listener closes it when the user
 * clicks anywhere outside the summary/menu.
 */
function NavDropdown({ link }: { link: NavLink }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const el = ref.current;
    if (el) el.open = false;
  }, [pathname]);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      const el = ref.current;
      if (!el?.open) return;
      const target = e.target;
      if (target instanceof Node && !el.contains(target)) {
        el.open = false;
      }
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => { document.removeEventListener('pointerdown', onPointerDown); };
  }, []);

  return (
    <details ref={ref} className="relative group">
      <summary className="list-none flex items-center gap-1 px-3 py-2 cursor-pointer whitespace-nowrap text-[color:var(--color-ink)] hover:text-[color:var(--color-teal)] transition-colors select-none">
        {link.label}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden
          className="transition-transform group-open:rotate-180"
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <div className="absolute left-0 top-[calc(100%+4px)] min-w-[260px] bg-white border border-[color:var(--color-border-subtle)] rounded shadow-lg p-2 flex flex-col gap-1 z-50">
        {link.submenu?.map((item) => (
          <NavAnchor key={item.label} link={item} />
        ))}
      </div>
    </details>
  );
}

function NavItem({ link }: { link: NavLink }) {
  if (link.submenu) return <NavDropdown link={link} />;
  return <NavAnchor link={link} />;
}

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-[color:var(--color-border-subtle)]">
      <nav
        aria-label="main navigation"
        className="flex items-center gap-2 h-[68px] px-[var(--page-inline-padding)]"
      >
        <Link to="/" className="shrink-0 flex items-center px-2 py-2 no-underline">
          <img
            src="/images/logo.png"
            alt="ReadonlyREST"
            width={160}
            height={32}
            className="h-8 w-auto"
          />
        </Link>

        <ul className="hidden lg:flex items-center text-[15px] font-medium ml-4">
          {LINKS.map((l) => (
            <li key={l.label} className="flex">
              <NavItem link={l} />
            </li>
          ))}
        </ul>

        <div className="ml-auto hidden md:flex items-center gap-2 shrink-0">
          <a
            href="https://readonlyrest.com/updates/"
            className="text-[14px] font-medium text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)] px-3 py-2 no-underline"
          >
            Stay updated
          </a>
          <a
            href="https://readonlyrest.com/contact"
            className="btn-teal btn-teal-nav"
          >
            Contact us
            <Icon name="arrow-right" size={14} />
          </a>
        </div>

        <details className="ml-auto md:hidden relative group">
          <summary
            aria-label="Open menu"
            className="list-none flex items-center justify-center h-11 w-11 rounded cursor-pointer select-none hover:bg-black/5"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden className="group-open:hidden">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden className="hidden group-open:block">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </summary>
          <div className="absolute right-0 top-[calc(100%+4px)] w-[min(92vw,320px)] bg-white border border-[color:var(--color-border-subtle)] rounded shadow-lg p-2 flex flex-col gap-1 z-50">
            {LINKS.map((l) => {
              if (l.submenu) {
                return (
                  <div key={l.label} className="flex flex-col">
                    <div className="px-3 py-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[color:var(--color-ink-soft)]">
                      {l.label}
                    </div>
                    <div className="flex flex-col pl-2">
                      {l.submenu.map((sub) => (
                        <NavAnchor key={sub.label} link={sub} />
                      ))}
                    </div>
                  </div>
                );
              }
              return <NavAnchor key={l.label} link={l} />;
            })}
            <div className="h-px bg-[color:var(--color-border-subtle)] my-1" />
            <a href="https://readonlyrest.com/updates/" className="px-3 py-2 no-underline text-[color:var(--color-ink-soft)]">
              Stay updated
            </a>
            <a href="https://readonlyrest.com/quote" className="px-3 py-2 no-underline text-[color:var(--color-ink-soft)]">
              Request a quote
            </a>
            <a href="https://readonlyrest.com/contact" className="btn-teal btn-teal-nav justify-start">
              Contact us
            </a>
          </div>
        </details>
      </nav>
    </header>
  );
}
