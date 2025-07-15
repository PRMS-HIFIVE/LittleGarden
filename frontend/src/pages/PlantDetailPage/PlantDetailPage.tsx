import { useParams, useNavigate } from 'react-router-dom';
import * as S from './PlantDetailPage.style';
import Footer from '@/common/Footer';
import Button from '@/components/UI/Button/Button';
import { useEffect, useState } from 'react';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useWeatherStore } from '@/store/weatherStore';
import MainpageHeader from '@/common/Header/HeaderVariants/MainpageHeader';
import { usePlantDetail } from '@/hooks/usePlantDetail';
import { updatePlant } from '@/apis/plant.api';
import { Droplet } from '@/assets/icons/IconList';

function PlantDetailPage () {
    const { plantId } = useParams<{ plantId: string }>();
    const navigate = useNavigate();
    const [isUpdating, setIsUpdating] = useState(false);
    const { plant, isLoading: isPlantLoading, error: plantError } = usePlantDetail(Number(plantId));
    const { coords, error: geoError, isLoading: isGeoLoading, getLocation } = useGeolocation();
    const { weather, isLoading: isWeatherLoading, error: weatherError, fetchWeather, resetWeather } = useWeatherStore();

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

    const handleWatering = async () => {
        if(!plant) return;
        setIsUpdating(true);
        try {
            const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
            await updatePlant(Number(plant.id), {watering: now});

            alert('물주기 완료! 식물이 좋아해요~');
        } catch (error) {
            const message = error instanceof Error ? error.message : '물주기 정보 업데이트에 실패했습니다.';
            alert(message);
        } finally {
            setIsUpdating(false);
        }
    };

    if (isPlantLoading) {
        return <S.DetailWrapper><p>식물 정보를 불러오는 중...</p></S.DetailWrapper>;
    }

    if (plantError) {
        return <S.DetailWrapper><p>오류: {plantError}</p></S.DetailWrapper>;
    }

    if (!plant) {
        return <div>식물 정보를 찾을 수 없습니다. <button onClick={handleGoBack}>돌아가기</button></div>;
    }
    
    const renderWeatherContent = () => {
        if (isGeoLoading) return <p>위치 정보를 가져오는 중...</p>;
        if (geoError) return <p>위치 권한을 허용하면 날씨를 볼 수 있어요.</p>;
        if (isWeatherLoading) return <p>날씨 정보를 불러오는 중...</p>;
        if (weatherError) return <p>날씨 정보를 가져오지 못했어요: {weatherError}</p>;

        if (weather) {
            return (
                <S.WeatherWrapper>
                    <S.WeatherItem>
                        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt={weather.weather[0].description} />
                        <span>{weather.main.temp.toFixed(1)}°C</span>
                    </S.WeatherItem>
                    <S.WeatherItem>
                        <Droplet />
                        <span>{weather.main.humidity}%</span>
                    </S.WeatherItem>
                </S.WeatherWrapper>
            );
        }
        return <p>날씨 정보를 기다리는 중...</p>;
    };

    return(
        <S.DetailWrapper>
            <MainpageHeader />
            <S.DetailHeader>🌱 식물 키우기</S.DetailHeader>
            <S.DetailBody>
                <S.WeatherInfo>
                    {renderWeatherContent()}
                </S.WeatherInfo>
                <S.DetailImageContainer>
                    <img src={plant.imgUrl} alt={plant.cntntsSj}/>
                </S.DetailImageContainer>
                <Button buttonSize='medium' radius='round' onClick={handleWatering} disabled={isUpdating}>
                    {isUpdating ? '처리 중...' : '물 주기'}
                </Button>
            </S.DetailBody>
            <S.InfoWrapper>
                <p>나중에 Gemini Text</p>
            </S.InfoWrapper>
            <Footer type='camera'/>
        </S.DetailWrapper>
    );
}

export default PlantDetailPage;