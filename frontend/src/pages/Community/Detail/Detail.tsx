import { useState } from "react";
import * as S from "./Detail.styles";

const CommunityDetail = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  // 더미 데이터
  const post = {
    nickname: "닉네임",
    title: "제목제목제목제목제목제목",
    content: `작성한 내용 작성한 내용의 일부 작성한 내용 작성한 내용의 일부
    작성한 내용 작성한 내용의 일부작성한 내용 작성한 내용의 일부
    작성한 내용 작성한 내용의 일부작성한 내용 작성한 내용의 일부
    작성한 내용 작성한 내용의 일부작성한 내용 작성한 내용의 일부
    작성한 내용 작성한 내용의 일부작성한 내용 작성한 내용의 일부
    작성한 내용 작성한 내용의 일부작성한 내용 작성한 내용의 일부
    작성한 내용 작성한 내용의 일부작성한 내용 작성한 내용의 일부
    작성한 내용 작성한 내용의 일부작성한 내용 작성한 내용의 일부
    작성한 내용 작성한 내용의 일부작성한 내용 작성한 내용의 일부
    작성한 내용 작성한 내용의 일부작성한 내용 작성한 내용의 일부
    작성한 내용 작성한 내용의 일부작성한 내용 작성한 내용의 일부
    작성한 내용 작성한 내용의 일부작성한 내용 작성한 내용의 일부
    작성한 내용 작성한 내용의 일부작성한 내용 작성한 내용의 일부`,
    plantTags: ["#식물", "#화분"],
    images: ["https://via.placeholder.com/300"],
    createdAt: "2025.06.27",
  };

  return (
    <S.Container>
      <S.ScrollArea>
        <S.SectionDivider />

        <S.PostHeader>
          <p>프로필</p>
          <S.Nickname>{post.nickname}</S.Nickname>
        </S.PostHeader>

        <S.Title>{post.title}</S.Title>

        <S.Content>{post.content}</S.Content>

        <S.ImageWrapper>
          {post.images.map((img, idx) => (
            <S.Image key={idx} src={img} alt={`post-image-${idx}`} />
          ))}
        </S.ImageWrapper>

        <S.TagWrapper>
          {post.plantTags.map((tag, idx) => (
            <S.Tag key={idx}>{tag}</S.Tag>
          ))}
        </S.TagWrapper>

        <S.Date>{post.createdAt}</S.Date>

        <S.SectionDivider />

        {/* 댓글 섹션 */}
        <S.CommentSection>
          {comments.length === 0 ? (
            <S.EmptyComment>아직 댓글이 없습니다.</S.EmptyComment>
          ) : (
            <S.CommentList>
              {comments.map((cmt, idx) => (
                <S.CommentItem key={idx}>{cmt}</S.CommentItem>
              ))}
            </S.CommentList>
          )}
        </S.CommentSection>
      </S.ScrollArea>

      {/* 댓글 입력 폼 */}
      <S.CommentForm onSubmit={handleCommentSubmit}>
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
