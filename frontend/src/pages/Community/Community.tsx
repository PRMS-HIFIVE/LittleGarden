import React from "react";
import * as S from "./Community.styles";
import Button from "@/components/UI/Button/Button";


const Community = () => {
  return (
    <>
      <S.Container>
        {/* <p>Header</p>
        <p>커뮤니티</p> */}
        <S.ButtonWrapper>
          <Button
            variant="diaryMenu"
            width="100%"
            // onClick={}
          >
            최신순
          </Button>

          <Button
            variant="diaryMenu"
            width="100%"
            color="white"
            // onClick={}
          >
            내 글 보기
          </Button>
          
          <Button
            variant="diaryMenu"
            width="100%"
            color="navyBlue"
            // onClick={}
          >
            글쓰기
          </Button>
        </S.ButtonWrapper>
        {/* <p>커뮤니티 글 렌더링 영역</p>
        <p>Footer</p> */}
      </S.Container>
    </>
  );
};

export default Community;
