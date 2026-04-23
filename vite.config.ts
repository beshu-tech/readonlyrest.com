import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';

const VITE_BASE = process.env.VITE_BASE ?? '/';
const VITE_NOINDEX = process.env.VITE_NOINDEX === 'true';

/**
 * Rewrite root-absolute asset paths in built assets to honour Vite's
 * configured `base`. Vite rewrites assets it knows about (CSS, HTML,
 * imports), but any path written as a plain string in TSX — e.g.
 * `src="/images/foo.png"` or `backgroundImage: 'url(/images/bar.png)'`
 * — passes through untouched and breaks on sub-path deployments.
 *
 * This plugin scans the bundled JS, CSS, and prerendered HTML for the
 * known root-absolute paths and prefixes each with `base`. No-ops when
 * `base` is `/`.
 */
function rewriteAbsoluteAssetPaths(base: string): Plugin {
  return {
    name: 'ror:rewrite-absolute-asset-paths',
    apply: 'build',
    enforce: 'post',
    generateBundle(_opts, bundle) {
      if (base === '/' || base === '') return;
      const b = base.endsWith('/') ? base : `${base}/`;
      // Roots that must be relocated under the sub-path. Leading slash
      // included on purpose — we want to match exactly `"/images/..."`,
      // not `"images/..."`.
      const roots = [
        '/images/',
        '/favicon.ico',
        '/favicon.svg',
        '/apple-touch-icon.png',
        '/site.webmanifest',
        '/robots.txt',
        '/sitemap.xml',
        '/fonts/',
        '/.well-known/',
      ];

      const patterns = roots.map((p) => {
        const safe = p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return new RegExp(`(["'\`(])${safe}`, 'g');
      });

      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type === 'asset') {
          if (typeof chunk.source !== 'string') continue;
          if (!/\.(js|css|html|xml|webmanifest|txt)$/.test(fileName)) continue;
          let src = chunk.source;
          for (const r of patterns) {
            src = src.replace(r, (_m, quote: string) => {
              const trimmed = _m.slice(quote.length + 1);
              return `${quote}${b}${trimmed}`;
            });
          }
          chunk.source = src;
        } else if (chunk.type === 'chunk') {
          let code = chunk.code;
          for (const r of patterns) {
            code = code.replace(r, (_m, quote: string) => {
              const trimmed = _m.slice(quote.length + 1);
              return `${quote}${b}${trimmed}`;
            });
          }
          chunk.code = code;
        }
      }
    },
  };
}

/**
 * Prerender static per-route `index.html` files.
 *
 * The app is a client-rendered SPA — by default Vite emits a single
 * `dist/index.html` with a near-empty body. Crawlers and social-share
 * scrapers that don't run JS see that skeleton for every URL, stamped
 * with the home page's title / description / OG tags. That breaks
 * per-page SEO and share previews entirely.
 *
 * At build close, this plugin imports `src/seo/routes.ts` via Vite's
 * SSR module loader, renders the per-route `<head>` HTML, and writes
 * `dist/<path>/index.html` for every route in `ROUTES`. The SPA shell
 * stays the same; only the head changes per file.
 *
 * Also emits `dist/404.html` as a copy of the home shell so GitHub
 * Pages (which serves `404.html` for unknown paths) falls back to the
 * SPA for deep links that don't have a prerendered file.
 */
function prerenderSeoPlugin(opts: {
  base: string;
  noindex: boolean;
}): Plugin {
  return {
    name: 'ror:prerender-seo',
    apply: 'build',
    async closeBundle() {
      const distDir = resolve(__dirname, 'dist');
      const shellPath = join(distDir, 'index.html');
      const shell = await readFile(shellPath, 'utf8');

      const { createServer } = await import('vite');
      const ssrServer = await createServer({
        configFile: false,
        root: resolve(__dirname),
        server: { middlewareMode: true },
        appType: 'custom',
        resolve: {
          alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
          },
        },
      });
      try {
        const mod = (await ssrServer.ssrLoadModule('/src/seo/routes.ts')) as {
          ROUTES: readonly { path: string; noindex?: boolean }[];
          renderRouteHead: (meta: unknown) => string;
        };

        for (const meta of mod.ROUTES) {
          const effective =
            opts.noindex && !meta.noindex ? { ...meta, noindex: true } : meta;
          const head = mod.renderRouteHead(effective as never);
          const stripped = shell
            .replace(/\s*<title>[\s\S]*?<\/title>/, '')
            .replace(/\s*<meta name="description"[^>]*>/, '')
            .replace(/\s*<link rel="canonical"[^>]*>/, '')
            .replace(/\s*<meta name="robots"[^>]*>/, '');
          const rendered = stripped.replace(
            '</head>',
            `    ${head}\n  </head>`,
          );

          const outPath =
            meta.path === '/'
              ? shellPath
              : join(distDir, meta.path.replace(/^\//, ''), 'index.html');
          await mkdir(dirname(outPath), { recursive: true });
          await writeFile(outPath, rendered, 'utf8');
          console.log(`[prerender] wrote ${outPath.replace(distDir, 'dist')}`);
        }
      } finally {
        await ssrServer.close();
      }

      // GitHub Pages serves `404.html` when the requested path has no
      // matching static file. Copy the root index shell there so deep
      // links to non-prerendered routes still boot the SPA.
      const notFound = join(distDir, '404.html');
      await copyFile(shellPath, notFound);
      console.log(`[prerender] wrote dist/404.html (SPA fallback)`);
      void opts.base;
    },
  };
}

/**
 * `vite preview`'s default handler maps unknown paths to `dist/index.html`.
 * That overrides the per-route prerendered files sitting at
 * `dist/<path>/index.html`. This middleware handles the resolution first:
 * for any GET that lacks an extension, if `<distRoot>/<path>/index.html`
 * exists, serve that; otherwise fall through to Vite's SPA fallback.
 *
 * Production static hosts (Netlify, Cloudflare Pages, Vercel, etc.) do this
 * automatically when "pretty URLs" / "clean URLs" is enabled — this plugin
 * just restores parity during local preview.
 */
function previewPrerenderedIndex(base: string): Plugin {
  const baseWithSlash = base.endsWith('/') ? base : `${base}/`;
  return {
    name: 'ror:preview-prerendered-index',
    configurePreviewServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || req.method !== 'GET') return next();
        const pathOnly = req.url.split('?')[0] ?? '/';
        if (/\.[A-Za-z0-9]+$/.test(pathOnly)) return next();
        const fs = await import('node:fs/promises');
        const distRoot = resolve(__dirname, 'dist');
        // Strip the configured base prefix so we resolve against `dist/`,
        // not `dist/<base>/`. `/readonlyrest.com/why/foo` → `why/foo`.
        let routePath = pathOnly;
        if (baseWithSlash !== '/' && routePath.startsWith(baseWithSlash)) {
          routePath = `/${routePath.slice(baseWithSlash.length)}`;
        }
        const candidate = join(
          distRoot,
          routePath.replace(/^\//, ''),
          'index.html',
        );
        try {
          const html = await fs.readFile(candidate, 'utf8');
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(html);
          return;
        } catch {
          return next();
        }
      });
    },
  };
}

export default defineConfig({
  base: VITE_BASE,
  plugins: [
    react(),
    tailwindcss(),
    rewriteAbsoluteAssetPaths(VITE_BASE),
    prerenderSeoPlugin({ base: VITE_BASE, noindex: VITE_NOINDEX }),
    previewPrerenderedIndex(VITE_BASE),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
