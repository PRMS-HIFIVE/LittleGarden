import { create } from "zustand";

// const getCookie = (name: string): string | null => {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) {
//     const cookieValue = parts.pop()?.split(";").shift();
//     return cookieValue ? decodeURIComponent(cookieValue) : null;
//   }
//   return null;
// };

const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split("; ").reduce<Record<string, string>>((acc, cookie) => {
    const [key, val] = cookie.split("=");
    acc[key] = val;
    return acc;
  }, {});
  return cookies[name] ? decodeURIComponent(cookies[name]) : null;
};


const eraseCookie = (name: string) => {
  document.cookie = `${name}=; Max-Age=-99999999; path=/`;
};

interface User {
  id: number;
  nickname: string;
  profileImage?: string;
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

const tokenFromCookie = getCookie("access_token");

export const useAuthStore = create<AuthState>((set) => ({
  email: "",
  userId: null,
  token: tokenFromCookie ?? null,
  user: (() => {
    const userRaw = localStorage.getItem("user");
    return userRaw ? JSON.parse(userRaw) : null;
  })(),

  setEmail: (email) => set({ email }),

  setUserId: (userId) => set({ userId }),

setToken: (token) => {
  console.log("setToken called with", token);
  if (token) {
    document.cookie = `access_token=${encodeURIComponent(token)}; path=/`;
  } else {
    eraseCookie("access_token");
  }
  set({ token });
  console.log("zustand set called");
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
}));

