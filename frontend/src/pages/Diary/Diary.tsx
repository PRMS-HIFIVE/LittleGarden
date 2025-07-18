import * as S from "./Diary.styles";
import { useNavigate, Outlet } from "react-router-dom";
import Button from "@/components/UI/Button/Button";
import MainpageHeader from "@/common/Header/HeaderVariants/MainpageHeader";
import { usePostFilter } from "@/hooks/usePostFilter";
import { useEffect } from "react";


const Diary = () => {
    const navigate = useNavigate();

    const { init, filterLatest, filterPhotoPosts } = usePostFilter(1);

    useEffect(() => {
        init();
    }, [])
    
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
                <S.ContentWrapper>     
                    <MainpageHeader />   
                    <S.Title>성장일기</S.Title>
                    <S.ButtonWrapper>
                        <Button 
                            variant="diaryMenu"
                            onClick={filterLatest}
                            width="50%"
                        > 최신순
                        </Button>
                        <Button 
                            variant="diaryMenu"
                            onClick={filterPhotoPosts}
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
                    <S.textContainer>
                        <S.noDataText>
                            아직 작성된 글이 없습니다<br/>
                            식물과의 이야기를 남겨보세요
                        </S.noDataText>
                        <Outlet></Outlet>
                    </S.textContainer>
                        
                </S.ContentWrapper>

            </S.Container>
        </>
    )
}

export default Diary;