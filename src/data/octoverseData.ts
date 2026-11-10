export type LanguageId =
  | 'ts'
  | 'py'
  | 'js'
  | 'java'
  | 'cpp'
  | 'csharp'
  | 'php'
  | 'ruby';

export type LanguageMeta = {
  readonly id: LanguageId;
  readonly name: string;
  readonly shortCode: string;
  readonly barColor: string;
  readonly badgeBg: string;
  readonly badgeText: string;
};

// Restrained palette: TypeScript stands out in signature blue;
// Python & JS have subtle warm accents; other languages use quiet slate tones.
export const LANGUAGES: Record<LanguageId, LanguageMeta> = {
  ts: {
    id: 'ts',
    name: 'TypeScript',
    shortCode: 'TS',
    barColor: '#3178C6',
    badgeBg: '#3178C6',
    badgeText: '#FFFFFF',
  },
  py: {
    id: 'py',
    name: 'Python',
    shortCode: 'PY',
    barColor: '#3B4963',
    badgeBg: '#EAB308',
    badgeText: '#0F131A',
  },
  js: {
    id: 'js',
    name: 'JavaScript',
    shortCode: 'JS',
    barColor: '#334056',
    badgeBg: '#FACC15',
    badgeText: '#0F131A',
  },
  java: {
    id: 'java',
    name: 'Java',
    shortCode: 'JV',
    barColor: '#283346',
    badgeBg: '#334155',
    badgeText: '#CBD5E1',
  },
  cpp: {
    id: 'cpp',
    name: 'C++',
    shortCode: 'C++',
    barColor: '#242F40',
    badgeBg: '#293548',
    badgeText: '#94A3B8',
  },
  csharp: {
    id: 'csharp',
    name: 'C#',
    shortCode: 'C#',
    barColor: '#222C3C',
    badgeBg: '#263142',
    badgeText: '#94A3B8',
  },
  php: {
    id: 'php',
    name: 'PHP',
    shortCode: 'PHP',
    barColor: '#202A38',
    badgeBg: '#232E3E',
    badgeText: '#94A3B8',
  },
  ruby: {
    id: 'ruby',
    name: 'Ruby',
    shortCode: 'RB',
    barColor: '#1E2735',
    badgeBg: '#212B3B',
    badgeText: '#94A3B8',
  },
};

export const LANGUAGE_IDS: readonly LanguageId[] = [
  'ts',
  'py',
  'js',
  'java',
  'cpp',
  'csharp',
  'php',
  'ruby',
];

export type AnnualPoint = {
  readonly year: number;
  readonly label: string;
  readonly milestone: string;
  // Monthly active contributors in millions
  readonly values: Record<LanguageId, number>;
};

export const ANNUAL_SERIES: readonly AnnualPoint[] = [
  {
    year: 2012,
    label: '2012',
    milestone: 'Oct 2012 · TypeScript v0.8 open-sourced',
    values: {
      js: 0.42,
      py: 0.25,
      java: 0.22,
      php: 0.2,
      ruby: 0.18,
      cpp: 0.13,
      csharp: 0.09,
      ts: 0.015,
    },
  },
  {
    year: 2013,
    label: '2013',
    milestone: '2013 · Early compiler & IDE tooling',
    values: {
      js: 0.54,
      py: 0.31,
      java: 0.29,
      php: 0.25,
      ruby: 0.21,
      cpp: 0.16,
      csharp: 0.12,
      ts: 0.028,
    },
  },
  {
    year: 2014,
    label: '2014',
    milestone: '2014 · TypeScript 1.0 moves to GitHub',
    values: {
      js: 0.68,
      java: 0.41,
      py: 0.39,
      php: 0.32,
      ruby: 0.23,
      cpp: 0.21,
      csharp: 0.16,
      ts: 0.052,
    },
  },
  {
    year: 2015,
    label: '2015',
    milestone: '2015 · ES6 support & VS Code launch',
    values: {
      js: 0.82,
      java: 0.51,
      py: 0.48,
      php: 0.38,
      ruby: 0.24,
      cpp: 0.27,
      csharp: 0.22,
      ts: 0.095,
    },
  },
  {
    year: 2016,
    label: '2016',
    milestone: '2016 · TypeScript 2.0 + @types + Angular 2',
    values: {
      js: 0.98,
      java: 0.61,
      py: 0.59,
      php: 0.43,
      cpp: 0.34,
      csharp: 0.29,
      ts: 0.255,
      ruby: 0.245,
    },
  },
  {
    year: 2017,
    label: '2017',
    milestone: '2017 · Breaks into GitHub Octoverse Top 10',
    values: {
      js: 1.15,
      py: 0.78,
      java: 0.71,
      php: 0.49,
      cpp: 0.42,
      csharp: 0.38,
      ts: 0.35,
      ruby: 0.25,
    },
  },
  {
    year: 2018,
    label: '2018',
    milestone: '2018 · Create React App adds native TypeScript',
    values: {
      js: 1.28,
      py: 0.94,
      java: 0.82,
      php: 0.53,
      cpp: 0.5,
      ts: 0.49,
      csharp: 0.45,
      ruby: 0.26,
    },
  },
  {
    year: 2019,
    label: '2019',
    milestone: '2019 · Surges past C# and C++',
    values: {
      js: 1.4,
      py: 1.1,
      java: 0.9,
      ts: 0.69,
      php: 0.56,
      cpp: 0.55,
      csharp: 0.52,
      ruby: 0.27,
    },
  },
  {
    year: 2020,
    label: '2020',
    milestone: '2020 · Reaches #4 on GitHub Octoverse',
    values: {
      js: 1.52,
      py: 1.26,
      java: 0.98,
      ts: 0.91,
      csharp: 0.64,
      cpp: 0.61,
      php: 0.58,
      ruby: 0.28,
    },
  },
  {
    year: 2021,
    label: '2021',
    milestone: '2021 · Full-stack TypeScript becomes standard',
    values: {
      js: 1.61,
      py: 1.4,
      java: 1.08,
      ts: 1.05,
      csharp: 0.72,
      cpp: 0.68,
      php: 0.61,
      ruby: 0.29,
    },
  },
  {
    year: 2022,
    label: '2022',
    milestone: '2022 · Next.js, Vite & Astro default to TS',
    values: {
      js: 1.68,
      py: 1.54,
      ts: 1.23,
      java: 1.18,
      csharp: 0.79,
      cpp: 0.75,
      php: 0.64,
      ruby: 0.3,
    },
  },
  {
    year: 2023,
    label: '2023',
    milestone: '2023 · Solidifies #3 ahead of Java',
    values: {
      js: 1.72,
      py: 1.69,
      ts: 1.42,
      java: 1.24,
      cpp: 0.86,
      csharp: 0.84,
      php: 0.67,
      ruby: 0.31,
    },
  },
  {
    year: 2024,
    label: '2024',
    milestone: '2024 · AI wave pushes Python #1; TS closes in',
    values: {
      py: 1.84,
      js: 1.78,
      ts: 1.66,
      java: 1.31,
      cpp: 0.94,
      csharp: 0.91,
      php: 0.71,
      ruby: 0.32,
    },
  },
  {
    year: 2025,
    label: 'Aug 2025',
    milestone: 'Aug 2025 · TypeScript reaches #1 (+66.6% YoY)',
    values: {
      ts: 2.636,
      py: 2.594,
      js: 2.15,
      java: 1.48,
      cpp: 1.08,
      csharp: 1.04,
      php: 0.78,
      ruby: 0.35,
    },
  },
];
