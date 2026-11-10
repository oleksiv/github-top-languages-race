import type React from 'react';
import {LANGUAGES, type LanguageId} from '../data/octoverseData';
import {FONTS} from '../fonts';

type LanguageBadgeProps = {
  readonly id: LanguageId;
  readonly size?: number;
};

export const LanguageBadge: React.FC<LanguageBadgeProps> = ({
  id,
  size = 44,
}) => {
  const meta = LANGUAGES[id];
  const fontSize =
    meta.shortCode.length >= 3 ? Math.round(size * 0.33) : Math.round(size * 0.41);

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.22),
        backgroundColor: meta.badgeBg,
        color: meta.badgeText,
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
