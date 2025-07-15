import { usePostStore } from "@/store/postStore";
import { useState } from "react";
import { fetchAllPosts } from "@/apis/post.api";
import { useAuthStore } from "@/store/authStore";

export interface Post {
  postId: number;
  userId: number;
  title: string;
  content: string;
  isHealth?: number;
  state: number;
  createdAt: string;
  plantTag?: string[];
  img?: string;
}

// state에 따라 성장일기(1), 커뮤니티(2) 게시글 구분
export const usePostFilter = (stateType: 1 | 2) => {
  const { allPosts, setAllPosts, filteredPosts, setFilteredPosts } = usePostStore();
  const userId = useAuthStore((s) => s.userId);
  const [isMyPostFiltered, setIsMyPostFiltered] = useState(false);

  // 초기 게시글 불러오기 (state에 맞는 게시글만 필터링)
  const init = async () => {
    const data = await fetchAllPosts();
    const filtered = data.filter((post) => post.state === stateType);
    setAllPosts(filtered);
    setFilteredPosts(filtered);
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
