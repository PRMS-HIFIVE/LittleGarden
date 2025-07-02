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
  margin: 1.5rem;
  font-weight: 600;
`;

export const ButtonWrapper = styled.div`
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;
