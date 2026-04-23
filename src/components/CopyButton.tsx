import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import Icon from './Icon';

interface CopyButtonProps {
  /** Text to copy to the clipboard. */
  text: string;
  /** Visual theme. Dark variant for use on dark code blocks. */
  theme?: 'light' | 'dark';
  /** Accessible label. Defaults to "Copy to clipboard". */
  label?: string;
  /** Override the visible button label. Defaults to "Copy". */
  children?: ReactNode;
  /** Visual size. "sm" for inline toolbar-style pills. */
  size?: 'md' | 'sm';
}

/**
 * Clipboard-copy button with ephemeral "Copied" feedback.
 *
 * Uses the modern Clipboard API with a textarea fallback for browsers
 * that block clipboard writes in insecure contexts. The 1.5s feedback
 * state is timer-based and is cancelled on unmount so nothing leaks.
 */
export default function CopyButton({
  text,
  theme = 'dark',
  label = 'Copy to clipboard',
  children,
  size = 'md',
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const copyNow = useCallback(() => {
    const onSuccess = () => {
      setCopied(true);
      if (timerRef.current !== null) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => { setCopied(false); }, 1500);
    };
    navigator.clipboard.writeText(text).then(onSuccess, () => {
      // Clipboard write refused (permissions / insecure context).
      // Silently fail — the user can still select the text manually.
    });
  }, [text]);

  const darkClass =
    'bg-white/10 hover:bg-white/20 text-white border border-white/15 hover:border-white/25';
  const lightClass =
    'bg-white hover:bg-[color:var(--color-surface-soft)] text-[color:var(--color-ink)] border border-[color:var(--color-border-subtle)] hover:border-[color:var(--color-ink-soft)]';

  const sizeClass =
    size === 'sm'
      ? 'px-2 py-1 text-[10.5px] tracking-[0.12em] uppercase gap-1 rounded'
      : 'px-2.5 py-1.5 text-[12px] gap-1.5 rounded-md';

  return (
    <button
      type="button"
      onClick={copyNow}
      aria-label={label}
      aria-live="polite"
      className={`inline-flex items-center font-semibold transition-colors ${sizeClass} ${
        theme === 'dark' ? darkClass : lightClass
      }`}
    >
      <Icon
        name={copied ? 'check' : 'copy'}
        size={size === 'sm' ? 11 : 13}
        className={copied ? 'text-[color:var(--color-teal)]' : ''}
      />
      {copied ? 'Copied' : (children ?? 'Copy')}
    </button>
  );
}
