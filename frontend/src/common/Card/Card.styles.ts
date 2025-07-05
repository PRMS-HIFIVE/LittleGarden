import { backgroundColors, textColors, type BackgroundColors, type TextColors } from "@/styles/paletteMapping";
import styled from "styled-components";

export const CardContainer = styled.div`
    width: 340px;
    max-width: 340px;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
`;
export const CardHeader = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 14px;
`;
export const CardTitle = styled.h3<{titleColor?: TextColors;}>`
    color: ${({titleColor = 'primary'}) => textColors[titleColor] || textColors.primary};
    font-size: 1rem;
    font-weight: bold;
    margin: 0px;
`;
export const CardDate = styled.span<{dateColor?: TextColors;}>`
    color: ${({dateColor = 'secondary'}) => textColors[dateColor] || textColors.secondary};
    font-size: 0.8rem;
    font-weight: 300;
`;
export const CardContent = styled.p<{contentColor?: TextColors;}>`
    color: ${({contentColor = 'primary'}) => textColors[contentColor] || textColors.primary};
    font-size: 0.8rem;
    font-weight: 400;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;
export const CardThumbnail = styled.div<{src?: string, noImage?: BackgroundColors;}>`
    width: 90px;
    height: 90px;
    border-radius: 8px;
    background-image: ${({src}) => src ? `url(${src})` : 'none'};
    background-color: ${({ src, noImage }) => !src ? backgroundColors[noImage ?? 'primary'] : 'transparent'};
    background-size: cover;
    background-position: center;
    margin-bottom: 20px;
`;
//=== === ===
export const CardProfile = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
`;
export const CardTitleDateWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;