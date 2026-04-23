import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import '@fontsource/manrope/800.css';
import App from '@/App';
import '@/styles.css';

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element #root missing from index.html');

// Strip SEO tags injected by the build-time prerender plugin before Helmet
// takes over. They exist so crawlers/share-card scrapers that don't run JS
// see per-route metadata; at runtime Helmet produces a fresh, equivalent
// set, and keeping both around would leave the DOM with duplicate title,
// canonical, OG tags and JSON-LD scripts.
for (const el of document.querySelectorAll('[data-prerendered-seo]')) {
  el.remove();
}

// Strip trailing slash so React Router's `basename` matches its expected
// format (`/sub-path`, not `/sub-path/`). Defaults to no prefix on root
// deployments where BASE_URL === '/'.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '');
const routerProps = basename ? { basename } : {};

createRoot(rootEl).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter {...routerProps}>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
