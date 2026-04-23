import Seo from '@/seo/Seo';
import {
  organizationSchema,
  websiteSchema,
  softwareApplicationSchema,
  webPageSchema,
  reviewSchema,
} from '@/seo/schema';
import { HOME_ALL_FAQ } from '@/seo/faqContent';
import { faqSchema } from '@/seo/schema';

import Hero from '@/components/home/Hero';
import Pitch from '@/components/home/Pitch';
import Testimonials from '@/components/home/Testimonials';
import ForKibana from '@/components/home/ForKibana';
import ElasticsearchOnly from '@/components/home/ElasticsearchOnly';
import FeatureCards from '@/components/home/FeatureCards';
import UseCases from '@/components/home/UseCases';
import OurValues from '@/components/home/OurValues';
import KubernetesSection from '@/components/home/KubernetesSection';
import DockerSection from '@/components/home/DockerSection';
import WeWorkTogether from '@/components/home/WeWorkTogether';
import Faq from '@/components/home/Faq';

const HOME_TITLE =
  'ReadonlyREST — Security & multi-tenancy for Elasticsearch and Kibana';
const HOME_DESCRIPTION =
  'Pure Elasticsearch and Kibana with authentication, authorization, audit and multi-tenancy. Fit 1000+ tenants in one cluster. Free four-week trial.';

/**
 * Aggregate JSON-LD for the homepage.
 *
 * Order matters only for readability — Google consumes each `@type` independently
 * and stitches them together via shared `@id` references.
 */
const homeJsonLd = [
  organizationSchema(),
  websiteSchema(),
  softwareApplicationSchema(),
  webPageSchema({
    url: '/',
    name: HOME_TITLE,
    description: HOME_DESCRIPTION,
    image: '/images/hero-deer.png',
    breadcrumbs: [{ name: 'Home', url: '/' }],
  }),
  // Social proof — five-star reviews from the Testimonials section.
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': 'https://readonlyrest.com/#product-reviews',
    name: 'ReadonlyREST for Elasticsearch and Kibana',
    image: 'https://readonlyrest.com/images/hero-deer.png',
    description:
      'Enterprise security plugin for the Elastic stack — authentication, authorization, audit and multi-tenancy.',
    brand: { '@type': 'Brand', name: 'ReadonlyREST' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '3',
      bestRating: '5',
    },
    review: [
      reviewSchema({
        body: 'ReadonlyREST gave us proper multi-tenancy in Kibana — hundreds of teams, one cluster, no surprises.',
        author: 'Frédéric',
        organization: 'Research Institution',
      }),
      reviewSchema({
        body: 'Install was an afternoon. LDAP-backed access control across every index, documented and testable.',
        author: 'Justin',
        organization: 'Fortune 500 Bank',
      }),
      reviewSchema({
        body: 'Support is the people who wrote the code. Every ticket landed with a real answer.',
        author: 'Pierre',
        organization: 'Public Sector',
      }),
    ],
  },
  // FAQ rich result — both tabs combined (search engines see all Q&A).
  faqSchema(HOME_ALL_FAQ),
];

export default function Home() {
  return (
    <>
      <Seo
        title={HOME_TITLE}
        description={HOME_DESCRIPTION}
        path="/"
        image="/images/hero-deer.png"
        imageAlt="ReadonlyREST — a deer standing alert, symbolizing vigilant Elasticsearch security"
        keywords="Elasticsearch security, Kibana security, Elastic stack authentication, LDAP, SAML, Kibana multi-tenancy, ReadonlyREST, ECK security, Elasticsearch plugin"
        jsonLd={homeJsonLd}
      />

      <Hero />
      <Pitch />
      <Testimonials />
      <ForKibana />
      <ElasticsearchOnly />
      <FeatureCards />
      <UseCases />
      <KubernetesSection />
      <DockerSection />
      <WeWorkTogether />
      <OurValues />
      <Faq />
    </>
  );
}
