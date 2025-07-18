import * as S from "./Diary.styles";
import { useNavigate, /*Outlet*/ } from "react-router-dom";
import Button from "@/components/UI/Button/Button";
import MainpageHeader from "@/common/Header/HeaderVariants/MainpageHeader";
import { usePostFilter } from "@/hooks/usePostFilter";
import { useEffect, useState } from "react";
import DiaryList from "@/pages/Diary/DiaryList/DiaryList";


const Diary = () => {
    const navigate = useNavigate();

    const { init, /*filterMyPosts,*/ filterLatest, /*filterPhotoPosts*/ } = usePostFilter(1);
    const [viewMode, setViewMode] = useState<"latest" | "photoOnly">("latest");

    // useEffect(() => {
    //     init();
    // }, [])

useEffect(() => {
  const initialize = /*async*/ () => {
    /*await*/ init();
    //filterMyPosts();
  };
  initialize();
}, []);
    
    // const handleLatest = () => {
    //     navigate('/diary/latest')
    // }
    // const handlePhotoOnly = () => {
    //     navigate('/diary/photo')
    // }
    const handleWritePost = () => {
        navigate('/diary/write')
    }
    return (
        <>
            <S.Container>  
                    <MainpageHeader />   
                    <S.Title>성장일기</S.Title>
                    <S.ButtonWrapper>
                        <Button 
                            variant="diaryMenu"
                            onClick={() => {
                                filterLatest();
                                setViewMode("latest");
                            }}    
                            width="50%"
                        > 최신순
                        </Button>
                        <Button 
                            variant="diaryMenu"
                            onClick={() => {
                            //filterPhotoPosts();
                            setViewMode("photoOnly");
                            }}
                            width="50%"
                            color="white"
                        > 사진만 보기
                        </Button>
                        <Button 
                            variant="diaryMenu"
                            onClick={handleWritePost}
                            width="50%"
                            color="navyBlue"
                        > 글쓰기
                        </Button>
                    </S.ButtonWrapper>

                    <S.ScrollableCardList>
                        <DiaryList viewMode={viewMode} />
                    </S.ScrollableCardList>

            </S.Container>
        </>
    )
}

export default Diary;