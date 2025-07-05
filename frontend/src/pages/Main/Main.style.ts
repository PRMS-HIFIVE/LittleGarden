import styled from "styled-components";

export const MainWrap = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 0;
`

export const MainTitle = styled.h1`
    font-size: 1.5rem;
`
export const MainBody = styled.main`
    text-align: center;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
`
export const ResetText = styled.strong`
    font-size: 1.5rem;
`

export const PlantsListWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`

export const PlantsList = styled.div`
    background: white;
    border-radius: 10px;
    box-shadow: 0px 2px 6px 0px rgb(0 0 0 / 20%);
    display: flex;
    flex-direction: row;
    padding: 8px 20px;
    align-items: center;
    gap: 6px;

    img{
        width: 80px;
        height: 80px;
        border-radius: 10px;
    }
`

export const PlantWrapper = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const PlantNameArea = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 6px;
`

export const PlantInfoWrapper = styled.div`
    display: flex;
    align-items: center;
`