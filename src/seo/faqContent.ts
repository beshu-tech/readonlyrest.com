/**
 * Plain-text copies of FAQ content for JSON-LD.
 *
 * Why a separate file: Google's FAQPage schema requires plain strings, but the
 * UI version has JSX with <strong>, <a>, code spans, etc. Rather than stripping
 * JSX at runtime (fragile), we keep parallel plain-text versions here.
 *
 * Rule of thumb: edit the JSX in Faq.tsx / FaqProduct.tsx, then update the
 * matching string below. Keep wording close so users see what search engines see.
 */

import type { FaqPair } from './schema';

/** FAQ on the homepage — Commercial tab. */
export const HOME_COMMERCIAL_FAQ: readonly FaqPair[] = [
  {
    q: 'Why a subscription?',
    a: 'Because security is a process, not a product. New builds with fixed vulnerabilities and new features ship every 3–4 weeks.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes — four weeks, extendable on request. Free solution architecture and technical assistance throughout validation.',
  },
  {
    q: 'The Elasticsearch plugin is GPLv3 — intentional?',
    a: 'Yes. If it is too restrictive, go for the Embed contract. If you depend on an open-source security tool commercially, it is in your interest to keep it maintained. See it as mandatory sponsorship.',
  },
  {
    q: 'Does ReadonlyREST comply with Elastic License 2.0?',
    a: 'Yes, absolutely. And we demand that all users comply with it too.',
  },
];

/** FAQ on the homepage — Product tab. */
export const HOME_PRODUCT_FAQ: readonly FaqPair[] = [
  {
    q: 'Do I need to install both Elasticsearch and Kibana plugins?',
    a: 'If you use Kibana — or want authentication, multi-user or multi-tenancy — yes. Install our universal Kibana plugin. You can test PRO and Enterprise with a trial activation key.',
  },
  {
    q: 'Do you support older versions (Elastic stack < 7.0.0)?',
    a: 'Yes, but only for paying customers. Oldest supported is 6.0.0. Keep plugin versions aligned between Kibana and Elasticsearch.',
  },
  {
    q: 'Do all the latest Kibana apps work?',
    a: 'The majority. A few of the newest ones are not there yet — we are improving compatibility continuously.',
  },
  {
    q: 'Will new features work in older Elastic stack versions?',
    a: 'Yes. New features work on all Elasticsearch ≥ 6.0.0 and all Kibana ≥ 7.9.0.',
  },
];

/** FAQ on the download page. */
export const DOWNLOAD_FAQ: readonly FaqPair[] = [
  {
    q: 'Which Elastic stack versions are supported?',
    a: 'Elasticsearch ≥ 6.0.0 and Kibana ≥ 7.9.0 are supported on the public builds. Older Kibana builds are available to paying customers on request.',
  },
  {
    q: "What's in each download?",
    a: 'A signed plugin ZIP ready to install with elasticsearch-plugin install or kibana-plugin install, plus SHA checksums.',
  },
  {
    q: 'Do I need an activation key?',
    a: 'The Free edition does not. PRO and Enterprise features unlock with a trial activation key.',
  },
  {
    q: "Kibana and Elasticsearch versions don't match?",
    a: 'Plugin versions must match the Kibana or Elasticsearch version exactly. Use our universal Kibana plugin to decouple plugin version from Kibana version.',
  },
];

/** Combined homepage FAQ for JSON-LD (both tabs — Google sees all). */
export const HOME_ALL_FAQ: readonly FaqPair[] = [
  ...HOME_COMMERCIAL_FAQ,
  ...HOME_PRODUCT_FAQ,
];
