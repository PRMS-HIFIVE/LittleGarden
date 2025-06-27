import styled from "styled-components";
import {
  backgroundColors,
  textColors,
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

export const Title = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: ${textColors.primary};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const IconWrapper = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${textColors.green};
`;


export const RowWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const Register = styled.div`
  background-color: none;
  border: none;
  font-size: 0.7rem;
  display: flex;
  font-weight: 600;
  color: ${textColors.primary};
  cursor: pointer;
  &:hover {
    color: ${textColors.tertiary}; 
  }
`;

export const resetPassword = styled.div`
  background-color: none;
  border: none;
  font-size: 0.7rem;
  display: inline-block;
  display: flex;
  font-weight: 600;
  color: ${textColors.primary};
  cursor: pointer;
  &:hover {
    color: ${textColors.tertiary}; 
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.3rem;
`;
