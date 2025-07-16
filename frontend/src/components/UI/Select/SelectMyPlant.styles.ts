import Button from "@/components/UI/Button/Button";
import { palette } from "@/styles/palette";
import styled from "styled-components";

export const SelectWrapper = styled.div`
    max-width: 393px;
    margin: 0 0 30px 0;
`;

export const Select = styled.select`
    width: 16rem;
    max-width: 361px;
    display: flex;
    padding: 8px;
    border-radius: 8px;
    border: 1px solid ${palette.gray}
    appearance: none;
`;

export const SelectRow = styled.div`
    display: flex;
    gap: 8px;
`;

export const AddTagButton = styled(Button)`
    color: blue;
`;

export const TagList = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 12px;
    gap: 8px;
`;

export const AddedTag = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${palette.white};
    color: ${palette.gray};
    border: 1px solid ${palette.lightGray};
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 600;
`;

export const TagRemoveButton = styled.button`
    margin-left: 8px;
    background-color: transparent;
    border: none;
    cursor: pointer;
`;