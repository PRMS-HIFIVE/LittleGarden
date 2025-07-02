import { textColors, type TextColors } from "@/styles/paletteMapping";
import styled from "styled-components";

export const StyledTag = styled.span<{textColor?: TextColors; borderColor?: TextColors;}>`
    font-size: 0.8rem;
    font-weight: 600;
    color: ${({textColor = 'secondary'}) => textColors[textColor] ?? textColors.secondary};
    border: 1px solid ${({borderColor = 'secondary'}) => textColors[borderColor] ?? textColors.secondary};
    border-radius: 999px;
    padding: 4px 12px;
    display: inline-block;
    cursor: pointer;
`;

export const TagContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 8px;
    gap: 8px;
`;