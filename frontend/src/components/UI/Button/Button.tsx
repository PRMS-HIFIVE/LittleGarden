import type { ReactNode } from "react";
import { StyledButton, type ButtonRadius, type ButtonSize, type ButtonStyleType } from "./Button.styles";
import type { ButtonColors } from "@/styles/paletteMapping";
import type { ButtonVariant } from "@/components/UI/Button/Button.config";
import { ButtonVariantStyleMap } from "@/components/UI/Button/Button.config";

export interface ButtonProps {
    variant?: ButtonVariant;
    color?: ButtonColors;
    buttonSize?: ButtonSize;
    width?: string;
    height?: string;
    padding?: string;
    margin?: string;
    styleType?: ButtonStyleType;
    radius?: ButtonRadius;
    children?: ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    isActive?: boolean; 
}

const Button = ({
    variant = 'default',
    color,
    buttonSize,
    width,
    height,
    padding,
    margin,
    styleType,
    radius,
    children,
    onClick,
    type = 'button',
    isActive = false,
}: ButtonProps) => {
    const variantStyle = ButtonVariantStyleMap[variant] ?? ButtonVariantStyleMap['default'];

    return (
        <StyledButton
            color = {color ?? variantStyle.color}
            $buttonSize = {buttonSize ?? variantStyle.buttonSize}
            $width = {width}
            $height = {height}
            $padding = {padding}
            $margin = {margin}
            $styleType = {styleType ?? variantStyle.styleType}
            $radius = {radius ?? variantStyle.radius}
            onClick = {onClick}
            type = {type}
            $isActive={isActive}
        >
            {children}
        </StyledButton>
    )
};

export default Button;