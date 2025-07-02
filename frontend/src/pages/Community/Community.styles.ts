import styled from "styled-components";
import {
  backgroundColors,
} from "@/styles/paletteMapping";

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  max-width: 393px;
  margin: 0 auto;
  background-color: ${backgroundColors.primary};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;


