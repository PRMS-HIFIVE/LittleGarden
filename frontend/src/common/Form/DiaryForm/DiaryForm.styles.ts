import styled from "styled-components";
import { backgroundColors, textColors, type BackgroundColors, type TextColors } from '@/styles/paletteMapping';
import { palette } from '@/styles/palette';

export const DiaryContainer = styled.div<{
    backgroundColor?: BackgroundColors;
}>`
    width: 100%;
    min-width: 360px;
    max-width: 393px;
    max-height: 100vh;
    margin: 0 auto;
    padding: 20px 16px;
    background-color: ${({backgroundColor = 'white'}) => backgroundColors[backgroundColor] || backgroundColors.white};
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: stretch;

`;

export const DiaryHeaderTitle = styled.h3<{
    textColor?: TextColors;
}>`
    color: ${({textColor = 'primary'}) => textColors[textColor] || textColors.primary};
    font-size: 1rem;
    font-weight: bold;
    margin: 0px;
`;

export const DiaryStyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    min-width: 100%;
    
`;

export const DiaryStyledTextarea = styled.textarea`
    width: 100%;
    min-height: 220px;
    box-sizing: border-box;
    resize: none;
    border: 1px solid ${palette.gray};
    border-radius: 8px;
    padding: 10px 8px;
    font-size: 1rem;
    color: ${palette.navyBlue};
    line-height: 1.4;

    &:focus {
        outline: none;
        border: 1px solid ${palette.navyBlue};
    };
`;
