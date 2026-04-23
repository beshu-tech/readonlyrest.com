interface Testimonial {
  name: string;
  role: string;
  org: string;
  quote: string;
  avatar: string;
}

const TESTIMONIALS: readonly Testimonial[] = [
  {
    name: 'Ulrich Schwickerath',
    role: 'Physicist, IT department',
    org: 'CERN',
    quote:
      '“Our largest shared cluster […] consolidates about 17 different use cases on the same hardware, lowering the total cost.”',
    avatar: '/images/testimonial-ulrich.jpg',
  },
  {
    name: 'Pierre Chesneau',
    role: 'Solution Architect',
    org: 'Top French network operator',
    quote:
      '“ReadonlyREST Enterprise is one of the few software I use or used professionally, and I would recommend it 200%.”',
    avatar: '/images/testimonial-pierre.jpg',
  },
  {
    name: 'Justin Henderson',
    role: 'GSE, SANS Instructor, CEO',
    org: 'H/A Security Solutions',
    quote:
      '“I baked ReadonlyREST Free into SEC455 SIEM Design and Implementation. I\u2019m openly recommending it to students and highlighting its features.”',
    avatar: '/images/testimonial-justin.jpg',
  },
  {
    name: 'Frederic Hosmann',
    role: 'Responsible for Platforms & Automation',
    org: 'Creos S.A.',
    quote:
      '“ReadonlyREST was quick and easy to implement, that gave us more time to spend on other important tasks.”',
    avatar: '/images/testimonial-frederic.jpg',
  },
];

export default function TestimonialCards() {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {TESTIMONIALS.map((t) => (
        <li
          key={t.name}
          className="bg-white border border-[color:var(--color-border-subtle)] rounded-[var(--radius-card)] p-6 flex flex-col"
        >
          <div className="flex items-start gap-4">
            <img
              src={t.avatar}
              alt={`${t.name}, ${t.role}`}
              width={64}
              height={64}
              loading="lazy"
              className="w-16 h-16 rounded-full object-cover grayscale"
            />
            <div className="min-w-0">
              <div className="text-[15px] font-bold text-[color:var(--color-ink)] leading-tight">
                {t.name}
              </div>
              <div className="mt-1 text-[13px] text-[color:var(--color-ink-soft)] leading-snug">
                {t.role}
              </div>
              <div className="mt-0.5 text-[13px] font-semibold text-[color:var(--color-teal)] leading-snug">
                {t.org}
              </div>
            </div>
          </div>
          <blockquote className="mt-5 text-[15px] leading-relaxed text-[color:var(--color-ink)] before:content-['“'] before:text-[color:var(--color-hot-pink)] before:text-[32px] before:leading-none before:-ml-1 before:mr-1 before:align-top before:font-serif">
            <span>{t.quote.replace(/^\u201C|\u201D$/g, '')}</span>
          </blockquote>
        </li>
      ))}
    </ul>
  );
}
