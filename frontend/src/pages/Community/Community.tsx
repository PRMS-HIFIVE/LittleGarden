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

  // const { filteredPosts } = usePostStore();

  const { init, filterLatest, filterMyPosts } = usePostFilter(2);

    useEffect(() => {
    init();
  }, []);

  // 글쓰기 버튼 클릭 시 이동
  const handleWritePost = () => navigate("/community/write");

  return (
    <>
      <S.Container>
          <S.ContentWrapper>
              <MainpageHeader />
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

            <S.ScrollableCardList>
            <CommunityList />
            </S.ScrollableCardList>
          </S.ContentWrapper>


      </S.Container>
    </>
  );
};

export default Community;
