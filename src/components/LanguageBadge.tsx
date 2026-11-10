import type React from 'react';
import {LANGUAGES, type LanguageId} from '../data/octoverseData';
import {FONTS} from '../fonts';

type LanguageBadgeProps = {
  readonly id: LanguageId;
  readonly size?: number;
};

export const LanguageBadge: React.FC<LanguageBadgeProps> = ({
  id,
  size = 48,
}) => {
  const meta = LANGUAGES[id];
  const fontSize = id === 'php' ? Math.round(size * 0.34) : Math.round(size * 0.42);

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.22),
        backgroundColor: meta.badgeBg,
        color: meta.badgeText,
        border:
          id === 'ts'
            ? '1px solid rgba(255, 255, 255, 0.28)'
            : '1px solid rgba(255, 255, 255, 0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: FONTS.mono,
        fontSize,
        fontWeight: 700,
        letterSpacing: '-0.03em',
        flexShrink: 0,
      }}
    >
      {meta.shortCode}
    </div>
  );
};
