import { create } from "zustand";

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(";").shift();
    // 쿠키 값이 없는 경우 null을 반환하도록 수정
    return cookieValue ? decodeURIComponent(cookieValue) : null;
  }
  return null;
};

const eraseCookie = (name: string) => {
  document.cookie = `${name}=; Max-Age=-99999999; path=/`;
};

interface User {
  id: number;
  nickname: string;
  profileImage: string;
}

interface AuthState {
  email: string;
  userId: number | null;
  token: string | null;
  user: User | null;
  setEmail: (email: string) => void;
  setUserId: (userId: number | null) => void;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  resetAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const token = getCookie("access_token");
  const userRaw = localStorage.getItem("user");
  const user = userRaw ? JSON.parse(userRaw) : null;

  return {
    email: "",
    userId: user?.id ?? null,
    token,
    user,

    setEmail: (email) => set({ email }),
    setUserId: (userId) => set({ userId }),
    setToken: (token) => {
      if (token) {
        document.cookie = `access_token=${encodeURIComponent(token)}; path=/`;
      } else {
        eraseCookie("access_token");
      }
      set({ token: token });
    },
    setUser: (user) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
      set({ user });
    },
    resetAuth: () => {
      localStorage.removeItem("user");
      eraseCookie("access_token");
      set({
        email: "",
        userId: null,
        token: null,
        user: null,
      });
    },
  };
});
