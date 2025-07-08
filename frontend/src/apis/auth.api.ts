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


export const signup = async (data: SignUpRequest) => {
  const response = await fetch("/users/join", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message || "회원가입 실패");
  }

  return response.json();
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await fetch("/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message || "로그인 실패");
  }

  return response.json();
};

export const requestResetPassword = async (email: string) => {
  const response = await fetch("/users/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message || "임시 비밀번호 발급 실패");
  }

  return response.json();
};