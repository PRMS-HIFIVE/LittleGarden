import { create } from "zustand";
import type { Post } from "@/hooks/usePostFilter";

interface PostState {
  allPosts: Post[];
  filteredPosts: Post[];
  setAllPosts: (posts: Post[]) => void;
  setFilteredPosts: (posts: Post[]) => void;
}

export const usePostStore = create<PostState>((set) => ({
  allPosts: [],
  filteredPosts: [],
  setAllPosts: (posts) => set({ allPosts: posts, filteredPosts: posts }),
  setFilteredPosts: (posts) => set({ filteredPosts: posts }),
}));
