import Icon from '../Icon';
import CopyButton from '../CopyButton';

const BUILD_CMD = `docker build -t ror --rm \\
  https://readonlyrest.com/docker-demo`;

const RUN_CMD = `docker run -p 9200:9200 -p 5601:5601 \\
  -ti --rm ror`;

const LINUX_HINT_CMD = 'sudo sysctl -w vm.max_map_count=300000';

const LOCALHOST_URL = 'http://localhost:5601';
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'passwd';

export default function DockerSection() {
  return (
    <section
      id="try-it-with-docker"
      className="relative isolate overflow-hidden bg-[color:var(--color-surface-dark)] text-white py-20 md:py-28"
    >
      {/* Subtle grid-paper backdrop — two SVG-in-CSS gradients form faint
          graph lines, tinted teal to feel terminal-adjacent. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(11,132,122,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(11,132,122,0.35) 1px, transparent 1px)',
          backgroundSize: '42px 42px',
          maskImage:
            'radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0) 100%)',
        }}
      />
      {/* Ambient orbs for depth. */}
      <div
        aria-hidden
        className="absolute -top-40 -left-32 w-[560px] h-[560px] rounded-full opacity-35 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #0b847acc 0%, #0b847a00 65%)' }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -right-32 w-[560px] h-[560px] rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #ec407acc 0%, #ec407a00 65%)' }}
      />

      <div className="relative page">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--color-teal)]">
            <span aria-hidden className="inline-block w-6 h-px bg-[color:var(--color-teal)]" />
            10-minute PoC
          </span>
          <h2 className="mt-5 text-white tracking-tight">
            Try it now with Docker.
          </h2>
          <p className="mt-5 text-[17px] md:text-[18px] text-white/75 leading-relaxed">
            Build an all-in-one container. Poke at the{' '}
            <strong className="text-white">Free Kibana</strong> environment. Drop in a
            trial key to see the multi-tenant demo.
          </p>
        </div>

        {/* Single terminal frame with build + run as two columns inside. */}
        <div className="mt-12 rounded-[8px] overflow-hidden border border-white/10 bg-[#0a0f0e]/95 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
          {/* Window chrome */}
          <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.025] px-4 py-2.5">
            <span aria-hidden className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            </span>
            <span className="text-[12.5px] text-white/55 font-mono tracking-tight">
              zsh — ror-poc
            </span>
          </div>

          {/* Two-column command layout */}
          <div className="grid md:grid-cols-2 md:divide-x divide-white/10">
            <CommandColumn step={1} label="Build" command={BUILD_CMD} />
            <CommandColumn step={2} label="Run" command={RUN_CMD} />
          </div>

          {/* Credentials strip at the bottom of the same terminal card. */}
          <div className="border-t border-white/10 bg-white/[0.02] px-5 py-5 md:px-6 md:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3 font-mono text-[14px] text-white/80">
              <span aria-hidden className="text-[color:var(--color-teal)]">→</span>
              <span>Open</span>
              <a
                href={LOCALHOST_URL}
                rel="noopener"
                className="text-[color:var(--color-teal)] hover:underline"
              >
                {LOCALHOST_URL}
              </a>
            </div>
            <CopyButton text={LOCALHOST_URL} size="sm" label="Copy localhost URL">
              Copy URL
            </CopyButton>
          </div>

          <div className="border-t border-white/10 bg-white/[0.02] px-5 py-5 md:px-6 md:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3 font-mono text-[14px] text-white/80 flex-wrap">
              <span aria-hidden className="text-[color:var(--color-teal)]">→</span>
              <span>Log in as</span>
              <span className="text-white font-semibold">{ADMIN_USER}</span>
              <span className="text-white/40">/</span>
              <span className="text-white font-semibold">{ADMIN_PASS}</span>
            </div>
            <div className="flex items-center gap-2">
              <CopyButton text={ADMIN_USER} size="sm" label="Copy username">
                User
              </CopyButton>
              <CopyButton text={ADMIN_PASS} size="sm" label="Copy password">
                Pass
              </CopyButton>
            </div>
          </div>
        </div>

        {/* Linux pre-flight as a slim, full-width bar. */}
        <div className="mt-5 rounded-[8px] border border-white/10 bg-white/[0.03] px-5 py-4 md:px-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-5">
          <div className="flex items-center gap-3">
            <Icon
              name="info"
              size={16}
              className="text-white/50 shrink-0"
            />
            <span className="text-[14px] text-white/80">
              On Linux you may need
            </span>
          </div>
          <code className="flex-1 font-mono text-[12.5px] text-[color:var(--color-teal)] bg-black/40 border border-white/10 rounded-md px-3 py-2 overflow-x-auto whitespace-nowrap min-w-0">
            {LINUX_HINT_CMD}
          </code>
          <span className="text-[14px] text-white/60 whitespace-nowrap">on the host.</span>
          <CopyButton text={LINUX_HINT_CMD} size="sm" label="Copy Linux hint">
            Copy
          </CopyButton>
        </div>
      </div>
    </section>
  );
}

interface CommandColumnProps {
  step: number;
  label: string;
  command: string;
}

/**
 * One command inside the shared terminal card. The step number sits at
 * left in teal; a Copy button hugs the right edge; the command body
 * renders with syntax colouring underneath.
 */
function CommandColumn({ step, label, command }: CommandColumnProps) {
  return (
    <div className="p-6 md:p-7 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[13px] text-[color:var(--color-teal)] tabular-nums">
          {String(step).padStart(2, '0')}
        </span>
        <span className="text-[13px] font-bold uppercase tracking-[0.16em] text-white">
          {label}
        </span>
        <span className="ml-auto">
          <CopyButton text={command} size="sm" label={`Copy step ${String(step)} command`}>
            Copy
          </CopyButton>
        </span>
      </div>
      <pre className="m-0 font-mono text-[13.5px] leading-[1.75] overflow-x-auto text-white/90 whitespace-pre">
        <span className="text-[color:var(--color-teal)]">$ </span>
        <CommandHighlight command={command} />
      </pre>
    </div>
  );
}

/**
 * Minimal syntax highlighter for our shell commands. Tokens are coloured
 * without dragging in a full highlighter library; good enough for the two
 * lines we ever render here.
 */
function CommandHighlight({ command }: { command: string }) {
  const tokens = command.split(/(\s+)/);
  return (
    <>
      {tokens.map((tok, i) => {
        if (/^\s+$/.test(tok)) return tok;
        if (i === 0 && tok === 'docker') {
          return (
            <span key={i} className="text-white">
              {tok}
            </span>
          );
        }
        if (tok.startsWith('http://') || tok.startsWith('https://')) {
          return (
            <span key={i} className="text-[color:var(--color-teal)] underline decoration-[color:var(--color-teal)]/30 underline-offset-4">
              {tok}
            </span>
          );
        }
        if (tok.startsWith('-')) {
          return (
            <span key={i} className="text-white/70">
              {tok}
            </span>
          );
        }
        if (tok === '\\') {
          return (
            <span key={i} className="text-white/35">
              {tok}
            </span>
          );
        }
        return (
          <span key={i} className="text-white/85">
            {tok}
          </span>
        );
      })}
    </>
  );
}
