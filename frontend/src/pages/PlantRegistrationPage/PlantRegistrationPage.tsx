import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePlantSearch } from '@/hooks/usePlantSearch';
import * as S from './PlantRegistrationPage.style';
import { usePlantForm } from '@/hooks/usePlantForm';
import { IoClose as CloseButton } from "react-icons/io5";
import Button from '@/components/UI/Button/Button';
import Input from '@/components/UI/Input/Input';

function PlantRegistrationPage() {
    const location = useLocation();
    const navigate = useNavigate();

    // 식물 검색 훅
    const {
        data: plantDetail,
        isLoading,
        error,
        searchByImage,
    } = usePlantSearch();

    const imageFile = location.state?.imageFile as File | undefined;
    const [previewUrl, setPreviewUrl] = useState<string>('');

    // 폼 상태 및 제출 로직을 관리하는 훅
    const {
        plantName,
        setPlantName,
        wateringCycle,
        setWateringCycle,
        handleSubmit,
    } = usePlantForm({ imageFile, plantDetail });

    useEffect(() => {
        // 이미지 파일이 없으면 홈으로 리다이렉트
        if (imageFile) {
            const url = URL.createObjectURL(imageFile);
            setPreviewUrl(url);
            // 이미지 파일로 식물 정보 검색 시작
            searchByImage(imageFile);
            return () => URL.revokeObjectURL(url);
        } else {
            navigate('/');
        }
    }, [imageFile, navigate, searchByImage]);

    useEffect(() => {
        // 검색된 식물 정보로 이름 자동 채우기
        if (plantDetail) {
            setPlantName(plantDetail.name);
        }
    }, [plantDetail]);

    return (
        <S.RegistrationWrapper>
            <S.RegistrationHeader>
                <CloseButton onClick={() => navigate('/')} />
            </S.RegistrationHeader>
            <S.FormContainer>
                {previewUrl && <S.ImageThumbnail src={previewUrl} alt="식물 썸네일" />}

                {isLoading && <p>식물 정보를 분석 중입니다...</p>}
                {error && <p style={{ color: 'red' }}>오류: {error}</p>}

                {/* API로부터 가져온 상세 정보 (참고용) */}
                {plantDetail && !isLoading && (
                    <S.InfoBox>
                        <h4><strong>'{plantDetail.name}'</strong> 정보 (참고)</h4>
                        <p><strong>물주기:</strong> {plantDetail.watering.spring}</p>
                        <p><strong>광도:</strong> {plantDetail.lightRequirement}</p>
                        <p><strong>온도:</strong> {plantDetail.growthTemp}</p>
                    </S.InfoBox>
                )}

                <S.FormWrapper>
                    <S.FormGroup>
                        <S.Label htmlFor="plantName">🌱 식물 이름</S.Label>
                        <Input
                            type='text'
                            placeholder='식물 이름을 입력해주세요!'
                            value={plantName}
                            onChange={(e) => setPlantName(e.target.value)}
                        />
                    </S.FormGroup>
                    <S.FormGroup>
                        <S.Label htmlFor="wateringCycle">💧 물 주기 (며칠에 한 번)</S.Label>
                        <Input 
                            type='number'
                            value={wateringCycle}
                            onChange={(e) => setWateringCycle(e.target.value)}
                            placeholder='예: 7'
                        />
                    </S.FormGroup>
                </S.FormWrapper>
                <Button buttonSize='full' radius='round' onClick={handleSubmit} disabled={isLoading}>
                    식물 추가하기
                </Button>
            </S.FormContainer>
        </S.RegistrationWrapper>
    );
}

export default PlantRegistrationPage;