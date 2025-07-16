import styled from "styled-components";
import { backgroundColors } from "@/styles/paletteMapping";

export const Container = styled.div`
  display: block;
  min-height: 100vh;
  max-width: 393px;
  margin: 0 auto;
  background-color: ${backgroundColors.primary};
`;

export const Title = styled.p`
  position: fixed;
  top: 4rem;
  width: 393px;
  margin: 1.5rem;
  font-weight: 600;
`;
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