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
    const [previewUrl, setPreviewUrl] = useState<string>('');

    useEffect(() => {
        if (imageFile) {
            const url = URL.createObjectURL(imageFile);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        } else {
            navigate('/');
        }
    }, [imageFile, navigate]);

    const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });

    const handleAddPlant = async () => {
        if (!plantName || !wateringCycle || !imageFile) {
            alert('모든 정보를 입력해주세요.');
            return;
        }

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