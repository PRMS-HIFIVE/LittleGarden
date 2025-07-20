import { type BackgroundColors, backgroundColors } from "@/styles/paletteMapping";
import { type TextColors, textColors } from "@/styles/paletteMapping";

import styled from "styled-components";

const sidebarWidthMap = {
    w50: '50%',
    w60: '60%',
    w70: '70%',
} as const;
export type SidebarWidth = keyof typeof sidebarWidthMap | string;

export const StyledSidebar = styled.div<{
    backgroundColor?: BackgroundColors;
    textColor?: TextColors;
    width?: SidebarWidth;
    padding?: string;
    isOpen?: boolean;
}>`
    background-color: ${({backgroundColor = 'white'}) => backgroundColors[backgroundColor]};

    color: ${({ textColor = 'primary'}) => textColors[textColor]};

    width: ${({width = 'w50'}) => 
        width in sidebarWidthMap
        ? sidebarWidthMap[width as keyof typeof sidebarWidthMap]
        : width
    };

    padding: ${({padding ='20px'}) => padding};

    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    z-index: 100;
    display: flex;
    flex-direction: column;

    transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};

    transition:
    transform 0.3s ease-in-out,
    opacity 0.3s ease-in-out,
    visibility 0.3s ease-in-out;

  pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
`;

export const SidebarMenuItem = styled.button<{ 
    hasIcon?: boolean;
    backgroundColor?: BackgroundColors;
    isFirst?: boolean;
    marginTopAuto?: boolean;
}>`
    background: none;
    color: inherit;
    font-size: 1.3rem;
    text-align: left;
    width: 100%;
    padding: 20px 20px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: ${({ hasIcon }) => hasIcon ? '10px' : '0'};
    border-bottom: 1px solid #ECF0F1;

    ${({isFirst}) => isFirst && `margin-bottom: 10vh;`}
    ${({ marginTopAuto }) => marginTopAuto && `margin-top: auto;`}

    &:hover {
        background-color: ${({backgroundColor = 'primary'}) => backgroundColors[backgroundColor]}
    };
`
export const SidebarLogoutButton = styled(SidebarMenuItem)<{
    backgroundColor?: BackgroundColors;
    textColor?: TextColors;
}>`
    color: ${({ textColor = 'secondary'}) => textColors[textColor]}; 
    background-color: ${({backgroundColor = 'primary'}) => backgroundColors[backgroundColor] || 'primary'};
    justify-content: center;
    &:hover {
        color: ${({ textColor = 'white'}) => textColors[textColor]};
        background-color: ${({backgroundColor = 'gray'}) => backgroundColors[backgroundColor] || 'gray'};
    }
`

export const SidebarContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;

    
`