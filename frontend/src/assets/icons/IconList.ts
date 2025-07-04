import styled from "styled-components";
import Bell from "@/assets/icons/Bell.svg?react";
import Menu from "@/assets/icons/Menu.svg?react";
import ChevronLeft from "@/assets/icons/ChevronLeft.svg?react";
import Star from "@/assets/icons/Star.svg?react";
import Edit from "@/assets/icons/Edit.svg?react";
import X from "@/assets/icons/CloseX.svg?react";
import Logo from "@/assets/icons/Logo.svg?react"


export const IconBell = styled(Bell)<{size?: number}>`
    width: ${({size}) => size ? `${size}px` : '24px'};
    height: ${({size}) => size ? `${size}px` : '24px'};
    cursor: pointer;
`;

export const IconMenu = styled(Menu)<{size?: number}>`
    width: ${({size}) => size ? `${size}px` : '24px'};
    height: ${({size}) => size ? `${size}px` : '24px'};
    cursor: pointer;
`;

export const IconArrowLeft = styled(ChevronLeft)<{size?: number}>`
    width: ${({size}) => size ? `${size}px` : '24px'};
    height: ${({size}) => size ? `${size}px` : '24px'};
    cursor: pointer;
`;

export const IconArrowRight = styled(ChevronLeft)<{size?: number}>`
    width: ${({size}) => size ? `${size}px` : '32px'};
    height: ${({size}) => size ? `${size}px` : '32px'};
    cursor: pointer;
    transform: rotate(180deg);
`;

export const IconStar = styled(Star)<{size?: number}>`
    width: ${({size}) => size ? `${size}px` : '24px'};
    height: ${({size}) => size ? `${size}px` : '24px'};
    cursor: pointer;
`;

export const IconEdit = styled(Edit)<{size?: number}>`
    width: ${({size}) => size ? `${size}px` : '24px'};
    height: ${({size}) => size ? `${size}px` : '24px'};
    cursor: pointer;
`

export const IconCloseX = styled(X)<{size?: number}>`
    width: ${({size}) => size ? `${size}px` : '24px'};
    height: ${({size}) => size ? `${size}px` : '24px'};
    cursor: pointer;
`

export const IconLogo = styled(Logo)<{size?: number}>`
    width: ${({size}) => size ? `${size}px` : '24px'};
    height: ${({size}) => size ? `${size}px` : '24px'};
    cursor: pointer;
`