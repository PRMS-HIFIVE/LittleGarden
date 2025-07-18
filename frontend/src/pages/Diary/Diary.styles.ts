import styled from "styled-components";
import { backgroundColors } from "@/styles/paletteMapping";
import { CardListContainer } from "@/common/Card/CardList/CardList.styles";

/*
export const Container = styled.div`
  display: block;
  min-height: 100vh;
  max-width: 393px;
  margin: 0 auto;
  background-color: ${backgroundColors.primary};
`;
*/
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 393px;
  margin: 0 auto;
  background-color: ${backgroundColors.primary};
`;

/*
export const Title = styled.p`
  position: fixed;
  top: 4rem;
  width: 393px;
  margin: 1.5rem;
  font-weight: 600;
`;
*/
export const Title = styled.span`
  margin: 100px 1.5rem 0;
  font-weight: 600;
  font-size: 1.25rem;
`;
/*
export const ButtonWrapper = styled.div`
  position: fixed;
  top: 9rem;
  width: 393px;
  padding: 0 0.8rem 0 0.8rem;
  margin: 0px 0px 0px 0px;
  display: flex;
  justify-content: center;
  gap: 0.5rem
`
*/
export const ButtonWrapper = styled.div`
  padding: 0.5rem;
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.5rem;
`;
export const ScrollableCardList = styled(CardListContainer)`
  height: 100%;
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    display: none; 
  }
`;
export const ContentWrapper = styled.div`
  position: relative;
  top: 120px;
  height: 100%;
`;

export const textContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const noDataText = styled.strong`
  font-size: 1.5rem;
`;