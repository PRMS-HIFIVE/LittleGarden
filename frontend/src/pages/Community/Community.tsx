// import React from "react";
import * as S from "./Community.styles";
import Button from "@/components/UI/Button/Button";
import DiaryHeader from "@/common/Header/HeaderVariants/DiaryHeader";
import { useNavigate } from "react-router-dom";


const Community = () => {
  const navigate = useNavigate();

  const handleViewLatestPosts = () => {}
  const handleViewMyPosts = () => {}
  const handleWritePost = () => {
    navigate("/community/write");
  }


  return (
    <>
      <S.Container>
        <DiaryHeader/>
        <S.Title>커뮤니티</S.Title>
        <S.ButtonWrapper>
          <Button
            variant="diaryMenu"
            width="50%"
            onClick={handleViewLatestPosts}
          >
            최신순
          </Button>

          <Button
            variant="diaryMenu"
            width="50%"
            color="white"
            onClick={handleViewMyPosts}
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
      </S.Container>
    </>
  );
};

export default Community;
