import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as S from "./Detail.styles";
import Tag from "@/components/UI/Tag/Tag";
import { useComment } from "@/hooks/useComment";
import { fetchPostDetail } from "@/apis/post.api";
import { useAuthStore } from "@/store/authStore";
import LoadingPage from "@/pages/Loading/Loading";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import MainpageHeader from "@/common/Header/HeaderVariants/MainpageHeader";

// 게시글 데이터 타입
interface PostDetail {
  profileImage: string;
  nickname: string;
  title: string;
  content: string;
  images: string[];
  plantTags: string[];
  createdAt: string;
}

const CommunityDetail = () => {
  const { id } = useParams();
  const postId = Number(id);
  console.log("게시글 ID:", postId);

  const [comment, setComment] = useState("");
  const [post, setPost] = useState<PostDetail | null>(null);

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");

  const user = useAuthStore((s) => s.user);
  console.log("로그인 유저 정보:", user);

  const {
    comments,
    loadComments,
    createComment,
    updateComment,
    deleteComment,
  } = useComment(postId);

  // 게시글 + 댓글 불러오기
  useEffect(() => {
    const init = async () => {
      try {
        const postData = await fetchPostDetail(postId);
        const postDetail: PostDetail = {
          profileImage: postData.profileImage || "/default-profile.png",
          nickname: postData.nickname ?? "작성자 이름",
          title: postData.title,
          content: postData.content,
          images: postData.img ? [postData.img] : [],
          plantTags: postData.plantTag || [],
          createdAt: new Date(postData.createdAt).toLocaleDateString(),
        };

        setPost(postDetail);

        await loadComments();
      } catch (err) {
        console.error("게시글 또는 댓글 불러오기 실패", err);
      }
    };

    if (postId) init();
  }, [postId]);

  // 댓글 등록
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      await createComment(comment); // 서버 저장 + store 갱신
      setComment(""); // 입력창 초기화
    } catch (err) {
      console.error("댓글 등록 실패", err);
    }
  };

  const startEditing = (id: number, content: string) => {
    setEditingCommentId(id);
    setEditingContent(content);
  };

  const cancelEditing = () => {
    setEditingCommentId(null);
    setEditingContent("");
  };

  const handleUpdate = async () => {
    if (editingCommentId !== null && editingContent.trim()) {
      try {
        await updateComment(editingCommentId, editingContent);
        setEditingCommentId(null);
        setEditingContent("");
        await loadComments();
      } catch (err) {
        console.error("댓글 수정 실패", err);
      }
    }
  };

  const handleDelete = async (commentId: number) => {
    if (confirm("댓글을 삭제하시겠습니까?")) {
      try {
        await deleteComment(commentId);
        await loadComments();
      } catch (err) {
        console.error("댓글 삭제 실패", err);
      }
    }
  };

  if (!post) return <LoadingPage />;

  return (
    <S.Container>
      <S.ScrollArea>
        <MainpageHeader />
        <S.SectionDivider />

        <S.PostHeader>
          <S.ProfileImage src={post.profileImage} alt="프로필 이미지" />
          <S.Nickname>{post.nickname}</S.Nickname>
        </S.PostHeader>

        <S.Title>{post.title}</S.Title>
        <S.Content>{post.content}</S.Content>

        <S.ImageWrapper>
          {post.images.map((img, idx) => (
            <S.Image key={idx} src={img} alt={`img-${idx}`} />
          ))}
        </S.ImageWrapper>

        <S.TagWrapper>
          {post.plantTags.map((tag, idx) => (
            <Tag key={idx}>{tag}</Tag>
          ))}
        </S.TagWrapper>

        <S.Date>{post.createdAt}</S.Date>
        <S.SectionDivider />

        {/* 댓글 영역 */}
        <S.CommentSection>
          {comments.length === 0 ? (
            <S.EmptyComment>아직 댓글이 없습니다.</S.EmptyComment>
          ) : (
            <S.CommentList>
              {comments.map((cmt) => (
                <S.CommentItem key={cmt.id}>
                  <S.CommentHeader>
                    <S.ProfileImage
                      src={cmt.profileImage || "/default-profile.png"}
                      alt={`${cmt.nickName} 프로필`}
                    />
                    <S.Nickname>
                      {cmt.nickName}
                      {cmt.isAuthor === "1" && (
                        <S.AuthorBadge>작성자</S.AuthorBadge>
                      )}
                    </S.Nickname>

                    {user?.id === cmt.userId && (
                      <S.IconWrapper>
                        <S.IconButton
                          onClick={() => startEditing(cmt.id, cmt.content)}
                        >
                          <FiEdit size={16} />
                        </S.IconButton>
                        <S.IconButton onClick={() => handleDelete(cmt.id)}>
                          <FiTrash2 size={16} />
                        </S.IconButton>
                      </S.IconWrapper>
                    )}
                  </S.CommentHeader>

                  {editingCommentId === cmt.id ? (
                    <>
                      <S.CommentEditInput
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                      />
                      <S.CommentEditActions>
                        <button onClick={handleUpdate}>수정</button>
                        <button onClick={cancelEditing}>취소</button>
                      </S.CommentEditActions>
                    </>
                  ) : (
                    <S.CommentText>{cmt.content}</S.CommentText>
                  )}
                </S.CommentItem>
              ))}
            </S.CommentList>
          )}
        </S.CommentSection>
      </S.ScrollArea>

      <S.CommentForm onSubmit={handleSubmit}>
        <S.CommentInput
          placeholder="댓글을 남겨보세요."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <S.CommentButton type="submit">전송</S.CommentButton>
      </S.CommentForm>
    </S.Container>
  );
};

export default CommunityDetail;
