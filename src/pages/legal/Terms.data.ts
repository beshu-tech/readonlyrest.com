import { createElement as h, type ReactNode } from 'react';
import type { LegalPageProps, LegalSection } from '@/components/LegalPage';

/**
 * DRAFT Terms of Service \u2014 review with counsel before shipping.
 *
 * Calibrated to ReadonlyREST reality:
 *  - The Free edition of the Elasticsearch plugin is distributed under
 *    GPLv3. The commercial edition of the Elasticsearch plugin and the
 *    Kibana plugin (Free / PRO / Enterprise) are proprietary: all rights
 *    reserved, licensed under these Terms.
 *  - Beshu Limited does not host customer data. The Service is
 *    primarily: plugin distribution, the customer portal, support.
 *  - Annual subscription, non-refundable, USD, 30-day payment terms.
 *  - English law, exclusive jurisdiction in England and Wales.
 */

const intro: ReactNode = h(
  'p',
  null,
  'These Terms of Service ("Terms") govern your access to and use of the ',
  'ReadonlyREST products and services provided by ',
  h('strong', null, 'Beshu Limited'),
  ' ("Beshu", "we", "us"). By installing a ReadonlyREST plugin, signing ',
  'up for a subscription, or using the customer portal, you agree to be ',
  'bound by these Terms.',
);

const sections: readonly LegalSection[] = [
  {
    heading: 'Definitions',
    body: h(
      'ul',
      null,
      h('li', null, h('strong', null, '"Service"'), ' \u2014 the ReadonlyREST plugins for Elasticsearch and Kibana (Free, PRO, Enterprise and Embed editions), the customer portal at portal.readonlyrest.com, documentation, support, and any related tools or content we provide to you.'),
      h('li', null, h('strong', null, '"Customer"'), ' \u2014 the person or legal entity that has a subscription or account with Beshu.'),
      h('li', null, h('strong', null, '"User"'), ' \u2014 an individual authorised to access the Service on the Customer\u2019s behalf.'),
      h('li', null, h('strong', null, '"Agreement"'), ' \u2014 these Terms together with any order form, subscription confirmation, and the Privacy Policy.'),
      h('li', null, h('strong', null, '"Subscription Term"'), ' \u2014 the period for which the Customer has paid for the Service, as stated in the applicable order form.'),
    ),
  },
  {
    heading: 'Acceptance of Terms',
    body: h(
      'span',
      null,
      h(
        'p',
        null,
        'By accessing, purchasing, or using the Service, the Customer agrees to be bound by this Agreement. If you are accepting on behalf of an organisation, you represent that you have authority to bind that organisation.',
      ),
      h(
        'p',
        null,
        'If you do not agree to these Terms, you must not install the commercial editions of the Service or use the customer portal. The Free edition of the Elasticsearch plugin remains available under its open-source licence (see \u00a7 4).',
      ),
    ),
  },
  {
    heading: 'Licence and usage rights',
    body: h(
      'span',
      null,
      h(
        'p',
        null,
        'Subject to the Customer\u2019s compliance with this Agreement and payment of applicable fees, Beshu grants the Customer a limited, non-exclusive, non-transferable, non-sublicensable licence to install and use the commercial editions of the Service (PRO, Enterprise, Embed) for the Customer\u2019s internal business purposes during the Subscription Term.',
      ),
      h('p', null, 'The Customer, its Users and any third party acting on its behalf must not:'),
      h(
        'ul',
        null,
        h('li', null, 'modify, reverse-engineer, decompile or disassemble the Service, except to the extent expressly permitted by applicable law or by the relevant open-source licence;'),
        h('li', null, 'rent, lease, sell, resell, sublicense or otherwise commercially exploit access to the Service;'),
        h('li', null, 'use the Service to store or transmit infringing, unlawful, or tortious material, or to violate third-party privacy rights;'),
        h('li', null, 'use the Service in any way that interferes with or disrupts integrity or performance of the Service or related infrastructure;'),
        h('li', null, 'attempt to gain unauthorised access to the Service or its related systems or networks.'),
      ),
    ),
  },
  {
    heading: 'Licensing of the components',
    body: h(
      'span',
      null,
      h(
        'p',
        null,
        'The ',
        h('strong', null, 'Free edition of the Elasticsearch plugin'),
        ' is distributed under the GNU General Public License version 3 (GPLv3). Its source is available at ',
        h(
          'a',
          { href: 'https://github.com/sscarduzio/elasticsearch-readonlyrest-plugin' },
          'github.com/sscarduzio/elasticsearch-readonlyrest-plugin',
        ),
        '. Use of the Free edition is governed by the terms of the GPLv3 and is not subject to these Terms, except where the Customer also uses the customer portal or other Beshu services.',
      ),
      h(
        'p',
        null,
        'The ',
        h('strong', null, 'commercial edition of the Elasticsearch plugin'),
        ' and the ',
        h('strong', null, 'ReadonlyREST Kibana plugin'),
        ' (Free, PRO, and Enterprise) are ',
        h('strong', null, 'proprietary software'),
        '. All rights are reserved by Beshu Limited. No source code is disclosed, and no rights are granted beyond the limited licence in \u00a7 3 above.',
      ),
      h(
        'p',
        null,
        'The ',
        h('strong', null, 'Embed'),
        ' contract provides alternative terms for Customers who wish to distribute ReadonlyREST as a component of a proprietary, commercial solution. Contact sales for a separate agreement.',
      ),
      h(
        'p',
        null,
        'The Service interoperates with Elasticsearch and Kibana, which are licensed by Elastic N.V. under their own terms. The Customer is responsible for complying with Elastic\u2019s licence terms for the Elastic stack it deploys alongside ReadonlyREST.',
      ),
    ),
  },
  {
    heading: 'Intellectual property',
    body: h(
      'p',
      null,
      'Beshu and its licensors retain all right, title and interest in and to the Service, including all intellectual-property rights in it. Customers retain all right, title and interest in their own data and in configurations they author. No rights are granted to the Customer other than those expressly set out in this Agreement.',
    ),
  },
  {
    heading: 'Customer data and privacy',
    body: h(
      'span',
      null,
      h(
        'p',
        null,
        'ReadonlyREST is installed on the Customer\u2019s own Elasticsearch and Kibana infrastructure. Customer data indexed into those clusters stays on the Customer\u2019s infrastructure; Beshu does not access, process or store it.',
      ),
      h(
        'p',
        null,
        'Personal data that the Customer or its Users provide to Beshu (account credentials, billing details, support-ticket content) is processed in accordance with our ',
        h('a', { href: '/privacy' }, 'Privacy Policy'),
        '. A Data Processing Agreement is available on request where required by applicable law.',
      ),
    ),
  },
  {
    heading: 'Fees and payment',
    body: h(
      'span',
      null,
      h(
        'p',
        null,
        'Fees for the commercial editions of the Service are set out in the applicable order form or subscription confirmation. All fees are in US Dollars unless otherwise stated, and are payable within 30 days of the invoice date.',
      ),
      h(
        'p',
        null,
        'Subscriptions are billed on an annual basis. ',
        h('strong', null, 'Payment obligations are non-cancelable and fees paid are non-refundable.'),
        ' Renewal fees are payable in advance for each Subscription Term.',
      ),
      h(
        'p',
        null,
        'If the Customer fails to pay any invoice when due, Beshu may, after 15 days\u2019 written notice, suspend access to the customer portal and priority support until payment is received.',
      ),
    ),
  },
  {
    heading: 'Term and termination',
    body: h(
      'span',
      null,
      h(
        'p',
        null,
        'This Agreement continues until all Subscription Terms have expired, unless terminated earlier in accordance with this section.',
      ),
      h(
        'p',
        null,
        'Either party may terminate the Agreement on 30 days\u2019 written notice of a material breach that the other party fails to cure within that period. Either party may terminate immediately on written notice if the other party becomes insolvent, enters administration, or otherwise ceases to trade.',
      ),
      h(
        'p',
        null,
        'On termination, the Customer\u2019s right to use the commercial editions of the Service ends. The Customer must uninstall those editions within a reasonable period. The Free edition remains available under GPLv3.',
      ),
    ),
  },
  {
    heading: 'Warranties and disclaimers',
    body: h(
      'span',
      null,
      h(
        'p',
        null,
        'Beshu warrants that the commercial editions of the Service will perform substantially in accordance with the published documentation during the Subscription Term. If the Service materially fails to conform, Beshu\u2019s sole obligation and the Customer\u2019s exclusive remedy is, at Beshu\u2019s option, to repair the Service or refund the unused portion of pre-paid fees for the non-conforming period.',
      ),
      h(
        'p',
        null,
        h('strong', null, 'Except as expressly set out in this Agreement, the Service is provided "as is". To the maximum extent permitted by law, Beshu disclaims all other warranties, whether express or implied, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement.'),
      ),
    ),
  },
  {
    heading: 'Limitation of liability',
    body: h(
      'span',
      null,
      h(
        'p',
        null,
        'To the maximum extent permitted by law, Beshu\u2019s total aggregate liability arising out of or related to this Agreement shall not exceed the total amount paid by the Customer to Beshu in the twelve months preceding the event giving rise to the claim.',
      ),
      h(
        'p',
        null,
        'Neither party is liable for any indirect, incidental, consequential, special or punitive damages, including lost profits, lost revenue, or loss of data, even if the party has been advised of the possibility of such damages.',
      ),
      h(
        'p',
        null,
        'Nothing in this Agreement excludes or limits liability that cannot be excluded or limited under applicable law, including liability for death or personal injury caused by negligence, or for fraud.',
      ),
    ),
  },
  {
    heading: 'Compliance with laws',
    body: h(
      'span',
      null,
      h(
        'p',
        null,
        'Each party shall comply with all laws and regulations applicable to it in connection with this Agreement, including data-protection, export-control, anti-corruption and sanctions laws.',
      ),
      h(
        'p',
        null,
        'The Customer acknowledges that the Service may be subject to UK, EU and US export-control laws. The Customer must not export or re-export the Service to any jurisdiction or person prohibited by those laws.',
      ),
    ),
  },
  {
    heading: 'Governing law and jurisdiction',
    body: h(
      'p',
      null,
      'This Agreement is governed by and construed in accordance with the laws of ',
      h('strong', null, 'England and Wales'),
      '. The parties submit to the exclusive jurisdiction of the courts of England and Wales for any dispute arising out of or in connection with this Agreement.',
    ),
  },
  {
    heading: 'General',
    body: h(
      'ul',
      null,
      h('li', null, h('strong', null, 'Entire agreement.'), ' This Agreement is the entire agreement between the parties regarding its subject and supersedes any prior agreements on the same subject.'),
      h('li', null, h('strong', null, 'Changes.'), ' We may update these Terms from time to time. The effective date at the top of this page reflects the current version. For material changes affecting active subscriptions, we will notify the Customer by email at least 30 days before the new version takes effect.'),
      h('li', null, h('strong', null, 'Assignment.'), ' Neither party may assign this Agreement without the other party\u2019s prior written consent, except that Beshu may assign it in connection with a merger, acquisition or sale of substantially all its assets.'),
      h('li', null, h('strong', null, 'Notices.'), ' Notices under this Agreement must be given in writing and sent by email to the contact addresses each party has most recently provided to the other.'),
      h('li', null, h('strong', null, 'Severability.'), ' If any provision is held unenforceable, the remaining provisions continue in full force.'),
    ),
  },
  {
    heading: 'Contact',
    body: h(
      'p',
      null,
      'Questions about these Terms: ',
      h('a', { href: 'mailto:support@readonlyrest.com' }, 'support@readonlyrest.com'),
      '.',
    ),
  },
];

export const TERMS_DATA: LegalPageProps = {
  path: '/terms',
  title: 'Terms of Service',
  seoTitle: 'Terms of Service \u2014 ReadonlyREST',
  seoDescription:
    'Terms governing use of the ReadonlyREST plugins, customer portal and support services provided by Beshu Limited.',
  effectiveDate: '2026-04-23',
  intro,
  sections,
  closing: h(
    'p',
    null,
    'Beshu Limited is registered in England and Wales. Registered office: London, United Kingdom.',
  ),
};
