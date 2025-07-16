import {create} from "zustand";
import type { DiaryPayloadUnion } from "@/apis/diary.api";


interface diaryPostState {
    allPosts: DiaryPayloadUnion[];
    filteredPosts: DiaryPayloadUnion[];
    setAllPosts: (posts: DiaryPayloadUnion[]) => void;
    setFilteredPosts: (posts: DiaryPayloadUnion[]) => void;
}

export const diaryStore = create<diaryPostState>((set) => ({
    allPosts: [],
    filteredPosts: [],
    setAllPosts: (posts) => set({allPosts: posts, filteredPosts: posts}),
    setFilteredPosts: (posts) => set({filteredPosts: posts}),
}))