export const textColors = {
    primary: '#2C3E50',
    secondary: '#95A5A6',
    tertiary: '#ECF0F1',
    white: '#FFFFFF',
    green: '#2ECC71',
    warning: '#FE6D51',
} as const;
export type TextColors = keyof typeof textColors;
/* 배경색 */
export const backgroundColors = {
    white: '#FFFFFF',
    lightGray: '#ECF0F1',
    gray: '#95A5A6',
    black: '#000000',
    green: '#2ECC71',
    lightGreen: '#A9DFBF',
} as const;
export type BackgroundColors = keyof typeof backgroundColors;
/* 버튼 배경색 */
export const buttonColors = {
    primary: '#2ECC71',
    secondary: '#27AE60',
    tertiary: '#A9DFBF',
    point: '#F1C40F',
    white: '#FFFFFF',
    navyBlue: '#2C3E50',
    navyBlueDarker: '#1A2231',
    warning: '#FE6D51',
} as const;
export type ButtonColors = keyof typeof buttonColors;

/* 버튼 - 텍스트 색 매핑 */ 
export const buttonTextColorMap : Record<ButtonColors, TextColors> = {
    primary: 'white',
    secondary: 'white',
    tertiary: 'primary',
    point: 'primary',
    white: 'primary',
    navyBlue: 'white',
    navyBlueDarker: 'white',
    warning: 'white',
}