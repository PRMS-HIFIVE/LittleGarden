import * as S from './Main.style'
import Star from '../../assets/icons/Star.svg?react';
import Droplet from '../../assets/icons/Droplet.svg?react';
import type { PlantInfo } from '../../App';
import { useNavigate } from 'react-router-dom';

interface MainProps {
    plants: PlantInfo[];
}

function Main({ plants }: MainProps){
    const navigate = useNavigate();

    const handleDetailClick = (plantId: string) => {
        navigate(`/detail/${plantId}`);
    }
    return(
        <S.MainWrap>
            <S.MainTitle>🌱 식물 키우기</S.MainTitle>
            <S.MainBody>
                {plants.length === 0 ? (
                    <S.ResetText>
                        사진을 촬영해
                        <br />식물을 관리해보세요!
                    </S.ResetText>
                ) : (
                    <S.PlantsListWrapper>
                        {plants.map(plant => (
                            <S.PlantsList key={plant.id} onClick={() => handleDetailClick(plant.id)}>
                                <Star />
                                <S.PlantWrapper>
                                    <S.PlantNameArea>
                                        <img src={plant.thumbnailUrl} alt={plant.name} />
                                        <p>{plant.name}</p>
                                    </S.PlantNameArea>
                                    <S.PlantInfoWrapper>
                                        <Droplet /> D - {plant.wateringCycle}
                                    </S.PlantInfoWrapper>
                                </S.PlantWrapper>
                            </S.PlantsList>
                        ))}
                    </S.PlantsListWrapper>
                )}
            </S.MainBody>
        </S.MainWrap>
    )
}

export default Main;