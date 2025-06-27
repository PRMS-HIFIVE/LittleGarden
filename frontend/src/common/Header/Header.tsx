import type { ReactNode } from 'react';
import type { BackgroundColors, TextColors } from "../../styles/paletteMapping";
import { HeaderCenter, HeaderContainer, HeaderSide, StyledHeader, type HeaderBorderBottomStyles } from './Header.styles';


export interface HeaderProps {
    title?: string;
    titleColor?: TextColors;
    titleMargin?: string;
    titlePadding?: string;
    left?: ReactNode;
    center?: ReactNode;
    right?: ReactNode;
    backgroundColor?: BackgroundColors;
    height?: string;
    padding?: string;
    borderBottom?: HeaderBorderBottomStyles;
}

const Header = ({
    title,
    titleColor,
    titleMargin,
    titlePadding,
    left,
    center,
    right,
    backgroundColor,
    height,
    padding,
    borderBottom,
}: HeaderProps) => {

    return (
        <HeaderContainer>
            <StyledHeader
                backgroundColor={backgroundColor}
                height={height}
                titleColor={titleColor}
                titleMargin={titleMargin}
                titlePadding={titlePadding}
                padding={padding}
                borderBottom={borderBottom}

            >
                <HeaderSide>{left}</HeaderSide>
                <HeaderCenter>{center ?? (title && <h1>{title}</h1>)}</HeaderCenter>
                <HeaderSide>{right}</HeaderSide>
            </StyledHeader>
        </HeaderContainer>
    )
}

export default Header;