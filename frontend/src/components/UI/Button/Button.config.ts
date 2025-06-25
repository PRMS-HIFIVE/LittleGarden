import type { ButtonColors } from "@/styles/color";
import type { ButtonRadius, ButtonSize, ButtonStyleType } from "./Button.styles";

export type ButtonVariant = 'default' | 'diaryMenu';

export const ButtonVariantStyleMap: Record<ButtonVariant, { 
    color: ButtonColors; 
    buttonSize: ButtonSize;
    styleType?: ButtonStyleType;
    radius?: ButtonRadius;
}> = {
    default: { color: 'primary', buttonSize: 'normal', styleType: 'filled', radius: 'semiRound' },
    diaryMenu: { color: 'primary', buttonSize: 'normal', styleType: 'filled', radius: 'pill' },
};