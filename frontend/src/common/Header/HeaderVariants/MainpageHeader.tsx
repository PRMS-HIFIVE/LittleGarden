import { IconArrowLeft, IconBell, IconMenu } from "@/assets/icons/IconList";
import Header from "@/common/Header/Header";
import useSidebarStore from "@/store/sidebarStore";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// 뒤로갈 페이지가 존재할 경우만
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
    const hasBack = useHasBack();

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
            backgroundColor='primary'
            borderBottom='none'
            padding='20px 16px'
            maxWidth="393px"
            // 이전에 있었던 페이지가 존재할 경우만 뒤로가기 아이콘 렌더링되게 추가할 것
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