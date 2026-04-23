import Icon from '../Icon';
import CopyButton from '../CopyButton';

const BUILD_CMD = `docker build -t ror --rm \\
  https://readonlyrest.com/docker-demo`;

const RUN_CMD = `docker run -p 9200:9200 -p 5601:5601 \\
  -ti --rm ror`;

const LINUX_HINT_CMD = 'sudo sysctl -w vm.max_map_count=300000';

export default function DockerSection() {
  return (
    <section
      id="try-it-with-docker"
      className="relative isolate overflow-hidden bg-[color:var(--color-surface-dark)] text-white py-20 md:py-28"
    >
      {/* Teal + pink orbs for atmosphere. */}
      <div
        aria-hidden
        className="absolute -top-40 -left-32 w-[560px] h-[560px] rounded-full opacity-35 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #0b847acc 0%, #0b847a00 65%)' }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -right-32 w-[560px] h-[560px] rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #ec407acc 0%, #ec407a00 65%)' }}
      />

      <div className="relative page">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-teal)]/15 border border-[color:var(--color-teal)]/30 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.16em] text-[color:var(--color-teal)]">
            <Icon name="terminal" size={12} />
            10-minute PoC
          </span>
          <h2 className="mt-4 text-white tracking-tight">
            Try it now with Docker.
          </h2>
          <p className="mt-5 text-[17px] md:text-[18px] text-white/80 leading-relaxed">
            Build a container with our all-in-one Dockerfile. You&apos;ll interact with the
            minimal &ldquo;Free&rdquo; Kibana environment. Enter a trial activation key to see the
            multi-tenant Kibana demo.
          </p>
        </div>

        {/* Terminal command blocks. Wider than the intro on desktop so the
            commands don\u2019t wrap at realistic tab sizes. */}
        <div className="relative mt-12 grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-stretch gap-5 lg:gap-0 max-w-6xl">
          <TerminalBlock step={1} label="Build" command={BUILD_CMD} />

          {/* Flow arrow between steps on desktop. Hidden at narrow widths. */}
          <div className="hidden lg:flex items-center justify-center px-6">
            <div
              aria-hidden
              className="flex flex-col items-center gap-1 text-[color:var(--color-teal)]"
            >
              <Icon name="arrow-right" size={24} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                then
              </span>
            </div>
          </div>

          <TerminalBlock step={2} label="Run" command={RUN_CMD} />
        </div>

        {/* "After it runs, open this URL" panel — browser-chrome styled. */}
        <div className="mt-10 grid md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-5 items-stretch max-w-6xl">
          <div className="rounded-[var(--radius-card)] overflow-hidden border border-white/10 bg-white/[0.04]">
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
              <span aria-hidden className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              </span>
              <span className="flex-1 text-center text-[12px] text-white/60 font-mono">
                localhost:5601
              </span>
            </div>
            <div className="p-6 md:p-7 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="shrink-0 w-7 h-7 rounded-full bg-[color:var(--color-teal)] text-white text-[12px] font-extrabold inline-flex items-center justify-center"
                >
                  3
                </span>
                <div>
                  <p className="text-[15px] text-white/85 leading-relaxed">
                    Head to{' '}
                    <code className="font-mono text-[color:var(--color-teal)] bg-[color:var(--color-teal)]/10 px-1.5 py-0.5 rounded text-[13.5px]">
                      http://localhost:5601
                    </code>
                    .
                  </p>
                  <p className="mt-2 text-[15px] text-white/85 leading-relaxed">
                    Login as{' '}
                    <code className="font-mono text-white bg-white/10 px-1.5 py-0.5 rounded text-[13.5px]">
                      admin
                    </code>{' '}
                    with password{' '}
                    <code className="font-mono text-white bg-white/10 px-1.5 py-0.5 rounded text-[13.5px]">
                      passwd
                    </code>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Linux pre-flight hint with its own mini copy button. */}
          <div className="rounded-[var(--radius-card)] overflow-hidden border border-[color:var(--color-hot-pink)]/30 bg-[color:var(--color-hot-pink)]/10">
            <div className="flex items-start gap-3 p-5">
              <div className="shrink-0 h-9 w-9 rounded-md bg-[color:var(--color-hot-pink)]/25 text-[color:var(--color-hot-pink)] inline-flex items-center justify-center">
                <Icon name="info" size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[color:var(--color-hot-pink)]">
                  Linux pre-flight
                </p>
                <p className="mt-2 text-[14px] text-white/85 leading-relaxed">
                  You may need to raise the kernel map count on the host before
                  starting Elasticsearch:
                </p>
                <div className="mt-3 flex items-center gap-2 rounded-md bg-black/35 border border-white/10 px-3 py-2">
                  <code className="flex-1 font-mono text-[12.5px] text-white/85 overflow-x-auto whitespace-nowrap">
                    {LINUX_HINT_CMD}
                  </code>
                  <CopyButton text={LINUX_HINT_CMD} label="Copy Linux hint" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface TerminalBlockProps {
  step: number;
  label: string;
  command: string;
}

/**
 * macOS-style terminal card with window-chrome dots, a step badge in the
 * chrome bar, a copy button aligned to the right edge, and dark body
 * rendering the command with visual hierarchy between prompt / binary /
 * flags / URL.
 */
function TerminalBlock({ step, label, command }: TerminalBlockProps) {
  return (
    <div className="relative rounded-[var(--radius-card)] overflow-hidden border border-white/15 bg-[#0e0e12] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] flex flex-col">
      {/* Window chrome */}
      <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <span aria-hidden className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="inline-flex items-center gap-2 text-white/80">
          <span
            aria-hidden
            className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[color:var(--color-teal)] text-white text-[11px] font-extrabold"
          >
            {step}
          </span>
          <span className="text-[13px] font-semibold tracking-tight">
            {label}
          </span>
        </span>
        <span className="ml-auto">
          <CopyButton text={command} label={`Copy step ${String(step)} command`} />
        </span>
      </div>

      {/* Body */}
      <pre className="m-0 flex-1 p-5 md:p-6 font-mono text-[13.5px] leading-[1.65] overflow-x-auto text-white/90">
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
            <span key={i} className="text-[#7dd3fc]">
              {tok}
            </span>
          );
        }
        if (tok.startsWith('http://') || tok.startsWith('https://')) {
          return (
            <span key={i} className="text-[#fbbf24] underline decoration-[#fbbf24]/40">
              {tok}
            </span>
          );
        }
        if (tok.startsWith('-')) {
          return (
            <span key={i} className="text-[#a7f3d0]">
              {tok}
            </span>
          );
        }
        if (tok === '\\') {
          return (
            <span key={i} className="text-white/40">
              {tok}
            </span>
          );
        }
        return (
          <span key={i} className="text-white/90">
            {tok}
          </span>
        );
      })}
    </>
  );
}
