import {Composition} from 'remotion';
import {TypeScriptRankingRace} from './TypeScriptRankingRace';

export const Root = () => (
  <Composition
    id="TypeScriptRankingRace"
    component={TypeScriptRankingRace}
    width={1080}
    height={1350}
    fps={30}
    durationInFrames={450}
    defaultProps={{
      title: 'GitHub Top Languages',
      subtitle: 'Monthly active contributors · 2012 – Aug 2025',
      sourceNote: 'GitHub Octoverse',
    }}
  />
);
