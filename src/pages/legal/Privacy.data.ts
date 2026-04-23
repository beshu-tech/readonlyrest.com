import { createElement as h, type ReactNode } from 'react';
import type { LegalPageProps, LegalSection } from '@/components/LegalPage';

/**
 * DRAFT — review with counsel before shipping.
 *
 * This policy is calibrated to ReadonlyREST's actual operations:
 *  - Beshu Limited operates the readonlyrest.com marketing site, the
 *    customer portal (portal.readonlyrest.com), and distributes the
 *    ReadonlyREST plugins that customers install on their own clusters.
 *  - Customer Elasticsearch / Kibana data lives on the customer's own
 *    infrastructure; Beshu does not process it.
 *  - Personal data processed by Beshu is limited to: website analytics,
 *    contact / sales enquiries, customer portal accounts, and support
 *    tickets.
 *
 * UK-GDPR (Beshu is UK-incorporated, London) plus the ICO as the
 * relevant supervisory authority.
 */

const intro: ReactNode = h(
  'p',
  null,
  'Beshu Limited ("Beshu", "we", "us") provides the ReadonlyREST security ',
  'plugin for Elasticsearch and Kibana. This Privacy Policy explains what ',
  'personal data we collect when you visit ',
  h('strong', null, 'readonlyrest.com'),
  ', contact us, sign up for a trial, or use the customer portal at ',
  h('strong', null, 'portal.readonlyrest.com'),
  '. It does not cover the data you index into your own Elasticsearch ',
  'cluster \u2014 that stays on your infrastructure and we never see it.',
);

const sections: readonly LegalSection[] = [
  {
    heading: 'Who we are',
    body: h(
      'span',
      null,
      h(
        'p',
        null,
        'The data controller is ',
        h('strong', null, 'Beshu Limited'),
        ', a company registered in England and Wales, with its registered office in London, United Kingdom. You can reach us at ',
        h('a', { href: 'mailto:support@readonlyrest.com' }, 'support@readonlyrest.com'),
        '.',
      ),
    ),
  },
  {
    heading: 'Information we collect',
    body: h(
      'span',
      null,
      h('p', null, 'We collect personal data you provide directly to us, including:'),
      h(
        'ul',
        null,
        h('li', null, h('strong', null, 'Contact details'), ' \u2014 name, company, email, phone \u2014 when you contact sales, request a quote, or start a trial.'),
        h('li', null, h('strong', null, 'Account credentials'), ' \u2014 email and a hashed password for customer portal accounts.'),
        h('li', null, h('strong', null, 'Billing information'), ' \u2014 invoicing address and VAT number. Card payments are handled by our payment processor; we never see full card numbers.'),
        h('li', null, h('strong', null, 'Support tickets'), ' \u2014 the content of messages you send to support, including any log excerpts or configuration files you attach.'),
        h('li', null, h('strong', null, 'Website analytics'), ' \u2014 anonymous page-view and click data collected via Google Analytics. See the ', h('em', null, 'Cookies'), ' section below.'),
      ),
      h(
        'p',
        null,
        'We do ',
        h('strong', null, 'not'),
        ' collect data you index into your own Elasticsearch or Kibana cluster. ReadonlyREST runs inside your infrastructure; your data never touches Beshu servers.',
      ),
    ),
  },
  {
    heading: 'How we use your information',
    body: h(
      'span',
      null,
      h('p', null, 'We use the personal data above to:'),
      h(
        'ul',
        null,
        h('li', null, 'Deliver trials, subscriptions and plugin builds that you request.'),
        h('li', null, 'Provide and improve customer support, including reproducing issues from the data you share with us in tickets.'),
        h('li', null, 'Process invoicing and payment.'),
        h('li', null, 'Send service emails (release notes, maintenance notices, licence expiry reminders). You can unsubscribe at any time from release notes; service-critical emails such as licence expiry stay active while you are a paying customer.'),
        h('li', null, 'Comply with our legal obligations, including accounting and tax retention.'),
        h('li', null, 'Improve our product and website via aggregated, anonymised analytics.'),
      ),
    ),
  },
  {
    heading: 'Legal basis',
    body: h(
      'span',
      null,
      h('p', null, 'Under UK GDPR, we process personal data on the following legal bases:'),
      h(
        'ul',
        null,
        h('li', null, h('strong', null, 'Contract'), ' \u2014 to provide the subscription, portal and support you signed up for.'),
        h('li', null, h('strong', null, 'Legitimate interests'), ' \u2014 to operate and secure our services, handle enquiries, detect fraud, and improve the product. Our legitimate interests are balanced against your rights and freedoms.'),
        h('li', null, h('strong', null, 'Legal obligation'), ' \u2014 to retain billing records and respond to lawful requests from authorities.'),
        h('li', null, h('strong', null, 'Consent'), ' \u2014 for optional cookies and marketing emails. You can withdraw consent at any time.'),
      ),
    ),
  },
  {
    heading: 'How we share your information',
    body: h(
      'span',
      null,
      h('p', null, h('strong', null, 'We do not sell your personal data. '), 'We share it only with:'),
      h(
        'ul',
        null,
        h('li', null, h('strong', null, 'Service providers'), ' who operate parts of our stack on our behalf \u2014 payment processing, email delivery, analytics, error reporting, cloud hosting. These providers are contractually bound to process data only on our instructions.'),
        h('li', null, h('strong', null, 'Professional advisers'), ' such as accountants and lawyers, when needed for tax filings or legal matters.'),
        h('li', null, h('strong', null, 'Authorities'), ' where we are legally required to do so, or where disclosure is necessary to protect rights, property or safety.'),
        h('li', null, h('strong', null, 'Successors'), ' in the event of a merger, acquisition or asset sale, in which case your data would continue to be protected by this policy or a successor with equivalent terms.'),
      ),
    ),
  },
  {
    heading: 'International transfers',
    body: h(
      'p',
      null,
      'Some of our service providers operate outside the United Kingdom. Where that involves transferring personal data to a country that does not benefit from a UK adequacy decision, we rely on Standard Contractual Clauses or other safeguards approved under UK GDPR.',
    ),
  },
  {
    heading: 'Data retention',
    body: h(
      'span',
      null,
      h('p', null, 'We keep personal data only as long as we need it:'),
      h(
        'ul',
        null,
        h('li', null, h('strong', null, 'Customer portal accounts'), ' \u2014 while your subscription is active, plus 24 months after cancellation for account restoration purposes.'),
        h('li', null, h('strong', null, 'Support tickets'), ' \u2014 48 months, so we can cross-reference recurring issues.'),
        h('li', null, h('strong', null, 'Billing records'), ' \u2014 as required by UK tax law (currently 6 years).'),
        h('li', null, h('strong', null, 'Website analytics'), ' \u2014 up to 14 months, in aggregated form.'),
      ),
    ),
  },
  {
    heading: 'Your rights',
    body: h(
      'span',
      null,
      h('p', null, 'Under UK GDPR you have the right to:'),
      h(
        'ul',
        null,
        h('li', null, 'Access the personal data we hold about you.'),
        h('li', null, 'Correct inaccurate or incomplete data.'),
        h('li', null, 'Request deletion of your data, where retention is no longer necessary.'),
        h('li', null, 'Receive a portable copy of your data.'),
        h('li', null, 'Object to processing based on our legitimate interests.'),
        h('li', null, 'Restrict processing while we verify a dispute.'),
        h('li', null, 'Withdraw consent for processing that relies on it.'),
      ),
      h(
        'p',
        null,
        'To exercise any of these rights, email ',
        h('a', { href: 'mailto:support@readonlyrest.com' }, 'support@readonlyrest.com'),
        '. We aim to respond within 30 days.',
      ),
      h(
        'p',
        null,
        'You also have the right to lodge a complaint with the UK Information Commissioner\u2019s Office (ICO) at ',
        h('a', { href: 'https://ico.org.uk/' }, 'ico.org.uk'),
        '.',
      ),
    ),
  },
  {
    heading: 'Cookies and analytics',
    body: h(
      'span',
      null,
      h(
        'p',
        null,
        'We use a small number of cookies and similar technologies to operate the site and understand how it is used:',
      ),
      h(
        'ul',
        null,
        h('li', null, h('strong', null, 'Strictly necessary'), ' cookies that remember your authentication state in the customer portal.'),
        h('li', null, h('strong', null, 'Analytics'), ' cookies from Google Analytics. These record page views and user journeys in aggregate. The data is pseudonymised and retained for up to 14 months.'),
        h('li', null, h('strong', null, 'Customer support widget'), ' (Papercups) cookies that keep your conversation state while chatting with our team.'),
      ),
      h(
        'p',
        null,
        'We do not run advertising cookies or AdTech trackers.',
      ),
    ),
  },
  {
    heading: 'Security',
    body: h(
      'p',
      null,
      'We apply appropriate technical and organisational measures to protect personal data: encryption in transit, access controls, internal code review for any change to authentication or billing code, and short retention of operational logs. No system is perfectly secure; if you believe your account has been compromised, contact us immediately.',
    ),
  },
  {
    heading: 'Children',
    body: h(
      'p',
      null,
      'ReadonlyREST is a B2B product. We do not knowingly collect personal data from children. If you believe a child has provided us with personal data, contact us and we will delete it.',
    ),
  },
  {
    heading: 'Changes to this policy',
    body: h(
      'p',
      null,
      'We may update this Privacy Policy from time to time. The effective date at the top of this page always reflects the current version. For material changes we will notify active customers by email at least 30 days before the new version takes effect.',
    ),
  },
  {
    heading: 'Contact',
    body: h(
      'span',
      null,
      h(
        'p',
        null,
        'Questions about this policy or about how we handle your data: ',
        h('a', { href: 'mailto:support@readonlyrest.com' }, 'support@readonlyrest.com'),
        '.',
      ),
      h(
        'p',
        null,
        'Postal address is available on request for formal written correspondence.',
      ),
    ),
  },
];

export const PRIVACY_DATA: LegalPageProps = {
  path: '/privacy',
  title: 'Privacy Policy',
  seoTitle: 'Privacy Policy \u2014 ReadonlyREST',
  seoDescription:
    'How Beshu Limited collects, uses and protects personal data for the readonlyrest.com website, customer portal, support channels and subscription services.',
  effectiveDate: '2026-04-23',
  intro,
  sections,
  closing: h(
    'p',
    null,
    'Beshu Limited is registered in England and Wales. Registered office: London, United Kingdom.',
  ),
};
