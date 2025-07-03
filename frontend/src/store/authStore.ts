import { create } from "zustand";

interface AuthState {
  email: string;
  token: string | null;
  setEmail: (email: string) => void;
  setToken: (token: string | null) => void;
  resetAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  email: "",
  token: null,
  setEmail: (email) => set({ email }),
  setToken: (token) => set({ token }),
  resetAuth: () => set({ email: "", token: null }),
}));
