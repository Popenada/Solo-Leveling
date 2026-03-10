export const theme = {
  colors: {
    // backgrounds
    bg: '#05050f',
    bg2: '#0a0a1a',
    card: '#0d0d20',

    // accents
    purple: '6347ff',
    purpleLight: '#8b6fff',
    cyan: '#06d6e8',
    gold: '#f5c842',
    red: '#ff4757',
    green: '#2ecc71',

    // text
    text: '#e8e8f0',
    textMid: 'a0a0c0',
    textDim: '#6b6b8a',

    // borders
    border: 'rgba(99,71,255,0.2)',
    borderBright: 'rgba(99,71,255,0.6)'
  },
  // font function
  fonts: {
    display: 'Orbitron',
    body: 'Rajdhani',
  },
  // radius function
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    full: 9000
  },
  // spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 30
  },
  // shadows
  shadows: {
    purple: {
      shadowColor: '#6347ff',
      shadowOffset: { width: 0, height: 0},
      shadowOpacity: 0.5,
      shadowRadius: 12,
      elevation: 8,
    },
    cyan: {
      shadowColor: '#06d6e8',
      shadowOffset: { width: 0, height: 0},
      shadowOpacity: 0.4,
      shadowRadius: 10,
      elevatiob: 6,
    }
  }
}

export const Colors = {
  light: {
    text: '#11181C',
    background: '#ffffff',
    tint: theme.colors.purpleLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: theme.colors.purpleLight,
  },
  dark: {
    text: theme.colors.text,
    background: theme.colors.bg,
    tint: theme.colors.purpleLight,
    icon: theme.colors.textDim,
    tabIconDefault: theme.colors.textDim,
    tabIconSelected: theme.colors.purpleLight,
  },
} as const
