import { usePostStore } from "@/store/postStore";
import { useState } from "react";
// import { fetchAllPosts } from "@/apis/post.api";
import { fetchPostsByState } from "@/apis/post.api";

import { useAuthStore } from "@/store/authStore";

export interface Post {
  id: number;
  user_id: number;
  title: string;
  content: string;
  isHealth?: number;
  state: number;
  created_at: string;
  plantTag?: string[];
  img?: string;
  profileImage?: string; // 프로필 이미지 추가
  nickname?: string; // 작성자 이름 추가
}

// state에 따라 성장일기(1), 커뮤니티(2) 게시글 구분
export const usePostFilter = (stateType: 1 | 2) => {
  const { setAllPosts, setFilteredPosts, filteredPosts, allPosts } =
    usePostStore();

  const userId = useAuthStore((s) => s.userId);
  const isInitialized = useAuthStore((s) => s.isInitialized);
  console.log("필터 로그인 유저ID:", userId, "isInitialized:", isInitialized);

  const [isMyPostFiltered, setIsMyPostFiltered] = useState(false);
  const [isLatestSorted, setIsLatestSorted] = useState(true);
  const [isPhotoFiltered, setIsPhotoFiltered] = useState(false);

  if (!isInitialized) {
    return {
      init: async () => {},
      filterLatest: () => {},
      filterMyPosts: () => {},
      filteredPosts,
      allPosts,
      isMyPostFiltered,
      isLatestSorted,
    };
  }

  const filterPhotoPosts = () => {
    if (isPhotoFiltered) {
      setFilteredPosts(allPosts);
      setIsPhotoFiltered(false);
    } else {
      const photoOnly = allPosts.filter((post) => !!post.img);
      setFilteredPosts(photoOnly);
      setIsPhotoFiltered(false);
    }
  };

  const init = async () => {
    const posts = await fetchPostsByState(stateType);
    setAllPosts(posts);
    setFilteredPosts(posts);
    setIsMyPostFiltered(false);
    setIsLatestSorted(true);
  };

const filterLatest = () => {
  const sorted = [...allPosts].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  setFilteredPosts(sorted);
  setIsLatestSorted(true);
  setIsMyPostFiltered(false);  
  setIsPhotoFiltered(false);
};

  const filterMyPosts = () => {
    if (!userId) return;

    if (!isMyPostFiltered) {
      const mine = allPosts.filter((post) => post.user_id === userId);
      setFilteredPosts(mine);
      setIsMyPostFiltered(true);
      setIsLatestSorted(false);
    }
  };
  return {
    init,
    filterLatest,
    filterMyPosts,
    filteredPosts,
    allPosts,
    isMyPostFiltered,
    isLatestSorted,
    filterPhotoPosts,
  };
};
