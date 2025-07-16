import styled from "styled-components";

export const GridWrapper =styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
`;

export const PhotoCard = styled.div<{ isFirst: boolean }>`
    grid-column: ${(props) => (props.isFirst ? "span 2" : "span 1")};
    grid-row: ${(props) => (props.isFirst ? "span 2" : "span 1")};
    height: ${(props) => (props.isFirst ? "300px" : "140px")};
    background-size: cover;
    background-position: center;
    border-radius: 8px;
    cursor: pointer;
`;