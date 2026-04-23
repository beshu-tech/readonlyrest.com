import type { JSX, SVGProps } from 'react';

type IconName =
  | 'shield'
  | 'lock'
  | 'layers'
  | 'cloud'
  | 'ship'
  | 'building'
  | 'rocket'
  | 'check'
  | 'spark'
  | 'chart'
  | 'clock'
  | 'download'
  | 'mail'
  | 'document'
  | 'users'
  | 'key'
  | 'eye-off'
  | 'gauge'
  | 'git'
  | 'award'
  | 'arrow-right'
  | 'github'
  | 'twitter'
  | 'forum'
  | 'external'
  | 'info'
  | 'chat';

type Props = Omit<SVGProps<SVGSVGElement>, 'name'> & {
  name: IconName;
  size?: number;
};

const PATHS: Record<IconName, JSX.Element> = {
  shield: (
    <>
      <path d="M12 3l8 3v6c0 4.8-3.4 8.3-8 9-4.6-.7-8-4.2-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  lock: (
    <>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
      <path d="M3 17l9 5 9-5" />
    </>
  ),
  cloud: <path d="M7 17h10a4 4 0 0 0 .5-7.97A6 6 0 0 0 6 10.34 3.5 3.5 0 0 0 7 17z" />,
  ship: (
    <>
      <path d="M3 17c1.5 2 4.5 2 6 0 1.5 2 4.5 2 6 0 1.5 2 4.5 2 6 0" />
      <path d="M5 15V9h14v6" />
      <path d="M12 3v4" />
      <path d="M9 7h6" />
    </>
  ),
  building: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V7l7-4 7 4v14" />
      <path d="M10 12h4M10 16h4M10 8h4" />
    </>
  ),
  rocket: (
    <>
      <path d="M5 14l-2 6 6-2M5 14c0-5 3-9 7-11 4 2 7 6 7 11l-4 4h-6l-4-4z" />
      <circle cx="12" cy="9" r="1.5" />
    </>
  ),
  check: <polyline points="5 12 10 17 19 7" />,
  spark: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l3 3M15 15l3 3M6 18l3-3M15 9l3-3" />,
  chart: (
    <>
      <path d="M3 3v18h18" />
      <path d="M7 15l4-4 3 3 5-6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12" />
      <path d="M7 10l5 5 5-5" />
      <path d="M4 21h16" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  document: (
    <>
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v5h5" />
      <path d="M10 13h6M10 17h4" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20c0-3 3-5 6-5s6 2 6 5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M15 20c0-2 2-4 4-4s2 1 2 2" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="M11 12l9-9M17 6l3 3M14 9l2 2" />
    </>
  ),
  'eye-off': (
    <>
      <path d="M3 3l18 18" />
      <path d="M10.6 10.6A2 2 0 0 0 13.4 13.4" />
      <path d="M6.7 6.7C4.5 8.1 3 10 2 12c2 4 6 7 10 7 1.8 0 3.6-.6 5.3-1.5M17.9 17.9l2-2M12 5c4 0 8 3 10 7-.5 1-1.2 2-2 2.9" />
    </>
  ),
  gauge: (
    <>
      <path d="M12 14l5-5" />
      <circle cx="12" cy="14" r="1.5" />
      <path d="M4 18a8 8 0 1 1 16 0" />
    </>
  ),
  git: (
    <>
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="12" cy="18" r="2" />
      <path d="M6 8v4a4 4 0 0 0 4 4h0M18 8v2a4 4 0 0 1-4 4h0" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="M8.5 14l-2 7 5.5-3 5.5 3-2-7" />
    </>
  ),
  'arrow-right': <path d="M5 12h14M13 6l6 6-6 6" />,
  github: (
    <path
      d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.52-1.32-1.28-1.67-1.28-1.67-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.35.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.44-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.17.92-.26 1.91-.39 2.89-.39s1.97.13 2.89.39c2.2-1.49 3.16-1.17 3.16-1.17.63 1.59.24 2.76.12 3.05.74.8 1.18 1.82 1.18 3.08 0 4.42-2.69 5.4-5.26 5.68.42.36.77 1.06.77 2.15v3.18c0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z"
      fill="currentColor"
      stroke="none"
    />
  ),
  twitter: (
    <path
      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.67l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25h6.837l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      fill="currentColor"
      stroke="none"
    />
  ),
  forum: (
    <path
      d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2zm3 5v2h10V9H7zm0 4v2h7v-2H7z"
      fill="currentColor"
      stroke="none"
    />
  ),
  external: (
    <>
      <path d="M14 4h6v6" />
      <path d="M20 4l-9 9" />
      <path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <circle cx="12" cy="8" r=".75" fill="currentColor" />
    </>
  ),
  chat: (
    <>
      <path d="M21 12a8 8 0 0 1-11.6 7.2L4 21l1.8-5.4A8 8 0 1 1 21 12z" />
    </>
  ),
};

export default function Icon({ name, size = 20, className, ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
      {...rest}
    >
      {PATHS[name]}
    </svg>
  );
}

export type { IconName };
