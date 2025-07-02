import { backgroundColors, textColors, type BackgroundColors, type TextColors } from "@/styles/paletteMapping";
import styled from "styled-components";

export const ModalContainer = styled.div<{
    textColor?: TextColors;
    backgroundColor?: BackgroundColors;
    padding?: string;
    width?: string;
    borderColor?: BackgroundColors;
}>`
    color: ${({textColor = 'primary'}) => textColors[textColor] || textColors.primary};
    background-color: ${({backgroundColor = 'white'}) => backgroundColors[backgroundColor] || backgroundColors.primary};
    padding: ${({padding}) => padding || '0px 0px 0px 0px'};
    width: ${({width}) => width || '300px'};
    border: 2px solid ${({borderColor ='green'}) => backgroundColors[borderColor] || backgroundColors.green};
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const ModalTitle = styled.h3<{textColor?: TextColors; backgroundColor?: BackgroundColors;}>`
    color: ${({textColor = 'white'}) => textColors[textColor] || textColors.white};
    background-color: ${({backgroundColor = 'green'}) => backgroundColors[backgroundColor] || backgroundColors.primary};
    width: 100%;
    font-size: 1.1 rem;
    font-weight: bold;
    text-align: center;
    padding: 4px 0px 8px 0px;
    margin: 0px;
`;

export const ModalContent = styled.p<{textColor?: TextColors;}>`
    color: ${({textColor = 'primary'}) => textColors[textColor] || textColors.primary};
    max-width: 240px;
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
    padding: 0px;
    margin: 0px;
`;