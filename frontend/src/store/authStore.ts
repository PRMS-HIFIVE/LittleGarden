import { create } from "zustand";

interface User {
  id: number;
  email: string;
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
  isInitialized: boolean;
  setInitialized: (val: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  email: "",
  user: null,
  userId: null,
    isAuthenticated: false,
  isInitialized: false, 
  setEmail: (email) => set({ email }),
  setAuthenticated: (value) => set({ isAuthenticated: value }),

  setUser: (user) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      set({ user, userId: user.id });
      console.log("유저 정보 저장:", user);
      console.log("유저 ID 저장:", user.id);
    } else {
      localStorage.removeItem("user");
      set({ user: null, userId: null });
    }
    // set({ user });
  },

  resetAuth: () => {
    localStorage.removeItem("user");
    set({
      isAuthenticated: false,
      user: null,
      userId: null,
       isInitialized: true,
    });
  },
  setInitialized: (val) => set({ isInitialized: val }),
}));
