import { StyledSidebar, SidebarLogoutButton } from "@/common/Sidebar/Sidebar.styles";
import { SidebarMenuItem, type SidebarWidth } from "@/common/Sidebar/Sidebar.styles";
import { SidebarProfile, SidebarProfileImage, SidebarProfileName } from "@/common/Sidebar/SidebarProfile";
import type { BackgroundColors, SidebarBorderColors, TextColors } from "@/styles/paletteMapping";
import { useEffect, useState, type ReactNode } from "react";
import useSidebarStore from "@/store/sidebarStore";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { IconEdit } from "@/assets/icons/IconList";
import { logout as logoutAPI, updateNickname } from "@/apis/auth.api";
import defaultUser from "@/assets/images/DefaultUsers.png";
import Modal from "../Modal/Modal";
import Input from "@/components/UI/Input/Input";


interface MenuItemsType {
    id: string;
    text: string;
    icon?: ReactNode;
    path?: string;
    onClick?: () => void;
}

interface SidebarProps {
    //isOpen?: boolean;
    //onClose?: () => void;
    menuItems?: MenuItemsType[];
    width?: SidebarWidth;
    padding?: string;
    backgroundColor?: BackgroundColors;
    textColor?: TextColors;
    borderColor?: SidebarBorderColors;
}

const menuItemList: MenuItemsType[] = [
    {id: 'home', text: '홈', path: '/'},
    {id: 'diary', text: '성장일기', path: '/diary'},
    {id: 'community', text: '커뮤니티', path: '/community'},
    {id: 'alert', text: '알림 설정', path: '/alert'},
]

const Sidebar = ({
    //isOpen = false,
    //onClose = () => {},
    menuItems = menuItemList,
    width = '60%',
    backgroundColor = 'white',
    textColor = 'primary',
    //borderColor = 'primary',
    padding = "0px",
}: SidebarProps) => {
    // 사이드바 상태관리
    const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
    const [hasMounted, sethasMounted] = useState(false);

    const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false);
    const [newNickname, setNewNickname] = useState('');

    useEffect(() => {
        sethasMounted(true);
    }, []);

    const isOpen = useSidebarStore((state) => state.isSidebarOpen);
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
    const { resetAuth, user, setUser } = useAuthStore();
    const navigate = useNavigate();

    const nickname = user?.nickname || "";
    
    //로그아웃
    const handleLogout = async () => {
        try {
            await logoutAPI();
        } catch (error) {
            console.error('로그아웃 API 호출 실패 : ', error);
            alert('로그아웃 중 문제가 발생했습니다.');
        } finally {
            resetAuth();
            localStorage.removeItem('user');
            toggleSidebar();
            navigate('/login', { replace: true });
        }
    }

    const handleOpenNicknameModal = () => {
        setNewNickname(user?.nickname || '');
        setIsNicknameModalOpen(true);
    }

    const handleUpdateNickname = async () => {
        if(!newNickname.trim()){
            alert('변경할 닉네임을 입력해주세요.');
            return;
        }
        try{
            if (!user || !user.email) {
                alert('사용자 정보가 올바르지 않습니다. 다시 로그인해주세요.');
                return;
            }
            await updateNickname( newNickname.trim());
            if (user) setUser({ ...user, nickname: newNickname.trim() });

            alert('닉네임이 성공적으로 변경되었습니다.');
            setIsNicknameModalOpen(false);
        }catch(error){
            const message = error instanceof Error ? error.message : '닉네임 변경 중 오류가 발생했습니다.';
            alert(message);
        }
    }

    // 메뉴 아이템 클릭관련
    const menuItemsClickHandler = menuItems.map(item => ({
        ...item,
        onClick: () => {
            if (item.path) {
                navigate(item.path);
                toggleSidebar();
            } else if (item.onClick) {
                item.onClick();
                toggleSidebar();
            }
        }
    }))

    return (
        <>
            {isOpen && (
                <div
                    onClick={toggleSidebar}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        zIndex: 99
                    }}
                ></div>
            )}
        
            <StyledSidebar
                isOpen={hasMounted && isSidebarOpen}
                width={width}
                backgroundColor={backgroundColor}
                textColor={textColor}
                padding={padding}
            >
                <SidebarProfile>
                    <SidebarProfileImage src={defaultUser} />
                    <SidebarProfileName>{nickname} 님</SidebarProfileName>
                    <IconEdit onClick={handleOpenNicknameModal} />
                </SidebarProfile>
                {menuItemsClickHandler.map((item, index) => (
                    <SidebarMenuItem
                        key={item.id}
                        hasIcon={!!item.icon}
                        onClick={item.onClick}
                        isFirst={index === 0}
                    >
                        {item.icon && <span>{item.icon}</span>}
                        {item.text}
                    </SidebarMenuItem>

                ))}
                
                <SidebarLogoutButton
                    onClick={handleLogout}
                    style={{marginTop: 'auto'}}
                >
                    로그아웃
                </SidebarLogoutButton>

            </StyledSidebar>
            <Modal
                isOpen={isNicknameModalOpen}
                onClose={() => setIsNicknameModalOpen(false)}
                onConfirm={handleUpdateNickname}
                title="닉네임 변경"
            >
                <Input
                    value={newNickname}
                    onChange={(e) => setNewNickname(e.target.value)}
                    placeholder="새 닉네임을 입력하세요"
                />
            </Modal>
        </>
    );
};


export default Sidebar;