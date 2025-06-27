import * as S from './Main.style'
import type { PlantInfo } from '../App';

interface MainProps {
    plants: PlantInfo[];
}

function Main({ plants }: MainProps){
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
                    <div>
                        {/** 여기에 추가된 식물 목록 렌더링 구현해야 함 **/}
                        <h2>내 식물들</h2>
                        {plants.map(plant => (
                            <div key={plant.id}>
                                <img src={plant.thumbnailUrl} alt={plant.name} style={{ width: '50px', height: '50px', borderRadius: '5px' }} />
                                <p>{plant.name} ({plant.wateringCycle}일 주기)</p>
                            </div>
                        ))}
                    </div>
                )}
            </S.MainBody>
        </S.MainWrap>
    )
}

export default Main;