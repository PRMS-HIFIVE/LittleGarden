import styled from "styled-components"

export const SidebarProfile = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    padding-top: 10vh;
    gap: 20px;
    border-bottom: 1px solid #ECF0F1;
`;

export const SidebarProfileImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
`;

export const SidebarProfileName = styled.span`
    font-size: 1.5rem;
    font-weight: bold;
    color: inherit;
    
`;