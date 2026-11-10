export const THEME = {
  // Ground & Workbench Surfaces (anodized carbon slate, tinted cool-dark)
  ground: '#0B0D11',
  groundElevated: '#11151C',
  groundHeader: '#161B24',
  groundHighlight: '#1B2230',
  borderDark: '#252D3D',
  borderSubtle: '#1C2330',

  // Right-pane Rendered Output Stage (warm archival alabaster paper for unmistakable split contrast)
  paper: '#F4F1EA',
  paperElevated: '#FFFFFF',
  paperMuted: '#EAE5DA',
  paperBorder: '#D6CFC2',
  ink: '#111318',
  inkSecondary: '#464C58',
  inkMuted: '#6E7585',

  // Dark-surface Typography (tinted from the slate world, never flat gray)
  textPrimary: '#F3F5F8',
  textSecondary: '#A2B0C4',
  textMuted: '#68778D',

  // Signal & Telemetry Accents
  vermilion: '#FF4F28',
  vermilionSoft: 'rgba(255, 79, 40, 0.14)',
  vermilionBorder: 'rgba(255, 79, 40, 0.42)',
  emerald: '#0E9F6E',
  emeraldBright: '#22D397',
  emeraldSoft: 'rgba(34, 211, 151, 0.14)',
  amber: '#F5B841',
  amberSoft: 'rgba(245, 184, 65, 0.15)',
  sky: '#4CC3FF',
  skySoft: 'rgba(76, 195, 255, 0.14)',

  // Syntax Highlighting Palette (harmonized against #11151C)
  syntax: {
    keyword: '#FF7A59',
    hook: '#F7C45F',
    tag: '#58C7FF',
    prop: '#9CDCFE',
    string: '#4BE0A8',
    number: '#FF9E64',
    punctuation: '#7C8B9E',
    identifier: '#E9EEF5',
    comment: '#617085',
  },
} as const;
