import styled from "styled-components";
import { buttonColors, buttonTextColorMap, textColors, type ButtonColors } from "@/styles/color";

export type ButtonSize = 'small' | 'medium' | 'large' | string;
export type ButtonStyleType = 'filled' | 'outline' | 'clear';
export type ButtonRadius = 'square' | 'semiRound' | 'round' | 'pill' | string;

export const buttonSizeMap = {
    small: {width: '100px', height: '35px'},
    medium: {width: '185px', height: '50px'},
    large: {width: '200px', height: '40px'},
    full: {width: '100%', height: '50px;'}
};

export const StyledButton = styled.button<{ 
    color: ButtonColors; 
    buttonSize: ButtonSize; 
    styleType?: ButtonStyleType; 
    radius?: ButtonRadius;
    width?: string;
    height?: string;
}>`
    background-color: ${({color, styleType}) =>
        styleType === 'filled' 
        ? buttonColors[color]
        : styleType === 'outline'
        ? 'transparent'
        : styleType === 'clear' 
        ? 'transparent'
        : buttonColors[color]
    };

  ${({ buttonSize = 'medium', width, height }) => {
    const size = buttonSizeMap[buttonSize as keyof typeof buttonSizeMap] || {};
    return `
      width: ${width && width !=='' ? width : size.width ?? 'auto'};
      height: ${height && height!== '' ? height : size.height ?? 'auto'};
    `;
  }}

    color: ${({color, styleType}) => 
      styleType === 'outline'
      ? buttonColors[color]
      : textColors[buttonTextColorMap[color]]};

    border: ${({color, styleType}) =>
        styleType === 'outline' ? `2px solid ${buttonColors[color]}` : 'none'
    };

    border-radius: ${({radius}) => 
        radius === 'square'
        ? '0'
        : radius === 'semiRound'
        ? '4px'
        : radius === 'round'
        ? '8px'
        : radius === 'pill'
        ? '999px'
        : radius
    };

    padding: 8px 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
`;
