import type React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {FONTS} from '../fonts';
import {THEME} from '../theme';

type TelemetryFooterProps = {
  readonly sourceLabel: string;
};

export const TelemetryFooter: React.FC<TelemetryFooterProps> = ({
  sourceLabel,
}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();

  const progressPct = ((frame + 1) / durationInFrames) * 100;

  return (
    <div
      style={{
        position: 'absolute',
        left: 64,
        right: 64,
        bottom: 36,
        height: 54,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Scrubber Bar */}
      <div
        style={{
          width: '100%',
          height: 6,
          backgroundColor: '#1A2230',
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${progressPct}%`,
            height: '100%',
            backgroundColor: '#3178C6',
            borderRadius: 3,
          }}
        />
      </div>

      {/* Metadata Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: FONTS.mono,
          fontSize: 17,
          color: THEME.textMuted,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        <span>{sourceLabel}</span>
        <span>
          Rendered in TypeScript + React · Frame{' '}
          {String(frame).padStart(3, '0')}/{durationInFrames}
        </span>
      </div>
    </div>
  );
};
