import type { ButtonColors, TextColors } from "@/styles/color";
import type { ButtonRadius, ButtonSize, ButtonStyleType } from "./Button.styles";

export type ButtonVariant = 'default' | 'diaryMenu';

export const ButtonVariantStyleMap: Record<ButtonVariant, { 
    color: ButtonColors;
    buttonText?: TextColors;
    buttonSize: ButtonSize;
    styleType?: ButtonStyleType;
    radius?: ButtonRadius;
}> = {
    default: { color: 'primary', buttonSize: 'small', styleType: 'filled', radius: 'semiRound' },
    diaryMenu: { color: 'primary', buttonSize: 'small', styleType: 'filled', radius: 'pill' },
};