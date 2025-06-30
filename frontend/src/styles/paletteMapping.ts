import { palette } from "@/styles/palette";

// - palette : 사용 색상
// - textColors: 텍스트
// - backgroundColors: 배경
// - buttonColors : 버튼 배경색
// - inputBordercolors : 인풋 경계선 색

export const textColors = {
    primary: palette.navyBlue,
    secondary: palette.gray,
    tertiary: palette.lightGray,
    point: palette.yellow,
    white: palette.white,
    green: palette.green,
    warning:palette.warning,
} as const;
export type TextColors = keyof typeof textColors;

export const backgroundColors = {
    primary: palette.lightGray,
    white: palette.white,
    gray: palette.gray,
    lightGreen: palette.lightGreen,
    green: palette.green,
} as const;
export type BackgroundColors = keyof typeof backgroundColors;

export const buttonColors = {
    primary: palette.green,
    secondary: palette.darkGreen,
    tertiary: palette.lightGreen,
    point: palette.yellow,
    white: palette.white,
    lightGray: palette.lightGray,
    gray: palette.gray,
    navyBlue: palette.navyBlue,
    warning: palette.warning,
} as const;
export type ButtonColors = keyof typeof buttonColors;

export const inputBorderColors = {
    clear: palette.none,
    primary: palette.gray,
    secondary: palette.lightGray,
    tertiary: palette.navyBlue,
    warning: palette.warning,
} as const;
export type InputBorderColors = keyof typeof inputBorderColors;

export const sidebarBorderColors = {
    clear: palette.none,
    primary: palette.lightGray,
    secondary: palette.gray,
    tertiary: palette.navyBlue,
} as const;
export type SidebarBorderColors = keyof typeof sidebarBorderColors;

export const buttonTextColorMap : Record<ButtonColors, TextColors> = {
    primary: 'white',
    secondary: 'white',
    tertiary: 'primary',
    point: 'primary',
    white: 'primary',
    lightGray: 'primary',
    gray: 'white',
    navyBlue: 'white',
    warning: 'white',
} 