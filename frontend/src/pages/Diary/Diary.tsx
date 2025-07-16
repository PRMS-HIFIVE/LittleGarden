import * as S from "./Diary.styles";
import { useNavigate, Outlet } from "react-router-dom";
import Button from "@/components/UI/Button/Button";
import MainpageHeader from "@/common/Header/HeaderVariants/MainpageHeader";


const Diary = () => {
    const navigate = useNavigate();
    
    const handleLatest = () => {
        navigate('/diary/latest')
    }
    const handlePhotoOnly = () => {
        navigate('/diary/photo')
    }
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
                        onClick={handleLatest}
                        width="50%"
                    > 최신순
                    </Button>
                    <Button 
                        variant="diaryMenu"
                        onClick={handlePhotoOnly}
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
                <Outlet></Outlet>
            </S.Container>
        </>
    )
}

export default Diary;