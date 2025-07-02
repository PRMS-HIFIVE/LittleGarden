import Header, { type HeaderProps } from "@/common/Header/Header"
import { HeaderTopRow } from "@/common/Header/Header.styles";


const CommunityBackHeader = ({...rest}: HeaderProps) => {
    return (
        <>
            <HeaderTopRow>
                <Header
                    padding='8px 0px 0px 0px'
                    backgroundColor='white'
                    borderBottom='none'
                    {...rest}
                    left={<h1>아이콘위치</h1>}
                >
                </Header>
            </HeaderTopRow>
        </>
    )
}

export default CommunityBackHeader;