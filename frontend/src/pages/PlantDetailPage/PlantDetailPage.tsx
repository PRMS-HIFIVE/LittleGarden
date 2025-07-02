import { useParams, useNavigate } from 'react-router-dom';
import type { PlantInfo } from '../../App';
import * as S from './PlantDetailPage.style';
import Footer from '@/common/Footer';

interface PlantDetailPageProps {
    plants: PlantInfo[];
}

function PlantDetailPage ({ plants }: PlantDetailPageProps) {
    const { plantId } = useParams<{ plantId: string }>();
    const navigate = useNavigate();
    const plant = plants.find(p => p.id === plantId);

    const handleGoBack = () => {
        navigate(-1);
    };

    if (!plant) {
        return <div>식물 정보를 찾을 수 없습니다. <button onClick={handleGoBack}>돌아가기</button></div>;
    }

    return(
        <S.DetailWrapper>
            <header>
                헤더 영역
            </header>
            <S.DetailHeader>🌱 식물 키우기</S.DetailHeader>
            <S.DetailBody>
                <S.WeatherInfo>
                    {plant.wateringCycle}
                </S.WeatherInfo>
                <S.DetailImageContainer>
                    <img src={plant.thumbnailUrl} alt={plant.name}/>
                </S.DetailImageContainer>
                <button>물주기</button>
            </S.DetailBody>
            <S.InfoWrapper>

            </S.InfoWrapper>
            <Footer />
        </S.DetailWrapper>
    );
}

export default PlantDetailPage;