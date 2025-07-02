import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as S from './PlantRegistrationPage.style';
import type { PlantInfo } from '../App';

interface PlantRegistrationPageProps {
    setPlants: React.Dispatch<React.SetStateAction<PlantInfo[]>>;
}

function PlantRegistrationPage({ setPlants }: PlantRegistrationPageProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const imageFile = location.state?.imageFile as File | undefined;
    const [plantName, setPlantName] = useState('');
    const [wateringCycle, setWateringCycle] = useState('');
    // 화면 미리보기용 URL과 저장용 데이터를 구분하기 위해 상태 이름 변경
    const [previewUrl, setPreviewUrl] = useState<string>('');

    useEffect(() => {
        if (imageFile) {
            // 화면에 보여주기 위한 임시 blob URL 생성
            const url = URL.createObjectURL(imageFile);
            setPreviewUrl(url);
            // 컴포넌트가 사라질 때 메모리 누수 방지를 위해 URL 해제
            return () => URL.revokeObjectURL(url);
        } else {
            // 이미지 파일이 없으면 홈으로 이동
            navigate('/');
        }
    }, [imageFile, navigate]);

    // 파일 객체를 Base64 데이터 URL(문자열)로 변환하는 헬퍼 함수
    const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });

    const handleAddPlant = async () => {
        // 미리보기 URL이 아닌 실제 파일(imageFile)이 있는지 확인
        if (!plantName || !wateringCycle || !imageFile) {
            alert('모든 정보를 입력해주세요.');
            return;
        }

        // 이미지 파일을 Base64로 변환하여 저장
        const base64Thumbnail = await toBase64(imageFile);

        const newPlant: PlantInfo = {
            id: Date.now().toString(),
            name: plantName,
            wateringCycle: parseInt(wateringCycle, 10),
            thumbnailUrl: base64Thumbnail, // Base64 URL을 저장
        };

        setPlants(prevPlants => [...prevPlants, newPlant]);
        alert('식물이 성공적으로 추가되었습니다!');
        navigate('/');
    };

    return (
        <S.RegistrationWrapper>
            <nav>
                <button>X</button>
            </nav>
            <S.FormContainer>
                {previewUrl && <S.ImageThumbnail src={previewUrl} alt="식물 썸네일" />}
                <S.FormGroup>
                    <S.Label htmlFor="plantName">🌱 식물 이름</S.Label>
                    <S.Input
                        id="plantName"
                        type="text"
                        value={plantName}
                        onChange={(e) => setPlantName(e.target.value)}
                        placeholder="예: 몬스테라"
                    />
                </S.FormGroup>
                <S.FormGroup>
                    <S.Label htmlFor="wateringCycle">💧 물 주기 (며칠에 한 번)</S.Label>
                    <S.Input
                        id="wateringCycle"
                        type="number"
                        value={wateringCycle}
                        onChange={(e) => setWateringCycle(e.target.value)}
                        placeholder="예: 7"
                    />
                </S.FormGroup>
            </S.FormContainer>
            <S.AddPlantButton onClick={handleAddPlant}>
                식물 추가하기
            </S.AddPlantButton>
        </S.RegistrationWrapper>
    );
}

export default PlantRegistrationPage;