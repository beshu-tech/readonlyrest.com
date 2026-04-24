import Icon from '../Icon';
import SectionEyebrow from '../SectionEyebrow';

/**
 * "We will work together" — full-width dark editorial hero with the team
 * photograph as a right-anchored background image, a left→right dark
 * gradient ensuring the copy stays legible regardless of image crop,
 * and an eyebrow + H2 + subhead + dual CTAs stacked on the left.
 *
 * Flows directly off the end of the DockerSection so the transition
 * from "try it yourself" → "talk to the team" feels like one beat.
 */
export default function WeWorkTogether() {
  return (
    <section
      aria-label="The team"
      className="relative isolate overflow-hidden bg-[color:var(--color-surface-dark)] text-white"
    >
      <img
        src="/images/we-work-together-office.jpg"
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-right"
      />
      {/* Horizontal dim: solid dark on the left, fading through transparent
          on the right so the photograph still reads as context. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(10,10,10,0.94) 0%, rgba(10,10,10,0.85) 35%, rgba(10,10,10,0.55) 60%, rgba(10,10,10,0.2) 100%)',
        }}
      />
      {/* Subtle vertical fade at the bottom to ease into the next section. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 100%)',
        }}
      />

      <div className="relative page py-24 md:py-32 min-h-[clamp(440px,58vh,620px)] flex flex-col justify-center">
        <div className="max-w-xl">
          <SectionEyebrow tone="dark">The team</SectionEyebrow>
          <h2 className="mt-4 text-white tracking-tight">
            We will work together.
          </h2>
          <p className="mt-6 text-[18px] md:text-[19px] text-white/80 leading-relaxed">
            A group of experts with 9+ years of experience in Elastic products
            focused on security. Your success is our priority.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="https://readonlyrest.com/contact" className="btn-teal text-[15px]">
              <Icon name="mail" size={18} />
              Free consultation
            </a>
            <a
              href="https://readonlyrest.com/quote"
              className="btn-ghost-dark text-[15px]"
            >
              Request a quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
