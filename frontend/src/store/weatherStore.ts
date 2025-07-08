import { create } from "zustand";
import { fetchWeatherByCoords, type WeatherData } from "@/apis/weather";

interface WeatherState{
    weather: WeatherData | null;
    isLoading: boolean;
    error: string | null;
    fetchWeather: (lat: number, lon: number) => Promise<void>;
    resetWeather: () => void;
};

export const useWeatherStore = create<WeatherState>((set) => ({
    weather: null,
    isLoading: false,
    error: null,
    fetchWeather: async (lat, lon) => {
        set({isLoading: true, error: null});
        try{
            const weatherData = await fetchWeatherByCoords(lat, lon);
            set({ weather: weatherData, isLoading: false });
        }catch(err){
            const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
            set({error: errorMessage, isLoading: false, weather: null});
        }
    },
    resetWeather: () => set({
        weather: null,
        isLoading: false,
        error: null,
    })
}));