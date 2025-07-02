import styled from 'styled-components';

export const UploadPreviewWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
`;

export const ImageContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 0;
    padding: 16px;
`;

export const ImagePreview = styled.img`
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 8px;
`;

export const ButtonWrapper = styled.div`
    padding: 0 16px 20px;
    display: flex;
    justify-content: center;
`;

export const RegisterButton = styled.button`
    width: 158px;
    padding: 15px;
    background-color: #A9DFBF;
    color: #2C3E50;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #27AE60;
    }
    &:active {
        background-color: #27AE60;
    }
`;