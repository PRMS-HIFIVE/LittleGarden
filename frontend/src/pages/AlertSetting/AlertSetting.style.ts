import styled from "styled-components";

export const AlertSettingWrapper = styled.div`
    height: 100vh;
    padding-top: 10vh;
    margin-left: 16px;
    margin-right: 16px;
`;

export const AlertTitleArea = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const AlertTitle = styled.h1`
    font-size: 1.5rem;
`
export const AlertSettingArea = styled.div`
    width: 100%;
    display: flex;
    padding-top: 36px;
    flex-direction: column;
    
`

export const AlertSettingBox = styled.div`
    height: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #95A5A6;
    padding: 0 8px;

    label {
        width: 100%;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        justify-content: space-between;
    }

    [type="checkbox"] {
        appearance: none;
        position: relative;
        border: max(2px, 0.1em) solid gray;
        border-radius: 1.25em;
        width: 3.3em;
        height: 1.8em;
    }

    [type="checkbox"]::before {
        content: "";
        position: absolute;
        left: 0;
        width: 1.5em;
        height: 1.5em;
        border-radius: 50%;
        transform: scale(0.8);
        background-color: gray;
        transition: left 250ms linear;
    }

    [type="checkbox"]:checked::before {
        background-color: white;
        left: 1.5em;
    }

    [type="checkbox"]:checked {
        background-color: #2ECC71;
        border-color: #2ECC71;
    }
`