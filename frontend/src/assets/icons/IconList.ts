import styled from "styled-components";
import Bell from "@/assets/icons/Bell.svg?react";
import Menu from "@/assets/icons/Menu.svg?react";
import ChevronLeft from "@/assets/icons/ChevronLeft.svg?react";
import Star from "@/assets/icons/Star.svg?react";

export const IconBell = styled(Bell)`
    width: 24px;
    height:24px;
    cursor: pointer;
`;

export const IconMenu = styled(Menu)`
    width: 24px;
    height: 24px;
    cursor: pointer;
`;

export const IconArrowLeft = styled(ChevronLeft)`
    width: 32px;
    height: 32px;
    cursor: pointer;
`;

export const IconArrowRight = styled(ChevronLeft)`
    width: 32px;
    height: 32px;
    cursor: pointer;
    transform: rotate(180deg);
`;

export const IconStar = styled(Star)`
    width: 24px;
    height: 24px;
    cursor: pointer;
`;