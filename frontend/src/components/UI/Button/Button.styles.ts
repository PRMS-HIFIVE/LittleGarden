import styled from "styled-components";
import {
  buttonColors,
  buttonTextColorMap,
  textColors,
  type ButtonColors,
} from "@/styles/paletteMapping";


export type ButtonSize = 'small' | 'medium' | 'large' | 'full' | string;
export type ButtonStyleType = 'filled' | 'outline' | 'clear';
export type ButtonRadius = 'square' | 'semiRound' | 'round' | 'pill' | string;


export const buttonSizeMap = {
  small: { width: "100px", height: "35px" },
  medium: { width: "185px", height: "50px" },
  large: { width: "200px", height: "40px" },
  full: { width: "100%", height: "50px" },
};

/*
export const StyledButton = styled.button<{ 
    color: ButtonColors; 
    buttonSize: ButtonSize; 
    styleType?: ButtonStyleType; 
    radius?: ButtonRadius;
    width?: string;
    height?: string;
    padding?: string;
    margin?: string;
}>`
    background-color: ${({color, styleType}) =>
        styleType === 'filled' 
        ? buttonColors[color]
        : styleType === 'outline'
        ? 'transparent'
        : styleType === 'clear' 
        ? 'transparent'
        : buttonColors[color]
    };*/

// 버튼 텍스트 크기 설정
const buttonFontSizeMap = {
  small: "14px",
  medium: "16px",
  large: "18px",
  full: "16px",
};


export const StyledButton = styled.button<{
  color: ButtonColors;
  buttonSize: ButtonSize;
  styleType?: ButtonStyleType;
  radius?: ButtonRadius;
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
}>`
  background-color: ${({ color, styleType }) =>
    styleType === 'filled' 
      ? buttonColors[color]
      : styleType === 'outline'
      ? 'transparent'
      : styleType === 'clear' 
      ? 'transparent'
      : buttonColors[color]
    };

  ${({ buttonSize = "medium", width, height }) => {
    const size = buttonSizeMap[buttonSize as keyof typeof buttonSizeMap] || {};
    return `
      width: ${width && width !== "" ? width : size.width ?? "auto"};
      height: ${height && height !== "" ? height : size.height ?? "auto"};
    `;
  }}

  font-size: ${({ buttonSize = "medium" }) =>
    buttonFontSizeMap[buttonSize as keyof typeof buttonFontSizeMap] || "16px"};

  color: ${({ color, styleType }) =>
    styleType === "outline"
      ? buttonColors[color]
      : textColors[buttonTextColorMap[color]]};

  border: ${({ color, styleType }) =>
    styleType === "outline" ? `2px solid ${buttonColors[color]}` : "none"};

  border-radius: ${({ radius }) =>
    radius === "square"
      ? "0"
      : radius === "semiRound"
      ? "4px"
      : radius === "round"
      ? "8px"
      : radius === "pill"
      ? "999px"
      : radius};

    padding: ${({ padding }) => typeof padding === 'string' && padding.trim() !== ''
    ? padding
    : '8px 24px'};
    margin: ${({ margin }) => typeof margin === 'string' && margin.trim() !== ''
    ? margin
    : '0'};
    display: inline-flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    box-sizing: border-box;

    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-weight: 600;
`;
