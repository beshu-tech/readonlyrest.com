import Icon from '../Icon';

export default function WeWorkTogether() {
  return (
    <section className="section-dark-2 py-20 md:py-24">
      <div className="page grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div>
          <p className="eyebrow-dark">The team</p>
          <h2 className="mt-3">We will work together.</h2>
          <p className="mt-6 text-[18px] text-white/80 leading-relaxed max-w-lg">
            A group of experts with 9+ years of experience in Elastic products focused
            on security. Your success is our priority.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="https://readonlyrest.com/contact" className="btn-teal text-[15px]">
              <Icon name="mail" size={18} />
              Free consultation
            </a>
            <a href="https://readonlyrest.com/quote" className="btn-ghost-dark text-[15px]">
              Request a quote
            </a>
          </div>
        </div>
        <div>
          <img
            src="/images/we-work-together-office.jpg"
            alt="The ReadonlyREST team at work"
            width={670}
            height={420}
            loading="lazy"
            className="w-full h-auto rounded-[var(--radius-card)]"
          />
        </div>
      </div>
    </section>
  );
}
