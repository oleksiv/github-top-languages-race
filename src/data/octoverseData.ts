export type LanguageId = 'ts' | 'py' | 'js' | 'java' | 'csharp' | 'php';

export type LanguageMeta = {
  readonly id: LanguageId;
  readonly name: string;
  readonly shortCode: string;
  readonly color: string;
  readonly surfaceColor: string;
  readonly borderColor: string;
  readonly badgeBg: string;
  readonly badgeText: string;
};

export const LANGUAGES: Record<LanguageId, LanguageMeta> = {
  ts: {
    id: 'ts',
    name: 'TypeScript',
    shortCode: 'TS',
    color: '#3178C6',
    surfaceColor: 'rgba(49, 120, 198, 0.24)',
    borderColor: '#58A6FF',
    badgeBg: '#3178C6',
    badgeText: '#FFFFFF',
  },
  py: {
    id: 'py',
    name: 'Python',
    shortCode: 'PY',
    color: '#F59E0B',
    surfaceColor: 'rgba(245, 158, 11, 0.13)',
    borderColor: 'rgba(245, 158, 11, 0.42)',
    badgeBg: '#F59E0B',
    badgeText: '#111318',
  },
  js: {
    id: 'js',
    name: 'JavaScript',
    shortCode: 'JS',
    color: '#FACC15',
    surfaceColor: 'rgba(250, 204, 21, 0.11)',
    borderColor: 'rgba(250, 204, 21, 0.36)',
    badgeBg: '#FACC15',
    badgeText: '#111318',
  },
  java: {
    id: 'java',
    name: 'Java',
    shortCode: 'JV',
    color: '#64748B',
    surfaceColor: 'rgba(100, 116, 139, 0.12)',
    borderColor: 'rgba(100, 116, 139, 0.32)',
    badgeBg: '#334155',
    badgeText: '#F3F5F8',
  },
  csharp: {
    id: 'csharp',
    name: 'C#',
    shortCode: 'C#',
    color: '#526077',
    surfaceColor: 'rgba(82, 96, 119, 0.12)',
    borderColor: 'rgba(82, 96, 119, 0.28)',
    badgeBg: '#283244',
    badgeText: '#D6DFEC',
  },
  php: {
    id: 'php',
    name: 'PHP',
    shortCode: 'PHP',
    color: '#475569',
    surfaceColor: 'rgba(71, 85, 105, 0.12)',
    borderColor: 'rgba(71, 85, 105, 0.28)',
    badgeBg: '#222B3A',
    badgeText: '#B8C4D6',
  },
};

export const LANGUAGE_IDS: readonly LanguageId[] = [
  'ts',
  'py',
  'js',
  'java',
  'csharp',
  'php',
];

export type EraSnapshot = {
  readonly year: number;
  readonly yearLabel: string;
  readonly tsRankLabel: string;
  readonly tsNumericRank: number; // For trajectory curve (25 down to 1)
  readonly milestoneTitle: string;
  readonly milestoneDetail: string;
  readonly metrics: Record<
    LanguageId,
    {
      readonly slotIndex: number; // 0 (top row) to 5 (bottom row)
      readonly octoverseRankLabel: string;
      readonly contributorsMillions: number;
    }
  >;
};

export const TYPESCRIPT_HISTORY: readonly EraSnapshot[] = [
  {
    year: 2012,
    yearLabel: 'Oct 2012',
    tsRankLabel: 'Unranked',
    tsNumericRank: 24,
    milestoneTitle: 'TypeScript v0.8 Open-Sourced',
    milestoneDetail: 'Anders Hejlsberg releases TS 0.8 at Microsoft; JS & PHP dominate GitHub',
    metrics: {
      js: {slotIndex: 0, octoverseRankLabel: '#1', contributorsMillions: 0.42},
      py: {slotIndex: 1, octoverseRankLabel: '#3', contributorsMillions: 0.24},
      java: {slotIndex: 2, octoverseRankLabel: '#4', contributorsMillions: 0.21},
      php: {slotIndex: 3, octoverseRankLabel: '#5', contributorsMillions: 0.19},
      csharp: {slotIndex: 4, octoverseRankLabel: '#8', contributorsMillions: 0.09},
      ts: {slotIndex: 5, octoverseRankLabel: 'v0.8', contributorsMillions: 0.015},
    },
  },
  {
    year: 2014,
    yearLabel: '2014',
    tsRankLabel: '#18',
    tsNumericRank: 18,
    milestoneTitle: 'TypeScript 1.0 Moves to GitHub',
    milestoneDetail: 'Compiler goes self-hosted on GitHub under Apache 2.0 license',
    metrics: {
      js: {slotIndex: 0, octoverseRankLabel: '#1', contributorsMillions: 0.68},
      java: {slotIndex: 1, octoverseRankLabel: '#2', contributorsMillions: 0.41},
      py: {slotIndex: 2, octoverseRankLabel: '#3', contributorsMillions: 0.39},
      php: {slotIndex: 3, octoverseRankLabel: '#4', contributorsMillions: 0.32},
      csharp: {slotIndex: 4, octoverseRankLabel: '#7', contributorsMillions: 0.16},
      ts: {slotIndex: 5, octoverseRankLabel: '#18', contributorsMillions: 0.05},
    },
  },
  {
    year: 2016,
    yearLabel: '2016',
    tsRankLabel: '#12',
    tsNumericRank: 12,
    milestoneTitle: 'TS 2.0 + VS Code + Angular 2',
    milestoneDetail: 'strictNullChecks, @types on npm, and VS Code ignite adoption',
    metrics: {
      js: {slotIndex: 0, octoverseRankLabel: '#1', contributorsMillions: 0.98},
      java: {slotIndex: 1, octoverseRankLabel: '#2', contributorsMillions: 0.61},
      py: {slotIndex: 2, octoverseRankLabel: '#3', contributorsMillions: 0.59},
      php: {slotIndex: 3, octoverseRankLabel: '#4', contributorsMillions: 0.43},
      csharp: {slotIndex: 4, octoverseRankLabel: '#6', contributorsMillions: 0.29},
      ts: {slotIndex: 5, octoverseRankLabel: '#12', contributorsMillions: 0.14},
    },
  },
  {
    year: 2017,
    yearLabel: '2017',
    tsRankLabel: '#10',
    tsNumericRank: 10,
    milestoneTitle: 'Enters GitHub Octoverse Top 10',
    milestoneDetail: 'First appearance in GitHub Top 10 most-used languages',
    metrics: {
      js: {slotIndex: 0, octoverseRankLabel: '#1', contributorsMillions: 1.15},
      py: {slotIndex: 1, octoverseRankLabel: '#2', contributorsMillions: 0.78},
      java: {slotIndex: 2, octoverseRankLabel: '#3', contributorsMillions: 0.71},
      php: {slotIndex: 3, octoverseRankLabel: '#4', contributorsMillions: 0.49},
      csharp: {slotIndex: 4, octoverseRankLabel: '#6', contributorsMillions: 0.41},
      ts: {slotIndex: 5, octoverseRankLabel: '#10', contributorsMillions: 0.26},
    },
  },
  {
    year: 2018,
    yearLabel: '2018',
    tsRankLabel: '#7',
    tsNumericRank: 7,
    milestoneTitle: 'Climbs to #7 as React Adopts TS',
    milestoneDetail: 'Create React App adds native TypeScript support; passes C & Shell',
    metrics: {
      js: {slotIndex: 0, octoverseRankLabel: '#1', contributorsMillions: 1.28},
      py: {slotIndex: 1, octoverseRankLabel: '#2', contributorsMillions: 0.94},
      java: {slotIndex: 2, octoverseRankLabel: '#3', contributorsMillions: 0.82},
      php: {slotIndex: 3, octoverseRankLabel: '#4', contributorsMillions: 0.53},
      csharp: {slotIndex: 4, octoverseRankLabel: '#6', contributorsMillions: 0.46},
      ts: {slotIndex: 5, octoverseRankLabel: '#7', contributorsMillions: 0.44},
    },
  },
  {
    year: 2020,
    yearLabel: '2020',
    tsRankLabel: '#4',
    tsNumericRank: 4,
    milestoneTitle: 'Surges to #4 Past PHP & C#',
    milestoneDetail: 'Full-stack TypeScript becomes standard across Node & frontend',
    metrics: {
      js: {slotIndex: 0, octoverseRankLabel: '#1', contributorsMillions: 1.52},
      py: {slotIndex: 1, octoverseRankLabel: '#2', contributorsMillions: 1.26},
      java: {slotIndex: 2, octoverseRankLabel: '#3', contributorsMillions: 0.98},
      ts: {slotIndex: 3, octoverseRankLabel: '#4', contributorsMillions: 0.89},
      csharp: {slotIndex: 4, octoverseRankLabel: '#5', contributorsMillions: 0.64},
      php: {slotIndex: 5, octoverseRankLabel: '#6', contributorsMillions: 0.58},
    },
  },
  {
    year: 2023,
    yearLabel: '2023',
    tsRankLabel: '#3',
    tsNumericRank: 3,
    milestoneTitle: 'Overtakes Java to Enter Top 3',
    milestoneDetail: 'Next.js, Vite, Astro, and SvelteKit default to TypeScript out of the box',
    metrics: {
      js: {slotIndex: 0, octoverseRankLabel: '#1', contributorsMillions: 1.71},
      py: {slotIndex: 1, octoverseRankLabel: '#2', contributorsMillions: 1.69},
      ts: {slotIndex: 2, octoverseRankLabel: '#3', contributorsMillions: 1.41},
      java: {slotIndex: 3, octoverseRankLabel: '#4', contributorsMillions: 1.24},
      csharp: {slotIndex: 4, octoverseRankLabel: '#5', contributorsMillions: 0.88},
      php: {slotIndex: 5, octoverseRankLabel: '#7', contributorsMillions: 0.67},
    },
  },
  {
    year: 2024,
    yearLabel: '2024',
    tsRankLabel: '#3',
    tsNumericRank: 3,
    milestoneTitle: 'AI Coding Wave Accelerates TS',
    milestoneDetail: 'Python leads on ML boom; TypeScript closes gap to 160K contributors',
    metrics: {
      py: {slotIndex: 0, octoverseRankLabel: '#1', contributorsMillions: 1.74},
      js: {slotIndex: 1, octoverseRankLabel: '#2', contributorsMillions: 1.72},
      ts: {slotIndex: 2, octoverseRankLabel: '#3', contributorsMillions: 1.58},
      java: {slotIndex: 3, octoverseRankLabel: '#4', contributorsMillions: 1.31},
      csharp: {slotIndex: 4, octoverseRankLabel: '#5', contributorsMillions: 0.96},
      php: {slotIndex: 5, octoverseRankLabel: '#7', contributorsMillions: 0.72},
    },
  },
  {
    year: 2025,
    yearLabel: 'Aug 2025',
    tsRankLabel: '#1',
    tsNumericRank: 1,
    milestoneTitle: 'TypeScript Reaches #1 on GitHub',
    milestoneDetail: '+66.6% YoY surge (+1.05M new contributors) overtakes Python & JS',
    metrics: {
      ts: {slotIndex: 0, octoverseRankLabel: '#1', contributorsMillions: 2.636},
      py: {slotIndex: 1, octoverseRankLabel: '#2', contributorsMillions: 2.594},
      js: {slotIndex: 2, octoverseRankLabel: '#3', contributorsMillions: 2.15},
      java: {slotIndex: 3, octoverseRankLabel: '#4', contributorsMillions: 1.48},
      csharp: {slotIndex: 4, octoverseRankLabel: '#5', contributorsMillions: 1.12},
      php: {slotIndex: 5, octoverseRankLabel: '#7', contributorsMillions: 0.79},
    },
  },
];
