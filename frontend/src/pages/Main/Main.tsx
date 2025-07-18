import { useMyPlants } from '@/hooks/useMyPlants';
import * as S from './Main.style'
import Star from '../../assets/icons/Star.svg?react';
import Droplet from '@/assets/icons/Droplet.svg?react';
import { Link } from 'react-router-dom';
import { calculateDday, type DdayResult } from '@/utils/dateUtils';

function Main(){
    const { myPlants, isLoading, error } = useMyPlants();

    if (isLoading) {
        return <S.MainWrap><S.ResetText>식물 목록을 불러오는 중...</S.ResetText></S.MainWrap>;
    }

    if (error) {
        return <S.MainWrap><S.ResetText>오류: {error}</S.ResetText></S.MainWrap>;
    }

    return(
        <S.MainWrap>
            <S.MainTitle>🌱 식물 키우기</S.MainTitle>
            <S.MainBody>
                {myPlants.length === 0 ? (
                    <S.ResetText>
                        사진을 촬영해
                        <br />식물을 관리해보세요!
                    </S.ResetText>
                ) : (
                    <S.PlantsListWrapper>
                        {myPlants.map(plant => {
                            const lastWatered = plant.last_watering;
                            const cycle = plant.watercycle ? Number(plant.watercycle) : plant.day ? Number(plant.day) : 0;

                            const wateringInfo: DdayResult = (lastWatered && cycle > 0)
                                ? calculateDday(lastWatered, cycle)
                                : {
                                    text: cycle > 0 ? `D-${cycle}` : '주기 미설정',
                                    isOverdue: false
                                };

                            return (
                                <Link to={`/detail/${plant.id}`} key={plant.id} style={{ textDecoration: 'none', color: 'inherit' }} >
                                    <S.PlantsList>
                                        <Star />
                                        <S.PlantWrapper>
                                            <S.PlantNameArea>
                                                <img src={plant.imgUrl} alt={plant.cntntsSj}/>
                                                <S.PlantName>{plant.cntntsSj}</S.PlantName>
                                            </S.PlantNameArea>
                                            <S.PlantInfoWrapper>
                                                <Droplet />
                                                <S.DdayText isOverdue={wateringInfo.isOverdue}>{wateringInfo.text}</S.DdayText>
                                            </S.PlantInfoWrapper>
                                        </S.PlantWrapper>
                                    </S.PlantsList>
                                </Link>
                            );
                        })}
                    </S.PlantsListWrapper>
                )}
            </S.MainBody>
        </S.MainWrap>
    )
}

export default Main;