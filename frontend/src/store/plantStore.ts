import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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

export const usePlantStore = create<PlantState>()(
    persist(
        (set) => ({
            plants: [],
            setPlants: (plants) => set({ plants }),
            addPlant: (plant) => set((state) => ({ plants: [...state.plants, plant] })),
        }),
        {
            name: 'plant-storage',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
