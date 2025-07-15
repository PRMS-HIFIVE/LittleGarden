import { useState } from "react";
import {
  login,
  signup,
  requestResetPassword,
  updateNickname,
} from "@/apis/auth.api";
import type { LoginRequest, SignUpRequest } from "@/apis/auth.api";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

export function useAuth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setEmail = useAuthStore((state) => state.setEmail);
  const setToken = useAuthStore((state) => state.setToken);

  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);

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
        alert(error.message);
        setError(error.message);
      } else {
        console.error("예상치 못한 에러", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (formData: LoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      const { token, loginUser } = await login(formData);

      setEmail(loginUser.email);
      setToken(token);

      // 새로고침 후 유지용
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(loginUser));

      alert(`${loginUser.nickname}님, 로그인 되었습니다!`);
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        alert(error.message);
        setError(error.message);
      } else {
        console.error("예상치 못한 에러", error);
        alert("예상치 못한 에러가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRequestResetPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      await requestResetPassword(email);
      alert("임시 비밀번호가 이메일로 전송되었습니다.");
      navigate("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        alert(error.message);
        setError(error.message);
      } else {
        console.error("예상치 못한 에러", error);
        alert("예상치 못한 에러가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateNickname = async (newNickname: string) => {
    setLoading(true);
    setError(null);
    try {
      await updateNickname(newNickname);

      if (user) {
        const updatedUser = { ...user, nickname: newNickname };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      alert("닉네임이 변경되었습니다.");
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message || "닉네임 변경 실패");
        setError(error.message);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
        setError("알 수 없는 오류");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSignup,
    handleLogin,
    handleRequestResetPassword,
    handleUpdateNickname,
    loading,
    error,
  };
}
