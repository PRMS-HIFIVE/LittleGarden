import { IconArrowLeft, IconBell, IconMenu } from "@/assets/icons/IconList";
import Header, { type HeaderProps } from "@/common/Header/Header"
import { HeaderTopRow } from "@/common/Header/Header.styles";
import Sidebar from "@/common/Sidebar/Sidebar";
import { useState } from "react";


const DiaryHeader = ({...rest}: HeaderProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleBack = () => {

    };
    const handleBell = () => {

    };
    const handleMenu = () => {
        setIsSidebarOpen(true);
    }
    const handleMenuClose = () => {
        setIsSidebarOpen(false);
    }

    return (
        <>
            <HeaderTopRow>
                    <Header
                        padding='80px 16px 10px 16px'
                        backgroundColor='white'
                        //borderBottom='primary'
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
                    <Sidebar isOpen={isSidebarOpen} onClose={handleMenuClose} />
            </HeaderTopRow>
        </>
    )
}

export default DiaryHeader;