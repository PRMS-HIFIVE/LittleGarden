import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { PlantDetail } from './usePlantSearch';
import { registerPlant } from '@/apis/plant.api';
import { uploadImage } from '@/apis/image.api';

interface UsePlantFormProps {
    imageFile: File | undefined;
    plantDetail: PlantDetail | null;
}

export const usePlantForm = ({ imageFile, plantDetail }: UsePlantFormProps) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [plantName, setPlantName] = useState('');
    const [wateringCycle, setWateringCycle] = useState('');

    useEffect(() => {
        if (plantDetail) {
            // setPlantName(plantDetail.name);
        }
    }, [plantDetail]);

    const handleSubmit = async () => {
        if (!plantName || !imageFile) {
            alert('식물 이름과 이미지는 필수 항목입니다.');
            return;
        }

        setIsLoading(true);
        try {
            const imageUrl = await uploadImage(imageFile);

            const payload: Record<string, any> = {
                cntntsSj: plantName,
                ...(wateringCycle && { watercycle: wateringCycle }),
                imgUrl: imageUrl,

                cntntsNo: plantDetail?.contentNo || '정보 없음',
                plntbneNm: plantDetail?.scientificName || '정보 없음',
                fmlCodeNm: plantDetail?.familyName || '정보 없음',
                ignSeasonCodeNm: plantDetail?.floweringSeason || '정보 없음',
                dlthtsCodeNm: plantDetail?.pests || '정보 없음',
                grwhTpCodeNm: plantDetail?.growthTemp || '정보 없음',
                winterLwetTpCodeNm: plantDetail?.winterMinTemp || '정보 없음',
                hdCodeNm: plantDetail?.humidity || '정보 없음',
                lighttdemanddoCodeNm: plantDetail?.lightRequirement || '정보 없음',
                postngplaceCodeNm: plantDetail?.placement || '정보 없음',
                frtlzrInfo: plantDetail?.fertilizer || '정보 없음',
                watercycleSprngCode: plantDetail?.wateringCode.spring || '정보 없음',
                watercycleSummerCode: plantDetail?.wateringCode.summer || '정보 없음',
                watercycleAutumnCode: plantDetail?.wateringCode.autumn || '정보 없음',
                watercycleWinterCode: plantDetail?.wateringCode.winter || '정보 없음',

                // (임시 데이터)
                fmldeSeasonCodeNm: '정보 없음',
                growthAraInfo: '정보 없음',
                growthHgInfo: '정보 없음',
                grwtveCodeNm: '정보 없음',
                managedemanddoCodeNm: '정보 없음',
                managelevelCodeNm: '정보 없음',
            };

            await registerPlant(payload);

            alert('식물이 성공적으로 등록되었습니다!');
            navigate('/');
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '식물 등록 중 알 수 없는 오류가 발생했습니다.';
            alert(`식물 등록 실패:\n${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };

    return { plantName, setPlantName, wateringCycle, setWateringCycle, handleSubmit, isLoading };
};