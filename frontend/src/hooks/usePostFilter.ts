import { usePostStore } from "@/store/postStore";
import { useState } from "react";
// import { fetchAllPosts } from "@/apis/post.api";
import { fetchPostsByState } from "@/apis/post.api";

import { useAuthStore } from "@/store/authStore";

export interface Post {
  id: number;
  userId: number;
  title: string;
  content: string;
  isHealth?: number;
  state: number;
  createdAt: string;
  plantTag?: string[];
  img?: string;
  profileImage?: string; // 프로필 이미지 추가
  nickname?: string; // 작성자 이름 추가
}

// state에 따라 성장일기(1), 커뮤니티(2) 게시글 구분
export const usePostFilter = (stateType: 1 | 2) => {
  const { setAllPosts, setFilteredPosts, filteredPosts, allPosts } = usePostStore();
  const userId = useAuthStore((s) => s.userId);
  const [isMyPostFiltered, setIsMyPostFiltered] = useState(false);

  const init = async () => {
    const posts = await fetchPostsByState(stateType);
    setAllPosts(posts);
    setFilteredPosts(posts);
    setIsMyPostFiltered(false);
  };

  // 최신순 정렬
  const filterLatest = () => {
    const source = isMyPostFiltered ? filteredPosts : allPosts;
    const sorted = [...source].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setFilteredPosts(sorted);
  };

  // 내 글 보기 / 전체 보기 토글
  const filterMyPosts = () => {
    if (!userId) return;

    if (isMyPostFiltered) {
      setFilteredPosts(allPosts);
      setIsMyPostFiltered(false);
    } else {
      const mine = allPosts.filter((post) => post.userId === userId);
      setFilteredPosts(mine);
      setIsMyPostFiltered(true);
    }
  };

  return { init, filterLatest, filterMyPosts };
};
