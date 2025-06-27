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
    const [thumbnailUrl, setThumbnailUrl] = useState<string>('');

    useEffect(() => {
        if (imageFile) {
            const url = URL.createObjectURL(imageFile);
            setThumbnailUrl(url);
            return () => URL.revokeObjectURL(url);
        } else {
            navigate('/');
        }
    }, [imageFile, navigate]);

    const handleAddPlant = () => {
        if (!plantName || !wateringCycle || !thumbnailUrl) {
            alert('모든 정보를 입력해주세요.');
            return;
        }

        const newPlant: PlantInfo = {
            id: Date.now().toString(),
            name: plantName,
            wateringCycle: parseInt(wateringCycle, 10),
            thumbnailUrl: thumbnailUrl,
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
                {thumbnailUrl && <S.ImageThumbnail src={thumbnailUrl} alt="식물 썸네일" />}
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