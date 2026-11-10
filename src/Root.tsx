import {Composition, Folder} from 'remotion';
import {Scene1Hook} from './components/Scene1Hook';
import {Scene2RankingRace} from './components/Scene2RankingRace';
import {Scene3AiWhyItWon} from './components/Scene3AiWhyItWon';
import {Scene4Summary} from './components/Scene4Summary';
import {TypeScriptNumberOne} from './TypeScriptNumberOne';

export const Root = () => (
  <>
    <Composition
      id="TypeScriptNumberOne"
      component={TypeScriptNumberOne}
      width={1080}
      height={1350}
      fps={30}
      durationInFrames={900}
      defaultProps={{
        repoUrl: 'github.com/oleksiv/linkedin-videos',
        sourceLabel: 'Source: GitHub Octoverse 2025 (Aug 2025 contributors)',
      }}
    />

    <Folder name="Scenes">
      <Composition
        id="Scene1-Hook"
        component={Scene1Hook}
        width={1080}
        height={1350}
        fps={30}
        durationInFrames={120}
      />
      <Composition
        id="Scene2-RankingRace-2012-2025"
        component={Scene2RankingRace}
        width={1080}
        height={1350}
        fps={30}
        durationInFrames={420}
      />
      <Composition
        id="Scene3-AiCompilerLoop"
        component={Scene3AiWhyItWon}
        width={1080}
        height={1350}
        fps={30}
        durationInFrames={210}
      />
      <Composition
        id="Scene4-Summary"
        component={Scene4Summary}
        width={1080}
        height={1350}
        fps={30}
        durationInFrames={150}
        defaultProps={{
          repoUrl: 'github.com/oleksiv/linkedin-videos',
        }}
      />
    </Folder>
  </>
);
