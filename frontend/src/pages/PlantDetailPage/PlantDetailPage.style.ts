import styled from "styled-components";

export const DetailWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    margin-right: 16px;
    padding-top: 10vh;
    align-items: center;

    @media screen and (min-width: 1024px){ 
        width: 360px;
        margin: 0 auto;
        border: 1px solid black;
    }

    header{
        width: 100%;
    }
`

export const DetailHeader = styled.h1`
    width: 100%;
    font-size: 1.5rem;
`

export const DetailBody = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 12px;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
`

export const WeatherInfo = styled.div`
    width: 100%;
    background: white;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const DetailImageContainer = styled.div`
    img{
        width: 100%;
        border-radius: 10px;
    }
`

export const InfoWrapper = styled.div`
    width: 100vw;
    flex: 1;
    background: #A9DFBF;
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
`