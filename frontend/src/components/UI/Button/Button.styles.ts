import styled from "styled-components";
import { buttonColors, buttonTextColorMap, textColors, type ButtonColors } from "@/styles/color";

export type ButtonSize = 'small' | 'normal' | 'large' | string;
export type ButtonStyleType = 'filled' | 'outline' | 'clear';
export type ButtonRadius = 'square' | 'semiRound' | 'round' | 'pill' | string;

export const StyledButton = styled.button<{ 
    color: ButtonColors; 
    buttonSize: ButtonSize; 
    styleType?: ButtonStyleType; 
    radius?: ButtonRadius 
}>`
    background-color: ${({color, styleType}) =>
        styleType === 'filled' 
        ? buttonColors[color]
        : styleType === 'clear' 
        ? 'transparent'
        : buttonColors[color]
    };

    color: ${({color}) => textColors[buttonTextColorMap[color]]};

    border: ${({color, styleType}) =>
        styleType === 'outline' ? `2px solid ${buttonColors[color]}` : 'none'
    };

    padding: ${({buttonSize}) =>
        buttonSize === 'small'
        ? '4px 8px'
        : buttonSize === 'large'
        ? '12px 24px'
        : buttonSize === 'normal'
        ? '8px 24px'
        : buttonSize
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

    cursor: pointer;
`;
