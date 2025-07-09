import { useEffect, useState } from "react";
import * as S from "./Join.styles";
import Input from "@/components/UI/Input/Input";
import SignUpButton from "@/components/UI/Button/ButtonVariants/SignUp";
import Button from "@/components/UI/Button/Button";
import LOGO from "@/assets/images/logo.svg";
import { FaCheckCircle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";
import { useSearchParams } from "react-router-dom";
import { requestEmailCertification } from "@/apis/auth.api";

const Join = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [searchParams] = useSearchParams();

  const handleConfirmToggle = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const { handleSignup } = useAuth();

  // 로컬스토리지에서 이메일 불러오기
  useEffect(() => {
    const storedEmail = localStorage.getItem("signupEmail");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  // 이메일 변경될 때마다 저장
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    localStorage.setItem("signupEmail", newEmail);
  };

  const onSubmit = () => {
    if (!email || !nickname || !password || !confirmPassword) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    handleSignup({ email, pwd: password, nickName: nickname });
  };

  const handleEmailVerify = async () => {
    if (!email.trim()) {
      alert("이메일을 입력해주세요.");
      return;
    }

    try {
      const res = await requestEmailCertification(email);
      alert("이메일 인증 요청이 전송되었습니다. 이메일을 확인해주세요.");
      console.log("서버 응답:", res);
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("예상치 못한 오류가 발생했습니다.");
      }
    }
  };

    const emailVerified = (() => {
    const encodedData = searchParams.get("data");
    if (!encodedData) {
      console.log("인증 실패: 쿼리 파라미터 'data' 없음");
      return false;
    }

    try {
      const decoded = atob(encodedData); 
      console.log("디코딩된 쿼리:", decoded); 

      const parsed = new URLSearchParams(decoded);
      const emailYn = parsed.get("emailYn");
      const result = emailYn === "Y";

      console.log("emailYn:", emailYn, "| 인증 여부:", result);
      return result;
    } catch (e) {
      console.error("쿼리 파싱 실패:", e);
      return false;
    }
  })();


  return (
    <S.Container>
      <S.FormWrapper>
        <S.Logo src={LOGO} alt="Little Garden" />

        <S.Form>
          <S.EmailRow>
            <S.InputWrapper>
              <Input
                placeholder="아이디(이메일 주소)"
                value={email}
                onChange={handleEmailChange}
                width="100%"
                height="48px"
                padding="4px 16px"
                radius="8px"
                textColor="primary"
              />
              {emailVerified && (
                <S.IconWrapper>
                  <FaCheckCircle color="green" size={20} />
                </S.IconWrapper>
              )}
            </S.InputWrapper>

            <S.ButtonWrapper>
              <Button
                variant="default"
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

          <S.PasswordWrapper>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              width="100%"
              height="48px"
              padding="4px 16px"
              radius="8px"
              textColor="primary"
            />

            <S.IconWrapper>
              {showConfirmPassword ? (
                <FaRegEyeSlash onClick={handleConfirmToggle} />
              ) : (
                <FaRegEye onClick={handleConfirmToggle} />
              )}
            </S.IconWrapper>
          </S.PasswordWrapper>

          {confirmPassword && password !== confirmPassword && (
            <S.ErrorText>비밀번호가 일치하지 않습니다.</S.ErrorText>
          )}

          <S.ButtonWrapper>
            <SignUpButton onClick={onSubmit} disabled={!emailVerified} />
          </S.ButtonWrapper>
        </S.Form>
      </S.FormWrapper>
    </S.Container>
  );
};

export default Join;
