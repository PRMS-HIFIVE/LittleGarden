import { IconArrowLeft, IconBell, IconMenu } from "@/assets/icons/IconList";
import Header from "@/common/Header/Header";
import useSidebarStore from "@/store/sidebarStore";


const MainpageHeader = () => {
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);

    const handleBack = () => {

    };
    const handleNotice = () => {

    };
    const handleMenu = () => {
        toggleSidebar();
    }
    return (
        <Header
            backgroundColor='primary'
            borderBottom='none'
            padding='72px 25px 20px 25px'
            left={<IconArrowLeft onClick={handleBack} />}
            right={<>
                <IconBell onClick={handleNotice} />
                <IconMenu onClick={handleMenu} />
            </>}

        >
        </Header>
    )
}

export default MainpageHeader;