export interface SignUpRequest {
  email: string;
  pwd: string;
  nickName: string;
}

export interface LoginRequest {
  email: string;
  pwd: string;
}

export interface LoginResponse {
  loginUser: {
    id: number;
    email: string;
    nickname: string;
  };
  token: string;
}

const BASE_URL = import.meta.env.VITE_BACK_SERVER_URL;
console.log("백엔드 주소:", BASE_URL);

export const signup = async (data: SignUpRequest) => {
  const response = await fetch(`${BASE_URL}/users/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message || "회원가입 실패");
  }

  return response.json();
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message || "로그인 실패");
  }

  return response.json();
};

export const logout = async () => {
  const response = await fetch(`${BASE_URL}/users/logout`,{
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message || "로그아웃 실패");
  }

  return response.json();
}

export const checkAuth = async () => {
  const response = await fetch(`${BASE_URL}/users/check`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unauthorized");
  }

  const data = await response.json();
  return data.user;
};

export const requestResetPassword = async (email: string) => {
  const response = await fetch(`${BASE_URL}/users/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
    credentials: "include",
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message || "임시 비밀번호 발급 실패");
  }

  return response.json();
};

export const requestEmailCertification = async (email: string) => {
  const response = await fetch(`${BASE_URL}/users/certify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
    credentials: "include",
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message || "이메일 인증 요청 실패");
  }

  return response.json();
};

export const updateNickname = async (nickName: string) => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nickName }),
    //credentials: "include",
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message || "닉네임 변경 실패");
  }

  return response.json();
};
