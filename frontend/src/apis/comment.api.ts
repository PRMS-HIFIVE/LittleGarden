export interface CommentResponse {
  id: number;
  profileImage?: string;
  userId: number;
  postId: number;
  content: string;
  createdAt: string;
  nickName: string;
  isAuthor: "1" | "0";
}

export const fetchComments = async (postId: number): Promise<CommentResponse[]> => {
  const token = localStorage.getItem("token");

  const res = await fetch(`/comments?postId=${postId}`, {
    headers: {
      Authorization: `Bearer ${token ?? ""}`,
    },
  });

  if (!res.ok) throw new Error("댓글 조회 실패");
  return await res.json();
};

export const createComment = async (postId: number, content: string) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`/comments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token ?? ""}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postId, content }),
  });

  if (!res.ok) throw new Error("댓글 작성 실패");
};

// 댓글 수정
export const updateComment = async (commentId: number, content: string) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`/comments/${commentId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token ?? ""}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) throw new Error("댓글 수정 실패");
};

// 댓글 삭제
export const deleteComment = async (commentId: number) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token ?? ""}`,
    },
  });

  if (!res.ok) throw new Error("댓글 삭제 실패");
};
