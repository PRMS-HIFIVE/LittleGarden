import styled from "styled-components";
import { backgroundColors } from "@/styles/paletteMapping";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 393px;
  margin: 0 auto;
  background-color: ${backgroundColors.primary};
`;

export const Title = styled.span`
  margin: 100px 1.5rem 0;
  font-weight: 600;
  font-size: 1.25rem;
`;

export const ButtonWrapper = styled.div`
  padding: 0.5rem;
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.5rem;
`;
