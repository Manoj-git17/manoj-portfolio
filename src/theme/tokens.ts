export const MAGAZINE_THEME = {
  palette: {
    cream: '#F2EFE6',
    nearBlack: '#0E0E0E',
    yellow: '#FFD60A',
    red: '#E5321B',
    white: '#FFFFFF',
    greyMuted: '#6B6862',
    borderDark: 'rgba(14, 14, 14, 0.12)',
    borderLight: 'rgba(242, 239, 230, 0.15)',
  },
  typography: {
    heading: '"Anton", "Bebas Neue", sans-serif',
    accent: '"Instrument Serif", Georgia, serif',
    mono: '"JetBrains Mono", Menlo, monospace',
    body: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  editorial: {
    volume: 'VOL. 01',
    issue: 'ISSUE · 2026',
    est: 'EST. 2026',
    classification: 'SPECIAL REPORT // ENGINEERING CASE FILES',
    tagline: 'Data first, systems always.',
    primarySkillTag: 'PRIMARY SPEC: DATA & AI SYSTEMS',
  },
} as const;

export type MagazineTheme = typeof MAGAZINE_THEME;
