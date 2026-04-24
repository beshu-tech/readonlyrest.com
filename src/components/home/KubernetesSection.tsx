import Icon from '../Icon';

const KUBE_BLUE = '#326CE5';

/**
 * "Kubernetes ready" — dark editorial section with the k8s blue as the
 * section accent and a hand-rolled architecture diagram instead of a
 * stock logo card. The diagram shows the actual pattern customers
 * deploy: one ECK operator reconciling an Elasticsearch StatefulSet
 * where every pod carries the ReadonlyREST plugin.
 */
export default function KubernetesSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-20 md:py-28">
      {/* Subtle hex-grid backdrop — nods to the k8s wheel, ink-on-white. */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='52' viewBox='0 0 60 52'><polygon points='30,2 56,16 56,44 30,58 4,44 4,16' fill='none' stroke='${encodeURIComponent(
            '#0b847a',
          )}' stroke-width='1'/></svg>")`,
          backgroundSize: '60px 52px',
          maskImage:
            'radial-gradient(ellipse at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0) 100%)',
        }}
      />

      <div className="relative page grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-16 items-center">
        {/* Left: copy + benefit chips + CTAs */}
        <div>
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white"
            style={{ background: KUBE_BLUE }}
          >
            <HexIcon />
            Kubernetes
          </span>
          <h2 className="mt-5 tracking-tight">
            Kubernetes-native security.
          </h2>
          <p className="mt-6 text-[18px] md:text-[19px] text-[color:var(--color-ink)] leading-relaxed">
            Works great with{' '}
            <a
              href="https://www.elastic.co/guide/en/cloud-on-k8s/current/index.html"
              className="text-[color:var(--color-teal)] hover:underline"
            >
              Elastic Cloud on Kubernetes (ECK)
            </a>{' '}
            — the official operator designed by Elastic. Drop ReadonlyREST into
            the CR and every pod in the StatefulSet picks it up.
          </p>

          <ol className="mt-10 space-y-3">
            {[
              {
                t: 'Trivial software updates',
                b: 'Roll a new plugin version by bumping the image tag. ECK drains and replaces pods one at a time.',
              },
              {
                t: 'Simplified maintenance',
                b: 'TLS rotation, autoscaling, topology changes — handled by the operator, not a runbook.',
              },
              {
                t: 'Easy provisioning',
                b: 'One YAML file describes the cluster, the plugin, and the ACL. Commit, apply, done.',
              },
            ].map((b, i) => (
              <li
                key={b.t}
                className="flex items-start gap-4 rounded-[var(--radius-card)] bg-white border border-[color:var(--color-border-subtle)] p-4 shadow-[var(--shadow-card)]"
              >
                <span
                  aria-hidden
                  className="shrink-0 inline-flex w-8 h-8 items-center justify-center rounded-md font-mono text-[13px] font-bold text-white"
                  style={{ background: KUBE_BLUE }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="text-[15.5px] font-bold text-[color:var(--color-ink)]">
                    {b.t}
                  </p>
                  <p className="mt-1 text-[14px] text-[color:var(--color-ink-soft)] leading-relaxed">
                    {b.b}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="https://docs.readonlyrest.com/eck"
              className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] px-5 py-3 text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: KUBE_BLUE }}
            >
              Get started on ECK
              <Icon name="arrow-right" size={14} />
            </a>
            <a
              href="https://www.elastic.co/guide/en/cloud-on-k8s/current/index.html"
              className="btn-ghost text-[14px]"
            >
              ECK docs
              <Icon name="external" size={12} />
            </a>
          </div>
        </div>

        {/* Right: architecture diagram (stays dark — it's meant to feel like
            a terminal/observability panel, which is visually at home on
            a dark surface). */}
        <ArchitectureDiagram />
      </div>
    </section>
  );
}

/**
 * Hand-drawn (with divs) architecture diagram.
 *
 * Layout:
 *   - "ECK Operator" node at the top
 *   - Connecting line down to the StatefulSet frame
 *   - Three pod tiles inside the frame, each labelled
 *     "Elasticsearch + ROR"; the middle one is highlighted
 *   - A Kibana pod tile to the side, also with ROR
 *
 * Using CSS for the connectors keeps the whole thing responsive
 * and avoids shipping an SVG illustrator file.
 */
function ArchitectureDiagram() {
  return (
    <div className="relative rounded-[var(--radius-card)] border border-white/10 bg-[color:var(--color-surface-dark)] p-6 md:p-8 overflow-hidden shadow-[var(--shadow-card-lg)]">
      <div
        aria-hidden
        className="absolute -top-24 -right-24 w-[340px] h-[340px] rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{ background: `radial-gradient(circle, ${KUBE_BLUE}cc 0%, ${KUBE_BLUE}00 60%)` }}
      />

      {/* Diagram frame title */}
      <div className="relative flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/55">
          Architecture
        </span>
        <span className="font-mono text-[11px] text-white/40">ECK CR</span>
      </div>

      {/* ECK operator box */}
      <div className="relative mt-6 mx-auto max-w-[260px]">
        <div
          className="relative rounded-md px-4 py-3 text-center text-white border"
          style={{
            background: `linear-gradient(135deg, ${KUBE_BLUE} 0%, #2355c0 100%)`,
            borderColor: KUBE_BLUE,
            boxShadow: `0 10px 30px -10px ${KUBE_BLUE}66`,
          }}
        >
          <div className="flex items-center justify-center gap-2">
            <HexIcon />
            <span className="text-[13.5px] font-bold">ECK Operator</span>
          </div>
          <div className="mt-1 text-[11px] text-white/80 font-mono">
            elastic-operator · reconcile
          </div>
        </div>
      </div>

      {/* Connector line */}
      <div className="relative flex justify-center">
        <div
          className="w-px h-8"
          style={{
            background: `linear-gradient(180deg, ${KUBE_BLUE}99 0%, ${KUBE_BLUE}33 100%)`,
          }}
          aria-hidden
        />
      </div>

      {/* StatefulSet frame wrapping three ES pods */}
      <div className="relative rounded-md border border-dashed border-white/20 p-4 pt-5">
        <span className="absolute -top-2.5 left-4 px-2 bg-[color:var(--color-surface-dark)] text-[11px] font-mono text-white/55 uppercase tracking-[0.14em]">
          Elasticsearch StatefulSet
        </span>
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <PodTile key={i} index={i} highlighted={i === 1} />
          ))}
        </div>
      </div>

      {/* Connector between StatefulSet and Kibana */}
      <div className="relative flex justify-center">
        <div
          className="w-px h-6"
          style={{
            background: `linear-gradient(180deg, ${KUBE_BLUE}66 0%, ${KUBE_BLUE}22 100%)`,
          }}
          aria-hidden
        />
      </div>

      {/* Kibana pod */}
      <div className="relative rounded-md border border-dashed border-white/20 p-4 pt-5">
        <span className="absolute -top-2.5 left-4 px-2 bg-[color:var(--color-surface-dark)] text-[11px] font-mono text-white/55 uppercase tracking-[0.14em]">
          Kibana Deployment
        </span>
        <PodTile label="Kibana + ROR" variant="kibana" />
      </div>

      {/* Caption below diagram */}
      <p className="relative mt-5 text-[13px] text-white/55 leading-relaxed">
        ECK reconciles the whole stack. The ReadonlyREST plugin rides on every
        pod — no sidecar processes, no init hacks.
      </p>
    </div>
  );
}

interface PodTileProps {
  index?: number;
  highlighted?: boolean;
  label?: string;
  variant?: 'es' | 'kibana';
}

function PodTile({
  index = 0,
  highlighted = false,
  label,
  variant = 'es',
}: PodTileProps) {
  const title = label ?? `es-${String(index).padStart(1, '0')}`;
  const ringColor = highlighted ? KUBE_BLUE : 'rgba(255,255,255,0.14)';
  return (
    <div
      className="relative rounded-md bg-[color:var(--color-surface-dark)]/80 border text-center transition-colors"
      style={{
        borderColor: ringColor,
        boxShadow: highlighted ? `0 0 0 1px ${KUBE_BLUE}55 inset` : undefined,
      }}
    >
      <div
        className="px-3 py-3 flex flex-col items-center gap-2"
      >
        <div
          aria-hidden
          className="inline-flex items-center justify-center w-10 h-10 rounded-md text-white"
          style={{
            background:
              variant === 'kibana'
                ? 'linear-gradient(135deg, #f04e98 0%, #b52073 100%)'
                : `linear-gradient(135deg, ${KUBE_BLUE} 0%, #2355c0 100%)`,
          }}
        >
          <HexIcon size={16} />
        </div>
        <div>
          <p className="text-[12px] font-bold text-white leading-tight">{title}</p>
          <p className="mt-0.5 text-[10.5px] uppercase tracking-[0.1em] text-white/55">
            {variant === 'kibana' ? 'Kibana + ROR' : 'ES + ROR'}
          </p>
        </div>
      </div>
    </div>
  );
}

/** Hexagon mark — nod to the k8s wheel without shipping the raw logo. */
function HexIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * 0.866}
      viewBox="0 0 60 52"
      fill="currentColor"
      aria-hidden
    >
      <polygon points="30,2 56,16 56,44 30,58 4,44 4,16" />
    </svg>
  );
}
