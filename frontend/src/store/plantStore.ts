import { create } from 'zustand';

export interface Plant {
    id: number;
    cntntsSj: string;
    imgUrl: string;
    thumbnailUrl?: string;
    name?: string;
    watercycleNm: string;
    lastWateredDate?: string | null;
    plntbneNm?: string;
    fmlCodeNm?: string;
    postngplaceCodeNm?: string;
    grwhTpCodeNm?: string;
    winterLwetTpCodeNm?: string;
    lighttdemanddoCodeNm?: string;
    hdCodeNm?: string;
    frtlzrInfo?: string;
    dlthtsCodeNm?: string;
}

interface PlantStoreState {
    myPlants: Plant[];
    setMyPlants: (plants: Plant[]) => void;
}

export const usePlantStore = create<PlantStoreState>((set) => ({
    myPlants: [],
    setMyPlants: (plants) => set({ myPlants: plants }),
}));
