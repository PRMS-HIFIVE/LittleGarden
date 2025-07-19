import { palette } from "@/styles/palette";
import styled from "styled-components";

export const MainWrap = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 0;

    padding-top: 10vh;
    padding-bottom: 70px;
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
    height: 88px;
    background: white;
    border-radius: 10px;
    box-shadow: 0px 2px 6px 0px rgb(0 0 0 / 20%);
    display: flex;
    flex-direction: row;
    padding: 8px 16px;
    align-items: center;
    gap: 6px;

    img{
        width: 60px;
        height: 60px;
        border-radius: 10px;
        object-fit: 'cover';
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

export const PlantName = styled.p`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 160px;
    text-align: left;
`

export const PlantInfoWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

export const DdayText = styled.span<{ isOverdue: boolean }>`
    color: ${({ isOverdue }) => isOverdue ? palette.warning : 'inherit'};
    font-weight: ${({ isOverdue }) => isOverdue ? 'bold' : 'normal'};
    margin-left: 4px;
`;