import { useParams, useNavigate } from 'react-router-dom';
import { usePlantStore } from '@/store/plantStore';
import * as S from './PlantDetailPage.style';
import Footer from '@/common/Footer';
import Button from '@/components/UI/Button/Button';
import Header from '@/common/Header/Header';

function PlantDetailPage () {
    const { plantId } = useParams<{ plantId: string }>();
    const navigate = useNavigate();

    const plants = usePlantStore((state) => state.plants);
    const plant = plants.find(p => p.id === plantId);
    const handleGoBack = () => {
        navigate(-1);
    };

    if (!plant) {
        return <div>식물 정보를 찾을 수 없습니다. <button onClick={handleGoBack}>돌아가기</button></div>;
    }

    return(
        <S.DetailWrapper>
            <Header />
            <S.DetailHeader>🌱 식물 키우기</S.DetailHeader>
            <S.DetailBody>
                <S.WeatherInfo>
                    {plant.wateringCycle}
                </S.WeatherInfo>
                <S.DetailImageContainer>
                    <img src={plant.thumbnailUrl} alt={plant.name}/>
                </S.DetailImageContainer>
                <Button buttonSize='medium' radius='round'>물 주기</Button>
            </S.DetailBody>
            <S.InfoWrapper>

            </S.InfoWrapper>
            <Footer type='camera'/>
        </S.DetailWrapper>
    );
}

export default PlantDetailPage;