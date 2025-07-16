import { IconArrowLeft, IconBell, IconMenu } from "@/assets/icons/IconList";
import Header, { type HeaderProps } from "@/common/Header/Header"
import { HeaderTopRow } from "@/common/Header/Header.styles";
import useSidebarStore from "@/store/sidebarStore";
import { useNavigate } from "react-router-dom";


const DiaryHeader = ({...rest}: HeaderProps) => {
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/diary', {replace: true});
    };
    const handleBell = () => {

    };
    const handleMenu = () => {
        toggleSidebar();
    }

    return (
        <>
            <HeaderTopRow>
                    <Header
                        padding='20px 1rem'
                        backgroundColor='white'
                        //borderBottom='primary'
                        //minWidth='360px'
                        maxWidth='393px'
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