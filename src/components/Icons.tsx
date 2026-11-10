import type React from 'react';

type IconProps = {
  readonly size?: number;
  readonly color?: string;
  readonly style?: React.CSSProperties;
};

export const ReactAtomIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#58C7FF',
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    style={style}
  >
    <circle cx="12" cy="12" r="2.2" fill={color} />
    <ellipse
      cx="12"
      cy="12"
      rx="10"
      ry="4.2"
      stroke={color}
      strokeWidth="1.8"
    />
    <ellipse
      cx="12"
      cy="12"
      rx="10"
      ry="4.2"
       transform="rotate(60 12 12)"
      stroke={color}
      strokeWidth="1.8"
    />
    <ellipse
      cx="12"
      cy="12"
      rx="10"
      ry="4.2"
      transform="rotate(120 12 12)"
      stroke={color}
      strokeWidth="1.8"
    />
  </svg>
);

export const GitBranchIcon: React.FC<IconProps> = ({
  size = 20,
  color = '#F3F5F8',
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <line x1="6" y1="3" x2="6" y2="15" />
    <circle cx="18" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <path d="M18 9a9 9 0 0 1-9 9" />
  </svg>
);

export const PlayTriangleIcon: React.FC<IconProps> = ({
  size = 16,
  color = '#FF4F28',
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    style={style}
  >
    <path d="M6 4.5L19.5 12L6 19.5V4.5Z" />
  </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = ({
  size = 20,
  color = '#0E9F6E',
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 12.3L10.9 14.7L15.8 9.8" />
  </svg>
);

export const TerminalIcon: React.FC<IconProps> = ({
  size = 20,
  color = '#A2B0C4',
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

export const FrameApertureIcon: React.FC<IconProps> = ({
  size = 20,
  color = '#FF4F28',
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <circle cx="12" cy="12" r="3.2" fill={color} stroke="none" />
    <line x1="12" y1="3" x2="12" y2="6" />
    <line x1="12" y1="18" x2="12" y2="21" />
    <line x1="3" y1="12" x2="6" y2="12" />
    <line x1="18" y1="12" x2="21" y2="12" />
  </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({
  size = 18,
  color = '#FF4F28',
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <line x1="4" y1="12" x2="19" y2="12" />
    <polyline points="13 6 19 12 13 18" />
  </svg>
);
