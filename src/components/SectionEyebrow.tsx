import type { ReactNode } from 'react';

interface SectionEyebrowProps {
  children: ReactNode;
  /**
   * Background tone of the surrounding section. Drives which pill palette
   * the eyebrow uses:
   * - "light"  → soft / white section ⇒ pink pill on pink-10
   * - "dark"   → dark section ⇒ white-on-white-10 glass pill
   */
  tone?: 'light' | 'dark';
  /** Optional inline icon (e.g. a terminal glyph). Rendered before the text. */
  icon?: ReactNode;
  /** Override the accent color with a custom hex (used sparingly, e.g. k8s blue). */
  accent?: string;
  className?: string;
}

/**
 * Canonical eyebrow pill used above every section heading on the home
 * page and the /why/* landing pages.
 *
 * Locks in one visual treatment across the whole site: rounded-full pill,
 * 12px bold uppercase, 0.14em tracking, 12px / 4px padding. Two tone
 * variants for light vs dark surroundings; an optional `accent` override
 * for sections that carry their own strong brand hue (Kubernetes, etc.).
 *
 * Replaces the scattered ad-hoc spans that had drifted across 5+
 * different sizes, colours, tracking values and paddings.
 */
export default function SectionEyebrow({
  children,
  tone = 'light',
  icon,
  accent,
  className,
}: SectionEyebrowProps) {
  const base =
    'inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] font-bold uppercase tracking-[0.14em]';

  // Accent override: custom hue, white text — used for one-off
  // brand-coloured sections (e.g. Kubernetes blue).
  if (accent) {
    return (
      <span
        className={`${base} text-white ${className ?? ''}`}
        style={{ background: accent }}
      >
        {icon}
        {children}
      </span>
    );
  }

  const variant =
    tone === 'dark'
      ? 'bg-white/10 border border-white/15 text-white/85'
      : 'bg-[color:var(--color-hot-pink)]/10 text-[color:var(--color-hot-pink)]';

  return (
    <span className={`${base} ${variant} ${className ?? ''}`}>
      {icon}
      {children}
    </span>
  );
}
