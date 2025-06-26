import { useState } from "react";
import * as S from "./Login.styles";
import Input from "@/components/UI/Input/Input";
import LoginButton from "@/components/UI/Button/ButtonVaraints/LoginButton";

const Login = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <S.Container>
      <S.FormWrapper>
        <S.Title>LOGO</S.Title>
        <S.Form>
          <Input
            placeholder="아이디"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            width="100%"
            height="48px"
            padding="4px 16px"
            radius="8px"
            textColor="primary"
          />
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            width="100%"
            height="48px"
            padding="4px 16px"
            radius="8px"
            textColor="primary"
          />

          <S.Button>
            회원가입
          </S.Button>

          <S.ButtonWrapper>
            <LoginButton />
          </S.ButtonWrapper>

        </S.Form>
      </S.FormWrapper>
    </S.Container>
  );
};

export default Login;
