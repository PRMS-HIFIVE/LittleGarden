import type { ReactNode } from 'react';
import type { BackgroundColors } from "../../styles/paletteMapping";
import { HeaderCenter, HeaderContainer, HeaderSide, StyledHeader, type HeaderBorderBottomStyles } from './Header.styles';
//import { palette } from '@/styles/palette';


export interface HeaderProps {
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
    left,
    center,
    right,
    backgroundColor,
    width,
    minWidth,
    maxWidth = '100%',
    height,
    padding,
    leftPadding,
    rightPadding,
    margin = '0 auto',
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
                padding={padding}
                margin={margin}
                borderBottom={borderBottom}

            >
                <HeaderSide position='left' padding={leftPadding}>{left}</HeaderSide>
                <HeaderCenter>{center}</HeaderCenter>
                <HeaderSide position='right' padding={rightPadding}>{right}</HeaderSide>
            </StyledHeader>
        </HeaderContainer>
    )
}

export default Header;