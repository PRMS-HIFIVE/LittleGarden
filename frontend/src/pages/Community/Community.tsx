import * as S from "./Community.styles";
import Button from "@/components/UI/Button/Button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { usePostFilter } from "@/hooks/usePostFilter";
// import { usePostStore } from "@/store/postStore";
import CommunityList from "./CommunityList/CommunityList";
import MainpageHeader from "@/common/Header/HeaderVariants/MainpageHeader";

const Community = () => {
  const navigate = useNavigate();

  const { init, filterLatest, filterMyPosts, isMyPostFiltered, isLatestSorted } = usePostFilter(2);

  useEffect(() => {
    init();
  }, []);

  const handleWritePost = () => navigate("/community/write");

  return (
    <S.Container>
      <MainpageHeader />
      <S.Title>커뮤니티</S.Title>
      <S.ButtonWrapper>
        <Button
          variant="diaryMenu"
          width="50%"
          isActive={isLatestSorted}   
          onClick={filterLatest}
        >
          최신순
        </Button>

        <Button
          variant="diaryMenu"
          width="50%"
          color="white"
          isActive={isMyPostFiltered}  
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

      <S.ScrollableCardList>
        <CommunityList />
      </S.ScrollableCardList>
    </S.Container>
  );
};


export default Community;
