import type React from 'react';
import {Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {FONTS} from '../fonts';
import {THEME} from '../theme';
import {ArrowRightIcon, CheckCircleIcon, TerminalIcon} from './Icons';
import {LanguageBadge} from './LanguageBadge';

export const Scene3AiWhyItWon: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const surgeData = [
    {
      id: 'ts' as const,
      name: 'TypeScript',
      addedLabel: '+1,053,000',
      yoy: '+66.6% YoY',
      ratio: 1,
      color: '#3178C6',
    },
    {
      id: 'py' as const,
      name: 'Python',
      addedLabel: '+850,000',
      yoy: '+48.8% YoY',
      ratio: 850000 / 1053000,
      color: '#F59E0B',
    },
    {
      id: 'js' as const,
      name: 'JavaScript',
      addedLabel: '+427,000',
      yoy: '+24.8% YoY',
      ratio: 427000 / 1053000,
      color: '#FACC15',
    },
  ];

  const cardSpring = spring({
    frame: Math.max(0, frame - 18),
    fps,
    config: {damping: 18, stiffness: 160},
  });

  const loopSteps = [
    {
      step: '1. Agent Generates',
      code: 'user.accountId',
      status: 'Hallucinated prop',
      tone: 'amber' as const,
      triggerFrame: 32,
    },
    {
      step: '2. tsc --noEmit',
      code: 'Error TS2339 (40ms)',
      status: 'Caught at compile',
      tone: 'vermilion' as const,
      triggerFrame: 52,
    },
    {
      step: '3. Agent Self-Heals',
      code: 'user.id // ✓ string',
      status: 'Verified contract',
      tone: 'emerald' as const,
      triggerFrame: 72,
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
      {/* Headline — No eyebrow kicker */}
      <div>
        <h1
          style={{
            margin: 0,
            fontFamily: FONTS.display,
            fontSize: 70,
            fontWeight: 800,
            lineHeight: 1.04,
            letterSpacing: '-0.035em',
            color: THEME.textPrimary,
            textWrap: 'balance',
          }}
        >
          Why TypeScript added{' '}
          <span style={{color: '#58A6FF'}}>+1.05M</span> contributors in a year.
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
          AI coding agents need compiler feedback. Static types catch LLM
          hallucinations before runtime.
        </p>
      </div>

      {/* Top Section: 1-Year Net New Monthly Contributors (Aug 2024 → Aug 2025) */}
      <div
        style={{
          backgroundColor: THEME.groundElevated,
          border: `1px solid ${THEME.borderDark}`,
          borderRadius: 16,
          padding: '24px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontFamily: FONTS.display,
              fontSize: 26,
              fontWeight: 700,
              color: THEME.textPrimary,
            }}
          >
            New Monthly Contributors Added (2024 → Aug 2025)
          </span>
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: 20,
              fontWeight: 700,
              color: '#FF7A59',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            2.5× plain JS growth
          </span>
        </div>

        {surgeData.map((item, idx) => {
          const barW = interpolate(
            frame,
            [6 + idx * 6, 46 + idx * 6],
            [0, item.ratio * 100],
            {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            },
          );

          return (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <LanguageBadge id={item.id} size={46} />
              <div
                style={{
                  width: 154,
                  fontFamily: FONTS.display,
                  fontSize: 26,
                  fontWeight: item.id === 'ts' ? 800 : 600,
                  color: THEME.textPrimary,
                  flexShrink: 0,
                }}
              >
                {item.name}
              </div>

              <div
                style={{
                  flex: 1,
                  height: 34,
                  backgroundColor: '#0A0D13',
                  borderRadius: 8,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${barW}%`,
                    height: '100%',
                    backgroundColor: item.color,
                    borderRadius: 8,
                  }}
                />
              </div>

              <div
                style={{
                  width: 152,
                  textAlign: 'right',
                  fontFamily: FONTS.mono,
                  fontSize: 25,
                  fontWeight: 700,
                  color: item.id === 'ts' ? '#FFFFFF' : THEME.textSecondary,
                  fontVariantNumeric: 'tabular-nums',
                  flexShrink: 0,
                }}
              >
                {item.addedLabel}
              </div>

              <div
                style={{
                  width: 134,
                  textAlign: 'right',
                  fontFamily: FONTS.mono,
                  fontSize: 20,
                  fontWeight: 700,
                  color: item.id === 'ts' ? '#58A6FF' : THEME.textMuted,
                  fontVariantNumeric: 'tabular-nums',
                  flexShrink: 0,
                }}
              >
                {item.yoy}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Section: The AI + tsc Compiler Verification Loop */}
      <div
        style={{
          backgroundColor: '#111A29',
          border: '2px solid #3178C6',
          borderRadius: 16,
          padding: '24px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          opacity: interpolate(cardSpring, [0, 1], [0, 1]),
          translate: `0px ${interpolate(cardSpring, [0, 1], [24, 0])}px`,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
            <TerminalIcon size={24} color="#58A6FF" />
            <span
              style={{
                fontFamily: FONTS.display,
                fontSize: 28,
                fontWeight: 700,
                color: THEME.textPrimary,
              }}
            >
              The AI Agent Compiler Loop
            </span>
          </div>

          <span
            style={{
              backgroundColor: 'rgba(49, 120, 198, 0.25)',
              border: '1px solid #58A6FF',
              color: '#FFFFFF',
              fontFamily: FONTS.mono,
              fontSize: 18,
              fontWeight: 700,
              padding: '6px 14px',
              borderRadius: 8,
            }}
          >
            94% of LLM errors = type mismatches
          </span>
        </div>

        {/* 3-Step Animated Compiler Feedback Pipeline */}
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          {loopSteps.map((s, idx) => {
            const active = frame >= s.triggerFrame;
            const borderCol =
              s.tone === 'emerald'
                ? 'rgba(34, 211, 151, 0.55)'
                : s.tone === 'vermilion'
                  ? 'rgba(255, 79, 40, 0.55)'
                  : 'rgba(245, 184, 65, 0.55)';
            const textCol =
              s.tone === 'emerald'
                ? THEME.emeraldBright
                : s.tone === 'vermilion'
                  ? '#FF7A59'
                  : THEME.amber;

            return (
              <div
                key={s.step}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    backgroundColor: active ? '#0B121E' : '#0B0F17',
                    border: active
                      ? `1.5px solid ${borderCol}`
                      : `1px solid ${THEME.borderDark}`,
                    borderRadius: 12,
                    padding: '16px 16px',
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONTS.sans,
                      fontSize: 18,
                      fontWeight: 700,
                      color: THEME.textSecondary,
                    }}
                  >
                    {s.step}
                  </div>
                  <div
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: 20,
                      fontWeight: 700,
                      color: active ? '#FFFFFF' : THEME.textMuted,
                      marginTop: 8,
                    }}
                  >
                    {s.code}
                  </div>
                  <div
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: 16,
                      fontWeight: 600,
                      color: active ? textCol : THEME.textMuted,
                      marginTop: 6,
                    }}
                  >
                    {s.status}
                  </div>
                </div>
                {idx < loopSteps.length - 1 ? (
                  <ArrowRightIcon size={20} color="#58A6FF" />
                ) : null}
              </div>
            );
          })}
        </div>

        {/* Two-Column Comparison: Untyped JS vs Strict TypeScript */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 18,
          }}
        >
          {/* Left: Untyped JS */}
          <div
            style={{
              backgroundColor: '#0B0F17',
              border: `1px solid ${THEME.borderDark}`,
              borderRadius: 12,
              padding: '16px 20px',
            }}
          >
            <div
              style={{
                fontFamily: FONTS.sans,
                fontSize: 21,
                fontWeight: 700,
                color: '#FF7A59',
                marginBottom: 6,
              }}
            >
              Dynamic JS: Fails at Runtime
            </div>
            <div
              style={{
                fontFamily: FONTS.sans,
                fontSize: 19,
                lineHeight: 1.4,
                color: THEME.textSecondary,
              }}
            >
              66% of devs say fixing "almost right" AI code takes longer without
              compiler checks.
            </div>
          </div>

          {/* Right: Strict TypeScript */}
          <div
            style={{
              backgroundColor: '#0B1320',
              border: '1px solid rgba(34, 211, 151, 0.45)',
              borderRadius: 12,
              padding: '16px 20px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: FONTS.sans,
                fontSize: 21,
                fontWeight: 700,
                color: THEME.emeraldBright,
                marginBottom: 6,
              }}
            >
              <CheckCircleIcon size={20} color={THEME.emeraldBright} />
              <span>Strict TS: Caught in 40ms</span>
            </div>
            <div
              style={{
                fontFamily: FONTS.sans,
                fontSize: 19,
                lineHeight: 1.4,
                color: THEME.textPrimary,
              }}
            >
              Types constrain the search space and give agents deterministic
              pass/fail signals.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
