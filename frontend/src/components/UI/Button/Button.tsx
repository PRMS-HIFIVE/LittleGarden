import type { ReactNode } from "react";
import { StyledButton, type ButtonRadius, type ButtonSize, type ButtonStyleType } from "./Button.styles";
import type { ButtonColors } from "@/styles/color";
import type { ButtonVariant } from "@/components/UI/Button/Button.config";
import { ButtonVariantStyleMap } from "@/components/UI/Button/Button.config";

export interface ButtonProps {
    variant?: ButtonVariant;
    color?: ButtonColors;
    buttonSize?: ButtonSize;
    styleType?: ButtonStyleType;
    radius?: ButtonRadius;
    children: ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}

const Button = ({
    variant = 'default',
    color,
    buttonSize,
    styleType,
    radius,
    children,
    onClick,
    type = 'button'
}: ButtonProps) => {
    const variantStyle = ButtonVariantStyleMap[variant] ?? ButtonVariantStyleMap['default'];

    return (
        <StyledButton
            color = {color ?? variantStyle.color}
            buttonSize = {buttonSize ?? variantStyle.buttonSize}
            styleType = {styleType ?? variantStyle.styleType}
            radius = {radius ?? variantStyle.radius}
            onClick = {onClick}
            type = {type}
        >
            {children}
        </StyledButton>
    )
};

export default Button;