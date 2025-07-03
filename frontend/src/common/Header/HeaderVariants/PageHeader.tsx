import Header, { type HeaderProps } from "@/common/Header/Header"
import { HeaderBottomRow, HeaderTopRow } from "@/common/Header/Header.styles";


const PageHeader = ({title, ...rest}: HeaderProps) => {
    return (
        <>
            <HeaderTopRow>
                <Header
                    padding='80px 0px 0px 0px'
                >
                </Header>
            </HeaderTopRow>
            <HeaderBottomRow>
                <Header
                    padding='8px 0px 36px 0px'
                    {...rest}
                    left={<h1>{title}</h1>}
                >
                </Header>

            </HeaderBottomRow>
        </>
    )
}

export default PageHeader;