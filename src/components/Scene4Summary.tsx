import type React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {FONTS} from '../fonts';
import {THEME} from '../theme';
import {GitBranchIcon, ReactAtomIcon} from './Icons';

type Scene4SummaryProps = {
  readonly repoUrl: string;
};

export const Scene4Summary: React.FC<Scene4SummaryProps> = ({repoUrl}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const timelineChapters = [
    {
      year: 'Oct 2012',
      badge: 'v0.8',
      title: 'Open-sourced by Anders Hejlsberg',
      detail: 'Dismissed by critics as "trying to turn JS into C#"',
      accent: false,
    },
    {
      year: '2016–2017',
      badge: '#10',
      title: 'VS Code + Angular 2 + @types',
      detail: 'Breaks into GitHub Octoverse Top 10 for the first time',
      accent: false,
    },
    {
      year: '2020–2023',
      badge: '#3',
      title: 'Default Across Modern Frameworks',
      detail: 'Next.js, Vite, Astro, and SvelteKit ship TypeScript first',
      accent: false,
    },
    {
      year: 'Aug 2025',
      badge: '#1',
      title: '2,636,006 Monthly Contributors (+66.6% YoY)',
      detail: 'Overtakes Python & JS as AI agents rely on static types',
      accent: true,
    },
  ];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: '62px 64px 114px 64px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Headline — No eyebrow kicker */}
      <div>
        <h1
          style={{
            margin: 0,
            fontFamily: FONTS.display,
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.03,
            letterSpacing: '-0.035em',
            color: THEME.textPrimary,
            textWrap: 'balance',
          }}
        >
          13 years from <span style={{color: THEME.textSecondary}}>v0.8</span>{' '}
          to <span style={{color: '#58A6FF'}}>#1 on GitHub.</span>
        </h1>

        <p
          style={{
            margin: '16px 0 0 0',
            fontFamily: FONTS.sans,
            fontSize: 28,
            fontWeight: 500,
            lineHeight: 1.35,
            color: THEME.textSecondary,
          }}
        >
          Static types went from "extra ceremony" to the contract that makes
          human and AI software scale.
        </p>
      </div>

      {/* 4-Chapter Historical Ledger */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        {timelineChapters.map((chap, idx) => {
          const itemSpring = spring({
            frame: Math.max(0, frame - idx * 5),
            fps,
            config: {damping: 20, stiffness: 170},
          });

          return (
            <div
              key={chap.year}
              style={{
                backgroundColor: chap.accent ? '#132036' : THEME.groundElevated,
                border: chap.accent
                  ? '2px solid #4B96EB'
                  : `1px solid ${THEME.borderDark}`,
                borderRadius: 16,
                padding: '22px 26px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 20,
                opacity: interpolate(itemSpring, [0, 1], [0.25, 1]),
                translate: `0px ${interpolate(itemSpring, [0, 1], [16, 0])}px`,
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
                <div
                  style={{
                    width: 140,
                    fontFamily: FONTS.mono,
                    fontSize: 22,
                    fontWeight: 700,
                    color: chap.accent ? '#58A6FF' : THEME.textSecondary,
                    fontVariantNumeric: 'tabular-nums',
                    flexShrink: 0,
                  }}
                >
                  {chap.year}
                </div>

                <div>
                  <div
                    style={{
                      fontFamily: FONTS.display,
                      fontSize: 30,
                      fontWeight: 700,
                      color: THEME.textPrimary,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {chap.title}
                  </div>
                  <div
                    style={{
                      fontFamily: FONTS.sans,
                      fontSize: 22,
                      color: THEME.textSecondary,
                      marginTop: 4,
                    }}
                  >
                    {chap.detail}
                  </div>
                </div>
              </div>

              <div
                style={{
                  minWidth: 88,
                  height: 58,
                  borderRadius: 12,
                  backgroundColor: chap.accent ? '#3178C6' : '#1A2230',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: FONTS.mono,
                  fontSize: 28,
                  fontWeight: 800,
                  fontVariantNumeric: 'tabular-nums',
                  flexShrink: 0,
                }}
              >
                {chap.badge}
              </div>
            </div>
          );
        })}
      </div>

      {/* Portfolio Proof Callout Bar */}
      <div
        style={{
          backgroundColor: '#111622',
          border: `1px solid ${THEME.borderDark}`,
          borderRadius: 14,
          padding: '20px 26px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
          <ReactAtomIcon size={28} color="#58C7FF" />
          <div>
            <div
              style={{
                fontFamily: FONTS.display,
                fontSize: 24,
                fontWeight: 700,
                color: THEME.textPrimary,
              }}
            >
              This video was rendered with TypeScript + React
            </div>
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 18,
                color: THEME.textSecondary,
                marginTop: 2,
              }}
            >
              900 deterministic frames · Remotion 4 · Source in comments
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            backgroundColor: 'rgba(49, 120, 198, 0.22)',
            border: '1px solid #4B96EB',
            borderRadius: 10,
            padding: '10px 16px',
          }}
        >
          <GitBranchIcon size={20} color="#79B8FF" />
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: 18,
              fontWeight: 700,
              color: '#FFFFFF',
            }}
          >
            {repoUrl}
          </span>
        </div>
      </div>
    </div>
  );
};
