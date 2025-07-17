import { useLocation, useNavigate } from 'react-router-dom';
import * as S from './UploadPreview.style';
import { useEffect } from 'react';

function UploadPreviewPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const imageFile = location.state?.imageFile as File | undefined;

    useEffect(() => {
        if (!imageFile) {
        navigate('/');
        }
    }, [imageFile, navigate]);

    if (!imageFile) {
        return null;  // 네비게이트 후 렌더링 중단
    }

    const handleRegisterClick = () => {
        navigate('/register-plant', { state: { imageFile: imageFile } });
    };

    return (
        <S.UploadPreviewWrapper>
            <header>
                헤더 영역 (미리보기 페이지)
            </header>
            <S.ImageContainer>
                <S.ImagePreview src={URL.createObjectURL(imageFile)} alt="선택한 식물 이미지 미리보기" />
            </S.ImageContainer>
            <S.ButtonWrapper>
                <S.RegisterButton onClick={handleRegisterClick}>등록하기</S.RegisterButton>
            </S.ButtonWrapper>
        </S.UploadPreviewWrapper>
    );
}

export default UploadPreviewPage;