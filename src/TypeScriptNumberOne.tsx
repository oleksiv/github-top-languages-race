import type React from 'react';
import {AbsoluteFill, Sequence, Track, useVideoConfig} from 'remotion';
import {Scene1Hook} from './components/Scene1Hook';
import {Scene2RankingRace} from './components/Scene2RankingRace';
import {Scene3AiWhyItWon} from './components/Scene3AiWhyItWon';
import {Scene4Summary} from './components/Scene4Summary';
import {TelemetryFooter} from './components/TelemetryFooter';
import {THEME} from './theme';

export type TypeScriptNumberOneProps = {
  readonly repoUrl: string;
  readonly sourceLabel: string;
};

export const TypeScriptNumberOne: React.FC<TypeScriptNumberOneProps> = ({
  repoUrl,
  sourceLabel,
}) => {
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: THEME.ground,
        overflow: 'hidden',
      }}
    >
      <Track name="Scenes">
        {/* Scene 1: 0s - 4s (Frames 0 - 120) — The 2-Second Hook & Aug 2025 Podium */}
        <Sequence name="1 - Aug 2025 #1 Hook" durationInFrames={4 * fps}>
          <Scene1Hook />
        </Sequence>

        {/* Scene 2: 4s - 18s (Frames 120 - 540) — Full 2012 v0.8 to Aug 2025 #1 Ranking Race */}
        <Sequence
          name="2 - 2012 to 2025 Ranking Race"
          from={4 * fps}
          durationInFrames={14 * fps}
        >
          <Scene2RankingRace />
        </Sequence>

        {/* Scene 3: 18s - 25s (Frames 540 - 750) — +1.05M YoY Surge & AI Compiler Loop */}
        <Sequence
          name="3 - +66.6% YoY & AI Guardrails"
          from={18 * fps}
          durationInFrames={7 * fps}
        >
          <Scene3AiWhyItWon />
        </Sequence>

        {/* Scene 4: 25s - 30s (Frames 750 - 900) — 13-Year Ledger & Repo Callout */}
        <Sequence
          name="4 - 13-Year Summary"
          from={25 * fps}
          durationInFrames={5 * fps}
        >
          <Scene4Summary repoUrl={repoUrl} />
        </Sequence>
      </Track>

      <TelemetryFooter sourceLabel={sourceLabel} />
    </AbsoluteFill>
  );
};
