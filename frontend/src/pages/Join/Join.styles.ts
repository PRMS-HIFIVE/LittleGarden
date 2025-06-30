import styled from "styled-components";
import {
  backgroundColors,
} from "@/styles/paletteMapping";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  max-width: 393px;
  margin: 0 auto;
  background-color: ${backgroundColors.green};
`;

export const FormWrapper = styled.div`
  width: 100%;
  max-width: 320px;
  padding: 2rem;
  border-radius: 12px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin-top: 10px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
`;

export const EmailRow = styled.div`
  display: block;
`;

export const Logo = styled.img`
  display: block;
  width: 200px;
  height: 200px;
  margin: 0 auto;
`;
