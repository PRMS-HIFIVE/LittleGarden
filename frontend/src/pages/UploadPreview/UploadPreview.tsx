import { useState, useEffect } from 'react';
import * as S from './UploadPreview.style.ts';

interface UploadPreviewProps {
    imageFile: File;
    onRegister: () => void;
}

function UploadPreview({ imageFile, onRegister }: UploadPreviewProps) {
    const [imageUrl, setImageUrl] = useState<string>('');

    useEffect(() => {
        const url = URL.createObjectURL(imageFile);
        setImageUrl(url);

        return () => URL.revokeObjectURL(url);
    }, [imageFile]);

    return (
        <S.UploadPreviewWrapper>
            <S.ImageContainer>
                {imageUrl && <S.ImagePreview src={imageUrl} alt="선택한 식물 이미지 미리보기" />}
            </S.ImageContainer>
            <S.ButtonWrapper>
                <S.RegisterButton onClick={onRegister}>
                    등록하기
                </S.RegisterButton>
            </S.ButtonWrapper>
        </S.UploadPreviewWrapper>
    );
}

export default UploadPreview;

