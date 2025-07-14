import { create } from "zustand";

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
  const token = localStorage.getItem("token");
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
      localStorage.setItem("token", token ?? "");
      set({ token });
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
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      set({
        email: "",
        userId: null,
        token: null,
        user: null,
      });
    },
  };
});
