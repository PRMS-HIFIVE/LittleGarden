import { usePostStore } from "@/store/postStore";
import { useState } from "react";
// import { fetchAllPosts } from "@/apis/post.api";
// import { useAuthStore } from "@/store/authStore";

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

const dummyPosts: Post[] = [
  {
    postId: 1,
    state: 2,
    title: "첫 번째 게시글",
    content: "내용1",
    createdAt: "2025-07-10T10:00:00",
    userId: 1,
  },
  {
    postId: 2,
    state: 2,
    title: "두 번째 게시글",
    content: "내용2",
    createdAt: "2025-07-09T10:00:00",
    userId: 2,
  },
  {
    postId: 3,
    state: 2,
    title: "세 번째 게시글",
    content: "내용3",
    createdAt: "2025-07-15T10:00:00",
    userId: 1,
  },
];

// state에 따라 성장일기, 커뮤니티 게시글 구분
export const usePostFilter = (stateType: 1 | 2) => {
  const { allPosts, setAllPosts, filteredPosts, setFilteredPosts } =
    usePostStore();

  // 실제 사용할 코드
  //   const userId = useAuthStore((s) => s.userId);

  //   const init = async () => {
  //     const data = await fetchAllPosts();
  //     const filtered = data.filter((post) => post.state === stateType);
  //     setAllPosts(filtered);
  //   };

  // 더미데이터 확인 로직
  const [isMyPostFiltered, setIsMyPostFiltered] = useState(false);
  const userId = 1;

  //   let isMyPostFiltered = false;

  const init = async () => {
    // const data = await fetchAllPosts();
    const data = dummyPosts;
    const filtered = data.filter((post) => post.state === stateType);
    setAllPosts(filtered);
    setFilteredPosts(filtered);
  };

  // 최신순 필터링, 내 글보기 클릭 후 최신순 버튼 누르면 내 글들만 최신순으로 정렬
  const filterLatest = () => {
    const source = isMyPostFiltered ? filteredPosts : allPosts;

    const sorted = [...source].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    setFilteredPosts(sorted);
  };

  // 내 글 필터링, 2번 클릭하면 전체 글로 돌아감
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
