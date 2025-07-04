import { useState } from "react";
import * as S from "./Login.styles";
import Input from "@/components/UI/Input/Input";
import LoginButton from "@/components/UI/Button/ButtonVariants/LoginButton";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LOGO from "@/assets/images/logo.svg";

const Login = () => {
  const navigate = useNavigate();

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const handleJoin = () => {
    navigate("/join");
  };
  const handleResetPassword = () => {};

  const handleLogin = async () => {
    // 로그인 로직
    if (loginId && password) {
      alert("로그인 성공!");
      navigate("/"); 
    } else {
      alert("아이디와 비밀번호를 입력해주세요.");
    }
  };

  return (
    <S.Container>
      <S.FormWrapper>
        <S.Logo src={LOGO} alt="Little Garden" />

        <S.Form>
          <S.InputWrapper>
            <S.IconWrapper>
              <FaUser />
            </S.IconWrapper>
            <Input
              placeholder="아이디"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              width="100%"
              height="48px"
              padding="4px 32px"
              radius="8px"
              textColor="primary"
            />
          </S.InputWrapper>

          <S.InputWrapper>
            <S.IconWrapper>
              <FaLock />
            </S.IconWrapper>
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              width="100%"
              height="48px"
              padding="4px 32px"
              radius="8px"
              textColor="primary"
            />
          </S.InputWrapper>

          <S.RowWrapper>
            <S.Join onClick={handleJoin}>회원가입</S.Join>
            
            <S.resetPassword onClick={handleResetPassword}>
              비밀번호 찾기
            </S.resetPassword>
          </S.RowWrapper>

          <S.ButtonWrapper>
            <LoginButton onClick={handleLogin}/>
          </S.ButtonWrapper>
        </S.Form>
      </S.FormWrapper>
    </S.Container>
  );
};

export default Login;
