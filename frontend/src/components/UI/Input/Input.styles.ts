import { inputBorderColor, type inputBorderColors, type TextColors } from "@/styles/color";
import styled from "styled-components";

export type BorderRadius = '0px' | '2px' | '4px' | '8px' | string;

interface StyledInputProps {
    width?: string;
    height?: string;
    padding?: string;
    borderColor?: inputBorderColors;
    radius?: BorderRadius;
    textAlign?: 'left' | 'center' | 'right';
    textColor?: TextColors;
    fontSize?: string;
}

export const StyledInput = styled.input<StyledInputProps>`
    width: ${({width}) => width || '100%'};
    height: ${({height}) => height || '40px'};
    padding: ${({padding}) => padding || '4px 8px'};
    border: 1px solid ${({ borderColor }) =>
      borderColor && inputBorderColor[borderColor] !== 'none'
        ? inputBorderColor[borderColor]
        : '#95A5A6'};
    border-radius: ${({ radius }) => radius || '4px'};
    text-align: ${({textAlign}) => textAlign || 'left'};
    color: ${({textColor}) => textColor || '#2C3E50'};
    font-size: ${({fontSize}) => fontSize || '1rem'};
    box-sizing: border-box;
`