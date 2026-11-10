# GitHub Top Languages Race

An animated bar chart race showing how TypeScript climbed from #8 in 2012 to the #1 language on GitHub in August 2025. Built with [Remotion](https://www.remotion.dev/), so the whole video is React code.

- Format: 1080 × 1350 (4:5 portrait), 30 fps, 15 seconds
- Languages: TypeScript, Python, JavaScript, Java, C++, C#, PHP, Ruby

## Run it

```bash
npm install
npm run dev      # open Remotion Studio and preview
npm run render   # write out/typescript-ranking-race.mp4
```

## Project layout

| Path | What it holds |
| --- | --- |
| `src/Root.tsx` | Composition settings: size, fps, duration, title text |
| `src/TypeScriptRankingRace.tsx` | The animation |
| `src/data/octoverseData.ts` | Yearly contributor figures and bar colors per language |
| `src/components/LanguageBadge.tsx` | Language logo next to each bar |
| `public/logos/` | Logo SVGs |

To change the numbers or add a year, edit `ANNUAL_SERIES` in `src/data/octoverseData.ts`.

## Data

Values are monthly active contributors per language, in millions, based on [GitHub Octoverse](https://octoverse.github.com/).

## Credits

- Language logos from [devicon](https://devicon.dev/) (MIT). The logos are trademarks of their respective owners.
- Video framework: [Remotion](https://www.remotion.dev/). Check the [Remotion license](https://www.remotion.dev/docs/license) before commercial use.
