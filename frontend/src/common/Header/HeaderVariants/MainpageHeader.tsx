import { IconArrowLeft, IconBell, IconMenu } from "@/assets/icons/IconList";
import Header from "@/common/Header/Header";
import useSidebarStore from "@/store/sidebarStore";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useHasBack = (): boolean => {
    const location = useLocation();
    const [canGoBack, setCanGoBack] = useState(false);
    useEffect(() => {
        setCanGoBack(window.history.length > 1 && location.pathname !== '/');
    }, [location]);

    return canGoBack;
};


const MainpageHeader = () => {
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
    const navigate = useNavigate();
    const location = useLocation();
    const hasBack = useHasBack();
    const isDetailPage = location.pathname.startsWith('/community/') ||
                        location.pathname.startsWith('/diary/');

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/');
        }
    };
    const handleNotice = () => {
        navigate('/notice')
    };
    const handleMenu = () => {
        toggleSidebar();
    }

    return (
        <Header
            backgroundColor={isDetailPage ? 'white' : "primary"}
            borderBottom='none'
            padding='20px 16px'
            left={hasBack 
                ? <IconArrowLeft onClick={handleBack} /> 
                : null
            }
            right={<>
                <IconBell onClick={handleNotice} />
                <IconMenu onClick={handleMenu} />
            </>}

        >
        </Header>
    )
}


export default MainpageHeader;