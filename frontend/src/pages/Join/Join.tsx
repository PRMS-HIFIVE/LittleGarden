import { useState } from "react";
import * as S from "./Join.styles";
import Input from "@/components/UI/Input/Input";
import SignUpButton from "@/components/UI/Button/ButtonVaraints/SignUp";
import Button from "@/components/UI/Button/Button";
import { useNavigate } from "react-router-dom";

const Join = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    // if (password !== confirmPassword) {
    //   alert("비밀번호가 일치하지 않습니다.");
    //   return;
    // }
    // try {
    //   const response = await fetch("/api/join", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ email, nickname, password }),
    //   });

    //   if (!response.ok) throw new Error("회원가입 실패");

    if(email && nickname && password && confirmPassword) {
      alert("회원가입이 완료되었습니다!");
      navigate("/login"); 
    }else{
        alert("모든 필드를 입력해주세요.");
    }
    // } catch (error) {
    //   alert("회원가입에 실패했습니다.");
    // }
  };

  const handleEmailVerify = () => {
    // 이메일 인증 로직
    console.log("이메일 인증 요청:", email);
  };

  return (
    <S.Container>
      <S.FormWrapper>
        <S.Title>Little Garden</S.Title>
        <S.Form>
          <S.EmailRow>
            <Input
              placeholder="아이디(이메일 주소)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                onClick={handleEmailVerify}
              >
                인증하기
              </Button>
            </S.ButtonWrapper>
          </S.EmailRow>

          <Input
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
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

          <Input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            width="100%"
            height="48px"
            padding="4px 16px"
            radius="8px"
            textColor="primary"
          />

          <S.ButtonWrapper>
            <SignUpButton onClick={handleSignUp} />
          </S.ButtonWrapper>
        </S.Form>
      </S.FormWrapper>
    </S.Container>
  );
};

export default Join;
