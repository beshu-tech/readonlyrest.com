import { Link } from 'react-router-dom';
import FaqProduct from '@/components/FaqProduct';
import TestimonialCards from '@/components/TestimonialCards';
import Icon from '@/components/Icon';
import Seo from '@/seo/Seo';
import {
  organizationSchema,
  websiteSchema,
  softwareApplicationSchema,
  webPageSchema,
} from '@/seo/schema';
import { DOWNLOAD_FAQ } from '@/seo/faqContent';

const DOWNLOAD_TITLE =
  'Download ReadonlyREST — free Elasticsearch & Kibana security plugin';
const DOWNLOAD_DESCRIPTION =
  'Self-serve download for the ReadonlyREST plugin for Elasticsearch and Kibana. Signed builds, installation guides, changelog and support links.';

const downloadJsonLd = [
  organizationSchema(),
  websiteSchema(),
  softwareApplicationSchema(),
  webPageSchema({
    url: '/download',
    name: DOWNLOAD_TITLE,
    description: DOWNLOAD_DESCRIPTION,
    image: '/images/download-hero-banner.png',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Download', url: '/download' },
    ],
    mainEntityFaqs: DOWNLOAD_FAQ,
  }),
];

export default function Download() {
  return (
    <>
      <Seo
        title={DOWNLOAD_TITLE}
        description={DOWNLOAD_DESCRIPTION}
        path="/download"
        image="/images/download-hero-banner.png"
        imageAlt="Download ReadonlyREST — a deer in a forest, brand hero"
        keywords="ReadonlyREST download, Elasticsearch plugin download, Kibana plugin download, free Elasticsearch security, ROR plugin"
        jsonLd={downloadJsonLd}
      />

      {/* Compact, content-first hero */}
      <section aria-label="Download hero" className="relative bg-black isolate overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover opacity-45"
          style={{ backgroundImage: 'url(/images/download-hero-banner.png)' }}
          aria-hidden
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(10,10,10,0.9) 100%)' }}
          aria-hidden
        />
        <div className="relative page py-16 md:py-20">
          <nav className="text-[13px] text-white/60 flex items-center gap-2">
            <Link to="/" className="hover:text-white no-underline">Home</Link>
            <span aria-hidden>/</span>
            <span className="text-white/90">Download</span>
          </nav>
          <h1 className="mt-4 font-extrabold tracking-tight text-white max-w-3xl">
            Download <span className="text-[color:var(--color-hot-pink)]">ReadonlyREST</span>
          </h1>
          <p className="mt-4 text-[18px] md:text-[20px] text-white/85 max-w-2xl leading-relaxed">
            Self-serve the latest builds for Elasticsearch and Kibana. Paste your Elastic
            stack version, receive a download link by email.
          </p>
        </div>
      </section>

      {/* Download form + changelog, unified cards */}
      <section className="page py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-6 items-start">
          <div className="rounded-[var(--radius-card)] border border-[color:var(--color-border-subtle)] bg-white overflow-hidden">
            <div className="px-6 py-4 border-b border-[color:var(--color-border-subtle)] flex items-center gap-2">
              <Icon name="download" size={18} className="text-[color:var(--color-teal)]" />
              <h2 className="text-[18px] font-bold">Get your build</h2>
            </div>
            <iframe
              title="Self-service ReadonlyREST plugin download form"
              src="https://portal.readonlyrest.com/download/public"
              loading="lazy"
              className="w-full border-0 block px-4 py-4 md:px-6 md:py-6"
              style={{ minHeight: 620, height: 'clamp(620px, 70vh, 760px)' }}
            />
          </div>

          <div className="rounded-[var(--radius-card)] border border-[color:var(--color-border-subtle)] bg-white overflow-hidden">
            <div className="px-6 py-4 border-b border-[color:var(--color-border-subtle)] flex items-center gap-2">
              <Icon name="clock" size={18} className="text-[color:var(--color-teal)]" />
              <h2 className="text-[18px] font-bold">What&apos;s new</h2>
              <a
                href="https://portal.readonlyrest.com/changelog"
                className="ml-auto text-[13px] text-[color:var(--color-ink-soft)] no-underline hover:text-[color:var(--color-ink)] inline-flex items-center gap-1"
              >
                Full changelog <Icon name="external" size={12} />
              </a>
            </div>
            <iframe
              title="ReadonlyREST changelog"
              src="https://portal.readonlyrest.com/changelog?bg_color=white"
              loading="lazy"
              className="w-full border-0 block px-4 py-4 md:px-6 md:py-6"
              style={{ minHeight: 580, height: 'clamp(580px, 68vh, 720px)' }}
            />
          </div>
        </div>

        <div className="mt-10 max-w-3xl mx-auto p-5 rounded-[var(--radius-card)] bg-[color:var(--color-surface-soft)] border border-[color:var(--color-border-subtle)] flex items-start gap-3">
          <Icon name="info" size={18} className="text-[color:var(--color-ink-soft)] shrink-0 mt-0.5" />
          <div className="text-[15px] leading-relaxed">
            <p className="font-semibold">Looking for plugins for Kibana &lt; 7.9.0?</p>
            <p className="mt-1 text-[color:var(--color-ink-soft)]">
              Available to paying subscribers in the{' '}
              <a href="https://readonlyrest.com/customer/download">downloads</a> section of the customer
              portal. New user and need an older build?{' '}
              <a href="https://readonlyrest.com/contact">Reach out</a>.
            </p>
          </div>
        </div>
      </section>

      {/* Install + support — light, rhythm break */}
      <section className="section-soft py-16 md:py-20">
        <div className="page grid lg:grid-cols-2 gap-6">
          <div className="card p-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-md bg-[color:var(--color-teal)]/10 text-[color:var(--color-teal)] flex items-center justify-center">
                <Icon name="document" size={20} />
              </div>
              <h2 className="!text-[clamp(22px,2.4vw,28px)]">Installation</h2>
            </div>
            <p className="mt-5 text-[15px] text-[color:var(--color-ink-soft)]">
              Step-by-step guides in the official documentation:
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              <li><a href="https://docs.readonlyrest.com/elasticsearch#installing-the-plugin" className="btn-outline-ink">Elasticsearch plugin</a></li>
              <li><a href="https://docs.readonlyrest.com/kibana#installation" className="btn-outline-ink">Kibana plugin</a></li>
              <li><a href="https://docs.readonlyrest.com/examples/multiuser_guide" className="btn-outline-ink">Multi-user Kibana</a></li>
              <li><a href="https://docs.readonlyrest.com/examples/multitenancy_guide" className="btn-outline-ink">Multi-tenant Kibana</a></li>
              <li><a href="https://docs.readonlyrest.com/examples" className="btn-outline-ink">Other tutorials</a></li>
            </ul>

            <div className="mt-10 pt-8 border-t border-[color:var(--color-border-subtle)] grid sm:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-2">
                  <Icon name="forum" size={18} className="text-[color:var(--color-teal)]" />
                  <h3 className="!text-[17px]">Community support</h3>
                </div>
                <p className="mt-2 text-[14px] text-[color:var(--color-ink-soft)]">
                  Free help from the community.
                </p>
                <a href="https://forum.readonlyrest.com/" className="btn-outline-ink mt-3">
                  Join the forum
                </a>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Icon name="chat" size={18} className="text-[color:var(--color-teal)]" />
                  <h3 className="!text-[17px]">Customer support</h3>
                </div>
                <p className="mt-2 text-[14px] text-[color:var(--color-ink-soft)]">
                  Public tickets, or private for Enterprise users.
                </p>
                <a href="https://readonlyrest.com/customer/support" className="btn-outline-ink mt-3">
                  Customer portal
                </a>
              </div>
            </div>
          </div>

          <FaqProduct />
        </div>

        <div className="mt-12 text-center text-[15px] text-[color:var(--color-ink-soft)]">
          <p>
            Questions, comments, issues?{' '}
            <a href="https://readonlyrest.com/contact" className="text-[color:var(--color-ink)]">
              Contact us directly
            </a>
          </p>
          <p className="mt-2">
            Or email{' '}
            <RevealEmail />
          </p>
        </div>
      </section>

      <section className="section-dark py-20">
        <div className="page">
          <div className="max-w-3xl">
            <p className="eyebrow-dark">Customers</p>
            <h2 className="mt-3">Who trusts ReadonlyREST.</h2>
          </div>
          <div className="mt-10">
            <TestimonialCardsDark />
          </div>
        </div>
      </section>
    </>
  );
}

/** Small client-only email reveal — replaces the AT/DOT obfuscation. */
function RevealEmail() {
  const user = 'support';
  const domain = 'readonlyrest.com';
  return (
    <a
      href={`mailto:${user}@${domain}`}
      className="font-mono text-[color:var(--color-teal)]"
      onClick={(e) => {
        // progressive enhancement: browsers with JS will navigate via href
        void e;
      }}
    >
      {user}@{domain}
    </a>
  );
}

/** Dark-mode variant of testimonial cards, reusing data. */
function TestimonialCardsDark() {
  return (
    <div className="testimonials-dark-overrides">
      <TestimonialCards />
    </div>
  );
}
