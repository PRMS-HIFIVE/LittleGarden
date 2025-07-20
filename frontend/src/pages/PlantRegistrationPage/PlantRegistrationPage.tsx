import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePlantSearch } from '@/hooks/usePlantSearch';
import * as S from './PlantRegistrationPage.style';
import { usePlantForm } from '@/hooks/usePlantForm';
import { IoClose as CloseButton } from "react-icons/io5";
import Button from '@/components/UI/Button/Button';
import Input from '@/components/UI/Input/Input';
import type { NongsaroListItem } from '@/apis/plant.api';

function PlantRegistrationPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const {
        data: plantDetail,
        isLoading,
        error,
        searchByName,
    } = usePlantSearch();

    const imageFile = location.state?.imageFile as File | undefined;
    const [previewUrl, setPreviewUrl] = useState<string>('');

    const {
        plantName,
        setPlantName,
        wateringCycle,
        setWateringCycle,
        handleSubmit,
    } = usePlantForm({ imageFile, plantDetail });

    const [searchResults, setSearchResults] = useState<NongsaroListItem[]>([]);
    const resultBoxRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        // 이미지 파일이 없으면 홈으로 리다이렉트
        if (imageFile) {
            const url = URL.createObjectURL(imageFile);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        } else {
            navigate('/');
        }
    }, [imageFile, navigate]);

    const handleSearch = useCallback(async (name: string) => {
        if (name) {
            const { nongsaroList } = await searchByName(name);
            setSearchResults(nongsaroList || []);
        } else {
            setSearchResults([]);
        }
    }, [searchByName]);

    // 외부 클릭 시 검색 결과 박스 닫기
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (resultBoxRef.current && !resultBoxRef.current.contains(e.target as Node)) {
                setSearchResults([]);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <S.RegistrationWrapper>
            <S.RegistrationHeader>
                <CloseButton onClick={() => navigate('/')} />
            </S.RegistrationHeader>
            <S.FormContainer>
                {previewUrl && <S.ImageThumbnail src={previewUrl} alt="식물 썸네일" />}

                {isLoading && <p>식물 정보를 검색 중입니다...</p>}
                {error && <p style={{ color: 'red' }}>오류: {error}</p>}

                {/* {plantDetail && !isLoading && (
                    <S.InfoBox>
                        <h4><strong>'{plantDetail.name}'</strong> 정보 (참고)</h4>
                        <p><strong>물주기:</strong> {plantDetail.watering.spring}</p>
                        <p><strong>광도:</strong> {plantDetail.lightRequirement}</p>
                        <p><strong>온도:</strong> {plantDetail.growthTemp}</p>
                    </S.InfoBox>
                )} */}

                <S.FormWrapper>
                    <S.FormGroup style={{position: 'relative'}}>
                        <S.Label htmlFor="plantName">🌱 식물 이름</S.Label>
                        <Input
                            type='text'
                            placeholder='식물 이름을 입력해주세요!'
                            value={plantName}
                            onChange={(e) => {
                                const name = e.target.value;
                                setPlantName(name);
                                handleSearch(name);
                            }}
                        />
                        {searchResults.length > 0 && (
                            <S.SearchResultsBox ref={resultBoxRef}>
                                {searchResults.map((result) => (
                                    <S.SearchResultItem
                                        key={result.cntntsNo?._cdata || result.cntntsNo?._text}
                                        onClick={() => {
                                            const plantName = result.cntntsSj._cdata || result.cntntsSj._text || '';
                                            setPlantName(plantName);
                                            setSearchResults([]);
                                        }}
                                    >
                                        {result.cntntsSj._cdata || result.cntntsSj._text}
                                    </S.SearchResultItem>
                                ))}
                            </S.SearchResultsBox>
                        )}
                    </S.FormGroup>
                    <S.FormGroup>
                        <S.Label htmlFor="wateringCycle">💧 물 주기 (며칠에 한 번)</S.Label>
                        <Input 
                            type='number'
                            value={wateringCycle}
                            onChange={(e) => setWateringCycle(e.target.value)}
                            placeholder='예: 7'
                        />
                        <S.HelperText>비워두시면 식물 정보에 따라 자동으로 설정됩니다.</S.HelperText>
                    </S.FormGroup>
                </S.FormWrapper>
                <Button
                    buttonSize="full"
                    radius="round"
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    식물 추가하기
                </Button>
            </S.FormContainer>
        </S.RegistrationWrapper>
    );
}

export default PlantRegistrationPage;