import styled from "styled-components";

export const RegistrationWrapper = styled.div`
    width: 360px;
    margin: 0 auto;
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

export const RegistrationHeader = styled.header`
    display: flex;
    flex-direction: row-reverse;
    padding-top: 12px;

    svg{
        width: 24px;
        height: 24px;
    }
`

export const FormContainer = styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-top: 20px;

    button{
        margin-bottom: 20px;
    }
`;

export const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 0;
    gap: 2rem;
`

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const Label = styled.label`
    font-size: 16px;
    font-weight: bold;
    color: #333;
`;

export const Input = styled.input`
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    &:focus {
        outline: none;
        border-color: #4CAF50;
        box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
    }
`;

export const ImageThumbnail = styled.img`
    width: 300px;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 20px;
    align-self: center;
`;

export const AddPlantButton = styled.button`
    width: 100%;
    padding: 15px;
    background-color: #A9DFBF;
    color: #2C3E50;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-bottom: 4vh;
    
    &:hover, &:active {
        background-color: #27AE60;
    }
`;

export const InfoBox = styled.div`
    background-color: #f0f7ff;
    border: 1px solid #b3d4ff;
    border-radius: 8px;
    padding: 16px;
    margin: 16px 0;
    font-size: 14px;
    color: #333;

    h4 {
        margin-top: 0;
        margin-bottom: 12px;
        color: #0056b3;
    }

    p {
        margin: 4px 0;
    }
`;

export const SearchResultsBox = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #ddd;
    border-top: none;
    max-height: 200px;
    overflow-y: auto;
    z-index: 100;
`;

export const SearchResultItem = styled.li`
    padding: 10px;
    cursor: pointer;
    &:hover {
        background-color: #f5f5f5;
    }
`;