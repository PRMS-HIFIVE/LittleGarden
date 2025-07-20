export interface WeatherData {
    weather: {
        description: string;
        icon: string;
    }[];
    main: {
        temp: number;
        humidity: number;
    };
    name: string;
};

export const fetchWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    if(!apiKey){
        throw new Error("OpenWeather API 키가 설정되지 않았습니다.");
    }

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`);

    if(!response.ok){
        throw new Error("날씨 정보를 가져오는데 실패했습니다.");
    }

    return response.json();
}