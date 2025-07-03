export interface SignUpRequest {
  email: string;
  pwd: string;
  nickName: string;
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
