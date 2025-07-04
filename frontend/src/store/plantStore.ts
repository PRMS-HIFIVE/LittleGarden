import { create } from 'zustand';

export interface Plant{
    id: string;
    name: string;
    wateringCycle: number;
    thumbnailUrl: string;
}

interface PlantState{
    plants: Plant[];
    setPlants: (plants: Plant[]) => void;
    addPlant: (plant: Plant) => void;
}

export const usePlantStore = create<PlantState>((set) => ({
    plants: [],
    // 서버에서 식물 목록을 불러와 상태를 설정하는 액션
    setPlants: (plants) => set({ plants }),
    // 새로운 식물을 목록에 추가하는 액션
    addPlant: (plant) => set((state) => ({ plants: [...state.plants, plant] })),
}));
