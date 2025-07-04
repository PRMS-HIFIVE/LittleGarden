import { useState } from "react";
import * as S from "./Login.styles";
import Input from "@/components/UI/Input/Input";
import LoginButton from "@/components/UI/Button/ButtonVariants/LoginButton";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LOGO from "@/assets/images/logo.svg";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin } = useAuth();

  const handleJoin = () => {
    navigate("/join");
  };

  const handleFindPassword = () => {
    navigate("/password");
  };

  const onSubmit = async () => {
    if (!email || !password) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    try {
      await handleLogin({ email, pwd: password });
    } catch (err) {
      console.error(err);
      alert("로그인 중 오류가 발생했습니다.");
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

            <S.resetPassword onClick={handleFindPassword}>
              비밀번호 찾기
            </S.resetPassword>
          </S.RowWrapper>

          <S.ButtonWrapper>
            <LoginButton onClick={onSubmit} />
          </S.ButtonWrapper>
        </S.Form>
      </S.FormWrapper>
    </S.Container>
  );
};

export default Login;
