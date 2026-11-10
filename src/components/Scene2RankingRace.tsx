import type React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {
  LANGUAGES,
  LANGUAGE_IDS,
  TYPESCRIPT_HISTORY,
  type LanguageId,
} from '../data/octoverseData';
import {FONTS} from '../fonts';
import {THEME} from '../theme';
import {LanguageBadge} from './LanguageBadge';

// 9 eras across 420 frames (14 seconds @ 30fps)
// Era keyframes (start frames for each era snapshot):
const ERA_FRAMES = [0, 42, 86, 130, 174, 220, 268, 316, 362] as const;

export const Scene2RankingRace: React.FC = () => {
  const frame = useCurrentFrame();

  // Compute fractional era progress (0 .. 8) with smooth hold + transition per step
  const getEraProgress = (f: number): number => {
    for (let i = 0; i < ERA_FRAMES.length - 1; i++) {
      const start = ERA_FRAMES[i];
      const nextStart = ERA_FRAMES[i + 1];
      const holdEnd = start + 18;
      if (f <= holdEnd) {
        return i;
      }
      if (f < nextStart) {
        return (
          i +
          interpolate(f, [holdEnd, nextStart], [0, 1], {
            easing: Easing.bezier(0.22, 1, 0.36, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })
        );
      }
    }
    return ERA_FRAMES.length - 1;
  };

  const eraProgress = getEraProgress(frame);
  const lowerIdx = Math.min(
    TYPESCRIPT_HISTORY.length - 1,
    Math.floor(eraProgress),
  );
  const upperIdx = Math.min(TYPESCRIPT_HISTORY.length - 1, lowerIdx + 1);
  const t = eraProgress - lowerIdx;

  const activeIdx = t > 0.55 ? upperIdx : lowerIdx;
  const activeSnapshot = TYPESCRIPT_HISTORY[activeIdx];
  const lowerSnapshot = TYPESCRIPT_HISTORY[lowerIdx];
  const upperSnapshot = TYPESCRIPT_HISTORY[upperIdx];

  // Max contributor value in the current interpolated frame so bars scale cleanly
  const currentValues: Record<LanguageId, number> = {
    ts: 0,
    py: 0,
    js: 0,
    java: 0,
    csharp: 0,
    php: 0,
  };

  const currentSlots: Record<LanguageId, number> = {
    ts: 0,
    py: 0,
    js: 0,
    java: 0,
    csharp: 0,
    php: 0,
  };

  for (const id of LANGUAGE_IDS) {
    const v0 = lowerSnapshot.metrics[id].contributorsMillions;
    const v1 = upperSnapshot.metrics[id].contributorsMillions;
    currentValues[id] = v0 + (v1 - v0) * t;

    const s0 = lowerSnapshot.metrics[id].slotIndex;
    const s1 = upperSnapshot.metrics[id].slotIndex;
    currentSlots[id] = s0 + (s1 - s0) * t;
  }

  const maxContributors = Math.max(
    0.5,
    ...LANGUAGE_IDS.map((id) => currentValues[id]),
  );

  const ROW_HEIGHT = 82;
  const ROW_GAP = 12;
  const ROW_STEP = ROW_HEIGHT + ROW_GAP;

  // Trajectory chart geometry (bottom card)
  const CHART_W = 896;
  const CHART_H = 148;
  const PAD_X = 38;
  const PAD_Y = 26;

  const chartPoints = TYPESCRIPT_HISTORY.map((snap, i) => {
    const x =
      PAD_X +
      (i / (TYPESCRIPT_HISTORY.length - 1)) * (CHART_W - PAD_X * 2);
    // Rank 24 at bottom, Rank 1 at top
    const normRank = (snap.tsNumericRank - 1) / (24 - 1);
    const y = PAD_Y + normRank * (CHART_H - PAD_Y * 2);
    return {x, y, snap, index: i};
  });

  // Interpolated playhead position on trajectory chart
  const p0 = chartPoints[lowerIdx];
  const p1 = chartPoints[upperIdx];
  const playheadX = p0.x + (p1.x - p0.x) * t;
  const playheadY = p0.y + (p1.y - p0.y) * t;

  const fullPathD = chartPoints
    .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`)
    .join(' ');

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: '58px 64px 112px 64px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Header: Year + Milestone + TypeScript Rank Readout */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 24,
        }}
      >
        <div style={{flex: 1}}>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 20,
            }}
          >
            <h1
              style={{
                margin: 0,
                fontFamily: FONTS.mono,
                fontSize: 76,
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: '-0.04em',
                color:
                  activeSnapshot.year === 2025
                    ? '#58A6FF'
                    : THEME.textPrimary,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {activeSnapshot.yearLabel}
            </h1>
          </div>

          <div
            style={{
              marginTop: 14,
              fontFamily: FONTS.display,
              fontSize: 34,
              fontWeight: 700,
              color: THEME.textPrimary,
              letterSpacing: '-0.02em',
              lineHeight: 1.18,
            }}
          >
            {activeSnapshot.milestoneTitle}
          </div>

          <div
            style={{
              marginTop: 6,
              fontFamily: FONTS.sans,
              fontSize: 23,
              fontWeight: 500,
              color: THEME.textSecondary,
              lineHeight: 1.3,
            }}
          >
            {activeSnapshot.milestoneDetail}
          </div>
        </div>

        {/* Right: TypeScript Global Rank Box */}
        <div
          style={{
            minWidth: 210,
            backgroundColor:
              activeSnapshot.year === 2025 ? '#3178C6' : '#131D2E',
            border:
              activeSnapshot.year === 2025
                ? '2px solid #79B8FF'
                : '2px solid #3178C6',
            borderRadius: 16,
            padding: '16px 24px',
            textAlign: 'right',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 18,
              fontWeight: 600,
              color:
                activeSnapshot.year === 2025 ? '#E2F0FF' : '#79B8FF',
            }}
          >
            TS GitHub Rank
          </div>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: activeSnapshot.tsRankLabel === 'Unranked' ? 34 : 58,
              fontWeight: 800,
              lineHeight: 1.08,
              marginTop: 4,
              color: '#FFFFFF',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '-0.03em',
            }}
          >
            {activeSnapshot.tsRankLabel}
          </div>
        </div>
      </div>

      {/* Middle Stage: 6-Row Animated Language Ranking Race */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: ROW_STEP * 6 - ROW_GAP,
        }}
      >
        {LANGUAGE_IDS.map((id) => {
          const meta = LANGUAGES[id];
          const isTS = id === 'ts';
          const slot = currentSlots[id];
          const val = currentValues[id];
          const barPct = Math.max(5, (val / maxContributors) * 100);
          const rankLabel = activeSnapshot.metrics[id].octoverseRankLabel;

          return (
            <div
              key={id}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: ROW_HEIGHT,
                translate: `0px ${slot * ROW_STEP}px`,
                zIndex: isTS ? 10 : 5 - Math.round(slot),
                backgroundColor: isTS ? '#132036' : THEME.groundElevated,
                border: isTS
                  ? '2px solid #4B96EB'
                  : `1px solid ${THEME.borderDark}`,
                borderRadius: 14,
                padding: '0 22px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                boxSizing: 'border-box',
              }}
            >
              {/* Octoverse Rank Pill */}
              <div
                style={{
                  width: 68,
                  fontFamily: FONTS.mono,
                  fontSize: 24,
                  fontWeight: 700,
                  color: isTS ? '#58A6FF' : THEME.textSecondary,
                  fontVariantNumeric: 'tabular-nums',
                  flexShrink: 0,
                }}
              >
                {rankLabel}
              </div>

              {/* Language Emblem */}
              <LanguageBadge id={id} size={48} />

              {/* Language Name */}
              <div
                style={{
                  width: 164,
                  fontFamily: FONTS.display,
                  fontSize: 28,
                  fontWeight: isTS ? 800 : 600,
                  color: isTS ? '#FFFFFF' : THEME.textPrimary,
                  letterSpacing: '-0.02em',
                  flexShrink: 0,
                }}
              >
                {meta.name}
              </div>

              {/* Animated Bar Area */}
              <div
                style={{
                  flex: 1,
                  height: 34,
                  backgroundColor: '#0A0D13',
                  borderRadius: 8,
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: `${barPct}%`,
                    height: '100%',
                    backgroundColor: meta.color,
                    borderRadius: 8,
                  }}
                />
              </div>

              {/* Monthly Contributors Value */}
              <div
                style={{
                  width: 128,
                  textAlign: 'right',
                  fontFamily: FONTS.mono,
                  fontSize: isTS ? 27 : 24,
                  fontWeight: 700,
                  color: isTS ? '#FFFFFF' : THEME.textSecondary,
                  fontVariantNumeric: 'tabular-nums',
                  flexShrink: 0,
                }}
              >
                {val < 0.1
                  ? `${Math.round(val * 1000)}K`
                  : `${val.toFixed(2)}M`}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Stage: Complete 2012–2025 Rank Trajectory Horizon Chart */}
      <div
        style={{
          backgroundColor: THEME.groundElevated,
          border: `1px solid ${THEME.borderDark}`,
          borderRadius: 16,
          padding: '18px 26px 16px 26px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 8,
          }}
        >
          <span
            style={{
              fontFamily: FONTS.sans,
              fontSize: 20,
              fontWeight: 600,
              color: THEME.textPrimary,
            }}
          >
            TypeScript 13-Year Climb (Oct 2012 v0.8 → Aug 2025 #1)
          </span>
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: 18,
              fontWeight: 600,
              color: '#58A6FF',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {activeSnapshot.yearLabel}: {activeSnapshot.tsRankLabel}
          </span>
        </div>

        <svg
          width={CHART_W}
          height={CHART_H}
          viewBox={`0 0 ${CHART_W} ${CHART_H}`}
          style={{display: 'block', overflow: 'visible'}}
        >
          <defs>
            <clipPath id="ts-progress-clip">
              <rect x="0" y="0" width={playheadX} height={CHART_H + 20} />
            </clipPath>
          </defs>

          {/* Horizontal Reference Lines (#1 top, #10 middle, #24 bottom) */}
          <line
            x1={PAD_X}
            y1={PAD_Y}
            x2={CHART_W - PAD_X}
            y2={PAD_Y}
            stroke="#242E42"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <line
            x1={PAD_X}
            y1={CHART_H - PAD_Y}
            x2={CHART_W - PAD_X}
            y2={CHART_H - PAD_Y}
            stroke="#1C2434"
            strokeWidth="1.5"
          />

          {/* Full Future Trajectory Track (Dimmed) */}
          <path
            d={fullPathD}
            fill="none"
            stroke="#253248"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Active Drawn Trajectory Curve */}
          <g clipPath="url(#ts-progress-clip)">
            <path
              d={fullPathD}
              fill="none"
              stroke="#3B82F6"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* Era Nodes & Year Labels */}
          {chartPoints.map((pt) => {
            const reached = pt.index <= activeIdx;
            const isCurrent = pt.index === activeIdx;
            return (
              <g key={pt.snap.year}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isCurrent ? 8 : 5.5}
                  fill={reached ? '#3B82F6' : '#1E2736'}
                  stroke={reached ? '#FFFFFF' : '#475569'}
                  strokeWidth={isCurrent ? 2.5 : 1.5}
                />
                {/* Rank tag above each node */}
                <text
                  x={pt.x}
                  y={pt.y - 12}
                  textAnchor="middle"
                  fill={reached ? '#FFFFFF' : '#68778D'}
                  fontFamily={FONTS.mono}
                  fontSize={isCurrent ? 16 : 14}
                  fontWeight={700}
                >
                  {pt.snap.tsRankLabel === 'Unranked'
                    ? 'v0.8'
                    : pt.snap.tsRankLabel}
                </text>
                {/* Year label along bottom */}
                <text
                  x={pt.x}
                  y={CHART_H - 2}
                  textAnchor="middle"
                  fill={isCurrent ? '#58A6FF' : '#8A99AD'}
                  fontFamily={FONTS.mono}
                  fontSize={15}
                  fontWeight={isCurrent ? 700 : 500}
                >
                  {pt.snap.year}
                </text>
              </g>
            );
          })}

          {/* Live Interpolated Playhead Dot */}
          <circle
            cx={playheadX}
            cy={playheadY}
            r="9"
            fill="#FF4F28"
            stroke="#FFFFFF"
            strokeWidth="2.5"
          />
        </svg>
      </div>
    </div>
  );
};
