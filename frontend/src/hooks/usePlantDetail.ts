import { useState, useEffect, useCallback } from 'react';
import { fetchPlantById } from '@/apis/plant.api';
import type { Plant } from '@/store/plantStore';

export const usePlantDetail = (plantId: number | undefined) => {
    const [plant, setPlant] = useState<Plant | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadPlantDetail = useCallback(async () => {
        if (!plantId) {
            setError("식물 ID가 제공되지 않았습니다.");
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const plant = await fetchPlantById(plantId);
            if (plant) {
                setPlant(plant);
            } else {
                throw new Error("해당 식물 정보를 찾을 수 없습니다.");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "식물 정보를 불러오는데 실패했습니다.");
        } finally {
            setIsLoading(false);
        }
    }, [plantId]);

    useEffect(() => {
        if (plantId) {
            loadPlantDetail();
        }
    }, [loadPlantDetail]);

    return { plant, isLoading, error, refresh: loadPlantDetail };
};
