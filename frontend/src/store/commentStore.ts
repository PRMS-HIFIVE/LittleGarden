import { create } from "zustand";

interface Comment {
  id: number;
  userId: number;
  postId: number;
  content: string;
  createdAt: string;
  nickName: string;
  profileImage?: string;
  isAuthor: "0" | "1";
}

interface CommentState {
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
}

export const useCommentStore = create<CommentState>((set) => ({
  comments: [],
  setComments: (comments) => set({ comments }),
}));
