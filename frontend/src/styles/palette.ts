export const palette = {
    white: '#FFFFFF',
    black: '#000000',
    
    lightGreen: '#A9DFBF',
    green: '#2ECC71',
    darkGreen: '#27AE60',

    navyBlue: '#2C3E50',
    gray: '#95A5A6',
    lightGray: '#ECF0F1',

    yellow: '#F1C40F',
    warning: '#FE6D51',
    none: 'none',
} as const
export type PaletteColor = keyof typeof palette;