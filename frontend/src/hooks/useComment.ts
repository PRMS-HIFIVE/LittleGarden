import { useCommentStore } from "@/store/commentStore";
import { fetchComments, createComment as createCommentApi } from "@/apis/comment.api";

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

  return { comments, loadComments, createComment };
};
