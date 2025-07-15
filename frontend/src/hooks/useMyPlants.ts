import { useState, useCallback, useEffect } from 'react';
import { usePlantStore } from '@/store/plantStore';
import { fetchMyPlants } from '@/apis/plant.api';
import { useAuthStore } from '@/store/authStore';

export const useMyPlants = () => {
    const { myPlants, setMyPlants } = usePlantStore();
    const { token } = useAuthStore();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadMyPlants = useCallback(async () => {
        if (!token) {
            setMyPlants([]);
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchMyPlants();
            setMyPlants(data);
        } catch (err) {
            const message = err instanceof Error ? err.message : '식물 목록을 불러오지 못했습니다.';
            setError(message);
        } finally {
            setIsLoading(false);
        }
    }, [token, setMyPlants]);

    useEffect(() => {
        loadMyPlants();
    }, [loadMyPlants]);

    return { myPlants, isLoading, error, refresh: loadMyPlants };
};
