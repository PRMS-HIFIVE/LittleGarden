import { useState } from "react";
import * as S from "./Detail.styles";
import CommunityBackHeader from "@/common/Header/HeaderVariants/CommunityBackHeader";
import Tag from "@/components/UI/Tag/Tag";

interface CommentData {
  id: number;
  nickname: string;
  content: string;
  profileImage: string;
  isAuthor: "1" | "0";
}

const CommunityDetail = () => {
  const [comment, setComment] = useState("");
  // const [comments, setComments] = useState<string[]>([]);
  const [comments, setComments] = useState<CommentData[]>([
    // 작성자가 아닌 유저의 댓글 확인용 데이터
    {
      id: 2,
      nickname: "유저2",
      content: "저도 몬스테라 키우고 있어요!",
      profileImage: "https://via.placeholder.com/40",
      isAuthor: "0",
    },
  ]);

  // const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (comment.trim()) {
  //     setComments([...comments, comment]);
  //     setComment("");
  //   }
  // };

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (comment.trim()) {
      const newComment: CommentData = {
        id: comments.length + 1,
        nickname: post.nickname,
        content: comment,
        profileImage: post.profileImage,
        isAuthor: "1",
      };

      setComments([...comments, newComment]);
      setComment("");
    }
  };

  // 더미 데이터 (추후 API로 대체 예정)
  const post = {
    profileImage: "https://via.placeholder.com/40",
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
        <CommunityBackHeader/>
        <S.SectionDivider />
        <S.PostHeader>
          <S.ProfileImage
            src={post.profileImage}
            alt={`${post.nickname} 프로필`}
          />

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
          {/* {post.plantTags.map((tag, idx) => (
            <S.Tag key={idx}>{tag}</S.Tag>
          ))} */}
          <Tag>#화분 </Tag>
          <Tag>#식물 </Tag>
        </S.TagWrapper>

        <S.Date>{post.createdAt}</S.Date>

        <S.SectionDivider />

        {/* 댓글 섹션 */}
        <S.CommentSection>
          {comments.length === 0 ? (
            <S.EmptyComment>아직 댓글이 없습니다.</S.EmptyComment>
          ) : (
            // <S.CommentList>
            //   {comments.map((cmt, idx) => (
            //     <S.CommentItem key={idx}>{cmt}</S.CommentItem>
            //   ))}
            // </S.CommentList>
            <S.CommentList>
              {comments.map((cmt) => (
                <S.CommentItem key={cmt.id}>
                  <S.CommentHeader>
                    <S.ProfileImage
                      src={cmt.profileImage}
                      alt={`${cmt.nickname} 프로필`}
                    />
                    <S.Nickname>
                      {cmt.nickname}
                      {cmt.isAuthor === "1" && (
                        <S.AuthorBadge>작성자</S.AuthorBadge>
                      )}
                    </S.Nickname>
                  </S.CommentHeader>
                  <S.CommentText>{cmt.content}</S.CommentText>
                </S.CommentItem>
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
