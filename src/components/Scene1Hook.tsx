import type React from 'react';
import {Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {FONTS} from '../fonts';
import {THEME} from '../theme';
import {ArrowRightIcon} from './Icons';
import {LanguageBadge} from './LanguageBadge';

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const countProgress = interpolate(frame, [0, 38], [0.72, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const tsCount = Math.round(2636006 * countProgress);
  const pyCount = Math.round(2594000 * countProgress);
  const jsCount = Math.round(2150000 * countProgress);

  const podiumRows = [
    {
      id: 'ts' as const,
      rank: '#1',
      name: 'TypeScript',
      count: tsCount.toLocaleString('en-US'),
      yoy: '+66.6% YoY',
      added: '+1.05M new devs',
      barRatio: 1,
      featured: true,
    },
    {
      id: 'py' as const,
      rank: '#2',
      name: 'Python',
      count: pyCount.toLocaleString('en-US'),
      yoy: '+48.8% YoY',
      added: '+850K new devs',
      barRatio: 2594000 / 2636006,
      featured: false,
    },
    {
      id: 'js' as const,
      rank: '#3',
      name: 'JavaScript',
      count: jsCount.toLocaleString('en-US'),
      yoy: '+24.8% YoY',
      added: '+427K new devs',
      barRatio: 2150000 / 2636006,
      featured: false,
    },
  ];

  const milestones = [
    {year: 'Oct 2012', rank: 'v0.8', highlight: false},
    {year: '2014', rank: '#18', highlight: false},
    {year: '2017', rank: '#10', highlight: false},
    {year: '2020', rank: '#4', highlight: false},
    {year: '2023', rank: '#3', highlight: false},
    {year: 'Aug 2025', rank: '#1', highlight: true},
  ];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: '68px 64px 116px 64px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Headline Block — No eyebrow/kicker per Impeccable craft floor */}
      <div>
        <h1
          style={{
            margin: 0,
            fontFamily: FONTS.display,
            fontSize: 78,
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: '-0.035em',
            color: THEME.textPrimary,
            textWrap: 'balance',
          }}
        >
          TypeScript reaches{' '}
          <span
            style={{
              display: 'inline-block',
              backgroundColor: '#3178C6',
              color: '#FFFFFF',
              padding: '2px 20px 6px 20px',
              borderRadius: 14,
            }}
          >
            #1
          </span>{' '}
          on GitHub.
        </h1>

        <p
          style={{
            margin: '22px 0 0 0',
            fontFamily: FONTS.sans,
            fontSize: 31,
            fontWeight: 500,
            lineHeight: 1.36,
            color: THEME.textSecondary,
            maxWidth: 880,
          }}
        >
          In August 2025, TypeScript overtook both Python and JavaScript in
          monthly active contributors for the first time.
        </p>
      </div>

      {/* Center Stage: August 2025 Top 3 Podium Comparison */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {podiumRows.map((row, idx) => {
          const rowSpring = spring({
            frame: Math.max(0, frame - idx * 5),
            fps,
            config: {damping: 20, stiffness: 180},
          });

          const barWidthPct = interpolate(
            frame,
            [idx * 4, 34 + idx * 4],
            [row.barRatio * 55, row.barRatio * 100],
            {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            },
          );

          return (
            <div
              key={row.id}
              style={{
                backgroundColor: row.featured ? '#131D2E' : THEME.groundElevated,
                border: row.featured
                  ? '2px solid #4B96EB'
                  : `1px solid ${THEME.borderDark}`,
                borderRadius: 16,
                padding: '24px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                opacity: interpolate(rowSpring, [0, 1], [0.4, 1]),
                translate: `0px ${interpolate(rowSpring, [0, 1], [18, 0])}px`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
                  <span
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: 34,
                      fontWeight: 700,
                      color: row.featured ? '#58A6FF' : THEME.textMuted,
                      fontVariantNumeric: 'tabular-nums',
                      width: 54,
                    }}
                  >
                    {row.rank}
                  </span>
                  <LanguageBadge id={row.id} size={54} />
                  <div>
                    <div
                      style={{
                        fontFamily: FONTS.display,
                        fontSize: 36,
                        fontWeight: 700,
                        color: THEME.textPrimary,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {row.name}
                    </div>
                    <div
                      style={{
                        fontFamily: FONTS.mono,
                        fontSize: 20,
                        color: THEME.textSecondary,
                        marginTop: 2,
                      }}
                    >
                      {row.added}
                    </div>
                  </div>
                </div>

                <div style={{textAlign: 'right'}}>
                  <div
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: row.featured ? 46 : 38,
                      fontWeight: 700,
                      color: row.featured ? '#FFFFFF' : THEME.textPrimary,
                      fontVariantNumeric: 'tabular-nums',
                      letterSpacing: '-0.03em',
                    }}
                  >
                    {row.count}
                  </div>
                  <div
                    style={{
                      display: 'inline-block',
                      marginTop: 6,
                      padding: '4px 12px',
                      borderRadius: 8,
                      fontFamily: FONTS.mono,
                      fontSize: 19,
                      fontWeight: 700,
                      fontVariantNumeric: 'tabular-nums',
                      backgroundColor: row.featured
                        ? THEME.vermilionSoft
                        : 'rgba(255, 255, 255, 0.06)',
                      color: row.featured
                        ? '#FF7A59'
                        : THEME.textSecondary,
                      border: row.featured
                        ? `1px solid ${THEME.vermilionBorder}`
                        : 'none',
                    }}
                  >
                    {row.yoy}
                  </div>
                </div>
              </div>

              {/* Horizontal Contributor Progress Bar */}
              <div
                style={{
                  width: '100%',
                  height: 16,
                  backgroundColor: '#0B0F17',
                  borderRadius: 8,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${barWidthPct}%`,
                    height: '100%',
                    borderRadius: 8,
                    backgroundColor:
                      row.id === 'ts'
                        ? '#3178C6'
                        : row.id === 'py'
                          ? '#F59E0B'
                          : '#FACC15',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom 13-Year Journey Strip (2012 v0.8 → Aug 2025 #1) */}
      <div
        style={{
          backgroundColor: THEME.groundElevated,
          border: `1px solid ${THEME.borderDark}`,
          borderRadius: 14,
          padding: '20px 26px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {milestones.map((item, idx) => (
          <div
            key={item.year}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 18,
                  color: THEME.textSecondary,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {item.year}
              </div>
              <div
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 28,
                  fontWeight: 700,
                  color: item.highlight ? '#58A6FF' : THEME.textPrimary,
                  fontVariantNumeric: 'tabular-nums',
                  marginTop: 2,
                }}
              >
                {item.rank}
              </div>
            </div>
            {idx < milestones.length - 1 ? (
              <ArrowRightIcon size={20} color={THEME.textMuted} />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};
