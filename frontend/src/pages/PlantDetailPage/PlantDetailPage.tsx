import { useParams, useNavigate } from 'react-router-dom';
import { usePlantStore } from '@/store/plantStore';
import * as S from './PlantDetailPage.style';
import Footer from '@/common/Footer';
import Button from '@/components/UI/Button/Button';
import { useEffect } from 'react';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useWeatherStore } from '@/store/weatherStore';
import MainpageHeader from '@/common/Header/HeaderVariants/MainpageHeader';

function PlantDetailPage () {
    const { plantId } = useParams<{ plantId: string }>();
    const navigate = useNavigate();

    const { coords, error: geoError, isLoading: isGeoLoading, getLocation } = useGeolocation();

    const { weather, isLoading: isWeatherLoading, error: weatherError, fetchWeather, resetWeather } = useWeatherStore();

    const plants = usePlantStore((state) => state.plants);
    const plant = plants.find(p => p.id === plantId);

    useEffect(() => {
        getLocation();
    }, [getLocation]);

    useEffect(() => {
        if (coords) {
            fetchWeather(coords.lat, coords.lon);
        }
    }, [coords, fetchWeather]);

    useEffect(() => {
        return () => {
            resetWeather();
        }
    }, [resetWeather]);

    const handleGoBack = () => {
        navigate(-1);
    };

    if (!plant) {
        return <div>식물 정보를 찾을 수 없습니다. <button onClick={handleGoBack}>돌아가기</button></div>;
    }

    return(
        <S.DetailWrapper>
            <MainpageHeader />
            <S.DetailHeader>🌱 식물 키우기</S.DetailHeader>
            <S.DetailBody>
                <S.WeatherInfo>
                    {isGeoLoading && <p>위치 정보를 가져오는 중...</p>}
                    {isWeatherLoading && <p>날씨 정보를 불러오는 중...</p>}

                    {geoError && <p>위치 오류: {geoError.message}</p>}
                    {weatherError && <p>날씨 오류: {weatherError}</p>}

                    {weather && (
                        <>
                            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt={weather.weather[0].description} />
                            <span>{weather.main.temp.toFixed(1)}°C</span>
                        </>
                    )}

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