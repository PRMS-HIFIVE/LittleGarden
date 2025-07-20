import { create } from "zustand";
import type { Post } from "@/hooks/usePostFilter";

const BASE_URL = import.meta.env.VITE_BACK_SERVER_URL;

interface PostState {
  allPosts: Post[];
  filteredPosts: Post[];
  setAllPosts: (posts: Post[]) => void;
  setFilteredPosts: (posts: Post[]) => void;
  addPost: (newPost: Post) => void;
  fetchPosts: () => Promise<void>;  
}

export const usePostStore = create<PostState>((set, get) => ({
  allPosts: [],
  filteredPosts: [],
  setAllPosts: (posts) => set({ allPosts: posts, filteredPosts: posts }),
  setFilteredPosts: (posts) => set({ filteredPosts: posts }),
  addPost: (newPost) => {
    const currentAll = get().allPosts;
    const currentFiltered = get().filteredPosts;
    set({
      allPosts: [newPost, ...currentAll],
      filteredPosts: [newPost, ...currentFiltered],
    });
  },

  fetchPosts: async () => {
    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("게시글 불러오기 실패");
      }
      const data = await response.json();
      set({
        allPosts: data.data,
        filteredPosts: data.data,
      });
    } catch (error) {
      console.error("게시글 fetchPosts 에러:", error);
    }
  },
}));
