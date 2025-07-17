import type { Post } from "@/hooks/usePostFilter";

export const fetchAllPosts = async (): Promise<Post[]> => {
  const response = await fetch("/posts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "게시글 조회 실패");
  }

  const data = await response.json();
  return data.data;
};

// 게시글 상세조회 API
export const fetchPostDetail = async (postId: number) => {
  console.log("게시글 조회요청:", postId);

  const response = await fetch(`/posts/${postId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("게시글 조회 실패");
  }

  const data = await response.json();
  return data.data;
};
