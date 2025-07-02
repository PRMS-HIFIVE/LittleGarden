import React from "react";
import * as S from "./Community.styles";
import Button from "@/components/UI/Button/Button";
import DiaryHeader from "@/common/Header/HeaderVariants/DiaryHeader";
import Footer from "@/common/Footer";


const Community = () => {
  return (
    <>
      <S.Container>
        <DiaryHeader/>
        <S.Title>커뮤니티</S.Title>
        <S.ButtonWrapper>
          <Button
            variant="diaryMenu"
            width="50%"
            // onClick={}
          >
            최신순
          </Button>

          <Button
            variant="diaryMenu"
            width="50%"
            color="white"
            // onClick={}
          >
            내 글 보기
          </Button>
          
          <Button
            variant="diaryMenu"
            width="50%"
            color="navyBlue"
            // onClick={}
          >
            글쓰기
          </Button>
        </S.ButtonWrapper>
        <p>커뮤니티 글 렌더링 영역</p>
        {/* <Footer/> */}
      </S.Container>
    </>
  );
};

export default Community;
