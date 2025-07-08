import { useState } from "react";
import * as S from "./Password.style";
import Input from "@/components/UI/Input/Input";
import LOGO from "@/assets/images/logo.svg";
import Button from "@/components/UI/Button/Button";
import { useAuth } from "@/hooks/useAuth";

const Password = () => {
  const [loginId, setLoginId] = useState("");
  const { handleRequestResetPassword } = useAuth();

  const handleTemporaryPassword = async () => {
    if (!loginId.trim()) {
      alert("이메일을 입력해주세요.");
      return;
    }
    await handleRequestResetPassword(loginId);
  };

  return (
    <S.Container>
      <S.FormWrapper>
        <S.Logo src={LOGO} alt="Little Garden" />

        <S.Form>
          <Input
            placeholder="아이디(이메일 주소)"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            width="100%"
            height="48px"
            padding="4px 16px"
            radius="8px"
            textColor="primary"
          />

          <S.ButtonWrapper>
            <Button
              variant="default"
              buttonSize="small"
              color="tertiary"
              width="100%"
              radius="round"
              onClick={handleTemporaryPassword}
            >
              이메일로 임시 비밀번호 발급
            </Button>
          </S.ButtonWrapper>
        </S.Form>
      </S.FormWrapper>
    </S.Container>
  );
};

export default Password;
