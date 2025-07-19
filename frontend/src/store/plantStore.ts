import { create } from 'zustand';

export interface Plant {
    id: number;
    cntntsSj: string;
    imgUrl: string;
    thumbnailUrl?: string;
    name?: string;
    watercycleNm: string;
    last_watering?: string | null;
    plntbneNm?: string;
    fmlCodeNm?: string;
    postngplaceCodeNm?: string;
    grwhTpCodeNm?: string;
    winterLwetTpCodeNm?: string;
    lighttdemanddoCodeNm?: string;
    hdCodeNm?: string;
    frtlzrInfo?: string;
    dlthtsCodeNm?: string;
    comment?: string;
    watercycle?: number;
    day?: number;
}

interface PlantStoreState {
    myPlants: Plant[];
    setMyPlants: (plants: Plant[]) => void;
}

export const usePlantStore = create<PlantStoreState>((set) => ({
    myPlants: [],
    setMyPlants: (plants) => set({ myPlants: plants }),
}));
