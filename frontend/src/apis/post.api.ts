import type { Post } from "@/hooks/usePostFilter";

const BASE_URL = import.meta.env.VITE_BACK_SERVER_URL;

// 게시글 전체 조회 (state 구분 안함)
export const fetchAllPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "게시글 조회 실패");
  }

  const data = await response.json();
  return data.data;
};

// state 별 게시글 조회
export const fetchPostsByState = async (stateType: number): Promise<Post[]> => {
  const response = await fetch(`${BASE_URL}/posts?state=${stateType}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "게시글 조회 실패");
  }

  const data = await response.json();
  return data.data;
};



// 게시글 상세조회
export const fetchPostDetail = async (id: number): Promise<Post> => {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    credentials: "include",
  });
  console.log("게시글 상세조회 요청:", id);

  if (!response.ok) {
    throw new Error("게시글 조회 실패");
  }

  const data = await response.json();
  console.log("data", data)
  return data.data;
};

// 게시글 등록
export interface PostCreatePayload {
  userId: number;
  title: string;
  content: string;
  state: number;         
  plantTag?: string[];
  image?: string | string[];
  isHealth?: number;
}

export const createPost = async (payload: PostCreatePayload | FormData) => {
  const isFormData = payload instanceof FormData;
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: isFormData
      ? undefined //-> 자동으로 'Content-Type' 자동 설정됨
      : { "Content-Type": "application/json" },
    body: isFormData
      ? payload
      : JSON.stringify(payload),
    credentials: "include",
  });
  console.log("게시글 등록 요청:", payload);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "글 등록 실패");
  }

  return await response.json();
};

// 게시글 수정
export interface PostUpdatePayload extends PostCreatePayload {
  postId: number;
}

export const updatePost = async (payload: PostUpdatePayload) => {
  const response = await fetch(`${BASE_URL}/posts/${payload.postId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "글 수정 실패");
  }

  return await response.json();
};

// 게시글 삭제
export const deletePost = async (postId: number) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "글 삭제 실패");
  }

  if (response.status === 204) return null;

  return await response.json();
};
