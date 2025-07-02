import { StyledSidebar, SidebarDivider, SidebarLogoutButton } from "@/common/Sidebar/Sidebar.styles";
import { SidebarMenuItem, type SidebarWidth } from "@/common/Sidebar/Sidebar.styles";
import { SidebarProfile, SidebarProfileImage, SidebarProfileName } from "@/common/Sidebar/SidebarProfile";
import type { BackgroundColors, SidebarBorderColors, TextColors } from "@/styles/paletteMapping";
import type { ReactNode } from "react";


interface MenuItemsType {
    id: string;
    text: string;
    icon?: ReactNode;
    path?: string;
    onClick?: () => void;
}

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
    menuItems?: MenuItemsType[];
    width?: SidebarWidth;
    padding?: string;
    backgroundColor?: BackgroundColors;
    textColor?: TextColors;
    borderColor?: SidebarBorderColors;
}

const menuItemList: MenuItemsType[] = [
    {id: 'home', text: '홈', onClick: () => {}},
    {id: 'diary', text: '성장일기', onClick: () => {}},
    {id: 'community', text: '커뮤니티', onClick: () => {}},
]


const Sidebar = ({
    isOpen = false,
    onClose = () => {},
    menuItems = menuItemList,
    width = '60%',
    backgroundColor = 'white',
    textColor = 'primary',
    //borderColor = 'primary',
    padding = "0px",
}: SidebarProps) => {
    const handleLogout = () => {

    };

    return (
        <>
            {isOpen && (
                <div
                    onClick={onClose}
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
                isOpen={isOpen}
                width={width}
                backgroundColor={backgroundColor}
                textColor={textColor}
                padding={padding}
            >
                <button
                    onClick={onClose}
                    aria-label="닫기"
                    style={{
                    background: "none",
                    border: "none",
                    color: "inherit",
                    cursor: "pointer",
                    fontSize: "1rem",
                    alignSelf: "flex-end",
                    }}
                >
                    &times;
                </button>

                <SidebarProfile>
                    <SidebarProfileImage src="" />
                    <SidebarProfileName>아이디</SidebarProfileName>
                </SidebarProfile>

                <SidebarDivider />


                {menuItems.map((item, index) => (
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
        </>
    );
};

export default Sidebar;