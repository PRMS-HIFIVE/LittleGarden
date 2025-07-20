import { useCommentStore } from "@/store/commentStore";
import {
  fetchComments,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "@/apis/comment.api";

export const useComment = (postId: number) => {
  const { comments, setComments } = useCommentStore();

  const loadComments = async () => {
    if (!postId) return;
    const data = await fetchComments(postId);
    setComments(data);
  };

  const createComment = async (content: string) => {
    if (!postId) return;
    await createCommentApi(postId, content);
    await loadComments(); // 댓글 작성 후 최신화
  };

  const updateComment = async (commentId: number, content: string) => {
    await updateCommentApi(commentId, content);
  };

  const deleteComment = async (commentId: number) => {
    await deleteCommentApi(commentId);
  };
  return { comments, loadComments, createComment, updateComment, deleteComment};
};
