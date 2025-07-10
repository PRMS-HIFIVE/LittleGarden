import { create } from "zustand";

interface AuthState {
  email: string;
  userId: number | null;   
  token: string | null;
  setEmail: (email: string) => void;
  setUserId: (userId: number | null) => void;  
  setToken: (token: string | null) => void;
  resetAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  email: "",
  userId: null,
  token: null,
  setEmail: (email) => set({ email }),
  setUserId: (userId) => set({ userId }),
  setToken: (token) => set({ token }),
  resetAuth: () => set({ email: "", userId: null, token: null }),
}));
