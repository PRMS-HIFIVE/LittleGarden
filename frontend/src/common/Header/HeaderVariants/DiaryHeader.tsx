import { IconArrowLeft, IconBell, IconMenu } from "@/assets/icons/IconList";
import Header, { type HeaderProps } from "@/common/Header/Header"
import { HeaderTopRow } from "@/common/Header/Header.styles";


const DiaryHeader = ({...rest}: HeaderProps) => {

    const handleBack = () => {

    };
    const handleBell = () => {

    };
    const handleMenu = () => {

    }

    return (
        <>
            <HeaderTopRow>
                    <Header
                        padding='80px 16px 10px 16px'
                        backgroundColor='white'
                        borderBottom='primary'
                        minWidth='393px'
                        maxWidth='600px'
                        margin='0 auto'
                        {...rest}
                        left={<IconArrowLeft onClick={handleBack} />}
                        right={<>
                            <IconBell onClick={handleBell}/>
                            <IconMenu onClick={handleMenu}/>
                        </>}
                    >
                    </Header>
            </HeaderTopRow>
        </>
    )
}

export default DiaryHeader;