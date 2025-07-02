import { useState } from "react";
import * as S from "./Password.style";
import Input from "@/components/UI/Input/Input";
import { useNavigate } from "react-router-dom";
import LOGO from "@/assets/images/logo.svg";
import Button from "@/components/UI/Button/Button";

const Password = () => {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState("");

  const handleTemporaryPassword = async () => {
    if (!loginId.trim()) {
      alert("이메일을 입력해주세요.");
      return;
    }

    // try {
    //   const response = await fetch("/api/auth/temporary-password", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ email: loginId }),
    //   });

    //   if (!response.ok) {
    //     throw new Error("임시 비밀번호 발급 실패");
    //   }

    alert("입력하신 이메일로 임시 비밀번호를 보냈습니다.");
    navigate("/login");
    // } catch (error) {
    //   alert("임시 비밀번호 발급에 실패했습니다. 다시 시도해주세요.");
    // }
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
