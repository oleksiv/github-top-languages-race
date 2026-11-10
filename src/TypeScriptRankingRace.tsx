import type React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {LanguageBadge} from './components/LanguageBadge';
import {
  ANNUAL_SERIES,
  LANGUAGES,
  LANGUAGE_IDS,
  type LanguageId,
} from './data/octoverseData';
import {FONTS} from './fonts';
import {THEME} from './theme';

export type TypeScriptRankingRaceProps = {
  readonly title: string;
  readonly subtitle: string;
  readonly sourceNote: string;
};

// Smooth monotone cubic Hermite interpolation across the 14 annual points
const sampleLanguageValue = (id: LanguageId, cursor: number): number => {
  const n = ANNUAL_SERIES.length;
  const clamped = Math.max(0, Math.min(n - 1, cursor));
  const i0 = Math.floor(clamped);
  const i1 = Math.min(n - 1, i0 + 1);
  const t = clamped - i0;

  if (i0 === i1) {
    return ANNUAL_SERIES[i0].values[id];
  }

  const p0 = ANNUAL_SERIES[Math.max(0, i0 - 1)].values[id];
  const p1 = ANNUAL_SERIES[i0].values[id];
  const p2 = ANNUAL_SERIES[i1].values[id];
  const p3 = ANNUAL_SERIES[Math.min(n - 1, i1 + 1)].values[id];

  // Catmull-Rom tangents clamped to stay monotonic
  const m1 = (p2 - p0) * 0.5;
  const m2 = (p3 - p1) * 0.5;

  const t2 = t * t;
  const t3 = t2 * t;

  const h00 = 2 * t3 - 3 * t2 + 1;
  const h10 = t3 - 2 * t2 + t;
  const h01 = -2 * t3 + 3 * t2;
  const h11 = t3 - t2;

  return Math.max(0.001, h00 * p1 + h10 * m1 + h01 * p2 + h11 * m2);
};

const formatContributors = (millions: number): string => {
  if (millions < 0.1) {
    return `${Math.round(millions * 1000)}K`;
  }
  return `${millions.toFixed(2)}M`;
};

export const TypeScriptRankingRace: React.FC<TypeScriptRankingRaceProps> = ({
  title,
  subtitle,
  sourceNote,
}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();

  const startHold = 15;
  const endHold = 60;
  const maxCursor = ANNUAL_SERIES.length - 1;

  const getCursorAtFrame = (f: number): number =>
    interpolate(
      f,
      [startHold, durationInFrames - endHold],
      [0, maxCursor],
      {
        easing: Easing.bezier(0.32, 0.08, 0.24, 1),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      },
    );

  // Deterministic spring-damped slot simulation from frame 0 to current frame
  // so every rank swap glides smoothly at the exact frame two bars cross
  const slotPos: Record<LanguageId, number> = {
    ts: 7,
    py: 1,
    js: 0,
    java: 2,
    php: 3,
    ruby: 4,
    cpp: 5,
    csharp: 6,
  };
  const slotVel: Record<LanguageId, number> = {
    ts: 0,
    py: 0,
    js: 0,
    java: 0,
    php: 0,
    ruby: 0,
    cpp: 0,
    csharp: 0,
  };

  let currentValues: Record<LanguageId, number> = {
    ts: 0,
    py: 0,
    js: 0,
    java: 0,
    php: 0,
    ruby: 0,
    cpp: 0,
    csharp: 0,
  };

  let currentRankOrder: LanguageId[] = [...LANGUAGE_IDS];

  const stiffness = 0.095;
  const damping = 0.62;

  for (let step = 0; step <= frame; step++) {
    const c = getCursorAtFrame(step);
    const vals = {} as Record<LanguageId, number>;
    for (const id of LANGUAGE_IDS) {
      vals[id] = sampleLanguageValue(id, c);
    }

    const sorted = [...LANGUAGE_IDS].sort((a, b) => vals[b] - vals[a]);

    if (step === 0) {
      sorted.forEach((id, idx) => {
        slotPos[id] = idx;
      });
    } else {
      sorted.forEach((id, targetIdx) => {
        const force = (targetIdx - slotPos[id]) * stiffness;
        slotVel[id] = (slotVel[id] + force) * damping;
        slotPos[id] += slotVel[id];
      });
    }

    if (step === frame) {
      currentValues = vals;
      currentRankOrder = sorted;
    }
  }

  const cursor = getCursorAtFrame(frame);
  const activeEraIdx = Math.min(
    ANNUAL_SERIES.length - 1,
    Math.round(cursor),
  );
  const activePoint = ANNUAL_SERIES[activeEraIdx];

  const maxBarValue = Math.max(
    0.45,
    ...LANGUAGE_IDS.map((id) => currentValues[id]),
  );

  const ROW_HEIGHT = 86;
  const ROW_GAP = 16;
  const ROW_STEP = ROW_HEIGHT + ROW_GAP;

  const tsCurrentRank = currentRankOrder.indexOf('ts') + 1;
  const timelinePct = (cursor / maxCursor) * 100;
  const tickYears = [2012, 2014, 2016, 2018, 2020, 2022, 2025] as const;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: THEME.ground,
        padding: '76px 72px 68px 72px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Header: Clean Title on Left, Giant Year on Right */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 24,
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontFamily: FONTS.display,
              fontSize: 56,
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: '-0.03em',
              color: THEME.textPrimary,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              margin: '12px 0 0 0',
              fontFamily: FONTS.sans,
              fontSize: 25,
              fontWeight: 500,
              color: THEME.textSecondary,
              letterSpacing: '-0.01em',
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Giant Tabular Year Readout */}
        <div style={{textAlign: 'right', flexShrink: 0}}>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 88,
              fontWeight: 800,
              lineHeight: 0.92,
              letterSpacing: '-0.04em',
              color:
                activePoint.year === 2025 ? '#58A6FF' : THEME.textPrimary,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {activePoint.year}
          </div>
          <div
            style={{
              marginTop: 10,
              fontFamily: FONTS.mono,
              fontSize: 20,
              fontWeight: 600,
              color: tsCurrentRank === 1 ? '#58A6FF' : THEME.textSecondary,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            TypeScript #{tsCurrentRank}
          </div>
        </div>
      </div>

      {/* Center Stage: Minimalist 8-Row Smooth Bar Race */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: ROW_STEP * 8 - ROW_GAP,
        }}
      >
        {LANGUAGE_IDS.map((id) => {
          const meta = LANGUAGES[id];
          const isTS = id === 'ts';
          const yPx = slotPos[id] * ROW_STEP;
          const val = currentValues[id];
          const barWidthPct = Math.max(3, (val / maxBarValue) * 100);
          const rankNumber = currentRankOrder.indexOf(id) + 1;

          return (
            <div
              key={id}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: ROW_HEIGHT,
                translate: `0px ${yPx}px`,
                zIndex: isTS ? 20 : 10 - rankNumber,
                display: 'flex',
                alignItems: 'center',
                gap: 18,
              }}
            >
              {/* Rank Number */}
              <div
                style={{
                  width: 36,
                  fontFamily: FONTS.mono,
                  fontSize: 24,
                  fontWeight: isTS ? 700 : 500,
                  color: isTS ? '#58A6FF' : THEME.textMuted,
                  fontVariantNumeric: 'tabular-nums',
                  textAlign: 'right',
                  flexShrink: 0,
                }}
              >
                {rankNumber}
              </div>

              {/* Language Emblem */}
              <LanguageBadge id={id} size={50} />

              {/* Language Name */}
              <div
                style={{
                  width: 158,
                  fontFamily: FONTS.sans,
                  fontSize: 27,
                  fontWeight: isTS ? 700 : 500,
                  color: isTS ? '#FFFFFF' : THEME.textSecondary,
                  letterSpacing: '-0.015em',
                  flexShrink: 0,
                }}
              >
                {meta.name}
              </div>

              {/* Smooth Bar + Value Label */}
              <div
                style={{
                  flex: 1,
                  height: 52,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: `${barWidthPct * 0.78}%`,
                    height: isTS ? 52 : 44,
                    backgroundColor: meta.barColor,
                    borderRadius: 10,
                    border: isTS
                      ? '1.5px solid #58A6FF'
                      : '1px solid rgba(255, 255, 255, 0.05)',
                    transition: 'none',
                  }}
                />

                <span
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: isTS ? 28 : 23,
                    fontWeight: isTS ? 700 : 500,
                    color: isTS ? '#FFFFFF' : THEME.textSecondary,
                    fontVariantNumeric: 'tabular-nums',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {formatContributors(val)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Minimalist Timeline Scrubber & Milestone Caption */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        {/* Milestone Caption Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: 22,
              fontWeight: 600,
              color:
                activePoint.year === 2025 ? '#58A6FF' : THEME.textPrimary,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {activePoint.milestone}
          </span>
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: 18,
              color: THEME.textMuted,
            }}
          >
            {sourceNote}
          </span>
        </div>

        {/* Continuous Progress Line */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 6,
            backgroundColor: '#1A2230',
            borderRadius: 3,
          }}
        >
          <div
            style={{
              width: `${timelinePct}%`,
              height: '100%',
              backgroundColor: '#3178C6',
              borderRadius: 3,
            }}
          />
        </div>

        {/* Year Ticks */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: FONTS.mono,
            fontSize: 17,
            color: THEME.textMuted,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {tickYears.map((yr) => (
            <span
              key={yr}
              style={{
                color:
                  activePoint.year >= yr ? THEME.textSecondary : THEME.textMuted,
                fontWeight: activePoint.year === yr ? 700 : 500,
              }}
            >
              {yr === 2025 ? 'Aug 2025' : yr}
            </span>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
