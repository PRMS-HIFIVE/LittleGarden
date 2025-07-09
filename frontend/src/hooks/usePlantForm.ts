import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlantStore, type Plant } from '@/store/plantStore';
import type { PlantDetail } from './usePlantSearch';
import { resizeImage } from '@/utils/image';

interface UsePlantFormProps {
    imageFile: File | undefined;
    plantDetail: PlantDetail | null;
}

export const usePlantForm = ({ imageFile, plantDetail }: UsePlantFormProps) => {
    const navigate = useNavigate();
    const addPlant = usePlantStore((state) => state.addPlant);

    const [plantName, setPlantName] = useState('');
    const [wateringCycle, setWateringCycle] = useState('');

    useEffect(() => {
        // API에서 식물 정보를 가져오면, 식물 이름 입력 필드를 자동으로 채웁니다.
        if (plantDetail) {
            setPlantName(plantDetail.name);
        }
    }, [plantDetail]);

    const handleSubmit = async () => {
        if (!plantName || !wateringCycle || !imageFile) {
            alert('모든 정보를 입력해주세요.');
            return;
        }

        // 썸네일용으로 작은 사이즈의 이미지 생성
        const base64Thumbnail = await resizeImage(imageFile, { maxSize: 400, quality: 0.7 });

        const newPlant: Plant = {
            id: Date.now().toString(),
            name: plantName,
            wateringCycle: parseInt(wateringCycle, 10),
            thumbnailUrl: base64Thumbnail,
        };

        addPlant(newPlant);
        alert('식물이 성공적으로 추가되었습니다!');
        navigate('/');
    };

    return { plantName, setPlantName, wateringCycle, setWateringCycle, handleSubmit };
};