import type { ReactNode } from 'react';
import type { BackgroundColors, TextColors } from "../../styles/paletteMapping";
import { HeaderCenter, HeaderContainer, HeaderSide, StyledHeader, type HeaderBorderBottomStyles } from './Header.styles';
//import { palette } from '@/styles/palette';


export interface HeaderProps {
    title?: string;
    titleColor?: TextColors;
    titleMargin?: string;
    titlePadding?: string;
    left?: ReactNode;
    center?: ReactNode;
    right?: ReactNode;
    backgroundColor?: BackgroundColors;
    width?: string;
    minWidth?: string;
    maxWidth?: string;
    height?: string;
    padding?: string;
    leftPadding?: string;
    rightPadding?: string;
    margin?: string;
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
    width,
    minWidth,
    maxWidth,
    height,
    padding,
    leftPadding,
    rightPadding,
    margin,
    borderBottom,
}: HeaderProps) => {

    return (
        <HeaderContainer /*style={{borderBottom: `1px solid ${palette.gray}`}}*/>
            <StyledHeader
                backgroundColor={backgroundColor}
                width={width}
                minWidth={minWidth}
                maxWidth={maxWidth}
                height={height}
                titleColor={titleColor}
                titleMargin={titleMargin}
                titlePadding={titlePadding}
                padding={padding}
                margin={margin}
                borderBottom={borderBottom}

            >
                <HeaderSide position='left' padding={leftPadding}>{left}</HeaderSide>
                <HeaderCenter>{center ?? (title && <h1>{title}</h1>)}</HeaderCenter>
                <HeaderSide position='right' padding={rightPadding}>{right}</HeaderSide>
            </StyledHeader>
        </HeaderContainer>
    )
}

export default Header;