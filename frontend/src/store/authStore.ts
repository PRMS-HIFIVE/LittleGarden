import { create } from "zustand";

interface User {
  id: number;
  nickname: string;
  profileImage?: string;
}

interface AuthState {
  email: string;
  user: User | null;
  userId: number | null;
  setUser: (user: User | null) => void;
  setEmail: (email: string) => void;
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  resetAuth: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  email: "",
  user: null,
  isAuthenticated: false,
   setEmail: (email) => set({ email }),
  get userId() {
    return get().user?.id ?? null; 
  },

  setAuthenticated: (value) => set({ isAuthenticated: value }),

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
    set({
      isAuthenticated: false,
      user: null,
    });
  },
}));
