// import { getAuthToken } from "@/apis/diary.api";
import { AddedTag, AddTagButton, Select, SelectRow, SelectWrapper, TagList, TagRemoveButton } from "@/components/UI/Select/SelectMyPlant.styles";
//import type { Plant } from "@/store/plantStore";
import { useEffect, useState } from "react";


export interface MyPlantTag {
    //userId: number;
    plantId: string;
    name: string;
}
export interface PlantSelectorProps {
  onChange: (plants: MyPlantTag[]) => void;
  //plant: Plant[];
}

const PlantSelector = ({onChange} : PlantSelectorProps) => {
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);
  const [selectedPlants, setSelectedPlants] = useState<MyPlantTag[]>([]);
  const [plantList, setPlantList] = useState<MyPlantTag[]>([]);

  const handleAddPlant = () => {
    const plant = plantList.find(p => p.plantId === String(selectedPlantId));
    if (plant && !selectedPlants.some(p => p.plantId === plant.plantId)) {
      setSelectedPlants(prev => [...prev, plant]);
    }
  };

  const handleRemovePlant = (id: string) => {
    setSelectedPlants(selectedPlants.filter(p => p.plantId !== id));
  };

  useEffect(() => {
    onChange(selectedPlants);
  }, [selectedPlants, onChange]);

  useEffect(() => {
    const fetchMyPlant = async () => {
        try{
            // const token = getAuthToken();
            const response = await fetch("/plants", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    // "Authorization": `Bearer ${token}`,
                },
                credentials: "include",
            });
            if (!response.ok) throw new Error("식물 정보를 불러오는데 실패했습니다");
            const data = await response.json();
            setPlantList(data);

        if (data.length > 0) {
          setSelectedPlantId(data[0].plantId);
        }
      } catch (error) {
        console.error("내 식물 불러오기 실패:", error);
      }
    };
    fetchMyPlant();

  }, []);


  return (
    <SelectWrapper>
      {/* <span>내 식물 선택</span> */}
      <SelectRow>
        <Select
          value={selectedPlantId ?? ""}
          onChange={e => setSelectedPlantId(e.target.value)}
        >
            {plantList.map(plant => (
                <option key={plant.plantId} value={plant.plantId}>{plant.name}</option>
            ))}
        </Select>
        <AddTagButton 
            onClick={handleAddPlant}
            
            >추가
        </AddTagButton>
      </SelectRow>

      <TagList>
        {selectedPlants.map(plant => (
          <AddedTag key={plant.plantId}>
                {plant.name}
            <TagRemoveButton onClick={() => handleRemovePlant(plant.plantId)}></TagRemoveButton>
          </AddedTag>
        ))}
      </TagList>
    </SelectWrapper>
  );
};

export default PlantSelector;