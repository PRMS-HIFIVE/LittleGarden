import { palette } from "@/styles/palette";
import styled from "styled-components";

export const ImageUploadContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 12px;
`

export const ImageUploadLabel = styled.label`
    width: 120px;
    height: 120px;
    border: 1px solid ${palette.gray};
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    
    &:hover {
        background-color: ${palette.lightGray};
    }
`;

export const ImageFileInput = styled.input`
    display: none;
`;

export const PreviewImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 8px;
    object-fit: cover;
`;