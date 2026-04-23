import { useState } from 'react';
import Accordion, { type FaqItem } from '../Accordion';

const COMMERCIAL: readonly FaqItem[] = [
  {
    q: 'Why a subscription?',
    a: (
      <>
        <a href="https://www.schneier.com/crypto-gram/archives/2000/0515.html">
          Because security is a process, not a product.
        </a>{' '}
        New builds with fixed vulnerabilities and new features ship every 3–4 weeks.
      </>
    ),
  },
  {
    q: 'Is there a free trial?',
    a: (
      <>
        Yes — <strong>four weeks</strong>, extendable on request.{' '}
        <a href="https://readonlyrest.com/contact">Just ask</a>. Free solution
        architecture and technical assistance throughout validation.
      </>
    ),
  },
  {
    q: 'The Elasticsearch plugin is GPLv3 — intentional?',
    a: (
      <>
        Yes. If it&apos;s too restrictive, go for the Embed contract. If you depend on an OSS
        security tool commercially, it&apos;s in your interest to keep it maintained. See it
        as mandatory sponsorship.
      </>
    ),
  },
  {
    q: 'Does ReadonlyREST comply with Elastic License 2.0?',
    a: <>Yes, absolutely. And we demand that all users comply with it too.</>,
  },
];

const PRODUCT: readonly FaqItem[] = [
  {
    q: 'Do I need to install both Elasticsearch and Kibana plugins?',
    a: (
      <>
        If you use Kibana — or want <strong>authentication</strong>, <strong>multi-user</strong>,
        or <strong>multi-tenancy</strong> — yes. Install our{' '}
        <a href="https://docs.readonlyrest.com/universal-builds">universal</a> Kibana
        plugin. You can test PRO/Enterprise with a{' '}
        <a href="https://readonlyrest.com/customer/trial">trial activation key</a>.
      </>
    ),
  },
  {
    q: 'Do you support older versions (Elastic stack < 7.0.0)?',
    a: (
      <>
        Yes, but only for paying customers. Oldest supported is 6.0.0. Keep plugin
        versions aligned between Kibana and Elasticsearch.
      </>
    ),
  },
  {
    q: 'Do all the latest Kibana apps work?',
    a: (
      <>
        The majority. A few of the newest ones aren&apos;t there yet — we&apos;re improving
        compatibility continuously.
      </>
    ),
  },
  {
    q: 'Will new features work in older Elastic stack versions?',
    a: <>Yes. New features work on all Elasticsearch ≥ 6.0.0 and all Kibana ≥ 7.9.0.</>,
  },
];

type TabKey = 'commercial' | 'product';

export default function Faq() {
  const [tab, setTab] = useState<TabKey>('commercial');
  const items = tab === 'commercial' ? COMMERCIAL : PRODUCT;
  return (
    <section className="page py-20 md:py-24">
      <div className="max-w-3xl">
        <p className="eyebrow-muted">FAQ</p>
        <h2 className="mt-3">Answers to the usual questions.</h2>
      </div>

      <div className="mt-10 inline-flex p-1 rounded-md bg-[color:var(--color-surface-soft)] border border-[color:var(--color-border-subtle)]">
        {(
          [
            { k: 'commercial', label: 'Commercial' },
            { k: 'product', label: 'Product' },
          ] as const
        ).map((t) => (
          <button
            key={t.k}
            type="button"
            onClick={() => { setTab(t.k); }}
            className={`px-5 py-2 text-[14px] font-semibold rounded transition-colors ${
              tab === t.k
                ? 'bg-white text-[color:var(--color-ink)] shadow-sm'
                : 'text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)]'
            }`}
            aria-pressed={tab === t.k}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8 max-w-4xl">
        <Accordion items={items} />
      </div>
    </section>
  );
}
