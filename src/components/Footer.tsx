import { Link } from 'react-router-dom';
import Icon from './Icon';
import { USE_CASES } from '@/pages/why';

const PRODUCTS = [
  { label: 'Free', href: '/#for-kibana' },
  { label: 'PRO', href: '/#for-kibana' },
  { label: 'Enterprise', href: '/#for-kibana' },
  { label: 'Download', href: '/download', internal: true },
  { label: 'Pricing', href: 'https://readonlyrest.com/quote' },
];

const USE_CASES_LINKS = USE_CASES.map((u) => ({
  label: u.shortLabel,
  href: `/why/${u.slug}`,
  internal: true,
}));

const RESOURCES = [
  { label: 'Documentation', href: 'https://docs.readonlyrest.com/' },
  { label: 'Blog', href: 'https://readonlyrest.com/blog/' },
  { label: 'Forum', href: 'https://forum.readonlyrest.com/' },
  { label: 'Changelog', href: 'https://portal.readonlyrest.com/changelog' },
  { label: 'Customer Portal', href: 'https://readonlyrest.com/customer' },
];

const COMPANY = [
  { label: 'About Beshu', href: 'https://beshu.tech/' },
  { label: 'Open Source', href: 'https://github.com/sscarduzio/elasticsearch-readonlyrest-plugin' },
  { label: 'Talk @ CERN', href: 'https://cds.cern.ch/record/2261999' },
  { label: 'Contact', href: 'https://readonlyrest.com/contact' },
  { label: 'Support', href: 'https://readonlyrest.com/customer/support' },
];

interface Item { label: string; href: string; internal?: boolean }
interface Column { heading: string; items: readonly Item[] }

function FooterColumn({ heading, items }: Column) {
  return (
    <div>
      <h5 className="font-bold text-[11px] uppercase tracking-[0.14em] text-white/45 mb-5">
        {heading}
      </h5>
      <ul className="space-y-3 text-[14px]">
        {items.map((item) => (
          <li key={item.label}>
            {item.internal ? (
              <Link to={item.href} className="text-white/75 hover:text-white no-underline transition-colors">
                {item.label}
              </Link>
            ) : (
              <a href={item.href} className="text-white/75 hover:text-white no-underline transition-colors">
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[color:var(--color-surface-dark)] text-white">
      <div className="page pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-4">
            <Link to="/" className="inline-block no-underline">
              <img
                src="/images/logo.png"
                alt="ReadonlyREST"
                width={160}
                height={32}
                loading="lazy"
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-5 text-[14px] leading-relaxed text-white/70 max-w-xs">
              Authentication, authorization, audit and multi-tenancy for Elasticsearch
              and Kibana. Built in London since 2017.
            </p>

            <div className="mt-6 flex items-center gap-2">
              <a
                href="https://github.com/sscarduzio/elasticsearch-readonlyrest-plugin"
                aria-label="GitHub"
                className="h-9 w-9 flex items-center justify-center rounded border border-white/15 text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition-colors no-underline"
              >
                <Icon name="github" size={16} />
              </a>
              <a
                href="https://twitter.com/readonlyrest"
                aria-label="Twitter / X"
                className="h-9 w-9 flex items-center justify-center rounded border border-white/15 text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition-colors no-underline"
              >
                <Icon name="twitter" size={14} />
              </a>
              <a
                href="https://forum.readonlyrest.com/"
                aria-label="Community Forum"
                className="h-9 w-9 flex items-center justify-center rounded border border-white/15 text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition-colors no-underline"
              >
                <Icon name="forum" size={15} />
              </a>
            </div>

            <a
              href="https://readonlyrest.com/updates/"
              className="mt-7 inline-flex items-center gap-2 text-[13px] text-white/70 hover:text-white no-underline"
            >
              <Icon name="mail" size={14} />
              Subscribe to release notes
            </a>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <FooterColumn heading="Products" items={PRODUCTS} />
            <FooterColumn heading="Use cases" items={USE_CASES_LINKS} />
            <FooterColumn heading="Resources" items={RESOURCES} />
            <FooterColumn heading="Company" items={COMPANY} />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="page py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[12px] text-white/50">
          <p>
            &copy; 2017–2026 Beshu Limited. ReadonlyREST is a trademark of Beshu
            Limited — Established in London, UK.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <Link to="/privacy" className="text-white/55 hover:text-white no-underline">Privacy</Link>
            <Link to="/terms" className="text-white/55 hover:text-white no-underline">Terms</Link>
            <a href="https://readonlyrest.com/contact" className="text-white/55 hover:text-white no-underline">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
