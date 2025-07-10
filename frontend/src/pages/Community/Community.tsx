import * as S from "./Community.styles";
import Button from "@/components/UI/Button/Button";
import DiaryHeader from "@/common/Header/HeaderVariants/DiaryHeader";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { usePostFilter } from "@/hooks/usePostFilter";
import Card from "@/common/Card/Card";
import { usePostStore } from "@/store/postStore";

const Community = () => {
  const navigate = useNavigate();

  const { filteredPosts } = usePostStore();

  const { init, filterLatest, filterMyPosts } = usePostFilter(2);

    useEffect(() => {
    init();
  }, []);

  // 글쓰기 버튼 클릭 시 이동
  const handleWritePost = () => navigate("/community/write");

  return (
    <>
      <S.Container>
        <DiaryHeader />

        <S.Title>커뮤니티</S.Title>
        <S.ButtonWrapper>
          <Button
            variant="diaryMenu"
            width="50%"
            onClick={filterLatest}
          >
            최신순
          </Button>

          <Button
            variant="diaryMenu"
            width="50%"
            color="white"
            onClick={filterMyPosts}
          >
            내 글 보기
          </Button>

          <Button
            variant="diaryMenu"
            width="50%"
            color="navyBlue"
            onClick={handleWritePost}
          >
            글쓰기
          </Button>
        </S.ButtonWrapper>

        {/* 더미데이터 확인용 카드리스트 렌더링 */}
        
      <S.ScrollableCardList>
        {filteredPosts.map((post) => (
          <Card
            key={post.postId}
            title={post.title}
            content={post.content}
            date={post.createdAt}
            image={post.img}
            tag={post.plantTag}
          />
        ))}
      </S.ScrollableCardList>

        {/* <S.ScrollableCardList>
          {[...Array(10)].map((_, i) => (
            <Card
              key={i}
              title={`제목 ${i + 1}`}
              content="내용"
              date="2023-10-01"
              image="https://picsum.photos/200/300"
              tag={["태그1", "태그2"]}
              profileImage="https://picsum.photos/50/50"
            />
          ))}
        </S.ScrollableCardList> */}
      </S.Container>
    </>
  );
};

export default Community;
