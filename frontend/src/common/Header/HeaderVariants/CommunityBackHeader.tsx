import Header, { type HeaderProps } from "@/common/Header/Header"
import { HeaderTopRow } from "@/common/Header/Header.styles";


const CommunityBackHeader = ({...rest}: HeaderProps) => {
    return (
        <>
            <HeaderTopRow>
                <Header
                    padding='80px 0px 10px 0px'
                    backgroundColor='white'
                    borderBottom='primary'
                    {...rest}
                    left={<h1>뒤로가기 아이콘</h1>}
                >
                </Header>
            </HeaderTopRow>
        </>
    )
}

export default CommunityBackHeader;