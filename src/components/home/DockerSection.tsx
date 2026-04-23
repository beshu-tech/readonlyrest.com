import Icon from '../Icon';

export default function DockerSection() {
  return (
    <section id="try-it-with-docker" className="section-teal py-20 md:py-24">
      <div className="page">
        <div className="max-w-3xl">
          <p className="eyebrow-dark text-white/70">10-minute PoC</p>
          <h2 className="mt-3">Try it now with Docker.</h2>
          <p className="mt-5 text-white/90 text-[17px] leading-relaxed">
            Build a container with our all-in-one Dockerfile. You&apos;ll interact with the
            minimal &ldquo;Free&rdquo; Kibana environment. Enter a trial activation key to see the
            multi-tenant Kibana demo.
          </p>
        </div>

        <div className="mt-10 grid lg:grid-cols-2 gap-6 max-w-5xl">
          <div>
            <p className="text-white/80 text-[14px] font-semibold uppercase tracking-wider">
              1. Build
            </p>
            <pre className="code-block mt-3">{`docker build -t ror --rm \\
  https://readonlyrest.com/docker-demo`}</pre>
          </div>
          <div>
            <p className="text-white/80 text-[14px] font-semibold uppercase tracking-wider">
              2. Run
            </p>
            <pre className="code-block mt-3">{`docker run -p 9200:9200 -p 5601:5601 \\
  -ti --rm ror`}</pre>
          </div>
        </div>

        <div className="mt-10 max-w-3xl text-white/90 text-[15px] space-y-2">
          <p>
            Head to <code className="inline-code">http://localhost:5601</code>
          </p>
          <p>
            Login as <strong>admin</strong>, password <strong>passwd</strong>.
          </p>
        </div>

        <div className="mt-8 max-w-3xl flex items-start gap-3 p-4 rounded-md bg-black/20 border border-white/15">
          <Icon name="info" size={18} className="shrink-0 mt-0.5 text-white/70" />
          <p className="text-[14px] text-white/85 leading-relaxed">
            On Linux you may need{' '}
            <code className="inline-code">sudo sysctl -w vm.max_map_count=300000</code>{' '}
            on the host.
          </p>
        </div>
      </div>
    </section>
  );
}
