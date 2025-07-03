import { useState } from "react";
import { signup } from "@/apis/auth.api";
import type { SignUpRequest } from "@/apis/auth.api";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (formData: SignUpRequest) => {
    setLoading(true);
    setError(null);
    try {
      await signup(formData);
      alert("회원가입이 완료되었습니다.");
      navigate("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("예상치 못한 에러", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSignup,
    loading,
    error,
  };
}
