import Icon from '../Icon';

export default function KubernetesSection() {
  return (
    <section className="page py-20 md:py-24">
      <div className="grid md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-12 md:gap-16 items-start">
        <div>
          <p className="eyebrow-muted">Kubernetes</p>
          <h2 className="mt-3">Kubernetes ready.</h2>
          <p className="mt-6 text-[19px] text-[color:var(--color-ink)]">
            Works great with{' '}
            <a href="https://www.elastic.co/guide/en/cloud-on-k8s/current/index.html">
              Elastic Cloud on Kubernetes (ECK)
            </a>{' '}
            — the official operator designed by Elastic.
          </p>
          <ul className="check-list mt-6 text-[17px]">
            <li>Trivial software updates</li>
            <li>Simplified maintenance</li>
            <li>Easy provisioning</li>
          </ul>
          <div className="mt-8">
            <a
              href="https://docs.readonlyrest.com/eck"
              className="btn-ghost text-[14px]"
            >
              Get started on ECK
              <Icon name="arrow-right" size={14} />
            </a>
          </div>
        </div>
        <aside className="md:pt-8">
          <div className="p-6 border border-[color:var(--color-border-subtle)] rounded-[var(--radius-card)] bg-[color:var(--color-surface-soft)]">
            <img
              src="/images/eck-logo.png"
              alt="Elastic Cloud on Kubernetes operator"
              width={320}
              height={167}
              loading="lazy"
              className="w-full max-w-[280px] h-auto"
            />
            <p className="mt-5 text-[14px] text-[color:var(--color-ink-soft)] leading-relaxed">
              ReadonlyREST is compatible with ECK, the Elastic Cloud Kubernetes
              operator created by Elastic.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
