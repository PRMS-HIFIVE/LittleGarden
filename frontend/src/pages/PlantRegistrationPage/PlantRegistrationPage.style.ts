import styled from "styled-components";

export const RegistrationWrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;

    margin-left: 16px;
    margin-right: 16px;

    @media screen and (min-width: 1024px){ 
        width: 360px;
        margin: 0 auto;
        border: 1px solid black;
    }
`;

export const RegistrationHeader = styled.header`
    display: flex;
    flex-direction: row-reverse;

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
`;

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